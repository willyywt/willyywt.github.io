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

The above sysctl can restrict the relations of processes that uses ptrace. Settings this to `1` applies a default restriction to parent-child (and descendant child) process relation only, which is a large step from the default that only restricts uid. (On Freedesktop/Linux there are no reasonable protections against a malicious parent process, so trusting parent process is not a bad idea.) Alternatively, you can set this to `2` which restricts to root and `3` to disable entirely.

#### fs
```conf
fs.protected_fifos = 2
fs.protected_regular = 2
```
Privileged process sometimes need to write temporary files. On sticky directories, it is only wise when the file don't exist at all (hense the usage of `O_CREAT`), so that the kernel will create one with the same uid and gid, which is secure. However, if the privileged process naively use `access()` to first and use `open(O_CREAT)` to create one later, then at the exact time gap between `access()` and `open()`, a malicious process can sneakily create one with the same filename, so that later call to `open(O_CREAT)` will not create one, but instead reuse existing file owned by the malicious process, so that the malicious can silently change the file's content without notice. Due to how the operating system schedule processes, this is not as uncommon as one might think. (This is known as the classi TOCTOU race condition, Time-of-check_to_time-of-use)

The correct way is to use `O_CREAT` simutaneously with `O_EXCL` so `open()` will simply fail (so that the privileged process can just try other filename; note that `O_TRUNC` is incorrect here because it doesn't change file owners, and in addition will be ignored if the existing file is a FIFO). Not all process do this: some process may attempt `chown()` and clearing content later, which is not fool-proof enough.

The above sysctl will tell the kernel to make `open()` fail for files that the privileged process don't own under world-writeable sticky directories or group-writeable sticky directories, preventing protential malicious process to overwrite it's content.

```conf
# These are already systemd default.
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
```
These are also intended to prevent incorrect file checking with potential TOCTOU race condition, but this time with symlink and hardlink. 
These are more concerned with existing files, rather than creating a new temporary file, and are even more dangerous because symlink and hardlink are more frequently used as a dangerous interface that unprivileged process present to privileged process. (In other worlds, privileged process more frequently attempt to read them without sanitizing.)

For hardlink, setting to `1` will prevent users to create hardlink for files that they don't own. For symlink, setting to `1` will prevent symlink to be followed in sticky world-writable directory that don't match the process's uid and also don't match the directory owner.

### Kernel modules
TODO

## GRUB password
Distributions don't set GRUB password by default, which is insane because this means everyone that can reach your computer can just reboot to GRUB commandline, edit the kernel commandline parameters and hence start to elevate to root privileges. This is way too cheap because crackers don't even have to remove your hard disk from your computer to escalate root. (On Windows if crackers can't direcly modify your disk, it is impossible to edit boot parameters before you login)

You can set a GRUB password and request the correct password for the GRUB commandline.

1. Run the command `grub-mkpasswd-pbkdf2` (on Fedora run the command `grub2-mkpasswd-pbkdf2`) and enter your desired GRUB password. This won't change any grub config; it's meant to generate a PBKDF2 hash. Please remember the password you entered, because once you lost this it will require either root privilege, starting from usb drive or taking out your disk to change it. After you enter your desired GRUB password (twice, because you need to confirm your password), it will show a string starting with `grub.pbkdf2.sha512`. You should copy this `<hash>` later; DO include the starting "`grub.pbkdf2.sha512`", but DON'T include the prompt "`PBKDF2 hash of your password is `".

2. Edit the file `/etc/grub.d/40_custom` and append the following content:
```
set superusers="root"
password_pbkdf2 root <hash>
```
Replace `<hash>` with the above `grub-mkpasswd-pbkdf2` output. If you see something like `exec tail -n +3 $0` above, leave it as-is, don't change it.

3. As root run the command (on Fedora use `grub2-mkconfig` instead)
```
grub-mkconfig -o <path_to_grub_config>
```
Replace `<path_to_grub_config>` with the grub config file on your distribution, most likely `/boot/grub/grub.cfg` (on Fedora it's `/boot/grub2/grub.cfg`).
Alternatively, on Debian or Ubuntu, you can use `update-grub` instead.

You want to verify your GRUB settings. Reboot your computer; once GRUB screen starts, instead of picking an entry and booting the computer, press the key 'c' instead. This should require a GRUB username and a GRUB password; first enter "root" and then the password you give to `grub-mkpasswd-pbkdf2` (but not the PBKDF2 `<hash>` sum). If you successfully entered the GRUB commandline, you can press the key `<ESC>` to quit the GRUB commandline.

## Account
TODO

## USBGuard
USB device is not authenticated device in general, but you can smaller the kernel attach surface by restricting the vendor id and product id that the kernel recognizes (the kernel automatically loads drivers according to vendor id and product id; Chrome OS only blocks device class which is not secure enough: [ChromeOS usbguard bypass](https://packetstormsecurity.com/files/167269/ChromeOS-usbguard-Bypass.html)).

USBGuard is a software framework enforcing USB device policy.

### Initial configuration
It ships an empty configuration on installation, but this can be automatically generated for the current USB devices that you plug in. Generate an initial policy list and install it (RHEL 9 documentation recommends `--no-hashes` so I followed it)
```sh
usbguard generate-policy --no-hashes > ./rules.conf
install -m 0600 -o root -g root ./rules.conf /etc/usbguard/rules.conf
```

<div class="note warning"><b>Warning: </b>USBGuard will block all devices by default. Make sure you configured <code>/etc/usbguard/rules.conf</code> before you start the daemon.</div>

Start the daemon with `systemctl enable --now usbguard`. It will start to reject new USB devices.

### IPC interface 
USBGuard daemon provides an IPC interface, and the `usbguard` command use it to interact with the daemon. The IPC interface is restricted to root and group wheel with `IPCAllowedUsers=root` and `IPCAllowedGroups=wheel`, but more granular policies (most likely read-only) can be set with `IPCAccessControlFiles`.

You can see a list of all devices with the command `usbguard list-devices`. This will list all currently plugged USB devices's status: "allow" means the USB devices is allowed, "block" means the kernel will probe the device but not interact with it, and "reject" means the kernel will remove the device node from the system.

You can additionally grant access by using `usbguard allow-device <id>` where `<id>` is the device id seen in `usbguard list-devices`. This is temporary which will lose affect after a reboot; if you want to include the grant into the rules file `rules.conf`, use `usbguard allow-device <id> -p`.

### DBus interface
<div class="note warning"><b>Warning: </b>DBus interface can be used to allow additional USB device permissions. If you install the USBGuard DBus package, make sure you correctly configure your desktop environment settings.</div>

If you install the package `usbguard-dbus` it will also provides a dbus interface for desktop environments.

#### GNOME
GNOME will silently detect USBGuard and pickup support for it. It doesn't yet have GUI application to control it but will show notification for rejected USB devices.

By default it will allow any device if the screen is unlocked. The gsettings `org.gnome.desktop.privacy usb-protection-level` can be used to control this behavior: `lockscreen` means USBGuard policy is only honored when your screen is locked, while `always` means it will be always honored. `always` will also cause the screen to be immediately locked for ANY USB device plugged in, including allowed devices. (This makes sense, since USB devices are unauthenticated in general; any new plug in can be potentially dangerous)

## References
### General
[Madaidan insecurities - Linux Hardening Guide](https://madaidans-insecurities.github.io/guides/linux-hardening.html)

### Kernel Documentation:
* [/admin-guide/LSM/Yama.html](https://www.kernel.org/doc/html/latest/admin-guide/LSM/Yama.html#ptrace-scope
* [/admin-guide/sysctl/fs.html](https://www.kernel.org/doc/html/latest/admin-guide/sysctl/fs.html)

### GRUB
* [GRUB command list](https://www.gnu.org/software/grub/manual/grub/html_node/Commands.html)
* [Authentication and authorisation in GRUB](https://www.gnu.org/software/grub/manual/grub/html_node/Authentication-and-authorisation.html#Authentication-and-authorisation)

### USBGuard
* [RHEL 9 documentation "Protecting systems against intrusive USB devices"](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/security_hardening/protecting-systems-against-intrusive-usb-devices_security-hardening)
* [USBGuard Rule Language](https://usbguard.github.io/documentation/rule-language.html)