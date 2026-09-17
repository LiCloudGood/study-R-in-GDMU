---
layout: doc
title: '16. Meta-Analysis'
---

# Chapter 16. Meta-Analysis

::: info Translation status
Translated from the [Chinese original](/Health-statistics/16-meta-analysis). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Several small studies have tackled the same question and their conclusions still disagree — how do you
> combine their results quantitatively, and how do you judge whether that combination should be made at all?

## What this chapter is for

A drug is used to treat unstable angina, and you retrieve 9 clinical trials. Of these, 8 report a statistically
significant difference in efficacy between the two groups and 1 reports no difference. The traditional
literature review **counts papers**: 8 votes to 1, and the drug looks effective.

"Counting the literature" has two faults it cannot get around:

- **It does not assess quality.** A study with a crude design and no real randomization is given the same single
  vote as a rigorously randomized, double-blind study.
- **It ignores sample size.** A 20-subject study and a 400-subject study are treated as contributing equally to
  the conclusion. But the effect sizes from small studies are extremely unstable — the OR from a study of only a
  couple of dozen subjects often comes with a confidence interval so wide that it runs from 0.3 to beyond 30,
  crossing the no-effect line and crossing it by a wide margin, so on its own it says almost nothing.

On top of that, every primary study carries its own bias, and voting by number of papers simply inherits that
bias unchanged.

What this chapter has to answer is: **given several independent studies on the same question whose conclusions
are not fully consistent, how do you combine them systematically, objectively, and quantitatively, and how do
you state how much confidence that combined conclusion deserves?** The method is called meta-analysis. It is not
just computing a pooled value — it also means first checking whether these studies can be combined at all
(heterogeneity), whether they represent the whole body of evidence (publication bias), and whether the conclusion
will be turned by any single study (sensitivity analysis).

## Core concepts

### 1. What meta-analysis is

**Definition**: meta-analysis is the series of processes that **systematically and quantitatively** synthesize
the results of **several mutually independent** studies of **the same research question**. It is a secondary
analysis whose units of analysis are the results of several independent studies.

The name comes from Greek and means roughly "after", "more comprehensive", "secondary"; Chinese sources also
render it as 荟萃分析, 元分析, or 后分析.

It differs from an ordinary literature review in three ways: **it has a clearly stated research question**, **it
has inclusion and exclusion criteria fixed in advance**, and **it finally combines the results with statistical
methods**. An ordinary review stops at "what studies exist and roughly what they conclude"; meta-analysis takes
one step further and produces a pooled effect size with a confidence interval.

Where it sits within systematic reviews: systematic reviews fall into four kinds — qualitative systematic
review, meta-analysis, pooled analysis, and prospective pooled analysis. Meta-analysis is the **quantitative**
kind. A systematic review lays down the process for searching, inclusion and exclusion, and quality assessment;
meta-analysis is the final statistical step of that process. So "systematic review" is not the same thing as
"meta-analysis" — when the evidence is too mixed and too inconsistent, a purely qualitative synthesis is still a
legitimate systematic review.

**Three purposes**:

1. **Increase statistical power.** Combining several studies is like combining their sample sizes: it can damp
   down the sampling error and measurement error inside each single study, and the power is higher than that of
   any one of them alone.
2. **Resolve contradictions between the conclusions of individual studies.** By estimating the average level of
   the effect quantitatively, it gives an assessable overall result for conclusions that are disputed or even
   mutually contradictory.
3. **Settle new questions that no single earlier study could answer.** It can bring out questions a single study
   cannot answer and expose the shortcomings of earlier work, and so suggest new hypotheses and research
   directions.

**One positioning statement has to come first**: the data of a meta-analysis come from **already published study
results**, not from raw individual-level data, so in nature it is an **observational study**. It **cannot remove**
the bias in the primary studies; at best (when done properly) it can reduce part of it. If the primary studies
are of poor quality, the pooled result is just as untenable — **garbage in, garbage out**.

### 2. Effect sizes: giving every study the same ruler

Every study reports its results in a different form: some give two group means, some give an OR, some give a
response rate. To combine them, the first step is to **convert them into an effect size**（效应量）of the same
dimension.

Which effect size you choose depends on the **type of data**:

| Data type | Effect size options | No-effect line | When to use it |
| --- | --- | --- | --- |
| Quantitative data (continuous variable) | MD (mean difference) | 0 | Every study used **the same scale and the same unit** |
| Quantitative data | SMD (standardized mean difference) | 0 | Scales or units differ (different depression scales, different blood-glucose units …) |
| Qualitative data (binary) | OR (odds ratio) | 1 | Case-control studies; rare outcomes; when the result has to match the scale of logistic regression |
| Qualitative data | RR (relative risk) | 1 | Cohort studies or randomized controlled trials with incidence/risk data; clinically intuitive |
| Qualitative data | RD (risk difference) | 0 | When you want the **absolute** effect, or need the NNT |

The **no-effect line** is the vertical line on a forest plot: if the pooled effect size lands on it, the two
groups do not differ. **For quantitative data the no-effect line is 0; for OR and RR it is 1; for RD it is 0.**
This is used again and again in this chapter.

#### Quantitative data: MD and SMD

The mean difference is just one group mean minus the other:

$$MD_i = \bar{X}_{1i} - \bar{X}_{2i}$$

If the units are the same you can combine them directly, and the pooled result reads as "on average, how many
points or how many mmol/L apart", which is easy to explain.

If the scales differ you cannot subtract directly (a scale with a maximum of 50 and one with a maximum of 100 are
not the same thing at all, and 5 points apart means something completely different on each), so you divide the
difference by the pooled standard deviation of the two groups and cancel the units:

$$d_i = \frac{\bar{X}_{1i} - \bar{X}_{2i}}{S_i}, \qquad S_i = \sqrt{\frac{(n_{1i}-1)S_{1i}^2 + (n_{2i}-1)S_{2i}^2}{n_{1i}+n_{2i}-2}}$$

$S_i$ is the square root of the pooled variance of two samples from Chapter 6 (the two variances averaged by
degrees of freedom). The $d_i$ computed this way is the **standardized mean difference, SMD**; it has no units,
and it means "how many pooled standard deviations apart the two groups are". As a rule of thumb $d \approx 0.2$
is small, $0.5$ is moderate, and $0.8$ is large.

**Note that the formula above is Cohen's $d$, while `sm = "SMD"` in R computes Hedges' $g$.** With small samples
Cohen's $d$ systematically overestimates the effect size; Hedges' $g$ pulls it back with a correction factor
$J = 1 - \dfrac{3}{4(n_1+n_2)-9}$, so $g$ is always a little smaller than $d$. On the same batch of data the two
differ by roughly **1%–5.5%**, and the smaller the study, the bigger the gap. This does not change the direction
of any conclusion, but **if you want to reproduce the `sm = "SMD"` output later in this chapter, you should know
that what is being computed is $g$, not the $d$ above**.

**The price of SMD**: it cancels the units, and with them the information "how much difference". So when the
scales are the same, prefer MD, and fall back on SMD only when the scales genuinely cannot be made uniform.

#### Qualitative data: OR, RR, RD

Binary data are laid out in a $2\times2$ table:

| | Case group (outcome +) | Control group (outcome −) | Total |
| --- | --- | --- | --- |
| Exposed group (or trial group) | $a_i$ | $b_i$ | $n_{1i}$ |
| Unexposed group (or control group) | $c_i$ | $d_i$ | $n_{2i}$ |
| Total | $m_{1i}$ | $m_{2i}$ | $T_i$ |

The three effect sizes are:

$$OR_i = \frac{a_i d_i}{b_i c_i}, \qquad RR_i = \frac{a_i/(a_i+b_i)}{c_i/(c_i+d_i)}, \qquad RD_i = \frac{a_i}{a_i+b_i} - \frac{c_i}{c_i+d_i}$$

How to choose:

- **OR** is the odds ratio of the $2\times2$ table, and a case-control study **can only** use it (because
  incidence is not available and RR cannot be computed). It is also the natural scale of logistic regression
  output, which makes it the most generally usable choice in meta-analysis.
- **RR** is the ratio of two risks, and only a cohort study or a randomized controlled trial can produce it. Its
  clinical meaning is the most intuitive: "the risk of the outcome in the trial group is 0.90 times that in the
  control group".
- **RD** is the difference between two risks and gives the **absolute** effect, from which you can compute
  directly how many patients must be treated to prevent one bad outcome: $NNT = 1/|RD|$. Its weakness is that
  when the event rate is close to 0 or to 1, and baseline risks differ a lot between studies, RD is very
  unstable.
- **OR is not RR**: an OR is always further from 1. Only when the outcome is rare (incidence roughly below 10%)
  is $OR \approx RR$; when the outcome is not rare, interpreting an OR as an RR exaggerates the effect.
- OR and RR are both ratios, so **take logarithms before pooling**, weight on the $\ln OR$ and $\ln RR$ scale,
  and exponentiate back at the end. Confidence intervals are handled the same way:

$$95\%CI(OR) = \exp\Big[\ln(OR) \pm 1.96\,SE(\ln OR)\Big]$$

(There is also the hazard ratio, HR, for survival data, which this course does not cover.)

#### Weights: who gets the say

Studies do not contribute equally when you pool them — large studies with precise results should count for
more. The ruler for "precision" is the **variance**: the smaller the variance, the larger the weight. The most
common choice is the reciprocal of the variance, $w_i = 1/v_i$; besides that, the Mantel-Haenszel method uses
$w_i = b_i c_i / T_i$, the Peto method uses $V_i$, and the random-effects model uses $1/(v_i+\tau^2)$ (see the
next section). The formulas differ, but **the principle is the same one: the more precise a study, the larger
its weight**.

Take the example this chapter works through in detail later (7 aspirin trials): the largest study carries
**72.9%** of the weight and the smallest only **1.8%** — the pooled result is essentially decided by the former.
Keep that in mind; the forest-plot section comes back to it.

### 3. Fixed-effect and random-effects models

**This is the central exam point of the chapter.** The two models make different assumptions about where the
differences among studies come from, and therefore differ in algorithm, in result, and in when they apply.

#### Fixed-effect model

**Assumption**: all the included studies estimate **the same** population effect size $\theta$. The only reason
the study results differ is **sampling error**, nothing else.

Mathematically this is written as a single equation:

$$\hat\theta_i = \theta + \varepsilon_i, \qquad \varepsilon_i \sim N(0, v_i)$$

That is, every study is the same true value plus a bit of within-study noise. The weights are therefore the
reciprocal variances, and the pooled effect size is a weighted average:

$$\hat\theta_F = \frac{\sum_i w_i \hat\theta_i}{\sum_i w_i}, \qquad w_i = \frac{1}{v_i}, \qquad SE(\hat\theta_F) = \sqrt{\frac{1}{\sum_i w_i}}$$

The corresponding pooling methods are the **Mantel-Haenszel method, the Peto method, and the general
variance-based method**.

#### Random-effects model

**Assumption**: the studies do **not** all estimate the same population effect size. Each study has its own true
value $\theta_i$, and those true values are distributed around an overall mean effect $\mu$:

$$\theta_i = \mu + u_i, \qquad u_i \sim N(0, \tau^2), \qquad \hat\theta_i = \mu + u_i + \varepsilon_i$$

Here $\tau^2$ is the **between-study variance**, measuring how far apart the true values of the studies are. The
total variation of a single study now splits into "within-study + between-study":

$$w_i^{*} = \frac{1}{v_i + \tau^2}$$

The larger $\tau^2$ is, the more the $w_i^*$ tend toward equality — the random-effects model **undercuts the
dominance of large studies**, leveling out the contributions, so the confidence interval is usually wider and
the conclusion more conservative.

The method commonly used is the **DerSimonian-Laird method**, which backs $\tau^2$ out of the $Q$ statistic:

$$\tau^2 = \frac{Q - (k-1)}{\sum w_i - \dfrac{\sum w_i^2}{\sum w_i}}, \qquad \tau^2 \text{ is taken as the larger of } 0 \text{ and the expression above}$$

In the formula $k$ is the number of studies. When $Q \le k-1$ the computed $\tau^2$ is negative and is set to
0 — at that point the **random-effects model degenerates into the fixed-effect model** and the two give almost
the same answer. That is where "the two models agree when $Q$ is small" comes from.

**The random-effects model is not a cure for heterogeneity.** It only acknowledges that the studies differ and
folds that difference into the error; it **does not explain where the difference comes from**. Reaching straight
for a random-effects model whenever $I^2$ is large and reporting a wider interval is a textbook way of dodging
the work — the right move is to look for the source of the heterogeneity (subgroup analysis, sensitivity
analysis, meta-regression).

#### Which one to use

**The criterion is the result of the test for heterogeneity** (detailed in the next section):

| Result of the heterogeneity test | Reading | Which model to use |
| --- | --- | --- |
| $P > 0.1$ and $I^2 \le 25\%$ | No statistical heterogeneity found | **Fixed-effect model** |
| $P > 0.1$ and moderate $I^2$ ($25\% < I^2 \le 50\%$) | The $Q$ test found no heterogeneity, but $I^2$ says part of the total variation really does come from between-study differences | Mainly the **fixed-effect model**, and **report the results of both models** (this chapter's example falls in this cell) |
| $P > 0.1$ and $I^2 > 50\%$ | The $Q$ test has too little power; heterogeneity is very likely being missed | Handle it by the size of $I^2$: go and look for the source of heterogeneity |
| $P < 0.1$ and $I^2 \le 25\%$ | There is statistical heterogeneity, but it is very small in size (with many studies $Q$ becomes significant easily) | Look at the **size** of the heterogeneity: use the **fixed-effect model** and say in the report that the two agree |
| $P < 0.1$ and $25\% < I^2 \le 50\%$ | Statistical heterogeneity is present | Use the **random-effects model** if the pooled result still has clinical meaning |
| $P < 0.1$ and $I^2 > 50\%$, heterogeneity is severe | The effect sizes of the studies are no longer on the same level | **Do not pool yet**; go and find the source of heterogeneity |

**What to do when the two criteria (the $P$ value of the $Q$ test and the descriptive $I^2$) give inconsistent
signals**: this is not a contradiction, it is two rulers of different precision measuring the same thing — the
$Q$ test has low power, while $I^2$ looks only at size and not at significance. In practice read them in this
order: **first look at $I^2$ to judge the size of the heterogeneity** ($\le 25\%$ negligible, $25\%\sim 50\%$
moderate, $> 50\%$ be cautious, $> 75\%$ generally not suitable for pooling), **then look at the $P$ value to
judge whether that heterogeneity has actually been detected**; when the two agree, follow the table, and when
they disagree, let $I^2$ lead and settle it with subject-matter knowledge, and **report the results of both
models**. So "this chapter's example has $P = 0.13 > 0.1$ yet uses a fixed-effect model" and "do not force a
pool when $I^2$ is large" do not conflict: for the former, $I^2 = 39.7\%$ is only moderate and the directions
agree, so a fixed-effect model is acceptable; the latter is talking about the situation where $I^2$ is above 75%
and the studies even point in opposite directions.

Three supplementary points:

- Mathematically, when $\tau^2 = 0$ the two models are equivalent, so the random-effects model is the more
  "general" one; but general does not mean better — when the studies really are homogeneous, using a
  random-effects model **throws away precision for nothing** (a wider interval) and actually lowers the power.
- **The model has to be fixed before you see the data, on subject-matter grounds.** You cannot treat
  fixed-effect and random-effects as a switch and report whichever one is significant. This is the same
  principle as not choosing one-sided versus two-sided tests after the fact.
- When reporting, it is best to **give the results of both models**. If they agree (both statistically
  significant, or both not), the conclusion is robust; if one is significant and the other is not, that has to
  be spelled out in the discussion — you must not report only the one that suits you.

<ClickAnswer>

**Think about it**: a meta-analysis gives $P = 0.02$ and $I^2 = 65\%$ on the heterogeneity test, so it switches
to a random-effects model, and the 95% confidence interval for the pooled OR excludes 1. Can you conclude from
this that "the intervention works"?

You cannot stop there. The heterogeneity test has already shown that the effect sizes of the studies are not on
the same level ($P = 0.02$), and $I^2 = 65\%$ means that about 65% of the total variation comes from real
differences between studies rather than from sampling error — this is **severe heterogeneity**. At that point
the very summary "average effect" is suspect: it may be a product of studies pointing in opposite directions
canceling each other out, and no concrete population may actually achieve that effect.

The right thing to do is: treat the pooled value as a clue rather than a conclusion, and then go and look for the
source of the heterogeneity — do **subgroup analyses** by population characteristics, intervention dose, length
of follow-up, or study-design quality; use the **leave-one-out method** to see whether the conclusion rests on
one or two studies; and if necessary use **meta-regression** to test whether some covariate explains part of the
heterogeneity. If no stratification removes the heterogeneity, then do the honest thing and give a qualitative
description only, rather than forcing a pooled value onto it.

</ClickAnswer>

### 4. Heterogeneity: the $Q$ test and $I^2$

**Heterogeneity**（异质性）means variation between studies. By statistical principle, **only homogeneous data can
be pooled**; otherwise the pooled "average effect" has no entity behind it. So analyzing heterogeneity is a step
meta-analysis cannot skip.

Heterogeneity has three sources:

| Source | Meaning | Example |
| --- | --- | --- |
| **Clinical heterogeneity** | Subjects, intervention, control, outcome, or setting differ | One study enrolls elderly severe patients, another young mild patients |
| **Methodological heterogeneity** | Study design and quality differ | One is truly randomized and double-blind, the other is only "convenience sampling" |
| **Statistical heterogeneity** | The observed effects vary more than chance alone would produce | This is what the $Q$ test and $I^2$ measure |

**Note the order**: statistical heterogeneity is only the last of the three. The first two have to be judged on
subject-matter grounds, and **that has to be thought through before any statistical test is run** — force
"apples and oranges" studies whose populations, interventions, and outcome definitions all differ into one
meta-analysis, and no amount of "non-significant" $Q$ will rescue it.

#### The $Q$ test (test for heterogeneity / test of homogeneity)

It is just a standard hypothesis test:

$$H_0:\ \theta_1 = \theta_2 = \cdots = \theta_k \quad(\text{the population effect values of the studies are the same})$$
$$H_1:\ \text{the population effect values of the studies are not all the same}$$

The test statistic is:

$$Q = \sum_i w_i\,(\hat\theta_i - \hat\theta)^2$$

It means "how far each study's effect size is from the pooled value, weighted". Under $H_0$, $Q$ follows a
$\chi^2$ distribution with $\nu = k-1$ degrees of freedom; look up the $\chi^2$ table for the $P$ value:

- $P \le \alpha$: reject $H_0$, the studies are **not homogeneous**, which supports the **random-effects model**;
- $P > \alpha$: do not reject $H_0$, the studies **are homogeneous**, which supports the **fixed-effect model**.

The larger $Q$ is, the smaller the corresponding $P$ value; $Q$ can only be non-negative and follows a
right-skewed $\chi^2$ distribution. The $P$ value is read exactly as in Chapter 7.

**The biggest fault of the $Q$ test is its low power.** The number of studies $k$ is usually only a few to a
dozen, so $Q$ has very little power and often fails to detect heterogeneity that really is there ($P > 0.05$).
Therefore:

> **You cannot assert that the studies are homogeneous just because the $Q$ test is not significant.** This is
> the same statement as "$P > 0.05$ only means you fail to reject $H_0$, not that $H_0$ holds" in Chapter 7.

It is precisely because $Q$ is not enough that the descriptive measure below exists.

#### The $I^2$ statistic

$$I^2 = \frac{Q - (k-1)}{Q} \times 100\%$$

$I^2$ means: **the percentage of the total variation that comes from between-study differences** (the rest is
attributed to within-study sampling error). It is not the size of "how much the studies differ" but a
**proportion**, so it carries no units of the original effect size, can be compared across questions, and is
more robust than $Q$.

Rule-of-thumb reading (the Chinese *Health Statistics* textbook gives 25% and 50% as the two cut-offs):

| $I^2$ | Degree of heterogeneity | What is usually done |
| --- | --- | --- |
| $\le 25\%$ | None or mild | Fixed-effect model |
| $25\% \sim 50\%$ | Moderate | Random-effects model if pooling still has clinical meaning |
| $> 50\%$ | Considerable | Be cautious; find the source first, then decide whether to pool |
| $> 75\%$ | Very large | Pooling directly is generally not advised |

A few reminders:

- $I^2$ itself is also uncertain (a confidence interval can be given for it), so **do not cling to the 25% and
  50% cut-offs**. $I^2 = 26\%$ and $I^2 = 24\%$ should not be handled in completely different ways.
- When reporting heterogeneity you should give $Q$, the degrees of freedom $df$, the $P$ value, and $I^2$
  **together** (plus $\tau^2$ under the random-effects model). Giving only $I^2$ is incomplete.
- **When heterogeneity is severe, the correct action is not to pool**, and instead to do subgroup analyses and
  sensitivity analyses by source, to consider a meta-regression on a covariate, or to give a qualitative
  description only.

### 5. How to read a forest plot

A **forest plot**（森林图）draws every study's effect size and confidence interval on one figure so that you can
see at a glance "do they point the same way, how precise are they, and what do they give together".

The data behind the figure below come from `Fleiss1993bin`, a data set built into R's `meta` package: 7 clinical
trials of aspirin for preventing death after myocardial infarction (Fleiss' classic 1993 example). There are two
good reasons to choose it: the data are public and ship with the package, so you can reproduce them exactly on
your own machine; and it happens to demonstrate several typical situations at once — lopsided weights, moderate
heterogeneity, and two models that differ slightly.

A forest plot looks like this (the columns are in the order they appear, left to right):

| Study | Aspirin group deaths/total | Placebo group deaths/total | **Weight** (fixed-effect model) | **OR** | **95% CI** |
| --- | --- | --- | --- | --- | --- |
| Study 1 | 49/615 | 67/624 | 3.2% | 0.72 | [0.49, 1.06] |
| Study 2 | 44/758 | 64/771 | 3.1% | 0.68 | [0.46, 1.01] |
| Study 3 | 32/317 | 38/309 | 1.8% | 0.80 | [0.49, 1.32] |
| Study 4 | 102/832 | 126/850 | 5.7% | 0.80 | [0.61, 1.06] |
| Study 5 | 85/810 | 52/406 | 3.2% | 0.80 | [0.55, 1.15] |
| Study 6 | 246/2267 | 219/2257 | 10.2% | 1.13 | [0.93, 1.37] |
| **Study 7** | 1570/8587 | 1720/8600 | **72.9%** | 0.89 | [0.83, 0.97] |
| **Pooled** | 2128/14186 | 2286/13817 | 100% | **0.90** | **[0.84, 0.96]** |

The annotation text under the figure (the parameters in the `forest()` call below are what make it actually
appear):

```
Heterogeneity: Tau^2 = 0.0096; Chi^2 = 9.95, df = 6 (P = 0.1269); I^2 = 39.7%
Test for overall effect (common effect): Z = -3.29 (P = 0.0010)
Test for overall effect (random effects): Z = -2.09 (P = 0.0365)
```

Element by element:

**1. Each row is one study, and the block of graphics on the far right is that row's data drawn out.**

- **The position of the point (square)** = that study's point estimate of the effect size. Study 1's square sits
  at 0.72.
- **The horizontal line = the 95% confidence interval of that study's effect size.** Study 1's line runs from
  0.49 to 1.06, and the longer the line, the less precise the study.
- **The area of the square = the study's weight.** The bigger the weight, the bigger the square. Study 7's
  square is clearly the largest, because it has 8587 + 8600 subjects and carries 72.9% of all the weight in the
  fixed-effect model; study 3 has only 317 + 309 subjects, a weight of 1.8%, and its square is so small you can
  barely see it. **So "a bigger square is more trustworthy" is not a metaphor — it is the weight made visible.**
- **The weight column also has to be read with an eye on which model's weights they are.** The forest plot
  labels the model used (here the header reads `MH, Fixed + Random, 95% CI`, meaning the Mantel-Haenszel method
  is used for the fixed effect and both the fixed and random models are shown). Switch to the random-effects
  model and the numbers in that column change: study 6 carries **10.2%** in the fixed-effect model and rises to
  **20.7%** in the random-effects model, while study 7 falls from **72.9%** to **35.8%** — because the
  random-effects model pushes the weights in the "leveling" direction (see the next section).
- **A horizontal line crossing the vertical line = this study on its own gives no statistically significant
  conclusion.** Studies 1 to 6 all have lines crossing OR = 1: for studies 1 to 5 one end of the confidence
  interval is below 1 and the other above it; study 6's interval is **[0.93, 1.37]**, and although its point
  estimate of 1.13 is above 1 and its direction really does go against the rest, the **interval crosses 1** (the
  lower limit 0.93 is still on the left of 1), so on its own this study also gives no statistically significant
  conclusion either, and must not be read as "study 6 shows aspirin is harmful". Only study 7's interval
  [0.83, 0.97] lies entirely to the left of 1 and is statistically significant on its own. **Six studies each
  fail to give a positive conclusion, yet together they do — this is the direct demonstration of how
  meta-analysis raises power.**

**2. The vertical line in the middle is the "no-effect line".** For OR and RR it is **1**; for MD, SMD, and RD
it is **0**. The line means "the two groups do not differ", and the horizontal axis is designed around it. The
two ends of the figure are also labeled `Favours [experimental]` and `Favours [control]` (or the actual group
names), telling you which side means which group does better — **these two labels default to empty strings and
only appear if you pass them in through `label.left` / `label.right` in `forest()`** (see the code in the next
section). In this example the left of the line means "the aspirin group has the lower risk of death".

**3. The diamond at the bottom is the pooled result, and it belongs to no single study.**

- **The center of the diamond** = the point estimate of the pooled effect size, **0.90** here.
- **The left and right corners of the diamond** = the two ends of the 95% confidence interval of the pooled
  effect size, **0.84** and **0.96** here. The wider the diamond, the wider the interval of the pooled result.
- **Whether the whole diamond lies entirely on one side of the vertical line** decides whether the pooled
  effect is statistically significant. Here the diamond lies wholly to the left of 1, so the pooled OR is not 1
  and aspirin may be considered to lower the risk of death after myocardial infarction.
- If the diamond straddles the vertical line, the pooled effect is not statistically significant — and in that
  case do not go looking for whether some individual study was significant; that is a misreading.

**4. The annotations under the figure have to be read properly.**

- The `Heterogeneity` line is the heterogeneity. In the RevMan5 layout it reads, in order: $\tau^2 = 0.0096$,
  $Q = 9.95$ (written `Chi^2`), the degrees of freedom $df = 6 = k-1$, $P = 0.1269$, and $I^2 = 39.7\%$. By the
  rule of thumb, $P = 0.1269 > 0.1$, yet $I^2 = 39.7\%$ is moderate heterogeneity — **the two criteria do not
  give entirely consistent signals, and this is exactly an instance of "do not cling to the dividing lines"**
  (see the criteria table in the previous section for how to handle it). Here the fixed-effect and
  random-effects models agree in direction but differ in value (see below).
- The `Test for overall effect` line is the test of the pooled effect size (equivalent to testing whether the
  pooled value equals the no-effect line): under the fixed-effect model $Z = -3.29$ and $P = 0.0010$; under the
  random-effects model $Z = -2.09$ and $P = 0.0365$. The $Z$ is negative because the OR is below 1 and the
  effect lies to the left of the no-effect line; for the conclusion you only need the magnitude and the $P$
  value.

**5. Lopsided weights mean a sensitivity analysis is mandatory.** Study 7 carries 72.9% of the weight, which is
another way of saying that this meta-analysis' conclusion is basically decided by that one study. Recompute with
study 7 removed and the point estimate barely moves (the pooled OR goes from 0.8969 to 0.9020), but **the
confidence interval and the significance do change**: the interval widens from [0.8405, 0.9570] to
[0.7965, 1.0214] and $P$ rises from 0.0010 to 0.1040, so the pooled result loses its statistical significance.
This is a **leave-one-out sensitivity analysis**, and one line of R, `metainf(m)`, does it (see the next
section). Ideally the conclusion does not change no matter which study is removed, and only then is it robust.

**6. Change the model and the "hardness" of the conclusion changes.** The same batch of data:

| Model | Pooled OR | 95% CI | $P$ (pooled effect) |
| --- | --- | --- | --- |
| Fixed effect (Mantel-Haenszel) | 0.90 | [0.84, 0.96] | 0.001 |
| Random effects (DerSimonian-Laird) | 0.88 | [0.77, 0.99] | 0.036 |

The point estimates are almost the same (0.90 and 0.88), but the random-effects interval is much wider and the
$P$ value goes from 0.001 to 0.036. **Notice that it is already right up against 0.05** — with a batch of data
showing more heterogeneity, you could easily get a disagreement where "the fixed-effect model is significant and
the random-effects model is not". That is why you report both models and spell the difference out in the
discussion. The concrete difference between the two models is worked through by hand in R in the next section.

### 6. Funnel plots and publication bias

#### Publication bias is the biggest threat to meta-analysis

The data of a meta-analysis come from **published literature**, and "positive results get published more easily,
negative results get left in the drawer" is the normal state of academia. If a meta-analysis includes only
published studies, its pooled effect will be systematically biased toward the positive.

Bias comes in more than one kind; broadly there are two layers:

| Source | Specific biases |
| --- | --- |
| **The primary literature of the included studies itself** | Selection bias, performance bias, attrition bias, measurement bias, reporting bias |
| **Newly introduced during the meta-analysis** | **Sampling bias**: publication bias, indexing bias, retrieval bias, citation bias, multiple-publication bias, English-language bias<br>**Selection bias**: inclusion-criteria bias, selector bias<br>**Within-study bias**: extractor bias, quality-scoring bias, reporting bias |

The countermeasures split in two. In the **searching stage**, search as many ways and through as many channels
as you can (several databases + hand searching + gray literature), and do a **quality assessment** of every
primary study included (internal validity: how close the result is to the truth; external validity: whether it
generalizes beyond the study subjects). In the **analysis stage**, use funnel plots, the fail-safe number, and
similar methods to check.

There is one more hard rule for reducing within-study bias: **two or more people should extract the data
independently under blinding**, using a pre-designed extraction form with uniform data and quality-assessment
standards.

#### How to read a funnel plot

A **funnel plot**（漏斗图）puts the **estimated effect size** on the horizontal axis and **precision** on the
vertical axis (commonly the standard error $SE$, or the sample size directly), and draws every study as a point.

The idea is straightforward: **the larger the sample, the more precise the effect-size estimate**. So

- the effect sizes of small studies scatter across the bottom of the figure, spread out widely left and right;
- the effect sizes of large studies gather at the top within a narrow range;
- **if there is no bias, these points should form a symmetric, inverted funnel.**

As soon as the shape is **clearly asymmetric**, bias may be present. The classic picture of publication bias is
**a piece missing from the bottom right corner**: among small studies, only the "positive" ones got published,
and the missing ones are all those small studies whose effect sizes lean toward "no effect".

A few things to watch when reading a funnel plot:

- **Asymmetry is not the same as publication bias.** The true effect in small studies may genuinely differ from
  that in large ones (for instance if they enroll more severely ill patients), study quality may be uneven, and
  intervention doses may differ — all of these produce asymmetry. A funnel plot suggests; it does not convict.
- **With too few studies a funnel plot is meaningless.** At least 10 or so studies are usually recommended
  before drawing one; this example has only 7, so the plot is only an illustration. This is also why so many
  meta-analyses include a funnel plot that ends up saying nothing.
- Besides eyeballing it, you can run a **statistical test**: Egger's linear regression, Begg's rank correlation,
  and the Harbord method for binary outcomes (`metabias()` in the `meta` package uses the Harbord method by
  default for OR). These tests have low power too, and $P > 0.05$ **does not prove** that there is no
  publication bias.

#### The fail-safe number

The fail-safe number ($N_{fs}$) answers a very practical question: **how many "negative" studies would it take
to overturn the positive conclusion we have now?**

$$N_{fs,\,0.05} = \left(\frac{\sum Z}{1.64}\right)^2 - S, \qquad N_{fs,\,0.01} = \left(\frac{\sum Z}{2.33}\right)^2 - S$$

Here $S$ is the number of studies and $Z$ is the $Z$ value of each independent study. **The larger the fail-safe
number, the more stable the conclusion**, and the harder it is for unpublished negative studies to overturn it.
It is a very crude but very intuitive measure, and can only be used as a supplement.

### 7. Common misuses of meta-analysis

This section matters more than the formulas above. There is nothing wrong with the method itself; what is wrong
is how it is used.

**Misuse 1: forcing studies with large heterogeneity together.**

Pooling anything as long as "it is the same research question and there is an effect size", without first
checking whether the populations, interventions, outcomes, and designs are comparable. This is the most serious
and most common error, nicknamed "apples and oranges". The consequence is an **average effect that corresponds
to no concrete population**. **How to tell**: when $I^2$ is very large (say > 75%), the studies point in
opposite directions, or they are obviously not comparable on subject-matter grounds, **do not pool** — do a
qualitative description or stratify instead.

**Misuse 2: pooling only the "significant" studies.**

Using "$P < 0.05$" as an inclusion criterion, or simply reporting the significant studies in the main text and
burying the negative ones in the supplementary material. This manufactures publication bias by hand, and the
pooled result necessarily exaggerates the effect. Inclusion criteria must be set by the **research question and
methodological quality**, never by the **results**.

**Misuse 3: treating a meta-analysis as "one bigger study".**

What is pooled is only the **summary results**, and that does not raise the quality of the primary data. If the
primary studies did not randomize properly, measured with bias, or lost a lot of subjects to follow-up, none of
those defects disappears after pooling. A meta-analysis is an observational study, and the strength of its
conclusions is on a par with a good observational study, not with a large randomized controlled trial.

**Misuse 4: not checking "is the conclusion carried by one study".**

When the weights are lopsided (say the 72.9% above), remove that one study and, while the point estimate may
barely move, **the confidence interval and the significance of the conclusion can change**: here, removing study
7 moves the pooled OR only from 0.8969 to 0.9020, yet the interval widens from [0.8405, 0.9570] to
[0.7965, 1.0214] and $P$ rises from 0.0010 to 0.1040. Without a sensitivity analysis, the reader has no way to
tell how fragile the pooled result is.

**Misuse 5: using the fixed-effect / random-effects choice as a switch to pick a significant result.**

On the same batch of data the two models often give one significant and one non-significant result (in the
earlier example the $P$ values were 0.001 and 0.036). Reporting whichever is significant is quietly enlarging
the significance level, and the conclusion is worthless. The model should be decided by the heterogeneity test
and subject-matter knowledge.

**Misuse 6: treating multiple reports of the same subjects as several independent studies.**

If one study was published twice in different journals, in different years, or in different languages, or if the
same cohort was analyzed repeatedly, and all of them are included, then those subjects are counted twice and
their weight is inflated out of nothing. **Meta-analysis requires the studies to be mutually independent**; when
this happens you can only keep the one report with the most complete information, or merge the multiple reports
into a single record.

**Misuse 7: incomplete searching and vague inclusion/exclusion criteria.**

Using only one or two databases, searching only Chinese or only English, or not searching the gray literature
causes sampling bias; writing vague inclusion and exclusion criteria (for instance "include studies of good
quality" without saying how that is judged) makes it impossible for others to reproduce, and makes it easy for
the person doing it to pick studies by their results.

**Misuse 8: mistaking statistical significance for clinical significance.**

That the 95% confidence interval of the pooled OR excludes 1 only says "statistically significant". Whether the
effect is worth adopting clinically also depends on whether it reaches the smallest difference considered
clinically meaningful — just as with a single study, a meta-analysis conclusion needs both sentences, the
statistical one and the subject-matter one.

## The basic steps of a meta-analysis

However complicated the method, in practice it comes down to these eight steps. The first five actually weigh
much more than the computing that follows.

1. **Pose the problem to be solved.** The problem can be large or small: causes and risk factors, prognosis
   estimation, evaluation of a diagnostic method, effectiveness of a treatment, and so on. The research question
   determines every search term and inclusion criterion that follows.
2. **Draw up a search strategy and collect the literature and data comprehensively.** Use many routes and many
   channels to maximize recall (several electronic databases, hand searching, citation chasing, gray
   literature). If recall is not high enough, everything pooled afterwards is built on fragmentary evidence.
3. **Set inclusion and exclusion criteria and drop the studies that do not qualify.** The criteria must be
   fixed before the results are seen, and written clearly and reproducibly.
4. **Select and extract the data.** Extract the result data, figures, and tables from the originals, using a
   uniform extraction form, with two or more people extracting independently under blinding and checking each
   other.
5. **Assess the quality of every study.** Usually look at these aspects: ① whether the subjects were really
   randomized; ② whether the groups were comparable at baseline apart from the study factor; ③ whether there
   was a systematic difference between groups caused by loss to follow-up, and whether the reasons for it were
   reported; ④ whether there was systematic error in measuring the outcome, whether the assessment of efficacy
   was blinded, and whether results were reported selectively.
6. **Statistical processing.** Three things: the **test of homogeneity** (the $Q$ test, $I^2$), **choosing a
   suitable statistical model** (fixed effect or random effects), and the **statistical inference on the pooled
   effect size** (the pooled value and its confidence interval).
7. **Sensitivity analysis.** Change the inclusion criteria, remove low-quality studies, or switch to a different
   statistical method or model, and watch how the pooled measure moves. If removing one paper changes the pooled
   measure markedly, the conclusion is sensitive to that paper. The most common approaches are stratified
   analysis (group by study characteristics, pool each group, and compare the groups) and the leave-one-out
   method.
8. **Write up the report.** Interpret the results and give the conclusion and an appraisal. The results must not
   only be statistically significant; they must also be judged against subject-matter knowledge for
   **practical significance**.

> An ideal meta-analysis should include **all** the relevant literature available, the included literature
> should be **high-quality homogeneous** studies, there should be **no publication bias**, and it should use a
> **suitable model** and correct statistical methods.

<ClickAnswer>

**Think about it**: of the eight steps above, which one is "the most important"?

In terms of technical content it is step 6 — the statistical processing decides how the final number is
computed. But from the point of view of how reliable the conclusion is, **steps 2, 3, 4, and 5 are the
decisive ones**: an incomplete search (step 2) brings sampling bias; vaguely written inclusion criteria (step 3)
make the selection of studies irreproducible; a slip in data extraction (step 4) directly contaminates every
later computation; and poor primary-study quality (step 5) means that even the most refined pooling is built on
quicksand.

Statistical methods can only guarantee that "the arithmetic is right"; they cannot guarantee that "what is being
computed is right". A meta-analysis with an incomplete search and out-of-control quality is only making its
errors more refined by using a fancier model.

</ClickAnswer>

<TrackList :tasks="['Explain what this chapter is for: why combine quantitatively instead of counting papers', 'Tell the data types apart and choose the right effect size (MD / SMD / OR / RR / RD)', 'Write down H0 and H1 for the test of heterogeneity and compute Q and I2', 'Decide from the heterogeneity test whether a fixed-effect or a random-effects model applies', 'Point out the weight, the point estimate, the confidence interval, the no-effect line, and the pooled diamond on a forest plot', 'Draw a funnel plot and say what it suggests and what it cannot suggest', 'List at least three common misuses of meta-analysis']" />

## Doing it in R

The software commonly used for meta-analysis includes RevMan (free software from the Cochrane
Collaboration), Stata, R, CMA, SAS, SPSS, and others. R's advantages are that the algorithms are transparent,
you can recompute every step yourself, and the figures can be adjusted directly. Everything below uses the
public data sets **bundled with** the `meta` package; no private data is touched.

### 0. Install the package, and first see what data it contains

```r
install.packages("meta")     # install once only
library(meta)

data(package = "meta")       # list every data set bundled with the meta package
```

`data(package = "meta")` opens a table in RStudio listing the data set names and a one-line description. This
chapter uses two:

- `Fleiss1993bin` — binary outcome: 7 trials of aspirin for preventing death after myocardial infarction;
- `Fleiss1993cont` — continuous outcome: 5 studies of the effect of psychotherapy on medical utilization.

Start by using `names()` and `?` to see the column names and what they mean. **Do not skip this step** — column
names can differ between package versions:

```r
data(Fleiss1993bin)
names(Fleiss1993bin)
# [1] "study"  "year"   "d.asp"  "n.asp"  "d.plac" "n.plac"
```

| Column | Meaning |
| --- | --- |
| `study` | Study identifier (the study label on the left of the forest plot) |
| `year` | Year of publication |
| `d.asp` | Deaths (events) in the aspirin group |
| `n.asp` | Total subjects in the aspirin group |
| `d.plac` | Deaths (events) in the placebo group |
| `n.plac` | Total subjects in the placebo group |

> **Take the column names from the output of `names()`, not from memory or from a tutorial.** The `meta`
> package has adjusted column and argument names across versions; on a different machine or a different version,
> the first thing to do is look at `names(dataset)` and `?function` and line up the code that follows.

### 1. Binary data: `metabin()`

Hand the four columns of data, the study labels, and the effect-size type to `metabin()`:

```r
data(Fleiss1993bin)

m <- metabin(d.asp, n.asp,          # trial group: events, total
             d.plac, n.plac,        # control group: events, total
             data = Fleiss1993bin,
             studlab = paste(study, year),   # study label
             sm = "OR",             # effect size: "RR" or "RD" also work
             method.tau = "DL",     # random effects: estimate tau^2 by DerSimonian-Laird
             keepdata = TRUE)       # keep the raw data; metareg() needs it later

summary(m)
```

`sm` is the effect-size choice from the previous section: `"OR"` (odds ratio), `"RR"` (relative risk), `"RD"`
(risk difference). The default pooling method is `method = "MH"` (Mantel-Haenszel), and it **gives both the
fixed-effect and the random-effects results** so that you can compare them.

**`method.tau = "DL"` is one version difference that has to be spelled out.** The pooled value from a
random-effects model depends on how the between-study variance $\tau^2$ is estimated, and the default in the
`meta` package has changed across versions: older versions (the 4.x / 5.x era) defaulted to the
**DerSimonian-Laird (DL)** method, as RevMan does, while the 8.x versions have switched the default to
**`"REML"` (restricted maximum likelihood)**. `settings.meta()$method.tau` shows you which one the current
version uses (8.5-0 returns `"REML"`). This is not a difference in the last decimal place: on the same batch of
data the REML default gives OR = 0.8683, 95% CI [0.7559; 0.9973], $P = 0.0457$, $\tau^2 = 0.0147$, which does
not match the **0.88 [0.77; 0.99], $P = 0.036$, $\tau^2 = 0.0096$** on this chapter's forest plot. So
`method.tau = "DL"` is written out **explicitly** here, and readers who copy it can reproduce every number in
this chapter.

The output is as follows (`meta` 8.5-0, R 4.6.1):

```
                OR           95% CI %W(common) %W(random)
MRC-1 1974  0.7197 [0.4890; 1.0593]        3.2        8.2
CDP 1976    0.6808 [0.4574; 1.0132]        3.1        7.8
MRC-2 1979  0.8029 [0.6065; 1.0629]        5.7       13.2
GASP 1979   0.8007 [0.4863; 1.3186]        1.8        5.4
PARIS 1980  0.7981 [0.5526; 1.1529]        3.2        8.9
AMIS 1980   1.1327 [0.9347; 1.3728]       10.2       20.7
ISIS-2 1988 0.8950 [0.8294; 0.9657]       72.9       35.8

Number of studies: k = 7
Number of observations: o = 28003 (o.e = 14186, o.c = 13817)
Number of events: e = 4414

                         OR           95% CI     z p-value
Common effect model  0.8969 [0.8405; 0.9570] -3.29  0.0010
Random effects model 0.8763 [0.7743; 0.9917] -2.09  0.0365

Quantifying heterogeneity (with 95% CIs):
 tau^2 = 0.0096; tau = 0.0982; I^2 = 39.7% [0.0%; 74.6%]; H = 1.29 [1.00; 1.99]

Test of heterogeneity:
    Q d.f. p-value
 9.95    6  0.1269

Details of meta-analysis methods:
- Mantel-Haenszel method (common effect model)
- Inverse variance method (random effects model)
- DerSimonian-Laird estimator for tau^2
- Mantel-Haenszel estimator used in calculation of Q and tau^2 (like RevMan 5)
- Calculation of I^2 based on Q
```

How to read it:

- **The first part (the table with `OR`, `95% CI`, `%W(common)`, `%W(random)`) is each study's own result**, and
  the numbers line up one for one with the table in the forest-plot section above; the row names are the study
  labels given by `studlab`. `%W(common)` is the study's weight percentage in the fixed-effect model — ISIS-2,
  the largest contributor, carries 72.9% (in older versions this column may be called `%W(fixed)`) — and
  `%W(random)` is the same study's weight in the random-effects model.
- All 7 studies are listed, so the first column shows **AMIS 1980 with OR = 1.1327 and 95% CI
  [0.9347; 1.3728]** — the lower limit 0.9347 is below 1, so this study on its own does not give a
  statistically significant conclusion.
- **The `Common effect model` row is the pooled result of the fixed-effect model**: OR = 0.8969 (about 0.90),
  95% CI [0.8405; 0.9570] (about [0.84, 0.96]). The interval excludes 1, so pooled under the fixed-effect model
  the risk of death in the aspirin group is significantly lower than in the placebo group.
- **The `Random effects model` row is the pooled result of the random-effects model**: OR = 0.8763 (about
  0.88), 95% CI [0.7743; 0.9917] (about [0.77, 0.99]). The point estimate is almost the same as the
  fixed-effect one, but the interval is much wider.
- **The `Quantifying heterogeneity` and `Test of heterogeneity` blocks are the heterogeneity**: $\tau^2 =
  0.0096$, $Q = 9.95$, $df = 6$, $P = 0.1269$, $I^2 = 39.7\%$. The degrees of freedom of $Q$ are exactly
  $k-1 = 6$, which tells you there are 7 studies. The $\tau$, $H$, and the confidence intervals in brackets are
  new in the 8.x versions; older versions do not have them.
- **The `Details of meta-analysis methods` block says which methods were used** — here it explicitly says
  `DerSimonian-Laird estimator for tau^2`, which is the effect of `method.tau = "DL"`; drop that argument and
  this line becomes `Restricted maximum-likelihood estimator for tau^2`.
- **In the `p-value` column, the fixed-effect model gives $z = -3.29$ and $P = 0.0010$** — this is the test of
  the pooled effect size (testing whether the pooled value equals the no-effect line); the random-effects model
  gives $z = -2.09$ and $P = 0.0365$.

> `metabin()` defaults to `method = "MH"`, meaning the Mantel-Haenszel method for the fixed effect and inverse
> variance weighting for the random-effects part. Which estimator is used for $\tau^2$ is decided by
> `method.tau` — **the 8.x versions default to `"REML"` and older versions default to `"DL"`**, and this chapter
> writes `method.tau = "DL"` explicitly to match the numbers on the forest plot. To switch the fixed-effect
> pooling to inverse variance, add `method = "Inverse"`; to use the Peto method (only available for OR), add
> `method = "Peto"`.

### 2. Forest plot, funnel plot, and sensitivity analysis

```r
# Forest plot: square size = weight, horizontal line = CI, bottom diamond = pooled result
forest(m, layout = "RevMan5",          # the classic Cochrane review layout
       test.overall = TRUE,            # draw the line with the test of the pooled effect
       label.left  = "Favours [experimental]",
       label.right = "Favours [control]")

funnel(m)                 # funnel plot: effect size on the x axis, standard error on the y axis
metabias(m, k.min = 1)    # test for funnel-plot asymmetry (Harbord is the default for OR; see k.min below)
metainf(m)                # leave-one-out sensitivity analysis: drop one study at a time and watch the pooled result
```

- `forest()` draws exactly the figure discussed in the previous section. **The area of the squares in the figure
  is proportional to the weight**, which is the quickest way to see at a glance who is running the conclusion.
  The three arguments in that call are all there to make the annotations from the previous section actually
  appear, and **none of them is a default**:
  - `layout = "RevMan5"` switches to the classic Cochrane review layout, which is what makes the heterogeneity
    line read `Heterogeneity: Tau^2 = …; Chi^2 = …, df = … (P = …); I^2 = …` with `Chi^2` and `df` in it, and
    what makes the header show model information such as `MH, Fixed + Random, 95% CI`;
  - `test.overall = TRUE` is what draws the `Test for overall effect` line — **by default
    `test.overall = FALSE` and there is no such line on the figure at all**;
  - `label.left` / `label.right` are what write `Favours [experimental]` / `Favours [control]` at the two ends
    of the horizontal axis — **by default both are empty strings and nothing is written at either end**.

  With no arguments at all, just `forest(m)`, the only annotation under the figure is
  `Heterogeneity: I^2 = 39.7%, tau^2 = 0.0096, p = 0.1269` (the default layout uses $I^2$, $\tau^2$, and the $P$
  value of $Q$, and does not list $Q$ and $df$). The two weight columns `W(common)` and `W(random)` are there by
  default — a study's percentage can differ between the two columns, because the two models use different
  formulas for the weights. The layout can also be changed: `forest(m, layout = "meta")` goes back to the
  default layout, `forest(m, layout = "JAMA")` switches to another journal layout, and
  `forest(m, sortvar = w.common)` sorts by weight (`sortvar` accepts column names such as `year`, `TE`,
  `w.common` directly).
- `funnel(m)` draws the funnel plot, with the standard error on the vertical axis by default; the higher a point
  sits, the more precise it is (that is, the larger the sample). To put the sample size on that axis instead,
  write `funnel(m, yaxis = "size")`; **the accepted values of this argument have changed between versions, so
  look at `?funnel.meta` first**, and if it errors, go by the values the documentation lists.
- `metabias(m)` runs the statistical test for funnel-plot asymmetry (`method.bias` can be `"Egger"`, `"Begg"`,
  `"Harbord"`, and so on; **for OR the default is the Harbord method**). **Note that it defaults to
  `k.min = 10`: with fewer than 10 studies it flatly refuses to compute.** This example has only 7, so if you
  write just `metabias(m)` without passing `k.min`, nothing at all appears on screen, only a warning:

  ```
  Warning message:
  Number of studies (k=7) too small to test for small study effects (k.min=10).
  Change argument 'k.min' if appropriate.
  ```

  This is deliberate protection by the `meta` package, not an error. To see the numbers you have to lower that
  threshold — `metabias(m, k.min = 1)` gives the Harbord method's $t = -0.92$, $df = 5$, $P = 0.3991`;
  `method.bias = "Egger"` gives $P = 0.3992$ and `method.bias = "Begg"` gives $P = 0.1765$. **But this test has
  little power to begin with, and with 7 studies it can say essentially nothing**, so $P > 0.05$ cannot be taken
  as evidence that there is no publication bias.
- `metainf(m)` runs the leave-one-out sensitivity analysis, and its output gives the pooled effect size after
  removing each study in turn. In this example, removing study 7 (ISIS-2 1988), which carries far more weight
  than the rest, barely moves the point estimate (0.8969 → 0.9020), but the confidence interval widens from
  [0.8405, 0.9570] to [0.7965, 1.0214] and $P$ rises from 0.0010 to 0.1040 — **so the conclusion "statistically
  significant" does not survive**. This is the classic signal that the conclusion is dominated by a single
  study, and it should be spelled out when the report is written.

Subgroup analysis passes a grouping variable through the `subgroup =` argument. Below, the studies are split
into two groups by sample size, to see whether the heterogeneity comes from "study size":

```r
Fleiss1993bin$size <- ifelse(Fleiss1993bin$n.asp >= 500, "large study", "small study")

m.sub <- metabin(d.asp, n.asp, d.plac, n.plac,
                 data = Fleiss1993bin,
                 studlab = paste(study, year),
                 sm = "OR",
                 method.tau = "DL",    # written out explicitly too, to stay consistent with m above
                 subgroup = size)

forest(m.sub)          # subgroup forest plot: one pooled diamond per group, plus an overall pooled result
```

If the variable to be tested is a **continuous** covariate (year of publication, say), use
**meta-regression**:

```r
metareg(m, ~ year)     # does year of publication explain part of the heterogeneity? (needs the data kept in the object)
```

In the output of `metareg()` look at two things: the regression coefficient (how much $\ln OR$ changes for each
later year of publication) and its $P$ value; and $R^2$ (how much of the between-study variance this covariate
explains). **Note**: meta-regression has essentially no power when there are fewer than 10 studies, and the
results it reports are mostly unreliable.

### 3. Quantitative data: `metacont()` and choosing between MD and SMD

For a continuous outcome, switch to `metacont()`, with the arguments corresponding one for one:

```r
data(Fleiss1993cont)
names(Fleiss1993cont)
# [1] "study"     "year"      "n.psyc"    "mean.psyc" "sd.psyc"   "n.cont"
# [7] "mean.cont" "sd.cont"

mc <- metacont(n.psyc, mean.psyc, sd.psyc,     # trial group: n, mean, SD
               n.cont, mean.cont, sd.cont,     # control group: n, mean, SD
               data = Fleiss1993cont,
               studlab = paste(study, year),
               sm = "MD")                      # "SMD" also works

mc                       # MD is the default
update(mc, sm = "SMD")   # same data, switched to the standardized mean difference: watch the pooled value move
forest(update(mc, sm = "SMD"))
```

Key points:

- **The pooled value from `sm = "MD"` carries the original units** and reads directly as "the trial group is on
  average lower than the control group by so many original units"; **the pooled value from `sm = "SMD"` has no
  units** and is "so many pooled standard deviations apart", which cannot be read as so many points of
  difference.
- For the same `mc` object, `update()` is the handiest way to change `sm`; you do not have to rewrite the call.
- After switching `sm` the **direction of the conclusion usually does not change, but the numbers cannot be
  compared in size** — MD and SMD are two different rulers.
- Whether MD or SMD, the no-effect line is **0**; for OR and RR it is **1**. Think this through before drawing
  anything.

### 4. Work through $Q$ and $I^2$ by hand, so they are not a black box

The heterogeneity numbers in `summary(m)` can be computed yourself. Go through them with `Fleiss1993bin`
(take logarithms of the ORs first):

```r
d <- Fleiss1993bin

or.i <- with(d, (d.asp / (n.asp - d.asp)) / (d.plac / (n.plac - d.plac)))
y    <- log(or.i)                                  # lnOR of each study
v    <- with(d, 1/d.asp + 1/(n.asp - d.asp) +
                1/d.plac + 1/(n.plac - d.plac))     # variance of lnOR
w    <- 1 / v                                      # inverse-variance weights

y.bar <- sum(w * y) / sum(w)                       # weighted average (fixed-effect pooling)
Q     <- sum(w * (y - y.bar)^2)                    # Q statistic
k     <- nrow(d)

exp(y.bar)                     # pooled OR: 0.897
Q                              # 9.95, matching the Q in summary(m)
1 - pchisq(Q, df = k - 1)      # 0.127, P > 0.1
(Q - (k - 1)) / Q * 100        # 39.7, the I^2 percentage
```

These few lines map onto several concepts; match them up one by one:

- `Q` is $Q = \sum w_i(\hat\theta_i - \hat\theta)^2$. Under $H_0$ it follows a $\chi^2$ distribution with $k-1$
  degrees of freedom, so `1 - pchisq(Q, df = k - 1)` is the $P$ value — **the test for heterogeneity is
  essentially a $\chi^2$ test**.
- `(Q - (k-1)) / Q * 100` is the definition of $I^2$; it comes out at 39.7%, the same as the number reported by
  `summary(m)`.
- `y.bar` is the inverse-variance weighted pooled value; here it comes out at about 0.897, almost the same as
  the 0.897 from the Mantel-Haenszel method — but the two are **different algorithms**, and the results will not
  always be this close.

While we are at it, compute the random-effects model's $\tau^2$ too, so that the difference between the two
models is fully clear:

```r
tau2   <- max(0, (Q - (k - 1)) / (sum(w) - sum(w^2)/sum(w)))   # DerSimonian-Laird
w.star <- 1 / (v + tau2)                                       # random-effects weights
y.star <- sum(w.star * y) / sum(w.star)

tau2                                    # 0.0096, the tau^2 of the heterogeneity line
exp(y.star)                             # pooled random-effects OR: 0.876
exp(y.star + c(-1, 1) * 1.96 / sqrt(sum(w.star)))   # 95% CI: 0.77 ~ 0.99
```

Compare the two and it becomes clear: **the fixed-effect weights are $1/v_i$ and the random-effects weights are
$1/(v_i+\tau^2)$.** The $\tau^2$ adds the same chunk of variance to every study; for a small study, whose
variance is already large, the addition is not noticeable, while the small variance of a large study gets a big
chunk added to it — so the large studies' weights are pushed down, the small studies' weights are pushed up, the
studies are "leveled out", and the interval of the pooled result widens accordingly. That is the whole reason
the result goes from 0.90 [0.84, 0.96] to 0.88 [0.77, 0.99].

## Common pitfalls

- **Concluding that "the studies are homogeneous" because the $Q$ test is not significant, and then confidently
  using the fixed-effect model.** The $Q$ test has very low power, especially when there are only three or five
  studies, and it often fails to detect heterogeneity that really is there. $P > 0.05$ only means you fail to
  reject $H_0$, which is a different thing from "proving the studies are homogeneous". To judge heterogeneity
  you have to **look at the $P$ value of $Q$, at $I^2$, and at $\tau^2$ together, and bring in subject-matter
  knowledge** — never a single $P$ value.
- **Interpreting SMD as "how many points apart".** SMD is the **dimensionless** result of dividing the
  difference by the pooled standard deviation; $SMD = 0.5$ means "the two groups are 0.5 pooled standard
  deviations apart", not "0.5 points apart". When the scales and units are the same you should use MD; only use
  SMD when the scales genuinely cannot be made uniform, and say so when you report it.
- **Interpreting OR as RR.** An OR is always further from 1 than the RR. When the outcome is not rare (a control
  incidence of 30%, say), an $OR = 2.0$ corresponds to an RR of only **1.54** — solving
  $OR = \dfrac{p_1/(1-p_1)}{p_0/(1-p_0)}$ backwards gives a trial-group incidence of 46.15% and
  $RR = 0.4615/0.30 = 1.5385$ — so saying "the risk doubles" is an exaggeration. Only when the outcome is rare
  is $OR \approx RR$.
- **Asserting "there is publication bias" as soon as a funnel plot is asymmetric.** An asymmetric funnel plot
  can also come from small studies whose true effect genuinely differs, from uneven study quality, or from
  inconsistent intervention doses. And with fewer than 10 studies a funnel plot is basically of no reference
  value. Nor does $P > 0.05$ on `metabias()` prove that there is no bias.
- **Not checking "how much of the conclusion is being held up by one study".** When the weights are lopsided
  (in the example above one study carries 72.9%), removing that study may leave the point estimate looking
  unchanged, while the confidence interval and the significance do change: here, after removing study 7 the
  pooled OR moves only from 0.8969 to 0.9020, yet the interval stretches from [0.8405, 0.9570] to
  [0.7965, 1.0214] and $P$ rises from 0.0010 to 0.1040, so the conclusion "statistically significant" no longer
  holds. Without running `metainf()` and doing a sensitivity analysis, the reader has no way to judge how stable
  the pooled result is.
- **Switching models to chase significance.** If the fixed-effect model is not significant, switch to random
  effects; if random effects is not significant, switch to fixed effect; report whichever is significant — that
  is retrospectively changing the decision criterion. The model has to be fixed before the analysis, on the
  basis of the heterogeneity test and subject-matter knowledge, and **the results of both models have to be
  reported**.

::: warning One more prerequisite pitfall
The premise of a meta-analysis is that "the included studies are clinically comparable". If the populations,
interventions, controls, outcome definitions, or follow-up times differ absurdly in any one respect, the pooled
average effect has no entity behind it — this is the "apples and oranges" problem, and no statistical method can
rescue it.

There are two further hard operational requirements: **the inclusion and exclusion criteria must be fixed and
written clearly before the results are seen** (otherwise it is easy to pick studies by their results); and
**data extraction should be done by two or more people independently under blinding** (otherwise extractor bias
contaminates the data directly). If these two are not done properly, no amount of refinement in the arithmetic
afterwards means anything.
:::

## How it connects to the other courses

::: tip Related pages
- **[*Introduction to Information Technology*, Lecture 3, Arrays and Data Frames](/en/intro-it/3-arrays-and-data-frames)** — the input data of a meta-analysis is just a tidy data frame: **one row per study, one column per variable**. `Fleiss1993bin` has exactly that shape — the six columns `study`, `year`, `d.asp`, `n.asp`, `d.plac`, `n.plac`, and 7 rows. The four arguments in `metabin(d.asp, n.asp, d.plac, n.plac, data = Fleiss1993bin)` are in fact just four column names. What that lecture drills — taking a vector by column name, subsetting by condition, and using `names()` to see the structure — is here the whole of data preparation; and `data(package = "meta")` is that lecture's "how do you see what is inside an object" applied to a data package.
- **[*Medical Big Data Analysis and Decision Making*, Week 2, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)** — this chapter is about "how to combine once things are tidy"; that week is about "**how to get it into a shape that can be combined**". The exercises in that week work through measures of central tendency and dispersion, correlation analysis, attribute-column handling, equal-width and equal-frequency binning, and min-max and Z-score normalization — all of them ways of turning a raw table into something **tidy, of uniform scale, and ready to feed into the next computation**. Data from several studies likewise has to become such a tidy table before combining means anything: **one row per study, one column per variable**, continuous outcomes recorded as "mean ± standard deviation" and binary outcomes as "events / total", the two reporting styles stored separately, and variable names and units lined up before pooling. **If the preprocessing is not done well, what a meta-analysis pools is garbage in, garbage out** — which echoes the point this chapter keeps making, that "a meta-analysis cannot remove the defects of the primary studies".
- **[*Health Statistics*, Chapter 6, Parameter Estimation](/en/Health-statistics/06-estimation)** — what a meta-analysis pools is precisely **the effect sizes the studies report together with their interval estimates**: each study contributes a point estimate and a 95% confidence interval, the forest plot draws these "points + intervals" side by side, and they are then averaged by weight to give a new point estimate and a new interval. So the reason the weight is the reciprocal of the variance is the point Chapter 6 makes: the smaller the standard error, the more precise the estimate, and a precise study has more say when they are pooled. Conversely, Chapter 6's reading of confidence intervals has to be upheld here as well: a 95% confidence interval says "in repeated sampling, 95% of the intervals will cover the true value", not "there is a 95% probability that the true value falls in this range"; and **"averaging" the confidence intervals of several studies does not cancel out the design defects of the primary studies either**.
- **[*Health Statistics*, Chapter 7, Hypothesis Testing](/en/Health-statistics/07-hypothesis-testing)** — the test for heterogeneity is a standard hypothesis test: $H_0$ is "the population effect values of the studies are the same", and under $H_0$ the statistic $Q$ follows a $\chi^2$ distribution with $k-1$ degrees of freedom; the $P$ value is read exactly as in Chapter 7 ($P \le \alpha$ rejects $H_0$ and supports the random-effects model). What this chapter calls "the $Q$ test has low power and often fails to detect heterogeneity when there are few studies" is Chapter 7's **Type II error** — the difference really is there, it simply was not detected this time, so "$P > 0.05$" cannot be taken as evidence that "the studies are homogeneous". Also, the `Test for overall effect` at the bottom of the forest plot is a $z$ test, and its no-effect line (0 or 1) plays the role of $\mu_0$ in Chapter 7.
- **[*Introduction to Information Technology*, Lecture 14, Tests of Homogeneity and Contingency Tables](/en/intro-it/14-goodness-of-fit-and-contingency)** — in a meta-analysis of binary data, **every study is a $2\times2$ table** ($a_i, b_i, c_i, d_i$), and the OR is the odds ratio of that table. `chisq.test()` answers "are the two variables in this one table associated?", whereas a meta-analysis has to answer "can several such tables be summarized by one common OR?" — and that step is the $Q$ test. The $\chi^2$ distribution used by the $Q$ statistic is the very distribution behind the $\chi^2$ test in that lecture; `1 - pchisq(Q, df = k - 1)` is the same function as the `pchisq()` used there to compute a $P$ value.
- **[*Introduction to Information Technology*, Lecture 10, Low-Level Plotting Functions](/en/intro-it/10-plot-functions)** — a forest plot and a funnel plot are both drawn out of "points + line segments": each study's **point** is its effect size, the **segment** is its confidence interval, that no-effect line is just an `abline(v = 1)`, and the diamond at the bottom is a polygon joining four coordinate points. `points()`, `lines()`, and `abline()` — the **low-level plotting functions** — are exactly what that lecture covers; Lecture 9, [Base Graphics](/en/intro-it/9-base-graphics), covers the high-level functions that draw a whole figure in one call, such as `hist()`, `barplot()`, `pie()`, and `boxplot()`, and has no `points()` or `abline()` in it, while `segments()` and `polygon()` are not taught anywhere in this course. `forest()` and `funnel()` have drawn it for you already, but seeing through to this construction is what tells you why "a bigger square is more trustworthy" and "a more asymmetric funnel is more suspicious" — they are statistical meanings expressed in the same plotting grammar.
:::

<!-- Back-link suggestions
It is suggested that these pages link back here:
1. At the summary of data frame structure in `/intro-it/3-arrays-and-data-frames`, add "for how to combine the results of several studies quantitatively once they have been arranged into one data frame, see Chapter 16, Meta-Analysis, in Health Statistics".
2. Where `/Medical-Big-Data-Analysis/2-data-preprocessing` discusses "merging data from several sources / aligning variables / unifying units", add "for quantitative combining once the data has been arranged into a tidy table, see Chapter 16 (Meta-Analysis) in Health Statistics".
3. At the summary of confidence intervals in `/Health-statistics/06-estimation`, add "for weighting the point estimates and confidence intervals of several studies into one new point estimate and interval, see Chapter 16, Meta-Analysis".
4. At the "summary of this lecture" in `/Health-statistics/07-hypothesis-testing`, add "for the test of whether the effect sizes of several studies are homogeneous (the Q test) and the choice between fixed-effect and random-effects models, see Chapter 16, Meta-Analysis".
5. Where `/intro-it/14-goodness-of-fit-and-contingency` discusses $2\times2$ tables and the odds ratio, add "for how to combine several $2\times2$ tables into one OR, see Chapter 16 in Health Statistics".
6. Where `/intro-it/10-plot-functions` discusses points() / abline(), add "a forest plot and a funnel plot are this way of drawing combined in a meta-analysis, see Chapter 16 in Health Statistics".
-->

## Summary

- **Meta-analysis is the systematic, quantitative synthesis of the results of several independent studies on the same research question**, its purposes being to raise power, to resolve contradictions between studies, and to answer questions no single study can answer. Its units of study are **published results**, so in nature it is an **observational study** and it cannot remove the bias in the primary studies — garbage in, garbage out.
- **The effect size is chosen by data type**: for quantitative data use **MD** (same scale) or **SMD** (different scales, dimensionless, not to be read as "how many points apart"); for qualitative data use **OR** (case-control, rare outcomes, the most general), **RR** (incidence available, intuitive to interpret), or **RD** (absolute effect, permits the NNT). OR and RR have to be **logged** before pooling. No-effect lines: **MD, SMD, and RD are 0; OR and RR are 1**.
- **The fixed-effect model assumes the studies estimate one population effect**, with differences coming only from sampling error, and takes the reciprocal variance as the weight; **the random-effects model assumes the true values of the studies themselves differ** (the between-study variance $\tau^2$), so the weights become $1/(v_i+\tau^2)$ and are "leveled out", giving a wider and more conservative interval. **Which to choose is decided by the heterogeneity test**: use fixed effect when $I^2 \le 25\%$; use random effects when there is moderate heterogeneity and pooling still has clinical meaning; **do not pool when heterogeneity is severe ($I^2 > 50\%$)** — go and find the source (subgroup analysis, sensitivity analysis, meta-regression). The $P$ value and $I^2$ in the criteria table are two rulers of different precision: **$I^2$ measures the size of the heterogeneity, while the $P$ value says whether that heterogeneity has been detected**; when the two signals disagree, let $I^2$ lead and settle it with subject-matter knowledge (this chapter's example, with $P = 0.13$ and $I^2 = 39.7\%$, falls in the cell "mainly fixed effect, report both models"). The model cannot be used as a switch, and the results of both models have to be reported.
- **Heterogeneity has two rulers**: the $Q$ test is a hypothesis test with $Q \sim \chi^2_{k-1}$, and the larger $Q$ the smaller $P$, but it **has low power**, and non-significance does not mean homogeneity; $I^2 = (Q-(k-1))/Q$ is the percentage of the total variation that comes from between-study differences, $\le 25\%$ negligible, $> 50\%$ requiring caution, $> 75\%$ generally unsuitable for pooling. Both have to be read together with subject-matter knowledge.
- **Four things on a forest plot**: the position of a small square is the point estimate, **the size of the square is the weight**, the horizontal line is the confidence interval, and the vertical line in the middle is the no-effect line; the **diamond at the bottom is the pooled result**, its center the pooled value and its two corners the ends of the confidence interval, and only a diamond lying wholly clear of the vertical line is statistically significant. When the weights are lopsided a sensitivity analysis is mandatory.
- **A funnel plot checks for publication bias**: with no bias it should be a **symmetric inverted funnel**, and clear asymmetry suggests possible bias (though it may have other causes too, and with fewer than 10 studies it is basically of no reference value); the fail-safe number says "how many negative studies would it take to overturn the present conclusion", and the larger it is the more stable the conclusion.
- **The two commonest misuses**: **forcing together** studies with large heterogeneity (apples and oranges), and pooling only the "significant" studies (manufacturing publication bias by hand). Also to be watched for: treating a meta-analysis as "one bigger study", treating multiple reports of the same subjects as independent studies, picking a model after the fact to chase significance, and mistaking statistical significance for clinical significance.
