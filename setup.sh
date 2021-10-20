#!/bin/sh
# vim users can use 'set foldmethod=marker' to fold some sections

##### Environment variables that this script accepts #####
# Environment variables {{{1
## Naming: all capitcal case; uSe "SET_" or "IS_" prefix for boolean values
# SETUP_SET_FLATHUB_SJTU:          Flathub sjtu mirror
# SETUP_SET_FLATPAK_FCITX:         Flatpak Qt im method set to fcitx
# SETUP_FLATPAK_SYSTEM_DIR:        Flatpak system installation directory
# SETUP_FILE_DIR:                  Backup dir (SETUP_FILE_DIR is only a shorthand to set SETUP_FILE_DIR_FULL and will not be used later)
# SETUP_FILE_DIR_FULL:             Backup dir, cannonical
# SETUP_CONFIG_GIT_EMAIL           Git author email
# SETUP_CONFIG_GIT_NAME            Git author name
# SETUP_SET_MAC_RANDOMIZATION      Use macchanger to randomize mac address
# Don't plain to test non-default value
# SETUP_IS_BTRFS:                  Create btrfs subvolume for flatpak system
# SETUP_IS_SELINUX:                Have SELinux enabled
# SETUP_SET_FLATPAK_SYSTEM_BACKUP: Backup flatpak system, the backup must be at $SETUP_FILE_DIR_FULL/../flatpak
# SETUP_SET_SYSCTL_HARDEN:         Harden sysctl. Harden source: https://madaidans-insecurities.github.io/guides/linux-hardening.html

if [ -z $SETUP_SET_FLATHUB_SJTU ] ; then SETUP_SET_FLATHUB_SJTU=1 ; fi                                     
if [ -z $SETUP_SET_FLATPAK_FCITX ] ; then SETUP_SET_FLATPAK_FCITX=1 ; fi                                                   
if [ -z $SETUP_FLATPAK_SYSTEM_DIR ] ; then SETUP_FLATPAK_SYSTEM_DIR="/var/lib/flatpak" ; fi        
if [ -z $SETUP_FILE_DIR ] ; then SETUP_FILE_DIR="setup" ; fi                                       
if [ -z $SETUP_FILE_DIR_FULL ] ; then SETUP_FILE_DIR_FULL=$HOME/$SETUP_FILE_DIR ; fi                
if [ -z $SETUP_SET_MAC_RANDOMIZATION ]; then SETUP_SET_MAC_RANDOMIZATION=1 ; fi

## Don't plain to test non-default value
if [ -z $SETUP_IS_BTRFS ]; then SETUP_IS_BTRFS=1; fi                                               
if [ -z $SETUP_IS_SELINUX ]; then SETUP_IS_SELINUX=1; fi                                           
if [ -z $SETUP_SET_FLATPAK_SYSTEM_BACKUP ]; then SETUP_SET_FLATPAK_SYSTEM_BACKUP=1; fi                     
if [ -z $SETUP_SET_SYSCTL_HARDEN ]; then SETUP_SET_SYSCTL_HARDEN=0; fi                                     
#}}}1

_SETUP_TEMP="__setuptemp"
setup_fs_dir() {
	pushd ~
	mkdir -pv .config
	mkdir -pv .local/bin
	mkdir -pv .local/share
	ln -s local_additions/notes   notes	
	ln -s local_additions/sysinfo sysinfo	
	ln -s local_additions/utility utility	
	ln -s local_additions/private private	
	ln -s .wine/drive_C C
	if [ $SETUP_IS_BTRFS ]; then
		btrfs subvolume create devel	
	else	
		mkdir -pv devel
	fi
	mkdir -pv .bashrc.d
	popd
}

# dot files track{{{1
# ~/.config/qv2ray
# ~/.vim/vimrc
# ~/.themes
# ~/.local/share/fcitx5
# ~/.gnupg
# ~/.bashrc
# ~/.config/VSCodium/
# /root/op/
# ~/.local/share/fonts
# /usr/local/jdk
# /usr/local/texlive
#}}}1
_setup_warning_backup_not_found() {
	echo "Warning: backup cannot be found: $1" >&2
}
setup_rpm_installed() {
	# if setup_rpm_installed gnome-shell ; then echo "Installed gnome-shell"; fi
	rpm -qi $1 > /dev/null
}
setup_rpm_check_all() {
	failed=0
	SETUP_ALL=(macchangers gnome-tweaks gnome-extensions-app)
	for pkg in ${SETUP_ALL[*]} ; do
	       if ! setup_rpm_installed $pkg ; then
		       echo "Warning: $pkg not installed"
		       failed=1
	       fi 
	done
	return $failed
}
setup_backup() {
	if [ ! -d $1 ]; then
		_setup_warning_backup_not_found $3
		return 1
	fi
	if [ -z $4 ] ; then
		# Directory $2 must exists
		mkdir -pv $2
		cp -r $1/* $2
	else
		cp -r $1 $2
	fi
}
setup_backup_qv2ray() {
	setup_backup $SETUP_FILE_DIR_FULL/qv2ray $HOME/.config/qv2ray "qv2ray"
}
setup_backup_shell_themes() {
	setup_backup $SETUP_FILE_DIR_FULL/themes $HOME/.themes "shell_themes"
}
setup_backup_fcitx5() {
	setup_backup $SETUP_FILE_DIR_FULL/fcitx5 $HOME/.local/share/fcitx5 "fcitx5"
}
setup_backup_flatpak_data() {
	tar -xf $SETUP_FILE_DIR_FULL/flatpak_data.tar -C $HOME
}
# setup_gsettings_1(){{{1
setup_gsettings_1() {
	# Use gnome-extensions instead of gsettings to enable extension
	gnome-extensions enable apps-menu@gnome-shell-extensions.gcampax.github.com
	gnome-extensions enable appindicatorsupport@rgcjonas.gmail.com
	gnome-extensions enable netspeed@hedayaty.gmail.com
	gnome-extensions enable user-theme@gnome-shell-extensions.gcampax.github.com
	gnome-extensions enable gsconnect@andyholmes.github.io
	gsettings set org.gnome.desktop.wm.keybindings lower "['<Super>y']"
	# Overviews in gnome-shell create CPU hogs very efficiently, disable "Super" to show directly.
	gsettings set org.gnome.mutter overlay-key ""
	# KP_ is for key pad
	gsettings set org.gnome.desktop.wm.preferences titlebar-font "思源黑体 CN 11"
	gsettings set org.gnome.desktop.peripherals.touchpad natural-scroll false
	gsettings set org.gnome.desktop.peripherals.touchpad tap-to-click true
	gsettings set org.gnome.desktop.peripherals.touchpad two-finger-scrolling-enabled true
	gsettings set org.gnome.desktop.peripherals.touchpad click-method 'areas'
	gsettings set org.gnome.desktop.interface document-font-name "思源宋体 CN 12"
	gsettings set org.gnome.desktop.interface font-name "思源黑体 CN 12"
	gsettings set org.gnome.desktop.interface monospace-font-name "Source Code Pro 12"
	#gsettings set org.gnome.desktop.wm.keybindings maximize "['<Super>KP_Up']"
	#gsettings set org.gnome.desktop.wm.keybindings unmaximize "['<Super>KP_Down']"
	gsettings set org.gnome.desktop.wm.keybindings raise "['<Super>t']"
	gsettings set org.gnome.desktop.wm.keybindings lower "['<Super>y']"
	gsettings set org.gnome.desktop.wm.keybindings switch-windows "['<Alt>grave']"
	gsettings set org.gnome.desktop.wm.keybindings switch-windows-backward "['<Shift><Alt>grave']"
	gsettings set org.gnome.desktop.wm.keybindings toggle-fullscreen "['<Super>f']"
	gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-up   "['<Super>KP_Page_Up']"
	gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-down "['<Super>KP_Next']"
	gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-1 "['<Super>KP_Home']"
	gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-last "['<Super>KP_End']"
	gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-up "['<Shift><Super>KP_9']"
	gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-down "['<Shift><Super>KP_3']"
	gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-type "nothing"
	gsettings set org.gnome.settings-daemon.plugins.media-keys control-center "['<Super>i']"
	gsettings set org.gnome.settings-daemon.plugins.media-keys home "['<Super>e']"
	#TODO: does not work: 没有"favourite-apps" 这个架构
	#gsettings set org.gnome.shell favourite-apps "['org.gnome.Software.desktop', 'org.gnome.Extensions.desktop', 'org.gnome.tweaks.desktop']"
	gsettings set org.gnome.shell.extensions.netspeed use-bytes true
	gsettings set org.gnome.shell.extensions.netspeed bin-prefixes true
	gsettings set org.gnome.shell.extensions.user-theme name "Flat-Remix-Green-fullPanel"
	gsettings set org.gnome.settings-daemon.plugins.media-keys custom-keybindings "['/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/', '/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom1/']"
	# TODO: fix creation of /custom*
	#gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/custom2/ binding '<Alt>F3'
	#gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/custom2/ command "gnome-terminal -- bash -c \"vim $HOME/local_additions/complaints.txt\""
	#gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/custom2/ name 'complaints'
	#gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/custom1/ binding '<Primary><Alt>t'
	#gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/custom1/ command 'gnome-terminal'
	#gsettings set org.gnome.settings-daemon.plugins.media-keys.custom-keybinding:/custom1/ name '启动终端'
	#gsettings set org.gnome.gnome-screenshot auto-save-directory ""
}
#}}}1
# setup_wrapper(){{{1
setup_wrapper() {
	# op wrapper
	cat > ~/.local/bin/op << __EOF__
#!/bin/sh
sudo /root/op/$@
__EOF__
	# flatpak wrapper
	cat > ~/.local/bin/f << __EOF__
#!/bin/python3
import sys,os
command = sys.argv[1]
print("command:" + command)
FLATPAK_DIR = "/var/lib/flatpak/exports/bin/"
path = FLATPAK_DIR

findcount = 0
string1 = ""
with os.scandir(path) as it:
    for entry in it:
        if (command.lower() in entry.name.lower()):
             findcount += 1
             string1 = FLATPAK_DIR + entry.name
             print("find:"+string1)

print("find " + str(findcount) + " commands")
if findcount == 1:
    print("exec:"+string1)
    os.execl(string1, string1)
__EOF__
	chmod a+x ~/.local/bin/f
	chmod a+x ~/.local/bin/op
}
#}}}1
# setup_gnome_software_memleak(){{{1
setup_gnome_software_memleak() {
	# Work around for gnome-software memory leak caused by Packagekit
	mkdir -pv ~/.config/systemd/user
	cat > ~/.config/systemd/user/gnome-software-restart.service << __EOF__
[Unit]
Description=Restarts gnome-software
[Service]
ExecStart=/bin/bash -c "/bin/kill \`pidof gnome-software\`; exec /bin/gnome-software --gapplication-service"
[Install]
WantedBy=default.target
__EOF__
	cat > ~/.config/systemd/user/gnome-software-restart-wrapper.service << __EOF__
[Unit]
Description=Wrapper for "Restarts gnome-software"
[Service]
ExecStart=/bin/systemctl --user restart gnome-software-restart.service
__EOF__
	cat > ~/.config/systemd/user/gnome-software-restart.timer << __EOF__
# Systemd's timer documentation is very broken and confusing:
# https://bbs.archlinux.org/viewtopic.php?id=231408
# https://github.com/systemd/systemd/issues/6680
# https://unix.stackexchange.com/questions/126786/systemd-timer-every-15-minutes
[Unit]
Description=Restart gnome-software Timer
[Timer]
OnStartupSec=30s
OnUnitActiveSec=4h
RandomizedDelaySec=1m
Unit=gnome-software-restart-wrapper.service
[Install]
WantedBy=default.target
__EOF__
	systemctl --user enable --now gnome-software-restart.timer
}
#}}}1
###########################################
setup_config_bashrc_d() {
	cat > ~/.bashrc.d/751-gpg.sh
#!/bin/sh
GNUPGHOME="~/private/gnupg"
export GNUPGHOME
__EOF__
}
setup_config_pip3() {
	pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple/
}
setup_config_npm() {
	npm config set registry https://registry.npm.taobao.org
}
setup_config_cargo() {
	mkdir -p ~/.cargo
	cat > ~/.cargo/config << __EOF__
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'tuna' # 替换成你偏好的镜像源
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
[source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"
[source.rustcc]
registry = "git://crates.rustcc.cn/crates.io-index"
__EOF__
}
setup_config_vim() {
	# vim
	mkdir -pv ~/.vim
	cat > ~/.vim/vimrc << __EOF__
unlet! skip_defaults_vim
source \$VIMRUNTIME/defaults.vim
autocmd FileType sh setlocal foldmethod=marker
__EOF__
}
setup_config_git() {
	if [ $SETUP_CONFIG_GIT_EMAIL ] ;  then
		git config --global user.email $SETUP_CONFIG_GIT_EMAIL #22425315+willyywt@users.noreply.github.com
	fi
	if [ $SETUP_CONFIG_GIT_NAME ] ; then
		git config --global user.name $SETUP_CONFIG_GIT_NAME #willyang
	fi
	git config --global init.defaultBranch main
}
setup_config_ssh() {
# ssh proxy for github
mkdir -pv ~/.ssh
cat > ~/.ssh/config << __EOF__
Host github.com
    User                    git
    ProxyCommand            nc --proxy localhost:1089 --proxy-type socks5 %h %p
__EOF__
}
setup_config_s3cmd() {
# s3cmd
mkdir ~/.s3temp # ~/utility/s3put.sh
mkdir ~/.s3backtmp # ~/utility/s3backup.sh
ln -s /run/user/1000/.s3cfg ~/.s3cfg
}


########### ROOT #################
# Run sed without being root. Some files that cannot be read by unpriviledged users must be copied by sudo

setup_su_flatpak_after() {
# Flatpak
	sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
	sudo flatpak remote-modify --disable fedora
	if [ $SETUP_SET_FLATHUB_SJTU ] ; then
		sudo flatpak remote-modify flathub --url=https://mirror.sjtu.edu.cn/flathub
	fi
	if [ $SETUP_SET_FLATPAK_FCITX ] ; then
		sudo flatpak override --env=QT_IM_MODULES=fcitx5
	fi
}
setup_su_backup_flatpak_system() {
	if [ -d $SETUP_FLATPAK_SYSTEM_DIR ] ; then
		sudo rm -r $SETUP_FLATPAK_SYSTEM_DIR
	fi
	if [ $SETUP_IS_BTRFS ]; then
		sudo btrfs subvolume create $SETUP_FLATPAK_SYSTEM_DIR
	else
		suod mkdir -v $SETUP_FLATPAK_SYSTEM_DIR
	fi
	sudo cp -r $SETUP_FILE_DIR_FULL/../flatpak/* $SETUP_FLATPAK_SYSTEM_DIR
	if [ $SETUP_IS_SELINUX ]; then
		sudo touch /.autorelabel
	fi
}
setup_su_flatpak() {
	if [ $SETUP_SET_FLATPAK_SYSTEM_BACKUP ]; then
		setup_su_backup_flatpak_system
	fi
	setup_su_flatpak_after
}
setup_su_packagekit() {
	sudo cp /etc/PackageKit/PackageKit.conf /etc/PackageKit/PackageKit.conf.original
	sudo cp /etc/PackageKit/PackageKit.conf /tmp/$_SETUP_TEMP-packagekit
	grep -q \#ShutdownTimeout /etc/PackageKit/PackageKit.conf
	if [ $? != 0 ] ; then echo "Warning: cannot find #ShutdownTimeout in PackageKit conf" >&2; fi
	sed -e 's/#ShutdownTimeout/ShutdownTimeout/' /tmp/$_SETUP_TEMP-packagekit > /tmp/$_SETUP_TEMP-packagekit_2
	sudo cp /tmp/$_SETUP_TEMP-packagekit_2 /etc/PackageKit/PackageKit.conf
}
setup_su_polkit() {
	# sudo cp /etc/polkit-1/rules.d/org.freedesktop.packagekit.rules /etc/polkit-1/rules.d/org.freedesktop.packagekit.rules.original
	cat > /tmp/$_SETUP_TEMP-polkitconf << __EOF__
polkit.addRule(function(action, subject) {
    if ((action.id == "org.freedesktop.Flatpak.app-install" ||
         action.id == "org.freedesktop.Flatpak.runtime-install"||
         action.id == "org.freedesktop.Flatpak.app-uninstall" ||
         action.id == "org.freedesktop.Flatpak.runtime-uninstall") &&
        subject.active == true && subject.local == true &&
        subject.isInGroup("willy")) {
            return polkit.Result.YES;
    }
    if ((action.id == "org.freedesktop.packagekit.package-install" ||
         action.id == "org.freedesktop.packagekit.package-uninstall") &&
        subject.active == true && subject.local == true &&
        subject.isInGroup("willy")) {
            return polkit.Result.YES;
    }
    if ((action.id == "org.freedesktop.packagekit.package-install" ||
         action.id == "org.freedesktop.packagekit.package-uninstall") &&
        subject.active == true && subject.local == true &&
        subject.isInGroup("wheel")) {
            return polkit.Result.YES;
    }
    return polkit.Result.NOT_HANDLED;
});
__EOF__
	sudo cp /tmp/$_SETUP_TEMP-polkitconf /etc/polkit-1/rules.d/org.freedesktop.packagekit.rules
}
setup_su_logind() {
	sed -e 's/#KillUserProcesses=no/KillUserProcesses=yes/' /etc/systemd/logind.conf > /tmp/$_SETUP_TEMP-logind
	sudo cp /tmp/$_SETUP_TEMP-logind /etc/systemd/logind.conf
}
setup_su_sysctl() {
	sudo cp /etc/sysctl.conf /etc/sysctl.conf.orig
	sudo cp /etc/sysctl.conf /tmp/$_SETUP_TEMP-sysctl.conf
	if $SETUP_SET_SYSCTL_HARDEN ; then
	cat >> /tmp/$_SETUP_TEMP-sysctl.conf << __EOF__
kernel.sysrq=20
kernel.kexec_load_disabled=1
kernel.kptr_restrict=2
kernel.dmesg_restrict=1
kernel.printk=3 3 3 3
kernel.unprivileged_bpf_disabled=1
kernel.yama.ptrace_scope=2
kernel.perf_event_paranoid=2
net.core.bpf_jit_harden=2
dev.tty.ldisc_autoload=0
vm.mmap_rnd_bits=32
vm.mmap_rnd_compat_bits=16
vm.unprivileged_userfaultfd=0
net.ipv6.conf.default.accept_source_route = 0
net.ipv6.conf.*.accept_source_route = 0
-net.ipv6.conf.all.
net.ipv4.icmp_echo_ignore_all=1
net.ipv4.tcp_sack=0
net.ipv4.tcp_dsack=0
net.ipv4.tcp_fack=0
net.ipv4.tcp_syncookies=1
net.ipv4.tcp_rfc1337=1
__EOF__
	fi
	cat >> /tmp/$_SETUP_TEMP-sysctl.conf << __EOF__
# For VSCode and npm
fs.inotify.max_user_watches=524288
__EOF__
	sudo cp /tmp/$_SETUP_TEMP-sysctl.conf /etc/sysctl.conf
}
setup_su_macchange() {
	if [ $SETUP_SET_MAC_RANDOMIZATION == 0 ] ; then return 0; fi
	if ! setup_rpm_installed macchange; then echo "Error: macchange not installed"; return 1; fi
	cat > /tmp/$_SETUP_TEMP-macspoof << __EOF__
#https://wiki.archlinux.org/title/MAC_address_spoofing#systemd_unit
[Unit]
Description=macchanger on %I
Wants=network-pre.target
Before=network-pre.target
BindsTo=sys-subsystem-net-devices-%i.device
After=sys-subsystem-net-devices-%i.device

[Service]
ExecStart=/usr/bin/macchanger -e %I
Type=oneshot

[Install]
WantedBy=multi-user.target
__EOF__
	sudo cp /tmp/$_SETUP_TEMP-macspoof /etc/systemd/system/macspoof@.service
	# Not yet enabled, because we don't know network device interface
	# Example: systemctl enable macspoof@wlp1s0.service
	# Don't use --now before restarting Networkmanager
}
setup_su_backup() {
	if [ ! -d $1 ]; then
		_setup_warning_backup_not_found $3
		return 1
	fi
	if [ -z $4 ] ; then
		# Directory $2 must exists
		sudo mkdir -pv $2
		sudo cp -r $1/* $2
	else
		sudo cp -r $1 $2
	fi
}
#### Custom steps ####
setup_custom_after() {
	# not enabled by default: gnome-extensions enable hidetopbar@mathieu.bidon.ca
	setup_su_backup $SETUP_FILE_DIR_FULL/hidetopbar /usr/share/gnome-shell/extensions/hidetopbar@mathieu.bidon.ca
}
setup_custom_before() {
	echo ""
}
main() {
	if [ -d $SETUP_FILE_DIR_FULL ] ; then
		echo "Using backup at directory: $SETUP_FILE_DIR_FULL"
	else
		echo "Cannot find backup! aborting" >&2
		exit 1
	fi
	if [ $PWD != $HOME ] ; then
		echo "Please return to $HOME to execute this script (current: $PWD)" >&2
		exit 1
	fi
	setup_custom_before
	# fs directory must goes first
	setup_fs_dir
	# These go next, at any order
	# TODO: collect failed steps
	# TODO: make this script reentrant (can be safely executed again)
	setup_gsettings_1 &
	setup_backup_flatpak_data &
	setup_backup_qv2ray &
	setup_backup_shell_themes &
	setup_backup_fcitx5 &
	setup_gnome_software_memleak &
	setup_wrapper &
	setup_config_pip3 &
	setup_config_vim &
	setup_config_git &
	setup_config_ssh &
	setup_config_s3cmd &

	##### ROOT ######
	# Prompt sudo password later, so that during user type password, some steps can be executed meanwhile to make this script execute faster
	echo "Testing sudo"
	sudo echo "Start ROOT config"
	# Also does flatpak system backup if SETUP_SET_FLATPAK_SYSTEM_BACKUP
	setup_su_flatpak &
	setup_su_macchange &
	setup_su_logind &
	setup_su_polkit &
	setup_su_packagekit &
	setup_su_sysctl &
	setup_custom_after &
	wait
	echo "Setup finished!"
}
