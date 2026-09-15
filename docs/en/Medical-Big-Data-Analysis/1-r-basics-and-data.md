---
layout: doc
title: '1. Using R and Getting Data'
---

<script setup>
import { withBase } from 'vitepress'

const code0101 = `x <- rep(c(3, 2, 1), times = c(3, 4, 5))
A <-matrix(1:16,4)
B <-matrix(1:16,4,byrow = T) 
C = A+B
D = A *B
E = A%*%B
E = A[-3,]%*%B[,-3]`

const code0102 = `A = matrix(c(1,2,3,4,5,6,7,8,10),ncol = 3,byrow = T)
b = matrix(c(1,1,1),ncol = 1)
solve(A)%*%b`

const out0102 = `[,1]
[1,] -1.000000e+00
[2,]  1.000000e+00
[3,]  4.440892e-16`

const code0103 = `info = data.frame('序号' = 1:10,
                  '性别' = c(rep('F',5),rep('M',5)),
                  '年龄' = c(14,16,15,17,15,14,16,14,15,16),
                  '身高cm' = c(156,158,161,156,153,162,157,159,163,165),
                  '体重kg' = c(42.3,45.0,48.5,51.5,44.6,48.8,46.7,49.9,50.2,53.7)
                  )

print(info)

write.table(info,file = 'info.text')
read.table('info.text')

write.csv(info,file = 'info.csv')
read.csv('info.csv')`

const out0103 = `序号 性别 年龄 身高cm 体重kg
1     1    F   14    156   42.3
2     2    F   16    158   45.0
3     3    F   15    161   48.5
4     4    F   17    156   51.5
5     5    F   15    153   44.6
6     6    M   14    162   48.8
7     7    M   16    157   46.7
8     8    M   14    159   49.9
9     9    M   15    163   50.2
10   10    M   16    165   53.7
   序号 性别 年龄 身高cm 体重kg
1     1    F   14    156   42.3
2     2    F   16    158   45.0
3     3    F   15    161   48.5
4     4    F   17    156   51.5
5     5    F   15    153   44.6
6     6    M   14    162   48.8
7     7    M   16    157   46.7
8     8    M   14    159   49.9
9     9    M   15    163   50.2
10   10    M   16    165   53.7
    X 序号 性别 年龄 身高cm 体重kg
1   1    1    F   14    156   42.3
2   2    2    F   16    158   45.0
3   3    3    F   15    161   48.5
4   4    4    F   17    156   51.5
5   5    5    F   15    153   44.6
6   6    6    M   14    162   48.8
7   7    7    M   16    157   46.7
8   8    8    M   14    159   49.9
9   9    9    M   15    163   50.2
10 10   10    M   16    165   53.7`

const code0104 = `info = read.csv('wh.csv',header = T, fileEncoding = 'UTF-8')  # (1) read in the data
print(info)  # (2) show the data

# (3) Scatterplot of weight against height
plot(info$体重~info$身高,main = '体重对身高散点图')

# Scatterplot of weight against height, separately by sex
coplot(info$体重~info$身高|info$性别)

# (4) Scatterplot of weight against height, separately by age group
coplot(info$体重~info$身高|info$年龄)

# (5) Scatterplot of weight against height, separately by sex and age group
coplot(info$体重~info$身高|info$性别+info$年龄)`

const out0104 = `X 序号 性别 年龄 身高 体重
1   1    1    F   18  166   54
2   2    2    F   18  165   58
3   3    3    F   19  154   50
4   4    4    F   18  160   47
5   5    5    F   20  162   46
6   6    6    F   19  153   48
7   7    7    F   21  156   50
8   8    8    F   20  152   49
9   9    9    F   21  170   57
10 10   10    F   20  156   52
11 11   11    M   18  168   61
12 12   12    M   18  166   55
13 13   13    M   19  172   63
14 14   14    M   18  178   68
15 15   15    M   20  169   59
16 16   16    M   19  180   65
17 17   17    M   21  177   59
18 18   18    M   20  168   56
19 19   19    M   21  182   69
20 20   20    M   20  170   61`

const code0105 = `data(airquality)
aq = na.omit(airquality)
boxplot(Temp~Month,
        data = aq,
        width = c(1:5),
        col = rainbow(5,s = 0.5,alpha = 0.7),
        range =0.8,
        staplelwd = 0.8,
        cex.main = 1.5)`
</script>

# Week 1. Using R and Getting Data

::: info Translation status
Translated from the [Chinese original](/Medical-Big-Data-Analysis/1-r-basics-and-data). Numbers, formulas, and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Week 1 lab for *Medical Big Data Analysis and Decision Making*.
> The exercises are compiled from the course slides; the reference answers and the results shown here were
> actually run on this machine.

## What this lecture covers

- **Exercise 1**
- **Exercise 2**
- **Exercise 3**
- **Exercise 4**
- **Exercise 5** (boxplot)
- **Exercise 6** (the original course materials contain no script for it)

::: tip No extra packages are needed for this lecture

Week 1 uses only the functions that come with R (`rep`, `matrix`, `solve`, `read.csv`, `plot`, `boxplot`, and so on),
so `install.packages()` is not needed. **Packages are only needed from Week 2 on**, and each lecture lists them.
:::

## Exercise 1


- Create the R script file test0101.R, and when you have finished the tasks below, save that script file in
  the folder e:/test01.
  - Use the function rep() to build a vector x made up of 3 threes, 4 twos, and 5 ones
  - Build two square matrices from 1, 2, … 16, with matrix A filled in by column and matrix B filled in by row, and compute:
    - (1) C = A + B;
    - (2) D = A .* B;
    - (3) E = AB;
    - (4) Remove row 3 of A and column 3 of B, and compute the matrix E above again


<AnswerBlock title="Exercise 1 · Reference answer"
  :code="code0101" />

## Exercise 2


- Create the R script file test0102.R, and when you have finished the tasks below, save that script file in
  the folder e:/test01.
  - The function solve() has two uses: solve(A,b) can be used to solve the linear system Ax=b, and solve(A) can be used to find the inverse of a matrix. Let
  - Write code to solve the system Ax=b by two different methods.


<img :src="withBase('/figures/mbd/1/q-第04页-image1.png')" alt="Figure from page 4" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 2 · Reference answer"
  :code="code0102"
  :output="out0102" />

## Exercise 3


- Create the R script file test0103.R, and when you have finished the tasks below, save that script file in
  the folder e:/test01.
- The heights and weights of 10 students are given in the table below.


<img :src="withBase('/figures/mbd/1/q-第05页-image2.png')" alt="Figure from page 5" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


- Using the table above, do the following:
  - Create a data frame named info
  - Write that data frame into a plain-text file, and read the data in that file back with read.table()
  - Write that data frame out with write.csv() into a file that Excel can open, and test whether that works.


<AnswerBlock title="Exercise 3 · Reference answer"
  :code="code0103"
  :output="out0103" />

> *Translator's note: the column names of the data frame（序号、性别、年龄、身高cm、体重kg）stay in Chinese. `wh.csv` and the reference scripts in the repository use those Chinese names, and in Exercise 4 the `coplot()` panels take their labels straight from them, so translating the names would make the code disagree with the data files and the figures shown on this page (the plot title in Exercise 4 is kept for the same reason).*

## Exercise 4


- Open the R script file test0104.R, and when you have finished the operations below, save that script file in
  the folder e:/test01.
- At one school, four indices were measured on 20 students — sex, age, height (cm), and weight (kg) — and the data are stored in wh.csv.
  - 1) Draw a scatterplot of weight against height;
  - 2) Draw a scatterplot of weight against height for each sex;
  - 3) Draw a scatterplot of weight against height for each age group;
  - 4) Draw a scatterplot of weight against height for each combination of sex and age group.


<AnswerBlock title="Exercise 4 · Reference answer"
  :code="code0104"
  :output="out0104"
  :images="['/figures/mbd/1/plot-01.png', '/figures/mbd/1/plot-02.png', '/figures/mbd/1/plot-03.png', '/figures/mbd/1/plot-04.png']" />

## Exercise 5 (boxplot)


- Create the R script file test0105.R, and when you have finished the tasks below with the boxplot function,
  save that script file in the folder e:/test01.
  - 1) airquality is the 1973 New York air quality data; please do not draw the boxplot of temperature (that is, Temp) for each month by a functional relationship, and the missing values in the data frame must be removed
    - The widths of the boxes are 1, 2, 3, 4, 5
    - Use the rainbow function to produce 5 colors for the fill, with the other arguments of rainbow set as s = 0.5 and alpha = 0.7
    - range is set to 0.8
    - The width of the staple line is set to 0.8
    - The font size of the plot title is set to 1.5


<AnswerBlock title="Exercise 5 · Reference answer"
  :code="code0105"
  :images="['/figures/mbd/1/plot-04.png', '/figures/mbd/1/plot-05.png']" />

## Exercise 6


- Download the colon cancer clinical data from the TCGA database and organize it into tabular form (see the TCGA download documentation)
- Download the PIC pediatric intensive care database (optional)
- Download the MIMIC-IV intensive care database (optional)


::: info
The original course materials do not include a script for this exercise.
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
