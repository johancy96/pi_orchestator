import * as fs from 'fs';
import * as path from 'path';
import { state, AgentPersona } from './state';
import { getPromptForPersona } from './prompts';
import { renderUI } from './ui';
import { registerWebSearchTool } from './tools/webSearch';

/**
 * Main entry point for the Pi extension.
 */
export default function (pi: any) {
  
  const taskFilePath = path.join(process.cwd(), 'plan', 'task.md');
  let uiContext: any = null;

  // Register the custom Web Search tool
  registerWebSearchTool(pi);

  const stateFilePath = path.join(process.cwd(), '.pi_orchestrator_state.json');

  // Load persistent state
  const loadPersistentState = () => {
    // Persistent state logic removed (dynamic session-based analysis now used)
  };

  // Save persistent state
  const savePersistentState = () => {
    // Persistent state logic removed
  };

  // Update the UI
  const updateUI = (ctx: any) => {
    if (!ctx || !ctx.ui) return;
    uiContext = ctx;
    const theme = ctx.ui.theme;
    
    // Render side-by-side UI
    const combinedLines = renderUI(state.isTaskListExpanded, theme);
    ctx.ui.setWidget("top", combinedLines);
    ctx.ui.setWidget("right", undefined); // Ensure we clear the old "right" widget if it existed
  };

  // Watch for task.md changes to update the UI dynamically
  let watchTimeout: NodeJS.Timeout | null = null;
  const watchTasks = () => {
    if (fs.existsSync(path.dirname(taskFilePath))) {
      fs.watch(path.dirname(taskFilePath), (event, filename) => {
        if (filename === 'task.md') {
          if (watchTimeout) clearTimeout(watchTimeout);
          watchTimeout = setTimeout(() => {
            updateUI(uiContext);
          }, 150); // 150ms debounce
        }
      });
    }
  };

  // Listen for agent start to inject the persona's prompt
  pi.on("before_agent_start", (event: any, ctx: any) => {
    
    // Dynamic Orchestrator Logic (The Golden Rule)
    const { parseTasks } = require('./tasks');
    const currentTasks = parseTasks();
    const hasUncompletedTasks = currentTasks.some((t: any) => !t.isDone);
    
    // If there are pending tasks, force Developer persona. Otherwise, Planner.
    const activePersona = hasUncompletedTasks ? AgentPersona.DEVELOPER : AgentPersona.PLANNER;
    
    let personaPrompt = getPromptForPersona(activePersona);
    
    // New Session Detection (Tokens at Zero)
    const isNewSession = !ctx.usage || ctx.usage.totalTokens === 0;
    
    if (isNewSession && activePersona === AgentPersona.PLANNER) {
      personaPrompt += `\n\n[NEW SESSION DETECTED]: This is a fresh session. You MUST ask the user if they want you to perform a full project survey to enter into context.
      - If they say YES: Trigger a full analysis using your "skills/documentation-practices/index.md" skills and generate/update the 'doc/' folder.
      - If they say NO: Ignore the survey and proceed directly with their requests.
      Do not perform any analysis until the user gives explicit consent in this session.`;
    }

    updateUI(ctx);
    
    // Append the persona to the base system prompt and force a hard context switch
    const fullSystemPrompt = event.systemPrompt + 
      "\n\n========================================================================\n" +
      "🔴 CRITICAL DIRECTIVE: ORCHESTRATOR ACTIVE 🔴\n" +
      "You are the dynamic Pi Orchestrator. Based on the current project state, you MUST completely adopt the following persona for this turn:\n\n" +
      personaPrompt + "\n\n" +
      "IGNORE any previous roles or personas you assumed earlier in this chat history.\n" +
      "If the user asks who you are, you are STRICTLY the " + activePersona + ".\n" +
      "========================================================================";

    return { systemPrompt: fullSystemPrompt };
  });

  // Intercept keys
  pi.on("key", (event: any, ctx: any) => {
  });

  // Since 'key' event might not exist, Pi has registerShortcut. Let's use registerShortcut!
  pi.registerShortcut("alt+t", {
    description: "Toggle Orchestrator Task List",
    handler: (ctx: any) => {
      state.isTaskListExpanded = !state.isTaskListExpanded;
      updateUI(ctx);
    }
  });

  // Initial UI render
  pi.on("session_start", (event: any, ctx: any) => {
    loadPersistentState();
    watchTasks();
    updateUI(ctx);
  });
}
