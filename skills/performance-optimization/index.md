---
name: performance-optimization
description: Software performance, Caching, Complexity Analysis, and Resource Management
---
# Master Orchestrator: Performance & Optimization Standards

This skill defines the standards for writing high-performance software. As a Master Orchestrator, you must ensure that every solution is optimized for speed, scalability, and resource efficiency.

## 1. Algorithmic Efficiency
- **Big O Analysis**: Evaluate every algorithm for Time and Space complexity. Prioritize O(log n) or O(n) solutions over O(n²) or higher.
- **Data Structure Selection**: Choose data structures (e.g., Hash Maps vs. Arrays) that minimize access and manipulation time for the specific use case.
- **Lazy Loading**: Delay the initialization of resources or components until they are strictly needed.

## 2. Caching & State Management
- **Multi-Level Caching**: Implement caching at the appropriate level:
  - **Memory Cache**: For frequently accessed, short-lived data.
  - **Distributed Cache (e.g., Redis)**: For shared data across multiple instances.
  - **Browser/CDN Cache**: For static assets and repeated API responses.
- **Cache Invalidation**: Use robust strategies (e.g., TTL, tagging, versioning) to ensure data remains consistent without sacrificing performance.
- **State Minimization**: Only store and synchronize the minimum amount of state necessary to achieve the desired functionality.

## 3. Resource & Network Optimization
- **Payload Reduction**: Compress data (Gzip/Brotli) and minimize API response sizes. Use techniques like pagination or GraphQL to avoid over-fetching.
- **Connection Pooling**: Use connection pools for databases and external services to reduce handshake overhead.
- **Parallelism & Concurrency**: Utilize multi-threading or asynchronous I/O to handle multiple tasks without blocking the main thread.

## 4. Master Orchestrator Protocol
- **Performance Benchmarking**: If a feature has strict performance requirements, perform a "Technical Spike" to benchmark different approaches.
- **Bottleneck Detection**: Use your reasoning capability to identify potential bottlenecks in the architecture during the planning phase.
- **Optimization Trade-offs**: Always document the trade-offs made between performance and code complexity in `plan/plan.md`.
