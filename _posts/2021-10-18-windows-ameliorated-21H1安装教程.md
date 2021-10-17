# Windows ameliorated 21H1 安装教程（超级详细）
> 施工中，还没有图和

本人其实是比较懒的，一直犹豫了很久不想总结一份教程，这次随着21H1的更新以及本人选择的预装软件的选择的调整，下定决心写一份安装教程。

## Windows ameliorated是什么？
洋文ameliorate的意思就是“改良”。Windows一直有大量的anti-feature，到Windows 10以后变本加厉，不断弹出Windows update（Windows的判断逻辑是你不操作了就可以重启，而不管你在运行什么。。），对用户全方面的监视，比如内建的keylogger，windows search结果全部提交bing，无法完全禁用的cortana，等等。ameliorated的脚本则将这些anti-feature尽可能移除，让windows 10变得更能忍受一些。此外ameliorated也移除了大部分几乎不会被用到的Windows内置软件，减轻硬盘占用（ameliorated完成以后的wim镜像只有4.02GB，安装完成不到20GB）。

## 使用ameliorated脚本的原因
移除Windows中的anti-feature的脚本有很多，甚至也有少量制作了gui界面。但ameliorated的脚本是我看到的最为全面的，并且（虽然不是写脚步水平高的）明显经过良好的测试。ameliorated的作者搭建了一个telegram群，里面人数还挺多的（虽然大部分都是扯淡），时不时发布一些测试版的ameliorated镜像。

## ameliorated网站
ameliorated网站：https://ameliorated.info/。 右上角的三个图标对应telegram群聊https://t.me/joinchat/CR-xFBGQKVt7HPZKgZfbxg，wiki https://wiki.ameliorated.info/，git目录https://git.ameliorated.info/malte/scripts。

## 警告
ameliorated移除了Windows 10设置界面的不少设置，包括Xbox游戏、更新与安全。ameliorated移除了Windows内建的微软拼音的输入法设置，所以如果要改快捷键等等必须在pre-ameliorated之前设置。（当然如果你一上来就装搜狗拼音这一条就和你无关）

ameliorated移除了Windows Store，依赖Windows Store的话不要用ameliorated。

ameliorated只适用于Windows重装，在已有的Windows系统中运行可能不能达到ameliorated正常运行的效果。你可以划一个新的分区对ame进行试验，或者借此机会重新安装Windows。

## 预备材料
* 闲置的u盘一个（或者移动硬盘）。如果你已经有一个在用的，请把里面的文件备份到其它地方，或者干脆用一个新的（如果买新的建议无脑选闪迪的容量>=64GB的u盘，价格和容量（GB）的比值接近1:1）。对u盘有如下要求：
  * u盘不能是山寨扩容盘（常见于价格20以内的低价u盘，或者各种活动的赠品）。山寨扩容盘标称容量远大于实际容量，比如说实际只有16GB标称64GB，结果在尾部64GB的位置写入就奔溃了
  * 建议u盘的写入速度不要太低，我的u盘的写入速度在20MB-30MB之间
  * 建议u盘的读取速度不要太低（如果满足上一条一般这一条也能满足）
  * 建议u盘的插口不要太松，启动盘usb接口出现松动可能会直接导致启动镜像崩溃
* Windows 21H1版本的安装iso镜像文件，可以从这个磁力链接下载：
   * magnet:?xt=urn:btih:d6ed0ca62352b3d61eb1ec921596f030d866473c&dn=cn_windows_10_consumer_editions_version_21h1_x64_dvd_1baf479d.iso 。(当然也可以选择使用微软的镜像下载工具等等。)
* 两个Windows更新文件，kb4598481和kb5004237的两个msu文件。从windows update catalog下载：（我下载的时候https下载显示服务未恢复，所以选http下载。安装更新的时候Windows会进行校验，所以不存在安全问题。如果浏览器对http下载提出警告，选择继续下载即可）
   * https://www.catalog.update.microsoft.com/Search.aspx?q=KB4598481
   * https://www.catalog.update.microsoft.com/Search.aspx?q=KB5004237
* Ventoy的安装包。Ventoy是我们要使用的启动盘制作软件。
   * https://ventoy.net/cn/download.html
* ame的脚本，解压缩zip并提取其中的scripts文件夹。注意不同windows版本的ame脚本不能混用，本链接只适用**Windows 10 21H1**版本。
   * https://git.ameliorated.info/attachments/8ab144e7-03fb-431b-a788-7a7488a4c454
* 某一种Linux发行版的iso文件和对应的软件包。本教程中使用Fedora Workstation 34（就是传说中名声不太好的GNOME）
   * iso镜像文件：https://mirrors.tuna.tsinghua.edu.cn/fedora/releases/34/Workstation/x86_64/iso/
   * fzf软件包：
https://mirrors.tuna.tsinghua.edu.cn/fedora/updates/34/Everything/x86_64/Packages/f/fzf-0.27.2-1.fc34.x86_64.rpm
* （如果chocolatey网速太慢，并且不保留原先的Windows系统的话必选）事先下载机器的网卡驱动和一个浏览器（比如Firefox）。ameliorated完成以后windows系统里面什么都没有，所以这一步必选。chocolatey网速不错的地方（比如教育网）可以不选这一步。当然如果保留原先的Windows系统，可以借助原先Windows系统下载并复制到新的Windows系统中。
推荐软件：7zip，Firefox, VLC, jpegview, sysinternals
   * 国际版Firefox链接：https://www.mozilla.org/zh-CN/firefox/（注意域名后缀.org而不是.com.cn）
   * 网卡驱动（直接从机器销售厂家的网站上下载，不要用驱动精灵等流氓软件）
* 当然，还要有少量的耐心（毕竟大部分步骤都不是很熟悉）

# 第一部分：（Ventoy）制作Windows启动盘并分区

# 第二部分：安装Windows
这一部分没有难度，直接安装即可。如果需要保留原先的windows系统的话，安装的时候选择安装在空闲的磁盘空间里面。安装完成以后，在EFI分区中的Windows Boot Manager启动会提示需要启动哪一个分区的windows系统，选择即可（默认启动的分区可以通过msconfig.exe修改）

# 弟三部分（可选）：微调Windows界面
这一部分是ame项目的推荐选项，可选。这些选项在ame脚本执行完成以后仍然可以设置。**如果要调整微软拼音的快捷键等必须在这一部分设置。**

# 第四部分：手动安装Windows更新
ameliorated会移除windows update自动的功能，所以这一步就可以开始熟悉通过dism手动安装更新的步骤了。

# 第五部分：运行ame脚本（pre-ameliorated部分）
用cmd或者powershell运行ame脚本。ame脚本运行后，首先提示安装.NET 3.5，需要windows的安装iso文件。找到这个文件，右击选择“装载”，Windows会分配一个驱动器号，在cmd窗口中输入这个驱动器号（带冒号）。

接下来的过程耐心等待即可。中间桌面壁纸会变成白屏，因为ame脚本临时关闭了explorer.exe。中间会跳一次错提示setup.exe找不到，直接按下Enter继续即可。ame脚本运行完成以后提示“按下任意键重启”，重启。

# 第六部分：（Ventoy）制作临时Linux启动盘
这里和第一部分是一样的，借助Ventoy的强大力量，只需要下载iso文件并复制到Ventoy中即可。
我选择的linux发行版（也是我日常使用的发行版）是Fedora，使用它主推的Workstation版本

在tuna镜像站下载Fedora 34（Workstation）的镜像：https://mirrors.tuna.tsinghua.edu.cn/fedora/releases/34/Workstation/x86_64/iso/，并复制到Ventoy中。和第一部分一样，直接复制即可，不需要其它操作。

**重要：在进入下一步之前，将AME脚本中BASH文件夹里的SnD_21H1_2021-10-13.sh和fzf软件包fzf-0.27.2-1.fc34.x86_64.rpm这两个文件复制到C盘根目录。**

**重要：在进入下一步之前，将AME脚本中BASH文件夹里的SnD_21H1_2021-10-13.sh和fzf软件包fzf-0.27.2-1.fc34.x86_64.rpm这两个文件复制到C盘根目录。**

**重要：在进入下一步之前，将AME脚本中BASH文件夹里的SnD_21H1_2021-10-13.sh和fzf软件包fzf-0.27.2-1.fc34.x86_64.rpm这两个文件复制到C盘根目录。**

复制完成以后关机并和第一部分一样，从usb启动，在Ventoy中按上下键选择下载的镜像文件名（Fedora-Workstation-Live-x86_64-34-1.2.iso)，按Enter进入Fedora的启动界面，按上键跳过镜像校验（如果u盘速度比较快可以不跳过校验），再按下Enter，屏幕应该开始显示一大堆systemd的启动日志，随后进入GNOME桌面环境。

# 第七部分（ame关键步骤，不可省略）：进入Linux，使用Linux运行ame脚本（ameiliorated部分）
启动以后来到了一个什么都没有的GNOME桌面环境。对于GNOME我想吐槽的地方很多，但不是重点。这里我们仅说必要步骤。

首先用鼠标点击中间的很大一块区域，等这块区域变成全屏以后，点击弹出的Fedora试用窗口，点击“Try fedora”，点击“Close"。然后键盘按下Windows徽标键（GNOME称之为"Super键"），输入"term"按下`<Enter>`弹出一个终端窗口；再按下Super键，输入"file"按下`<Enter>`，弹出一个文件管理器的窗口。（顺便吐槽一句，GNOME的nautilus文件管理器相当不好用，比起explorer.exe差的不是一点点）

在文件管理器中点击"Other locations"，可以看到硬盘里面的几个分区，找到是Windows的C盘的分区，文件管理器里面会显示分区大小（以1000而不是1024为单位，所以会略大）和分区编号（结尾/dev/xxxx是Linux内核分配的文件，末尾的数值表示分区编号），通过这两个参数找到Windows分区。

找到对应的Windows分区，点击这个分区，点击"Authorize"确认（挂载分区需要root权限），然后按下Ctrl-L会弹出文件路径名，再按下Ctrl-C复制这个路径名。

ame脚本必须在C盘根目录以root权限执行，所以需要一点准备操作，此外还要对ame脚本进行细微调整适应Fedora。

点击终端的窗口，输入"sudo su"按回车，再输入cd，输入空格，再按下Ctrl-Shift-V粘贴刚才获得的Windows路径名（以/run/media/liveuser开头），按回车。

首先安装fzf软件，输入"rpm -i fzf-0.27.2-1.fc34.x86_64.rpm" （输入tab可以命令补全，所以输入fzf按下tab就会补全完整文件名），rpm等待了一小会以后完成。

然后我们再回到文件管理器，双击SnD_21H1_2021-10-13.sh（如果之前忘记复制到C盘根目录，先重启进入Windows复制好了再重新启动Linux即可），弹出一个gedit文本编辑器。（gedit是靠谱软件）然后用鼠标拉选第25-56行，全部删除（从"# prompts to install git and 7zip... "开始，到"~/.fzf/instal"l为止），然后往下滚一点点到"# start AME process"附近，把"$HOME/.fzf/bin/fzf"删掉改成"fzf"，然后按Ctrl-S保存，鼠标点右上角叉或者按Alt-F4退出gedit。

回到终端的窗口，输入./SnD_21H1_2021-10-13.sh，弹出一个警告界面，表示运行这个脚本作者免责，由允许这个脚本的人负责，按下Enter确认。然后这个ame脚本会开始搜索C盘里面的文件并移动到AME_Backup文件夹里面。这个过程相当漫长，我用了半个小时。在一大堆"Looking or xxx"完成之前除了把找到的文件写入fzf_list.txt意外不会对C盘有其他操作，如果你想取消随时可以重启。（当然如果你不想取消就耐心等）

这个脚本等到出现"You may now reboot into Windows"以后ame脚本就执行完成了，可以重启进入ame改良以后的Windows中。

# 第八部分（可选）：运行ame脚本（post-ameliorated部分）
重启进入Windows，好像什么都没有发生一样，但其实windows大部分无用甚至有害的组件都已经被移除了。可以看到的一些变化：
* Windows登录画面直接显示输入用户名和密码的窗口
* 启动菜单的搜索速度变得非常快（因为不需要在windows store里面一直搜索，或者每一次搜索都联网把搜索词提交给Bing），比如输入"mspaint"就可以找到老版本的windows画图，"msconfig"修改启动设置，等等。
* Windows 10的设置界面缺少了很多选项

以上的变化表明ame的主要步骤已经完成，这个ameliorated的windows系统不会莫名其妙弹出windows update，不会老是加载cortana和bing，不会弹出各种windows store的广告，windows search速度很快，不会默默记录大量的用户数据并上传到微软的服务器……总之windows 10用起来的烦人程度急剧降低！

后面的步骤在我看来更像ame作者的一些个人建议；如果你对现在的配置已经满意了的话，就可以结束本教程了（记得装上机器的驱动）。如果对ame的作者的配置仍有兴趣可以继续执行post-ameliorated部分的脚本。

# 补充：安装weasel输入法并添加配置文件
weasel输入法是rime输入引擎在windows上的实现。首先要先安装weasel，然后复制一个配置文件https://github.com/Bambooin/rimerc到%APPDATA/Rime中，然后运行"【小狼嚎输入法】部署”这个程序

改成简体中文：在输入法候选框出现时按下Ctrl+`（像点一样的符号其实叫做Backtick重击，在tab键的上方）"，选择"明月拼音-简化字"

post
