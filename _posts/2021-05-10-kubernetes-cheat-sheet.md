---
layout: post
title: Kubernetes kubectl cheat sheet
author: Dijeesh Padinharethil
date: 2021-04-18 11:00:00 +0800
categories: [AWS]
tags: [aws, eks, kubernetes, kubectl, cheatsheet, devops]
math: true
mermaid: true
description: Kubernetes kubectl cheat sheet
#image: /assets/media/Lamp.jpg
comments: true
---

Few kubectl commands that will be helpful in troubleshooting K8S environments


### Cheat Sheet

Sort events by timestamp

```
kubectl get events --sort-by='.metadata.creationTimestamp'
```

Get list of resources stuck in a namespace

```
kubectl api-resources --verbs=list --namespaced -o name | xargs -n 1 kubectl get --show-kind --ignore-not-found -n <namespace>
```

Delete namespace stuck in Terminating Status

```
kubectl get namespace NAMESPACE -o json > NAMESPACE.json
Remove kubernetes from finalizers array which is under spec
kubectl replace --raw "/api/v1/namespaces/NAMESPACE/finalize" -f ./NAMESPACE.json
```