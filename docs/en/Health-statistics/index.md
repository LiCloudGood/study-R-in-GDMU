---
layout: doc
title: 'Health Statistics'
---

# Health Statistics

Welcome to **Health Statistics**.

This section reorganizes the *Health Statistics* course chapter by chapter into **worked knowledge
summaries**. Each chapter answers four questions — *what problem this chapter solves, what the core
concepts are, how to do it in R, and what mistakes are easy to make* — and ends with pointers to the
matching exercises in *Introduction to Information Technology* and *Medical Big Data Analysis and
Decision Making*.

::: info Translation status
Translated from the Chinese original. Numbers, formulas, and R code are identical to the original;
if the two disagree, **the Chinese page is authoritative**.
:::

[中文版](/Health-statistics/)

## Method Selector

Not sure which statistical method your data calls for? Walk through the selector's three-step
questionnaire and it will tell you **which method to use, what assumptions it requires, how to write
it in R, which numbers to read in the output, and what mistakes to watch out for**:

<div style="margin: 16px 0">
  <!--
    Same reasoning as the Chinese page: write .html rather than ./choice, because raw HTML hrefs are
    not rewritten by VitePress and an extensionless link would 404 on GitHub Pages.
    The English rule table is generated from the same single rule table as the Chinese one
    (scripts/generate-selector.mjs), so the two language editions cannot drift apart in logic.
  -->
  <a href="./choice.html" style="display:inline-block;padding:10px 18px;border-radius:8px;background:var(--vp-c-brand-1);color:#fff;font-weight:600;text-decoration:none">
    → Open the Method Selector
  </a>
</div>

That page also carries a complete quick-reference decision table listing which method applies to
which situation.

## Chapters

| Chapter | Topic |
| --- | --- |
| 1 | Introduction |
| 3 | Experimental and Survey Design |
| 4 | Describing Quantitative Data |
| 5 | Describing Qualitative Data |
| 6 | Estimating Population Means and Rates |
| 7 | Hypothesis Testing |
| 8 | t Tests |
| 9 | Analysis of Variance |
| 10 | Chi-Square Tests |
| 11 | Nonparametric and Rank-Based Tests |
| 12 | Bivariate Association |
| 13 | Simple Linear Regression |
| 14 | Survival Analysis |
| 16 | Meta-Analysis |
| 17 | Sample Size Estimation |
| 18 | Vital Statistics |
| 19 | Statistical Tables and Charts |

> Chapter numbers follow the textbook, so there are gaps — this course does not cover Chapters 2
> and 15.

## Supplementary topics

These two topics are not separate chapters in the textbook's 19 (Cohen's kappa does appear in
Lecture 14 of *Introduction to Information Technology*), but they come up constantly in clinical
work. They are written here as supplementary topics in the same format as the other chapters:

| Topic | The question it answers |
| --- | --- |
| [Diagnostic Test Evaluation (ROC and AUC)](/en/Health-statistics/diagnostic-test) | How accurate is this diagnostic marker? Where should the cutoff go? Why does the same test perform differently in another department? |
| [Agreement and Reliability (Kappa and ICC)](/en/Health-statistics/agreement-reliability) | Two clinicians, two instruments, the same subjects — do they agree? And why is correlation not agreement? |

## How this relates to the other two courses

The three courses are different sides of the same subject:

- ***Introduction to Information Technology*** — an introduction to R, 14 lectures, teaching you how
  to **write the code**;
- ***Medical Big Data Analysis and Decision Making*** — 8 weeks of labs, teaching you how to **run a
  complete analysis in R**;
- ***Health Statistics*** (this section) — the **principles, assumptions, and decision criteria**
  behind each method.

So every chapter here ends with a "How it connects to the other courses" section pointing at the
matching lectures, and the relevant pages in the other two courses link back here.
