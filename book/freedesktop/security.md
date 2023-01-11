---
layout: book_chapter
navigate_index: navigate_index.html
title: "Security Notes"
---

Freedesktop/Linux distributions usually ships with insane settings that voids your security. Although the desktop security model is largely broken compared to mobile platforms, as dear users of a libre desktop platform, we at least can make the job of security crackers somewhat more difficult and expensive.

## Kernel

### Sysctl
Below are some sysctl settings that should be safe to apply as default. Append these to a file under `/etc/sysctl.d/` like `/etc/sysctl.d/98-sysctl.conf`, and use `systemd-analyze cat-config sysctl.d` to list effective sysctl files. (sysctl will load vendor defaults from `/usr/lib/sysctl.d/` and `/run/sysctl.d/`, and settings from a latter file will silently override the previous ones, so make sure your custom filename is at a later alphanumerical order.)

Modifying the configuration file will take effect after reboot; if you wish to apply a file's setting immediately, use `sysctl -p /etc/sysctl.d/98-sysctl.conf`.

#### ptrace
```conf
kernel.yama.ptrace_scope=1
```
Ptrace is a very dangerous syscall which allows running process's memory to be modified. Example: https://ritiek.github.io/2019/06/26/modifying-memory-of-a-running-process-in-linux/. The kernel defaults to only restrict ptrace to dumpable process running under the same uid, but this is enough to bypass all restrictions that a "sandbox" claims to do. Distributions refuse to restrict this default just to cater to corner cases where incorrect configuration of debugging programs rely on this, which is insane. Reasonable programs like KDE, Chromium, Firefox and Wine's crash handlers use `prctl(PR_SET_PTRACER, pid, ...)` to restrict debugger pid; if a process wish to disable ptrace restrictions it can just set `prctl(PR_SET_PTRACER, PR_SET_PTRACER_ANY, ...)` so any other process can attach ptrace to it. 

The above sysctl can restrict the relations of processes that uses ptrace. Settings this to `1` applies a default restriction to parent-child (and decendent child) process relation only, which is a large step from the default that only restricts uid. (On Freedesktop/Linux there are no reasonable protections against a malicious parent process, so trusting parent process is not a bad idea.) Alternatively, you can set this to `2` which restricts to root and `3` to disable entirely.

See kernel documentation: https://www.kernel.org/doc/html/latest/admin-guide/LSM/Yama.html#ptrace-scope.

#### fs
```conf
fs.protected_fifos = 2
fs.protected_regular = 2
```
Privileged process sometimes need to write temporary files. On sticky directories, it is only wise when the file don't exist at all (hense the usage of `O_CREAT`), so that the kernel will create one with the same uid and gid, which is secure. However, if the privileged process naively use `access()` to first and use `open(O_CREAT)` to create one later, then at the exact time gap between `access()` and `open()`, a malicious process can sneakly create one with the same filename, so that later call to `open(O_CREAT)` will not create one, but instead reuse existing file owned by the malicious process, so that the malicious can sliently change the file's content without notice. Due to how the operating system schedule processes, this is not as uncommon as one might think. (This is known as the classi TOCTOU race condition, Time-of-check_to_time-of-use)

The correct way is to use `O_CREAT` simutaneously with `O_EXCL` so `open()` will simply fail (so that the privileged process can just try other filename; note that `O_TRUNC` is incorrect here because it doesn't change file owners, and in addition will be ignored if the existing file is a FIFO). Not all process do this: some process may attempt `chown()` and clearing content later, which is not fool-proof enough.

The above sysctl will tell the kernel to make `open()` fail for files that the privileged process don't own under world-writeable sticky directories or group-writeable sticky directroies, preventing protential malicious process to overwrite it's content.

```conf
# These are already systemd default.
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
```
These are also intended to prevent incorrect file checking with potential TOCTOU race condition, but this time with symlink and hardlink. 
These are more concerned with existing files, rather than creating a new temporary file, and are even more dangerous because symlink and hardlink are more frequently used as a dangerous interface that unprivileged process present to privileged process. (In other worlds, privileged process more frequently attempt to read them without sanitizing.)

For hardlink, setting to `1` will prevent users to create hardlink for files that they don't own. For symlink, setting to `1` will prevent symlink to be followed in sticky world-writable directory that don't match the process's uid and also don't match the directory owner.


See kernel documentation at https://www.kernel.org/doc/html/latest/admin-guide/sysctl/fs.html.

### Kernel modules
TODO

## GRUB password
TODO

## Account
TODO

## USB Guard
TODO

## References
[Madaidan insecurities - Linux Hardening Guide](https://madaidans-insecurities.github.io/guides/linux-hardening.html)
