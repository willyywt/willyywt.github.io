---
layout: post
title: "Vnote tweak"
last_modified_at: 2022-07-21
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
Some miscellaneous tweaks for [VNote](https://vnotex.github.io/vnote), a comfortable markdown manager.

## VNote theme
Reference: [Themes and Styles.md](https://vnotex.github.io/vnote/en_us/#!docs/Users/Themes%20and%20Styles.md)

VNote themes are described by folders in the *themes* folder of VNote. The *themes* folder can be opened at the *User Settings* dialog: *Settings->Apperance->Theme->Open Location* (on Freedesktop/Linux should be located at `$XDG_DATA_HOME/VNote/VNote/themes/<theme_name>`). Each folder in the *themes* folder corresponds to one theme in VNote.

Notice: You should not directly change the original stock theme `pure`; you should a copy of it to a new folder under `themes` and change files under such new folder instead.

### Theme name
The folder name isn't directly shown on VNote *User Settings* dialog; instead, a `display_name` is shown instead.

Change the value of `display_name` in file `palette.json` to give your theme a new name (instead of "Pure"), for example "Purity v2":
```
metadata:display_name: "Purity v2"
```

### Font size
VNote have too small font size for me. Fortunately it has a Qt Style Sheet file `interface.qss` to set font size for QtWidgets. 

Change the font size of all the widgets:
```
QWidget {
   font-size: 12pt;
}
```

Change the font size of hover over text tip:

```
QToolTip
{
    font-size: 12pt;
}
```

---

VNote的字体大小对我来说太小了，好在可以直接修改QSS文件 `interface.qss` 来增加字体大小。参考：[主题和样式.md](https://vnotex.github.io/vnote/zh_cn/#!docs/用户/主题和样式.md)

注意：不要直接改动原装主题 `pure` （显示为“纯净”）里面的文件；应该把 `pure` 复制到`themes`下面一个新的文件夹，并修改这个新的文件夹里面的文件。存放主题的文件夹 `themes` 可以在*用户设置*对话框里面打开：`设置->外观->主题->打开路径`(在Freedesktop/Linux上应该为`$XDG_DATA_HOME/VNote/VNote/themes/<主题名称>`)

改变所有widgets的字体大小：
```
QWidget {
     font-size: 12pt;
}
```

改变悬浮文字提示的字体大小：
```
QToolTip
{
    font-size: 12pt;
}
```

在文件`palette.json`改变自定义主题的名称：
```
metadata:display_name_zh_CN: 纯净（复件）
```

![](../../../../static/2022-04-09/theme-folder.png)

## QtWebengine crash
QtWebengine crashes on >=Fedora 35, whose reason is still unknown. It seems to be a Qt issue, and even the developer doesn't really understand the problem. It affects the "preview" function of VNote: preview rendered html of markdown file will only show a blank page. Adding `--no-sandbox` to the command line option works around it. 

QtWebengine在>=Fedora 35上面会崩溃，原因未知。这似乎是Qt的问题，但是即使开发者也不太懂这个问题。这个崩溃会影响VNote的“预览”功能：预览markdown文件渲染的html只会显示空白页面。加命令行选项`--no-sandbox`能works around这个问题。

Reference: [issues: qtwebengine](https://github.com/vnotex/vnote/issues?q=is%3Aissue+qtwebengine), [VNote诡异问题](https://www.usmacd.com/2022/04/01/vnote/#诡异问题)

