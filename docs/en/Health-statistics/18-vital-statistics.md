---
layout: doc
title: '18. Vital Statistics'
---

# Chapter 18. Vital Statistics

::: info Translation status
Translated from the [Chinese original](/Health-statistics/18-vital-statistics). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> This chapter turns “how many people were born in a region in one year, how many died, and how long
> people live on average” into a set of clearly defined indicators that can be compared with one
> another. The formulas are not hard; what is hard is that every step begins by asking two things
> clearly: **who is the denominator of this indicator**, and **whether these two populations can
> really be compared directly**.

## What this chapter is for

Health administration departments, centers for disease control and prevention, and maternal and child
health hospitals have to answer a class of questions every year: how healthy are the residents of this
region? Better or worse than last year? Better or worse than the neighboring region? The answers
depend on a string of **vital statistics indicators**: birth rate, death rate, infant mortality rate,
life expectancy... They are at the same time the basic data for health work planning, for evaluating
the effect of prevention and treatment, and for assessing family planning policy.

This chapter is dense in knowledge points, but they fall into three main lines:

- **Population size and population composition** — the denominator of every indicator comes from here.
  When two regions differ in age and sex composition, the same indicator is not comparable, and this is
  the **confounding** problem that keeps coming back in this chapter;
- **Fertility and mortality indicators** — every indicator is a “numerator ÷ denominator × scale
  base”; it looks as though only the numerator and the denominator change, but the real meaning can be
  completely different: **death rate** and **case fatality rate** differ only in the denominator, one
  being a risk for a population and the other an outcome for patients;
- **Standardized rates and life expectancy** — two tools for “smoothing out differences in
  composition” when the internal composition of the two populations differs. The algorithm of the
  first is the standardization of rates taught in Chapter 5, and the second is this chapter's only
  summary indicator and the single indicator most often used internationally to assess the health
  level of a population.

## Core concepts

### Population statistics: where the denominators come from

#### Population size and point-in-time data

**Population size** means **the total of all people alive** at a given point in time within a given
geographical area. The population changes at every moment under the influence of births, deaths,
emigration, and immigration, so only **point-in-time data** can be used — the instantaneous total
population at one particular standard time point:

- people born **before** the standard moment are counted, and people who died **before** it are not;
- people born **after** the standard moment are not counted, and people who die **after** it are not
  deducted either.

There are two conventions: the **de facto** convention counts only the population actually present in
the area at the standard moment (including those temporarily there), and the **de jure** convention
counts only the usual residents. The population census in China uses the de jure convention.

In non-census years no point-in-time population figure is available, so the **average population** is
used instead; it is the denominator shared by all the indicators of a year:

$$\text{average annual population} = \frac{1}{2}\left(\text{population at the start of the year} + \text{population at the end of the year}\right)
\quad\text{or}\quad = \text{population at the end of last year} + \frac{1}{2}\left(\text{increase during the year} - \text{decrease during the year}\right)$$

A finer algorithm weights the month-end populations: the population at the end of last year gets
weight $\frac{1}{2}$, each month-end from January to November gets weight 1, and the population at the
end of this year gets weight $\frac{1}{2}$, divided by 12. In practice the populations at the start
and at the end of the year are averaged.

#### Population composition and the population pyramid

Population composition is described by **proportions (constituent ratios)**, the most basic being the
sex composition and the age composition. Put age (or year of birth) on the vertical axis and
population size or the age proportion on the horizontal axis, and draw histograms **with males on the
left and females on the right**: the shape is like a pyramid — this is the **population pyramid**.

It has three basic types:

| Type | Shape | Birth and death levels it reflects | Future trend |
| --- | --- | --- | --- |
| Expansive (growing) | broad at the bottom and narrow at the top, a true pyramid | a large proportion of children and adolescents and a small proportion of old people; birth rate and natural growth rate high over the long term | a large and still growing childbearing population, so the population grows rapidly |
| Stationary | the proportions in the age groups roughly even, like the top of a tower | birth rate and death rate much the same | stable around zero growth |
| Constrictive (shrinking) | narrowing at the bottom and widening at the top, the pyramid already deformed | a shrinking proportion of children and a growing proportion of old people; birth rate falling over the long term | both the childbearing population and its reserve are small, giving negative growth |

The general requirements for reading such a chart are four steps: **first look at the vertical and
horizontal axes; second look at the male-to-female ratio; third look at the male-to-female ratio in
the different age bands and how it changes; and fourth think about the possible reasons for a sudden
change**. The shape of the pyramid is the accumulated result of births, deaths, immigration, and
emigration over a long period, so it changes slowly; once an age group suddenly bulges or dips, there
is usually a baby boom or a particular historical period behind it.

#### Three common indicators of population composition

$$\text{sex ratio} = \frac{\text{male population}}{\text{female population}} \times 100$$

The **sex ratio** takes females as 100. The sex ratio at birth is generally stable between **103 and
107**; as age increases it falls to around 100 in the young adult years and to below 100 in old age
(the male death rate is higher than the female rate in every age group). When the sex ratio at birth
departs markedly from the normal range, it is a population problem that calls for special attention.

$$\text{proportion of old population} = \frac{\text{population aged 65 and over}}{\text{total population}} \times 100\%$$

When the **proportion of old population** exceeds **7%** (or the proportion of the population aged 60
and over exceeds 10%), the population is generally considered to have entered **aging**.

$$\text{dependency ratio} = \frac{\text{population aged }0\sim14 + \text{population aged }65\text{ and over}}{\text{population aged }15\sim64} \times 100\%$$

The **dependency ratio** is also called the population burden coefficient; it reflects how far the
working population carries the population outside working age, and its size depends on the type of age
structure of the population.

### Fertility statistics: from “how many were born” to “how many children each woman has”

#### Define live birth first

**Live birth** means a fetus of at least 28 weeks of gestation and at least 1000 g in weight that
**still shows signs of life** when delivered from the mother — one or more of the four signs
(breathing, heartbeat, pulsation of the umbilical cord, definite voluntary muscle contraction) is
enough. The numerator of every fertility and perinatal indicator must be counted by this definition;
**a death before a live birth is called a fetal death and is not counted in the number of deaths of
vital statistics**.

#### Birth rate and fertility rate

$$\text{birth rate} = \frac{\text{total live births in a given area in a given year}}{\text{average population of that area in the same period}} \times 1000\text{‰}$$

The **crude birth rate** (CBR), also simply called the birth rate, reflects the basic situation of the
natural change of the population of a country or region. Its advantages are that the data are easy to
obtain and the calculation is simple; its disadvantage is that **it is greatly influenced by the age
and sex composition of the population**: a large number of women of childbearing age and a young
population make the birth rate high, while an aging population or too few women necessarily makes it
low. In other words, the birth rate is influenced at the same time by two factors, the **total
fertility rate** and **the proportion of women of childbearing age in the total population**.

$$\text{general fertility rate} = \frac{\text{total live births in a given year}}{\text{average number of women of childbearing age in the same year}} \times 1000\text{‰}$$

The **general fertility rate** (GFR) is also called the fertility rate of women of childbearing age.
Most countries take **15–49 years** as the age limits for women of childbearing age. It removes the
influence of the sex composition of the total population on the fertility level, which is a step
beyond the birth rate; but the fertility of women of childbearing age differs greatly from one age
band to another, so it is still influenced by the age composition **within** the women of childbearing
age.

$$\text{age-specific fertility rate} = \frac{\text{live births to women of a given age group in one year}}{\text{average number of women in that age group in the same period}} \quad(\text{per woman})$$

The **age-specific fertility rate** (ASFR) removes the influence of the age composition within the
women of childbearing age and is very commonly used in practice. It is generally unimodal, with the
peak mostly in the 25–29 year group: in theory 1-year age groups are the finest, and when data are
insufficient 5-year age groups are used (in regions with a small population, 5-year age groups are in
fact more stable). Here ASFR uses the **per woman** scale (live births ÷ the average number of women in
that age group, with no further multiplication by 1000‰), so multiplying by 5 gives directly “the
number of children a woman bears in her lifetime”; if the data at hand give ASFR on the ‰ scale, divide
by 1000 before substituting it into the formula for the total fertility rate, otherwise the TFR you
compute will be 1000 times too large.

$$\text{total fertility rate} = 5 \times \sum ASFR \quad(\text{by 5-year age groups, }ASFR\text{ on the per woman scale})$$

The meaning of the **total fertility rate** (TFR) is: assuming a generation of women born at the same
time live out their lives at the age-specific fertility level of a particular year, the average number
of children each woman (or each 1000 women) may bear. It is a fertility level on a **time
cross-section**, unaffected by sex or age composition, and therefore **different regions and different
years can be compared directly**; it is the most commonly used measure of the fertility level.

::: warning The total fertility rate is not the “actual number of children born”
The TFR is an **estimate** of “this generation bearing children at this year's age-specific fertility
rates”, not the real reproductive outcome of any batch of women. Its counterpart is the **life-time
fertility rate** (LTFR): the cumulative fertility of a birth cohort of women by the time they reach 49,
that is, the **actual** number of children born to that cohort of women.

$$\text{life-time fertility rate} = \frac{\text{live-born children borne by that cohort of women}}{\text{number of women of the same age who have passed through the whole childbearing period}}$$

The TFR is used for comparisons **between two years in the same place or between two places in the
same year**; the LTFR is used for comparisons **between different birth cohorts**. The two are not the
same thing.
:::

#### Reproduction indicators

- **Natural increase rate** (NIR) ＝ crude birth rate − crude death rate. It is easy to compute, but it
  can only roughly reflect the trend of growth, and **cannot be used to predict the speed of future
  population development**.
- **Gross reproduction rate** (GRR) ＝ total fertility rate × the proportion of female babies among
  births, which also equals $5\times\sum(\text{age-specific female fertility rates})$ (the age-specific
  female fertility rates likewise use the **per woman** scale). It answers “how many **daughters** a
  woman bears on average in her lifetime”; a value of 1 means the child generation is equal in number
  to the parent generation and the population simply repeats itself. It **does not take into account
  the death of female babies after birth**.
- **Net reproduction rate** (NRR) ＝ $5\times\sum F_x \cdot {}_{0}p_x$, where $F_x$ is the female
  fertility rate of each age group (same scale as above) and the age-specific survival probability
  ${}_{0}p_x$ from the female life table is used to remove the deaths of female babies between birth and
  age 49. NRR > 1 means the next generation will be larger than the present one.

$$\text{mean length of generation} = \frac{\sum F_x \cdot {}_{0}p_x \cdot x}{\sum F_x \cdot {}_{0}p_x}$$

The **mean length of generation** is the number of years needed for the girls born to the mother
generation to replace their mothers in the reproductive function, that is, the interval between two
generations. A short interval means a fast-growing population; a long interval means a slowly
developing population.

The indicators reflecting family planning work also include the **contraceptive prevalence rate**, the
**contraceptive failure rate**, the **Pearl pregnancy rate**, the **cumulative failure rate**, the
**induced abortion rate**, and the **abortion-to-live-birth ratio**. Their common idea is to bring
“exposure” into the calculation:

$$\text{Pearl pregnancy rate} = \frac{\text{number of unintended pregnancies}}{\text{woman-months exposed to the risk of pregnancy}} \times 1200$$

Multiplying by 1200 converts **woman-months** into **100 woman-years**, so the indicator reads as “the
number of unintended pregnancies in 100 women exposed for 1 year”. It is a step beyond the
contraceptive failure rate, because the effect of contraception is related to how long it is used (an
intrauterine device easily falls out soon after insertion, and the pregnancy rate is then higher, so
judging it by the failure rate is unfair); but it still cannot completely remove the influence of the
length of time — 100 woman-years may be 100 women each exposed for 1 year, or 20 women each exposed for
5 years, and the risk of pregnancy in the two is not the same. That is why the **cumulative failure
rate** (the probability of an unintended pregnancy within a given time) was introduced.

### Mortality statistics: the heart of this chapter

Death is one of the main vital events, and mortality statistics reflect the health level of the
residents directly and also, indirectly, the influence of socioeconomic, cultural, and biophysical
factors on health. In China death reports are managed mainly by the public security departments; the
health departments regularly copy, verify, organize, and analyze them, and where the cause of death is
unclear they follow up the family of the deceased to check, then report upward level by level.

#### Crude death rate

$$\text{death rate} = \frac{\text{total deaths in the same period}}{\text{average population in a given year}} \times 1000\text{‰}$$

The **crude death rate** (CDR), also called the general death rate, expresses the number of deaths per
1000 population in a given year and describes the intensity of mortality in the population of a country
or region over a certain period. It can be analyzed from three angles:

- **level analysis**: comparing the mortality situation of different regions in the same period;
- **vertical analysis**: the trend of the mortality level in the same region over different periods;
- **cohort analysis**: the deaths of one batch of people born at the same time, in different years and
  at different ages.

**The crude death rate does not take the influence of population composition on the total rate into
account** — when comparing the mortality levels of different countries, regions, and periods, it is
necessary to **standardize** the death rate in order to remove the influence of population composition
(mainly age composition). This is the most important point of contact between this chapter and
Chapter 5.

#### Age-specific death rate

$$\text{age-specific death rate} = \frac{\text{deaths in that age group in the same year}}{\text{average population of that age group in a given year}} \times 1000\text{‰}$$

The **age-specific death rate** (ASDR, also called the age-group death rate) removes the influence of
different age compositions of the population on the mortality level, so **the death rates of the same
age group in different regions can be compared directly**. Analyzing it identifies the priority
population groups for health work. The age-specific death rate usually takes a “U” or “J” shape: high
in infancy and childhood and in old age, and **lowest at 5–14 years**; every age group generally shows
the pattern that males are higher than females.

#### Cause-specific death rate

$$\text{cause-specific death rate} = \frac{\text{deaths from a given cause in the same year}}{\text{average population in a given year}} \times 10^{5}$$

The **cause-specific death rate** is an important indicator of cause-of-death analysis, reflecting how
harmful the deaths from each kind of disease or injury are to the lives of the residents. Its
denominator is the **local average population** — in this it is completely different from the case
fatality rate.

#### Infant mortality rate and neonatal mortality rate

$$\text{infant mortality rate} = \frac{\text{deaths of infants under 1 year of age in the same year}}{\text{total live births in a given year}} \times 1000\text{‰}$$

The **infant mortality rate** (IMR) is a sensitive indicator for measuring the level of maternal and
child health care and the social health situation. Three “it is nots” need special attention:

1. **It is not a rate in the strict sense**: some of the infants who died in a given year were born in
   that year and some in the previous year, while the denominator uses only the live births of the
   current year. If the number of live births changes greatly between two adjacent years, it cannot
   reflect the infant mortality level of the current year well;
2. **It is not equal to the death rate of the 0-year age group**, whose denominator is the average
   population of that age group;
3. **It does not express the probability of dying within one year of birth**. The denominator of a
   death probability is “the number of people who survive to age x”, which is not the same scale as
   the number of live births.

The World Health Organization defines **death** as “the permanent disappearance of all evidence of
life at any time after birth has taken place”; a death before a live birth is a **fetal death** and is
not counted in the number of deaths of vital statistics — this dividing line directly determines how
the numerators of the infant mortality rate and the perinatal mortality rate are counted.

$$\text{neonatal mortality rate} = \frac{\text{deaths within 28 days in the same year}}{\text{total live births in a given year}} \times 1000\text{‰}$$

The death of an infant at 0–27 days is called **neonatal death**, and the **neonatal mortality rate**
(NMR) reflects the situation in which the physiological functions of the newborn are not yet fully
developed, adaptation to the external environment is poor, and resistance is low. It is positively
correlated with the infant mortality rate overall, but the ratio between the two is not constant — so
the two indicators have to be reported separately, and the neonatal mortality rate is particularly
valuable for studying the influence of the environment on population health and for raising the level
of maternal and child health.

#### Perinatal mortality rate

The **perinatal period** is the period from when the fetus reaches 1000 g in weight (or 28 weeks of
gestation) to within 7 days after birth. A death in this period is called a perinatal death:

$$\text{perinatal mortality rate} = \frac{\text{stillbirths after 28 weeks of gestation} + \text{neonatal deaths within 7 days}}{\text{stillbirths after 28 weeks of gestation} + \text{live births}} \times 1000\text{‰}$$

The weight scale can also be used: the numerator is “stillbirths of 1000 g and over + neonatal deaths
within 7 days”, and the denominator is “stillbirths of 1000 g and over + live births”.

**The perinatal mortality rate is an important indicator for assessing maternal and child health care,
especially antenatal care**, and in practice it has to be obtained by analyzing obstetric records. The
place where it is easiest to go wrong is that **the denominator contains both stillbirths and live
births** — if the **stillbirths in the denominator** are missed, the value computed comes out too
large; if the stillbirths are missed from **both** numerator and denominator, the result comes out too
small instead.

#### Mortality under age 5 and maternal mortality rate

$$\text{mortality under age 5} = \frac{\text{deaths of children under age 5 in the same year}}{\text{total live births in a given year}} \times 1000\text{‰}$$

In many developing countries data on infant deaths are not easy to obtain, while the mortality level of
children under 5 is also higher and better represented, so **mortality under age 5** is used to reflect
the mortality level of infants and young children, and international organizations (such as UNICEF)
also commonly use it to measure the level of child health and its changes. Note that its denominator is
the same as that of the infant mortality rate (total live births); only the numerator is extended to
under 5 years of age.

$$\text{maternal mortality rate} = \frac{\text{maternal deaths in the same year}}{\text{total live births in a given year}} \times 10^{5}$$

**Maternal death** means the death of a woman during pregnancy or within 42 days after delivery from any
cause related to pregnancy, divided into **direct obstetric causes** (neglect of a pregnancy
complication, incorrect management, and so on) and **indirect obstetric causes** (a disease that
already existed before pregnancy and was made worse by it). The **maternal mortality rate** can assess
women's health care work and also indirectly reflects the health and cultural level of a country.

#### Cause composition and rank order of causes

$$\text{proportion of total deaths due to a given cause} = \frac{\text{deaths from that cause}}{\text{total deaths}} \times 100\%$$

The **proportion dying of a specific cause** states the share of the total deaths accounted for by the
deaths from a given cause; arranging the various causes of death by this share from high to low gives
the **rank order of causes of death**. The two have the same meaning and are both used to reflect the
main causes of death of a population, and so to identify the priority directions for medical and health
care work.

One reminder: the cause composition is a **proportion**, not a rate. When the rank order of causes
changes, it may be that the death rate of one cause really changed, or it may be that only some other
cause changed and thereby changed the denominator — to judge, you must go back to the cause-specific
death rates. Also, when a person suffers from several diseases, the **underlying death cause** must be
chosen (the earliest disease or injury in the series of morbid events leading directly to death, or the
accident or violence that caused the fatal injury) and the death classified by the underlying cause,
rather than by the heart failure or respiratory failure present just before death.

### Standardized rates: why standardization is required before comparing

#### Why crude rates cannot be compared directly

The crude death rate is influenced by the age composition of the population, the birth rate by the
proportion of women of childbearing age, and the incidence rate, cure rate, and case fatality rate are
each influenced by their own internal composition. Take the simplest example (the numbers are made
up):

| | Population aged 0–39 | Population aged 40–64 | Population aged 65+ | Age-specific death rate (‰) | Crude death rate |
| --- | --- | --- | --- | --- | --- |
| Region A | 90% | 8% | 2% | 2.0 / 15.0 / 200.0 | 7.0‰ |
| Region B | 20% | 30% | 50% | 1.5 / 10.0 / 150.0 | 78.3‰ |

**The death rate of every age group in Region B is lower than in Region A**, yet its crude death rate
is 11 times that of Region A — the whole difference comes from the age structure: half of Region B's
population is over 65, and that group is by nature the one with the highest death rate. If you looked
only at the crude death rate and concluded that “Region B's health situation is far worse”, the
conclusion would be wrong.

**This is the reason standardization is necessary**: when the internal composition of two populations
(age, sex, severity of illness, duration of disease, and so on) differs enough to affect the
conclusion, a **uniform standard composition** must be used to remove the influence of composition, so
that the **standardized rate** computed is comparable. Non-study factors such as age and sex, which are
related to the study factor and also influence the outcome, are called **confounding factors**;
standardization is one of the methods for controlling confounding at the analysis stage.

#### The direct method

$$p' = \frac{\sum N_i p_i}{N}$$

Conditions: **the rates $p_i$ of each age group of the group being standardized are known**, and a
standard population composition $N_i$ has been chosen.

Three steps:

1. **Choose the standard.** There are four common choices: ① the age-specific population of the whole
   country or of the local area from a population census; ② the age-specific population of a large
   sample from a sample survey; ③ the population of either of the two sets of data; ④ **the sum of the
   populations of each age group of the two sets of data** (the most commonly used and the easiest to
   compute).
2. **Compute the expected numbers.** Multiply the rate $p_i$ of each age group of the group being
   standardized by the **standard population** $N_i$, giving “how many people would have the event if
   this group were distributed according to the age composition of the standard population”, that is,
   $N_i p_i$.
3. **Total expected number ÷ total standard population** $N$ gives the standardized rate $p'$.

Using the example above: taking the sum of the populations of each age group of the two regions as the
standard population (110000 aged 0–39, 38000 aged 40–64, 52000 aged 65 and over, 200000 in total), the
expected number of deaths in Region A is $110000\times0.002 + 38000\times0.015 + 52000\times0.200 = 11190$,
and $p'_A = 11190/200000 = 55.95$‰; for Region B it is 8345, and $p'_B = 41.73$‰. **After
standardization, Region A is above Region B**, in agreement with the group-by-group comparison of the
age-specific death rates.

In applying the direct method, note:

- different standards give different values of the standardized rate, but **the order of magnitude
  generally does not change**;
- **not all data can be standardized**. If the rates of the age groups of the two groups **cross each
  other** (the group being standardized is higher in some age groups and lower in others), a different
  standard may give the opposite conclusion, and in that case a standardized rate should not be
  computed;
- a standardized rate **is only used for comparison and does not represent the actual level of the
  populations being compared**.

#### The indirect method

Conditions: **the rates of each age group of the group being standardized are unknown**, and only its
age-specific population $n_i$ and the total number of deaths $r$ are available, while the rates $P_i$
of each age group of the standard population and its overall rate $P$ are known.

$$p' = P \cdot \frac{r}{\sum n_i P_i} = P \cdot \text{SMR},\qquad
\text{SMR} = \frac{\text{observed deaths}}{\text{expected deaths}} = \frac{r}{\sum n_i P_i}$$

The approach is to “**borrow** the rates of each age group of the standard population to compute the
expected number of deaths of the group being standardized”: $\sum n_i P_i$ is “how many people should
die if this group had the same mortality level as the standard population”. The ratio of the observed
number to the expected number is called the **standardized mortality ratio** (SMR):

- SMR > 1: the observed number of deaths is higher than expected, the mortality level of that
  population really is on the high side, and **the age composition of the population is not enough to
  explain it**; but the SMR is a weighted average with the expected deaths $n_iP_i$ of each age group
  as weights, so its value is still related to the age composition of that group itself (see the
  limitations of the indirect method below), and it cannot be compared directly between two populations
  with different age compositions as a directly standardized rate can;
- SMR < 1: the observed number is lower than expected, and the mortality level really is on the low
  side;
- multiplying the SMR by the overall rate $P$ of the standard group then gives the indirectly
  standardized rate.

Using the example above: taking the age-specific death rates of the two regions combined as the
standard, the overall death rate of the standard group is $P = 42.65$‰. The expected number of deaths
in Region A is 564.09, SMR $=700/564.09=1.241$, and the indirectly standardized rate
$=42.65\times1.241=52.93$‰; for Region B the SMR $=0.983$ and the standardized rate $=41.92$‰. The
direction agrees with the direct method.

In applying the indirect method, note:

- the expected number of deaths uses the **group's own** age-specific population, so the values of the
  SMR and of $p'$ are related to the age composition of that group, and **the indirectly standardized
  rates of two populations with different age compositions generally cannot be compared with each
  other**; the indirect method suits the comparison of one special population (an occupational
  population, the population of a county) with a standard population;
- the results of the direct and indirect methods are **not numerically equal**, and the two cannot be
  mixed in a comparison either;
- the comparison of sample rates (or standardized rates) **still requires a hypothesis test** after
  standardization.

::: tip How this relates to the earlier methods course
The formulas of the direct and indirect methods, the ways of choosing the standard, the meaning of the
SMR, and the four limitations were all covered in full in Chapter 5, “Describing Qualitative Data”.
This chapter only applies them to concrete vital statistics indicators such as deaths and births.
**The methods are in Chapter 5, the settings and the library of indicators are in this chapter** — the
two pages should be read against each other. The link is at the end of the page.
:::

### Disease statistics indicators (filled in along the way)

Disease statistics study the occurrence, development, and distribution of diseases in populations; the
data come from disease reports and registers, routine medical records, registers of absence from work
because of illness or injury in factories and mines, special surveys and health examinations, and death
registration. A single disease has little statistical meaning; only after grouping and classification
(by chapter of the ICD code, for example) is it convenient to compare and analyze, and judging the
**underlying death cause** is the key to correctly classifying causes of death.

The center of gravity of the common indicators is the **denominator**:

$$\text{incidence rate} = \frac{\text{new cases of a disease arising during the period}}{\text{average population that may develop the disease in a given period}} \times K$$

The numerator of the **incidence rate** is based on the **first visit**, and old cases are not counted,
but one person who has influenza twice counts as two new cases; the denominator is “the people **who
may develop** the disease” — when computing the incidence rate of measles, people who have already had
measles (lifelong immunity) should not be counted.

$$\text{prevalence} = \frac{\text{total existing cases of a disease found at the observation time point}}{\text{population at that time point}} \times K$$

**Prevalence** is a **point-in-time** indicator; it suits diseases with a long course and reflects the
scale or level of the epidemic of a disease in a certain population. The **detection rate** and the
**infection rate** are the same in nature, with only a narrower scope of study subjects.

$$\text{case fatality rate of a disease} = \frac{\text{deaths from that disease during the observation period}}{\text{patients with that disease in the same period}} \times 100\%$$

The denominator of the **case fatality rate** is **patients**, and it reflects the severity of the
disease and the effect of treatment; the denominator of the **death rate of a disease**, by contrast,
is the **local average population**, and it reflects the threat the disease poses to the lives of the
population. The case fatality rate of inpatients **cannot represent** the case fatality rate of a
region, because inpatients are mostly more severely ill and do not necessarily come from the same
region.

The severity of a disease can also be assessed with the **potential years of life lost** (PYLL) and the
**life loss rate**:

$$\text{potential years of life lost} = \sum {}_{n}D_x \times (72.5 - x),\qquad
\text{life loss rate} = \frac{\sum {}_{n}D_x (72.5 - x)}{P} \times 100\%$$

Here 72.5 is the **target age of survival** (a figure commonly used at home and abroad, though some
literature uses 70, and each region may set its own), $x$ is the midpoint of each age group, ${}_{n}D_x$
is the number of deaths in a given age group, and $P$ is the total population of that year. It converts
the loss from “early death” into person-years, and reflects the influence of a disease on the labor
force and on lifespan better than looking at the death rate alone.

### Life expectancy and the life table: just enough

The crude death rate reflects the overall mortality level, but it is influenced by the age composition
and cannot be compared directly between regions; the standardized death rate solves comparability, yet
it departs from the actual level. The **life table** (also called the mortality table) is a statistical
table compiled from the age-specific death rates of a particular population; using the death process of
an imaginary 100 000 people, it “combines” the age-specific death rates into a single summary indicator
that is not influenced by age composition.

- By type of study, there are the **cohort life table** (following one batch of people from birth to
  death, which takes a long time and suffers much loss to follow-up) and the **current life table**
  (reflecting cross-sectionally the mortality experience of the actual population of a region over a
  certain period). What is called **life expectancy** in everyday speech almost always means the life
  expectancy of a current life table;
- By how coarse the age grouping is, there are the **complete life table** (1-year age groups) and the
  **abridged life table** (generally 5-year age groups, except for the 0-year group). **Abridged life
  tables are commonly used in health statistics**: fewer groups, more people in each group, fairly
  stable age-specific death rates, and less computation, which suits populations of small size.

The **idea behind constructing an abridged life table** needs only “one main line, six steps”:
everything starts from the **age-specific death rate** ${}_{n}m_x = {}_{n}D_x / {}_{n}P_x$ of the
actual data —

1. **Age-specific probability of death** ${}_{n}q_x$: turn a “rate” into a “probability”. When the age
   grouping is fine, use ${}_{n}q_x = \dfrac{2 \cdot n \cdot {}_{n}m_x}{2 + n \cdot {}_{n}m_x}$; when the
   grouping is coarse, use ${}_{n}q_x = 1 - e^{-n \cdot {}_{n}m_x}$; **for the 0-year group the infant
   mortality rate is used directly instead**, and for the last group $q_w = 1.000000$ (everyone dies);
2. **Number surviving** $l_x$ and **number dying** ${}_{n}d_x$: set $l_0 = 100000$ (whatever the actual
   population size), then ${}_{n}d_x = l_x \cdot {}_{n}q_x$ and $l_{x+n} = l_x - {}_{n}d_x$, so that one
   generation decreases all the way to 0;
3. **Person-years lived** ${}_{n}L_x$: use the area of a trapezoid,
   ${}_{n}L_x = \dfrac{n}{2}(l_x + l_{x+n})$; the 0-year group is special,
   ${}_{1}L_0 = l_1 + a_0 d_0$ (where $a_0$ is the average number of years lived by those who die in
   infancy, obtainable from the level of the infant mortality rate); for the last group
   ${}L_w = l_w / m_w$;
4. **Total person-years lived** $T_x$: accumulate from the oldest age group to the youngest,
   $T_x = \sum {}_nL_x$;
5. **Average life expectancy** $e_x = T_x / l_x$: $e_0$ is what is usually called the **average lifespan
   of the population**;
6. If the influence of a particular cause of death is to be analyzed, a **cause-eliminated life table**
   can be compiled: subtract the deaths from that cause from the deaths of each age group, recompute the
   survival probabilities, the numbers surviving, and so on, and obtain “$e_x^{-i}$ after removing that
   cause”. **The more the life expectancy increases after the cause is removed, the greater the harm
   that cause does to the residents**.

The life table indicators ($l_x$, ${}_nd_x$, ${}_nq_x$, $e_x$) can all be used to assess the health
level of a population, and among them **$e_x$ has become the best single indicator at home and abroad
for assessing the health level of the residents of different regions and periods**: it reflects the
mortality levels of all the age groups together, is not influenced by the age composition of the
population, and can also express the health level in positive terms (how many years one lives). The
cause-eliminated life table has three advantages: the loss of $e_x$ or $l_x$ from each cause of death
can be compared directly, it can express both the combined effect on the whole population and the
effect on a particular age group, and it is likewise not influenced by age composition.

The complete steps of construction and the more precise correction methods (such as the algorithm
introducing the correction number $a_x$, the Reed–Merrell method, the Greville method, and so on)
belong to a dedicated chapter on life tables; here it is enough to master **the idea of the
construction and how to read $e_0$**.

## Quick-reference table of indicators

This table is the core output of the chapter. To look at an indicator, first look at the
**denominator**, then at the **unit**, and finally at **what it is most easily confused with**.

| Indicator | Definition | Unit | When it is used | What it is easily confused with |
| --- | --- | --- | --- | --- |
| Population size | the sum of all people alive in the area at a standard time point | persons | the basic data of every vital statistics indicator | confused with “average population” (one is a point-in-time figure, the other a period figure) |
| Average annual population | $\frac{1}{2}(\text{population at the start of the year} + \text{population at the end of the year})$ | persons | the denominator of the various rates within a year | confused with the census point-in-time population |
| Sex ratio | $\frac{\text{male population}}{\text{female population}} \times 100$ | dimensionless (females = 100) | describing the sex composition of a population; judging whether the sex ratio at birth departs from 103–107 | confused with “the percentage of males” |
| Proportion of old population | $\frac{\text{population aged 65 and over}}{\text{total population}} \times 100\%$ | % | judging whether the population has entered aging (>7%), planning health services for the elderly | confused with the dependency ratio (whose denominator is the working-age population) |
| Dependency ratio | $\frac{\text{population aged }0\sim14 + \text{population aged }65\text{ and over}}{\text{population aged }15\sim64} \times 100\%$ | % | reflecting the burden on the working population | confused with the proportion of old population |
| Birth rate CBR | $\frac{\text{total live births in a given year}}{\text{average population in the same year}} \times 1000\text{‰}$ | ‰ | the basic indicator of the natural change of a population; the data are easy to obtain | confused with the general fertility rate; influenced by the proportion of women of childbearing age |
| General fertility rate GFR | $\frac{\text{total live births in a given year}}{\text{average number of women of childbearing age in the same year}} \times 1000\text{‰}$ | ‰ | the fertility level of all women of childbearing age, 15–49 years | confused with the birth rate; still influenced by the age composition within the women of childbearing age |
| Age-specific fertility rate ASFR | $\frac{\text{live births to women of a given age group in one year}}{\text{average number of women in that age group in the same period}}$ | children per woman (the number a woman bears in the current year, not ‰) | seeing the peak age of childbearing and the fertility pattern | confused with the general fertility rate (its denominator is women, not the total population) |
| Total fertility rate TFR | $5 \times \sum ASFR$ (5-year age groups) | children per woman (the number of children a woman bears in her lifetime) | comparing fertility levels across regions and years; not influenced by age and sex composition | confused with the life-time fertility rate (the TFR is a hypothetical value, the LTFR an actual one) |
| Life-time fertility rate LTFR | $\frac{\text{live-born children borne by that cohort of women}}{\text{number of women of the same age who have passed through the whole childbearing period}}$ | children | comparing the actual fertility levels of different birth cohorts | confused with the total fertility rate |
| Natural increase rate NIR | birth rate − death rate | ‰ | roughly judging the trend of population growth; it cannot predict the speed of development | confused with the “population growth rate” (which also includes migration) |
| Gross reproduction rate GRR | $TFR \times \text{proportion of female babies among births}$ | children (the number of daughters a woman bears) | the level of population replacement when the death of female babies is not considered; = 1 means simple replacement | confused with the net reproduction rate |
| Net reproduction rate NRR | $5 \times \sum F_x \cdot {}_{0}p_x$ | children | whether the next generation can replace this one after the deaths of female babies up to age 49 are removed | confused with the gross reproduction rate (the difference is the survival probability) |
| Mean length of generation | $\frac{\sum F_x \cdot {}_{0}p_x \cdot x}{\sum F_x \cdot {}_{0}p_x}$ | years | the interval between two generations; a short interval means a fast-growing population | confused with average life expectancy |
| Crude death rate CDR | $\frac{\text{total deaths in the same period}}{\text{average population in a given year}} \times 1000\text{‰}$ | ‰ | reflecting the overall intensity of mortality; **standardization is required** before comparing regions | confused with the age-specific death rate, the standardized rate, and the case fatality rate |
| Age-specific death rate ASDR | $\frac{\text{deaths in that age group in the same year}}{\text{average population of that age group in a given year}} \times 1000\text{‰}$ | ‰ | removing the influence of age composition, finding the priority groups for health work | confused with the crude death rate and with the life table probability of death $q_x$ |
| Cause-specific death rate | $\frac{\text{deaths from a given cause in the same year}}{\text{average population in a given year}} \times 10^{5}$ | per 100 000 | cause-of-death analysis, reflecting how harmful each disease or injury is to life | confused with the case fatality rate and the cause-of-death proportion |
| Infant mortality rate IMR | $\frac{\text{deaths of infants under 1 year of age in the same year}}{\text{total live births in a given year}} \times 1000\text{‰}$ | ‰ | measuring the level of maternal and child health care and the social health situation | confused with the death rate of the 0-year group, the probability of infant death, and the neonatal mortality rate |
| Neonatal mortality rate NMR | $\frac{\text{deaths within 28 days in the same year}}{\text{total live births in a given year}} \times 1000\text{‰}$ | ‰ | studying the influence of the environment on population health and raising the level of maternal and child health | confused with the infant mortality rate (the NMR is a part of the IMR) |
| Perinatal mortality rate | $\frac{\text{stillbirths after 28 weeks} + \text{neonatal deaths within 7 days}}{\text{stillbirths after 28 weeks} + \text{live births}} \times 1000\text{‰}$ | ‰ | assessing antenatal care and obstetric quality (usually computed from obstetric records) | the denominator contains both stillbirths and live births, so missing the stillbirths makes it wrong |
| Mortality under age 5 | $\frac{\text{deaths of children under age 5 in the same year}}{\text{total live births in a given year}} \times 1000\text{‰}$ | ‰ | replacing the IMR when data on infant deaths are hard to obtain; commonly used by international organizations | confused with the infant mortality rate (same denominator, wider numerator) |
| Maternal mortality rate | $\frac{\text{maternal deaths in the same year}}{\text{total live births in a given year}} \times 10^{5}$ | per 100 000 | assessing women's health care and the health and cultural level of a country | confused with the female death rate and the perinatal mortality rate |
| Cause-of-death proportion | $\frac{\text{deaths from a given cause}}{\text{total deaths}} \times 100\%$ | % | the rank order of causes of death, identifying the priority directions for prevention and treatment | **not a rate**: the denominator is total deaths |
| Incidence rate | $\frac{\text{new cases of a disease during the period}}{\text{average population that may develop the disease in the same period}} \times K$ | %, ‰, or per 100 000 | reflecting the frequency of occurrence of a disease and the effect of prevention and treatment | confused with prevalence and with the disease proportion |
| Prevalence | $\frac{\text{existing cases of a disease at the observation time point}}{\text{population at that time point}} \times K$ | %, ‰, or per 100 000 | diseases with a long course, reflecting the scale of the epidemic | confused with the incidence rate (point in time vs period) |
| Case fatality rate | $\frac{\text{deaths from a disease during the observation period}}{\text{patients with that disease in the same period}} \times 100\%$ | % | reflecting the severity of a disease and the short-term effect of treatment | confused with the death rate of a disease (is the denominator patients or population?) |
| Death rate of a disease | $\frac{\text{deaths from a disease during the observation period}}{\text{average population in the same period}} \times 10^{5}$ | per 100 000 | the degree of threat a disease poses to the lives of a population | confused with the case fatality rate |
| Potential years of life lost PYLL | $\sum {}_{n}D_x \times (72.5 - x)$ | person-years | reflecting the loss of lifespan and labor force from early death | confused with the life loss rate and with the loss of life expectancy |
| Life loss rate | $\frac{\sum {}_{n}D_x (72.5-x)}{P} \times 100\%$ | % | the average loss of lifespan per person per year | confused with the potential years of life lost |
| Standardized rate (direct method) | $p' = \frac{\sum N_i p_i}{N}$ | same as the original rate | comparing two groups with different internal compositions when the subgroup rates of each are known | confused with the crude rate; values computed from different standards cannot be compared with each other |
| Standardized rate (indirect method) | $p' = P \cdot \frac{r}{\sum n_i P_i} = P \cdot \text{SMR}$ | same as the original rate | when the subgroup rates of the group being standardized are missing and only the total number of deaths is available | the result is not equal to that of the direct method; two indirectly standardized rates cannot be compared with each other |
| Life expectancy $e_0$ | $e_x = \frac{T_x}{l_x}$, where $e_0$ is the life expectancy at birth | years of age | assessing the health level of the residents overall; not influenced by age composition | confused with the “average age at death” (which is influenced by age composition) |

## Doing it in R

Below, a **population constructed by hand** (two regions × three age groups, with made-up numbers) is
used to work through the most central set of computations of this chapter: crude death rate →
age-specific death rate → directly standardized rate → indirectly standardized rate, and to see why “a
high crude death rate” cannot simply be equated with “a high risk”.

### 1. Building the data: one data frame is one table of indicators

```r
# Example population: 2 regions x 3 age groups
# n = average population size (persons), d = deaths within one year (persons)
pop <- data.frame(
  # region and age are both made factors with explicit levels, so that the
  # order in the output and in the summaries is fixed
  region = factor(rep(c("Region A", "Region B"), each = 3),
                  levels = c("Region A", "Region B")),
  age    = factor(rep(c("0-39", "40-64", "65+"), times = 2),
                  levels = c("0-39", "40-64", "65+")),
  n      = c(90000,  8000,  2000,      # A: young population
             20000, 30000, 50000),     # B: old population
  d      = c(  180,   120,   400,      # deaths in A
                30,   300,  7500)      # deaths in B
)
pop
#     region   age     n    d
# 1 Region A  0-39 90000  180
# 2 Region A 40-64  8000  120
# 3 Region A   65+  2000  400
# 4 Region B  0-39 20000   30
# 5 Region B 40-64 30000  300
# 6 Region B   65+ 50000 7500
```

The total population of the two regions is 100 000 each, but the **age compositions are completely
different**: 90% of Region A is aged 0–39, while half of Region B is over 65. This is the root of every
difference that follows.

### 2. Computing the crude and age-specific death rates from the definitions

```r
# (1) Crude death rate CDR = total deaths / average population
cdr <- aggregate(cbind(d, n) ~ region, data = pop, FUN = sum)
cdr$rate <- cdr$d / cdr$n * 1000          # convert to per 1000
cdr
#     region    d     n rate
# 1 Region A  700 1e+05  7.0
# 2 Region B 7830 1e+05 78.3

# (2) Age-specific death rate ASDR = deaths in the age group / average population of that age group
pop$asdr <- pop$d / pop$n * 1000
xtabs(round(asdr, 2) ~ region + age, data = pop)
#           age
# region      0-39 40-64   65+
#   Region A   2.0  15.0 200.0
#   Region B   1.5  10.0 150.0

# (3) Age composition: this is where the difference lies
round(prop.table(xtabs(n ~ region + age, data = pop), margin = 1), 3)
#           age
# region     0-39 40-64  65+
#   Region A 0.90  0.08 0.02
#   Region B 0.20  0.30 0.50
```

`aggregate()` sums `d` and `n` separately by `region` (this is exactly the “add the numerators, add the
denominators, then divide” way of writing it; the rates of the age groups must never be averaged);
`xtabs()` arranges the long table into a two-dimensional region × age table, and
`prop.table(..., margin = 1)` works out the proportions by row.

The result is clear: **the death rate of every age group in Region B is lower than in Region A**
(1.50 < 2.00, 10.00 < 15.00, 150.00 < 200.00), yet its crude death rate is 11 times that of Region A
(78.3‰ vs 7.0‰). The reason is plain from the proportions in step ③ — half of Region B's population
falls in the 65+ group, where the death rate is the highest.

### 3. Direct standardization

```r
# (4) Choose the standard population: the sum of the two regions' populations in each age group
stdN <- tapply(pop$n, pop$age, sum)        # 0-39: 110000, 40-64: 38000, 65+: 52000
pop$stdN <- as.numeric(stdN[as.character(pop$age)])
pop$exp  <- pop$stdN * pop$d / pop$n       # expected deaths = standard population x ASDR of the group
dir_std <- aggregate(cbind(exp, stdN) ~ region, data = pop, FUN = sum)
dir_std$rate <- dir_std$exp / dir_std$stdN * 1000
dir_std[, c("region", "exp", "rate")]
#     region   exp   rate
# 1 Region A 11190 55.950
# 2 Region B  8345 41.725
```

Three steps: choose the standard (the sum of the two regions' populations) → compute the expected
numbers (`stdN * the rate of that group`) → sum of the expected numbers ÷ total standard population.
After standardization **the conclusion turns around: Region A 55.95‰ > Region B 41.73‰**, in agreement
with the group-by-group comparison. Once the influence of the age composition has been removed, “Region
A is in fact the worse off” is the reliable statement.

### 4. Indirect standardization and the SMR

```r
# (5) Indirect method: the age-specific death rates of the two regions combined are the standard
tot <- aggregate(cbind(d, n) ~ age, data = pop, FUN = sum)
tot$P <- tot$d / tot$n                     # age-specific death rates of the standard population
P <- sum(tot$d) / sum(tot$n)               # overall death rate of the standard population
stdP <- setNames(tot$P, as.character(tot$age))

pop$exp2 <- pop$n * as.numeric(stdP[as.character(pop$age)])   # expected deaths
ind <- aggregate(cbind(d, exp2) ~ region, data = pop, FUN = sum)
ind$SMR  <- ind$d / ind$exp2
ind$rate <- P * ind$SMR * 1000
ind[, c("region", "d", "exp2", "SMR", "rate")]
#     region    d      exp2      SMR     rate
# 1 Region A  700  564.0854 1.240947 52.92638
# 2 Region B 7830 7965.9146 0.982938 41.92230
```

`setNames()` gives the standard rates the names of the age groups, so that the corresponding rate can
be “looked up” by age group. The SMR of Region A = 1.24 > 1, which means **the observed number of
deaths is 24% higher than “the number of deaths expected at the level of the standard population”**,
and the age composition of the population is not enough to explain it; that said, the size of this ratio
is related to Region A's own age composition, and it cannot be compared directly with a region whose
age composition differs (see the limitations of the indirect method above). The SMR of Region B = 0.98,
so its observed number of deaths is much the same as expected. The indirectly standardized rates (52.93‰
and 41.92‰) differ in value from the direct method and agree in direction.

### 5. The three versions side by side

```r
# (6) Put the three versions together: the difference in the conclusions is plain to see
out <- data.frame(
  region   = cdr$region,
  crude    = round(cdr$rate, 2),
  direct   = round(dir_std$rate[match(cdr$region, dir_std$region)], 2),
  indirect = round(ind$rate[match(cdr$region, ind$region)], 2)
)
out
#     region crude direct indirect
# 1 Region A   7.0  55.95    52.93
# 2 Region B  78.3  41.73    41.92

# A plot makes it clearer still (the crude and the standardized rates rank in opposite orders)
barplot(t(as.matrix(out[, c("crude", "direct")])), beside = TRUE,
        names.arg = out$region, legend.text = c("Crude death rate", "Direct standardized rate"),
        ylab = "Death rate (per 1000)", col = c("grey70", "steelblue"))
```

`match()` simply aligns the three summary tables by region, so that the data are not mismatched when
the row orders differ. Reading this table should give you the most important sentence of this chapter:
**a high crude death rate ≠ a high actual risk, which may be nothing but a different age structure**;
to compare, you must standardize, and a standardized rate can only be used for comparison — you cannot
use it to say “the actual death rate of this region is 55.95‰”.

## How these indicators are used in research

- **Assessing the health level of the residents and the social health situation**: life expectancy
  $e_0$, the infant mortality rate, mortality under age 5, and the maternal mortality rate are the four
  most frequently cited “overall indicators”, and they are also the basis for comparisons between
  different countries and different periods; the crude death rate can be used, but it must be
  standardized first.
- **Finding the priority population groups for health work**: this is what the age-specific death rate
  and the age-specific fertility rate are for. The two ends of the U-shaped curve of the age-specific
  death rate (infants and young children, and the elderly) and the lowest point at 5–14 years point
  directly to the allocation of resources for maternal and child health care and for health services
  for the elderly.
- **Cause-of-death analysis and ranking the priorities of prevention and treatment**: the
  cause-specific death rate (the threat a disease poses to life) + the cause composition and rank order
  (the main causes of death of a population) + the potential years of life lost (the loss of labor force
  and lifespan) are used together. Looking only at the rank order of causes makes it easy to be misled
  by a proportion, while looking only at the cause-specific death rate leaves you exposed to the
  influence of age composition.
- **Assessing the effect of prevention and treatment and the quality of maternal and child health
  care**: the infant mortality rate, the neonatal mortality rate, and the perinatal mortality rate are
  used to assess antenatal care and obstetric quality; the dynamic changes of the incidence rate, the
  cure rate, and the effective rate reflect the effect of prevention and treatment.
- **Time trends and cohort analysis**: vertical analysis of the same region over different periods
  shows the trend, and cohort analysis of one batch of people born at the same time shows the mortality
  and fertility experience of “one generation”; the reproduction indicators and the life table are used
  for population projections.
- **As the foundation of more complex methods**: the standardized rate is the most basic tool for
  controlling confounding, and the life table is the direct forerunner of survival analysis (Chapter
  14) — replace “death” with “relapse or failure” and “age group” with “follow-up interval”, and the
  whole line of thinking is exactly the same.

## Common pitfalls

- **Comparing regions with different age structures directly by the crude death rate (crude birth rate,
  crude incidence rate).** This is the biggest pitfall of the chapter. In the example above, the death
  rate of every age group of Region B is lower, yet its crude death rate is 11 times that of Region A.
  The standard practice is **stratified comparison** or **standardization**, and you must remember that
  a standardized rate is only used for comparison and does not represent the actual level. The reverse
  also needs care: **not all data can be standardized**, and when the rates of the age groups of the two
  groups clearly cross, a different standard may overturn the result.
- **Failing to distinguish a “rate” from a “proportion”.** The denominator of the cause-of-death
  proportion is **total deaths**, the denominator of the case fatality rate of a disease is **the number
  of patients with that disease**, and the denominator of the death rate of a disease is the **average
  population**; the three indicators are often taken for the same thing. When you see “this disease
  accounts for 25% of the causes of death, so it is the most dangerous”, you know where the mistake lies
  — that is only a proportion, and it may be so simply because the other causes of death decreased.
- **Mixing up the numerator and denominator of the infant and perinatal mortality rates.** The
  denominator of the infant mortality rate is **total live births** (not the average population of the
  0-year age group, and not “the number of people who survive to age 1”), so it **is not a rate in the
  strict sense** and **is not equal to the probability of infant death**; when the number of live births
  changes greatly between two consecutive years it cannot reflect the true level of that year. The
  denominator of the perinatal mortality rate is “**stillbirths + live births**”, and missing the
  stillbirths is the most common error; also note that a death before a live birth is a **fetal death**
  and does not count in the number of deaths of death statistics.
- **Using hospital figures in place of population indicators.** The case fatality rate of inpatients
  cannot represent the case fatality rate of a region (inpatients are generally more severely ill and do
  not necessarily come from the same region), outpatient cases in a hospital cannot be used to compute
  the incidence rate of a disease, and inpatient records cannot be used to infer the overall pattern of
  a disease. **First ask whom the denominator represents.**
- **Reporting rates with a small denominator with care.** In a region with only a few hundred live
  births, the infant mortality rate jumps by a few parts per thousand because of one or two deaths (with
  300 live births, one death is 3.3‰); likewise, when the death rate or the reproduction rate is
  computed for a very small special population (an occupation, an institution), the values fluctuate
  enormously. When the number of observational units is small, use absolute numbers, or give a
  confidence interval for the rate at the same time.
- **Treating the total fertility rate and the life-time fertility rate as the same thing.** The TFR is
  the estimated result of “assuming this generation lives out its life at this year's age-specific
  fertility level”, and is used for comparisons **between regions and between years**; the LTFR is the
  cumulative number of children a batch of women have **actually** borne after completing the whole
  childbearing period, and is used for comparisons **between different birth cohorts**.
- **Taking life expectancy for the “average age at death”.** Life expectancy $e_x$ is computed from the
  life table and is a combined reflection of the death rates of all the age groups; **it is not
  influenced by the age composition of the population**, so different regions and different periods can
  be compared directly. The average age at death, by contrast, is too high when there are many old
  people in the population and too low when the age composition is young, and the two cannot replace
  each other.
- **Forgetting the hypothesis test after standardization.** Standardization only makes two groups
  “comparable”; whether the difference between two standardized rates comes from sampling error still
  has to be tested along the lines of Chapter 5 / Chapter 10; likewise, when the sample is small (the
  number of infant deaths in one county in one year, say), the confidence interval for the rate has to
  be considered.

## How it connects to the other courses

::: tip Related pages
- **[Chapter 5 of *Health Statistics*, Describing Qualitative Data](/en/Health-statistics/05-describing-qualitative-data)** —— **one set of methods, two places of use**. That chapter gives, in its
  section on “standardization of rates”, the complete derivations of the direct method
  $p' = \sum N_i p_i / N$, the indirect method $p' = P \cdot r / \sum n_i P_i$, and the SMR, along with
  the four ways of choosing a standard and the four limitations of standardized rates; this chapter
  applies those methods directly to the comparison of crude death rates. Before reading “why
  standardization is required” in this chapter, go back there and go over the principles once; the
  worked example there discusses the comparison of incidence rates, and if you replace “incidence rate”
  with “death rate”, not one character of the algorithm changes.
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)** —— every “age-specific” indicator of this chapter requires age to be **binned** first. The
  equal-width binning and equal-frequency binning of that week correspond exactly to the two binning
  conventions in vital statistics: equal width (0–, 1–4, 5–9…, one group every 5 years) makes
  comparison between regions easy, while equal frequency (similar numbers in each group) avoids, in a
  very small population, some groups having too few people and their death rates swinging violently.
  The boundaries of the bins must be written in the report, otherwise others cannot compute the same
  indicator; keeping the 0-year group separate and leaving the last group open are likewise fixed
  requirements in vital statistics.
- **[Lecture 3 of *Introduction to Information Technology*, Arrays and Data Frames](/en/intro-it/3-arrays-and-data-frames)** —— the table of indicators of this chapter is, in R, just a **data frame**: one row
  is one age group of one region, and one column is the population, the deaths, or a rate. The example
  on this page builds the table by hand with `data.frame()`, while that lecture practises building data
  frames and “subsetting by dimension” (`df[logical condition, ]`, `subset()`). Lists are needed only
  for intermediate results of indeterminate length and irregular structure.
- **[Lecture 4 of *Introduction to Information Technology*, Lists and Factors](/en/intro-it/4-lists-and-factors)** —— this page uses `aggregate()` for grouped summaries (“add the numerators, add the
  denominators” within each group), which is exactly the basic skill of **grouped summaries**
  (`tapply()`, `by()`, `aggregate()`) practised in Exercises 4 and 5 of that lecture. This page also
  uses `xtabs()` to turn a long table into a two-dimensional table and `prop.table()` to compute
  proportions; these two functions are not covered specifically in the course and are used here
  directly, so look up `?xtabs` and `?prop.table` when needed.
- **[Chapter 19 of *Health Statistics*, Statistical Tables and Charts](/en/Health-statistics/19-tables-and-charts)** —— these indicators all end up in charts. The population pyramid is essentially a
  (back-to-back) histogram, the curve of the number surviving $l_x$ in a life table uses an ordinary
  line plot, the number dying ${}_nd_x$ uses a histogram, and the probability of death ${}_nq_x$ needs a
  semi-logarithmic line plot because it spans several orders of magnitude; the age-specific death rate
  is also often plotted on a semi-logarithmic line plot. That chapter deals with “which chart to draw
  and how to set the axes”, while this chapter deals with “what these numbers are and whether they can
  be compared”.
- **[Lecture 11 of *Introduction to Information Technology*, The ggplot2 Package](/en/intro-it/11-ggplot2)** —— that lecture is about the grammar of layers itself: `ggplot()` plus the layers
  `geom_point()`, `geom_histogram()`, `geom_raster()`, `geom_contour()`, and so on, together with the
  scale transformations of `scale_*()` and the theme parameters of `theme_*()`. The population pyramid
  and the age-specific death rate curve that this chapter wants to draw belong to the question of
  **choosing a chart and avoiding distortion** (back-to-back bars, a logarithmic vertical axis), and
  the chapter that deals with that level is Chapter 19, Statistical Tables and Charts ([open that
  chapter](/en/Health-statistics/19-tables-and-charts)): there you will find the complete code
  for drawing grouped bars with `geom_bar(position = "dodge")` and a semi-logarithmic line plot with
  `plot(log = "y")`. The specific way of joining two sets of bars into a population pyramid with
  `coord_flip()` is not demonstrated in the course, so look up `?coord_flip` when needed.
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/en/intro-it/9-base-graphics)** —— the `barplot()` comparison chart at the end of this page has its full set of
  arguments in that lecture (`beside`, the legend arguments `legend` and `args.legend`, `col`, the axes
  and the title), which you will need when comparing crude and standardized rates side by side in one
  chart.
- **[Lecture 12 of *Introduction to Information Technology*, Parameter Estimation](/en/intro-it/12-parameter-estimation)** —— the rates with a small denominator (the infant mortality rate, the death rate of an
  occupational population) fluctuate greatly, and a confidence interval for the rate should be given
  when they are reported; the algorithm is in that lecture.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/18-vital-statistics once
translated; for now the Chinese page /Health-statistics/18-vital-statistics) from:
- /Health-statistics/05-describing-qualitative-data, at the end of its "standardization of rates" section, add a sentence: "for the application of the same set of methods to vital statistics indicators (crude death rate, infant mortality rate, life expectancy), see Chapter 18 of Health Statistics".
- /Medical-Big-Data-Analysis/2-data-preprocessing, where equal-width/equal-frequency binning is discussed, add a sentence: "age grouping (0–, 1–4, 5–9…) is the standard use of binning in vital statistics, see Chapter 18 of Health Statistics".
- /intro-it/4-lists-and-factors, at Exercises 4 and 5 (grouped summaries with tapply/by/aggregate), add a sentence: "a complete example computing regional death rates and standardized rates with these operations is in Chapter 18 of Health Statistics".
- /Health-statistics/19-tables-and-charts, where histograms, line plots, and semi-logarithmic line plots are discussed, add a sentence: "the meaning of the data behind the population pyramid, the number-surviving curve of a life table, and the semi-logarithmic line plot of the age-specific death rate is in Chapter 18 of Health Statistics".
- /intro-it/11-ggplot2, where geom_histogram and scale transformations are discussed, add a sentence: "a complete example of a population pyramid and a semi-logarithmic line plot is in Chapter 18 of Health Statistics".
-->

## Summary

1. **The vital statistics indicators fall into three blocks**: population statistics (population size,
   sex and age composition, the population pyramid), fertility statistics (birth rate, fertility rate,
   total fertility rate, and the reproduction indicators), and mortality statistics (the crude death
   rate, the age-specific death rate, the cause-specific death rate, the infant mortality rate, the
   perinatal mortality rate, and so on), plus the disease statistics indicators and the life table
   indicators.
2. **Look at the denominator of every indicator first**: population size, average population, total
   live births, number of women of childbearing age, number of patients... The denominator decides
   whether the indicator describes a **risk for a population** or an **outcome for patients**. The
   denominator of the cause-of-death proportion is total deaths, the denominator of the case fatality
   rate is the number of patients, and the denominator of the death rate of a disease is the average
   population; these three can never be interchanged.
3. **The denominator of a rate often carries a time scale**: the denominator of the infant mortality
   rate is **total live births**, so it is not a rate in the strict sense and is not equal to the
   probability of infant death; the denominator of the perinatal mortality rate is “stillbirths + live
   births”. Only when the definitions of numerator and denominator are written clearly does an
   indicator have meaning.
4. **When the internal compositions differ, the overall rates cannot be compared directly**; a
   stratified comparison or standardization is required. The direct method requires the subgroup rates
   to be known, $p' = \sum N_i p_i / N$; the indirect method is used when only the total number of
   deaths is available, borrowing the subgroup rates of the standard population to obtain the expected
   numbers, $p' = P \cdot \text{SMR}$. A standardized rate **is only used for comparison and does not
   represent the actual level**; values computed from different standards cannot be compared with each
   other, standardization should not be used when the subgroup rates cross, and a hypothesis test is
   still needed after the comparison.
5. **Life expectancy $e_0$ is the best single indicator for assessing the health level of the
   residents**: it is combined from the age-specific death rates through the life table, is not
   influenced by the age composition of the population, and can be compared directly between different
   regions and different periods; the idea behind constructing an abridged life table is “age-specific
   death rate → probability of death → number surviving → person-years lived → total person-years lived
   → life expectancy”, and the cause-eliminated life table is used to measure the influence of one
   cause of death on lifespan.
