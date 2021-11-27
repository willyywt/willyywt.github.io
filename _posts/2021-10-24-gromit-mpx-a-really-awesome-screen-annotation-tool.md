---
layout: post
title: "Gromit-mpx: a really awesome screen annotation tool"
categories: awesome
---

[gromit-mpx](https://github.com/bk138/gromit-mpx) is a really awesome tool that can make annotations on screen. It runs on X11 (since 1.4 also on XWayland) and on multiple desktop environments.

TODO: work with other desktop environments other than GNOME

![gromit mpx on GNOME with VSCodium and appindicator extension](../../../static/2021-10-24-1.png "gromit mpx on GNOME with VSCodium and appindicator extension")

## Graphics tablets
Magically, it works with graphics tablets, although the developer did not primary aim at tablets. XWayland does not provides direct access to hardware though: XWayland only provides a virtual input device which does not reflect all capabilities of hardware devices, so I can only expect very basic usage of graphic tablets. To completely support graphic tablets on XWayland is not possible: the best can do is to start a native wayland process, collect events from it, and send messages to the main process.

I have one Wacom ctl 672 tablet (costs just 500 RMB, since it's an beginner model). Its graphic tablet stylus has two buttons on it, and when using gromit-mpx I am able to use the upper one as right click (work as an eraser on gromit-mpx) and the lower one as a middle click (which creates green color annotations on gromit-mpx). The annotations are also pressure sensitive but only rounded to two levels of line thickness.

## Some primitive hacking
TODO: make this hacking more "professional", and not so primitive

It is written in GTK 3 with just 2000 lines of C code, written in familiar GLib dialect of C.

Gromit-mpx creates a window almost full screen with transparent alpha channel, so when the window is active it is possible to capture mouse input on this window, and when its inactive it doesn't do anything about mouse and keyboard events, but still displays your annotation (unless the transparent window is hidden by the hotkey). It cannot be truly full screen because when it is full-screen the compositor doesn't draw desktop widgets any longer, so it is actually almost full screen (one pixel less than the overall height of the screen)

Gromit-mpx doesn't draw any widgets itself (other than the initial welcome widget), so it relies on appindicator and hotkey to handle user interactions.

Gromit-mpx use some dbus messaging to implement hotkey feature: since the hotkey starts a new process other than being sent to the primary process itself, the new process need to detect the primary process and sent dbus messages to it.

### Some GNOME and XWayland quirks
XWayland does not allow grabbing of keys and mouses, so the best that gromit-mpx can do is a simulation: when the transparent window is active it captures mouse event and translate to drawings on it, but it cannot do very much to keyboard events, they will still be captured by the wayland compositor. (I guess it might capture non-hotkey keyboard events, but this is not currently done: keyboard events are sent to whatever the underlying application.)

There's no standard way to negotiate global hotkey on wayland applications now: they are supposed to be manually done by users on their specific wayland compositors. gromit-mpx currently detects GNOME and when detected automatically registers global hotkeys on startup, and removes them on shutdown, under the dconf setting `/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/` .

GNOME also removed appindicator support so I have to rely on a extension that support it: [appindicator-support](https://extensions.gnome.org/extension/615/appindicator-support/)
