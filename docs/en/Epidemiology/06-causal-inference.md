---
layout: doc
title: '6. Causation and Causal Inference'
---

# Chapter 6. Causation and Causal Inference

::: info Translation status
Translated from the [Chinese original](/Epidemiology/06-causal-inference). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The previous chapter ruled bias out. Once it is out, can the remaining association be called "causal"?
> **Not yet.** This chapter supplies two sets of tools: **Mill's canons** (how to infer cause from
> phenomena) and **Hill's criteria** (how to judge whether an association is strong enough to count as
> causal).

## What this chapter is for

Two real study conclusions are put before you:

1. "The incidence of lung cancer in smokers is 10 times that in non-smokers";
2. "In months when ice-cream sales are high, drownings are also high".

Both are **statistically significant positive associations**, yet only one can be called causal.
What separates them? — **temporal order** (does eating ice cream precede drowning? No — both are driven by
temperature), **biological plausibility** (smoking has a carcinogenic mechanism; ice cream does not),
**dose–response** (more cigarettes, higher risk; eating more ice cream does not make drowning more likely) …

So "association ≠ causation" is not a platitude — behind it sits **a checklist you can go through item by
item**. This chapter explains where that checklist comes from, how to use it, and where its limits lie.

<TrackList :tasks="['State the epidemiological definition of a cause and its two qualifications', 'Draw the epidemiological triangle and the wheel model and explain the difference', 'Name the three families of causal models and give examples of causal chains and webs', 'State the five Mill canons with an epidemiological example of each', 'Point out the four shortcomings of the Mill canons', 'Recite the ten Hill criteria and say which three are necessary conditions', 'Explain why a statistical association is not a causal association']" />

## 1. Definition of a cause

> In epidemiology a cause is generally called a **risk factor**: a factor that raises the probability
> (risk) of the disease occurring.

But "association" is not enough; the definition carries two qualifications:

1. **The risk factor must occur before the disease** — the temporal order cannot be reversed;
2. **The "raised probability" must not be disturbed by other factors** — confounding and bias must already
   have been excluded.

> These two qualifications correspond exactly to the relation between the previous chapter and this one:
> **Chapter 5 removes interference, Chapter 6 judges causation.**

## 2. Causal models

A causal model is the framework that organises how we imagine causes. The course presents three.

### 01 Ecological model

Considers **host and environment as a whole** — the classic epidemiological view of causation.

#### Epidemiological triangle

```
             Host
              /\
             /  \
            /    \
        Agent —— Environment
```

- **Host**: the person (or animal), including heredity, immunity, nutrition and behaviour;
- **Agent**: the aetiologic factor (biological, chemical, physical);
- **Environment**: the external conditions allowing the agent to act on the host.

All three must be **present and interacting** for disease to occur. A change in any corner can break the
balance.

#### Wheel model

```
        ┌───────────────┐
        │  Biological   │
        │   ┌───────┐   │
        │   │ Host  │   │
        │   │ ┌───┐ │   │
        │   │ │Gene│ │   │  ← core
        │   │ └───┘ │   │
        │   └───────┘   │
        │  Social  Physical │
        └───────────────┘
```

The wheel model puts the **host at the centre**, wrapped in a **genetic core** and an **environment**
(biological, social, physical-chemical). It stresses both the host's genetic constitution and the
multi-layered environment more than the triangle does.

> **Difference in one sentence**: the triangle places host, agent and environment **side by side**; the wheel
> places the host at the **centre** with the environment **surrounding** it and distinguishes a genetic core.

### 02 Causal-factor model (proximate / distal)

Layers causes by **distance from the disease**:

```
Socio-economic factors ┐
Biological factors     │
Environmental factors  ├→ biomedical factors (mechanism) → disease
Psychological/behaviour│
Health-care factors    ┘
```

- **Distal causes**: upstream factors such as socio-economics, culture and policy;
- **Proximate causes**: downstream factors acting directly on the body (blood pressure, glucose, lipids).

The value of the model: **intervening on distal causes reaches more people but acts slowly; intervening on
proximate causes acts fast but treats symptoms**.

### 03 Causal web model (chains and webs)

#### Causal chain

Causes follow one another in a chain:

```
globalisation ┐
urbanisation  ├→ diet / physical inactivity / smoking
ageing        ┘        ↓
                 hypertension / hyperglycaemia / obesity
                          ↓
              coronary heart disease / diabetes / lung cancer
```

(This is the "distal → intermediate → proximate → disease" chain.)

#### Causal web

In reality causes are usually not one chain but an **interwoven web**: smoking, alcohol, diet, physical
activity, body-mass index, blood pressure and lipids influence one another and jointly lead to coronary
heart disease, stroke and atherosclerosis.

> **Why the web matters**: it explains why "single-factor analysis" is often insufficient — a factor's
> effect may travel along several paths in the web, or be offset by others.

## 3. Types of cause

By the role played in causation:

| Type | Meaning |
| --- | --- |
| **Necessary cause** | The disease **always** has it; without it the disease cannot occur (M. tuberculosis and tuberculosis) |
| **Sufficient cause** | Its presence is **enough** for disease (usually a complete set of several factors) |
| **Risk factor** | Raises the probability but is neither necessary nor sufficient (smoking and lung cancer) |
| **Direct / indirect cause** | Classified by distance from the disease |

> Key insight: **most chronic diseases have no single "necessary and sufficient" cause**. Modern epidemiology
> therefore prefers the concept of **risk factor** and expresses causation as **probability** rather than
> yes/no.

## 4. Basic methods of aetiological research

Three study types correspond to three steps with different tasks:

| Study type | Methods | Task |
| --- | --- | --- |
| **Descriptive** | Cross-sectional survey, case report, ecological study | **Form** the hypothesis |
| **Analytical** | Case-control, cohort | **Test** the hypothesis |
| **Experimental** | Clinical trial, field trial, community trial | **Confirm** the hypothesis |

> Mind the wording: **form → test → confirm**, with increasing strength. Descriptive studies can only
> "propose", analytical studies can "test", and only experimental studies can "confirm".

## 5. Logical methods of causal inference: Mill's canons

Mill's canons are a set of logical methods for **inferring causes from phenomena**, along two paths:
**hypothetico-deductive reasoning** and **Mill's canons** (method of agreement, of difference, of concomitant
variation, of analogy, of residues).

### The five canons with epidemiological examples

| Method | Logic | Course example |
| --- | --- | --- |
| **Agreement** | Cases share a common factor across different settings | All liver-cancer cases have hepatitis B infection |
| **Difference** | Those with the factor develop disease; those without do not | Non-cases have no hepatitis B infection |
| **Concomitant variation** | A change in the amount of the factor changes the rate | As smoking increases, the risk of lung cancer increases |
| **Analogy** | Disease A is known to be caused by X; disease B resembles A, so X is suspected | White muscle disease in animals is caused by selenium deficiency; Keshan disease shows the same pathology |
| **Residues** | After removing what known causes explain, the remainder is attributed to a new factor | After accounting for virus and aflatoxin, the remainder in liver cancer is attributed to, say, blue-green algal toxin in drinking water |

### Mill's canons and study designs

This correspondence is worth memorising — **the logic is embedded in the design**:

| Canon | Corresponding design |
| --- | --- |
| **Agreement** | **Case series**: factors **common** to patients |
| **Difference** | **Case-control**: factors present in cases and absent in non-cases |
| **Analogy** | **Descriptive and experimental** studies |
| **Concomitant variation** | **Dose–response** analysis |
| **Residues** | **Inference from an individual case**, inference of the main cause |

### Four shortcomings of Mill's canons

::: warning Why they cannot stand alone
1. **They do not consider whether the original evidence was complete** — if the premise is wrong, elegant
   reasoning is worthless;
2. **They do not appraise the validity (methodology) of the original evidence** — good and bad evidence are
   treated alike;
3. **They do not distinguish within-study from between-study information** — evidence from different sources
   is mixed;
4. **They give no quantitative definition of "consistency", making it hard to judge** — how consistent is
   consistent?
:::

> These four shortcomings are exactly why Hill's criteria are needed for a finer judgement.

## 6. Causal inference

### (1) Statistical association

> A statistical association between exposure and disease **only excludes chance; it does not imply
> causation.**

This step rules out only **random error**. A small P value means "unlikely to be a coincidence" — it says
nothing about bias, confounding or temporal order.

### (2) From association to a real association: eliminating layer by layer

Judging causation is a process of **successive elimination**:

```
        Observed association
                │
     exclude chance (random error)
                ↓
     statistically significant association
                │
     exclude spurious association (selection / measurement bias)
                ↓
        secondary association
                │
     exclude indirect association (confounding)
                ↓
        real association (causal inference)
```

| To exclude | By what |
| --- | --- |
| **Chance** | Statistical tests (P value, confidence interval) |
| **Spurious association** | Good design (sampling, measurement, blinding) — see Chapter 5 |
| **Indirect association** | Stratification, standardisation, multivariable analysis — see Chapter 5 |

> Only the "real association" left at the end of this path qualifies for appraisal by Hill's criteria.

### (3) Hill's criteria

| # | Criterion | Meaning | Status |
| --- | --- | --- | --- |
| 1 | **Temporality** | The cause must precede the effect | **Necessary** |
| 2 | **Strength** | Measures of association (RR, OR, …) between cause and disease | **Necessary** |
| 3 | **Dose–response** | Disease frequency changes with the intensity or amount of the suspected cause | **Necessary** |
| 4 | **Repeatability** | Different times, places and populations, different investigators, similar methods, same result | Very important |
| 5 | **Experimental evidence** | Experimental studies of the association | Very important |
| 6 | **Plausibility** | The hypothesis agrees with current biomedical facts, knowledge and theory | Reference |
| 7 | **Coherence** | As above, emphasising consistency with the whole body of knowledge | Reference |
| 8 | **Specificity** | The **exclusiveness or specificity** of the cause–disease relation | Reference |
| 9 | **Analogy** | A confirmed similar cause–disease relation strengthens the new one | Reference |
| 10 | **Predictive performance** (added 1991) | Derive a prediction of the future or the past from the theory, then collect data to assess its correctness | Reference |

### (4) Overall judgement

> - **Temporality is indispensable**;
> - **Strength, repeatability, dose–response and experimental evidence** are of great importance;
> - The other criteria serve as reference.
> - **Not all ten criteria must be satisfied**; **the more that are, the more likely the association is
>   causal**.

::: tip Remember the three necessary conditions
**Temporality, strength of association, dose–response** are explicitly marked as **necessary conditions** in
the course.

- **Temporality** is the baseline: causation cannot run backwards — which is why a cohort study is more
  powerful than a case-control study;
- **Strength** (how far RR/OR is from 1) indicates the size of the effect;
- **Dose–response** is the most persuasive: **more exposure, worse outcome** is hard to explain by
  confounding.

"Specificity" has been de-emphasised in modern epidemiology — chronic diseases are almost all
multi-cause/multi-effect, and demanding "one factor, one disease" is too strict (smoking causes lung cancer,
coronary heart disease and chronic bronchitis simultaneously).
:::

## Common pitfalls

::: warning Six frequent errors
- **Treating a statistical association as causal.** P < 0.05 excludes chance only, not bias, confounding or
  reversed temporality.
- **Ignoring temporal order.** A cross-sectional study measures exposure and outcome simultaneously and can
  never satisfy criterion 1.
- **Treating Hill's criteria as a scorecard.** They are a **framework for overall judgement**, not
  "satisfy N, score N"; the course explicitly says not all ten are required.
- **Insisting on specificity.** Chronic diseases are usually multi-causal; specificity is no longer a
  necessary condition.
- **Using Mill's canons without excluding bias.** Their four shortcomings are exactly why they cannot stand
  alone.
- **Treating a risk factor as "certain to cause disease".** A risk factor changes **probability**, not an
  individual's fate.
:::

## Summary

1. **A cause is a risk factor**: it raises the probability, must **precede the disease**, and must be
   **undisturbed by other factors**.
2. **Three causal models**: ecological (triangle, wheel), causal-factor (proximate/distal), causal web
   (chain/web).
3. **Four causal concepts**: necessary, sufficient, risk factor, direct/indirect.
4. **Three study types, three steps**: descriptive **forms**, analytical **tests**, experimental **confirms**.
5. **Mill's five canons**: agreement, difference, concomitant variation, analogy, residues — corresponding to
   case series, case-control, dose–response analysis, descriptive/experimental studies, and individual-case
   inference. They have **four shortcomings** and cannot stand alone.
6. **Hill's ten criteria**, of which **temporality, strength and dose–response are necessary**; the rest
   (repeatability, experimental evidence, plausibility/coherence, specificity, analogy, predictive
   performance) are reference. **The more satisfied, the more likely causal**, but **not all are required**.

## How this connects to the other courses

- Quantifying association (RR, OR, correlation) → [Health Statistics Chapter 12, Bivariate Association](/en/Health-statistics/12-bivariate-association)
- Modelling dose–response → [Health Statistics Chapter 13, Simple Linear Regression](/en/Health-statistics/13-linear-regression)
- Stratification and confounder control → [Health Statistics Chapter 10](/en/Health-statistics/10-chi-square),
  [Chapter 5](/en/Health-statistics/05-describing-qualitative-data)
- Pooling effect sizes and publication bias → [Health Statistics Chapter 16, Meta-Analysis](/en/Health-statistics/16-meta-analysis)
- Previous chapter: [Bias and Its Control](./05-bias);
  the highest level of evidence — [Experimental Epidemiology](./07-experimental)
