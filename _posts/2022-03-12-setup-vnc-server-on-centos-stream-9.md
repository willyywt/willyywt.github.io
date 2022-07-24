---
layout: post
title: "Setup VNC Server on CentOS Stream 9"
last_modified_at: 2022-03-12
categories: admin
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
I followed the guide on [Tutorial: Setup VNC Server CentOS 8 - 100% Working](https://www.golinuxcloud.com/setup-vnc-server-centos-8/). (It is written for CentOS 8 but works unchanged in CentOS Stream 9). It turns out that setting up VNC Server is simpler than I think. The primary use case is GUI administration tools like [Virt Manager](https://virt-manager.org/). **Warning: Only works for tigervnc-server version >= `1.10.1-7.el8`.**

## Setup VNC Server
Note: I didn't choose "Server with GUI" on installation which comes with a GNOME Shell. Although a full desktop environment clearly works, I only uses a simple X11 window manager, [icewm](https://ice-wm.org/). If desired you can choose an X session other than icewm.

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
su - admin -s /bin/bash -c /usr/bin/vncpasswd
```

The TigerVNC service can be started now. The `<i>` in `@\:<i>` should be the display number as in `/etc/tigervnc/vncserver.users`
```sh
# Root
systemctl start vncserver@\:1.service
```

You need to configure your firewall to open the port for tigervnc session:
```sh
firewall-cmd --permanent --zone=public --add-port 5901/tcp
firewall-cmd --reload
```

On connection a prompt for vnc password will be open:

![password-prompt](../../../../static/2022-03-12/password.png)

Finally, the icewm session!

![icewm-virt-manager](../../../../static/2022-03-12/icewm-virt-manager.png)
