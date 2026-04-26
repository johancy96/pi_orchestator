import * as fs from 'fs';
import * as path from 'path';
import { state, getNextPersona, AgentPersona } from './state';
import { getPromptForPersona } from './prompts';
import { renderAgentBox, renderTaskListSidebar, renderTaskListCollapsed } from './ui';

/**
 * Main entry point for the Pi extension.
 */
module.exports = function (pi: any) {
  
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
    if (!ctx) return;
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
  pi.on("before_agent_start", (ctx: any) => {
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

    ctx.agent.setSystemPrompt(prompt);
    updateUI(ctx);
  });

  // Intercept keys
  pi.on("key", (key: any, ctx: any) => {
    // Tab to switch personas
    if (key.isSpecial("tab")) {
      state.activePersona = getNextPersona(state.activePersona);
      updateUI(ctx);
      return true;
    }
    
    // Ctrl+T or similar to toggle task list (Since mouse click is not supported in TUI API)
    if (key.isSpecial("t") && key.ctrl) {
      state.isTaskListExpanded = !state.isTaskListExpanded;
      updateUI(ctx);
      return true;
    }
    
    return false;
  });

  // Register the /orchestrator_init command
  pi.on("command", async (command: any, ctx: any) => {
    if (command.name === "orchestrator_init") {
      const files = fs.readdirSync(process.cwd());
      const filteredFiles = files.filter(f => !['.git', 'node_modules', '.pi', 'package-lock.json'].includes(f));
      
      if (filteredFiles.length === 0) {
        ctx.ui.printMessage("This project is empty");
        return;
      }

      ctx.ui.printMessage("Initializing orchestrator documentation...");
      
      // Create basic doc structure
      const docPath = path.join(process.cwd(), 'doc');
      if (!fs.existsSync(docPath)) {
        fs.mkdirSync(docPath);
        fs.mkdirSync(path.join(docPath, 'architecture'));
        fs.mkdirSync(path.join(docPath, 'api'));
        fs.mkdirSync(path.join(docPath, 'modules'));
      }

      // Inject a high-priority system prompt to force the agent to document the project
      ctx.agent.setSystemPrompt(`
        URGENT ACTION: The user has initialized the Orchestrator. 
        You must perform a complete analysis of the current project and generate detailed documentation in the "doc/" folder.
        - Create "doc/architecture/overview.md" for a high-level summary.
        - Document modules in "doc/modules/".
        - Document APIs or entry points in "doc/api/".
        Use the specialized skills in the "skills/" folder to ensure high-quality documentation.
      `);
      
      // Force agent to start thinking/acting
      ctx.agent.refreshContext();
      return true;
    }
  });

  // Initial UI render
  pi.on("session_start", (ctx: any) => {
    loadPersistentState();
    watchTasks();
    updateUI(ctx);
  });
}
