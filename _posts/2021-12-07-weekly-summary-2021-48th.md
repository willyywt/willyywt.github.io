---
layout: post
title: "Yang Wentao's weekly summary (2021 48th)"
category: weekly-summary
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
I decided to start writing weekly summaries because best programmers write blogs, and making it weekly can make self-monitoring effective: a proof of "I must did something every week, even being 'try xxx without success'".

## Programming
Well, the weekly summary will currently be about programming, any stuff I did with something to do with programming.

I think I will not elaborate on details very much, and if I decided to do so I may open a new blog about these details in depth, but very likely I will just pass on. I am not an expert (not even a proficient user) in 99% cases, and it's not a bad idea to just collect a few useful links to other blogs.

## AutoCAD assignment - Do Win32 GUI programming
I fought with my AutoCAD course assignment for the first half week. The AutoCAD assignments are mostly tied to the AutoCAD software, but the one that is due last Wednesday is about writing GUI programs in general, on Windows. (It looks like a beginner's tinyCAD... CAD is a big job, uhh) The assignment includes lots of tasks, like displacing some simple figures like dots and lines and circles on screen, reading and saving data files, handling mouse clicks, using modal windows to do user interaction, etc. GUI stuff is always a little bit messy, due to two reasons: the inherit complexity of GUI, GUI programs must do more jobs than non-GUI, background programs; the rising user expectation, users expect GUI programs to be more intuitive, more powerful, and less buggy... well, high standards!

The CAD assignments wants me to base my assignments on MFC, but MFC is very terrible: it is a very outdated framework aged since 1992, is fundamentally incompatible with C++11 features, does very leaky abstractions over raw Win32, and enforces a very convoluted MVC model which makes code messy and you cannot bypass this MVC model easily. I looked for alternatives for MFC but to my surprise there aren't: the sources I found on the Internet are either about something "modern" like .NET, WinRT, or about other unrelated, entirely new frameworks like [duilib](https://github.com/duilib/duilib). It turns out that nobody on the Internet cares about doing Win32 programming anymore and everything is either does web design like [Chromium Embedded Framework (cef)](https://bitbucket.org/chromiumembedded/cef/src/master/) or does some in-house developed direct ui drawing. I pray for the poor souls who still have to mess with ancient enterprisy systems like Windows XP and have to maintain these f**king MFC code, without remedies...

Anyway, I eventually pick the most spartan approach: use raw Win32 API. (Of course, with some help from code copied over the Internet). The approach turned out to be much more difficult than I think, and I failed to understand how many things like "Windows Resources" are supposed to work. I also ran into issues of modal windows. But luckily, the final code works, after a big bunch of copying and patching code.

### Show a window
To show a window you need to register a window class first, using `RegisterClassExW()`. The most important field in the `WNDCLASSEXW` structure, `lpfnWndProc`, is called "WindowProc" or simply "WndProc" that handles all sorts of messages that Windows send to windows of this window class. 

The Windows have a very big bunch of convoluted messaging which I don't want to care at all, but anyway I am unfortunate enough to write on MFC or raw Win32 and without a larger framework I am already in hell, right? There are some basic messages that I have to guess (in the sense of "I guess it should work this way, because this is how Windows work") like `WM_CREATE`, `WM_COMMAND`, `WM_PAINT`, `WM_DESTROY`,  and maybe `WM_SIZE` for status bars and `WM_MOUSEMOVE` for mouse moving, etc. (My guessing is luckily proved to be correct in the end.).

There is a macro `HANDLE_MSG` in `<windowsx.h>` that saves me from writing some boilerplate code to handle these `WM_*` messages. `HANDLE_MSG` requires a callback and you can see the signatures of these callbacks in the header file `<windowsx.h>`, in the comments of the expansion result of `HANDLE_MSG` (`HANDLE_MSG` expands itself according to the names of `WM_*` messages).

After you completed creating the window class, you should use `CreateWindowExW()` to create a window of this class.

### Use GDI function to draw on window
This is the most fun part in the assignment and seeing figures draw on screen is a really satisfactory programming experience.

Drawing should happen when you received `WM_PAINT` message. The process is simple: you read from your data save in memory (see "reading and writing files" later), and draw lines, dots and circles according to what the data says. If you doesn't have anything you can also do random data drawing using `rand()` which draws random points on screen (the random points looks prettier than you think).

### Reading and writing files
This is the same as doing non-GUI programming. I added some error checks during reading to make sure that the data file must not be read in a corrupted state. Once I confirmed that the data read into memory is ready I save it to a pointer (simply use global variable). Writing files is simpler than reading because the error checks are less necessary: due to the strict reading process the data in memory is more trustworthy than the data in a file, so I can rely on it.

### Widgets, Resource
I didn't understand it at all. For status bar and toolbar I use [Common Controls](https://docs.microsoft.com/en-us/windows/win32/controls/creating-common-controls); for menu bar I use `lpszMenuName`  in the `WNDCLASSEXW` structureduring `RegisterClassExW`. Basically I copied code from Microsoft documentation and from Microsoft's github samples because I cannot understand fully what these do.

### Popup window
I encountered some strange behaviour with popup window. I didn't resolve it, so I have to work around it: use `ChooseColor()` first and create my buggy popup window later. This isn't in accordance with the assignment requirement (the assignment requires using a "Color" button in your custom popup window), but doing as the assignment says freezes the Color window whose reason I don't know, so to make the program at least works I have to do so.

### Handling mouse clicks
The mouse clicks in menubar and toolbar are handled by `WM_COMMAND`, and in the client area handled by `WM_LBUTTONDOWN` and `WM_MOUSEMOVE` (the assignment requires showing the mouse coordinate in status bar; the coordinate is relative to the window rather than the entire computer screen).

The right click popover menu is not covered in the assignment.

## Miscellaneous things
### Android adb shell to do recursive sha256sum
I found out that Android usb debugging (adb) can get a shell and does bash script and sha256sum. Of course, due to Android's restrictive nature (see [Android has a strong security model](https://madaidans-insecurities.github.io/android.html)) some "of course it should work" operation will fail, like get the parent directory from `/storage/emulated/0/`. But doing things directory from pwd `/` is fine.

I had a script using `find`, `xargs` to make `sha256sum` results recursive over a directory. I had used it over MTP along with backup but since libusb is [pretty buggy](https://github.com/whoozle/android-file-transfer-linux) I looked for a process that can does `sha256sum` directy in my phone. I expected that this was impossible with additional app but it turns out that a simple `adb shell` can does this job. The final command line looks like (prints sha256sum results directly to terminal; pwd is `/`)
`bash /storage/emulated/0/recursion.sh -c sha256sum -d /storage/emulated/0/ ./DCIM`

## References
[如何注册窗口类？](https://meishizaolunzi.com/ru-he-zhu-ce-chuang-kou-lei/)

[Windows API 中的 GDI](https://www.kancloud.cn/apachecn/zetcode-zh/1950120) (mirror of [ZetCode - Windows API tutorial](https://zetcode.com/gui/winapi/gdi/))

[Windows API 菜单](https://www.kancloud.cn/apachecn/zetcode-zh/1950113) (mirror of [ZetCode - Windows API tutorial](http://zetcode.com/gui/winapi/menus/))

[Windows-classic-samples](https://github.com/microsoft/Windows-classic-samples)
