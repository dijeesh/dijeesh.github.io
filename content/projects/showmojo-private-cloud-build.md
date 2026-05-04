---
title: "Private Cloud Build for an Automated Leasing Platform"
date: 2016-01-01
description: "Built a fully redundant private cloud infrastructure on just two hardware nodes using XCP-ng, HAProxy, PostgreSQL streaming replication, and GlusterFS — ran 4+ years without a single glitch."
tags: [XCP-ng, HAProxy, PostgreSQL, GlusterFS, Ansible, Juniper SRX, Private Cloud, Virtualization, Ruby on Rails]
role: "Lead Operations Engineer – DevOps · Network Redux"
---

The customer operates a leading automated leasing platform designed for residential property managers and landlords. It acts as a 24/7 virtual assistant that handles lead generation, instantly responds to inquiries, schedules in-person or self-guided tours, and verifies prospects — all to reduce vacancy times.

## The Challenge

The customer's infrastructure was spread across Rackspace and a couple of other hosting providers in the US. They came to us with clear requirements:

- **Backup and DR** for mission-critical database servers
- **Cost optimization** with better stability and managed services
- **Clear hardware requirements** to run the platform for the next 3–4 years
- **Strict budget** — everything had to run on two hardware nodes from Network Redux
- **HA, stability, and operational excellence** were non-negotiable

## The Approach

### Discovery and Assessment

We mapped out their entire current architecture spanning multiple datacenters, documenting every service and service provider at each layer. This gave us a clear picture of what needed to move and how the components depended on each other.

### Key Architecture Decisions

**Bare metal was not an option.** Running everything directly on bare metal with no isolation was a risk we weren't willing to take. After discussing with the customer, we agreed to bring OS-level isolation for each application component using virtual machines. This was before Kubernetes and container orchestration tools had entered the mainstream — we were firmly in the VM era.

**Citrix XenServer was our default choice**, but right around that time, Citrix changed their licensing model. We evaluated alternatives and decided to go with **XCP-ng** (an open-source fork of XenServer) paired with **Xen Orchestra** for management — open source, no licensing costs, and a fully capable hypervisor platform.

## Infrastructure Architecture

### Network Layer

- **Two Juniper SRX Firewalls** deployed in HA (Active/Passive) mode
- **Three dedicated subnets** designed and implemented:
  - **Public Subnet** — for external-facing services
  - **Private Subnet** — for internal application communication
  - **Management/Backup Subnet** — for administration and backup traffic
- **Strict firewall rules** to restrict management access and public-facing exposure — only required ports open, everything else denied by default
- **Strict network policies** to control traffic between instances — application VMs could only talk to the services they needed, nothing more
- **NAT configured on SRX** to route external traffic to the HAProxy VIP

### Hypervisor Layer

- **Two hardware nodes** from Network Redux
- **XCP-ng** installed on both nodes with Public, Private, and Backup subnets configured
- Each node capable of running the full application stack independently

### Load Balancing Layer

- **Two HAProxy VMs** (one on each node) configured in **Active/Standby clustering mode**
- **Virtual IP (VIP)** active on the primary node
- VIP failover handled automatically — if the active node goes down, the standby takes over
- SRX NAT points to the VIP for external traffic ingress

### Application Layer

All application VMs distributed across both hardware nodes for redundancy:

| Component | Node 1 | Node 2 | Total |
|-----------|--------|--------|-------|
| Frontend Servers | 1 VM | 1 VM | 2 |
| API Servers | 2 VMs | 2 VMs | 4 |
| Application Servers | 2 VMs | 2 VMs | 4 |

- **Ruby on Rails** application stack
- All application servers behind HAProxy for load distribution
- If one hardware node fails, the other node's VMs continue serving traffic

### Database Layer

- **PostgreSQL** deployed on dedicated VMs:
  - **Node 1**: Master (Primary)
  - **Node 2**: Replica (Streaming Replication)
- **DR Replication**: Streaming replication configured to a separate Backup/DR datacenter
- **Three copies of data** at any given time: Master, Local Replica, DR Replica

### Storage Layer

- **One GlusterFS VM on each node**
- **GlusterFS Replicated Volume** configured across both nodes
- Shared volume mounted on Frontend, API, and Image server instances
- Handles shared data like uploaded assets, images, and static content

### Management Layer

- **Management VM** deployed in our Public Cloud platform (outside the blast radius of the hardware nodes)
- **Xen Orchestra** for hypervisor management
- **Bastion server** for secure SSH access to the infrastructure
- **Ansible** for configuration management and service deployment across all VMs
- **Custom deployment scripts** for developer releases via the Bastion node

## Migration Strategy

Migrating a production platform with zero tolerance for data loss required careful planning. Here's how we executed it:

### Database Migration — Chained Replication

1. **Set up streaming replication** from the customer's existing PostgreSQL master to our Network Redux datacenter
2. **Configured chained replication** — the interim replica at our datacenter received changes from the old master and stayed in sync
3. **In a scheduled maintenance window**, we stopped replication, promoted the replica at Network Redux as the new master
4. **Configured replication from the new master back to the old infrastructure** — a chained replication in reverse, so we had a live rollback path if anything went wrong
5. **Deployed the updated codebase** to the new application VMs — all shared storage items on GlusterFS were already in sync

### The Cutover

Within minutes, we switched traffic from the previous infrastructure to our infrastructure. DNS and NAT changes pointed to the new HAProxy VIP, and the platform was live on the new stack.

### Rollback Plan

We documented every step needed to switch back to the old infrastructure in case anything went wrong:

- Reverse the replication direction
- Promote the old master back
- Repoint DNS and NAT
- Verified and tested before the cutover window

The rollback path was never needed — but having it ready is what separates a good migration from a risky one. Another example of pure operational excellence.

## Architecture Diagram

```
                    ┌─────────────────────────────────────────────┐
                    │              INTERNET                        │
                    └──────────────────┬──────────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────────────┐
                    │         SRX Firewalls (HA Pair)              │
                    │         Active / Passive                     │
                    └──────────────────┬──────────────────────────┘
                                       │
                              NAT → VIP │
                    ┌──────────────────┴──────────────────────────┐
                    │         HAProxy (Active/Standby)             │
                    │     Node 1: Active    Node 2: Standby        │
                    │              VIP on Active Node               │
                    └──────────────────┬──────────────────────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
     ┌────────┴────────┐    ┌─────────┴─────────┐    ┌────────┴────────┐
     │   Frontend (2)   │    │    API (4)         │    │   App (4)       │
     │  1 VM per node   │    │  2 VMs per node    │    │  2 VMs per node │
     └────────┬────────┘    └─────────┬─────────┘    └────────┬────────┘
              │                        │                        │
              └────────────────────────┼────────────────────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
     ┌────────┴────────┐    ┌─────────┴─────────┐    ┌────────┴────────┐
     │   PostgreSQL     │    │   GlusterFS        │    │   DR Datacenter │
     │  Master/Replica  │    │  Replicated Vol     │    │   PG Streaming  │
     │  Node 1 / Node 2 │    │  Node 1 / Node 2   │    │   Replication   │
     └─────────────────┘    └───────────────────┘    └─────────────────┘

              ┌─────────────────────────────────────────────────┐
              │            Management Plane                      │
              │  Mgmt VM (Public Cloud) · Bastion · Ansible      │
              │  Xen Orchestra · Custom Deploy Scripts           │
              └─────────────────────────────────────────────────┘
```

## Failure Scenarios

| Failure Scenario | Impact | Recovery |
|-----------------|--------|----------|
| One SRX firewall fails | Zero downtime — HA pair fails over | Automatic |
| One HAProxy VM fails | VIP moves to standby — zero downtime | Automatic |
| One hardware node fails | All VMs on surviving node continue serving | Application stays up |
| PostgreSQL master fails | Promote replica to master | Manual failover |
| GlusterFS node fails | Surviving node serves shared data | Automatic (replicated volume) |
| Primary datacenter fails | DR datacenter has PostgreSQL replica | Manual DR activation |

## Operational Excellence

- **Ansible** used to install, configure, and manage all services across VMs — repeatable, auditable, version-controlled
- **Custom deployment scripts** for application releases via the Bastion node
- **End-to-end management documentation** covering XCP-ng upgrade procedures, node drain processes, failover/failback, backup/restore, and network configuration
- **Zero-downtime maintenance** — one node could be taken offline while the other handled all traffic

## Results

| Metric | Detail |
|--------|--------|
| Uptime | **4+ years without a single glitch** |
| HA Coverage | **Every layer** — firewall, load balancer, app, database, storage |
| Data Protection | **3 copies** — Master, Local Replica, DR Replica |
| Maintenance | **Zero-downtime** — rolling node upgrades |
| Cost | **No licensing fees** — XCP-ng + open-source stack |
| Network | **3 subnets** — Public, Private, Management/Backup |

Sometimes the best engineering isn't about using the latest tools — it's about making the right decisions with the constraints you have. Two nodes, open-source tools, solid architecture, and disciplined operations. That's what made this work.

## Acknowledgements

This project was a team effort. Special thanks to:

- [Marjan Povolni](https://www.linkedin.com/in/mpovolni/) — who led the development team on the customer side
- [Sujith Paily](https://www.linkedin.com/in/sujithpaily/) — my partner in design and execution of the entire infrastructure
- [Cameron Smith](https://www.linkedin.com/in/cameroncorbinsmith/) — who led all the datacenter heavy lifting

## Stack

XCP-ng · Xen Orchestra · Juniper SRX (HA) · HAProxy · PostgreSQL · GlusterFS · Ansible · Ruby on Rails · Linux · Bastion Server
