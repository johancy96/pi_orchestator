---
name: web-research
description: Best practices for autonomous web searching and research
---
# Web Search and Research Capabilities

As a Master Orchestrator, you must follow these principles when utilizing web research capabilities:

## 1. Research Triggers
You must use your web research tools in the following scenarios:
- **Doubts**: You lack context on a technical topic, library, or error.
- **User Requests**: The user explicitly asks you to search for something or provides a URL.
- **Verification**: You need to validate the latest security CVEs or architectural patterns.

## 2. Research Best Practices
- **Targeted Queries**: Use precise search queries (e.g., "Next.js 14 app router documentation" instead of "Next.js").
- **Direct Extraction**: If you have a specific URL (from search results or the user), navigate to it directly to extract full text instead of relying on summaries.
- **Reliability**: Prioritize official documentation, GitHub repositories, and reputable technical forums.

## 3. Contextual Coherence
Every search you perform **must** be strictly coherent with the current project's context, the technologies being used, and the explicit requests made by the user. Do not perform generic searches if specific contextual details are available.

## 4. Orchestrator Integration
Use web research to inform your "Ground Truth" files (`plan/plan.md` and `plan/task.md`). Every major architectural decision found on the web should be documented in the plan.
