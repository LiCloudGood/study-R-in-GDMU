---
layout: doc
title: 9-高级绘图
---

<script setup>
const code0901 = `install.packages('ISwR')
library(ISwR)
head(nickel.expand)
hist(nickel.expand$age1st, 
     breaks = 20,  
     col = "blue",  
     border = "red",  
     density = 20,  
     angle = -60,  
     xlim = c(10, 50),  
     ylim = c(0, 600),  
     main = "镍暴露年龄直方图",  
     xlab = "年龄",
     ylab = "人数"
)

set.seed(10000)
x <- rnorm(1000,3,2)

x_range <- range(x)
min <- x_range[1]
max <- x_range[2]
breaks <- seq(from = min, to = max,length.out = 11)
freq_table <- table(cut(x,breaks = breaks,include.lowest = T))
lbs <- as.character(freq_table)
hist(x,
     breaks = breaks,
     col = colors()[51:60],
     labels = lbs,
     cex.main = 2,
     cex.axis = 1.5,
     cex.lab = 1.5,
     main = "正态随机数的直方图",
     xlab = "分位数",
     ylab = "频数")`

const code0902 = `head(USPersonalExpenditure)

barplot(USPersonalExpenditure,
        col = 2:6,
        width  = 1:5,
        cex.main = 2,
        cex.lab = 1.5,
        cex.axis = 1.5,
        cex.names = 1.5,
        main = '每年消费数据对比',
        xlab = '年份',
        ylab = '金额/十亿')

USPersonalExpenditure_t <- t(USPersonalExpenditure)
barplot(USPersonalExpenditure_t,
        beside = T,
        col = 2:6,
        space = c(0.2,3),
        cex.main = 2,
        cex.lab = 1.5,
        cex.axis = 1.2,
        cex.names = 1.5,
        log = 'y',
        axisnames = T,
        main = '五项消费数据对比',
        xlab = '----五年数据对比----')`

const code0903 = `data("VADeaths")
VADeaths_t <- t(VADeaths)
barplot(VADeaths_t,
        border = 2:5,
        density = 20,
        angle = c(25,50,75,100),
        col = colors()[44:47],
        legend = colnames(VADeaths),
        cex.main = 2,
        cex.lab = 1.2,
        cex.axis = 1.2,
        cex.names = 1.2,
        main = '弗吉尼亚死亡数据',
        xlab = '年龄',
        ylab = '人数/千人',
        beside = T
        )


data("UCBAdmissions")
df <- as.data.frame(UCBAdmissions)
df.m <- subset(df, Gender == "Male")
barplot(Freq ~ Admit + Dept, 
        data = df.m, 
        col = c("blue", "green"),  
        legend = c("录取人数", "未录人数"),  
        args.legend = list(x = "topright", cex = 1.2), 
        ylab = "人数", 
        xlab = "学院代码",
        main = "伯克利分析招生情况",  
        cex.main = 1.5,  
        cex.lab = 1.2,  
        cex.axis = 1.2,  
        ylim = c(0, 600),
        beside = T
)`

const code0904 = `n = 100
x <- rpois(n,5)

pie(x,
    col = rainbow(n),
    border = NA,
    labels = rep('',n),
    main = '彩虹饼图（n=100）'
    )


data("WorldPhones")
data_1961 <- WorldPhones['1961',]
x<- data_1961[1:5]
other <- sum(data_1961['Africa'],data_1961['Mid.Amer'])
names(other) <- 'other'
x <- c(x,other)
proportions <- round(x / sum(x) * 100, 2)
labels <- paste(names(x), "(", proportions, "%)", sep = "")
pie(x,
    col = rainbow(length(x), s = 0.4, alpha = 0.6),
    border = 'black',
    main = '1961年各大洲电话使用情况',
    cex.main = 1.5,
    labels = labels)`

const code0905 = `data("UCBAdmissions")
df <- as.data.frame(UCBAdmissions)
df_admitted <- subset(df, Admit == "Admitted")
admitted_summary <- aggregate(Freq ~ Dept, data = df_admitted, sum)
x <- admitted_summary$Freq
pie(x, 
    col = 11:16,  
    density = 50,  
    border = "red",  
    labels = paste(admitted_summary$Dept, "(", round(x / sum(x) * 100, 2), "%)", sep = ""),  
    main = "各院系招生数占总人数的百分比",  
    cex.main = 1.5  
)`

const code0906 = `data("airquality")
x <- na.omit(airquality)
x <- subset(x, Month %in% c(5, 6, 7, 8, 9))
colors <- rainbow(5, s = 0.5, alpha = 0.7)
boxplot(Temp ~ Month, 
        data = x, 
        col = colors,  
        width = c(1, 2, 3, 4, 5),  
        range = 0.8,  
        staplewex = 0.8,  
        main = "1973年纽约气温情况（5-9月）", 
        cex.main = 1.5,   
        xlab = "月份", 
        ylab = "气温",
        names =  c("5月", "6月", "7月", "8月", "9月")
)

airquality_clean <- na.omit(airquality)
boxplot(Wind ~ Month, 
        data = airquality_clean, 
        notch = T,
        width = rep(0.5, 5),
        horizontal = T,
        col = 11:15,
        border = 'red',
        main = '1973年纽约风力情况(5-9月）',
        cex.main = 1.5,
        xlab = '风力',
        ylab = "月份",
        names =  c("5月", "6月", "7月", "8月", "9月")
        )`

const code0907 = `install.packages('ISwR')
library(ISwR)
data("melanom")
melanom$ulc <- factor(melanom$ulc, levels = c(1, 2), labels = c("yes", "no"))
melanom$group <- interaction(melanom$status, melanom$ulc, sep = "--")
desired_order <- c("1--no", "1--yes", "2--no", "2--yes", "3--no", "3--yes")
melanom$group <- ordered(melanom$group, levels = desired_order)
boxplot(thick ~ group, 
        data = melanom, 
        col = rainbow(6,v=0.8,alpha = 0.6),
        main = "黑色素瘤厚度的组间对比", 
        ylab = "厚度", 
        xlab = "生存状况-溃疡",
        ylim = c(0, 1500),  
        las = 2,
        outcol = "red",
        border = 'red',
        medcol = 'red'
)`

const code0908 = `data("airmiles")
plot(airmiles, 
     type = "s",
     lwd = 2,
     col = "#0000FF",  
     main = "美国1937-1960年客运营收变化情况",
     cex.main = 1.2, 
     xlab = "年份", 
     ylab = "飞行距离"
)


data('trees')
plot(trees$Girth, trees$Volume, 
     pch = 21,
     col = 1:31, 
     bg = "white", 
     cex = 2, 
     lwd = 2, 
     main = "黑樱桃的体积和直径的关系",
     cex.main = 1.8,  
     xlab = "直径", 
     ylab = "体积", 
     cex.lab = 1.5, 
     cex.axis = 1.2
)`

const code0909 = `x <- seq(-5, 5, by = 0.05)
plot(x, dt(x, df = 1), 
     type = "l",
     lwd = 2, 
     col = "red",
     xlab = "", 
     ylab = "",
     xaxt = "n",
     yaxt = "n",
     main = ""
)

par(new = TRUE)  
plot(x, dt(x, df = 30), 
     type = "l",  
     lwd = 2,  
     col = "blue", 
     xlab = "", 
     ylab = "", 
     xaxt = "n",  
     yaxt = "n", 
     main = "" 
)

par(new = TRUE) 
plot(x, dnorm(x), 
     type = "l", 
     lwd = 2,  
     col = "black", 
     xlab = "x", 
     ylab = "y=f(x)",
     main = "Density Curves", 
     cex.main = 1.8, 
     cex.lab = 1.5,
     cex.axis = 1.2 
)`
</script>

# 高级绘图

::: info 老师的建议
完成实验题 1、2、4、6、8，课后完成实验题 3、5、7、9。
:::

## 实验目的

- 掌握绘图颜色的使用方法。
- 掌握直方图 `hist` 函数。
- 掌握条形图 `barplot` 函数。
- 掌握饼图 `pie` 函数。
- 掌握箱线图 `boxplot` 函数。
- 掌握散点图 `plot` 函数。

::: tip 本讲的「运行」按钮真的会出图
R 在网页里运行时用的是画布设备，所以 `hist` / `barplot` / `pie` / `boxplot` / `plot`
画出来的图会**直接显示在「输出结果」下面**。
:::

## 实验题 1：hist 函数直方图

创建脚本文件 **test0901.R**，使用 `hist` 函数绘制直方图。

1. 用 `ISwR` 中数据集 `nickel.expand` 中的变量 `age1st` 绘制直方图，绘制的直方图满足下面要求：
   - 绘制 20 个柱状条；
   - 边框颜色为红色；
   - 填充颜色为蓝色；
   - 填充线为每英寸 20 条，角度为负 60 度；
   - 图形标题为“镍暴露年龄直方图”；
   - x 轴的标题为“年龄”；
   - y 轴的标题为“人数”；
   - x 轴的显示区间为 [10, 50]；
   - y 轴的显示区间为 [0, 600]。
2. 按照下面的要求绘制另一个直方图：
   - 先用 `set.seed(10000)` 产生随机数种子，然后用 `rnorm` 产生 1000 个随机数 `x`，且 `rnorm` 的均值是 3，标准差 2，即 `set.seed(10000)`、`x <- rnorm(1000, 3, 2)`；
   - 把 `x` 的值域进行 10 等分（即先求最大数和最小数，再 10 等分，也可以用 `range` 函数求最大数和最小数）；
   - 然后统计 10 个区间的频数（提示：可以用 `cut` 和 `table` 函数，也可以用 `cut` 和 `tapply` 实现），把得到的频数向量转换成字符串向量，赋值给变量 `lbs`；
   - 用 `hist` 绘制 `x` 的直方图，每个柱状条标明相应的频数，即设置 `labels = lbs`，填充颜色为 `colors()` 中的第 51 到 60 号颜色，即 `colors()[51:60]`；
   - 在 `hist` 函数中使用 `cex.main=2`，`cex.axis=1.5`，`cex.lab=1.5` 分别设置图标题、坐标轴刻度、坐标轴标签的字体大小。

<AnswerBlock
  title="实验题 1 · 参考答案"
  description="这一题需要 ISwR 包，首次运行会在线安装，可能要等一会儿。"
  :packages="['ISwR']"
  :code="code0901"
/>

::: tip hist 常用参数一览
| 参数 | 作用 |
| --- | --- |
| `breaks` | 分箱数量（`20`）或分点向量 |
| `col` / `border` | 填充色 / 边框色 |
| `density` / `angle` | 阴影线密度（每英寸条数）/ 倾斜角度 |
| `xlim` / `ylim` | 坐标轴显示范围 |
| `labels` | 在每个柱子上标注文字（这里标频数）|

**`density` 和 `col` 会打架**：一旦设了 `density`（画斜线），`col` 就变成斜线的颜色，
而不是整个柱子的填充色。题目要「蓝底红线」，所以 `col = "blue"` 实际是给斜线上色。

第 2 小题的 `lbs` 是关键：先用 `cut` 把数据分箱，再用 `table` 数出每箱的个数，
最后 `as.character()` 转成字符串才能传给 `labels`。
:::

## 实验题 2：barplot 函数绘制柱状图

创建脚本文件 **test0902.R**，用 `barplot` 函数绘制数据集 `USPersonalExpenditure` 的柱状图。

1. 绘制柱状图，部分参数按下面的要求进行设置：
   - 颜色为 `2:6`；
   - 宽度为 `1:5`；
   - 图标题字体大小为 `cex.main = 2`；
   - 坐标轴标签字体大小为 `cex.lab = 1.5`；
   - 数值轴坐标刻度字体大小为 `cex.axis = 1.5`；
   - 分类轴坐标刻度字体大小为 `cex.names = 1.5`。
2. 绘制另一个柱状图，部分图形参数按下面的要求进行设置：
   - 颜色为 `2:6`；
   - 柱条间的间隔为 0.2，组与组之间的间隔为 3；
   - 图标题字体大小为 2；
   - 子标题字体大小为 1.5；
   - 数值轴坐标刻度字体大小为 1.2；
   - 分类轴坐标刻度字体大小为 1.2；
   - y 轴使用对数坐标。

<AnswerBlock title="实验题 2 · 参考答案" :code="code0902" />

::: tip beside 与 space：分组柱状图的两个开关
| 参数 | 含义 |
| --- | --- |
| `beside = TRUE` | 各组柱子**并排**（否则是堆叠）|
| `space = c(组内间隔, 组间间隔)` | 只在 `beside = TRUE` 时生效，长度 2 的向量 |
| `log = "y"` | y 轴取对数 |
| `cex.names` | 分类轴（x 轴）刻度文字的**专属**字号 |

`USPersonalExpenditure` 原本是「行=消费项、列=年份」，
直接画会把消费项当柱子；所以答案里先 `t()` 转置，让**年份**变成柱子、**消费项**变成分组。
:::

## 实验题 3：barplot 函数的应用

创建脚本文件 **test0903.R**，按下面的要求绘制图形。

1. 按原题样式绘制柱状图，数据来自 `VADeaths`（弗吉尼亚死亡率数据），部分图形参数的设置规则如下：
   - 柱条边框颜色为 `2:5`；
   - 每英寸填充 20 条斜线，斜线的倾角分别为 25，50，75，100 度；
   - 填充线条的颜色为 `colors()` 返回值中第 44 到 47 号颜色，即 `colors()[44:47]`；
   - 图例的名称为 `VADeaths` 的变量名；
   - 图标题字体大小为 2；
   - 数值轴坐标刻度字体大小为 1.2；
   - 分类轴坐标刻度字体大小为 1.2；
   - 坐标轴标签字体为 1.2。
2. 按原题样式绘制柱状图，数据来源于 `UCBAdmissions`（伯克利分校招生数）：
   - 先将数据转换数据框；
   - 把 `Gender` 为 `Male` 的记录提取出来，存储到变量 `df.m`；
   - 绘制数据框 `df.m` 中 `Freq` 数据，要求以变量 `Dept` 和 `Admit` 分组，每个柱状条代表录取与未录取的人数（提示：分组用公式，即 `Freq ~ Admit + Dept`）；
   - 把数值轴的范围设置为 0~600；
   - 图例文本和轴标签文本按原题设置；
   - 填充颜色为蓝色和绿色。

<AnswerBlock title="实验题 3 · 参考答案" :code="code0903" />

::: tip 公式式写法：Freq ~ Admit + Dept
`barplot(Freq ~ Admit + Dept, data = df.m)` 里的 `~` 是 **R 的公式语法**，
意思是「以 `Admit` 和 `Dept` 为分组变量，画 `Freq`」。

这和 `boxplot(Temp ~ Month, data = x)` 是同一套写法——
凡是「**某个数值按某几个分组变量展开**」的场景，都可以用公式表达。

`UCBAdmissions` 原始是个三维列联表，`as.data.frame()` 之后变成
`Admit` / `Gender` / `Dept` / `Freq` 四列的长表，才方便筛选和画图。
:::

## 实验题 4：pie 函数绘制饼图

打开脚本文件 **test0904.R**，按下面要求绘制饼图。

1. 绘制彩虹饼图：
   - 绘制向量 `x` 的饼图；
   - 用 `rainbow(n)` 设置饼图的颜色；
   - 边框和切片标签都置空，即边框设置为 `NA`，切片标签设置为空字符串；
   - 标题的字体大小为默认值。
2. 用 `WorldPhones` 数据（各大洲电话安装使用数据）绘制饼图：
   - 提取 `WorldPhones` 中 1961 年前 5 个数据（即除非洲和中北洲外的数据），赋值给变量 `x`；
   - 把 1961 年非洲（`Africa`）和中北美洲（`Mid.Amer`）数量合并（求和），使之成为 `x` 的新的一项，且名称为 `other`；
   - 用 `x` 绘制饼图，用 `rainbow` 为每个切片设置不同的颜色（即获取 6 个颜色），其中 `rainbow` 中的参数 `s` 为 0.4，`alpha` 为 0.6；
   - 边框设置黑色，标题字体大小为 1.5。

<AnswerBlock title="实验题 4 · 参考答案" :code="code0904" />

::: tip 饼图的两个实用技巧
**1. 切片太多就关掉标签**

`rep('', n)` 把 n 个标签全设成空字符串，再配 `border = NA`，
就得到一张干净的彩虹色块图（100 个切片时标签根本放不下）。

**2. 百分比标签自己拼**

```r
proportions <- round(x / sum(x) * 100, 2)
labels <- paste(names(x), "(", proportions, "%)", sep = "")
```

`pie()` 本身不会自动算百分比，得自己算好后用 `paste` 拼成 `"Asia(31.2%)"` 这种字符串。

顺带一提：`rainbow(n, s =, alpha =)` 里的 `s` 是**饱和度**，`alpha` 是**透明度**
（0 全透明、1 不透明），调小 `s` 能让配色柔和一些。
:::

## 实验题 5：pie 函数的应用

创建脚本文件 **test0905.R**，按下面要求绘制饼图。

用 `UCBAdmissions`（伯克利分校招生数据）绘制饼图，即绘制各个院系招生人数占全校招生总人数百分比的饼图。

- 首先需要把数据转换成数据框，然后筛选 `Admit` 为 `Admitted` 的记录，最后按院系进行分类汇总（提示：使用 `aggregate` 函数或者 `tapply` 函数）；
- 填充线条为每英寸 50 条；
- 颜色使用调色板中第 11 号到 16 号颜色（即 `col = 11:16`）；
- 边框为红色；
- 标题字体大小为 1.5。

<AnswerBlock title="实验题 5 · 参考答案" :code="code0905" />

::: tip aggregate 的公式写法
```r
aggregate(Freq ~ Dept, data = df_admitted, sum)
```

这是第 4 讲学过的 `aggregate`，这里用公式写法：
「按 `Dept` 分组，对 `Freq` 求和」，返回一个**数据框**——
正好可以取出一列直接喂给 `pie()`。

`density = 50` 是阴影线的密度（每英寸 50 条），
和实验题 1 里的用法完全一样。
:::

## 实验题 6：boxplot 函数绘制箱线图

创建脚本文件 **test0906.R**，按要求绘制箱线图。

1. `airquality` 是 1973 年纽约空气质量数据，请用 `boxplot` 绘制当 `Month` 为 5, 6, 7, 8, 9 时 `Temp`（温度）变量的箱线图：
   - 先删除数据框中的缺失值后，赋值给变量 `x`，用 `x` 作为源数据绘制箱线图，**不要使用函数关系作为数据**；
   - 箱子的宽度分别为 1, 2, 3, 4, 5；
   - 用 `rainbow` 函数产生 5 个颜色填充，其中 `rainbow` 的参数 `s=0.5`、`alpha = 0.7`；
   - `range` 设置为 0.8；
   - `staple` 线的宽度设置为 0.8；
   - 图标题的字体大小设置为 1.5。
2. 用 `boxplot` 绘制每个月风力（即 `Wind`）的箱线图，**要求使用函数关系作为数据源**：
   - 先删除数据框 `airquality` 中的缺失值；
   - 显示刻槽；
   - 箱子宽度缩小一半，即缩放倍数为 0.5；
   - 填充颜色为 `11:15`；
   - 边框颜色为红色；
   - 图形标题的字体大小为 1.5。

<AnswerBlock title="实验题 6 · 参考答案" :code="code0906" />

::: tip 两种数据源的写法差别
**向量写法**（第 1 小题要求）：先自己把数据切好，再传给 `boxplot`

```r
x <- subset(na.omit(airquality), Month %in% 5:9)
boxplot(Temp ~ Month, data = x, ...)
```

**公式写法**（第 2 小题要求）：直接写「谁按谁分组」

```r
boxplot(Wind ~ Month, data = airquality_clean, ...)
```

题目特意要求两种各用一次，就是为了让你体会这个区别。

其他参数：

| 参数 | 作用 |
| --- | --- |
| `range` | 须（whisker）延伸的倍数，默认 1.5；调小会让更多点被判为离群 |
| `staplewex` | 须末端那条短横线的宽度 |
| `notch = TRUE` | 显示中位数的**刻槽**，两组的槽不重叠就说明差异显著 |
| `horizontal = TRUE` | 把箱子横过来放 |
| `outcol` | 离群点的颜色 |

**`na.omit()` 千万别忘**：`airquality` 里有缺失值，不删掉画图会报错。
:::

## 实验题 7：boxplot 函数的应用

创建脚本文件 **test0907.R**，按要求绘制箱线图。

用 `ISwR` 包中的数据集 `melanom`（恶性黑色素瘤的生存数据）绘制箱线图：

- 先把溃疡（`ulc`）列中的 1 替换成 `"yes"`，2 替换成 `"no"`；
- 绘制不同组的黑色素瘤厚度（`thick` 变量）的箱线图，分组变量为 `status` 和 `ulc`，其中 `status` 表示生存状态（1 代表死于黑色素瘤，2 代表存活，3 代表死于其他原因），`ulc` 表示溃疡（`yes` 代表有溃疡，`no` 代表没有溃疡）；
- 填充颜色为 `rainbow(6, v=0.8, alpha = 0.6)`；
- 需要对箱子排序（即图形中组排序）；
- 组标签的分隔符为 `"--"`（两个减号）；
- y 轴的范围为 [0, 1500]。

<AnswerBlock
  title="实验题 7 · 参考答案"
  description="这一题也需要 ISwR 包，首次运行会在线安装。"
  :packages="['ISwR']"
  :code="code0907"
/>

::: tip interaction 造「两两组合」的分组变量
想要「按 `status` 和 `ulc` 两个变量同时分组」，就要先造一个新变量：

```r
melanom$group <- interaction(melanom$status, melanom$ulc, sep = "--")
# 得到 "1--no"、"1--yes"、"2--no" ...

melanom$group <- ordered(melanom$group, levels = c(
  "1--no", "1--yes", "2--no", "2--yes", "3--no", "3--yes"))
```

`interaction()` 负责拼接，`ordered(..., levels =)` 负责**指定顺序**——
这正是第 4 讲学过的有序因子。如果不指定 `levels`，
R 会按字母序排列，图里箱子的顺序就乱了。

`las = 2` 让 x 轴标签**竖着写**，标签长的时候特别有用。
:::

## 实验题 8：plot 函数绘制散点图

创建脚本文件 **test0908.R**，按要求绘制散点图。

1. 用 `plot` 函数绘制 `airmiles` 数据（美国 1937-1960 年客运里程营收）阶梯图：
   - 点或线条类型为下梯状（即大 S）；
   - 线宽为 2（即 `lwd` 为 2）；
   - 线条颜色为 `"#0000FF"`；
   - 图形标题字体大小为 1.2。
2. 用 `trees` 数据（黑樱桃树的直径、高度和体积）绘制散点图，其中 x 轴为直径（`Girth`），y 轴为体积（`Volume`）：
   - 点边框的颜色为 `1:31`；
   - 点的大小为 2（即 `cex` 为 2）；
   - 点边框宽度为 2（即 `lwd` 为 2）；
   - 标题字体大小为 1.8；
   - 轴标签字体大小为 1.5；
   - 轴刻度字体大小为 1.2。

<AnswerBlock title="实验题 8 · 参考答案" :code="code0908" />

::: tip type 决定「画成什么形状」
| `type` | 效果 |
| --- | --- |
| `"p"` | 只画点（默认）|
| `"l"` | 只画线 |
| `"b"` | 点和线都要，但线不穿过点 |
| `"o"` | 点和线都要，线穿过点 |
| `"s"` | **阶梯图**（先横后竖）|
| `"h"` | 从 x 轴竖直向上的线（像条形图）|

`airmiles` 是时间序列，用 `type = "s"` 画成阶梯图最能体现「数值在一段时间里保持不变、然后跳变」的特点。

**`pch` 是点的形状编号**（0~25）：
`pch = 21` 是**实心圆**（可以分别设 `col` 边框色和 `bg` 填充色），
其他编号只能设一个 `col`。`col = 1:31` 会让 31 个点循环使用 31 种颜色。
:::

## 实验题 9：plot 函数的应用 —— 叠加密度曲线

创建脚本文件 **test0909.R**，按下面要求绘制密度曲线。

- 产生 -5 到 5 且公差为 0.05 的序列 `x`，以它作为 x 轴绘制密度图形；
- 用 `plot` 函数绘制参数为 1 的 t 分布的密度曲线。参数 `type` 设置为 `"l"`，线宽（`lwd`）为 2，颜色为红色，x 和 y 轴的标签为空字符串，x 和 y 轴的刻度为空（即设置 `yaxt="n"`，`xaxt="n"`）；
- 叠加绘制下一个图形，即 `par(new=T)`；
- 用 `plot` 函数绘制参数为 30 的 t 分布的密度曲线。参数 `type` 为 `"l"`，线宽为 2，颜色为蓝色，x 和 y 轴的标签为空字符串，x 和 y 轴的刻度为空；
- 再叠加绘制下一个图形；
- 用 `plot` 函数绘制**标准正态分布**的密度曲线。参数 `type` 为 `"l"`，线宽为 2，颜色为黑色，x 和 y 轴的标签分别为 `"x"` 和 `"y=f(x)"`，x 和 y 轴的刻度使用默认值，标题字体大小设置为 1.8，轴标签字体大小为 1.5，轴刻度字体大小为 1.2。

<AnswerBlock
  title="实验题 9 · 参考答案"
  :code="code0909"
/>

::: tip par(new = TRUE) 是叠加绘图的关键
`plot()` 每次调用默认会**清空画布重画**。想要在已有图上叠加，就要先告诉 R
「别清屏，我要在原来的图上继续画」：

```r
par(new = TRUE)
```

三次 `plot` 叠加起来，就能把 t(1)、t(30) 和标准正态三条密度曲线画在同一张图上。

**为什么要 `xaxt = "n"`、`yaxt = "n"`？**
因为前两次绘图只是为了叠线，如果让它们也画坐标轴，三套坐标轴会重叠在一起糊成一团。
所以前两次关掉坐标轴和标签，只在**最后一次**统一画出来。

从图上能直观看到：自由度越小，t 分布的尾巴越厚；
自由度到 30 时已经和标准正态几乎重合了——这正是 t 分布「大样本趋近正态」的体现。
:::

## 本讲小结

| 图形 | 函数 | 关键参数 |
| --- | --- | --- |
| 直方图 | `hist(x, breaks, ...)` | `breaks`、`density`、`angle`、`labels` |
| 条形图 | `barplot(x, ...)` | `beside`、`space`、`legend`、`log` |
| 饼图 | `pie(x, ...)` | `labels`、`col`、`density`、`border` |
| 箱线图 | `boxplot(y ~ g, data =)` | `range`、`notch`、`horizontal`、`staplewex` |
| 散点 / 曲线 | `plot(x, y, ...)` | `type`、`pch`、`cex`、`lwd`、`col` |
| 叠加绘图 | `par(new = TRUE)` | 配合 `xaxt` / `yaxt` 关掉重复坐标轴 |

**通用字体参数**（几乎每个绘图函数都认）：

| 参数 | 管什么 |
| --- | --- |
| `main` / `cex.main` | 主标题 / 它的字号 |
| `xlab` / `ylab` / `cex.lab` | 轴标签 / 它的字号 |
| `cex.axis` | 坐标轴**刻度**的字号 |
| `cex.names` | 分类轴（`barplot`）刻度文字的字号 |

**颜色三件套**：`rainbow(n, s =, alpha =)`、`colors()[i]`、`数字`（`2:6` 表示调色板第 2~6 号色）。

::: info 关于本页的题目与答案
题目来自 `原题/第九周原题`，答案来自 `答案/第九周答案`（仅修正过其中的错别字）。
原题中的「图 1~图 15」是 Word 里的截图，本页以文字要求为准。
:::
