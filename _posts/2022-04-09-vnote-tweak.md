---
layout: post
title: "Vnote tweak"
last_modified_at: 2022-07-29
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
Some miscellaneous tweaks for [VNote](https://vnotex.github.io/vnote), a comfortable Markdown manager.

<div class="note info"><b>Note: </b>
Chinese version of this article: <a href="../../../../posts/2022/04/09/vnote-%E5%BE%AE%E8%B0%83.html">VNote 微调</a>
</div>

## VNote theme
Reference: [Themes and Styles.md](https://vnotex.github.io/vnote/en_us/#!docs/Users/Themes%20and%20Styles.md)

VNote themes are described by folders in the *themes* folder of VNote. The *themes* folder can be opened at the *Settings* dialog: *Settings->Apperance->Theme->Open Location* (on Freedesktop/Linux should be located at `$XDG_DATA_HOME/VNote/VNote/themes/<theme_name>`). Each folder in the *themes* folder corresponds to one theme in VNote.

<div class="note warning"><b>Warning: </b>
You should not directly change the original stock theme <code>pure</code>; you should a copy of it to a new folder under <code>themes</code> and change files under such new folder instead.
</div>

### Theme name
The folder name isn't directly shown on VNote *Settings* dialog; instead, a `display_name` of a theme is shown instead.

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

## QtWebengine crash
QtWebengine crashes on >=Fedora 35, whose reason is still unknown. It seems to be a Qt issue, and even the developer doesn't really understand the problem. It affects the "preview" function of VNote: preview rendered html of markdown file will only show a blank page. Adding `--no-sandbox` to the command line option works around it. 