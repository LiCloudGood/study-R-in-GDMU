---
layout: doc
title: 10-初级绘图函数
---

<script setup>
import { withBase } from 'vitepress'
const code1001 = `library(vioplot)

x <- read.csv("melanom.csv")

# (1) 把 1/2 换成看得懂的标签，并定好水平顺序（ulc 在前、sex 在后）
x$ulc <- factor(x$ulc, levels = 1:2, labels = c("有溃疡", "无溃疡"))
x$sex <- factor(x$sex, levels = 1:2, labels = c("女", "男"))

# (2) 按 ulc 和 sex 分成 4 组
g <- interaction(x$ulc, x$sex, sep = "·")
thick <- split(x$thick, g)

vioplot(thick,
        names = levels(g),
        # 小提琴填充色：4 组各一个
        col = c("skyblue1", "plum1", "lightgreen", "goldenrod"),
        # 箱子填充色：rainbow 的 4 个颜色，透明度 0.8
        rectCol = adjustcolor(rainbow(4), alpha.f = 0.8),
        # 箱子边框与须线：红色；须线长度 1
        lineCol = "red",
        range = 1,
        # 中点：形状 21:24，填充 colors()[101:104]，边框蓝色
        # 注意：pchMed 落在 21:25 时，colMed 是边框色、colMed2 才是填充色
        pchMed = 21:24,
        colMed = "blue",
        colMed2 = colors()[101:104],
        cex = 1.5,
        # (3) 其它参数
        main = "不同溃疡情况与性别的黑色素瘤厚度",
        xlab = "溃疡 / 性别",
        ylab = "厚度",
        cex.main = 1.8,
        cex.axis = 1.2,
        cex.lab = 1.5)`

const code1002 = `library(vioplot)

set.seed(12345)
x.1 <- rnorm(200, mean = 2, sd = 2)
x.2 <- rnorm(200, mean = 4, sd = 3)
x.3 <- rpois(200, 3)
x.4 <- rbinom(200, 8, prob = 0.2)
x <- data.frame(x.1, x.2, x.3, x.4)

vioplot(x,
        # (2) 箱子填充色与边框色都是 colors()[401:404]
        rectCol = colors()[401:404],
        lineCol = colors()[401:404],
        # (5) 小提琴填充色
        col = terrain.colors(4),
        # (6) 小提琴边框颜色与宽度
        border = rainbow(4),
        lwd = 2,
        # (3) 标题：红色、大小 2
        main = "四组随机数的小提琴图",
        col.main = "red",
        cex.main = 2,
        # (4) 刻度标记：蓝色、大小 1.5
        col.axis = "blue",
        cex.axis = 1.5,
        # (7) 其它参数
        cex.lab = 1.5,
        ylab = "取值")`

const code1003 = `x <- read.csv("alkfos.csv")

# (1) 用 qqnorm 算出 QQ 坐标。
#     这里不直接画，因为两组点要用不同的样式，得自己 points() 上去。
qq <- qqnorm(x$c0, plot.it = FALSE)

# (7)(8) 轴标签与刻度标记的样式先用 par 设好，后面画图才生效
par(col.lab = "#0066ff", cex.lab = 1.5,
    col.axis = "#00ff66", cex.axis = 1.5)

plot(qq$x, qq$y, type = "n",
     xlab = "理论分位数", ylab = "样本分位数（c0）",
     main = "c0 的正态 QQ 图",
     cex.main = 2, col.main = "#f80fa8")

# (2)(3)(4)(5) 按 grp 分组上色：形状、边框色、填充色、大小
points(qq$x[x$grp == 1], qq$y[x$grp == 1],
       pch = 21, col = "red",  bg = "purple1", cex = 1.5)
points(qq$x[x$grp == 2], qq$y[x$grp == 2],
       pch = 22, col = "blue", bg = "pink1",   cex = 1.5)

# (9) QQ 参考直线
qqline(x$c0, lwd = 2, col = "red2")

# (10) 其它：加个图例，不然看不出哪组是哪组
legend("topleft", legend = c("grp = 1", "grp = 2"),
       pch = c(21, 22), col = c("red", "blue"),
       pt.bg = c("purple1", "pink1"), pt.cex = 1.5, bty = "n")`

const code1004 = `set.seed(10000)
x <- rnorm(100, 2)

# (1) 先用 rt 产生与 x 等长的随机数 y（自由度 35），
#     y 作理论值（横轴），x 作观测值（纵轴）
y <- rt(length(x), df = 35)

# (4) 轴标签与刻度的字体大小
par(cex.lab = 1.5, cex.axis = 1.5)

qqplot(y, x,
       xlab = "t(35) 的理论分位数", ylab = "x 的样本分位数",
       # (3) 标题
       main = "x 与 t(35) 的 QQ 图", col.main = "blue", cex.main = 2,
       # (2) 点的样式
       pch = 21, col = "blue", bg = "red", lwd = 2, cex = 1.5)

# (5) QQ 直线。要注意 qqline() 默认按正态分布画线，
#     这里比的是 t(35)，所以要用 distribution= 告诉它参考分布是什么。
qqline(x, distribution = function(p) qt(p, df = 35),
       lwd = 2, col = "green2")`

const code1005 = `x <- na.omit(read.csv("alkfos.csv"))

plot(range(x$c0),
     range(x$c12),
     type = "n",
     xlab = "",
     ylab = "")

# (2) 用 points 添加 c0（x 轴）与 c12（y 轴）的散点：
#     两组形状、边框色、填充色都不同
points(x$c0[x$grp == 1], x$c12[x$grp == 1],
       pch = 22, col = "darkblue", bg = "lightgreen", cex = 2.5, lwd = 2)
points(x$c0[x$grp == 2], x$c12[x$grp == 2],
       pch = 23, col = "red", bg = "lightblue", cex = 2.5, lwd = 2)

# (3) 再用 points 叠一层小点
points(x$c0[x$grp == 1], x$c12[x$grp == 1],
       pch = 22, bg = "pink1", cex = 1, lwd = 1)
points(x$c0[x$grp == 2], x$c12[x$grp == 2],
       pch = 23, bg = "purple1", cex = 1, lwd = 1)

# (4) 其它参数：加标题与图例
title(main = "两组 c0 与 c12 的关系", cex.main = 2)
legend("topleft", legend = c("grp = 1", "grp = 2"),
       pch = c(22, 23), col = c("darkblue", "red"),
       pt.bg = c("lightgreen", "lightblue"), pt.cex = 2, bty = "n")`

const code1006 = `t <- seq(from = 0, to = pi, by = 0.01 * pi)

plot(t,
     sin(2 * t + 1),
     type = "l",
     col = "red",
     yaxt = "n",
     xaxt = "n",
     xlab = "",
     ylab = "")

par(new = T)

plot(t,
     cos(4 * t - 3),
     type = "l",
     col = "blue",
     yaxt = "n",
     xaxt = "n",
     xlab = "",
     ylab = "")

par(new = T)

plot(t,
     0.4 * t - 0.2,
     type = "l",
     col = "green",
     lwd = 2,
     xlab = "",
     ylab = "")

# (1) title 添加图标题、子标题与轴标签
title(main = "三条曲线",
      sub = "y = sin(2x+1) / y = cos(4x-3) / y = 0.4x-0.2",
      xlab = "t",
      ylab = "y",
      font.main = 4,
      col.main = "red2",
      cex.main = 2)

# (2) text 标出每条曲线对应的函数式：左下对齐，字体形状 3（斜体）
text(2.3, 0,   "y=sin(2x+1)", adj = c(0, 0), font = 3, col = "red")
text(1.0, 0.8, "y=cos(4x-3)", adj = c(0, 0), font = 3, col = "blue")
text(0.6, 0,   "y=0.4x-0.2",  adj = c(0, 0), font = 3, col = "green")

# (3) mtext 在图形右边加系统当前日期
mtext(format(Sys.Date()), side = 4, col = "gold")`

const code1007 = `x <- as.data.frame(HairEyeColor)
x.m <- subset(x,
              x$Sex == "Male",
              c("Hair", "Eye", "Freq"))

barplot(Freq ~ Hair + Eye, # 行-列
        data = x.m,
        beside = T,
        col = c("yellow",
                "green",
                "pink",
                "blue"),
        ylim = c(0, 65),
        density = c(10, 20, 40, 60),
        angle = c(45, -45, 60, -60),
        main = "添加图例",
        cex.main = 2.5)
box()

# (1) 图例位置放在 top
legend("top",
       legend = levels(x.m$Hair),
       # (2) 分类框：填充背景、边框 rainbow(4)、斜线每英寸 40 条、角度
       fill = rainbow(4),
       density = 40,
       angle = c(-45, 45, -60, 60),
       # (3) 分类线：实线、宽度 2、颜色 colors()[55:58]、长度 3
       lty = 1,
       lwd = 2,
       col = colors()[55:58],
       seg.len = 3,
       # (4) 分类线上的点：样式 21:24、填充黄色、大小 1.5、线宽 3
       pch = 21:24,
       pt.bg = "yellow",
       pt.cex = 1.5,
       pt.lwd = 3,
       # (5) 其它：边框宽 3 蓝色、文字与分类线间隔 1、2 列、字体大小 1.2
       box.lwd = 3,
       box.col = "blue",
       x.intersp = 1,
       ncol = 2,
       cex = 1.2)`

const code1008 = `rm(list = ls())
x <- iris[, c(3, 4)]
names(x) <- c("Length", "Width")
plot(x,
     xlab = "",
     ylab = "",
     cex.axis = 1.5,
     cex = 2,
     col = rainbow(50),
     main = "添加线条",
     cex.main = 2)

# abline：拟合直线
cf <- lm(Width ~ Length, data = x)
cf.a <- coef(cf)[1]   # 截距
cf.b <- coef(cf)[2]   # 斜率

# (1) 添加拟合直线
abline(a = cf.a, b = cf.b, lwd = 2, col = "red")

# lines：正态密度曲线
set.seed(100)
t <- seq(from = 1, to = 7, by = 0.05)
y <- dnorm(t, mean = 4, sd = 0.5)

# (2) 密度数据放大 3 倍再画，蓝色、宽度 2、虚线
lines(t, 3 * y, col = "blue", lwd = 2, lty = 2)

# (3) 添加箭头：起点 (2.3, 1.5)，终点 (3.7, 1.9)，终点处画箭头
arrows(2.3, 1.5, 3.7, 1.9,
       length = 0.3, angle = 30, code = 2, col = "blue")

# (4) 在箭头起点那一端加文字：文字的右上端对齐到起点，所以 adj = c(1, 1)
text(2.3, 1.5, "正态密度曲线", adj = c(1, 1), col = "blue")`
</script>

# 初级绘图函数

::: info 老师的建议
完成实验题 1、3、5、6、7、8，课后完成实验题 2、4。
:::

## 实验目的

- 掌握散点图 `points()` 函数。
- 掌握线条函数 `lines()`、`abline()`，以及箭头函数 `arrows()`。
- 掌握文本函数 `text()`、`title()`。
- 掌握图例函数 `legend()`。

::: warning 这一讲的答案是本站自己跑出来的
其他各讲的答案来自老师给的 `资料/答案`，**第十周没有答案、也没有汇总**这两份资料，
只有原题和 8 个 starter 脚本（脚本里只读了数据，画图的部分是空着的）。

所以本页答案是照着题目要求一条条实现、在本机 R 里跑出来的，配图也是跑出来的实际输出。
题面里多处写「如下图所示」，样图就贴在每题下面（取自原题 docx 里的插图），可以对着比。
题目没有写死的细节（比如标题写什么字）按样图的样式补上，其余一律按题面给的参数。
:::

::: tip 两个数据文件
实验题 1 用 `melanom.csv`，实验题 3、5 用 `alkfos.csv`，
都在 `资料/原题/第十周原题/` 里，跑之前先把工作目录切过去。

`vioplot` 不是 R 自带的，要先 `install.packages("vioplot")`。
:::

::: tip 原题里的 `arrow 函数` 其实是 `arrows()`
实验目的第二条写的是 `arrow` 函数，R 里的函数名带 s，是 **`arrows()`**。
:::

## 实验题 1：vioplot 函数的应用

打开脚本文件 **test1001.R**，其中 `x` 是数据框，变量 `ulc` 表示是否有溃疡，
`sex` 是性别，`thick` 是黑色素瘤厚度。用小提琴图按 `ulc` 与 `sex` 进行分类比较黑色素瘤厚度。

1. 把变量 `ulc` 中为 1 的数据改为「有溃疡」，为 2 的数据改为「无溃疡」；
   把 `sex` 为 1 的数据改为「女」，为 2 的数据改为「男」。
2. 按 `ulc` 和 `sex` 进行分组绘制小提琴图，图形参数设置如下：
   - 分类轴的类标签用 `ulc` 和 `sex` 命名，且 `ulc` 在前、`sex` 在后，如下图所示；
   - 箱子的填充颜色为 `rainbow` 中的 4 个颜色，且 alpha 设置为 0.8；
   - 箱子边框和须线的颜色为红色，须线长度设置为 1；
   - 小提琴的填充颜色为 `"skyblue1"`、`"plum1"`、`"lightgreen"`、`"goldenrod"`；
   - 箱子的中点类型为 21:24，中点大小为 1.5，中点填充颜色为 `colors()` 的第 101 至 104 号颜色，
     中点边框为蓝色。
3. 按下图的样式设置其它参数。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig01.png')" alt="样图 1" loading="lazy" />
    <figcaption>样图 1</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 1 · 参考答案"
  description="需要 vioplot 包（install.packages('vioplot')），数据为 melanom.csv。"
  :code="code1001"
  :images="['/figures/10-base-graphics/q01.png']"
/>

::: tip 这题的三个坑
**① `alpha = 0.8` 不能直接写。** `vioplot()` 没有 `alpha` 这个参数，
写了不会报错——它会把这 0.8 **当成第五组数据**画进去，图就多出来一条小提琴。
设透明度的正确写法是 `adjustcolor(色, alpha.f = 0.8)`。

**② 中点颜色是反过来的。** `pchMed` 取 21:25 时，`colMed` 管的是**边框色**、
`colMed2` 才是填充色。题目要「填充 `colors()[101:104]`、边框蓝色」，
所以 `colMed = "blue"`、`colMed2 = colors()[101:104]`——写反了颜色就全反了。

**③ 分组标签的先后。** `interaction(ulc, sex)` 的先后顺序就是 `sep` 拼出来的顺序，
先把两个变量设成有顺序的因子，标签才会稳定地是「有溃疡·女、有溃疡·男、无溃疡·女、无溃疡·男」。
:::

## 实验题 2：vioplot 函数的应用（课后完成）

打开脚本文件 **test1002.R**，完成下面的操作。

1. 绘制数据框 `x` 中的 4 个变量的小提琴图。
2. 小提琴图中的箱子填充颜色和箱子边框颜色都为 `colors()[401:404]`。
3. 标题字体颜色为红色，大小为 2。
4. 轴刻度标记的颜色为蓝色，刻度标记字体大小为 1.5。
5. 小提琴的填充颜色为 `terrain.colors(4)`。
6. 小提琴的边框颜色为 `rainbow(4)`，宽度为 2。
7. 参照样图设置其它参数。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig02.png')" alt="样图 2" loading="lazy" />
    <figcaption>样图 2</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 2 · 参考答案"
  description="数据框直接传给 vioplot()，它会把每一列当成一组。"
  :code="code1002"
  :images="['/figures/10-base-graphics/q02.png']"
/>

::: tip `vioplot()` 收几种输入
传一个**数据框**或**矩阵**：每一列一组；
传一个**列表**：每个元素一组（实验题 1 就是这么分的组）；
传**多个向量** `vioplot(a, b, c)`：每个向量一组；
传**公式** `vioplot(y ~ g, data = d)`：按 `g` 的水平分组。

参数写成向量（比如 `col = colors()[401:404]`）时，按组依次取用、不够就循环。
:::

## 实验题 3：QQ 图实验

打开脚本文件 **test1003.R**，完成下面任务。

1. 用 `qqnorm` 绘制数据框 `x` 中的变量 `c0` 的 QQ 散点图。
2. 当 `grp` 为 1 时，点类型为 21；当 `grp` 为 2 时，点类型为 22。
3. 当 `grp` 为 1 时，边框为红色；当 `grp` 为 2 时，边框为蓝色。
4. 若 `grp` 为 1，则点的填充颜色为 `purple1`；若 `grp` 为 2，则点的填充颜色为 `pink1`。
5. 点大小为 1.5。
6. 标题的大小为 2，颜色为 `#f80fa8`。
7. 轴标签的字体大小为 1.5，颜色为 `#0066ff`。
8. 刻度标记的字体大小为 1.5，颜色为 `#00ff66`。
9. 用 `qqline` 绘制 `c0` 的 QQ 直线，线宽为 2，颜色为 `red2`。
10. 其它参数按下图的样式进行设置。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig03.png')" alt="样图 3" loading="lazy" />
    <figcaption>样图 3</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 3 · 参考答案"
  description="两组点要不同样式，所以用 qqnorm(plot.it = FALSE) 先取坐标，再自己画。"
  :code="code1003"
  :images="['/figures/10-base-graphics/q03.png']"
/>

::: tip 为什么要 `plot.it = FALSE`
`qqnorm()` 一次性把所有点画成同一个样式，没法「第一组 21 号点、第二组 22 号点」。
它真正的用处是**算出坐标**：`qqnorm(x$c0, plot.it = FALSE)` 返回一个列表，
`$x` 是理论分位数、`$y` 是排好序的观测值。拿到这两列以后，
就可以按分组用 `points()` 一组一组画上去，样式随便设。

这也是这一讲的核心思路：**低级绘图函数是往已经画好的图上「添东西」的**，
`points()`、`lines()`、`text()` 都是这个套路，所以整张图怎么搭、先画什么后画什么，由你决定。
:::

## 实验题 4：QQ 图的应用（课后完成）

打开脚本文件 **test1004.R**，完成下面任务。

1. 用 QQ 图检验 `x` 是否近似服从自由度为 35 的 t 分布。
   - 先用 `rt` 产生与 `x` 等长的随机数 `y`，其中 `rt` 的自由度为 35；
   - 然后用 `y` 做理论值、`x` 做观测值，用 `qqplot` 绘制 QQ 散点图；
   - `qqline` 绘制 QQ 直线，若散点集聚在直线附近，则认为 `x` 近似服从自由度为 35 的 t 分布。
2. 散点图的点类型为 21，点边框颜色为蓝色，宽度为 2，大小为 1.5，点的填充颜色为红色。
3. 标题颜色为蓝色，大小为 2。
4. 轴标签字体大小为 1.5，刻度字体大小也为 1.5。
5. `qqline` 绘制直线的线宽为 2，颜色为 `green2`。
6. 其它参数按下图的样式进行设置。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig04.png')" alt="样图 4" loading="lazy" />
    <figcaption>样图 4</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 4 · 参考答案"
  description="注意 qqline() 要指定参考分布，否则它会按正态分布画线。"
  :code="code1004"
  :images="['/figures/10-base-graphics/q04.png']"
/>

::: tip `qqline()` 默认比的是正态分布
`qqline()` 默认 `distribution = qnorm`，画的是「数据 vs 正态」的那条参考线。
这一题比的是 **t(35)**，直接 `qqline(x)` 会把线画歪，看着像「明显不正态」——
其实是线不对，不是数据不对。加上 `distribution = function(p) qt(p, df = 35)` 才对得上。

**`qqnorm` 和 `qqplot` 的区别**：`qqnorm(x)` 是「`x` vs 正态」的特例；
`qqplot(y, x)` 是通用的两样本 QQ 图——`y` 作理论值画在横轴，`x` 作观测值画在纵轴。
这一题用 `rt` 造了一批 t(35) 随机数当理论值，所以横轴是 t 分位数。

**读图**（三种典型样子）：

- 点基本贴着直线 → 这个分布说得通；
- 两端**一上一下**（左端翘在直线上方、右端落在直线下方，呈 S 形）→ 尾部比参考分布**轻**；
  反过来（左低右高）→ 尾部**重**；
- 整体弯成一张弓 → 分布偏态。

这一题的 `x` 是 `rnorm(100, 2)` 生成的，而 t 的尾巴比正态重
（t(35) 的 1% 分位数是 $-2.44$，正态只有 $-2.33$），
所以它并**不严格**服从 t(35)：图上会是第一种 S 形，
按这个数据实测，左端高出直线约 1.2、右端低于直线约 0.6，肉眼看得出来。
自由度越大 t 越接近正态，35 已经比较接近了，所以弯曲不算剧烈。
:::

## 实验题 5：points 函数实验

打开脚本文件 **test1005.R**，完成下面操作。

1. 用数据框 `x` 作为数据源。
2. 用 `points` 函数添加由 `c0` 和 `c12` 组成的散点，其中 `c0` 为 x 轴、`c12` 为 y 轴。
   - 当 `grp` 为 1 时，点类型为 22，边框颜色为 `darkblue`，填充颜色为 `lightgreen`；
   - 当 `grp` 为 2 时，点类型为 23，边框颜色为 `red`，填充颜色为 `lightblue`；
   - 点大小为 2.5，边框宽度为 2。
3. 使用 `points` 函数再添加由 `c0` 和 `c12` 组成的散点。
   - 当 `grp` 为 1 时，点类型为 22，填充颜色为 `pink1`；
   - 当 `grp` 为 2 时，点类型为 23，填充颜色为 `purple1`；
   - 点大小为 1，边框宽度为 1。
4. 其它参数按下图的样式设置。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig05.png')" alt="样图 5" loading="lazy" />
    <figcaption>样图 5</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 5 · 参考答案"
  description="starter 脚本里已经画好了空坐标系，直接把点添上去即可。"
  :code="code1005"
  :images="['/figures/10-base-graphics/q05.png']"
/>

::: tip `type = "n"` 是「只画坐标系，不画点」
starter 脚本里那句 `plot(range(x$c0), range(x$c12), type = "n")` 就是这个意思：
先用数据的取值范围把坐标系撑开、定好坐标轴，**图上是空的**，
然后再用 `points()` 把点一层层添上去。

这一题要添两层：先大点（`cex = 2.5`、`lwd = 2`）打底，
再同位置叠一层小点（`cex = 1`）。叠出的是「描边」效果，
所以第二层不写 `col` 时边框是黑色（默认色）——和样图一致。

**顺序很重要**：后画的盖在先画的上面。要让小点露出来，就得让它在后面画。
:::

## 实验题 6：title 函数、text 函数、mtext 函数的应用

打开脚本文件 **test1006.R**，完成下面操作。

1. 用 `title` 函数添加图标题与子标题，添加轴标签。设置标题字体形状为 4，
   颜色为 `red2`，字体大小为 2，如下图所示。
2. 用 `text` 函数添加图中线条对应的函数表达式，如下图所示。对齐方式为左下对齐坐标 `(x, y)`，
   字体形状为 3。`y=sin(2x+1)` 的坐标为 `(2.3, 0)`，颜色为红色；
   `y=cos(4x-3)` 的坐标为 `(1.0, 0.8)`，颜色为蓝色；`y=0.4x-0.2` 的坐标为 `(0.6, 0)`，颜色为绿色。
3. 用 `mtext` 在图形的右边添加系统当前日期，颜色为 `gold`。
4. 其它参数按下图的样式设置。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig06.png')" alt="样图 6" loading="lazy" />
    <figcaption>样图 6</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 6 · 参考答案"
  description="三条曲线用 par(new = TRUE) 叠在一起，再统一加标题、标注和边注。"
  :code="code1006"
  :images="['/figures/10-base-graphics/q06.png']"
/>

::: tip `par(new = TRUE)` 是「在同一张图上接着画」
R 的 `plot()` 默认会**开一张新图**、把上一张冲掉。`par(new = TRUE)` 告诉它
「别清屏，就在当前这张图上画」，这样三条曲线才能叠在一起。

前两次 `plot()` 都写了 `yaxt = "n"` / `xaxt = "n"`：**把坐标轴关掉**。
不然三条曲线各自画一套坐标轴，叠起来就是三套轴糊在一起。
最后一次不关，留一套干净的在最上面。

**三个加字的函数分工**：

| 函数 | 加在哪儿 |
| --- | --- |
| `title()` | 图的上方（主标题、子标题）和轴标签 |
| `text(x, y, ...)` | 图内**任意坐标**处，按数据坐标定位 |
| `mtext(..., side =)` | 图**四边**的外侧边注，`side = 1/2/3/4` 是下/左/上/右 |

`adj = c(0, 0)` 是「左下对齐」：把文字框的**左下角**放在这个坐标上。
`font = 3` 是斜体，`font = 4` 是粗斜体。

这一题的日期用 `format(Sys.Date())` 取当天，所以**你跑出来的日期会是你跑的那天**，
和本页图上的不一样，这是对的。
:::

## 实验题 7：legend 函数的应用

打开脚本文件 **test1007.R**，完成下面任务。

1. 用 `legend` 函数添加图例，位置为 `top`。
2. 设置分类框：填充背景为 `TRUE`，边框颜色为 `rainbow(4)`，填充线条为每英寸 40 条，
   颜色为 `c(-45, 45, -60, 60)`。
3. 设置分类线：线型为实线，宽度为 2，分类线的颜色为 `colors()[55:58]`，分类线的长度为 3。
4. 设置分类线上的点：点的样式为 `21:24`，填充颜色为黄色，大小为 1.5，线宽为 3。
5. 图例其他设置：图例边框宽为 3，颜色为蓝色，文字与分类线的间隔为 1，
   图例用 2 列显示，图例字体大小为 1.2。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig07.png')" alt="样图 7" loading="lazy" />
    <figcaption>样图 7</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 7 · 参考答案"
  description="图例的每个部分都有各自的参数，分清楚 fill / lty / pch 三套。"
  :code="code1007"
  :images="['/figures/10-base-graphics/q07.png']"
/>

::: tip `legend()` 的参数是「按部位分家」的
图例里每个条目由三部分组成：**分类框**（`fill` / `density` / `angle`）、
**分类线**（`lty` / `lwd` / `col` / `seg.len`）、**分类线上的点**（`pch` / `pt.bg` / `pt.cex` / `pt.lwd`）。
认准 `pt.` 前缀的就是「管点的」，`box.` 前缀的是「管整个图例外框的」。

几个容易混的：

| 参数 | 管什么 |
| --- | --- |
| `x.intersp` | 图例符号与文字之间的**横向**间隔 |
| `seg.len` | 分类线的长度（单位是字符宽度）|
| `ncol` | 图例分几列显示 |
| `density` / `angle` | 填充斜线的密度（每英寸条数）与倾斜角度 |

`fill = rainbow(4)` 配上 `density` 之后，`fill` 的颜色就变成**斜线**的颜色，
而不是整块填充色——和 `hist()` 里 `col` 与 `density` 的关系是同一个道理。
:::

## 实验题 8：综合绘图

打开脚本文件 **test1008.R**，完成下面任务。

1. 给图形添加拟合直线，截距为 `cf.a`，斜率为 `cf.b`，宽度为 2，颜色为红色。
2. 添加正态密度曲线，其中分位数数据为 `t`，密度数据为 `3*y`，颜色为蓝色，宽度为 2，线型为 2。
3. 添加箭头，起点为 `(2.3, 1.5)`，终点为 `(3.7, 1.9)`，箭头长度为 0.3，角度为 30 度，
   且在终点处绘制箭头，颜色为蓝色。
4. 在箭头的另一端添加文本，要求文本右上端的坐标为箭头起点坐标，颜色为蓝色。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig08.png')" alt="样图 8" loading="lazy" />
    <figcaption>样图 8</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 8 · 参考答案"
  description="abline 加直线、lines 加曲线、arrows 加箭头、text 加标注，四种「往上添」的写法一次用全。"
  :code="code1008"
  :images="['/figures/10-base-graphics/q08.png']"
/>

::: tip `abline()`、`lines()`、`arrows()` 各管什么
| 函数 | 画什么 | 位置怎么给 |
| --- | --- | --- |
| `abline(a = 截距, b = 斜率)` | 一条**无限长**直线，贯穿整张图 | 给截距和斜率 |
| `lines(x, y)` | 把点按顺序连起来的**折线/曲线** | 给一串坐标 |
| `arrows(x0, y0, x1, y1)` | 从起点到终点的箭头 | 给两个端点 |

`abline()` 的截距和斜率要从拟合结果里取：`cf <- lm(...)` 之后
`coef(cf)` 是长度为 2 的向量，`[1]` 是截距、`[2]` 是斜率，
所以先 `cf.a <- coef(cf)[1]`、`cf.b <- coef(cf)[2]` 再传给 `abline(a =, b =)`。

**`code = 2` 是「只在终点画箭头」**：`code = 1` 起点画、`code = 2` 终点画、`code = 3` 两头都画。
`length = 0.3` 是箭头尖的长度（单位是英寸），`angle = 30` 是箭头张开的角度。

最后一小题要「文本的右上端对齐到箭头起点」，对应 `adj = c(1, 1)`：
`adj` 控制的是**文字框的哪个角**放在这个坐标上，`c(0, 0)` 是左下、`c(1, 1)` 是右上。
:::

## 这一讲的绘图函数速查

| 函数 | 作用 | 关键参数 |
| --- | --- | --- |
| `points(x, y)` | 往图上加点 | `pch`、`col`、`bg`、`cex`、`lwd` |
| `lines(x, y)` | 往图上加线 | `type`、`lty`、`lwd`、`col` |
| `abline(a, b)` | 加一条无限长的直线 | `a` 截距、`b` 斜率；也可写 `h =`（水平）、`v =`（垂直）|
| `arrows(x0, y0, x1, y1)` | 加箭头 | `length`、`angle`、`code`、`col` |
| `text(x, y, labels)` | 图内任意位置加文字 | `adj`、`cex`、`col`、`font` |
| `title(...)` | 加主标题 / 子标题 / 轴标签 | `main`、`sub`、`xlab`、`ylab`、`font.main` |
| `mtext(text, side =)` | 四边外侧加边注 | `side`、`line`、`adj`、`col` |
| `legend(...)` | 加图例 | `fill`、`lty`、`pch`、`ncol`、`bty` |
| `par(new = TRUE)` | 在**同一张图**上接着画，不清屏 | 配合 `xaxt` / `yaxt` 关掉重复坐标轴 |

**点样式 `pch` 的规律**：`21:25` 是**有空心**的形状（可分别设边框 `col` 和填充 `bg`），
其余（`0:20`、`1`、`2`…）是实心符号，只有 `col` 一个颜色可以设。
要「红边紫心」这种效果，就必须用 21 及以上。

::: info 关于本页的题目与答案
题目来自 `资料/原题/第十周原题`。

**这一讲的答案不是老师给的**：`资料/答案` 和 `资料/汇总` 里都没有第十周，
只有原题和 8 个 starter 脚本。所以答案和配图是本站照着题目要求实现、在本机跑出来的；
样图取自原题 docx 里的插图（`fig01.png` ~ `fig08.png`）。
:::

::: tip 想弄懂背后的统计学原理
这一讲是 **base R 的低级绘图函数手册**——怎么在一张已经画好的图上加东西。

什么数据该配什么图、一张图怎样才算不误导读者（截断坐标轴、双 Y 轴、饼图用不用），
见《卫生统计学》的归纳；更高层的现成图形函数（`hist`、`boxplot`、`plot`）见第 9 讲。

- **[《卫生统计学》第 19 章　常用统计图表](/Health-statistics/19-tables-and-charts)**
- **[《信息技术基础》第 9 讲　高级绘图](/intro-it/9-base-graphics)**
:::
