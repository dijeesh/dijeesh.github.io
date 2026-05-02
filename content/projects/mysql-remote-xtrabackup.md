---
title: "Automated Remote MySQL Backups with Percona Xtrabackup"
date: 2015-01-01
description: "Lightweight bash script for automated, streamed MySQL backups to a remote vault using Percona Xtrabackup — scheduled, compressed, and battle-tested."
tags: [MySQL, Percona, Xtrabackup, Bash, Backup, Linux]
role: "Lead Operations Engineer – DevOps · Network Redux"
github: "https://github.com/dijeesh/mysql_remote_xtrabackup"
---

Built a lightweight backup automation script for streaming MySQL backups to a remote vault using Percona Xtrabackup. Deployed across multiple production environments at Network Redux.

## Context

Production MySQL databases needed reliable, automated backups pushed to a remote vault — without locking tables or impacting application performance. The solution had to be simple enough to deploy via cron and robust enough for production use.

## What I Did

- Built a bash script using Percona Xtrabackup for hot, non-blocking MySQL backups
- Implemented SSH-based streaming to push compressed backups to a remote vault
- Configured cron-based scheduling — every 4 hours by default
- Open-sourced the script and documentation on GitHub

## Results

| Metric | Detail |
|--------|--------|
| Downtime | **Zero** — hot backups, no table locks |
| Automation | Unattended, **4-hour cron schedule** |
| Production use | Deployed across **multiple environments** |
| Open source | [GitHub repo](https://github.com/dijeesh/mysql_remote_xtrabackup) |

## Stack

MySQL · Percona Xtrabackup · Bash · SSH · Cron · Linux
