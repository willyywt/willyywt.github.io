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

The installer suggested me to disable SMT(Simultaneous Multithreading) and give me a link to [rhel-smt](https://red.ht/rhel-smt). My laptop is a Lenovo G580 and SMT seems to causes the weak i5-3230M CPU to heat a lot with little performance boot so I dropped SMT on the grub configuration for kernel command line, ~~as suggested in the RHEL documentation:~~ **important: ignore RHEL documentation here, use ordinary `grub2-mkconfig` and `dracut`**[^note1]

In file `/etc/default/grub`, append `nosmt` to `GRUB_CMDLINE_LINUX=`.
```conf
# /etc/default/grub
#----------------------------------
# GRUB_CMDLINE_LINUX="<lots_of_custom_option> rhgb quiet nosmt"
```
Then run `grub2-mkconfig` to change `/boot/grub2/grub.cfg` and use `dracut` to override the current initramfs.
```sh
# Root
grub2-mkconfig -o /boot/grub2/grub.cfg
dracut -f
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
See [Setup VNC Server on CentOS Stream 9](../../../../2022/03/12/setup-vnc-server-on-centos-stream-9).

[^note1] RHEL documentation is ambiguous here, it says "may be carried forward with kernel updates", but I think it actually mean "yes on RHEL <= 7 and no on RHEL >= 8". Anyway, on this CentOS Stream 9, `grubby` only changes the current default entry in `/boot/loader/entires` (so if no kernel update is done, after a reboot the `nosmt` parameter is applied) but does not apply to later kernel versions. 
