---
title: "My First AWS Project — Scalable Infrastructure for a Real-Time Auction Platform"
date: 2015-03-01
description: "Built a scalable AWS infrastructure for a US-based online auction marketplace — from CloudFormation templates to DynamoDB auto-scaling hacks — and evolved it over the years into a fully containerized, modern platform."
tags: [AWS, DynamoDB, CloudFormation, EC2, AutoScaling, EKS, Karpenter, ArgoCD, Ansible]
role: "Lead Operations Engineer – DevOps · Network Redux"
---

My first AWS project — and the first customer onboarded to Network Redux's Managed Cloud Services. Built a scalable infrastructure for a US-based online auction marketplace and real-time bidding platform. What started as a classic AWS stack in 2016 evolved over the years into a fully modernized, containerized platform on Amazon EKS.

## Context

The customer needed a reliable, auto-scaling infrastructure to handle unpredictable traffic spikes during live auctions. Real-time bidding demanded low-latency database operations and the ability to scale compute on demand. This was 2015 — many AWS features we take for granted today didn't exist yet.

## What I Did

**Initial Build (2015)**
- Designed the full AWS architecture — Route 53, ELB, EC2 Auto Scaling Groups, RDS, and DynamoDB
- Configured **Amazon DynamoDB** for the real-time auction engine
- Set up 3rd-party CDN for image caching and static asset delivery
- Built **Ansible playbooks** for baking AMIs with Nginx and PHP stacks
- Implemented CI/CD with **AWS CodeDeploy and CodePipeline**
- Provisioned all resources using **CloudFormation templates** — reverse-engineered from a YAML file left by a previous contractor on a bastion host, then rewritten and standardized. Those templates became the foundation for most stacks we provisioned at Network Redux

**The DynamoDB Challenge**
- DynamoDB auto-scaling didn't exist at the time. Implemented **Dynamic DynamoDB** — a script-based solution that monitored DynamoDB metrics and scaled tables up/down based on custom policies. It worked like a charm.

**Evolution Over the Years**
- This customer was always the first to green-light upgrades whenever AWS introduced new services
- Over time, migrated the entire platform to a modernized, containerized architecture:
  - **Amazon EKS** for container orchestration
  - **Karpenter** with Spot instance fleet for cost-efficient compute
  - **Aurora Serverless** replacing RDS
  - **ArgoCD** for GitOps-based deployments

## Results

| Metric | Detail |
|--------|--------|
| Starting point | Classic EC2 + RDS + DynamoDB stack (2015) |
| Final state | Fully containerized on EKS with Karpenter + ArgoCD |
| DynamoDB scaling | Custom auto-scaling before AWS native support existed |
| Infrastructure as Code | CloudFormation templates that became the standard for Network Redux |
| Customer relationship | Multi-year engagement — continuously modernized |

> A happy, forward-thinking customer that helped me kick-start solution engineering on AWS Cloud. Always grateful to [Randy Ehli](https://www.linkedin.com/in/randy-ehli-a2a6bb6/).

## Stack

**2015:** Route 53 · ELB · EC2 Auto Scaling · DynamoDB · RDS · CloudFormation · Ansible · CodeDeploy · CodePipeline · Dynamic DynamoDB

**Final:** Amazon EKS · Karpenter · Spot Instances · Aurora Serverless · ArgoCD · GitOps
