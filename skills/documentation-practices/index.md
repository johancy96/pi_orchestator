---
name: documentation-practices
description: Professional Software Documentation Standards (Docs-as-Code, Diátaxis, ADRs)
---
# Master Orchestrator: Software Documentation Standards

This skill defines the methodologies for creating high-quality, maintainable, and useful documentation. As a Master Orchestrator, you must ensure that the "Ground Truth" of the project is supported by documentation that captures not only the "What" but the "Why."

## 1. Documentation Structure & Architecture
You MUST organize documentation within the `doc/` directory following this architecture:

- **High-Level Architecture (`doc/architecture/overview.md`)**: The entry point for the system's "Why" and "How." Contains the **Explanation** (Understanding-Oriented) part of Diátaxis.
- **Module Documentation (`doc/modules/`)**: Detailed documentation of individual services, logical units, or packages. Follows the **How-To** and **Reference** categories.
- **API and Entry Points (`doc/api/`)**: Technical descriptions of public interfaces and endpoints. Uses **OpenAPI/Swagger** standards for **Reference** information.
- **Decision Records (`doc/adr/`)**: Stores **Architecture Decision Records (ADRs)** to preserve the history and justification of technical choices.

## 2. Docs-as-Code & Diátaxis Framework
Apply these writing philosophies across the structure above:
- **Docs-as-Code**: Version control everything. Update documentation in the same commit as the code changes.
- **Diátaxis Categories**:
  - **Tutorials**: Lessons for newcomers.
  - **How-To Guides**: Practical recipes for tasks.
  - **Reference**: Technical specs (APIs, parameters).
  - **Explanation**: High-level concepts and architecture.

## 3. Architecture Decision Records (ADRs)
When making a critical choice (e.g., changing a database, selecting a framework):
- **Structure**: Context, Decision, Status (Proposed/Accepted/Deprecated), and Consequences.
- **Immutability**: New decisions supercede old ones by creating a new ADR, never by modifying an accepted one.

## 4. Visual Aids and Formatting
- **Mermaid Diagrams**: Use Mermaid.js diagrams (architecture, sequences, states) to keep visuals version-controlled.
- **Context Over Code**: Explain *why* a design decision was made rather than just repeating what the code does.
- **Markdown Features**: Use tables for data, bold text for emphasis, and proper H1-H3 hierarchies.

## 5. Master Orchestrator Documentation Protocol
- **Initial Project Survey**: On a new session in a non-empty project, perform a **Full Context Survey**. Generate or update the `doc/` directory according to the architecture above.
- **Context Synchronization**: Immediately after the survey, update `plan/plan.md` and `plan/task.md` to align with the documented state.
- **Continuous Updates**: If a task implementation deviates from the documentation, update the relevant `doc/` file and/or create an ADR immediately.
