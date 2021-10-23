---
layout:page
title: My fedora linux setup
---
I will try to summarize my experience of fedora linux distribution ("Fedora Linux" is in /etc/os-release as of fedora 35:[F35-ChangeSet](https://fedoraproject.org/wiki/Releases/35/ChangeSet) [Fedora_Linux_in_os-release](https://fedoraproject.org/wiki/Changes/Fedora_Linux_in_os-release)), and some distribution-agnostic experience with (GNU/)Linux desktop.

tl;dr: A pipe of complaints, probably continuously growing with time. I will write this article with a much more trenchant tone than usual, because real developers face the real world other than living in the illusionary universe..

This article is a big TODO now

## Why fedora?

The very miserable linux desktop world, where commercialization fails utterly and completely, has only very few developers (even GNOME and KDE lacks developers severely), and even fewer commercially backed ones. The linux universe is absurdly low in human resource density (developers scatter around the world, no commercial and full-time support for most developers). I see no unified pushing force other than very few projects: the [Linux Kernel](https://www.kernel.org/) itself, the compilers [GCC](https://www.kernel.org/) and [Clang](https://clang.llvm.org/), the [Xorg](https://www.x.org) and [freedesktop](https://www.freedesktop.org/) developers, the [GNOME](http://gnome.org/) and [KDE](https://kde.org/) desktop environments. 

In this very miserable world, no standard base image exists, which any other sane operating systems like Windows, MacOS/iOS and Android have. This world is still in the 1970s UNIX centuries, when users have to depend on system administrators to get software, and these administrators made users depend on them, without any idea of "interchangeability" or "standardization". By contrast, Windows have developed a single base image since forever, standardize on Win32 APIs, and provide stable user space API also since forever. (The linux world's stable userspace API only stops at the kernel, and things dramatically breaks on top; although on the bright side, projects like [Freedesktop Runtime](https://www.codethink.co.uk/articles/2021/ABI-stability-freedesktop/) start to care about ABI.) In the sense of base image, linux can not even be called an operating system: [There is no linux platform](https://blogs.gnome.org/tbernard/2019/12/04/there-is-no-linux-platform-1/).

The "linux desktop" actually never come true in Window XP ages; it only come sort of true when the "biggest innovation", GPU drivers, start to [work with linux desktop](https://www.techrepublic.com/article/fedora-at-15-why-matthew-miller-sees-a-bright-future-for-the-linux-distribution/), but still (as of 2021) [not scalable to the general public](https://itvision.altervista.org/why.linux.is.not.ready.for.the.desktop.current.html). 

Some reasons why it still failed completely and utterly, 20 years since people first start to expect its success: [Why hasn’t The Year of the Linux Desktop happened yet?](https://blogs.gnome.org/uraeus/2017/12/19/why-hasnt-the-year-of-the-linux-desktop-happened-yet/).

So before the long waited a unified base image appears, I have to rely on a distribution.
A few criterion of mine:
* Somewhat standard configuration at most places (Rules out exotic distributions like slackware)
* Strong affiliation with RHEL (including some admin tooling support like firewall-config, authselect, etc)
* Click to install and upgrade (Arch and Gentoo fails with "click to upgrade")
* Saner packaging standard than debian
* Shorter life cycle (LTS is almost synonymous to "bug included" plus "missing features" plus "security not included", and most developers only want to work with latest versions; you don't want LTS unless on servers)
* Closer to upstream (two counter examples: [Ubuntu root access](https://cyberriskleaders.com/how-to-get-root-on-ubuntu-20-04-by-pretending-nobodys-home/) and [Cinnamon lock by-pass](https://github.com/linuxmint/cinnamon-screensaver/issues/354). While upstream code will have bugs, the downstream patches are more likely to fall behind)
* Binary packages from upstream (some projects build binary packages for Ubuntu and RHEL, and RHEL ones usually work with fedora since [RHEL provides abi compatibility for basic packages](https://access.redhat.com/articles/rhel8-abi-compatibility))

SELinux is sometimes annoying but since setting permissive mode can be made [per-domain](https://wiki.centos.org/HowTos/SELinux#Gathering_Audit_Logs_In_Permissive_Mode) it make sense to leave it open enforcing.

## Why GNOME?
GNOME is not so bad despite the rumors. Some reasons for GNOME:
* Have the most features (rules out everything other than GNOME, KDE, Xfce and Cinnamon)
* Have more developers (rules out Xfce and Cinnamon)
* Have a working wayland compositor (Currently use unstable protocols: [fullscreen-shell-unstable-v1](https://wayland.app/protocols/fullscreen-shell-unstable-v1) and [tablet-unstable-v2](https://wayland.app/protocols/tablet-unstable-v2))(Cinnamon's x11 window manager is based on a very old version of mutter; KDE is catching up, but KDE has more compatibility concerns, since GNOME is notorious for cutting features while KDE is not; [wlroots](https://github.com/swaywm/wlroots/)-based ones like [Sway](https://swaywm.org/) are not desktop environments)
* Much less buggier than KDE (mostly because KDE have fewer developers and even fewer commercially backed ones, although GNOME is short of developing resources either)
* Have more consistent design and less confusing settings interface
* I personally do not requires desktop widgets very hardly (If so GNOME is not a choice)
* I personally do not theme stuff other than a shell theme: [flat-remix-gnome](https://github.com/daniruiz/flat-remix-gnome) (GNOME's adwaita looks much worse than KDE's breeze (and oxygen if you like), but not so creepy on a good laptop screen and a wallpaper)
* I also do not rely on KWin scripts to do certain things

TODO: use KDE for much longer times, and try out Xfce and Cinnamon

One architectural problem is that GNOME's wayland compositor and X11 window manager, mutter, is not separated to its own process, but convoluted with gnome-shell, so it can theoretically expose more instability and memory leak than KWin. It is very unlikely to be changed shortly because this will almost always break gnome-shell extensions.

## The wrong idea of flatpak: trying to become a sandbox
My view on flatpak (more accurately, it's [official runtimes](https://docs.flatpak.org/en/latest/available-runtimes.html))is that it is just a completely new linux distribution. Yes, one another incompatiable linux distribution, not some fancy other things that flatpak claims to be.

The great part of it is that it runs on top of almost all linux distributions, and does somewhat integration on fonts, themes, etc. It also has a right development model: a notion of a base image. Developers now directly build application on top of freedesktop runtime (and gnome and kde runtimes, which are based on freedesktop runtime), instead of having a middle man, the "distributions" that stop developers to make applications, and are pround to be the "proud" remains of the "1970s UNIX system admins" (yes, admins do a lot of hard work, but the world will be better without them). Importantly, the runtime [cares about API stability](https://www.codethink.co.uk/articles/2021/ABI-stability-freedesktop/).

The wrong part is that it is trying to boost itself as a "sandbox". A desktop system never care about "sandbox", for two reasons. The first one is about practical limits: sanboxing is impossible to build without [stable system API, system-wide sandbox framework, well-written mandatory access control policies](https://madaidans-insecurities.github.io/linux.html). The previous link is about securites which is different than sandboxing, but doesn't change the point that today's linux world is not ready for it: no stable system API, no system-wide sandbox framwork beyond the kernel, no well-written madatory access control policies outside fedora-based distributions (which doesn't include X11 window managers and Wayland compositors, because Red Hat doesn't spend a lot of money on desktops). The second one is even more severe, about designed usages: people simply don't expect desktop systems to be "sandboxed".

TODO: more elaboration

## A setup script
[setup.sh](setup.sh)

