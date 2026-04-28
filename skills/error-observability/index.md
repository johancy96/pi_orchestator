---
name: error-observability
description: Centralized Error Handling, Logging, Monitoring, and System Reliability
---
# Master Orchestrator: Error Handling & Observability Standards

This skill defines the standards for creating resilient and transparent systems. As a Master Orchestrator, you must ensure that errors are handled gracefully and that the system provides clear visibility into its health.

## 1. Professional Error Handling
- **Graceful Degradation**: Design systems that continue to function (perhaps with reduced features) even when a component fails.
- **Centralized Handling**: Use global error handlers or middleware to catch and manage unhandled exceptions consistently.
- **Custom Exceptions**: Define specific exception classes to differentiate between domain errors (e.g., `InsufficientFundsError`) and technical errors (e.g., `DatabaseConnectionError`).
- **Retry & Circuit Breaker**: Implement automated retries for transient errors and circuit breakers to prevent cascading failures.

## 2. Observability & Logging
- **Structured Logging**: Use JSON or other structured formats for logs to enable easy searching and analysis in monitoring tools.
- **Log Levels**: Use levels correctly: `DEBUG` (dev only), `INFO` (milestones), `WARN` (recoverable issues), `ERROR` (action required).
- **Contextual Metadata**: Include correlation IDs, timestamps, and environment details in every log message to facilitate tracing across services.
- **Health Endpoints**: Every service must expose a `/health` or `/status` endpoint for monitoring tools.

## 3. Monitoring & Alerting
- **Key Metrics (SLIs/SLOs)**: Define Service Level Indicators (e.g., latency, error rate, throughput) and monitor them against objectives.
- **Distributed Tracing**: Use tools (e.g., OpenTelemetry) to track requests as they move through complex, multi-service systems.
- **Proactive Alerting**: Set up alerts for critical errors or performance degradation before they impact the user.

## 4. Master Orchestrator Protocol
- **Reliability Planning**: Explicitly plan the error handling strategy in `plan/plan.md`.
- **Log Verification**: Before completing a task, verify that critical operations are logged correctly and that error messages are generic for users but descriptive for developers.
- **Post-Mortem Thinking**: During the self-questioning phase, ask: "What happens if this component fails?" and design for that scenario.
