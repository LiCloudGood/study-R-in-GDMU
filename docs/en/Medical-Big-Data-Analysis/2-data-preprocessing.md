---
layout: doc
title: '2. Data Preprocessing'
---

<script setup>
import { withBase } from 'vitepress'

const code0201 = `x = cars
mean(x$speed)
median(x$speed)
which.max(table(x))
max(cars$speed)-min(cars$speed)
var(cars$speed)
sd(cars$speed)
quantile(cars$speed)`

const out0201 = `[1] 15.4
[1] 15
[1] 255
[1] 21
[1] 27.95918
[1] 5.287644
  0%  25%  50%  75% 100%
   4   12   15   19   25`

const code0202 = `set.seed(1234)
options(digits = 4)
x = rnorm(100,75,9)
mean(x)
var(x)
sd(x)
max(x)-min(x)
quantile(x,0.75)-quantile(x,0.25)
which.max(table(x))
quantile(x)
hist(x,probability = T)
boxplot(x,main = 'Boxplot',horizontal = T)`

const out0202 = `[1] 73.59
[1] 81.72
[1] 9.04
[1] 44.05
 75%
12.3
53.8887206763359
               1
   0%   25%   50%   75%  100%
53.89 66.94 71.54 79.24 97.94`

const code0203 = `install.packages('corrgram')
library(corrgram)
x = stackloss
lbs = c('Air flow','Water temperature','Acid concentration','Ammonia loss')
corrgram(x,
         labels = lbs,
         cex.labels = 2,
         font.labels = 3,
         main = 'Brownlee plant ammonia-to-nitric-acid scatterplot',
         cex.mian = 2,
         gap = 0.2,
         order = T,
         upper.panel = panel.conf,
         lower.panel = panel.pie)`

const out0203 = `package 'corrgram' successfully unpacked and MD5 sums checked

The downloaded binary packages are in
	<local temporary directory>`

const code0204 = `patients = data.frame(
  ID = c('001','002','003','004','005'),
  name = c("Tukey", "Venables", "Tierney", "Ripley", "McNeil"),
  nationality = c("US", "Australia", "US", "UK", "Australia"),
  ill = c("yes", rep("no", 4)),
  phone=c("15210329344","15210329332","15210323144","18510329344","13492874632")
)
print(patients)
patients<-subset(patients,select=-ID)# See the help page, and think of two ways to delete the corresponding columns
print(patients)
patients<-subset(patients,select=-c(name,phone))
print(patients)

patients<-subset(patients,select=c(name,phone))
print(patients)`

const out0204 = `ID     name nationality ill       phone
1 001    Tukey          US yes 15210329344
2 002 Venables   Australia  no 15210329332
3 003  Tierney          US  no 15210323144
4 004   Ripley          UK  no 18510329344
5 005   McNeil   Australia  no 13492874632
      name nationality ill       phone
1    Tukey          US yes 15210329344
2 Venables   Australia  no 15210329332
3  Tierney          US  no 15210323144
4   Ripley          UK  no 18510329344
5   McNeil   Australia  no 13492874632
  nationality ill
1          US yes
2   Australia  no
3          US  no
4          UK  no
5   Australia  no`

const code0205 = `install.packages('infotheo')
library(infotheo)
data = c(1,2,3,4,6,8,10,15,20,25,30,40)
dis_ew = discretize(data,'equalwidth',4)
print(dis_ew)
data_dis_ex = t(rbind(data,dis_ew$X))
dim(dis_ew)
colnames(data_dis_ex) = c('data','index')
print(data_dis_ex)

discretize(data,'equalfreq',4)`

const out0205 = `package 'infotheo' successfully unpacked and MD5 sums checked

The downloaded binary packages are in
	<local temporary directory>
   X
1  1
2  1
3  1
4  1
5  1
6  1
7  1
8  2
9  2
10 3
11 3
12 4
[1] 12  1
      data index
 [1,]    1     1
 [2,]    2     1
 [3,]    3     1
 [4,]    4     1
 [5,]    6     1
 [6,]    8     1
 [7,]   10     1
 [8,]   15     2
 [9,]   20     2
[10,]   25     3
[11,]   30     3
[12,]   40     4
   X
1  1
2  1
3  1
4  2
5  2
6  2
7  3
8  3
9  3
10 4
11 4
12 4`

const code0206 = `set.seed(0)
data1 <- data.frame(rnorm(10))
set.seed(1)
data2 <- data.frame(rnorm(10,100,0.2))
set.seed(2)
data3 <- data.frame(rnorm(10,30,0.5))
data <- cbind(data1,data2,data3)
b1 <- (data[, 1] - min(data[, 1])) / (max(data[, 1]) - min(data[, 1]))
b2 <- (data[, 2] - min(data[, 2])) / (max(data[, 2]) - min(data[, 2]))
b3 <- (data[, 3] - min(data[, 3])) / (max(data[, 3]) - min(data[, 3]))
data_scatter <- cbind(b1, b2, b3)
names(data_scatter)=c('X1','X2','X3')
View(data_scatter)`

const code0207 = `set.seed(0)
data1<-data.frame(rnorm(10))
set.seed(1)
data2<-data.frame(rnorm(10,100,0.2))
set.seed(2)
data3<-data.frame(rnorm(10,30,0.5))
data<-cbind(data1,data2,data3)
b1 <- (data[, 1] - min(data[, 1])) / (max(data[, 1]) - min(data[, 1]))
b2 <- (data[, 2] - min(data[, 2])) / (max(data[, 2]) - min(data[, 2]))
b3 <- (data[, 3] - min(data[, 3])) / (max(data[, 3]) - min(data[, 3]))
data_scatter <- cbind(b1, b2, b3)
names(data_scatter)=c('X1','X2','X3')
View(data_scatter)

names(data)=c('b1','b2','b3')
scale(data,center=T,scale=T)
i<- ceiling(log10(apply(abs(data),2,max)))
data_dot<- t(t(data)/ 10 ^ i)
View(data_dot)`

const out0207 = `b1      b2       b3
 [1,]  0.75002 -0.9719 -1.12495
 [2,] -0.56844  0.0659 -0.02670
 [3,]  0.80548 -1.2399  1.39768
 [4,]  0.75788  1.8743 -1.36197
 [5,]  0.04623  0.2528 -0.29584
 [6,] -1.57539 -1.2205 -0.07993
 [7,] -1.06816  0.4551  0.50437
 [8,] -0.54229  0.7765 -0.45772
 [9,] -0.30256  0.5683  1.80035
[10,]  1.69723 -0.5606 -0.35527
attr(,"scaled:center")
      b1       b2       b3
  0.3589 100.0264  30.1056
attr(,"scaled:scale")
    b1     b2     b3
1.2053 0.1561 0.4925`
</script>

# Week 2. Data Preprocessing

::: info Translation status
Translated from the [Chinese original](/Medical-Big-Data-Analysis/2-data-preprocessing). Numbers, formulas,
and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Week 2 lab for *Medical Big Data Analysis and Decision Making*.
> The exercises are compiled from the course slides; the reference answers and the results shown here were
> actually run on this machine.

## What this lecture covers

- **Exercise 1** (common functions for measures of central tendency and dispersion)
- **Exercise 2**
- **Exercise 3** correlation analysis
- **Exercise 4** handling attribute columns
- **Exercise 5** equal-width and equal-frequency binning
- **Exercise 6** min-max normalization
- **Exercise 7** z-score normalization and decimal scaling normalization

::: warning Before you start: install the R packages this lecture needs

The scripts in this lecture use the packages below. **If they are not installed, the script will fail with an
error right at the `library()` step.**

`corrgram`, `infotheo`

How to install (run this once in the RStudio console):

```r
install.packages(c("corrgram", "infotheo"))
```

> If you already have the downloaded package files at hand, you can also install from a local path:
> `install.packages("path/package.zip", repos = NULL, type = "win.binary")`
:::

## Exercise 1: Common functions for measures of central tendency and dispersion


- Create the R script file test0201.R, and when you have finished the tasks below, save that script file in
  the folder e:/test02.
  - The data set used is the `cars` data built into R (the speed of cars and the distance taken to stop)
  - Use the central-tendency functions "mean, median, which.max(table(x))" to compute the mean, median, and
    mode of the `speed` column of the `cars` data frame.
  - Use the `max` and `min` functions to compute the range of `cars$speed`
  - Use the `var` function to compute the variance of `cars$speed`
  - Use the `sd` function to compute the standard deviation of `cars$speed`
  - Use any one of the `quantile`, `fivenum`, or `summary` functions to compute the quartiles of `cars$speed`


<AnswerBlock title="Exercise 1 · Reference answer"
  :code="code0201"
  :output="out0201" />

## Exercise 2


- Create the R script file test0202.R, and when you have finished the tasks below, save that script file in
  the folder e:/test02.
- Assume that the serum total protein content (g/L) of 100 female students at a certain school follows a
  normal distribution with mean 75 and standard deviation 3, and that the data are generated by the commands
  below
  - set.seed(1234),
  - options(digits=4)
  - rnorm(100,75,9)
- From the data generated
  - compute the sample mean, variance, standard deviation, range, interquartile range, mode, and
    five-number summary;
  - draw a histogram and a boxplot


<AnswerBlock title="Exercise 2 · Reference answer"
  :code="code0202"
  :output="out0202"
  :images="['/figures/en/mbd/2/plot-01.png', '/figures/en/mbd/2/plot-02.png']" />

## Exercise 3: Correlation analysis


- Create the R script file test0203.R, and when you have finished the tasks below, save that script file in
  the folder e:/test02.
- The data set used in this exercise is `stackloss`.
  - (1) Draw a multivariate correlation matrix plot with the default arguments, with the requirements
    - set the font size of the variable names (the text on the diagonal) to 2 times
    - set the font style of the variable names (the text on the diagonal) to italic
    - set the font size of the plot title to 2
    - set the distance between panels to 0.2
    - order the variables by the principal components method
    - set the upper-triangular panel to panel.conf and the lower-triangular panel to panel.pie
  - (2) Use the `cor` function to verify the correlation coefficients in the plot (no code is given for this
    part).

- install.packages(&quot;corrgram&quot;)
- library(corrgram)
- lbs &lt;- c(&quot;Air flow&quot;,&quot;Water temperature&quot;,&quot;Acid concentration&quot;,&quot;Ammonia loss&quot;)
- corrgram(stackloss,
- labels = lbs,
- cex.labels = 2,
- font.labels = 3,
- main = &quot;Brownlee plant ammonia-to-nitric-acid scatterplot&quot;,
- cex.main = 2,
- gap = 0.2,
- order = T,
- upper.panel = panel.conf,
- lower.panel = panel.pie
- )


<AnswerBlock title="Exercise 3 · Reference answer"
  description="This exercise needs `corrgram`."
  :code="code0203"
  :output="out0203"
  :images="['/figures/en/mbd/2/plot-02.png', '/figures/en/mbd/2/plot-03.png']" />

## Exercise 4: Handling attribute columns


- Create the R script file test0204.R, and when you have finished the tasks below, save that script file in
  the folder e:/test02.
- Delete the corresponding attribute columns
  - patients &lt;- data.frame(
  - ID=c(&quot;001&quot;,&quot;002&quot;,&quot;003&quot;,&quot;004&quot;,&quot;005&quot;),
  - name = c(&quot;Tukey&quot;, &quot;Venables&quot;, &quot;Tierney&quot;, &quot;Ripley&quot;, &quot;McNeil&quot;),
  - nationality = c(&quot;US&quot;, &quot;Australia&quot;, &quot;US&quot;, &quot;UK&quot;, &quot;Australia&quot;),
  - ill = c(&quot;yes&quot;, rep(&quot;no&quot;, 4)),
  - phone=c(&quot;15210329344&quot;,&quot;15210329332&quot;,&quot;15210323144&quot;,&quot;18510329344&quot;,&quot;13492874632&quot;)
  - )
  - print(patients)
  - patients&lt;-subset(patients,select=-ID)# See the help page, and think of two ways to delete the corresponding columns
  - print(patients)
  - patients&lt;-subset(patients,select=-c(name,phone))
  - print(patients)
- Select the corresponding attribute columns
  - patients&lt;-subset(patients,select=c(name,phone))
  - print(patients)


<AnswerBlock title="Exercise 4 · Reference answer"
  :code="code0204"
  :output="out0204" />

::: details This script errors partway through (the source material is like this, left unchanged)

```
object 'name' not found
```

:::

## Exercise 5: Equal-width and equal-frequency binning


- Create the R script file test0205.R, and when you have finished the tasks below, save that script file in
  the folder e:/test02.
- Install the infotheo package and bin the `data` values with equal width; the code is as follows:
  - install.packages(&quot;infotheo&quot;)
  - library(infotheo)
  - data=c(1,2,3,4,6,8,10,15,20,25,30,40)
  - dis_ew&lt;-discretize(data,&quot;equalwidth&quot;,4)
  - print(dis_ew)
  - data_dis_ew=t(rbind(data,dis_ew$X))
  - dim(data_dis_ew)
  - colnames(data_dis_ew)=c('data','index')
  - print(data_dis_ew)
  - Following the code above, bin the `data` values with equal frequency (change the corresponding code to
    discretize(data,“equalfreq”,4))


<AnswerBlock title="Exercise 5 · Reference answer"
  description="This exercise needs `infotheo`."
  :code="code0205"
  :output="out0205" />

## Exercise 6: Min-max normalization


- Create the R script file test0206.R, and when you have finished the tasks below, save that script file in
  the folder e:/test02.
- Randomly generate a data frame in which the first column is 10 random numbers from a normal distribution;
  the second column is 10 random numbers from a normal distribution with mean 100 and standard deviation 0.2;
  the third column is 10 random numbers from a normal distribution with mean 30 and standard deviation 0.5,
  and normalize it to the interval [0,1]. The code is as follows:

- set.seed(0)
- data1&lt;-data.frame(rnorm(10))
- set.seed(1)
- data2&lt;-data.frame(rnorm(10,100,0.2))
- set.seed(2)
- data3&lt;-data.frame(rnorm(10,30,0.5))
- data&lt;-cbind(data1,data2,data3)
- b1 &lt;- (data[, 1] - min(data[, 1])) / (max(data[, 1]) - min(data[, 1]))
- b2 &lt;- (data[, 2] - min(data[, 2])) / (max(data[, 2]) - min(data[, 2]))
- b3 &lt;- (data[, 3] - min(data[, 3])) / (max(data[, 3]) - min(data[, 3]))
- data_scatter &lt;- cbind(b1, b2, b3)
- names(data_scatter)=c('X1','X2','X3')
- View(data_scatter)


<AnswerBlock title="Exercise 6 · Reference answer"
  :code="code0206" />

## Exercise 7: Z-score normalization and decimal scaling normalization


- Create the R script file test0207.R, and when you have finished the tasks below, save that script file in
  the folder e:/test02.
- Use the `scale` function to z-score normalize the `data` data frame from the previous exercise
  - names(data)=c('b1','b2','b3')
  - scale(data,center=T,scale=T)
- Normalize the `data` data frame from the previous exercise by decimal scaling
  - i&lt;- ceiling(log10(apply(abs(data),2,max)))
  - data_dot&lt;- t(t(data)/ 10 ^ i)
  - View(data_dot)


<AnswerBlock title="Exercise 7 · Reference answer"
  :code="code0207"
  :output="out0207" />

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
This week is **the engineering use of measures of central tendency and dispersion**; for when each index
applies and what assumptions it carries, see the corresponding summary in *Health Statistics*.

See **[Chapter 4 of *Health Statistics*, Describing Quantitative Data](/en/Health-statistics/04-describing-quantitative-data)**.
:::
