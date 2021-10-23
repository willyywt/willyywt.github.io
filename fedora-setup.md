---
layout:page
title: My fedora linux setup
---
I will try to summarize my experience of fedora linux distribution ("Fedora Linux" is in /etc/os-release as of fedora 35:[F35-ChangeSet](https://fedoraproject.org/wiki/Releases/35/ChangeSet) [Fedora_Linux_in_os-release](https://fedoraproject.org/wiki/Changes/Fedora_Linux_in_os-release)), and some distribution-agnostic experience with (GNU/)Linux desktop.

This article is a big TODO now

## Why fedora?
tl;dr: A pipe of complaints, probably continuously growing with time

The very miserable linux desktop world, where commercialization fails utterly and completely, has only very few developers (even GNOME and KDE lacks developers severely), and even fewer commercially backed ones. The linux universe is absurdly low in human resource density (developers scatter around the world, no commercial and full-time support for most developers). I see no unified pushing force other than very few projects: the [Linux Kernel](https://www.kernel.org/) itself, the compilers [GCC](https://www.kernel.org/) and [Clang](https://clang.llvm.org/), the [Xorg](https://www.x.org) and [freedesktop](https://www.freedesktop.org/) developers, the [GNOME](http://gnome.org/) and [KDE](https://kde.org/) desktop environments. 

In this very miserable world, no standard base image exists, like any other sane operating system have. This world is still in the 1970s UNIX centuries, when users have to depend on system administrators to get software, and these administrators made users depend on them, without any idea of "interchangeability" or "standardization". By contrast, Windows have developed a single base image since forever, standardize on Win32 APIs, and provide stable user space API also since forever. In the sense of base image, linux can not even be called an operating system: [There is no linux platform](https://blogs.gnome.org/tbernard/2019/12/04/there-is-no-linux-platform-1/).

The "linux desktop" actually never come true in Window XP ages; it only come sort of true when the "biggest innovation", GPU drivers, start to [work with linux desktop](https://www.techrepublic.com/article/fedora-at-15-why-matthew-miller-sees-a-bright-future-for-the-linux-distribution/), but still (as of 2021) [not scalable to the general public](https://itvision.altervista.org/why.linux.is.not.ready.for.the.desktop.current.html). 

Some reasons why it still failed completely and utterly, 20 years later when people start to expect its success: [Why hasn’t The Year of the Linux Desktop happened yet?](https://blogs.gnome.org/uraeus/2017/12/19/why-hasnt-the-year-of-the-linux-desktop-happened-yet/).

So before the long waited a unified base image appears, I have to rely on a distribution.
A few criterion of mine:
* Somewhat standard configuration at most places (Rules out exotic distributions like slackware)
* Strong affiliation with RHEL (including some admin tooling support like firewall-config, authselect, etc)
* Click to install and upgrade (Arch and Gentoo fails with "click to upgrade")
* Saner packaging standard than debian
* Shorter life cycle (LTS is almost synonymous to "bug included" plus "missing features" plus "security not included", and most developers only want to work with latest versions; you don't want LTS unless on servers)
* Binary packages from upstream (some projects build binary packages for Ubuntu and RHEL, and RHEL ones usually work with fedora since [RHEL provides abi compatibility for basic packages](https://access.redhat.com/articles/rhel8-abi-compatibility))

SELinux is sometimes annoying but since setting permissive mode can be made [per-domain](https://wiki.centos.org/HowTos/SELinux#Gathering_Audit_Logs_In_Permissive_Mode) it make sense to leave it open enforcing.

## Why GNOME?
GNOME is not so bad despite the rumors. Some reasons for GNOME:
* Have the most features (rules out everything other than GNOME, KDE, Xfce and Cinnamon)
* Have a working wayland compositor (Cinnamon's x11 window manager is based on a very old version of mutter; KDE is catching up, but KDE has more compatibility concerns, since GNOME is notorious for cutting features while KDE is not)
* Much less buggier than KDE (mostly because KDE have fewer developers and even fewer commercially backed ones)
* Have more consistent design and less confusing settings interface
* I personally do not requires desktop widgets very hardly (If so GNOME is not a choice)
* I personally do not theme stuff other than a shell theme: [flat-remix-gnome](https://github.com/daniruiz/flat-remix-gnome) (GNOME's adwaita looks much worse than KDE's breeze (and oxygen if you like), but not so creepy on a good laptop screen and a wallpaper)
* I also do not rely on KWin scripts to do certain things

One architectural problem is that GNOME's wayland compositor and X11 window manager, mutter, is not separated to its own process, but convoluted with gnome-shell, so it can theoretically expose more instability and memory leak than KWin. It is very unlikely to be changed shortly because this will almost always break gnome-shell extensions.

## A setup script
[setup.sh](setup.sh)
