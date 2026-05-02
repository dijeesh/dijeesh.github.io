---
title: "Enterprise Virtual Server Platform — Public Cloud Before Cloud Was Cool"
date: 2014-01-01
description: "Designed, built, and operated a Citrix XenServer-based public cloud platform at Network Redux — selling enterprise virtual machines before AWS, Azure, and GCP were mainstream."
tags: [Citrix XenServer, Private Cloud, Virtualization, Capacity Planning, BCP/DR, Networking]
role: "Lead Operations Engineer – DevOps · Network Redux"
---

Before Amazon EC2, Azure Virtual Machines, and Google Compute Engine were mainstream, we were building and selling public cloud compute at Network Redux — powered by Citrix XenServer clusters, marketed as **Enterprise Virtual Servers**.

## Context

Network Redux needed a scalable, reliable compute platform to offer enterprise customers on-demand virtual machines with dedicated resources, network isolation, and SLA-backed availability. This was the era before hyperscalers dominated — and we built it ourselves.

## What I Did

- Took over platform operations from [Brian Shore](https://www.linkedin.com/in/bkshore/) — the original architect and brain behind the platform — and evolved it for scale and reliability
- Designed, built, and maintained **Citrix XenServer clusters** — the foundation of the Enterprise Virtual Server product
- Created **VM templates** for rapid, consistent provisioning and **Ansible playbooks** for VM hardening and deploying ready-to-use stacks — LAMP, LEMP, MySQL, Percona Database Clusters, Magento, Drupal, and WordPress
- Executed **cluster upgrades and patching** seamlessly with zero customer impact
- Worked closely with the **upstream XenServer team**, reporting bugs and contributing to fixes
- Managed **live VM migrations** between clusters for maintenance and load balancing
- Designed **secure, isolated, highly available compute environments** for enterprise customers using virtual machines
- Implemented **VM backup, restoration, and BCP/DR drills** for customers
- Owned **capacity planning and forecasting** — ensuring headroom for growth
- Planned and designed the **underlying network infrastructure** — public and private interfaces, VLANs, and network segmentation for VMs

## Results

| Metric | Detail |
|--------|--------|
| Cloud platform | **Production-grade**, SLA-backed virtual machines |
| Upgrades | **Zero-downtime** — cluster patching without customer impact |
| Lifecycle | Full provisioning, backups, DR drills, capacity planning |
| Timeline | Built and operated **before AWS was mainstream** |

## Stack

Citrix XenServer · Linux · Networking (VLANs, Public/Private) · VM Templates · Backup & DR · Capacity Planning
