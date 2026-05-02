---
title: "Heroku to Amazon EKS — Seamless Migration for a HealthTech Platform"
date: 2022-03-01
description: "Migrated a dental aligner platform from Heroku to Amazon EKS — achieving 40–50% cost reduction, eliminating scalability issues, and completing the cutover in under 30 minutes."
tags: [AWS, EKS, Heroku, Migration, ArgoCD, Aurora, CloudFront, WAF, Bitbucket]
role: "Independent Consultant · 2022"
---

Migrated the entire platform for a US-based HealthTech startup from Heroku to Amazon EKS — eliminating scalability bottlenecks, reducing costs by 40–50%, and completing the production cutover in under 30 minutes with zero issues.

## Context

The company, a dental aligner startup, was running their full platform on Heroku. Monthly spend was high, the platform faced frequent disruptions, and scalability had become a bottleneck. They needed a stable, cost-effective foundation built for future growth.

## What I Did

**Infrastructure Design**
- Provisioned AWS Accounts with Organization Units — dedicated accounts for Development, Staging, and Production following security best practices
- Designed custom network architecture with centralized accessibility

**Application Modernization**
- Helped the team containerize all application services for Kubernetes deployment

**Platform Build**
- Deployed **Amazon EKS** as the compute platform
- Set up **Bitbucket** with self-hosted runners for CI/CD and **ArgoCD** for GitOps deployments
- Configured **ALB with WAF** for secure public API exposure
- Deployed **CloudFront + S3** distributions for static site hosting
- Provisioned **Amazon Aurora Serverless** for the database layer
- Implemented observability stack with **Prometheus, Loki, and Grafana**
- Documented all infrastructure and standard operating procedures

**Migration Execution**
- Built a POC environment first and ran end-to-end validation tests
- Planned and scheduled migrations for each platform layer independently
- Set up **database replication from Heroku to Aurora** using chained replication
- In a scheduled maintenance window, **cut over the entire platform in under 30 minutes** — zero issues

> Planning and execution by documenting every bit of the workflow is the key.

## Results

| Metric | Before (Heroku) | After (EKS) |
|--------|-----------------|-------------|
| Cost reduction | — | **40–50%** |
| Scalability | Frequent bottlenecks | Dynamic, auto-scaling |
| Cutover time | — | **< 30 minutes** |
| Downtime during migration | — | **Zero issues** |

## Stack

Amazon EKS · Aurora Serverless · CloudFront · S3 · ALB · WAF · ArgoCD · Bitbucket CI · Docker · Prometheus · Loki · Grafana · AWS Organizations
