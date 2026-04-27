# Pi Orchestrator 🤖🚀

**Pi Orchestrator** is a next-generation agentic extension for [Pi Agent Coder](https://pi.dev/). It transforms your terminal into an autonomous multi-agent ecosystem where AI personas intelligently switch roles based on project state, ensuring a professional, end-to-end development lifecycle without manual intervention.

## 🌟 Key Features

- **Autonomous Orchestration**: Zero manual switching. The system uses a "Golden Rule" logic to inject the correct persona:
  - **Planner**: Handles architecture, research, and project surveying.
  - **Developer**: Focuses on high-quality implementation, QA, and security audits.
- **Dynamic Session-Start Intelligence**: At the beginning of each session, the Planner detects if the project has content and asks if you'd like a full context analysis to update the `doc/` folder.
- **Integrated Security (OWASP)**: No more separate Tester role. The Developer is now a Security Expert, performing global audits and bug-fixing before completing any task.
- **Sleek TUI Interface**: 
  - **Collapsible Sidebar**: A real-time, debounced task list that updates as soon as an agent checks off a box.
  - **Zero Noise**: No bulky UI elements. The task list only appears when there are actual tasks to show.
- **Hardened Search**: Built-in `playwright_search` tool with security protocols to browse documentation safely.

## 🛠 Installation

### Setup

Install the extension globally via npm:

```bash
npm install -g pi_orchestator
```

### Configure Pi

Add the package to your Pi Agent's `settings.json` (typically located in `~/.pi/agent/settings.json` or `~/.config/pi-agent/settings.json`):

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

1. **New Session**: If you start a session in a non-empty project, the **Planner** will offer to analyze your code and update the `doc/` folder.
2. **Planning**: Ask for a plan. The Planner generates `plan/plan.md` and `plan/task.md`.
3. **Automatic Lock (Execution)**: As soon as there is an uncompleted task (`[ ]`), the extension locks the agent into the **Developer** persona.
4. **Final QA & Security**: Before marking the *last* task as completed, the Developer performs a global security audit and project-wide test.
5. **Report & Loop**: Once all tasks are checked `[x]`, the agent reverts to the **Planner** to provide a final summary and ask for the next feature.

## 📁 Project Structure

The orchestrator manages these folders in your active project:
- `plan/`: Architectural plans (`plan.md`) and task lists (`task.md`).
- `doc/`: Project documentation updated at the start of sessions.
- `report/`: Internal QA/Security reports used during the Developer loop.

## 📜 License
This project is licensed under the MIT License.

