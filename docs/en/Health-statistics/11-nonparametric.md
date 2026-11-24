---
layout: doc
title: '11. Nonparametric and Rank-Based Tests'
---

# Chapter 11. Nonparametric and Rank-Based Tests

::: info Translation status
Translated from the [Chinese original](/Health-statistics/11-nonparametric). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The $t$ tests and analysis of variance you have studied so far all require the data to come from a
> normal population with equal variances. This chapter deals with the case where **those conditions
> simply do not hold**: instead of adopting some other distributional assumption, it throws the actual
> values away and keeps only the order of magnitude, using **ranks** to make the inference.

## What this chapter is for

Look through the data you really meet in research and you will find that the conditions for a parametric
test often fail:

- A clinical laboratory physician had 11 healthy adults' urinary mercury measured by two methods, A and
  B. Run a grouped $t$ test on the data directly and you get $t=0.328$, $P=0.746$, with the conclusion
  "the two methods do not differ". But the design itself is **paired** (the same people, two methods),
  and the human error of the two methods makes **the differences not normal at all** — that $P$ value is
  untrustworthy from the ground up.
- Comparing the time to fever subsidence in epidemic hemorrhagic fever patients under a new therapy and
  a conventional one, the conventional-therapy group throws up **extreme values** such as 196 and 245
  hours; the normality test gives $W=0.628$, $P<0.001$, and the test for homogeneity of variance also
  rejects equal variances ($P=0.011$). The first two premises of the $t$ test have both collapsed.
- Therapeutic effect is recorded as "cured, markedly effective, improved, ineffective", or the
  laboratory result is only an **inexact value** such as "$<0.2$" or "$>50$" — for data like these you
  cannot even compute a decent mean, let alone run a $t$ test.

What these three cases have in common is that **the reliable information in the data is not "how much",
but "which is larger than which"**. The methods in this chapter extract that information and test with
it, so they need no assumption at all about the shape of the population distribution. Collectively they
are called **nonparametric tests**, also known as **distribution-free tests**.

## Core concepts

### Nonparametric tests and when to use them

A **parametric test** estimates or tests the population **parameters** (the population mean $\mu$, say)
on the premise that the distribution type of the population is known (normal, for instance). The $t$ test
and analysis of variance both belong to this family: they use **all** the information in the numbers,
so they are **highly efficient**, but they also make strict demands on the distribution.

A **nonparametric test** does not rely on the distribution type of the population and makes no inference
about population parameters; it compares the population's **distribution, or the location of that
distribution**, using only the sample observations. This chapter covers the most commonly used member of
the family — the **rank-sum tests**, built on the **rank transformation** — along with the sign test,
the runs test, rank correlation analysis, and so on.

Three kinds of data are suitable for a rank-sum test:

1. **Quantitative data that do not meet the conditions of a parametric test**: not normally distributed,
   variances unequal, or still falling short of what a parametric test requires after a transformation of
   the variable (taking logarithms, square roots, and so on);
2. **Data that were never measured precisely**: ordinal data, and data whose value is indeterminate at
   one or both ends (results given only as "less than" or "greater than", such as $<0.2$ or $>50$);
3. **Data whose distribution type is unknown**: you cannot tell what distribution it follows at all, so
   there is no way to ask whether it is normal.

The mistake most easily made here is to read this as "nonparametric tests are better, because you do not
have to worry about the distribution". **They are not.** Each approach has its price, and the choice
depends on the data:

| | Parametric test | Nonparametric test |
| --- | --- | --- |
| Demands on the population distribution | Fairly strict (normality, homogeneity of variance, ...), so the range of application is limited | No requirement on the distribution type; wide applicability, usable for any type of data |
| Information used | Makes full use of the information in the data (every actual value is used) | Does not make full use of the information in the data (only the order of magnitude is kept) |
| Power | Higher | Lower |
| Typical methods | one-sample $t$ test, paired $t$ test, two-sample $t$ test, analysis of variance | Wilcoxon signed-rank test, Wilcoxon rank-sum test, Kruskal–Wallis $H$ test, Friedman $M$ test, Spearman's rank correlation |
| Applicable when | quantitative data, normal, equal variances, independent | unknown distribution / skewed / unequal variances / ordinal data / inexact values / very small sample / extreme values |

**The conclusion is**: for data that meet the conditions of a parametric test, the parametric test is the
first choice; switching to a nonparametric test there would lower the power and raise the probability of
committing a Type II error (failing to find a difference that is really there). For data that do not meet
those conditions, a nonparametric test is the better choice, and its power may in fact be higher than the
parametric test's.

As for "how much power is lost", it is enough to remember the rough magnitude: **when the data really are
normal, replacing the $t$ test with a rank-sum test costs about 5% of the power** (in other words, to
reach the same power you need a sample about 5% larger). That price is quite small; whereas forcing a $t$
test on data that do not meet the conditions can give a $P$ value that is completely wrong — in the
fever-subsidence example above, the grouped $t$ test gives $P=0.055$, "no difference", while the rank-sum
test gives $P<0.01$, "the new therapy brings the fever down faster" — exactly opposite conclusions. **The
price of using the wrong test is far greater than losing 5% of the power.**

### Ranks: turning values into order

The **rank** of a sample is the **position** each observation occupies after the observations are lined
up from smallest to largest.

- When values are equal, take the **average rank**. If the two values in positions 2 and 3 are equal,
  both are recorded as $(2+3)/2=2.5$;
- The rank transformation discards the information about distances between values and keeps only the
  information about order. That is both why it needs no distributional assumption and why its power is
  lower.

For any $n$ observations the sum of the ranks is a fixed number:

$$\sum_{i=1}^{n} R_i = \frac{n(n+1)}{2}$$

This identity will be used again and again in every section below; it is the check that tells you
**whether the ranks were assigned wrongly**. If the rank sums you compute do not add back up to this
value, something went wrong in the course of assigning the ranks.

### The Wilcoxon signed-rank test: paired designs and one sample

**Wilcoxon's signed-rank test** (also called the signed rank sum test, or Wilcoxon's paired method) was
proposed by Wilcoxon in 1945. It is used to infer **whether the population median of the differences in a
paired design is 0**, and also to infer **whether the median of the population the sample comes from
equals the median of some known population**.

**Basic idea**: if the two treatments have the same effect, the difference in each pair should
theoretically be 0; because of error, the differences should be scattered roughly evenly on the two sides
of 0, the sum of the positive ranks $T_+$ and the sum of the negative ranks $T_-$ should be fairly close,
and both should be near the average rank sum $\dfrac{n(n+1)}{4}$. If $T_+$ and $T_-$ differ wildly, there
is reason to suspect that $H_0$ does not hold.

**Testing steps** (with a paired design as the example):

1. **State the hypotheses and fix the significance level**

   $H_0$: the population median of the differences equals zero, that is $M_d = 0$

   $H_1$: the population median of the differences does not equal zero, that is $M_d \neq 0$

   $\alpha = 0.05$

2. **Find the differences** $d_i$ (paired design: subtract the two observations in each pair; one sample:
   subtract the known population median $M_0$ from each observation)

3. **Assign ranks**: rank the **absolute values** of the differences from smallest to largest, then give
   each rank the sign of the original difference.

   - If a difference is exactly 0, **discard it and do not count it**, and reduce the number of effective
     pairs $n$ by 1 accordingly;
   - When the absolute values of the differences are equal, take the average rank.

4. **Find the rank sums and settle on the test statistic**: compute $T_+$ and $T_-$ separately; the two
   should add up to $n(n+1)/2$ ($n$ being the number of pairs whose difference is not 0). **Take
   whichever of $T_+$ and $T_-$ is the smaller as the test statistic $T$**.

5. **Determine the $P$ value and draw the conclusion**:

   - **The table method** (small samples): when $5 \le n \le 50$, look in the table of critical values of
     $T$ for the signed rank test of paired comparisons. The rule is "**larger inside, smaller outside;
     equal on the critical value**" — if the value of $T$ falls **inside** a pair of upper and lower
     critical values, the $P$ value is **greater than** the probability level corresponding to those
     critical values; if $T$ exactly equals a critical value, $P$ is approximately equal to the
     corresponding probability level; if $T$ falls **outside** the range of critical values, the $P$
     value is **less than** the corresponding probability level, and you should then move one column to
     the right and carry on comparing until the $P$ value is estimated fairly accurately.
   - **The normal approximation** (large samples): when $n > 50$ the range of the table of critical values
     of $T$ has been exceeded. When $H_0$ holds, the distribution of $T$ is approximately normal with
     mean $\dfrac{n(n+1)}{4}$ and variance $\dfrac{n(n+1)(2n+1)}{24}$, so the $z$ test can be used:

     $$z = \frac{\left| T - n(n+1)/4 \right| - 0.5}{\sqrt{\dfrac{n(n+1)(2n+1)}{24}}}$$

     The 0.5 here is the **continuity correction**, because the values $T$ takes are not continuous while
     $z$ is. When $n$ is not very large this correction must be made.

   - **When there are many tied ranks** (more than 25%), the $z$ value obtained from the formula above is
     too small and must be corrected as $z_C = z / \sqrt{C}$, where the correction coefficient is

     $$C = 1 - \frac{\sum (t_j^3 - t_j)}{n^3 - n}$$

     $t_j$ is the number of observations sharing the $j$-th tied rank. Suppose, among the tied ranks
     (average ranks), there are 2 5s, 3 7s, and 5 10s; then
     $\sum(t_j^3 - t_j) = (2^3-2)+(3^3-3)+(5^3-5) = 6+24+120 = 150$; if there are no tied ranks then
     $\sum(t_j^3 - t_j) = 0$ and $C = 1$, so no correction is needed.

   Note: the table of critical values of $T$ shows that **when $n \le 5$ the paired signed-rank test
   cannot produce a two-sided statistically significant probability**, so $n$ must be greater than or
   equal to 6.

**The one-sample Wilcoxon signed-rank test** works on the same principle; the only difference is that
each difference is **the difference between a measured value in the sample and the known population
median $M_0$**. The hypotheses are written $H_0$: the median of the population the sample comes from is
$M = M_0$; $H_1$: $M \neq M_0$ (or one-sided, according to subject-matter knowledge).

### The Wilcoxon rank-sum test: two independent samples (Mann–Whitney U)

The **Wilcoxon rank-sum test** (also called the rank-sum test for comparing two samples in a grouped
design, and equivalent to the Mann–Whitney $U$ test) is used to compare two samples from a **completely
random (grouped) design**, with the aim of inferring **whether the distributions of the two populations
the independent samples come from are located differently**. It is aimed at two groups of quantitative
data that are skewed or have unequal variances and so do not meet the conditions of the $t$ test; it is
also used for two groups of ordinal data, other data that cannot be measured precisely, and two groups of
data whose distribution type is unknown.

**Basic idea**: suppose $H_0$ holds, that is the two samples come from the same population; **rank the two
samples together in one pool from smallest to largest**, then compute the two rank sums $T_1$ and $T_2$.
Take **the rank sum of the group with the smaller sample size** as the test statistic $T$; $T$ should then
not differ much from $n_1(N+1)/2$ ($N = n_1 + n_2$). If $T$ differs from it too much, there is reason to
doubt that $H_0$ holds, and hence to reject it.

**Testing steps**:

1. **State the hypotheses and fix the significance level**

   $H_0$: the two populations have the same location

   $H_1$: the two populations have different locations

   $\alpha = 0.05$

2. **Assign ranks**: **rank the two groups together from smallest to largest**, taking the average rank
   when values are equal.

3. **Find the rank sums**: add the ranks of the two groups separately to get $T_1$ and $T_2$. The check
   formula is:

   $$T_1 + T_2 = \frac{N(N+1)}{2}$$

4. **Settle on the test statistic $T$**: if the two samples are of **equal** size, either rank sum will
   do; if the sample sizes are **unequal**, take **the rank sum of the group with the smaller sample
   size**.

5. **Determine the $P$ value and draw the conclusion**:

   - **The table method**: when $n_1 \le 10$ and $n_2 - n_1 \le 10$, look in the table of critical values
     of $T$ for the rank-sum test comparing two samples, and read $P$ with the same "larger inside,
     smaller outside" rule as for the signed-rank test.
   - **The normal approximation**: if $n_1 > 10$ or $n_2 - n_1 > 10$, the range of the appendix table has
     been exceeded, and the distribution of $T_1$ is already close to normal with mean $n_1(N+1)/2$ and
     variance $n_1 n_2 (N+1)/12$; the $z$ test is used:

     $$z = \frac{\left| T - n_1(N+1)/2 \right| - 0.5}{\sqrt{\dfrac{n_1 n_2 (N+1)}{12}}}$$

     When there are many tied ranks (more than 25%), correct in the same way with $z_C = z/\sqrt{C}$.

   **Frequency table data** (ordinal data) are compared between two samples along exactly the same path;
   only the way the ranks are assigned differs: first work out the **total frequency of each grade**, from
   which the **rank range of each grade** is determined, and then the **average rank of each grade**; then
   multiply **the frequency of each group in each grade by the average rank of that grade** and add up to
   get each group's rank sum. Because the frequency in each grade is exactly the number of observations
   sharing that tied rank, ordinal data always contain a great many tied ranks, so **the corrected $z_C$
   will almost certainly have to be used**.

**The relation to the Mann–Whitney $U$**: many textbooks say "software does not always report the same
statistic — R reports $W$ (the rank sum of the first group), SPSS reports $U$" — that claim needs
unpacking. The $W$ printed by R's `wilcox.test()` **is the $U$ statistic**, and is not the rank sum of the
first group:

$$U = W = T_1 - \frac{n_1 (n_1 + 1)}{2}$$

Here $T_1$ is what is really the **rank sum** of the group of size $n_1$. For example, comparing `ctrl`
($n_1 = 10$) with `trt2` in `PlantGrowth`, the rank sum of the `ctrl` group is $T_1 = 80$, yet R prints
$W = 25$, which is exactly $80 - \frac{10 \times 11}{2}$. **So R and SPSS are in fact reporting the same
number** (both calling it $U$), and the $P$ values are of course identical too; the convention $W = 80$
only appears when some book defines $W$ as "the rank sum" — the same name with a different meaning, and
when you see two numbers differing by $n_1(n_1+1)/2$ you know that is why.

### The Kruskal–Wallis $H$ test: several independent samples

The **Kruskal–Wallis rank-sum test** was extended by Kruskal and Wallis from the Wilcoxon rank-sum test
and is also called the **K–W test** or the **$H$ test**. Its aim is to infer **whether the several
populations that several independent samples of quantitative or ordinal data come from differ in their
distributions**. It applies to comparisons among several groups of quantitative data that do not meet the
conditions for analysis of variance (not normally distributed, or unequal variances), several groups of
ordinal data, other data that cannot be measured precisely, or several groups of data whose distribution
type is unknown.

**The principle of assigning ranks is the same as for the rank-sum test**: **rank several groups together
in one pool**, compute the rank sums by group, and take the average rank when values are equal.

**Testing steps**:

1. **State the hypotheses and fix the significance level**

   $H_0$: all the populations have the same distribution

   $H_1$: the distributions of the populations differ, or are **not all the same**

   $\alpha = 0.05$

2. **Assign ranks and find the rank sums**: rank all the groups together, and add the ranks of each group
   separately to get $R_i$.

3. **Compute the test statistic $H$**:

   $$H = \frac{12}{N(N+1)} \sum_{i=1}^{k} \frac{R_i^2}{n_i} - 3(N+1)$$

   where $n_i$ is the sample size of each group, $N = n_1 + n_2 + \cdots + n_k$ is the total sample size,
   and $R_i$ is the rank sum of each group.

4. **Determine the $P$ value and draw the conclusion**:

   - **The table method**: when the number of groups is $k = 3$ and **each group has $n_i \le 5$**, look
     in the table of critical values of $H$ (for the rank-sum test comparing three samples). Compare $H$
     with the critical value: **if $H$ is smaller than the critical value, its $P$ value is greater than
     the corresponding probability level**; if $H$ exactly equals the critical value, $P$ is
     approximately equal to the corresponding probability level; if $H$ is greater than the critical
     value, $P$ is less than the corresponding probability level.
   - **The $\chi^2$ approximation**: if the number of groups $k$ or the group sizes $n_i$ fall outside the
     range of the table of critical values of $H$ — that is, when $k=3$ but the smallest sample size is
     greater than 5, or when the number of groups $k>3$ — then under $H_0$ the statistic $H$ (or $H_C$)
     approximately follows a $\chi^2$ distribution with $\nu = k - 1$ degrees of freedom, and the $P$
     value is obtained from the table of $\chi^2$ critical values.
   - **When there are many tied ranks**, the $H$ obtained from the formula above is too small and must be
     corrected:

     $$H_C = \frac{H}{C}, \qquad C = 1 - \frac{\sum (t_j^3 - t_j)}{N^3 - N}$$

     Note that $C < 1$, so $H_C > H$, and the corrected $P$ value is smaller. When there are few tied
     ranks no correction is needed; but in general **the $H$ test on ordinal data always has to use
     $H_C$**.

**The relation between two samples and several samples**: when comparing two independent samples with
$n_1$, $n_2$ fairly large (frequency table data or ordinal data, for instance), you may use either the
two-sample $z$ test above or the $H$ test of this section; the two are equivalent:

$$H = z^2, \qquad H_C = z_C^2$$

### Multiple comparisons among several samples

Whether it is the Kruskal–Wallis $H$ test or the Friedman $M$ test, when the conclusion is to reject
$H_0$ it only says that **the populations differ, or are not all the same**; it does **not** follow that
any two populations differ. To answer "which two groups really differ", **pairwise comparisons between the
groups** must be carried out.

**Why the significance level has to be adjusted first**: making many pairwise comparisons among $k$ groups
gives each comparison a chance of committing a Type I error, and once the number of comparisons grows,
**the overall Type I error probability is inflated**. To keep the overall Type I error probability no
greater than $\alpha$, each comparison should use the adjusted level $\alpha'$:

$$\alpha' = \frac{\alpha}{\text{total number of comparisons}}$$

Two common situations:

- **Pairwise comparison among several groups** (every pair of groups compared): the number of comparisons
  is $\dfrac{k(k-1)}{2}$, so

  $$\alpha' = \frac{2\alpha}{k(k-1)}$$

- **Comparing the experimental groups with one and the same control group** (one designated control group
  compared with each of the others): the number of comparisons is $k-1$, so

  $$\alpha' = \frac{\alpha}{k-1}$$

**The statistic for a pairwise comparison**:

- **The exact method**: when the sample size is fairly small, obtain the value of the statistic by the
  method of the two-sample rank-sum test, then let the software's exact facility compute the corresponding
  $P$ value (the probability of that value together with the probability of more extreme cases);
- **The normal approximation**: when the groups have fairly large sample sizes,

  $$z_{ij} = \frac{\bar{R}_i - \bar{R}_j}{\sqrt{\dfrac{N(N+1)}{12}\left( \dfrac{1}{n_i} + \dfrac{1}{n_j} \right)}}$$

  where $\bar{R}_i$, $\bar{R}_j$ are the **mean rank sums** of groups $i$ and $j$, and $N$ is the total
  sample size. When there are many tied ranks (more than 25%), use the corrected value
  $z_{ij}/\sqrt{C}$.

The criterion: **compare the $P$ value of a given pair with the adjusted significance level $\alpha'$; if
$P < \alpha'$, reject $H_0$.**

**Pairwise comparisons among several samples in a randomized block design** follow the same idea: after
rejecting $H_0$, adjust the significance level in the same way, and then **run a paired Wilcoxon
signed-rank test on each pair** (because in a block design the groups are correlated). Here

$$z_{ij} = \frac{\bar{R}_i - \bar{R}_j}{\sqrt{\dfrac{k(k+1)}{6b}}}$$

where $k$ is the number of treatment groups and $b$ the number of blocks.

### Spearman's rank correlation: a pointer to Chapter 12

**Rank correlation** is a nonparametric statistical method, suitable for **data that do not follow a
bivariate normal distribution**, **data whose population distribution type is unknown**, and **ordinal
data**. The most commonly used form is **Spearman's rank correlation**, which uses the rank correlation
coefficient $r_s$ to describe how close the relationship between two variables is and in which direction
it runs:

$$-1 \le r_s \le 1$$

$r_s > 0$ is a positive correlation, $r_s < 0$ a negative correlation, and the closer $|r_s|$ is to 1 the
closer the relationship. The way to compute it is to **rank $x$ and $y$ separately and take the difference
$d$ of each pair of ranks**, and then

$$r_s = 1 - \frac{6 \sum d^2}{n(n^2-1)}$$

When there are many tied ranks in $x$ or in $y$ a correction is needed, the correction term being $T_x$
(or $T_y$) $= \dfrac{\sum (t^3 - t)}{12}$, where $t$ is the number of tied ranks.

Hypothesis testing for $r_s$: **for $n \le 50$ use the table method, for $n > 50$ the $z$ test**. What it
shares with the rest of this chapter is obvious at a glance — **the whole chain of computation is built
on ranks** — which is why it belongs to the same family.

**Why just "a pointer to Chapter 12"**: the rank-sum tests of this chapter answer "do the distributions of two
or more groups differ", whereas $r_s$ answers "do two variables have a monotone association, and how
strong is it". These are two different research questions, and the full treatment (including the analysis
of association in contingency tables and the conditions of use for correlation analysis) is in Chapter 12,
Bivariate Association. All you need to remember here is that **$r_s$ is a rank method**.

::: tip By the way: randomized block designs use the Friedman $M$ test
Corresponding to two independent samples and to several independent samples is the rank-sum test for a
**randomized block (matched groups) design** — the **Friedman $M$ test**, used to infer whether the
populations that several **related** samples come from differ in distribution.

Its way of assigning ranks is different: if the aim is to compare the **treatment groups** with one
another, rank the observations **within each block** from smallest to largest (ranks $1,2,\dots,k$ within
a block); if the aim is to compare the **blocks** with one another, rank the observations **within each
treatment group** from smallest to largest. Then compute the rank sum of each treatment group $R_i$, the
mean rank sum $\bar{R} = \dfrac{b(k+1)}{2}$ ($b$ being the number of blocks), and

$$M = \sum (R_i - \bar{R})^2$$

When $H_0$ holds, the within-block ranks $1,2,\dots,k$ should appear in the treatment columns with equal
probability. When $b \le 15$ and $k \le 15$, look in the table of critical values of $M$; outside that
range use the $\chi^2$ approximation with $\nu = k-1$. It is "the third branch of the rank methods in this
same textbook", and its idea is entirely continuous with the $H$ test.
:::

## Doing it in R

Every method in this chapter has a ready-made function in R, and everything below uses data sets that
ship with R, so you can copy it and run it straight away. **The output in the code comments is there for
you to check your answers against — run it yourself and compare** — which group the statistic refers to,
whether R used the exact test or the normal approximation, and what the $P$ value actually is: you only
know the method once you have looked at them with your own eyes.

### Two independent samples: the Wilcoxon rank-sum test

`PlantGrowth` records the dry weight of plants under three treatments; `weight` is the numeric variable
and `group` the grouping factor. We look at the `ctrl` (control) and `trt2` (treatment 2) groups.

```r
# Two independent samples: the Wilcoxon rank-sum test (equivalent to the Mann-Whitney U test)
d <- subset(PlantGrowth, group %in% c("ctrl", "trt2"))
d$group <- droplevels(d$group)          # drop the unused level, otherwise table would still keep trt1
table(d$group)                          # ctrl 10 plants, trt2 10 plants

wilcox.test(weight ~ group, data = d)   # default alternative = "two.sided"
# W = 25, p-value = 0.06301
```

How to read the output:

- `W = 25` **is the Mann–Whitney $U$ statistic itself**, not the rank sum of the `ctrl` group. After the
  two groups are ranked together, the `ctrl` group's rank sum is in fact 80, and the $W$ R reports equals
  that minus a constant: $U = W = T_1 - \dfrac{n_1(n_1+1)}{2}$, where $n_1$ is the sample size of
  whichever group comes first in the formula (the `ctrl` group's rank sum $T_1 = 80$). Here
  $n_1 = n_2 = 10$, so $U = 80 - \dfrac{10 \times 11}{2} = 80 - 55 = 25$. **SPSS also reports $U = 25$;
  the two are reporting the same number to begin with**, and the $P$ values are of course identical — so
  do not agonize over the statistic, just read the `p-value`;
- `p-value = 0.06301 > 0.05`, so at the $\alpha=0.05$ level $H_0$ is not rejected, and we cannot yet say
  that the dry-weight distributions of `ctrl` and `trt2` are located differently;
- **The default is two-sided.** If subject-matter knowledge gives a direction (for instance "the treated
  group must be heavier than the control"), specify it explicitly: `alternative = "greater"` or `"less"`.
  Choose the wrong one of one-sided and two-sided and the $P$ value is out by a factor of two.

For the same data, compare with a grouped $t$ test (R applies the Welch correction by default, so
homogeneity of variance is not required):

```r
t.test(weight ~ group, data = d)
# t = -2.134, df = 16.786, p-value = 0.0479
```

**Same data, same $\alpha=0.05$: the $t$ test says "there is a difference" ($P=0.048$), the rank-sum test
says "we cannot yet say there is a difference" ($P=0.063$).** This is what "loss of power" looks like at
its most direct — the rank transformation throws away the information about distances between values, and
when the $P$ value is already sitting at the edge of 0.05, the rank-sum test may fail to catch a
difference that the $t$ test just barely catches. Look at the other side of it too: if you do not first
confirm normality and homogeneity of variance, that $P=0.048$ has no guarantee behind it — it is a single
step away from 0.05. **Both give valid answers, provided you chose the right test.**

::: warning Ties and the "cannot compute exact p-value with ties" warning
Many textbooks say that when **equal values** (a tie) appear in the data, R gives

```text
Warning message:
In wilcox.test.default(...) :
  cannot compute exact p-value with ties
```

meaning "the exact distribution assumes there are no equal values, so we have to fall back on the normal
approximation". **But in R 4.6.1 (the version all the output on this page comes from) `wilcox.test()` no
longer gives that warning**: its exact $P$ value can now handle data with ties directly, and even
effective pairs with a difference of exactly 0, and the first line of the output still reads
`Wilcoxon rank sum exact test` / `Wilcoxon signed rank exact test`. The data below contain a tie, yet not
a single warning appears:

```r
x <- c(1, 2, 2, 3, 5, 6)    # there are duplicate values (2 appears twice)
y <- c(4, 5, 6, 7, 8, 9)
wilcox.test(x, y)
# Wilcoxon rank sum exact test
# W = 4, p-value = 0.02381        ← the tie is still there, the warning is gone
```

**The warning itself has not disappeared, it has only moved**: `cor.test(..., method = "spearman")` still
warns `cannot compute exact p-value with ties` and falls back on the normal approximation when $x$ and $y$
contain ties — compute the Spearman correlation of sepal length with petal length on `iris` and you will
see it. So "being able to read this warning" still matters. Three things to remember from this:

1. **First judge how heavy the ties are.** With few ties (under 25%) the error of the normal approximation
   can be ignored: **carry on and report the result**. The "correct only when tied ranks exceed 25%" of
   this chapter is exactly that boundary ($z_C$, $H_C$).
2. When the ties are numerous and an exact $P$ value has to be reported, use a package such as
   `coin::wilcox_test()` or `exactRankTests::wilcox.exact()` to do the exact test;
3. **Do not change the data just to make the warning go away, or indeed to get rid of the ties.** Adding a
   tiny random number splits the duplicate values apart and looks clean, but the conclusion is fake.

**How do you know which one R used?** Look at the method name in the first line of the output: `exact
test` means the exact test, `with continuity correction` means the normal approximation (with continuity
correction); you can also specify it explicitly with `exact = TRUE` / `exact = FALSE`.
:::

### Paired samples: the Wilcoxon signed-rank test

`sleep` records the extra sleep of 10 subjects under two hypnotic drugs; `extra` is the number of extra
hours, `group` is the drug (1 or 2), and `ID` is the subject number (1 to 10). Each subject was measured
twice, so this is a **paired design**.

```r
# First see the structure: 20 rows in all (10 subjects x 2 drugs); group and ID are factors, not numbers
str(sleep)
# 'data.frame':	20 obs. of  3 variables:
#  $ extra: num  0.7 -1.6 -0.2 -1.2 -0.1 3.4 3.7 0.8 0 2 ...
#  $ group: Factor w/ 2 levels "1","2": 1 1 1 1 1 1 1 1 1 1 ...
#  $ ID   : Factor w/ 10 levels "1","2","3","4",..: 1 2 3 4 5 6 7 8 9 10 ...

x <- sleep$extra[sleep$group == 1]      # drug 1
y <- sleep$extra[sleep$group == 2]      # drug 2
x; y                                    # the two vectors correspond one to one, same subjects

# The Wilcoxon signed-rank test for a paired design -- the key argument is paired = TRUE
wilcox.test(x, y, paired = TRUE)
# V = 0, p-value = 0.003906

# Formula style: confirm the order of the levels of the grouping variable first, do not let R guess
sleep$grp <- factor(sleep$group)        # group is already a factor; this just writes the level order out
wilcox.test(extra ~ grp, data = sleep)  # ⚠️ this is the "two independent samples" style
```

::: warning A paired test cannot be written in formula style
Paired data **must be written as two vectors**, `wilcox.test(x, y, paired = TRUE)`.

The formula style `wilcox.test(extra ~ grp, data = sleep, paired = TRUE)` errors out immediately:

```text
Error in wilcox.test.formula(extra ~ grp, data = sleep, paired = TRUE) :
  cannot use 'paired' in formula method
```

The reason is that the formula form is interpreted only as "two independent samples": what it sees is
"one numeric column plus one grouping column", and it has no idea which two observations form a pair.
Pairing information exists only in the form "two equal-length vectors corresponding one to one", so a
paired test always has to pull the two groups of data out into two vectors first (the `x` and `y` above).
:::

How to read the output:

- `V = 0` is this chapter's $T_+$ (the sum of the ranks of the positive differences). Of the 10
  differences 9 are negative and 1 is exactly 0 (subject 5); by the rules of this chapter **the pair
  whose difference is 0 is discarded**, so the number of effective pairs is $n = 9$; all 9 differences
  are negative, hence $T_+ = 0$ and $T_- = 45$, and $T_+ + T_- = 45 = \dfrac{9 \times 10}{2}$ comes out
  exactly right; this chapter takes the smaller of $T_+$ and $T_-$ as the statistic $T$, so here $T = 0$;
- `p-value = 0.003906`: $P<0.01$, so the difference in extra sleep between the two drugs is statistically
  significant. With $n = 9$ the two-sided exact $P$ value corresponding to $T = 0$ is $2/2^9 = 0.003906$;
  note that among the 9 differences $|-1.3|$ occurs twice (subjects 3 and 4), and by the rules the tied
  ranks take the average rank $4.5$, so $T_- = 1+2+3+4.5+4.5+6+7+8+9 = 45$;
- **The grouping variable is a factor, so check the order of the levels first.** `str()` shows at a glance
  that `sleep$group` is already a factor whose levels are the strings `"1"` and `"2"` — the 1 and 2 here
  are just labels and do not mean larger or smaller. When the formula style
  `wilcox.test(extra ~ grp, data = sleep)` is used, **R treats the first level (`"1"`) as the $x$ group**
  and $W$ is computed from that group: here `W = 25.5`; reverse the level order
  (`factor(sleep$group, levels = c("2", "1"))`) and the same data with the same $P$ value give
  `W = 74.5`. So with grouped data look at `levels()` first, and when necessary pin the order down with
  `factor(x, levels = c(...))` instead of letting R guess.

**Compare with the paired $t$ test**:

```r
t.test(x, y, paired = TRUE)             # p-value = 0.002833
```

Here the $P$ value of the $t$ test (0.0028) is in fact **slightly smaller** than that of the signed-rank
test (0.0039). The reason is not hard to find: the differences include a large one such as $-4.6$ hours,
and the $t$ test uses all the information in the magnitudes, so it is more sensitive to this pattern of
"most pairs pointing the same way, a few differences very large"; the signed-rank test looks only at the
order of magnitude, so even the largest difference is just one rank, information is lost, and the $P$
value comes out slightly larger. **With the same data, both $P$ values are "valid"** — as long as the
conditions of the test you chose do hold. This also shows that "nonparametric is bound to be more
conservative" is too crude an impression: which one comes out larger depends on the data.

### One sample: comparison with a known population median

Suppose the median of some measurement in a healthy population in a certain area is known to be 11.5
(units μg/g), and a random sample of 10 patients of some kind gives a set of values; we want to decide
whether the median in the patient population is **lower than** 11.5.

```r
x <- c(6.13, 6.35, 7.24, 7.35, 9.31, 10.75, 11.25, 11.35, 11.61, 11.72)

# One-sample Wilcoxon signed-rank test: equivalent to subtracting mu from every observation and seeing whether the median of the differences is 0
wilcox.test(x, mu = 11.5, alternative = "less")
```

How to read the output:

- `mu = 11.5` is the **known population median** $M_0$, not the sample mean;
- `alternative = "less"` corresponds to $H_1: M < 11.5$ (the patients lower than the healthy population).
  **The direction must come from subject-matter knowledge and must not be decided after looking at the
  data**, otherwise the $P$ value is meaningless;
- If you also want an interval estimate of the median, add `conf.int = TRUE`.

### Several independent samples: the Kruskal–Wallis $H$ test

```r
# PlantGrowth has three treatments: ctrl, trt1, trt2
kruskal.test(weight ~ group, data = PlantGrowth)
# Kruskal-Wallis rank sum test
# data:  weight by group
# Kruskal-Wallis chi-squared = 7.9882, df = 2, p-value = 0.01842

H <- kruskal.test(weight ~ group, data = PlantGrowth)$statistic
n <- nrow(PlantGrowth)
H * (n + 1) / (n^2 - 1)                 # effect size epsilon^2 = 0.2754562
```

How to read the output:

- `Kruskal-Wallis chi-squared = 7.9882` is **the test statistic $H$ itself**; R merely reads its $P$ value
  off a $\chi^2$ distribution — corresponding to the "$\chi^2$ approximation" of this chapter. **It does
  not mean that you ran a chi-square test**;
- `df = 2` is $\nu = k - 1 = 3 - 1$;
- `p-value = 0.01842 < 0.05`, so **$H_0$ is rejected**, and the dry-weight distributions of the three
  treatments may be considered **not all the same** — note that this is only "not all the same", which
  does not mean that every pair of groups differs. It is interesting to set this $P$ value beside the two
  results above: in the same data set, comparing `ctrl` with `trt2` alone gives $P=0.06301$ (not
  significant at $\alpha=0.05$), while comparing the three groups together gives $P=0.01842$
  (significant). The two are not in conflict — the $H$ test compares **the three groups as a whole**, and
  between `ctrl` and `trt2` there really is not yet enough evidence of a difference; the difference lies
  mainly between `trt1` and `trt2` (pairwise comparison, $P=0.027$ after holm adjustment). So **you
  cannot overturn the overall conclusion just because one pair is not significant, nor can you say that
  every pair differs just because the overall test is significant**: which two groups differ has to be
  settled by pairwise comparisons; and conversely, picking out the pair with the smallest $P$ from three
  groups, reporting it on its own and skipping the correction drops you straight into the
  multiple-comparison pit — which is exactly the problem the next section solves.
- The effect size: for the $H$ test, $\varepsilon^2 = \dfrac{H(n+1)}{n^2-1}$, here about 0.2755. The $P$
  value answers "is there a difference", the effect size answers "how large the difference is" — report
  both, and the reader knows how much weight the difference carries in practice.

### Multiple comparisons among several samples

The $H$ test is only the "main gate". After rejecting $H_0$, to answer "which two groups differ" use
`pairwise.wilcox.test()`, which **carries out automatically the adjustment of the significance level
described in this chapter**:

```r
# Use the iris data, where the differences are clearer: sepal length of three iris species
kruskal.test(Sepal.Length ~ Species, data = iris)
# Kruskal-Wallis chi-squared = 96.937, df = 2, p-value < 2.2e-16

# Pairwise comparisons + p value adjustment (default p.adjust.method = "holm")
pairwise.wilcox.test(iris$Sepal.Length, iris$Species, p.adjust.method = "holm")
#                  setosa  versicolor
# versicolor       1.7e-13         -
# virginica        < 2e-16     5.9e-07
```

How to read the output:

- What is printed is a **lower triangular matrix**, the $P$ value of the comparison between the two groups
  sitting where the row name and the column name meet;
- The default `holm` is one of the methods for controlling the overall Type I error probability and is
  **gentler than the $\alpha' = 2\alpha/[k(k-1)]$ of this chapter (that is Bonferroni, equivalent to
  `p.adjust.method = "bonferroni"`), but in the same direction**: both push back the false positives
  created by "comparing many times";
- If you do not adjust (`p.adjust.method = "none"`), the smallest $P$ value becomes smaller
  ($8.3 \times 10^{-14}$, against $1.7 \times 10^{-13}$ after adjustment) and the conclusion looks
  "prettier" — that is walking into the pit, not a discovery;
- **You can also verify it by hand**: with $k=3$ groups compared in all pairs, the number of comparisons
  is $\frac{3 \times 2}{2}=3$, and this chapter's adjusted level is $\alpha' = \frac{0.05}{3} = 0.017$;
  for "each experimental group against one and the same control group" the number of comparisons is
  $k-1$ and $\alpha' = \frac{0.05}{2} = 0.025$.

### Spearman's rank correlation

The sepal length and petal length in `iris` are both quantitative data measured on a continuous scale,
but **a monotone relationship is not necessarily linear** (the longer the sepal, the more the petal length
grows, perhaps not proportionally), so a rank correlation is safer than a Pearson correlation.

```r
# Rank correlation: does not require a bivariate normal distribution
cor(iris$Sepal.Length, iris$Petal.Length, method = "spearman")
# 0.8818981

cor.test(iris$Sepal.Length, iris$Petal.Length, method = "spearman")
# S = 66429, p-value < 2.2e-16
# alternative hypothesis: true rho is not equal to 0
# sample estimates: rho 0.8818981

# Compare with the Pearson correlation
cor(iris$Sepal.Length, iris$Petal.Length, method = "pearson")
# 0.8717538
```

How to read the output:

- `rho 0.8819` is $r_s$; $|r_s|$ close to 1 means the two variables have a strong **monotone** association,
  and the positive sign means they change in the same direction;
- `S = 66429` is the rank statistic and is **not** the numerator of $r_s$; reading `p-value` and `rho` is
  enough;
- Here $r_s$ (0.882) is slightly larger than Pearson's $r$ (0.872), which says the relationship between
  the two is **monotone but slightly curved**;
- `cor.test(..., method = "spearman")` uses the normal approximation for the $P$ value when $n$ is fairly
  large, in line with the "$z$ test for $n>50$" of this chapter.

### Look at the distribution before analyzing

The value of a rank-sum test is that it "does not look up a distribution", but **deciding which test to
use still starts with looking at the data**. Three lines of code give you the basis for the decision:

```r
# 1. Normality: Shapiro-Wilk test; a small P means departure from normality
tapply(PlantGrowth$weight, PlantGrowth$group, shapiro.test)
shapiro.test(residuals(aov(weight ~ group, data = PlantGrowth)))

# 2. Homogeneity of variance: Bartlett test (sensitive to normality)
bartlett.test(weight ~ group, data = PlantGrowth)

# 3. Look at the graph: a Q-Q plot says more about the seriousness of the problem than a P value
qqnorm(residuals(aov(weight ~ group, data = PlantGrowth)))
qqline(residuals(aov(weight ~ group, data = PlantGrowth)))
```

The order of judgment is: **look at the graph first, then use tests as a supplement**. A normality test is
too sensitive to sample size (with large $n$ even a tiny departure gets declared "not normal"), and with
too small a sample it has no power either — you cannot decide which test to use on the strength of a
single $P$ value.

## Common pitfalls

- **Running a grouped test on a paired design (or the other way round).** This is the most expensive
  mistake in this chapter. The same people measured before and after, the same specimen measured by two
  methods — that is a **paired** design and `paired = TRUE` must be written; writing it as two independent
  samples is not merely a matter of the $P$ value coming out too large or too small, it **throws the
  design information away entirely**, and the $P$ value obtained is meaningless. The diagnostic is simple:
  do the two groups of data **correspond one to one**, and must the sample sizes be equal.
- **Using a rank-sum test on unordered categorical data.** A rank-sum test requires that "order" be
  meaningful. For **unordered** categorical data such as blood group (A/B/O/AB) or sex, who comes first
  and who second is purely arbitrary, the ranks themselves are meaningless, and a chi-square-type test is
  what is wanted. The only "qualitative data" a rank-sum test can handle are **ordinal data** (ineffective
  < improved < markedly effective < cured), and the conclusion of a rank-sum test on such data speaks
  about a difference in the **average degree**, which is closer to the clinical question than the
  chi-square test's "is there a difference in the constituent proportions" — which is exactly why ordinal
  data often call for a rank-sum test rather than a chi-square test.
- **Not doing pairwise comparisons after comparing several groups, or not adjusting the level when you
  do.** Both levels are wrong: rejecting $H_0$ in the $H$ test only says "not all the same", so drawing
  the conclusion "group A is higher than group B" straight away is overreach; and running many pairwise
  comparisons without adjusting the significance level inflates the overall Type I error probability
  several times over. With $k=4$ and all pairwise comparisons the judgment should be made at
  $\alpha' = 2\alpha/[k(k-1)] = 0.0083$, not still at 0.05. Use `pairwise.wilcox.test()` and write
  `p.adjust.method` out clearly, and state in the report which adjustment was used.
- **Taking the output of a rank-sum test as an estimate of the difference in medians.** `wilcox.test()`
  gives $W$/$V$ and a $P$ value; **by default it does not give you "by how much the two medians differ"**,
  nor the medians themselves. Many papers write "the rank-sum test showed that the two groups had medians
  $a$ and $b$, a statistically significant difference" — the medians are something you computed
  separately and have nothing to do with the test, and two groups with equal medians can still give
  $P<0.05$ (when the shapes of the distributions differ). If you want an interval estimate, add
  `conf.int = TRUE`, which gives a confidence interval for the **location shift (the median difference)** —
  that is the estimator that goes with the test.
- **Assuming the software will keep an eye on "ties" for you.** This chapter says "correct when tied ranks
  exceed 25%", but **R 4.6.1's `wilcox.test()` gives no warning when there are ties** (it computes the
  exact $P$ value directly), so you will never be reminded: whether there are many ties and whether the
  25% boundary calls for a correction is for you to count. By contrast,
  `cor.test(..., method = "spearman")` still warns `cannot compute exact p-value with ties` when it meets
  ties, while `coin::wilcox_test()` and `exactRankTests::wilcox.exact()` are the exact-test options when
  ties are numerous. Note also that when $n \le 5$ the smallest possible two-sided $P$ value of the paired
  signed-rank test is $2/2^5 = 0.0625$, so **a two-sided statistically significant conclusion cannot be
  reached** (R neither errors nor warns about this, it simply returns a $P$ value greater than 0.05) —
  **too small a sample is not something a nonparametric test can rescue**.

## How it connects to the other courses

::: tip Related pages
- **[Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing](/en/intro-it/13-hypothesis-testing)** — this chapter is its **backup plan for when the conditions are not met**. That lecture implements the $t$ test and the $z$ test in R, on the premise that the population is normal with equal variances; this chapter keeps the same three-step routine (state the hypotheses → compute a statistic → determine the $P$ value and draw the conclusion) and changes only the "compute a statistic" step from **using the raw values** to **using ranks**. The trade-off is written in the comparison table on this page: when the conditions hold, use that lecture's methods (higher power); when they do not, use this chapter's (wide applicability, at the price of about 5% less power). **The two lectures together make one complete procedure for choosing a test.**
- **[Lecture 14 of *Introduction to Information Technology*, Tests of Homogeneity and Contingency Tables](/en/intro-it/14-goodness-of-fit-and-contingency)** — the chi-square test, the K–S test, and `fisher.test()` of that lecture deal with questions of "distribution shape / category composition", while the rank-sum tests of this chapter deal with questions of "distribution location / average degree". **The same ordinal data give different conclusions on the two sides**: an $R\times C$ chi-square test can only say whether the composition of the grades differs, whereas a rank-sum test can say whether the average level of therapeutic effect differs. There is a real example in the material — the same ordinal data give "no difference" under a grouped $t$ test or a chi-square test, and $P<0.01$, "there is a difference", under a rank-sum test, exactly opposite conclusions. **With ordinal data, ask yourself first whether the question is about "composition" or about "degree".** Also, the `ks.test()` of that lecture is a nonparametric method, belonging with this chapter to the family that "makes no strong assumption about the shape of the distribution"; it merely tests whether the whole distribution is the same rather than a shift in location.
- **[Week 3 of *Medical Big Data Analysis and Decision Making*, Regression Analysis](/en/Medical-Big-Data-Analysis/3-regression)** — that week's treatment of nonlinear regression uses **least squares**, with the smallest residual sum of squares as the criterion. Least squares is **extremely sensitive to extreme values**: one outlier can drag a coefficient away. The rank methods of this chapter share its spirit — **both give up the dependence on "the actual values" and keep only "which is larger than which"** — and are therefore robust to skewness and extreme values. Once you understand why rank methods are robust, looking back at that week's regression diagnostics (whether the residuals are normal, whether they have equal variance) shows you what those diagnostic plots are guarding against: exactly the hijacking of "least squares" by a few points.
- **[Week 6 of *Medical Big Data Analysis and Decision Making*, Classification (Part 2)](/en/Medical-Big-Data-Analysis/6-classification-2)** — that week draws ROC curves and computes the AUC to evaluate a classifier. The AUC has an equivalent interpretation: **take one positive case and one negative case at random; the probability that the positive one scores higher than the negative one** — which is essentially a **rank-based statistic** (equivalent to the Mann–Whitney $U$ statistic). So the Wilcoxon rank-sum test and the Mann–Whitney $U$ of this chapter and that week's AUC are **the same family of statistics**: the rank-sum test asks "do the score distributions of the two groups differ in location", and the AUC reads the same quantity as "the classifier's ability to separate positives from negatives". This also explains why the AUC is unchanged by a monotone transformation of the scores — because it uses only ranks.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/11-nonparametric once
translated; for now the Chinese page /Health-statistics/11-nonparametric) from:
- /intro-it/13-hypothesis-testing, at "summary of this lecture", adding a sentence: "for an alternative method (rank-sum tests) when the data do not meet the premises of normality and homogeneity of variance, see Health Statistics, Chapter 11".
- /intro-it/14-goodness-of-fit-and-contingency, where "ordinal data / contingency tables" are discussed, adding a sentence: "if the average level of ordinal data is to be compared (and not merely the composition), a rank-sum test should be used, see Health Statistics, Chapter 11".
- /Medical-Big-Data-Analysis/3-regression, where "least squares is sensitive to outliers / residual diagnostics" are discussed, adding a sentence: "for rank methods that are more robust to skewness and extreme values, see Health Statistics, Chapter 11".
- /Medical-Big-Data-Analysis/6-classification-2, where "the meaning of ROC and AUC" is discussed, adding a sentence: "the AUC is equivalent to the Mann-Whitney U statistic; for the principle of rank tests, see Health Statistics, Chapter 11".
-->

## Summary

1. **A nonparametric test does not depend on the population distribution type and makes no inference
   about population parameters**; it compares only the distributions, or the locations of the
   distributions, of populations, and is therefore also called a distribution-free test. It suits three
   kinds of data: quantitative data that do not meet the conditions of a parametric test, data that were
   never measured precisely (ordinal data, data containing inexact values), and data whose distribution
   type is unknown.
2. **It is not "a better test" but a set of trade-offs.** When the conditions of a parametric test hold,
   the parametric test is the first choice — switching to a nonparametric test lowers the power and
   raises the Type II error probability; when they do not hold, a nonparametric test is more suitable, and
   its power may in fact be higher. When the data really are normal, replacing the $t$ test with a
   rank-sum test costs only about 5% of the power; but forcing a $t$ test on data that do not meet the
   conditions can give a $P$ value that is completely wrong.
3. **The tool shared by all rank methods is the rank**: rank the values from smallest to largest, taking
   the average rank for equal values; $\sum R_i = n(n+1)/2$ is the check formula for everyone. For paired
   or one-sample data use the **Wilcoxon signed-rank test** (the ranks are assigned to the differences,
   and the smaller of $T_+$ and $T_-$ is the statistic), for two independent samples the **Wilcoxon
   rank-sum test** (the two samples are ranked together, the rank sum of the smaller group is taken, and
   it differs from the Mann–Whitney $U$ only by a constant), and for several independent samples the
   **Kruskal–Wallis $H$ test** ($H = \frac{12}{N(N+1)}\sum R_i^2/n_i - 3(N+1)$; for $k=3$ and
   $n_i \le 5$ use the table, otherwise the $\chi^2$ approximation with $\nu=k-1$).
4. **Rejecting $H_0$ in the $H$ test only says "different, or not all the same"**; to say clearly which two
   groups differ you must do pairwise comparisons, and **first adjust the significance level to
   $\alpha' = 2\alpha/[k(k-1)]$ (all pairs) or $\alpha' = \alpha/(k-1)$ (against one and the same control
   group)**, or the overall Type I error probability will be inflated.
5. **Tied ranks (ties) are the built-in nuisance of rank methods**: when they exceed 25% the statistic is
   too small and must be corrected with $C = 1 - \frac{\sum(t_j^3-t_j)}{N^3-N}$ ($z_C = z/\sqrt{C}$,
   $H_C = H/C$); **in R 4.6.1 `wilcox.test()` no longer warns when it meets ties and returns the exact $P$
   value as usual**, so "are there ties, and is a correction needed" is for you to judge, without waiting
   for the software to remind you — the `cannot compute exact p-value with ties` warning from
   `cor.test(..., method = "spearman")` is still there, and reading it is still useful.
6. **The correspondence in R**: two independent samples `wilcox.test(x, y)`, paired
   `wilcox.test(x, y, paired = TRUE)`, one sample against a known median `wilcox.test(x, mu = 11.5)`,
   several groups `kruskal.test(y ~ g, data = d)`, pairwise comparisons `pairwise.wilcox.test(...)`, rank
   correlation `cor.test(x, y, method = "spearman")`. **And do not forget to start with `shapiro.test()`,
   `bartlett.test()`, and a Q-Q plot to confirm which family of test you should be using at all.**
