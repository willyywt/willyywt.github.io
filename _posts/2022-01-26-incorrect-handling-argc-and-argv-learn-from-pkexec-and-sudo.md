---
layout: post
title: Incorrect handling argc and argv - learn from pkexec and sudo
last_modified_at: 2022-01-26
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
Since the first time I learned C from school I thought handling argc and argv could cause problems, but there was no real world lessons I could learn from. Now I found two examples of incorrect handling of them, unfortunately all root privilege escalations: pkexec and sudo.

Hacker news report:
* [Pwnkit: Local Privilege Escalation in polkit's pkexec (CVE-2021-4034) (seclists.org)](https://news.ycombinator.com/item?id=30077271)
* [Heap-based buffer overflow in Sudo (qualys.com)](https://news.ycombinator.com/item?id=25919235)

Also see abusing `argv==0` with gdb and pkexec: [argv silliness](https://ryiron.wordpress.com/2013/12/16/argv-silliness/)

The sudo code even lead to a contest problem in Peking University's CTF contest, [PKU 1st Geekgame](https://github.com/PKU-GeekGame/geekgame-1st/tree/master/writeups/lrh#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%AC%E4%B9%89). Original sudo code in sudo version 1.9.4p2: [sudoers.c](https://github.com/sudo-project/sudo/blob/741cf082a358120dcbbe1005bd794bad157e4e10/plugins/sudoers/sudoers.c#L971-L975)
