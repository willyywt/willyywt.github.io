---
layout: post
title: "交大五一假期ddl的高数题"
last_modified_at: 2022-05-07
lang: zh-CN
---
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this
   - file, You can obtain one at https://mozilla.org/MPL/2.0/. -->
最近比较颓废，复健做几道网传上海交大五一假期ddl的高数题


{% raw %}
## hw30
30. $f\left(x,y\right)$是$\mathbf{R}^{2}$上的连续可微函数，记$u\left(x,y\right)=-yf_{x}+xf_{y}$，$I\left(\alpha\right)=\iint_{D_{\alpha}}u\left(x,y\right)\mathrm{d}x\mathrm{\mathrm{d}y}$，其中$D_{\alpha}$：$\left(x-2\cos\alpha\right)^{2}+\left(y-2\sin\alpha\right)^{2}\leq1$，证明：函数$I\left(\alpha\right)$存在零点。

证明：先证明
\$\$
\int_{0}^{2\pi}I\left(\alpha\right)\mathbb{\mathrm{d}\alpha}=0
\$\$


由$\left(x-2\cos\alpha\right)^{2}+\left(y-2\sin\alpha\right)^{2}\leq1$可以得出
\$\$
x^{2}+y^{2}+4-4x\cos\alpha-4y\sin\alpha\leq1
\$\$
\$\$
\cos{{\left(\alpha-\phi\right)}\geq\frac{x^{2}+y^{2}+3}{4\sqrt{x^{2}+y^{2}}}}
\$\$
进而$x^{2}+y^{2}\in\left[1,9\right]$。

考虑
\$\$
\int_{0}^{2\pi}I\left(\alpha\right)\mathbb{\mathrm{d}\alpha}=\iiint_{V_{1}}\left(-yf_{x}+xf_{y}\right)C\left(\alpha\right)\mathrm{d}x\mathrm{d}y\mathrm{d}\alpha
\$\$
其中
\$\$
V_{1}:x^{2}+y^{2}\in\left[1,9\right]\text{,}\alpha\in\left[0,2\pi\right],C\left(\alpha\right)=\begin{cases}
1 \& \cos{{\left(\alpha-\phi\right)}\geq\frac{x^{2}+y^{2}+3}{4\sqrt{x^{2}+y^{2}}}}\\
0 \& \text{其他情况}
\end{cases}
\$\$

$-yf_{x}+xf_{y}$与$\alpha$无关，对$\alpha$积分可得
\$\$
\iiint_{V_{1}}\left(-yf_{x}+xf_{y}\right)C\left(\alpha\right)\mathrm{d}x\mathrm{d}y\mathrm{d}\alpha=\iint_{1\leq x^{2}+y^{2}\leq9}\left(-yf_{x}+xf_{y}\right)\cdot2\arccos\left({\frac{x^{2}+y^{2}+3}{4\sqrt{x^{2}+y^{2}}}}\right)\mathrm{d}x\mathrm{d}y
\$\$

设$z=2\arccos\left(\frac{x^{2}+y^{2}+3}{4\sqrt{x^{2}+y^{2}}}\right)$，由格林公式
\$\$
\oint_{\Gamma_{1}}xzf\mathrm{d}x+yzf\mathrm{d}y=\iint_{x^{2}+y^{2}\leq9}\left(\frac{\partial\left(yzf\right)}{\partial x}-\frac{\partial\left(xzf\right)}{\partial y}\right)\mathrm{d}x\mathrm{d}y
\$\$

\$\$
=\iint_{x^{2}+y^{2}\leq9}\left(yzf_{x}-xzf_{y}\right)\mathrm{d}x\mathrm{d}y
\$\$

\$\$
\oint_{\Gamma_{2}}xzf\mathrm{d}x+yzf\mathrm{d}y=\iint_{x^{2}+y^{2}\leq1}\left(yzf_{x}-xzf_{y}\right)\mathrm{d}x\mathrm{d}y
\$\$

上面用到$\grave{\frac{\partial\left(yz\right)}{\partial x}-\frac{\partial\left(xz\right)}{\partial y}=0}$，$\Gamma_{1},\Gamma_{2}$分别是区域$D_{1}:1\leq x^{2}+y^{2}\leq9$的外边界和内边界。

对于$\Gamma_{1}$，设$x=3\cos\theta,y=3\sin\theta,\theta\in\left[0,2\pi\right]$，则
\$\$
\oint_{\Gamma_{1}}xzf\mathrm{d}x+yzf\mathrm{d}y=\int_{0}^{2\pi}zf\cdot\left(\left(3\cos\theta\right)\left(-3\sin\theta\right)+\left(3\sin\theta\right)\left(3\cos\theta\right)\right)\mathrm{d}\theta=0
\$\$
同理，对于$\Gamma_{2}$有
\$\$
\oint_{\Gamma_{2}}xzf\mathrm{d}x+yzf\mathrm{d}y=0
\$\$

所以
\$\$
\int_{0}^{2\pi}I\left(\alpha\right)\mathbb{\mathrm{d}\alpha}=\oint_{\Gamma_{1}}xzf\mathrm{d}x+yzf\mathrm{d}y-\oint_{\Gamma_{2}}xzf\mathrm{d}x+yzf\mathrm{d}y=0
\$\$

因为$f\left(x,y\right)$是$\mathbf{R}^{2}$上的连续可微函数，所以$u\left(x,y\right)=-yf_{x}+xf_{y}$在$\mathbf{R}^{2}$上连续，从而$I\left(\alpha\right)$对于参数$\alpha$连续。假设$I\left(\alpha\right)$不存在零点，则由连续函数的介值定理，以及$I\left(\alpha\right)$以$2\pi$为周期，可知$I\left(\alpha\right)$在$\left[0,2\pi\right]$上符号相同（恒为正数或者恒为负数），对连续函数$I\left(\alpha\right)$不可能有$\int_{0}^{2\pi}I\left(\alpha\right)\mathbb{\mathrm{d}\alpha}=0$，矛盾。因此$I\left(\alpha\right)$存在零点。

{% endraw %}
