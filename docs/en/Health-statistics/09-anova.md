---
layout: doc
title: '9. Analysis of Variance'
---

# Chapter 9. Analysis of Variance

::: info Translation status
Translated from the [Chinese original](/Health-statistics/09-anova). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> A two-sample $t$ test can compare only two means; this chapter widens the objects of comparison to
> three groups, four groups, or even more, and the method takes one sentence — split the total
> variation in the data by source, then use the ratio "between-group mean square ÷ within-group mean
> square" to judge whether the differences between groups have grown too large to be sampling error.

## What this chapter is for

The most typical scene in medical research is this: a batch of animals of the same species are
**randomly** assigned to three environments (say three workplaces with different dust concentrations),
and after being kept for a period one index is measured (the weight of some organ, some biochemical
index); or subjects are randomly assigned to three drug regimens and the therapeutic effects are
compared. The data in hand always have the shape "**one quantitative index + one variable indicating
group membership**", and the questions to answer are:

- Do the **population means** of these groups differ at all?
- If they do, **which groups** differ from which?

A $t$ test cannot handle this situation. It compares only two means at a time, so forcing it onto three
groups means splitting the job into 3 pairwise comparisons; four groups need 6, five groups need 10.
That has two problems: first, it quietly turns the research aim of "comparing several means together"
into "a pile of isolated two-by-two comparisons"; second, every extra comparison is one more chance to
make a **Type I error** (calling a difference that is not there) — and that error rate accumulates
quickly, as concrete numbers later in the chapter will show.

So a method is needed that can **compare all the groups at once**, and that is **analysis of variance**
(ANOVA). It was put forward in the 1920s by the British statistician R. A. Fisher, and it relies on the
$F$ statistic, which is why it is also called the **F test**.

<TrackList :tasks="['Explain clearly why the total variation can be split into between-group + within-group', 'Fill in a one-way ANOVA table independently', 'Explain why repeated t tests cannot be used for three or more groups', 'Choose the right pairwise comparison method for the study situation', 'Run the complete workflow with aov() and TukeyHSD()']" />

## Core concepts

### Where the variation comes from

Measurements on animals in the same group are never exactly alike, and the ups and downs within a
group come from **random error** — sampling error, measurement error, individual differences; as long
as individuals differ from one another, it cannot be avoided.

The ups and downs among the group **means**, on the other hand, may come from two causes:

1. pure random error: the groups actually come from the same population, and the samples drawn simply
   happened to differ;
2. the **study factor** really has an effect: different environments or different drugs really did
   produce different results.

What analysis of variance does is **separate these two sources**, and then see whether "the part
contributed by the study factor" is large enough relative to "random error".

### Splitting the three kinds of variation and their degrees of freedom

**(1) Total variation**: the differences between all the observed values $x_{ij}$ and the grand mean
$\bar{x}$.

$$SS_{\text{total}}=\sum_{i}\sum_{j}\left(x_{ij}-\bar{x}\right)^{2},\qquad \nu_{\text{total}}=N-1$$

$N=\sum_i n_i$ is the total number of cases, $i$ indicates the group and $j$ the index within the
group.

**(2) Variation between groups**: the differences between the group means $\bar{x}_i$ and the grand
mean $\bar{x}$. If the study factor really has an effect, this part contains both the action of the
treatment and random error; if the study factor has no effect, only random error is left in it.

$$SS_{\text{between}}=\sum_{i}n_i\left(\bar{x}_i-\bar{x}\right)^{2},\qquad \nu_{\text{between}}=k-1$$

$k$ is the number of treatment groups. Note that each group's mean has to be **multiplied by $n_i$**
before summing: a group with a larger sample size has a more reliable mean and should carry a larger
weight.

**(3) Variation within groups**: the differences between the observations in each group and that
group's mean. It reflects random error only, so it is also called **error variation**.

$$SS_{\text{within}}=\sum_{i}\sum_{j}\left(x_{ij}-\bar{x}_i\right)^{2},\qquad \nu_{\text{within}}=\sum_{i}\left(n_i-1\right)=N-k$$

Mathematical statistics can prove that these three kinds of variation and their degrees of freedom
satisfy a very tidy additive relation:

$$SS_{\text{total}}=SS_{\text{between}}+SS_{\text{within}},\qquad \nu_{\text{total}}=\nu_{\text{between}}+\nu_{\text{within}}$$

### Mean squares and the F statistic

The size of a sum of squared deviations from the mean is related to the degrees of freedom (more groups
and more cases naturally make $SS$ larger), so $SS$ from different sources cannot be compared in size
directly. The remedy is to divide each by its own degrees of freedom, giving the **mean square**
(MS) — which is in fact the variance $S^2$ met earlier, measuring the average size of the variation.

$$MS_{\text{between}}=\frac{SS_{\text{between}}}{\nu_{\text{between}}},\qquad MS_{\text{within}}=\frac{SS_{\text{within}}}{\nu_{\text{within}}}$$

Dividing one mean square by the other gives the statistic of analysis of variance, $F$:

$$F=\frac{MS_{\text{between}}}{MS_{\text{within}}}$$

Its logic of judgment is very intuitive:

| Situation | What $MS_{\text{between}}$ contains | How $F$ behaves |
| --- | --- | --- |
| $H_0$ holds (all population means equal, no treatment effect) | only random error | in theory $F=1$, and sampling error makes it fluctuate around 1 |
| $H_0$ does not hold (the treatment has an effect) | random error **+ treatment effect** | $MS_{\text{between}}$ is clearly larger than $MS_{\text{within}}$, so $F>1$ |

The test hypotheses are usually written as $H_0:\mu_1=\mu_2=\cdots=\mu_k$ (the population means are
equal) and $H_1$: the population means are unequal or **not all equal** (that is, at least two groups
differ), with $\alpha=0.05$.

How large does $F$ have to be before it counts as statistically significant? Look it up in a table of
**F critical values**: the column heading is the numerator degrees of freedom
$\nu_1=\nu_{\text{between}}$, the row heading is the denominator degrees of freedom
$\nu_2=\nu_{\text{within}}$, and what the table gives are **one-sided** critical values
$F_{\alpha}(\nu_1,\nu_2)$ (analysis of variance cares only about whether the between-group part is too
large, so only the upper tail is used). If $F\ge F_{\alpha}(\nu_1,\nu_2)$, then $P\le\alpha$ and $H_0$
is rejected.

In one sentence, the **basic idea of analysis of variance**: according to the design type of the data,
split the variation among all the observations (the total variation) into several parts, and apart from
random error every part can be explained by some factor; then, by comparing the mean squares from
different sources and with the help of the F distribution, make a statistical inference about whether a
certain factor affects the observed index.

### Analysis of variance for a completely randomized design (one-way)

A **completely randomized design** **randomly allocates** homogeneous subjects to the treatment groups
and then observes the experimental effect. The number of cases in the groups may be equal or unequal.
Because only one study factor (the grouping variable) is studied, it is a **one-way ANOVA**.

Its ANOVA table (also the table you are expected to memorize):

| Source of variation | $SS$ | $\nu$ | $MS$ | $F$ |
| --- | --- | --- | --- | --- |
| Between groups (treatment) | $\sum\limits_i n_i(\bar{x}_i-\bar{x})^2$ | $k-1$ | $\dfrac{SS_{\text{between}}}{k-1}$ | $\dfrac{MS_{\text{between}}}{MS_{\text{within}}}$ |
| Within groups (error) | $SS_{\text{total}}-SS_{\text{between}}$ or $\sum\limits_i (n_i-1)S_i^2$ | $N-k$ | $\dfrac{SS_{\text{within}}}{N-k}$ | |
| Total | $\sum x^2-\dfrac{(\sum x)^2}{N}$ | $N-1$ | | |

Three useful computational shortcuts, handy both in examinations and for checking by hand:

- $SS_{\text{total}}$ can be obtained directly by multiplying the overall variance by the degrees of
  freedom: $SS_{\text{total}}=S^2(N-1)$, with no need to compute each deviation from the mean one by
  one;
- $SS_{\text{within}}$ can be assembled from the variances of the groups: $\sum_i (n_i-1)S_i^2$, which
  is exactly the numerator of the **pooled variance**, showing that the "within-group mean square" is
  the weighted average of the group variances;
- for the total sum of squares the expanded form $\sum x^2-\frac{(\sum x)^2}{N}$ is less trouble,
  especially convenient when all you have at hand is $\sum x$ and $\sum x^2$.

**The testing procedure** is fixed at three steps:

1. **State the hypotheses and fix the significance level**: $H_0:\mu_1=\mu_2=\cdots=\mu_k$; $H_1$: the
   population means are unequal or not all equal; $\alpha=0.05$.
2. **Compute the statistic**: fill in the table above and obtain the $F$ value.
3. **Determine the $P$ value and draw the conclusion**: take $\nu_1$ and $\nu_2$ to a table of F
   critical values; if $F\ge F_{0.05}$ then $P\le0.05$, reject $H_0$ and consider the population means
   unequal or not all equal (the study factor has an effect); otherwise do not reject $H_0$, and it
   cannot yet be considered that the study factor has an effect.

### Analysis of variance for a randomized block design

If, besides the study factor you want to investigate, there is another factor that is **known to affect
the outcome but is not of interest to you** — litter, body weight, age, sex, measurement batch,
experimental date — then the subjects can first be matched into several **blocks** on that factor,
making the individuals within a block as homogeneous as possible, and then the treatments are randomly
assigned within each block. In this way the differences caused by that non-treatment factor are pulled
out separately and are no longer mixed into the error.

A randomized block design (also called a **matched-group design**) is an **extension of the paired
design**: pairing compares only two treatments, while blocking can compare $k\ge2$ treatments at the
same time.

The decomposition of variation therefore has one term more than the completely randomized design:

$$SS_{\text{total}}=SS_{\text{treatment}}+SS_{\text{block}}+SS_{\text{error}},\qquad \nu_{\text{total}}=\nu_{\text{treatment}}+\nu_{\text{block}}+\nu_{\text{error}}$$

$$SS_{\text{block}}=\sum_{j}n_j\left(\bar{x}_j-\bar{x}\right)^{2},\qquad \nu_{\text{block}}=b-1$$

where $b$ is the number of blocks. The between-treatment variation is computed exactly as in a
completely randomized design ($\nu_{\text{treatment}}=k-1$); only the error term has the block part
subtracted from it. When each treatment is applied only once in each block (no replication),
$\nu_{\text{error}}=(k-1)(b-1)$; in general $\nu_{\text{error}}=N-k-b+1$. Let $b$ be the number of
blocks and $k$ the number of treatment groups; the first subscript of $x_{ij}$ is the group and the
second is the block number.

| Source of variation | $SS$ | $\nu$ | $MS$ | $F$ |
| --- | --- | --- | --- | --- |
| Treatment groups | $\sum\limits_i n_i(\bar{x}_i-\bar{x})^2$ | $k-1$ | $\dfrac{SS_{\text{treatment}}}{k-1}$ | $\dfrac{MS_{\text{treatment}}}{MS_{\text{error}}}$ |
| Blocks | $\sum\limits_j n_j(\bar{x}_j-\bar{x})^2$ | $b-1$ | $\dfrac{SS_{\text{block}}}{b-1}$ | $\dfrac{MS_{\text{block}}}{MS_{\text{error}}}$ |
| Error | $SS_{\text{total}}-SS_{\text{treatment}}-SS_{\text{block}}$ | $N-k-b+1$ | $\dfrac{SS_{\text{error}}}{N-k-b+1}$ | |
| Total | $\sum x^2-\dfrac{(\sum x)^2}{N}$ | $N-1$ | | |

This table has to be read as **two F values, two sets of hypotheses**:

- the $F$ of the treatment groups answers "do the effects of the treatments differ", which is where the
  research aim lies;
- the $F$ of the blocks answers "do the means of the blocks differ". A difference between blocks shows
  that this non-treatment factor really does affect the outcome — **the earlier decision to block was
  right**, and pulling this variation out did increase the power of the test.

Conversely, what happens if block data are analyzed as a completely randomized design? The block
variation stays in the error term, $MS_{\text{error}}$ is inflated,
$F=\frac{MS_{\text{treatment}}}{MS_{\text{error}}}$ becomes smaller, and a treatment effect that is
really there may be judged "not statistically significant" — that is, **more false negatives**. So
**the method of analysis must match the design type**; this is not a matter of format but one that
directly changes the conclusion. Of course, blocking also needs a subject-matter basis: if that factor
is in fact unimportant, the block term takes up degrees of freedom for nothing, and the efficiency of
the test is not necessarily higher than that of a completely randomized design.

### Why t tests cannot be used repeatedly for three or more groups

Every hypothesis test judges at the $\alpha=0.05$ level, so the probability that a single judgment is
correct is $1-\alpha=0.95$. If $m$ comparisons are made independently, then by the multiplication rule
of probability the probability that **all the judgments are correct** is $0.95^{m}$, and so the
probability of **at least one mistake** (at least one false positive) is

$$P(\text{at least one Type I error})=1-(1-\alpha)^{m}=1-0.95^{m}$$

For three groups the pairwise comparisons take $m=\binom{3}{2}=3$:

$$1-0.95^{3}=1-0.857375=0.1426\approx0.143$$

That is, although the nominal level says $\alpha=0.05$, in reality the probability of "calling at least
one comparison that has no difference a difference" has already risen to **about 14%**, close to three
times the original. The more groups, the faster it inflates:

| Number of groups $k$ | Number of pairwise comparisons $m=k(k-1)/2$ | Probability of at least one Type I error, $1-0.95^m$ |
| --- | --- | --- |
| 3 | 3 | 0.143 |
| 4 | 6 | 0.265 |
| 5 | 10 | 0.401 |
| 6 | 15 | 0.537 |

(Strictly speaking, this formula assumes that the comparisons are mutually independent; in real data
the comparisons are correlated, so the true probability is slightly smaller than the values in the
table, but the trend and the order of magnitude of the inflation are unchanged.)

So comparing several groups has to take this path:

1. **First run one overall test by analysis of variance** ($H_0$: the population means of the groups are
   equal);
2. only when the overall test rejects $H_0$ go on to **pairwise comparisons**, and use a
   multiple-comparison method designed to control the family-wise Type I error;
3. if the analysis of variance gives $P>\alpha$, stop there — going on to pairwise comparisons at that
   point amounts to bypassing the overall test and putting the error rate back where it was.

Also remember: rejecting $H_0$ in analysis of variance means only that "the population means are
**unequal or not all equal**", that is, **at least two groups differ**; it does not mean that every
group differs from all the others. To find out which groups, see the next section.

<ClickAnswer>

**Think about it**: a study compares the effect of 4 kinds of feed on the weight gain of animals. The
researcher does no analysis of variance but runs 6 two-sample $t$ tests directly, 3 of which give
$P<0.05$, and so writes the conclusion: "the 4 feeds differ from one another in every pairwise
comparison." What is wrong with this conclusion?

---

At least two things.

**First, the method is wrong.** Splitting "comparing 4 means together" into 6 pairwise comparisons
raises the family-wise Type I error probability from 0.05 to $1-0.95^{6}\approx0.265$; and skipping the
overall test and going straight to pairwise comparisons amounts to giving up the control of the overall
error rate that analysis of variance provides. The correct order is to run a one-way ANOVA first, and
once $P<0.05$, use a method such as Tukey or SNK for the pairwise comparisons.

**Second, the conclusion goes too far.** Even if 3 of the 6 comparisons are significant, only those 3
pairs can be said to "differ with statistical significance"; of the other 3 pairs one can only say "no
difference has been found yet". The statement "they differ in every pairwise comparison" treats "no
difference detected" as "no difference", and also expands the overall test conclusion of "at least two
groups differ" into "all pairs differ".

</ClickAnswer>

### Pairwise comparison of several sample means

There are many methods for pairwise comparison, collectively called **multiple comparisons**, and by
study situation they fall into two broad classes:

| Situation | Features | Commonly used methods |
| --- | --- | --- |
| **Exploratory**: no pairwise comparison was planned at the design stage, and the decision to compare is made only after seeing the overall test reject $H_0$ | the number of pairs to compare is not fixed in advance, and it amounts to "going through the data looking for differences" | SNK-q test, Bonferroni method (Bonferroni $t$ test) |
| **Confirmatory**: at the design stage subject-matter knowledge already fixed which pairs are to be compared | the aim of comparison is clear and the number of pairs limited, as when each treatment group is compared with the same control group | LSD-$t$ test, Dunnett-$t$ test, Bonferroni method |

The key to the judgment is whether these comparisons are **decided only after seeing all the data** or
**planned in advance**. The few comparisons planned in advance have a clear aim and do not need the
strict adjustment that comparing everything after the fact requires; comparing every pair after the
fact does require adjustment.

### The SNK-q test

The SNK (Student-Newman-Keuls) test is also called the **q test**; it applies to exploratory research
and compares any two sample means. The test statistic is

$$q=\frac{\bar{x}_A-\bar{x}_B}{S_{\bar{x}_A-\bar{x}_B}}=\frac{\bar{x}_A-\bar{x}_B}{\sqrt{\dfrac{MS_{\text{error}}}{2}\left(\dfrac{1}{n_A}+\dfrac{1}{n_B}\right)}},\qquad \nu=\nu_{\text{error}}$$

- the numerator is the **difference in means** of any two comparison groups $A$ and $B$;
- the denominator is the **standard error of the difference**, and the $MS_{\text{error}}$ in it is
  borrowed directly from the error mean square computed by analysis of variance — in a completely
  randomized design $MS_{\text{error}}=MS_{\text{within}}$. This is exactly what "pairwise comparisons
  rest on analysis of variance" means: the ANOVA is not a wasted step, it supplies a more stable
  estimate of the error;
- when the groups have equal numbers of cases, the standard error of the difference is the same for any
  two groups, so computing it once is enough.

In looking up a table of q critical values, besides the degrees of freedom $\nu_{\text{error}}$ you also
have to look at the **number of groups $a$**: arrange the group means from smallest to largest and
number them, and $a$ is the number of groups **spanned** between the two comparison groups (inclusive
of both ends).

- neighboring groups (group 1 and group 2) have $a=2$;
- with one group in between (group 1 and group 3), $a=3$; and so on.

The larger $a$ is, the larger the q critical value — the further the span and the more "aggressive" the
comparison, the higher the bar is raised. This is exactly how the q test controls the family-wise error
rate. Note that SNK is a **stepwise comparison**: its actual family-wise Type I error rate is a little
more liberal than Tukey's, and textbooks do not all judge it the same way; but it is fairly sensitive
for comparisons between **neighboring groups**, which is why it is often used.

### The LSD-t test

LSD is short for least significant difference. The test statistic is

$$t=\frac{\bar{x}_A-\bar{x}_B}{S_{\bar{x}_A-\bar{x}_B}}=\frac{\bar{x}_A-\bar{x}_B}{\sqrt{MS_{\text{error}}\left(\dfrac{1}{n_A}+\dfrac{1}{n_B}\right)}},\qquad \nu=\nu_{\text{error}}$$

Compared with an ordinary grouped $t$ test, the only difference is that the variance in the
numerator/denominator is **not the pooled variance of the two groups but the $MS_{\text{error}}$ of the
analysis of variance** — it uses the information in all the groups, so the degrees of freedom are
larger and the estimate is more stable. But it **does not adjust** $\alpha$, so it suits only a few
comparisons planned in advance; running LSD over every pair after the fact means stepping into that
error-inflation pit a second time.

### Bonferroni, Tukey, Dunnett

- **Bonferroni method**: set the significance level of each comparison at $\alpha/m$ ($m$ being the
  number of comparisons); equivalently, multiply each computed $P$ value by $m$ and then compare it
  with $\alpha$. The procedure is simple and widely applicable, at the price of being **too
  conservative** when there are many comparisons — it does not easily reject $H_0$, and false negatives
  become more frequent.
- **Tukey (HSD) method**: based on the studentized range distribution, it treats "comparing every pair"
  as one whole and also gives a confidence interval for each pairwise difference. Whenever **the
  analysis of variance is significant and you want to look at all the pairs**, this is the most
  commonly used choice.
- **Dunnett method**: deals specifically with comparisons of "each treatment group against **the same
  control group**". Because there are fewer objects to compare, it has more power than a method that
  compares every pair.

### Conditions of application and what to do when the variances are unequal

In theory, analysis of variance requires the data to satisfy two conditions:

1. **the observations are mutually independent**, and the observations at each level follow a **normal
   distribution**;
2. **the population variances are equal**, that is, there is **homogeneity of variance**.

- **Independence** is mainly guaranteed by the design: random allocation, no repeated use of the same
  individual, and repeated measurements on the same individual handled as repeated measures.
- **Normality** and **homogeneity of variance** can be judged by statistical tests or by looking at
  plots: boxplots of each group, a plot of residuals against fitted values, a normal Q–Q plot.

**What to do when the variances are unequal**, in the usual order:

1. **Transform the variable**: take logarithms of right-skewed positive data ($\log x$), and use the
   square root when the standard deviation is proportional to the mean; after transformation the group
   variances are often close to each other.
2. **Switch to a method that does not require equal variances**: the Welch-corrected analysis of
   variance (what `oneway.test()` does by default in R), whose denominator degrees of freedom are no
   longer an integer and which is designed for unequal variances.
3. **Switch to a nonparametric method**: the **Kruskal-Wallis rank-sum test** (the multi-group version
   of the Wilcoxon rank-sum test), which requires only independence and is lenient about the shape of
   the distribution.
4. **Do a sensitivity analysis**: still use analysis of variance, but set a stricter significance level
   and state in the results the limitation that "homogeneity of variance is not satisfied".

One more thing to remember in particular: **Bartlett's test is very sensitive to normality**, and when
the data themselves are not normal it easily produces the mistaken judgment "the variances are
unequal", so for skewed data Levene's test or the Fligner-Killeen test is preferable.

### Analysis of variance for repeated-measures data (a brief introduction)

**Repeated measurement design**: after one or more treatments are given, some index of **the same
subject** is measured repeatedly at **several time points**, to describe how that index changes over
time. It is very common in clinical trials and epidemiological research — measuring plasma drug
concentration at 0, 1, 2, 4, and 8 h after dosing, or measuring blood pressure at several phases before,
during, and after induction of anesthesia, are both this design.

It looks like a randomized block design, but there are two **essential differences**:

| | Randomized block design | Repeated measurement design |
| --- | --- | --- |
| the "individuals" within a block | subjects independent of one another | repeated measurements on the same subject |
| how treatments are allocated | assigned randomly within a block, subjects in the same block receiving different treatments | treatments are randomly assigned **between subjects**; every subject is measured at the same time points |
| the status of the time point | not a study factor | a factor studied on purpose, and one that **cannot be randomly assigned** (time does not randomize) |
| relations among the data | independent within a block | the time points of the same subject are **highly correlated** (not independent) |

Precisely because the data at different time points of the same subject are not independent of one
another, repeated-measures data **cannot** be analyzed as a two-factor factorial design — that amounts
to pretending the correlation does not exist, and the conclusion is unreliable.

The decomposition of variation therefore has two levels:

$$SS_{\text{total}}=SS_{\text{between subjects}}+SS_{\text{within subjects}}$$

$$=\left(SS_{\text{treatment}}+SS_{\text{between-subject error}}\right)+\left(SS_{\text{time}}+SS_{\text{treatment}\times\text{time}}+SS_{\text{within-subject error}}\right)$$

The degrees of freedom are split in the same structure. From this three $F$ values can be obtained,
answering three questions:

- **treatment factor**: do the values of the index differ between the treatments;
- **time factor**: do the values of the index differ between the time points;
- **treatment × time interaction**: does the **trend** of the index over time differ between the
  treatments.

An interaction that is statistically significant means that "which treatment is better" depends on
which time point it is — this is usually more important than looking at the two main effects
separately, and it is where the repeated measurement design is most valuable.

Besides normality and homogeneity of variance, the conditions also require the covariance matrix to
satisfy **sphericity** (also called compound symmetry), usually judged with **Mauchly's test**. Failing
sphericity increases the Type I error probability, and there are two ways to handle it:

- multiply the degrees of freedom of the within-subject variations by the **sphericity coefficient
  $\varepsilon$** and then look up the F critical value; $\varepsilon$ is usually estimated by the
  **Greenhouse-Geisser**, **Huynh-Feldt**, and **Lower-bound** methods (Greenhouse-Geisser is the most
  common, and is on the conservative side);
- or simply switch to **multivariate analysis of variance** (MANOVA).

::: warning The default premise of univariate repeated-measures analysis
The $P$ values given by software for expressions such as `summary(aov(..., Error(subject/time)))`
**assume that sphericity holds**. So before reporting results you should run Mauchly's test; when the
sample is very small or a lot of data are missing at the time points, the sphericity test itself is
unreliable, and a mixed-effects model is the safer choice then.
:::

### Other design types (for reference)

**Cross-over design**: the same batch of subjects take two treatments in two successive periods — half
the subjects take A first and then B, the other half take B first and then A. It is often used in
studies of the efficacy of drugs for pain relief, sedation, and blood pressure lowering. Its total
variation is split into four parts:

$$SS_{\text{total}}=SS_{\text{treatment}}+SS_{\text{period}}+SS_{\text{subject}}+SS_{\text{error}}$$

Because every subject receives both treatments, the individual differences are subtracted separately,
and the efficiency is higher than that of a two-group parallel design; but one has to guard against a
**sequence (period) effect** — the carry-over influence of the drug given in the first period passes
into the second, and the design makes the two sequence groups cancel each other out. In essence it is a
multi-factor experiment with three sources: "one experimental factor + individual differences between
subjects + experimental period".

**Factorial design**: the levels of two or more experimental factors are **crossed into groups and
tested in full** (for example, 2 drugs each taken as "used/not used", giving $2\times2=4$ combinations
in all); every combination has to be given a certain number of replications (generally $n\ge2$), and
equal numbers of replications in each combination (**a balanced design**) are more efficient. It can
analyze three layers:

- **main effect**: the average difference between the levels of one factor;
- **interaction effect**: the effect of one factor changes with the level of the other (two drugs used
  together having an effect greater than the sum of their separate effects is synergism);
- **simple effect**: the difference between the levels of one factor when the levels of the other
  factors are fixed.

The variation is decomposed as
$SS_{\text{total}}=SS_{\text{treatment}}+SS_{\text{error}}=(SS_A+SS_B+SS_{AB})+SS_E$, where
$SS_{AB}=SS_{\text{treatment}}-SS_A-S_B$. The order of analysis is to look first at the **interaction
effect**: if the interaction is statistically significant, go on to analyze the simple effects of each
factor; if the interaction is not statistically significant, the two factors act independently of each
other, and looking at the main effects is then enough.

Take particular care: treating a $2\times2$ factorial design as "4 levels of one factor" and running a
one-way ANOVA on it is **wrong** — that both throws away the information about the factor structure and
cannot answer the question of interaction at all, and interaction is often precisely the aim of the
experiment. At the same time, the more factors there are, the faster the required sample size grows, so
it has to be worked out in advance at the design stage.

## Doing it in R

Below, R's built-in data sets are used to walk through the complete workflow, and all the code can be
pasted and run directly. The data used:

| Data set | Structure | Used to demonstrate |
| --- | --- | --- |
| `PlantGrowth` | 30 rows, `weight` (numeric) + `group` (factor with 3 levels) | one-way ANOVA + pairwise comparisons |
| `npk` | 24 rows, `block` (6 blocks) + `N`/`P`/`K` + `yield` | randomized block design |
| `ChickWeight` | 578 rows, `weight` + `Time` + `Chick` + `Diet` | repeated measurement design |
| `iris` | 150 rows, `Sepal.Length` + `Species` | a comparison example with very large differences between groups |

### 1. Look at the data first, then plot

```r
str(PlantGrowth)        # weight is numeric, group is a factor with 3 levels
levels(PlantGrowth$group)   # "ctrl" "trt1" "trt2"

# Grouped n, mean, sd -- the raw material of the ANOVA table
with(PlantGrowth,
     tapply(weight, group, function(x) c(n = length(x), mean = mean(x), sd = sd(x))))

# Boxplot by group: position differences and spread differences at a glance
boxplot(weight ~ group, data = PlantGrowth,
        col = "lightblue", xlab = "Treatment group", ylab = "Dry weight (g)")
```

The grouped summary comes out as: `ctrl` 5.032 ± 0.583 ($n=10$), `trt1` 4.661 ± 0.794,
`trt2` 5.526 ± 0.442. The three group means differ in level, but whether the differences go beyond
random error still has to be judged by analysis of variance.

Boxplots are extremely useful before an analysis of variance: the **position of the median line**
corresponds to the level of each group mean, and the **height of the box** reflects the spread within
the group — if the boxes differ greatly in height, homogeneity of variance is in doubt; points beyond
the whiskers suggest possible outliers, and a single extreme outlier is enough to inflate
$MS_{\text{within}}$ and destroy the conclusion.

### 2. One-way ANOVA: `aov()` + `summary()`

```r
fit <- aov(weight ~ group, data = PlantGrowth)
summary(fit)
```

Output:

```
            Df Sum Sq Mean Sq F value Pr(>F)
group        2  3.766  1.8832   4.846 0.0159 *
Residuals   27 10.492  0.3886
```

This table **is the ANOVA table**; read it column by column:

| Output column | Corresponding concept | In this example |
| --- | --- | --- |
| `Df` | degrees of freedom | the 2 of `group` $=k-1$; the 27 of `Residuals` $=N-k=30-3$ |
| `Sum Sq` | sum of squared deviations from the mean, $SS$ | between groups 3.766, within groups 10.492 (together 14.258, that is $SS_{\text{total}}$) |
| `Mean Sq` | mean square $MS=SS/\nu$ | $MS_{\text{between}}=1.883$, $MS_{\text{within}}=0.389$ |
| `F value` | $MS_{\text{between}}/MS_{\text{within}}$ | $1.8832/0.3886\approx4.846$ |
| `Pr(>F)` | $P$ value | 0.0159 < 0.05, reject $H_0$: the three population means are not all equal |

Two naming correspondences have to be remembered: **`Residuals` (residuals) in R is called
within-group (error) in analysis of variance** — a residual = observed value − the mean of the group it
belongs to, and its sum of squares is exactly $SS_{\text{within}}$. Also, symbols such as `*` and `**`
are only significance markers; the basis for judgment is always the number in the `Pr(>F)` column.

### 3. Work it out by hand and check the software's output

```r
x <- PlantGrowth$weight
g <- PlantGrowth$group

N    <- length(x)          # 30
k    <- nlevels(g)         # 3
xbar <- mean(x)

ss_total   <- sum((x - xbar)^2)                                  # total variation
ss_between <- sum(tapply(x, g, length) * (tapply(x, g, mean) - xbar)^2)
ss_within  <- ss_total - ss_between                              # within = total − between

(ms_between <- ss_between / (k - 1))     # 1.883
(ms_within  <- ss_within  / (N - k))     # 0.389
(Fobs <- ms_between / ms_within)         # 4.846

qf(0.95, k - 1, N - k)                   # 3.354, the F critical value F(0.05)(2, 27)
1 - pf(Fobs, k - 1, N - k)               # 0.0159, that is the P value
```

The computed $SS_{\text{total}}=14.258$, $SS_{\text{between}}=3.766$ and
$SS_{\text{within}}=10.492$ agree exactly with `summary(fit)`.
$F=4.846>F_{0.05(2,27)}=3.354$, equivalent to $P=0.0159<0.05$; the two ways of judging give the same
conclusion.

The value of working it out by hand is that afterwards, when you see a table printed by software, you
can point to where every number comes from instead of treating it as a black box.

### 4. Pairwise comparisons

The overall test rejected $H_0$, so next look at which groups differ. The most commonly used is Tukey:

```r
TukeyHSD(fit)      # all pairs compared, with the family-wise Type I error controlled at the same time
```

Output:

```
$group
            diff        lwr       upr     p adj
trt1-ctrl -0.371 -1.0622161 0.3202161 0.3908711
trt2-ctrl  0.494 -0.1972161 1.1852161 0.1979960
trt2-trt1  0.865  0.1737839 1.5562161 0.0120064
```

- `diff`: the difference between the two group means (the group written first minus the group written
  second);
- `lwr` / `upr`: the 95% confidence interval for the difference. **An interval that does not cross 0**
  is equivalent to the difference being statistically significant;
- `p adj`: the **adjusted** $P$ value, compared with 0.05. Here only `trt2-trt1` (0.012) is
  significant; the other two pairs are not.

Note that the difference of `trt2-ctrl`, 0.494, is not small, yet the adjusted $P$ value is 0.198 —
**multiple-comparison adjustment makes $P$ values larger**, which is the price paid for controlling the
family-wise error rate, and the reason "unadjusted $P$ values cannot be used to draw conclusions".

With `pairwise.t.test()` you can switch to other adjustment methods:

```r
pairwise.t.test(PlantGrowth$weight, PlantGrowth$group, p.adjust.method = "bonferroni")
pairwise.t.test(PlantGrowth$weight, PlantGrowth$group, p.adjust.method = "none")   # equivalent to LSD
```

A comparison of the two forms of output (the two directions of the table are the column group and the
row group respectively):

```
bonferroni:               none:
     ctrl  trt1              ctrl   trt1
trt1 0.583 -            trt1 0.1944 -
trt2 0.263 0.013        trt2 0.0877 0.0045
```

The $P$ value for `trt2` against `ctrl` goes from 0.0877 unadjusted to 0.263 after Bonferroni
adjustment (about $0.0877\times3$); the change is from "barely approaching significance" to "clearly
not significant". This is exactly why **the unadjusted `"none"` applies only to a few comparisons
planned in advance**, while comparing everything after the fact calls for honest adjustment.

`p.adjust.method` can also take methods such as `"holm"` (a little more powerful than Bonferroni) and
`"BH"` (controlling the false discovery rate, FDR, often used when making a large number of
comparisons).

Two other routes need extra packages installed:

```r
# SNK-q test: not in base R, provided by the agricolae package
# install.packages("agricolae")
# agricolae::SNK.test(fit, "group", console = TRUE)

# emmeans: a unified interface for Bonferroni, Dunnett, and other contrasts
# install.packages("emmeans")
library(emmeans)
em <- emmeans(fit, ~ group)

pairs(em, adjust = "bonferroni")                       # all pairs + Bonferroni adjustment
contrast(em, method = "trt.vs.ctrl", ref = "ctrl")     # each treatment group against the control
```

`contrast(..., method = "trt.vs.ctrl")` performs Dunnett-type comparisons (the output notes
`P value adjustment: dunnettx method` at the end), comparing only the "treatment vs control" pairs,
which makes real differences easier to find than comparing everything — **use it for comparisons
planned in advance**.

### 5. Testing homogeneity of variance

```r
bartlett.test(weight ~ group, data = PlantGrowth)   # requires approximately normal data, otherwise unreliable
fligner.test(weight ~ group, data = PlantGrowth)    # rank-based, does not rely on normality

# install.packages("car")
car::leveneTest(weight ~ group, data = PlantGrowth) # general first choice, stable for skewed data too
```

The results of the three tests are: Bartlett $K^2=2.879$, $P=0.237$; Fligner-Killeen $P=0.309$; Levene
$F=1.119$, $P=0.341$. All three give $P>0.05$, so **the variances cannot be considered unequal**, and
the analysis of variance above can be used with confidence.

| Test | Requirement about normality | When to use it |
| --- | --- | --- |
| Bartlett | very sensitive | when the data are close to normal; do not use its conclusion for skewed data |
| Levene | not sensitive | **the default first choice** (`car::leveneTest()` centers on the median by default, which is more robust) |
| Fligner-Killeen | not sensitive | a nonparametric idea; also a good alternative when the sample is small and the distribution skewed |

Do not get the direction the wrong way round: for all these tests $H_0$ is "**the variances of the
groups are equal**", so **only $P<0.05$ means the variances are unequal** — exactly the same direction
as `var.test()` in the lecture on the $t$ test.

::: tip Plots stand up to scrutiny better than tests
The test for homogeneity of variance has almost no power when the sample is very small, and with a
large sample it reports $P<0.05$ for differences that do not matter. So besides running the test, it is
best to look at the heights of the group boxplots and at the residual plot at the same time; only when
both the test and the plots say there is no problem is there really no problem.
:::

### 6. When the variances are unequal or normality is poor

```r
oneway.test(weight ~ group, data = PlantGrowth, var.equal = FALSE)  # Welch-corrected ANOVA
kruskal.test(weight ~ group, data = PlantGrowth)                    # Kruskal-Wallis rank-sum test
```

- the default of `oneway.test()` is `var.equal = FALSE` (the Welch version); it does not require equal
  variances, and the denominator degrees of freedom are no longer an integer: in this example
  $F=5.181$, denominator degrees of freedom 17.128, $P=0.0174$;
- `kruskal.test()` requires only independence: in this example $\chi^2=7.988$, $P=0.0184$.

In this example the three approaches (standard ANOVA $P=0.0159$, Welch $P=0.0174$, Kruskal-Wallis
$P=0.0184$) agree. When they disagree in real life, go back and look for outliers in the data and at
whether the group sample sizes are very unequal — usually the problem lies in the data itself, not in
the method's not being sophisticated enough.

### 7. Randomized block design: `npk`

`npk` is R's built-in pea fertilization experiment: 24 plots are divided into **6 blocks**, and within
each block a combination of nitrogen (N), phosphate (P), and potassium (K) fertilizer is arranged. In
essence it is "randomized block + $2\times2\times2$ factorial", which is just right for showing how the
block term is written.

```r
str(npk)                                    # block is a factor with 6 levels, yield is the crop yield

fit_rb <- aov(yield ~ block + N, data = npk)   # here only nitrogen is looked at first, with block pulled out separately
summary(fit_rb)
```

Output:

```
            Df Sum Sq Mean Sq F value Pr(>F)
block        5  343.3   68.66   3.395 0.0262 *
N            1  189.3  189.28   9.360 0.0071 **
Residuals   17  343.8   20.22
```

- the `block` term has $F=3.395$, $P=0.026<0.05$: **the blocks differ**, showing that the arrangement of
  blocking was worthwhile and that pulling this variation out separately is indeed useful;
- the `N` term has $F=9.360$, $P=0.007<0.01$: whether nitrogen is applied affects the yield;
- the denominator of both $F$ values is the error mean square $MS_{\text{error}}=20.22$;
- checking the degrees of freedom: $\nu_{\text{error}}=N-k-b+1=24-2-6+1=17$. Only with no replication
  (each treatment applied once in each block) is it equal to $(k-1)(b-1)$; in this example there is more
  than one observed value in each cell, so it is not.

Putting P and K into the model as well makes things clearer:

```r
summary(aov(yield ~ block + N * P * K, data = npk))
```

```
            Df Sum Sq Mean Sq F value  Pr(>F)
block        5  343.3   68.66   4.447 0.01594 *
N            1  189.3  189.28  12.259 0.00437 **
P            1    8.4    8.40   0.544 0.47490
K            1   95.2   95.20   6.166 0.02880 *
N:P          1   21.3   21.28   1.378 0.26317
N:K          1   33.1   33.14   2.146 0.16865
P:K          1    0.5    0.48   0.031 0.86275
Residuals   12  185.3   15.44
```

Once the variation that belongs in the model is in it, the error mean square falls from 20.22 to 15.44
and the $F$ values of all the terms become larger — **variation left in the error term directly weakens
the sensitivity of the test**. This is the same principle as "taking the block variation out of the
error" in a randomized block design: every term in the model helps decide how clean the error term is.
(By the way, in this experiment the block division is confounded with the three-way interaction, so
there is no `N:P:K` term in the output; that is an arrangement fixed at the design stage.)

### 8. Repeated measurement design: `ChickWeight`

`ChickWeight` records the body weight of 50 chicks every 2 days from day 0 to day 21, with `Diet` being
4 kinds of feed. **The same individual is measured repeatedly**, which is exactly a repeated
measurement design.

```r
str(ChickWeight)     # weight, Time, Chick (individual), Diet (treatment)

# Keep only the individuals measured at all 12 time points: for missing-value handling see Week 1 of Medical Big Data Analysis and Decision Making
tab   <- table(ChickWeight$Chick)
chick <- subset(ChickWeight, Chick %in% names(tab)[tab == 12])
chick$Time <- factor(chick$Time)      # the time point must be a factor to enter the model as a factor

fit_rm <- aov(weight ~ Diet * Time + Error(Chick / Time), data = chick)
summary(fit_rm)
```

The output falls into two layers:

```
Error: Chick
          Df Sum Sq Mean Sq F value  Pr(>F)
Diet       3 116404   38801   5.075 0.00443 **
Residuals 41 313495    7646

Error: Chick:Time
           Df  Sum Sq Mean Sq F value   Pr(>F)
Time       11 1982388  180217 275.217  < 2e-16 ***
Diet:Time  33   81375    2466   3.766 9.34e-11 ***
Residuals 451  295323     655
```

How to read it:

- **the `Error: Chick` layer = between subjects**: the effect of `Diet` is tested here ($F=5.075$,
  $P=0.004$; the weight gain differs between the feeds), and `Residuals` is the between-subject error
  (41 = 45 − 4, that is, the number of individuals minus the number of groups);
- **the `Error: Chick:Time` layer = within subjects**: the effect of `Time` ($P<2\times10^{-16}$, body
  weight changes over time), the `Diet:Time` interaction, and the within-subject error all live here;
- **the interaction is significant** ($P=9\times10^{-11}$), showing that "which feed makes the chicks
  gain weight faster" is something that changes over time — reporting only one overall statement that
  "the feeds differ" would waste information; the trends of the groups should be looked at time point
  by time point, or drawn as a plot.

`Error(Chick / Time)` means "the individual is the unit and the time point is nested within the
individual"; it corresponds to the two-layer decomposition "between subjects / within subjects". If
`Time` is not made a factor, R treats it as a continuous variable, and the model gives only the one
trend "body weight changes linearly with time", so the means at the time points cannot be compared.

It was noted earlier that `summary()` gives the results of a **univariate** analysis, assuming that
sphericity holds. To run Mauchly's test and the Greenhouse-Geisser correction, packages such as
`afex::aov_ez()` and `ez::ezANOVA()` can be used instead.

### 9. A quick look at another data set

```r
summary(aov(Sepal.Length ~ Species, data = iris))   # huge differences between groups, F = 119.3, P < 2e-16
TukeyHSD(aov(Sepal.Length ~ Species, data = iris))  # all three pairwise comparisons significant
```

The three iris species differ very clearly in sepal length, $F=119.3$, and the `p adj` values of all
three pairwise comparisons are approximately 0. The advantage of practicing on it is that **the result
here can be matched against the boxplot at a glance**, which helps you confirm that the whole workflow
is written correctly.

Remember in passing: analysis of variance and regression are two faces of the same thing. The $F$
statistic given by `summary(lm(weight ~ group, data = PlantGrowth))` is also 4.846 (with 2 and 27
degrees of freedom), and the $t$ tests of `grouptrt1` and `grouptrt2` in the coefficient table are the
unadjusted comparisons of "each treatment group against the reference group `ctrl`". To change the
reference group to another one, use `relevel(PlantGrowth$group, ref = "trt1")`.

## Common pitfalls

- **Using t tests repeatedly for three or more groups.** Three groups need 3 tests, and the family-wise
  Type I error probability rises from 0.05 to 0.143; four groups need 6 and it rises to 0.265; five
  groups need 10 and it rises to 0.401. No number of tests can replace one analysis of variance.
- **Pushing the conclusion of the overall test too far.** Rejecting $H_0$ in analysis of variance says
  only that "the population means are unequal or **not all equal**", that is, at least two groups
  differ, not that "all pairs differ"; conversely, when the analysis of variance gives $P>0.05$, do not
  go on to make pairwise comparisons either — that bypasses the overall test and puts the error rate
  back.
- **The method of analysis not matching the design type.** Analyze randomized block data with the
  analysis of variance of a completely randomized design and the block variation is mixed into the
  error, $MS_{\text{error}}$ is inflated, $F$ becomes smaller, and a treatment effect that is really
  there may not be detectable; analyze repeated-measures data as a two-factor factorial design and it
  amounts to ignoring the correlation between the repeated measurements on the same subject. When you
  are given data, ask first: **which design is this? How many sources of variation are there?**
- **Starting work without checking the conditions, or forcing the computation when the variances are
  unequal.** Independence, normality, and homogeneity of variance all have to be gone through:
  independence is guaranteed by the design, and normality and homogeneity of variance by plots plus
  tests. With homogeneity of variance, watch the direction ($P<0.05$ is what means the variances are
  unequal), and do not use Bartlett's conclusion for skewed data; when the variances are unequal use a
  variable transformation, `oneway.test()` (Welch), or `kruskal.test()`, rather than forcing a standard
  analysis of variance.
- **Choosing the wrong situation for a pairwise comparison method.** Comparing every pair after the
  fact (exploratory) calls for Tukey/SNK/Bonferroni; the few comparisons planned in advance (each
  treatment group against the same control group) call for Dunnett/LSD. Using unadjusted LSD for
  all-pairs comparisons means stepping into the error-inflation pit a second time; conversely, forcing
  Bonferroni on two or three comparisons that were planned in advance throws away test power for
  nothing.

## How it connects to the other courses

::: tip Related pages
- **[Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing](/en/intro-it/13-hypothesis-testing)** — **this chapter is the generalization of that lecture: two groups → several groups.** That lecture starts from a single normal mean and the comparison of two means and builds up the parametric testing workflow step by step with `t.test()` and `var.test()`; this chapter widens the objects of comparison to $k$ means, replaces repeated $t$ tests with one analysis of variance, and finishes with Tukey/SNK/LSD. The correspondence is direct: the two-stage procedure of Exercise 4 in that lecture, "test homogeneity of variance first, then choose the $t$ test according to the result", becomes here "run `car::leveneTest()` first, then decide between analysis of variance, Welch, and Kruskal-Wallis". **Get that lecture's sampling distribution, $P$ value, and Type I error straight first, and learning this chapter's $F$ test will go far more smoothly.**
- **[Lecture 11 of *Introduction to Information Technology*, The ggplot2 Package](/en/intro-it/11-ggplot2)** — a grouped boxplot is a must before an analysis of variance: boxes at different positions suggest that the treatment may have an effect, and boxes of very different heights suggest that homogeneity of variance may fail. That lecture practices layers such as `geom_point()`, `geom_histogram()`, and `geom_rect()`, along with `scale_*()` color scales and theme arguments; **the grouped boxplot is not in that lecture** — its ggplot2 version is in Chapter 19, Statistical Tables and Charts ([open that chapter](/en/Health-statistics/19-tables-and-charts)), under the use of `geom_boxplot()`, which makes it easier to add group labels and mean markers than base graphics. For a base-graphics version, see the use of `boxplot(y ~ g, data = ...)` in Lecture 9, Base Graphics ([open that lecture](/en/intro-it/9-base-graphics)) — what is taught there is "drawing several groups at once", which is exactly this chapter's entry plot.
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)** — the mean, median, variance, standard deviation, and quartiles that week computes for the `cars$speed` column are the raw material of this chapter's ANOVA table — the $n_i$, $\bar{x}_i$, and $S_i$ of each group are nothing but the same batch of functions computed once per group (for the grouped-summary syntax see the next item); the equal-width/equal-frequency binning and the min-max and Z-score normalization there turn raw measurements into an analyzable form. One extreme outlier is enough to inflate $MS_{\text{within}}$ and turn a difference that should be significant into a non-significant one, so before entering the model you should check whether such a point is there.
- **[Week 1 of *Medical Big Data Analysis and Decision Making*, Using R and Getting Data](/en/Medical-Big-Data-Analysis/1-r-basics-and-data)** — the `ChickWeight` example on this page first removes the individuals that were not measured completely, using exactly the idea of handling missing values with `na.omit()` from that week (the `airquality` example): first see clearly which observations are missing, then decide whether to delete or impute; and how many observations are deleted directly changes the number of cases and the degrees of freedom in this chapter.
- **[Lecture 4 of *Introduction to Information Technology*, Lists and Factors](/en/intro-it/4-lists-and-factors)** — analysis of variance requires the grouping variable to be a **factor**. If the `group` in `aov(weight ~ group)` is stored as a character string, R converts it to a factor for you, but the order of the levels and the **reference group** directly affect the output, especially `contrast(..., ref = "ctrl")` and the comparison object in a regression coefficient table. Fixing levels with `factor(x, levels = )` is the content of that lecture; that lecture's Exercise 4 and Exercise 5 also specifically practice the three **grouped summary** functions `tapply()`, `by()`, and `aggregate()`, which are the hands-on version of "computing $n_i$, $\bar{x}_i$, and $S_i$ by group" in this chapter. The `relevel()` needed to change the reference group is not covered in that lecture; look up `?relevel` when you need it.
- **[Week 3 of *Medical Big Data Analysis and Decision Making*, Regression Analysis](/en/Medical-Big-Data-Analysis/3-regression)** — analysis of variance and regression are two faces of the same linear model: the output of `aov()` is equivalent to the $F$ test in `summary(lm(...))`, and once the grouping variable is coded as dummy variables, the coefficient tests and the comparison of "each treatment group against the reference group" are the same thing. To understand thoroughly why the table printed by `summary(fit)` looks the way it does, the linear-model part of that week's regression will help.
:::

<!-- Back-link suggestions
Suggest linking back to this page (all pointing at /Health-statistics/09-anova) from:
- /intro-it/13-hypothesis-testing, in its "summary" section: add "comparing the means of three or more
  groups, and why t tests cannot be used repeatedly, see Chapter 9 of Health Statistics";
  near Exercise 4 on the same page (test of homogeneity of variance and test of means), add "other
  choices for testing homogeneity of variance, and what to do when the variances are unequal, see
  Chapter 9 of Health Statistics".
- /Health-statistics/19-tables-and-charts, where geom_boxplot is discussed, add "the uses of a grouped
  boxplot before an analysis of variance, see Chapter 9 of Health Statistics".
- /intro-it/9-base-graphics, where the boxplot function is discussed (near Exercise 6 and Exercise 7),
  add the same sentence.
- /intro-it/4-lists-and-factors, where factor is discussed (the grouped summaries of Exercise 4 and
  Exercise 5 can carry the same sentence), add "the grouping variable must be a factor, for the reason
  see Chapter 9 of Health Statistics".
- /Medical-Big-Data-Analysis/2-data-preprocessing, where measures of central tendency and dispersion,
  binning, and normalization are discussed, add "the role of these quantities in analysis of variance,
  see Chapter 9 of Health Statistics".
- /Medical-Big-Data-Analysis/3-regression, where the linear model is discussed, add "one-way ANOVA is
  a special case of the linear model, see Chapter 9 of Health Statistics".
-->

## Summary

1. **The basic idea**: by design type, split the **total variation** into several sources, each of
   which, apart from random error, can be explained by some factor; then compare the **ratio of mean
   squares** $F=MS_{\text{between}}/MS_{\text{within}}$ with the F distribution to judge whether that
   factor has an effect. The core is only three lines of formula:
   $SS_{\text{total}}=SS_{\text{between}}+SS_{\text{within}}$,
   $\nu_{\text{total}}=\nu_{\text{between}}+\nu_{\text{within}}$, and
   $F=MS_{\text{between}}/MS_{\text{within}}$.
2. **Completely randomized design (one-way)**: $\nu_{\text{between}}=k-1$,
   $\nu_{\text{within}}=N-k$, and the ANOVA table is the five elements $SS$ / $\nu$ / $MS$ / $F$ / $P$;
   the **randomized block design** has one term more, the block variation
   $SS_{\text{total}}=SS_{\text{treatment}}+SS_{\text{block}}+SS_{\text{error}}$, the error mean square
   becomes smaller and the test more sensitive — but only on the premise that **the method of analysis
   must match the design type**.
3. **Repeated t tests cannot be used for three or more groups**: with 3 comparisons the family-wise
   Type I error probability is already $1-0.95^3\approx0.143$, with 4 groups 0.265, and with 5 groups
   0.401. The correct procedure is "overall test by analysis of variance → adjusted pairwise
   comparisons once significant": Tukey/SNK/Bonferroni for exploratory work, Dunnett/LSD for the few
   comparisons planned in advance; if the overall test is not significant, stop.
4. **The conditions of application are independence, normality, and homogeneity of variance**; when the
   variances are unequal you can transform variables, use the Welch-corrected `oneway.test()`, or
   switch to `kruskal.test()`. In a **repeated measurement design** the repeated measurements on the
   same subject are correlated, and the variation splits into the two layers "between subjects /
   within subjects", so treatment, time, and the interaction can be tested separately; **sphericity**
   must also be satisfied (Mauchly's test; if it is not, use the Greenhouse-Geisser correction
   coefficient $\varepsilon$ or switch to MANOVA).
5. **One main line in R**: `aov()` + `summary()` gives the ANOVA table; `TukeyHSD()`,
   `pairwise.t.test()`, and `emmeans` do the pairwise comparisons (note that `p adj` is an adjusted
   $P$ value, to be compared with 0.05); `car::leveneTest()` checks homogeneity of variance;
   `oneway.test()` and `kruskal.test()` are the fallbacks; for a randomized block design remember to
   add the `block` term, and for repeated measures remember to use `Error(subject/time)`.
