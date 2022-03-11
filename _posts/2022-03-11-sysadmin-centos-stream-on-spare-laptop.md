---
layout: post
title: "Sysadmin: CentOS Stream on a spare laptop"
last_modified_at: 2022-03-11
categories: admin
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
A spare laptop is pretty suitable for personal long runing tasks like [qbittorrent](https://qbittorrent.org/), [youtube-dl](https://youtube-dl.org/) (as long as you don't put too much CPU pressure on it). I tried out CentOS Stream and find it suits well for this simple working scheme. There are a lot of administration things to do on CentOS Stream however so I write up on my configuration for CentOS Stream here.

## Installation
CentOS Stream doesn't work very well with [Ventoy](https://ventoy.net/): it boots and installs but when choosing an software repository it cannot choose an iso file on Ventoy, so I have to use "closest network repository" instead. CentOS Stream only provides a 9GB iso file download and doesn't seem to have a minimal boot iso file, but I guess most of the 9GB iso file is wasted.

The installer suggested me to disable SMT(Simultaneous Multithreading) and give me a link to [rhel-smt](https://red.ht/rhel-smt). My laptop is a Lenovo G580 and SMT seems to causes the weak i5-3230M CPU to heat a lot with little performance boot so I dropped SMT on the grub configuration for kernel command line, as suggested in the RHEL documentation:
```sh
grubby --args=nosmt --update-kernel=DEFAULT
```

The installer also prompts for a EULA in `/usr/share/redhat-release/EULA` but the EULA simply says you need to comply to the GPLv2:

> CentOS Stream 9 EULA
> 
> CentOS Stream 9 comes with no guarantees or warranties of any sorts,
> either written or implied.
> 
> The Distribution is released as GPLv2. Individual packages in the
> distribution come with their own licences. A copy of the GPLv2 license
> is included with the distribution media.

## Setup VNC Server
I followed the guide on [Tutorial: Setup VNC Server CentOS 8 - 100% Working](https://www.golinuxcloud.com/setup-vnc-server-centos-8/). (It is written for CentOS 8 but ) The tutorial is really great and it turns out that setting up VNC on Centos Stream is much more simpler than I think.

Note: I didn't choose "Server with GUI" on installation which comes with a GNOME Shell. Although a full desktop environment clearly works, I choose a simple X11 window manager, [icewm](https://ice-wm.org/).

Install EPEL. EPEL installation command comes from [Fedora Docs - EPEL#_centos_stream_9](https://docs.fedoraproject.org/en-US/epel/#_centos_stream_9)
```sh
# Root
dnf config-manager --set-enabled crb ; dnf install epel-release epel-next-release
```

Install [TigerVNC](https://tigervnc.org/) and [icewm](https://ice-wm.org/):
```sh
# Root
dnf install tigervnc-server icewm
```

VNC must run within a non-root user. TigerVNC ties a user to a display number, like `:1=admin`, and correspondingly maps display numbers to ports like `X :1` is mapped to port `5901`. Create an admin user and setup `/etc/tigervnc/vncserver.users`. The passwd is left locked:
```sh
# Root
useradd -m admin
usermod -a -G wheel admin
```
```conf
# /etc/tigervnc/vncserver.users
#----------------------------------
# TigerVNC User assignment
#
# This file assigns users to specific VNC display numbers.
# The syntax is <display>=<username>. E.g.:
#
# :2=andrew
# :3=lisa
:1=admin
```

An X session must be configured for a tigervnc sesion. It can be configured per-user wide in `$HOME/.vnc/config` or system-wide in `/etc/tigervnc/vncserver-config-defaults`(default) or `/etc/tigervnc/vncserver-config-mandatory`(mandatory if configured).  The available sessions are in `/usr/share/xsessions`:
```
$ ls -l /usr/share/xsessions/
total 4
-rw-r--r--. 1 root root 3094 Jan 20 09:41 icewm-session.desktop
```
Configure icewm to be the default xsession:
```conf
# /etc/tigervnc/vncserver-config-defaults
#--------------------------------------------
## Default settings for VNC servers started by the vncserver service
#
# Any settings given here will override the builtin defaults, but can
# also be overriden by ~/.vnc/config and vncserver-config-mandatory.
#
# See the following manpages for more details: vncserver(1) Xvnc(1)
#
# Several common settings are shown below. Uncomment and modify to your
# liking.

# securitytypes=vncauth,tlsvnc
# desktop=sandbox
# geometry=2000x1200
# localhost
# alwaysshared

# Default to GNOME session
# Note: change this only when you know what are you doing
session=icewm-session
```

TigerVNC requires a separate vncpasswd. (The system password can be left locked: `passwd -l admin`). Setup vncpasswd. (I don't enable a view-only passwd since I will be the only one using VNC)
```sh
# Root
su - deepak -s /bin/bash -c /usr/bin/vncpasswd
```

The TigerVNC service can be started now. The `<i>` in `@\:<i>` should be the display number as in `/etc/tigervnc/vncserver.users`
```sh
# Root
systemctl enable vncserver@\:1.service
```