---
layout: doc
title: 'Health statistics（医学统计学）'
---

# 医学统计学

欢迎光临 **《医学统计学》**！

本板块把《卫生统计学》的内容按章整理成**知识点归纳** —— 每一章讲清楚
「这一章解决什么问题、核心概念是什么、在 R 里怎么做、容易踩什么坑」，
并在末尾指向《信息技术基础》和《医学大数据分析与决策》里对应的练习。

## 方法选择器

不知道手上的数据该用哪个统计方法？用选择器走一遍三步问答，
它会告诉你**用什么方法、要满足什么条件、R 里怎么写、输出看哪几个数、容易踩什么坑**：

<div style="margin: 16px 0">
  <!--
    这里写 .html 而不是 ./choice：裸 HTML 的 href 不会被 VitePress 改写，
    不带扩展名的话，鼠标悬停看到的、以及复制出去的链接在 GitHub Pages 上会 404。
  -->
  <a href="./choice.html" style="display:inline-block;padding:10px 18px;border-radius:8px;background:var(--vp-c-brand-1);color:#fff;font-weight:600;text-decoration:none">
    → 打开统计方法选择器
  </a>
</div>

那一页上还有一张完整的决策速查表，各种情况该用哪个方法都列在上面。

## 各章知识点

| 章 | 主题 |
| --- | --- |
| 1 | [绪论](./01-introduction) |
| 3 | [实验设计与调查设计](./03-study-design) |
| 4 | [定量资料的统计描述](./04-describing-quantitative-data) |
| 5 | [定性资料的统计描述](./05-describing-qualitative-data) |
| 6 | [总体均数与总体率的估计](./06-estimation) |
| 7 | [假设检验](./07-hypothesis-testing) |
| 8 | [t 检验](./08-t-test) |
| 9 | [方差分析](./09-anova) |
| 10 | [卡方检验](./10-chi-square) |
| 11 | [非参数检验与秩和检验](./11-nonparametric) |
| 12 | [双变量关联性分析](./12-bivariate-association) |
| 13 | [直线回归](./13-linear-regression) |
| 14 | [生存分析](./14-survival-analysis) |
| 16 | [Meta 分析](./16-meta-analysis) |
| 17 | [样本含量估计](./17-sample-size) |
| 18 | [生命统计的常用指标](./18-vital-statistics) |
| 19 | [常用统计图表](./19-tables-and-charts) |

> 章号沿用教材的编号，所以中间有跳号（第 2、15 章本课程没讲）。

## 和另外两门课的关系

三门课讲的是同一套东西的不同侧面：

- **《信息技术基础》** —— R 语言入门，13 讲，教你怎么**写代码**；
- **《医学大数据分析与决策》** —— 8 周实验，教你怎么**用 R 做完整分析**；
- **《医学统计学》**（本板块）—— 讲**每个方法背后的原理、适用条件与判断依据**。

所以本板块每一章末尾都有「和别的课怎么对上」，指向前两门课的对应讲次；
反过来，前两门课的相关页面末尾也有回链指到这里。
