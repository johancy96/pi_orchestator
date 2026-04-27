import * as fs from 'fs';
import * as path from 'path';
import { state, AgentPersona } from './state';
import { getPromptForPersona } from './prompts';
import { renderUI } from './ui';
import { registerWebSearchTool } from './tools/webSearch';
import { parseTasks } from './tasks';

/**
 * Main entry point for the Pi extension.
 */
export default function (pi: any) {
  
  const taskFilePath = path.join(process.cwd(), 'plan', 'task.md');
  let uiContext: any = null;

  // Register the custom Web Search tool
  registerWebSearchTool(pi);

  // Update the UI
  const updateUI = (ctx: any) => {
    if (!ctx || !ctx.ui) return;
    uiContext = ctx;
    const theme = ctx.ui.theme;
    
    // Render Task List UI
    const combinedLines = renderUI(state.isTaskListExpanded, theme);
    ctx.ui.setWidget("top", combinedLines);
    ctx.ui.setWidget("right", undefined); 
  };

  // Watch for task.md changes with debounce
  let watchTimeout: NodeJS.Timeout | null = null;
  const watchTasks = () => {
    const taskDir = path.dirname(taskFilePath);
    if (fs.existsSync(taskDir)) {
      fs.watch(taskDir, (event, filename) => {
        if (filename === 'task.md') {
          if (watchTimeout) clearTimeout(watchTimeout);
          watchTimeout = setTimeout(() => {
            updateUI(uiContext);
          }, 150);
        }
      });
    }
  };

  // Listen for agent start to inject dynamic personas
  pi.on("before_agent_start", (event: any, ctx: any) => {
    // 1. Dynamic Orchestrator Logic
    const currentTasks = parseTasks();
    const hasUncompletedTasks = currentTasks.some((t: any) => !t.isDone);
    const activePersona = hasUncompletedTasks ? AgentPersona.DEVELOPER : AgentPersona.PLANNER;
    
    let personaPrompt = getPromptForPersona(activePersona);
    
    // 2. New Session Detection & Project Survey Logic
    const isNewSession = !ctx.usage || ctx.usage.totalTokens === 0;
    
    if (isNewSession && activePersona === AgentPersona.PLANNER) {
      // Efficiently check for project content
      const files = fs.readdirSync(process.cwd());
      const hasContent = files.some(f => !['.git', 'node_modules', '.pi', 'package-lock.json'].includes(f));

      if (hasContent) {
        personaPrompt += `\n\n[NEW SESSION DETECTED]: This is a fresh session. Since the project is not empty, you MUST ask the user if they want you to perform a full project survey to enter into context.
        - If they say YES: Trigger a full analysis using your "skills/documentation-practices/index.md" skills. Update the 'doc/' folder as needed.
        - If they say NO: Ignore the survey and proceed directly.
        Do not perform analysis until the user gives explicit consent in this session.`;
      }
    }

    // 3. UI Synchronization
    updateUI(ctx);
    
    // 4. System Prompt Injection (Force hard context switch)
    const fullSystemPrompt = `${event.systemPrompt}

========================================================================
🔴 CRITICAL DIRECTIVE: ORCHESTRATOR ACTIVE 🔴
You are the dynamic Pi Orchestrator. Adopting persona for this turn:

${personaPrompt}

IGNORE any previous roles. You are STRICTLY the ${activePersona}.
========================================================================`;

    return { systemPrompt: fullSystemPrompt };
  });

  // Shortcuts
  pi.registerShortcut("alt+t", {
    description: "Toggle Orchestrator Task List",
    handler: (ctx: any) => {
      state.isTaskListExpanded = !state.isTaskListExpanded;
      updateUI(ctx);
    }
  });

  // Lifecycle Initialization
  pi.on("session_start", (event: any, ctx: any) => {
    watchTasks();
    updateUI(ctx);
  });
}
