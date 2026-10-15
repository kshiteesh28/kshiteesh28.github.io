---
title: "Build for the restart."
subtitle: "Selected contributions to hardware-facing services and distributed recovery at Infinera and Nokia."
category: "EMPLOYER WORK / NOKIA + INFINERA"
kind: "reliability"
stack: "Modern C++ · Linux · gRPC · Protocol Buffers · Telemetry"
metric: "45%"
metricLabel: "Improvement in mean time to recovery from my Nokia recovery work."
---

## The problem

Hardware-facing software has to account for long-running operations, asynchronous events and restarts. A service can be correct in the ordinary case and still become unresponsive or ambiguous when those paths overlap.

At Infinera and Nokia, I worked on the software behavior around those transitions. The examples below are separate contributions across two employers.

## My contribution at Infinera

I unblocked a HAL dispatch thread from transfers lasting 60 seconds by introducing a **four-worker thread pool**. My experience record reports a responsiveness improvement from **340 ms to 16 ms**.

I also eliminated duplicate hardware commands after distributed system restarts through single-write atomicity, reducing API latency by 25%, and worked on bidirectional gRPC telemetry services.

The engineering choice was to take long-running transfer work off the dispatch path. It creates room for the dispatcher to keep responding while worker threads handle that work.

## My contribution at Nokia

I unified live-event and post-restart recovery onto one path, resolving a **20-second ambiguity** and reducing mean time to recovery by **45%**.

In separate safety work, I architected a **2-of-3 voting interlock across three distributed entities**, added observability into vote state and reduced on-call reliability incidents from three to zero per quarter.

## The architecture, at a safe level

The diagram shows a general principle from my recovery work: live events and restart events converge on shared handling. It is a conceptual illustration, not an internal system diagram.

The tradeoff in shared recovery handling is that more event types depend on the same path. That makes the behavior of that path especially important. I describe the documented unification here without inventing implementation details or internal test results.

## Results and validation

These outcomes come from my experience record, not a new public benchmark. The responsiveness and recovery metrics describe different contributions and should not be combined into a single performance claim.

My earlier Infinera internship also included a noise-filtering algorithm validated with **276 GoogleTest tests**, with a reported 40% improvement in signal stability. That test count applies to that algorithm, not to the recovery work.

## What I take forward

I like working where concurrency, observability and recovery meet. The goal is practical: keep services responsive, make transitions understandable and give engineers useful evidence when something goes wrong.
