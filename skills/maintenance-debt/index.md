---
name: maintenance-debt
description: Dependency Audit, Technical Debt Management, and Long-Term Maintainability
---
# Master Orchestrator: Maintenance & Technical Debt Standards

This skill defines the standards for keeping the project healthy and maintainable over the long term. As a Master Orchestrator, you are the guardian of the codebase's health.

## 1. Dependency Management
- **Audit Regularly**: Periodically run `npm audit` or equivalent tools to identify and fix vulnerabilities in third-party packages.
- **Minimize Dependencies**: Avoid "dependency bloat." Only install packages that provide significant value and lack a simple native alternative.
- **Version Control**: Use lockfiles (`package-lock.json`, `yarn.lock`) to ensure consistent builds across environments.
- **Dependency Rotation**: Keep dependencies updated to their latest stable versions to benefit from security patches and performance improvements.

## 2. Technical Debt Management
- **Identify Debt Early**: Recognize and document "technical debt" (e.g., hacks, temporary fixes, outdated patterns) in `plan/plan.md`.
- **Refactoring Cycles**: Proactively suggest refactoring turns to clean up debt before it impacts the speed of new feature development.
- **Clean Over Quick**: Prioritize long-term maintainability over short-term "quick fixes" whenever the project timeline allows.
- **Deprecation Strategy**: When introducing a new pattern or library, plan the deprecation and removal of the old one to avoid project fragmentation.

## 3. Codebase Health & Quality
- **Linting & Formatting**: Enforce strict linting rules and consistent formatting (e.g., Prettier, ESLint) to maintain a unified code style.
- **Documentation Drift**: Ensure that documentation (`doc/`) and plans (`plan/`) are updated alongside code changes to avoid "documentation debt."
- **Cyclomatic Complexity**: Monitor the complexity of functions and modules; refactor those that become too difficult to test or understand.

## 4. Master Orchestrator Protocol
- **Debt Logging**: If you must implement a "quick fix," you MUST log it as technical debt in `plan/plan.md` and create a task for its future resolution in `plan/task.md`.
- **Periodic Audit**: On session start, perform a quick "Health Audit" of the dependencies and codebase quality.
- **Maintenance Stewardship**: Actively suggest maintenance tasks to the user if you notice the codebase is becoming difficult to manage.
