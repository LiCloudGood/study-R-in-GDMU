---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "study R in GDMU"
  text: "Start your R journey here"
  tagline: 'The exercises and background on this site come from university coursework; the presentation is a personal side project, and everything here reflects my own understanding — corrections are welcome. Get in touch via <a href="https://github.com/LiCloudGood" target="_blank" rel="noreferrer">GitHub</a> and I will reply as soon as I see it.'

features:
  - title: Introduction to information technology
    details: The gentlest possible start to R — from installing the software to running statistical tests
    link: ''
  - title: Fundamentals of Medical Big Data Analysis
    details: Applying R to medical data analysis — regression, association rules, classification, clustering, neural networks
    link: ''
  - title: Health statistics
    details: 17 chapters of worked knowledge summaries, from describing data to survival analysis, plus a Method Selector to help you pick a test
    link: /en/Health-statistics/
---

## What this is

This site is the English edition of a set of course notes originally written in Chinese. It covers three courses:

| Course | What it teaches |
| --- | --- |
| *Introduction to Information Technology* | 14 lectures of R from the ground up |
| *Medical Big Data Analysis and Decision Making* | 8 weeks of applied R for medical data |
| *Health Statistics* | 17 chapters of medical statistics, plus two supplementary topics and an interactive method selector |

## Translation status

**The English edition is complete.** All 50 pages are available in English: the 14 lectures of
*Introduction to Information Technology*, the 8 weeks of *Medical Big Data Analysis and Decision
Making*, the 17 chapters of *Health Statistics* with the two supplementary topics, and the
interactive method selector.

The Chinese edition is the original and stays authoritative — where the two disagree, the Chinese
page wins, and every English page says so at the top. The translation was done under a fixed
terminology standard, and the R code on every page was re-run to confirm that each pasted output
matches real R output; numbers, formulas, and conclusions are carried over unchanged.

## How to use it

1. Pick a course and read it in order from the first lecture.
2. Every lecture has exercises. **Try them yourself first**, then open the reference answer.
3. R code in the answers can be copied straight into RStudio.
4. If R is not installed yet, start with the installation lecture.

## Credits

- **Course materials** — compiled and provided by [Li_CloudGood](https://github.com/LiCloudGood).
- **Website** — built with [VitePress](https://vitepress.dev/). Page structure, the custom theme
  components, and the typesetting were conceived by Li_CloudGood and implemented together with an
  AI assistant powered by DeepSeek Harness.
- **Translation** — the English edition under `/en/` was translated and written page by page by an
  AI assistant powered by DeepSeek Harness. A fixed terminology standard
  (`scripts/术语对照表.md`) was laid down first, so terminology, page titles, and cross-page wording
  stay consistent; formulas, numbers, and R code are carried over from the Chinese originals
  unchanged. After each batch the R code was lifted out of the finished pages and re-run to confirm
  that every pasted output matches real R output, and each batch was built, link-checked, and
  committed before moving on. Where the two editions disagree, **the Chinese page is authoritative**
  — every English page says so at the top. And thank you to everyone who reads this far and takes the
  trouble to point out a mistake.
