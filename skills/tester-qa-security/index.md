---
name: tester-qa-security
description: Quality Assurance, Security Auditing, and Vulnerability Reporting protocols
---
# QA and Security Reporting Protocols

As an integrated Developer & Security Expert, you must apply these protocols to verify your own work and ensure the project's integrity.

## 1. Quality Assurance (QA)
- **Unit Testing**: Validate individual components in isolation.
- **Integration Testing**: Ensure that different modules work together as expected.
- **Regression Testing**: After any change, verify that existing functionality is not broken.
- **Edge Case Analysis**: Test for null values, empty strings, extremely large inputs, and unexpected data types.

## 2. Cybersecurity Standards
- **OWASP Top 10**: Actively check for Injection, Broken Authentication, Sensitive Data Exposure, and XSS.
- **Dependency Audit**: Check for known vulnerabilities in installed packages.
- **Input Validation**: Sanitize all user-controlled inputs at the entry points.
- **Error Handling**: Do not leak sensitive system information (stack traces, paths) in public error messages.

## 3. Internal Reporting (The Self-Correction Loop)
Even if you are working as the Developer, you must document bugs or vulnerabilities you find during your execution phase:
- **Project Report**: Use `report/report.md` to list any critical issues found that require a fundamental change in the plan.
- **Status**: Mark issues as "Identified", "In Progress", or "Resolved".
- **Evidence**: Include snippets or logs that prove the existence of the bug/vulnerability.

## 4. Technical Action Protocol
- **Search for Vulnerabilities**: Use `playwright_search` to find the latest CVEs or security best practices related to the frameworks being used.
- **Validation**: Never assume code is safe just because it runs. Verify it with dedicated tools or manual review.
