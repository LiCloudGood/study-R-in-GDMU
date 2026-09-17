---
layout: doc
title: '12. Parameter Estimation'
---

<script setup>
const code1201 = `fun1201 = function(x, alpha = 0.05, alt = 'two.sided'){
  n = length(x)
  ta = switch(
    alt,
    two.sided = qt(alpha/2, n-1),
    greater = qt(alpha, n-1),
    less = qt(1-alpha, n-1)
  )
  avg = mean(x)
  se = sd(x)/sqrt(n)
  switch(
    alt,
    two.sided = avg + c(ta, -ta)*se,
    greater = c(avg + ta*se, Inf),
    less = c(-Inf, avg + ta*se)
  )
}
# Use fun1201 to compute the two-sided and one-sided intervals for x
x = rnorm(100)
fun1201(x)
fun1201(x, alt = 'greater')
fun1201(x, alt = 'less')
# Use t.test to compute the two-sided interval for x
as.numeric(t.test(x)$conf.int)`

const code1202 = `fun1202 = function(
    x, y, sigma1, sigma2, alpha = 0.05,
    alt = 'two.sided'){
  m = length(x)
  n = length(y)
  ua = ifelse(
    alt == 'two.sided',
    qnorm(alpha/2),
    qnorm(alpha)
  )
  se = sqrt(sigma1^2/m + sigma2^2/n)
  avg = mean(x)-mean(y)
  switch (
    alt,
    two.sided = avg + c(ua, -ua)*se,
    greater = c(avg + ua*se, Inf),
    less = c(-Inf, avg - ua*se)
  )
}
# Test the user-defined function
x = rnorm(100, 1, 2)
y = rnorm(50, 1, 1)
fun1202(x,y,2,1)
fun1202(x,y,2,1,alt = 'greater')
fun1202(x,y,2,1,alt = 'less')`

const code1203 = `fun1203 = function(x, y, mu1, mu2,
                   alpha = 0.05, alt = 'two.sided'){
  m = length(x)
  n = length(y)
  fa = switch(
    alt,
    two.sided = c(qf(1-alpha/2, m, n), qf(alpha/2, m, n)),
    greater = qf(1-alpha, m, n),
    less = qf(alpha, m, n)
  )
  se = n*sum((x - mu1)^2)/(m*sum((y - mu2)^2))
  switch (
    alt,
    two.sided = se/fa,
    greater = c(se/fa, Inf),
    less = c(-Inf, se/fa)
  )
}
# test
x = rnorm(100, 1, 1)
y = rnorm(200, 4, 2)
fun1203(x, y, 1, 4)
fun1203(x, y, 1, 4, alt = 'greater')
fun1203(x, y, 1, 4, alt = 'less')`

const code1204 = `fun1204 = function(x, alpha = 0.05, alt = 'two.sided'){
  n = length(x)
  xa = switch(
    alt,
    two.sided = c(qchisq(alpha/2, 2*n), qchisq(1-alpha/2, 2*n)),
    greater = qchisq(alpha, 2*n),
    less = qchisq(1-alpha, 2*n)
  )
  se = 2*n*mean(x)
  switch(
    alt,
    two.sided = xa / se,
    greater = c(xa/se, Inf),
    less = c(0, xa/se)
  )
}
# test
x = rexp(100,6)
fun1204(x)
fun1204(x, alt = 'greater')
fun1204(x, alt = 'less')`
</script>

# Parameter Estimation

::: info Translation status
Translated from the [Chinese original](/intro-it/12-parameter-estimation). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

## Objectives

- Master how to compute confidence intervals for the parameters of a normal distribution.
- Master how to compute confidence intervals for the parameters of a 0-1 distribution.
- Master how to compute confidence intervals for the parameters of an exponential distribution.

::: tip The common skeleton behind the four exercises in this lecture
The four exercises look as though their formulas are all over the place, but the skeleton is exactly the
same:

```r
fun = function(data, ..., alpha = 0.05, alt = 'two.sided') {
  quantile = switch(alt, two.sided = ..., greater = ..., less = ...)
  SE = ...                       # different for every exercise — the only difference
  switch(alt,
    two.sided = estimate + c(quantile, -quantile) * SE,   # two-sided: one on each side
    greater   = c(estimate + quantile * SE, Inf),         # right-sided: a lower bound only
    less      = c(-Inf, estimate + quantile * SE)         # left-sided: an upper bound only
  )
}
```

**Remember this structure and the four exercises become fill-in-the-blank questions** — you only have to
swap out “which distribution the quantile comes from” and “how the standard error is computed”.
:::

## Exercise 1: Interval estimation of the mean of a normal sample when the variance is unknown

Open **test1201.R** and complete the tasks below.

1. With the variance unknown, the interval formula for the population parameter $\mu$ is as follows:

   - two-sided interval: $\bar{X} \mp t_{\alpha/2}(n-1)\dfrac{S}{\sqrt{n}}$
   - right-sided interval: $\left[\bar{X} + t_{\alpha}(n-1)\dfrac{S}{\sqrt{n}},\ +\infty\right)$
   - left-sided interval: $\left(-\infty,\ \bar{X} + t_{1-\alpha}(n-1)\dfrac{S}{\sqrt{n}}\right]$

   where $t_{\alpha/2}$, $t_{\alpha}$, and $t_{1-\alpha}$ are the quantiles of the $t$ distribution with
   $n-1$ degrees of freedom corresponding to $\alpha/2$, $\alpha$, and $1-\alpha$.

2. In the user-defined function, `alt='two.sided'` means the two-sided interval is computed,
   `alt='greater'` the right-sided interval, and `alt='less'` the left-sided interval.
3. The value returned by the user-defined function is a vector made up of the interval endpoints.
4. Test the user-defined function on the data in `x`; then use `t.test` to compute the two-sided interval
   and compare it with the result of the user-defined function — are they the same?

<AnswerBlock title="Exercise 1 · Reference answer" :code="code1201" />

::: tip The four quantile functions — the core tools of this lecture
| Distribution | Quantile function | How it is written | Degrees of freedom |
| --- | --- | --- | --- |
| standard normal | `qnorm(p)` | `qnorm(alpha/2)` | none |
| $t$ distribution | `qt(p, df)` | `qt(alpha/2, n-1)` | `n - 1` |
| $F$ distribution | `qf(p, df1, df2)` | `qf(1-alpha/2, m, n)` | `m`, `n` |
| chi-square distribution | `qchisq(p, df)` | `qchisq(alpha/2, 2*n)` | `2n` |

⚠️ **`qt(alpha/2, n-1)` gives a negative number** (because $\alpha/2$ is very small and falls in the left
tail).
Writing the two-sided interval as `avg + c(ta, -ta) * se` puts that minus sign to use to produce “one
subtracted, one added”, which is less work than writing `c(avg - 1.96*se, avg + 1.96*se)` by hand.

**The answer to part 4: exactly the same.** `t.test(x)$conf.int` computes that same formula, and
`as.numeric()` only strips the attributes off the result so that it can be compared with the output of the
user-defined function.
:::

## Exercise 2: Confidence interval for the difference of two normal population means when the variances are known

Open **test1202.R** and complete the tasks below.

1. When the variances $\sigma_1^2$ and $\sigma_2^2$ are known, the confidence interval for the difference
   of the two sample means is:

   - two-sided interval: $\bar{X}-\bar{Y} \mp u_{\alpha/2}\,sd$
   - right-sided interval: $\left[\bar{X}-\bar{Y} + u_{\alpha}\,sd,\ +\infty\right)$
   - left-sided interval: $\left(-\infty,\ \bar{X}-\bar{Y} - u_{\alpha}\,sd\right]$

   where $sd = \sqrt{\dfrac{\sigma_1^2}{m} + \dfrac{\sigma_2^2}{n}}$, and $u_{\alpha/2}$, $u_{\alpha}$ are
   quantiles of the standard normal distribution.

2. In the user-defined function `fun1202`, the arguments `sigma1` and `sigma2` stand for $\sigma_1^2$ and
   $\sigma_2^2$, `alt='two.sided'` means the two-sided interval is computed, `alt='greater'` the
   right-sided interval, and `alt='less'` the left-sided interval.
3. The value returned by the user-defined function is a vector made up of the interval endpoints.

<AnswerBlock title="Exercise 2 · Reference answer" :code="code1202" />

::: tip Why qnorm here and not qt
Because **the variance is known**. The $t$ distribution appears in order to compensate for the extra
uncertainty brought by “using the sample standard deviation $S$ in place of the population standard
deviation $\sigma$” (the degrees of freedom $n-1$ are what that compensation costs).

Once $\sigma$ is known, no compensation is needed, and the **standard normal** quantile $u$ is used
directly (the number 1.96).

The standard error changes with it in the same way — the standard error of the difference of the two
sample means is $sd=\sqrt{\frac{\sigma_1^2}{m}+\frac{\sigma_2^2}{n}}$. Note that **m and n each go with
their own variance**, so do not swap them.

> A small detail: the answer uses `ifelse(alt == 'two.sided', qnorm(alpha/2), qnorm(alpha))` to settle the
> two-sided and the one-sided case in one test — because for a one-sided interval, `greater` or `less`
> alike, the same $\alpha$ quantile (a negative value) is taken, and the `+`/`-` afterwards tells left from
> right.
:::

## Exercise 3: Interval estimation of the ratio of two normal population variances when the means are known

Open the script file **test1203.R** and complete the tasks below.

1. When the means $\mu_1$ and $\mu_2$ of two normal populations are known, the confidence interval for the
   ratio of their variances is:

   - two-sided interval: $\left[\dfrac{s}{f_{1-\alpha/2}},\ \dfrac{s}{f_{\alpha/2}}\right]$
   - right-sided interval: $\left[\dfrac{s}{f_{1-\alpha}},\ +\infty\right)$
   - left-sided interval: $\left(0,\ \dfrac{s}{f_{\alpha}}\right]$

   where $s = \dfrac{\sum_{i=1}^{m}(X_i-\mu_1)^2 / m}{\sum_{i=1}^{n}(Y_i-\mu_2)^2 / n}$, and
   $f_{\alpha/2}$, $f_{1-\alpha/2}$, $f_{\alpha}$, $f_{1-\alpha}$ are quantiles of $F(m,n)$.

2. The arguments `mu1` and `mu2` of the user-defined function stand for $\mu_1$ and $\mu_2$ respectively,
   `alt='two.sided'` means the two-sided interval is computed, `alt='greater'` the right-sided interval,
   and `alt='less'` the left-sided interval.
3. The value returned by the user-defined function is a vector made up of the interval endpoints.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code1203" />

::: tip The quantiles of the $F$ distribution are “asymmetric”
This is the place in this lecture where it is easiest to go wrong: **the $F$ distribution is not a
symmetric distribution**, so $f_{\alpha/2}$ and $f_{1-\alpha/2}$ must be taken **separately** and cannot
be made up from a plus or minus sign:

```r
# two-sided: take one large and one small
c(qf(1-alpha/2, m, n), qf(alpha/2, m, n))
```

Compare the $t$ distribution side, written `c(ta, -ta)` — **opposite signs**; on the $F$ side the two
quantiles are at **different positions** instead, one in the left tail and one in the right tail.

Substituting them into the interval takes a reciprocal as well (`se/fa`), so the large quantile produces
the small endpoint and the small quantile produces the large endpoint — the order comes out “small to
large” on its own, with no extra sorting.

> A small note: the exercise gives the lower bound of the left-sided interval as $0$ (a variance ratio
> cannot be negative), while the answer script writes `-Inf`. Mathematically $0$ is the stricter answer; in
> code both run.
:::

## Exercise 4: Interval estimation of the parameter of an exponential population

Open the script file **test1204.R** and complete the tasks below.

1. The confidence interval for the parameter $\lambda$ of an exponential distribution is:

   - two-sided interval: $\left[\dfrac{\chi^2_{\alpha/2}}{S},\ \dfrac{\chi^2_{1-\alpha/2}}{S}\right]$
   - right-sided interval: $\left[\dfrac{\chi^2_{\alpha}}{S},\ +\infty\right)$
   - left-sided interval: $\left(0,\ \dfrac{\chi^2_{1-\alpha}}{S}\right]$

   where $\chi^2_{\alpha/2}$, $\chi^2_{1-\alpha/2}$, $\chi^2_{\alpha}$, $\chi^2_{1-\alpha}$ are quantiles
   of $\chi^2(2n)$.

2. The argument `alt='two.sided'` means the two-sided interval is computed, `alt='greater'` the
   right-sided interval, and `alt='less'` the left-sided interval.
3. The value returned by the user-defined function is a vector made up of the interval endpoints.

<AnswerBlock title="Exercise 4 · Reference answer" :code="code1204" />

::: tip Why the degrees of freedom are 2n, and why S is 2n·X̄
The exponential distribution has a neat property: **if $X\sim \text{Exp}(\lambda)$, then
$2\lambda X \sim \chi^2(2)$** (a chi-square distribution with 2 degrees of freedom).

Adding n samples together, the additivity of the chi-square distribution tells us:

$$\sum_{i=1}^{n} 2\lambda X_i = 2\lambda\sum_{i=1}^{n}X_i = 2\lambda n\bar{X} \sim \chi^2(2n)$$

Solving for $\lambda$ gives the interval formula. Hence:

- **the degrees of freedom are $2n$**, not $n-1$ (note that this is completely different from the $t$
  test).
- the `se = 2*n*mean(x)` in the answer is exactly the $2n\bar{X}$ above, corresponding to $S$ in the
  formula.

**A way to remember `qt` / `qf` / `qchisq`**: the `q` in the function name is quantile, and the letters
after it name the distribution — `t` → $t$ distribution, `norm` → normal, `f` → $F$ distribution, `chisq`
→ chi-square.
:::

## Summary

| Scenario | Which distribution's quantile to use | Standard error / intermediate quantity |
| --- | --- | --- |
| mean of a single normal population, $\sigma$ **unknown** | `qt(p, n-1)` | $S/\sqrt{n}$ |
| difference of two normal population means, $\sigma$ **known** | `qnorm(p)` | $\sqrt{\sigma_1^2/m+\sigma_2^2/n}$ |
| ratio of two normal population variances, $\mu$ **known** | `qf(p, m, n)` | $s=\dfrac{n\sum(X_i-\mu_1)^2}{m\sum(Y_i-\mu_2)^2}$ |
| parameter $\lambda$ of an exponential population | `qchisq(p, 2n)` | $S=2n\bar{X}$ |

**A quick way to remember the direction of each interval**:

| `alt` | Vector returned |
| --- | --- |
| `'two.sided'` | `c(lower bound, upper bound)` |
| `'greater'` | `c(lower bound, Inf)` — the right-sided interval |
| `'less'` | `c(-Inf, upper bound)` — the left-sided interval |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第十二周原题`, and the answers from `资料/答案/第十二周答案` (only the
typos in them have been corrected).
The formulas in the original exercises are Word equation objects, which come out as one jumbled mass when
extracted as plain text; this page has restored them in LaTeX in the standard statistical form, and has
checked them item by item against what the answer scripts actually compute.
:::

::: tip Want the statistics behind it?
This lecture **works interval estimation out in R**; for the sampling error, the $t$ distribution, what a
confidence interval means, and the difference between two populations behind it, see the corresponding
summary in *Health Statistics*.

See **[Chapter 6 of *Health Statistics*, Estimating Population Means and Rates](/en/Health-statistics/06-estimation)**.
:::
