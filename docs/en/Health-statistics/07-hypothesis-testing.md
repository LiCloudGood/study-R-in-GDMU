---
layout: doc
title: '7. Hypothesis Testing'
---

<script setup>
const codeQ1 = `v <- iris$Sepal.Length[iris$Species == "versicolor"]   # n = 50

# ---- Step 1: write down the hypotheses and fix the significance level ----
# H0: mu = 6.0 cm
# H1: mu != 6.0 cm      (no prior reason to expect it higher or lower, so two-sided)
# alpha = 0.05

# ---- Steps 2 and 3: compute the statistic and obtain the P value ----
t.test(v, mu = 6.0)

# ---- Step 4: check by hand ----
n  <- length(v)
t0 <- (mean(v) - 6.0) / (sd(v) / sqrt(n))
t0
2 * pt(-abs(t0), n - 1)`

const outQ1 = `	One Sample t-test

data:  v
t = -0.87674, df = 49, p-value = 0.3849
alternative hypothesis: true mean is not equal to 6
95 percent confidence interval:
 5.789306 6.082694
sample estimates:
mean of x 
    5.936 

> t0
[1] -0.8767409
> 2 * pt(-abs(t0), n - 1)
[1] 0.3849056`
</script>

# Chapter 7. Hypothesis Testing

::: info Translation status
Translated from the [Chinese original](/Health-statistics/07-hypothesis-testing). Numbers, formulas,
and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> A sample mean differs a little from a known population mean — is that difference sampling error, or
> are the two populations genuinely different? This chapter sets out a fixed procedure for answering
> that question, and explains exactly how much the answer can claim.

## What this chapter is for

Twenty-five one-year-old infants are randomly drawn in a certain area; their mean hemoglobin
concentration is 123.5 g/L with a standard deviation of 11.6 g/L, while the average hemoglobin
concentration of normal young children in general is 125 g/L. The two numbers differ — does that
license the conclusion that "the hemoglobin level of one-year-olds in this area is below the general
level"?

No. The sample was drawn at random, and sampling error is inherent: even if the infants in this area
and young children in general belonged to the same population, measuring 25 other children would give
another mean — perhaps 124.8, perhaps 126.3. **Comparing the magnitudes of two means on its own proves
nothing.**

What this chapter answers is: is this gap between the sample and the known population the work of
sampling error, or are the two populations genuinely different? The approach is a fixed procedure —
first assume "there is no difference", then compute, under that assumption, how likely the observed
data (or something more extreme) would be, and finally decide from that whether the assumption can be
rejected.

The idea behind the procedure is called **proof by contradiction using small probabilities**. Its
conclusion is probabilistic, so it is also necessary to state clearly where the conclusion could be
wrong, and in what way.

## Core concepts

### 1. Proof by contradiction using small probabilities

In mathematics, proof by contradiction runs: to show that proposition A does not hold, first assume A
holds, derive a result contradicting the facts, and conclude that A does not hold. Hypothesis testing
borrows that structure but replaces "contradiction" with a probabilistic "almost should not have
happened":

1. first assume "the two population parameters are equal" (written $H_0$);
2. under the assumption that $H_0$ holds, compute the probability of a result as extreme as the
   observed sample (written $P$);
3. if that probability is very small, then under "$H_0$ holds" the data in hand are a rare event — so
   $H_0$ is called into question and rejected.

**How it differs from ordinary proof by contradiction**: an ordinary proof by contradiction gives a
conclusion that holds absolutely, whereas the conclusion from small probabilities is only
probabilistic and **may be right or may be wrong**. This is the origin of the later section on Type I
and Type II errors, and the reason no conclusion may be stated too strongly.

Take "guessing which box by drawing a ball" as an example: there are two boxes, one holding 99 white
and 1 red ball, the other 99 red and 1 white; a box is chosen at random and a ball drawn from it turns
out to be red.

- assume "this box is the 99 white, 1 red one"; then the probability of drawing a red ball is only
  $1/100$;
- $1/100$ is a small probability, which should essentially not happen in a single trial, yet it just
  did;
- so the assumption is doubted, and the box is judged to be the 99 red, 1 white one.

What is used here is "a small-probability event may be regarded as not occurring in a single trial; if
it did occur, there is reason to doubt the premise". How small counts as "small" is what the
significance level $\alpha$ answers later.

### 2. The null hypothesis $H_0$ and the alternative hypothesis $H_1$

Hypotheses come as a pair and must always appear together:

- **$H_0$ (null hypothesis)**: the side under test, assumed to hold. It is usually written as an
  equality — population parameters equal, population distributions the same, a population following
  some distribution. **It must be joined by an equals sign.**
- **$H_1$ (alternative hypothesis)**: the side opposed to $H_0$, usually written as an inequality,
  joined by $\neq$, $>$, or $<$. It is what the research actually wants to demonstrate.

With the hemoglobin example (writing $\mu$ for the population mean hemoglobin of infants in that
area):

$$H_0:\ \mu = \mu_0 = 125\ \text{g/L} \qquad H_1:\ \mu \neq 125\ \text{g/L}$$

A few rules that leave no room for vagueness:

1. **Hypotheses are about populations, not samples.** What appears is $\mu$ (a population mean), not
   123.5 (a sample mean). The 123.5 is only the evidence used to infer $\mu$.
2. **$H_0$ and $H_1$ are mutually opposed and neither can be omitted**; together they must cover all
   possibilities.
3. **$H_0$ must contain an equals sign.** The distribution of the test statistic is derived under the
   assumption that $H_0$ holds; without an equals sign the distribution of the statistic cannot be
   worked out, and no $P$ value can be obtained.
4. **What the research wants to demonstrate determines the direction of $H_1$**, and the direction of
   $H_1$ in turn determines whether the test is one-sided or two-sided (see section 8).

### 3. The significance level $\alpha$

$\alpha$ is a probability fixed **in advance** by the investigator, and its role is to draw a line:
**how small a probability counts as "small"**.

- in practice $\alpha = 0.05$ is common; unless stated otherwise, 0.05 is the default;
- 0.10 or 0.01 may also be used, depending on the purpose of the study (take it smaller if
  misjudgement is more feared);
- $\alpha$ also has a second meaning, "the upper limit on the probability of error allowed when
  rejecting $H_0$", see section 7.

**Crucially, $\alpha$ must be fixed before the test is done.** One cannot compute the $P$ value first
and then pick a level that suits — that amounts to changing the criterion after the fact, and the
conclusion is then meaningless.

### 4. The $P$ value: what it is and what it is not

**Definition**: the $P$ value is the probability, under the condition that $H_0$ holds, of randomly
drawing a sample statistic "equal to or greater than (or equal to or less than)" the one observed. In
other words:

$$P = P\big(\text{the observed result or something more extreme} \mid H_0 \text{ holds}\big)$$

Let us compute it with the hemoglobin example. With $H_0:\mu = 125$, take the test statistic

$$t = \frac{\bar{X} - \mu_0}{S/\sqrt{n}} = \frac{123.5 - 125}{11.6/\sqrt{25}} = -0.6466,\qquad \nu = n - 1 = 24$$

$t = -0.6466$ says that the sample mean lies 0.6466 standard errors below 125. The $P$ value is the sum
of the two tail areas $\lvert T \rvert \ge 0.6466$ in a $t$ distribution with 24 degrees of freedom,
about **0.524**.

What that number means: **if the infants of this area and young children in general really did belong
to one population, then the probability that a sample of 25 would give a mean differing from 125 g/L by
1.5 g/L or more (whether higher or lower) is about one half.** Such a thing is far too common to give
any reason to doubt $H_0$. So $P > 0.05$ and $H_0$ is not rejected.

Conversely, the smaller the $P$ value, the less consistent the observed data are with $H_0$, and the
stronger the grounds for rejecting it.

#### What the $P$ value is not (this part matters more than the part above)

| Statement | Correct? | Explanation |
| --- | --- | --- |
| $P$ value = probability that $H_0$ is true | ✗ | what is computed is $P(\text{data} \mid H_0)$, not $P(H_0 \mid \text{data})$ |
| $1 - P$ = probability that $H_0$ is true | ✗ | as above, with the direction reversed |
| $P$ value = probability that the conclusion is wrong | ✗ | that is closer to the role of $\alpha$; the $P$ value itself is not the "error probability" of anything |
| $P$ value = size of the difference | ✗ | the $P$ value is strongly affected by sample size; a small $P$ does not mean a large difference |
| $P$ value = degree of inconsistency between the data and $H_0$ | ✓ | this is its one correct interpretation |

**Why it is so easy to reverse**: conditional probabilities do not run backwards. Bayes' formula shows
this plainly:

$$P(H_0 \mid \text{data}) = \frac{P(H_0)\,P(\text{data} \mid H_0)}{P(H_0)\,P(\text{data} \mid H_0) + P(H_1)\,P(\text{data} \mid H_1)}$$

The $P(\text{data} \mid H_0)$ in the numerator is what the $P$ value is; but to obtain "how likely
$H_0$ is to be true" one also needs the prior probability $P(H_0)$ and the probability of obtaining
these data when $H_1$ is true, $P(\text{data}\mid H_1)$ (which is related to power). **Hypothesis
testing supplies only the former**, so within its logical framework the question "what is the
probability that $H_0$ is true" simply cannot be answered.

A set of numbers makes this clear: take $P = 0.03$ and power 0.8. If the prior is $P(H_0) = 0.5$,
substituting above gives $P(H_0 \mid \text{data}) \approx 0.036$ — coincidentally close to 0.03;
change the prior to 0.9 and the same $P$ value works out to **0.25**.

**For the same $P$ value, the credibility of $H_0$ can be 3.6% or 25%**, which shows that this
information is not in the $P$ value at all. (Here $H_1$ is simplified to a single point in order to
compute power and show where the numbers come from; a rigorous Bayesian analysis would have to specify
a prior distribution first.)

#### How the $P$ value and $\alpha$ divide the work

| | Significance level $\alpha$ | $P$ value |
| --- | --- | --- |
| When is it fixed? | fixed by the investigator **before** the test | computed from the data **after** the test |
| Meaning | upper limit on the error probability allowed when rejecting $H_0$ | degree of inconsistency between the data and $H_0$ |
| How many per test? | there can be several (0.05, 0.01, 0.10 …) | one method yields only one |

Precisely because there can be several $\alpha$ levels but only one $P$ value, a reported conclusion
should carry **the test statistic, the $P$ value, and the $\alpha$ level used**, so that readers know
against what standard that $P$ value was judged.

<ClickAnswer>

**Think about it**: a test gives $P = 0.03$. May one say "the probability that $H_0$ is true is 3%"?

No. $P = 0.03$ says: **assuming $H_0$ holds**, the probability of data like the observed, or more
extreme, is 3%. It takes $H_0$ as a premise, not as the thing to be estimated. To talk about "the
probability that $H_0$ is true", one would first have to give the prior probability of $H_0$ and the
distribution of the data under the alternative — that is Bayesian work. Likewise, "$P = 0.03$ means
this conclusion has a 3% chance of being wrong" is also wrong.

</ClickAnswer>

### 5. The test statistic: turning "how much" into "how many standard errors"

Looking directly at how much $\bar{X} - \mu_0$ differs does not allow comparison across problems: a
hemoglobin gap of 1.5 g/L and a pulse gap of 2.2 beats/min — which is more "outlandish"? So the
difference has to be divided by its sampling error, converting it into "how many standard errors
apart":

$$t = \frac{\bar{X} - \mu_0}{S_{\bar{X}}} = \frac{\bar{X} - \mu_0}{S/\sqrt{n}}, \qquad \nu = n - 1$$

When $H_0$ holds, this statistic follows a $t$ distribution with $n-1$ degrees of freedom. The
criterion is then uniform: the larger $\lvert t \rvert$ is, the smaller the corresponding $P$ value.

Two things to remember:

- **the numerator is "how much they actually differ" and the denominator is "the typical size of the
  sampling error"**, so $t$ means "how many standard errors the difference amounts to". The $\sqrt{n}$
  in the denominator explains why larger samples detect differences more easily;
- **every test statistic is computed under the assumption that $H_0$ holds**, and that assumption
  determines which distribution it follows ($t$, $z$, $F$, $\chi^2$ …), and hence how the $P$ value is
  obtained.

### 6. Type I and Type II errors

Since the conclusion is probabilistic, any single test may be wrong. There are only two ways to be
wrong, and together they cover all four outcomes:

| Reality | Reject $H_0$ | Do not reject $H_0$ |
| --- | --- | --- |
| $H_0$ holds | **Type I error**, probability at most $\alpha$, "rejecting a true null" | correct inference, probability $1-\alpha$ |
| $H_0$ does not hold | correct inference, probability $1-\beta$ (power) | **Type II error**, probability $\beta$, "retaining a false null" |

- **Type I error**: $H_0$ was in fact true, but sampling led to its rejection. Its **maximum
  probability is $\alpha$**. With $\alpha = 0.05$, in theory 5 out of every 100 tests would make this
  error on average.
- **Type II error**: $H_0$ was in fact false, but the test failed to reject it. The probability is
  written $\beta$. The size of $\beta$ is generally unknown, and can only be estimated when the true
  difference between the two populations and the sample size are known (this belongs to sample size
  estimation).

**A real Type II error**: let the population mean red blood cell count of adult men in the plains be
$5.00 \times 10^{12}/\text{L}$ and in a highland area be $5.50 \times 10^{12}/\text{L}$ — the two
populations are **genuinely different**. Drawing a sample of $n = 10$ from the highland population and
comparing it with the plains population gives $t = 2.1835$ and $P = 0.0569$. At $\alpha = 0.05$,
$P > \alpha$, so the conclusion is "do not reject $H_0$; there is not yet evidence that the two
population means differ". But $H_0$ is objectively false, so this step commits a Type II error: the
difference really exists, it simply was not detected this time.

A few relationships:

- **with the sample size fixed, increasing $\alpha$ decreases $\beta$, and vice versa**; the only way
  to reduce both kinds of error at once is **to increase the sample size**.
- **a single test cannot commit both errors at once**: when $P \le \alpha$ and $H_0$ is rejected, only
  a Type I error is possible; when $P > \alpha$ and $H_0$ is not rejected, only a Type II error is
  possible.
- **choose according to what is feared**: if a Type I error is feared more (calling an ineffective
  treatment effective), take $\alpha$ smaller, such as 0.01; if a Type II error is feared more
  (missing a real effect), take $\alpha$ larger, such as 0.10 or 0.20.

### 7. Power, $1 - \beta$

**Definition**: when the two population parameters **really do differ**, the ability to detect that
difference at the $\alpha$ level, written $1-\beta$ and also called the power of a test. It is the
degree of confidence with which a true $H_1$ can be affirmed.

$1-\beta = 0.90$ means: if the difference really exists, then in theory 90 out of every 100 tests would
on average reach the conclusion "the difference is statistically significant".

Four things affect it:

| Factor | Direction of change | Effect on power |
| --- | --- | --- |
| the true difference between the two population parameters, $\delta$ | larger | greater power |
| the population standard deviation $\sigma$ | smaller | greater power (smaller standard error) |
| the significance level $\alpha$ | larger | greater power (but more Type I errors) |
| the sample size $n$ | larger | greater power (reduces $\alpha$ and $\beta$ together) |

The true difference and the population standard deviation are matters of fact, and $\alpha$ cannot be
enlarged at will, so **in practice the most realistic way to raise power is to increase the sample
size**.

### 8. One-sided and two-sided tests

The form of $H_1$ determines whether the test is one-sided or two-sided:

| Research aim | $H_0$ | $H_1$ | Position of the rejection region |
| --- | --- | --- | --- |
| whether the two population means **differ** | $\mu = \mu_0$ | $\mu \neq \mu_0$ | both sides, $\alpha/2$ each |
| whether it is **higher** | $\mu = \mu_0$ | $\mu > \mu_0$ | right side, $\alpha$ |
| whether it is **lower** | $\mu = \mu_0$ | $\mu < \mu_0$ | left side, $\alpha$ |

On the same data, one-sided and two-sided tests can give opposite conclusions. For example: the mean
pulse rate of healthy adult men in a certain area is 72 beats/min, while 25 healthy adult men in a
mountainous area have a mean pulse rate of 74.2 beats/min with a standard deviation of 6.0 beats/min.

$$t = \frac{74.2 - 72}{6.0/\sqrt{25}} = 1.833, \qquad \nu = 24$$

- **two-sided**: the critical value is $t_{0.05/2,\,24} = 2.064$, and $t = 1.833 < 2.064$, so $P > 0.05$
  and $H_0$ is not rejected — there is not yet evidence that the mean pulse rate of adult men in that
  mountainous area differs from the general population.
- **one-sided (right)**: the critical value is $t_{0.05,\,24} = 1.711$, and $t = 1.833 > 1.711$, so
  $P < 0.05$ and $H_0$ is rejected — the mean pulse rate of adult men in that mountainous area may be
  considered higher than in the general population.

The same batch of data, two opposite conclusions. So one-sided versus two-sided **must be decided at
the design stage on subject-matter grounds and the purpose of the study, and must never be chosen
subjectively after the $P$ value has been computed** — picking a favorable direction after the fact
secretly nearly doubles $\alpha$.

Two relationships (for the same data and the same method):

- **when the distribution is symmetric (the $t$ test, the $z$ test), the two-sided $P$ value is exactly
  twice the one-sided one**;
- therefore: whatever a two-sided test can reject, a one-sided test can certainly reject too; and
  whatever a one-sided test cannot reject, a two-sided test certainly cannot reject either. The
  converse need not hold — which is exactly what the pulse example above shows.

How to choose:

- use a one-sided test only when **subject-matter knowledge establishes that the difference can go in
  one direction only**. For instance, if a drug is an improvement on another drug and the improvement
  is known to be incapable of reducing efficacy, only of leaving it unchanged or raising it.
- if the researcher is not confident about the direction, or colleagues disagree, **use two-sided**.
  Misusing a one-sided test easily produces a Type I error, and a Type I error (calling an ineffective
  treatment effective) is usually the more harmful.
- some methods can only be two-sided in any case: those unrelated to the ordering of magnitude of the
  statistic, such as analysis of variance and the $\chi^2$ test.

### 9. Hypothesis testing and interval estimation: two sides of one coin

Hypothesis testing and interval estimation are two faces of the same theory of sampling error:

- **hypothesis testing** answers "are the two population parameters **different**", a question of
  *whether*;
- **a confidence interval** answers "within **what range** does the population parameter lie", a
  question of *how much*.

Their relationship can be written as one equivalence:

> Rejecting $H_0:\mu = \mu_0$ at level $\alpha$ holds if and only if the $1-\alpha$ confidence interval
> does **not contain** $\mu_0$.

Back to the hemoglobin example: the 95% confidence interval for the population mean hemoglobin of
one-year-olds in that area is 118.7 ~ 128.3 g/L, which **contains** 125 g/L, so at $\alpha = 0.05$
$H_0$ is not rejected — entirely consistent with the earlier $P = 0.524$.

**A confidence interval gives one thing more than a $P$ value: how much the difference is.** A $P$
value can only say whether there is statistical significance at some $\alpha$ level; a confidence
interval can also give the range of the difference, and hence whether that difference has practical
meaning. For example, in a lipid-lowering trial the control group's total cholesterol fell by
0.35 mmol/L, with a paired $t$ test giving $P < 0.05$ (statistically significant) and a 95% confidence
interval for the difference of 0.18 ~ 0.52 mmol/L — **the whole interval falls below the 0.52 mmol/L
regarded as clinically meaningful**, so this reduction has no clinical significance.

## The checklist of test steps

Follow the steps below and the format of the conclusion will stay in order.

**Step 0 (precondition)**: confirm that the study design stands up — the population is homogeneous,
the sample was obtained on the principle of randomization, and the comparison groups are as similar as
possible in every factor that might affect the outcome apart from the study factor. If the
precondition fails, no $P$ value, however small, means anything.

**Step 1: state the hypotheses and fix the significance level**

- write out $H_0$ (with an equals sign) and $H_1$ (with $\neq$, $>$ or $<$);
- decide one-sided or two-sided on subject-matter grounds;
- fix $\alpha$, usually 0.05;
- hypotheses are about **population parameters** — do not write them in terms of sample statistics.

**Step 2: choose the test method and compute the test statistic**

- the choice depends on the research aim, the type of data, the type of distribution, the design, the
  sample size, and the conditions of the method (small samples of measurement data use the $t$ test,
  large samples the $z$ test, several means compared use the $F$ test, rates compared use the
  $\chi^2$ test …);
- the statistic must be computed under the assumption that $H_0$ holds;
- check the conditions as you go: are the variances equal, is the sample large enough, is the
  distribution roughly normal.

**Step 3: determine the $P$ value and draw the conclusion**

- determine the $P$ value from the statistic and its distribution (look up a table of critical values,
  or let R compute it);
- compare $P$ with $\alpha$ and write the conclusion in the format below.

| $P$ and $\alpha$ | Statistical conclusion | How to word the subject-matter conclusion |
| --- | --- | --- |
| $P \le \alpha$ | reject $H_0$ at level $\alpha$, accept $H_1$, the difference is statistically significant | may be considered … different / higher / lower |
| $P > \alpha$ | do not reject $H_0$ at level $\alpha$, the difference is not statistically significant | **there is not yet evidence that** … differs / is lower |

**Step 4 (reporting)**: write out the test statistic, the degrees of freedom, the $P$ value, the
$\alpha$ level used, and the confidence interval together; do not just throw down a $P$ value.

Use "reject / do not reject" rather than "accept / do not accept": of $H_0$ one can only say "reject"
or "do not reject", and only of $H_1$ can one say "accept $H_1$". **Not rejecting $H_0$ is not the same
as accepting $H_0$**; it means only that on the available data there is not yet sufficient reason to
reject it, which amounts to a "negative, pending further evidence" conclusion — a more rigorous way to
put it.

Having worked through a question, check back against the list below:

<TrackList :tasks="['State the study design and the data type (one-sample / two independent samples / paired)', 'Write out H0 and H1, and fix alpha in advance', 'Decide one-sided or two-sided on subject-matter grounds', 'Choose the test method and check its conditions (distribution, homogeneity of variance, sample size)', 'Compute the test statistic and determine the P value', 'Give both a statistical and a subject-matter conclusion, wording a negative one as “there is not yet evidence of a difference”', 'Report the statistic, degrees of freedom, P value, alpha level, and confidence interval']" />

## Doing it in R

In R, one function, `t.test()`, covers the one-sample, two independent sample, and paired cases, and
the $P$ value is printed directly in the output. Everything below uses R's built-in data sets.

### 1. One-sample $t$ test: petal length in `iris`

`iris` is R's built-in data on irises; it contains 50 plants from each of 3 species. Take the petal
length of the setosa species and test whether its population mean is 1.5 cm.

```r
petal <- iris$Petal.Length[iris$Species == "setosa"]   # n = 50

mean(petal)   # 1.462
sd(petal)     # 0.1737

t.test(petal, mu = 1.5)
```

Output:

```
	One Sample t-test

data:  petal
t = -1.5472, df = 49, p-value = 0.1282
alternative hypothesis: true mean is not equal to 1.5
95 percent confidence interval:
 1.412645 1.511355
sample estimates:
mean of x 
    1.462 
```

How to read it:

- `t = -1.5472` is the test statistic and `df = 49` the degrees of freedom ($n-1 = 49$);
- `p-value = 0.1282` is the $P$ value: if the population mean really equalled 1.5, the probability
  that a sample of 50 plants would give a mean deviating from 1.5 by 0.038 cm or more is about 12.8%;
- $P = 0.1282 > 0.05$, so at the $\alpha = 0.05$ level **$H_0$ is not rejected**; there is not yet
  evidence that the population mean petal length of setosa differs from 1.5 cm;
- `95 percent confidence interval: 1.412645 1.511355` **contains 1.5**, consistent with the conclusion
  above — this is the equivalence discussed in section 9 of the core concepts, and R hands you both
  pieces of information at once.

### 2. Computing the $P$ value by hand with `pt()`, checked against `t.test()`

Calling a ready-made function makes it easy to treat the $P$ value as a black box. Computing it
yourself with the distribution function `pt()` shows how the $P$ value is cut off the $t$ distribution:

```r
n  <- length(petal)
df <- n - 1
t0 <- (mean(petal) - 1.5) / (sd(petal) / sqrt(n))

t0                              # -1.5472: the test statistic
2 * pt(-abs(t0), df)            # 0.1282: two-sided P value, exactly as t.test
pt(t0, df)                      # 0.0641: left-tail P value, exactly half the two-sided one
qt(0.975, df)                   # 2.0096: critical value of the two-sided test
mean(petal) + c(-1, 1) * qt(0.975, df) * sd(petal) / sqrt(n)   # 95% confidence interval
```

Output:

```
> t0
[1] -1.547244
> 2 * pt(-abs(t0), df)
[1] 0.1282394
> pt(t0, df)
[1] 0.0641197
> qt(0.975, df)
[1] 2.009575
> mean(petal) + c(-1, 1) * qt(0.975, df) * sd(petal) / sqrt(n)
[1] 1.412645 1.511355
```

Three remarks:

- `pt(x, df)` is the **distribution function** of the $t$ distribution, returning $P(T \le x)$, i.e.
  the cumulative probability to the left of the statistic; `qt(p, df)` is its inverse — given a
  probability it returns the quantile. The `p` and `q` functions come as a pair.
- **why the two-sided $P$ value is written `2 * pt(-abs(t0), df)`**: a two-sided test has to count the
  area of both tails. Because the $t$ distribution is symmetric about 0, the left tail area
  $P(T \le -\lvert t_0 \rvert)$ equals the right tail area $P(T \ge \lvert t_0 \rvert)$, so doubling
  one end is enough. Writing `-abs(t0)` rather than `t0` ensures the result is the same whether the
  statistic falls on the left or on the right.
- $\lvert t_0 \rvert = 1.5472 < 2.0096$, that is, the statistic did not travel beyond the critical
  value, so $P > 0.05$ — **"look at the $P$ value" and "see whether the statistic falls in the
  rejection region" are two ways of saying the same thing**.

### 3. Two independent samples and paired samples: the `sleep` data

`sleep` is R's built-in sleep data: 10 patients, each of whom took both hypnotics (`group` 1 and 2),
with `extra` recording the increase in hours of sleep relative to a control.

```r
data(sleep)
str(sleep)
```

```
'data.frame':	20 obs. of  3 variables:
 $ extra: num  0.7 -1.6 -0.2 -1.2 -0.1 3.4 3.7 0.8 0 2 ...
 $ group: Factor w/ 2 levels "1","2": 1 1 1 1 1 1 1 1 1 1 ...
 $ ID   : Factor w/ 10 levels "1","2","3","4",..: 1 2 3 4 5 6 7 8 9 10 ...
```

Analyzing it as two independent samples, and trying both one-sided directions:

```r
t.test(extra ~ group, data = sleep)                                   # two-sided
t.test(extra ~ group, data = sleep, alternative = "greater")$p.value  # right: 0.9603
t.test(extra ~ group, data = sleep, alternative = "less")$p.value     # left: 0.0397
```

The three values of `alternative` correspond exactly to the three hypotheses of section 8:

| `alternative` | Mathematical $H_1$ | When to use it |
| --- | --- | --- |
| `"two.sided"` | $\mu_1 \neq \mu_2$ | asking whether they are **different** (the default) |
| `"greater"` | $\mu_1 > \mu_2$ | asking whether one is **higher** |
| `"less"` | $\mu_1 < \mu_2$ | asking whether one is **lower** |

The two-sided output:

```
	Welch Two Sample t-test

data:  extra by group
t = -1.8608, df = 17.776, p-value = 0.07939
alternative hypothesis: true difference in means between group 1 and group 2 is not equal to 0
95 percent confidence interval:
 -3.3654832  0.2054832
sample estimates:
mean in group 1 mean in group 2 
           0.75            2.33 
```

The two-sided $P = 0.0794 > 0.05$, so $H_0$ is not rejected; the left-sided $P = 0.0397 < 0.05$, so
$H_0$ is rejected. Note that $0.0397 \times 2 = 0.0794$ — **the two-sided $P$ value is twice the
one-sided one**, in exact agreement with the theory. This also shows why one-sided versus two-sided
cannot be chosen after the fact.

### 4. On the same data, the paired analysis gives a much smaller $P$ value

Every `ID` in `sleep` has two records, showing that **each patient used both drugs**; this is a paired
design and should not be analyzed as independent samples:

```r
extra1 <- sleep$extra[sleep$group == 1]
extra2 <- sleep$extra[sleep$group == 2]

t.test(extra1, extra2, paired = TRUE)
```

```
	Paired t-test

data:  extra1 and extra2
t = -4.0621, df = 9, p-value = 0.002833
alternative hypothesis: true mean difference is not equal to 0
95 percent confidence interval:
 -2.4598858 -0.7001142
sample estimates:
mean difference 
          -1.58 
```

After pairing, $P = 0.0028 < 0.05$ and the conclusion is reversed. The reason lies in the standard
error: the paired analysis looks only at **each patient's difference between the two drugs**, removing
the nuisance that "patients naturally differ in how long they sleep". The difference vector
`-1.2 -2.4 -1.3 -1.3 0 -1 -1.8 -0.8 -4.6 -1.4` fluctuates very little, so the standard error falls
from 0.849 for independent samples to 0.389, and the $t$ value grows accordingly.

::: details A form that will error, worth remembering
A paired test **cannot** be written in the formula form. Writing
`t.test(extra ~ group, data = sleep, paired = TRUE)` errors on the spot:
`cannot use 'paired' in formula method`.

The reason is that the formula form (`y ~ group`) only handles two independent samples, and a paired
test requires the two groups to be extracted into **two vectors** and passed in — which is the
`t.test(extra1, extra2, paired = TRUE)` form above. This also suggests something: **decide first
whether the design is independent or paired, and only then decide how to write the code**, rather than
writing code first.
:::

The paired test's $P$ value can also be computed by hand with `pt()`, giving exactly the same numbers
as `t.test()`:

```r
d  <- extra1 - extra2
t0 <- mean(d) / (sd(d) / sqrt(length(d)))

t0                              # -4.0621
2 * pt(-abs(t0), length(d) - 1) # 0.00283289
```

### 5. The $P$ value changes with sample size: seeing power through simulation

Hold the true difference fixed at 1 unit (population means 100 and 101, $\sigma = 15$) and change only
the sample size, watching how the proportion of times "a difference" is detected (the empirical power)
changes:

```r
set.seed(7)   # fix the seed so the result is reproducible

power <- function(n, R = 2000) {
  mean(replicate(R, t.test(rnorm(n, 100, 15), rnorm(n, 101, 15))$p.value < 0.05))
}
sapply(c(10, 100, 1000, 5000), power)
```

```
[1] 0.0480 0.0715 0.3230 0.9135
```

The true difference is 1 unit throughout and $\alpha$ is 0.05 throughout. With $n = 10$ there is only
a 4.8% chance of detecting the difference (about the same as $\alpha$, i.e. essentially a coin flip),
rising to 91.4% with $n = 5000$. This shows three things directly: **power is determined mainly by
sample size; a difference that really exists may still not be detected (Type II error); and,
conversely, a small $P$ value may to a large extent simply be the result of a large sample, and does
not mean the difference is large.**

### 6. Multiple comparisons: more tests, accumulating error

The Type I error probability of a single test is $\alpha$, but a study often involves several
comparisons. If those comparisons are independent of one another:

$$P(\text{at least one Type I error}) = 1 - (1-\alpha)^k$$

```r
1 - 0.95^10    # 0.4013: probability of at least one error in 10 independent tests at the 0.05 level
0.05 / 10      # 0.005: the level after Bonferroni correction
```

At $\alpha = 0.05$, running 10 tests gives a probability of at least one error as high as **40%**. The
most common remedy is the **Bonferroni correction**: change the level of each test to $\alpha/k$. In R
pairwise comparisons can be handed to `pairwise.t.test()`:

```r
# pairwise comparison of sepal length among the three species; watch the P values before and after correction
pairwise.t.test(iris$Sepal.Length, iris$Species, p.adjust.method = "none")$p.value
pairwise.t.test(iris$Sepal.Length, iris$Species, p.adjust.method = "bonferroni")$p.value
```

```
                 setosa   versicolor
versicolor 8.770194e-16           NA
virginica  2.214821e-32 2.765638e-09

                 setosa   versicolor
versicolor 2.631058e-15           NA
virginica  6.644464e-32 8.296915e-09
```

Three groups give 3 pairwise comparisons, and Bonferroni multiplies every $P$ value by 3
(`2.765638e-09 × 3 = 8.296915e-09`). In this data set all three pairwise differences are enormous, so
the conclusion is unchanged after correction; with data where the differences are less extreme, the
situation "P < 0.05 before correction, P > 0.05 after" would arise — **the "positive result" one
thought one had may well be nothing but a false positive produced by multiple comparisons.**

### Exercise: walk through the four steps yourself

Using the sepal length of versicolor in `iris`, test whether its population mean is 6.0 cm. Write out
$H_0$ and $H_1$, explain why a two-sided test is chosen, compute the $P$ value, write the
subject-matter conclusion at $\alpha = 0.05$, and check it by hand. Try it yourself before looking at
the answer.

<AnswerBlock title="Exercise · Reference answer" :code="codeQ1" :output="outQ1" />

Key points:

- $H_0:\mu = 6.0$, $H_1:\mu \neq 6.0$. There is no prior reason to expect the sepal length of
  versicolor to be higher or lower, and both directions are possible, so a two-sided test is used.
- $t = -0.8767 < t_{0.05/2,\,49} = 2.0096$, and $P = 0.3849 > 0.05$, so at the $\alpha = 0.05$ level
  $H_0$ is not rejected: **there is not yet evidence that** the population mean sepal length of
  versicolor differs from 6.0 cm.
- the 95% confidence interval 5.789 ~ 6.083 cm contains 6.0, consistent with the $P$ value conclusion.
- the hand-computed `t0` and `2 * pt(-abs(t0), n - 1)` agree exactly with the output of `t.test()`
  (0.8767409 and 0.3849056), showing that `t.test()` computes precisely this set of formulas.

## Common pitfalls

- **Saying "do not reject $H_0$" as "$H_0$ holds" or "the two groups do not differ".** The correct
  statement is "at the $\alpha$ level the difference is not statistically significant; there is not
  yet evidence that the two population means differ" — in nature a "negative, pending further
  evidence" conclusion. This is especially so with a small sample: the difference may really exist and
  simply was not detected (Type II error). Conversely, "not statistically significant" does not mean
  "the difference is small" or "there is certainly no difference" either.
- **Treating the $P$ value as "the probability that $H_0$ is true".** $P = 0.03$ is not "there is only
  a 3% chance that $H_0$ is true", nor is it "the conclusion has a 3% chance of being wrong". It is
  only the conditional probability $P(\text{data} \mid H_0)$; change the prior and the "credibility of
  $H_0$" computed from the same $P$ value can go from 3.6% to 25%.
- **Choosing one-sided or two-sided after the fact.** Computing the $P$ value in both directions and
  reporting whichever is significant nearly doubles the effective $\alpha$ — a textbook case of
  data-dredging misuse. One-sided versus two-sided can only be fixed at the design stage on
  subject-matter grounds; without sufficient confidence, use two-sided.
- **Using the size of the $P$ value to measure the size of the difference, or taking statistical
  significance for clinical significance.** The $P$ value is strongly affected by sample size: in the
  simulation above the true difference was 1 unit throughout, and the detection rate was 91.4% at
  $n = 5000$ but only 4.8% at $n = 10$ — the same difference gives completely different $P$ values. At
  the other end, in a lipid-lowering trial with $n = 54$ a difference of 0.35 mmol/L was already
  statistically significant yet fell below the 0.52 mmol/L regarded as clinically meaningful —
  **statistical significance is not clinical significance**, and judgments such as "marked" or "more
  pronounced" in a conclusion cannot be supplied by a hypothesis test itself.
- **Not correcting for multiple comparisons.** Running 10 independent tests at the 0.05 level in one
  study gives a 40% probability of at least one error. With several groups, do not simply run pairwise
  $t$ tests: either carry out an overall $F$ test first and then use a multiple-comparison method, or
  apply a correction such as Bonferroni.

::: warning One more pitfall, at the level of the premise
The premise of a hypothesis test is that the study design itself stands up: homogeneous individuals,
a sample drawn on the principle of randomization, and comparable groups. Once the premise breaks, no
$P$ value, however small, means anything. Suppose, for example, that a study compares two therapies
and the two groups look balanced in disease severity, but the investigator tampered with disease
duration — only patients within 5 days of onset were admitted to the treatment group, while the
control group had no such restriction, and early treatment itself strongly affects prognosis. The two
groups are then not comparable in a key non-treatment factor, and even if $P < 0.05$ is computed, the
conclusion is wrong.

The conditions of the method have to be checked too: for a $t$ test with a small sample and unknown
variance, first see whether the variances are equal and the distribution roughly normal; with too
small a sample one cannot force the large-sample $z$ test; when these conditions fail, the computed
$P$ value is wrong as well.
:::

## How it connects to the other courses

::: tip Related pages
- **Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing** *(Chinese)*
  ([`/intro-it/13-hypothesis-testing`](/intro-it/13-hypothesis-testing)) — that lecture is the R
  practice for this chapter: a self-written `fun1301` computing $P$ values with `pt()` and marking out
  acceptance regions with `qt()`, plus `t.test()`, `var.test()`, `binom.test()` and the three
  directions of `alternative = 'two.sided' / 'greater' / 'less'`. What this chapter adds is the
  reasoning: why $H_0$ and $H_1$ are set up this way, what the $P$ value is really saying, why
  one-sided versus two-sided cannot be chosen after the fact, and which way an erroneous conclusion
  goes wrong. **There you practise "how to compute it"; here we discuss "how to say what came out".**
  The two-stage flow of that lecture (test homogeneity of variance with `var.test()`, then decide
  between the equal-variance $t$ test and Welch) is exactly this chapter's "conditions" put into
  practice.
- **Lecture 12 of *Introduction to Information Technology*, Parameter Estimation** *(Chinese)*
  ([`/intro-it/12-parameter-estimation`](/intro-it/12-parameter-estimation)) — interval estimation and
  hypothesis testing are two sides of one coin: for the same data, the $1-\alpha$ confidence interval
  containing $\mu_0$ is equivalent to not rejecting $H_0$ at level $\alpha$, and vice versa. That
  lecture builds intervals with `qnorm()`, `qt()`, `qf()`, `qchisq()`, and verifies them against
  `t.test(x)$conf.int` and self-written functions. This chapter makes the equivalence clear and
  explains what a confidence interval gives beyond a $P$ value: the range of the difference, and
  whether that difference is clinically meaningful.
- **Week 6 of *Medical Big Data Analysis and Decision Making*, Classification (2)** *(Chinese)*
  ([`/Medical-Big-Data-Analysis/6-classification-2`](/Medical-Big-Data-Analysis/6-classification-2)) —
  that week uses `e1071`, `caret`, and `pROC` for naive Bayes classification and ROC analysis,
  producing confusion matrices, accuracy, and AUC. **The confusion matrix and this chapter's two types
  of error are two names for the same thing**: "actually present but judged absent" is recorded as FN,
  corresponding to a Type II error (a missed case); "actually absent but judged present" is recorded
  as FP, corresponding to a Type I error (a false alarm). AUC measures "can a difference be detected
  when one exists", occupying the place of this chapter's power $1-\beta$. The difference is that this
  chapter has one test and one $P$ value, while that week evaluates all the predictions at once as a
  table.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/07-hypothesis-testing
once translated; for now the Chinese page /Health-statistics/07-hypothesis-testing) from:
- /intro-it/13-hypothesis-testing, in its summary.
- /intro-it/12-parameter-estimation, in its summary.
- /Medical-Big-Data-Analysis/6-classification-2, where the confusion matrix / AUC is discussed.
-->

## Summary

- **The basic idea of hypothesis testing is "proof by contradiction using small probabilities"**:
  first assume $H_0$ (the two population parameters are equal), then compute the probability $P$ of
  the observed data under that assumption; if $P$ is small, reject $H_0$. The conclusion is
  probabilistic, not absolutely true.
- **$H_0$ must contain an equals sign and be about populations; $H_1$ is the direction the research
  wants to demonstrate**, and it determines one-sided versus two-sided, which must be fixed at the
  design stage and cannot be chosen after the fact.
- **The $P$ value = the probability, under the assumption that $H_0$ holds, of obtaining the observed
  or more extreme data.** It is not the probability that $H_0$ is true, not $1-P$, not the probability
  that the conclusion is wrong, and not the size of the difference.
- **Two kinds of error**: a Type I error is "rejecting a true null" ($H_0$ true but rejected), with
  maximum probability $\alpha$; a Type II error is "retaining a false null" ($H_0$ false but not
  rejected), with probability $\beta$. With $n$ fixed, $\alpha$ and $\beta$ move in opposite
  directions, and reducing both at once requires a larger sample. $1-\beta$ is the power.
- **A conclusion needs two sentences**: the statistical conclusion (whether the difference is
  statistically significant) plus the subject-matter conclusion (may be considered … / there is not
  yet evidence that …). Not rejecting $H_0$ is not the same as $H_0$ holding, and statistical
  significance is not clinical significance; multiple comparisons need correcting. **A confidence
  interval and a hypothesis test are equivalent**: a $1-\alpha$ confidence interval excluding $\mu_0$
  is the same as rejecting $H_0$ at level $\alpha$, and it additionally tells you how much the
  difference is. In R, `t.test()` hands you the statistic, the $P$ value, and the confidence interval
  all at once.
