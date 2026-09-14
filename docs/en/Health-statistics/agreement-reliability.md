---
layout: doc
title: 'Agreement and Reliability (Kappa and ICC)'
---

# Agreement and Reliability

::: info Translation status
Translated from the [Chinese original](/Health-statistics/agreement-reliability). Numbers, formulas,
and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Every previous chapter asked whether groups differ. This topic asks something different: **when the
> same subjects are measured repeatedly, or judged by different people, do the results agree?** Will
> two clinicians looking at the same scan reach the same diagnosis? If the same instrument measures
> the same sample today and tomorrow, how far apart are the readings? This is **reliability**, and it
> decides whether the numbers you measured can be used at all — an unreliable measurement means that
> whatever you analyze afterwards is noise. The measures used are kappa (categorical data) and the ICC
> (quantitative data).

## What this topic is for

Repeated measurement is everywhere in clinical work and research: two pathologists reading the same
slides, two instruments assaying the same blood samples, the same scale re-administered two weeks
later.

To evaluate such data you have to answer: **of the variation in the measurements, how much comes from
the subjects genuinely differing, and how much from measurement error?**

$$\text{reliability} = \frac{\text{true variance}}{\text{true variance} + \text{error variance}}$$

Reliability near 1 means the differences you measured are mostly real differences between subjects;
near 0 means what you measured is mostly noise.

::: warning Correlation is not agreement — the single most important sentence in this topic
Take two rulers. One measures true length; the other always reads **twice** the true length.
Their **correlation coefficient is exactly 1** — perfectly correlated. But can they be used
interchangeably? Obviously not: one says 10 cm, the other says 20 cm.

**Correlation describes moving together; agreement describes taking the same value.** These are two
different things. So agreement **must never** be assessed with the Pearson correlation coefficient —
kappa, the ICC, or Bland–Altman are required. The "Doing it in R" section below computes this
difference on real data.
:::

::: tip This topic is not one of the textbook's 19 chapters
The 17 chapters of *Health Statistics* do not give reliability analysis a chapter of its own
(a kappa test does appear in Lecture 14 of *Introduction to Information Technology*), but it is
needed daily when developing scales, comparing instruments, or running multicentre studies, so it is
included here as a supplementary topic.
:::

## Core concepts

### Categorical data: kappa

Two raters each assign a category to every subject; cross-tabulate the results. The **observed
agreement** $P_o$ is the proportion of subjects on which the two raters agree:

$$P_o = \frac{\text{sum of the diagonal counts}}{N}$$

But $P_o$ hides a trap: **even two raters who guess at random will agree some of the time.** That
chance proportion is the **expected agreement** $P_e$, computed from the two raters' marginal
distributions:

$$P_e = \sum_i p_{i\cdot}\,p_{\cdot i}$$

where $p_{i\cdot}$ and $p_{\cdot i}$ are the proportions assigned to category $i$ by each rater.
Kappa simply subtracts the chance agreement:

$$\kappa = \frac{P_o - P_e}{1 - P_e}$$

The denominator $1-P_e$ is "how much agreement was still available after removing chance". So
$\kappa=1$ is perfect agreement, and $\kappa=0$ is **the level of guessing** — note: not "complete
disagreement".

::: tip $\kappa$ can be negative
When two raters agree less than chance would predict, $\kappa$ is negative. It is rare in real data,
but when it happens it means the two raters' judgements are **systematically opposed**.
:::

### Weighted kappa: ordinal data

If the categories **have an order** (say a 1–5 imaging score), treating "1 read as 2" as equally
serious as "1 read as 5" makes no sense. Weighted kappa assigns a different weight to each degree of
disagreement:

- **linear weights**: $w_{ij} = 1 - \dfrac{|i-j|}{k-1}$
- **quadratic weights**: $w_{ij} = 1 - \dfrac{(i-j)^2}{(k-1)^2}$

Perfect agreement gives $w=1$, and the further apart the categories, the smaller $w$. Quadratic
weights punish large disagreements harder, so **the resulting $\kappa$ is usually larger than with
linear weights**.

Whether to weight at all depends on one thing only: **do the categories have a natural order?**
Ordinal data (disease grade, Likert scales, pain scores) should be weighted; nominal data (blood
group, diagnostic category, positive/negative) **must not be** — numbering nominal categories 1, 2, 3
and computing a weighted kappa manufactures information that is not there.

### Quantitative data: the ICC

Continuous measurements use the **intraclass correlation coefficient** (ICC). It is essentially the
ratio of the "mean square for subjects" to the "mean square for error" in an analysis of variance,
which is why it reflects both **correlation** and **agreement**.

The ICC is not **one** index but **a family** of them. In the framework of McGraw and Wong (1996) it
results from three choices:

| Choice | Options | How to decide |
| --- | --- | --- |
| **Model** | one-way random, two-way random, two-way mixed | were the raters drawn at random from a larger population? |
| **Type** | single measurement, mean of $k$ measurements | in practice, will you use one measurement or the average of several? |
| **Definition** | consistency, absolute agreement | do you care only that the ranking agrees, or that the values are the same? |

Combining the three gives 10 forms. Shrout and Fleiss (1979) write them with two numbers, for example:

- **ICC(2,1)**: two-way random effects, absolute agreement, single measurement;
- **ICC(3,1)**: two-way mixed effects, consistency, single measurement.

::: tip Which combination to pick, in one breath
- **The same raters rate every subject, and you want to generalize to "other raters like these"** →
  two-way random (model 2);
- **These raters are the only ones you care about, no generalization intended** → two-way mixed
  (model 3);
- **You will actually use a single measurement** → type 1; **you will use the mean of $k$** → type $k$;
- **You care whether the values are the same** (most clinical settings — can two instruments be
  swapped?) → **absolute agreement**; if you care only about ranking (do two scale administrations
  order the subjects the same way?) → consistency.

**Test–retest reliability and repeated measurements by the same rater always use two-way mixed plus
absolute agreement.**
:::

**The difference between absolute agreement and consistency is practical**: "consistency" tolerates a
**constant systematic offset** between raters (rater A is always 3 points above rater B, and
$\text{ICC}=1$), whereas "absolute agreement" does not — the offset pulls the ICC straight down. So
**to decide whether two instruments are interchangeable, absolute agreement is required**.

### How to read these numbers

::: warning Bands for kappa (Landis & Koch, 1977)
| $\kappa$ | Strength of agreement |
| --- | --- |
| 0.00 | Poor |
| 0.01 ~ 0.20 | Slight |
| 0.21 ~ 0.40 | Fair |
| 0.41 ~ 0.60 | Moderate |
| 0.61 ~ 0.80 | Substantial |
| 0.81 ~ 1.00 | Almost perfect |

These bands come from Landis and Koch's 1977 paper in *Biometrics*, and that paper states that the
boundaries are **conventional descriptive labels, not a test criterion**. Do not treat them as a
pass mark.
:::

::: warning Bands for the ICC (Koo & Li, 2016)
| ICC | Reliability |
| --- | --- |
| $<0.5$ | Poor |
| $0.5 \sim 0.75$ | Moderate |
| $0.75 \sim 0.9$ | Good |
| $>0.9$ | Excellent |

Koo and Li's 2016 guideline makes two points that matter more than the numbers:

1. **Assign the band from the 95% confidence interval, not from the point estimate.**
   A point estimate of 0.93 looks "excellent", but if the interval is 0.88–0.97 the honest statement
   is "good to excellent"; only when **the lower bound itself exceeds 0.9** is "excellent" warranted.
2. **With too few subjects or too few raters, the ICC is not trustworthy in the first place.** They
   recommend **at least 30 heterogeneous subjects and at least 3 raters**. With a small sample the
   confidence interval becomes unreadably wide — in the example below it is wide enough to include 0.
:::

## Doing it in R

### 1. Nominal data: Cohen's kappa and Fleiss' kappa

We use `diagnoses`, shipped with the `irr` package: 30 patients, 6 raters, each assigning one of 5
diagnostic categories.

```r
library(irr)
data(diagnoses, package = "irr")

# Between two raters: Cohen's kappa
kappa2(diagnoses[, c("rater1", "rater2")])
#  Cohen's Kappa for 2 Raters (Weights: unweighted)
#   Subjects = 30   Raters = 2   Kappa = 0.651
#          z = 7   p-value = 2.63e-12

# Across six raters: Fleiss' kappa
kappam.fleiss(diagnoses)
#  Fleiss' Kappa for m Raters
#   Subjects = 30   Raters = 6   Kappa = 0.43
#          z = 17.7   p-value = 0
```

That `p-value = 0` is R's printing underflow: it means **less than 2.2×10⁻¹⁶**, not literally zero.

**The $\kappa$ between rater1 and rater2 is 0.651** (Substantial), while **across all six raters it is
0.430** (Moderate).

That gap is worth noticing in itself: **the more raters there are, the harder it is for overall
agreement to be high.** So a report must state whether it is "between these two raters" or "across
all of them" — the two numbers are not interchangeable.

Checking it by hand ($P_o$ and $P_e$):

```r
two <- diagnoses[, c("rater1", "rater2")]
Po <- mean(two$rater1 == two$rater2)          # 0.7333
tb <- table(two$rater1, two$rater2)
Pe <- sum(rowSums(tb) * colSums(tb)) / nrow(two)^2   # 0.2356
(Po - Pe) / (1 - Pe)                          # 0.6512
```

$P_o = 0.7333$, $P_e = 0.2356$, $\kappa = \dfrac{0.7333-0.2356}{1-0.2356} = 0.6512$ ✓

### 2. Ordinal data: weighted kappa

We use `irr::anxiety`: anxiety scores for 20 patients, 3 raters, grades 1–6.

```r
data(anxiety, package = "irr")
ax <- anxiety[, c("rater1", "rater2")]

kappa2(ax, weight = "unweighted")$value   # 0.1195
kappa2(ax, weight = "equal")$value        # 0.1892  <- linear weights
kappa2(ax, weight = "squared")$value      # 0.2968  <- quadratic weights
mean(ax$rater1 == ax$rater2)              # observed agreement 0.3000
```

The same data, three numbers: **0.120 / 0.189 / 0.297**.

- Unweighted, a difference between 1 and 2 counts as heavily as one between 1 and 6, and $\kappa$ is
  only 0.12;
- With linear weights (a small penalty for one grade apart, a large one for five grades apart) it
  rises to 0.19;
- With quadratic weights (punishing large deviations harder) it rises to 0.30.

**The difference is caused by the choice of weights, not by a change in the data.** So a weighted
kappa must always state **which weights were used**. (In `irr` the linear weights are spelled
`"equal"` and the quadratic weights `"squared"`. All three numbers here were checked by hand.)

Note also $P_o = 0.30$: **these two raters actually agree only 30% of the time**, and no choice of
weights makes that reliable.

### 3. Quantitative data: the ICC

The same data (20 subjects × 3 raters), now treated as a continuous score:

```r
library(psych)
ICC(anxiety)$results[, c("type", "ICC", "lower bound", "upper bound")]
#                          type       ICC lower bound upper bound
# Single_raters_absolute   ICC1 0.1750225 -0.07744650   0.4843362
# Single_random_raters     ICC2 0.1979983 -0.03891068   0.4935740
# Single_fixed_raters      ICC3 0.2160493 -0.04625793   0.5222590
# Average_raters_absolute ICC1k 0.3889259 -0.27492318   0.7380652
# Average_random_raters   ICC2k 0.4254988 -0.12658288   0.7451493
# Average_fixed_raters    ICC3k 0.4525861 -0.15292145   0.7663308
```

`irr::icc` gives the same results and can be used as a cross-check:

```r
library(irr)
icc(anxiety, model = "twoway", type = "agreement", unit = "single")$value   # ICC(2,1) = 0.1980
icc(anxiety, model = "twoway", type = "agreement", unit = "average")$value  # ICC(2,k) = 0.4255
```

How to read these numbers:

- **ICC(2,1) = 0.198**: on a single measurement, reliability is poor ($<0.5$, Poor);
- **ICC(2,k) = 0.4255**: averaging the 3 raters raises it substantially, but still not enough;
- **the 95% confidence interval for ICC(2,1) is −0.039 to 0.494**: **wide enough to include 0**. With
  only 20 subjects, not even "is reliability positive at all?" can be settled — exactly the situation
  Koo and Li warn about (they recommend at least 30 subjects and at least 3 raters).

**How the ICC is computed** becomes clear once you work it out from the ANOVA mean squares:

```r
icc_hand <- function(mat) {
  n <- nrow(mat); k <- ncol(mat); grand <- mean(mat)
  MSR <- k * sum((rowMeans(mat) - grand)^2) / (n - 1)   # mean square for subjects
  MSC <- n * sum((colMeans(mat) - grand)^2) / (k - 1)   # mean square for raters
  SST <- sum((mat - grand)^2)
  MSE <- (SST - k * sum((rowMeans(mat) - grand)^2) -
          n * sum((colMeans(mat) - grand)^2)) / ((n - 1) * (k - 1))  # mean square for error
  c(MSR = MSR, MSC = MSC, MSE = MSE,
    ICC21 = (MSR - MSE) / (MSR + (k - 1) * MSE + k * (MSC - MSE) / n),
    ICC2k = (MSR - MSE) / (MSR + (MSC - MSE) / n),
    ICC31 = (MSR - MSE) / (MSR + (k - 1) * MSE))
}
icc_hand(as.matrix(anxiety))
#      MSR      MSC      MSE    ICC21    ICC2k    ICC31
# 2.645556 4.816667 1.448148 0.197998 0.425499 0.216049
```

**MSR = 2.6456, MSC = 4.8167, MSE = 1.4482**, and substituting these gives ICC(2,1) = $0.1980$,
ICC(2,k) = $0.4255$, ICC(3,1) = $0.2160$, in exact agreement with `psych::ICC` and `irr::icc`.

Those three mean squares are readable in themselves:
**MSC = 4.82 is larger than MSR = 2.65**, meaning **the systematic differences between raters exceed
the genuine differences between subjects** — that is, in these ratings *who is rating* matters more
than *who is being rated*. Such a measurement is of course unreliable.

### 4. Correlation ≠ agreement: computing it

Take rater3's scores from `anxiety` as $x$ and construct a second set
$y = x + \text{offset} + \text{small random noise}$, simulating "the second rater consistently scores
higher":

```r
x <- anxiety$rater3
for (off in c(0, 1, 3)) {
  set.seed(7)   # same seed each time: only the offset differs between the three rows
  y <- x + off + rnorm(length(x), 0, 0.5)
  cat(sprintf("offset %d points: r = %.4f   ICC(2,1) = %.4f\n",
              off, cor(x, y), icc_hand(cbind(x, y))["ICC21"]))
}
# offset 0 points: r = 0.8905   ICC(2,1) = 0.8824
# offset 1 points: r = 0.8905   ICC(2,1) = 0.6254
# offset 3 points: r = 0.8905   ICC(2,1) = 0.2239
```

**The correlation coefficient does not move at all — 0.8905 throughout — while the ICC falls from
0.88 to 0.22.**

The reason is plain: adding a constant to one set of numbers **leaves the "rise and fall together"
relationship completely untouched** (so $r$ is unchanged), but the two sets are now 3 points apart
(so agreement collapses). **The correlation coefficient is entirely blind to systematic offset** —
which is the fundamental reason it cannot be used to assess agreement.

Even more extreme, with no noise at all and a pure offset of 1 point:

```r
y <- x + 1
cor(x, y)                       # 1.0000  <- perfect correlation
icc_hand(cbind(x, y))["ICC21"]  # 0.7826  <- absolute agreement drops
icc_hand(cbind(x, y))["ICC31"]  # 1.0000  <- but under "consistency" it is still 1
```

$r = 1.000$, ICC(2,1) only 0.783, while **ICC(3,1)**, which looks only at ranking, **is still 1**.
This passage demonstrates two things at once: **correlation is not agreement**, and **the distinction
between the "absolute agreement" and "consistency" definitions is real**.

::: tip Another option for continuous data: Bland–Altman
The ICC gives one summary number, but says nothing about how large the bias is or what shape the
error takes. A **Bland–Altman plot** (two-method mean on the horizontal axis, two-method difference on
the vertical axis) is more direct: for the offset-1, noise-SD-0.5 example above, the mean difference
is 1.22 and the SD of the differences is 0.62, so the limits of agreement are
$1.22 \pm 1.96\times0.62$.

**The two are complementary**: the ICC answers "can subjects be told apart?", Bland–Altman answers
"how far apart are they, and is the gap stable?".
:::

### 5. The kappa paradox: high agreement, unimpressive kappa

This is where beginners get most confused. Two raters judge "normal / abnormal" in the constructed
table below:

| | Rater B: normal | Rater B: abnormal |
| --- | --- | --- |
| **Rater A: normal** | 85 | 5 |
| **Rater A: abnormal** | 5 | 5 |

```r
Po <- (85 + 5) / 100                                # 0.90
Pe <- (90 * 90 + 10 * 10) / 100^2                    # 0.82
(Po - Pe) / (1 - Pe)                                 # 0.4444
```

**Observed agreement is 90%, yet kappa is only 0.444** (Moderate).

Why? Because **both raters lean towards "normal"** (each called 90 cases normal), so even random
assignment agrees often — the expected agreement $P_e$ is already 0.82. The denominator
$1-P_e = 0.18$ is squeezed small, and the slightest disagreement then pulls $\kappa$ down sharply.

**This is the kappa paradox** (kappa running low because of unbalanced marginals / prevalence).
It carries two reminders:

1. **Report $P_o$ and both marginal distributions alongside kappa**, otherwise readers cannot tell
   whether a low kappa means genuine disagreement or skewed marginals;
2. When the positive rate is very low or very high (agreement on a rare diagnosis, say), **kappa is
   naturally low**; in that case report **$P_o$** as well, and consider **positive agreement** or
   **Gwet's AC1**.

## Common pitfalls

::: warning Seven common mistakes
**① Assessing agreement with the Pearson correlation coefficient.** As computed above: add a constant
to one set and $r$ does not budge. Correlation only cares that things rise and fall together;
agreement cares that the values are the same. **This is the biggest trap in this topic.**

**② Assessing agreement with a paired $t$ test, or with a two-group comparison.** A paired $t$ test
can only detect **whether the mean difference is 0**; it cannot detect random error that differs from
pair to pair. And "the difference is not statistically significant" is not the same as "the two
agree" — it may simply mean the sample was too small. Agreement needs purpose-built measures.

**③ Computing a weighted kappa for nominal categories.** Blood group, diagnostic category, and
positive/negative have no order; forcing them into 1, 2, 3 and weighting them manufactures information
that does not exist.

**④ Reporting an ICC without saying which form it is.** ICC(1,1), ICC(2,1), and ICC(3,1) can differ
several-fold **on the same data** (in the example above, 0.175 / 0.198 / 0.216 for single
measurements, becoming 0.389 / 0.425 / 0.453 in the averaged form). The proper practice is to state
the **software, model, type, and definition** together and to report the **95% confidence interval**.

**⑤ Drawing conclusions from the ICC point estimate alone.** When the point estimate is 0.93 but the
CI is 0.88–0.97, the most that can be said is "good to excellent". **The interval has to be read.**

**⑥ Reporting reliability from too small a sample.** In the 20-subject example above, the ICC's CI
starts at −0.039. Koo and Li recommend at least **30 heterogeneous subjects** and at least
**3 raters**; the more raters and the more homogeneous the subjects, the more easily the ICC comes out
low or unstable.

**⑦ Conflating reliability with validity.** High reliability only means **the measurement is stable**;
it does not mean **it measures what you intended to measure**. A blood-pressure cuff that always reads
0 has perfect reliability (it agrees with itself every time) and zero validity. **Validity first,
reliability second.**
:::

## How it connects to the other courses

- **[Lecture 14 of *Introduction to Information Technology*, Tests of Homogeneity and Contingency Tables](/intro-it/14-goodness-of-fit-and-contingency)**
  *(Chinese)* — that lecture works through a **kappa test** (`kappa.test`, `Kappa()`), the first place
  on this site where kappa appears. This topic supplies the reasoning behind it: why chance agreement
  is subtracted, how weighting works, and where the bands come from.
- **[Week 6 of *Medical Big Data Analysis and Decision Making*, Classification (2)](/Medical-Big-Data-Analysis/6-classification-2)**
  *(Chinese)* — kappa also comes up when evaluating classification models. **The algorithm is exactly
  the same**; that course simply replaces "the other rater" with "the model's prediction".
  Sensitivity, specificity, and ROC in the diagnostic setting are covered in
  **[Diagnostic Test Evaluation](/en/Health-statistics/diagnostic-test)** in this section.
- **[Chapter 12, Bivariate Association](/Health-statistics/12-bivariate-association)** *(Chinese)* —
  that chapter covers **correlation** (Pearson, Spearman) and tests of association in contingency
  tables ($\chi^2$, OR, RR). **It is the natural counterpart to this topic**: that chapter asks whether
  two variables are related, this one asks whether two sets of measurements agree. Reading
  "correlation ≠ agreement" here after that chapter makes it especially clear.
- **[Chapter 5, Describing Qualitative Data](/Health-statistics/05-describing-qualitative-data)**
  *(Chinese)* — computing rates and proportions, and where "agreement" sits within descriptive
  statistics.
- **[Chapter 19, Statistical Tables and Charts](/Health-statistics/19-tables-and-charts)** *(Chinese)* —
  a Bland–Altman plot is a kind of difference plot, sharing the charting principles of that chapter.

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/agreement-reliability
once translated; for now the Chinese page /Health-statistics/agreement-reliability) from:
- /intro-it/14-goodness-of-fit-and-contingency where the kappa test is discussed.
- /Medical-Big-Data-Analysis/6-classification-2 where kappa or model agreement is discussed.
- /Health-statistics/12-bivariate-association where the Pearson correlation coefficient is discussed.
-->

## Summary

| Data type | What to use | Key reminder |
| --- | --- | --- |
| Nominal (two raters) | Cohen's kappa | $\kappa$ has already removed chance agreement; skewed marginals push it low |
| Nominal (several raters) | Fleiss' kappa | the more raters, the harder overall agreement is to keep high; not the same quantity as a pairwise kappa |
| **Ordinal** | weighted kappa | state whether **linear** or **quadratic** weights were used; the two can differ considerably |
| Quantitative (continuous) | ICC | state the **model / type / definition** and report the 95% confidence interval |
| Quantitative (bias of interest) | Bland–Altman | complementary to the ICC: one says "can subjects be told apart", the other "how far apart" |

**Three sentences to remember from this topic:**

1. **Correlation ≠ agreement** — a systematic offset is completely invisible to the correlation
   coefficient and immediately obvious to the ICC and to Bland–Altman;
2. **Kappa for categorical data, ICC for quantitative, weights for ordinal, and always name the ICC
   form**;
3. **Every reliability index needs a 95% confidence interval** — a good-looking point estimate is not
   the same as a trustworthy one, and be especially careful with fewer than 30 subjects or fewer than
   3 raters.
