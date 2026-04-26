# Pi Orchestrator 🤖🚀

**Pi Orchestrator** is a powerful agentic extension for [Pi Agent Coder](https://pi.dev/). It transforms your coding environment into a multi-agent workspace where three specialized AI personas collaborate to plan, develop, and secure your applications.

## 🌟 Key Features

- **Multi-Persona Orchestration**: Seamlessly switch between three senior roles:
  - **Planner**: Senior Software Engineer focused on architecture and task management.
  - **Developer**: Senior Fullstack Developer specializing in Clean Code and SOLID principles.
  - **Tester**: QA & Security Expert dedicated to bug hunting and vulnerability analysis.
- **Dynamic TUI Components**: 
  - **Agent Viewer**: A sleek, square box showing the currently active agent.
  - **Collapsible Sidebar**: A real-time task list on the right side of your chat.
- **Built-in Knowledge (Skills)**: Each agent follows industry-standard protocols defined in the `skills/` directory.
- **Persistent Progress**: State is tracked through local files (`plan/task.md`), ensuring continuity across sessions.

## 🛠 Installation

### Prerequisites
- [Pi Agent Coder](https://pi.dev/) installed on your system.
- Node.js and npm.

### Setup

#### Method 1: One-Liner (Remote)
Run this command for **Bash/Zsh**:
```bash
curl -sSL https://raw.githubusercontent.com/johancy96/pi_orchestator/main/install.sh | bash
```

Run this command for **Fish**:
```fish
curl -sSL https://raw.githubusercontent.com/johancy96/pi_orchestator/main/install.sh | bash
```
*(The script uses bash internally for compatibility)*

#### Method 2: From Repository (Local)
If you have already cloned the repository, simply run:
```bash
./install.sh
```

#### Method 3: Manual Clone
```bash
git clone https://github.com/johancy96/pi_orchestator.git
cd pi_orchestator
./install.sh
```

### What the installer does:
1. Builds the extension.
2. Links the package globally (`npm link`).
3. Automatically updates Pi's `settings.json` to enable the extension.

### Shortcuts
- **`Tab`**: Switch between Agent Personas (Planner → Developer → Tester).
- **`Ctrl+T`**: Toggle the Task List sidebar visibility.

### Commands
- **`/orchestrator_init`**: Analyzes the current project and generates a comprehensive documentation structure in the `doc/` folder.
  - *Note*: This command will not run if the project directory is empty.

### Workflow
1. **Plan**: Start as the **Planner** to generate `plan/plan.md` and `plan/task.md`.
2. **Execute**: Switch to the **Developer** to implement the plan and check off tasks.
3. **Secure**: Switch to the **Tester** to analyze the project and generate `report/report.md`.

## 📁 Extension Structure

- `src/`: TypeScript source code.
- `dist/`: Compiled JavaScript (distribution).
- `skills/`: Core knowledge base for the agents.

## 📂 Target Project Structure
The agents will automatically create and manage these folders in the project you are currently working on:

- `plan/`: Architectural plans (`plan.md`) and task lists (`task.md`).
- `report/`: QA and Security audit reports (`report.md`).

## 📜 License
This project is licensed under the ISC License.
