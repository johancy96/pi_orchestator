---
name: documentation-practices
description: Best practices and standards for documenting software projects
---
# Software Project Documentation Best Practices

As an agent tasked with documenting a software project, you must follow these professional standards to ensure the documentation is clear, maintainable, and highly useful for developers and stakeholders.

## 1. Documentation Structure
- **High-Level Architecture (`doc/architecture/overview.md`)**: Explain the "Why" and "How" of the system. Describe the core components, their responsibilities, and how they interact.
- **Module Documentation (`doc/modules/`)**: Document individual components, services, or logical units. Include their purpose, internal state, and dependencies.
- **API and Entry Points (`doc/api/`)**: Document public interfaces, endpoints, or main functions. Include expected inputs, outputs, and side effects.

## 2. Writing Principles
- **Clarity and Conciseness**: Use direct, unambiguous language. Avoid unnecessary jargon unless it is industry-standard.
- **Context Over Code**: Do not just repeat what the code does. Explain *why* it does it, design decisions, edge cases handled, and potential pitfalls.
- **Progressive Disclosure**: Start with a high-level summary before diving into deep technical details. Allow readers to stop reading once they have the level of detail they need.

## 3. Visual Aids and Formatting
- **Mermaid Diagrams**: Use Mermaid.js diagrams to visualize complex workflows, architecture diagrams, or state machines. This is highly recommended for `overview.md`.
- **Code Snippets**: Provide minimal, reproducible code snippets to demonstrate how an API or module should be used.
- **Markdown Features**: Liberally use tables for structured data, bold text for emphasis, and proper heading hierarchies (H1, H2, H3).

## 4. Maintenance and Accuracy
- **Truthfulness**: Ensure documentation strictly matches the current state of the codebase. Never hallucinate features that don't exist yet.
- **Actionable Steps**: When documenting setup or usage, provide exact commands that the user can copy-paste.

## 5. Execution Protocol
- **Analyze First**: Before writing, thoroughly read the source files relevant to the module you are documenting.
- **Iterative Updates**: If a system spans multiple files, document it iteratively, ensuring consistency across all documentation files.
