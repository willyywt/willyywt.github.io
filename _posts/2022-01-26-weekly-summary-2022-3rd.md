---
layout: post
title: "Yang Wentao's weekly summary (2022 3rd)"
last_modified_at: 2022-06-17
categories: weekly-summary
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
Add trivial lines to make last week's fortran parallel using OpenMP; also perfecting my blog's theme (lots of work)

## OpenMP
Copied a few lines from [Using openmp with fortran](https://curc.readthedocs.io/en/latest/programming/OpenMP-Fortran.html#barrier-and-critical-directives). Last week's fortran program is highly parallelable because each particle's next state only depend on its surrounding particle's previous state, and the fortran program does not do concurrent memory write inside one loop, so the parallelism is trivial: simply use OpenMP (which is inserted as compiler directives) to declare the loops to be parallel.

Currently I only do parallelism to the outermost loop, because the inner loops share a variable (inner loops need to calculate a sum first and keep doing addition to one variable), which, when trivially made parallel, will be slow (because the compiler adds implicit locks to the shared variable).

## Blog theme
i summarized my work at [theme.html](../../../../article/theme.html).
