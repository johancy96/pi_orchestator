import * as fs from 'fs';
import * as path from 'path';
import { state, getNextPersona, AgentPersona } from './state';
import { getPromptForPersona } from './prompts';
import { renderAgentBox, renderTaskListSidebar, renderTaskListCollapsed } from './ui';

/**
 * Main entry point for the Pi extension.
 */
export default function (pi: any) {
  
  const taskFilePath = path.join(process.cwd(), 'plan', 'task.md');
  let uiContext: any = null;

  const stateFilePath = path.join(process.cwd(), '.pi_orchestrator_state.json');

  // Load persistent state
  const loadPersistentState = () => {
    if (fs.existsSync(stateFilePath)) {
      try {
        const saved = JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
        state.docContextAnalyzed = !!saved.docContextAnalyzed;
      } catch (e) {
        console.error('Error loading persistent state:', e);
      }
    }
  };

  // Save persistent state
  const savePersistentState = () => {
    try {
      fs.writeFileSync(stateFilePath, JSON.stringify({ docContextAnalyzed: state.docContextAnalyzed }));
    } catch (e) {
      console.error('Error saving persistent state:', e);
    }
  };

  // Update the UI
  const updateUI = (ctx: any) => {
    if (!ctx || !ctx.ui) return;
    uiContext = ctx;
    const theme = ctx.ui.theme;
    
    // 1. Render Agent Box (Top)
    const agentBoxLines = renderAgentBox(state.activePersona, theme);
    ctx.ui.setWidget("top", agentBoxLines);
    
    // 2. Render Task List (Right)
    if (state.isTaskListExpanded) {
      const taskListLines = renderTaskListSidebar(theme);
      ctx.ui.setWidget("right", taskListLines);
    } else {
      const collapsedLines = renderTaskListCollapsed(theme);
      ctx.ui.setWidget("right", collapsedLines);
    }
  };

  // Watch for task.md changes to update the UI dynamically
  const watchTasks = () => {
    if (fs.existsSync(path.dirname(taskFilePath))) {
      fs.watch(path.dirname(taskFilePath), (event, filename) => {
        if (filename === 'task.md') {
          updateUI(uiContext);
        }
      });
    }
  };

  // Listen for agent start to inject the persona's prompt
  pi.on("before_agent_start", (event: any, ctx: any) => {
    let prompt = getPromptForPersona(state.activePersona);
    
    // Add doc context instruction only once EVER for this project
    if (!state.docContextAnalyzed) {
      const docPath = path.join(process.cwd(), 'doc');
      if (fs.existsSync(docPath)) {
        prompt += `\n\n[CONTEXT INITIALIZATION]: A "doc/" folder exists. Review its content to extract project architecture and logic. You only need to do this once for this project; acknowledge when done so you don't repeat this check.`;
        state.docContextAnalyzed = true; 
        savePersistentState(); // Persist the flag
      }
    }

    updateUI(ctx);
    
    // Return the system prompt to override it for this turn
    return { systemPrompt: prompt };
  });

  // Intercept keys
  pi.on("key", (event: any, ctx: any) => {
    // Note: 'event' is the key event (if Pi passes it that way).
    // Let's assume the signature is (key, ctx) since that's what was written before,
    // wait, I don't know the exact "key" event signature. Let's look for shortcuts.
  });

  // Since 'key' event might not exist, Pi has registerShortcut. Let's use registerShortcut!
  pi.registerShortcut("ctrl+t", {
    description: "Toggle Orchestrator Task List",
    handler: (ctx: any) => {
      state.isTaskListExpanded = !state.isTaskListExpanded;
      updateUI(ctx);
    }
  });

  pi.registerShortcut("ctrl+o", {
    description: "Switch Orchestrator Persona",
    handler: (ctx: any) => {
      state.activePersona = getNextPersona(state.activePersona);
      updateUI(ctx);
    }
  });

  // Register the /orchestrator_init command
  pi.registerCommand("orchestrator_init", {
    description: "Initialize the Orchestrator documentation structure",
    handler: async (args: string, ctx: any) => {
      const files = fs.readdirSync(process.cwd());
      const filteredFiles = files.filter(f => !['.git', 'node_modules', '.pi', 'package-lock.json'].includes(f));
      
      if (filteredFiles.length === 0) {
        if (ctx.hasUI) ctx.ui.notify("This project is empty", "warning");
        return;
      }

      if (ctx.hasUI) ctx.ui.notify("Initializing orchestrator documentation...", "info");
      
      // Create basic doc structure
      const docPath = path.join(process.cwd(), 'doc');
      if (!fs.existsSync(docPath)) {
        fs.mkdirSync(docPath);
        fs.mkdirSync(path.join(docPath, 'architecture'));
        fs.mkdirSync(path.join(docPath, 'api'));
        fs.mkdirSync(path.join(docPath, 'modules'));
      }

      if (ctx.hasUI) ctx.ui.notify("Created doc/ folder structure. Tell the agent to document the project.", "success");
    }
  });

  // Initial UI render
  pi.on("session_start", (event: any, ctx: any) => {
    loadPersistentState();
    watchTasks();
    updateUI(ctx);
  });
}
