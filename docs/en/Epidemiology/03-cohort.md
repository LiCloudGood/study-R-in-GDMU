---
layout: doc
title: '3. Cohort Study'
---

# Chapter 3. Cohort Study

::: info Translation status
Translated from the [Chinese original](/Epidemiology/03-cohort). Numbers, formulas, and R code are
identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> A cohort study asks a very direct question: **within the same population, who is more likely to develop
> the disease over time — those exposed to a factor or those not exposed?** It sorts by "cause" first and
> then waits for "effect", which makes it **the only observational design that can compute a true
> incidence rate and therefore RR directly**.

## What this chapter is for

A descriptive study can tell you "this disease is common among smokers", but that is only a
**phenomenon**. To say "smoking causes this disease", at the very least one thing must hold:
**smoking comes first, the disease comes later**.

Cohort studies are designed for exactly that: at the start, everyone is **free of the disease**; they are
split by exposure; then comes the **wait** — observing who develops the disease first. Because the
denominator is a real number of people and the time is real follow-up, the **incidence** in both groups can
be computed directly, and hence "how many times more the exposed group is".

And the problems follow immediately:

- Who guarantees that the two groups are otherwise alike? If a third of a cohort is lost over ten years, is
  the result still trustworthy?
- How large a sample, and how long a follow-up?
- Once you have an incidence rate, is a single "how many times" enough?

This chapter walks through concept → design → analysis → interpretation → strengths and limits.

<TrackList :tasks="['Explain why a cohort study must run from cause to effect', 'Distinguish fixed from dynamic cohorts, and which incidence measure each needs', 'Compute cumulative incidence, incidence density and person-time', 'Compute RR, AR, AR%, PAR and PAR% and explain each', 'Explain the difference between RR and AR: aetiological versus public-health meaning', 'List the four advantages and five limitations of a cohort study']" />

## Core concepts

### Three things to get straight first

**1. Exposure**

Contacting a substance, possessing a characteristic, or being in a certain state. These characteristics,
factors or states are collectively called **exposure factors**. Note that "exposure" is **broad**:
smoking, alcohol, occupational contact, radiation — even age, sex and sub-health status can count.

**2. Cohort**

A group of people who share an experience or a common exposure characteristic. By how members enter and
leave:

| Type | Membership | Which measure of incidence |
| --- | --- | --- |
| **Fixed cohort** | During follow-up **no new members join** and none leave except through the outcome | **Cumulative incidence** |
| **Dynamic cohort** | Members leave and new members join continuously | **Incidence density** (denominator = person-time) |

> This distinction is not pedantry: if the population is **fixed**, the denominator is "the number at the
> start" and the result is cumulative incidence; if the population is **dynamic**, follow-up time differs
> between individuals and the denominator must become **person-time**, otherwise it means nothing.

**3. Risk factor**

Broadly, a factor that can cause a specific adverse outcome or increase its probability, including
behaviour, lifestyle, environment and heredity. It is the counterpart of protective factors; both can be
study factors and are jointly called **determinants** or **influencing factors**.

### The basic principle

Subjects are divided by **whether they are exposed** to the study factor (or its level) into an
**exposed group E** and a **non-exposed group Ē**; they are followed for a certain time and the
**incidence** of the outcome compared, in order to analyse the relationship between exposure and outcome.

Two points to note:

- Exposure is not given by the researcher, nor randomly allocated: it **objectively existed before the
  study** — this is precisely what separates a cohort study from an experimental study.
- Grouping need not be binary: it can also be by **level** of exposure (high, medium, low), preparing for
  a dose–response analysis.

### Direction: from cause to effect

A cohort study starts **now** and ends **in the future**: exposure is established first, outcome observed
longitudinally. Because exposure is known before the outcome, it **satisfies the temporal order required
for causation** — hence its relative strength in testing causal hypotheses.

## Four basic features

| Feature | Meaning |
| --- | --- |
| **Observational** | Exposure is neither given nor randomly allocated; it is not determined by the researcher — the boundary with experimental studies |
| **A control group** | A comparison group is set up at the design stage; it may come from the same population or a different one |
| **Cause to effect** | Exposure is established at the outset, before disease occurs; the causal relation is sought afterwards, satisfying temporal order |
| **Relatively strong for causation** | Having measured exposure and followed up outcomes, **incidence can be computed accurately** and the risk in the exposed estimated |

## Uses

1. **Testing aetiological hypotheses** — the main purpose. One study can test one exposure against one
   disease (smoking and lung cancer) or one exposure against several outcomes (smoking and lung cancer,
   coronary heart disease, chronic bronchitis).
2. **Evaluating the effect of preventive measures** — when prevention is a **self-chosen behaviour**
   (eating more vegetables, quitting smoking), a cohort study can evaluate it; such situations are also
   called "**natural experiments in populations**".
3. **Studying the natural history of disease** — clinical observation sees one patient from onset to
   recovery or death; a cohort study sees the **whole process in a population**, including subclinical
   stages.
4. **Post-marketing surveillance of new drugs** — phase III trials are limited in sample size and duration,
   so large post-marketing follow-up is effectively a cohort study with a longer observation period and a
   larger sample, with adverse reactions as outcomes.

## Three study types

By the relation between when subjects enter the cohort and when observation ends:

| Type | Information on exposure and outcome | Time span | Features |
| --- | --- | --- | --- |
| **Prospective cohort** | Outcome has not occurred at the start; follow-up needed | Now → future | The basic type; accurate data, less bias, but costly and slow |
| **Historical (retrospective) cohort** | Both exposure and outcome **already exist** in historical records | Past → now | Completed quickly; relies on accurate, complete historical data |
| **Ambispective cohort** | Historical data + continued prospective follow-up | Past → now → future | Combines the advantages of both |

> All three are **cause-to-effect in nature**; the difference is only whether data are sought backwards or
> awaited forwards.

## Design and implementation

### ① The study factor (exposure)

- A cohort study **usually studies one exposure factor** (one exposure can have several outcomes).
- **Clear definition, selection and measurement** are essential. For example, when studying smoking and
  lung cancer, "smoker" must be defined as "smoking at least one cigarette a day for more than a year" —
  an unclear definition makes results uninterpretable.
- Quantitative factors need explicit units; when accurate quantitative data are hard to obtain, **grading**
  by exposure level is acceptable — recording **route** and **duration** of exposure for later
  dose–response analysis.
- Measurement should be **sensitive, precise, simple and reliable**.

### ② The outcome variable

The expected result event in the subject. Mainly:

- Onset, death, changes in physiological and biochemical indicators;
- Changes in health status and quality of life;
- Both quantitative (blood pressure, blood glucose) and qualitative (onset, recovery).

Requirements: **criteria must be explicit, uniform and strictly applied**; the outcome is the **end of
follow-up for that individual** (those with the outcome are no longer followed; the rest are followed to
the end of the observation period); the more outcomes studied, the more factors must be balanced and the
greater the workload.

### ③ Subjects

The **study site** is the source of subjects, and should have: enough eligible subjects, good medical
facilities, local support, a relatively stable population and convenient transport — all to **reduce loss
to follow-up**.

Principles: **representativeness, freedom from the study disease, comparability**. Both groups are free of
the outcome at the start but may develop it during follow-up.

**Four sources of the exposed group:**

| Source | Suitable for |
| --- | --- |
| **Occupational groups** | Suspected occupational exposure and disease/health status |
| **Special exposure groups** | A **rare exposure** (e.g. radiation and leukaemia) |
| **General population** | Exposure is common in the general population (genetic traits, diet, habits) |
| **Organised groups** | Medical associations, schools, the military — easy to follow up |

**Four forms of control group** (the requirement: identical to the exposed group in everything except
exposure):

| Form | Approach | Notes |
| --- | --- | --- |
| **Internal control** | Within one study population, the exposed are the exposed group and the rest the controls | Easiest and most comparable; for graded exposure, the lowest level can serve as control |
| **External control** | A separate group outside the exposed population | Used when the exposed group is special; comparability needs extra care |
| **General-population control** | Use the whole population's rates as reference | Data easy to obtain but often incomparable; usually requires **standardisation** |
| **Multiple controls** | Two or more of the above | More robust conclusions, more work |

### ④ Sample size

- The control group should be **no smaller** than the exposed group; usually equal.
- **Loss to follow-up must be anticipated** and the sample enlarged accordingly.

### ⑤ Data collection and follow-up

**Baseline data**: exposure data, data needed to judge the outcome, demographic data, and factors that may
cause confounding. Routes: existing records, interviews, physical examination, laboratory tests,
environmental measurement.

**Follow-up**: specify whom to follow, what to collect, how, and for how long.

## Data management and analysis

### Step 1: describe characteristics and check comparability

Describe the distribution of age, sex, ethnicity, occupation and residence in both groups, and run a
**balance test** to judge comparability. This is the precondition for all later analysis.

### Step 2: choose the right denominator — cumulative incidence vs incidence density

| Cohort type | Measure | Denominator | Range |
| --- | --- | --- | --- |
| **Fixed cohort** | **Cumulative incidence** | Total number at the start | 0 – 1 |
| **Dynamic cohort** | **Incidence density** | **Person-time** (person-years) | 0 – ∞ |

Why can a dynamic cohort not use "total number" as the denominator? Because follow-up is long and the
population unstable: entry dates differ, migration or competing death causes loss to follow-up, and the
time to the endpoint differs — each person's **observed time** is different. Someone who withdrew might
have developed the disease had they stayed, and counting by total number discards that contribution.

### Person-time

**Person-time** = number of people × observation time, usually **person-years**. Three methods:

1. **Individual-level** exact calculation (sum each person's time from entry to exit/onset);
2. **Approximation** (average population × years of observation);
3. **Life-table method** (computed by interval; suitable for large samples with only grouped information).

### Step 3: standardised ratio (SMR)

When the study population is small and the outcome rare, so that a rate **cannot be computed reliably**,
use the whole population's rate as standard, compute the **expected** number of cases, and compare with the
observed:

$$\text{SMR} = \frac{\text{observed deaths (cases)}}{\text{expected deaths (cases)}}$$

- $\text{SMR} = 1$: risk equals the standard population;
- $\text{SMR} > 1$: higher — SMR times that of the standard population;
- $\text{SMR} < 1$: lower.

Conditions: low outcome incidence, rate not directly computable, whole population as reference.
Note **SMR is not a rate but a ratio**, with an epidemiological meaning similar to RR.

### Step 4: significance testing

When the two rates differ, first exclude sampling error: for **high incidence** use the $z$ test or
$\chi^2$ test; for **low incidence** use the binomial or Poisson distribution.

## Measures of association: five indices

This is the heart of the chapter. They fall into two families: **ratios** (RR) and **differences** (AR and
its relatives).

### Relative risk (RR)

$$\text{RR} = \frac{\text{incidence in the exposed}}{\text{incidence in the non-exposed}} = \frac{I_e}{I_0}$$

Meaning: **the risk of disease or death in the exposed is RR times that in the non-exposed**. The larger
the RR, the greater the effect and the stronger the association.

| RR | Strength of association |
| --- | --- |
| 0.9–1.0 or 1.0–1.1 | None |
| 0.7–0.8 or 1.2–1.4 | Weak |
| 0.4–0.6 or 1.5–2.9 | Moderate |
| 0.1–0.3 or 3.0–9.9 | Strong |
| < 0.1 or ≥ 10 | Very strong |

Because the sample RR is only a point estimate subject to sampling error, a **95% confidence interval** must
be given (Miettinen's or Woolf's method). **If the interval includes 1, no association can be claimed.**

### Attributable risk (AR)

$$\text{AR} = I_e - I_0$$

Meaning: the **excess number of cases** in the exposed compared with the non-exposed; equivalently, the
number of cases that would be prevented in the exposed if exposure were eliminated. Also called the risk
difference.

### Attributable risk percent (AR%, aetiological fraction)

$$\text{AR}\% = \frac{I_e - I_0}{I_e} \times 100\%$$

Meaning: the proportion of disease (or death) **in the exposed that is attributable to exposure**.

### Population attributable risk (PAR)

$$\text{PAR} = I_t - I_0$$

where $I_t$ is the rate in the total population and $I_0$ that in the non-exposed.
Meaning: the excess incidence in the **general population** caused by exposure; the number of cases that
would be prevented in the total population if exposure were eliminated.

### Population attributable risk percent (PAR%)

$$\text{PAR}\% = \frac{I_t - I_0}{I_t} \times 100\% \quad\text{or}\quad \text{PAR}\% = \frac{P_e(\text{RR}-1)}{P_e(\text{RR}-1)+1} \times 100\%$$

where $P_e$ is the prevalence of exposure in the total population.
Meaning: the percentage of all disease (or death) in the total population **attributable to exposure**.

### ★ RR versus AR (the distinction most often examined)

| | RR | AR |
| --- | --- | --- |
| Type | Ratio (relative) | Difference (absolute) |
| Question | How many times that of the **non-exposed**? | How many **extra cases in the population**? |
| Meaning | **Aetiological** — is the factor a cause? | **Public health / preventive** — how many can be saved? |
| Typical conclusion | Smoking's RR for **lung cancer** is large: smoking is an important cause | The AR of quitting for **cardiovascular disease** is large: quitting yields greater public-health benefit |

> One-line memory aid: **RR looks at "how many times", AR looks at "how many people"**.
> A factor can have a high RR but low AR (a strong risk factor for a rare disease), or a modest RR but high
> AR (a weak risk factor for a common disease). The former suits aetiological research, the latter
> population intervention.

## R code: computing the five indices

Using a **constructed example** (for illustration only, not a real study finding):

- Smokers: 1,000 people, 50 cases; non-smokers: 2,000 people, 20 cases.

```r
# 2x2 table: rows = exposure, columns = disease
a <- 50    # cases among exposed
b <- 1000 - a   # non-cases among exposed
c <- 20    # cases among non-exposed
d <- 2000 - c   # non-cases among non-exposed

# incidence in each group
Ie <- a / (a + b)        # exposed   0.05
I0 <- c / (c + d)        # non-exposed 0.01

RR <- Ie / I0            # relative risk
AR <- Ie - I0            # attributable risk
ARp <- AR / Ie           # attributable risk percent

# total population
It <- (a + c) / (a + b + c + d)
PAR <- It - I0           # population attributable risk
PARp <- PAR / It         # population attributable risk percent
Pe <- (a + b) / (a + b + c + d)   # prevalence of exposure

cbind(Ie, I0, RR, AR, ARp, It, PAR, PARp, Pe)
```

Results: $I_e=0.05$, $I_0=0.01$, $\text{RR}=5$, $\text{AR}=0.04$, $\text{AR}\%=80\%$,
$I_t\approx0.0233$, $\text{PAR}\approx0.0133$, $\text{PAR}\%\approx57.1\%$, $P_e\approx0.333$.

The PAR% can be checked with the $P_e$ formula:

$$\frac{0.333\times(5-1)}{0.333\times(5-1)+1} = \frac{1.333}{2.333} \approx 57.1\%$$

::: tip Two common hand-calculation errors
1. **Using $I_0$ as the denominator of AR%**. The denominator of AR% is the **exposed** group's incidence
   $I_e$ (the question is "what share of the exposed group's disease is due to exposure"); the denominator
   of PAR% is the **total population** rate $I_t$.
2. **Computing a confidence interval for RR but not reading it**. RR is a point estimate and needs a 95% CI;
   **if the interval crosses 1, there is no statistically significant association** — do not interpret the
   point estimate as a multiple.
:::

## Advantages and limitations

### Advantages

1. **Satisfies the temporal order of causation** — exposure first, outcome later;
2. **Data are relatively accurate and reliable** — exposure and outcome collected prospectively to uniform
   standards;
3. **RR and AR can be estimated directly** — because incidence is computable (unlike case-control studies);
4. **One study can observe several diseases** — one exposure, many outcomes.

### Limitations

1. **Consumes manpower, materials, money and time** — especially prospective studies;
2. **Loss-to-follow-up bias** — those lost are usually not lost at random; the main threat;
3. **High design requirements and complex implementation**;
4. **Unsuitable for diseases with very low incidence** — requires enormous samples;
5. **Unknown variables may enter or known ones change during follow-up**, complicating analysis.

## Common pitfalls

::: warning Traps to avoid
- **"Cohort" is not simply "a group of people at the same time".** Fixed and dynamic cohorts need different
  denominators; using the wrong incidence measure makes the number meaningless.
- **Treating RR as an incidence rate.** RR is a **ratio** of two rates and is dimensionless; "RR = 5" does
  not mean "incidence 5%".
- **Reporting RR but not AR.** Public-health decisions need AR — for a rare disease, even a high RR may mean
  little at population level.
- **Concluding despite a high loss to follow-up.** Loss should generally be kept below 10%; if losses are
  unbalanced between groups the conclusion is systematically distorted, and **a larger sample cannot fix
  it**.
- **Confusing a historical cohort with a case-control study.** Both use historical data, but grouping
  differs: a historical cohort groups by **exposure**, a case-control study by **outcome** — the former is
  still cause-to-effect.
:::

## Summary

1. **A cohort study groups by exposure and compares outcome incidence**; its direction is cause to effect,
   making it the strongest observational design for testing causal hypotheses.
2. **Fixed cohorts use cumulative incidence; dynamic cohorts use incidence density (person-time)** — choose
   the wrong denominator and everything fails.
3. **Five measures of association**: RR (ratio), AR (difference), AR% (share in the exposed), PAR (excess in
   the population), PAR% (share in the population).
4. **RR is an aetiological measure, AR a public-health measure** — the single sentence to remember.
5. Advantages: clear temporal order, reliable data, direct RR/AR, one cause many effects. Disadvantages:
   costly and slow, prone to loss to follow-up, unsuitable for rare diseases.

## How this connects to the other courses

- The 2×2 table test for cohort data → [Health Statistics Chapter 10, Chi-Square Tests](/en/Health-statistics/10-chi-square)
- The relation between OR and RR → [Health Statistics Chapter 12, Bivariate Association](/en/Health-statistics/12-bivariate-association)
- Incidence, prevalence, standardised mortality, SMR → [Health Statistics Chapter 18, Vital Statistics](/en/Health-statistics/18-vital-statistics)
- Survival analysis (with censoring), HR → [Health Statistics Chapter 14, Survival Analysis](/en/Health-statistics/14-survival-analysis)
- Sample size for cohort studies → [Health Statistics Chapter 17, Sample Size Estimation](/en/Health-statistics/17-sample-size)
- Next chapter: [Case-Control Study](./04-case-control) — reversing the time direction and using OR
- The bias most feared in a cohort study → [Bias and Its Control](./05-bias)
