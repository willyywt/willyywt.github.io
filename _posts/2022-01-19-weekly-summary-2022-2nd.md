---
layout: post
title: "Yang Wentao's weekly summary (2022 2nd)"
last_modified_at: 2022-04-09
categories: weekly-summary
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
Holiday time! Setting up some basic understandings of LBM (lattice boltzmann method). Also fiddle around with my linux distribuion.

## Lattice Boltzmann Method
LBM (lattice boltzmann method) is a numerial simulation method commonly used in CFD (computational fluid dynamics). It is not direcly based on the well-known NS (Navier-Stokes) equations, but based on the following modal:
* the Boltzmann equation (yes, the equation from the molecular dyhamics)
* Discrete lattice description of the velocity, time and space
* the BGK (Bhatnagar, Gross and Krook) approximation to reduce the collision term to fluctuation around the equilibrium distribution. (Without approximation the Bolzmann equation would be impossible to solve except very few special cases.)

LBM is numerially stable (thanks to the distribution function description of discrete lattice particles and of the collision operator), works under Low Mach Number Assumption, computationaly highly parallel (because the next state of a particle only depends on the previous state of particles around it), and has very wide applications since its first appearance in the late 1980s.

I am not very familiar with the physics meaning of the LBM (since I am just starting to learn fluid dynamics and I almost forgot everything from my physics courses) but papers show that LBM can be used to describle many, many diverse physics systems, including those not typically described by Boltzmann equation, like non-ideal gases and multiphase mixtures.

## The simple lid driven cavity program
(Is this computation task the standard test of every CFD method...?)
A postdoc at Prof. Liu's group give me a sample fortran program to calculate the classical lid driven cavity problem, using the LBM. Reading fortran program is not generally a hard point when working on CFD, unlike CS students who spend most time on studying code. Doing CFD is a combination of lots of careful work, and fortran is only a small piece of it... Nevertheless, to get started with CFD research, I have to start small and accumulate necessary skills first.

### Compliation
I use [gfortran](https://gcc.gnu.org/fortran/) to compile the program from the postdoc. I also added a [meson](http://mesonbuild.com/) build config file to it. Meson worked just like C (at least so far): install `gfortran`, add all files to `source` argument of `executable()`, and it compiles. Uhh, a littlie quirk: intel fortran compiler use max line length of 2048 but gfortran use 132 by default (fortran 90), so I add `-ffree-line-length-2048` to `fortran_args` keyword argument of `executable()`. (It's fortran so no `c_args`.)

### Read the program
Reading program is a easy job, because fortran syntax is far less confusing (and also far less flexible) than C. Reading program is also a hard job, becaue you need to establish correspondence between the program and the papers of LBM. 

A computer program is eventually, for computers, and is far less experessive than human languages. To do high level understanding and abstraction over the program is usually impossible without referencing to human readable articles that explain the program's background (sometimes refers to "documentation" when using CS jargons, but I prefer the word "background" here.) 

The bad part is human languages can't be compiled to programs, so we are stuck with computer programs anyway. Fortran doesn't give us many means of abstraction, so the best we can do is to do reasonable naming to variables and functions. (Fortran doesn't have pointers, structs as in C), and write some necessary comments to separate "different blocks of data" (I can hardly call fortran code "code" because they are just plain accumulation of primitives: arithmetic calculation,  for loops, if conditions, fix-array indexes, etc.) We also can't spend very much time on documentation, because we have to spare time for the real underlying mathmatics and mechanics. Sounds miserable right? This is the real world of CFD...

### Fortran langauge quirk
Fortran still has implicit declaration, which is a terrible legacy from fortran 77. With implicit declaration magic can happen: uninitialized variable, automatic variable types, etc. But fortran will happily compile without warnings of anykind. Fortunately, since fortran 90 you can use `implicit none` to make compilers error against undeclared variables or functions.

The postdoc's program use `implicit none` only in modules, but it is wrong: `implicit none` does not get propagated to the subroutines or program (here "program" is as in fortran keyword `program`) that use this module. The correct way is to add `implicit none` in **every module, subroutine and program**.

Fortran has implicit declaration not only for variables, but also for **functions**. The implicit declaration for functions is even magicer:
* If you use a function without declaration, fortran will happily compile. (Of course, use  `implicit none` to make compilers error against this)
* Fortran will try to find its definition elsewhere. (Not too bad ugh?)
* Fortran will assign a default return type for this function (`integer` or `real`), but the return type will not match with your definition elsewhere. If your definition is `double precision`, fortran will *not* link the function to your defintion, while still compiling! In fact, fortran will "cleverly" add a stub function which returns zero, and ignoring your definition entirely! (WTF??)

The solution: in addition to `implicit none`, define your function in the module, and use the module in other files. Other files will correctly link to the definition, and error out if the name, parameter type or return type of the function is different than the definition in the module.

## LBM Calculation steps
The program from the postdoc is indeed much more simpler than many traditional methods like FEM (Finite Element Method) or SPH Method (Smooth Particle Hydrodynamics Method). (In fact, Prof Liu assigned this to the postdoc to try out LBM's potential to compete with traditional methods.) It's also much simpler than many algorithms taught in CS.

1. Assign initial condition.
2. Collision: use the collision operator to calculate the next state of particles. (Only done for internal particles)
3. Evolution: at the next (discrete) time, move the particles to their next position. (Only done for internal particles)
4. Calculate physical parameters like density and velocity.
5. Calculate boundary particles decided by boundary conditions.
6. Repeat 2-5. Stop when the densify function has converged (can be seen by calculating the difference between two iteratons of 2-5)

LBM itself is a large topic and many models have been established based on LBM. Currently the most influential model is a series of DnQm model by Qian etc. in the 1990s, where n is the dimension of space and m is the dimension of discrete velocity. For the program from the postdoc $n=2$, $m=9$.

* Collision: $f$ becomes $f - (f - f_{eq})/\tau$, where $f_{eq}$ is the equilibrium distribution function
* Evolution: $f(x, t)$ move to $f(x+\alpha, t+dt)$
* Boundary: (Is another difficult topic, but for simple velocity condition:)$f(x_b,t) = \bar{f_{eq}}(u,\rho)$ where $x_b$ is the coordinate of boundary particle, $\bar{f_{eq}}(u,\rho)$ is $f_{eq}(x,t)$ expressed in terms of velocity $u$ and density $\rho$.  When the velocity of fluid at the boundary is given, $u$ takes such velocity and $\rho$ is approximated with the density of internal particles next to the boundary.

### Dimensionless quantity
In CFD calculations are usually done on dimensionless numbers, and restore to physical quantities only after calculation. The textbook of fluid mechanics seems to cover it bui I haven't read it yet. (Another reason to start to learn fluid mechanics)

### Parameters of the simple LBM lid driven cavity program
LBM deals with real physics model, so even in the simple and classical lid driven cavity problem, there are lots of parameters. I list some of the most interest here:

* Density of the lattice. As in the traditional FEM, the density of the lattice determines the final accuracy of the calcuation: the densiter the lattice is, the more accurate the result will be. But usually, the lattice doesn't need to be incredibly dense to get satisfactory results.
* Velocity of the lid. Because LBM can be reduced to NS equations only under Low Mach Number Assumption, the velocity of the lid must not be large, preferably less than 0.3 times of the sound speed of the fliud. The velocity of the lid is usually 0.1 at the largest.
* Cavity size.
* Reynolds number of the fluid. For larger Reynolds number turbulance occur and LBM start to converge more slowly. For smaller Reynolds number laminar (sheet-like) flows occur.
* Velocity of sound speed of the fluid. In D2Q9 model this is a fixed value $1/\sqrt{3}$. (Do *not* try to modify this value)

## Some fiddling around

### Changed accent color of ambiance gtk theme
Previous post: I changed my gtk theme to [a modern vesion of ambiance](../../../../2021/12/02/ambiance-gtk-theme-modern-version.html).

I changed accent color to #EC0101 (light red), which looks much more marrier.

### VNote QtWebengine crash on fedora 35
([VNote](https://vnotex.github.io/vnote) is a pleasant note-taking platform. It is not only a confortable markdown editor but also suitable for those who wants to use markdown to establish a complete note taking workflow.)

On fedora 35 VNote's QtWebengine always crashes on start, which breaks the HTML preview ("read mode"). I didn't think about it at first and thought it would be resolved soon, but after vnote updated I realized that even the author don't know how to deal with it.

It is a known issue: [1942](https://github.com/vnotex/vnote/issues/1942). It seems to be a Qt issue and nobody including the author has figured this out. Adding command line option `--no-sandbox` work around it: [VNote诡异问题](https://www.usmacd.com/2022/04/01/vnote/#%E8%AF%A1%E5%BC%82%E9%97%AE%E9%A2%98)(`no-sandbox` for chromium is known to be insecure, but is applied for all [electron](https://www.electronjs.org/) apps.)
