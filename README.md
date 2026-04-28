# Pi Orchestrator 🤖🚀

**Pi Orchestrator** is a next-generation agentic extension for [Pi Agent Coder](https://pi.dev/). It transforms your terminal into an autonomous ecosystem led by a single **Master Orchestrator** that dynamically utilizes specialized skills to ensure a professional, end-to-end development lifecycle.

## 🌟 Key Features

- **Master Orchestrator**: A single, rational entity that manages the entire project lifecycle. No more switching roles—just intelligent, context-aware execution.
- **Skill-Based Orchestration**: The agent dynamically consults specialized skills (Architecture, Planning, Security, DevOps, Performance, etc.) based on the current task requirements.
- **Self-Questioning & Reasoning**: Built-in critical directives force the agent to analyze, question, and verify every major decision before execution, virtually eliminating hallucinations.
- **Dynamic Session-Start Intelligence**: Detects non-empty projects on session start and offers a full context analysis to synchronize your documentation and plans.
- **Sleek TUI Interface**: 
  - **Collapsible Sidebar**: A real-time, debounced task list that updates as you work.
  - **Zero Noise**: Minimalist UI that keeps you focused on the code.
- **Hardened Search**: Integrated `playwright_search` tool for autonomous, secure web research.

## 🛠 Installation

### Setup

Install the extension globally via npm:

```bash
npm install -g pi_orchestator
```

### Configure Pi

Add the package to your Pi Agent's `settings.json`:

```json
{
  "packages": [
    "npm:pi_orchestator"
  ]
}
```

Restart your Pi Agent. The Orchestrator will activate automatically!

### ⌨️ Shortcuts
- **`Alt+T`**: Toggle the Task List sidebar visibility.

## 🔄 Autonomous Workflow

1. **Project Survey**: Start a session in a non-empty project, and the Orchestrator will offer to analyze your codebase and update the `doc/` and `plan/` folders.
2. **"Ground Truth" Planning**: The Orchestrator maintains `plan/plan.md` and `plan/task.md` as the absolute source of truth.
3. **Skill Execution**: As tasks are tackled, the agent pulls in relevant skills (e.g., Security, Architecture) to ensure high-quality implementation.
4. **Final QA & Security**: Before marking the *last* task as completed, the Orchestrator performs a global security audit and project-wide regression test.
5. **Next Steps**: Once all tasks are `[x]`, the agent provides a final report and waits for the next feature request.

## 📁 Project Structure

The orchestrator manages these folders in your active project:
- `plan/`: Architectural plans (`plan.md`) and task lists (`task.md`).
- `doc/`: Professional documentation (`architecture/`, `modules/`, `api/`, `adr/`).
- `report/`: QA, Security, and performance reports.

## 📜 License
This project is licensed under the MIT License.
