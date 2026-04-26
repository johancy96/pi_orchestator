"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTaskListCollapsed = exports.renderTaskListSidebar = exports.renderAgentBox = void 0;
const tasks_1 = require("./tasks");
/**
 * UI components for the Pi Agent Orchestrator.
 */
// Helper to colorize text using Pi's theme
const color = (theme, type, text) => {
    if (theme && theme.fg) {
        return theme.fg(type, text);
    }
    return text;
};
// Generates the square agent viewer (Premium Look)
const renderAgentBox = (persona, theme) => {
    const name = persona.toString().toUpperCase();
    const padding = ' '.repeat(Math.max(0, 16 - name.length));
    const top = `╔══════════════════╗`;
    const middle = `║ ${name}${padding} ║`;
    const bottom = `╚══════════════════╝`;
    return [
        color(theme, "accent", top),
        color(theme, "accent", middle),
        color(theme, "accent", bottom)
    ];
};
exports.renderAgentBox = renderAgentBox;
// Generates the expanded task list sidebar
const renderTaskListSidebar = (theme) => {
    const tasks = (0, tasks_1.parseTasks)();
    const lines = [];
    // Header with collapse hint
    lines.push(color(theme, "accent", " ╭────────────────╮ "));
    lines.push(color(theme, "accent", " │ 📋 TASKS  [‹]  │ "));
    lines.push(color(theme, "accent", " ╰────────────────╯ "));
    lines.push("");
    if (tasks.length === 0) {
        lines.push(color(theme, "muted", "   (No tasks yet)   "));
    }
    else {
        tasks.forEach(task => {
            const checkbox = task.isDone ? "󰄬 [x]" : "󰄱 [ ]";
            const taskText = ` ${checkbox} ${task.description}`;
            lines.push(task.isDone ? color(theme, "success", taskText) : color(theme, "primary", taskText));
        });
    }
    return lines;
};
exports.renderTaskListSidebar = renderTaskListSidebar;
// Generates the collapsed task list (just the button)
const renderTaskListCollapsed = (theme) => {
    return [
        "",
        color(theme, "accent", " 󰱒 TASK [›] "),
        color(theme, "muted", " (Ctrl+T)   ")
    ];
};
exports.renderTaskListCollapsed = renderTaskListCollapsed;
