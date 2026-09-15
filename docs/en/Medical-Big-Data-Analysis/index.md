---
layout: doc
title: 'Fundamentals of Medical Big Data Analysis'
---

# Medical Big Data Analysis and Decision Making

Welcome to ***Medical Big Data Analysis and Decision Making***!

This course is 8 weeks of labs on how the R language is used in medical big data analysis; it is more advanced than *Introduction to Information Technology*.

::: info Translation status
Translated from the [Chinese original](/Medical-Big-Data-Analysis/). Numbers, formulas, and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

[中文版](/Medical-Big-Data-Analysis/)

## Eight weeks of labs

| Week | Topic | Exercises | R packages used |
| --- | --- | --- | --- |
| **Week 1** | [Using R and Getting Data](/en/Medical-Big-Data-Analysis/1-r-basics-and-data) | 6 | Base packages, no extra installation needed |
| **Week 2** | [Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing) | 7 | `corrgram` `infotheo` |
| **Week 3** | [Regression Analysis](/Medical-Big-Data-Analysis/3-regression) *(Chinese)* | 7 | `epiDisplay` |
| **Week 4** | [Association Rules](/en/Medical-Big-Data-Analysis/4-association-rules) | 3 | `arules` `arulesViz` |
| **Week 5** | [Classification (Part 1)](/Medical-Big-Data-Analysis/5-classification-1) *(Chinese)* | 3 | `randomForest` `rpart` `rpart.plot` |
| **Week 6** | [Classification (Part 2)](/Medical-Big-Data-Analysis/6-classification-2) *(Chinese)* | 4 | `caret` `e1071` `pROC` `recipes` |
| **Week 7** | [Clustering](/Medical-Big-Data-Analysis/7-clustering) *(Chinese)* | 8 | `cluster` `factoextra` `fpc` `ggplot2` |
| **Week 8** | [Neural Networks](/Medical-Big-Data-Analysis/8-neural-networks) *(Chinese)* | 4 | `Metrics` `neuralnet` |

## Before you start: install the packages first

Each lecture page lists **the R packages that lecture uses**; to install them, run this once in the RStudio console:

```r
install.packages(c("arules", "arulesViz", "caret", "neuralnet"))   # replace these with the packages that lecture needs
```

> If you already have the downloaded package files at hand, you can also install them from a local path:
> `install.packages("path/package.zip", repos = NULL, type = "win.binary")`
> — note that there may be several versions of the same package; installing one of them is enough.

## How to work through these labs

1. First write the code yourself in RStudio from the exercise, and **only look at the reference answer if you cannot work it out** (the answers are collapsed by default);
2. Before running anything, set the working directory to the folder that holds the data files;
3. Every lecture's reference answer card also includes **the results and the figures actually produced by running the code on this machine**, so you can check your own output against them.

## Course materials

The exercises, the answer scripts, and each week's compiled handout (original exercises + answers + results)
are all collected in this repository under [`资料/医学大数据/`](https://github.com/LiCloudGood/study-R-in-GDMU/tree/main/%E8%B5%84%E6%96%99/%E5%8C%BB%E5%AD%A6%E5%A4%A7%E6%95%B0%E6%8D%AE),
alongside *Introduction to Information Technology* (both are materials for learning R).
