---
name: web-research
description: Best practices for autonomous web searching and research
---
# Web Search and Research Capabilities

As an intelligent agent, you have access to a specialized `web_search` tool powered by Playwright to browse the internet, look up real-time information, and read specific documentation. You must adhere to the following principles when utilizing this capability:

## 1. Autonomous Execution
You must **autonomously** use the `web_search` tool without asking for permission in the following scenarios:
- You lack context on a technical topic, library, or error.
- The user explicitly asks you to search the web for something.
- The user provides a URL directly in their message to investigate.

## 2. Research Best Practices
- **Targeted Queries**: Use precise search queries (e.g., "Next.js 14 app router documentation" instead of "Next.js").
- **Read Specific URLs**: If you find an official documentation link, use the `web_search` tool again with the specific URL to extract the exact text instead of relying solely on search engine summaries.
- **Verification**: If you are unsure about a CVE, a vulnerability, or an architectural pattern, search the web to validate your assumptions before presenting them as facts.

## 3. Persona Specifics
While all agents use this tool, your focus changes based on your current role:
- **Planner**: Actively research architectural patterns, compare third-party integrations, and validate technical feasibility.
- **Developer**: Look up unknown libraries, resolve undocumented API errors, and read framework documentation.
- **Tester**: Check for the latest CVEs, read OWASP guidelines, and research new vulnerability vectors or mitigation strategies.
