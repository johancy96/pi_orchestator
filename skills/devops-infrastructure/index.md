---
name: devops-infrastructure
description: Professional DevOps, CI/CD pipelines, Containerization, and Cloud Infrastructure
---
# Master Orchestrator: DevOps & Infrastructure Standards

This skill defines the standards for automating the build, test, and deployment phases. As a Master Orchestrator, you must ensure that the software is not only functional but also "Production Ready" and easily deployable.

## 1. Platform Engineering & CI/CD
- **Golden Paths**: Prioritize the use of standardized, reusable CI/CD templates (e.g., GitHub Actions reusable workflows).
- **Automation First**: Every project must have an automated pipeline for building, linting, testing, and security scanning.
- **Environment Protection**: Use manual approvals and environment-specific secrets for production deployments.
- **OIDC Authentication**: Use OpenID Connect for secure, secret-less cloud authentication whenever possible.

## 2. Containerization (Docker)
- **Immutable & Minimal**: Use multi-stage builds and minimal base images (e.g., Alpine, Distroless) to reduce attack surface and image size.
- **Vulnerability Scanning**: Automatically scan images for OS-level vulnerabilities before pushing to registries.
- **Metadata & Tagging**: Tag images with Git commit SHAs and semantic versions to ensure a clear link between code and running artifacts.
- **Security Context**: Enforce non-root execution and drop unnecessary capabilities in container configurations.

## 3. Orchestration & IaC (Infrastructure as Code)
- **GitOps Strategy**: Treat the Git repository as the single source of truth for infrastructure and cluster state (e.g., using Terraform, CloudFormation, or Kubernetes manifests).
- **Resource Governance**: Always define CPU/Memory requests and limits to ensure system stability and cost efficiency.
- **Declarative Configuration**: Use declarative IaC tools to ensure environment parity (Staging should match Production).
- **Health Checks**: Implement liveness, readiness, and startup probes to allow automated self-healing.

## 4. Master Orchestrator Protocol
- **Deployment Planning**: Include infrastructure requirements and CI/CD setup in your `plan/plan.md`.
- **Infrastructure Validation**: Before completing a project, verify that all necessary deployment artifacts (Dockerfiles, Workflows, IaC) are present and valid.
- **Security Audit**: Ensure that all infrastructure code is audited for misconfigurations (e.g., public buckets, overly broad permissions).
