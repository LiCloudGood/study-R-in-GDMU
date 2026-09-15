---
layout: doc
title: '7. Clustering'
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
table(iris$Species,iris.kmeans$cluster,dnn = c('Actual','Predicted'))
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
            Predicted
Actual       1 2 3
  setosa     1 2 2
  versicolor 0 0 0
  virginica  0 0 0`

const code0703 = `library(cluster)
iris_cluster <- iris[, -5]
iris_cluster.pam = pam(iris_cluster,3)
print(iris_cluster.pam$clustering)
iris$cluster <- iris_cluster.pam$clustering
table(iris$Species,iris_cluster.pam$clustering,dnn = c('Actual','Predicted'))`

const out0703 = `1 2 3 4 5 
1 2 3 3 1 
            Predicted
Actual       1 2 3
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

# Week 7. Clustering

::: info Translation status
Translated from the [Chinese original](/Medical-Big-Data-Analysis/7-clustering). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Week 7 lab for *Medical Big Data Analysis and Decision Making*.
> The exercises are compiled from the course slides; the reference answers and the results shown here were
> actually run on this machine.

## What this lecture covers

- **Exercise 1** using distance metrics
- **Exercise 2** k-means (1)
- **Exercise 3** k-medoids
- **Exercise 4** a combined application
- **Exercise 5** hierarchical clustering
- **Exercise 6** density-based clustering with DBSCAN
- **Exercise 7** cluster evaluation
- **Exercise 8** applying hierarchical clustering

::: warning Before you start: install the R packages this lecture needs

The scripts in this lecture use the packages below. **If they are not installed, the script will fail with an
error right at the `library()` step.**

`cluster`, `factoextra`, `fpc`, `ggplot2`

How to install (run this once in the RStudio console):

```r
install.packages(c("cluster", "factoextra", "fpc", "ggplot2"))
```

> If you already have the downloaded package files at hand, you can also install from a local path:
> `install.packages("path/package.zip", repos = NULL, type = "win.binary")`
:::

## Exercise 1: Using distance metrics


- Create the R script file test0701.R, and when you have finished the tasks below, save that script file in
  the folder e:/test07.
  - Use different distance metrics to compute the distances between data points (follow the code for this
    exercise)
    - (1) Randomly generate 28 random numbers from a normal distribution; these numbers form an array of 4 rows
      and 7 columns. Compute the distances between the 4 data points.
    - (2) Compute the Manhattan distance matrix between the 4 data points (including the diagonal values and
      the values in the upper triangle).
    - (3) Compute the Minkowski distance matrix between the 4 data points, with the exponent set to p=3
      (including the diagonal values and excluding the values in the upper triangle).


<img :src="withBase('/figures/mbd/7/q-第04页-image1.png')" alt="Figure from page 4" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 1 · Reference answer"
  :code="code0701"
  :output="out0701" />

## Exercise 2: k-means (1)


- Create the R script file test0702.R, and when you have finished the tasks below, save that script file in
  the folder e:/test07.
  - Carry out k-means clustering on the iris data set (follow the code for this exercise)
    - (1) On the iris data set (with the Species classification field removed), cluster with the `kmeans`
      function, with k=3.


<img :src="withBase('/figures/mbd/7/q-第06页-image2.png')" alt="Figure from page 6" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/7/q-第07页-image3.png')" alt="Figure from page 7" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 2 · Reference answer"
  :code="code0702"
  :output="out0702"
  :images="['/figures/mbd/7/plot-01.png', '/figures/mbd/7/plot-02.png', '/figures/mbd/7/plot-03.png']" />

## Exercise 3: k-medoids


- Create the R script file test0703.R, and when you have finished the tasks below, save that script file in
  the folder e:/test07.
  - Carry out k-medoids clustering on the iris data set (follow the code for this exercise)
    - (1) Install and load the `cluster` package, and on the iris data set (with the Species classification
      field removed), cluster with the `pam` function, with k=3.


<img :src="withBase('/figures/mbd/7/q-第09页-image4.png')" alt="Figure from page 9" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 3 · Reference answer"
  description="This exercise needs `cluster`."
  :code="code0703"
  :output="out0703" />

## Exercise 4: A combined application


- Create the R script file test0704.R, and when you have finished the tasks below, save that script file in
  the folder e:/test07.
  - Use the kmeans and the k-medoids algorithms to cluster 8 data points into 3 clusters, and draw a plot of
    the data distribution with the cluster centers marked with “X”. The data points are: A1(2,10), A2(2,5),
    A3(8,4), A4(5,8), A5(7,5), A6(6,4), A7(1,2), A8(4,9).


<AnswerBlock title="Exercise 4 · Reference answer"
  description="This exercise needs `fpc`."
  :code="code0704"
  :images="['/figures/mbd/7/plot-03.png', '/figures/mbd/7/plot-04.png', '/figures/mbd/7/plot-05.png']" />

## Exercise 5: Hierarchical clustering


- Create the R script file test0705.R, and when you have finished the tasks below, save that script file in
  the folder e:/test07.
  - Carry out hierarchical clustering on the iris data set (with the classification attribute column
    removed); to show the clustering result clearly, we randomly pick 40 records from the iris data set and
    cluster those.


<img :src="withBase('/figures/mbd/7/q-第12页-image5.png')" alt="Figure from page 12" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/7/q-第13页-image6.png')" alt="Figure from page 13" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 5 · Reference answer"
  description="This exercise needs `factoextra`."
  :code="code0705" />

::: details This script errors partway through (the source material is like this, left unchanged)

```
NA/NaN/Inf in foreign function call (arg 10)
```

:::

## Exercise 6: Density-based clustering with DBSCAN


- Create the R script file test0706.R, and when you have finished the tasks below, save that script file in
  the folder e:/test07.
  - On the `multishapes` data set (with the classification attribute column removed), cluster with the k-means
    method and with the dbscan method respectively, compare how well the two cluster, and explain why.


<img :src="withBase('/figures/mbd/7/q-第15页-image7.png')" alt="Figure from page 15" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/7/q-第16页-image8.png')" alt="Figure from page 16" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 6 · Reference answer"
  description="This exercise needs `factoextra`, `fpc`, `ggplot2`."
  :code="code0706"
  :images="['/figures/mbd/7/plot-05.png', '/figures/mbd/7/plot-06.png', '/figures/mbd/7/plot-07.png', '/figures/mbd/7/plot-08.png']" />

## Exercise 7: Cluster evaluation


- Create the R script file test0707.R, and when you have finished the tasks below, save that script file in
  the folder e:/test07.
  - Carry out a cluster analysis of the treatment situation of a hospital over three years, and evaluate the
    quality of the clustering. The hospital treatment data set `treatment` contains 36 records and 10
    attribute columns, namely: year and month, outpatient visits (in ten thousands), number of discharges,
    bed occupancy rate, bed turnover frequency, average length of stay, cure and improvement rate, mortality
    rate, diagnostic accordance rate, and successful rescue rate.


<img :src="withBase('/figures/mbd/7/q-第18页-image9.png')" alt="Figure from page 18" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/7/q-第19页-image10.png')" alt="Figure from page 19" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 7 · Reference answer"
  description="This exercise needs `cluster`, `factoextra`, `fpc`."
  :code="code0707"
  :output="out0707"
  :images="['/figures/mbd/7/plot-08.png', '/figures/mbd/7/plot-09.png']" />

## Exercise 8: Applying hierarchical clustering


- Create the R script file test0708.R, and when you have finished the tasks below, save that script file in
  the folder e:/test07.
  - Take columns 3 and 4 of the iris data set, that is the attributes Petal.Length and Petal.Width, cluster
    them with k-means (determine the number of clusters from the average silhouette width), compute the
    relevant statistics of the clustered objects, print the average silhouette width, and plot the clusters
    with the `fviz_cluster` function.
  - Cluster columns 3 and 4 of the iris data set with a hierarchical clustering algorithm, and plot the
    hierarchical clustering dendrogram.


<AnswerBlock title="Exercise 8 · Reference answer"
  description="This exercise needs `factoextra`, `fpc`, `ggplot2`."
  :code="code0708" />

::: details This script errors partway through (the source material is like this, left unchanged)

```
NA/NaN/Inf in foreign function call (arg 1)
```

:::

## Running environment

The “results” on this page were obtained by running **all of this week's scripts in order in the same R
session** (reproducing the process of working through them one by one in RStudio), so a later script can use
variables defined by an earlier one.

::: tip When you do it yourself
Write it yourself from the exercise first, and only look at the reference answer when you cannot work it out —
the answers are collapsed by default.
Before you run anything, remember to set the working directory to the folder that holds the data files.
:::

::: tip Want the statistics behind it?
This week's clustering results **are read almost entirely off the plots** (the dendrogram, the silhouette
plot, the scatter plot); for the principles of graphing and the common ways charts mislead, see the
corresponding summary in *Health Statistics*.

See **[Chapter 19 of *Health Statistics*, Statistical Tables and Charts](/Health-statistics/19-tables-and-charts)** *(Chinese)*.
:::
