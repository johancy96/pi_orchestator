"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const state_1 = require("./state");
const prompts_1 = require("./prompts");
const ui_1 = require("./ui");
/**
 * Main entry point for the Pi extension.
 */
function default_1(pi) {
    const taskFilePath = path.join(process.cwd(), 'plan', 'task.md');
    let uiContext = null;
    const stateFilePath = path.join(process.cwd(), '.pi_orchestrator_state.json');
    // Load persistent state
    const loadPersistentState = () => {
        if (fs.existsSync(stateFilePath)) {
            try {
                const saved = JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
                state_1.state.docContextAnalyzed = !!saved.docContextAnalyzed;
            }
            catch (e) {
                console.error('Error loading persistent state:', e);
            }
        }
    };
    // Save persistent state
    const savePersistentState = () => {
        try {
            fs.writeFileSync(stateFilePath, JSON.stringify({ docContextAnalyzed: state_1.state.docContextAnalyzed }));
        }
        catch (e) {
            console.error('Error saving persistent state:', e);
        }
    };
    // Update the UI
    const updateUI = (ctx) => {
        if (!ctx)
            return;
        uiContext = ctx;
        const theme = ctx.ui.theme;
        // 1. Render Agent Box (Top)
        const agentBoxLines = (0, ui_1.renderAgentBox)(state_1.state.activePersona, theme);
        ctx.ui.setWidget("top", agentBoxLines);
        // 2. Render Task List (Right)
        if (state_1.state.isTaskListExpanded) {
            const taskListLines = (0, ui_1.renderTaskListSidebar)(theme);
            ctx.ui.setWidget("right", taskListLines);
        }
        else {
            const collapsedLines = (0, ui_1.renderTaskListCollapsed)(theme);
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
    pi.on("before_agent_start", (ctx) => {
        let prompt = (0, prompts_1.getPromptForPersona)(state_1.state.activePersona);
        // Add doc context instruction only once EVER for this project
        if (!state_1.state.docContextAnalyzed) {
            const docPath = path.join(process.cwd(), 'doc');
            if (fs.existsSync(docPath)) {
                prompt += `\n\n[CONTEXT INITIALIZATION]: A "doc/" folder exists. Review its content to extract project architecture and logic. You only need to do this once for this project; acknowledge when done so you don't repeat this check.`;
                state_1.state.docContextAnalyzed = true;
                savePersistentState(); // Persist the flag
            }
        }
        ctx.agent.setSystemPrompt(prompt);
        updateUI(ctx);
    });
    // Intercept keys
    pi.on("key", (key, ctx) => {
        // Tab to switch personas
        if (key.isSpecial("tab")) {
            state_1.state.activePersona = (0, state_1.getNextPersona)(state_1.state.activePersona);
            updateUI(ctx);
            return true;
        }
        // Ctrl+T or similar to toggle task list (Since mouse click is not supported in TUI API)
        if (key.isSpecial("t") && key.ctrl) {
            state_1.state.isTaskListExpanded = !state_1.state.isTaskListExpanded;
            updateUI(ctx);
            return true;
        }
        return false;
    });
    // Register the /orchestrator_init command
    pi.on("command", async (command, ctx) => {
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
    pi.on("session_start", (ctx) => {
        loadPersistentState();
        watchTasks();
        updateUI(ctx);
    });
}
