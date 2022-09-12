---
layout: post
title: "Ambiance GTK theme, modern version"
last_modified_at: 2022-06-27
categories: [awesome, gtk]
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
**Warning: This doesn't really work on GNOME 42, which introduced GTK 4 applications, powered by libadwaita. I believe the UI designs by libadwaita is the right direction, and the ambiance GTK theme start to look weird when compared with libadwaita. (The official GTK 3 Adwaita theme isn't great either, but it looks closer to libadwaita) Even I really like this theme much better than the official one (especially the dark variant), it needs a lot of refreshing to fit the visual designs of libadwaita.**

This modern Ambiance version is a minimal fork of Adwaita that makes me really like GTK theme again.

## Ambiance GTK Theme
From [adwaita-gtk-ubuntu](https://github.com/pojntfx/adwaita-gtk-ubuntu):
> A modern Ambiance replacement that keeps Ubuntu's identity while staying upstream

### Looks great on GNOME 41!
Although the source repo says it's designed for the Unity desktop, I test it on GNOME 41 and it looks pretty good. I would strongly recommend it as a drop-in replacement for the upstream adwaita theme. It is largely based on the adwaita theme so applications are very likely to not break their interfaces. while still looking much more attractive than the upstream adwaita theme. 

The revived ambiance theme is very greyish and not flat (looks like a revival of the good old GTK 2 looks), and has silver header bar instead of the yellowish one in adwaita. It's accent color (`$selected_bg_color`) is configurable at a source level, at 'Adwaita-Ubuntu/gtk-3.0/_colors.scss'. The default one is `#23A5D4`.

### Screenshots:
*Update 2022-01-23: changed accent color to #EC0101 (light red), which looks much more marrier. See new screen shots below*

Light blue:

<figure>
  <img src="../../../../static/2021-12-02/ambiance-gtk-theme-screenshot-1.png" width="1920" height="1080" alt="ambiance-gtk-theme-screenshot-1" />
  <figcaption><b>From the top to bottom: <a href="https://xournalpp.github.io/">xournalpp</a>, <a href="http://goldendict.org/">goldendict</a></b>
  </figcaption>
</figure>
<figure>
  <img src="../../../../static/2021-12-02/ambiance-gtk-theme-screenshot-2.png" width="1920" height="1080" alt="ambiance-gtk-theme-screenshot-2" />
  <figcaption><b>From the top to bottom: <a href="https://gitlab.gnome.org/GNOME/gnome-control-center/">GNOME Control Center</a>, <a href="https://www.lyx.org/">Lyx</a>, <a href="https://wiki.gnome.org/Apps/Files/">GNOME Files</a>, <a href="https://firewalld.org/">Firewalld</a></b>
  </figcaption>
</figure>
<figure>
  <img src="../../../../static/2021-12-02/ambiance-gtk-theme-screenshot-3.png" width="1920" height="1080" alt="ambiance-gtk-theme-screenshot-3" />
  <figcaption><b>From the top to bottom: <a href="https://wiki.gnome.org/Apps/Files/">GNOME Files</a>, <a href="https://www.mozilla.org/firefox">Firefox</a>, <a href="https://wiki.gnome.org/Apps/Evolution/">Evolution</a>, <a href="https://firewalld.org/">Firewalld</a></b>
  </figcaption>
</figure>

Light red:

<figure>
  <img src="../../../../static/2022-01-23/ambiance-gtk-theme-screenshot-4.png" width="1409" height="997" alt="ambiance-gtk-theme-screenshot-4" />
  <figcaption><b>Evince with light red</b>
  </figcaption>
</figure>
<figure>
  <img src="../../../../static/2022-01-23/ambiance-gtk-theme-screenshot-5.png" width="1920" height="1080" alt="ambiance-gtk-theme-screenshot-5" />
  <figcaption><b>Firefox, evolution, GNOME Files</b>
  </figcaption>
</figure>

### Note
I choose 12px as the default font size, because on 1080p computer screens 11px (the default choice of GNOME Shell) is not big enough for me.
