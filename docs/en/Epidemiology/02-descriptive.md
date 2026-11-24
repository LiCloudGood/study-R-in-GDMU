---
layout: doc
title: '2. Descriptive Epidemiology'
---

# Chapter 2. Descriptive Epidemiology

::: info Translation status
Translated from the [Chinese original](/Epidemiology/02-descriptive). Numbers, formulas, and R code are
identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Every epidemiological study starts with "finding out what is going on": **in which people, at what time
> and in what place** is this disease common? Only after drawing that picture can one talk about causes.
> The first half of this chapter is **how to compute** (frequency measures); the second half is
> **how to survey** (cross-sectional studies).

## What this chapter is for

Given a set of disease data, the first questions are very plain:

- How common is this disease really? (Which measure — incidence or prevalence?)
- In which people, at what time, in what place are these cases concentrated? (Three dimensions)
- To run a survey myself: whom to sample, how many, and how to ask? (Cross-sectional study)

The first two decide the foundation of all later analysis — **wrong measure, wrong denominator, everything
downstream is wrong**. The third is the starting point of most epidemiological work and the stage most
prone to bias.

<TrackList :tasks="['Distinguish rate, ratio and proportion, and explain why a proportion must not be read as a rate', 'Write the numerator and denominator of incidence, prevalence, case fatality, mortality and secondary attack rate', 'Use prevalence = incidence × duration to explain how the three relate', 'Distinguish sporadic, outbreak, epidemic and pandemic', 'Describe a disease by person, time and place', 'Distinguish cross-sectional analysis from birth cohort analysis', 'State the advantages and disadvantages of a census versus a sampling survey, and the five probability sampling methods', 'Estimate the sample size of a cross-sectional study']" />

# Part 1　Distribution of disease and its measures

## Basic measures: rate, ratio, proportion

These are the three most basic measures of distribution, and **misusing them is the commonest elementary
error**.

| Measure | Definition | Examples |
| --- | --- | --- |
| **Rate** | The number of events actually occurring divided by **all those in whom the event could occur** | Incidence, prevalence, mortality, case fatality |
| **Ratio** | One quantity divided by another, stating how many times or what percentage one is of the other | Sex ratio, relative risk |
| **Proportion** | The share of each **component part** within a whole | Cause-of-death composition, age composition |

::: warning A proportion is not a rate
"Of the 1,907 measles cases admitted to a hospital, 37.49% were aged 1 year, so children aged 1 year have
the highest measles incidence" — **this statement is wrong**.

That 37.49% has "children admitted with measles" as its denominator: it is a **proportion**. To say who is
susceptible, the denominator must be "all children in each age group" — that is an **incidence**.

Rule of thumb: **whenever words like "more likely, more severe, high-risk" appear, a rate is required, not
a proportion.**
:::

## Incidence measures

### Incidence rate

> The frequency of **newly occurring cases** of a disease in a defined population over a defined period.

$$\text{Incidence} = \frac{\text{new cases during the period}}{\text{population at risk during the same period}} \times K$$

$K$ may be 100%, 1,000‰ or 10,000 per 10,000.

**Three things must be considered:**

1. **New cases** — counted at the **first consultation**; old cases are excluded; one person with two
   episodes of influenza counts as **two** new cases;
2. **Population at risk** — must be those "**in whom the disease could occur**". When computing measles
   incidence, people who have had measles (lifelong immunity) must be excluded;
3. **Observation period** — usually one year.

**Uses**: understanding epidemiological features, investigating aetiological factors, forming hypotheses,
evaluating the effect of control measures.

### Attack rate

> A measure of the frequency of new cases in a population, usually the incidence over a
> **short period within a limited setting**.

The formula is the same as for incidence, but the observation period is **short** — days, weeks, ten-day
periods or months — which makes it flexible. Its advantage is that it can measure incidence fairly
precisely according to **degree of exposure**.

**Typically used for**: food poisoning, occupational poisoning, outbreaks and epidemics of infectious
disease.

### Secondary attack rate (SAR)

> Also called the second-generation attack rate. The percentage of **susceptible contacts** who become ill
> between the **shortest and the longest incubation period** of an infectious disease.

$$\text{SAR} = \frac{\text{new cases among susceptible contacts}}{\text{total susceptible contacts}} \times 100\%$$

**Uses**: comparing the **transmissibility** of infectious agents, analysing epidemic factors (age, sex,
number of children in the household, household size, economic conditions), and evaluating control measures
(immunisation, isolation, disinfection).

> The SAR asks "**after one index case, how many contacts fell ill**" — it measures **transmission**. The
> denominator therefore counts only **susceptible** contacts; immune people are excluded.

## Prevalence measures

### Prevalence rate

> Also called the point prevalence rate. The proportion of **old and new cases** of a disease among the
> total population **at a specified time**.

$$\text{Prevalence} = \frac{\text{old and new cases at the time point}}{\text{population at that time point}} \times K$$

$K$ may be 100%, 1,000‰, 10,000 per 10,000 or 100,000 per 100,000.

By observation period: **point prevalence** (one time point) and **period prevalence** (over an interval).

### What moves prevalence

This is the key to understanding prevalence — it is driven by both **incidence** and **duration**:

| Direction | Factors |
| --- | --- |
| **Increase** | More new cases (higher incidence); better treatment keeps patients alive but not cured, so **duration lengthens**; longer survival of the uncured; cases moving in; healthy people moving out; susceptible people moving in; better diagnosis; better reporting |
| **Decrease** | Fewer new cases (lower incidence); **higher case fatality**; shorter duration; higher cure rate; healthy people moving in; cases moving out |

### How prevalence, incidence and duration relate

A "reservoir" makes it intuitive:

```
        New cases (inflow)
              ↓
        ┌───────────┐
        │  Cases    │  ← prevalence = water in the reservoir
        └───────────┘
              ↓
   Recovery / death / migration (outflow)
```

When incidence and duration are **stable over a long period**:

$$\text{Prevalence} = \text{Incidence} \times \text{Duration}$$

This explains a counter-intuitive fact: **better treatment can raise prevalence** — patients live longer
without being cured, so the reservoir fills up.

### Incidence versus prevalence

| Aspect | Incidence | Prevalence |
| --- | --- | --- |
| **Data source** | Disease notification, surveillance, cohort studies | Cross-sectional surveys |
| **Numerator** | **New** cases during the period | Cases during the period (**new and old**) |
| **Denominator** | Average or population at risk | Surveyed number or average population |
| **Observation period** | Usually 1 year or longer | Short, usually 1–few months |
| **Suitable diseases** | Any disease | Chronic or long-duration diseases |
| **Nature** | **Dynamic** description | **Static** description |
| **Use** | Epidemic intensity | Current burden, chronic disease situation |
| **Influences** | Relatively few (epidemic situation, diagnostic level, reporting quality) | More (everything affecting incidence plus outcome and duration) |

### Infection rate

> The proportion of people **currently infected** with a pathogen among those examined within a defined
> period, usually expressed as a percentage.

Its nature is similar to prevalence. It is **widely used**, especially for **inapparent infections,
pathogen carriers, and mild or atypical cases**. Infection can be detected by identifying the pathogen, or
by serological and molecular methods.

It is often used to study the infection situation of infectious or parasitic diseases, evaluate control
efforts, estimate the epidemic trend, and as a general indicator of population health.

## Mortality and survival measures

### Mortality rate

> The proportion of deaths among a population over a defined period — the most common measure of the risk
> of death.

$$\text{Mortality} = \frac{\text{total deaths in the period}}{\text{average population in the year}} \times K$$

**Uses**: reflecting the overall mortality level of a population and measuring the risk of death in a
given period and place.

::: warning Crude mortality rates cannot be compared directly
Mortality differs greatly between age groups (high in infancy and old age, low in adolescence). So a
difference in mortality may reflect a real difference in **age-specific mortality**, or merely a different
**age composition**.

Standard practice: **stratified comparison**, or computing a **standardised mortality rate** against a
standard population age structure.
:::

**Cause-specific mortality**: mortality computed by disease, age, sex, occupation, region or ethnicity.

### Case fatality rate

> The proportion of **deaths from a disease** among **patients with that disease** over a defined period,
> expressing the risk of dying for a diagnosed patient.

$$\text{Case fatality} = \frac{\text{deaths from the disease in the period}}{\text{patients with the disease in the same period}} \times 100\%$$

**Uses**: expressing the probability of death among diagnosed cases; reflecting the **severity** of the
disease as well as **medical standards** and diagnostic capacity. Common for acute infectious diseases,
rarely for chronic diseases.

> **The denominators differ completely**: case fatality uses **patients**; cause-specific mortality uses
> **the population**. In-hospital case fatality does not represent the region's case fatality (inpatients
> are generally more severely ill and may not come from the same area).

### Infant mortality rate (IMR)

> Deaths of infants under one year of age divided by live births.

$$\text{IMR} = \frac{\text{deaths under 1 year in a year}}{\text{live births in the same year}} \times 1000‰$$

The numerator includes infants born the previous year who died this year, plus infants born and dying this
year, both under one year of age.

**Meaning**: an important indicator of a country's or region's **health status, medical conditions and
socio-economic development**, and one basis for assessing population quality.

### Survival rate

> Among patients receiving a treatment or patients with a disease, the proportion **still alive** after
> $n$ years of follow-up.

**Uses**: reflecting how much a disease threatens life and evaluating long-term outcomes of diseases with
a long course (cancer, cardiovascular disease, tuberculosis).

> The difference from mortality is that survival **uses follow-up**, and its denominator counts only those
> **followed for the full $n$ years**. This is exactly what
> [Health Statistics Chapter 14, Survival Analysis](/en/Health-statistics/14-survival-analysis) develops.

## Epidemic intensity

**Epidemic intensity** is the change in incidence of a disease in a place and population over a period,
and the degree of connection between cases.

| Intensity | Definition | Key point |
| --- | --- | --- |
| **Sporadic** | Incidence at the **usual level of past years**, with no obvious links in time or place between cases | Usually compared with the **past three years** |
| **Outbreak** | Many cases with the same symptoms appearing suddenly in a **local area or institution** within a **short time** | Usually a common source or route; cases cluster within the incubation period |
| **Epidemic** | Incidence **markedly exceeding** the level of past years in a place | Clear time–space links between cases; a common transmission factor |
| **Pandemic** | Incidence markedly above past levels, spreading rapidly over a wide area, crossing provincial, national or continental boundaries within a short time | Worldwide spread |

**Four situations in which disease is sporadic**:

1. Diseases with durable post-infection immunity, or where vaccination maintains a certain immunity
   (e.g. measles);
2. Diseases dominated by **inapparent infection** (poliomyelitis, Japanese encephalitis);
3. Infectious diseases whose transmission mechanism is not easily realised (typhus, anthrax);
4. Infectious diseases with a **long incubation period** (leprosy).

> The difference between sporadic, outbreak, epidemic and pandemic is one of **magnitude**, not nature.
> The key to calling something an epidemic is "**markedly exceeding past levels**" — so a historical
> baseline is indispensable.

## The three dimensions of distribution

> Because aetiologic agents, population characteristics and natural and social environments interact,
> disease intensity varies between populations, places and times.
> **Describing the three dimensions is the starting point of epidemiological research.**

For diseases with known causes, epidemic features are the basis for judgement and explanation; for
diseases with unknown causes they are the external manifestation of the cause and an important source of
**aetiologic hypotheses**.

### 1. Person distribution

Describing how population characteristics (age, sex, occupation, ethnicity, …) relate to disease, in order
to **identify high-risk groups and explore aetiology and epidemic factors**.

Characteristics include: age, sex, occupation, ethnicity, social class, behaviour and lifestyle, marriage
and family, migrant population.

#### Age (the most important factor)

**The association of disease with age is stronger than with any other population characteristic.**

General pattern: **chronic diseases rise with age; acute infectious diseases fall with age.**

Three typical situations:

1. Diseases without effective immunisation, easily transmitted, with durable post-infection immunity have
   the **highest incidence in children** (measles, pertussis, mumps); after vaccination the **peak age
   shifts later**. If a place has had no epidemic for a long time, a single imported source may cause
   similar incidence in all age groups.
2. Differences in **exposure opportunity, habits and behaviour** make some diseases peak at certain ages:
   traffic accidents and HIV mainly in young adults; cancer, diabetes and coronary heart disease increase
   with age.
3. The same disease may show age differences depending on the **epidemic type**.

**Purposes of studying age distribution**: exploring aetiologic factors and providing clues; identifying
high-risk groups and priority protection targets; for infectious diseases, observing changes in population
**immune status**.

#### Two methods of age-distribution analysis

| Method | Approach | Suitable for |
| --- | --- | --- |
| **Cross-sectional analysis** | Analyses age-specific incidence, prevalence or mortality **in the same period**, or across different decades | Infectious diseases or diseases with a **short incubation period** |
| **Birth cohort analysis** | Follows a group born **in the same period** over several years | Combines **age and time distribution**; long-term trends and aetiologic clues |

> **Why is birth cohort analysis needed?** Cross-sectional analysis compares "the rates of people of
> different ages now", but those people were born in different eras and experienced different environments
> — age effects and **generation effects** are mixed together. Birth cohort analysis follows **the same
> people** as they age and isolates the age effect.

#### Sex

Differences come from two sources:

- **Intrinsic constitution**: genetic characteristics, endocrine metabolism, physiological and anatomical
  features;
- **Exposure characteristics**: different exposure to aetiologic agents (occupation, behaviour).

Comparisons usually use **incidence, prevalence or mortality**, or the **sex ratio** and cause-of-death
composition.

#### Occupation

Exposure to different **physical, chemical and biological factors** and to **occupational psychological
stress** produces occupational differences in disease distribution. Key considerations:

- Occupation is a **composite indicator** of working environment, socio-economic status, health literacy,
  physical workload and psychological stress;
- Occupational distribution relates to **exposure in the working environment**;
- The exposure and effect of occupational agents relate to **working conditions and protective
  equipment**;
- Different occupations have different disease profiles and **different prevention priorities**;
- **Duration of exposure** and **past occupational history** matter.

#### Other characteristics

| Characteristic | Key point |
| --- | --- |
| **Ethnicity** | Differs in heredity, geography, religion, culture and custom; differences must be analysed from **several angles at once** |
| **Social class** | Related to income, occupation, education and living conditions; embodies many social factors |
| **Behaviour and lifestyle** | Smoking, alcohol, drugs, risky sexual behaviour, sedentary lifestyle |
| **Marriage and family** | All-cause mortality highest in divorced, then widowed and single, lowest in married; shared habits, heredity and close contact produce household transmission and **familial aggregation** |
| **Migrant population** | Migration changes exposure opportunities and immune status, altering distribution |

### 2. Time distribution

Disease frequency changes over time with the natural, social and biological environment. The time
distribution reveals epidemic patterns, provides aetiologic clues, tests suspected agents and evaluates
control measures.

| Type | Definition | Key point |
| --- | --- | --- |
| **Rapid fluctuation** | An epidemic or outbreak lasting **days, weeks or months** | Close in meaning to **outbreak**; outbreak usually for **small groups**, rapid fluctuation for **larger populations** |
| **Seasonal variation** | Incidence rises within **a certain season** | Two forms: **strict seasonality** and **seasonal elevation** |
| **Cyclic variation** | Frequency fluctuates regularly at intervals, with an epidemic peak **every few years** | See the factors below |
| **Secular trend** | Changes in clinical features, distribution or intensity over years or decades | Also called long-term change |

**Factors influencing periodicity and its interval**:

1. Dense population, crowded transport and poor sanitation **favour transmission**;
2. For diseases easily transmitted, the disease spreads rapidly once **susceptible people accumulate**;
   the rate at which new susceptibles accumulate (especially births) determines the interval —
   **faster accumulation, shorter interval**;
3. Diseases producing **solid immunity** drop sharply after an epidemic; longer-lasting population immunity
   means a **longer interval**;
4. **Pathogen variation** and its speed also matter.

### 3. Place distribution

Differences between places reflect differences in where aetiologic agents act, and ultimately in the
distribution of **risk factors and conditions**.

Two ways of dividing areas: **administrative division** and **natural landscape**.

Levels: **between countries**, **within a country**, and **urban versus rural**.

#### Endemicity, clustering, imported disease

| Concept | Definition | Notes |
| --- | --- | --- |
| **Endemicity** | Because of natural or social factors, a disease **regularly exists in a certain area** or within a certain population, without importation | Three types: **statistical**, **natural**, **natural-focus** |
| **Endemic clustering** | Frequency of disease in an area **higher than in surrounding areas** | Suggests a specific local agent acting on the population |
| **Imported disease** | A disease absent from or already eliminated in a country or area, introduced from outside | Also called exotic disease |
| **Endemic disease** | A disease confined to certain areas, relatively stable and frequently occurring | e.g. endemic fluorosis, arsenic poisoning, iodine deficiency |

**Five criteria for calling a disease endemic**:

1. **High incidence** among residents of that area;
2. Low or absent incidence among people living elsewhere;
3. After **moving in**, incidence becomes similar to that of local residents;
4. After **moving out**, incidence falls and symptoms lessen or resolve;
5. **Susceptible animals** locally can develop the same disease.

> Criteria 3 and 4 are the most important: they amount to a natural **migration study**. If the cause is
> environmental, immigrants will develop the disease and emigrants will improve; if it is genetic, moving
> will change nothing.

# Part 2　Descriptive studies and cross-sectional studies

## Concepts and features of descriptive studies

> **Descriptive studies** are the most basic and most commonly used group of epidemiological methods. Using
> routine surveillance records or dedicated surveys, they group data by place, time and population
> characteristics, describe the distribution of disease, health status and exposures, and on that basis
> compare and obtain the three dimensions of distribution, thereby obtaining aetiologic clues and
> **forming aetiological hypotheses**.

**Five features**:

1. **Observation** is the main method; **no intervention** is applied;
2. Exposure is **not randomly allocated**;
3. **No control group** is usually set up at the start;
4. The **temporal relationship** between exposure and outcome cannot be determined;
5. They **provide clues** for later analytical or experimental studies.

**Types**: case study, case report, case series, cross-sectional study, historical data analysis,
ecological study.

## Cross-sectional study

### Concept

> Also called a **cross-sectional study**: within a specified time and population, variables relating to
> disease or health status are collected to describe the **distribution** of disease or health and its
> **related factors**.

Also called a **prevalence study**. By time: **point prevalence survey** and **period prevalence survey**.

> The key word is "**the same point in time**": exposure and disease are measured **simultaneously**, so a
> cross-sectional study can only show "there is an association", **not which came first** — and therefore
> **cannot establish causation**.

### Two types

| Type | Approach |
| --- | --- |
| **Census** | Survey the **entire population** of a defined area at a defined time |
| **Sampling survey** | **Randomly** survey a **representative sample** and estimate the population parameter from it |

#### Census

**Four purposes**:

1. Early detection, diagnosis and treatment of disease;
2. Understanding the prevalence of chronic disease and the epidemic distribution of acute infectious disease;
3. Understanding the health level of local residents;
4. Establishing **reference ranges** for physiological and biochemical indicators.

**Advantages and disadvantages**:

| Advantages | Disadvantages |
| --- | --- |
| ① No **sampling error** | ① Large workload; **quality hard to control** |
| ② Simple to define the subjects | ② Unsuitable for low-prevalence diseases without a simple diagnostic test |
| ③ Finds **all cases**, giving a fuller description | ③ **Yields only prevalence**, not incidence |
| ④ Can survey several diseases at once | ④ Consumes considerable manpower, materials and money |

> **A census has no sampling error but can still be biased** (missed cases, double counting, inaccurate
> measurement), and such non-sampling error is often harder to control than sampling error.

#### Sampling survey

A **representative sample** is drawn **randomly** from the population at a defined time and place, and
population parameters are inferred from it.

**Five probability sampling methods**:

| Method | Approach |
| --- | --- |
| **Simple random sampling** | Every individual has an equal chance |
| **Systematic sampling** | Mechanical sampling at a fixed interval |
| **Stratified sampling** | Divide into strata by a characteristic, then sample randomly within strata |
| **Cluster sampling** | Sample whole clusters (classes, communities) |
| **Multi-stage sampling** | A combination of the above, in stages |

**Four non-probability methods**: convenience, judgement, quota, snowball sampling.

> Samples from non-probability sampling **cannot be analysed with inferential statistics**. They are used
> only when strict probability sampling is practically impossible, for preliminary exploration, when the
> population is undefined, or when the population is fairly homogeneous and the investigator experienced.

> **Order of sampling error** (often examined):
> **stratified < systematic < simple random < cluster**.
> Cluster sampling has the largest error and therefore needs a **larger sample**; multi-stage sampling is a
> combination.

### Sample size

**Two determinants**:

- **Expected prevalence $p$** — the lower the prevalence, the larger the sample needed;
- **Allowable error $d$** — the larger $d$, the smaller the sample needed.

**Sample size for a prevalence survey**:

$$n = \frac{z_{1-\alpha/2}^2 \cdot p \cdot q}{d^2}, \qquad q = 1-p$$

Common sampling conditions in epidemiological cross-sectional studies are $d = 0.1p$, $\alpha = 0.05$,
$z_{1-\alpha/2} \approx 1.96 \approx 2$, so the formula simplifies to:

$$n \approx \frac{4pq}{d^2}$$

**Quantitative data** use a different formula (based on the estimated population standard deviation $s$
and the allowable error $d$).

### R code: estimating the sample size of a cross-sectional study

Assume an expected prevalence $p = 0.2$, allowable error $d = 0.1p = 0.02$, $\alpha = 0.05$:

```r
p <- 0.2          # expected prevalence
d <- 0.1 * p      # allowable error, 0.1p
z <- 1.96         # two-sided quantile for alpha = 0.05
q <- 1 - p

n <- z^2 * p * q / d^2
ceiling(n)        # round up: the minimum number to survey

# check with the simplified formula (valid when d = 0.1p)
ceiling(4 * p * q / d^2)
```

The two results are close. Note that if $d$ is tightened (say to $0.05p$), the sample size **multiplies** —
because $n$ is inversely proportional to $d^2$.

### Data collection

| Step | Content |
| --- | --- |
| **Decide what to collect** | Basic personal data, occupation, habits and health care, reproductive history, environmental data, demographic data |
| **Train the interviewers** | Uniform training before the survey to ensure consistent methods and standards |
| **Routes of collection** | ① Questionnaire interview; ② laboratory measurement or examination; ③ routine records |

### Analysis and interpretation

1. **Describe the three dimensions of distribution**: demographic and distribution characteristics;
2. **Association analysis**;
3. **Interpret**: representativeness and response rate; **bias**; summarise distribution patterns and form
   aetiologic hypotheses.

## Common pitfalls

::: warning Seven frequent errors
- **Reading a proportion as a rate.** The biggest trap in this chapter. Words like "more likely, more
  severe, high-risk" require a rate.
- **Letting people in whom the event cannot occur into the denominator.** Excluding prevalent cases when
  computing incidence; excluding immune people when computing measles incidence. **Before writing any
  rate, recite the denominator's definition.**
- **Comparing crude rates between areas with different age structures.** Stratify or standardise — and
  remember a standardised rate is **for comparison only, not the actual level**.
- **Using hospital figures for population indicators.** In-hospital case fatality ≠ population case
  fatality; outpatient cases cannot give a population incidence.
- **Assuming a census must be accurate.** No sampling error, but missed cases, double counting and
  measurement error are **bias**, and harder to remove.
- **Talking about causation in a cross-sectional study.** Exposure and outcome are measured
  **simultaneously**; hypotheses only.
- **Choosing a sampling method and ignoring its error.** Cluster sampling has the largest error yet is
  often used because it is convenient.
:::

## Summary

1. **Three basic measures**: rate, ratio, proportion — **a proportion is not a rate**.
2. **Incidence**: incidence rate (new cases / population at risk), attack rate (short period), secondary
   attack rate (susceptible contacts).
3. **Prevalence**: prevalence rate (old and new cases / population); **prevalence = incidence × duration**
   (in a steady state).
4. **Mortality and survival**: mortality (denominator = population), case fatality (denominator =
   patients), infant mortality, survival rate.
5. **Epidemic intensity**: sporadic, outbreak, epidemic, pandemic; the key to "epidemic" is **markedly
   exceeding past years**.
6. **Three dimensions**: person (age most important), time (rapid fluctuation / seasonal / cyclic /
   secular), place (endemicity, clustering, imported disease).
7. **Descriptive studies** only observe, do not intervene, set no controls, cannot establish timing; their
   role is to **form hypotheses**.
8. **Cross-sectional studies** measure prevalence **at one point in time**; a census has no sampling error
   but can be biased; for sampling surveys remember the **error order: stratified < systematic < simple
   random < cluster**.

## How this connects to the other courses

- Full derivation of rates, proportions and standardised rates → [Health Statistics Chapter 5](/en/Health-statistics/05-describing-qualitative-data)
- Summary table of incidence, prevalence, mortality, infant mortality → [Health Statistics Chapter 18](/en/Health-statistics/18-vital-statistics)
- Sampling methods and sampling error → [Health Statistics Chapter 3](/en/Health-statistics/03-study-design)
- Sample size formulas → [Health Statistics Chapter 17](/en/Health-statistics/17-sample-size)
- Charting the three distributions in R → [Health Statistics Chapter 19](/en/Health-statistics/19-tables-and-charts)
- Previous chapter: [Introduction to Epidemiology](./01-introduction);
  next chapter: [Cohort Study](./03-cohort) — from "one measurement" to "follow-up for outcomes"
