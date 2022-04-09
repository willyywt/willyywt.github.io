---
layout: post
title: "Vnote tweak"
last_modified_at: 2022-04-09
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
Some miscellaneous tweaks for [VNote](https://vnotex.github.io/vnote), a comfortable markdown manager.

## Font size
VNote have too small font size for me. Fortunately it has a Qt Style Sheet file `interface.qss` to set font size for QtWidgets.

It's recommended to leave the stock theme `pure` unchanged, copy the contents of its folder to a new folder, and use the new folder as custom theme. The folder that contains themes can be opened at *Settings->Apperance->Theme->Open Location* (should be at `$XDG_DATA_HOME/VNote/VNote/themes/<theme_name>`).

Change the font size of all the widgets:
>QWidget {
>   font-size: 12pt;
>}

Change the name for custom theme, at file `palette.json`:
> metadata:display_name: Purity

VNote的字体大小对我来说太小了，运气好的是它有一个QSS文件`interface.qss`可以改QtWidgets的字体大小。

建议不修改原装主题`纯净`，把它的内容复制到新的文件夹，并用新文件夹作为自定义主题。存放主题的文件夹可以在`设置->外观->主题->打开路径`(应该在`$XDG_DATA_HOME/VNote/VNote/themes/<主题名称>`)

改变所有widgets的字体大小：
>QWidget {
>   font-size: 12pt;
>}

在文件`palette.json`改变自定义主题的名称：
> metadata:display_name_zh_CN: 纯净（复件）

![](/static/2022-04-09/theme-folder.png)

## QtWebengine crash
QtWebengine crashes on >=Fedora 35, whose reason is still unknown. It seems to be a Qt issue, and even the developer doesn't really understand the problem. It affects the "preview" function of VNote: preview rendered html of markdown file will only show a blank page. Adding `--no-sandbox` to the command line option works around it. 

QtWebengine在>=Fedora 35上面会崩溃，原因未知。这似乎是Qt的问题，但是即使开发者也不太懂这个问题。这个崩溃会影响VNote的“预览”功能：预览markdown文件渲染的html只会显示空白页面。加命令行选项`--no-sandbox`能works around这个问题。

Reference: [issues: qtwebengine](https://github.com/vnotex/vnote/issues?q=is%3Aissue+qtwebengine), [VNote诡异问题](https://www.usmacd.com/2022/04/01/vnote/#诡异问题)

