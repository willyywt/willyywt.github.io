---
layout: post
title: "Awesome applications"
last_modified_at: 2022-08-15
---
Some applications (computer software) I feel so awesome that I wanted to share here.

## RSSHub

### RSSHub - a RSS generator
[RSSHub](https://docs.rsshub.app/en/) is a RSS generator. It fetches HTML from the original site and parse them into ready-to-be-consumed RSS. It's basically a crawler for websites that don't have RSS feeds or provide RSS feeds that you don't like.

RSSHub has support for a very wide range of websites, listed in "Routes" column in RSSHub documentation. Examples RSS feeds:

* Telegram Channel: [https://rsshub.app/telegram/channel/modded_apps_games/searchQuery=GTA](https://rsshub.app/telegram/channel/modded_apps_games/searchQuery=GTA)
* Reuters Category/Topic/Author, Inverstigates [https://rsshub.app/reuters/world/reuters-next](https://rsshub.app/reuters/world/reuters-next)
* Github Repo, Trending, Topics, Issues, Pull Requests, Releases, … [https://rsshub.app/github/trending/daily/javascript/en](https://rsshub.app/github/trending/daily/javascript/en)

<div class="note info"><b>Note: </b> To use Atom format, suffix URL with '.atom', for example: https://rsshub.app/reuters/world/reuters-next.atom. </div>

### RSSHub Radar
[RSSHub Radar](https://github.com/DIYgod/RSSHub-Radar)(WebExtension), [RSSAid](https://github.com/LeetaoGoooo/RSSAid)(Android), [RSSBud](iOS) are cousin projects of RSSHub that automatically detect whether a website has official RSS, and whether a RSSHub route is written for it.

Some examples of automatic detection:
* A wordpress website: [https://www.csslayer.info/wordpress/feed](https://www.csslayer.info/wordpress/feed) (CSSlayer is the maintainer of fcitx5)
* Qubes OS news: [https://www.qubes-os.org/feed.xml](https://www.qubes-os.org/feed.xml) (Qubes OS is a secure operating system based on compartmentalization and virtualization)
* Collabora blog: [https://www.collabora.com/newsroom-rss-feed.rss](https://www.collabora.com/newsroom-rss-feed.rss) (Collabora is a major contributor to Freedesktop/Linux projects, including the linux kernel, mesa, gstreamer, libreoffice, etc.)

### Usage
For instructions to use RSSHub, see [Getting Started](https://docs.rsshub.app/en/usage.html#generate-a-rss-feed). 

RSSHub provides a demo instance at https://rsshub.app. If you want to use the demo instance, append https://rsshub.app with your interested route to get a RSS URL. However, some routes are marked as "strict anti-crawler policy", and for better stability you probably want to install your own RSSHub instance. Install instructions: <a href="https://docs.rsshub.app/en/install/">Deployment</a>. 

<div class="note info"><b>Note: </b>If you don't want to use Docker (or any sorts of linux containers), see <a href="https://docs.rsshub.app/en/install/#manual-deployment">Manual Deployment</a></div>

<div class="note warning"><b>Warning: </b> Some websites like Twitter, Youtube and Instagram require developer API keys to be configured for your instance. (Developer API keys are already setup for the demo instance https://rsshub.app). (For privacy-friendly frontends, you can use <a href="https://github.com/zedeus/nitter">Nitter</a>, <a href="https://invidious.io/">Invidious</a> and <a href="https://bibliogram.art/">Biblogram</a> instead, but RSSHub doesn't gain support for them yet.)</div>

## Xournalpp
[Xournal++](https://xournalpp.github.io) is a note-taking tool focused on handwritten notes and digital tablet/stylus input. It uses its custom journal format, `.xopp` file format. It does pressure sensitive stylus pen input, multiple drawing layers, text input with customable font and size, image insertions, selection and snapping, and "annotate" PDF (xournalpp doesn't edit PDF, but it can show a PDF file as your journal background).

Xournal++ file format `.xopp` can be one-way exported to PDF, PNG or SVG (this also prints the "annotated" PDF).

For quick usage tutorial see [Whirlwind Tour](https://xournalpp.github.io/guide/whirlwind-tour/).

## Tauon Music Box
[Tauon Music Box](https://tauonmusicbox.rocks/) is a modern, streamlined music player app, written in Python, SDL2 and GObject. It has a very attractive user interface: track list, album gallary and lyrics are very nicely assembled in the user interface.

Tauon Music Box is originally written for Freedesktop/Linux (supports MPRIS2!), and is later ported to Windows.

## VSCodium
[VSCodium](https://vscodium.com/) is a FLOSS build of VS Code, with all proprietary parts removed. It is licensed under the MIT license. The Ellipse Foundation provides a repository of VS Code extensions at [https://open-vsx.org/](https://open-vsx.org/).

VSCodium can be downloaded from its [Github Releases](https://github.com/VSCodium/vscodium/releases/).

## GNU Octave
[GNU Octave](https://octave.org/) is a FLOSS implementation of almost all Matlab core language and several dozens of toolboxes ("addon packages") at [Octave Packages](https://gnu-octave.github.io/packages/).

As far as I see, Octave has pretty much fully implemented almost all Matlab language syntax and functions. It is however not a prefect replacement for Matlab since some Matlab toolbox like Simulink is not (and probably will never) be implemented.

Octave's documentation can be downloaded from <a href="https://docs.octave.org/octave.pdf">https://docs.octave.org/octave.pdf</a>. You can also browse builtin documentation in Octave GUI.

<div class="note warning"><b>Warning: </b>
The development of GNU Octave is at <a href="https://hg.octave.org/">https://hg.octave.org/</a>. A Github Organization <a href="https://github.com/gnu-octave/">gnu-octave</a> is a loose connection of developers working on Octave and Octave Packages, but not the source code of GNU Octave itself. 
</div>
<div class="note info"><b>Note: </b>
Octave defaults to a pure commandline interface. Use the <code>--gui</code> option to use the Qt GUI interface. (This option should be already included if you use desktop icons to launch octave.)
</div>
