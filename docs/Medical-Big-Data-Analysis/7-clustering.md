---
layout: doc
title: 7-聚类
---

<script setup>
import { withBase } from 'vitepress'

const code0701 = `set.seed(1)
x = matrix(rnorm(28),nrow = 4)
print(x)

man_dist <- dist(x, method = "manhattan", diag = TRUE, upper = TRUE)
print(man_dist)

mink_dist <- dist(x, method = "minkowski", p = 3, diag = TRUE, upper = FALSE)
print(mink_dist)`

const out0701 = `[,1]       [,2]       [,3]        [,4]        [,5]        [,6]        [,7]
[1,] -0.6264538  0.3295078  0.5757814 -0.62124058 -0.01619026  0.91897737  0.61982575
[2,]  0.1836433 -0.8204684 -0.3053884 -2.21469989  0.94383621  0.78213630 -0.05612874
[3,] -0.8356286  0.4874291  1.5117812  1.12493092  0.82122120  0.07456498 -0.15579551
[4,]  1.5952808  0.7383247  0.3898432 -0.04493361  0.59390132 -1.98935170 -1.47075238
          1         2         3         4
1  0.000000  6.207524  5.506712  9.001795
2  6.207524  0.000000  8.413823 10.371475
3  5.506712  8.413823  0.000000  8.579801
4  9.001795 10.371475  8.579801  0.000000
         1        2        3        4
1 0.000000                           
2 1.998232 0.000000                  
3 1.984322 3.606294 0.000000         
4 3.562066 3.456987 3.053533 0.000000`

const code0702 = `iris <- iris[1:5,]
iris_cluster = iris[,1:4]
plot(iris)
iris.kmeans = kmeans(iris_cluster,3)
iris.kmeans
table(iris$Species,iris.kmeans$cluster,dnn = c('真实值','预测值'))
plot(iris_cluster$Sepal.Length,
     iris_cluster$Sepal.Width,
     col=iris.kmeans$cluster,
     pch= as.integer(iris.kmeans$cluster))
points(iris.kmeans$centers[,1],
       iris.kmeans$centers[,2],
       pch="X",
       cex=1,
       col=4)
plot(iris_cluster$Petal.Length,
     iris_cluster$Petal.Width,
     col=iris.kmeans$cluster,
     pch= as.integer(iris.kmeans$cluster))
points(iris.kmeans$centers[,3],
       iris.kmeans$centers[,4],
       pch="X",
       cex=1,
       col=4)`

const out0702 = `K-means clustering with 3 clusters of sizes 1, 2, 2

Cluster means:
  Sepal.Length Sepal.Width Petal.Length Petal.Width
1         4.90        3.00          1.4         0.2
2         5.05        3.55          1.4         0.2
3         4.65        3.15          1.4         0.2

Clustering vector:
1 2 3 4 5 
2 1 3 3 2 

Within cluster sum of squares by cluster:
[1] 0.00 0.01 0.03
 (between_SS / total_SS =  91.3 %)

Available components:

[1] "cluster"      "centers"      "totss"        "withinss"     "tot.withinss" "betweenss"   
[7] "size"         "iter"         "ifault"      
            预测值
真实值    1 2 3
  setosa     1 2 2
  versicolor 0 0 0
  virginica  0 0 0`

const code0703 = `library(cluster)
iris_cluster <- iris[, -5]
iris_cluster.pam = pam(iris_cluster,3)
print(iris_cluster.pam$clustering)
iris$cluster <- iris_cluster.pam$clustering
table(iris$Species,iris_cluster.pam$clustering,dnn = c('真实值','预测值'))`

const out0703 = `1 2 3 4 5 
1 2 3 3 1 
            预测值
真实值    1 2 3
  setosa     2 1 2
  versicolor 0 0 0
  virginica  0 0 0`

const code0704 = `
if (!requireNamespace("fpc", quietly = TRUE)) {
  install.packages("fpc")
}
library(fpc)


data_points <- matrix(c(2, 10, 2, 5, 8, 4, 5, 8, 7, 5, 6, 4, 1, 2, 4, 9), ncol = 2, byrow = TRUE)
colnames(data_points) <- c("x", "y")


set.seed(1) 
kmeans_result <- kmeans(data_points, centers = 3)

pam_result <- pam(data_points, k = 3)

plot(data_points, col = kmeans_result$cluster, pch = 19, main = "K-means Clustering")
points(kmeans_result$centers, col = 2:4, pch = 4, cex = 2)


plot(data_points, col = pam_result$clustering, pch = 19, main = "K-medoids Clustering")
points(pam_result$medoids, col = 2:4, pch = 4, cex = 2)`

const code0705 = `idx = sample(1:150,40)
iris_hcluster = iris[idx,-5]
d = dist(iris_hcluster)
hc = hclust(d,method = 'ave')
plot(hc,hang = -1)
rect.hclust(hc,k = 3)
install.packages("factoextra")
library(factoextra)

fviz_dend(hc, k = 3, 
          cex = 0.7, 
          k_colors = c("red", "green", "blue"), 
          color_labels_by_k = TRUE,
          rect = TRUE, 
          rect_lty = 5, 
          rect_border = "black", 
          lower_rect = -0.5 
)`

const code0706 = `library(factoextra)
library(ggplot2)
data("multishapes")
df <- multishapes[, 1:2]
df0 <- multishapes
df0$shape <- as.factor(df0$shape)
ggplot(df0, aes(x=x, y=y, colour=shape)) + geom_point()

set.seed(123)
km_result <- kmeans(df, 5, nstart = 25)
fviz_cluster(km_result, df, geom = "point", ellipse = FALSE, show.clust.cent = FALSE, palette = "jco", ggtheme = theme_classic())

library("fpc")
set.seed(123)
db <- fpc::dbscan(df, eps = 0.15, MinPts = 5)
fviz_cluster(db, data = df, stand = FALSE, ellipse = FALSE, show.clust.cent = FALSE, geom = "point", palette = "jco", ggtheme = theme_classic())`

const code0707 = `library(factoextra)
library(fpc)

data <- read.csv("treatment.csv", sep = ",", header = TRUE, na.strings = "?")
head(data, 5)
data <- data[, -1]
data_scale <- scale(data)
fviz_nbclust(data_scale, kmeans, method = "silhouette")
set.seed(111)

result_kmeans <- kmeans(data_scale, 2)
stats_kmean <- cluster.stats(dist(data_scale), result_kmeans$cluster)
sli_nut_kmeans <- stats_kmean$avg.silwidth
print(sli_nut_kmeans)

library(cluster)
result_pam <- pam(data_scale, 2)
stats_pam <- cluster.stats(dist(data_scale), result_pam$cluster)
sli_nut_pam <- stats_pam$avg.silwidth
print(sli_nut_pam)`

const out0707 = `YearMonth OutpatientNumbers DischargeNumbers BedOccupany BedTurmoverFrequency
1   2018.02              4.20              302       76.00                0.850
2   2020.01              4.10              306       78.81                0.870
3   2019.02              4.21              321       79.66                0.810
4   2018.10              4.43              321       80.00                0.822
5   2018.04              4.18              377       82.00                0.880
  AverageHospitalizayionDays. CureImprovementRate Mortality DiagnosyicAccordanceRate
1                       25.70               94.31      2.69                    97.94
2                       25.80               94.46      2.62                    95.00
3                       26.00               94.77      2.78                    97.01
4                       25.40               94.00      2.81                    97.02
5                       26.89               93.86      2.73                    98.10
  SuccessfulRescueRate
1                89.40
2                87.10
3                81.97
4                79.07
5                86.23
[1] 0.4199762
[1] 0.4270449`

const code0708 = `library(factoextra)
library(fpc)
library(ggplot2)

iris_sub <- iris[, 3:4]
iris_sub_scaled <- scale(iris_sub)
fviz_nbclust(iris_sub_scaled, kmeans, method = "silhouette")

km_result <- kmeans(iris_sub_scaled, 2, nstart = 25)
stats_km <- cluster.stats(dist(iris_sub_scaled), km_result$cluster)
sli_nut_km <- stats_km$avg.silwidth
print(sli_nut_km)

fviz_cluster(km_result, iris_sub_scaled, geom = "point", ellipse = FALSE, show.clust.cent = FALSE, palette = "jco", ggtheme = theme_classic())

dist_mat <- dist(iris_sub_scaled)
hc <- hclust(dist_mat, method = "ward.D2")
fviz_dend(hc, k = 2, rect = TRUE, rect_border = "black", cex = 0.7, k_colors = c("red", "green"))`
</script>


# 第 7 周　聚类

> 《医学大数据分析与决策》第 7 周实验。
> 题目整理自课程课件，参考答案与运行结果都是在本机实际跑出来的。

## 本讲内容

- **实验题 1**　距离度量的使用
- **实验题 2**　k-means(1)
- **实验题 3**　k-中心点
- **实验题 4**　综合应用
- **实验题 5**　层次聚类
- **实验题 6**　基于密度DBSCAN聚类
- **实验题 7**　聚类评估
- **实验题 8**　层次聚类应用

::: warning 动手之前：先把这一讲要用的 R 包装好

这一讲的脚本会用到下面这些包。**没装的话脚本会在 `library()` 那一步直接报错。**

`cluster`、`factoextra`、`fpc`、`ggplot2`

装法（在 RStudio 的控制台里跑一次就行）：

```r
install.packages(c("cluster", "factoextra", "fpc", "ggplot2"))
```

> 如果手头已经有下载好的包文件，也可以指定本地路径装：
> `install.packages("路径/包名.zip", repos = NULL, type = "win.binary")`
:::

## 实验题 1　距离度量的使用


- 创建R脚本文件test0701.R，完成下面任务后把该脚本文件保存在e:/test07文件夹下。
  - 使用不同距离度量计算数据点之间的距离(参照本题代码完成）
    - (1)随机生成28个服从正态分布的随机数，该数组成4行7列的数组，计算4个数据点之间的距离。
    - (2)计算4个数据点之间的曼哈顿距离矩阵（包含对角线数值，包含上三角位置的数值）。
    - (3)计算4个数据点之间的闵可夫斯基距离矩阵，设置指数p=3（包含对角线数值，不包含上三角位置的数值）。


<img :src="withBase('/figures/mbd/7/q-第04页-image1.png')" alt="第 4 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 1 · 参考答案"
  :code="code0701"
  :output="out0701" />

## 实验题 2　k-means(1)


- 创建R脚本文件test0702.R，完成下面任务后把该脚本文件保存在e:/test07文件夹下。
  - 对鸢尾花数据集进行k-均值聚类(参照本题代码完成）
    - (1)对鸢尾花数据集(去掉分类字段Species)，用kmeans函数聚类，设置k=3 。


<img :src="withBase('/figures/mbd/7/q-第06页-image2.png')" alt="第 6 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/7/q-第07页-image3.png')" alt="第 7 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 2 · 参考答案"
  :code="code0702"
  :output="out0702"
  :images="['/figures/mbd/7/plot-01.png', '/figures/mbd/7/plot-02.png', '/figures/mbd/7/plot-03.png']" />

## 实验题 3　k-中心点


- 创建R脚本文件test0703.R，完成下面任务后把该脚本文件保存在e:/test07文件夹下。
  - 对鸢尾花数据集进行k-中心点聚类(参照本题代码完成）
    - (1)安装并载入包cluster，对鸢尾花数据集(去掉分类字段Species)，用pam函数聚类，设置k=3 。


<img :src="withBase('/figures/mbd/7/q-第09页-image4.png')" alt="第 9 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 3 · 参考答案"
  description="这一题需要 `cluster`。"
  :code="code0703"
  :output="out0703" />

## 实验题 4　综合应用


- 创建R脚本文件test0704.R，完成下面任务后把该脚本文件保存在e:/test07文件夹下。
  - 分别用kmeans与k-中心点算法将8个数据点聚类为3个簇并绘出数据分布图及用“X”绘制簇中心点。数据点分别为：A1(2,10), A2(2,5), A3(8,4), A4(5,8), A5(7,5), A6(6,4), A7(1,2), A8(4,9)。


<AnswerBlock title="实验题 4 · 参考答案"
  description="这一题需要 `fpc`。"
  :code="code0704"
  :images="['/figures/mbd/7/plot-03.png', '/figures/mbd/7/plot-04.png', '/figures/mbd/7/plot-05.png']" />

## 实验题 5　层次聚类


- 创建R脚本文件test0705.R，完成下面任务后把该脚本文件保存在e:/test07文件夹下。
  - 对iris数据集（删除分类属性列）进行层次聚类，为了清晰地显示聚类结果，我们随机挑选iris数据集中的40条记录进行聚类。


<img :src="withBase('/figures/mbd/7/q-第12页-image5.png')" alt="第 12 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/7/q-第13页-image6.png')" alt="第 13 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 5 · 参考答案"
  description="这一题需要 `factoextra`。"
  :code="code0705" />

::: details 这个脚本会中途报错（原资料如此，未做改动）

```
NA/NaN/Inf in foreign function call (arg 10)
```

:::

## 实验题 6　基于密度DBSCAN聚类


- 创建R脚本文件test0706.R，完成下面任务后把该脚本文件保存在e:/test07文件夹下。
  - 对multishapes数据集（删除分类属性列）分别用k-means方法和dbscan方法进行聚类，比较其聚类效果且说明原因。


<img :src="withBase('/figures/mbd/7/q-第15页-image7.png')" alt="第 15 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/7/q-第16页-image8.png')" alt="第 16 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 6 · 参考答案"
  description="这一题需要 `factoextra`、`fpc`、`ggplot2`。"
  :code="code0706"
  :images="['/figures/mbd/7/plot-05.png', '/figures/mbd/7/plot-06.png', '/figures/mbd/7/plot-07.png', '/figures/mbd/7/plot-08.png']" />

## 实验题 7　聚类评估


- 创建R脚本文件test0707.R，完成下面任务后把该脚本文件保存在e:/test07文件夹下。
  - 对某医院三年治疗情况进行聚类分析，并评估聚类质量。其中医院治疗情况数据集treatment包含36条记录，10个属性列，即：年月、门诊人次（单位万）、出院人数、病床利用率、病床周转次数、平均住院天数、治疗好转率、病死率、诊断符合率、抢救成功率。


<img :src="withBase('/figures/mbd/7/q-第18页-image9.png')" alt="第 18 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/7/q-第19页-image10.png')" alt="第 19 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 7 · 参考答案"
  description="这一题需要 `cluster`、`factoextra`、`fpc`。"
  :code="code0707"
  :output="out0707"
  :images="['/figures/mbd/7/plot-08.png', '/figures/mbd/7/plot-09.png']" />

## 实验题 8　层次聚类应用


- 创建R脚本文件test0708.R，完成下面任务后把该脚本文件保存在e:/test07文件夹下。
  - 取出数据集iris的第3，4列，即属性Petal.Length与 Petal.Width，用k-means对其进行聚类（根据平均轮廓系数确定簇数），计算聚类对象的相关统计信息，并输出平均轮廓系数，并用fviz_cluster函数输出聚类图。
  - 用层次聚类算法对数据集iris的第3，4列进行聚类，并输出层次聚类图。


<AnswerBlock title="实验题 8 · 参考答案"
  description="这一题需要 `factoextra`、`fpc`、`ggplot2`。"
  :code="code0708" />

::: details 这个脚本会中途报错（原资料如此，未做改动）

```
NA/NaN/Inf in foreign function call (arg 1)
```

:::

## 运行环境

本页的「运行结果」是把这一周的全部脚本**在同一个 R 会话里按顺序执行**得到的
（还原在 RStudio 里一道一道做的过程），因此后面的脚本可以用到前面定义的变量。

::: tip 自己做的时候
先照着题目自己写一遍，写不出来再看参考答案 —— 答案默认是收起来的。
跑之前记得把工作目录设到数据文件所在的那个文件夹。
:::

::: tip 想弄懂背后的统计学原理
这一周的聚类结果**几乎全靠图来看**（树状图、轮廓图、散点图）；制图原则与常见的图表误导，见《卫生统计学》对应的归纳。

详见 **[《卫生统计学》第 19 章　常用统计图表](/Health-statistics/19-tables-and-charts)**。
:::
