---
layout: post
title: Github Pages Hello World
categories: Admin
---
Hello Github Pages!

开张宣告：本人的第一个在线博客！

## 为什么不用WordPress
WordPress太复杂了，很多php文件根本看不懂，也不是我的义务。我不了解WordPress，但是WordPress显然更倾向于功能的可扩展性，而不是可维护性和间接性。WordPress可以部署非常复杂的网站，但是对一个个人博客来说太复杂了（虽然也有很多人选择"Proudly powered by wordpress"）。

而且更不好的是WordPress出过无数起安全漏洞。相比之下，Google的blogspot等虽然老气了一点，但是从来没出过WordPress这种级别的安全漏洞。

（安全漏洞不只限于提权，如果一个接口太消耗服务器资源也是漏洞的表现）

只主持静态服务会大大降低服务的复杂程度，要管动态服务花费的精力就高不少

## 为什么不自己主持服务
也是一样，太复杂了。买vps不难，但是服务质量难以和Github Pages抗衡，特别是国内动不动就无理由封禁的网络环境下，依靠Github Pages才是更能长久的。（git clone和Github Pages访问速度可以接受）

## 文件服务？
这个是最恶心的，国内的带宽太tm贵了。目前我知道的可靠的办法就两种：世纪互联版Onedrive和各种类似S3的服务。Onedrive不贵，而且似乎不限制流量（不过话说回来，要是真无限制用可能也要限速。。）。S3比较贵，相对便宜的有七牛（290元/TB流量）和百度（250元/TB流量）。

我现在有一个世纪互联版Onedrive的挂载：[file.willyangywt.cc](https://file.willyangywt.cc)。在人数不多的时候可能就没啥限制，如果等很多年以后突然流量增大了可能必须得加一个密码之类的（sigh）

（其实大部分人不如直接冲百度网盘的会员，虽然冲了也得限速）

以后可能专门写一篇我尝试的各种失败路线（不过话说回来，失败路线没啥好说的）

有一篇文章将中国网络建设的落后性，似乎有点意思：[为什么在中国“公有云”落地那么难？](https://www.pingwest.com/a/2710)

## 网页的美化计划
把Theme从[no-style-please](https://github.com/riggraz/no-style-please) 改成了[moving](https://github.com/huangyz0918/moving)，看上去不那么丑了

## Git Commit
懒的写，直接选择随机生成

不过纯数字可读性有点差，选单词生成，直接从/usr/share/dict/linux.words里面读就可以，当然也可以选择KeepassXC的自动生成（不好写脚本）
{% raw %}
```sh
#!/bin/sh
MESSAGE1=$(shuf -n 5 /usr/share/dict/linux.words | tr '\n' '-')
MESSAGE2=$(shuf -n 5 /usr/share/dict/linux.words | tr -d '\n' )
MESSAGE="$MESSAGE1$MESSAGE2"
if [ "$1" == "-m" ]; then
        echo $MESSAGE
        exit 0
fi
git commit -m "$MESSAGE" "$@"
```
{% endraw %}

也有用诗歌等等的，不过随机生成对查找应该更友好

## Jekyll Quirks
https://blog.csdn.net/zhangpeterx/article/details/103920538

https://xiazemin.github.io/MyBlog/jekyll/2020/05/31/raw.html
