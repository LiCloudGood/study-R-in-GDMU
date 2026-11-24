---
layout: doc
title: '13. Parametric Hypothesis Testing'
---

<script setup>
const code1301 = `fun1301 = function(x, mu, alpha = 0.05, alt){
  n = length(x)
  t0 = (mean(x) - mu)/sd(x)*sqrt(n)
  p0 = pt(t0, n-1)
  p = switch(
    alt,
    two.sided = 2*ifelse(p0<0.5, p0, 1-p0),
    greater = 1 - p0,
    less = p0
  )
  int = switch(
    alt,
    two.sided = c(
      qt(alpha/2, n-1), qt(1-alpha/2, n-1)),
    greater = c(-Inf, qt(1-alpha, n-1)),
    less = c(qt(alpha, n-1), Inf)
  )
  list(statistic = t0, interval = int, p.value = p)
}
# test
x = rnorm(100)
fun1301(x, 0, alt = 'two.sided')
fun1301(x, 0, alt = 'greater')
fun1301(x, 0, alt = 'less')`

const code1302 = `fun1302 = function(x, y, sigma1, sigma2, alt){
  m = length(x)
  n = length(y)
  z0 = (mean(x) - mean(y))/sqrt(sigma1^2/m + sigma2^2/n)
  p0 = pnorm(z0)
  switch(
    alt,
    two.sided = 2*ifelse(p0<0.5, p0, 1-p0),
    greater = 1-p0,
    less = p0
  )
}
# test
x = rnorm(100,1)
y = rnorm(200,2,2)
fun1302(x, y, 1, 2, alt = 'two.sided')
fun1302(x, y, 1, 2, alt = 'greater')
fun1302(x, y, 1, 2, alt = 'less')`

const code1303 = `x = c(0.840, 0.591, 0.674, 0.632, 0.687, 0.978,
      0.750, 0.730, 1.200, 0.870)
y = c(0.580, 0.509, 0.500, 0.316, 0.337, 0.517,
      0.454, 0.512, 0.997, 0.506)
t.test(x, y, paired = TRUE)$p.value
# The measurement results of the two methods differ significantly`

const out1303 = `[1] 2.383952e-05`

const code1304 = `x = c(134, 146, 104, 119, 124, 161, 107,
      83, 113, 129, 97, 123)
y = c(70, 118, 101, 85, 107, 132, 94)
(ret = var.test(x,y)$p.value)
if(ret<0.05){
  p = t.test(x,y)$p.value
}else{
  p = t.test(x,y,var.equal = TRUE)$p.value
}
print(p)
# Accept the null hypothesis: the two drinks do not differ significantly in the weight gain of the female mice`

const code1305 = `binom.test(45, 100, p = 0.6, alternative = 'less')$p.value
# Reject the null hypothesis: it may be considered clearly below 60%`

const out1305 = `[1] 0.001710927`

const code1306 = `fun1306 = function(x, lambda, alt){
  n = length(x)
  z0 = 2*n*lambda*mean(x)
  p0 = pchisq(z0, 2*n)
  switch(
    alt,
    two.sided = 2*min(p0,1-p0),# 2*ifelse(p0<0.5, p0, 1-p0)
    greater = 1-p0,
    less = p0
  )
}
# test
x = rexp(100,3)
fun1306(x, 3, alt = 'two.sided')
fun1306(x, 3, alt = 'greater')
fun1306(x, 3, alt = 'less')`
</script>

# Parametric Hypothesis Testing

::: info Translation status
Translated from the [Chinese original](/intro-it/13-hypothesis-testing). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

## Objectives

- Master how to compute the test $P$ value and the critical value for a parametric test on a normal
  distribution.
- Master how to compute the $P$ value and the critical value for a parametric test on a non-normal
  distribution.
- Master the R functions for parametric tests.

::: tip A $P$ value and an “acceptance region” are two ways of saying the same thing
A hypothesis test can be judged in two equivalent ways, and this lecture writes both:

| Approach | How you judge | What you need |
| --- | --- | --- |
| **$P$ value approach** | reject the null hypothesis when $p < \alpha$ | compute the statistic → look up the tail probability in the distribution |
| **Acceptance-region approach** | do not reject when the statistic **falls inside the acceptance region** | compute the quantiles → mark out an interval |

Precisely because the two are the same thing, every `switch` below has to be written twice — once for
`p.value` and once for `interval`.
:::

## Exercise 1: Testing the mean of a normal population when the variance is unknown

Open the script file **test1301.R** and carry out the following operations.

1. When the variance is unknown, the test statistic for the mean is

   $$T = \frac{\bar{X}-\mu_0}{S/\sqrt{n}} \sim t(n-1)$$

   where $n$ is the sample size.

2. The test $P$ value of a parametric hypothesis test is computed as follows:

   $$p = \begin{cases}
   2 \times \min(p_0,\ 1-p_0) & \text{two-sided test}\\[4pt]
   1 - p_0 & \text{right-sided test}\\[4pt]
   p_0 & \text{left-sided test}
   \end{cases}$$

   where $p_0 = P(T \le t_0)$ is the probability, and $t_0$ is the value of the statistic.

3. The acceptance region（接受域） of a parametric hypothesis test is computed as follows:
   - determine the quantiles $t_{\alpha/2}$, $t_{1-\alpha/2}$, $t_{\alpha}$, $t_{1-\alpha}$ from the distribution of the statistic $T$ and from $\alpha$;
   - return the acceptance region: for a two-sided test the acceptance region is $[t_{\alpha/2},\ t_{1-\alpha/2}]$; for a right-sided test it is $(-\infty,\ t_{1-\alpha}]$; for a left-sided test it is $[t_{\alpha},\ +\infty)$.

4. Complete the user-defined function `fun1301`, in which the argument `mu` stands for $\mu_0$, the argument `alt='two.sided'` stands for a two-sided test, `alt='greater'` stands for a right-sided test, and `alt='less'` stands for a left-sided test; the return value is a list object containing the three objects `statistic`, `interval`, and `p.value`.

<AnswerBlock title="Exercise 1 · Reference answer" :code="code1301" />

::: tip `p0` is “the area on the left”, and all three tests are built from it
`p0 = pt(t0, n-1)` computes $P(T \le t_0)$, that is, **the cumulative probability to the left of the
statistic**.

| Test | $P$ value | Intuition |
| --- | --- | --- |
| two-sided | $2\times\min(p_0, 1-p_0)$ | take the area on **the side farther from the center**, then double it |
| right-sided | $1-p_0$ | the area **greater** than $t_0$ |
| left-sided | $p_0$ | the area **less** than $t_0$ |

Why write `min(p0, 1-p0)`? Because $t_0$ may fall on the right or on the left, but the side that is
“farther from the center” is always the side with the smaller probability, so taking the `min` saves
you from discussing the cases separately.

**The `list()` return value**: the exercise asks for three things to be returned at once, so in R you
pack them with `list()`; after the call you can take them out with `$`: `fun1301(x, 0)$p.value`.

> Note: the argument name for a left-sided test is **`'less'`** (R's general convention, and
> `t.test()` is written the same way).
> `switch` does only **exact matching**: a misspelled name does not raise an error, but **quietly
> returns `NULL`** — the trap most easily fallen into in this lecture.
:::

## Exercise 2: Testing the difference in means of two normal populations when the variances are known

Open the script file **test1302.R** and carry out the following operations.

1. When the variances are known, the test statistic for the difference in means is

   $$Z = \frac{\bar{X}-\bar{Y}}{\sqrt{\sigma_1^2/m+\sigma_2^2/n}} \sim N(0,1)$$

   where $m$ and $n$ are the sample sizes of the two populations $X$ and $Y$ respectively, and
   $\sigma_1^2$ and $\sigma_2^2$ are the variances of the two populations $X$ and $Y$ respectively.

2. The test $P$ value of a parametric hypothesis test is computed as follows:

   $$p = \begin{cases}
   2 \times \min(p_0,\ 1-p_0) & \text{two-sided test}\\[4pt]
   1 - p_0 & \text{right-sided test}\\[4pt]
   p_0 & \text{left-sided test}
   \end{cases}$$

   where $p_0 = P(Z \le z_0)$ is the probability, and $z_0$ is the value of the statistic.

3. Complete the user-defined function `fun1302`, in which the arguments `sigma1` and `sigma2` stand for $\sigma_1^2$ and $\sigma_2^2$ respectively, `alt='two.sided'` stands for a two-sided test, `alt='greater'` stands for a right-sided test, and `alt='less'` stands for a left-sided test; return the test $P$ value.

<AnswerBlock title="Exercise 2 · Reference answer" :code="code1302" />

::: tip Carry the whole structure of Exercise 1 over
Compare the code of the two exercises and you will find **only three differences**:

| | Exercise 1 | Exercise 2 |
| --- | --- | --- |
| statistic | `(mean(x)-mu)/sd(x)*sqrt(n)` | `(mean(x)-mean(y))/sqrt(σ₁²/m+σ₂²/n)` |
| distribution function | `pt(t0, n-1)` | `pnorm(z0)` |
| acceptance region | `qt(...)` for the $t$ quantiles | this exercise only asks for the $P$ value back |

The $P$ value part is **exactly the same** — because the logic of $2\times\min(p_0,1-p_0)$ has nothing
to do with whether the distribution is a $t$ distribution or a normal distribution: it holds for any
distribution **symmetric about 0**.

**`pnorm` / `pt` / `pchisq` are “distribution functions”**: give them a number and they return a
cumulative probability; `qnorm` / `qt` / `qchisq` are “quantile functions” (learned in Lecture 12):
give them a probability and they return a number. `p` and `q` are exactly a pair of inverse operations.
:::

## Exercise 3: The R function for a mean test

Create the script file **test1303.R** and choose the appropriate test function to carry out the test
below.

To compare whether two methods give different results for the fat content measured in a lactic acid
beverage, 10 lactic acid beverage products were drawn at random and measured by the fatty acid
hydrolysis method and the Roese-Gottlieb method respectively; the results are as follows:

- Roese-Gottlieb method: 0.840, 0.591, 0.674, 0.632, 0.687, 0.978, 0.750, 0.730, 1.200, 0.870
- Hydrolysis method: 0.580, 0.509, 0.500, 0.316, 0.337, 0.517, 0.454, 0.512, 0.997, 0.506

Do the two methods give different results? Take $\alpha=0.05$.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code1303"
  :output="out1303" />

::: tip Why `paired = TRUE` — deciding between paired and independent
This is the question you have to **think through before anything else** when doing a hypothesis test:

| Situation | What to use | Basis for the judgment |
| --- | --- | --- |
| the same batch of samples, **each measured once by both methods** | the **paired（配对）** $t$ test, `paired = TRUE` | every sample has “a pair” of values |
| two groups of **mutually unrelated** subjects measured separately | the two-sample $t$ test (independent samples), the default | the two group sizes may differ |

This exercise is “10 beverages, each measured by both methods” — the two measurements of the $i$th
beverage are paired by nature, so a paired test must be used.

A paired test looks at **whether the mean of the differences within pairs is significantly different
from 0**, which cancels out the nuisance that “the samples themselves differ in fat content”, and
makes the test more sensitive.

Conclusion: $p < 0.05$, and **the measurement results of the two methods differ significantly**.
:::

## Exercise 4: R functions for testing homogeneity of variance and testing means

Create the script file **test1304.R** and carry out the test below.

Two groups of female mice were fed two different feeds, and the weight gain (g) was recorded after 8
weeks. Is the difference in the mean weight gain of the two groups significant? **First carry out a
test for homogeneity of variance（方差齐性检验）** (that is, the $F$ test), and then choose the
$t$ test method according to the result of the homogeneity test, with $\alpha=0.05$.

- Group A: 134, 146, 104, 119, 124, 161, 107, 83, 113, 129, 97, 123
- Group B: 70, 118, 101, 85, 107, 132, 94

<AnswerBlock title="Exercise 4 · Reference answer" :code="code1304" />

::: tip The standard two-stage testing workflow
```
Step 1: var.test(x, y)  →  see whether the variances are homogeneous
Step 2: from the result of the previous step, choose one of the two
         variances equal   →  t.test(x, y, var.equal = TRUE)   equal-variance t test
         variances unequal →  t.test(x, y)                    Welch t test (default)
```

**Get the direction clear**:
a $P$ value from `var.test` **less than** 0.05 means the variances are **not** homogeneous, and only
then is Welch's correction needed.
The answer writes `if (ret < 0.05)` to take `t.test(x,y)` (Welch), and otherwise to take
`var.equal = TRUE` — do not get it backwards.

An **assignment in parentheses** such as `(ret = var.test(x,y)$p.value)` prints the value at the same
time, which is a very handy little trick (something similar appeared back in Lecture 1).

Conclusion: $p > 0.05$; **accept the null hypothesis: the two feeds do not differ significantly in the
weight gain of the female mice**.
:::

## Exercise 5: The R function for testing a success rate

Create the script file **test1305.R** and carry out the test below.

The pass rate of a certain ability test is usually 60%. Of the people who took the test this year, 100
were drawn at random and only 45 passed the test. Is this year's pass rate clearly lower than the
usual level? Take $\alpha=0.05$.

<AnswerBlock title="Exercise 5 · Reference answer" :code="code1305"
  :output="out1305" />

::: tip Why a proportion test uses `binom.test`
The data here are “45 successes in 100 trials”, which is a sample from a **binomial distribution**, not
continuous data, so a $t$ test cannot be used.

```r
binom.test(number_of_successes, number_of_trials, p = success_rate_under_H0, alternative = 'less')
```

**How is the direction of `alternative` decided?** Look at what the question asks — “is it **lower**?”
— what concerns us is the “too small” side, so it is `'less'`.

The three possible values:

| `alternative` | Which side the rejection region is on | When to use it |
| --- | --- | --- |
| `'two.sided'` | both sides | asking “is it **different**?” |
| `'greater'` | the right side | asking “is it **higher**?” |
| `'less'` | the left side | asking “is it **lower**?” |

Conclusion: $p < 0.05$, **reject the null hypothesis**, and this year's pass rate may be considered
clearly lower than 60%.
:::

## Exercise 6: A parametric test for the exponential distribution

Open the script file **test1306.R** and carry out the test below.

1. The statistic for a parametric test of the exponential distribution

   $$Z = 2n\lambda_0\bar{X} \sim \chi^2(2n)$$

   where $\lambda_0$ is the target value of the test and $n$ is the sample size.

2. Complete the user-defined function `fun1306`, which returns the test $P$ value. The argument `lambda` stands for $\lambda_0$, the argument `alt='two.sided'` stands for a two-sided test, `alt='greater'` stands for a right-sided test, and `alt='less'` stands for a left-sided test.

<AnswerBlock title="Exercise 6 · Reference answer" :code="code1306" />

::: warning The chi-square distribution is asymmetric, so a two-sided $P$ value cannot be doubled
Lecture 12 mentioned that the $F$ distribution is asymmetric; here $\chi^2$ is the same.

For a **symmetric** distribution (normal, $t$), the two-sided $P$ value is
$2\times\min(p_0,1-p_0)$, because the two sides have equal area.
But **the chi-square distribution is skewed**: the left and right tails are not equally thick, so
doubling directly gives the wrong answer.

That is why the answer uses:

```r
two.sided = 2*min(p0, 1-p0)
```

This is still an **approximate** way of writing it (the comment also gives the equivalent `ifelse`
version). A strict two-sided $P$ value should look for the “equally extreme” point on the other side,
but what the course requires you to master is this $2\times\min$ routine.

**The degrees of freedom of the statistic are $2n$**, different from the $n-1$ of Exercise 1 — the root
of it was covered in Lecture 12: $2\lambda X \sim \chi^2(2)$, and adding up $n$ of them gives
$\chi^2(2n)$.
:::

## Summary

### The four kinds of distribution in a parametric test

| Setting | Statistic | Distribution |
| --- | --- | --- |
| one normal mean, $\sigma$ unknown | $\dfrac{\bar{X}-\mu_0}{S/\sqrt{n}}$ | `pt(..., n-1)` / `qt(..., n-1)` |
| difference of two normal means, $\sigma$ known | $\dfrac{\bar{X}-\bar{Y}}{\sqrt{\sigma_1^2/m+\sigma_2^2/n}}$ | `pnorm` / `qnorm` |
| exponential parameter | $2n\lambda_0\bar{X}$ | `pchisq(..., 2n)` / `qchisq(..., 2n)` |

### Ready-made test functions

| Function | Purpose | Key arguments |
| --- | --- | --- |
| `t.test(x, y)` | mean test | `paired` (paired), `var.equal` (equal variances) |
| `var.test(x, y)` | test for homogeneity of variance | — |
| `binom.test(k, n, p)` | proportion test | `p` (the proportion under the null hypothesis), `alternative` |
| `chisq.test()` | contingency table / goodness of fit | see Lecture 14 |

### Remembering the three directions of `alternative`

| Value | Meaning | Corresponding $P$ value |
| --- | --- | --- |
| `'two.sided'` | different | $2\times\min(p_0,\ 1-p_0)$ |
| `'greater'` | higher | $1-p_0$ |
| `'less'` | lower | $p_0$ |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第十三周原题` (the Week 13 original exercises) and the answers from
`资料/答案/第十三周答案` (the Week 13 answer scripts); only the typos in them have been corrected.
The formulas in the original exercises are Word equation objects, and a plain-text extraction runs them
together; this page has restored them in LaTeX in the standard statistical form, and they have been
checked item by item against the actual computations of the answer scripts.
:::

::: tip Want the statistics behind it?
This lecture is practice in **how to write the code and how to read a $P$ value**; for the ideas behind
hypothesis testing, the two types of error, power, and one- versus two-sided tests, see the
corresponding summary in *Health Statistics*.

See **[Chapter 7 of *Health Statistics*, Hypothesis Testing](/en/Health-statistics/07-hypothesis-testing)**.
:::
