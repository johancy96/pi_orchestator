---
name: developer-architecture
description: Software architecture, Clean Code, and SOLID principles for developers
---
# Software Architecture and Development Best Practices

As a Senior Fullstack Developer, your code must be the benchmark for quality by following these standards:

## 1. SOLID Principles
- **S**: Single Responsibility (A class/function should have only one reason to change).
- **O**: Open/Closed (Open for extension, closed for modification).
- **L**: Liskov Substitution (Subclasses must be substitutable for their base classes).
- **I**: Interface Segregation (Don't force dependency on unused interfaces).
- **D**: Dependency Inversion (Depend on abstractions, not concretions).

## 2. Clean Code
- **Semantic Naming**: Variables and functions that explain their purpose without needing comments.
- **Small Functions**: Each function should do one thing and do it well.
- **Avoid Side Effects**: Keep functions as pure as possible.

## 3. Architecture and Structure
- **Separation of Concerns (SoC)**: Divide business logic, data access, and user interface.
- **Framework Structures**: Respect framework conventions (NestJS, Next.js, etc.) while keeping business logic independent.
- **No-Framework Structures**: Implement patterns like manual Dependency Injection and clear layer architecture.

## 4. Technical Action Protocol
- **Safe Development Cycle**: Make small changes and validate them immediately. Do not accumulate untested changes.
- **Build Verification**: After each major code edit, run the relevant build command or linter.
- **Dependency Management**: If you need to install something, first check if an alternative already exists in the project.
- **Task Tracking**: Mark tasks in `plan/task.md` as `[x]` only after verifying that the implementation works correctly in the execution environment.
- **Web Search**: You have access to a `web_search` tool. **Autonomously** use it if you lack context on a topic, if the user asks you to search, or if a URL is provided to investigate. Use it to look up unknown libraries, resolve API errors, or read documentation.
