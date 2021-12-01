---
layout: post
title: "Ambiance GTK theme, modern version"
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
This modern Ambiance version is a minimal fork of Adwaita that makes me really like GTK theme again.

## Ambiance GTK Theme
From [adwaita-gtk-ubuntu](https://github.com/pojntfx/adwaita-gtk-ubuntu):
> A modern Ambiance replacement that keeps Ubuntu's identity while staying upstream

### Looks great on GNOME 41!
Althought the source repo says it's designed for the Unity desktop, I test it on GNOME 41 and it looks pretty good. I would strongly recommend it as a drop-in replacement for the upstream adwaita theme. It is largely based on the adwaita theme so applications are very likely to not break their interfaces. while still looking much more attractive than the upstream adwaita theme. 

The revived ambiance theme is very greyish and not flat (looks like a revival of the good old GTK 2 looks), and has silver header bar instead of the yellowish one in adwaita. It's accent color (`$selected_bg_color`) is configurable at a source level, at 'Adwaita-Ubuntu/gtk-3.0/_colors.scss'. The default one is `#23A5D4`.

### Screenshots:
![ambiance-gtk-theme-screenshot-1](../../../static/2021-12-02/ambiance-gtk-theme-screenshot-1.png)
*From the top to bottom: [xournalpp](https://xournalpp.github.io/), [goldendict](http://goldendict.org/), [Firefox](https://www.mozilla.org/firefox/), [Evolution](https://wiki.gnome.org/Apps/Evolution)*

![ambiance-gtk-theme-screenshot-2](../../../static/2021-12-02/ambiance-gtk-theme-screenshot-2.png)
*From the top to bottom:[GNOME Control Center](https://gitlab.gnome.org/GNOME/gnome-control-center), [Lyx](https://www.lyx.org/), [GNOME Files](https://wiki.gnome.org/Apps/Files), [Firewalld](https://firewalld.org/)*

![ambiance-gtk-theme-screenshot-3](../../../static/2021-12-02/ambiance-gtk-theme-screenshot-3.png)
*From the top to bottom:[GNOME Files](https://wiki.gnome.org/Apps/Files), [Firefox](https://www.mozilla.org/firefox/), [Evolution](https://wiki.gnome.org/Apps/Evolution)*

### Note
I choose 12px as the default font size, because 11px (the default choice of GNOME Shell) is not big enough for me.
