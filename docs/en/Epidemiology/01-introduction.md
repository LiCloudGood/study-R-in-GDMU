---
layout: doc
title: '1. Introduction to Epidemiology'
---

# Chapter 1. Introduction to Epidemiology

::: info Translation status
Translated from the [Chinese original](/Epidemiology/01-introduction). Numbers, formulas, and R code are
identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Clinical medicine looks at **one person**; epidemiology looks at **a population**. This chapter sets up
> the coordinate system of the discipline: who the subjects are, what is studied, which words are used to
> describe it, and what principles govern the research.

## What this chapter is for

Take "hypertension". The same word leads to two completely different questions:

- A clinician asks: what is **this patient's** blood pressure, and which drug should they take?
- Epidemiology asks: how many people **in this district** have high blood pressure? **Which people** are
  more likely to? **Why**? **How can it be prevented?**

The first question is answered by individual diagnosis. The second requires a **population** — and the
answer comes not from one or two people but from distributions, proportions and comparisons.

That leads to the two essential concepts of the discipline: **population** and **distribution**.

<TrackList :tasks="['Recite the definition of epidemiology and name its four components', 'Distinguish mass diagnosis from individual diagnosis', 'Describe a disease using the three dimensions of distribution (person, time, place)', 'State the five basic principles and the four basic rules', 'Explain which study types correspond to forming, testing and confirming a hypothesis', 'List the five uses of epidemiology']" />

## The definition: four things in one sentence

> **Epidemiology** is the science that studies the **distribution of disease and health status in
> populations and its determinants**, and that studies and formulates the **strategies and measures for
> preventing and controlling disease and promoting health**.

The sentence is short, but every part defines the discipline:

| Component | What it says | Question |
| --- | --- | --- |
| **Population** | The subject is a population, not an individual | who |
| **Distribution of disease and health** | The content and the core method | when / where / who |
| **Determinants of the distribution** | Finding causes and risk factors | why |
| **Strategies and measures** | The ultimate purpose: control disease, promote health | how |

### The first essential concept: population

The population perspective is **the most distinctive feature that separates epidemiology from other
medical disciplines**. Epidemiology understands disease and health macroscopically, from the population
angle.

> Clinical practice performs **individual diagnosis**; epidemiology performs "**mass diagnosis**".

### Three levels of content

| Level | Includes |
| --- | --- |
| **Disease** | Infectious diseases, parasitic diseases, endemic diseases, non-communicable diseases — all disease |
| **Injury** | Accidents, disability, intellectual impairment, physical and psychological harm |
| **Health** | Physiological and biochemical functional states, pre-disease states, longevity |

Note that "health" is also content: epidemiology studies not only disease but also the absence of disease
and the sub-healthy state.

### The second essential concept: distribution

**Distribution** is the state of disease in different **populations**, at different **times** and in
different **places**, and the pattern of its occurrence and development. Together these are the
"**three dimensions of distribution**":

| Dimension | Asks | Corresponds to |
| --- | --- | --- |
| **Person distribution** | Which people are susceptible? | **who** |
| **Time distribution** | When is it more common? | **when** |
| **Place distribution** | Where is it more common? | **where** |

### Determinants of the distribution

The determinants of the distribution are precisely **causes and risk factors**. **Studying causes and risk
factors is the most important task of epidemiology.**

So the four questions in the definition connect: **distribution answers who / when / where; determinants
answer why; strategies and measures answer how.**

## Six Ws summarising the basic tasks

| 6W | Meaning |
| --- | --- |
| **who** | Which people |
| **when** | At what time |
| **where** | In what place |
| **what** | What event occurs |
| **why** | Why it occurs |
| **how** | How to deal with it |

The ultimate aim is to **prevent and control disease and improve population health**.

> Remember the thread: **reveal the phenomenon (distribution) → find the cause (determinants) → provide
> measures (strategies and measures)**. These are the three stages of the epidemiological task.

## Five basic principles

These are the worldview of the discipline:

| Principle | Core idea |
| --- | --- |
| **Disease distribution** | Disease in different populations (person, time, place characteristics) is **non-random**; describing the distribution therefore reveals epidemiological features |
| **Aetiology** | The cause of any disease is **never single** but the combined result of many causes; these causes and their interrelations are complex, varied and changeable — **multi-causality and probability** views are increasingly accepted |
| **Health–disease continuum** | The transition from health to disease is a **continuous process** at both individual and population level; a population moves continuously between "high health distribution" and "low health distribution" |
| **Disease prevention and control** | According to the patterns of occurrence, development and change, prevention and control can adopt a **three-level prevention strategy** |
| **Epidemic mathematical models** | Disease and health are affected by host, environment and social factors with functional relationships that can be described by **mathematical models**, and under certain conditions future trends can be predicted |

## Four basic rules

These are the discipline of doing research:

| Rule | Meaning | Cost of violating it |
| --- | --- | --- |
| **Population** | Start from the distributions in the population; make distribution the point of departure for every question | Degenerates into individual research and loses epidemiological meaning |
| **Field** | Populations live in society; the population must be linked to its surrounding (social and natural) environment | A population detached from its field is meaningless in epidemiology |
| **Comparison** | **Comparison is the core of epidemiology** — only by comparing can causes be found and the correctness of diagnosis or the effectiveness of treatment be assessed | Without a comparison, a descriptive result explains nothing |
| **Representativeness** | The sample must be representative for conclusions to be extrapolated to the population | Conclusions cannot be generalised |

On **representativeness**: a representative sample requires two things — **the sample is drawn randomly**
and **the sample size is large enough**. Neither alone suffices.

> The rule of comparison is the one most often neglected. Even a plain descriptive result **must be
> compared with the corresponding results for the same population, time and place** — an isolated rate
> means nothing.

## Research methods: three steps

```
Form a hypothesis  →  Test the hypothesis  →  Confirm the hypothesis
  (descriptive)          (analytical)             (experimental)
```

| Stage | Method type | Answers |
| --- | --- | --- |
| **Form a hypothesis** | Descriptive studies (cross-sectional, ecological, …) | What does the distribution look like? What might explain it? |
| **Test the hypothesis** | Analytical studies (case-control, cohort) | Is this factor really related to the disease? How strong? |
| **Confirm the hypothesis** | Experimental studies (clinical trial, field trial) | If we intervene, does disease decrease? |

There is also **theoretical research** (mathematical models), which is neither observational nor
experimental. So by broad category, epidemiological methods fall into **observational, experimental and
theoretical** research.

> This thread is the skeleton of the whole course; every later chapter hangs on one of these three steps.

## Seven components of a study design

A study must settle seven things in the design stage:

1. **Define the objective** — specific and attainable;
2. **Determine the content** — the content is the element that expresses the objective and the basis for
   the conclusion; scope and number of indicators must be appropriate;
3. **Choose the method** — observational / experimental / theoretical; one method or several combined;
4. **Select the subjects** — state inclusion and exclusion criteria explicitly, and consider compliance;
5. **Design the questionnaire** — turn the content into standard questions; it is both the field-work
   outline and a direct determinant of data quality;
6. **Ensure quality** — every stage may harbour **bias or confounding**, so quality control measures must
   be built into the design (both organisational measures and technical measures against bias);
7. **Reach a correct conclusion** — clarify the analytic logic: grouping must be medically sound and
   logically valid, and the statistical method must suit the data.

> Point 6 deserves separate emphasis: **quality control must be designed in advance, never patched
> afterwards.**

## Uses

1. **Describe the distribution of disease and health in populations** — the most basic and most common;
2. **Investigate causes and risk factors** — the most important task;
3. **Describe the natural history of disease completely** — from exposure to onset and outcome;
4. **Evaluate the effect of prevention and control measures** — effectiveness requires comparison;
5. **Disease prevention** — turning the preceding conclusions into intervention.

## Common pitfalls

::: warning Five traps
- **Treating epidemiology as a statistics course.** Statistics is a tool; epidemiology cares about
  **design, causation and populations**. The same chi-square test applied to cross-sectional data and to
  cohort data supports conclusions of very different strength.
- **Extrapolating from individual to population, or from population to individual.** Mass diagnosis is not
  individual diagnosis; a population-level association may fail completely at the individual level
  (**ecological fallacy**, see Chapter 6).
- **Describing without comparing.** "The incidence is 3%" carries no information on its own; it means
  something only relative to a comparison.
- **Thinking "distribution" is just listing and charting.** The three dimensions of distribution are the
  **main source of aetiological hypotheses**, not mere preparation.
- **Forgetting that "health" is content too.** The definition says "disease **and health status**".
:::

## Summary

1. The subject of epidemiology is the **population**, its core concept is **distribution**, and its purpose
   is to **control disease and promote health**.
2. The definition has four parts: population, distribution, determinants, strategies and measures
   (who / when / where / why / how).
3. **Three dimensions of distribution** = person (who) + time (when) + place (where).
4. Five principles: disease distribution, aetiology, health–disease continuum, prevention and control,
   epidemic models. Four rules: population, field, comparison, representativeness.
5. Three methodological steps: **form (descriptive) → test (analytical) → confirm (experimental)**.
6. Five uses: describe distribution, investigate causes, describe natural history, evaluate effects,
   prevent disease.

## How this connects to the other courses

- Rates, proportions, standardised rates → [Health Statistics Chapter 5, Describing Qualitative Data](/en/Health-statistics/05-describing-qualitative-data)
- Full definitions of incidence, prevalence, mortality → [Health Statistics Chapter 18, Vital Statistics](/en/Health-statistics/18-vital-statistics)
- Sampling methods, sample size, survey design → [Health Statistics Chapter 3](/en/Health-statistics/03-study-design),
  [Chapter 17, Sample Size Estimation](/en/Health-statistics/17-sample-size)
- Descriptive statistics and charts in R → [Health Statistics Chapter 19, Statistical Tables and Charts](/en/Health-statistics/19-tables-and-charts)
- Next chapter: [Descriptive Epidemiology](./02-descriptive) — computing and charting the distribution
