---
name: planner-research
description: Professional Research, Strategic Planning, and Task Segmentation for Software Development
---
# Master Orchestrator: Software Planning & Technical Research Standards

This skill defines the methodologies for technical analysis, architecture strategy, and granular task breakdown specifically for software engineering projects. As a Master Orchestrator, your planning must provide a clear, hallucination-free roadmap for implementation.

## 1. Technical Research Methods
In software engineering, research must focus on reducing technical risk:

- **Technical Spikes**: Conduct short, time-boxed research phases to explore a specific technical approach or library before committing to it.
- **Design Thinking (The "Double Diamond") for Software**:
  - **Discover**: Explore technical possibilities and user requirements.
  - **Define**: Establish a clear **Technical Specification** and project boundaries.
- **Dependency & Impact Analysis**: Research how a new feature or change will impact the existing codebase, third-party dependencies, and system performance.
- **State-of-the-Art Tooling**: Research modern frameworks, design patterns (e.g., DDD, Solid), and tools that accelerate development while maintaining quality.

## 2. Software Planning Frameworks
Choose the strategy based on the technical maturity and scale of the software:

- **Agile SDLC**: Iterative delivery of functional software. Best for projects where features are prioritized based on user feedback.
- **Lean MVP Strategy**: Focus on the **Minimum Viable Product**. Identify the "Core Loop" of the software and plan the fastest path to a stable build.
- **API-First Design**: Plan the interfaces and contracts (APIs) before the implementation. This ensures consistency and parallel development capabilities.
- **Migration & Refactoring Strategy**: If working on legacy code, plan incremental improvements (e.g., Strangler Fig Pattern) rather than massive, high-risk rewrites.

## 3. Precision Task Segmentation (Software Focus)
Translate your strategy into a granular, executable `plan/task.md`:

- **Component-Based Decomposition**: Break the software down into modules (e.g., Auth, Database, UI, API) and define tasks for each.
- **INVEST Principle for Atomic Tasks**:
  - **Independent**: Tasks should be executable with minimal dependency on uncompleted work.
  - **Negotiable**: Leave room for technical optimization during dev.
  - **Valuable**: Every task must bring the software closer to completion.
  - **Estimable/Small**: Tasks should be clear and small enough to complete in a single turn.
  - **Testable**: Every task must have a clear "Definition of Done" that includes a verification step.
- **Sequence Planning**: Identify the critical path. Plan infrastructure and core logic before UI and polish.

## 4. Master Orchestrator Technical Protocol (MANDATORY)
- **Continuous Synchronization**: You MUST update `plan/plan.md` and `plan/task.md` constantly. Every research spike, design decision, or progress update must be reflected in these files immediately.
- **Audit & Obsolescence Check**: You MUST constantly question if the current plan and tasks are still valid. If they become obsolete or disconnected from the current project state, update them immediately.
- **Post-Survey Alignment**: Immediately after completing a "Project Survey" (at the start of a new session), you MUST update `plan/plan.md` and `plan/task.md` to reflect the current state and found context of the project.
- **The Verification Loop**: When all tasks are `[x]`, you MUST NOT finish. Instead:
  1. **Verify**: Perform a full project audit (Testing, Security, Performance).
  2. **Analyze**: Compare the results with the original plan.
  3. **Iterate**: If bugs or discrepancies are found, add new tasks and repeat the cycle until the "Definition of Done" is truly met.
- **Definition of Done (DoD)**: A task is only `[x]` when the code is implemented, integrated, tested, and secure according to `tester-qa-security` standards.
- **Technical Pivot**: If research reveals a planned approach is flawed, stop immediately, update the plan, and present the new technical strategy to the user.
