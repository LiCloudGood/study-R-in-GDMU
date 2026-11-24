---
layout: doc
title: '5. Describing Qualitative Data'
---

# Chapter 5. Describing Qualitative Data

::: info Translation status
Translated from the [Chinese original](/Health-statistics/05-describing-qualitative-data). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Quantitative data are described with means and standard deviations, qualitative data with **relative
> numbers**. This chapter makes clear what the denominator of each of the three indices — rate, proportion,
> and ratio — is and what question each one answers, and then goes on to how a dynamic series shows a trend
> over time and how standardization removes the interference caused by a difference in internal composition.

## What this chapter is for

Two typical situations:

- **How to describe the outcome of a batch of patients.** In some year some place reports 38 deaths from a
  disease, 27 of them type A and 11 type B, and a doctor says "type A is more likely to be fatal than type
  B". There is something wrong with that sentence: 27 and 11 are **absolute numbers**, and they only say
  which type accounts for more of the deaths; to answer "which type is more likely to be fatal" you have to
  know how many cases of each type there were in total.
- **Whether two rates can be compared directly.** The cure rate of hospital A and of hospital B, the
  prevalence in two ethnic groups, the incidence in two years — all of them look like "work out a percentage
  and compare the sizes", but if the two groups differ in age composition, in how severe the cases were, or
  in the diagnostic criteria, the difference you obtain may come entirely from "composition" rather than
  from a real difference in level.

What this chapter gives you is that set of tools: **rate** (how severe), **proportion** (how much of the
whole each part takes up), **ratio** (how many times one index is of another), and the discipline for using
them. And when the internal composition of two groups differs, there is a remedy — **standardization of
rates**.

<TrackList :tasks="['Tell a rate, a proportion, and a ratio apart, and say what the denominator of each one is', 'Look at a percentage and decide whether it is a rate or a proportion, and know what conclusion it supports', 'Compute an overall rate, a fixed-base ratio, a chain ratio, and an average development ratio', 'Know when standardization is required, and what a standardized rate must not be used for']" />

## Core concepts

### Qualitative data: count data and ordinal data

The observed values of **qualitative data** (also called categorical data) are categories or attributes and
generally carry no unit of measurement. In R they are stored in a **factor**, and according to whether the
categories have an order they fall into two kinds:

| | Relationship between categories | Examples | What it mainly lets you compute |
| --- | --- | --- | --- |
| **count data** | mutually exclusive, no order | binary: sex (male/female), outcome (death/survival); multi-category: blood type, occupation | count the cases in each category → rate, proportion |
| **ordinal data** | mutually exclusive, but with a degree of severity | therapeutic effect (no effect < improved < markedly effective < cured), laboratory result (− < ± < + < ++) | count the cases in each category (cumulative frequencies may be added) → proportion |

What the two kinds have in common is that **a mean cannot be computed**: there is no "average blood type",
and taking the mean of therapeutic effects is meaningless too. So the basic way to describe them is "count
first, then compute a relative number" — which is exactly what this chapter is about. The one thing ordinal
data have that count data do not is that "order", and in R it is expressed by an **ordered factor**
(`ordered = TRUE` plus a specified order of `levels`); get the order wrong and the conclusion of a rank-sum
test or similar analysis later on can come out completely reversed.

### Relative numbers: turning absolute numbers into comparable indices

**Absolute numbers** (such as "27 deaths", "110 infected") show the level actually occurring at a given time
in a given place. They are the most original information and must not be thrown away; but absolute numbers
cannot be compared directly with each other, because the base (the total number of observational units) is
often different.

A **relative number** is the ratio of two related indices. It divides out the base, "lining up" different
bases on the same scale so that they become comparable. Describing the basic features of qualitative data is
done with relative numbers, and the three most commonly used are the **rate, the proportion, and the ratio**.

#### Rate（率）: the frequency or intensity with which a phenomenon occurs

$$\text{rate} = \frac{\text{number of observational units in which the phenomenon occurs}}{\text{total number of observational units in which it may occur}} \times K$$

- The numerator is part of the denominator (when the denominator carries no time dimension), so a rate lies
  between 0 and 1. $K$ is the **base**, which may be taken as 100% (a percentage rate), 1000‰ (a rate per
  thousand), 100 000 per 100 000, and so on; which one to take depends mainly on convention, and on keeping
  the result to 1~2 integer digits so that it is easy to read.
- The denominator must be the observational units **in which the phenomenon "may occur"**. Those four words
  "may occur" are the easiest thing to leave out: in computing the incidence of a disease, the denominator
  can only be "people who may contract that disease" — people who already have it, and people who cannot
  possibly contract it, must not be counted in. Get the definition of the denominator wrong and the rate you
  compute is meaningless.
- Common indices: incidence rate, prevalence, infection rate, mortality rate, age-specific mortality rate,
  case fatality rate, cure rate.

Example: in village A, 110 of 1200 people are infected with hookworm, an infection rate of
$110/1200 \times 100\% = 9.17\%$; in village B, 150 of 1500 people are infected, a rate of
$150/1500 \times 100\% = 10.00\%$. **The infection situation in village B is more serious** — and this
conclusion rests precisely on dividing out the denominator: looking only at the absolute numbers (110 and
150), you would think village A the more serious of the two.

#### Proportion（构成比）: the share each part of a whole takes up

$$\text{proportion} = \frac{\text{number of observational units in one component part}}{\text{total number of observational units in all the component parts of the same whole}} \times K$$

A proportion is also called a **percentage**, and it describes "the distribution of the parts inside one
whole". Two features must be remembered:

1. **The numerator is part of the denominator, and the proportions of all the parts sum to 1 (100%)**, each
   part lying between 0 and 1;
2. **one part up means another part down**: when the share of one part rises, some other part must fall. If
   the proportion of males in a population's sex composition rises, the proportion of females must fall.

Example: a hospital admits 2826 inpatients in a year, 850 to internal medicine, 1133 to surgery, 425 to
gynecology, and 418 to pediatrics, so the proportions are 30.08%, 40.09%, 15.04%, and 14.79%, summing to
100.00%. What this says is that "surgery accounts for the most inpatients"; it **cannot** be used to say that
"the chance of having a surgical disease is 40.09%".

#### Ratio（相对比）: how many times one index is of another

$$\text{ratio} = \frac{\text{index A}}{\text{index B}} \quad (\text{or} \times 100\%)$$

A ratio, or **relative ratio**, says how many times one index is of another, or what fraction it is of it.
Its biggest difference from a proportion is that **the numerator need not be part of the denominator** — the
numerator and denominator may even belong to different kinds of things, and they are not required to sum to
1. According to the relation between numerator and denominator there are three types:

- **comparison index**: the ratio of two indices of the same kind, such as a sex ratio at birth of 116.9
  (male/female), which says that more boys than girls are born and that the sex ratio is out of balance;
- **relation index**: the ratio of two related things of different kinds, such as the number of health
  workers to the number of hospital beds, or the number of inpatient days to the number of beds;
- **plan-completion index**: how many percent, or how many times, the actual figure is of the planned
  figure.

The coefficient of variation covered in Chapter 4 ($CV = S/\bar{X}$) is a ratio as well: put the standard
deviation over the mean and the units of measurement cancel out, so that the dispersion of different
indices can be compared too.

#### The three indices side by side

| | What question it answers | Relation between numerator and denominator | Can the parts be added? | Dimension |
| --- | --- | --- | --- | --- |
| **rate** | the frequency or intensity with which the phenomenon occurs (severe or not, likely or not) | the numerator is part of the denominator, and the denominator is the total in which it "may occur" | generally not | none |
| **proportion** | the share of each part inside a whole (which part accounts for the most) | the numerator is part of the denominator, and the denominator is the total of the same whole | **must equal 1 (100%)** | none |
| **ratio** | the level of one index against another (how many times) | numerator and denominator need not be of the same kind, nor part and whole | no such property | depends on the indices |

One sentence to hold onto: **to ask "is it severe, is it likely", use a rate; to ask "how much does it take
up, which part dominates", use a proportion; to ask "how many times, in what ratio", use a ratio.**

### Rate and proportion: one example that makes it clear

This is the point in the chapter most likely to be examined, and the one most easily got wrong. Take a
concrete example.

A hospital admits 141 cases of a disease in a year, 104 of type A and 37 of type B; 27 of the type A cases
die and 11 of the type B cases, 38 deaths in all.

| | Type A | Type B | Total |
| --- | --- | --- | --- |
| number of cases | 104 | 37 | 141 |
| number of deaths | 27 | 11 | 38 |
| **case fatality rate** = deaths of that type ÷ **cases of that type** | 27/104 = **25.96%** | 11/37 = **29.73%** | 38/141 = 26.95% |
| **type composition of the deaths** = deaths of that type ÷ **total deaths** | 27/38 = **71.05%** | 11/38 = **28.95%** | 100.00% |

With the same batch of numbers and exactly the same numerators (27 and 11), **changing only the denominator**
gives two conclusions that point in opposite directions:

- read as a **proportion** (denominator = the 38 deaths): type A accounts for 71.05%, so "**among those who
  died, type A is in the majority**";
- read as a **rate** (denominator = the cases of that type): type B, at 29.73%, is higher than type A at
  25.96%, so "**patients of type B are more likely to die**".

Both conclusions are correct, but they answer two different questions. They come out opposite because there
were more type A cases to begin with (104 : 37): **when there are many patients, a low case fatality rate
still contributes many deaths**. That is exactly the mistake the doctor made at the beginning — taking "more
deaths" for "a higher case fatality rate".

From this come two decision rules, which you can apply directly when doing exercises:

- if the conclusion contains "**more likely to occur, more severe, more frequent**" → a **rate** must be
  used, and first ask yourself: is the denominator "all the people in whom this outcome may occur"?
- if the conclusion contains "**mainly..., accounts for..., the importance of this cause of death**" → use a
  **proportion**, and first ask yourself: is the denominator "the total of this whole"?

<ClickAnswer>

**Think about it**: a hospital reports that "of the 500 lung cancer patients admitted in a year, smokers make
up 80%, which shows that smokers are more likely to get lung cancer".

Is that statement right? Where is it wrong?

---

No. The 80% is the **smoking proportion within the lung cancer patients**, and the denominator is "the 500
lung cancer patients". To show that "smokers are more likely to get lung cancer" you need the **lung cancer
incidence in smokers and in non-smokers** (with the total number of people in each of the two groups as the
denominator), and you would also have to consider whether the age composition of the two groups is
comparable.

At most these data show that "the lung cancer patients this hospital admits are mainly smokers". They may
suggest that smoking and lung cancer are associated, but they are a clue, not evidence; and whether "the
cases this hospital admits" can represent all lung cancer patients is itself a question mark.

</ClickAnswer>

::: tip The “one part up, another part down” of a proportion can deceive
Deaths from five acute infectious diseases in some place: deaths from dysentery fall from 420 to 141, and
their share of the total deaths from the five diseases falls from 69.88% to 53.41%; over the same period
deaths from epidemic cerebrospinal meningitis fall from 54 to 46, yet their share rises from 8.99% to 17.42%.

For meningitis **both the absolute number and the rate fell while the proportion rose**, because the
denominator (total deaths from the five diseases) dropped from 601 to 264. So when you see a proportion
change, **you cannot directly say that "the situation has become more serious"** — a change in a proportion
may come from that part itself, or merely from another part changing. By the same token, when analyzing how
a **rate** changes over time, a change in a proportion is no substitute.
:::

### Five things to watch when using relative numbers

**One: the number of observational units in the denominator must not be too small.** With a small
denominator a rate "jumps about". In one place only 9 people die of notifiable infectious diseases in a
month, yet proportions are used to say "those who died of rabies make up 22.22%" and "those who died of
viral hepatitis make up 33.33%"; this is meaningless — one case more or one case less and the percentage
changes a lot. Or take treating 3 patients with some therapy: 1 responder gives an effective rate of 33.33%,
2 responders 66.67%, and 3 responders 100%. **The proper practice: when the number of observational units is
small, report absolute numbers**; if a relative number has to be used, give the confidence interval for the
rate as well. To make a rate stable, the denominator has to be large enough.

**Two: a proportion must not be put in place of a rate.** A doctor tabulates the age distribution of the 1907
measles children admitted to a hospital in a year: 715 in the 1-year group (37.49%), 493 in the 2-year group
(25.85%), 171 in the 3-year group (8.97%), … and concludes that "measles incidence is highest in 1-year-old
children and falls as age increases". **That conclusion does not hold**: the percentages in the table are the
**proportions** of each age group among all the children admitted, the denominator being "the measles
children this hospital admits", so they only say that "the children admitted are mainly 1~2 years old". The
**intensity** of measles in each age group has to be reflected by the incidence in each age group (with the
total number of children in that age group as the denominator), and there is no such denominator in this
table at all.

By the same reasoning, "of the vehicles involved in traffic accidents 31% were speeding, 56% driving at a
moderate speed, and 13% driving slowly, so driving at a moderate speed is the most accident-prone" is wrong
too: that is the **speed composition of the accident vehicles**, not the **accident rate of vehicles at each
speed**. There are more vehicles driving at a moderate speed to begin with, so their proportion is larger. To
compute the accident rate you have to divide the number of accidents by the number of vehicles driven at
that speed.

**Three: in computing an overall rate, add up the numerators and the denominators separately.** The malignant
tumor mortality rates of the age groups in some place are 3.08, 9.46, 69.26, 363.47, and 533.75 (per 100 000);
adding them up and dividing by 5 gives 195.80 per 100 000 — **that is wrong**. The correct way is to add up
the deaths and the populations of the age groups separately and then divide:
$725/936446 \times 100000 = 77.42$, that is, 77.42 per 100 000.

The reason is simple: **an arithmetic mean implicitly gives every age group the same weight**, whereas in
fact the 0~ group has 356 980 people and the 70~ group only 20 047 — the two weights differ more than
tenfold. Only when every group has exactly the same number of observational units does the arithmetic mean
equal the overall rate. When you do this kind of exercise, remember the order: **add the numerators, add the
denominators, then divide**.

**Four: when comparing relative numbers, watch comparability.** Apart from the factor being compared, the
other factors that affect how high or low a relative number is should be the same or as close as possible:
whether the study subjects are homogeneous, whether the research methods agree, whether the observation
period agrees, whether the composition of other relevant factors is similar. One study compares the
prevalence of hypertension in two groups of residents: in the group of Tibetan herders 1446 people, most of
whom drink alcohol, and in the group of Han residents 337 people, few of whom drink, and alcohol drinking is
associated with hypertension — the two overall prevalences (14.25% and 8.61%) **are not comparable**, so
saying on that basis that "ethnicity is a risk factor for hypertension" does not stand up. There are two
remedies: **stratified comparison** (compare the prevalence of the two ethnic groups separately within the
drinking and the non-drinking group), or **standardizing the overall rates** (the next section).

The direction of the comparison must be sorted out as well: in a **cross-sectional comparison** (between
several areas, several hospitals) check whether the units are comparable; in a **longitudinal comparison**
(the same index over the years in one area) check whether the **background** behind the index has changed —
if the diagnostic criteria changed, the population composition changed, or the reporting system changed, a
rise or fall in the rate is not necessarily a real change.

**Five: the comparison of sample rates or proportions should be put to a hypothesis test.** A sample rate
carries sampling error, and two unequal sample rates do not mean two unequal population rates. Example: to
study the clinical effect of a calcium supplement, 200 children are observed, 100 taking the new drug, of
whom 8 develop rickets (8.0%), and 100 taking calcium tablets, of whom 10 develop rickets (10.0%). Can one
say the new drug works better? **No** — a chi-square test shows that the difference between these two rates
is not statistically significant ($P > 0.05$); a difference of 2 percentage points may perfectly well be
caused by sampling error. For the details see Chapter 10, chi-square tests, and Lecture 14 of *Introduction
to Information Technology*. **This chapter is about description and testing comes later, but the order "first
compute the rate, then test" cannot be reversed.**

### Dynamic series: looking at change over time

A **dynamic series** is a series of statistical indices arranged in time order (absolute numbers, relative
numbers, or averages will all do), used to reflect how something changes and develops over time. It has two
elements: **time**, and **the value of the index at that time**. There are three groups of indices commonly
used to analyze it.

**(1) Absolute increments**

- cumulative increment $= a_t - a_0$: the difference between the report period and some fixed base period,
  reflecting the overall change;
- year-by-year increment $= a_t - a_{t-1}$: the difference between the report period and the immediately
  preceding period, reflecting the change from period to period.

**(2) Development ratios and growth rates**

$$\text{fixed-base development ratio} = \frac{a_t}{a_0}, \qquad \text{chain development ratio} = \frac{a_t}{a_{t-1}}$$

$$\text{growth rate} = \text{development ratio} - 1$$

A development ratio says "how many times the base period the report period is" (1.07 means 107%), and a
growth rate says "how much it has grown net" (0.07 means a growth of 7%). **The two differ by exactly 1, so
do not mix them up.**

**(3) Average development ratio and average growth rate**

$$\text{average development ratio} = \sqrt[n]{\frac{a_n}{a_0}}, \qquad \text{average growth rate} = \text{average development ratio} - 1$$

Note: the average development ratio is the **geometric mean** of the yearly **chain** development ratios, not
their arithmetic mean — the change accumulates year by year in compound-interest fashion, and an arithmetic
mean will give a result that is too large.

Example: the incidence of gastric cancer in men in some place fell from 106.63 to 65.33 (per 100 000)
between 1988 and 2002. Taking 1988 as the base period:

- fixed-base development ratio $= 65.33/106.63 = 0.61$, that is, the incidence in 2002 was 61% of that in
  1988, a fall of 39% in 15 years;
- but looking at the chain development ratios year by year, they do **not** fall monotonically — 1989, 1996,
  1997, and 2000 all show a small rebound (a chain development ratio greater than 1);
- average development ratio $= \sqrt[14]{65.33/106.63} = 0.9656$, so the average growth rate
  $= 0.9656 - 1 = -3.44\%$, that is, an average fall of 3.44% a year over those 15 years.

**The fixed-base ratio shows the overall trend while the chain ratio shows the fluctuation from period to
period, and the two must be read together**: from the fixed-base ratio alone you would think the fall was
steady all the way, and from the chain ratios alone you cannot see a long-term direction. When analyzing this
kind of longitudinal data, watch the comparability of the background as well: if the level of diagnosis
improved over those years, part of the fall in incidence is "fewer cases being found", and it cannot all be
counted as the fruit of prevention and treatment.

### Standardization of rates

#### Why standardization is needed

Whether two overall rates can be compared directly depends on the two groups having the same or a similar
**internal composition**. Look at an example.

| Age (years) | Men: number | Patients | Incidence rate (‰) | Women: number | Patients | Incidence rate (‰) |
| --- | --- | --- | --- | --- | --- | --- |
| 30~ | 3150 (38.58%) | 27 | 8.57 | 6950 (73.54%) | 52 | 7.48 |
| 50~ | 5014 (61.42%) | 28 | 5.58 | 2500 (26.46%) | 13 | 5.20 |
| Total | 8164 | 55 | **6.74** | 9450 | 65 | **6.88** |

Group by group, **the incidence rate in every age group is higher in men than in women** (8.57 > 7.48,
5.58 > 5.20); yet looking at the totals, **women are higher than men** (6.88‰ > 6.74‰). The contradiction
lies in the age composition: among the women studied the 30~ group makes up 73.54%, and 30~ is precisely the
high-incidence age; the bulk of the men are in the 50~ group, where the incidence rate is low. **Age** is the
**confounding factor** here — it is related to "sex" (men and women have different age distributions) and it
also affects "whether the disease occurs".

When the difference in internal composition between two groups is large enough to affect the conclusion, the
**overall rates are not comparable and cannot be compared directly**. There are three ways out: **stratified
comparison** (compare men and women separately within each age group); **multivariable analysis** when the
confounding factors are many; or **standardization of the rates**, which unifies the internal composition
before comparing.

#### The basic idea of standardization

**Standardization** is the method of comparing rates under a **specified standard composition**: a single
uniform "standard population (standard composition)" is used to adjust the rates of the groups, and the
resulting **standardized rate** (also called the adjusted rate) has the influence of a different internal
composition on the overall rate removed, so that it is comparable.

Remember what it is: a standardized rate **does not represent the actual level**. It answers "what would the
rate be if this population had the same internal composition as the standard population", and so it **can
only be used for comparison**.

#### The direct method

When **the rates of the individual subgroups of the group being standardized are known** (age-specific
incidence rates, say), the direct method is used:

$$p' = \frac{\sum N_i p_i}{N}$$

Here $p_i$ is the actual rate in each subgroup of the group being standardized, $N_i$ is the number of people
in each subgroup of the standard group, and $N = \sum N_i$ is the total number of people in the standard
group. The numerator $\sum N_i p_i$ is the **expected number of events**: using the subgroup rates of the
group being standardized to predict how many people in the standard population would experience that event;
dividing by the standard total then gives the standardized rate.

The standard composition may be chosen in four ways: ① the age-specific population counts of a national or
local census; ② the age-specific population counts from a large sample survey; ③ the population counts of
either one of the two sets of data; ④ the sums of the population counts of the two sets of data in each age
group. The table above uses ④:

| Age (years) | Standard number $N_i$ | Male incidence $p_1$ (‰) | Expected patients $N_i p_1$ | Female incidence $p_2$ (‰) | Expected patients $N_i p_2$ |
| --- | --- | --- | --- | --- | --- |
| 30~ | 10100 | 8.57 | 87 | 7.48 | 76 |
| 50~ | 7514 | 5.58 | 42 | 5.20 | 39 |
| Total | 17614 | — | 129 | — | 115 |

So the standardized incidence rate in men is $p'_1 = 129/17614 \times 1000 = 7.32$, that is 7.32‰, and in
women $p'_2 = 115/17614 \times 1000 = 6.53$, that is 6.53‰. **After standardization the incidence situation
is more serious in men than in women**, in agreement with the group-by-group comparison of the age groups —
and this is the conclusion once the influence of the age composition has been removed.

If the population counts of the women in each age group are used as the standard instead (6950 in the 30~
group and 2500 in the 50~ group, 9450 in total), and the calculation is done step by step on exactly the same
convention as in the table above (round each age group's expected number $N_i p_i$ to an integer first, then
add): for men the 30~ group gives $6950 \times 8.57‰ = 59.56$, rounding to 60, and the 50~ group gives
$2500 \times 5.58‰ = 13.95$, rounding to 14, a total of 74. For women the 30~ group gives
$6950 \times 7.48‰ = 51.99$, rounding to 52, and the 50~ group gives $2500 \times 5.20‰ = 13.00$, rounding to
13, a total of 65. The result then becomes $p'_1 = 74/9450 \times 1000 = 7.83$ (7.83‰) for men and
$p'_2 = 65/9450 \times 1000 = 6.88$ (6.88‰) for women: **the numbers change, but the conclusion (men above
women) does not**.

Two points to watch when applying the direct method:

- **choose a different standard and the numerical value of the standardized rate is different**, so when
  several standardized rates are to be compared with each other they must all use **the same standard**;
  even so, in general **the direction of the comparison does not change**.
- **not every set of data allows a standardized rate to be computed**: if the group being standardized shows
  **crossover** — some subgroups high and others low (men higher than women in the 30~ group but lower in the
  50~ group, for instance) — then changing the standard may change the conclusion; standardization is not
  appropriate here, and the rates of the groups should be presented directly, stratified.

#### The indirect method

When **the subgroup rates of the group being standardized are unknown** and all that is known is the number
of people in each subgroup of that population and one total number of events (total deaths, say), while the
subgroup rates of the standard population are known, the indirect method is used:

$$p' = P \cdot \frac{r}{\sum n_i P_i}$$

Here $P$ is the overall rate of the standard group, $P_i$ is the rate in each subgroup of the standard group,
$n_i$ is the number of people in each subgroup of the group being standardized, and $r$ is the total number
of events actually observed in the group being standardized. The quantity $r / \sum n_i P_i$ is the **ratio
of observed to expected numbers**; when it is used on mortality data it is called the **standardized
mortality ratio**:

$$\text{SMR} = \frac{r}{\sum n_i P_i}$$

- $\text{SMR} > 1$: the observed number of deaths is higher than the expected number computed from the
  age-specific mortality rates of the standard population — the age composition of the population cannot
  account for it, and the mortality level of that population really is on the high side;
- $\text{SMR} < 1$: the observed number is lower than expected, and the mortality level of that population
  really is on the low side;
- $\text{SMR} = 1$: the observed and expected numbers are the same.

Example: a county has a male population of 493 700, and 391 men die of liver cancer in one year (a liver
cancer mortality rate of 79.20 per 100 000), while the male liver cancer mortality rate in the region the
county belongs to is only 6.55 per 100 000. Taking the region's age-specific liver cancer mortality rates as
the standard and computing from the population of men in each age group in the county, the **expected**
number of liver cancer deaths is 29.89, so

$$\text{SMR} = \frac{391}{29.89} = 13.08, \qquad p' = 6.55 \times 13.08 = 85.67$$

That is, once the influence of the age composition is taken out, the male liver cancer mortality rate in the
county (85.67 per 100 000) is still far above the region's, and the county may be considered a high-incidence
county for liver cancer.

The indirect method has one crucial limitation: the expected number is computed from the **population
composition of the group being standardized itself**, so $p'$ still carries information about that
population's age composition — **two indirectly standardized rates generally cannot be compared with each
other**. What it suits is the comparison of "one particular population against the standard population" (an
occupational group against the local general population, for example), and it is usually read together with
the SMR.

#### Four rules for using standardized rates

1. **A standardized rate is only for comparison and cannot reflect the actual level.** In a report you
   cannot write "the standardized mortality rate of the county is 85.67 per 100 000, which shows that the
   county's mortality rate is 85.67 per 100 000"; you can only say "after standardization it is still higher
   than the control area".
2. **Comparing several standardized rates requires the same standard.** Different standards give different
   numbers, and comparing standardized rates computed from different standards with each other is
   meaningless.
3. **Do not use standardization when the group rates clearly cross**; compare the rates of the groups
   directly, stratified.
4. **The comparison of two sample standardized rates still requires a hypothesis test.**

The same idea can be used on means: in comparing the average length of stay between two hospitals, if their
department compositions differ greatly (one is a general hospital, the other mainly chronic diseases), the
comparison has to be made after adjusting to a single departmental composition.

## Doing it in R

Describing qualitative data comes down to three actions: **counting frequencies** (`table()`), **turning them
into rates or proportions** (`prop.table()`), and **adding totals** (`addmargins()`), and finally drawing a
bar chart or a pie chart. Everything below uses data that come with R (`UCBAdmissions`, `Titanic`,
`HairEyeColor`, `Nile`) and can be pasted into RStudio and run.

### 1. Contingency tables: table() and addmargins()

`table()` crosses two qualitative variables and counts, giving a contingency table (frequency table).

```r
# Hemoglobin test results of 200 students: each line is one observational unit
sex <- c(rep("Male", 120), rep("Female", 80))
hb  <- c(rep("Anemia", 18), rep("Normal", 102),   # 18 anemic among the boys
         rep("Anemia",  8), rep("Normal",  72))   # 8 anemic among the girls

# Fix the order of the levels and the result will not change with the system locale
sex <- factor(sex, levels = c("Male", "Female"))
hb  <- factor(hb,  levels = c("Normal", "Anemia"))

tab <- table(sex, hb)     # cross-count two qualitative variables → contingency table
tab
#         hb
# sex      Normal Anemia
#   Male      102     18
#   Female     72      8

addmargins(tab)           # add the row totals, the column totals, and the grand total
#         hb
# sex      Normal Anemia Sum
#   Male      102     18 120
#   Female     72      8  80
#   Sum       174     26 200
```

The `Sum` row and column that `addmargins()` produces are the "total" that a statistical table must carry. It
is not just for looks: **they are precisely the numerator and denominator you need for an overall rate** (26
anemic subjects out of 200 people in total). Here `levels` has been fixed for both variables, so the order is
settled — otherwise R sorts by the system locale and the order of male and female may come out unexpectedly.

### 2. prop.table(): a rate and a proportion differ only in the denominator

`prop.table()` turns frequencies into proportions, and the key is the `margin` argument, which decides
whether the denominator is the "row total", the "column total", or the "grand total".

```r
# margin = 1: each row sums to 1 → the composition within each sex
round(prop.table(tab, margin = 1), 3)
#         hb
# sex      Normal Anemia
#   Male     0.85   0.15
#   Female   0.90   0.10

# Take only the "Anemia" column and you get the anemia rate of men and of women
round(prop.table(tab, margin = 1)[, "Anemia"], 3)
#   Male Female
#   0.15   0.10      → anemia rate 15.0% in men, 10.0% in women

# margin = 2: each column sums to 1 → the denominator becomes "all anemic subjects"
round(prop.table(tab, margin = 2)[, "Anemia"], 3)
#   Male Female
#  0.692  0.308      → men make up 69.2% of the anemic subjects (a proportion, not a rate!)

# No margin: each cell's share of all 200 subjects, and all the cells sum to 1
round(prop.table(tab), 3)
```

With the same batch of numbers, the numerator being "the 18 anemic men" throughout, **taking 120 as the
denominator gives a rate of 15.0%** (how intensely anemia occurs in men) and **taking 26 as the denominator
gives a proportion of 69.2%** (the share of men among the anemic). In R, the difference between a rate and a
proportion is the difference in the `margin` argument — so the `margin` of `prop.table()` must always be
written explicitly; write it wrongly and the nature of the index changes.

### 3. An overall rate cannot be averaged: UCBAdmissions

`UCBAdmissions` is the record of graduate admissions at Berkeley in 1973, a three-dimensional contingency
table that comes with R: admission outcome × gender × department.

```r
# Start with the overall picture
tab2 <- margin.table(UCBAdmissions, c(1, 2))   # admission outcome x gender
addmargins(tab2)
#           Gender
# Admit      Male Female  Sum
#   Admitted 1198    557 1755
#   Rejected 1493   1278 2771
#   Sum      2691   1835 4526

round(prop.table(tab2, margin = 2), 3)
#           Gender
# Admit       Male Female
#   Admitted 0.445  0.304
#   Rejected 0.555  0.696
# Admission rate 44.5% for men and 30.4% for women — a gap of 14 percentage points

# Break it down by department: the admission rate of men in each department
male_adm <- UCBAdmissions["Admitted", "Male", ]         # men admitted, by department
male_all <- apply(UCBAdmissions[, "Male", ], 2, sum)    # men applying, by department
round(male_adm / male_all, 3)
#     A     B     C     D     E     F
# 0.621 0.630 0.369 0.331 0.277 0.059

# The wrong approach: average the rates of the six departments directly
round(mean(male_adm / male_all), 3)        # 0.381

# The right approach: add up numerators and denominators separately, then divide
round(sum(male_adm) / sum(male_all), 3)    # 0.445
```

The two numbers differ by 6.39 percentage points. The reason is the same as in the example of the
age-specific mortality rates: **the numbers of observational units in the groups differ a great deal** (825
men apply in department A and 373 in department F), so averaging directly is the same as treating the six
departments as equally heavy, which raises the weight of a department like F, "extremely low admission rate
but not many applicants". Whenever you want an overall rate from grouped data, take the route
`sum(numerator) / sum(denominator)`; the total row and column printed by `addmargins()` are the numerator and
denominator ready-made.

### 4. Standardization of rates: the direct and the indirect method

Since "department" is the confounding factor, treat it as the stratifying variable and standardize by the
direct method, using **the departmental composition of all applicants** as the standard:

```r
# Admission rate by department and gender: each cell's denominator is that department's
# applicants of that gender. Rearrange it as "department x gender" so that it can be
# weighted by department later
rate <- t(prop.table(UCBAdmissions, c(2, 3))["Admitted", , ])
round(rate, 3)
#     Gender
# Dept  Male Female
#    A 0.621  0.824
#    B 0.630  0.680
#    C 0.369  0.341
#    D 0.331  0.349
#    E 0.277  0.239
#    F 0.059  0.070

# The direct method in three steps: choose a standard → compute the expected numbers →
# sum of the expected numbers / standard total
std      <- margin.table(UCBAdmissions, 3)   # standard counts N_i: total applicants per department
expected <- sweep(rate, 1, std, "*")         # each cell = standard count x that department's rate for that gender
round(colSums(expected) / sum(std), 3)
#   Male Female
#  0.387  0.430
```

The crude rates are **44.5% for men > 30.4% for women**, and after standardization they become **38.7% for
men < 43.0% for women** — the direction has reversed. The reason is that women apply more to the departments
with lower admission rates (C~F), and that composition drags their overall rate down; once the departmental
composition of the two groups is unified to that of all applicants, the difference disappears. This is the
famous case of **Simpson's paradox** in statistics: the difference in the overall rates comes mainly from
"where people applied (department)" rather than from sex itself.

::: warning Being able to compute it does not mean you may draw a conclusion
The admission rates of the departments **cross** in this example (women are higher in A, B, D, and F, men in
C and E), and by the rules of this chapter standardization should not be used to draw a conclusion when the
rates clearly cross — the right thing to do is to present the departments' rates stratified and discuss them
against the subject-matter background. What this piece of code demonstrates is the **algorithm**; be cautious
about conclusions.
:::

The indirect method goes in the other direction: only the numbers in each of your own subgroups and one total
number of events are known, and the subgroup rates of the standard population are borrowed to compute the
expected number. Using `Titanic` (class × sex × adult/child × survived) as the demonstration:

```r
# Crude (overall) survival rate: ignoring class
crude <- prop.table(margin.table(Titanic, c(2, 4)), 1)[, "Yes"]
round(crude, 3)
#   Male Female
#  0.212  0.732      → 21.2% for men, 73.2% for women

# The survival rate in each class (collapsing age)
tt    <- margin.table(Titanic, c(1, 2, 4))
rate2 <- prop.table(tt, c(1, 2))[, , "Yes"]
round(rate2, 3)
#       Sex
# Class   Male Female
#   1st  0.344  0.972
#   2nd  0.140  0.877
#   3rd  0.173  0.459
#   Crew 0.223  0.870

# The direct method: use the class composition of all passengers as the standard
std2      <- margin.table(Titanic, 1)
expected2 <- sweep(rate2, 1, std2, "*")
round(colSums(expected2) / sum(std2), 3)
#   Male Female
#  0.214  0.754      → after standardization 21.4% for men, 75.4% for women

# The indirect method: only the counts per class and one total death count are known; borrow
# the standard population's death proportion in each class to compute the expected number
p_std  <- prop.table(margin.table(Titanic, c(1, 4)), 1)[, "No"]  # standard: death proportion per class
n_male <- margin.table(Titanic, c(2, 1))["Male", ]               # number of men in each class
r_obs  <- sum(Titanic[, "Male", , "No"])                         # observed deaths among men
expected3 <- sum(n_male * p_std)                                 # expected deaths
smr <- r_obs / expected3                                         # standardized mortality ratio, SMR
P   <- sum(Titanic[, , , "No"]) / sum(Titanic)                   # overall death rate of the standard population
round(c(observed = r_obs, expected = expected3, SMR = smr, rate = P * smr), 3)
# observed = 1364 (observed deaths), expected ≈ 1209.4 (expected deaths)
# SMR ≈ 1.128 > 1: the observed number of deaths is higher than the expected number computed from the class composition of all passengers
# rate ≈ 0.764: the indirectly standardized death rate
```

How to read these numbers:

- `rate2` is the survival rate **within each class**; `colSums(expected2) / sum(std2)` is the standardized
  survival rate **weighted by a single class composition**. In this example the crude and the standardized
  rates of the two groups agree in direction and in magnitude (men 21.2% → 21.4%, women 73.2% → 75.4%, while
  men and women differ by more than 50 percentage points), which shows that "class composition" has very
  limited power to explain the difference in survival between men and women — **finding the conclusion
  unchanged after standardizing is itself useful information**: it rules out the explanation that "a
  difference in composition caused the difference".
- the `rate` computed by the indirect method can only be compared with the standard population (all
  passengers); it **must not be compared with another rate computed by the indirect method**.
- `SMR > 1` means the observed number of deaths exceeds the expected number, so the age/class composition is
  not enough to explain the difference; `SMR < 1` means the mortality level of that population is in fact
  lower than the standard population's.

### 5. Dynamic series: fixed-base ratio, chain ratio, and average development ratio

```r
# R's built-in Nile: the annual flow of the Nile, 1871-1970; take the last 10 years as a dynamic series
x <- window(Nile, start = 1961)

base   <- x[1]                                            # value of the fixed base period (1961)
dingji <- as.numeric(x) / base                            # fixed-base development ratio: each year / the base
huanbi <- as.numeric(x)[-1] / as.numeric(x)[-length(x)]   # chain development ratio: each year / the previous year

round(cbind(fixed_base = as.numeric(dingji), chain = c(NA, huanbi)), 3)

# Self-check: the product of the yearly chain ratios = the last year's fixed-base ratio
isTRUE(all.equal(prod(huanbi), dingji[length(dingji)]))   # TRUE

# Average development ratio = the fixed-base ratio taken to the n-th root = the geometric mean of the yearly chain ratios (n = number of years - 1)
n <- length(x) - 1
c(geometric = prod(huanbi)^(1 / n),
  root = (x[length(x)] / x[1])^(1 / n))    # the two numbers are equal

# Average growth rate = average development ratio - 1
prod(huanbi)^(1 / n) - 1
```

How to read it: the first entry of the `fixed_base` column is always `1.000` (the base period against
itself); the first entry of the `chain` column is necessarily a missing value (the first year has no previous
year). **The fixed-base ratio shows the overall trend, the chain ratio the fluctuation from period to
period.** The average development ratio uses the geometric mean rather than the arithmetic mean — the two
computations above giving the same result shows exactly that "the fixed-base ratio taken to the $n$-th root"
is "the yearly chain ratios multiplied together and taken to the $n$-th root".

### 6. Plotting: bar charts and pie charts

`HairEyeColor` is the three-dimensional contingency table of hair color × eye color × sex for 592 students
that comes with R.

```r
eye_sex <- margin.table(HairEyeColor, c(2, 3))   # eye color x sex

# Bar chart: look at the frequencies (numbers of students) first
barplot(eye_sex, beside = TRUE, legend.text = TRUE,
        xlab = "Sex", ylab = "Number of students",
        main = "Eye color of students by sex (frequency)")

# If what you want to compare is the "composition" rather than the "number of students",
# convert the frequencies to proportions before plotting
barplot(prop.table(eye_sex, margin = 2), beside = TRUE, legend.text = TRUE,
        xlab = "Sex", ylab = "Proportion",
        main = "Eye color of students by sex (proportion)")

# Pie chart: the composition of the parts within one variable
# pie() does not label the percentages automatically, so compute them yourself first
eye <- margin.table(HairEyeColor, 2)             # eye color distribution of all students
pct <- round(100 * eye / sum(eye), 1)
pie(eye, labels = paste0(names(eye), " ", pct, "%"),
    main = "Eye color composition of all students")
```

- `beside = TRUE` puts the bars of the groups side by side; `legend.text = TRUE` automatically uses the row
  names (eye color) as the legend.
- The first chart shows the **frequencies**, the second the **proportions**. The eye color compositions of the
  two groups differ very little (brown 35.1% and 39.0%, blue 36.2% and 36.4%, …), but there are more women
  than men (313 against 279), so in the frequency chart the women's bars are higher overall. **This is exactly
  the difference between "more people" and "a larger share"** — before plotting, be clear about which of the
  two you want to show.
- A pie chart can only represent a **proportion** (the parts summing to 100%) and cannot be used for a rate.
  Showing an "incidence rate" in a pie chart is a common graphical error.
- For a neater grouped bar chart you can use `geom_bar()` from ggplot2 (see Lecture 11 of *Introduction to
  Information Technology*); once the plot is drawn, remember that the title and the axis labels must carry the
  index and its unit.
- Running this in RStudio is the least trouble. If you draw directly with the command-line `Rscript`, the
  default pdf device may report a `conversion failure` warning for Chinese labels (the plot is still drawn,
  only the Chinese characters are dropped): use RStudio's plotting window instead, or open a device that
  supports Chinese first with `pdf("out.pdf", family = "GB1")`.

## Common pitfalls

- **Taking a proportion for a rate — the biggest pitfall of this chapter.** "Of the 1907 measles children
  admitted, the 1-year group makes up 37.49%, so measles incidence is highest in 1-year-old children", "of 600
  children admitted with burns, 52% of those in shock are under 3 years old, so the younger the child the
  higher the shock rate", "of 64 patients with a certain disease, 46.88% have blood type O, so people with
  blood type O are the most likely to get this disease" ([Chapter 1](/en/Health-statistics/01-introduction)
  gave this last example) — all three sentences go wrong in the same place: what has been computed is a
  **proportion within the cases**, the denominator being "patients", whereas "likely or not to get the
  disease" needs "people who may get the disease" as the denominator. The words of the conclusion tell you:
  "more likely, more severe, more frequent" means a rate must be used.
- **Computing a rate when the denominator is too small.** Making proportions out of 9 deaths, calling 1
  responder out of 3 treated an effective rate of 33.33%, calling 1 responder out of 2 a 50% rate — with a
  small denominator a rate is a roller-coaster. The proper practice: when the number of observational units
  is small, report absolute numbers; when a relative number has to be used, give the confidence interval for
  the rate as well.
- **Taking the arithmetic mean of the rates when an overall rate is wanted.** Averaging the age-specific
  malignant tumor mortality rates gives 195.80 per 100 000, when the correct value is
  $725/936446$ converted, 77.42 per 100 000; averaging the infection rates 8%, 10%, and 17% of a
  kindergarten's older, middle, and younger classes gives 11.67%, when the correct value is "total infected ÷
  total children", about 19/180 = 10.6%. **The arithmetic mean equals the overall rate only when all the
  groups have the same number of observational units**; for grouped data always "add the numerators, add the
  denominators, then divide".
- **Letting people in whom the phenomenon "cannot occur" into the denominator.** In computing the incidence
  of a disease the denominator includes people who already have it; in computing the inpatient case fatality
  rate the denominator includes patients who do not have that disease; using "inpatients" as the denominator
  to compute the incidence of a disease gives a number that cannot represent the population at all. **Before
  you write down any rate, say the definition of its denominator to yourself once.**
- **Comparing the overall rates of two groups whose internal composition differs.** When the age, sex, or
  severity composition of the two groups differs, the difference in the overall rates may come entirely from
  the composition (a confounding factor). Here you should compare stratified or standardize, remembering the
  several limits on standardized rates: **they are only for comparison and do not represent the actual
  level**; the comparison must use **the same standard**; **standardization is not appropriate when the group
  rates clearly cross**; and the comparison of two sample rates (or standardized rates) **still requires a
  hypothesis test** (Chapter 10, chi-square tests).

## How it connects to the other courses

::: tip Related pages
- **[Lecture 4 of *Introduction to Information Technology*, Lists and Factors](/en/intro-it/4-lists-and-factors)**
  — the **prerequisite** of this chapter in R. That lecture covers how to build a factor with `factor()`, how
  to set the order with `levels`, and how to count frequencies with `cut()` and `table()`; this chapter's
  contingency table is exactly the output of `table()`, and ordinal data are exactly "a factor with
  `ordered = TRUE`". Get the order wrong and the arrangement of the proportions is muddled, and the
  conclusion of a rank-sum test later on comes out reversed.
- **[Lecture 14 of *Introduction to Information Technology*, Tests of Homogeneity and Contingency Tables](/en/intro-it/14-goodness-of-fit-and-contingency)**
  — that lecture and this chapter divide the work between **description** and **testing**: this chapter
  computes rates and proportions and answers "which group is higher, by how much, and who the denominator is";
  that lecture uses `chisq.test()` and similar methods to answer "whether this difference is caused by
  sampling error and whether it can be generalized to the population". The point this chapter stresses again
  and again, that "a comparison of sample rates should be put to a hypothesis test", is carried out in that
  lecture. The order is **describe first, test afterwards**: without this chapter's description, a test would
  not even know what it was testing.
- **[Lecture 3 of *Introduction to Information Technology*, Arrays and Data Frames](/en/intro-it/3-arrays-and-data-frames)**
  — the `UCBAdmissions` and `Titanic` used in this chapter are both multi-dimensional arrays with `dimnames`
  (contingency tables), and the `margin` argument of `margin.table()` and `prop.table()` is the **subsetting
  by dimension** of that lecture. Only when you can read the dimension names can you write a subscript like
  `["Admitted", , ]` correctly.
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/en/intro-it/9-base-graphics)** —
  the `barplot()` and `pie()` of this chapter have their full arguments (color, legend, labels, font size) in
  that lecture. There the question is "how to draw"; here it is "should I plot frequencies or proportions,
  and why can a pie chart not show a rate".
- **[Lecture 11 of *Introduction to Information Technology*, The ggplot2 Package](/en/intro-it/11-ggplot2)**
  — using `geom_bar(position = "fill")` or `coord_polar()` to draw proportion bar charts and pie charts is
  less trouble and better suited to a paper.
- **[Lecture 12 of *Introduction to Information Technology*, Parameter Estimation](/en/intro-it/12-parameter-estimation)**
  — when the number of cases is small this chapter asks for "the confidence interval for the rate", and how
  to compute such an interval is in that lecture (estimating a population rate is also the content of
  Chapter 6 of this course).
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)**
  — in raw hospital data the columns for sex, department, and diagnosis often need work before this
  chapter's contingency tables can be computed at all: attribute columns are selected or dropped
  (`subset()`), numeric variables are binned (equal width / equal frequency) and standardized
  (min-max, Z-score). Missing values belong to Week 1 instead (finding and deleting them with
  `na.omit()`).
- **[Week 5 of *Medical Big Data Analysis and Decision Making*, Classification (Part 1)](/en/Medical-Big-Data-Analysis/5-classification-1)**
  — the sensitivity, specificity, and accuracy of a confusion matrix are in essence conditional rates
  computed on a contingency table with different denominators, the same way of thinking as this chapter's "a
  rate and a proportion differ only in the denominator". The difference is that there the concern is "how
  accurately the model predicts", while here it is "whether the description is right".
:::

<!-- Back-link suggestions
Suggest linking back to this page (all pointing at /en/Health-statistics/05-describing-qualitative-data) from:
- /intro-it/4-lists-and-factors, at "Exercise 6: cut for binning and table for frequency counting", adding a sentence "for how the contingency table produced by table() is turned into rates and proportions, see Health Statistics, Chapter 5".
- /intro-it/14-goodness-of-fit-and-contingency, at "summary of this lecture", adding a sentence "the descriptive indices of a contingency table (rate, proportion) and the cautions about relative numbers are in Health Statistics, Chapter 5: describe first, test afterwards".
- /intro-it/9-base-graphics, where barplot/pie are discussed, adding a sentence "the difference between a frequency chart and a proportion chart, and why a pie chart cannot show a rate, are in Health Statistics, Chapter 5".
- /intro-it/3-arrays-and-data-frames, where multi-dimensional array subscripts are discussed, adding a sentence "the use of margin.table/prop.table on a contingency table is in Health Statistics, Chapter 5".
- /Medical-Big-Data-Analysis/2-data-preprocessing, where categorical variable encoding is discussed, adding a sentence "the descriptive indices for categorical variables are in Health Statistics, Chapter 5".
- /Health-statistics/01-introduction, where the pitfall of "using a proportion instead of a rate" is discussed, adding a sentence "the complete way of deciding is in Health Statistics, Chapter 5".
-->

## Summary

1. **Qualitative data divide into count data and ordinal data**, and neither allows a mean to be computed;
   the basic tool for describing them is the **relative number**, of which the most commonly used are the
   rate, the proportion, and the ratio.
2. **The three relative numbers are told apart by their denominators**: the denominator of a rate is "all the
   observational units in which the phenomenon may occur" (it speaks of intensity); the denominator of a
   proportion is "the total of the same whole" (it speaks of the share of each part, the parts summing to
   100%, one up and one down); the numerator and denominator of a ratio need not be of the same kind (it
   speaks of how many times one is of the other).
3. **A rate and a proportion must never be interchanged**: "likely or not, severe or not" requires a rate,
   "how much it takes up, which part dominates" requires a proportion. Too small a denominator, the wrong
   definition of the denominator, a proportion in place of a rate, and an arithmetic mean taken for an
   overall rate are the four commonest mistakes in using relative numbers.
4. **A dynamic series shows the trend**: the fixed-base ratio reflects the overall trend of change, the chain
   ratio reflects the change from period to period, the average development ratio is the geometric mean of
   the yearly chain ratios, and the average growth rate = average development ratio − 1.
5. **When the internal composition differs, the overall rates cannot be compared directly**; stratified
   comparison or standardization of rates can be used instead: the direct method uses "standard number × the
   subgroup rates of the group being standardized" to get the expected numbers, $p' = \sum N_i p_i / N$; the
   indirect method borrows the subgroup rates of the standard population to get the expected numbers and the
   SMR, $p' = P \cdot r / \sum n_i P_i$. A standardized rate **is only for comparison and does not represent
   the actual level**, standardized rates computed from different standards cannot be compared with each
   other, standardization is not appropriate when the rates clearly cross, and the comparison of sample rates
   still requires a hypothesis test.
