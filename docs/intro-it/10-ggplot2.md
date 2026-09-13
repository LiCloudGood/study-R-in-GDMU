---
layout: doc
title: 10-ggplot2包
---

<script setup>
import { withBase } from 'vitepress'

const code1101 = `x = iris[101:150,]

#par函数
par(mfrow = c(2,3))
plot(x$Sepal.Length,x$Sepal.Width)
box()
hist(x$Sepal.Length,main = 'Histogram of x$Sepal.Length',ylab = 'Frequency',border = 'black')
box()
hist(x$Sepal.Width,main = 'Histogram of x$Sepal.Width', ylab = 'Frequency',border = 'black')
box()
plot(x$Petal.Length,x$Petal.Width)
box()
hist(x$Petal.Length,main = 'Histogram of x$Petal.Length',ylab = 'Frequency',border = 'black')     
box()
hist(x$Petal.Width,main = 'Histogram of x$Petal.Width',ylab = 'Frequency',border = 'black')     
box()
par(mfrow = c(1,1))

# layout函数
layout_matrix <- matrix(c(1,2,3),nrow = 2,ncol = 1)
layout(layout_matrix,widths = c(0.6,0.4),heights = c(0.5,0.5))
plot(x$Sepal.Length,x$Sepal.Width)
box()
hist(x$Sepal.Length,main = 'Histogram of x$Sepal.Length',ylab = 'Frequency',border = 'black')
box()
hist(x$Sepal.Width,main = 'Histogram of x$Sepal.Width', ylab = 'Frequency',border = 'black')
box()
par(mfrow = c(1, 1))`

const code1102 = `df = data.frame(x=c(3,1,5), y=c(5,7,9))
library(ggplot2)

ggplot(
  df,
  aes(xmin = x,xmax = x+2,ymin = y-1,ymax = y+1)) +
    geom_rect(aes(fill = x)) +
    theme(
      axis.title = element_blank(),
      axis.text = element_text(size = 20),
      legend.position = 'none'
    )`

const code1104 = `library(ggplot2)
x = mtcars[,c('hp','disp','cyl')]

ggplot(x,aes(hp,disp)) + 
  geom_point(size = 3,color = 'blue3') +
  geom_text(
    aes(label = mtcars$cyl, color = mtcars$cyl),
    size = 6, nudge_x = 8) +  
  scale_color_gradientn(colors = rainbow(20), name = "气缸数") +
  theme(
    legend.title = element_text(size = 18),  
    legend.text = element_text(size = 16),  
    axis.title.x = element_text(size = 18),  
    axis.title.y = element_text(size = 18),  
    axis.text = element_text(size = 16)  
  )`

const code1105 = `# 加载ggplot2包
library(ggplot2)

# 使用faithfuld数据集
data(faithfuld)

# 绘制等高线图和二维密度图
p <- ggplot(data = faithfuld, aes(x = eruptions, y = waiting, z = density)) +
  geom_raster(aes(fill = density)) +
  geom_contour(color = 'red') +
  theme(
    axis.title.x = element_text(size = 16),  # x轴标签字号设置为16
    axis.title.y = element_text(size = 16),  # y轴标签字号设置为16
    legend.title = element_text(size = 16),  # 图例标题字号设置为16
    legend.text = element_text(size = 14),  # 图例关键字标签字号设置为14
    axis.text = element_text(size = 14),  # 刻度标签字号设置为14
    panel.grid.major = element_blank(),  # 清除主网格线
    panel.grid.minor = element_blank(),  # 清除次网格线
    panel.background = element_rect(fill = "lightblue")  # 面板背景颜色为"lightblue"
  )

# 打印图形
print(p)`

const code1106 = `library(ggplot2)
ggplot(diamonds,aes(price)) +
  geom_histogram(
    aes(fill = ..density..), binwidth = 1000) +
  scale_fill_continuous(low = 'green',high = 'blue') +
  labs(title = '钻石价格直方图') +
  theme(axis.title = element_text(size = 18),
        axis.text = element_text(size = 16),
        legend.title = element_text(size = 18),
        legend.text = element_text(size = 16),
        plot.title = element_text(
          size = 22,hjust = 0.5,
          margin = margin(b = 12)
        )
  )`

const code1107 = `library(ggplot2)
ggplot(iris, aes(Sepal.Length, Sepal.Width)) +
  geom_point(
    aes(fill = Species), size = 5,
    shape = 21, alpha = 0.7) +
  scale_x_continuous(
    '花萼长',
    limits = c(4,8),
    breaks = c(4,4.5,5,5.5,6,6.5,7,7.5,8)
  ) + 
  scale_y_continuous(
    '花萼宽',
    limits = c(2,4.4),
    breaks = seq(2,4.4,by=0.4)
  ) + 
  labs(
    title = '鸢尾花花萼长与宽的散点图') +
  scale_fill_brewer(
    '品种',palette = 'Set1') + 
  theme(
    plot.title = element_text(
      size = 20,
      color = 'blue',
      margin = margin(b = 12),
      hjust = 0.5,
      face = 'bold'),
    axis.title.x = element_text(
      size = 18,
      face = 'bold',
      margin = margin(t = 10),
      color = 'brown'),
    axis.title.y = element_text(
      size = 18,
      face = 'bold',
      margin = margin(r = 10),
      color = 'brown'),
    axis.text = element_text(
      color = 'red',
      size = 16),
    legend.title = element_text(
      color = 'brown',
      size = 18,
      margin = margin(b = 10),
      face = 'bold'),
    legend.text = element_text(
      size = 16),
    legend.key.height = unit(1,'cm'),
    legend.key.width = unit(0.9,'cm'),
    legend.background = element_rect(
      fill = 'grey90',
      color = 'red')
  )`
</script>

# ggplot2包

::: info 老师的建议
请完成实验题 1~5（实验题 6 的完整代码已在原题中给出）。
:::

## 实验目的

- 掌握 `par` 函数与 `layout` 函数的用法。
- 掌握 `ggplot` 函数的使用方法。
- 掌握主要几何元素的使用方法。
- 掌握 ggplot2 的主要统计变换方法。
- 掌握 ggplot2 的分页设置方法。
- 掌握 ggplot2 的主要标度变换方法。
- 掌握 ggplot2 的主题元素的设置。

::: tip 本讲的「运行」按钮会直接出图
网页里的 R 用的是画布设备，ggplot2 画出来的图会显示在「输出结果」下面。
不过 **ggplot2 是个很大的包**，首次点运行时安装可能要等上一两分钟。
:::

## 实验题 1：par 函数和 layout 函数

打开脚本文件 **test1101.R**，完成下面任务。

1. 用 `par` 函数按行将画布分成 2 行 3 列，然后用 `x` 中的数据绘制图形（如 **图 1** 所示）。
2. 用 `layout` 函数将画布分成 2 行 2 列，宽度分别为 0.6 和 0.4，高度分别为 0.5 和 0.5，然后用 `x` 中的数据绘制图形（如 **图 2** 所示）。

> 注意：图中的直方图使用了 `box()` 函数添加边框；在脚本文件最后添加 `par(mfrow = c(1,1))`，恢复为单一窗口。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig01.png')" alt="图 1" loading="lazy" />
    <figcaption>图 1</figcaption>
  </figure>
  <figure>
    <img :src="withBase('/figures/10-question/fig02.png')" alt="图 2" loading="lazy" />
    <figcaption>图 2</figcaption>
  </figure>
</div>

<AnswerBlock title="实验题 1 · 参考答案" :code="code1101"
  :images="['/figures/10-ggplot2/unnamed-chunk-7-1.png', '/figures/10-ggplot2/unnamed-chunk-7-2.png', '/figures/10-ggplot2/unnamed-chunk-7-3.png']"
/>

::: tip par(mfrow) 与 layout 的分工
| 函数 | 能做什么 | 局限 |
| --- | --- | --- |
| `par(mfrow = c(2, 3))` | 把画布切成**等大**的 2 行 3 列 | 每格一样大，不能调比例 |
| `layout(mat, widths, heights)` | 按矩阵 `mat` 排布，还能指定**宽高比例** | 要自己写矩阵 |

`layout` 的 `mat` 矩阵写法：**相同数字表示同一块画布**，
数字顺序决定绘图顺序。想要「上面一整行、下面左右两块」，就写：

```r
mat <- matrix(c(1, 1, 2, 3), nrow = 2, byrow = TRUE)
layout(mat, widths = c(0.6, 0.4), heights = c(0.5, 0.5))
```

`box()` 是给当前图形加一圈外框——没有它，`par` / `layout` 切出来的分格里
图形边界不容易看清。

> 小提示：答案里的 `layout_matrix <- matrix(c(1,2,3), nrow = 2, ncol = 1)`
> 得到的是 2 行 **1 列**，和题目要求的「2 行 2 列、宽 0.6/0.4」不太对应。
> 如果运行时提示宽度向量长度不匹配，按上面那个矩阵改一下即可。
:::

## 实验题 2：geom_rect 函数

打开 **test1102.R**，完成下面任务。

1. 在脚本文件中，数据框 `df` 包含两个变量 `x` 和 `y`，以 `x` 为横坐标 `y` 为纵坐标，用 `geom_rect` 函数绘制瓦片图。
2. 颜色映射为 `x`。
3. 不显示图例和轴标签，刻度标签字号为 20。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig03.png')" alt="图 3" loading="lazy" />
    <figcaption>图 3</figcaption>
  </figure>
</div>

<AnswerBlock
  title="实验题 2 · 参考答案"
  description="这一题需要先 library(ggplot2)。"
  :code="code1102"
  :images="['/figures/10-ggplot2/unnamed-chunk-8-1.png']"
/>

::: tip ggplot2 的「图层语法」
ggplot2 的代码永远是这个结构：

```r
ggplot(数据, aes(映射)) +    # 第 1 层：画布 + 数据 + 坐标映射
  geom_xxx(...) +             # 第 2 层：画什么形状
  scale_xxx(...) +            # 第 3 层：怎么变换刻度/颜色
  labs(...) +                 # 第 4 层：标题标签
  theme(...)                  # 第 5 层：外观主题
```

**`aes()` 里的参数叫「映射」，`aes()` 外面的叫「固定值」**：

- `geom_rect(aes(fill = x))` —— 颜色**跟着数据 x 变**，会自动生成图例。
- `geom_point(color = 'blue3')` —— 所有点都是同一颜色，没有图例。

`geom_rect` 需要四个角坐标：`xmin` / `xmax` / `ymin` / `ymax`，
所以 `aes()` 里要写全。`element_blank()` 表示「把这一项去掉」，
`legend.position = 'none'` 则是把整个图例藏起来。
:::

## 实验题 3：geom_text、标度变换、主题元素

打开 **test1104.R**，完成下面任务。

1. 用数据框 `x` 中变量 `hp` 和 `disp` 作为 x 轴和 y 轴的数据，绘制散点图，点大小设置为 3，颜色为 `"blue3"`。
2. 用 `geom_text` 函数添加文本，参数 `label` 为数据框中的 `cyl` 变量，颜色映射为 `cyl`，字号为 6，文本框沿 x 轴方向移动 8 个单位。
3. 用标度变换函数 `scale_color_gradientn` 设置变换颜色集为 `rainbow(20)`，设置图例标题为“气缸数”。
4. 图例标题和轴标签字号设置为 18，图例关键字标签和刻度标签字号设置为 16。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig04.png')" alt="图 4" loading="lazy" />
    <figcaption>图 4</figcaption>
  </figure>
</div>

<AnswerBlock title="实验题 3 · 参考答案" :code="code1104"
  :images="['/figures/10-ggplot2/unnamed-chunk-9-1.png']"
/>

::: tip geom_text 的 nudge_x 与标度变换
**`nudge_x` / `nudge_y`** 是「把文字整体挪一点」的参数——散点图上的文字如果不挪开，
就会正好压在点上面看不清。

**标度变换函数（scale_*）** 负责把数据映射到视觉属性上，常见的几类：

| 函数 | 管什么 | 例子 |
| --- | --- | --- |
| `scale_color_gradientn()` | 连续颜色（自定义色带）| `colors = rainbow(20)` |
| `scale_color_gradient()` | 连续颜色（两端渐变）| `low` / `high` |
| `scale_fill_continuous()` | 连续**填充**色 | `low = 'green', high = 'blue'` |
| `scale_fill_brewer()` | 预设调色板 | `palette = 'Set1'` |
| `scale_x_continuous()` | x 轴刻度 | `limits` / `breaks` |

`name = "气缸数"` 就是在标度函数里直接改图例标题（也可以统一写在 `labs()` 里）。
:::

## 实验题 4：geom_raster 和 geom_contour 展示三维数据

打开 **test1105.R**，完成下面操作。

1. 用数据框 `faithfuld` 中的 `eruptions` 和 `waiting` 映射为 x 和 y，`density` 映射为 z，用 `geom_contour` 绘制等高线，颜色为红色。
2. 用 `geom_raster` 绘制二维密度，填充颜色映射为 `density`。
3. 轴标签和图例标签字号为 16，图例关键字标签和刻度标签字号为 14，面板背景颜色为 `"lightblue"`，清除主网格线与次网格线。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig05.png')" alt="图 5" loading="lazy" />
    <figcaption>图 5</figcaption>
  </figure>
</div>

<AnswerBlock title="实验题 4 · 参考答案" :code="code1105"
  :images="['/figures/10-ggplot2/unnamed-chunk-10-1.png']"
/>

::: tip 把「第三个维度」画到平面上
三维数据（x, y, z）在平面上有两种常用表达：

| 几何对象 | 用颜色/线条表达 z |
| --- | --- |
| `geom_raster()` | 用**填充色**表示密度高低，得到热力图 |
| `geom_contour()` | 把 z 相同的点连成**等高线** |

两者叠加效果最好：热力图看整体趋势，等高线看具体数值分布。

`faithfuld` 是 R 自带的数据集，本身就是「黄石公园老忠实喷泉」
的喷发时长 × 等待时长二维核密度估计结果，天生带 `x`/`y`/`density` 三列，
用 `z = density` 映射正合适。

**网格线怎么去掉**：`panel.grid.major`（主网格）和 `panel.grid.minor`（次网格）
都设成 `element_blank()`。
:::

## 实验题 5：颜色标度和统计变量

打开 **test1106.R**，完成下面操作。

1. 绘制数据框 `diamonds` 中变量 `price` 的直方图，并把直方图的填充颜色为统计变换的中间变换 `density`（用法为 `..density..`），分箱的宽度为 1000。
2. 用连续标度变换重置映射颜色，其中参数 `low` 和 `high` 设置为 `blue` 和 `green`。
3. 轴标签和图像标题字号为 20，图例关键字标签和刻度标签字号设置为 18。
4. 图标题字号为 22，标题与图间距为 12，且标题居中对齐。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig06.png')" alt="图 6" loading="lazy" />
    <figcaption>图 6</figcaption>
  </figure>
</div>

<AnswerBlock title="实验题 5 · 参考答案" :code="code1106"
  :images="['/figures/10-ggplot2/unnamed-chunk-11-1.png']"
/>

::: tip ..density.. 是什么：用「统计变换的结果」做映射
直方图在画之前，ggplot2 内部会先做一次**统计变换**：把原始数据分箱、算出每箱的
count、density 等。这些结果可以用 `..名字..` 的形式引用：

```r
geom_histogram(aes(fill = ..density..), binwidth = 1000)
```

意思是「柱子的填充色**不按原始 price 上色**，而按算出来的密度值上色」。

⚠️ **新版本提示**：ggplot2 3.4 之后 `..density..` 被标记为过时，
新写法是 `after_stat(density)`。两者等价，旧写法目前仍能用，只是会提示一条警告。
答案里用的是旧写法，保持原样。

`binwidth = 1000` 表示每个箱子宽 1000 美元——**箱宽比箱数更好控制**，
因为它不随数据范围变化。
:::

## 实验题 6：geom_point、属性映射、主题设置、标度变换

1. 用 `geom_point` 绘制 `iris` 的 `Sepal.Length`、`Sepal.Width` 作为绘图数据，绘制散点图，其中 `Sepal.Length` 为 x 轴，`Sepal.Width` 为 y 轴。
2. 点大小为 5，透明度为 0.7，点形状为 21。
3. 图标题字号为 20，与图之间的空白为 12，粗体字。
4. 轴标签字号为 18，粗体，颜色为棕色，与图之间的空白为 10。
5. 刻度标签字号为 16，图例关键字标签字号为 16。
6. 图例标题字号为 18，棕色，粗体，与图例之间的空白为 10。
7. 图例关键字高度为 1cm，宽度为 0.9cm。注：用 `unit(1, 'cm')` 的形式设置。
8. 图例背景色为 `grey90`，边框颜色为红色。

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig07.png')" alt="图 7" loading="lazy" />
    <figcaption>图 7</figcaption>
  </figure>
</div>

<AnswerBlock title="实验题 6 · 参考答案" :code="code1107"
  :images="['/figures/10-ggplot2/unnamed-chunk-12-1.png']"
/>

::: tip theme 的命名规律——记住两条就够了
`theme()` 里几十个参数其实遵循固定命名法：

**第一条：`元素.部件`**

| 名字 | 管什么 |
| --- | --- |
| `plot.title` | 图的**主标题** |
| `axis.title.x` / `.y` | x / y 轴的**标签** |
| `axis.text` | 坐标轴**刻度文字** |
| `legend.title` | **图例标题** |
| `legend.text` | **图例项文字** |
| `legend.key` | 图例里那个**小色块/小符号** |
| `legend.background` | 图例的**外框背景** |

**第二条：文字用 `element_text()`，方块用 `element_rect()`，线条用 `element_line()`，去掉用 `element_blank()`**

所以：

- 标题 → `plot.title = element_text(size = 20, face = 'bold', margin = margin(b = 12), hjust = 0.5)`
  （`hjust = 0.5` 就是**水平居中**）
- 图例背景 → `legend.background = element_rect(fill = 'grey90', color = 'red')`
- `margin(b = 12)` 表示「底部留 12 的空」，b/t/l/r 分别对应下/上/左/右。

**形状 21 的特殊之处**：只有 `pch = 21~25` 这几个形状能同时设
**边框色（`color`）和填充色（`fill`）**，所以想给不同品种填不同颜色，
必须用 `shape = 21` 配 `aes(fill = Species)`。
:::

## 本讲小结

| 主题 | 关键写法 |
| --- | --- |
| 多图布局 | `par(mfrow = c(行, 列))`、`layout(mat, widths, heights)` |
| 基础结构 | `ggplot(数据, aes(映射)) + geom_*() + scale_*() + labs() + theme()` |
| 几何对象 | `geom_point` / `geom_rect` / `geom_text` / `geom_raster` / `geom_contour` / `geom_histogram` |
| 统计变换 | `..density..`（旧）/ `after_stat(density)`（新）、`binwidth` |
| 标度变换 | `scale_color_gradientn`、`scale_fill_continuous`、`scale_fill_brewer`、`scale_x_continuous` |
| 主题元素 | `element_text`（文字）、`element_rect`（方块）、`element_blank`（去掉）|
| 常用主题项 | `plot.title`、`axis.title`、`axis.text`、`legend.title`、`legend.text`、`panel.grid`、`panel.background` |

::: info 关于本页的题目与答案
题目来自 `资料/原题/第十一周原题`，答案来自 `资料/答案/第十一周答案`（仅修正过其中的错别字）。
原题正文里的「图 1~图 7」已经按题号贴回各题下方（取自 `资料/汇总/第十一周——ggplot2包_files/figure-html/`，与 原题 docx 里的截图是同一批图，但分辨率更高）；
最后一题的完整代码原题已直接在文档中给出。
:::

::: tip 想弄懂背后的统计学原理
这一讲讲**图层语法怎么画**；统计图的选用原则与常见误导，见《卫生统计学》对应的归纳。

详见 **[《卫生统计学》第 19 章　常用统计图表](/Health-statistics/19-tables-and-charts)**。
:::
