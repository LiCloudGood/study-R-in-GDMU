---
layout: doc
title: '1. Introduction'
---

# Chapter 1. Introduction

::: info Translation status
Translated from the [Chinese original](/Health-statistics/01-introduction). Numbers, formulas, and R
code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> This chapter teaches no particular algorithm. It sets up the coordinate system for the whole
> course: translating a medical question into the language of *population and sample, parameter and
> statistic, variable and data, sampling error, probability*, and laying out the four steps of a
> statistical study.

## What this chapter is for

Medical data come with two built-in difficulties: **individual variation** and **uncertainty**. People
with the same disease can differ in symptoms, response to treatment, and outcome; conversely,
identical-looking symptoms may sit on top of entirely different diseases. Every question a researcher
holds is essentially "given a batch of numbers that vary, how do I reach a judgment?"

- To map the prevalence and risk factors of major chronic diseases among adults nationwide, the
  population is far too large and time and funding are limited, so a full census is impossible and
  only a subset can be sampled. Then: how many people are enough? What should be measured? Can the
  prevalence measured in the sample represent the whole country?
- A pharmaceutical company has developed a new drug for type 2 diabetes and wants to evaluate its
  efficacy and safety. Then: how many patients are needed? How should they be allocated so that the
  two groups are "identical except for the drug, with other prognostic factors distributed
  comparably"? Is the difference in blood glucose between the two groups caused by the drug, or by
  having happened to sample different people?

Both kinds of setting (sample surveys and clinical trials) have to be answered with statistics. But
before any answer, a set of basic concepts has to be made clear: what a population is and what a
sample is, what can and cannot be computed, where error comes from, and how large a difference
deserves attention. **This chapter establishes that shared language**, and every method in the
chapters that follow rests on these concepts.

**Osler, regarded as the father of modern medicine, said: medicine is a science of uncertainty and an
art of probability.** That is exactly the point — biomedical work is full of individual variation and
uncertainty, some of it with known causes and some without. Underlying regularities (necessity) always
reveal themselves through large numbers of chance events, and the task of statistics is to detect the
regularity through the chance and to make scientific inferences from data that vary.

<TrackList :tasks="['Explain population, sample, parameter, and statistic in your own words', 'Decide which type a given data set belongs to', 'Say clearly why sampling error cannot be avoided', 'Know which of the four steps of a statistical study matters most']" />

## Core concepts

### Statistics and health statistics

**Statistics is the science and art of handling variability in data**; it covers collecting,
organizing, analyzing, interpreting, and presenting data, with the aim of reaching reliable
conclusions. Applied to different fields it splits into different branches:

| Branch | Field of application | Emphasis |
| --- | --- | --- |
| biostatistics | biological research | biological measurement |
| medical statistics | medical research | clinical medicine |
| health statistics | medical research | preventive medicine and public health |

The boundaries between the three are not strict, and a great deal of material overlaps. In this
course, **health statistics** is defined as:

> the science that applies the basic principles and methods of probability theory and mathematical
> statistics to the collection, organization, and analysis of data on the health status of a
> population and in the field of health services.

It is an indispensable tool for analyzing and solving problems in health-related research, and a basic
skill that health professionals must have for research work: reading the literature, applying for
grants, writing papers, clinical trials of new drugs, and professional and licensing examinations all
come back to it.

### Observation units, homogeneity, and variation

The **individual** (observation unit) is the most basic unit of a statistical study. It can be a
person, an animal, a household, a cell, or a sampling site — it depends on the purpose of your study.

**Homogeneity**: the observation units share the same features or attributes. For example, in a study
of the growth and development of 5-year-old boys in a given area, "that area, male, 5 years old" are
the attributes the units share, and every boy is a homogeneous individual.

**Variation**: the difference between the observed values of some feature or attribute among
homogeneous individuals. Five-year-old boys in the same area cannot all have exactly the same height,
weight, blood pressure, and vital capacity.

Two sentences are worth memorizing:

- **without homogeneity there is no population** — "homogeneous" is your criterion for defining whom
  you are studying;
- **without variation within a population there is no need for statistics** — if every observed value
  were the same, counting one would be enough.

The task of statistics is precisely **to study variation on a basis of homogeneity**, and thereby to
reveal the underlying regularity of things.

### Population and sample

A **population** is the **whole set of homogeneous observation units** defined by the purpose of the
study; more precisely, it is the set of values of some variable over all homogeneous observation
units.

Populations fall into two kinds by extent:

- **finite population**: the number of individuals is limited, with a specific time and place. For
  example, "the pulse rates of normal adult men in a certain area in 2007" — the people, the place,
  and the time are all pinned down.
- **infinite population**: the number of individuals is unlimited, or practically impossible to count
  exactly, and there is no restriction on time or place. For example, "the therapeutic effect in all
  hypertensive patients receiving a particular new drug" — no boundary can be drawn.

A **sample** is a **randomly drawn**, **representative** subset of observation units from the
population. The number of observation units in a sample is the **sample size**, written $n$.

Why must we sample? Most populations in medical research are infinite, and observing the whole
population is practically impossible; even when the population is finite, if there are too many
individuals, observing them one by one costs enormous manpower and resources and is sometimes simply
not feasible — **to check the proportion of bad eggs in a batch, you cannot break every egg.**

The words "randomly drawn" cannot be dropped: only a sample obtained on the principle of
randomization avoids the bias that a researcher may introduce, deliberately or not. A convenience
sample (asking whoever is easiest to reach) does not represent the population no matter how large it
is.

### Parameters and statistics

| | Meaning | Notation | Examples |
| --- | --- | --- | --- |
| **parameter** | an index describing a **population** characteristic, generally unknown | Greek letters | population mean $\mu$, population rate $\pi$, population standard deviation $\sigma$ |
| **statistic** | an index computed from **sample** observations | Latin letters | sample mean $\bar{X}$, sample rate $p$, sample standard deviation $S$ |

A parameter is what we want to know but do not; a statistic is what we can compute. If the sample
represents the population well, the statistic will be close to the corresponding parameter, and the
statistic can then be used **to estimate the parameter**. For instance, if the national prevalence of
diabetes is 4% and a sample of 50,000 people gives 3.9%, that sample can be called representative.

This also explains the pattern of the whole course: **every inference starts from a statistic and
reaches for a parameter**.

### Variables, values, and data

Having defined the population, the researcher observes or measures some feature or attribute of every
observation unit:

- **variable**: a feature or attribute of the observation units, such as age, sex, height, weight, or
  blood group;
- **value of a variable**: the measured value of the variable, also called the observed value;
- **data**: the collection of values of a variable.

Variables are classified by the nature of their values:

```text
variable
├── quantitative variable ── discrete variable (e.g. number of children, pulse count)
│                        └─ continuous variable (e.g. height, weight, blood pressure)
└── qualitative variable ── categorical variable ── binary (e.g. sex: male / female)
                         │                      └─ multi-category (e.g. blood group: O / A / B / AB)
                         └─ ordinal variable (e.g. effect: no effect < improved < markedly effective < recovered)
```

Correspondingly, data fall into two broad classes:

- **quantitative data**, in which the values are quantitative and expressed as magnitudes, generally
  with units of measurement, such as height (cm) or weight (kg);
- **qualitative data**, also called **categorical data**, in which the observed values are qualitative
  and expressed as mutually exclusive categories or attributes, generally without units of
  measurement. It subdivides further:
  - **count data**: data obtained by counting the number of observation units in each category,
    including **binary** categories (sex "male/female", test result "negative/positive", disease
    "affected/unaffected") and **unordered multi-category** ones (blood group "O/A/B/AB");
  - **ordinal data**, i.e. ordered multi-category data: data obtained by counting after grouping
    according to degree or rank. The categories are mutually exclusive but differ in degree, giving a
    "semi-quantitative" feel, such as the effect categories "cured, markedly effective, improved, no
    effect".

**The classification of data types is relative, and they can be converted into one another:**

- quantitative → qualitative: a hemoglobin measurement is a number, but split into
  "normal/abnormal" it becomes binary count data, and split into
  "severe/moderate/mild/normal/elevated" it becomes ordinal data;
- qualitative → quantitative: a health status of "very good, good, fair, poor, very poor" is
  ordinal data, but assigned 5, 4, 3, 2, 1 it can be handled as quantitative data; the same applies
  to coding sex as 0/1 and effect as 0, 1, 2, 3.

Why be so careful about the type? Because **different types of data require different statistical
methods** — quantitative data allow means and $t$ tests, count data allow only rates and proportions
with chi-square-type tests, and ordinal data usually call for rank-based tests. Get the type wrong
and the whole set of methods chosen afterwards is wrong.

### Sampling studies and sampling error

A **sampling study** draws a random sample from a population and uses the sample information to infer
the characteristics of the population.

**Sampling error** is the difference caused by random sampling, **between a sample statistic and the
population parameter**, and **between one sample statistic and another**. Its root is **individual
variation** — as long as individuals differ, the sample drawn cannot match the population exactly, and
two samples will not give exactly the same statistic.

Sampling error therefore has two important properties: **it cannot be avoided**, but in a sampling
study it **follows regularities** and its magnitude can be estimated statistically. The standard error
of the sample mean is the measure commonly used:

$$S_{\bar{X}} = \frac{S}{\sqrt{n}}$$

where $S$ is the sample standard deviation and $n$ is the sample size. The larger the sample, the
smaller the sampling error — but note that it only becomes smaller, never disappears.

Do not forget the larger family to which it belongs (used repeatedly later when measurement and
quality control come up). **Error** is the difference between an observed value and the true value,
and by nature it has two kinds:

- **random error**: error that is not constant but varies at random, including random measurement
  error and random sampling error; **unavoidable**;
- **non-random error**: systematic error (which has a direction and can be eliminated or reduced by
  design, calibration, blinding, and similar measures) and gross error (misrecording, miscopying —
  human mistakes).

### Probability and small-probability events

**Probability** is a numerical measure of how likely a random event is, usually written $P$, with the
probability of event $A$ written $P(A)$.

$$0 \le P(A) \le 1$$

- $P(A)=0$: an impossible event;
- $P(A)=1$: a certain event;
- $0<P(A)<1$: a random event, and the closer $P$ is to 1 the more likely it is.

How should probability be understood? Think of the referee tossing a coin before a match: we believe
the probability of heads and of tails are both 0.5. Historically people really did toss coins many
times — over 4040 tosses the proportion of heads was 0.5069, over 10,000 it was 0.5067, and over
24,000 it was 0.5005. The more tosses, the closer the proportion comes to 0.5. This shows that
**estimating a probability presupposes a sufficiently large sample**: the probability is the
proportion of times an event occurs over infinitely many independent repetitions under identical
conditions.

$$P(A) = \lim_{n \to \infty} \frac{m}{n} \quad (\text{where } m \text{ is the number of times } A \text{ occurs in } n \text{ repetitions})$$

A **small-probability event** is what statistics conventionally calls an event with $P(A) \le 0.05$,
meaning that **in a single experiment or observation the event is so unlikely that it can be regarded
as almost certainly not occurring**. This convention is the cornerstone of hypothesis testing later
on — rejecting $H_0$ when $P \le 0.05$ rests precisely on the rule that "a small-probability event
almost never happens in a single trial".

<ClickAnswer>

**Think about it**: a researcher studying residents' attitudes towards home hospital beds randomly
selected three residential districts, but then stopped people **at the main gate** of each district to
hand out questionnaires, and concluded that "residents of this area think home hospital beds are
unnecessary".

Is that conclusion reliable? Where is the problem?

---

Home hospital beds are aimed mainly at people who are chronically ill or cannot move about freely, so
the target population is elderly people and the family members close to them. But the people who pass
through a district gate are mostly younger and more mobile, so surveying only them biases the data
from the outset; moreover, several members of the same household may be surveyed repeatedly, and
family members' attitudes to such questions tend to be similar or converge, which worsens the bias.
The target population here is not clearly defined and the way the data were collected is inappropriate
(household visits were needed, but people were stopped at the gate instead), so the conclusion is
unreliable.

**Key point**: a sample being "random" does not make it "representative" — if the sampling frame and
the survey method are wrong, randomization cannot rescue them.

</ClickAnswer>

## The four steps of a statistical study

Statistical work is divided into **design, collection of data, sorting data, and analysis of data**.
These are not four independent stages but a tightly connected whole, and a problem at any one of them
can make the entire study worthless.

### 1. Design

Design is the first step and **the most critical one**, determining the success or failure of the
whole study. It means drawing up a careful research plan, including the overall conception and
arrangement of the whole process of collecting, sorting, and analyzing data; it generally has both a
subject-matter part and a statistical part, and can be divided into survey design, experimental
design, and clinical trial design.

One sentence conveys its weight: **calling in the statistician after the experiment is done may be no
more than asking him to perform a post-mortem examination — all he can do is tell you what the
experiment died of.** If the statistical design itself is flawed, no amount of sophistication will
help, and the analysis becomes a numbers game. Many researchers pay little attention to design and
only consult a statistician once the data are collected, by which time it is too late. So before a
study, be sure to read the literature, consult statistical professionals where necessary, and produce
a careful design.

### 2. Collection of data

Once the design is complete, the implementation stage begins, with the aim of obtaining **authentic,
reliable raw data**. The sources fall roughly into three kinds:

1. **Statistical returns**: forms that are legally required or designed uniformly by the state (health
   service returns, notifiable disease returns, occupational disease returns, hospital returns), which
   the relevant medical and health institutions report periodically level by level, and which must be
   **complete, accurate, and timely**;
2. **Routine work records**: medical records, ongoing health monitoring records, health examination
   records, and so on;
3. **Ad hoc surveys or experiments**: data collected in a survey or experimental study carried out for
   a specific topic.

### 3. Sorting data

Raw data are usually messy and need cleaning so that they become systematic and orderly and can be
analyzed further. This involves **checking, designing the grouping, summarizing, and drawing up
summary tables**, generally with the help of computer software. Before entry the data also have to be
coded, for example using 1 for male and 2 for female, or M and F.

::: tip What this step is called in R
Data cleaning, type conversion, and handling missing and outlying values all belong to "sorting data".
Converting the sex column from strings into a factor, or specifying the order of the ordered effect
levels, is exactly laying the groundwork for the analysis to come.
:::

### 4. Analysis of data

According to the purpose of the study, indices are computed, the basic features of the data are
described, appropriate statistical methods are chosen for analysis, and the internal connections and
regularities of the subject matter are brought out. Statistical analysis has two parts:

- **descriptive statistics**: measuring and describing the numerical features and distribution of the
  data by means of statistical indices, tables, and charts;
- **inferential statistics**: using sample information and appropriate statistical methods to infer
  the features of the population, including **parameter estimation** and **hypothesis testing**.

The $t$ test, $z$ test, analysis of variance, chi-square test, rank-based tests, bivariate association
analysis, simple linear regression, log-rank test, multiple linear regression, logistic regression,
Cox proportional hazards regression, and meta-analysis that later chapters cover all belong to the
toolbox of inferential statistics.

## Doing it in R

This chapter has almost no formulas, but the concepts are only really learned once they are in your
hands. Below we use R's built-in `faithful` data set (272 recorded eruptions of the Old Faithful
geyser in Yellowstone National Park, USA) to compute some **statistics** and to see what "estimating a
population parameter from a sample statistic" feels like.

```r
# Sample: duration of each eruption (minutes), 272 observations in total
x <- faithful$eruptions

n    <- length(x)        # sample size n
xbar <- mean(x)          # sample mean X-bar -- a statistic, used to estimate the population mean mu
s    <- sd(x)            # sample standard deviation S
se   <- s / sqrt(n)      # standard error of the sample mean, a measure of sampling error

n; xbar; s; se
```

How to read the output:

- `n` is `272`, the sample size;
- `xbar` is about `3.488`, the sample mean — note that this is a **statistic**, not a parameter, and it
  would change with another sample;
- `s` is about `1.141`, reflecting the degree of variation in eruption duration;
- `se` is about `0.069`, more than ten times smaller than `s`, showing that **the sampling error of a
  mean is far smaller than the variation between individuals**, and that it shrinks as the sample
  grows. This is why "sampling more people" improves the precision of an estimate, and it is the
  starting point of the parameter estimation chapter later.

The type of a variable determines what can be computed. Looking at the structure of the data with
`str()` is the first thing to do before any analysis:

```r
str(faithful)   # 272 obs. of 2 variables: both eruptions and waiting are numeric
```

Qualitative and ordinal variables are represented in R by **factors**; an ordinal variable also has to
have its level order stated explicitly, otherwise R treats it as an unordered category:

```r
# Unordered multi-category variable
blood <- factor(c("O", "A", "B", "O", "AB"))
table(blood)                 # count the number in each category -- sorting count data

# Ordered categorical variable (ordinal data): use ordered = TRUE and give the level order
effect <- factor(c("improved", "recovered", "no effect", "markedly effective"),
                 levels = c("no effect", "improved", "markedly effective", "recovered"),
                 ordered = TRUE)
effect
# [1] improved           recovered          no effect          markedly effective
# Levels: no effect < improved < markedly effective < recovered
```

The order of `levels` is the order of "degree" in ordinal data, and if the order is wrong the
conclusions of later rank-based tests will come out reversed. While we are here, these are the basic
functions used on this page: `mean()`, `sd()`, `length()`, `table()`, `factor()`, `str()` — all
general-purpose tools for working with vectors and data frames.

## Common pitfalls

- **Getting the data type wrong sends the whole set of methods wrong.** Ordinal data (such as
  "no effect, improved, markedly effective, recovered") can be coded 0, 1, 2, 3, but those codes are
  only labels for ordering: they cannot be treated as quantitative data to compute means, and one
  cannot say "markedly effective is 1 unit better than improved". Conversely, once quantitative data
  are collapsed into grades, the numerical information is lost. The type determines which methods you
  can use later.
- **Treating "the population" as whatever group of people happens to be at hand, assuming a large
  enough sample solves everything.** The population is the whole set of homogeneous observation units
  defined by the purpose of the study: a certain place, a certain year, a certain age range, normal
  adult men — the three qualifiers of place, time, and population are all indispensable; change the
  purpose and the population changes. Moreover, a "convenience sample" (stopping people at the gate,
  surveying only those easy to find) is biased no matter how large it is, and what it brings is bias,
  which a large sample cannot average away — sampling error arises from individual variation, cannot
  be avoided, and can only be reduced by sound design and a larger sample size.
- **Using a statistic as if it were a parameter.** $\bar{X}$ and $p$ are computed from the data;
  $\mu$ and $\pi$ are unknown and cannot be computed. In a paper, "the prevalence in this sample is
  3.9%" and "the prevalence in the population is 3.9%" are two completely different statements, and
  the latter requires interval estimation to support it.
- **Substituting a proportion for a rate and drawing conclusions by comparing numbers directly.**
  "Among 64 patients with psoriasis, 46.88% had blood group O, the largest share, so people with blood
  group O are most likely to develop psoriasis" does not hold up: what was computed is the blood group
  composition of the patients, not the prevalence of the disease in each blood group. Likewise, in a
  sample survey two rates (say 0.55% in men and 0.33% in women) looking different does not license a
  conclusion about which is higher — the difference may be nothing but sampling error, and a
  hypothesis test is required.
- **Looking for a statistician once the data are collected.** The sample size, the allocation method,
  the outcome measures, and the statistical methods all have to be fixed at the design stage. Finding
  out during analysis that the sample is too small, that a key variable was not measured, or that the
  two groups are not comparable cannot be repaired by any method.

## How it connects to the other courses

::: tip Related pages
- **Lecture 1 of *Introduction to Information Technology*, Installing R and RStudio, Writing
  Scripts** ([`/intro-it/1-software-install`](/intro-it/1-software-install)) *(Chinese)* — the design,
  collection, sorting, and analysis described in this chapter have to be carried out in software. That
  lecture covers installing R and RStudio and writing and running scripts, which is what makes the
  example at the end of this page runnable.
- **Lecture 2 of *Introduction to Information Technology*, Vectors and Matrices**
  ([`/intro-it/2-vectors-and-matrices`](/intro-it/2-vectors-and-matrices)) *(Chinese)* — this chapter
  says that "data are the collection of values of a variable", and in R that collection is first of
  all a **vector**. Building vectors with `c()`, subsetting with indices, and vectorized operations are
  all in that lecture; `faithful$eruptions` on this page is a numeric vector of length 272.
- **Lecture 4 of *Introduction to Information Technology*, Lists and Factors**
  ([`/intro-it/4-lists-and-factors`](/intro-it/4-lists-and-factors)) *(Chinese)* — this corresponds to
  the qualitative and ordinal variables of this chapter. How to build a `factor()` and how to set the
  order of `levels` are exactly how categorical and ordered variables are represented in R.
- **Lecture 12 of *Introduction to Information Technology*, Parameter Estimation**
  ([`/intro-it/12-parameter-estimation`](/intro-it/12-parameter-estimation)) and **Lecture 13,
  Parametric Hypothesis Testing** ([`/intro-it/13-hypothesis-testing`](/intro-it/13-hypothesis-testing))
  *(Chinese)* — these two lectures work out in detail the "statistical inference = parameter estimation
  + hypothesis testing" of this chapter. There, intervals and $P$ values are computed with
  hand-written R functions, and the emphasis is on code and distributions; here we cover the population
  and sample, parameter and statistic, sampling error, and small-probability events behind them.
  **Get this chapter's concepts clear first, and the formulas in those lectures will come much more
  easily.**
- **Lecture 14 of *Introduction to Information Technology*, Tests of Homogeneity and Contingency
  Tables** ([`/intro-it/14-goodness-of-fit-and-contingency`](/intro-it/14-goodness-of-fit-and-contingency))
  *(Chinese)* — the most direct embodiment of "different data types, different statistical methods":
  once count data have been tallied, the chi-square family of methods is what gets used.
- **Week 1 of *Medical Big Data Analysis and Decision Making*, Using R and Getting Data**
  ([`/Medical-Big-Data-Analysis/1-r-basics-and-data`](/Medical-Big-Data-Analysis/1-r-basics-and-data))
  *(Chinese)* — that week covers reading in external data and inspecting data structures and basic
  distributions, which corresponds to the hands-on part of "collecting data, sorting data" here; this
  chapter supplies the statistical meaning of those two steps (why randomization is required, and what
  it protects against).
- **Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing**
  ([`/Medical-Big-Data-Analysis/2-data-preprocessing`](/Medical-Big-Data-Analysis/2-data-preprocessing))
  *(Chinese)* — corresponds to "sorting data" in this chapter: missing values, outliers, and type
  conversion. There it is the engineering practice; here we explain why classification and checking
  come first.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/01-introduction once
translated; for now the Chinese page /Health-statistics/01-introduction) from:
- /intro-it/1-software-install, near "why use scripts".
- /intro-it/2-vectors-and-matrices, where "a vector is the most basic data structure" is discussed.
- /intro-it/4-lists-and-factors, where factor() is discussed.
- /intro-it/12-parameter-estimation and /intro-it/13-hypothesis-testing, in their summaries.
- /intro-it/14-goodness-of-fit-and-contingency, near the start.
- /Medical-Big-Data-Analysis/1-r-basics-and-data and /2-data-preprocessing, near preprocessing.
-->

## Summary

1. **Statistics is the science and art of handling variability in data**; health statistics applies
   the basic principles and methods of probability theory and mathematical statistics to the
   collection, organization, and analysis of data on population health status and health services,
   leaning towards preventive medicine and public health.
2. **Four basic concepts must be kept apart**: homogeneity is the precondition for individuals to be
   comparable and variation is the reason statistics exists; the population is defined by the purpose
   of the study (finite or infinite) and a sample gains representativeness by being randomly drawn; a
   parameter belongs to the population and is unknown, a statistic belongs to the sample and can be
   computed; individual differences on a basis of homogeneity make sampling error unavoidable but
   regular.
3. **Variables divide into quantitative and qualitative, and qualitative further into categorical and
   ordinal**; data correspondingly divide into quantitative data, count data, and ordinal data. The
   types are relative and can be converted, but **the type determines the statistical method**.
4. **Probability measures how likely a random event is**, with $0 \le P(A) \le 1$; probability
   presupposes a sufficiently large number of repetitions; an event with $P \le 0.05$ is called a
   small-probability event and can be regarded as almost never occurring in a single trial — the
   cornerstone of hypothesis testing.
5. **A statistical study has four steps: design → collection of data → sorting data → analysis of
   data.** Design is the most critical; if the statistical design is flawed, nothing later can repair
   it. Analysis divides into descriptive statistics and inferential statistics. In R, the hands-on form
   of these four steps is: see the data structure with `str()`, compute statistics with
   `mean()`/`sd()`/`length()`, turn qualitative variables into factors with `factor()`, and fix the
   order of an ordinal variable with `ordered = TRUE`.
