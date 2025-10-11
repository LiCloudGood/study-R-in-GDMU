---
layout: doc
title: 'Introduction to information technology（信息技术基础）'
---

<script setup>


const links = [
  { title: '软件及其软件包安装和脚本编写', desc: '掌握RGUI与RStudio的安装配置、脚本编写运行、软件包管理、赋值语句及运算符与表达式书写',
  link: '' },
  { title: '向量与矩阵', desc: '掌握向量与矩阵的创建、操作与运算',
  link: '' },
  { title: '数组与数据框', desc: '掌握数组与数据框的创建、筛选、元素提取及基本操作', 
  link: '' },
  { title: '列表与因子', desc: '掌握列表的创建与操作，以及因子的定义与相关函数', 
  link: '' },
  { title: '日期、字符与特殊值处理', desc: '掌握日期处理、正则检索与特殊值处理',
  link: '' },
  { title: '输入、输出', desc: '掌握文件读写、数据保存及环境加载的输入输出全套操作',
  link: '' },
  { title: '分支与循环', desc: '掌握分支、循环及其控制语句（next/break）并综合运用解决简单问题。',
  link: '' },
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

<div class="grid-cards itec-cards">
  <a v-for="l in links" :href="l.link" class="card">
    <div class="card-icon">{{ l.icon }}</div>
    <div class="card-text">
      <h3>{{ l.title }}</h3>
      <p>{{ l.desc }}</p>
    </div>
  </a>
</div>



<style>
.itec-cards{ display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; margin-top: 2rem; }
.itec-cards .card{ display: flex; align-items: center; padding: 1.5rem; border: 1px solid var(--vp-c-border); border-radius: 12px; transition: all .25s; color: inherit; text-decoration: none; }
.itec-cards .card:hover{ transform: translateY(-2px); box-shadow: 0 8px 24px rgba(var(--vp-c-brand-rgb), 0.12); }
.itec-cards .card-icon{ font-size: 32px; margin-right: 1rem; }
.itec-cards .card-text h3{ margin: 0 0 4px; font-size: 1.1rem; }
.itec-cards .card-text p{ margin: 0; font-size: .95rem; color: var(--vp-c-text-2); }
</style>