---
layout: doc
title: '8. t Tests'
---

# Chapter 8. t Tests

::: info Translation status
Translated from the [Chinese original](/Health-statistics/08-t-test). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> You have two groups (or one group) of quantitative measurements, and the sample means are not
> equal — is that a real difference, or the work of sampling error? The $t$ test is the basic tool for
> answering that question.

## What this chapter is for

The two most common comparisons in research are: comparing one batch of measurements with a known
standard value (birth weights of newborns vs the national average), or splitting the study subjects
into two groups, giving each a treatment, and comparing the two means (test drug vs control drug).

The trouble is that **sample means are bound to differ**. Even if two population means were exactly
equal, two randomly drawn groups would still give different means — that is sampling error. So
"3.42 kg ≠ 3.30 kg" is not evidence in itself, and neither is "men 4.65 ≠ women 4.22"; drawing a
conclusion straight from a comparison of magnitudes is simply wrong.

The way of judging built in this chapter is: first assume the population means are equal ($H_0$), then
compute how likely a difference as large as the one observed (or larger) would be under that
assumption — the probability $P$; only when $P$ is small enough is the difference credible. What the
$t$ test does is **choose the right statistic and compute that $P$ value correctly**.

By study design, the chapter covers three basic types: the one-sample $t$ test, the paired-design
$t$ test, and the two-sample $t$ test for independent groups. Each has its own required conditions, and
when the conditions fail the method has to change — which is where half of this chapter's length goes.

<TrackList :tasks="['Explain why small samples require the t distribution rather than the z distribution', 'Write down the statistics and degrees of freedom for all three t tests', 'Explain why a paired design turns the differences into a one-sample t test', 'Decide from a study scenario whether a paired or an independent-samples t test applies', 'Carry out a test for homogeneity of variance and know what to switch to when variances differ', 'Run one-sample, paired, and two-sample analyzes with t.test() and read the output', 'State where the boundary between the t test and the z test lies']" />

## Core concepts

### 1. The $t$ distribution: why small samples use $t$ rather than $z$

To judge "how far a sample mean has to be from a known population mean before it counts as far", you
need to know the sampling distribution of the sample mean.

If the population standard deviation $\sigma$ were known, the statistic

$$z=\frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}}$$

would follow the standard normal distribution, and the $P$ value could be read off a table of $z$
critical values. But $\sigma$ is almost always unknown and has to be estimated by the sample standard
deviation $S$, so the statistic becomes

$$t=\frac{\bar{x}-\mu_0}{S/\sqrt{n}}$$

The $S$ in the denominator is **an estimate**, and carries random fluctuation of its own. That extra
uncertainty, coming from the estimation, makes the distribution of $t$ have **heavier tails** than the
standard normal:

- a unimodal distribution centered on 0 and symmetric about it;
- the smaller the degrees of freedom $\nu$, the more spread out the values of $t$, with a lower peak
  and heavier tails;
- as $\nu$ grows, the $t$ distribution approaches the standard normal, and as $\nu \to \infty$ it *is*
  the $z$ distribution (so a table of $z$ critical values is really the $\nu=\infty$ row of a table of
  $t$ critical values).

Because the tails are heavier, at the same two-sided 0.05 the critical value of $t$ is always larger
than 1.96, and the smaller $\nu$ is, the larger it gets:

| Degrees of freedom $\nu$ | Two-sided $t_{0.05/2,\nu}$ |
| --- | --- |
| 5 | 2.571 |
| 9 | 2.262 |
| 15 | 2.131 |
| 19 | 2.093 |
| 24 | 2.064 |
| 49 | 2.010 |
| $\infty$ (that is, $z_{0.05/2}$) | 1.960 |

This table makes one point: **the critical value is stricter for small samples**. The smaller the
sample, the harder it is for the same difference in means to be called "statistically significant".

The $t$ value in a $t$ test is the test statistic; comparing it with the critical value $t_{\alpha,\nu}$
from the table, or simply looking at the $P$ value, tells you whether to reject $H_0$. Reject $H_0$ if
$P \le \alpha$, otherwise do not reject. The significance level $\alpha$ is usually taken as 0.05.

### 2. Conditions for using a $t$ test

- **Independence**: the observations are mutually independent, and the data of one subject do not
  affect another;
- **Normality**: the sample comes from a normally distributed population (in a paired design, what is
  required to be normal is the **differences**);
- **Homogeneity of variance**: when comparing two means, the two population variances must also be
  equal, that is $\sigma_1^2=\sigma_2^2$;
- **A fairly small sample**: usually taken as $n<50$ (for large $n$ the $z$ test is used instead, see
  below).

In practice a slight departure from the conditions does not matter much: as long as the distribution is
**unimodal and roughly symmetric**, the effect on the result is limited. What is genuinely fatal is
marked skewness (antibody titers, length of hospital stay), or a gross disparity between the two
variances — those two cases are handled by the methods described later.

### 3. The three types at a glance

| Design | Research aim | $H_0$ | Degrees of freedom |
| --- | --- | --- | --- |
| one-sample | compare the unknown population mean $\mu$ represented by the sample with a known population mean $\mu_0$ | $\mu=\mu_0$ | $n-1$ |
| paired design | whether the two paired treatment effects differ, reduced to comparing the mean difference with 0 | $\mu_d=0$ | number of pairs $-1$ |
| grouped design (two independent samples) | compare the two population means $\mu_1$ and $\mu_2$ represented by the two samples | $\mu_1=\mu_2$ | $n_1+n_2-2$ |

### 4. Sample mean versus population mean (the one-sample $t$ test)

**Aim**: to infer whether the unknown population mean $\mu$ represented by the sample differs from a
known population mean $\mu_0$.

**Conditions**: the data come from a normally distributed population; $\sigma$ is unknown and $n$ is
fairly small.

**Statistic**:

$$t=\frac{\bar{x}-\mu_0}{S/\sqrt{n}}=\frac{\bar{x}-\mu_0}{S_{\bar{x}}},\qquad \nu=n-1$$

where $S_{\bar{x}}=S/\sqrt{n}$ is the standard error of the sample mean, measuring how precisely the
sample mean estimates the population mean. The numerator is a difference in means and the denominator
is the standard error of that difference — **every $t$ test has this structure: difference ÷ standard
error of the difference**.

Note that the choice between one-sided and two-sided has to be made **before looking at the data**, on
subject-matter grounds. Only when experience rules out the possibility of a value below the standard
(for instance, hemoglobin in residents of highland areas can only be raised, or certain indices can
only be lowered) should a one-sided test be used at $\alpha=0.05$ (one-sided); otherwise use two-sided.

### 5. Comparing means in a paired design: why the differences become a one-sample $t$ test

This is the thing in this chapter that most needs thinking through.

**What a paired design is**

Subjects are matched into pairs on the principle that some important characteristic (a non-treatment
factor) is similar, and then the two members of each pair are randomly assigned to the two treatment
groups. Four common situations:

1. **matched pairs of different subjects**: two subjects each receive one of the two treatments (in
   animal experiments, pairing by litter, sex, and similar body weight);
2. **one sample, two methods**: the same sample measured by two methods on the same index, or
   subjected to two treatments;
3. **two sites on the same subject**: two sites on one subject given different treatments (left
   eye/right eye, left limb/right limb);
4. **before-and-after self-control**: comparing the results for the same subject before and after
   treatment (diastolic pressure before and after medication in the same group of hypertensive
   patients).

**What pairing is for**

It controls non-treatment factors, improves the balance between groups, and reduces experimental
error, all of which buy **greater power**. Put plainly: if the subjects in the two groups differ a
great deal to begin with, and one group happens to consist of people who are "better off" to start
with, the treatment effect is drowned by individual differences. Pairing removes those differences at
the analysis stage.

**Why the differences are essential**

Paired data come in pairs, with the data within a pair corresponding one to one. What interests the
researcher is **the increment produced by the treatment**, not the absolute level of each measurement
— how much the diastolic pressure of a patient is before and after treatment does not matter; what
matters is "how much it fell".

So first take the difference within each pair,

$$d_i=x_{i1}-x_{i2}$$

If the two treatments have the same effect, the population mean of the differences, $\mu_d$, is in
theory 0. The test therefore becomes:

$$t=\frac{\bar{d}-0}{S_d/\sqrt{n}}=\frac{\bar{d}}{S_d/\sqrt{n}},\qquad \nu=n-1$$

where $\bar{d}$ is the mean difference, $S_d$ is the standard deviation of the differences, and $n$ is
**the number of pairs** (not the total number of observations — a point that is very easy to get
wrong).

**Do you see the key point?** $H_0$ is $\mu_d=0$, and the problem has become "comparing a sample mean
with a known population mean of 0" — which is exactly a **one-sample $t$ test**. Hence:

> A paired $t$ test is a one-sample $t$ test applied to the differences; it is not a new kind of test.

Why it is statistically more sensitive: the variance of the paired differences is

$$\operatorname{Var}(d)=\sigma_1^2+\sigma_2^2-2\rho\sigma_1\sigma_2$$

Pairing makes the within-pair correlation $\rho>0$, which subtracts the term
$2\rho\sigma_1\sigma_2$; the variation of the differences is therefore far smaller than the variation
of the two sets of raw data, the standard error shrinks with it, and the same difference in means
yields a larger $t$ value.

**Condition**: it is the **difference $d$** that must be normally distributed — it is not enough for
"each group to be normal on its own".

**A caution about before-and-after self-control**: before and after are a fixed grouping, not a
concurrent control, and random allocation is not possible. If time itself affects the outcome (natural
remission of the disease, seasonal change, drift of the measuring instrument), a paired $t$ test will
mistake the time effect for a treatment effect, and a paired $t$ test is then inappropriate.

### 6. When to use a paired test and when to use independent samples

This is a judgment at the design level, far more important than the formulas, and the place students
most often get it backwards. The judgment takes one sentence:

> **Can you find a "partner" for every row of data?** If you can, and that partner was deliberately
> assigned by the study design, it is paired; if the subjects in the two groups have nothing to do
> with each other and the numbers may even differ, it is independent samples.

The comparison in detail:

| Research situation | Design type | Test to use |
| --- | --- | --- |
| same batch of samples, each measured once by two methods | paired (same subject) | paired $t$ test |
| same group of patients, measured before and after treatment | paired (before-and-after) | paired $t$ test |
| same group of patients, left eye and right eye given two drugs | paired (two sites on one subject) | paired $t$ test |
| paired by litter and body weight, each pair randomly allocated to two groups | paired (different subjects) | paired $t$ test |
| 20 patients **randomly divided into two groups**, each given one drug | grouped (completely randomized) | two-sample $t$ test |
| men and women sampled separately in one area and measured on the same index | grouped (two sampled populations) | two-sample $t$ test |

A few criteria that are easy to confuse:

- **Was there random allocation?** Allocating subjects at random to two groups is a grouped design;
  forming pairs on some characteristic and then randomizing **within each pair** is a paired design.
- **Can a pair be formed at all?** In comparing an index between boys and girls, each person has only
  one sex and simply has no partner — only an independent-samples $t$ test is possible. Conversely, the
  same batch of samples measured once by each of two methods is paired by nature, and forcing a grouped
  test wastes the design.
- **Pairing also requires complete pairs**: in a paired design, $n$ is the number of pairs, and both
  values of a pair are indispensable. If a subject was measured only once, that whole pair has to be
  dropped, or the analysis has to switch to a grouped test.

Get the design judgment wrong and the conclusion can come out exactly reversed. Look at what happens
with R's built-in `sleep` data (10 patients, two hypnotics, `extra` being the increase in hours of
sleep, with the same patients measured on both drugs — a textbook paired design):

| Method of analysis | Statistic | df | $P$ | Conclusion |
| --- | --- | --- | --- | --- |
| paired $t$ test (correct) | $t=-4.062$ | 9 | 0.0028 | the two drugs differ in hypnotic effect |
| treated as two independent samples (wrong) | $t=-1.861$ | 17.8 | 0.0794 | cannot yet be considered different |

The same batch of data, and merely from a different design judgment one result is significant and the
other is not. The reason: treated as independent samples, "the individual differences between
patients" get counted as error, and the treatment effect that really exists is drowned in noise.

The opposite mistake needs care too: forcing data that **are independent** into pairs (say, sorting two
groups by height and then pairing them forcibly) inflates the degrees of freedom, makes the $P$ value
too small, and easily produces false positives. Pairing must come from the design, and cannot be
arranged after the fact.

<ClickAnswer showText="▼ Decide for yourself first: which test applies in each case below?">

1. A dentist takes impressions from the mouths of **12 patients** using both a "subgingival
   impression technique with an individual tray" and a "conventional silicone impression method", and
   measures the distance from a landmark to the bottom of the gingival sulcus. Do the two methods
   differ?

2. A physician evaluating a hypnotic **randomly selects 20 patients with insomnia and then randomly
   divides them into two groups** of 10, giving one group the hypnotic and the other a placebo, and
   observes the length of sleep. Does the drug differ from placebo?

**Answers**

1. **Paired $t$ test.** Each of the 12 patients had both methods used in their own mouth — one subject
   contributes one pair of data, so the sample size is $n=12$ (the number of pairs). Pairing here also
   removes the nuisance of "anatomical differences in the gums between patients".

2. **Two-sample $t$ test.** The 20 patients were randomly divided into two groups; the groups are
   unrelated people and each person receives only one treatment, with $n_1=n_2=10$. Equal group sizes
   ≠ paired; the criterion is "does every row have a partner?", not "are the numbers equal".

</ClickAnswer>

### 7. Comparing two means in a grouped design (the two-sample $t$ test)

**Aim**: to infer whether the population means $\mu_1$ and $\mu_2$ represented by the two samples
differ.

**Conditions**: both samples come from normal populations, **and the two population variances are
equal**.

**Statistic**: first compute the pooled variance,

$$S_c^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}=\frac{\sum(x_{1i}-\bar{x}_1)^2+\sum(x_{2i}-\bar{x}_2)^2}{n_1+n_2-2}$$

then

$$t=\frac{\bar{x}_1-\bar{x}_2}{\sqrt{S_c^2\left(\dfrac{1}{n_1}+\dfrac{1}{n_2}\right)}},\qquad \nu=n_1+n_2-2$$

**Why the two variances may be "pooled"**: under the assumption of equal variances, the two sample
variances are two estimates of the same $\sigma^2$. Averaging them with degrees-of-freedom weights
gives an estimate of $\sigma^2$ more stable than either alone, and the power is therefore higher — this
is where the name "pooled variance" comes from, and why the grouped $t$ test is more powerful than the
approximate $t$ test, provided the variances really are equal.

Note that the **order of the two samples does not affect $t$**: the numerator has the same absolute
value and the denominator is unchanged, so the sign only indicates direction. In R the output gives
`mean in group A` minus `mean in group B`, and the sign tells you which is higher.

### 8. What to do when variances are unequal: the approximate $t$ test

If the two population variances are unequal, the pooled-variance $t$ test above **must not** be used,
because it inflates the Type I error rate (most obviously in the group with the smaller sample and the
larger variance). The approximate $t$ test (written $t'$ test) is used instead:

$$t'=\frac{\bar{x}_1-\bar{x}_2}{\sqrt{\dfrac{s_1^2}{n_1}+\dfrac{s_2^2}{n_2}}}$$

The numerator is still the difference in means, but the denominator becomes the square root of the sum
of the two squared standard errors (no pooling). Because the denominator is put together differently,
it no longer follows a $t$ distribution exactly, and one of three methods has to "correct" for that:

**Satterthwaite's method** (correcting the degrees of freedom):

$$\nu=\frac{\left(s_{\bar{x}_1}^2+s_{\bar{x}_2}^2\right)^2}{\dfrac{s_{\bar{x}_1}^4}{n_1-1}+\dfrac{s_{\bar{x}_2}^4}{n_2-1}}$$

**Welch's method** (correcting the degrees of freedom):

$$\nu=\frac{\left(s_{\bar{x}_1}^2+s_{\bar{x}_2}^2\right)^2}{\dfrac{s_{\bar{x}_1}^4}{n_1+1}+\dfrac{s_{\bar{x}_2}^4}{n_2+1}}-2$$

**Cochran & Cox's method** (correcting the critical value, degrees of freedom unchanged):

$$t'_{\alpha}=\frac{s_{\bar{x}_1}^2\,t_{\alpha/2,\nu_1}+s_{\bar{x}_2}^2\,t_{\alpha/2,\nu_2}}{s_{\bar{x}_1}^2+s_{\bar{x}_2}^2},\qquad \nu_1=n_1-1,\ \nu_2=n_2-1,\ \nu=n_1+n_2-2$$

(where $s_{\bar{x}_i}^2=s_i^2/n_i$.) The computed $t'$ is compared with this corrected critical value
$t'_{\alpha}$.

Of the three, Satterthwaite's and Welch's methods **correct the degrees of freedom**, while
Cochran & Cox's method **corrects the critical value**. The corrected degrees of freedom are generally
no longer an integer and are smaller than $n_1+n_2-2$; smaller degrees of freedom mean a larger
critical value and a larger $P$ value — that is, the approximate $t$ test is more **conservative**,
and that is the price paid for unequal variances.

One detail worth remembering: **when $n_1=n_2$, $t'$ is numerically identical to the pooled-variance
$t$** (because $S_c^2$ then equals the average of the two variances), and the two differ only in the
degrees of freedom. When the sample sizes are equal or close, the two methods give very similar
results.

### 9. Testing homogeneity of variance

Homogeneity of variance is the ticket of admission for the two-sample $t$ test; it is what decides
whether $\sigma_1^2=\sigma_2^2$ holds.

**The $F$ test (two samples)**

$$F=\frac{s_{\text{larger}}^2}{s_{\text{smaller}}^2},\qquad \nu_1=n_1-1,\ \nu_2=n_2-1$$

**Rationale**: assuming the two population variances are equal, the ratio of the two sample variances
will not be far from 1, that is, $F$ will not be far from 1. If $F$ departs too far, then $P$ is below
the significance level and there is reason to consider the population variances unequal.

Two practical points:

- **By convention the larger variance goes in the numerator**, so that a one-sided table of $F$
  critical values need only cover $F>1$; in R this is unnecessary, because `var.test()` gives the
  actual ratio and a two-sided $P$ value directly.
- **The significance level is often taken as $\alpha=0.10$ rather than 0.05.** A wrong conclusion from
  the variance test will cause trouble in the $t$ test that follows, so it is better to relax the level
  slightly and detect unequal variances more readily, reducing the Type II error.

**Other methods**: Bartlett's test and Levene's test. The $F$ test and Bartlett's test both require
normally distributed data; **Levene's test does not depend on the specific form of the distribution and
is more robust**, and it works for both two and several samples. For testing homogeneity of variance
across several samples Levene's test is preferable (Bartlett's test is noticeably biased when the
distribution is markedly peaked, or when samples are very large or very small).

**Three ways out when variances are unequal (or the data are skewed)**

1. **Approximate $t$ test** (the $t'$ test): the first choice when the data are normal but the
   variances differ;
2. **Transforming the variable**: a transformation that improves normality and homogeneity of variance
   at the same time, after which the ordinary $t$ test is used again;
3. **A nonparametric test** (such as a rank-sum test): used when the shape of the distribution is
   unknown, or the conditions still fail after transformation.

**When you need not agonize over it**: when both $n_1$ and $n_2$ exceed 50, the variance test may be
skipped; and when the two sample sizes are similar or equal (a balanced design), the test is still
highly efficient even with unequal variances, and the requirement for homogeneity is not strict.

### 10. Testing normality and transforming variables

The $t$ test, the $z$ test, and analysis of variance all require the data (or the paired differences)
to be normally distributed, so this has to be checked before use. The methods fall into two kinds:

- **graphical**: P–P plots and Q–Q plots. The idea is to plot the cumulative proportion of the actual
  data against the cumulative proportion "that a normal distribution would give" — if the data are
  normal, the points hug a straight line.
- **statistical tests**: the method of moments (assessing skewness and kurtosis with one index each),
  the W test, and the D test. In R the one most often used is the Shapiro–Wilk test
  (`shapiro.test()`).

Add to these **empirical judgment**: if subject-matter knowledge or previous research says that such
an index is roughly normally distributed, it can be used directly.

Two reminders:

- with a small sample, the normality test itself has very low power and its conclusion is unstable, so
  it should not be treated as a black-and-white verdict — with small samples, lean more on Q–Q plots
  and subject-matter experience;
- with a large sample, the central limit theorem guarantees that the sampling distribution of the mean
  is still close to normal, so a mild departure from normality in the raw data does not matter. But if
  the population is **extremely skewed**, a transformation is needed.

**Commonly used transformations**

| Transformation | Expression | Where it applies |
| --- | --- | --- |
| logarithmic | $x'=\lg x$ or $x'=\lg(x+k)$ | log-normal data; improves homogeneity of variance when the ratio of each sample's standard deviation to its mean is similar; straightens exponential curves |
| square root | $x'=\sqrt{x}$ | Poisson-distributed data or mildly skewed data (radioactive counts, say); when the variance is positively related to the mean |
| reciprocal | $x'=1/x$ | data that fluctuate widely at both ends, reducing the influence of extreme values |
| arcsine square root | $x'=\sin^{-1}\sqrt{x}$ | rates or percentages from a binomial distribution, especially when the population rate is below 30% or above 70% |

The cost of a transformation is that **it is less convenient to interpret than the original scale**
("the mean of the log antibody titer" is no longer something one can state directly), so do not
transform unless necessary, and if you do, say in the report which transformation was used.

### 11. Where the $t$ test and the $u$ ($z$) test divide

The $z$ test is based on the standard normal distribution, uses the $z$ value as its statistic, and
compares it with the $\alpha$ critical value to obtain a $P$ value. Two situations allow the $z$ test,
simplifying the computation:

1. **the population standard deviation $\sigma$ is known** (even if $n$ is small);
2. **the sample is large**, generally taken as $n\ge 50$ (for two groups, $n_1>50$ and $n_2>50$).

The three formulas commonly used then are:

$$z=\frac{\bar{x}-\mu_0}{S/\sqrt{n}}\ (n\ge 50),\qquad z=\frac{\bar{x}-\mu_0}{\sigma/\sqrt{n}}\ (\sigma\ \text{known}),\qquad z=\frac{\bar{x}_1-\bar{x}_2}{\sqrt{\dfrac{S_1^2}{n_1}+\dfrac{S_2^2}{n_2}}}$$

The logic of the boundary:

- with a large sample, $S$ estimates $\sigma$ accurately enough that the $t$ and $z$ distributions
  practically coincide, and either will do (look up the $\nu=\infty$ row of the $t$ table,
  $z_{0.05/2}=1.96$);
- **a large sample imposes no requirement on the type of distribution**, and the $z$ test can be used
  for non-normal populations or distributions of unknown form — the most practical advantage it has
  over the $t$ test;
- small sample + $\sigma$ unknown → only the $t$ test can be used;
- small sample + $\sigma$ known → use the $z$ test (for example, where the standard deviation of the
  content of a batch of product is known by regulation).

## Doing it in R

Everything below uses R's built-in data sets (`iris`, `sleep`, `PlantGrowth`, `ToothGrowth`, `mtcars`)
and can be pasted into RStudio and run directly. All output was actually produced on R 4.6.1 locally.

### 1. One-sample $t$ test

```r
# General form: x is a numeric vector, mu is the known population mean
# t.test(x, mu = 70)

# Example: petal length of Iris setosa; is its population mean equal to 1.5 cm?
x <- iris$Petal.Length[iris$Species == "setosa"]
length(x)          # 50
mean(x); sd(x)     # 1.462  0.17366
t.test(x, mu = 1.5)
```

```
	One Sample t-test

data:  x
t = -1.547, df = 49, p-value = 0.128
alternative hypothesis: true mean is not equal to 1.5
95 percent confidence interval:
 1.41265 1.51135
sample estimates:
mean of x
    1.462
```

How to read it:

- `t = -1.547` is the statistic. Checking by hand:
  $(1.462-1.5)/(0.17366/\sqrt{50})=-1.547$, in agreement with the output;
- `df = 49` is $n-1$;
- `p-value = 0.128 > 0.05`, so $H_0$ is not rejected, and the conclusion has to be written as
  "**there is not yet evidence that** the population mean petal length differs from 1.5 cm", not as
  "it equals 1.5 cm";
- `95 percent confidence interval` is the 95% confidence interval for the population mean,
  $1.413\sim1.511$; it **contains** 1.5, which is another way of saying the same thing as $P>0.05$.

A one-sided test adds the `alternative` argument, and the direction must be fixed before looking at
the data:

```r
t.test(x, mu = 1.5, alternative = "less")     # H1: mu < 1.5, p = 0.0641
t.test(x, mu = 1.5, alternative = "greater")  # H1: mu > 1.5, p = 0.936
```

Note the two-sided $P=0.128$ against the one-sided $P=0.0641$ — when the statistic falls on the left,
**the one-sided $P$ is exactly half the two-sided $P$**. This also shows why you cannot "look at the
data first and then choose the direction": choosing the direction halves the $P$ value, which secretly
enlarges $\alpha$.

### 2. Paired $t$ test

The `paired` argument of `t.test()` **cannot be combined with the formula form (`y ~ group`)**;
a paired test must be written as two vectors:

```r
sleep   # 10 patients, two hypnotics, extra = increase in hours of sleep
```

```r
# Correct form: two vectors + paired = TRUE
with(sleep, t.test(extra[group == 1], extra[group == 2], paired = TRUE))
```

```
	Paired t-test

data:  extra[group == 1] and extra[group == 2]
t = -4.062, df = 9, p-value = 0.00283
alternative hypothesis: true mean difference is not equal to 0
sample estimates:
mean difference
          -1.58
```

`df = 9` is **the number of pairs minus one** (10 patients → 9), not 20; and `mean difference` is the
mean difference $\bar{d}=-1.58$.

**Verifying "a paired $t$ test = a one-sample $t$ test on the differences" by working with the
differences**:

```r
d <- with(sleep, extra[group == 2] - extra[group == 1])
t.test(d, mu = 0)          # t = 4.062, df = 9, p-value = 0.00283, exactly equivalent
shapiro.test(d)            # and check whether the differences look normal
```

The two forms give exactly the same $t$, degrees of freedom, and $P$ value (differing only in sign,
depending on which is subtracted from which). **That is the whole secret of the paired $t$ test**:
there is no special "paired distribution" — it treats $d$ as a new variable and runs a one-sample test.

Conversely, **if the grouped $t$ test is used by mistake**:

```r
t.test(extra ~ group, data = sleep)   # Welch two-sample, t = -1.861, df = 17.78, p = 0.0794
```

On the same batch of data, $P$ goes from 0.00283 to 0.0794, and the conclusion goes from "they differ"
to "there is not yet evidence that they differ".

### 3. Two-sample $t$ test

```r
mt <- mtcars
mt$am <- factor(mt$am, labels = c("auto", "manual"))  # turn 0/1 into a factor: easier to read

t.test(mpg ~ am, data = mt)                    # default: Welch approximate t test
t.test(mpg ~ am, data = mt, var.equal = TRUE)  # pooled-variance t test when variances are equal
```

```
	Welch Two Sample t-test
t = -3.767, df = 18.33, p-value = 0.00137        # default (var.equal = FALSE)

	Two Sample t-test
t = -4.106, df = 30, p-value = 0.000285          # var.equal = TRUE
```

**Look carefully at what this one argument, `var.equal`, changes**:

| | Statistic $t$ | df | $P$ value |
| --- | --- | --- | --- |
| `var.equal = FALSE` (default, Welch) | $-3.767$ | $18.33$ | $0.00137$ |
| `var.equal = TRUE` (pooled variance) | $-4.106$ | $30.00$ | $0.000285$ |

- the default **Welch test does not require equal variances**, so the default setting of `t.test()` is
  the "safe" one; only when you have confirmed equal variances and want higher power should you write
  `var.equal = TRUE` explicitly;
- the degrees of freedom `18.33` is not an integer — that is precisely Welch's correction, and it is
  much smaller than $n_1+n_2-2=30$; the price is that although $|t|$ looks a little smaller, the $P$
  value is larger (more conservative);
- in this example both $t$ and $df$ differ. As noted earlier, **$t$ is the same only when the two
  sample sizes are equal** (in `mtcars` the two transmission types have 19 and 13 cars, not equal, so
  $t$ differs too);
- agreeing on the direction of the conclusion does not mean you may choose freely: if the $P$ value is
  already sitting near 0.05, the wrong choice of method is enough to change the conclusion.

### 4. Testing homogeneity of variance

```r
# F test: requires normal data
var.test(mpg ~ am, data = mt)
# F = 0.3866, num df = 18, denom df = 12, p-value = 0.0669

# Levene's test: does not depend on the form of the distribution, works for two or more groups (car package)
car::leveneTest(mpg ~ am, data = mt)
# Levene's Test for Homogeneity of Variance (center = median)
#       Df F value Pr(>F)
# group  1   4.188 0.0496 *
```

Two things to watch:

- **the $F$ that `var.test()` gives is the actual ratio $s_1^2/s_2^2$, with no sorting**, and the
  $P$ value is two-sided, so there is no need to make sure "the larger variance is in the numerator"
  as one would when using tables;
- **the two tests can give different conclusions near the boundary**. In this example the $F$ test
  gives $P=0.0669$ (equal variances at $\alpha=0.05$) while Levene's test gives $P=0.0496$ (unequal
  variances). This is not a bug — the $F$ test is sensitive to skewness and Levene's test is more
  robust (centring on the median by default, i.e. the Brown–Forsythe form). When the two disagree,
  handle it in the more conservative direction, or simply **use the default Welch test** and not
  gamble on whether the variances are equal.

The grouping variable of `leveneTest()` **must be a factor**, otherwise it errors:

```r
car::leveneTest(len ~ supp, data = ToothGrowth)          # fine
car::leveneTest(len ~ factor(dose), data = ToothGrowth)  # dose is numeric, needs factor() conversion
# car::leveneTest(len ~ dose, data = ToothGrowth)
# Error: Levene's test is not appropriate with quantitative explanatory variables.
```

Levene's test can also compare several groups at once, which the $F$ test cannot:

```r
car::leveneTest(weight ~ group, data = PlantGrowth)
#       Df F value Pr(>F)
# group  2   1.119  0.341
```

### 5. A complete analysis pipeline

The standard workflow for comparing two groups of quantitative data: **check the conditions first,
then choose the method**.

```r
# Use only the ctrl and trt1 groups from PlantGrowth
d <- droplevels(subset(PlantGrowth, group != "trt2"))
table(d$group)                          # ctrl 10, trt1 10

# Step 1: normality (each group separately)
tapply(d$weight, d$group, shapiro.test)
# ctrl: W = 0.9567, p = 0.747
# trt1: W = 0.9304, p = 0.452     -> no reason to reject normality in either group

# Step 2: homogeneity of variance
car::leveneTest(weight ~ group, data = d)
#       Df F value Pr(>F)
# group  1    0.62  0.441          -> variances equal (var.test also gives p = 0.372, same conclusion)

# Step 3: conditions satisfied, use the pooled-variance t test
t.test(weight ~ group, data = d, var.equal = TRUE)
# t = 1.191, df = 18, p-value = 0.249

# For comparison: without var.equal (default Welch)
t.test(weight ~ group, data = d)
# t = 1.191, df = 16.52, p-value = 0.25
```

Here $P=0.249$, so $H_0$ is not rejected and the conclusion is "there is not yet evidence that the two
groups of plants differ in weight".

If step 2 does detect unequal variances, simply **leave step 3 at the default** (Welch in `t.test()`)
— you do not need to compute Satterthwaite degrees of freedom yourself, because that is exactly what R
computes by default.

## Common pitfalls

The items below are also the most common misuses of the $t$ test — every one of them can be found in
real papers and student reports.

- **Drawing a conclusion straight from a comparison of sample means.** "3.42 kg is not equal to
  3.30 kg, so the two groups differ", "273.23 is greater than 234.31, so healthy people have higher
  transferrin" — reasoning of this kind ignores sampling error. The difference between sample means
  may come entirely from random fluctuation, and a hypothesis test is required.

- **Using a grouped $t$ test for a paired design (or the reverse).** This is the most serious kind of
  error: in the `sleep` data the paired test gives $P=0.0028$ while treating it as independent samples
  gives $P=0.0794$, reversing the conclusion outright. The criterion is "does every row have a
  partner?", not "are the two group sizes equal". Conversely, forcing independent data into pairs
  inflates the degrees of freedom, makes the $P$ value too small, and manufactures false positives.
  Pairing must come from the **design** and cannot be arranged after the fact.

- **Running a $t$ test without checking the conditions.** Using a $t$ test on skewed data (antibody
  titers, length of stay, concentrations), or using the pooled-variance formula for two independent
  samples without testing homogeneity — both make the $P$ value untrustworthy. The correct order is
  always: independence → normality (the differences, for a paired design) → homogeneity of variance →
  then choose the test. The way out when conditions fail is an approximate $t$ test, a transformation,
  or a rank-sum test, not forcing the computation.

- **Reading "$P>0.05$" as "the two groups are the same" or "ineffectiveness has been proved".**
  Failing to reject $H_0$ only means the available sample did not provide enough evidence; the correct
  statement is "**there is not yet evidence of** a difference". This is especially so with small
  samples — when power is insufficient, a difference that really exists cannot be detected either.

- **Comparing several groups with repeated pairwise $t$ tests.** Running three $t$ tests among three
  groups at $\alpha=0.05$ each gives a cumulative Type I error probability far above 0.05. With three
  or more groups and a single treatment factor, analysis of variance should be used (the next chapter),
  with a dedicated multiple-comparison method when pairwise comparisons are needed.

## How it connects to the other courses

::: tip Related pages
- **Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing** *(Chinese)*
  — that lecture is **writing R for exactly this kind of exercise**: computing $P$ values and
  acceptance regions by hand with `pt()` / `qt()` in a function called `fun1301`, then using
  `t.test()` and `var.test()` for "Exercise 1, one-sample", "Exercise 3, paired", and "Exercise 4,
  test variance homogeneity first and then choose a $t$ test". This chapter covers the **principles and
  conditions** behind those functions: why small samples need the $t$ distribution, why a paired design
  works on differences, and when `var.equal` should be `TRUE`. The two point at each other, and it is
  worth reading the same exercise from both sides. → [Open Lecture 13](/intro-it/13-hypothesis-testing)
  *(Chinese)*
- **Lecture 12 of *Introduction to Information Technology*, Parameter Estimation** *(Chinese)* —
  interval estimation and hypothesis testing are two sides of one coin. The
  `95 percent confidence interval` printed by `t.test()` **is** the confidence interval:
  **an interval containing $\mu_0$ is equivalent to $P>\alpha$**, and reading a $t$ test through the
  interval is often more intuitive than reading the $P$ value. → [Open Lecture 12](/intro-it/12-parameter-estimation)
  *(Chinese)*
- **Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing** *(Chinese)* — the
  means, variances, standard deviations, and quartiles of that week are the raw material of this
  chapter's statistics; the Z-score standardization of question 7, $z=(x-\bar{x})/S$, shares its
  numerator and denominator with the $t$ statistic, both being "deviation from the mean ÷ standard
  deviation". In addition, handling missing values and identifying outliers directly affect the
  normality and homogeneity judgments here — one uncleaned extreme value is enough to blow the
  variance up. → [Open Week 2](/Medical-Big-Data-Analysis/2-data-preprocessing) *(Chinese)*
- **Week 6 of *Medical Big Data Analysis and Decision Making*, Classification (2)** *(Chinese)* —
  classification tasks are usually preceded by **feature selection**: comparing the difference in means
  between two groups (diseased / not diseased) for each continuous variable, for which the two-sample
  $t$ test of this chapter is the most common screen. Conversely, the naive Bayes, ROC/AUC, and `caret`
  ten-fold cross-validation of that week mark out this chapter's boundaries — when the grouping
  variable is categorical, or what matters is the whole distribution rather than a mean, the $t$ test
  does not apply. Also, the ten accuracy values produced by cross-validation are repeated measurements
  on the same data, so paired structure has to be kept in mind when comparing two models' accuracies.
  → [Open Week 6](/Medical-Big-Data-Analysis/6-classification-2) *(Chinese)*
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/08-t-test once
translated; for now the Chinese page /Health-statistics/08-t-test) from:
- /intro-it/13-hypothesis-testing, in its summary.
- /intro-it/12-parameter-estimation, where the relation between confidence intervals and tests is discussed.
- /Medical-Big-Data-Analysis/2-data-preprocessing, at "Exercise 7, Z-score standardization".
- /Medical-Big-Data-Analysis/6-classification-2, at the end of its contents section.
-->

## Summary

1. **The $t$ test answers** whether the difference between sample means is real or caused by sampling
   error — every $t$ test has the single structure "difference ÷ standard error of the difference".
2. **Three types**: one-sample ($\mu$ vs $\mu_0$), paired (mean difference vs 0), and two independent
   samples ($\mu_1$ vs $\mu_2$), with degrees of freedom $n-1$, $n-1$, and $n_1+n_2-2$ respectively,
   as given by the number of pairs or the sample size.
3. **A paired $t$ test is a one-sample $t$ test applied to the differences.** Pairing removes the
   individual differences within pairs and raises the power; using the wrong design (a grouped test
   where pairing was needed) is enough to reverse the conclusion, and the criterion is "does every row
   have a partner?".
4. **Conditions**: independence and normality; a two-sample test additionally needs homogeneity of
   variance. When variances are unequal, switch to an approximate $t$ test (Satterthwaite / Welch /
   Cochran & Cox — the default `t.test()` in R is Welch), or to a transformation or a rank-sum test.
5. **The workflow for choosing a method**: decide the design type → check normality (the differences,
   for a paired design) → check homogeneity of variance for two independent samples → finally choose
   between the $t$ test, the $t'$ test, the $z$ test, and a nonparametric test. For $n\ge 50$ (or
   $\sigma$ known) use the $z$ test, which imposes no requirement on the distribution.
