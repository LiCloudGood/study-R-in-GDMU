---
layout: doc
title: 'Diagnostic Test Evaluation (ROC and AUC)'
---

# Diagnostic Test Evaluation

::: info Translation status
Translated from the [Chinese original](/Health-statistics/diagnostic-test). Numbers, formulas, and R
code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Every previous chapter dealt with comparisons between groups: how much two means differ, how much
> two rates differ. This topic asks a different question: **does a single marker — or an instrument,
> or a scoring rule — actually separate the diseased from the non-diseased?** In clinical work this
> is called diagnostic test evaluation. It has to answer: what are the sensitivity and specificity,
> where should the cutoff sit, and will this marker still work in another department? The subject
> matter is the same as model evaluation in Week 6 of *Medical Big Data Analysis and Decision
> Making*; that course enters through a model's confusion matrix, this one enters through a clinical
> marker.

## What this topic is for

Clinical decisions are made every day: how high does this marker have to be before it counts as
"abnormal"? A screening test comes back positive — how likely is this patient to actually have the
disease?

**These two questions must be kept apart**, because they correspond to two different families of
measures:

- **Starting from "does the patient have the disease?"** → sensitivity, specificity, likelihood ratios;
- **Starting from "what did the test say?"** → positive and negative predictive values.

The first family describes **the performance of the test itself** and does not depend on the
population. The second describes **what its result means in this particular group of people** and is
tied to prevalence. Conflating the two is the most common mistake in this area, and we return to it
below.

::: tip This topic is not one of the textbook's 19 chapters
The 17 chapters of *Health Statistics* do not give diagnostic test evaluation a chapter of its own,
but it is used constantly in clinical work, so it is included here as a supplementary topic.
The methods themselves are standard — ROC analysis and the DeLong test have both been established
for decades — and the emphasis here is on **how to compute it, how to read it, and where it is easy
to misread**.
:::

## Core concepts

### The 2×2 table: sensitivity and specificity

Cross-tabulate the gold standard's diagnosis against the result of the test being evaluated and you
get the diagnostic 2×2 table:

| | Gold standard: diseased | Gold standard: non-diseased | Total |
| --- | --- | --- | --- |
| **Test positive** | true positive $TP$ | false positive $FP$ | $TP+FP$ |
| **Test negative** | false negative $FN$ | true negative $TN$ | $FN+TN$ |
| Total | $TP+FN$ | $FP+TN$ | $N$ |

- **Sensitivity** (true positive rate):

$$Se=\frac{TP}{TP+FN}$$

  The denominator is **everyone who really has the disease**. A sensitivity of 0.80 means the test
  finds 80 of every 100 diseased patients. $1-Se$ is the **false negative rate**, i.e. the missed
  diagnosis rate.

- **Specificity** (true negative rate):

$$Sp=\frac{TN}{TN+FP}$$

  The denominator is **everyone who really does not have the disease**. A specificity of 0.90 means
  90 of every 100 non-diseased people are called negative. $1-Sp$ is the **false positive rate**,
  i.e. the misdiagnosis rate.

The denominator of each of these two numbers is defined by **true disease status**, which is why
they **do not change with prevalence** — their greatest strength, and also their greatest
limitation.

::: tip Do not swap the direction of sensitivity and specificity
One of them describes **the diseased column** ($Se$), the other describes **the non-diseased column**
($Sp$). A way to remember: **sensitivity is about missing patients; specificity is about wrongly
accusing healthy people.** The two usually trade off: lower the cutoff → more people test positive →
sensitivity goes up and specificity comes down.
:::

### The Youden index: one number for "how well do they separate"

Move the cutoff and $Se$ and $Sp$ move in opposite directions, so comparing two tests by looking at
two numbers is awkward. The **Youden index** combines them into one:

$$J = Se + Sp - 1 = Se - (1-Sp)$$

It equals **true positive rate minus false positive rate** and ranges from $-1$ to $1$ (in practice
from 0 to 1). $J=0$ means the test is no better than guessing; the larger $J$ is, the better the two
groups are separated.

:::: info The Youden index corresponds to a point on the ROC curve
The ROC curve plots $1-Sp$ on the horizontal axis and $Se$ on the vertical axis, so
$J = Se-(1-Sp)$ is simply **how far the point sits above the diagonal**. "Maximize the Youden index"
is the same thing as "find the point on the ROC curve farthest from the diagonal".
::::

### Likelihood ratios: two numbers that travel better than sensitivity and specificity

These two are **comparable across populations**:

$$LR^+ = \frac{Se}{1-Sp}, \qquad LR^- = \frac{1-Se}{Sp}$$

- $LR^+$: how many times more likely a positive result is in diseased than in non-diseased people.
  **Larger is better** (usually $>10$ to count as strong evidence).
- $LR^-$: how many times more likely a negative result is in diseased than in non-diseased people.
  **Smaller is better** (usually $<0.1$ to count as strong evidence).

Their advantage is that they **update a probability directly** (turning a pre-test probability into a
post-test probability) and do not depend on prevalence. Because $LR^+$ is driven by sensitivity and
$LR^-$ by specificity, judging the same test by both shows whether it is better suited to **ruling
out** or to **ruling in**.

### Predictive values: why the same test performs differently in another department

What clinicians usually want to know is a different question: **this patient tested positive — what
is the probability that they actually have the disease?**

- **Positive predictive value** $PPV = \dfrac{TP}{TP+FP}$
- **Negative predictive value** $NPV = \dfrac{TN}{TN+FN}$

Note that the denominators have changed: the denominator of $PPV$ is **everyone who tested
positive** ($TP+FP$), not everyone with the disease.

**Here is the key point**: $Se$ and $Sp$ depend only on the test, whereas $PPV$ and $NPV$ **follow
the prevalence**. Bayes' formula shows this directly:

$$PPV = \frac{Se\cdot p}{Se\cdot p + (1-Sp)(1-p)}$$

where $p$ is the prevalence. Below we compute this effect on real data — the difference is large
enough to change a clinical decision.

### How the ROC curve is drawn

All the $Se$ and $Sp$ values above were computed **at one particular cutoff**. The cutoff is chosen
by hand, so rather than pick one cutoff and report two numbers, **compute every possible cutoff** and
plot the results as a curve:

- horizontal axis: $1-Sp$ (false positive rate)
- vertical axis: $Se$ (true positive rate)
- sweep the cutoff from the strictest (everyone is called negative) to the most permissive (everyone
  is called positive); each cutoff is one point, and joining them gives the **ROC curve**.

The bottom-left corner $(0,0)$ corresponds to "call everyone negative" and the top-right corner
$(1,1)$ to "call everyone positive". **A good test bows towards the top-left corner** (high $Se$,
low $1-Sp$); a curve that hugs the diagonal means the marker is about as good as a coin flip.

### How to read the AUC

The **AUC** (area under the curve) is the area between the ROC curve and the horizontal axis. Its
exact meaning is a probability:

> Pick one diseased person and one non-diseased person at random: **the probability that the diseased
> person has the higher marker value**.

This sentence matters, because it shows that the AUC is a **rank-based** measure: all that is needed
is that the marker values of the diseased group are generally higher, and the marker's scale, units,
and skewness do not affect it. The AUC is also exactly the normalized Mann-Whitney $U$ statistic (in
binary logistic regression it is the $c$ statistic).

- $AUC = 0.5$: no discrimination at all (along the diagonal);
- $AUC = 1$: perfect separation.

::: warning On the rule-of-thumb bands for "how good is this AUC"
The literature circulates a set of bands (often attributed to Hosmer and Lemeshow's *Applied
Logistic Regression*): 0.5–0.7 poor discrimination, 0.7–0.8 acceptable, 0.8–0.9 good, above 0.9
excellent.

**These are rules of thumb, not a standard, and they should not be treated as a conclusion.** The
same AUC is worth very different amounts in different settings: for screening a disease whose
consequences are severe and whose confirmatory test is cheap, 0.7 may be enough; to replace a highly
invasive confirmatory procedure, even 0.9 may not be trusted. When reporting an AUC, rather than
writing "AUC = 0.73, acceptable discrimination", report **the sensitivity, the specificity, and the
lowest level that would be clinically acceptable** together.
:::

**The AUC is not everything.** It averages over every cutoff under the curve, so two markers can have
the same AUC with completely different curve shapes (one better in the middle, one better at the
ends) and behave very differently over the range of cutoffs actually used in practice. **The same
AUC does not mean the same clinical value.**

### How to choose the cutoff

Three common approaches; none of them is always right:

| Approach | How it works | When to use it |
| --- | --- | --- |
| Maximize the Youden index | take the cutoff maximizing $Se+Sp-1$ | the default, treating $Se$ and $Sp$ as equally important |
| Closest to the top-left corner | take the cutoff minimizing the distance to $(0,1)$ | close to the Youden index; the results often coincide |
| Fix it by clinical requirement | require $Se \geq$ some value (or $Sp \geq$ some value) and take the best cutoff satisfying it | **the most clinically meaningful**: for a disease where missing it is costly, pin the sensitivity first |

The third deserves the emphasis: **the cutoff should be decided by which error is worse — a missed
diagnosis or a misdiagnosis — not by an algorithm.** For diseases where missing the diagnosis is
severe, such as HIV screening or ectopic pregnancy, it is better to accept more false positives in
order to raise sensitivity; conversely, for a test whose positive result triggers an invasive
follow-up procedure, specificity has to be protected first.

### How to compare two ROC curves

Whether one marker (or model) has a higher AUC than another **cannot be decided by comparing the two
numbers directly** — the gap may be nothing but sampling error. The standard approach is the
**DeLong test** (DeLong et al., 1988), which accounts for the correlation between points along the
same curve and handles the paired structure correctly when both markers are measured on **the same
people**.

## Doing it in R

We use the `aSAH` data set shipped with the `pROC` package: 113 patients with aneurysmal
subarachnoid hemorrhage, outcome Good or Poor (41 Poor, 36.28%), with the biomarkers `s100b` and
`ndka`.

```r
library(pROC)
data(aSAH, package = "pROC")

# Outcome distribution: Poor is the "diseased" group we care about
table(aSAH$outcome)
#  Good Poor
#    72   41

# Draw the ROC curve and compute the AUC with its 95% confidence interval
r <- roc(aSAH$outcome, aSAH$s100b, levels = c("Good", "Poor"))
auc(r)        # 0.7314
ci.auc(r)     # 0.6301 ~ 0.8326

plot(r, print.auc = TRUE, print.thres = "best",
     xlab = "1 - Specificity (false positive rate)", ylab = "Sensitivity (true positive rate)")
```

**AUC = 0.7314, 95% confidence interval 0.6301 ~ 0.8326.**

Choosing a cutoff by the Youden index:

```r
coords(r, "best", best.method = "youden",
       ret = c("threshold", "sensitivity", "specificity"))
#   threshold sensitivity specificity
# 1     0.205   0.6341463   0.8055556
```

At a cutoff of 0.205: **sensitivity 0.634, specificity 0.806, Youden index 0.440**.
Hence **$LR^+ = 3.26$ and $LR^- = 0.454$** — both only "moderate", meaning this marker on its own is
not enough either to confirm or to rule out.

Build the 2×2 table at this cutoff and compute the predictive values:

```r
thr <- 0.205
tab <- table(pred = ifelse(aSAH$s100b >= thr, "Positive", "Negative"),
             truth = aSAH$outcome)
tab
#           truth
# pred       Good Poor
#   Negative   58   15
#   Positive   14   26
```

> Row order note: `table()` sorts its row names alphabetically, so this English version prints
> **Negative** before **Positive** — the Chinese original printed 阳性 before 阴性. The counts are
> identical either way.

$TP=26$, $FP=14$, $FN=15$, $TN=58$, so

- $PPV = 26/(26+14) = 0.650$
- $NPV = 58/(58+15) = 0.795$

**Note that these two numbers hold only in this group, where the prevalence is 36.28%.** With the
same $Se$ and $Sp$, another population gives different values:

| Prevalence | Positive predictive value (PPV) | Negative predictive value (NPV) |
| --- | --- | --- |
| 5% | **0.147** | 0.977 |
| 10% | 0.266 | 0.952 |
| 36.28% (this study population) | 0.650 | 0.795 |
| 50% | 0.765 | 0.688 |

**This table is worth staring at.** Move the same test into a population with 5% prevalence — community
screening, say — and only 14.7% of positive results belong to a true case: **a positive result is
essentially worthless**. This is why **a low-specificity test is unsuitable for screening in a
low-prevalence population**, and why "a positive finding on a health check" usually calls for a repeat
test rather than an immediate conclusion.

Different cutoffs trade $Se$ against $Sp$ differently:

| Cutoff | Sensitivity | Specificity | Youden index |
| --- | --- | --- | --- |
| 0.05 | 0.976 | 0.069 | 0.045 |
| 0.10 | 0.829 | 0.389 | 0.218 |
| 0.15 | 0.659 | 0.639 | 0.297 |
| **0.20** | **0.634** | **0.806** | **0.440** |
| 0.30 | 0.512 | 0.833 | 0.346 |

Lowering the cutoff from 0.20 to 0.05 raises sensitivity from 0.63 to 0.98 but drops specificity from
0.81 to 0.07 — **essentially everyone is called positive**, and that "high sensitivity" has stopped
meaning anything. So "lower the cutoff to raise sensitivity" has a price, and only one side of it
should never be reported.

Finally, comparing the AUCs of the two markers:

```r
r2 <- roc(aSAH$outcome, aSAH$ndka, levels = c("Good", "Poor"))
auc(r2)                        # Area under the curve: 0.612
roc.test(r, r2, method = "delong")
# Z = 1.3908, p-value = 0.1643
```

The AUC of `s100b` (0.7314) looks considerably higher than that of `ndka` (0.612), but the
**DeLong test gives p = 0.164: the difference is not statistically significant**.
With 113 patients this gap proves nothing — precisely why **AUCs cannot simply be compared by size**.
(`roc.test` also reports the 95% confidence interval for the difference in AUCs, −0.049 to 0.288,
which likewise crosses 0.)

## Common pitfalls

::: warning Six common mistakes
**① Using predictive values to compare two tests.**
$PPV$ and $NPV$ change with prevalence, so $PPV$ computed in two populations with different
prevalences cannot be compared at all. Compare test performance with $Se$, $Sp$, likelihood ratios,
or the AUC.

**② Reading "high sensitivity" as "positive means diseased".**
High sensitivity only means **few diseased patients are missed**; whether the positive predictive
value is high depends on prevalence. In a low-prevalence population, even a very sensitive test can
have a very low positive predictive value (the table above is the proof).

**③ Reporting the AUC without the $Se$ and $Sp$ at a cutoff.**
The AUC is an **average over cutoffs**; clinically the test has to be pinned to a specific cutoff
before it can be used. Reporting an AUC without a cutoff says nothing about how to use the test.

**④ Evaluating the test in a population with verification or selection bias.**
The $Se$ and $Sp$ of a diagnostic test hold only when **everyone's true status has been confirmed by
the gold standard**. If the gold standard is applied only to those who tested positive (verification
bias), the computed sensitivity and specificity are both biased.

**⑤ Choosing the cutoff and reporting performance on the same data set.**
Picking the Youden-optimal cutoff on one batch of data and then reporting the sensitivity and
specificity at that cutoff **is optimistic bias**. The proper approach is to choose the cutoff on one
part of the data (or on data from another center) and validate it on another.

**⑥ Back-calculating prevalence from the test's positivity rate.**
Prevalence has to be estimated by epidemiological survey; it cannot be obtained by dividing the
positivity rate of an instrument by anything — that number still carries $Se$ and $Sp$ inside it.
:::

## How it connects to the other courses

- **[Week 6 of *Medical Big Data Analysis and Decision Making*, Classification (2)](/en/Medical-Big-Data-Analysis/6-classification-2)** — that week approaches ROC and diagnostic evaluation **from a model**: confusion
  matrices, drawing curves with `pROC`, choosing a model by AUC. This topic approaches the same
  material **from a clinical marker**: how the cutoff is set by clinical cost, and why predictive
  values move with prevalence. Both use `pROC`; only the entry point differs.
- **[Week 5 of *Medical Big Data Analysis and Decision Making*, Classification (1)](/en/Medical-Big-Data-Analysis/5-classification-1)** — the confusion matrix, accuracy, and kappa all appear there. **Evaluating a
  classification model and evaluating a diagnostic test are the same exercise**; that course calls the
  gold standard the true label.
- **[Lecture 14 of *Introduction to Information Technology*, Tests of Homogeneity and Contingency Tables](/en/intro-it/14-goodness-of-fit-and-contingency)** — building contingency tables, using `table()`, and the assumptions of the chi-square
  test are all worked through there; the diagnostic 2×2 table is just a $2\times2$ contingency table.
- **[Chapter 10, Chi-Square Tests](/en/Health-statistics/10-chi-square)** — constructing
  2×2 tables, expected frequencies, and assumptions. Comparing the positivity rates of two diagnostic
  tests uses the tests from that chapter.
- **[Chapter 6, Estimating Population Means and Rates](/en/Health-statistics/06-estimation)** —
  sensitivity and specificity are both **rates**, so both should be reported with confidence
  intervals. The same goes for the AUC.

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/diagnostic-test once
translated; for now the Chinese page /Health-statistics/diagnostic-test) from:
- /Medical-Big-Data-Analysis/6-classification-2 where ROC curves and AUC are discussed.
- /intro-it/14-goodness-of-fit-and-contingency where table() and contingency tables are discussed.
- /Health-statistics/10-chi-square where the 2x2 table is discussed.
-->

## Summary

| The question you want to answer | Which measure | Key reminder |
| --- | --- | --- |
| How many diseased patients does this test find? | sensitivity $Se$ | the denominator is **all diseased patients**; does not change with prevalence |
| How many healthy people does it wrongly accuse? | specificity $Sp$ | the denominator is **all non-diseased people**; does not change with prevalence |
| One number to compare two tests? | Youden index, likelihood ratios, AUC | the Youden index corresponds to the point farthest from the diagonal on the ROC curve |
| Tested positive — how likely is disease? | positive predictive value $PPV$ | **changes sharply with prevalence**; not comparable across populations |
| Tested negative — how likely is no disease? | negative predictive value $NPV$ | as above; $NPV$ is naturally high when prevalence is low |
| Where should the cutoff go? | maximize the Youden index / pin $Se$ or $Sp$ by clinical requirement | **which error is worse is a clinical judgment, not an algorithmic one** |
| Which marker has the higher AUC? | DeLong test | a large AUC gap may still be sampling error; equal AUCs may still differ clinically |
