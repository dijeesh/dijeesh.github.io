---
title: "Redis Sentinel HA Cluster — Automated Failover with HAProxy"
date: 2016-01-01
description: "Production-tested Redis high availability setup with Sentinel for automatic failover and HAProxy for transparent connection routing — open source on GitHub."
tags: [Redis, Sentinel, HAProxy, High Availability, Linux]
role: "Lead Operations Engineer – DevOps · Network Redux"
github: "https://github.com/dijeesh/redis-sentinel-cluster-setup"
---

Built a production-tested, highly available Redis caching layer using Sentinel for automatic failover and HAProxy for transparent master routing. Open-sourced the setup and documentation.

## Context

Production applications needed a Redis caching layer that could survive node failures without manual intervention or application-side changes. The solution had to be simple, reliable, and deployable on standard Linux infrastructure.

## What I Did

- Designed a 3-node Redis cluster — 1 master, 2 replicas — with automatic promotion on failure
- Configured 3 Sentinel instances with quorum-based failover (quorum of 2)
- Set up HAProxy with TCP health checks to route connections to the current master transparently
- Documented the full setup and open-sourced it on GitHub

## Results

| Metric | Detail |
|--------|--------|
| Failover | **Zero-downtime** — automatic master promotion |
| App changes | **None** — clients connect through HAProxy transparently |
| Open source | [GitHub repo](https://github.com/dijeesh/redis-sentinel-cluster-setup) |

## Stack

Redis · Redis Sentinel · HAProxy · CentOS · Linux
