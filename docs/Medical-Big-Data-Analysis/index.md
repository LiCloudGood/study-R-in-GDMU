---
layout: doc
title: 'Fundamentals of Medical Big Data Analysis（医学大数据分析与决策）'
---

# 医学大数据分析与决策

欢迎光临 **《医学大数据分析与决策》**！

本课程共 8 周实验，讲 R 语言在医学大数据分析中的应用，比《信息技术基础》更进阶。

## 八周实验

| 周 | 主题 | 实验题 | 用到的 R 包 |
| --- | --- | --- | --- |
| **第 1 周** | [R的使用及数据获取](./1-r-basics-and-data) | 6 | 基础包，无需额外安装 |
| **第 2 周** | [数据预处理](./2-data-preprocessing) | 7 | `corrgram` `infotheo` |
| **第 3 周** | [回归分析](./3-regression) | 7 | `epiDisplay` |
| **第 4 周** | [关联规则](./4-association-rules) | 3 | `arules` `arulesViz` |
| **第 5 周** | [分类（一）](./5-classification-1) | 3 | `randomForest` `rpart` `rpart.plot` |
| **第 6 周** | [分类（二）](./6-classification-2) | 4 | `caret` `e1071` `pROC` `recipes` |
| **第 7 周** | [聚类](./7-clustering) | 8 | `cluster` `factoextra` `fpc` `ggplot2` |
| **第 8 周** | [神经网络](./8-neural-networks) | 4 | `Metrics` `neuralnet` |

## 动手之前：先把包装好

每一讲的页面上都会列出**当讲用到的 R 包**，装法是在 RStudio 控制台里跑一次：

```r
install.packages(c("arules", "arulesViz", "caret", "neuralnet"))   # 换成当讲需要的包
```

> 如果手头已经有下载好的包文件，也可以指定本地路径装：
> `install.packages("路径/包名.zip", repos = NULL, type = "win.binary")`
> —— 注意同一个包可能有好几个版本，装一个就行。

## 怎么做这些实验

1. 先照题目自己在 RStudio 里写一遍，**写不出来再看参考答案**（答案默认收起来）；
2. 跑之前把工作目录设到数据文件所在的文件夹；
3. 每一讲的参考答案卡片里都附了**在本机实际跑出来的运行结果和图形**，
   可以对照着检查自己的输出。

## 课程资料

题目、答案脚本和每周的汇总（原题 + 答案 + 运行结果）
都收在本仓库的 [`资料/医学大数据/`](https://github.com/LiCloudGood/study-R-in-GDMU/tree/main/%E8%B5%84%E6%96%99/%E5%8C%BB%E5%AD%A6%E5%A4%A7%E6%95%B0%E6%8D%AE) 下，
和《信息技术基础》放在一起（都是学 R 的材料）。
