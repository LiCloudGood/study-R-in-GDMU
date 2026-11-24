---
layout: doc
title: '7. Experimental Epidemiology'
---

# Chapter 7. Experimental Epidemiology

::: info Translation status
Translated from the [Chinese original](/Epidemiology/07-experimental). Numbers, formulas, and R code are
identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The preceding chapters are all **observational** — the researcher records but cannot intervene. This
> chapter is different: **the researcher personally decides who receives what**. For that reason it is the
> only means, outside observational studies, of **confirming causation**.

## What this chapter is for

A cohort study can already show "smokers have more lung cancer", but one sentence can never be ruled out:
**are smokers different in other ways too?** (age, occupation, heredity, income …). A cohort study can only
**measure and adjust** these differences; it cannot **create** comparability between groups.

Experimental epidemiology does this: **let randomisation decide who receives what**.

- A homogeneous group of subjects → **randomly** allocated to an experimental and a control group;
- The experimental group receives the intervention, the control group the comparison;
- **Prospectively** observe the difference in outcome.

Randomisation has a property a cohort study can never achieve: **known and unknown confounders are, in
theory, balanced between the groups**. The difference between groups can therefore be attributed to the
intervention itself. That is the basis for "confirming causation".

The cost is immediate and direct: **ethics**. You cannot randomise people to smoke in order to study lung
cancer — so experimental studies are confined to situations where the intervention may be beneficial.

<TrackList :tasks="['State the four basic features of experimental epidemiology', 'Explain why imposing an intervention is the essential difference from observational studies', 'Distinguish clinical trials from field trials (individual and community trials)', 'Break a clinical research question down with PICO', 'Name the four types of control group with their indications and ethical issues', 'Distinguish ITT, per-protocol and as-treated analyses, and FAS/PPS/SAS', 'Compute ARR, RRR, NNT, protective rate and effectiveness index']" />

## Core concepts

### Definition

> **Experimental epidemiology**, also called an experimental study or epidemiological experiment, is an
> epidemiological method that, according to the research objective, **randomly allocates** a **homogeneous**
> group of subjects to an experimental and a control group, gives the experimental group an **intervention**
> and the control group a comparison, **prospectively** observes and compares the occurrence of the outcome
> in the two groups, and thereby judges the **effect of the intervention**.

### Principle and direction

```
Target population
   ↓ (select a homogeneous sample)
Homogeneous sample ──randomise──┬── experimental group (intervention) ── outcome+ / outcome−
                                └── control group (comparison)        ── outcome+ / outcome−
                                        ↑
                              prospective follow-up, compare outcomes
```

The time direction is still **now → future** (prospective), as in a cohort study; the difference is that
allocation is by **randomisation** rather than by who happened to be exposed.

### Four basic features

| Feature | Meaning |
| --- | --- |
| **Random allocation** | Subjects have an **equal chance** of being assigned to each group |
| **Imposed intervention** | Intervention given by the researcher: therapeutic (drugs, devices), diagnostic, preventive (vaccines, health education) |
| **A control group** | Subjects who are comparable and balanced in everything except the intervention |
| **Prospective observation** | Outcomes obtained by prospective follow-up, not from historical records |

::: tip Which feature is "essential"?
**Imposing an intervention** is the essential difference from **observational** studies — there, exposure
exists objectively and is not determined by the researcher.

**Randomisation** solves the problem of "unbalanced distribution of potential confounders" and is the key to
its strength over cohort studies.

Keep the two apart: **intervention** makes it experimental; **randomisation** makes it capable of confirming
causation.
:::

## Main types

### ① Clinical trial

> Conducted in a **hospital or other medical setting**, with **patients** as subjects, **individuals** as the
> unit of randomisation, to evaluate the effect of a **clinical intervention**.

**Five features**:

1. **Patients** as subjects;
2. Mostly in hospitals;
3. Mostly **therapeutic** trials;
4. Random allocation, with **allocation concealment** wherever possible;
5. Use of **blinding**.

> **Historical marker**: in 1948 the British Medical Journal published the world's first randomised
> controlled trial — streptomycin for pulmonary tuberculosis. The experimental group received streptomycin
> plus bed rest, the control group bed rest only; the main outcomes were 6-month survival and marked
> radiological improvement. Six-month survival was 93% versus 73%, and marked improvement 51% versus 8%.
> That study established "randomisation plus control" as the standard for evaluating efficacy.

The **randomised controlled trial (RCT)** is the typical form.

### ② Field trial

> Conducted **in the field or community**, usually with **people free of the study disease** as subjects,
> randomised **by individual or by group**, to evaluate the effect of an **intervention**.

**Five features**:

1. Subjects: **healthy** people or those free of the study disease;
2. Setting: community, school, factory — the **field**;
3. Mostly **preventive** trials;
4. Usually a **larger** sample;
5. Blinding used where possible.

**Two forms**:

| Form | Approach | Example |
| --- | --- | --- |
| **Individual trial** | Randomise **individuals**; individuals receive the intervention | Vaccination, drug prophylaxis |
| **Community trial** | The **whole community** is the unit of intervention | Salt iodisation, water fluoridation |

> The distinguishing feature of a community trial is that **intervention is allocated by group**, so the
> analysis cannot treat individuals as independent — people in the same community are not independent, which
> affects the statistical method (see Chapter 6).

## Design and implementation of a clinical trial

### ① Define the question: PICO

| Letter | Meaning | Example (end-stage renal disease) |
| --- | --- | --- |
| **P**atient | Patients in clinical practice | End-stage renal failure (uraemia) |
| **I**ntervention | Intervention | Kidney transplantation |
| **C**ontrol | Comparison | Haemodialysis |
| **O**utcome | Outcome | Survival and quality of life |

> The subjects of a clinical trial are **patients**, so ethical requirements are high: a detailed protocol
> must be prepared and submitted to the **ethics committee** before implementation.

### ② Select subjects

| Point | Requirement |
| --- | --- |
| **Diagnostic criteria** | Uniform, recognised criteria for generalisability and comparability |
| **Representativeness** | Should represent the target population, though patients are **hard to sample randomly** |
| **Inclusion and exclusion** | Strict criteria to ensure reasonable generalisability and reduce loss to follow-up |
| **Compliance** | Subjects must follow the protocol and cooperate to the end |

### ③ Estimate sample size

Two sets of formulas, for **qualitative (count) data** and **quantitative (measurement) data**
(see [Health Statistics Chapter 17](/en/Health-statistics/17-sample-size) for the computation).

### ④ Randomisation and allocation concealment

**Randomisation** gives known and unknown factors a similar distribution in both groups, ensuring balance and
comparability and thereby avoiding **selection bias** and **confounding bias**.

**Allocation concealment** prevents the randomisation sequence from being decrypted in advance. Two points:

- It is the key to implementing the randomisation scheme properly;
- **Only randomisation combined with concealment constitutes true randomisation**.

> Randomisation and concealment are two different things: randomisation decides "who goes where";
> concealment decides "nobody can guess where the next one goes before allocation". Randomise without
> concealing and the investigator may "unintentionally" adjust the order, destroying the randomisation.

### ⑤ Determine the intervention and set up controls

The **intervention** must be specified precisely and in detail **at the design stage**; **it is generally not
allowed to change during the trial**.

**Four types of control group**:

| Form | Approach | Notes |
| --- | --- | --- |
| **Positive control** | Use a conventional effective drug, standard or current best regimen | Shows superiority (or non-inferiority); fewer ethical and feasibility issues |
| **Placebo control** | Use a placebo without active ingredient (lactose, starch, saline) | Controls the **placebo effect**; raises **ethical problems** — only when no effective treatment exists or the placebo does not affect the condition |
| **Self-control** | Compare the same subject before and after the intervention | Post-intervention is the experimental condition, pre-intervention the control |
| **Mutual comparison** | Compare different doses, formulations or routes against one another | To find which regimen is best |

### ⑥ Apply blinding

| Level | Who does not know the allocation |
| --- | --- |
| **Single blind** | Only the **subjects** |
| **Double blind** | **Investigator and subjects** |
| **Triple blind** | **Investigator, subjects and data analysts** |

Blinding must in fact seal **four links**:

1. **The allocator** does not know the next assignment, so cannot choose patients;
2. **The patient** does not know the treatment, so cannot alter compliance or symptom reporting;
3. **The treating physician** does not know the group, so cannot treat them differently (even subconsciously);
4. **The outcome assessor** does not know the group, so cannot bias the measurement.

### ⑦ Define the outcome variable

- It must be specified at the design stage and **not changed afterwards**;
- Define it according to the objective, preferably with **recognised criteria**, for generalisability.

**Four principles**:

1. **Essential and specific** relation to the disease studied;
2. Capable of **objective, accurate** measurement;
3. **Feasible**;
4. **Acceptable** to subjects.

### ⑧ Collect data

Through a **case report form (CRF)**, including:

- **Baseline data**: demographics, baseline levels of the study indicators, other factors that may affect the
  result;
- **Follow-up information**: execution of the intervention, prognostic factors, whether the outcome occurred
  or how outcome indicators changed.

## Data management and analysis

### 1. Exclusions, withdrawals and loss to follow-up

| Concept | Definition | Key point |
| --- | --- | --- |
| **Exclusion** | Patients not enrolled **before randomisation**, for various reasons | **No effect on internal validity** but affects **generalisability**; the more excluded, the narrower the applicability |
| **Withdrawal** | Subjects leaving the group **after randomisation** or during the trial | Reduces sample size, breaks randomisation; if unbalanced between groups, affects validity |
| **Loss to follow-up** | Data no longer obtainable because of migration, accident or death from another cause | Generally kept **below 10%** |

**Three common reasons for withdrawal**:

1. **Ineligibility** — failing inclusion criteria, never receiving the intervention, or no data at all;
2. **Non-compliance**;
3. **Loss to follow-up**.

> A hidden trap with "ineligible" subjects: investigators often observe the experimental group more closely,
> so ineligibles are more easily detected there, and the experimental group loses more; or the opposite —
> they notice poor responders and exclude them, leaving only good responders. Both cause bias. **The remedy**:
> analyse "eligible" and "ineligible" as two subgroups; if the conclusions differ, be cautious.

### 2. Analysis datasets

| Dataset | Principle | Who is included |
| --- | --- | --- |
| **Full analysis set (FAS)** | **Intention to treat** | All randomised subjects |
| **Per-protocol set (PPS)** | **Per protocol** | Those who fully followed the protocol |
| **Safety analysis set (SAS)** | **Exposure** | All who received at least one dose and had at least one safety assessment |

> **Efficacy analysis** should use FAS and PPS; **safety evaluation** should use SAS.

### 3. Three analytical approaches

| Approach | Abbreviation | Who is compared |
| --- | --- | --- |
| **Intention-to-treat** | **ITT** | All randomised patients, **whether or not they completed or actually received the assigned treatment**, analysed in their original group |
| **Per-protocol (compliance) analysis** | — | Only subjects fully compliant with the requirements (corresponds to PPS) |
| **As-treated analysis** | — | Subjects who **actually received** the intervention, irrespective of design |

**Purpose of ITT**: to avoid **selection bias** and keep the groups comparable.

### 4. Efficacy versus effectiveness

| Concept | Meaning | Corresponding analysis |
| --- | --- | --- |
| **Efficacy** | Effect under **ideal conditions** — subjects truly accepted and completed the treatment | PPS / per-protocol analysis |
| **Effectiveness** | Effect under **ordinary clinical conditions** — possible non-compliance, changes or interruptions | ITT |

> When evaluating efficacy, **all three analyses** are recommended for a fuller picture.

### 5. Outcome measures

#### Measures of clinical efficacy

| Measure | Definition |
| --- | --- |
| **Effective rate** | Treated effectively ÷ total treated |
| **Cure rate** | Cured ÷ total treated |
| **Recurrence rate** | Recurrences ÷ total treated |
| **Incidence of complications** | Patients with complications ÷ total treated |
| **N-year survival rate** | Alive at N years ÷ patients followed for N years |
| **Absolute risk reduction (ARR)** | **Absolute difference** between the control event rate (CER) and the experimental event rate (EER) |
| **Relative risk reduction (RRR)** | ARR as a **proportion** of the CER |
| **Number needed to treat (NNT)** | The **reciprocal** of ARR — patients needing treatment to prevent one adverse event |

$$\text{ARR} = \text{CER} - \text{EER}, \qquad
\text{RRR} = \frac{\text{CER}-\text{EER}}{\text{CER}}, \qquad
\text{NNT} = \frac{1}{\text{ARR}}$$

#### Measures of preventive effect

| Measure | Definition |
| --- | --- |
| **Positive seroconversion rate** | Antibody-positive ÷ total vaccinated |
| **Protective rate** | (Control incidence − experimental incidence) ÷ control incidence |
| **Effectiveness index** | How many times the control incidence is of the experimental incidence |

### R code: computing ARR, RRR and NNT

Using a **constructed example** (for illustration only): control group 500 people with 60 cases, experimental
group 500 people with 36 cases.

```r
# outcomes in each group
cer <- 60 / 500     # control event rate   0.12
eer <- 36 / 500     # experimental event rate 0.072

ARR <- cer - eer              # absolute risk reduction
RRR <- (cer - eer) / cer      # relative risk reduction
NNT <- 1 / ARR                # number needed to treat

c(CER = cer, EER = eer, ARR = ARR, RRR = RRR, NNT = NNT)
```

Results: $\text{CER}=0.12$, $\text{EER}=0.072$, $\text{ARR}=0.048$, $\text{RRR}=0.4$,
$\text{NNT}\approx20.8$.

Meaning: **about 21 patients must be treated to prevent one adverse event**.

::: tip NNT is the measure to report
- RRR (40%) sounds impressive but **says nothing about the baseline risk**: if the baseline risk is 1%, the
  change is from 1% to 0.6%;
- **ARR and NNT are directly usable clinically**: "NNT = 21" is far more informative than "a 40% relative
  reduction";
- NNT **changes with baseline risk**, so the baseline risk of the study population must be reported with it.
:::

## Advantages and limitations

### Advantages

1. The researcher can **plan the design in advance** and standardise subject selection, intervention and
   analysis;
2. **Randomisation** makes the groups similar, improving comparability and **reducing bias**;
3. **Prospective**, following every subject from start to finish, with the experimental and control groups
   compared synchronously — allowing **definitive conclusions**.

### Limitations

1. **High design and implementation requirements, strict control, great difficulty** — sometimes impractical;
2. Constrained by the applicability of the intervention, subjects are **insufficiently representative**,
   limiting generalisability;
3. Large samples, strict implementation and long follow-up make **compliance difficult**, affecting the
   evaluation of effects.

### Four further issues

| Issue | Note |
| --- | --- |
| **Ethics and informed consent** | Must be approved by the ethics committee and obtain **informed consent**; placebo controls and withdrawal designs need particular care |
| **Pilot study** | Run a small trial first to test feasibility of the procedures |
| **Trial registration** | The protocol must be **registered in advance**, preventing post hoc changes of endpoint or analysis |
| **Complete, transparent reporting** | Report fully per standards, including negative results and adverse events |

## Experimental epidemiology vs cohort study

| | Experimental epidemiology | Cohort study |
| --- | --- | --- |
| **Category** | Experimental (experimental study) | Observational (analytical study) |
| **Intervention** | **Yes**: intervention in the experimental group, none/placebo in controls | None (only **exposure**) |
| **Source of subjects** | Sample from the same population | Same or different populations |
| **Allocation** | **Randomisation** | By exposure status (or level) |
| **Testing aetiological hypotheses** | **Stronger** | Relatively strong |
| **Common ground** | Prospective; difficult, large samples, long follow-up, compliance hard; unsuitable for low-incidence diseases | As left |

## Common pitfalls

::: warning Six frequent errors
- **Reading "random" as "arbitrary".** Random means every subject has an **equal chance** of either group.
  "Alternate by admission order" or "by bed number" is not random.
- **Randomising without concealment.** If the investigator can guess the next allocation, the balance of
  randomisation can be undone.
- **Reporting only PPS, not ITT.** Analysing only "good" patients overestimates efficacy (non-compliance
  often correlates with poor prognosis); ITT reflects real-world effect.
- **Computing ITT with excessive loss to follow-up.** Above 10%, and unbalanced between groups, the
  conclusion is much less credible.
- **Treating RRR as clinical benefit.** A 50% relative reduction may correspond to ARR of 1%; always report
  ARR/NNT.
- **Extrapolating experimental results freely.** Subjects are strictly selected (limited representativeness);
  real-world populations are more heterogeneous — efficacy is not effectiveness.
:::

## Summary

1. Experimental epidemiology = **random allocation + imposed intervention + a control group + prospective
   observation**; **imposing the intervention** is the essential difference from observational studies, and
   **randomisation** is the key to confirming causation.
2. Two types: **clinical trials** (patients, hospital, therapeutic) and **field trials** (healthy people,
   field, preventive; individual and community trials).
3. Eight design steps: PICO → subjects → sample size → randomisation and concealment → intervention and
   control → blinding → outcome variable → data collection.
4. **FAS / PPS / SAS** correspond to **ITT / per-protocol / as-treated**; efficacy uses FAS and PPS, safety
   uses SAS.
5. Key measures: **ARR, RRR, NNT** (efficacy) and **protective rate, effectiveness index** (prevention);
   **NNT = 1/ARR** is the most directly useful for decisions.
6. Advantages: standardisation, randomisation, prospective design, definitive conclusions. Limitations:
   difficult, limited representativeness, compliance problems, and **ethical** constraints.

## How this connects to the other courses

- Sample size (count and measurement data) → [Health Statistics Chapter 17, Sample Size Estimation](/en/Health-statistics/17-sample-size)
- Randomisation, controls, blinding, ethics → [Health Statistics Chapter 3, Experimental and Survey Design](/en/Health-statistics/03-study-design)
- Comparing two rates ($\chi^2$, confidence interval for a rate difference) → [Health Statistics Chapter 10](/en/Health-statistics/10-chi-square),
  [Chapter 6, Estimating Population Means and Rates](/en/Health-statistics/06-estimation)
- Survival data (N-year survival, survival curves) → [Health Statistics Chapter 14, Survival Analysis](/en/Health-statistics/14-survival-analysis)
- Previous chapter: [Causation and Causal Inference](./06-causal-inference);
  cohort study → [Chapter 3](./03-cohort)
