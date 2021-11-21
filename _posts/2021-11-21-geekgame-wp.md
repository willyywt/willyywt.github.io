---
layout: page
title: "（萌新向）1st PKU GeekGame writeup - By willyywt"
---
## Misc

## 签到
众所周知（？）pdf可以隐藏不可见的信息，这也就是为什么google最初证明sha-1碰撞的时候提供了pdf的例子，以及pdf1.7标准规定了数字签名等等的原因。

当然不是所有软件都直接支持复制粘贴显示区域以外的文字，比如evince就不行（evince复制粘贴本身就有bug）。当然喜闻乐见的Firefox是可以的：（`<div class="textlayer">`）

![pdfjs](static/2021-11-21/pdfjs.png)
整理之后得到一堆字符`fa{aeAGetTm@ekaev!lgHv__ra_ieGeGm_1}`（一共36个字符，注意中间第三个`<span>`的`!`）。

然后要猜解密方法，上一届已经考过移位加密了，所以大概率不是。观察字符串发现似乎`GeekGame`藏在里面（发现`GetTm`的怕不是超级难用的Win32API写多了，想骂人来一个`Tm`），于是进一步肯定字符串本身没有移位，只需要重新排列即可。（公告里也说签到题的flag在英语里是有意义的，大概率就是`GeekGame`）

匹配`fl`发现`l`正好是第19个字符，所以猜测两两配对，果然就是正确答案。

不超过10行的python代码：
```
>>> str1 = "fa{aeAGetTm@ekaev!lgHv__ra_ieGeGm_1}"
>>> len(str1)
36
>>> str2 = ""
>>> for i in range(18):
...     str2 += str1[i]
...     str2 += str1[i + 18]
... 
>>> str2
'flag{Have_A_Great_Time@GeekGame_v1!}'

```

（签到题还是挺搞心态的）

## 小北问答 Remake
做这种题的体验肯定不会太好，毕竟重度使用搜索引擎搜不出来的体验是很糟糕的，而且一般伴随着大作业ddl一起

努力了一把，还是不会。。我的思路可能僵化比较严重罢了

> #1
>  北京大学燕园校区有理科 1 号楼到理科 X 号楼，但没有理科 (X+1) 号及之后的楼。X 是？ 

凭借生活经验应该`X=5`，然后我怀疑了一把`X=6`，发现不对，还是`X=5`

> #2
>  上一届（第零届）比赛的总注册人数有多少？

这种问题一般会出现在比赛举办的新闻里面：[北京大学举办首届信息安全综合能力竞赛](https://news.pku.edu.cn/xwzh/203d197d93c245a1aec23626bb43d464.htm)

> #3
>  geekgame.pku.edu.cn 的 HTTPS 证书曾有一次忘记续期了，发生过期的时间是？
查TLS证书历史不多见，但是也有网站收集签发的TLS证书（可能首先是担心域名的所有权问题，毕竟一般的TLS证书只要校验域名所有权，而校验的方法无非就是邮件，DNS信息，遇到NSA这种机构威胁一波完全有可能伪造）

搜”https certificate history“有好几个网页提供类似搜索，但是都没有找到geekgame对应的证书

quora（quora上面的回答多数不太可信..）提到了EFF's SSL Observatory project，但是我没看

最后只找到（哪个关键词搜出来的忘了）[crt.sh](https://crt.sh/?q=geekgame.pku.edu.cn)，交2021-07-11T00:49:53+08:00不对，交 2021-07-11T08:49:53+08:00也不对，不知道什么原因

> #4
> 2020 年 DEFCON CTF 资格赛签到题的 flag 是？
这个其实不简单，因为你都不知道哪一题是签到题

首先找到了[DEF CON CTF 2020 QUALS](https://oooverflow.io/dc-ctf-2020-quals/)，观察到一段话
_Static (but playable)_
这说明题目环境就在里面，点进去ZOOOM视频聊天（其实是gif动画，话说美国漫画都这样嘛）第一个"welcome-to-dc-2020-quals"就是

> #5
> 在大小为 672328094 * 386900246 的方形棋盘上放 3 枚（相同的）皇后且它们互不攻击，有几种方法？
直接搜类似"k nxm queens problem"的关键词是几乎不可能成功的

尝试发挥深厚的组合功底手算，发现太麻烦了，gg

第二阶段提示就很明显了
> 不同的领域有不同的专业工具。你可能无法一下找到答案，但是你能找到一个工具，然后用这个工具得到答案。

对数列来说是OEIS。最后的答案藏在一个很小很小的注释里面：[A047659](https://oeis.org/A047659)

注意用sympy计算需要把除以`n`改成乘以`Rational(1/n)`，把幂次`^`改成`**`，用一个简单的正则替换即可

> #6
> 上一届（第零届）比赛的“小北问答1202”题目会把所有选手提交的答案存到 SQLite 数据库的一个表中，这个表名叫？
这类纯技术细节必须看源代码，不会有任何writeup讲如此无聊的细节

[db.py](https://github.com/PKU-GeekGame/geekgame-0th/blob/main/src/choice/game/db.py)（如果上不去github只能说有科学上网的工具会对比赛帮助很大）

> #7
> 国际互联网由许多个自治系统（AS）组成。北京大学有一个自己的自治系统，它的编号是？
 AS24349

> #8
> 截止到 2021 年 6 月 1 日，完全由北京大学信息科学技术学院下属的中文名称最长的实验室叫？
不会

## 翻车的谜语人
题目给了一个ncap的dump，用wireshark分析之

好在协议没有难度，就是追踪http明文，不需要了解各种复杂的网络协议

wireshark怎么使用曾经看过手册，然而基本上都忘记了（话说现在wireshark的wiki都迁移到gitlab上了），就记得wireshark的过滤器很强大，十几亿条找其中四条的那种水平。（出题人就给五万条已经很良心了，而且真正有用的就几条tcp流）。然后还记得wireshark可以读取Firefox和Chrome导出的`SSLKEYLOGFILE`（这里没用）。对本题来说，只需要会*追踪TCP流*和（TCP流）*导出分组分析结果*就足够了（Wireshark直接导出原始二进制字节流，不加另外转换）

首先分析第1个TCP流，发现是Jupyter Notebook（什么时候我也去玩玩。。），跳过中间一大堆混淆过或者没混淆过的javascript代码（这些代码看不出来用户的交互命令），在第3133个包开始有信息量了
```json
{"load_extensions": {"jupyter-js-widgets/extension": true}}
```
然而这个信息量太小，继续加载几个信息量也不够，最后快到底了才发现有点意思的东西
（做flag2的时候发现另一处websocket流直接有输入python代码的完整历史，然而对第一个flag只要找到这一个就够了)

![wireshark1](static/2021-11-21/wireshark1.png)

发现一大堆疑似python代码的内容，然而在wireshark里面不好阅读，所以单独复制到VSCodium里面格式化（vim试过了，格式化json显然不如VSCodium可靠，毕竟VSCode是为web开发而生）
![Ctrl-Shift-I格式化](static/2021-11-21/wireshark2.png)

剩下就很好分析了。观察到Jupyter输出命令的运行结果了，得到xor的key，在python里面重现之（注意json对反斜杠的转义，话说转义规则又是各大编程环境之间完全不规律的一个东西，和regex一样标准化程度很低）。
