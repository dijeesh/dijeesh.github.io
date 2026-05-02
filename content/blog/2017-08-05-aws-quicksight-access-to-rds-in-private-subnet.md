---
title: AWS Quicksight access for RDS instance in VPC Private subnets
date: 2017-08-05
categories: [AWS]
tags: [AWS, rds, quicksight, haproxy, mysql, visualization, sysops, dijeeshpnair, devops]
description: AWS Quicksight access for RDS instance in VPC Private subnets
---


## Quicksight



Amazon Quicksight is a powerful data visualization tool in AWS Cloud. It will help you to get business insights from your data. Working with Data on Quicksight is very easy, you may just go through its documentation.



## Connection issues

However, if you're trying to source data from RDS instance, you'll find difficulties if the RDS instance in your VPC Private subnet. And a simple solution for this issue is put a proxy instance in your public subnet and instruct Quicksight to connect the proxy instance over Public Network.



Here is a rough architecture diagram:


![Architecture Diagram](https://raw.githubusercontent.com/dijeesh/dijeesh.github.io/master/assets/media/quicksight.jpg)


## Steps :

1. Create an EC2 instance in Public Subnet
2. Configure Security Group to allow connectivity to RDS MySQL cluster from the EC2 instance.
3. Configure Security Group to allow Quicksight connections into the EC2 instance.
4. Confirm MySQL connectivity from EC2 instance to the RDS Cluster.
5. Createa a MySQL user with `select` and `execute` privileges
6. Install and configure HaProxy service in EC2 instance.


```
yum install haproxy
```


```
mv /etc/haproxy/haproxy.cfg /etc/haproxy/haproxy.cfg_bak     
```   

Add following configuration


```
vi /etc/haproxy/haproxy.cfg

global
      log /dev/log    local0
      log /dev/log    local1 notice
      chroot /var/lib/haproxy
      maxconn 4000
      user haproxy
      group haproxy
      daemon
      stats socket /var/lib/haproxy/stats mode 777

listen MySQL 
      bind 0.0.0.0:3306
      timeout connect 10s
      timeout client 1m
      timeout server 1m
      mode tcp
      server rds-prod-cluster  rds-prod-cluster.cluster-xxxxx.xx-xxxx-x.rds.amazonaws.com:3306
```



Now try to add Data source in your Quicksight dashboard, select MySQL, provide Public IP Address of your EC2 instance and MySQL credentials that you have created earlier.


Quicksight will connect to EC2 instance and HaProxy Service running on EC2 instance will forward the traffic to RDS in Private subnet.


Note : Lock down all other connections to the EC2 instance.


Enjoy the power of data visualization !!
