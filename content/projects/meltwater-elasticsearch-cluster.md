---
title: "52-Node Bare-Metal Elasticsearch Cluster — Built in a Weekend"
date: 2016-06-01
description: "Designed and deployed a 52-node bare-metal Elasticsearch cluster for a global media intelligence company — network design through production handover — in a single weekend."
tags: [Elasticsearch, Bare Metal, Ansible, Juniper SRX, Arista, PXE, Private Cloud]
role: "Lead Operations Engineer – DevOps · Network Redux"
---

Designed and built one of the largest search indexing clusters for a global media intelligence company — 52 bare-metal nodes in Network Redux's private cloud. Completed over a single weekend, in between flights from Portland to Kochi.

## Context

A global media intelligence company needed a large-scale Elasticsearch cluster for search indexing, deployed on dedicated bare-metal infrastructure in a private cloud environment. The project required end-to-end delivery — from network architecture through OS provisioning to production handover — on an aggressive timeline.

## What I Did

- Designed a dedicated DMZ zone for the Elasticsearch environment within Juniper SRX firewall clusters
- Configured Arista switches with VLANs for network segmentation and isolation
- Deployed **52 bare-metal instances** with CentOS, security hardening, and client-specific customizations
- Implemented **zero-touch OS installation** using PXE boot for consistent, repeatable provisioning
- Built **Ansible playbooks** for all OS-level configurations across all 52 nodes
- Oversaw full documentation and structured handover to the operations team

## Results

| Metric | Detail |
|--------|--------|
| Nodes deployed | **52 bare-metal instances** |
| Delivery time | **Single weekend** |
| Scale | One of the **largest search indexing clusters** for the client |
| Provisioning | **Zero-touch** — fully automated via PXE + Ansible |

## Stack

Elasticsearch · Bare Metal · CentOS · PXE Boot · Ansible · Juniper SRX · Arista Switches · Private Cloud
