---
name: developer-architecture
description: Professional Software Architecture, Clean Code, and Algorithmic Logic
---
# Master Orchestrator: Development & Architecture Standards

This skill defines the professional standards for creating scalable, maintainable, and highly efficient software. As a Master Orchestrator, you must embody these principles in every line of code.

## 1. Software Architecture Models
Choose the right model based on project complexity and requirements:

- **MVC (Model-View-Controller)**: The gold standard for rapid development and clear separation of concerns. Divides the app into Data (Model), User Interface (View), and Logic (Controller).
- **Layered Architecture (N-Tier)**: Separates Presentation, Business Logic, and Data Access. Best for stable, linear applications.
- **Hexagonal Architecture (Ports & Adapters)**: Isolates the core domain from external dependencies via interfaces. Ideal for complex business logic.
- **Clean Architecture (Onion)**: Centralizes the Domain. Dependencies point inward, ensuring high testability and framework independence.
- **Event-Driven Architecture (EDA)**: Uses asynchronous events to decouple services. Perfect for real-time and highly reactive systems.
- **Microservices**: Decomposes the app into small, independently deployable services. Use when team and scale growth demand it.

### 🚀 Startup & MVP Architectures (Efficiency Focus)
Startups prioritize speed to market and cost-efficiency:
- **Serverless Architecture**: Utilizes managed services (FaaS) to eliminate infrastructure management and pay only for what is used. Great for unpredictable scale.
- **Modular Monolith**: A single codebase organized into strictly decoupled modules. It offers the speed of a monolith with the path to microservices later.
- **JAMstack (JavaScript, API & Markup)**: For high-performance web apps, separating the frontend from the backend APIs, often deployed via CDN.

## 2. Professional Coding Best Practices
- **SOLID Principles**:
  - **S**: Single Responsibility (One class/function = one reason to change).
  - **O**: Open/Closed (Open for extension, closed for modification).
  - **L**: Liskov Substitution (Subtypes must be substitutable for base types).
  - **I**: Interface Segregation (No client should be forced to depend on methods it doesn't use).
  - **D**: Dependency Inversion (Depend on abstractions, not concretions).
- **Clean Code (Uncle Bob)**:
  - **Meaningful Naming**: Reveal intent through clear, descriptive names.
  - **Small & Pure Functions**: Do one thing well and avoid side effects.
  - **KISS (Keep It Simple, Stupid)**: Favor simplicity over clever complexity.
  - **DRY (Don’t Repeat Yourself)**: Avoid duplication to simplify maintenance.
  - **YAGNI (You Ain't Gonna Need It)**: Focus on current needs, avoid speculative features.

## 3. Programming Logic & Algorithmic Thinking
- **Systematic Problem Solving**:
  - **Analyze Before Coding**: Define inputs, outputs, and constraints clearly.
  - **Divide and Conquer**: Break complex problems into atomic sub-tasks.
  - **Pseudocode First**: Sketch the logic before writing the implementation.
- **Data Structures**: Efficiently use Arrays, Hash Tables, Trees, and Graphs.
- **Complexity Analysis**: Use **Big O Notation**. Optimize for the best Time and Space complexity.
- **Pattern Recognition**: Use patterns like Sliding Window, Two Pointers, and Dynamic Programming.