---
layout: doc
title: '4. Case-Control Study'
---

# Chapter 4. Case-Control Study

::: info Translation status
Translated from the [Chinese original](/Epidemiology/04-case-control). Numbers, formulas, and R code are
identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> A cohort study sorts by cause and waits for the effect — but it **cannot wait long enough**: a rare
> disease may require following hundreds of thousands of person-years. A case-control study reverses the
> direction: **find the patients first, then ask them what they were exposed to in the past**. The price is
> that incidence cannot be obtained, so OR is the only measure of association.

## What this chapter is for

Consider a concrete difficulty: a hospital admits 30 cases of a rare tumour in a year, with an incidence of
roughly 2 per 100,000. To verify a suspected factor with a cohort study, one would have to find hundreds of
thousands of exposed and non-exposed people and follow them for ten years — **practically impossible**.

So change the approach: since the patients are already at hand, **start from the patients and look
backwards**.

- Case group: the 30 confirmed patients;
- Control group: people from the same source **without the disease** but otherwise comparable;
- Then ask both groups about **past** exposure and compare the proportions.

If the case group's exposure proportion is clearly higher, the exposure may be related to the disease. This
is a case-control study, also called a **retrospective study**.

What it buys is **speed, economy and the ability to study rare diseases**; what it costs is **incidence** —
so only **OR** can be computed, not RR.

<TrackList :tasks="['Explain why a case-control study runs from effect back to cause', 'Explain why OR but not RR can be computed', 'Distinguish unmatched, frequency-matched and individually matched designs, and state the purpose and four cautions of matching', 'Explain why a suspected cause must never be a matching factor', 'Compute OR and its 95% confidence interval and interpret it', 'List the four advantages and four limitations of a case-control study', 'Compare cohort and case-control studies']" />

## Core concepts

### Definition

> A **case-control study** divides subjects by **whether they have the study disease** into a case group and
> a control group, **retrospectively** traces the past exposure of each group to the study factors, and
> compares the differences in order to infer whether the exposure is associated with the disease and how
> strong the association is. It is an **observational** study.

Three keywords: **grouped by outcome**, **retrospective exposure ascertainment**, **observational**.

### Principle and direction

```
              ← past          now
cases      exposed / not  ←  has the study disease?
controls   exposed / not  ←  does not have it
                    ↑
            compare the two exposure proportions
```

**The direction is "from effect back to cause"**: starting from the present outcome, looking back at past
exposure. This is the opposite of a cohort study, and it is the fundamental reason a case-control study
**cannot establish causation** — **the temporal order is less secure** than in a cohort study.

### Basic features

| Feature | Meaning |
| --- | --- |
| **Observational** | No intervention |
| **Grouped by outcome** | Case group and control group |
| **Retrospective** | Exposure history traced backwards |
| **Effect → cause** | Opposite to a cohort study |
| **Cannot establish causation** | Disease and exposure **both already exist** at the start |

### Why OR cannot replace RR

This is the core point of the chapter:

| | Cohort study | Case-control study |
| --- | --- | --- |
| Grouping basis | Exposure | **Disease status** |
| Incidence computable? | **Yes** (real denominator) | **No** (numbers of cases and controls are fixed by the researcher) |
| Measures of association | RR, AR, AR%, PAR, PAR% | **Only OR** |

How many cases and how many controls to take is **decided by the researcher**, not by nature. Since the
denominator is artificial, incidence is undefined and RR cannot be computed. What remains is the **odds
ratio** — a ratio **within** each group, unaffected by the ratio of group sizes.

## Uses

1. **Studying causes and risk factors** — the main use, especially for **rare** and **unexplained**
   diseases;
2. **Studying factors affecting health-related events**;
3. **Studying prognostic factors**;
4. **Studying factors affecting clinical efficacy**.

> Because "one study can analyse several factors against one disease at once", it is ideal for
> **exploration** — ask about every plausible factor, pick up the signals, then verify with a cohort study.

## Study types

### Two main types

| Type | Also called | Features |
| --- | --- | --- |
| **Unmatched** | Group comparison | Controls are not individually paired; groups must be comparable in aggregate |
| **Matched** | Matched-pair study | Controls are made to agree with cases on certain factors; subdivided into **frequency matching** and **individual matching** |

### Four derived types

| Type | Basic idea |
| --- | --- |
| **Nested case-control** | Within an existing cohort, cases are those who developed the disease; controls are sampled from non-cases in the same cohort |
| **Case-cohort** | A random sub-cohort serves as controls for all cases |
| **Case-case** | Compares subtypes of cases to find risk factors for a subtype |
| **Case-crossover** | Compares "the period before onset" with "an earlier period" within the same person; suits **transient exposures** and acute events |

> Nested and case-cohort designs are "a case-control study inside a cohort" — they save assay costs while
> retaining the cohort's denominator information (beyond the standard course, but worth knowing).

## Matching: the step most often done wrong

**Matching** uses factors that interfere with the study outcome as **matching factors**, making the control
group agree with the case group on them, in order to eliminate their interference.

### Purposes

1. **Improve study (statistical) efficiency** — higher power for the same sample size;
2. **Control confounders** — equalise known confounders artificially.

### Types

| Type | Approach |
| --- | --- |
| **Frequency matching** | Only the **distribution** of the matching factor must agree (e.g. the same age structure), no individual pairing |
| **Individual matching** | Each case is matched with one or more controls of the same condition (1:1, 1:R) |

### Four cautions

::: warning Four iron rules of matching
1. **Choose matching factors carefully** — the more factors matched, the fewer remain studyable, and the
   harder it is to find controls.
2. **A suspected cause must never be a matching factor** — once matched, its effect is **artificially
   erased** and can never be studied. This is the most fatal error.
3. **The matching ratio should not exceed 1:4** — beyond four controls the statistical gain is small while
   workload and cost rise steeply.
4. **Avoid overmatching** — matching on factors unrelated to the disease, or on intermediate links in the
   causal chain, wastes information and reduces efficiency.
:::

> One-line memory aid: **matching removes nuisance factors, never the factor you want to study.**

## Design and implementation

### ① Define the objective and choose the type

| Objective | Suggested type |
| --- | --- |
| Broad exploration of risk factors | Unmatched or frequency-matched |
| Testing an aetiological hypothesis | Individually matched |
| Small-sample study of a rare disease | Individually matched |
| Cases unusual in age/sex composition, random controls hard to balance | 1:R individual matching |

### ② Determine the study factors

Includes **established aetiological factors**, **suspected aetiological factors** and **possible
confounders**. Each needs **explicit, specific criteria**, preferably international or national standards.

### ③ Select subjects

#### Case selection

**Two principles**:

- **Representativeness** — cases should represent all patients with the disease in the target population;
- **Unambiguous diagnosis** — site, pathological type and diagnostic criteria must be restricted; external
  characteristics (age, sex, ethnicity, occupation) likewise.

**Three kinds of cases** (the order matters):

| Kind | Evaluation |
| --- | --- |
| **Newly diagnosed cases** | **Preferred** — rich, accurate information, least recall bias |
| **Prevalent cases** | Affected by disease duration and **survival** (long-duration cases are over-selected) |
| **Dead cases** | Least accurate (answered by relatives) |

**Two sources**:

| Source | Name | Advantages | Disadvantages |
| --- | --- | --- | --- |
| **Hospital** | Hospital-based case-control study | Convenient, feasible, information-rich | Reflects only that institution; **prone to selection bias (admission-rate bias)** |
| **Community** | Community-based case-control study | Good representativeness | Data difficult to obtain |

#### Control selection

**Five principles**:

1. The same diagnostic standard as cases, **explicitly excluding the disease**;
2. **Representativeness**;
3. **Comparability** with cases;
4. **Controls must not have the same cause as the study disease** (otherwise the effect is masked);
5. More than one control group may be used.

**Three common sources**:

- **Patients with other diseases in the same hospital** — convenient, good response, but those diseases must
  not be related to the exposure;
- **Community population** — representative non-cases from the population or a sample; best
  representativeness;
- **Neighbours, relatives/spouses, colleagues/classmates** — naturally comparable in socio-economic status
  and living environment, but beware shared heredity (relatives) or shared habits (spouses) —
  **overmatching** risk.

### ④ Sample size

Four determinants:

| Factor | Note |
| --- | --- |
| **Exposure prevalence in controls $p_0$** | The rarer the exposure, the larger the sample |
| **Expected OR** | The weaker the association, the larger the sample |
| **Significance level $\alpha$** | Usually 0.05; smaller $\alpha$ needs a larger sample |
| **Power $1-\beta$** | $\beta$ is the type II error rate, usually $\beta = 0.10$ (power 90%) |

Estimation differs for **group comparison** and **individual matching**: the group-comparison formula is the
same as for cohort studies (with $p_1$, $p_0$ now being the **exposure proportions of cases and controls**);
individual matching first estimates the number of **discordant pairs**, then the total number of pairs.

### ⑤ Data collection

**Routes**: interview, physical examination, biomarker testing, occupational or other records.

**Three cautions** (all to reduce information bias):

1. Cases and controls use the **same questionnaire**;
2. Interviewers are **trained uniformly**;
3. Cases and controls are treated with the **same attitude** during the interview.

## Data management and analysis

### Step 1: balance test

Compare non-study factors (age, sex) between groups to check **comparability**. If they are not comparable,
their influence must be considered and **controlled** (stratification, multivariable analysis).

### Step 2: the 2×2 table (group comparison)

| | Cases | Controls | Total |
| --- | --- | --- | --- |
| **Exposed** | $a$ | $b$ | $a+b$ |
| **Not exposed** | $c$ | $d$ | $c+d$ |
| Total | $a+c$ | $b+d$ | $n$ |

First run a **$\chi^2$ test**: if the exposure proportions differ significantly, exposure and disease are
**associated**.

### Step 3: OR and its meaning

$$\text{OR} = \frac{\text{exposure odds in cases}}{\text{exposure odds in controls}} = \frac{a/c}{b/d} = \frac{ad}{bc}$$

**Interpretation parallels RR**:

| OR | Meaning |
| --- | --- |
| $\text{OR} > 1$ | **Positive association**: exposure increases risk; a **risk factor** |
| $\text{OR} < 1$ | **Negative association**: exposure reduces risk; a **protective factor** |
| $\text{OR} = 1$ | **No association** |

Range $0$ to $\infty$. **The meaning is the same as RR**: how many times the risk in the exposed relative to
the non-exposed.

### Step 4: 95% confidence interval for OR

The sample OR is only a point estimate; give a confidence interval (Miettinen's or Woolf's method):

- **Interval excludes 1** → the association is statistically significant;
- **Interval includes 1** → even if the sample OR differs from 1, exposure and disease **cannot be said to be
  associated**.

> This sentence is mandatory whenever an OR is reported. An "OR = 2.5" without an interval is not a report.

### Step 5: 1:1 individually matched data

Individually matched data **cannot be analysed as unmatched data**. Build a matched 2×2 table (classified by
case exposure / control exposure), use the matched $\chi^2$ (McNemar) test, and the OR becomes the ratio of
**discordant pairs**:

$$\text{OR} = \frac{b}{c} \quad (\text{$b$, $c$ = the two types of discordant pairs})$$

This is the same logic as the matched data in Information Technology Lecture 14.

## Advantages and limitations

### Advantages

1. **Suitable for rare and unexplained diseases** — its greatest value;
2. **Smaller samples, saving manpower, materials and time; easy to organise**;
3. **One study can analyse several factors against one disease** — good for exploration;
4. **Applicable to aetiology, diagnosis, treatment, prevention and prognosis**.

### Limitations

1. **Unsuitable when exposure is very rare in the population**;
2. **Many opportunities for bias** — recall bias, selection bias, admission-rate bias (see Chapter 5);
3. **The temporal order of disease and exposure is hard to establish; causation cannot be determined**;
4. **Incidence and mortality cannot be computed**; only OR can estimate the association.

## Cohort vs case-control: full comparison

| Aspect | Prospective cohort | Case-control |
| --- | --- | --- |
| **Sample composition** | Individuals free of the disease | Cases and controls |
| **Grouping basis** | Exposure | **Disease status** |
| **Temporal order** | Prospective (cause → effect) | Retrospective (effect → cause) |
| **Causation** | **Can be established** | **Cannot be established** |
| **What is compared** | Incidence and mortality | **Exposure** |
| **Measures computed** | Incidence or mortality | **Exposure proportion** |
| **Association measures** | RR, AR, PAR, AR%, PAR% | **OR** |
| **Suitable diseases** | Common diseases | **Rare diseases** |
| **Sample size** | Large | Small |
| **Time and cost** | Long, expensive | Short, economical |
| **Opportunity for bias** | Fewer (mainly loss to follow-up) | More |

> In one line: **a cohort study is expensive but hard; a case-control study is quick but soft**.
> In practice, a case-control study is often used to **screen for clues** and a cohort study to
> **draw conclusions**.

## Common pitfalls

::: warning Six frequent errors
- **Computing RR from a case-control study.** The numbers of cases and controls are fixed by the researcher;
  a true incidence is unobtainable — **report OR only**.
- **Reading OR as RR.** When the outcome is common, OR **exaggerates** the effect (see [Chapter 3](./03-cohort)
  and [Health Statistics Chapter 12](/en/Health-statistics/12-bivariate-association)).
- **Matching on a suspected cause.** This error is **irreversible** — the factor can no longer be studied.
- **Using only prevalent cases.** Those with a long course and long survival are over-selected; if exposure
  relates to survival, the result is systematically distorted (**prevalent–incident case bias**).
- **Using hospital controls without considering admission rates.** Diseases differ in their probability of
  admission, so the two groups are not comparable in "chance of being hospitalised" (**admission-rate
  bias**).
- **Analysing matched data as unmatched.** A 1:1 matched design carries pairing information; an ordinary
  $\chi^2$ test throws it away.
:::

## Summary

1. **A case-control study groups by outcome and traces exposure retrospectively**; its direction is effect
   to cause, and it is observational.
2. Because **the denominator is artificial**, **only OR can be computed, not RR**, and **causation cannot be
   established**.
3. Its greatest value is **studying rare diseases**: fast, economical, and able to analyse several factors at
   once.
4. **Matching** controls confounders and improves efficiency, but a **suspected cause must never be
   matched**, the ratio should not exceed 1:4, and overmatching must be avoided.
5. OR $>1$ positive, $<1$ negative, $=1$ none; **a 95% confidence interval is mandatory**.
6. Versus the cohort study: cohort runs cause to effect, computes RR, expensive but hard; case-control runs
   effect to cause, computes only OR, quick but soft.

## How this connects to the other courses

- The $\chi^2$ test and Yates' correction for 2×2 tables → [Health Statistics Chapter 10, Chi-Square Tests](/en/Health-statistics/10-chi-square)
- The relation between OR and RR → [Health Statistics Chapter 12, Bivariate Association](/en/Health-statistics/12-bivariate-association)
- Sample size for case-control studies (including individual matching) → [Health Statistics Chapter 17](/en/Health-statistics/17-sample-size)
- McNemar's test for matched data → [Information Technology Lecture 14](/en/intro-it/14-goodness-of-fit-and-contingency)
- Previous chapter: [Cohort Study](./03-cohort); the bias of this chapter → [Bias and Its Control](./05-bias)
