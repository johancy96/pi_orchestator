---
name: tester-qa-security
description: Professional QA, Testing Strategies, and Software Cybersecurity (DevSecOps)
---
# Master Orchestrator: QA & Cybersecurity Standards

This skill defines the protocols for ensuring the highest quality of software through rigorous testing and a "Security First" mindset. As a Master Orchestrator, you must ensure that every feature is not only functional but also hardened against attacks.

## 1. Advanced Testing Strategies
Balance speed and confidence by choosing the right testing model:

- **The Testing Pyramid**: Focus on a broad base of **Unit Tests** (fast, isolated), a middle layer of **Integration Tests** (component interaction), and a thin top layer of **E2E Tests** (user journeys).
- **The Testing Trophy**: Prioritize **Static Analysis** (linters/types) and **Integration Tests** to maximize ROI and mimic real-world usage without fragility.
- **TDD (Test-Driven Development)**: Write tests *before* code to drive design and ensure 100% logic coverage.
- **BDD (Behavior-Driven Development)**: Use "Given/When/Then" scenarios to align technical implementation with business requirements.

## 2. Cybersecurity & DevSecOps (Shift Left)
Security is not a final phase; it is integrated into every step of development:

- **Secure SDLC**: Integrate security from the start. Perform **Threat Modeling** ("How could this be abused?") before writing code.
- **SAST (Static Application Security Testing)**: Scan code for vulnerabilities (Injection, secrets, hardcoded keys) during development.
- **DAST (Dynamic Analysis)**: Test the running application for execution-time vulnerabilities.
- **SCA (Software Composition Analysis)**: Scan third-party dependencies (npm, pip, etc.) for known CVEs.
- **Secrets Management**: Never commit API keys or credentials. Use environment variables and pre-commit hooks (e.g., Gitleaks).

## 3. Cybersecurity Protocols (OWASP Standards)
Adhere to industry-standard protocols to harden the application:

- **OWASP Top 10**: Proactively mitigate the most critical risks (Injection, Broken Access Control, Cryptographic Failures, etc.).
- **OWASP ASVS (Verification Standard)**:
  - **V2 Authentication**: Use standard identity providers; never roll your own crypto/auth.
  - **V4 Access Control**: Enforce authorization **server-side** for every request.
  - **V5 Validation & Encoding**: Treat all user input as untrusted. Use parameterized queries and output encoding.
- **Principle of Least Privilege**: Ensure every component has the minimum access necessary.
- **Secure Logging**: Log security events (failed logins, access denials) without leaking sensitive PII or system internals.

## 4. Master Orchestrator QA Protocol
- **Definition of Done (DoD)**: A task in `plan/task.md` is only `[x]` when it has passed relevant unit/integration tests and a security audit.
- **Final Security Pass**: Before marking the *final* task of a project, perform a global security audit and a full regression test of all critical user journeys.
- **Automated Verification**: Leverage CI/CD concepts to ensure tests and security scans run on every significant change.
- **Doubt Handling**: If unsure about a security pattern or a testing strategy, consult your **Web Intelligence** protocol immediately.
