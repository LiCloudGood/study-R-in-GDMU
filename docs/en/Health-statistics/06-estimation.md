---
layout: doc
title: '6. Estimating Population Means and Rates'
---

# Chapter 6. Estimating Population Means and Rates

::: info Translation status
Translated from the [Chinese original](/Health-statistics/06-estimation). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Draw one sample, and out come a sample mean and a sample rate — this chapter is about how to give
> them a range you are 95% sure of. All the work rests on one quantity: the **standard error**.

## What this chapter is for

A district randomly selects 135 normal adult men and measures their resting heart rates, getting a mean
of 78.82 beats/min and a standard deviation of 9.58 beats/min. Can we then say directly that "the
average resting heart rate of normal adult men in this district is 78.82 beats/min"?

No. Draw another 135 men and the mean will not come out at exactly 78.82 again. In the same way, if 200
residents of a district are sampled and 47 are found to have hypertension, a prevalence of 23.5%, we
cannot say directly that "the hypertension prevalence of the residents of this district is 23.5%".

The reason is the **sampling error** of the previous chapter: as long as individuals differ from one
another, a sample statistic will never equal the population parameter exactly.

The most thorough approach is of course a census — measure every individual in the population, compute
the parameter directly, and there is no sampling error. In practice this is often impossible (too many
people, limited funding) and unnecessary (measuring the heart rate of everyone in a district is
pointless). So researchers can only sample, and having sampled they must face sampling error. This
chapter therefore answers two questions:

1. **How large** is the sampling error? — put a number on it, and that number is the **standard error**.
2. Once the size of the error is known, how do we give a **reasonable range** for the population
   parameter? — that is **interval estimation**.

The sample mean (or sample rate) is a "point estimate": simple, but it cannot answer "how accurate is
it?". Interval estimation is the star of this chapter, and the foundation of the hypothesis tests that
follow.

## Core concepts

### Sampling error: a sample statistic is not the population parameter

**Sampling error（抽样误差）**: the difference **between a sample statistic and the population
parameter** that arises in sampling studies because individuals vary, and also the differences **among
sample statistics**.

- **Cause**: individual variation plus sampling. Both are needed — if everyone in the population were
  identical there would be no sampling error, and without sampling the problem would not arise either.
- **How it shows up**: the difference between a sample mean and the population mean; the difference
  between one sample mean and another.
- It is **unavoidable**, but it **follows objective laws**, and its size can be estimated by
  statistical methods.

An intuitive demonstration: suppose the red blood cell count of normal adults in some district follows
$N(5.00,\ 0.43^2)$ (units $10^{12}/\text{L}$). From this population, draw 8 people at a time and measure
their red blood cell counts, repeating for 100 samples. The result is that:

- the mean computed from each sample **is never equal to** the population mean of 5.00;
- the 100 sample means are **not equal** to one another either;
- but they **distribute around 5.00, with many in the middle and few at the sides, roughly symmetric**,
  approximately normal.

A sample mean is itself a random variable with its own probability distribution, called the **sampling
distribution of the mean**. To describe how much a roughly normal set of data varies you use the
standard deviation — so "the standard deviation of 100 sample means" naturally becomes the measure of
sampling error.

**What a small sampling error means**: the sample statistic lies close to the population parameter, so
the sample represents the population more reliably. Unfortunately the population parameter is exactly
what we do not know, so the size of the sampling error cannot be computed directly; we can only grasp
its laws by studying the distribution of the sample mean.

### Standard error: the standard deviation of the sample mean (the first hurdle of this chapter)

> **The standard deviation of a sample statistic is called the standard error（标准误）. The standard
> deviation of the sample mean is called the standard error of the mean**, written $S_{\bar{X}}$ (some
> software prints it as SEM, standard error of the mean).

The definition sounds plain, but this is the concept most easily confused in the whole chapter. Break
its origin into four steps:

1. **The sample mean is a random variable.** With the sample size $n$ fixed, sample repeatedly from the
   same population, and each sample gives one $\bar{X}$.
2. **These $\bar{X}$ values form a distribution** (the sampling distribution of the mean), and this
   distribution also has a mean and a standard deviation.
3. **The standard deviation of this distribution** is "the standard deviation of the sample mean", that
   is the standard error of the mean. In theory

   $$\sigma_{\bar{X}}=\frac{\sigma}{\sqrt{n}}$$

   It is **proportional** to the standard deviation $\sigma$ of the original population and **inversely
   proportional to the square root** of the sample size $n$.
4. **$\sigma$ is usually unknown**, so we replace it with the sample standard deviation $S$ and get the
   estimate actually used in computation

   $$S_{\bar{X}}=\frac{S}{\sqrt{n}}$$

   This is also consistent with what came before: if the standard deviation of 100 sample means comes
   out at 0.144 while the theoretical value is $\sigma/\sqrt{n}=0.43/\sqrt{8}\approx 0.152$, the two are
   very close.

**How to read this formula**:

- the numerator $S$ is the variation **between individuals**, and the denominator $\sqrt{n}$ is the
  "averaging" effect — averaging $n$ independent observations makes positive and negative deviations
  partly cancel each other, so the mean varies less than individuals do, and the larger $n$ is the
  smaller that variation gets.
- the larger $S_{\bar{X}}$, the more scattered the sample means and the larger the sampling error; the
  smaller $S_{\bar{X}}$, the more concentrated the sample means and the smaller the sampling error.
- from one sample's $\bar{X}$ and $S$ alone you can compute $S_{\bar{X}}$, and so put a number on "how
  inaccurate this estimate is".
- for a fixed population $\sigma$ is a constant, so the **only way** to reduce the sampling error is
  **to increase the sample size $n$**. Note the rate is $1/\sqrt{n}$: quadruple the sample size and the
  standard error only halves.

A numerical example: 200 seven-year-old boys are randomly selected from a city; their mean height is
124.0 cm with a standard deviation of 4.6 cm, so the standard error of the mean is

$$S_{\bar{X}}=\frac{4.6}{\sqrt{200}}\approx 0.33\ \text{cm}$$

That is, when 124.0 cm is used to estimate the population mean height of seven-year-old boys in that
city, the sampling error is of the order of about 0.33 cm.

#### The difference between the standard deviation and the standard error

This is the first guaranteed exam point of the chapter, and where students most often go wrong. The two
formulas differ only by a $\sqrt{n}$, yet their meanings are completely different:

| Item | Standard deviation $S$ | Standard error $S_{\bar{X}}$ |
| --- | --- | --- |
| What it describes | variation **between individual observations** | variation **between sample means** |
| What it reflects | how large individual differences are | how large the **sampling error** is |
| Formula | $S=\sqrt{\dfrac{\sum (X-\bar{X})^2}{n-1}}$ | $S_{\bar{X}}=\dfrac{S}{\sqrt{n}}$ |
| Use | describing a frequency distribution; setting **medical reference ranges** | describing the distribution of sample means; used in **parameter estimation and hypothesis testing** |
| As the sample size grows | essentially unchanged (approaches $\sigma$) | smaller and smaller |

The link: with the sample size fixed, the standard error is **proportional** to the standard deviation —
the larger the individual differences, the larger the sampling error.

One sentence to tell them apart: **the standard deviation says how much one person differs from
another; the standard error says how much the mean you computed this time differs from the true mean.**

### The central limit theorem: why the sample mean is approximately normal

The derivation above rests on one result:

- from a **normal population** with mean $\mu$ and standard deviation $\sigma$, a random sample of size
  $n$ gives a sample mean that **follows a normal distribution**;
- even when sampling from a **skewed population**, once $n$ is large enough (say $n>50$) the sample mean
  is **approximately** normally distributed.

And the mean and standard deviation of the sample mean's distribution are:

$$\bar{X}\sim N\!\left(\mu,\ \frac{\sigma^2}{n}\right),\qquad \mu_{\bar{X}}=\mu,\qquad \sigma_{\bar{X}}=\frac{\sigma}{\sqrt{n}}$$

Note two things: **the mean of the sample means still equals the population mean $\mu$** (so estimating
$\mu$ by $\bar{X}$ is unbiased), **but its standard deviation shrinks to $1/\sqrt{n}$ of the original**.
This theorem is the premise of all the interval estimation that follows — whatever the population looks
like, as long as $n$ is large enough the sample mean is approximately normal, and the normal
distribution can be used to mark out a range.

### The $t$ distribution: the remedy when $\sigma$ is unknown

If $\sigma$ is **known**, standardizing the sample mean gives the standard normal distribution:

$$u=\frac{\bar{X}-\mu}{\sigma_{\bar{X}}}=\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}\sim N(0,1)$$

But in practice $\sigma$ is usually unknown and has to be estimated by the sample standard deviation
$S$. The transformation then changes:

$$t=\frac{\bar{X}-\mu}{S_{\bar{X}}}=\frac{\bar{X}-\mu}{S/\sqrt{n}},\qquad \nu=n-1$$

The statistic $t$ **no longer follows the standard normal distribution**; it follows the **$t$
distribution** with $\nu=n-1$ degrees of freedom (also called Student's $t$ distribution, put forward in
1908 by a statistician who published under the pen name "Student").

Why does substituting $S$ change anything? Because $S$ is itself computed from this one sample and
carries sampling error of its own; both the numerator and the denominator of $t$ contain random
components, so its variation must be larger than that of $u$ — and that extra uncertainty is carried by
the $t$ distribution's "heavier tails", whose thickness is determined by the degrees of freedom.

**Features of the $t$ distribution**:

1. it is unimodal, highest at $t=0$, and symmetric about 0;
2. it is a **family** of curves, whose shape changes with the degrees of freedom $\nu$;
3. the smaller $\nu$, the more spread out the $t$ values, and the flatter the curve with **higher
   tails**; as $\nu$ grows the curve becomes more peaked and the tails lower;
4. as $\nu\to\infty$ the $t$ distribution approaches the **standard normal distribution** (the limiting
   distribution of the $t$ distribution is the standard normal);
5. the total area (probability) under the curve is 1.

**How to read a table of $t$ critical values**: the row heading is the degrees of freedom $\nu$, the
column heading is the probability $P$ (one-sided / two-sided), and the numbers inside are the $t$
critical values corresponding to $\nu$ and $P$. Because the distribution is symmetric, only the
positive part is tabulated.

- the critical value for a one-sided probability is written $t_{\alpha,\nu}$, meaning
  $P(t\le -t_{\alpha,\nu})=\alpha$ or $P(t\ge t_{\alpha,\nu})=\alpha$;
- the critical value for a two-sided probability is written $t_{\alpha/2,\nu}$, meaning
  $P(|t|\ge t_{\alpha/2,\nu})=\alpha$, that is $\alpha/2$ in each of the two tails.

For example, at $\nu=9$ the table gives the one-sided $t_{0.05,9}=1.833$ (the area under the curve with
$t\ge1.833$ is 0.05) and the two-sided $t_{0.05/2,9}=2.262$ (the areas with $t\le-2.262$ and
$t\ge2.262$ together make 0.05).

Four rules can be read off the table of critical values:

1. for the same degrees of freedom, the larger the $t$ critical value, the smaller the $P$ value it
   corresponds to;
2. for the same $P$ value, the larger the degrees of freedom, the smaller the $t$ critical value;
3. at the same $t$ critical value, **the two-sided probability is twice the one-sided probability**;
4. as $\nu\to\infty$ the $t$ critical value *is* the $u$ critical value (for example the two-sided
   $u_{0.05/2}=1.96$).

Rule 2 is the intuition behind all interval estimation: **the larger the degrees of freedom (the larger
the sample), the closer the multiplier you need comes to 1.96**.

### Point estimation of a population mean

**Point estimation**: using a sample statistic directly as the estimate of a population parameter, for
example using the sample mean $\bar{X}$ to estimate the population mean $\mu$.

In the heart rate example above, it means simply taking 78.82 beats/min to be the population mean
resting heart rate of normal adult men in that district.

The advantage of point estimation is that it is simple; the disadvantage is that it **takes no account
of sampling error** — you neither know how accurate the estimate is, nor can you measure how large the
error is. Sample the same population twice and you get two different point estimates, and nobody knows
how far either is from the truth.

### Interval estimation of a population mean

**Interval estimation**: using a probability $(1-\alpha)$ fixed in advance to estimate a possible range
that contains the unknown population parameter. That range is called the parameter's **confidence
interval** (CI), $1-\alpha$ is called the **confidence level** (usually 95%, but 90% and 99% may also be
used), and the interval is usually expressed by two **confidence limits**: the smaller is the **lower
confidence limit** $L$ and the larger is the **upper confidence limit** $U$.

The idea behind it is plain: since $\bar{X}$ fluctuates around $\mu$ and we know the law of that
fluctuation (its distribution), we can ask the question backwards — within how wide a range around
$\mu$ will $\bar{X}$ fall with high probability? Solving that inequality for $\mu$ gives the interval
for $\mu$.

$$\bar{X}\sim N(\mu,\sigma_{\bar{X}}^2)\ \Longrightarrow\ P(-u_{\alpha/2}<\frac{\bar{X}-\mu}{\sigma_{\bar{X}}}<u_{\alpha/2})=1-\alpha\ \Longrightarrow\ P(\bar{X}-u_{\alpha/2}\sigma_{\bar{X}}<\mu<\bar{X}+u_{\alpha/2}\sigma_{\bar{X}})=1-\alpha$$

So there are three sets of formulas for the $1-\alpha$ confidence interval of the population mean
$\mu$, chosen by whether $\sigma$ is known and whether $n$ is large or small.

**① $\sigma$ known: use the $u$ (standard normal) distribution**

$$\left(\bar{X}-u_{\alpha/2}\sigma_{\bar{X}},\ \bar{X}+u_{\alpha/2}\sigma_{\bar{X}}\right)\qquad\text{that is}\qquad \bar{X}\pm u_{\alpha/2}\sigma_{\bar{X}}$$

At 95%, $u_{0.05/2}=1.96$.

**② $\sigma$ unknown but $n$ large enough (say $n>50$): approximate with the $u$ distribution**

When $n$ is large the $t$ distribution approaches the $u$ distribution ($\nu$ is large, so
$t_{0.05/2,\nu}\approx1.96$), and $\sigma_{\bar{X}}$ is replaced by $S_{\bar{X}}$:

$$\bar{X}\pm u_{\alpha/2}S_{\bar{X}}\qquad\text{at 95\% that is}\qquad \bar{X}\pm1.96\,S_{\bar{X}}$$

**③ $\sigma$ unknown and $n$ small: use the $t$ distribution**

This is the **most widely used and most reliable** set of formulas:

$$\boxed{\ \bar{X}\pm t_{\alpha/2,\nu}\,S_{\bar{X}}\ }\qquad \nu=n-1$$

**What the three parts of the formula are**:

- $\bar{X}$ — the point estimate, the center of the interval;
- $S_{\bar{X}}$ — the **standard error**, that is $S/\sqrt{n}$, which fixes the "scale of the error".
  This is why so much effort went into the standard error above: **no standard error, no interval**.
  Note that the numerator $S$ is the sample standard deviation of this one sample, not the population
  standard deviation;
- $t_{\alpha/2,\nu}$ — "how many standard errors to take", read from the table of $t$ critical values
  using the confidence level and the degrees of freedom.

**Why the degrees of freedom are $n-1$**: the $S$ inside $S_{\bar{X}}$ is estimated from this one sample.
Among the $n$ observations, once the sample mean $\bar{X}$ is fixed, only $n-1$ of the deviations
$(X_i-\bar{X})$ are free to vary (their sum must be 0). One degree of freedom has been spent estimating
the mean, and what is left is $n-1$ worth of information — exactly the quantity that the degrees of
freedom of the $t$ distribution record. Hence **the larger the sample, the larger $\nu$, the closer the
$t$ critical value to 1.96, and the smaller the difference between using $t$ and using $u$**.

Back to the heart rate example: $n=135$, $\bar{X}=78.82$ beats/min, $S=9.58$ beats/min.

$$S_{\bar{X}}=\frac{9.58}{\sqrt{135}}\approx0.8245\ \text{beats/min}$$

- by formula ② ($n=135$, fairly large): $78.82\pm1.96\times0.8245=78.82\pm1.62$, so the 95% confidence
  interval for the population mean resting heart rate of normal adult men in that district is
  **(77.20, 80.44) beats/min**;
- by formula ③ ($\nu=135-1=134$, the table gives $t_{0.05/2,134}\approx1.98$):
  $78.82\pm1.98\times0.8245=78.82\pm1.63$, that is **(77.19, 80.45) beats/min**.

The two results are almost identical, which shows that when $n$ is large the two methods do not differ
in substance. What to note is this: **when $\sigma$ is unknown, formula ③ can be used whether or not $n$
is large enough** (it is the more exact theoretically); formula ② is only a normal approximation that
makes hand calculation convenient when $n$ is large. Some textbooks write the standard normal quantile
as $u_{\alpha/2}$ and others as $z_{\alpha/2}$; both mean the number 1.96.

**One-sided confidence intervals**: if only one side is meaningful — for instance if all you care about
is "how high the average content of this batch of cans can be at most", so that the lower limit has no
practical meaning — use a one-sided interval:

$$\mu<\bar{X}+t_{\alpha,\nu}S_{\bar{X}}\qquad\text{or}\qquad \mu>\bar{X}-t_{\alpha,\nu}S_{\bar{X}}$$

Note that the one-sided interval uses $t_{\alpha,\nu}$ (not $t_{\alpha/2,\nu}$); for the same $\alpha$
the one-sided critical value is smaller and the interval is narrower.

A numerical example: 10 cans of corned beef are randomly selected; the mean nitrite content is
17.6 mg/kg with a standard deviation of 1.64 mg/kg. What matters is "how high the average content of
this batch can be at most", so only the one-sided upper limit is computed. $\nu=9$, $t_{0.05,9}=1.833$:

$$17.6+1.833\times\frac{1.64}{\sqrt{10}}=17.6+0.95=18.55$$

That is, the 95% one-sided confidence interval is **below 18.55 mg/kg**. For the same data, using the
two-sided critical value $t_{0.05/2,9}=2.262$ raises the upper limit to 18.77 mg/kg — the one-sided
interval is narrower than the two-sided one precisely because the confidence of "2.5% on each side" is
concentrated on one side.

### What a confidence interval means: how to phrase it

The correct meaning of a 95% confidence interval is: **draw 100 independent samples of the same size
from the same population repeatedly, compute one confidence interval from each, and on average about 95
of those intervals contain the population mean while about 5 do not.** In essence it is the interval
that is "random", not the parameter.

A real study samples once and computes one interval, so what may be said is: **this interval contains
the population mean, with confidence 95%.**

The following statements are all **wrong**, and exams often use them as traps:

| Statement | What is wrong with it |
| --- | --- |
| The population parameter has a 95% probability of falling in this interval | The population parameter is a constant, not a random variable, so there is no "probability of falling"; what is random is the interval |
| 95% of the population parameters lie in this interval | There is only one population parameter; there is no such thing as "95% of the parameter" |
| This interval contains 95% of the population parameters | This confuses the confidence interval with the **medical reference range** |
| This interval contains the population parameter, with confidence 95% | ✅ This one is correct |

**The two elements of a confidence interval**:

- **confidence**: reliability, that is $1-\alpha$, usually 90%, 95% or 99%; it can be controlled at will,
  and the larger it is the more sure you are;
- **precision**: the size (length) of the interval; the smaller the better.

The two **must be balanced**: to raise the confidence level (say from 95% to 99%) you have to take a
larger quantile (1.96 → 2.58), and the interval necessarily gets longer and its precision drops. So do
not chase 99% blindly, and state the confidence level you used when you report.

### The confidence interval of a mean and the medical reference range

The two look alike in their formulas but mean completely different things — the second guaranteed exam
comparison of the chapter:

| Item | Confidence interval of a mean | Medical reference range |
| --- | --- | --- |
| Meaning | with a probability fixed in advance, determining the possible range of an **unknown population parameter** | the range of fluctuation of anatomical, physiological, biochemical and other indices in **"normal people"** |
| Which statistic is used | the **standard error** $S_{\bar{X}}=S/\sqrt{n}$ | the **standard deviation** $S$ |
| Formula | $\sigma$ known: $\bar{X}\pm u_{\alpha/2}\dfrac{\sigma}{\sqrt{n}}$; $\sigma$ unknown: $\bar{X}\pm t_{\alpha/2,\nu}\dfrac{S}{\sqrt{n}}$ | normal distribution: $\bar{X}\pm u_{\alpha/2}S$; skewed distribution: the percentile method, e.g. $P_{2.5}\sim P_{97.5}$ |
| Use | **estimating the population mean** | **deciding whether or not an observed subject's index is normal** |

One sentence to remember: **the confidence interval answers "roughly what is the population average"
(about the population), while the reference range answers "does this person's index count as normal"
(about an individual).** There is also a handy way to tell them apart: **as the sample size grows the
reference range stays essentially unchanged, whereas the confidence interval narrows noticeably** —
look at whether the question is about "individual fluctuation" or "precision of estimation" and you can
tell which one is being asked for.

### The root of rates: Bernoulli trials and the binomial distribution

Estimating a population rate cannot simply copy the machinery for means, because a rate comes from a
different kind of data. Its foundation is the binomial distribution.

**Bernoulli trial（贝努利试验）**: $n$ independent repetitions of a trial in which each outcome is one,
and only one, of the two mutually exclusive events $A$ and $\bar{A}$, and the probability of $A$ is the
same constant $\pi$ ($0<\pi<1$) every time — this is called $n$ repeated Bernoulli trials. It requires
three things:

1. each trial has only two mutually exclusive outcomes (effective / ineffective, positive / negative,
   alive / dead, up to standard / below standard);
2. the outcomes of the trials do not influence each other (independence);
3. the probability $\pi$ of event $A$ is the same in every trial.

Let $X$ be the number of times $A$ occurs in the $n$ trials; then $X$ can take the values
$0,1,2,\dots,n$, with probability function

$$P(X=k)=C_n^k\pi^k(1-\pi)^{n-k},\qquad k=0,1,2,\dots,n$$

$X$ is then said to follow the **binomial distribution** with parameters $n$ and $\pi$, written
$X\sim B(n,\pi)$. Here $n$ is a discrete parameter (it can only take positive integers) and $\pi$ is the
probability that event $A$ occurs. It is a typical **discrete** probability distribution.

Take "3 mice are given a toxic exposure, with a death rate of 80%": the number of deaths $X$ follows
$B(3,0.8)$, and the formula above gives

$$P(X=0)=0.008,\quad P(X=1)=0.096,\quad P(X=2)=0.384,\quad P(X=3)=0.512$$

The four probabilities sum to 1 — they are exactly the terms of the binomial expansion $(0.8+0.2)^3$.

**Properties of the binomial distribution**:

- the probabilities of all possible values sum to 1:
  $\sum_{k=0}^{n}C_n^k\pi^k(1-\pi)^{n-k}=[\pi+(1-\pi)]^n=1$;
- **lower-tail cumulative probability** (at most $m$ positive cases):
  $P(X\le m)=\sum_{k=0}^{m}C_n^k\pi^k(1-\pi)^{n-k}$;
- **upper-tail cumulative probability** (at least $m$ positive cases):
  $P(X\ge m)=1-P(X\le m-1)$;
- the population mean, variance and standard deviation of the number of positive cases $X$: $\mu=n\pi$,
  $\sigma^2=n\pi(1-\pi)$, $\sigma=\sqrt{n\pi(1-\pi)}$.

**The shape of the binomial distribution and the normal approximation**: when $\pi=0.5$ the distribution
is symmetric; when $\pi\ne0.5$ it is skewed (positively skewed for $\pi<0.5$, negatively skewed for
$\pi>0.5$), and the smaller $n$ is and the further $\pi$ is from 0.5, the more skewed it becomes; as $n$
grows the binomial distribution gradually approaches the normal distribution. In general, once both
$n\pi$ and $n(1-\pi)$ are greater than 5, binomial problems can be handled by the normal approximation.

**The sampling distribution of a sample rate**: by the central limit theorem, when $n$ is large enough
the sample rate $p$ is approximately normally distributed, and

- the population mean of $p$ equals the population rate: $\mu_p=\pi$;
- the standard deviation of $p$ is called the **standard error of a rate**:

$$\sigma_p=\sqrt{\frac{\pi(1-\pi)}{n}}\qquad\text{in practice}\qquad S_p=\sqrt{\frac{p(1-p)}{n}}$$

The **sampling error of a rate** is "the difference between the sample rate and the population rate
caused by sampling", measured by the standard error of the rate — its structure is exactly parallel to
the standard error of a mean: the numerator is the variation (here $\sqrt{p(1-p)}$) and the denominator
is $\sqrt{n}$.

A numerical example: with $n=200$ and $p=0.235$, $S_p=\sqrt{0.235\times0.765/200}\approx0.030$, so the
estimated standard error of the hypertension prevalence among the residents of that district is 0.030.

### Interval estimation of a population rate

As with a mean, first use the sample rate $p$ as the point estimate of the population rate $\pi$, then
do interval estimation. There are two sets of methods:

**Method 1: the table method** (for small $n$, or $p$ close to 0 or 1)

When $n\le50$ and $p$ is close to 0 or 1, the normal approximation does not hold, so you look up a
"table of confidence intervals for percentages": find the row by the sample size $n$ and the column by
the number of positive cases $X$; the value at the crossing is the $1-\alpha$ confidence interval of the
population rate.

Example: a hospital treats respiratory infections with an antibiotic; 2 of 45 patients have an allergic
reaction. Row $n=45$ crossed with column $X=2$ gives 1–15, so the 95% confidence interval for the rate
of allergic reactions is **(1%, 15%)**.

> When using the appendix table, note that it usually lists only the part with $X\le n/2$. When
> $X>n/2$, look up $n-X$ instead and then subtract both endpoints of the interval you found from 100% to
> get the interval you want.

**Method 2: the normal approximation** (for $n$ large enough and neither $p$ nor $1-p$ too small)

The condition is that both $np$ and $n(1-p)$ are **greater than 5**; the sampling distribution of $p$
then approaches the normal distribution, so

$$\left(p-u_{\alpha/2}S_p,\quad p+u_{\alpha/2}S_p\right)$$

Example: $n=200$, $p=0.235$; $np=47$ and $n(1-p)=153$ are both greater than 5, so

$$0.235\pm1.96\times0.030=(0.176,\ 0.294)$$

that is, the 95% confidence interval for the hypertension prevalence of the residents of that district is
**(17.6%, 29.4%)**.

**A closing step you must remember**: the lower limit computed by the normal approximation may come out
below 0% and the upper limit may come out above 100%. When that happens you should **write the lower
limit as 0% and the upper limit as 100%** accordingly; a negative rate must not be reported. The
situation itself is a warning — it means the sample is too small or $p$ is too close to 0/1, the
conditions for the normal approximation are not met, and you should switch to the table method (or an
exact method).

For instance, forcing the data with 2 out of 45 into the normal approximation: $p=0.044$, $S_p=0.031$,
and the interval comes out as (−1.6%, 10.5%), with a negative lower limit, which is clearly
unreasonable; the (1%, 15%) given by the table method is the usable answer. **A small sample plus a rate
close to 0 means you must use the table.**

### The Poisson distribution: estimating counts of rare events

When $n$ in the binomial distribution is very large and $\pi$ very small, the binomial distribution
becomes the **Poisson distribution** — its limiting distribution. If $\pi$ is very small and $n$ very
large in $X\sim B(n,\pi)$, then $X$ may be considered to follow approximately a Poisson distribution
with parameter $\mu=n\pi$.

**Probability function**:

$$P(X=k)=\frac{\mu^k}{k!}e^{-\mu},\qquad k=0,1,2,\dots$$

Written $X\sim\Pi(\mu)$. $\mu>0$ is the only parameter, giving the average number of occurrences of a
random event per unit time (or unit area, unit space), that is the population mean; $e=2.7182\dots$ is
the base of the natural logarithm.

**Where it applies**: studying the distribution of the number of **rare events** per unit time, per unit
population, or per unit space — for example the number of bacteria per unit volume of water, the amount
of dust per unit volume of air, the number of particles emitted by a radioactive substance per unit
time, the number of insects in a unit of space, or the number of cases or deaths from malignant tumors
or rare non-infectious diseases in a given population.

**Three conditions** (meet them and the variable follows a Poisson distribution):

- **Stationarity**: the value of $X$ does not depend on the location of the observational unit, only on
  its size;
- **Independence**: the value of $X$ on one observational unit is independent of its values on other
  observational units;
- **Ordinariness**: on a sufficiently small observational unit, $X$ takes the value 1 at most.

**Properties**:

1. **The population mean equals the population variance**, $\mu=\sigma^2$. This can be used for a
   preliminary judgment of whether a discrete random variable follows a Poisson distribution (for
   example, if some data give a mean of 0.500 and a variance of 0.496, the two are close enough that it
   may be considered to follow a Poisson distribution).
2. **It is additive**: if $X_1,\dots,X_m$ are independent and follow $\Pi(\mu_1),\dots,\Pi(\mu_m)$
   respectively, then $X_1+\dots+X_m$ follows $\Pi(\mu_1+\dots+\mu_m)$. In practice this is often used
   to merge several small observational units into one large unit so that $\mu\ge20$ and the normal
   approximation can be applied. (Note: it is **sums** that follow a Poisson distribution, not
   differences.)
3. **Shape**: the smaller $\mu$, the more asymmetric the distribution; as $\mu$ grows the distribution
   tends to symmetry; at $\mu=20$ it is already close to the normal distribution, and for $\mu\ge20$ the
   normal distribution can be used as an approximation.

**Confidence interval for an average count**: the total count over $n$ observational units is $X$, and
the average count is $X/n$.

- **when $X>50$, use the normal approximation**:

  $$\frac{1}{n}\left(X-u_{\alpha/2}\sqrt{X},\ X+u_{\alpha/2}\sqrt{X}\right)$$

  When $n=1$ (one standard observational unit) this is $\left(X\pm1.96\sqrt{X}\right)$. Example: a
  radioactive substance gives $X=360$ pulses in 30 minutes, so the 95% confidence interval for the
  average number of pulses in 30 minutes is $360\pm1.96\times\sqrt{360}$, that is (322.8, 397.2).

- **when $X\le50$, use the table method** (computed directly from the Poisson distribution):

  Example: for $X=8$ the table gives the 95% confidence interval (3.4, 15.8). Using the normal
  approximation instead gives (2.5, 13.5), clearly too narrow — **when counts are small you must use the
  table/exact method**, exactly as in the small-sample case of the binomial distribution.

  If there are several observational units: first look up the total count $X$, and after getting the
  interval **divide by the number of observational units**. For example, 3 units of time give a total of
  $X=8+10+6=24$; looking up $X=24$ gives (15.4, 35.7), and dividing by 3 gives the 95% confidence
  interval per unit of time, (5.13, 11.90).

### Interval estimation of the difference between two population means

In practice the more common question is "how much do the two groups differ?": by how much does blood
pressure fall on average in the trial group versus the control group? By how much does some index differ
on average between a diseased group and normal people? The object being estimated is then the difference
between the two population means, $\mu_1-\mu_2$, using the difference between the two sample means,
$\bar{X}_1-\bar{X}_2$.

**① The two population variances are equal ($\sigma_1^2=\sigma_2^2$)**

$$\left(\bar{X}_1-\bar{X}_2\right)\pm t_{\alpha/2,\ (n_1+n_2-2)}\,S_{\bar{X}_1-\bar{X}_2}$$

where the standard error of the difference between the two sample means is

$$S_{\bar{X}_1-\bar{X}_2}=\sqrt{S_c^2\left(\frac{1}{n_1}+\frac{1}{n_2}\right)},\qquad S_c^2=\frac{(n_1-1)S_1^2+(n_2-1)S_2^2}{n_1+n_2-2}$$

$S_c^2$ is called the **pooled variance**; it is the weighted average of the two sample variances,
weighted by degrees of freedom — since the two population variances are assumed equal, the two pieces of
information can be combined to estimate the same $\sigma^2$, which is more accurate than using one group
alone. The degrees of freedom are $\nu=n_1+n_2-2$ (each group spends one degree of freedom estimating
its own mean).

**② The two population variances are unequal ($\sigma_1^2\ne\sigma_2^2$)**

$$\left(\bar{X}_1-\bar{X}_2\right)\pm t_{\alpha/2,\ \nu'}\,S_{\bar{X}_1-\bar{X}_2},\qquad S_{\bar{X}_1-\bar{X}_2}=\sqrt{\frac{S_1^2}{n_1}+\frac{S_2^2}{n_2}}$$

Here the variances are no longer pooled: each group contributes its own variance. The degrees of freedom
$\nu'$ are computed by a correction formula, and the result is usually not an integer (software computes
it automatically). Note that this standard error is the **square root of the sum of the squares of the
two groups' own standard errors** — the same logic as $S/\sqrt{n}$ for a single mean, with one extra
group.

**③ When both sample sizes are fairly large** ($n_1$ and $n_2$ both greater than 50), the $t$
distribution approximates the normal distribution, and you simply replace $t_{\alpha/2,\nu}$ with
$u_{\alpha/2}$.

**A numerical example** (using R's built-in `iris`, the sepal lengths of two iris species): 50 flowers
each of setosa and versicolor, $\bar{X}_1=5.006$, $S_1=0.352$, $\bar{X}_2=5.936$, $S_2=0.516$. With the
equal-variance formula:

$$S_c^2=\frac{49\times0.352^2+49\times0.516^2}{98}\approx0.195,\qquad S_{\bar{X}_1-\bar{X}_2}=\sqrt{0.195\times\left(\frac{1}{50}+\frac{1}{50}\right)}\approx0.0884$$

$\nu=98$, $t_{0.05/2,98}\approx1.984$, so

$$(5.006-5.936)\pm1.984\times0.0884=-0.930\pm0.175\ \Longrightarrow\ (-1.105,\ -0.755)\ \text{cm}$$

**How to read the interval**: this interval **does not contain 0**, which says that the difference
between the two species' mean sepal lengths is not 0 and the two may be considered to differ; moreover
the whole interval lies on the negative side, so setosa has the shorter sepal length (the interval gives
the **direction** of the difference). If the interval contained 0, then "a difference of 0" would be a
reasonable value and the two groups could not yet be considered to differ.

### Interval estimation of the difference between two population rates

Likewise, when comparing two rates (the effective rates of two therapies, the prevalences in two
districts), what is estimated is $\pi_1-\pi_2$, inferred from $p_1-p_2$.

**Condition**: $n_1p_1$, $n_1(1-p_1)$, $n_2p_2$ and $n_2(1-p_2)$ are all greater than 5 (both groups'
binomial distributions are close to normal).

**The normal approximation**:

$$\left(p_1-p_2\right)\pm u_{\alpha/2}\,S_{p_1-p_2},\qquad S_{p_1-p_2}=\sqrt{\frac{p_1(1-p_1)}{n_1}+\frac{p_2(1-p_2)}{n_2}}$$

Structurally it is still "estimate ± multiplier × standard error", and the standard error of the
difference between two sample rates is again the **square root of the sum of the squares of the two
groups' own standard errors**.

**A numerical example**: 47 of 200 cases in group A are positive ($p_1=0.235$), and 30 of 180 cases in
group B are positive ($p_2=0.167$).

$$S_{p_1-p_2}=\sqrt{\frac{0.235\times0.765}{200}+\frac{0.167\times0.833}{180}}\approx0.0409$$

$$(0.235-0.167)\pm1.96\times0.0409=0.068\pm0.080=(-0.012,\ 0.148)$$

So the 95% confidence interval for the difference between the two population rates is (−1.2%, 14.8%).
**The interval contains 0**, which says that a difference of 0 between the two positive rates is a
reasonable possibility, and the two population rates cannot yet be considered different.

**When the sample is small and $p$ is close to 0 or 1**: the normal approximation fails; you may correct
the sample rates by "adding 1 to the numerator and 2 to the denominator"
($\tilde p_1=(X_1+1)/(n_1+2)$, $\tilde p_2=(X_2+1)/(n_2+2)$, with the standard error also computed from
the corrected rates and the corrected denominators), or simply use an exact method. With a very small
sample the interval can come out as wide as (−50%, 64%) — a wide interval is itself a statement of "not
enough information", so do not force a conclusion.

### The relation between interval estimation and hypothesis testing

Interval estimation and hypothesis testing are the two great methods of statistical inference; they
**answer two sides of the same question**, and their conclusions agree by nature.

**Consistency**: for a two-sided test at significance level $\alpha$, the confidence interval at
confidence level $1-\alpha$ and the test conclusion correspond one to one:

- if the confidence interval **does not contain** the parameter value specified by $H_0$ ($\mu_0$ for one
  sample, 0 for a difference between two samples), that is equivalent to $P<\alpha$, and $H_0$ is
  **rejected** at level $\alpha$;
- if the interval **contains** that value, that is equivalent to $P>\alpha$, and $H_0$ is **not
  rejected**.

The reason is not hard to see: both use the same distribution and the same standard error. For example,
a study computes the 95% confidence interval for the difference between the two groups' average online
shopping spending as $126\pm1.96\times95=(-60.2,\ 312.2)$ (in yuan); the $H_0:\mu_1-\mu_2=0$ to be
tested falls inside this interval, so the hypothesis test must conclude "do not reject $H_0$" — the two
methods give the same answer. So it can be said that **a confidence interval can answer the question of
a hypothesis test.**

Note the pairing: **a two-sided test goes with a two-sided confidence interval, and the significance
level $\alpha$ goes with the confidence level $1-\alpha$**. Using a 95% confidence interval to judge a
test with $\alpha=0.01$, or taking a one-sided test's conclusion to a two-sided interval, will not match
up.

**A confidence interval also gives information a hypothesis test cannot**: the $P$ value answers only
"is there statistical significance", whereas the confidence interval also tells you **the size and
direction of the difference**, so you can judge whether it has **clinical (practical) significance**.
For example, an antihypertensive drug counts as clinically valuable only if it lowers blood pressure by
more than 10 mmHg on average; if the 95% confidence interval for the difference is (2, 6) mmHg, then
although it excludes 0 and is statistically significant, the whole interval falls short of 10 mmHg, so
it is of little clinical value. Conversely, a very wide interval (say (−1, 20)) suggests that the sample
may be too small. So **a study should report the corresponding confidence interval along with the
conclusion of the hypothesis test** — this is also the standard requirement of journals today.

## Doing it in R

### 1. A single mean: hand calculation checked against `t.test()`

```r
# R's built-in iris: sepal length of setosa (cm), 50 flowers
x <- iris$Sepal.Length[iris$Species == "setosa"]
n <- length(x)

mean(x)             # point estimate: the sample mean
sd(x)               # standard deviation S — variation between individuals
sd(x) / sqrt(n)     # standard error S_Xbar — the size of the sampling error

# Hand-computed 95% CI: Xbar ± t(0.975, n-1) · S/sqrt(n)
mean(x) + c(-1, 1) * qt(0.975, df = n - 1) * sd(x) / sqrt(n)

# Compare with the CI t.test() gives; the two should be exactly equal
t.test(x)$conf.int
```

How to read the output:

- `mean(x)` ≈ `5.006`, `sd(x)` ≈ `0.352`, `sd(x)/sqrt(n)` ≈ `0.0498` — the standard error is more than
  7 times smaller than the standard deviation; that is the precision bought by "averaging 50
  observations";
- `qt(0.975, df = 49)` = `2.0096`, which is the $t_{0.05/2,\nu}$ of the formula. `qt(p, df)` returns a
  **quantile**, and $p=0.975$ lies in the right tail, so the value is positive;
- the hand calculation gives `(4.9058, 5.1062)`, and `t.test(x)$conf.int` prints the same pair of numbers
  (it carries attributes; wrap it in `as.numeric()` and you can see they are exactly equal).

`qt(alpha/2, df)` returns a **negative** number, so you may also write
`mean(x) + c(-1, 1) * (-qt(0.025, df)) * sd(x)/sqrt(n)`; the two forms are equivalent — do not get the
sign backwards.

### 2. What the standard error really is: one sampling simulation

The standard error is defined as "the standard deviation of the sample mean"; rather than memorizing the
definition, look at it once with your own eyes.

```r
set.seed(20240601)

# Simulation: draw 8 people from N(5.00, 0.43^2) each time, repeat 1000 times, taking the sample mean each time
means <- replicate(1000, mean(rnorm(8, mean = 5.00, sd = 0.43)))

sd(means)         # ≈ 0.15: the standard deviation of 1000 sample means (the observed standard error)
0.43 / sqrt(8)    # ≈ 0.152: the theoretical value σ/√n

hist(means, main = "Distribution of 1000 sample means", xlab = "Sample mean")
```

How to read the output:

- `sd(means)` is very close to `0.43/sqrt(8)` — **"the standard deviation of the sample means" is the
  standard error**, and the theoretical formula $\sigma/\sqrt{n}$ is right;
- the histogram is bell-shaped, showing that the sample mean is approximately normal — that is the
  central limit theorem;
- try changing `8` to `64`: the sample size becomes 8 times larger and `sd(means)` drops to about
  $1/\sqrt{8}\approx0.35$ of what it was, that is from 0.15 to about 0.05. **The standard error shrinks
  with the square root of the sample size**: to halve the error you must quadruple the sample size —
  raising precision by sampling more people costs more than one imagines.

### 3. A single rate: normal approximation vs exact method

```r
# 47 positive cases found among 200 residents of a district
p <- 47 / 200
n <- 200

# Normal approximation (condition: both np and n(1-p) greater than 5)
sp <- sqrt(p * (1 - p) / n)
p + c(-1, 1) * qnorm(0.975) * sp

# Exact method (Clopper-Pearson), matching the interval the textbook's table method gives
binom.test(x = 47, n = 200)$conf.int

# Now the small sample the other way round: 2 of 45, where the normal approximation fails
p2 <- 2 / 45
p2 + c(-1, 1) * qnorm(0.975) * sqrt(p2 * (1 - p2) / 45)  # the lower limit is negative
binom.test(x = 2, n = 45)$conf.int                       # this one is usable
```

How to read the output:

- the normal approximation gives ≈ `(0.176, 0.294)`, that is (17.6%, 29.4%), in agreement with the hand
  calculation;
- `binom.test(47, 200)$conf.int` gives ≈ `(0.178, 0.300)`, that is (17.8%, 30.0%). At $n=200$ the two
  differ only slightly, showing that the normal approximation is good enough for large samples;
- for the 2 out of 45 case, the lower limit from the normal approximation comes out **negative**
  (≈ −1.6%); by the rule you would write the lower limit as 0, but the better move is to change method
  outright: `binom.test(x = 2, n = 45)$conf.int` gives ≈ `(0.005, 0.152)`, that is (0.5%, 15.2%), on the
  same order as the (1%, 15%) from the table method (the appendix table prints whole percentages and
  records 0.54% as 1%).

This also shows the relation between `binom.test()` and the textbook's appendix table: **the appendix
table is the tabulated version of the exact method**, `binom.test()` is its computed version, and
`p + c(-1,1)*qnorm(0.975)*sp` is its approximate version. When the conditions hold the three are close;
when they do not, only the exact method can be relied on.

### 4. Counting rare events: Poisson

```r
# Exact method: total count X = 8
poisson.test(8)$conf.int

# Large counts can use the normal approximation: X ± 1.96*sqrt(X)
X <- 360
X + c(-1, 1) * 1.96 * sqrt(X)
poisson.test(360)$conf.int
```

How to read the output:

- `poisson.test(8)$conf.int` ≈ `(3.45, 15.76)`, in agreement with the (3.4, 15.8) from the table;
- at $X=360$ the normal approximation gives (322.8, 397.2) and the exact method gives ≈ (323.8, 399.2);
  the two are very close — **the normal approximation is fine for large total counts, and for small
  total counts you must use the exact method**;
- if the raw data are repeated observations of "counts per unit" ($n$ observational units), first get
  the interval for the total count $X$ and then divide by $n$, or simply use `poisson.test(sum(v))` and
  divide by $n$ afterwards.

### 5. The difference between two population means

```r
x <- iris$Sepal.Length[iris$Species == "setosa"]
y <- iris$Sepal.Length[iris$Species == "versicolor"]

# R defaults to Welch's method (no equal-variance requirement), giving the 95% CI for the difference
t.test(x, y)$conf.int

# Hand-computed equal-variance (pooled variance) version
n1 <- length(x); n2 <- length(y)
sc2 <- ((n1 - 1) * var(x) + (n2 - 1) * var(y)) / (n1 + n2 - 2)   # pooled variance
sed <- sqrt(sc2 * (1/n1 + 1/n2))                                  # standard error of the difference
(mean(x) - mean(y)) + c(-1, 1) * qt(0.975, n1 + n2 - 2) * sed

# var.equal = TRUE agrees with the hand calculation; use it to force the pooled variance method
t.test(x, y, var.equal = TRUE)$conf.int
```

How to read the output:

- the hand calculation and `var.equal = TRUE` both give ≈ `(-1.105, -0.755)`, matching the hand
  calculation in Core concepts above: setosa is about 0.93 cm shorter on average than versicolor, and
  this difference is not 0;
- `t.test(x, y)` uses the Welch correction by default, so $\nu$ is not an integer (≈86.5 here) and the
  interval is ≈ `(-1.106, -0.754)`. In this example the two sample sizes are equal and the two
  algorithms differ by less than 0.001; **when the sample sizes are unequal or the variances differ the
  difference becomes noticeable**, so say clearly which one you used when you report;
- order matters: the interval from `t.test(x, y)` is for
  $\mu_{\text{setosa}}-\mu_{\text{versicolor}}$; written the other way, `t.test(y, x)`, the whole
  interval changes sign. Look at whether the interval **contains 0 and which way it points**, not just
  at how large the numbers are.

### 6. The difference between two population rates

```r
x1 <- 47; n1 <- 200
x2 <- 30; n2 <- 180

p1 <- x1 / n1
p2 <- x2 / n2
se <- sqrt(p1 * (1 - p1) / n1 + p2 * (1 - p2) / n2)

# Standard error of the difference between two sample rates: the square root of the sum of the two groups' squared standard errors
(p1 - p2) + c(-1, 1) * qnorm(0.975) * se
```

The output is ≈ `(-0.012, 0.148)`, that is (−1.2%, 14.8%). The interval contains 0, so the two
population rates cannot yet be considered different — this judgment agrees with the "P > 0.05" obtained
by a hypothesis test (the chi-square test, or the $u$ test comparing two sample rates).

> Note the difference between the two things: **interval estimation uses the two groups' own sample
> rates** ($p_1(1-p_1)/n_1+p_2(1-p_2)/n_2$), whereas the hypothesis test ($H_0:\pi_1=\pi_2$) assumes the
> two population rates are equal and therefore pools the two sets of data into
> $p_c=(X_1+X_2)/(n_1+n_2)$, with the standard error written $\sqrt{p_c(1-p_c)(1/n_1+1/n_2)}$. The two
> have different purposes and different formulas; do not mix them up.

### 7. Do the interval and the test conclusion match up?

```r
x <- iris$Sepal.Length[iris$Species == "setosa"]

# Test H0: mu = 5.0
t.test(x, mu = 5.0)$conf.int    # interval (4.906, 5.106) contains 5.0
t.test(x, mu = 5.0)$p.value     # P ≈ 0.90 > 0.05: do not reject H0

# Test H0: mu = 5.8
t.test(x, mu = 5.8)$conf.int    # still (4.906, 5.106), does not contain 5.8
t.test(x, mu = 5.8)$p.value     # P far below 0.05: reject H0
```

How to read the output: **the confidence interval computed by the two calls is exactly the same** —
because the confidence interval is "computed from the data" and has nothing to do with $H_0$; all that
changes is which hypothesized value you compare it with. If the value under $H_0$ falls inside the
interval → $P$ is greater than $\alpha$; if it falls outside → $P$ is less than $\alpha$. This is the
hands-on version of "a confidence interval can answer the question of a hypothesis test".

### 8. Missing values: think it through before computing a standard error

```r
# airquality$Ozone has missing values (NA)
mean(airquality$Ozone)                       # NA — computing it directly collapses
mean(airquality$Ozone, na.rm = TRUE)         # ≈ 42.13
x <- na.omit(airquality$Ozone)               # safer: remove the missing values first
mean(x) + c(-1, 1) * qt(0.975, length(x) - 1) * sd(x) / sqrt(length(x))
```

How to read the output: $n=116$ (37 of the original 153 rows are missing), $\bar{X}\approx42.13$,
$S\approx32.99$, $S_{\bar{X}}\approx3.06$, and the 95% confidence interval ≈ (36.1, 48.2).

Two details: both `na.rm = TRUE` and `na.omit()` exclude the missing values, but **how many observations
you drop changes $n$, and therefore changes the standard error and the degrees of freedom**, so the
number of cases actually analyzed must be stated clearly in the report; in addition, the ozone
concentration distribution is clearly right-skewed and the sample size is only 116, so be careful when
using it for a normal-approximation interval — plot the distribution first, and transform the variable
if necessary.

## Common pitfalls

- **Writing the standard deviation into a conclusion as if it were the standard error (or the other way
  round).** "The average heart rate of adult men in this district is 78.82±9.58 beats/min" is wrong:
  9.58 is the variation **between individuals**, and to state the precision of the estimate of the
  population mean you must write $S/\sqrt{n}=0.8245$. How to decide: if it is about "the population
  mean" or "estimation", use the standard error; if it is about "the reference range" or "whether an
  individual is normal", use the standard deviation.
- **Thinking "once the sample is large you must abandon the $t$ distribution", or misremembering the
  denominator of the formula.** Quite the opposite: when $\sigma$ is unknown the **$t$ distribution
  method can be used no matter how large $n$ is** ($\bar{X}\pm t_{\alpha/2,\nu}S_{\bar{X}}$); for large
  $n$ its result is almost the same as the $u$ distribution method, only more exact, and "switch to 1.96
  once $n>50$" is merely a convenience for hand calculation. Also, $\sigma_{\bar{X}}=\sigma/\sqrt{n}$,
  **not** $\sigma/n$; the degrees of freedom of a one-sample $t$ are $n-1$, and for two samples with
  pooled variance $n_1+n_2-2$; the denominator of the $S$ used to estimate $\sigma$ is $n-1$.
- **Getting the meaning of the confidence interval backwards.** What is random is the interval, not the
  parameter, so you cannot say "the population mean has a 95% probability of falling within (77.20,
  80.44)"; the correct statement is "this interval contains the population mean, with confidence 95%".
  Also, **a confidence interval is not a reference range**: the former is about the population mean and
  uses the standard error, the latter is about an individual and uses the standard deviation.
- **Forcing the normal approximation on a small sample with $p$ close to 0 or 1.** The condition is that
  both $np$ and $n(1-p)$ are **greater than 5**; if it is not met, use the table method (or
  `binom.test()`). A negative lower limit or an upper limit above 100% is the signal that the condition
  is not met; truncating at 0% is only a patch, and changing method is the real answer.
- **The two classic mistakes when comparing two groups.** The first is **forgetting to check whether the
  interval contains 0**: for the interval of a difference between two population means or two rates,
  containing 0 means a difference cannot yet be claimed; also look at the direction and the width of the
  interval, since a very wide interval that "shows a difference" usually means the sample is too small.
  The second is **mixing up the standard errors for estimation and for testing**: for **interval
  estimation** of the difference between two sample rates you use the $S_{p_1-p_2}$ built from the two
  groups' own rates, while for the **hypothesis test** ($H_0:\pi_1=\pi_2$) you compute the standard
  error from the pooled rate $p_c$; the formulas differ.

## How it connects to the other courses

::: tip Related pages
- **[Lecture 12 of *Introduction to Information Technology*, Parameter Estimation](/en/intro-it/12-parameter-estimation)**
  — this is the most direct correspondence this chapter has, and the two should name each other: that
  lecture is about **computing the intervals in R**, breaking interval estimation into two blanks, "which
  distribution do you take the quantile from" and "how do you compute the standard error", with four
  exercises covering the mean of one normal population ($\sigma$ unknown), the difference between two
  normal population means ($\sigma$ known), the variance ratio, and the parameter of an exponential
  population; this chapter explains **why those formulas look the way they do** — sampling error, the
  standard error, where the $t$ distribution comes from, and how the degrees of freedom are fixed. The
  `mean(x) + c(-1,1)*qt(0.975, df)*sd(x)/sqrt(n)` of section 1 on this page computes the same expression
  as the hand-written function `fun1201` in that lecture, except that there `qt(alpha/2, n-1)` takes a
  negative quantile and the `+` sign builds the two endpoints. **Understand the standard error and the
  $t$ distribution in this chapter first, and the `switch` skeleton in that lecture is nothing but
  filling in formulas.**
- **[Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing](/en/intro-it/13-hypothesis-testing)**
  — the last section of this chapter says that a confidence interval can answer the question of a
  hypothesis test, and that lecture is exactly the other half of that question: it is again
  $\bar{X}\pm$ some multiple of the standard error, but there you compare the $P$ value with $\alpha$,
  while here you judge by whether the interval contains the hypothesized value. Both sides compute the
  same statistic; one gives "how significant", the other "by how much".
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/en/intro-it/9-base-graphics)**
  — this chapter's sampling distributions, $t$ distribution curves, and the question of how many of 100
  confidence intervals fail to cover the population mean can only be seen by plotting. The `hist()` used
  in section 2 of this page is in that lecture; to understand the meaning of a "95% confidence interval"
  more intuitively, follow that lecture's approach and draw 100 intervals as vertical lines plus a
  horizontal line for $\mu$, and you can count the misses at a glance.
- **[Week 1 of *Medical Big Data Analysis and Decision Making*, Using R and Getting Data](/en/Medical-Big-Data-Analysis/1-r-basics-and-data)**
  — the `airquality$Ozone` example in section 8 of this chapter connects to that week: how `na.omit()` is
  used to find and handle missing values. Whether outliers and skewed distributions need transforming is
  the business of Week 2, Data Preprocessing, but both are homework "before computing any statistic".
  That week tells it from the angle of data preparation; this chapter adds its consequence for inference
  — **however many observations you drop, $n$ and the degrees of freedom change, and the standard error
  and the confidence interval change with them**, so the number of cases actually included in the
  analysis must be stated when results are reported.
:::

<!-- Back-link suggestions
Suggest linking back to this page (all pointing at /Health-statistics/06-estimation, or at
/en/Health-statistics/06-estimation once translated) from:
- /intro-it/12-parameter-estimation, at "Summary of this lecture": add a sentence "The principles behind
  these interval formulas, and where the standard error and the degrees of freedom come from, are in
  Chapter 6 of Health Statistics; that page also has the large-sample u distribution versus small-sample
  t distribution decision and interval estimation for a population rate".
- /intro-it/12-parameter-estimation, at "Exercise 2: confidence interval for the difference between two
  normal population means when the variance is known": add a sentence "The full discussion of the
  unequal-variance and equal-variance cases for the difference between two population means is in
  Chapter 6 of Health Statistics".
- /intro-it/13-hypothesis-testing, where "P value and significance level" or "Summary of this lecture" is
  discussed: add a sentence "The consistency between a confidence interval and a hypothesis test
  conclusion (whether the interval contains the hypothesized value) is in Chapter 6 of Health
  Statistics".
- /intro-it/9-base-graphics, where hist() / distribution curve plotting is discussed: add a sentence
  "Using it to draw sampling distributions, t distribution curves, and schematic 95% confidence
  intervals is in Chapter 6 of Health Statistics".
- /Medical-Big-Data-Analysis/2-data-preprocessing, at missing value handling: add a sentence "The effect
  of missing values on the sample size, the standard error, and the confidence interval is in Chapter 6
  of Health Statistics".
-->

## Summary

1. **A sample statistic cannot be used directly as the population parameter.** Sampling error is caused
   by individual variation plus sampling; it is unavoidable but follows laws, and the quantity that
   describes it is the **standard error**. The standard error is not the standard deviation: the
   standard deviation describes variation between individuals (used for reference ranges), the standard
   error describes variation of the sample mean (used for parameter estimation and hypothesis testing).
   $S_{\bar{X}}=S/\sqrt{n}$ is proportional to $S$ and inversely proportional to $\sqrt{n}$, so **the
   only way to reduce sampling error is to increase the sample size**.
2. **The $t$ distribution is the remedy when $\sigma$ is unknown, and the basis of the confidence
   interval for a population mean.** $t=\dfrac{\bar{X}-\mu}{S/\sqrt{n}}$ follows a $t$ distribution with
   $\nu=n-1$ degrees of freedom: unimodal, symmetric, with higher tails the smaller $\nu$ is, and
   tending to the standard normal as $\nu\to\infty$; when reading the table you must distinguish the
   one-sided $t_{\alpha,\nu}$ from the two-sided $t_{\alpha/2,\nu}$. The 95% confidence interval for a
   population mean is $\bar{X}\pm t_{0.05/2,\nu}S_{\bar{X}}$, where $S_{\bar{X}}$ is the standard error
   and $\nu=n-1$; when $\sigma$ is known use $\bar{X}\pm1.96\sigma_{\bar{X}}$, and when $\sigma$ is
   unknown but the sample is large you may approximate with $\bar{X}\pm1.96S_{\bar{X}}$. Its meaning is
   "this interval contains the population mean, with confidence 95%", not "the parameter has a 95%
   probability of falling inside it", and it is not a reference range; confidence and precision must be
   balanced.
3. **The confidence interval for a population rate** has two methods: when $n$ is small (say $n\le50$)
   or $p$ is close to 0/1 use the **table method** ($n=45$, $X=2$ gives (1%, 15%)); when both $np$ and
   $n(1-p)$ are greater than 5 use the **normal approximation** $p\pm u_{\alpha/2}S_p$ with
   $S_p=\sqrt{p(1-p)/n}$, and if the lower limit comes out negative, truncate it to 0 and recognize that
   this signals too small a sample. Counts of rare events follow the **Poisson distribution** (mean equal
   to variance, and additive); for a total count $X>50$ use $\frac{1}{n}(X\pm1.96\sqrt{X})$, and for
   $X\le50$ use the table.
4. **The difference between two populations** uses "difference ± multiplier × standard error of the
   difference": for a difference of means, the pooled variance $S_c^2$ and $t_{\alpha/2,n_1+n_2-2}$
   (with unequal variances, the separate variances and the corrected degrees of freedom); for a
   difference of rates, $\sqrt{p_1(1-p_1)/n_1+p_2(1-p_2)/n_2}$ and $u_{\alpha/2}$. **If the interval
   contains 0, the two groups cannot be considered different.**
5. **Interval estimation and hypothesis testing complement each other.** For a two-sided test, whether
   the $1-\alpha$ confidence interval contains the value under $H_0$ agrees exactly with comparing the
   $P$ value against $\alpha$; the confidence interval additionally gives the **size and direction** of
   the difference, so it shows whether there is practical significance — which is why it should be
   reported together with the conclusion.
