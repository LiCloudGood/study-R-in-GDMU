---
layout: doc
title: '17. Sample Size Estimation'
---

# Chapter 17. Sample Size Estimation

::: info Translation status
Translated from the [Chinese original](/Health-statistics/17-sample-size). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Before the study even begins, answer one question you cannot dodge: how many people must be
> surveyed, how many cases treated, how many pairs observed? This chapter turns "enough" into a number
> you can actually compute.

## What this chapter is for

The three questions that come up first in research — and that are hardest to answer to anyone's
satisfaction:

- In a sample survey, how many people must be drawn before the prevalence or the mean height you
  compute can be pushed onto the whole community?
- In a clinical trial, how many cases must each group treat before you can say with confidence that
  the new drug and the conventional therapy "differ"?
- The data are already analyzed and the result is $P>0.05$ — is there really no difference, or was the
  sample simply too small to detect one?

The first two belong to the **study-design stage**, and their answer is **sample size estimation**; the
third belongs to **checking a conclusion**, and its answer is **power estimation**. The two are really
two sides of one coin: among the five quantities sample size, $\alpha$, $\beta$, size of the
difference, and individual variability, knowing any four gives you the fifth. So "how many cases do I
need" and "given n cases, how much power do I have" use one and the same set of relations, differing
only in which quantity is treated as the unknown.

The chapter runs along two lines: **survey design** (the aim is to estimate a population mean or a
population rate) and **experimental design** (the aim is to compare two or more groups). The formulas
look different, but all of them are decided by the same few elements. One more warning: a larger
sample is not automatically better — "computed too small" and "computed too large" are errors pointing
in opposite directions that both have to be avoided.

## Core concepts

### First: why the sample size must be computed before the study starts

**Sample size（样本含量）**, also called the number of cases, is **the number of observational units
contained in each sample** in a sampling study. It is how the **principle of replication** in study
design is put into practice — every group needs enough replicates; you cannot do it once or twice and
draw a conclusion.

Getting it wrong causes two kinds of trouble, in opposite directions and at different costs:

| Tendency | Consequence |
| --- | --- |
| One-sidedly chasing a large sample, believing "the more the better" | More practical difficulty; more **confounding factors** creep in, study quality is harder to control, and the truthfulness and reliability of the results suffer instead; waste of manpower, materials, and time |
| Ignoring the sample size and using too few cases | Large sampling error and unstable indices; **low power**, with **false negative** results easy to produce, which badly undermines how reliable the conclusion is |

The second tendency is the more insidious and the more common one in medical research — because "small
sample, negative conclusion" looks "conservative", when in fact it very likely had no ability at all
to detect a real treatment effect.

So the definition the textbook gives deserves to be memorized word for word:

> **Sample size estimation is the determination of the smallest number of survey units or experimental
> units under the condition that the study conclusion has a certain degree of reliability.**

Two key words: "guaranteeing reliability" is the **lower bound** (you cannot go below it), and
"smallest" is the **target** (do not go above it). Sample size estimation is neither "the more the
better" nor "save whatever you can".

### The four elements that decide the sample size: two you set, two you look up

This is the master outline of the whole chapter. On the right-hand side of every sample size formula
there are only these four kinds of things:

| Element | Meaning | Who decides | Which way makes $n$ larger |
| --- | --- | --- | --- |
| $\alpha$ (or the confidence level $1-\alpha$) | The probability of a Type I error, that is, of "saying there is a difference when there is none" | **Set in advance by the researcher** | The smaller $\alpha$, the larger $n$; at the same $\alpha$, a two-sided test costs more cases than a one-sided one |
| $\beta$ (or the power $1-\beta$) | The probability of a Type II error, that is, of "saying there is no difference when there is one" | **Set in advance by the researcher** | The higher the power demanded (the smaller $\beta$), the larger $n$ |
| The allowable error or difference $\delta$ | The error limit the researcher can accept, or the smallest difference that is worth detecting | **Set in advance by the researcher** | The smaller $\delta$, the larger $n$, rising as $1/\delta^2$ |
| The degree of variability $\sigma$ (and $\mu$, $\pi$) | How much individuals differ from one another; a study of rates also needs the population rate | **From the literature, from earlier experience, or from a pilot study** | The larger $\sigma$, the larger $n$ |

A few points to note:

- **$\alpha$ may be one-sided or two-sided**, and this has to be stated along with the significance
  level. At the same $\alpha$, a one-sided test needs fewer cases than a two-sided one — because the
  one-sided test puts the whole rejection region in one direction, so the same difference is more
  easily judged significant. But if you do not know in advance which way the deviation will go, you
  may not use a one-sided test.
- **$\beta$ is always taken one-sided.** This differs from $\alpha$, because $\beta$ describes the
  probability that "a real difference in one particular direction was not detected".
- **$\sigma$, $\mu$, and $\pi$ are things we do not know**, and they can only be estimated by the
  sample standard deviation $S$, the sample mean $\bar x$, and the sample rate $p$. There are three
  sources: the literature, earlier experience, and a pilot study.

> Get the pairwise notation straight: when comparing two means, $\delta=\mu_1-\mu_2$; when comparing
> two rates, $\delta=\pi_1-\pi_2$. In experimental design a finer notation is also common:
> $\delta=\delta_1-\delta_0$, where $\delta_0$ is the boundary "counted as no change" and $\delta_1$
> is the boundary "counted as a real effect". For instance, if a change in serum cholesterol of
> $\le 0.2$ mmol/L after medication counts as no change and $\ge 1.0$ mmol/L counts as a change, then
> $\delta=1.0-0.2=0.8$.

### Weighing $\alpha$ against $\beta$: why the only way to shrink both at once is more sample

This core relation was covered in
**[Chapter 7 of *Health Statistics*, Hypothesis Testing](/en/Health-statistics/07-hypothesis-testing)**
and is used once more here:

- **With the sample size fixed, $\alpha$ and $\beta$ move in opposite directions**: raise $\alpha$ and
  $\beta$ falls; lower $\alpha$ and $\beta$ rises.
- So lowering either one **on its own** costs nothing: loosening the significance level raises the
  power.
- But to **shrink $\alpha$ and $\beta$ at the same time**, the only workable way is **to increase the
  sample size**.

Picture it: $\alpha$ is the probability of "convicting an innocent person" and $\beta$ of "letting a
guilty one go". The rejection region is a knife cutting at the critical value — move the knife in the
conservative direction (smaller $\alpha$) and you catch fewer real differences ($\beta$ grows); move it
in the aggressive direction (smaller $\beta$ for higher power) and the probability of a false
conviction goes up. To be "neither unjust nor lenient", the only way is to make the two distributions
**stand further apart**, and standing apart comes from sample size (the larger the sample, the smaller
the standard error, and the sharper the two distributions).

**Why in practice is $\beta$ set at 0.1 or 0.2 (power 0.9 or 0.8)?**

1. **$\alpha$ cannot be moved.** $\alpha$ governs the probability that a wrong conclusion enters the
   literature, and 0.05 (sometimes 0.01) is a decades-old consensus across the discipline. Loosening
   $\alpha$ to 0.10 just to make a result significant means trading false positives for sample size,
   and neither ethics nor journals will accept it.
2. **$\beta$ is the one that can be moved**, but it cannot be set arbitrarily large either.
   $\beta=0.2$ (power 0.8) means: when a difference really exists, roughly one in five identical
   studies will miss it. This is widely accepted as **a tolerable upper limit**, and it is the minimum
   power many grant applications and journals demand.
3. **0.9 is safer but more expensive.** Fixing $\beta$ at 0.1 (power 0.9) is common in confirmatory
   trials and in clinical studies whose sample size is small to begin with — once a real treatment
   effect is missed, patients go without an effective therapy and later research is misled, which is
   very costly.
4. **Pushing it lower still does not pay.** Because $n$ is roughly proportional to
   $(z_{\alpha/2}+z_\beta)^2$: taking $\beta$ from 0.2 down to 0.05 only pulls $z_\beta$ from 0.84 to
   1.64, and the sample size has to rise by about
   $(1.96+1.64)^2/(1.96+0.84)^2\approx 1.6531$ times — **recruiting about 65% more people only buys
   "a little more certainty"**, a very obvious case of diminishing marginal returns.
5. **The bottom line is power no lower than 0.75.** Below that, a negative conclusion is essentially
   unconvincing.

### The four elements constrain one another: every move has a price

| What you want to do | How the sample size changes | What you get for it | The price / the precondition |
| --- | --- | --- | --- |
| **Raise the power** ($\beta$ from 0.2 down to 0.1) | **Must increase** | Fewer real differences missed, and a more credible negative conclusion | Manpower, funding, and time rise in step; ethically, more subjects receive an intervention that may be ineffective; recruitment gets harder |
| **Shrink the allowable error $\delta$** (demand a more precise estimate, or recognize only a smaller difference) | **Must increase**, rising as $1/\delta^2$ | A more precise conclusion, and even tiny differences become detectable | The worst bargain of the lot: halving $\delta$ makes the sample size about 4 times as large. In this page's example, taking $\delta$ from 0.2 to 0.1 sends the sample from 88 to 343 cases |
| **Loosen the significance level $\alpha$** (say 0.05 → 0.10) | Can decrease | Higher power at the same number of cases, and "there is a difference" is easier to produce | More false positives, and control of the Type I error collapses; it amounts to trading wrong conclusions for sample size, which must not be done |
| **Reduce the variability $\sigma$** | Can decrease | Higher power at the same sample size — the best value for money | Variability is objective and cannot be changed; it can only be squeezed down by a paired design, stratification, restricting to a more homogeneous population, or more precise measurement |
| **Make the groups equal in size** | Can decrease (highest power for a given total) | The greatest power for the same total number of cases | You need to be able to really achieve balanced groups |

One sentence for that whole table: **the first two rows are "spend more", the third is "not allowed",
and the last two are "design it better".** What really marks a high-level job is putting the effort
into the last two rows — the variability that pairing and stratification remove is far cheaper than
recruiting a few dozen more cases.

### Common formulas (1): survey design — estimating a population mean or rate

#### Estimating a population mean

When the sample mean $\bar x$ is used to estimate the population mean $\mu$:

$$n=\left(\frac{t_{\alpha/2,\nu}\,S}{\delta}\right)^2$$

Here $S$ is an estimate of the population standard deviation $\sigma$ (usually a value from the
literature or the sample standard deviation of a pilot study), $\delta$ is the allowable error, and
$\nu=n-1$.

**This formula contains a loop**: the right-hand side has $t_{\alpha/2,\nu}$, while $\nu$ in turn
depends on the $n$ demanded on the left. The way out is iteration —

1. First replace $t_{\alpha/2,\nu}$ by the standard normal $z_{\alpha/2}$ and compute a preliminary
   $n'$;
2. Look up the $t$ critical value with $\nu=n'-1$, substitute that $t$ back into the formula, and get
   the second estimate $n''$;
3. Go on like this until $n$ stops moving.

An example: a researcher wants to learn the average serum cholesterol of patients with coronary heart
disease, wants the error not to exceed 0.2 mmol/L, and finds a standard deviation of about
0.94 mmol/L in the literature, with $\alpha=0.05$.

- Step 1: $n'=\left(\dfrac{1.96\times0.94}{0.2}\right)^2\approx 85$;
- Step 2: $\nu=85-1=84$, the table gives the two-sided $t_{0.05/2,84}=1.99$, so
  $n''=\left(\dfrac{1.99\times0.94}{0.2}\right)^2\approx 88$.

The two results are close, so **this study should survey 88 cases**. If the allowable error is
tightened to $\delta=0.1$, the same iteration gives **343 cases** — halving $\delta$ makes the sample
size nearly 4 times as large, and that is where the "punch" of this formula shows. (343 is the hand
calculation from the $t$ table with $t$ taken as 1.97; later, in R, the exact $t$ quantile gives 342
cases, a difference of 1 case, which is within the normal range.)

#### Finite population correction

If the sampling is from a **finite population**, the $n$ computed by the formula above still has to be
corrected:

$$n_c=\frac{n}{1+n/N}$$

Here $n_c$ is the corrected sample size, $n$ is the sample size computed by the formula above, and $N$
is the total number of observational units in the finite population. When the sampling fraction $n/N$
is small, $n_c\approx n$ and the correction can be ignored; but once the sampling fraction is large
(say above 5%–10%), failing to correct **clearly overestimates** the number of cases needed.

#### Estimating a population rate

To estimate a population rate, the **arcsine transformation** is commonly used, because it pulls the
distribution of the sample rate closer to normal:

$$n=\left[\frac{z_{\alpha/2}}{\arcsin\!\left(\dfrac{\delta}{\sqrt{p(1-p)}}\right)}\right]^2\qquad\text{(angle in radians)}$$

$$n=\left[\frac{57.3\,z_{\alpha/2}}{\arcsin\!\left(\dfrac{\delta}{\sqrt{p(1-p)}}\right)}\right]^2\qquad\text{(angle in degrees)}$$

Here $\delta$ is the allowable error and $p$ is a preliminary estimate of the population rate $\pi$.
When $\pi$ is close to 0.5 and $n$ is fairly large, the normal approximation may be used directly:

$$n=\frac{z_{\alpha/2}^2\,p(1-p)}{\delta^2}$$

**How to choose $p$**:

- If the literature suggests that $\pi$ lies in some range, take the value **closest to 0.5** — because
  $p(1-p)$ is largest at $p=0.5$, the closer to 0.5 the more cases are needed, so the value closest to
  0.5 is the safest choice;
- If you **know nothing at all** about $\pi$, take $p=0.5$; the $n$ computed then is the largest and
  the most conservative.

Compare two numbers side by side: to learn the fertility rate of women aged 20–24 in some area, with
an allowable error no greater than 2% and $\alpha=0.05$.

- Knowing nothing about $\pi$, take $p=0.5$:
  $n=\left[\dfrac{1.96}{\arcsin\!\left(\frac{0.02}{0.5}\right)}\right]^2\approx2400$ (the normal
  approximation gives 2401; the two are very close);
- The literature says the fertility rate in that area is between 5% and 25%, so take 25%, the value
  closest to 0.5: $n\approx1800$.

**Using a little prior information drops the sample size from 2400 to 1800** — which is exactly why
searching the literature and running a pilot study before designing a study is so worthwhile.

> If $\frac{\delta}{\sqrt{p(1-p)}}$ in the formula above is very small (0.040 and 0.046 in the
> examples), $\arcsin$ is almost the value itself, so the function can be dropped and the normal
> approximation used directly, with almost the same result.

#### Other probability sampling methods

- **Stratified sampling**: once the total sample size $n$ is fixed, how much to draw from each stratum
  still has to be decided. **Proportional allocation** is $n_i=n\cdot N_i/N$ (the ratio of the stratum
  sample sizes equals the ratio of the numbers of observational units); **optimum allocation** takes
  both the number of observational units $N_i$ and the standard deviation $\sigma_i$ of each stratum
  into account — for sampling means use
  $\displaystyle n_i=n\frac{N_i\sigma_i}{\sum N_i\sigma_i}$, and for sampling rates replace
  $\sigma_i$ by $\sqrt{\pi_i(1-\pi_i)}$.
- **Cluster sampling**: it has a dedicated formula (first run a pilot survey on a few clusters to get
  the number of people surveyed within a cluster and the frequency of the event, then estimate how many
  clusters should be drawn), and sampling from a finite population needs one more correction.
- **Systematic sampling**: the sampling error changes with the sampling interval, and **there is as yet
  no unified method of sample size estimation**; in practice the result for simple random sampling is
  used as a rough guide.

A very useful empirical rule: for the same precision, **the larger the sampling error of the method
used, the more cases are needed**. The sampling errors of the various methods are generally

$$\text{cluster sampling} > \text{simple random sampling} > \text{systematic sampling} > \text{stratified sampling}$$

So a sample size computed for simple random sampling is **too small** for cluster sampling, and
**already enough** for systematic or stratified sampling.

#### What if there are several survey indices

Everything above is about **one** index. A real survey often measures many indices on the same person,
and the approach is:

1. Estimate the sample size for **each** index separately;
2. If the budget allows meeting the largest of those requirements, **take the largest** as the common
   sample size;
3. If the sample size demanded by some individual index is too large to meet, you may **relax the
   precision requirement** for it to bring $n$ down, or **give up some secondary indices** and
   concentrate manpower and money on the key ones.

### Common formulas (2): experimental design — comparing two or more groups

The core of experimental design is testing a difference, so the formulas carry one extra term $\beta$
(the power requirement), and $\delta$ changes from "allowable error" to "the difference between the two
groups that you hope to detect".

#### Comparing a sample mean with a known population mean

$$n=\left[\frac{(t_{\alpha}+t_{\beta})S}{\delta}\right]^2$$

- $\alpha$ may be taken one-sided or two-sided, but **$\beta$ is taken one-sided only**;
- $S$ is an estimate of the standard deviation; $\delta$ is the gap between the null hypothesis and the
  alternative — if $H_0:\mu-\mu_0\le\delta_0$ and $H_1:\mu-\mu_0\ge\delta_1$, then
  $\delta=\delta_1-\delta_0$;
- It also has to be iterated: first substitute $z$ to get $n'$, then use the $t$ value at $\nu=n'-1$ to
  get $n''$, until it stabilizes.

**How big a lever $\delta$ is** is obvious at a glance: a study looks at the effect of oral
contraceptives on serum cholesterol, with $S=0.85$, $\alpha=0.05$ (two-sided), $\beta=0.10$. If a change
of $\ge1.0$ mmol/L counts as a change ($\delta=1.0-0.2=0.8$), the iteration needs **14 cases**; if the
threshold for "a change" is lowered to 0.5 mmol/L, $\delta=0.3$, and **87 cases** are needed. $\delta$
shrinks to 0.375 of its former value, and the sample size grows about 6-fold.

#### Comparing two sample means in a completely randomized design

When the two groups have **equal** numbers of cases, the number needed in each group is

$$n_1=n_2=2\left[\frac{(t_{\alpha/2}+t_{\beta})S}{\delta}\right]^2$$

When the two groups have **unequal** numbers of cases, the total sample size is

$$n=\left[\frac{(t_{\alpha/2}+t_{\beta})S}{\delta}\right]^2\left(Q_1^{-1}+Q_2^{-1}\right)$$

Here $S$ is an estimate of the common standard deviation of the two populations (usually the two are
assumed equal, or the square root of the pooled variance is taken), $\delta$ is the difference between
the two means, and $Q_1$, $Q_2$ are the allocation proportions, with $Q_1+Q_2=1$, $n_1=Q_1n$ and
$n_2=Q_2n$.

**Equal group sizes are the allocation that needs the fewest cases.** This is worth remembering on its
own: at $Q_1=Q_2=0.5$, $Q_1^{-1}+Q_2^{-1}=4$, and substituting back gives exactly $2[\cdot]^2$ per
group; but taking $Q_1=0.3$ and $Q_2=0.7$ gives $Q_1^{-1}+Q_2^{-1}=3.33+1.43=4.76$, larger than 4, so
the total goes up. Compare the two calculations on one and the same problem ($S=1.1$, $\delta=0.7$,
two-sided $\alpha=0.05$, $\beta=0.10$):

- Equal groups: $n_1=n_2=2\left(\dfrac{3.242\times1.1}{0.7}\right)^2\approx52$, and iterating once more
  at $\nu=2n-2$ gives **53**, that is 106 cases in all;
- With $Q_1=0.3$ and $Q_2=0.7$:
  $n=\left(\dfrac{3.242\times1.1}{0.7}\right)^2\times4.76\approx124$, that is 37 cases in group A and
  87 in group B — **the total is larger instead**.

So unless there is a particular reason, **design the study with equal group sizes**.

#### Comparing means in a paired design

$$n=\left[\frac{(t_{\alpha}+t_{\beta})S_d}{\delta}\right]^2$$

Here $S_d$ is an estimate of the population standard deviation of **the difference within each pair**,
$\delta=\mu_1-\mu_0=\mu_d$ is the meaningful difference the researcher has fixed, and $n$ is the number
of **pairs** needed.

The key difference lies in $S_d$: a paired design uses the standard deviation of "the difference
between two measurements on the same person", and the large variability between individuals is
subtracted away, so $S_d$ is usually far smaller than the $S$ of a grouped design, and **far fewer
cases are needed**. The same example of a new drug raising white blood cells: the standard deviation of
the before–after difference is $S_d=1.5\times10^3$ per mm³, a mean rise of $1\times10^3$ per mm³ counts
as effective, and with one-sided $\alpha=0.05$ and $\beta=0.10$, substitution gives $n=20$, and after
iteration **21 pairs**.

> This formula suits not only paired trials but also **crossover trials**, and the
> **comparison of a sample mean with a known population mean** discussed earlier — the three designs
> are essentially the same one-sample problem.

#### Comparing a sample rate with a known population rate

$$n=\pi_0(1-\pi_0)\left(\frac{z_{\alpha}+z_{\beta}}{\delta}\right)^2,\qquad \delta=\pi_1-\pi_0$$

Here $\pi_0$ is the known population rate and $\pi_1$ is the population rate expected from the trial.
The formula suits large-sample studies. Example: conventional therapy is about 85% effective and the
new therapy is estimated at 95%, with one-sided $\alpha=0.05$ and $\beta=0.10$, so $\delta=0.10$,

$$n=0.85\times(1-0.85)\times\left(\frac{1.645+1.282}{0.10}\right)^2\approx110$$

#### Comparing two sample rates

With equal group sizes (using the arcsine transformation):

$$n_1=n_2=\frac{1}{2}\left[\frac{z_{\alpha/2}+z_{\beta}}{\arcsin\sqrt{p_1}-\arcsin\sqrt{p_2}}\right]^2$$

With unequal group sizes:

$$n=\left[\frac{z_{\alpha/2}\sqrt{\bar p(1-\bar p)\left(Q_1^{-1}+Q_2^{-1}\right)}+z_{\beta}\sqrt{p_1(1-p_1)Q_1^{-1}+p_2(1-p_2)Q_2^{-1}}}{p_1-p_2}\right]^2$$

Here $p_1$ and $p_2$ are estimates of the two population rates and $\bar p$ is the pooled rate of the
two groups. Example: drug A is 70% effective and drug B 90%, with two-sided $\alpha=0.05$ and
$\beta=0.10$,

$$n_1=n_2=\frac{1}{2}\left[\frac{1.96+1.282}{\arcsin\sqrt{0.70}-\arcsin\sqrt{0.90}}\right]^2\approx79$$

that is 79 cases per group, 158 cases in all.

#### Comparing more than two groups (enough to know it exists)

- **Comparing several sample means in a completely randomized design**:
  $n=\dfrac{\psi^2\left(\sum S_i^2/k\right)}{\sum(\bar x_i-\bar x)^2/(k-1)}$, where $k$ is the number
  of groups and $\psi$ is read from a table of critical values; first take $\nu_2=\infty$ to get $n'$,
  then use $\nu_2=k(n'-1)$ to get $n''$, and repeat until it stabilizes.
- **Comparing several sample rates**:
  $n=\dfrac{2\lambda}{\left(2\arcsin\sqrt{p_{\max}}-2\arcsin\sqrt{p_{\min}}\right)^2}$, with $\lambda$
  read from a table by $\nu=k-1$.
- **Randomized block design**: $n=2\left(MSe/D^2\right)\left(Q+z_{\beta}\right)^2$, where $MSe$ is the
  error mean square, $D$ is the difference between groups, and $Q$ is read from a table by the number
  of groups.

What these three have in common: **the more groups there are, the more cases each group needs**, and
all of them require iteration or a table. In practice, if a value read from a table falls between two
rows, interpolation can be used to estimate it, or **you can simply take the larger one**; beyond the
range of the table, use the formula or dedicated software (such as PASS).

### Power: the second question to ask after $P>0.05$

**Power of a test（检验效能）**, also called the power of a hypothesis test, is written $1-\beta$. It
means: **when the population under study really does differ, the ability to detect that difference
(reject $H_0$) at the significance level $\alpha$.**

If $1-\beta=0.9$, that means: when $H_0$ is false, in theory 90 out of 100 identical sampling studies
will on average reject $H_0$ at the $\alpha$ level. Power may be written as a decimal or as a
percentage; the usual grades are 0.99, 0.95, 0.90, 0.80, and 0.50.

**The four factors that affect power** (the same set as the four elements of sample size):

1. **Sample size**: the larger $n$, the higher the power;
2. **The size of the real difference**: the larger the true difference, the easier it is to detect, and
   the higher the power;
3. **The amount of variability between individuals**: the larger the variability, the more the two
   distributions overlap, and the lower the power;
4. **The value of $\alpha$**: the larger $\alpha$, the larger the rejection region, and the higher the
   power.

Of the first three, only the first is ours to decide (the difference and the variability are
objective), so **the two roads to more power are: raise $\alpha$, or raise the sample size**. And as
explained above, raising $\alpha$ is unacceptable, so in practice only one road is left — **more
cases**.

#### Why a negative conclusion must come with the power

When a hypothesis test concludes from $P>0.05$ that "the difference is not statistically significant",
the researcher immediately faces a follow-up question: **is there really no difference between the
populations, or was the power too low to find it?**

This is not nit-picking. In recent years many international funding bodies and conferences have
required that, when a hypothesis test draws a "negative" conclusion from $P>0.05$, **the power of that
trial or the probability of a Type II error must be reported**. So this part is not only a theoretical
matter but also a matter of writing standards.

The opposite point matters just as much: **a study with low power is just as suspect when it produces a
"statistically significant" conclusion** — a significant result in a low-power study is more likely to
be a coincidence, or the effect size is likely to have been overestimated.

#### Estimating power backwards: plug in n and see how large a difference could be detected

The relations among power, sample size, $\delta$, $\sigma$, and $\alpha$ run in both directions. The
study-design stage asks "given $\alpha$, $\beta$, $\delta$, and $S$, find $n$"; once data exist, it
becomes "given $n$, $\delta$, $S$, and $\alpha$, find $1-\beta$".

The principle is one sentence: **how many standard errors the true difference is worth decides how far
apart the two distributions stand; the further apart, the higher the power.** Written as formulas:

- Comparing a sample mean with a known population mean: the true difference is
  $\dfrac{\delta\sqrt{n}}{S}$ on the $t$ scale, and the critical value for rejection is
  $t_{\alpha/2,\nu}$, so

  $$1-\beta\approx\Phi\!\left(\frac{\delta\sqrt{n}}{S}-t_{\alpha/2,\nu}\right)$$

- Comparing two sample means: the standard error of the difference is $S\sqrt{2/n}$, so

  $$1-\beta\approx\Phi\!\left(\frac{(\delta_1-\delta_0)\sqrt{n}}{S\sqrt{2}}-t_{\alpha/2,\nu}\right),\qquad \nu=n_1+n_2-2$$

  Here $t_{\alpha/2,\nu}$ corresponds to a **two-sided** test (the same convention as the default of
  `power.t.test()`); for a one-sided test, replace it by $t_{\alpha,\nu}$. All three are **normal
  approximations**, and in small samples they give slightly less power than the exact noncentral $t$
  distribution — for the $n=30$, $\delta=0.5$, $S=1$ example in the R section below, this formula gives
  0.474 while `power.t.test()` gives 0.478.

- Comparing two sample rates: the standard error is computed from the pooled rate
  $\bar p=(p_1+p_2)/2$,

  $$1-\beta\approx\Phi\!\left(\frac{(p_1-p_2)\sqrt{n}}{\sqrt{2\bar p(1-\bar p)}}-z_{\alpha/2}\right)$$

All three formulas have exactly the same shape: **(true difference ÷ standard error) − critical value**,
handed to the cumulative probability $\Phi$ of the standard normal distribution.

<ClickAnswer>

**Think about it**: a researcher draws 6 women taking steroid contraceptives, measures serum
cholesterol $\bar x=5.2$ mmol/L with $S=0.8$ mmol/L, and runs a $t$ test against the average level of
healthy women, 4.4 mmol/L, obtaining $t=2.449$. Since $t_{0.05/2,5}=2.571$ and
$t<t_{0.05/2,5}$, $P>0.05$, the conclusion is drawn that "the drug has no effect on serum
cholesterol". Is that conclusion reliable?

**It is not.** Put the numbers in: $\dfrac{0.8\times\sqrt6}{0.8}=2.449$, minus
$t_{0.05/2,5}=2.571$, gives $-0.122$. The standard normal table gives $\Phi(-0.122)\approx0.45$ —
**by this normal approximation the power is only about 45%** (with so few cases the approximation runs
low: the exact noncentral $t$ distribution gives 0.51, that is about 51%), so even if the drug really
does raise cholesterol by 0.8 mmol/L, this study has only about a one-in-two chance of detecting it.
Concluding "no effect" from a sample of 6 cases in effect proves nothing at all.

More to the point: to raise the power to 0.9 ($\beta=0.1$), how many cases would be needed in reverse?
Without iterating first, use
$n=\left[\dfrac{(z_{\alpha/2}+z_{\beta})S}{\delta}\right]^2=\left[\dfrac{(1.96+1.282)\times0.8}{0.8}\right]^2=3.242^2\approx11$;
substituting back $t_{0.05/2,10}=2.228$ and $t_{0.10,10}=1.372$ at $\nu=10$ gives
$3.600^2\approx13$, and further iteration barely changes it — **13 cases (about twice 6) would settle
the question**, and running the study with 6 cases is a pure waste.
</ClickAnswer>

> **One sentence to remember**: a negative conclusion ($P>0.05$) does not mean "there is no
> difference"; it only means "this time nothing was detected". Telling those two apart requires
> reporting the power.

### A sample size that is too large: the error in the other direction

Computing the sample size too large is not "safer"; it has concrete problems:

1. **Cost and feasibility**: it adds practical difficulty and needlessly consumes manpower, materials,
   and time.
2. **Quality and truthfulness**: the more study subjects, the more easily **confounding factors** get
   in and the harder quality is to control; in a multicenter, large-sample study, if the measurement
   standards and follow-up quality differ between centers, the truthfulness and reliability of the
   results actually fall.
3. **Ethics**: more subjects are exposed to an intervention that may be ineffective or even harmful.
   "Enough and no more" is itself an ethical requirement.
4. **Statistical misreading**: with a very large sample, tiny differences that have **no clinical
   significance** are also pushed into "statistically significant". A small $P$ value only says that
   "the difference is unlikely to be coincidence"; it does not say that "the difference matters".
   Whether there is practical significance depends on the size of the difference itself and its
   confidence interval.

So in a survey with several indices the right approach is: **if you can meet the largest requirement,
take the largest; if you cannot, relax the precision requirement or drop the secondary indices** —
rather than mindlessly adding more.

## Doing it in R

The `stats` package that comes with R already has `power.t.test()` and `power.prop.test()` — **they
work out of the box, with no package to install**. Fill in some of `n`, `delta`, `sd`, `power`, and
`sig.level` and leave exactly one blank, and R solves for the one left out.

```r
power.t.test(delta = 0.5, sd = 1, power = 0.8, sig.level = 0.05)      # sample size for comparing two means
power.t.test(n = 30, delta = 0.5, sd = 1, sig.level = 0.05)            # the other way round: the power
power.prop.test(p1 = 0.3, p2 = 0.5, power = 0.8)                       # comparing two rates
```

How to read the output:

- The first command gives `n = 63.76576`, that is **about 63.77 cases per group**. The last line of the
  output, `NOTE: n is number in *each* group`, is **the single most important reminder in this
  chapter** — the `n` in `power.t.test()` and `power.prop.test()` is always the number **per group**,
  not the total. When rounding, **always round up**: 63.77 becomes 64, and 128 cases in all.
- The second command swaps `power` for `n`, and the output `power` is ≈ **0.478**: **with only 30 cases
  per group the power is below 0.48**, far under the 0.80 requirement — the kind of study that "is hard
  to bring to a conclusion however you do it".
- The third command gives `n ≈ 93`, again per group, so about 186 cases in all.

The defaults of `power.t.test()` are `type = "two.sample"` and `alternative = "two.sided"`, so leaving
those two arguments out computes the "completely randomized design, two groups, two-sided test" case.
Leave one argument out at a time (set it to `NULL`) and R solves for that one as the unknown.

### 1 Changing the design type: `type` and `alternative`

```r
# Paired design: delta is the mean of the differences, sd is the SD of the differences
power.t.test(delta = 1, sd = 1.5, power = 0.9, sig.level = 0.05, type = "paired")

# One sample: a sample mean compared with a known population mean
power.t.test(delta = 1, sd = 2, power = 0.9, sig.level = 0.05, type = "one.sample")

# One-sided test: fewer cases than two-sided at the same alpha (only when the direction is known in advance)
power.t.test(delta = 0.5, sd = 1, power = 0.8, sig.level = 0.05, alternative = "one.sided")
```

How to read the output: with `type = "paired"`, `n` is the number of **pairs** (no longer doubled);
with `type = "one.sample"`, `n` is the total number of cases needed. Note that the meaning of `sd`
changes with the design — for a grouped design it is the standard deviation **between individuals**,
for a paired design the standard deviation **of the differences**, and the latter is usually much
smaller, which is why pairing saves so many cases. Hand the same `delta` and the same `sd` to
`type = "two.sample"` and to `type = "paired"` in turn, and you will find that **the number of pairs a
paired design needs is roughly half the number of cases per group a grouped design needs** — pairing
subtracts away the variability between individuals, while a grouped comparison has to carry two copies
of that variability honestly.

### 2 One command shows how expensive the power requirement is

```r
# The same problem, only the power requirement raised from 0.8 to 0.9
power.t.test(delta = 0.5, sd = 1, power = 0.8, sig.level = 0.05)
power.t.test(delta = 0.5, sd = 1, power = 0.9, sig.level = 0.05)
```

How to read the output: the first needs about **64** cases per group and the second about **85**. The
power rises by only 10 percentage points, yet the sample size has to go up by a third — precisely the
arithmetic behind the earlier "$\beta$ is usually not pushed to 0.05".

### 3 Draw a power curve and see how three elements constrain each other

```r
# Fix alpha and the sample size, and see how the size of the difference decides the power
d  <- seq(0.3, 1.2, by = 0.05)
p8 <- sapply(d, function(x) power.t.test(n = 64, delta = x, sd = 1, sig.level = 0.05)$power)
p9 <- sapply(d, function(x) power.t.test(n = 85, delta = x, sd = 1, sig.level = 0.05)$power)

plot(d, p8, type = "l", ylim = c(0, 1), lwd = 2,
     xlab = "Difference between the two means, delta (sd = 1)", ylab = "Power, 1 - beta",
     main = "More cases make the same difference easier to detect")
lines(d, p9, lty = 2, lwd = 2)
abline(h = c(0.8, 0.9), col = "grey", lty = 3)
legend("bottomright", legend = c("64 per group", "85 per group"), lty = c(1, 2), lwd = 2)
```

How to read the output: both curves rise with $\delta$ — **the larger the difference, the easier it is
to detect**, independently of the target sample size, because the difference is objective. At the same
$\delta$, the dashed line (85 cases) is always **no lower than** the solid line (64 cases) — **more
cases buy more power**; when the difference is large both curves stick to 1 and no difference is
visible, so the place where the sample size really has to be worked out is the stretch where "the
difference is not large". The point where a curve crosses the horizontal dashed line at `0.8` or `0.9`
is "the smallest difference detectable at this number of cases", and it can be compared with the
clinically meaningful threshold the study has in mind: if the $\delta$ at the crossing point is larger
than the clinically important difference, then this design simply cannot detect the effect that
matters.

### 4 Verify the definition of power by simulation

The definition of power is a little convoluted, and the hardest thing to get wrong is to
**simulate it once**: generate data in which "the treatment really works", repeat the study many
times, and count how often the test succeeds.

```r
set.seed(20240601)

n <- 30; delta <- 0.5; sd <- 1

# The truth: the treatment group mean is 0.5 above the control group; 2000 identical trials
hit <- replicate(2000, {
  x <- rnorm(n, mean = delta, sd = sd)   # treatment group
  y <- rnorm(n, mean = 0,     sd = sd)   # control group
  t.test(x, y, var.equal = TRUE)$p.value < 0.05
})

mean(hit)                                          # the simulated power
power.t.test(n = n, delta = delta, sd = sd, sig.level = 0.05)$power   # the power from the formula
```

How to read the output: both numbers are near **0.478** (the simulated one carries random fluctuation
of about ±0.02). **"Power" is "the proportion of times the test succeeds when the effect is real"** —
once that definition has been run through in code, it will never again be confused with $\beta$. To see
it more clearly, change `n` to 100 and run it again: the simulated value rises to **0.939** and the
formula value to **0.9404272** — both approach 0.94.

### 5 Hand iteration vs software

The textbook formula asks you to "substitute $z$ first, then $t$, and iterate until it stabilizes"; a
few lines in R reproduce that process and also show what the software is actually doing for you.

```r
# Estimating a population mean: S = 0.94, allowable error delta = 0.2, alpha = 0.05
n_iter <- function(S, delta, alpha = 0.05) {
  n <- max((qnorm(1 - alpha/2) * S / delta)^2, 3)          # first pass: z in place of t
  for (i in 1:20) {
    n <- max((qt(1 - alpha/2, df = n - 1) * S / delta)^2, 3)   # after that, the t of the previous round
  }
  ceiling(n)                                                # always round the sample size up
}

n_iter(S = 0.94, delta = 0.2)   # 88
n_iter(S = 0.94, delta = 0.1)   # 342
```

How to read the output: the first iteration jumps from 84.85783 to 87.36074, the second fine-tunes it
to 87.28668, and after that it barely moves — that is "iterating until $n$ stabilizes". The second call
halves $\delta$, and the result goes from 88 to 342, **about 4 times as many**, matching
$n\propto1/\delta^2$.

Note that 342 differs by 1 case from the 343 obtained by hand earlier: the hand calculation read
$t_{0.05/2,339}$ from the table as **1.97**, whereas the exact quantile is `qt(0.975, 339)` =
**1.9669865**, and the difference lies in that last bit. **Both answers are right**; when actually
writing a protocol, taking the larger 343 is safer — which is exactly what "do not panic when the hand
calculation and the software disagree" means in concrete terms.

> `qnorm(1 - alpha/2)` gives 1.96, and `qt(1 - alpha/2, df)` gives $t_{\alpha/2,\nu}$. The quantile
> functions of R use **lower-tail probabilities**, so the $z_{\beta}$ of the textbook has to be written
> `qnorm(1 - beta)`, not `qnorm(beta)`.

### 6 Rates: the hand formula and the software will disagree, and that is normal

```r
# The textbook arcsine formula: n1 = n2 = (1/2)[(z + z_beta) / (arcsin√p1 - arcsin√p2)]^2
p1 <- 0.70; p2 <- 0.90
zb <- qnorm(0.975) + qnorm(0.90)                            # two-sided alpha = 0.05, beta = 0.10
ceiling(0.5 * (zb / (asin(sqrt(p1)) - asin(sqrt(p2))))^2)   # 79

# The software uses a normal approximation and gives a different number
power.prop.test(p1 = 0.70, p2 = 0.90, power = 0.90)
```

How to read the output: the hand calculation gives **79** and `power.prop.test()` gives **about 82**.
**A difference of a few cases between the two is normal** — they use two different approximations (the
arcsine transformation versus the normal approximation), and neither has made an error. The value of
the hand formula is that it lets you see which way each element pushes; when actually designing a study
the software result is what counts, and **taking the larger of the two is safer**.

### 7 Leave a margin for loss to follow-up

What the formula computes is "the number of cases needed to **complete** the study". In reality there
are always people lost to follow-up, withdrawn, or with incomplete data, so the number to recruit has
to be adjusted upward.

```r
n_done <- ceiling(power.t.test(delta = 0.5, sd = 1, power = 0.8, sig.level = 0.05)$n)
n_done                        # cases per group that must complete the study: 64

# With 15% loss to follow-up / withdrawal, how many must each group recruit at least
ceiling(n_done / (1 - 0.15))  # 76
```

How to read the output: 64 cases is the number that has to be there **at the time of analysis**; if 15%
are expected to drop out along the way, each group has to **recruit at least 76 cases**, 152 in all.
This step has to be stated clearly in a real ethics application and budget — and the report has to
explain how many were "planned to be enrolled" and how many were "actually analyzed".

## Common pitfalls

- **Treating $n$ as the total number of cases.** The `n` printed by `power.t.test()` and
  `power.prop.test()` is the number of cases **per group** (the NOTE at the end of the output says so
  plainly), so a two-group study has to multiply by 2. Conversely, the $n$ computed by a formula such
  as "two samples with unequal sizes" is the **total**, which still has to be split between the groups
  by $Q_1$ and $Q_2$ — and both directions are easy to get backwards.
- **Not rounding up, or forgetting the margin for loss to follow-up.** "63.77 cases per group" cannot
  be written as 63 cases — rounding must go **up**, because the formula gives the lower limit that just
  meets the requirement. And what the formula computes is the number of cases that complete the study,
  so at recruitment it still has to be divided by $(1-\text{loss to follow-up rate})$.
- **Mixing up one-sided and two-sided for $\alpha$ and $\beta$.** $\alpha$ may be one-sided or
  two-sided (state which in the design), while **$\beta$ is always one-sided**. The most common mistake
  is writing the critical value for a two-sided $\alpha=0.05$ as 1.645 (that is the one-sided one),
  which makes the sample size come out too small. In R, use `alternative = "two.sided"` /
  `"one.sided"` to control this instead of remembering numbers yourself.
- **Using the small-sample $S$ of a pilot study as the population $\sigma$.** $S$ carries sampling
  error of its own, and is especially unstable when the number of cases is small. **If $S$ is
  underestimated, the computed $n$ comes out too small and the study ends up underpowered** — the most
  insidious mistake of all, because not one step of the formula looks wrong. The safe approach is to
  take the larger $S$ from the literature, or the upper limit of its confidence interval.
- **Forgetting the finite population correction.** When the sampling fraction $n/N$ is fairly large
  (say above 5%–10%), $n_c=\dfrac{n}{1+n/N}$ must be used to bring it down, or the number of cases
  needed will be **overestimated**. Community surveys, school surveys, and other studies whose
  population is not large are where this is most easily overlooked.
- **Concluding "there is no difference" from $P>0.05$.** A negative conclusion only says "this time
  nothing was detected". The power must be reported at the same time: a study with 45% power concluding
  "no effect" proves nothing at all; and conversely, a "statistically significant" result obtained when
  the power is insufficient also deserves a question mark.
- **Saying $\beta$ when you mean the power $1-\beta$.** $\beta$ is the probability of **missing** a real
  difference (a false negative); $1-\beta$ is the ability to **detect** it. After computing either
  probability, first ask yourself: is this the one about "detecting" or the one about "missing"? Not
  all materials write the approximation in exactly the same way, and the only criterion is this —
  **high power = real differences are easy to detect** — with the software value as the reference.
- **Assuming a mistake when the hand calculation and the software disagree.** The hand calculation uses
  all sorts of approximations and table interpolation, whereas the software uses the exact distribution
  (the noncentral $t$) or another approximation, so a difference of a few cases is entirely normal. **It
  is enough that the direction agrees**; the final number should come from the software, and taking the
  larger one is safer.

## How it connects to the other courses

::: tip Related chapters
- **[Chapter 7 of *Health Statistics*, Hypothesis Testing](/en/Health-statistics/07-hypothesis-testing)**
  — every $\alpha$ and $\beta$ in this chapter comes from that one, and the two should name each other:
  that chapter covered **Type I and Type II errors** (the Type I "rejecting a true null" probability
  $\alpha$, the Type II "retaining a false null" probability $\beta$), covered the **power
  $1-\beta$**, and also stated that "with $n$ fixed, $\alpha$ and $\beta$ trade off against each other,
  and shrinking both at once can only be done by increasing the sample size"; what this chapter does is
  turn that conclusion **into a number you can compute** — that chapter says "add sample size", this
  one says "how much, and how to work it out". That chapter also discussed "a small $P$ value is not
  the same as a small probability that $H_0$ is true", and this chapter supplies the other half of the
  same idea: **a large $P$ value does not mean there is no difference either; you also have to look at
  the power**.
- **[Chapter 3 of *Health Statistics*, Experimental and Survey Design](/en/Health-statistics/03-study-design)**
  — this is the most direct "upstream" chapter for this one: that chapter gave the **three elements**
  of experimental design (study factor, subjects, experimental effect) and the **four principles**
  (randomization, control, replication, balance), and this chapter works out **the concrete arithmetic
  of the replication principle**. The two should name each other: reading Chapter 3 tells you "why
  enough replication is needed", and reading this chapter tells you how many cases "enough" actually
  is; conversely, the $n$ computed here only means anything on the precondition that randomization,
  control, and balance are all in place — **however large the sample, a design without randomization
  cannot be saved**. The three kinds of design discussed in Chapter 3 — completely randomized, paired,
  and randomized block — correspond exactly to the three different sample size formulas here.
- **[Lecture 12 of *Introduction to Information Technology*, Parameter Estimation](/en/intro-it/12-parameter-estimation)**
  — the two formulas here for "estimating a population mean / population rate" are in essence the
  **confidence interval** used backwards: the interval is
  $\bar x\pm t_{\alpha/2,\nu}S/\sqrt n$, and the allowable error $\delta$ of this chapter is the
  **half-width** of that interval. That lecture substitutes data into the interval, this chapter
  "fixes the half-width first and solves for $n$" — the same formula in two directions. So the
  $\bar x\pm1.96S/\sqrt n$ computed there, with a little rearrangement, is this chapter's
  $n=(1.96S/\delta)^2$.
- **[Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing](/en/intro-it/13-hypothesis-testing)**
  — that lecture practices **how to write the code, how to compute a $P$ value from data, and how to
  compare it with $\alpha$**; the two types of error and the power are mentioned only once, at the end
  of the page, and pointed toward *Health Statistics*. This chapter carries on from there: $\alpha$ is
  the Type I error (rejecting a true null, a false positive), $\beta$ is the Type II error (retaining a
  false null, a false negative), and $1-\beta$ is the power. This chapter supplies the other half that
  lecture left unspoken — **every test has a "can it detect it" capability problem, and that capability
  can be worked out before the study starts from $\alpha$, $\delta$, and $\sigma$**. Once the two types
  of error that lecture points to are understood, this chapter's "$\alpha$ and $\beta$ move in opposite
  directions, and shrinking both at once only works by adding sample size" is just a direct corollary.
- **[Week 8 of *Medical Big Data Analysis and Decision Making*, Neural Networks](/en/Medical-Big-Data-Analysis/8-neural-networks)**
  — the same problem wearing another face: the number of parameters in a neural network easily runs
  into the thousands, and **whether the training set is large enough directly decides whether it can
  learn the pattern**, while whether the validation set is large enough decides how reliable your
  estimate of performance is. "Insufficient sample size" shows up there as overfitting and violently
  fluctuating validation error; here it shows up as low power and an unreliable conclusion. **The
  reasoning underneath is the same**: to resolve a signal stably out of data, the number of
  observations must be large enough relative to the noise (the $\sigma$ of this chapter, the data
  variance of that week). This chapter gives you a set of formulas that can compute "enough or not";
  that week's training/test split answers the same question **empirically** when there is no analytic
  calculation to be had.
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)**
  — this chapter ends by noting that "the sample size is not just the planned number; the number
  actually analyzed matters too", and that link lands in that week: measuring central tendency and
  dispersion, correlation analysis, handling attribute columns, and equal-width / equal-frequency
  binning with min-max normalization and Z-score standardization. What that week practices is "how to
  turn raw data into something analyzable"; this chapter supplies the statistical consequence — **any
  step in that tidying-up that keeps some observations out of the analysis shrinks $n$, inflates the
  standard error, and lowers the power**, so the way the preprocessing is done directly rewrites the
  account this chapter worked out. After the tidying-up you should go back and check **how many cases
  are actually left in the analysis, and whether the power is still enough**.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/17-sample-size) from:
- /Health-statistics/07-hypothesis-testing, at "Type I and Type II errors", "power 1-beta", or in its summary: add a sentence that "the formulas for working back from alpha and beta to the sample size needed, and for checking the power when P>0.05, are in Chapter 17 of Health Statistics".
- /Health-statistics/03-study-design, at "the principle of replication" or "the three elements of experimental design": add a sentence that "how many cases each group needs, and how to compute it from alpha, beta, delta, and sigma, is in Chapter 17 of Health Statistics; that chapter also gives the sample size formulas for completely randomized, paired, and randomized block designs".
- /intro-it/13-hypothesis-testing, at "the two types of error" or in its summary: add a sentence that "the formulas for working back from alpha and beta to the sample size needed, and for checking the power when P>0.05, are in Chapter 17 of Health Statistics".
- /intro-it/12-parameter-estimation, at "the width of the confidence interval" or in its summary: add a sentence that "treating the half-width of the confidence interval as the allowable error and solving back for the sample size is in Chapter 17 of Health Statistics".
- /Medical-Big-Data-Analysis/8-neural-networks, at "training/test split": add a sentence that "whether the sample size is enough, and how to compute a target number, is in Chapter 17 of Health Statistics".
- /Medical-Big-Data-Analysis/2-data-preprocessing, at missing-value handling: add a sentence that "deleting observations reduces the effective sample size and lowers the power; see Chapter 17 of Health Statistics".
-->

## Summary

1. **Sample size estimation is the determination of the smallest number of survey units or experimental
   units under the condition that the study conclusion has a certain degree of reliability.** It is the
   principle of replication put into practice. Too small a sample mistakes coincidence for pattern,
   gives low power, and easily produces false negatives; too large a sample wastes manpower and
   materials, lets in more confounding factors, makes quality control harder, and turns tiny
   differences with no clinical significance into "statistically significant" ones. Both tendencies
   have to be avoided.
2. **Four elements: $\alpha$, $\beta$ (or the power $1-\beta$), the allowable error or difference
   $\delta$, and the degree of variability $\sigma$ (plus $\mu$ and $\pi$).** The first two are set in
   advance by the researcher; the last two are estimated from the literature, earlier experience, or a
   pilot study. The smaller $\alpha$, the higher the power demanded, the smaller $\delta$, and the
   larger $\sigma$, the larger the sample size needed; $n$ is inversely proportional to $\delta^2$ and
   proportional to $\sigma^2$, so halving $\delta$ makes the sample size about 4 times as large.
3. **With the sample size fixed, $\alpha$ and $\beta$ move in opposite directions; to shrink both at
   once, the only way is to increase the sample size.** The two roads to higher power are "raise
   $\alpha$" and "raise the sample size", and because $\alpha$ is normally fixed at 0.05 (or 0.01) only
   the second road is really open. In practice $\beta$ is set at 0.1 or 0.2 (power 0.9 or 0.8):
   $\alpha$ cannot be moved, and pushing $\beta$ down to 0.05 means recruiting about 65% more people
   for diminishing returns; the bottom line is power no lower than 0.75.
4. **The common formulas fall into two lines.** Survey design: estimating a population mean
   $n=\left(\dfrac{t_{\alpha/2,\nu}S}{\delta}\right)^2$ (with the finite population correction
   $n_c=\dfrac{n}{1+n/N}$); estimating a population rate uses the arcsine transformation, and when
   $\pi$ is unknown $p=0.5$ is the most conservative choice. Experimental design: comparing two sample
   means
   $n_1=n_2=2\left[\dfrac{(t_{\alpha/2}+t_{\beta})S}{\delta}\right]^2$, paired design
   $n=\left[\dfrac{(t_{\alpha}+t_{\beta})S_d}{\delta}\right]^2$, and comparing two sample rates with
   the arcsine formula. **Whenever a formula has a $t$ value on the right-hand side it has to be
   iterated** (substitute $z$ first, then look up $t$ with the computed $n$, until it stabilizes), and
   **equal group sizes need the fewest cases**.
5. **Power $1-\beta$ is the ability to detect a difference at the $\alpha$ level when the population
   really does differ.** It is affected by four factors: the sample size, the size of the real
   difference, the variability between individuals, and $\alpha$. When a negative conclusion is drawn
   from $P>0.05$, the power must be checked — low power means "not detected" is not "no difference".
   The principle of estimating it backwards is one sentence: **how many standard errors the true
   difference is worth decides how high the power is**, and in R you can solve for any one unknown with
   `power.t.test()` or `power.prop.test()` without iterating by hand.
