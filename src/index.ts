import * as fs from 'fs';
import * as path from 'path';
import { state, getNextPersona, AgentPersona } from './state';
import { getPromptForPersona } from './prompts';
import { renderUI } from './ui';

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
    
    // Render side-by-side UI
    const combinedLines = renderUI(state.activePersona, state.isTaskListExpanded, theme);
    ctx.ui.setWidget("top", combinedLines);
    ctx.ui.setWidget("right", undefined); // Ensure we clear the old "right" widget if it existed
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
    let personaPrompt = getPromptForPersona(state.activePersona);
    
    // Add doc context instruction only once EVER for this project
    if (!state.docContextAnalyzed) {
      const docPath = path.join(process.cwd(), 'doc');
      if (fs.existsSync(docPath)) {
        personaPrompt += `\n\n[CONTEXT INITIALIZATION]: A "doc/" folder exists. Review its content to extract project architecture and logic. You only need to do this once for this project; acknowledge when done so you don't repeat this check.`;
        state.docContextAnalyzed = true; 
        savePersistentState(); // Persist the flag
      }
    }

    updateUI(ctx);
    
    // Append the persona to the base system prompt and force a hard context switch
    const fullSystemPrompt = event.systemPrompt + 
      "\n\n========================================================================\n" +
      "🔴 CRITICAL DIRECTIVE: PERSONA SWITCH 🔴\n" +
      "For this turn and all subsequent turns until stated otherwise, you MUST completely adopt the following persona:\n\n" +
      personaPrompt + "\n\n" +
      "IGNORE any previous roles or personas you assumed earlier in this chat history.\n" +
      "If the user asks who you are, you are STRICTLY the " + state.activePersona + ".\n" +
      "========================================================================";

    return { systemPrompt: fullSystemPrompt };
  });

  // Intercept keys
  pi.on("key", (event: any, ctx: any) => {
    // Note: 'event' is the key event (if Pi passes it that way).
    // Let's assume the signature is (key, ctx) since that's what was written before,
    // wait, I don't know the exact "key" event signature. Let's look for shortcuts.
  });

  // Since 'key' event might not exist, Pi has registerShortcut. Let's use registerShortcut!
  pi.registerShortcut("alt+t", {
    description: "Toggle Orchestrator Task List",
    handler: (ctx: any) => {
      state.isTaskListExpanded = !state.isTaskListExpanded;
      updateUI(ctx);
    }
  });

  pi.registerShortcut("alt+p", {
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

      if (ctx.hasUI) ctx.ui.notify("Created doc/ folder structure. Triggering agent analysis...", "success");

      // Automatically trigger the agent to start documenting
      pi.sendUserMessage(
        "URGENT: I have just initialized the Orchestrator. Please perform a complete analysis of the current project and generate detailed documentation in the 'doc/' folder. " +
        "Create 'doc/architecture/overview.md' for a high-level summary, document modules in 'doc/modules/', and document APIs or entry points in 'doc/api/'. " +
        "Use your specialized skills to ensure high-quality documentation."
      );
    }
  });

  // Initial UI render
  pi.on("session_start", (event: any, ctx: any) => {
    loadPersistentState();
    watchTasks();
    updateUI(ctx);
  });
}
