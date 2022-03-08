---
layout: post
title: "Yang Wentao's weekly summary (2021 49th)"
last_modified_at: 2022-01-23
categories: weekly-summary
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
Mostly a coasting week, I didn't do any serious stuff related to programming, but I messed around some miscellaneous stuff, about git and GTK tutorials.

## Merging daniruiz/flat-remix-gnome
I merged [daniruiz/flat-remix-gnome](https://github.com/daniruiz/flat-remix-gnome) to [willyywt/flat-remix-gnome](https://github.com/willyywt/flat-remix-gnome). I didn't do this for several weeks and I noticed that daniruiz has added some stuff since I last merged daniruiz/flat-remix-gnome:
* Improved contrast of accented items of calender popover
* Added a lot more GNOME shell theme color variants: brown, cyan, magenta, grey, orange, teal, violet, white

I met with some git conflicts during merging, which I hadn't expected before. Merging different git branches with minor tweaks turns out to me more difficult than I think, and I look forward to establishing a complete workflow for keeping small patches working.

And, the way git handles conflicts is not very friendly (btw git handles so many things very [confusingly](https://hintjens.gitbooks.io/scalable-c/content/chapter1.html#problem-git-isnt-working). Git is confusing and hurting, even for developers...). When you get a git conflict, git rewrites all conflicting files with its custom "\<\<\<", "=======", "\>\>\>" thing and you must manually edit these lines, by hand. Ahh, and git fully trust developers not to make mistakes, so git will happily accept any edit result of these poor files: if you wrongly deleted unwanted lines, git will still merge them, without warnings. Why git cannot just leave two different versions of conflicting files aside, and let developers pick diffs with better tools like `vimdiff` or some VSCode extensions? If you use `vimdiff` or any kind of diff tools, it's very unlikely that developers mess around lines: these tools make very clear that what lines changed, and made editing friendly. With git's \<\<\<=======\>\>\> you have to crawl into the files to find diff'ed areas, and you can easily get to the wrong areas or make mistakes on "which version is the new one?".

## GTK tutorial series: issues with mouse events
I met some problems with collecting mouse coordinate. On Win32 I bascially handle `WM_MOVE`. On GTK 3 I tried to use `GtkEventControllerMotion` (new in GTK 3.24) but I found the results for XWayland broken: under XWayland the mouse move event are not triggered, unless I drag the mouse with mouse left button down. (I guess on X11 it will be less broken, but I don't know.) Also, on Wayland the "enter" and "leave" signals seems to never be triggered, so clearing the status bar is broken.
