---
layout: doc
title: 'Introduction to information technology（信息技术基础）'
---

<script setup>
const links = [
  { title: '软件及其软件包安装和脚本编写', desc: '掌握RGUI与RStudio的安装配置、脚本编写运行、软件包管理、赋值语句及运算符与表达式书写',
    link: '/intro-it/1-software-install' },
  { title: '向量与矩阵', desc: '掌握向量与矩阵的创建、操作与运算',
    link: '/intro-it/2-vectors-and-matrices' },
  { title: '数组与数据框', desc: '掌握数组与数据框的创建、筛选、元素提取及基本操作',
    link: '/intro-it/3-arrays-and-data-frames' },
  { title: '列表与因子', desc: '掌握列表的创建与操作，以及因子的定义与相关函数',
    link: '/intro-it/4-lists-and-factors' },
  { title: '日期、字符与特殊值处理', desc: '掌握日期处理、正则检索与特殊值处理',
    link: '/intro-it/5-dates-strings-and-special-values' },
  { title: '输入、输出', desc: '掌握文件读写、数据保存及环境加载的输入输出全套操作',
    link: '/intro-it/6-input-output' },
  { title: '分支与循环', desc: '掌握分支、循环及其控制语句（next/break）并综合运用解决简单问题。',
    link: '/intro-it/7-branches-and-loops' },
  { title: '自定义函数', desc: '掌握R函数与运算符的定义、简单应用及递归实现',
    link: '' },
  { title: '高级绘图', desc: '掌握颜色设置及hist、barplot、pie、boxplot、plot五大绘图函数',
    link: '' },
  { title: 'ggplot2包', desc: '掌握par/layout与ggplot2：几何对象、统计变换、分页、标度、主题设置。',
    link: '' },
  { title: '参数估计', desc: '掌握正态、0-1与指数三大分布参数的置信区间计算',
    link: '' },
  { title: '参数假设检验', desc: '掌握正态与非正态分布参数检验的P值、临界值计算及对应R函数',
    link: '' },
  { title: '同分布检验与列联表检验', desc: '掌握Pearson拟合优度检验、Kolmogorov-Smirnov检验及列联表检验、列联表独立性检验、Fisher精确性检验、McNemar检验和Kappa检验、正态性检验方法',
    link: '' }
]
</script>

# 信息技术基础

欢迎光临 **《信息技术基础》**！在下面点击你想要学习的课程！

<div class="grid-cards">
  <component
    v-for="l in links"
    :key="l.title"
    :is="l.link ? 'a' : 'div'"
    :href="l.link || undefined"
    class="card"
    :class="{ 'card-pending': !l.link }"
  >
    <div class="card-text">
      <h3>{{ l.title }}<span v-if="!l.link" class="card-badge">待更新</span></h3>
      <p>{{ l.desc }}</p>
    </div>
  </component>
</div>
