
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

export const renderUI = (isExpanded: boolean, theme: any): string[] => {
  const tasks = parseTasks();
  
  if (tasks.length === 0) {
    return [];
  }
  
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
  
  return taskLines;
};
