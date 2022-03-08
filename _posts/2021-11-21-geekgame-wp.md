---
layout: post
title: "（萌新向）1st PKU GeekGame writeup - By willyywt"
last_modified_at: 2021-11-28
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
北京大学信息安全综合能力竞赛（第一届）~~其实作为咸鱼玩家是为了800块钱才去的~~

本来对CTF比赛不太感冒，但是看了第零届的题目觉得可以冲一把，并且刷题味道不重

1st PKU Geekgame存档：[github.com/PKU-GeekGame/geekgame-1st](https://github.com/PKU-GeekGame/geekgame-1st/)

**强烈推荐：中科大hackergame工作人员以校外选手身份参赛的Writeup：[欢迎参加明年十月份中科大第九届信安大赛](https://github.com/PKU-GeekGame/geekgame-1st/tree/master/writeups/players/%E6%AC%A2%E8%BF%8E%E5%8F%82%E5%8A%A0%E6%98%8E%E5%B9%B4%E5%8D%81%E6%9C%88%E4%BB%BD%E4%B8%AD%E7%A7%91%E5%A4%A7%E7%AC%AC%E4%B9%9D%E5%B1%8A%E4%BF%A1%E5%AE%89%E5%A4%A7%E8%B5%9B)和[taoky](https://github.com/PKU-GeekGame/geekgame-1st/tree/master/writeups/players/taoky-v2)**

以下为本萌新的Writeup（看了大佬的writeup以后我的一看就很菜）

## Misc

## 签到
众所周知（？）pdf可以隐藏不可见的信息，这也就是为什么google最初证明sha-1碰撞的时候提供了pdf的例子，以及pdf1.7标准规定了数字签名等等的原因。

当然不是所有软件都直接支持复制粘贴显示区域以外的文字，比如evince就不行（evince复制粘贴本身就有bug）。当然喜闻乐见的Firefox是可以的：（`<div class="textlayer">`）

![pdfjs](../../../static/2021-11-21/pdfjs.png)
整理之后得到一堆字符`fa{aeAGetTm@ekaev!lgHv__ra_ieGeGm_1}`（一共36个字符，注意中间第三个`<span>`的`!`）。

然后要猜解密方法，上一届已经考过移位加密了，所以大概率不是。观察字符串发现似乎`GeekGame`藏在里面（发现`GetTm`的怕不是超级难用的Win32API写多了，想骂人来一个`Tm`），于是进一步肯定字符串本身没有移位，只需要重新排列即可。（公告里也说签到题的flag在英语里是有意义的，大概率就是`GeekGame`）

匹配`fl`发现`l`正好是第19个字符，所以猜测两两配对，果然就是正确答案。

不超过10行的python代码：
{% raw %}
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
{% endraw %}

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

update: 08:49:53是对的

> #4
> 2020 年 DEFCON CTF 资格赛签到题的 flag 是？

这个其实不简单，因为你都不知道哪一题是签到题

首先找到了[DEF CON CTF 2020 QUALS](https://oooverflow.io/dc-ctf-2020-quals/)，观察到一段话
_Static (but playable)_ 这说明题目环境就在里面，点进去ZOOOM视频聊天（其实是gif动画，话说美国漫画都这样嘛）第一个"welcome-to-dc-2020-quals"就是

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

update: 正确答案是AS59201，不是太懂

> #8
> 截止到 2021 年 6 月 1 日，完全由北京大学信息科学技术学院下属的中文名称最长的实验室叫？

区域光纤通信网与新型光通信系统国家重点实验室

## 翻车的谜语人
题目给了一个ncap的dump，用wireshark分析之

好在协议没有难度，就是追踪http明文，不需要了解各种复杂的网络协议

wireshark怎么使用曾经看过手册，然而基本上都忘记了（话说现在wireshark的wiki都迁移到gitlab上了），就记得wireshark的过滤器很强大，十几亿条找其中四条的那种水平。（出题人就给五万条已经很良心了，而且真正有用的就几条tcp流）。然后还记得wireshark可以读取Firefox和Chrome导出的`SSLKEYLOGFILE`（这里没用）。对本题来说，只需要会*追踪TCP流*和（TCP流）*导出分组分析结果*就足够了（Wireshark直接导出原始二进制字节流，不加另外转换）

首先分析第1个TCP流，发现是Jupyter Notebook（什么时候我也去玩玩。。），跳过中间一大堆混淆过或者没混淆过的javascript代码（这些代码看不出来用户的交互命令），在第3133个包开始有信息量了
{% raw %} 
```json
{"load_extensions": {"jupyter-js-widgets/extension": true}}
```
{% endraw %}
然而这个信息量太小，继续加载几个信息量也不够，最后快到底了才发现有点意思的东西
（做flag2的时候发现另一处websocket流直接有输入python代码的完整历史，然而对第一个flag只要找到这一个就够了)

![wireshark1](../../../static/2021-11-21/wireshark1.png)

发现一大堆疑似python代码的内容，然而在wireshark里面不好阅读，所以单独复制到VSCodium里面格式化（vim试过了，格式化json显然不如VSCodium可靠，毕竟VSCode是为web开发而生）
![Ctrl-Shift-I格式化](../../../static/2021-11-21/wireshark2.png)

剩下就很好分析了。观察到Jupyter输出命令的运行结果了，得到xor的key，在python里面重现之（注意json对反斜杠的转义，话说转义规则又是各大编程环境之间完全不规律的一个东西，和regex一样标准化程度很低）。
{% raw %}
```py
import zwsp_steg
from Crypto.Random import get_random_bytes
import binascii

def genflag():
    return 'flag{%s}'%binascii.hexlify(get_random_bytes(16)).decode()

flag1 = genflag()
flag2 = genflag()

key = get_random_bytes(len(flag1))

# key: b'\\x1e\\xe0[u\\xf2\\xf2\\x81\\x01U_\\x9d!yc\\x8e\\xce[X\\r\\x04\\x94\\xbc9\\x1d\\xd7\\xf8\\xde\\xdcd\\xb2Q\\xa3\\x8a?\\x16\\xe5\\x8a9'

def xor_each(k, b):
    assert len(k)==len(b)
    out = []
    for i in range(len(b)):
        out.append(b[i]^k[i])
    return bytes(out)

encoded_flag1 = xor_each(key, flag1.encode())
encoded_flag2 = xor_each(key, flag2.encode())

with open('flag1.txt', 'wb') as f:
    f.write(binascii.hexlify(encoded_flag1))
```
{% endraw %}

然后找`flag1.txt`（一共三条http流，要仔细找），第11265个包
{% raw %}
```json
{"name": "flag1.txt", "path": "flag1.txt", "last_modified": "2021-11-06T07:43:20.952991Z", "created": "2021-11-06T07:43:20.952991Z", "content": "788c3a1289cbe5383466f9184b07edac6a6b3b37f78e0f7ce79bece502d63091ef5b7087bc44", "format": "text", "mimetype": "text/plain", "size": 76, "writable": true, "type": "file"}
```
{% endraw %}
xor之即可

本人在本题也好好锻炼了一把python语法。。base64编码解码，string和binary string之类的转换等等
（省略无数SyntaxError）
{% raw %}
```
>>> key = b'\x1e\xe0[u\xf2\xf2\x81\x01U_\x9d!yc\x8e\xce[X\r\x04\x94\xbc9\x1d\xd7\xf8\xde\xdcd\xb2Q\xa3\x8a?\x16\xe5\x8a9'
>>> encoded_flag1 = binascii.unhexlify("788c3a1289cbe5383466f9184b07edac6a6b3b37f78e0f7ce79bece502d63091ef5b7087bc44")
>>> flag1 = xor_each(key, encoded_flag1)
>>> flag1
b'flag{9d9a9d92dcb1363c26a0c29fda2edfb6}'
```
{% endraw %}

继续摸索flag2，发现贴心的出题人已经把文件名设为`flag2.7z`了，发现第47097个包GET了这个文件`GET /files/flag2.7z?download=1 HTTP/1.1`，服务器也返回了这个文件，所以把这个文件保存即可

之前比赛的时候在追踪http流的窗口中转换成hex存储，然后用xxd,vim搞搞居然搞出来了，现在复现的时候发现怎么都不对，总之本不应该这样搞的，wireshark会自动分析tcp流并把收到的原始包重组，所以找到重组后的包并另存为即可

这里第47097个包Wireshark分析了"Response in frame: 47395"，双击敲进去
![wireshark-47097](../../../static/2021-11-21/wireshark-47097.png)

然后在47395这个包里面在Wireshark的分析里面鼠标左键选中"File data"一栏，然后再选择*文件*->*导出分组字节流*
![wireshark-47395](../../../static/2021-11-21/wireshark-47395.png)

保存的文件就是需要的flag2.7z文件了。

可以看一下长度，首先长度应该正好等于2935226字节，其次用`7z l flag2.7z`列举文件
{% raw %}
```
> du -sb flag2.7z
2935226 flag2.7z
> 7z l flag2.7z

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=zh_CN.UTF-8,Utf16=on,HugeFiles=on,64 bits,16 CPUs AMD Ryzen 7 4800U with Radeon Graphics          (860F01),ASM,AES-NI)

Scanning the drive for archives:
1 file, 2935226 bytes (2867 KiB)

Listing archive: flag2.7z

--
Path = flag2.7z
Type = 7z
Physical Size = 2935226
Headers Size = 154
Method = Delta LZMA2:6m 7zAES
Solid = -
Blocks = 1

   Date      Time    Attr         Size   Compressed  Name
------------------- ----- ------------ ------------  ------------------------
2021-11-06 15:43:55 ....A      4763436      2935072  flag2.wav
------------------- ----- ------------ ------------  ------------------------
2021-11-06 15:43:55            4763436      2935072  1 files

```
{% endraw %}

然后需要找到flag2.7z的密码，追踪第11个tcp流，websocket不懂，但是服务器的输出看上去就是终端的输出（并且一开始的Http请求`GET /terminals/websocket/3`也能证实这个猜测）

 ![wireshark-43936](../../../static/2021-11-21/wireshark-43936.png)

最后一段是7z的stdout输出，并且没有提示密码的部分，说明You酱前面已经通过`-p`选项指定了密码，发现果然如此

对各种shell熟悉的话应该知道shell会按照一定规则展开用户的命令行，展开规则有可能受到用户设置的环境变量，配置文件定义的函数等等影响，原则上是不可预测的，但是萌新的愿望当然就是用最显然的规则展开。。

终端特殊的控制字符`\7b`似乎是Backspace（希望是对的），得到命令如下

7za a flag2.7z flag2.wav -p"Wakarimasu! `date` `uname -onm` `nprocs`

`date`输出是不标准的，受到`LANG`环境变量等等的影响，然后也不知道各发行版编译coreutils会不会有影响，甚至不知道是不是其他的软件（比如busybox）的输出，调了几次始终不对（在fedora上的输出是`Sat Nov 20 06:08:47 PM CST 2021`），看命令行的提示应该是kali，应该找一个kali的环境试一试就知道了，然而我就没试，可能是因为换发行版这种非常exhausting的事情我已经不想干了，对比赛态度还是不够认真。。

第二阶段给的date输出`Sat 06 Nov 2021 11:45:14 PM CST`以后我又开始试这道题（当然，114514这个数值是不可信的）

分析之前的一个http流可以知道7z文件的创建时间是`15:44:16`，然后创建时间也是不稳定的（坑啊），实际上shell展开`date`的时候时间是`15:44:15`，转换成date：`Sat 06 Nov 2021 03:44:15 PM CST`

`uname -onm`的选项查coreutils文档，好在`uname`的输出顺序是固定的

`nprocs`（希望地）表示当前进程可用的处理器的虚拟CPU个数（含超线程），在7z的stdout输出中查到是8

最后得到展开后的密码：
{% raw %}
```
Wakarimasu! Sat 06 Nov 2021 03:44:15 PM CST you-kali-vm x86_64 GNU/Linux 8
```
{% endraw %}

得到的是flag2.wav，距离flag2.txt还查最后一步

观察前面的终端输出，发现有flag2.txt，似乎在用stego-lsb把它隐藏到flag2.wav里面，pip3安装stego-lsb以后解密之
{% raw %}
```
stegolsb wavsteg -r -i flag2.wav -o flag2.txt -n 1 -b 100
```
{% endraw %}
（最后一个`-b`参数我是乱写的，不影响拿到flag）

flag2.txt：`788c3a128994e765373cfc171c00edfb3f603b67f68b087eb69cb8b8508135c5b90920d1b344`
这个是hex编码以后的结果，结合之前的python代码解密得到第二个flag
{% raw %}
```
>>> flag2 = "788c3a128994e765373cfc171c00edfb3f603b67f68b087eb69cb8b8508135c5b90920d1b344"
>>> key = b'\x1e\xe0[u\xf2\xf2\x81\x01U_\x9d!yc\x8e\xce[X\r\x04\x94\xbc9\x1d\xd7\xf8\xde\xdcd\xb2Q\xa3\x8a?\x16\xe5\x8a9'
>>> flag2_real = xor_each(key, binascii.unhexlify(flag2))
>>> flag2_real
b'flag{ffdbca6ecc5d86cb71cadfd43df36649}'
```
{% endraw %}

## Web

## 在线解压网站
这个题就是知道symlink就秒杀，没啥意思

## Flag即服务
这题一看就好难，完全没想法，就根据第二阶段的提示

> 浏览器会遵循 RFC 3986 处理 URL 中的特殊路径，别的软件可能不会。

拿了第一个flag，后面的提示看[qs](https://www.npmjs.com/package/qs)和[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)的文档，然而看懂了也没思路

curl不会严格检查'.'的转义，所以`GET /api/%2e%2e/package.json`，然后是经典笑话`0.1+0.2!==0.3`（一开始真的就写了flag{0.3}，果然不对），用浏览器（或者更好，直接用node）运行得到flag

## Binary

## 诡异的网关
二进制小白完全不懂断点调试啊，怎么让断点卡在正确的位置都不太懂，而且本人也不懂Win32的API，就难上加难

后来选择最暴力的读内存，选择sysinternals的procexp.exe读字符串，（幸好没有额外的编码，直接就是明文，要是混杂汉字+utf16之类的真要吐血）把百分号编码的转义即可

![procexp](../../../static/2021-11-21/procexp.png)

## 最强大脑
这个题的第一个flag简直就是嘲讽geekgame的小白玩家们，我伤心了

不过作为一个合格的咸鱼玩家，不能这就跑了，要咸到底，正好卡在30名的800元的分割线上。。（为了800块钱也是拼了）（咸鱼暴打大神终究不是真的。。。）

反汇编仔细读了一下逻辑发现是Brainfuck，Brainfuck翻译成C：

| Brainfuck |         C        |
| --------- | ---------------- |
| >         | `++ptr;`         |
| <         | `--ptr;`         |
| +         | `++*ptr;`        |
| -         | `--*ptr;`        |
| .         | `putchar(*ptr);` |
| ,         | `*ptr = getch();`|
| \[        | `while(*ptr) {`  |
| \]        | `}`              |

第一个flag只需要暴力打印整个flag1.txt的缓冲区即可，brainfuck代码：`,[>.[-]+]`，相当于
{% raw %}
```
putchar(*ptr); //手动修改第一个保证循环开始
while(*ptr) { //没有while(true)，伪造一个
    ++ptr;
    putchar(*ptr); //输出真的*ptr值
    while(*ptr) {
        --*ptr; //置零，也可以写++*ptr
    }
    ++*ptr; //变成1，保证while(true)
})
```
{% endraw %}

输入brainfuck代码的hex值2c5b3e2e5b2d5d2b5d，然后手动输入第一个字符1，得到输出
{% raw %}
```
flag{N0_trAiNing_@_@ll}
1
ag{N0_trAiNing_@_@ll}
A�
```
{% endraw %}
（CTF太难啦）

## Algorithm

## 密码学实践
这个题我觉得是最好玩的，也是花了最多时间思考的（ncap分析其实花的时间不多，只是步骤罗嗦），做出来还是很有成就感的（当然，也可能只是我太菜了）

update: 看了其他大佬们的writeup,感觉自己远远想多了。。以下仅供参考

第一个搞了一个MESenc好像很厉害的样子，但实际上就是xor加密（老传统了）。加密的密钥是256字节，记得一个结论是只要xor加密的密钥随机生成只用一次，并且长度大于要加密的明文，那么xor加密是不可破解的（因为每一个比特翻转概率都是1/2）*这个条件听上去就挺扯淡的，哪有真正的密钥这么设计的。。。），但本题已经给了xor加密的明文（server.py），并且256字节掰开来每一次只对前32字节做循环加密，也就是说最终结果一定等效于对32字节的分块（有第零届的AES-EBC那感觉了）xor+循环移位。

手动推导发现对32字节的a,b,c,d四部分每6个周期会回到原来的顺序（不是4周期，因为每一次最后一个是a^c而不是a），因此循环移位就已经知道了（32次在移位上相当于2次）。原先的256字节key当然就丢失了，但是不重要，只要找出长度不小于32字节的明文就可以得出循环加密的等效key。server.py的第一个明文已经有53字节了，更不要说第二个更长的明文

{% raw %}
```py
# 其实可以用python3的原生方法重写然后去掉这个import,但是一开始照抄题目里面的懒得改了
from Crypto.Util.number import bytes_to_long,long_to_bytes
# flag1
def truncate_b32(bstr: bytes):
    return bstr[:32]

def b8_xor(bstr1: bytes, bstr2: bytes):
    assert len(bstr1) == 8
    assert len(bstr2) == 8
    bstr1_long = bytes_to_long(bstr1)
    bstr2_long = bytes_to_long(bstr2)
    result_long = bstr1_long ^ bstr2_long
    return long_to_bytes(result_long, 8)

def MESdec_key_checked(cip1: bytes, org1: bytes):
    org1_a = org1[0:8]
    org1_b = org1[8:16]
    org1_c = org1[16:24]
    org1_d = org1[24:32]
    cip1_c = cip1[0:8]
    cip1_d = cip1[8:16]
    cip1_ac = cip1[16:24]
    cip1_bd = cip1[24:32]
    cip1_a = b8_xor(cip1_c, cip1_ac)
    cip1_b = b8_xor(cip1_d, cip1_bd)
    mixkey_a = b8_xor(cip1_a, org1_a)
    mixkey_b = b8_xor(cip1_b, org1_b)
    mixkey_c = b8_xor(cip1_c, org1_c)
    mixkey_d = b8_xor(cip1_d, org1_d)
    mixkey = mixkey_a + mixkey_b + mixkey_c + mixkey_d
    return mixkey

def pad(msg):
    n = 32 - len(msg) % 32
    return msg + bytes([n]) * n

def MESdec_key(cip1: bytes, org1: bytes):
    assert len(cip1) >= 32
    assert len(org1) >= 32
    return MESdec_key_checked(truncate_b32(cip1), truncate_b32(org1))

def MESdec(cip1: bytes, org1: bytes):
    assert len(cip1) % 32 == 0
    mixkey = MESdec_key(cip1, org1)
    result = b""
    for it in range(0,len(cip1),32):
        ppess=cip1[it:it+32]
        c = ppess[0:8]
        d = ppess[8:16]
        ac = ppess[16:24]
        bd = ppess[24:32]
        a = b8_xor(c, ac)
        b = b8_xor(d, bd)
        real_a = b8_xor(a, mixkey[0:8])
        real_b = b8_xor(b, mixkey[8:16])
        real_c = b8_xor(c, mixkey[16:24])
        real_d = b8_xor(d, mixkey[24:32])
        result += real_a + real_b + real_c + real_d
    return result
```
{% endraw %}
把Richard的密文和server.py的明文传入MESdec就会输出解密后的密文了

第二个flag想了很久，最终发现是一个RSA已知明文密文的攻击

一开始以为是利用packmess，unpackmess校验的漏洞等等，然后无果（但实际上`packmess`自动补零和`unpackmess`忽略超过长度的部分的特性后来发现仍然有用）；还怀疑过`pinfo=sinfo[:len(sinfo)-len(akey)-2]`里面数组下标的漏洞，发现python这里的处理是正确的（`sinfo[:-1]`返回`b''`而不是返回`sinfo[-1:]`），也无果

最后仔细研究了很久，发现这个server.py的逻辑几乎是没有漏洞的

但是这是geekgame，怎么会没有漏洞呢。。？所以server.py看似正确的逻辑必然依赖一些实际上不正确的假设

RSA攻击也不是新闻了，首先查CTF wiki：[rsa_chosen_plain_cipher](https://ctf-wiki.org/crypto/asymmetric/rsa/rsa_chosen_plain_cipher/)，发现一个简单的攻击方法：
> 假设P是明文而$C=P^e$是未知密文
> 选择任意的 $X\isZ^*_n$，即 X 与 N 互素
> 计算$Y=C\timesX^e \mod{n}$
> 由于我们可以进行选择密文攻击，那么我们求得$Y$对应的解密结果$Z=Yd$
> 那么，由于$Z=Yd=(C×X^e)d=C^dX=P^{ed}X=PX\mod{n}$，由于 X 与 N 互素，我们很容易求得相应的逆元，进而可以得到 P

对于server.py来说，逻辑要成立必须依靠一个不正确的假设：*只有God能签名类似`packmess(name)+packmess(key)`的byte string*。如果所有形如`packmess(name)+packmess(key)`都必须由God签名得到，那么server.py的逻辑确实是无漏洞的。

然而，RSA算法本身是简单的幂次，所以可以用类似因式分解的方法伪造密文，CTF wiki上的攻击方法就提示了这一点（虽然不能直接照抄到本题，因为God只签名固定格式）。

这就是server.py逻辑中的第一个漏洞：*RSA选择明文密文攻击*，即可以用原本不是Alice的两个身份计算得出一个Alice的身份

我们希望选择$A$和$B$，使得要伪造明文$P=AB$的签名$P^d$（$P$表示解密后的明文`sinfo`，），然后把$A$和$B$交给God签名，再把签名的结果$X=A^d$，$Y=B^d$相乘就得到$P$的签名$P^d$（就是`Acert`）。然而，随机选择$P=AB$的成本是很高的：因为$P$在`unpackmess`后为Alice，所以我们期望$P$应当至少含有连续的字节`Alice\x00\x05`（根据`unpackmess`的逻辑可以有任意前缀），并且后缀也要符合`packmess`的结构（最后两个字符表示全长），仅仅是`Alice\x00\x05`就已经7字节=56比特的随机性了，$2^56=7.2*10^17$几乎不可能在一台笔记本上完成（当然对于大型计算机是可以的），所以需要找出更多的漏洞

仔细观察rsa.py的逻辑，可以观察到虽然`unpackmess`和`packmess`本身的逻辑正确，但是`enc`的逻辑有一处瑕疵：`enc`先把`mess`转换成整数`gmess`，而我们从小学数学就知道整数开头的零是会被忽略的，但零在byte string里面也是占用string长度的，这也就是说我们得到第二个漏洞：我们可以*伪造packmess得出的最后两位*（只能加长而不能缩短）。

在`getcert`里面发现在整数前加零的办法只适合`name`的部分，`key`的部分加零仍然会影响`enc`的结果，不太方便（即key的部分不方便改动`packmess`的最后两位）。如果我们把`key`设置为空字符`b''`呢？在server.py中尝试一下发现可行（当然，如果不可行就必须给一个非零的`key`值，稍微增加运算量），此时`packmess`以后的结果是`b'\x00\x00`，相当于乘以$2^16$。

以上的分析表明，我们对提交给God签名的值格式上其实是比较宽松的：

*对于任意一个byte string`N`，如果它的末两位`N[-2:]`大于`N[:-2]`的全长，那么可以伪造`N+'b'\x00\x00'`的签名。*

$A$和$B$末尾多了$2^16$只要最后再除以$2^32$的签名（乘以$2^32$签名的$-1$次方）即可，比如我们再提交一个`C=2^8`给God签名然后除以`C^4`。（恰好用完God的三次签名机会）

考虑到4096字符的限制（实际上只能输入2048字节，因为输入的是hex编码）（没搞懂怎么绕过这个限制，`cat <file> - | nc`不能交互式地输入stdin，用`pwntools`也没整明白），得出以下代码：

{% raw %}
```py
def b8toint(bstr: bytes):
    return int.from_bytes(bstr, 'big')

def inttob8(n: int):
    return n.to_bytes((n.bit_length()+7)//8,'big')

def packmess(mess):
    assert len(mess)<=65535
    return mess+(len(mess).to_bytes(2,'big'))

def unpackmess(mess):
    rlen=int.from_bytes(mess[-2:],'big')
    if rlen>len(mess)-2:
        mess=b'\x00'*(rlen-len(mess)+2)+mess
    return mess[-(2+rlen):-2]

def factor_plist(n: int, plist: list):
    maxfactor = 1
    for a in plist:
        if a == 1:
            continue
        while n % a == 0:
            n = n // a
            maxfactor = maxfactor * a
            if n == 1:
                    break
    return maxfactor

def test_plist(a, b, plist):
    balice = b'Alice\x00\x05\x00\x00\x01'
    for i in range(a, b):
        n = b8toint(inttob8(i) + balice)
        if factor_plist(n, plist) != 1:
            print(i)
            return i

def gen4096():
    result = []
    for i in range(3, 2048, 2): # Avoid even numbers and 1
        if pow(i, -1, 65536) < 2048:
            result.append(i)
    return result
```
{% endraw %}
{% raw %}
```
>>> plist = gen4096()
>>> test_plist(1, 100000, plist)
13
13
>>> balice = b'\x0dAlice\x00\x05\x00\x00\x01'
>>> aint = b8toint(balice)
>>> factor_plist(aint, plist)
481
>>> aint // 481
33315986109690466271777
>>> aname1 = unpackmess(inttob8(481)).hex()
>>> aname2 = unpackmess(inttob8(33315986109690466271777)).hex()
>>> aC = unpackmess(b'\x01\x00').hex()
```
{% endraw %}
其中我们要伪造的`sinfo`是`b'\0dAlice\x00\x05\x00\x00\x01'`，`unpackmess`一次以后得到`b'\0dAlice\x00\x05'`，第二次就得到`b'Alice`；$13$由`test_plist`计算得出；`gen4096()`是为了满足4096（实际上hex编码只有2048）字符的限制，列举小于2048的数（不一定要是素数）使得它的逆也小于2048，这样如果`sinfo`含有`gen4096()`里面的因数，那么在伪造`packmess`的最后两位（实际上就是模65536的余数）的时候就能使得分解出的两个因数长度都小于2048字节，hex编码后小于4096字节

交互方法：在和server.py交互的时候选择God，首先把God提供的`N`记录下来，然后提交三次给God签名，前两次的`name`各提交`aname1`和`aname2`的一个后回车，`key`直接按回车，第三次的`name`按回车，`key`提交`aC`按回车，收集到三个值分别记录为`cname1`，`cname2`，`cc`（直接记录整数，不含hex编码），然后计算`cname * cname2 * pow(cc, -4, N)`的值就是要给Richard的acert值。附录rsalog.txt有一个和server.py交互的完整例子。

## 附录
[rsalog.txt](../../../static/2021-11-21/rsalog.txt)
