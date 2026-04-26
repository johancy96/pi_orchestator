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
export const renderAgentBox = (persona: AgentPersona, theme: any): string[] => {
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

// Generates the expanded task list sidebar
export const renderTaskListSidebar = (theme: any): string[] => {
  const tasks = parseTasks();
  const lines: string[] = [];
  
  // Header with collapse hint
  lines.push(color(theme, "accent", " ╭────────────────╮ "));
  lines.push(color(theme, "accent", " │ 📋 TASKS  [‹]  │ "));
  lines.push(color(theme, "accent", " ╰────────────────╯ "));
  lines.push("");
  
  if (tasks.length === 0) {
    lines.push(color(theme, "muted", "   (No tasks yet)   "));
  } else {
    tasks.forEach(task => {
      const checkbox = task.isDone ? "󰄬 [x]" : "󰄱 [ ]";
      const taskText = ` ${checkbox} ${task.description}`;
      lines.push(task.isDone ? color(theme, "success", taskText) : color(theme, "text", taskText));
    });
  }
  
  return lines;
};

// Generates the collapsed task list (just the button)
export const renderTaskListCollapsed = (theme: any): string[] => {
  return [
    "",
    color(theme, "accent", " 󰱒 TASK [›] "),
    color(theme, "muted",  " (Alt+T)    ")
  ];
};
