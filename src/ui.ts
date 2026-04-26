import { AgentPersona, state } from './state';
import { parseTasks } from './tasks';

/**
 * UI components for the Pi Agent Orchestrator.
 */

// Helper to colorize text using Pi's theme
const color = (theme: any, type: string, text: string) => {
  if (theme && theme.fg) {
    return theme.fg(type, text);
  }
  return text;
};

// Generates the square agent viewer (Premium Look)
const renderAgentBox = (persona: AgentPersona, theme: any): string[] => {
  const name = persona.toString().toUpperCase();
  const padding = ' '.repeat(Math.max(0, 16 - name.length));
  
  const top =    `╔══════════════════╗`;
  const middle = `║ ${name}${padding} ║`;
  const bottom = `╚══════════════════╝`;
  
  return [
    color(theme, "accent", top),
    color(theme, "accent", middle),
    color(theme, "accent", bottom)
  ];
};

export const renderUI = (persona: AgentPersona, isExpanded: boolean, theme: any): string[] => {
  const tasks = parseTasks();
  const agentLines = renderAgentBox(persona, theme);
  
  // If no tasks exist, only show the agent box
  if (tasks.length === 0) {
    return agentLines;
  }
  
  // Prepare tasks sidebar
  let taskLines: string[] = [];
  if (isExpanded) {
    taskLines.push(color(theme, "accent", " ╭────────────────╮ "));
    taskLines.push(color(theme, "accent", " │ 📋 TASKS  [‹]  │ "));
    taskLines.push(color(theme, "accent", " ╰────────────────╯ "));
    taskLines.push("");
    
    tasks.forEach(task => {
      const checkbox = task.isDone ? "󰄬 [x]" : "󰄱 [ ]";
      const taskText = ` ${checkbox} ${task.description}`;
      taskLines.push(task.isDone ? color(theme, "success", taskText) : color(theme, "text", taskText));
    });
  } else {
    taskLines = [
      "",
      color(theme, "accent", " 󰱒 TASK [›] "),
      color(theme, "muted",  " (Alt+T)    ")
    ];
  }
  
  // Combine side-by-side
  const combined: string[] = [];
  const maxLines = Math.max(agentLines.length, taskLines.length);
  const AGENT_WIDTH = 20; // Exact visible width of the agent box
  
  for (let i = 0; i < maxLines; i++) {
    const left = agentLines[i] || ' '.repeat(AGENT_WIDTH);
    const right = taskLines[i] || '';
    combined.push(`${left}    ${right}`);
  }
  
  return combined;
};
