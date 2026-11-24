---
layout: doc
title: 'Epidemiology'
---

# Epidemiology

::: info Translation status
Translated from the [Chinese original](/Epidemiology/). Numbers, formulas, and R code are identical to
the original; if the two disagree, **the Chinese page is authoritative**.
:::

This section follows the course chapter by chapter, seven chapters in all. The approach matches the other
sections: each chapter answers "what problem does this chapter solve, what are the core concepts, how are
the measures computed, and where do people go wrong", and ends by pointing to the corresponding material
in Health Statistics and Information Technology.

::: tip How to read this section
The epidemiology chapters are **one line, not a set of parallel topics**:

**Describe** (how disease is distributed in a population) → **form a hypothesis** → **analyse**
(cohort / case-control, testing the hypothesis) → **rule out bias** → **causal inference**
(can this association count as causation) → **experiment** (final confirmation).

So chapters 3–6 are best read together: cohort and case-control studies show *how to find an association*;
bias and causal inference ask *whether the association found can be trusted, and whether it is causal*.
:::

## Chapters

| Ch. | Topic | In one sentence |
| --- | --- | --- |
| 1 | [Introduction to Epidemiology](./01-introduction) | What this discipline studies and how |
| 2 | [Descriptive Epidemiology](./02-descriptive) | The distribution of disease and its frequency measures |
| 3 | [Cohort Study](./03-cohort) | Cause to effect; incidence and RR can be computed directly |
| 4 | [Case-Control Study](./04-case-control) | Effect back to cause; association estimated with OR |
| 5 | [Bias and Its Control](./05-bias) | Why results go wrong, and how to prevent it |
| 6 | [Causation and Causal Inference](./06-causal-inference) | Association ≠ causation — what justifies the claim |
| 7 | [Experimental Epidemiology](./07-experimental) | Intervention imposed by the researcher: the strongest evidence |

> The course slides number these as chapters 7–11 (bias and causal inference are combined in chapter 11);
> this section numbers them 1–7 in the order they were organised.

## How the four study types relate

| Method | What the researcher does | Time direction | Can it establish causation? |
| --- | --- | --- | --- |
| **Descriptive study** | Observe only; describe the distribution | Cross-sectional | No |
| **Analytical study** | Observe + a comparison group + comparison | Prospective or retrospective | Relatively strong / relatively weak |
| **Experimental study** | Impose an intervention + randomize | Prospective | Strongest |
| **Theoretical study** | Build a mathematical model | — | — |

> One thread runs through everything: **description forms the hypothesis → analysis tests it →
> experiment confirms it**.

## About "screening and diagnostic tests"

That chapter of the course asks **how good a test is** (sensitivity, specificity, predictive values, ROC,
combined tests). It is the same topic as the site's existing "Diagnostic Test Evaluation" page.

To avoid covering it twice, this site **merges it into**
[Health Statistics · Diagnostic Test Evaluation](/en/Health-statistics/diagnostic-test), where combined
tests, likelihood ratios, reliability and sample size have been added.

## How this connects to the other sections

| Section | Relation to epidemiology |
| --- | --- |
| [Health Statistics](/en/Health-statistics/) | Epidemiology decides *what to do and how to interpret it*; statistics says *how to compute it and how precise it is* |
| [Information Technology](/en/intro-it/) | Using R for epidemiological computation (comparing rates, RR/OR, survival analysis) |
| [Medical Big Data Analysis](/en/Medical-Big-Data-Analysis/) | Large samples and multivariable modelling — the modern extension of epidemiological analysis |

Chapter by chapter:

- The $\chi^2$ test inside cohort and case-control studies → [Health Statistics Chapter 10, Chi-Square Tests](/en/Health-statistics/10-chi-square)
- The statistical nature of OR and RR → [Health Statistics Chapter 12, Bivariate Association](/en/Health-statistics/12-bivariate-association)
- Sample size estimation → [Health Statistics Chapter 17, Sample Size Estimation](/en/Health-statistics/17-sample-size)
- Survival analysis of follow-up data → [Health Statistics Chapter 14, Survival Analysis](/en/Health-statistics/14-survival-analysis)
- Incidence, prevalence, mortality, standardised rates → [Health Statistics Chapter 18, Vital Statistics](/en/Health-statistics/18-vital-statistics)
- Controlling confounders → [Health Statistics Chapter 3, Experimental and Survey Design](/en/Health-statistics/03-study-design)
