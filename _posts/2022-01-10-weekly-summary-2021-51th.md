---
layout: post
title: "Yang Wentao's weekly summary (2021 51th)"
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
It was during the exam weeks so I couldn’t do programming as much as I like (￣□￣) Did some basic searching about interesting efforts on making ABI (binary interfaces) work interoperablely on common linux desktops.

## ABI Laboratory
 [abi-laboratory.pro](https://abi-laboratory.pro/) is a website that holds analysis of ABI breakages of libaries on comon linux desktops. The analysis is done using the [open-source](https://abi-laboratory.pro/index.php?view=open-source) tools authored by the website's owner. The analysis is not done in CI environments but submitted on a voluntary basis, so the results is for reference only (I guess it cannot fully reflect all ABI breakages on common linux desktops...)

Example: (very stable)[libX11](https://abi-laboratory.pro/index.php?view=timeline&l=libx11), [gtk](https://abi-laboratory.pro/index.php?view=timeline&l=gtk%2B), (stable)[Qt](https://abi-laboratory.pro/index.php?view=timeline&l=qt), (unstable)[ffmpeg](https://abi-laboratory.pro/index.php?view=timeline&l=ffmpeg), [boost](https://abi-laboratory.pro/index.php?view=timeline&l=boost)
 
## αcτµαlly pδrταblε εxεcµταblε
[Actually Portable Executable - Cosmopolitan](https://justine.lol/ape.html) is a libc which makes applications work across almost all linux distributions, MacOS, Windows, FreeBSD, OpenBSD, and NetBSD too. The author write this with simple applications at mind but later more complex applications can be made (with many small patches) to work on Cosmopolitan, including the [lua interpreter](https://www.lua.org/) and later even the [python interpreter](https://www.python.org/). Links: [Compiling Lua with Cosmopolitan](https://ahgamut.github.io/c/2021/02/27/ape-cosmo/) and [Python is Actually Portable](https://ahgamut.github.io/2021/07/13/ape-python/). The Cosmopolitan author was really gratified about these results and replied on the hacker news report on this: [Actually Portable Executables (ahgamut.github.io)](https://news.ycombinator.com/item?id=26292166)

## How to write shared libraries
[How To Write Shared Libraries](https://akkadia.org/drepper/dsohowto.pdf) is a paper on technical details of the ELF (Executable and Linkable Format, ELF) files, how the linux kernel load shared libraries, and what libraries developers need to understand to maintain a stable ABI.

Some practical steps on making things like rpath work: [library-path-in-gcc](https://transang.me/library-path-in-gcc/), [rabbit hole of rpath and origin](https://longwei.github.io/rpath_origin/), [Understanding RPATH (with CMake)](https://dev.my-gate.net/2021/08/04/understanding-rpath-with-cmake/) (no rpath on windows? yeeeh...)
