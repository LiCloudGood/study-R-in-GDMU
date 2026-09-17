---
layout: doc
title: 'Introduction to Information Technology'
---

<script setup>
// withBase adds the deployment prefix to site-internal links (this site lives at
// /study-R-in-GDMU/). Plain HTML hrefs are not processed by VitePress, so without it
// the links 404.
import { withBase } from 'vitepress'

const links = [
  { title: 'Installing R and RStudio, Writing Scripts', desc: 'Set up RGUI and RStudio, write and run scripts, manage packages, and use assignment statements, operators, and expressions.',
    link: '/en/intro-it/1-software-install' },
  { title: 'Vectors and Matrices', desc: 'Create, index, and compute with vectors and matrices.',
    link: '/en/intro-it/2-vectors-and-matrices' },
  { title: 'Arrays and Data Frames', desc: 'Create arrays and data frames, subset them, extract elements, and use the basic operations.',
    link: '/en/intro-it/3-arrays-and-data-frames' },
  { title: 'Lists and Factors', desc: 'Create and work with lists, and define factors and use the functions built around them.',
    link: '/en/intro-it/4-lists-and-factors' },
  { title: 'Dates, Strings, and Special Values', desc: 'Work with dates, search with regular expressions, and handle special values.',
    link: '/en/intro-it/5-dates-strings-and-special-values' },
  { title: 'Input and Output', desc: 'The full set of input and output operations: reading and writing files, saving data, and loading a saved environment.',
    link: '/en/intro-it/6-input-output' },
  { title: 'Branches and Loops', desc: 'Branches, loops, and the statements that control them (next/break), combined to solve simple problems.',
    link: '/en/intro-it/7-branches-and-loops' },
  { title: 'User-Defined Functions', desc: 'Define your own R functions and operators, apply them, and write recursion.',
    link: '/en/intro-it/8-custom-functions' },
  { title: 'Base Graphics', desc: 'Color settings and the five main plotting functions: hist, barplot, pie, boxplot, and plot.',
    link: '/en/intro-it/9-base-graphics' },
  { title: 'Low-Level Plotting Functions', desc: 'The low-level plotting functions: points, lines, abline, arrows, text, title, mtext, and legend.',
    link: '/en/intro-it/10-plot-functions' },
  { title: 'The ggplot2 Package', desc: 'par/layout and ggplot2: geometric objects, statistical transformations, faceting, scales, and themes.',
    link: '/en/intro-it/11-ggplot2' },
  { title: 'Parameter Estimation', desc: 'Confidence intervals for the parameters of the normal, Bernoulli, and exponential distributions.',
    link: '/en/intro-it/12-parameter-estimation' },
  { title: 'Parametric Hypothesis Testing', desc: 'P-values and critical values for parametric tests of normal and non-normal distributions, and the R functions that produce them.',
    link: '/en/intro-it/13-hypothesis-testing' },
  { title: 'Tests of Homogeneity and Contingency Tables', desc: 'Pearson goodness-of-fit tests, the Kolmogorov-Smirnov test, contingency table tests, tests of independence, Fisher\u2019s exact test, the McNemar and kappa tests, and tests of normality.',
    link: '/en/intro-it/14-goodness-of-fit-and-contingency' }
]
</script>

# Introduction to Information Technology

Welcome to ***Introduction to Information Technology***! Click the lecture you want to study below.

::: info Translation status
Translated from the [Chinese original](/intro-it/). The lecture cards are the same set, in the same
order; if the two editions disagree, **the Chinese page is authoritative**.
:::

All 14 lectures are available in English. The Chinese edition is the original and remains
complete; every page has a language switcher at the top right if you want to compare the two.

<div class="grid-cards">
  <component
    v-for="l in links"
    :key="l.title"
    :is="l.link ? 'a' : 'div'"
    :href="l.link ? withBase(l.link) : undefined"
    class="card"
    :class="{ 'card-pending': !l.link }"
  >
    <div class="card-text">
      <h3>{{ l.title }}<span v-if="!l.link" class="card-badge">In progress</span></h3>
      <p>{{ l.desc }}</p>
    </div>
  </component>
</div>
