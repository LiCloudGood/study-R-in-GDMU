---
layout: doc
title: '5. Bias and Its Control'
---

# Chapter 5. Bias and Its Control

::: info Translation status
Translated from the [Chinese original](/Epidemiology/05-bias). Numbers, formulas, and R code are identical
to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The previous chapter said "a case-control study offers more opportunities for bias". What does that mean
> exactly? This chapter splits "why results go wrong" into three families and thirteen types, and gives
> countermeasures for each stage. **It is the most practical chapter of the course** — judging whether a
> paper can be trusted mostly comes down to whether it reports its biases.

## What this chapter is for

A counter-intuitive fact: **bias cannot be fixed by a bigger sample**.

Sampling error is a matter of **luck** — the larger the sample, the closer to the truth. Bias is a matter of
**direction** — the larger the sample, the more **precisely** the wrong conclusion is estimated.

The classic example: a study recruits "healthy workers" from a factory and analyses the relation between an
exposure and health. These workers are employed precisely because they are healthy, so their incidence is
naturally lower than in the general population — this is **susceptibility bias** (the healthy worker
effect). Recruit another hundred thousand and not one bit of the distortion disappears.

So the chapter answers three questions:

1. What counts as bias (and how does it differ from random error)?
2. What kinds of bias are there, and how does each arise?
3. How is bias prevented at the **design, implementation and analysis** stages?

<TrackList :tasks="['Distinguish bias from random error and explain why a larger sample cannot remove bias', 'Name the three families of bias and the difference between them', 'List the common types of selection and information bias with an example of each', 'State the conditions for a confounder', 'Give countermeasures for a given bias at the design, implementation and analysis stages', 'Identify which bias a published study is most likely to suffer from']" />

## 1. Definition of bias

### Two families of error

A result deviates from the truth for only two reasons:

| Type | Source | Feature | Removable? |
| --- | --- | --- | --- |
| **Random error** (sampling error) | Individual variation + sampling | **No direction**; fluctuates around the truth | Cannot be removed, only **reduced** by design and sample size |
| **Systematic error** | Measurement, selection, confounding, … | **Has a direction**; systematically high or low | **Can be avoided** through good design and analysis |

**Systematic error is called bias in epidemiology.**

### Definition

> **Bias** is a phenomenon, caused by **known or controllable** reasons, in which the study result or
> inference **systematically deviates from the truth**.

Three points:

1. **Systematic** — not random fluctuation but a shift in one direction;
2. **From known or controllable causes** — therefore **avoidable**; this is what study design is for;
3. **Deviates from the truth** — including both a biased result and a biased **inference** (extrapolation).

::: warning Bias ≠ sampling error
- Sampling error: too small a sample **happens** to be unrepresentative → enlarging the sample helps;
- Bias: the **selection, measurement or analytic logic** itself is flawed → enlarging the sample **only
  estimates the error more precisely**.

Whenever you hear "the sample was large, so it must be reliable", be suspicious: **a large sample cannot
rescue a bad design**.
:::

## 2. Classification of bias

By the stage at which it arises:

```
Bias
├── 01 Selection bias   ←  how subjects were selected
├── 02 Information bias ←  how data were measured and asked
└── 03 Confounding bias ←  a third factor interfering
```

### 01 Selection bias

**Definition**: during an epidemiological study, **inappropriate selection methods** cause a **systematic
difference between those included and those not included**, producing selection bias.

**Why it arises**: differences in symptom severity, access to care, awareness of the disease, and in the
health-care system and socio-economic conditions produce **different admission rates**, which may
**exaggerate or mask** the true relation between a factor and a disease.

**Seven common types**:

| Type | Meaning | Typical setting |
| --- | --- | --- |
| **Admission-rate bias** (Berkson) | With hospital patients as subjects, differing **admission rates** for different diseases falsely amplify or reduce differences between groups | Hospital-based case-control studies |
| **Detection-signal bias** | The factor itself produces **symptoms of the study disease**, leading to earlier consultation and detection, creating a spurious association | A drug causing slight bleeding → more visits → more early lesions found |
| **Prevalent–incident case bias** (Neyman) | Using **prevalent cases**: those with a long course and long survival are more likely to be selected; if exposure relates to survival the result is distorted | Studying a lethal factor using only survivors |
| **Non-response bias** | Subjects **refuse or fail to answer**, and non-responders differ systematically from responders | Patients unwilling to cooperate in a health survey |
| **Loss-to-follow-up bias** | Subjects **drop out**, and dropouts are unbalanced between groups | Multi-year cohort follow-up |
| **Time-effect bias** | Subjects **enter the study at different times**, experiencing different external changes, making groups incomparable | Cases accrued over many years |
| **Susceptibility bias** | Subjects differ from the target population in **intrinsic susceptibility** | **Healthy worker effect** |

> "Susceptibility bias" and the "healthy worker effect" are two names for the same thing: **those selected
> were healthier to begin with**.

### 02 Information bias

**Definition**: during data collection, flaws in **measurement methods, questioning or diagnostic criteria**
produce systematic error between the result and the truth.

**Six common types**:

| Type | Meaning | Typical setting |
| --- | --- | --- |
| **Recall bias** | Subjects remember **past exposure** inaccurately or incompletely, and cases and controls differ in recall quality | Cases try harder to recall exposures |
| **Reporting bias** | Subjects **conceal or exaggerate** information because of concerns or consequences | Questions about sexual behaviour, income, smoking |
| **Diagnostic suspicion bias** | Because the researcher **knows the hypothesis**, the exposed group is examined more carefully | Exposed group investigated more thoroughly in a cohort study |
| **Exposure suspicion bias** | The researcher **knows the outcome** and probes exposures more thoroughly in cases | Cases questioned in more detail in a case-control study |
| **Measurement bias** | Instruments, reagents, methods or operators inconsistent or systematically biased | Different reagent lots, different operators |
| **Publication bias** | **Positive results are more likely to be published**, overestimating effects in the literature | Meta-analysis (see [Health Statistics Chapter 16](/en/Health-statistics/16-meta-analysis)) |

> **Recall vs reporting bias**: the former is "**cannot remember**" (a memory problem), the latter is
> "**do not want to say**" (a willingness problem). Their controls differ completely: recall bias needs
> **objective records** (charts, lab reports), reporting bias needs **anonymity** and reassurance.

> **Diagnostic and exposure suspicion bias** both come from "the researcher knows too much" — hence the
> countermeasure is **blinding**.

### 03 Confounding bias

**Definition**: confounding bias is when **the degree of association between the study factor and the
disease is distorted or disturbed by other factors**.

The responsible factor is a **confounder**, with two conditions:

1. **Associated with the disease**;
2. **Related to the study factor**.

If a confounder is **unbalanced between the compared groups**, it can **mask or exaggerate** the true
relation.

::: tip Three conditions for a confounder (all required)
1. Associated with the **disease** (a risk factor for it);
2. Associated with the **exposure** (distributed differently between exposed and non-exposed);
3. **Not** an **intermediate link** in the causal chain between exposure and disease.

Condition 3 is most often forgotten: if a factor lies on the chain "exposure → factor → disease", it is a
**mediator**, and controlling it can cancel the real effect.

A classic example: serum triglycerides and coronary heart disease appear related, but coronary heart
disease also relates to LDL and HDL cholesterol; after statistically balancing these, the association
disappears.
:::

### Comparing the three

| | Selection bias | Information bias | Confounding bias |
| --- | --- | --- | --- |
| **Where it goes wrong** | Who is included | How it is measured/asked | Whether a third factor interferes |
| **Essence** | The groups were **never comparable** | Measurements inaccurate **and unequally so** | The effect is **mixed with a third factor** |
| **Typical examples** | Admission-rate bias, healthy worker effect | Recall bias, measurement bias | Age, sex, disease severity |
| **Fixable afterwards?** | **Essentially no** (already recruited) | Partly (objective records) | **Yes** (stratification, multivariable analysis) |

> This comparison is useful: **selection bias is hardest to fix** (people are already chosen),
> **confounding is easiest** (can be controlled at analysis), **information bias sits in between**.

## 3. Control of bias

Three stages, each with its own emphasis.

### Design stage (the most important)

| Against | Measures |
| --- | --- |
| **Selection bias** | **Random sampling**; explicit **inclusion and exclusion criteria**; **multiple control groups** |
| **Information bias** | Prefer **objective indicators** (tests, records) over subjective reports |
| **Confounding bias** | **Randomisation**, **restriction** (select only one stratum), **matching** |

### Implementation (data collection) stage

| Against | Measures |
| --- | --- |
| **Selection bias** | **Follow the design strictly**; do not change or exclude subjects arbitrarily; raise the response rate and reduce loss to follow-up |
| **Information bias** | **Uniform training** of interviewers; **blinding**; **standardise instruments and reagents**; unify questionnaires and questioning |
| **Confounding bias** | Record possible confounders completely and accurately, leaving room for analysis-stage control |

### Analysis stage

| Against | Measures |
| --- | --- |
| **Selection bias** | **Standardisation** (removing compositional differences); stratification, multivariable analysis; sensitivity analysis |
| **Information bias** | Generally **cannot be corrected at analysis** — only prevented earlier. Sensitivity analysis can estimate the impact |
| **Confounding bias** | **Stratified analysis**, **standardisation**, **multivariable analysis** (confounders as covariates) |

::: warning One iron rule
**Bias control must be designed in advance.**

Selection bias, once present, is almost impossible to correct afterwards (you cannot add back those never
selected). Information bias, once measured wrongly, contaminates the raw data. Only confounding can be
partly rescued at analysis by stratification and multivariable models.

So **study design is the only real defence**. That is also why, when appraising a paper, you read its
**design** first — not its P value.
:::

## Common pitfalls

::: warning Six frequent errors
- **Assuming a large sample means no bias.** The opposite: the larger the sample, the worse the consequence,
  because the wrong conclusion looks more "solid".
- **Confusing random error with bias.** Random error is reduced by **sample size**; bias is avoided by
  improving **design and measurement**.
- **Ignoring admission-rate bias in a case-control study.** Diseases differ in admission rates, so hospital
  controls are inherently incomparable.
- **Studying a lethal factor using only prevalent cases.** Underestimates the effect, possibly reversing its
  direction (prevalent–incident bias).
- **Controlling a mediator as if it were a confounder.** This can "control away" the true effect and yield a
  false "no association".
- **Trying to fix everything at the analysis stage.** Selection bias not controlled at design cannot be
  rescued later.
:::

## Summary

1. **Two families of error**: random error (no direction, reducible but not removable) and systematic error
   (**i.e. bias**, directional, avoidable).
2. **Three families of bias**:
   - **Selection bias** (7 types): admission-rate, detection-signal, prevalent–incident, non-response,
     loss-to-follow-up, time-effect, susceptibility (healthy worker effect);
   - **Information bias** (6 types): recall, reporting, diagnostic suspicion, exposure suspicion,
     measurement, publication;
   - **Confounding bias**: the confounder must be related to the disease, related to the exposure, and not a
     mediator.
3. **Control by stage**:
   - **Design** — random sampling, inclusion/exclusion criteria, multiple controls, randomisation,
     restriction, matching, objective indicators;
   - **Implementation** — follow the design, uniform training, blinding, standardised instruments and
     reagents;
   - **Analysis** — standardisation, stratification, multivariable analysis.
4. **Selection bias is hardest to fix, confounding easiest, information bias in between** — so design is the
   only real defence.

## How this connects to the other courses

- Sampling error and sample size → [Health Statistics Chapter 1](/en/Health-statistics/01-introduction),
  [Chapter 17](/en/Health-statistics/17-sample-size)
- Confounder control in experimental design (exclusion, balancing, standardisation) → [Health Statistics Chapter 3](/en/Health-statistics/03-study-design)
- Stratified and multivariable analysis → [Health Statistics Chapter 12](/en/Health-statistics/12-bivariate-association),
  [Chapter 13](/en/Health-statistics/13-linear-regression)
- Standardisation of rates → [Health Statistics Chapter 5](/en/Health-statistics/05-describing-qualitative-data)
- Publication bias and funnel plots → [Health Statistics Chapter 16](/en/Health-statistics/16-meta-analysis)
- Previous chapter: [Case-Control Study](./04-case-control);
  next chapter: [Causation and Causal Inference](./06-causal-inference) — only after ruling out bias can we
  talk about causation
