---
layout: doc
title: '14. Tests of Homogeneity and Contingency Tables'
---

<script setup>
// The data file of the Week 14 original exercises, embedded so that the R environment in the page can read it
const test1401Txt = `11,12,4,8,7,11,10,5,9,6,4,12,5,9,5,3,8,4,6,7,8,10,6,8,7,10,9,11,11,13,8,8,5,8,6,3,9,8,5,6,8,5,4,7,7,11,6,3,11,7,9,8,7,5,7,9,8,9,10,8,7,2,2,16,5,7,10,10,11,9,10,11,9,10,3,7,11,9,12,5,7,10,15,7,1,16,5,4,9,7,8,10,4,9,13,6,6,5,4,8,8,8,12,3,6,8,6,8,8,8,5,5,7,9,9,12,10,9,10,5,6,7,7,9,10,6,11,3,9,10,8,6,3,6,12,12,8,6,8,10,7,5,6,7,6,8,7,5,4,6,14,8,8,10,9,4,9,7,11,10,5,6,5,8,8,9,6,9,15,10,4,7,4,7,10,2,10,8,10,9,8,9,9,6,4,13,10,9,5,8,6,12,2,6,5,7,10,15,9,8
`

const code1401 = `fun1401 = function(ni, pi){
  m = length(ni)
  n = sum(ni)
  z0 = sum((ni-n*pi)^2/(n*pi))
  1 - pchisq(z0, m-1)
}
# Test lambda=8?
x = scan(file = 'test1401.txt',sep = ',')
ni = table(x)
pi = dpois(as.numeric(names(ni)),8)
fun1401(ni,pi)
# Conclusion: the data follow a Poisson distribution with lambda = 8`

const code1402 = `# Test for a uniform distribution
x = c(210, 312, 170, 85, 223)
chisq.test(x, p = rep(0.2, time = 5))$p.value
# The returned test P value is approximately 0: the sales are not uniformly
# distributed, that is, there is a clear preference`

const out1402 = `[1] 1.592068e-28`

const code1403 = `# Use rt to generate the random number sequence x, and verify that the random numbers
# approximately follow a standard normal distribution
set.seed(1)
x = rt(100, 24)
#(1)
ks.test(x, pnorm, mean = 0, sd = 1)$p.value
# From the test P value, x may be considered to follow a standard normal distribution
#(2)
#Use rnorm to generate the random number sequence y, and verify that the two come from the same distribution
y = rnorm(200)
ks.test(x,y)$p.value
# From the test P value, the two may be considered to come from the same distribution, that is,
# x approximately follows a standard normal distribution`

const code1404 = `x = c(19.9, 20.1, 20.0, 20.1, 20.2, 20.0, 19.9, 20.0, 20.0,
      20.0, 20.1, 20.0, 20.0, 19.9, 19.8)
shapiro.test(x)$p.value
# The test P value is about 0.22, so the measurements may be considered normally distributed`

const code1405 = `x = c(61, 33, 29, 31, 51, 41, 24, 20, 12)
x = matrix(x, nrow = 3, byrow = TRUE)
chisq.test(x)$p.value
#The test P value is about 0.0022, so at the significance level of 0.05,
#the treatment effect may be considered related to age group`

const out1405 = `[1] 0.002189494`

const code1406 = `# Small sample: use Fisher's exact test
x = matrix(c(3,6,4,4),nrow = 2)
fisher.test(x)$p.value
# The test P value is about 0.64, so the pass rates of the two apprentices may be
# considered not significantly different`

const out1406 = `[1] 0.6371863`

const code1407 = `# Use McNemar's test
x = matrix(c(598,14,90,48), byrow = TRUE, nrow = 2)
mcnemar.test(x)$p.value
# The test P value is about 0, showing that the publicity had a clear effect on subject choice`

const out1407 = `[1] 1.918511e-13`

const code1408 = `x = matrix(c(13, 13, 12, 6, 9, 8, 5, 7, 9), nrow = 3, byrow = TRUE)
# install.packages('epiR')
epiR::epi.kappa(x, method = 'cohen')$z$p.value
# The returned P value is about 0.33 > 0.05, so we cannot reject κ = 0 (agreement no better than chance)`

const out1408 = `[1] 0.3255218`
</script>

# Tests of Homogeneity and Contingency Tables

::: info Translation status
Translated from the [Chinese original](/intro-it/14-goodness-of-fit-and-contingency). Numbers, formulas,
and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

## Objectives

- Master the Pearson goodness-of-fit test.
- Master the Kolmogorov–Smirnov test of homogeneity.
- Master the test of independence for contingency tables.
- Master Fisher's exact test.
- Master McNemar's test and the kappa test.
- Master methods of testing normality.

::: tip The “map of test functions” for this lecture
Different types of question go with different test functions. See clearly **what the data look like**
first, then choose the function:

| Shape of the data | Function to use | Typical question |
| --- | --- | --- |
| one column of frequencies + theoretical proportions | `chisq.test(x, p =)` | whether there is a preference among five beers |
| two-dimensional contingency table (two independent samples) | `chisq.test(matrix)` | whether the treatment effect is related to age group |
| two-dimensional contingency table but with a **small sample** | `fisher.test(matrix)` | the difference in the pass rates of two apprentices |
| two-dimensional contingency table but with **paired** data | `mcnemar.test(matrix)` | the change in subject choice before and after publicity |
| one column of continuous data | `ks.test` / `shapiro.test` | whether the data follow a given distribution |
:::

## Exercise 1: Chi-square goodness-of-fit test

Open the script file **test1401.R** and complete the tasks below.

1. Write the user-defined function `fun1401` to compute the test P value of the chi-square goodness-of-fit test, where the input argument `ni` is the observed frequency and `pi` is the theoretical probability.
2. The test statistic is

   $$Z = \sum_{i=1}^{m}\frac{(n_i-np_i)^{2}}{np_i} \sim \chi^{2}(m-k-1)$$

   where $n_i$ is the observed frequency and $p_i$ is the theoretical relative frequency.

3. The returned test P value equals $1-P(Z \le z_0)$.
4. Test whether the data in `x` follow a Poisson distribution with parameter 8.

<AnswerBlock title="Exercise 1 · Reference answer" :code="code1401" />

::: tip Every “term” of the statistic measures the deviation of one cell
$$\frac{(n_i - np_i)^2}{np_i}$$

Take it apart: $n_i$ is the number **actually observed** in the $i$-th category, and $np_i$ is the number
there **theoretically should** be. The numerator is the squared deviation, and the denominator
**standardizes** it — a cell with a large expected count is allowed a large absolute deviation.

The deviations of all the cells added up give $Z$. The smaller the deviations, the smaller $Z$, and the
more the null hypothesis “the data follow this distribution” is supported.

**The $k$ in the degrees of freedom $\chi^2(m-k-1)$ is “how many parameters were estimated from the
sample”**:

- in this exercise $\lambda = 8$ is **given in the problem**, no parameter was estimated, so $k=0$ and
  the degrees of freedom are $m-1$ (the answer writes exactly `m-1`).
- if the problem said “test whether the data follow a Poisson distribution” without giving $\lambda$,
  you would first have to estimate $\lambda$ with $\bar{x}$; then $k=1$ and the degrees of freedom
  become $m-2$.

**The combination of `table()` and `dpois`** is neat: `table(x)` counts how often each value occurs, and
`as.numeric(names(ni))` takes those “values” out as the $x$ of the Poisson distribution and works out
the theoretical probabilities.
:::

## Exercise 2: Beer preference test

Create the script file **test1402.R** and complete the tasks below.

A store surveyed the sales of five beers over some period (unit: cases), which were 210, 312, 170, 85,
and 223. Judge whether customers have a significant preference among the five beers, with $\alpha=0.05$.

<AnswerBlock title="Exercise 2 · Reference answer" :code="code1402"
  :output="out1402" />

::: tip The two uses of chisq.test
```r
chisq.test(x, p = rep(0.2, 5))   # goodness-of-fit: x is frequencies, p is theoretical proportions
chisq.test(table)                # independence: pass a two-dimensional contingency table
```

The first use is the “official implementation” of the formula written by hand in Exercise 1 —
`rep(0.2, 5)` says “if customers had no preference, the five beers should each take 20%”.

**How to read the conclusion**: $p \approx 0$, far below 0.05, so **the null hypothesis is rejected**:
customers' preference among the five beers does differ significantly (the sales are not uniformly
distributed).

> A small detail: the answer writes `rep(0.2, time = 5)`. The positional argument of `rep` is really
> `times`, but R supports **partial matching**, so `time` is recognized as `times` as well. For clear
> code, however, it is better to write `times` in full.
:::

## Exercise 3: Kolmogorov–Smirnov test

Create the script file **test1403.R**, and verify that with fairly large degrees of freedom the $t$
distribution approximately matches the standard normal distribution; in this exercise take the degrees
of freedom to be 24.

1. Method 1: verify with the one-sample `ks.test` function.
2. Method 2: verify with the two-sample `ks.test` function.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code1403" />

::: tip The KS test: one sample vs two samples
**One sample**: compare the data with **a known distribution**

```r
ks.test(x, pnorm, mean = 0, sd = 1)
#        ↑data  ↑distribution function  ↑distribution parameters
```

**Two samples**: compare two sets of data **with each other**, to see whether they come from the same
distribution

```r
ks.test(x, y)
```

The null hypothesis of both tests is “**the distributions are the same**”, so **a large $p$ value =
cannot reject = the distributions may be considered the same**.

What is neat about this exercise: $t(24)$ and the standard normal are not the same distribution to
begin with, but once the degrees of freedom are large the two almost coincide, so the KS test cannot
tell them apart and the $p$ value is on the large side — which confirms statistically the conclusion
that “**with a large sample the $t$ distribution approaches the normal**”.

> This exercise also has a teaching value: **a large P value does not mean “the null hypothesis has
> been proved true”**; it only means “the data are not enough to refute it”.
:::

## Exercise 4: Normality test

Create the script file **test1404.R** and complete the tasks below.

An experiment group of 15 students measured the length of an object (unit: cm) and got 19.9, 20.1,
20.0, 20.1, 20.2, 20.0, 19.9, 20.0, 20.0, 20.0, 20.1, 20.0, 20.0, 19.9, 19.8.

1. Use `qqnorm` to draw a scatter plot, and see whether the data approximately follow a standard normal distribution.
2. Use the Shapiro-Wilk test to test whether the lengths measured in this experiment agree with a normal distribution, with $\alpha=0.05$.

<AnswerBlock title="Exercise 4 · Reference answer" :code="code1404" />

::: tip Looking at a plot + running a test: two complementary tools
**`qqnorm(x)`**: plots the sample quantiles and the theoretical normal quantiles as a scatter plot.
If the points **roughly fall on a straight line**, the data are close to normally distributed.
Its advantage is being **intuitive**: you can see the specific shape — skewness, heavy tails, and so
on.

**`shapiro.test(x)`**: gives a P value, and its advantage is **having an objective standard**; its
drawback is being a single number that cannot show where the data are abnormal.

In real work use both: draw the QQ plot first to see the overall shape, then use Shapiro-Wilk for a
quantified conclusion.

**Note**: the Shapiro-Wilk test requires a sample size between **3 and 5000**; with a very large sample
it is sensitive even to tiny departures, and then the QQ plot should be relied on more. This exercise
has 15 observations, which is just right.

Conclusion: $p \approx 0.22 > 0.05$, so **the normality assumption cannot be rejected**, and the
measurements may be considered normally distributed.
:::

## Exercise 5: Test of independence and homogeneity of distributions

Create the script file **test1405.R** and complete the tasks below.

The effects obtained when a certain drug treats patients of different age groups are counted in the
table below. Analyze whether the treatment effect is related to age group, with $\alpha=0.05$.

| Effect | Children | Middle-aged | Elderly |
| --- | --- | --- | --- |
| Marked | 61 | 33 | 29 |
| Moderate | 31 | 51 | 41 |
| Poor | 24 | 20 | 12 |

<AnswerBlock title="Exercise 5 · Reference answer" :code="code1405"
  :output="out1405" />

::: tip Filling the table into a matrix row by row
```r
x = c(61, 33, 29, 31, 51, 41, 24, 20, 12)
x = matrix(x, nrow = 3, byrow = TRUE)
```

`byrow = TRUE` is the key — the data are **copied down one row at a time** (Lecture 3 stressed that
`matrix` fills by column by default).

**Why is no `p` argument needed?** The null hypothesis of the test of independence is “**the row
variable and the column variable are unrelated**”, that is, “the proportion should be the same in every
column”. You do not have to supply those theoretical proportions: R works them out from the **marginal
totals** by itself (row total × column total ÷ grand total), and this is exactly the only difference in
implementation between the “test of independence” and the “goodness-of-fit test”.

Conclusion: $p \approx 0.0022 < 0.05$, so **the null hypothesis is rejected**, and **the treatment
effect may be considered related to age group**.
:::

## Exercise 6: Significance test for a contingency table

Create the script file **test1406.R** and complete the tasks below.

Two apprentices, A and B, make handicrafts. Apprentice A made 7 handicrafts, 3 of them up to standard
and 4 not; apprentice B made 10 handicrafts, 6 of them up to standard and 4 not. Is there a significant
difference between the proportions of qualified products made by the two apprentices? Take
$\alpha=0.05$.

<AnswerBlock title="Exercise 6 · Reference answer" :code="code1406"
  :output="out1406" />

::: tip With a small sample Fisher's test is mandatory
`chisq.test` is an **approximate** test; it relies on the premise that “the expected count in every cell
is at least 5”. As soon as a cell is too small, the approximation is inaccurate and R gives you a
`Chi-squared approximation may be incorrect` warning.

Fisher's exact test, by contrast, computes exact probabilities straight from the **hypergeometric
distribution**, and is not limited by sample size.

From the matrix you can see how small the cells are:

```r
x = matrix(c(3, 6, 4, 4), nrow = 2)
#       [,1] [,2]
# [1,]    3    4      ← A: 3 up to standard, 4 not
# [2,]    6    4      ← B: 6 up to standard, 4 not
```

(Note that this fills by column: `c(3,6,4,4)` first fills column 1 = 3, 6, then column 2 = 4, 4.)

**Conclusion**: $p \approx 0.64 > 0.05$, so **the null hypothesis cannot be rejected**, and the pass
rates of the two apprentices do not differ significantly.
:::

## Exercise 7: Test of difference

Create the script file **test1407.R** and complete the tasks below.

A high school streams its students into arts and science. Because too few students chose the arts, the
school encouraged students to choose the arts through publicity and obtained the statistical data.
Did the school's publicity have a significant effect on the students' subject choice? Take
$\alpha=0.05$.

<AnswerBlock title="Exercise 7 · Reference answer" :code="code1407"
  :output="out1407" />

::: tip Paired data need McNemar, not an ordinary chi-square
The criterion is: **the same subjects were measured twice, before and after** (one cell per person, not
two groups of people).

| Shape of the data | Test to use |
| --- | --- |
| two **different** groups of people, each measured once | `chisq.test` |
| the **same** group of people, measured once before and once after the publicity | `mcnemar.test` |

McNemar's test cares only about the two cells **off the diagonal** — that is, the people who **changed
their minds**:

$$\chi^2 = \frac{(b-c)^2}{b+c}$$

So whether the publicity **had any effect** is read from whether the numbers switching from science to
arts and from arts to science are very unequal.

```r
x = matrix(c(598, 14, 90, 48), byrow = TRUE, nrow = 2)
#       [,1] [,2]
# [1,]  598   14
# [2,]   90   48
```

**Conclusion**: $p \approx 0 < 0.05$, so **the null hypothesis is rejected**: the publicity had a clear
effect on subject choice.

> A small note: the table in the original exercise is a Word table, and its row and column structure
> gets scrambled when plain text is extracted. The matrix above is taken straight from the answer
> script `test1407.R`, so the code is what counts.
:::

## Exercise 8: Agreement test (kappa)

Create the script file **test1408.R** and complete the tasks below.

Two doctors, A and B, grade a group of patients suffering from a certain disease; the results are in the
table below. Use the kappa test to judge whether the two doctors' diagnoses agree. Take $\alpha=0.05$.

| A's diagnosis | B's diagnosis, grade 1 | B's diagnosis, grade 2 | B's diagnosis, grade 3 |
| --- | --- | --- | --- |
| grade 1 | 13 | 13 | 12 |
| grade 2 | 6 | 9 | 8 |
| grade 3 | 5 | 7 | 9 |

> Note: if the `epiR` package is not installed in your lab environment, you can skip this exercise.

<AnswerBlock
  title="Exercise 8 · Reference answer"
  description="This exercise needs the epiR package. If it cannot be installed in the web environment, copy the code into R on your own machine and run it."
  :code="code1408"
  :output="out1408"
/>

::: tip A chi-square test asks whether the diagnoses are “related”; a kappa test asks “how much they agree”
These two questions are **not the same**:

| Question | What to use | Output |
| --- | --- | --- |
| whether the two doctors' diagnoses **are related** | `chisq.test` | P value |
| **how high** the agreement of the two doctors' diagnoses is | kappa test | κ coefficient + P value |

**Why is kappa still needed?** Because even two doctors who are “guessing blindly” will agree on some
proportion of cases by chance. The kappa coefficient takes that **chance agreement** out:

$$\kappa = \frac{P_o - P_e}{1 - P_e}$$

where $P_o$ is the observed agreement and $P_e$ is the expected agreement.

**Conventional interpretation of κ**:

| κ value | Strength of agreement |
| --- | --- |
| < 0.20 | poor |
| 0.21 ~ 0.40 | fair |
| 0.41 ~ 0.60 | moderate |
| 0.61 ~ 0.80 | substantial |
| > 0.80 | almost perfect |

**Conclusion**: $p \approx 0.33 > 0.05$, so we **cannot reject $\kappa = 0$** — there is **not** enough
evidence that the two doctors agree any better than chance. The `$z$p.value` in the reference answer
tests the null hypothesis $\kappa = 0$ (agreement no better than chance), **not** “the agreement is
high”, so do not get the direction backwards. Here $\kappa \approx 0.078$, which falls in the
**“poor” band ($< 0.20$)** of the table above: a large $P$ value and a small $\kappa$ are two ways of
saying the same thing.

The `::` in `epiR::epi.kappa(x, method = 'cohen')$z$p.value` means “use the function in the epiR package
directly, without needing `library(epiR)` first”.
:::

## Summary

| Test | Function | Null hypothesis | Shape of the data |
| --- | --- | --- | --- |
| goodness-of-fit | `chisq.test(x, p =)` | the observed frequencies agree with the theoretical proportions | one-dimensional frequencies |
| independence | `chisq.test(table)` | the row and column variables are mutually independent | two-dimensional contingency table |
| Fisher's exact | `fisher.test(table)` | as above, but **small samples** | two-dimensional contingency table |
| McNemar | `mcnemar.test(table)` | **paired** data show no change from before to after | 2×2 paired table |
| kappa | `epiR::epi.kappa()` | the two raters' agreement is **no better than chance** ($\kappa = 0$) | square matrix |
| KS homogeneity | `ks.test(x, distribution)` / `ks.test(x, y)` | the distributions are the same | continuous data |
| Shapiro-Wilk | `shapiro.test(x)` | the data follow a normal distribution | continuous data (n: 3~5000)|

**Test statistics and their distributions (hand-written version)**:

$$Z = \sum_{i=1}^{m}\frac{(n_i-np_i)^{2}}{np_i} \sim \chi^{2}(m-k-1), \qquad
\chi^{2}_{\text{McNemar}} = \frac{(b-c)^{2}}{b+c} \sim \chi^{2}(1)$$

::: tip The direction of the P value: when “large” is good news
This is the place in the whole course that is easiest to remember backwards, and this lecture shows it
most clearly:

| Type of test | What a **small** P value means | What a **large** P value means |
| --- | --- | --- |
| goodness-of-fit / independence | there is a significant difference / an association | the distributions match / the variables are independent |
| McNemar | there is a significant change from before to after | there is no change from before to after |
| KS / Shapiro-Wilk | the data do **not** follow the distribution | the data **do** follow the distribution |
| kappa | the agreement is **better than chance** ($\kappa$ significantly different from 0) | we cannot say the agreement is better than chance |

The rule: **look at what the null hypothesis is**. When the null hypothesis is “no difference / the
distribution is followed / the variables are independent” — a statement that says nothing is wrong —
a large P value is actually good news. But the null hypothesis for kappa is “the agreement is no
better than chance ($\kappa = 0$)”, so there a large P value means there is **no** evidence for
agreement at all — which is exactly what Exercise 8 on this page lands on
($P \approx 0.33$, $\kappa \approx 0.078$).
:::

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第十四周原题`, and the answers from `资料/答案/第十四周答案` (only typos
in them were corrected).
The contents of `test1401.txt` used in Exercise 1 have already been pasted into the reference answer on
this page, so they can be copied straight into RStudio and run.
The formulas in the original exercises are Word equation objects and run together into a jumble when
plain text is extracted; this page has restored them in LaTeX in the standard statistical form, and
checked them item by item against the answer scripts.
:::

::: tip Want the statistics behind it?
This lecture runs **R implementations of the chi-square test, kappa, and tests of homogeneity**. The
relevant principles are summarized on the following pages:

- **[Chapter 10 of *Health Statistics*, Chi-Square Tests](/Health-statistics/10-chi-square)** *(Chinese)* —
  whether a $2\times2$ contingency table should use the dedicated formula or the corrected formula,
  when Fisher's test is mandatory, and the table of criteria for expected frequencies.
- **[*Health Statistics*, Agreement and Reliability (Kappa and ICC)](/en/Health-statistics/agreement-reliability)** —
  the kappa test of Exercise 8 in this lecture rests on the idea of “taking out agreement by chance”;
  that page also covers weighted kappa, ICC, and **why a correlation coefficient cannot be used as a
  measure of agreement**.
- **[*Health Statistics*, Diagnostic Test Evaluation (ROC and AUC)](/en/Health-statistics/diagnostic-test)** —
  using the $2\times2$ contingency table for diagnosis gives sensitivity, specificity, predictive
  values, and the ROC curve.
:::
