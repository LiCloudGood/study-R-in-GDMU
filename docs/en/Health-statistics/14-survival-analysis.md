---
layout: doc
title: '14. Survival Analysis'
---

# Chapter 14. Survival Analysis

::: info Translation status
Translated from the [Chinese original](/Health-statistics/14-survival-analysis). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The conclusion of some studies cannot be given by answering “did they get better?” alone — you also have
> to answer “how long were they better for?”. Survival analysis is the whole family of methods for this
> kind of “outcome + time” data, and its hardest and most valuable feature is that it can put to correct
> use those records whose outcome has not arrived yet.

## What this chapter is for

Picture a very common clinical study: 22 lung cancer patients are split at random into two groups, one
given chemotherapy alone and the other chemotherapy combined with radiotherapy; they are followed up from
the day they are discharged after remission, and how long each one lived is recorded. Looking at the data,
you may find that the follow-up times look like this:

- Chemotherapy group: 1, 2, 3, 5, 6, 9⁺, 11, 13, 16, 26, 37⁺

The question is plain: **is there any difference between the effects of the two treatments?**

But if you follow the line of thinking of the earlier chapters, you run into a wall at every step:

- Compare the two groups' mean survival times with a **$t$ test or analysis of variance**? No. Those methods
  require an exact value for every subject, whereas a person marked with “+” gives you only the sentence
  “lived at least 9 months”; the exact time of death is unknown, so the two sample distributions cannot be
  pinned down at all, and the normality condition cannot even be discussed.
- Even granting that the conditions hold, a $t$ test and ANOVA compare only “how long they lived” and never
  look at “what the outcome was”. **Evaluating a treatment means looking at the outcome and the time
  together**: the outcome is death in both groups, but the regimen that lets patients live longer is the
  better one, and a $t$ test cannot see that layer of difference.
- Switch to a **rank-sum test**? It does not require normality, but it too compares only the time and not
  the outcome, and still falls short of evaluating the treatment overall.
- Then “simplify” the data into qualitative data — count how many died and how many are still alive in each
  group, and run a $2\times2$ chi-square test? Even worse. First, forcing “lived at least 9 months” to count
  as “alive” is wrong in itself (that patient may perfectly well have died in month 10); second, once
  quantitative data are squeezed down into qualitative data, the time information is all lost; third,
  chi-square compares only the **outcome** (the survival rate), not the **time** — even if both groups
  report “2 patients alive”, in one group those 2 have only just passed 1 year while in the other they have
  already lived past 3 years, and chi-square knows nothing about that.

**Outcome and time must be analyzed together**, and that calls for a new set of methods. Survival analysis
is the broad class of statistical methods that analyzes the event outcome and “the time it took for that
outcome to occur” jointly; it has a fairly independent theoretical system of its own and is widely used in
medicine, industry, agriculture, national defense, and elsewhere.

<ClickAnswer showText="▼ Think about it: if I simply delete every record marked with a + and run a t test on the exact times that are left, what goes wrong?">

The data look “clean”, but you have in fact done something terrible: **the people you deleted are exactly
the ones who lived longer**. A person marked with “+” is either still alive when the study closes, or lost
to follow-up somewhere along the way — and those are precisely the evidence of a good treatment effect.
Throwing them away amounts to deliberately deleting the part of the information that favors the treatment,
and the result is a **systematic underestimate of survival time and overestimate of the risk of death**.

What is worse, this bias is not a matter of “bad luck, the sample was not drawn well” but a bias with a
direction and a system to it (in statistics, selection bias); **increasing the sample size not only fails
to remove it, it estimates the wrong conclusion more precisely**. The correct approach is in the next
section, “Censored data” — not delete, not impute, but let the method itself make use of it.

</ClickAnswer>

<TrackList :tasks="['Explain why censored data must not be thrown away as missing values', 'Work out the first few survival rates of the Kaplan–Meier method by hand', 'Read the horizontal axis, the vertical axis, and the steps of a survival curve', 'Use survdiff() to compare two survival curves', 'Interpret exp(coef) in the output of coxph() correctly', 'Know to check the proportional hazards assumption with cox.zph()']" />

## Core concepts

This chapter's concepts unfold in the order “understand the data first, then compute, then compare, then
model”, in four blocks:

1. **What survival data look like** — survival time, the outcome event, and, most importantly, **censored
   data**
2. **How to work out the survival rate** — death probability, survival probability, the survival curve,
   median survival time
3. **The Kaplan–Meier method** — the product-limit estimate, and how to estimate a survival curve from
   ungrouped data
4. **How to compare and model** — the log-rank test for comparing curves, Cox proportional hazards
   regression for looking at influencing factors

## What survival data look like

### Four features in common

Data of this kind are everywhere in medical research: in evaluating the treatment effect on chronic
diseases such as cancer, diabetes, and hypertension, you look not only at the cure rate but also at how
long the cure took; in evaluating the anti-smoking effect of health education, you look not only at whether
people quit but also at how long it took them to quit; in evaluating the outcome of kidney transplantation,
you look not only at whether the patient survived but also at how long they survived. Collectively these
are called **survival data**, and they share four features:

1. **They carry information about both the outcome and the time**. This is the fundamental point that
   distinguishes them from every data type covered earlier.
2. **The outcome is a binary, mutually exclusive event**. It is usually recorded as “the death event
   occurred” or “it did not”, and one of the two must hold.
3. **They are generally collected by follow-up**. Follow-up has a uniform starting point (some point in
   time such as diagnosis, admission, surgery, or discharge after remission) and a specified closing point.
4. **The survival time of some subjects is often incomplete because of loss to follow-up and the like**,
   the distribution type is complex, and $t$ tests, analysis of variance, the $\chi^2$ test, Fisher's exact
   test for a $2\times2$ table, and the rank-sum test **cannot** simply be applied.

### “Death” and “survival time” are both meant broadly

A **death event** (also called a **failure event**): any characteristic event that marks the failure of
some treatment measure, not only the death of a living organism. It may be defined as: death of a breast
cancer patient after surgery, relapse of a leukemia patient after chemotherapy, renal failure in a kidney
transplant patient, resumption of smoking by an adolescent who received health education to quit, surrender
of a health insurance policy partway through, and so on. Which one is defined is decided at the design
stage by the research objective.

**Survival time**: the time from the starting point of observation to the occurrence of the death event,
recorded in days, weeks, months, or years, and written $t$. It is likewise meant broadly, referring to the
duration of whatever phenomenon the researcher cares about — time to relapse, time to renal failure, time
to resuming smoking, time to surrendering the policy.

One detail that is easy to overlook but crucial: **the finer the time unit, the better**. The whole of
survival analysis rests on “sorting the survival times”, and even a small rounding error may change the
order of two records and hence change the result of the analysis. In practice, of course, this is often
impossible — if you know only that a patient died during November but not on which day, you have to use
“months” as the unit, or roughly substitute a mid-value such as November 15.

### Censored data: the core of this chapter

**Censoring** (also called truncation): the observation of survival time ends not because of the death
event but for some other reason. The time from the starting point of observation to the censoring point is
called **censored data** (a truncated value, or final-check value), and by convention a “+” is added after
the time, so that `9+` means this patient lived **at least** 9 months.

Censoring has three main causes:

1. **Loss to follow-up (withdrawal)**: contact is lost. No reply to a mailed questionnaire, nobody found on
   a home visit, a move without leaving a new address, active refusal to go on cooperating with follow-up.
2. **Dropout**: death from a factor outside the study or outside the treatment, such as death in a traffic
   accident or from another disease, so that the subject leaves the study.
3. **Termination**: the study time limit set at the design stage is reached while the subject is still
   alive.

> Pay special attention to the second one: **“died in a traffic accident” counts as censoring, not as a
> death event**. When evaluating a surgical treatment, a person who dies in a traffic accident cannot be
> counted as a “surgical failure”. But the time he lived up to the day of the accident really existed, and
> cannot be written off either.
>
> Back to the lung cancer example above: `6` means this patient died of the disease in month 6 (complete
> data), while `9+` means he lived at least to month 9, after which the information breaks off — he may
> still be alive, or he may have died of the disease in month 10, or died of something else in month 10;
> we simply do not know.

#### Why censored data cannot be dropped as missing values

This is the one point in the chapter that most needs to be thought through clearly. First separate two
things:

| | Missing value | Censored value |
| --- | --- | --- |
| What it is | the value should have been there but was not measured, not recorded, or lost | the value is not a point but a **lower bound** |
| Example | a patient's blood glucose was not measured | a patient was lost to follow-up after 3 years |
| Information content | **0**: what the value was, we have no idea | **not 0**: we know for certain he lived past 3 years |
| Mathematical form | one unknown number | $T \ge 3$ (survival time no shorter than 3) |

So the correct reading of censored data is “**at least**”. It is not “we do not know”, but “**we know he
lived at least this long**” — a certain fact, not a guess. Its information content is not zero; rather, “a
stretch at the left end of the time axis has been nailed down”.

What happens, then, if the censored records are simply deleted?

- **Who gets censored?** Mostly people who **live longer**: those still alive when the study closes, and
  those lost to contact during follow-up. These are exactly the evidence of a good treatment effect.
- **What have you thrown away when you delete them?** The evidence of “lived a full 3 years” and “lived a
  full 5 years”, straight into the bin. The denominator that is left is made up entirely of people who have
  already died, so of course the survival rate comes out too low.
- **How big is the bias?** Its direction is certain: **a systematic underestimate of the survival rate and
  of the median survival time, and an overestimate of the risk of death** — and it leans toward “making the
  treatment look worse than it is”.
- **Can sample size fix it?** No. This is not random error but systematic bias, and a larger sample only
  estimates the biased conclusion more precisely.

One more layer: **the point in time at which censoring happens is itself information**. Being lost to
follow-up at 3 years and at 5 years contribute completely different amounts of information — the first
guarantees only that the patient lived past 3 years, the second that he lived past 5 years. If everything
is treated as “missing”, that difference is lost along with it.

How, then, does the method actually use these “half-information” records? The key is the concept of the
**risk set**:

> As long as a subject has neither had the death event nor been censored, he stays in the risk set of his
> own group. Whenever a death time point arrives, everyone in the risk set at that moment **is counted in
> the denominator**; those who die are counted in the numerator ($d_k$), while those who are censored are
> not. Once a person is censored, he leaves the risk set from that moment on and takes no part in the later
> calculations.

The censored subject therefore contributes everything he can: for the death time points he lived through,
he has his share in the denominator — precisely because he was still alive, the death probability at those
time points was not overestimated (a larger denominator means a smaller death probability). Once he fades
out, he does not affect the later calculations either. **No information is wasted and none is invented**.
That is the complete answer to “censoring cannot be dropped”: the method itself can already use it
correctly, and you need neither to delete it nor to impute it.

#### An intuitive example: the four kinds of record in a 5-year follow-up

A study follows up 100 enrolled patients for 5 years, with the death event defined as “death from this
disease”. Five years later, the 100 records in your hands fall roughly into four kinds:

| Record | Situation | Data | How to read it |
| --- | --- | --- | --- |
| A | died of the disease in year 2 | `2` | complete data: the exact survival time is 2 years |
| B | moved away and lost contact in year 3 | `3+` | censored: lived **at least** 3 years (a loss to follow-up) |
| C | died in a traffic accident in year 4 | `4+` | censored: not a death from this disease, but lived at least to 4 years (a dropout) |
| D | still alive when the study closed in year 5 | `5+` | censored: lived at least to 5 years (a termination) |

Now put them into the risk set:

- When computing the death probability for **year 2**, all four of A, B, C, and D **are in the
  denominator** — all four really did live past year 2, and that is a hard fact.
- When computing the death probability for **year 4**, A has already died in year 2 and B was lost to
  follow-up in year 3, so both have left the risk set; C and D are still in the denominator.
- When computing the death probability for **year 5**, C dropped out in year 4, and only D is left in the
  denominator. And by year 5 he has no more information to contribute either.

Compare this with “delete everyone censored”: once B, C, and D are gone, the three people who lived
longest have all vanished. They were the best evidence of a good treatment effect among these 100 people,
and after deleting them the cohort contains only people who have already died, so the survival rate is
bound to come out too low. That is why censoring must not be dropped as if it were missing.

> But “cannot be dropped” does not mean “the more censoring the better”. When the proportion censored is
> too high (say more than half), the right-hand end of the survival curve becomes very unstable and the
> conclusions you can draw are very limited. So at the study design stage, **loss to follow-up** should be
> reduced as far as possible; this is a design problem, and it cannot be made up for at the analysis stage.

### Death probability, survival probability, and the survival rate

- **Death probability** $q$: the chance that people alive at the start of some interval die within that
  interval.

$$q = \frac{\text{number of deaths in the interval}}{\text{number observed at the start of the interval}}$$

If there is censoring within the interval, the denominator must be the **adjusted number at risk**:

$$\text{adjusted number at risk} = \text{number observed at the start} - \frac{1}{2}\,\text{number censored in the interval}$$

Why subtract half? Because a person censored within an interval was, on average, observed for only half
the interval, and counts as half a person in the denominator.

- **Survival probability** $p$: the chance of surviving some interval, exactly complementary to the death
  probability:

$$p = 1 - q$$

- **Survival rate** $S(t_k)$: the probability of **surviving past** time $t_k$. Note that it is a
  **cumulative** quantity:

$$S(t_k) = P(T \ge t_k) = p_1 p_2 \cdots p_k$$

**The survival probability and the survival rate differ by a single word and mean completely different
things**: the survival probability is about the chance of surviving “one interval”, while the survival rate
is the cumulative probability of “surviving several intervals in a row”. The 3-year survival rate = having
survived year 1, and year 2, and year 3 as well, the product of three survival probabilities. So strictly
speaking “cumulative survival probability” would be the more accurate name; by convention it is still
called the survival rate.

An important fork in the road: **if there is no censoring**, $S(t_k)$ can be computed directly from a
simple proportion:

$$S(t_k) = \frac{\text{number still alive at } t_k}{\text{total number observed}}$$

**As soon as there is censoring, this simple formula can no longer be used** — because the number alive at
the start of each interval naturally changes, and the denominator must be adjusted interval by interval.
That is why the product-limit method below has to “multiply in a chain”.

The survival rate too is meant broadly: define the death event differently and it takes a different name.
If the death event in chemotherapy for leukemia is defined as “relapse”, the survival rate is called the
**remission rate**; if mumps after vaccination is defined as the death event, the survival rate is called
the **vaccine efficacy**; if removal of an intrauterine device because of pregnancy with the device in
place is defined as the death event, the survival rate is called the **IUD retention rate**. The name
changes; the algorithm is exactly the same.

### The survival curve

**Survival curve**: with survival time $t$ on the horizontal axis and the survival rate $S(t)$ on the
vertical axis, the curve obtained by joining the survival rates at successive time points, used to describe
the survival process. The curve drawn by the KM method (ungrouped data) is a **step** curve, while the one
drawn by the life table method (grouped data) is a **broken-line** curve.

### Median survival time

**Median survival time**, also called the half-survival period: the survival time corresponding to a
survival rate of 0.5, written $T_{50}$, meaning that **half of the subjects can live at least this long**.

Note that it is an index describing the “average level of the survival period”, not the “average survival
time” — because of censoring, many studies simply cannot compute a true average survival time (you know
only that some people lived at least 5 years, not how long they actually lived), and so the median survival
time has become the most commonly used summary index.

There are two cases in computing it:

- The curve drops to 0.5 or below somewhere: **the first time point at which $S(t_k) \le 0.5$** is
  $T_{50}$. The survival curve is a step curve, so in practice you read off the death time point on which
  its crossing with the horizontal line $S = 0.5$ falls.
- The curve never drops to 0.5: then $T_{50}$ cannot be estimated (see point 9 of “How to read a survival
  curve” below).

> Some textbooks add an “interpolation” recipe as well: if two adjacent points $(t_1, S_1)$ and
> $(t_2, S_2)$ straddle 0.5 without either point being exactly 0.5, use **linear interpolation**
> $T_{50} = t_1 - \frac{(t_1 - t_2)(S_1 - 0.5)}{S_1 - S_2}$ (where $t_1 < t_2$ and
> $S_1 = S(t_1) > 0.5 > S(t_2) = S_2$) to make up a value. That is only the **geometric intersection** you
> get by treating the step curve as a straight line; it is **not** the median survival time under the
> standard definition, and it should not be reported — the `survfit()` function in R uses the standard
> definition too.

## The Kaplan–Meier method (product-limit estimate)

Ungrouped survival data — that is, data in which the **exact survival time** of every observational unit is
recorded (even if it ends with a + sign) — are commonly analyzed with the **product-limit estimate**. It
was proposed by Kaplan and Meier in 1958, and so it is also called the **Kaplan–Meier method, KM method**
for short. It is a nonparametric method.

### The basic idea

Put all the observed survival times (**including the censored times**) in a column from smallest to
largest, compute once at every **death time point** the conditional probability of “not having died by
here”, and then multiply all the way along. Because it is a product of several (conditional) survival
probabilities, it is called the “product-limit estimate”.

Four quantities are involved:

| Symbol | Meaning |
| --- | --- |
| $n_k$ | number at risk at the start: the people who were still alive and still in the risk set just before time point $t_k$ |
| $d_k$ | the number of deaths occurring at time point $t_k$ (**for a censored subject $d_k=0$**) |
| $q_k = d_k / n_k$ | the death probability at that time point |
| $p_k = 1 - q_k$ | the survival probability at that time point |

$$\hat S(t_k) = p_1 p_2 \cdots p_k = \prod_{j=1}^{k}\left(1 - \frac{d_j}{n_j}\right)$$

The standard error of the survival rate uses the **Greenwood formula**:

$$SE\left[\hat S(t_k)\right] = \hat S(t_k)\sqrt{\sum_{j=1}^{k}\frac{d_j}{n_j\,(n_j - d_j)}}$$

With $\hat S(t_k)$ and its standard error in hand, the normal approximation gives a $95\%$ confidence
interval for the population survival rate at a given time point:

$$\hat S(t_k) \pm 1.96\,SE\left[\hat S(t_k)\right]$$

### Working through it by hand: the KM table for 8 patients

8 patients receive the same treatment regimen, and the times reached in follow-up (months) are:
`2, 4, 5, 7+, 9, 12, 15+, 20`. Of these, `7+` and `15+` are censored records.

| $k$ | Survival time $t_k$ | Deaths $d_k$ | Number at start $n_k$ | Death probability $q_k$ | Survival probability $p_k$ | Survival rate $\hat S(t_k)$ | Standard error $SE$ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 2 | 1 | 8 | 1/8 | 7/8 | 0.875 | 0.117 |
| 2 | 4 | 1 | 7 | 1/7 | 6/7 | 0.750 | 0.153 |
| 3 | 5 | 1 | 6 | 1/6 | 5/6 | 0.625 | 0.171 |
| 4 | 7⁺ | 0 | 5 | 0/5 | 1 | 0.625 | 0.171 |
| 5 | 9 | 1 | 4 | 1/4 | 3/4 | 0.469 | 0.187 |
| 6 | 12 | 1 | 3 | 1/3 | 2/3 | 0.313 | 0.178 |
| 7 | 15⁺ | 0 | 2 | 0/2 | 1 | 0.313 | 0.178 |
| 8 | 20 | 1 | 1 | 1/1 | 0 | 0.000 | — |

There are several things to hold on to when reading this table:

- **Row 4 (`7+`) and row 7 (`15+`) are censored**. $d_k = 0$, so $q_k = 0$ and $p_k = 1$, and the survival
  rate is **carried over unchanged** (0.625, 0.313) without dropping; but from the next row on, these two
  people are no longer in $n_k$ — after row 4 the number at start falls from 5 to 4, and that is exactly
  the man censored at month 7 leaving the risk set.
- **A censored subject still contributes to the denominator**. The censored person in row 4 was in $n_k$
  for rows 1 to 3 ($t=2,4,5$), and it is precisely because he was there that the death probabilities at
  those three time points were not overestimated.
- **Column 7 is the result of the chain multiplication**. $\hat S(5) = \frac{7}{8}\times\frac{6}{7}\times\frac{5}{6} = 0.625$,
  that is, the cumulative probability of “surviving past 5 months”.
- **The standard error generally grows as $t$ gets larger** (0.117 → 0.187, with small ups and downs in
  between), which says that the estimate becomes less precise further out — and that is also why the
  right-hand end of a survival curve is not trustworthy.
- **The standard error in the last row is written “—”, not 0**. In row 8, $n_8 = d_8 = 1$, so the
  denominator $n_8(n_8 - d_8) = 0$ in the Greenwood formula $\dfrac{d_j}{n_j(n_j - d_j)}$, and the $SE$
  for this row simply cannot be computed from the formula (the result is undefined, not 0), so the cell is
  left blank.

Median survival time: $\hat S(5) = 0.625$ is still above 0.5 and $\hat S(9) = 0.469$ has already dropped
below 0.5, and the curve first falls to 0.5 or below at the death time point $t = 9$ — that is where the
curve crosses $S = 0.5$:

$$T_{50} = \min\{t_k : \hat S(t_k) \le 0.5\} = 9$$

That is, the median survival time is **9 months**, meaning that about half the patients can live past 9
months (what `survfit()` in R computes for this set of data is exactly 9 as well).

> If you apply the interpolation recipe from the note above between $(5, 0.625)$ and $(9, 0.469)$, you get
> $5 - \frac{(5-9)(0.625-0.5)}{0.625 - 0.46875} = 5 + 3.2 = 8.2$ — and that is only the geometric
> intersection of the broken line, not the median survival time under the standard definition.

> There is also a convention about ordering: **when the same time point has both a death and a censoring,
> put the censoring afterwards**. The meaning is that when the death at that time point occurs, these
> censored people still count as being in the risk set (because they definitely lived to that moment).

### Grouped data: the life table method

If follow-up is once a year or once a month, all you have is “how many people, how many deaths, and how
many censorings there were in a given year or month”, with no exact survival time for each person; or, if
the sample is fairly large (say $n \ge 50$), computing the KM method time point by time point is too
tedious — in both cases the data are first **grouped** by survival time and then analyzed with the **life
table method** (lifetable method).

Its skeleton is exactly the same as the KM method's, except that the quantities for each group are replaced
by summary numbers:

- Number observed at the start of the interval $L_k$: accumulated from the bottom up as
  $L_k = L_{k+1} + C_k + D_k$ ($C_k$ the number censored in the interval, $D_k$ the number of deaths in
  the interval).
- Adjusted number at risk $N_k = L_k - C_k/2$, equivalent in meaning to the actual person-months observed:
  a person censored during the month was on average observed for only half a month.
- Death probability $q_k = D_k / N_k$, survival probability $p_k = 1 - q_k$.
- The survival rate is still the chain multiplication $\hat S(t_k) = p_1p_2\cdots p_k$.

$$SE\left[\hat S(t_k)\right] = \hat S(t_k)\sqrt{\sum_{j=1}^{k}\frac{q_j}{p_j N_j}}$$

The life table method was proposed earlier than the product-limit estimate and can be seen as an
approximation to the KM method. When drawing the curve there is one difference between them: **the survival
curve of grouped data is joined with straight lines rather than drawn as steps**. Because the data are
grouped by time, how the survival rate changes between two time points within the same group is not clear,
and joining with straight lines is the only way to draw it without extra assumptions; at the same time the
survival rates of the groups are marked at the **upper limit of the class interval**.

### How to read a survival curve

Given a KM curve, read it by the following points:

1. **Fix the axes in mind**: the horizontal axis is survival time, the vertical axis is the survival rate
   (a cumulative probability, falling from 1 toward 0). The height of a point on the curve = the cumulative
   survival rate at that time point. To read the “3-year survival rate”, go to 3 years on the horizontal
   axis, go up to the curve, and read its vertical coordinate.
2. **The steps are not decoration**. The curve drops only at time points where **a death event occurs**, so
   it is a series of steps. **A horizontal plateau means that nobody died during that stretch of time** —
   note that this only says “nobody died in that stretch”, **not that the patients were cured**. The
   steeper the step (the bigger the single drop), the more deaths were crowded at that time point.
3. **The width of a step = the gap between two adjacent death time points**. A very wide step means a long
   time with no deaths, which is usually a good sign.
4. **The curve is drawn all the way to the last observation time point**, including the last censored
   record — that is how `plot(survfit())` in R draws it. Beyond that there are no more data. If the last
   observation is a censoring, the curve stops at that height above 0 — which does not mean “nobody will
   die later”, only “we did not observe it”.
5. **The curve dropping to 0 means the last subject observed died too**, and the curve meets the horizontal
   axis. This is seen only in small samples with adequate follow-up; usually the curve ends up in the air.
6. **Do not take the tail seriously**. Only one or two people may be left at the right end of the curve,
   and a single death can make it drop a long way, with a large standard error; confidence intervals
   computed as $\hat S \pm 1.96 SE$ may even come out absurd, with an upper limit above 1 or a lower limit
   below 0. So before drawing a conclusion about a “5-year or 10-year survival rate”, look at how many
   people are still left at that time point.
7. **To compare two groups, look at the position of the curves**: the group whose curve is higher overall
   (on top) is doing better. But this statement **holds only when the two curves do not cross**.
8. **When the curves cross, there is no single answer to “which is better”**. Group A being higher for a
   while and group B higher afterwards means the relative advantage of the two groups has reversed. Then
   not only can you not say “A is better than B”, you should also be on your guard: crossing often suggests
   **the presence of confounding factors**, and a single log-rank test is not the right way to settle it.
9. **On the graph, the median survival time is the horizontal coordinate corresponding to where the curve
   crosses the horizontal line $S = 0.5$**. If the curve never drops to 0.5 (more than half of the people
   never have the event), **the median survival time cannot be estimated** — this is not the program
   failing, but the data genuinely not supporting this index; in that case describe the data with the
   survival rate at some other time point instead (say the 1-year survival rate).
10. **Do not think of it as a “curve of the number alive” or a “cure curve”**. It is a probability curve,
    describing the proportion of the whole group that is “still alive” at any time point, and it has
    nothing to do with how many individuals there are.

## The log-rank test: comparing survival curves

To answer “is there a difference between the survival curves of the two treatments”, use the **log-rank
test**. What it compares is the **whole survival curve**, not the survival rate at one particular time
point.

### The basic idea

Suppose the treatments work equally well ($H_0$: the two populations' survival curves have the same
position); then at every death time point the deaths should be allocated **according to how many people
from each group were in the risk set at that time** — every death time point forms a little $2\times2$
table: from the numbers at the start of the two groups and the total number of deaths, you can work out
“how many deaths a group should theoretically have”, the **expected number of deaths** $e_k$.

Add up the **observed numbers of deaths** $a_k$ and the expected numbers of deaths over the time points and
compare them: if the difference is not large, there is no reason to doubt $H_0$; if it is large enough, the
two curves really do differ in position.

$$\chi^2_L = \frac{\left(\sum a_k - \sum e_k\right)^2}{\sum S_k^2}, \qquad v = \text{number of groups} - 1$$

Here the expected number of deaths at each time point and the variance of $a_k$ are:

$$e_k = n_k \times \frac{D_k}{N_k}, \qquad S_k^2 = \frac{D_k P_k n_k (N_k - n_k)}{N_k^2 (N_k - 1)}$$

- $n_k$: the number observed at the start at that time point in **one group** (by convention the group
  being compared)
- $N_k$: the number observed at the start at that time point for **the two groups together**
- $D_k$: the number of deaths at that time point for **the two groups together**
- $P_k = N_k - D_k$: the number alive at that time point for the two groups together

Having computed $\chi^2_L$, look it up in the table of $\chi^2$ critical values and draw a conclusion at
the significance level $\alpha$.

There is a good angle from which to understand this formula: **the log-rank test is essentially stacking
the $2\times2$ tables at each death time point together into one test** (a CMH test stratified by time). It
gives every death time point the same weight, and so reflects **the average difference over the whole
curve across the whole observation period**, without favoring the early part or the late part in
particular.

### Four points to note in applying it

1. **It also applies to grouped data and to comparisons of several groups**. With several groups the
   degrees of freedom are $v = \text{number of groups} - 1$; if the groups are themselves ordered (low,
   medium, and high dose, say), a trend test can be done as well, which is more specific than “is there a
   difference”.
2. **To compare the survival rates at one particular time point, switch to a different statistic**:

   $$z = \frac{\hat S_1(t_k) - \hat S_2(t_k)}{\sqrt{SE^2\left[\hat S_1(t_k)\right] + SE^2\left[\hat S_2(t_k)\right]}}$$

   Look this up in the table of $z$ critical values to get the $P$ value. **If you want to compare at
   several time points, the significance level must be Bonferroni-corrected**, $\alpha' = \alpha / k$ ($k$
   being the number of comparisons), otherwise the overall Type I error rate will clearly exceed $\alpha$.
3. **Do not judge which is better by the $P$ value alone**. Besides the height of the curves, you can also
   look at the **median survival time** and the **mortality ratio**:

   $$SMR = \frac{A}{T} = \frac{\text{observed number of deaths}}{\text{expected number of deaths}}$$

   The larger the median survival time and the smaller $SMR$ is, the better the treatment. $SMR$ is exactly
   the ratio $\sum a_k / \sum e_k$ above, and a value below 1 means that fewer deaths actually occurred
   than expected.

4. **It is a univariate method**, and besides meeting the basic requirements of survival data it requires
   that **the survival curves of the samples do not cross**. Crossing curves suggest that confounding
   factors may be present, and in that case a **stratified log-rank test** or the **Cox proportional
   hazards regression model** should be used instead.

> The last sentence matters: the log-rank test can only answer, one at a time, “is there a difference
> between the curves of the groups formed by one particular variable”, and it has no ability to control the
> influence of other factors at the same time. In real clinical studies the two groups often differ in age
> composition and in severity of disease, and a “treatment A is better” obtained from the log-rank test
> alone may well have been pulled off course by age or by severity.

## The Cox proportional hazards regression model

### Why it is still needed

The log-rank test can only do univariate analysis, looking at one grouping variable at a time, and it
cannot adjust for confounding. But how long a subject survives is often affected by **many factors** at
once: in studying the relationship between survival time and treatment in cancer patients, the patients'
survival time is not only related to the treatment but also affected by age, severity of disease,
psychology, environment, and so on.

None of the regression methods learned earlier apply:

- **Multiple linear regression will not do**: survival data mostly do not follow a normal distribution
  (they are usually right-skewed), and sometimes you do not even know what distribution they follow, so
  there is no way to state the assumptions of a linear model.
- **More fatally, there is censoring**: ordinary regression cannot make use of records as incomplete as
  “we only know he lived at least 3 years”.

The **Cox proportional hazards regression model**, or Cox regression for short, can analyze the influence
of several factors on survival time at the same time and **allows censoring to be present in the data**; it
is the most important multivariable analysis method in survival analysis.

### Starting from the hazard function

A key shift of viewpoint: do not regress the survival function $S(t)$ (it is confined between 0 and 1, its
shape is complicated, and it is hard to capture by regression) — regress the **hazard function** instead.

The **hazard function** $h(t)$: the **instantaneous** risk of death at time $t$ for an individual who has
survived to time $t$, describing how urgent the risk of death is as it changes over time. People with
different characteristics have different hazard functions. Split the hazard into two parts — a “shape” that
does not change with the covariates, multiplied by a factor determined by the covariates:

$$h(t, \mathbf{x}) = h_0(t)\exp\left(\beta_1 x_1 + \beta_2 x_2 + \cdots + \beta_p x_p\right)$$

- $h_0(t)$: the **baseline hazard function**, the hazard when all covariates are 0. **No assumption is made
  about its concrete form, and it does not have to be estimated** — this is the “nonparametric” part of the
  model.
- $\exp(\beta_1x_1 + \cdots + \beta_px_p)$: the factor determined by the covariates — this is the
  “parametric” part.
- Half nonparametric and half parametric, so the Cox model is also called a **semiparametric model**. It is
  precisely because no form has to be assumed for $h_0(t)$ that it applies far more widely than the various
  parametric models, and that is why it is so widely used.

Taking logarithms on both sides:

$$\ln\frac{h(t,\mathbf{x})}{h_0(t)} = \beta_1 x_1 + \beta_2 x_2 + \cdots + \beta_p x_p$$

What this says is: **the factor by which the hazard is multiplied relative to the baseline hazard is
determined by the covariates alone and is independent of the time $t$**. That is exactly where the phrase
“proportional hazards” comes from.

The parameters $\beta_1,\dots,\beta_p$ are estimated by the **partial likelihood** method — it uses only
the relative information of “who died among the people in the risk set at each death time point”, and so
gets around having to estimate $h_0(t)$. Hypothesis tests on the parameters use the Wald test, the
likelihood ratio test, or the score test, all testing $H_0:\beta_j = 0$.

### How to interpret the hazard ratio HR

This is the core of interpreting Cox regression results. It follows directly from the form of the model:

$$\ln HR_j = \beta_j, \qquad HR_j = \exp(\beta_j)$$

The meaning of $\beta_j$ is: **holding the other variables constant, for every one-unit increase in the
variable $x_j$, the natural logarithm of the hazard ratio changes by $\beta_j$**. Equivalently, for every
one-unit increase in $x_j$ the hazard function becomes $\exp(\beta_j)$ times what it was. The direction is
plain at a glance:

| $\beta_j$ | $HR_j = \exp(\beta_j)$ | Interpretation |
| --- | --- | --- |
| $> 0$ | $> 1$ | as $x_j$ increases the hazard rises → **risk factor** |
| $= 0$ | $= 1$ | the hazard does not change → **unrelated** to the outcome |
| $< 0$ | $< 1$ | as $x_j$ increases the hazard falls → **protective factor** |

Six things must be kept in mind when reading an HR:

1. **An HR is a “ratio of hazard rates”, not a “ratio of survival rates”**. It speaks about the relative
   size of the instantaneous risk of death at any moment, and under the proportional hazards assumption
   this ratio is a constant that does not change with time. $HR = 2$ means “the risk of death is twice that
   of the reference group”, and it **must not** be put as “the survival rate is half that of the reference
   group” — those are two completely different quantities.
2. **The direction must be stated clearly: which is being compared with which**. R takes **the first level
   of the factor** as the reference by default, and the HR it prints is “that level vs the reference
   level”. So before analyzing, set the reference level to the one you most want to compare clinically
   (“unexposed”, “placebo”, “male”), otherwise the number is right but the direction is easy to state
   backwards.
3. **Continuous variables**: the HR is the hazard ratio “per one-unit increase” (per year of age, per
   1 mmHg). To see the effect of “per 10 years of age”, divide the variable by 10, or raise the HR to the
   10th power ($HR^{10}$).
4. **A confidence interval for the HR that does not contain 1 is equivalent to that variable being
   statistically significant** ($\alpha = 0.05$). The narrower the interval, the more precise the estimate.
5. **The size of an HR is not “importance”, and HRs cannot be compared across variables**. Different
   variables have different units and different ranges of variation, so HRs cannot be lined up by size to
   rank “which factor is more important” — that is the question standardized regression coefficients
   answer.
6. **An HR reflects only relative risk, not absolute risk**. For a disease with a very low baseline risk,
   $HR = 3$ may not mean much clinically; conversely, when the baseline risk is high, $HR = 1.2$ may matter
   a great deal.

Two related concepts by the way: the **prognostic index (PI)**, obtained by adding up all the
$\beta_j x_j$, can be seen as a “score” for an individual's risk — the larger the PI, the higher the risk of
death — and it is often used to stratify patients; the **mortality ratio $SMR = A/T$** from the log-rank
section above, on the other hand, is often used to judge quickly which group is better within a univariate
framework.

### Testing the proportional hazards assumption

The Cox model has two preconditions, which must be checked before it is used:

1. **The proportional hazards assumption**: the effect of each factor does not change with time, that is,
   $h(t,\mathbf{x})/h_0(t)$ is a constant. In other words, the hazard ratio between any two groups stays
   the same throughout the follow-up period (the two survival curves do not cross and are roughly equally
   spaced). **When this assumption fails, the time-constant HR the Cox model produces has no meaning in
   itself, and the results cannot be interpreted as they stand** — but that does not mean Cox has to be
   abandoned; the remedies are at the end of this section.
2. **The log-linearity assumption**: the relationship between the covariates and the log hazard ratio is
   linear. Putting a continuous variable straight into the model assumes exactly this; if the relationship
   is nonlinear, the variable needs a transformation, grouping, or some other form.

There are three common ways to test the proportional hazards assumption, from rough to refined:

**(1) Look at the survival curves by group.** Draw Kaplan–Meier curves by that variable: if the two curves
**clearly cross**, or if the gap keeps widening or keeps narrowing, the hazard ratio is changing and the
assumption fails. This is the most intuitive way, but also the most subjective.

**(2) Look at the curve of $\ln\left[-\ln\hat S(t)\right]$ against $t$.** This is the most standard of the
graphical methods. Because the proportional hazards assumption is equivalent to
$S_1(t) = \left[S_2(t)\right]^{HR}$, taking logarithms twice on both sides gives

$$\ln\left[-\ln S_1(t)\right] - \ln\left[-\ln S_2(t)\right] = \ln(HR)$$

The right-hand side is a constant, so **if proportional hazards holds, the two $\ln[-\ln\hat S(t)]$ curves
of the groups formed by that variable should be roughly parallel or equally spaced**. If the curves diverge
from one another or intersect, the assumption fails. The graphical method is simple, intuitive, and very
common in practice; its drawback is its subjectivity.

**(3) The Schoenfeld residual test** (`cox.zph()` in R). A quantitative method: order the Schoenfeld
residuals at each death time point by survival time and test whether the residuals are correlated with
time. Correlation means the effect of that variable changes with time, violating the assumption. The output
gives a $\chi^2$ value and a $P$ value for each variable, plus an overall GLOBAL test.

**What if the assumption fails?** Cox does not have to be abandoned:

- **Stratification**: put the variable that violates the assumption into the stratification term, allowing
  each stratum to have its own baseline hazard $h_0(t)$, while still not estimating its form. For variables
  such as “hospital”, “study center”, or “stage” that you **only want to adjust away and whose effect size
  you do not care about**, stratification is the most natural treatment. The price is that you do not get
  an HR for that variable itself.
- **Add a time interaction term / time-dependent effect**: simply let the effect of this variable change
  with time, for instance by adding a term such as $\beta(t)x$, or by cutting the follow-up period into
  several stretches and estimating an HR in each — at which point you can report the more informative
  conclusion “the HR is … in the first half year and … afterwards”.
- **Switch to another model**: parametric models such as the accelerated failure time (AFT) model.

## Doing it in R

`survival` is a **recommended package** of R (it is installed along with R) and comes with the `lung` data
set — follow-up data on patients with advanced lung cancer, just right for demonstration. So the following
code can be run directly:

```r
library(survival)   # if it says the package is missing: install.packages("survival")

# 1) Look at the data structure first: time = follow-up days, status = outcome
str(lung)
# in lung, status is coded 1 = censored, 2 = dead

# 2) Turn the categorical variable into a factor, with the reference level first (here male)
lung$sex <- factor(lung$sex, levels = c(1, 2), labels = c("male", "female"))

# 3) KM method: estimate the survival curve separately for the two sexes
fit <- survfit(Surv(time, status) ~ sex, data = lung)
fit                                        # median survival time and 95% CI of each group
summary(fit, times = c(180, 365, 730))     # survival rates at chosen times: half a year, 1 year, 2 years
plot(fit, col = 1:2)          # KM curves
abline(h = 0.5, lty = 2)      # draw a dashed line at S = 0.5; where it crosses the curves is the median survival time

# 4) log-rank test: compare the two survival curves
survdiff(Surv(time, status) ~ sex, data = lung)

# 5) Cox proportional hazards regression: analyze several factors together
cox.ph <- coxph(Surv(time, status) ~ age + sex, data = lung)
summary(cox.ph)

# 6) Test the proportional hazards assumption
cox.zph(cox.ph)
```

### How to read the output

**`Surv(time, status)`** is the entry point for survival data, gluing “time” and “outcome” into a survival
object. The coding conventions for `status` are: `0/1` (1 = the event occurred, 0 = censored), or `1/2`
(2 = the event occurred); `TRUE/FALSE` (TRUE = the event) is accepted as well. **`lung` uses 1/2**, so
`survfit` recognizes it automatically — but when you prepare your own data with 1/2 coding, be sure you are
clear about this, or you will have censoring and death completely the wrong way round.

**The output of `summary(fit)` / `fit`** gives, for each stratum (here male and female):

| Field | Meaning |
| --- | --- |
| `records` | the number of subjects observed in that group |
| `events` | the number of **death events** in that group (not equal to the number of subjects, because some were censored) |
| `median` | the median survival time (in days) |
| `0.95LCL` / `0.95UCL` | the 95% confidence interval of the median survival time |

If `median` shows `NA`, the survival rate of that group never dropped to 0.5 and the median survival time
**cannot be estimated** — this is not a bug, it is the data themselves not supporting this index.

**`plot(fit, col = 1:2)`** draws the two step-shaped KM curves (by default the vertical axis is the
survival rate and the horizontal axis is time). The horizontal coordinate where the dashed line added by
`abline(h = 0.5, lty = 2)` crosses the curves is the median survival time — reading it off the graph is far
more intuitive than memorizing the formula. To draw something fancier (a number-at-risk table, automatic
$P$ values), look at `ggsurvplot()` in the `survminer` package, whose foundation is the ggplot2 grammar of
layers.

**The output of `survdiff()`** looks roughly like this (this is the layout; the numbers depend on your own
output):

```text
           N Observed Expected (O-E)^2/E (O-E)^2/V
sex=male  ..      ..       ..        ..        ..
sex=female ..     ..       ..        ..        ..
 Chisq= ..  on 1 degrees of freedom, p= ..
```

- Each row is one group: `N` is the number of subjects in that group, `Observed` is the **observed** number
  of deaths in that group (that is, $\sum a_k$), and `Expected` is the **expected** number of deaths in
  that group (that is, $\sum e_k$).
- The `Chisq` on the last line is $\chi^2_L$, with degrees of freedom = number of groups $-\,1$ (1 here,
  since there are two groups), and `p` is the $P$ value.
- Note that `Expected` is the **expected** number of deaths — not some predicted “number who ought to die”,
  but “if the two curves were the same, how many deaths this group ought to have contributed, sharing in
  proportion to the numbers in the risk set”.

**The heart of `summary(cox.ph)`** is the coefficient table:

| Column | Meaning |
| --- | --- |
| `coef` | $\beta_j$, the regression coefficient |
| **`exp(coef)`** | **$HR_j$, the hazard ratio — this is the column that matters most** |
| `se(coef)` | the standard error of the coefficient |
| `z` / `Pr(>\|z\|)` | the Wald test statistic and its $P$ value |
| `lower .95` / `upper .95` | **the 95% confidence interval of the HR** |

An example of reading it: if the `exp(coef)` on the `sexfemale` row is less than 1 and the 95% confidence
interval does not contain 1, you can say “after adjusting for age, the risk of death of female patients is
significantly lower than that of males, about $\exp(\text{coef})$ times that of males”. Note that **the
reference level is male** (it comes first in the factor), so the HR is in the direction “female relative to
male”.

There are two more fields in the output that are easy to overlook but crucial:

- `nevent`: the number of **death events** the model actually used. Cox regression draws its information
  from death events, not from the total number of subjects. **When there are too few death events the
  coefficient estimates are extremely unstable**; as a rule of thumb each independent variable needs at
  least 10~20 death events, otherwise the confidence intervals will be uselessly wide, or the model may not
  even converge.
- `Concordance`: the concordance, measuring the model's ability to rank predicted risks correctly; 0.5 is
  equivalent to guessing blindly, and the larger the better.

**The output of `cox.zph(cox.ph)`** is one row per independent variable plus a `GLOBAL` row, each with the
three columns `chisq`, `df`, and `p`. **A `p` below 0.05 suggests that the variable may violate the
proportional hazards assumption**, and you need to confirm it with graphical method (1) or (2) above, or
change that variable into a stratification term or add a time interaction term. The GLOBAL row is an
overall test of the whole model.

## Common pitfalls

- **Deleting censored data as if it were missing, or on the contrary treating it as a death event.** Both
  directions are wrong. Deleting them **systematically underestimates the survival rate** (those deleted
  are usually exactly the people who lived long, and they are the evidence of a good treatment effect);
  treating censoring as death **systematically overestimates the risk of death**. The correct meaning of
  censoring is “lived at least past this time point”; it is an informative lower bound, and you just hand
  it to `survfit()`/`coxph()` — you neither need to delete it nor to impute it.
- **Analyzing survival data with a $t$ test, analysis of variance, a rank-sum test, or a chi-square test.**
  The first three compare only “time” and not “outcome”, and they require an exact value for every subject,
  which a censored subject cannot supply; chi-square looks only at “outcome” and not “time”, and it also
  squeezes quantitative data into qualitative data, throwing the time information away for nothing. When
  you see a “+” after a follow-up time, survival analysis should come to mind. And remember along the way:
  **the survival probability ≠ the survival rate** — the first is the chance of surviving some one
  interval, the second is the cumulative probability of surviving past some moment (several intervals
  multiplied together); the 3-year survival rate is not “the survival probability of year 3”.
- **Misreading the survival curve.** Three common forms: ① drawing conclusions from the right-hand end of
  the curve alone — only one or two people may be left there, and a single death can send the curve down
  sharply, with confidence intervals that even come out above 1; ② taking a horizontal plateau for “the
  patients are cured”, when it only says that nobody died during that stretch; ③ seeing a `median` of `NA`
  in the output and assuming the program has gone wrong — that group's survival rate simply never dropped
  to 0.5, so the median survival time was never estimable, and in that case you should report the survival
  rate at another time point instead (such as the 1-year survival rate).
- **Drawing conclusions straight from the model without checking the preconditions.** Three specific
  forms: ① the two curves clearly cross and the log-rank test is still forced to say “group A is better” —
  crossing means the relative advantage has reversed and also suggests confounding, so a stratified
  log-rank test or Cox should be considered; ② reporting an HR without ever checking the proportional
  hazards assumption — when the assumption fails, that fixed HR is itself a meaningless “average” (if a
  drug helps in the first half year and harms in the second, the average comes out close to 1 and you draw
  the wrong conclusion “no effect”); ③ dropping a categorical variable into `coxph()` without turning it
  into a `factor()` — the 1/2 coding of a binary variable happens to be equivalent to a factor, but with
  three or more categories (stage 1/2/3, say) it is treated as numeric, which amounts to assuming forcibly
  that “each step up multiplies the risk by the same factor”, and the conclusion is meaningless. The
  reference level must also be chosen correctly, or the direction of the HR is easy to state backwards.
- **Staring only at the $P$ value, without looking at the effect size or the number of events.** The $P$
  value of a log-rank test shrinks as the sample grows, and with a large enough sample it is almost bound
  to be “statistically significant”; at that point you must also report the **size** of the difference — the
  HR and its 95% confidence interval, the difference in median survival times, the vertical distance
  between the curves. Conversely, `coxph()` uses the **number of death events**, not the total number of
  subjects: cram a pile of independent variables in with too few events and the coefficients become
  unstable, the confidence intervals very wide, or the model may not converge, and then even a very small
  $P$ value is not credible.

## How it connects to the other courses

::: tip Related pages
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)** —
  that week covers measures of central tendency and dispersion, correlation analysis, attribute column
  processing, equal-width and equal-frequency binning, min-max normalization, and Z-score standardization,
  and every one of them works on values that really exist. This chapter asks you **to separate censoring
  from missingness completely first**: a missing value is “something that ought to be known but is not”,
  its information content is 0, and so deleting or imputing it is defensible; a censored value is “we know
  for certain he lived at least past this time point”, its information content is not 0, and its direction
  is clear. For exactly that reason, the “delete or impute missing values” practice **must never** be
  applied to censored data — censored data should go to `survfit()`/`coxph()` exactly as it is. This is the
  most important dividing line between the two courses.
- **[Week 6 of *Medical Big Data Analysis and Decision Making*, Classification (2)](/en/Medical-Big-Data-Analysis/6-classification-2)** —
  that week covers the ROC curve and diagnostic evaluation, whose core is looking at “the decision result”
  and “the decision threshold” together. It deals with the same kind of trouble as survival analysis:
  **an outcome obtained by follow-up**. The difference is that ROC looks only at “did the outcome happen,
  and was it judged correctly”, treating every record as one equivalent decision, while survival analysis
  also asks “when did the outcome happen”, and can make use of records censored partway through follow-up.
  So however high the AUC is, it cannot answer “how long can they live” — that is the job of the median
  survival time and the HR.
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/en/intro-it/9-base-graphics)** —
  this page's `plot(fit, col = 1:2)` is that lecture's base graphics system: how to draw a step line
  (`type = "s"`) and how to set the axis titles are tools from that lecture.
- **[Lecture 10 of *Introduction to Information Technology*, Low-Level Plotting Functions](/en/intro-it/10-plot-functions)** —
  the tools for adding more to a finished plot are in that lecture: adding a reference line with `abline()`
  and labeling the groups with `legend()`. The survival curve itself is not complicated; what is hard is
  drawing its details clearly (the steps, the legend, the reference line, the axis units).
- **[Lecture 11 of *Introduction to Information Technology*, The ggplot2 Package](/en/intro-it/11-ggplot2)** —
  for prettier survival curves (the curve + number-at-risk table + $P$ value in one plot) you rely on
  `ggsurvplot()` from the `survminer` package, whose foundation is still that lecture's grammar of layers.
- **[Lecture 14 of *Introduction to Information Technology*, Tests of Homogeneity and Contingency Tables](/en/intro-it/14-goodness-of-fit-and-contingency)** —
  the log-rank test is, at bottom, stacking the **$2\times2$ table at every death time point** together to
  compare observed and expected numbers of deaths, which is the same line of thinking as that lecture's
  chi-square test of independence for contingency tables. Work through that lecture and the log-rank
  formula stops being mysterious.
- **[Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing](/en/intro-it/13-hypothesis-testing)** —
  both the log-rank test and the tests of Cox coefficients in this chapter are hypothesis tests: set up
  $H_0$ → compute the statistic → determine the $P$ value → draw a conclusion at $\alpha$. The formulas
  change a few times over, but this routine does not take a single step differently.
- **[Week 3 of *Medical Big Data Analysis and Decision Making*, Regression Analysis](/en/Medical-Big-Data-Analysis/3-regression)** —
  the idea of Cox regression “putting several factors into the model at once and adjusting for
  confounding” is in the same line as linear regression and logistic regression (there it is `lm()`/`glm()`,
  here it is `coxph()`), and the logic of interpreting regression coefficients carries over as well (in
  logistic regression $\exp(\beta)$ is the OR, here $\exp(\beta)$ is the HR). There are two differences:
  the response variable has become “outcome + time”, and one more **proportional hazards assumption** must
  be tested.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/14-survival-analysis) from:
- /Medical-Big-Data-Analysis/1-r-basics-and-data, where missing values are handled with na.omit() add "note: censored data
  is not a missing value, it is an informative lower bound; for its meaning and how to handle it see
  Chapter 14 of Health Statistics".
- /Medical-Big-Data-Analysis/6-classification-2, at the ROC curve and diagnostic evaluation part add "if the
  outcome is an 'event + time' obtained by follow-up and is analyzed with the survfit()/coxph() family, see
  Chapter 14 of Health Statistics".
- /intro-it/9-base-graphics, at plot() / abline() / legend() add "the survival curve is one of the most
  direct applications of these plotting tools, see Chapter 14 of Health Statistics".
- /intro-it/11-ggplot2, at the grammar of layers add "ggsurvplot() draws survival curves with exactly this
  grammar, see Chapter 14 of Health Statistics".
- /intro-it/14-goodness-of-fit-and-contingency, at contingency table tests and the CMH test add "the
  log-rank test can be seen as a contingency table test stratified by time, see Chapter 14 of Health
  Statistics".
- /Medical-Big-Data-Analysis/3-regression, at multivariable regression and exp(coef) add "Cox proportional
  hazards regression is the same idea extended to survival data, see Chapter 14 of Health Statistics".
-->

## Summary

1. **Survival data = outcome + time**. They are collected by follow-up, the outcome is a binary mutually
   exclusive event, they often contain censoring, and their distribution type is complex, so the $t$ test,
   analysis of variance, the $\chi^2$ test, and the rank-sum test are all unusable and survival analysis
   must be used.
2. **Censoring ≠ missingness**. Censoring is lower-bound information, “lived at least past this time
   point”, and it is still valuable. Throwing censored records away throws away the people who lived long
   as well, **systematically underestimating the survival rate**; treating censoring as death
   **systematically overestimates the risk of death**. The right thing to do is to let the censored subject
   stay in the **risk set** until the event occurs — the KM method and Cox regression both handle it this
   way automatically, and all you have to do is leave it alone.
3. **The KM method (product-limit estimate)** is used for ungrouped raw survival times: compute the
   conditional survival probability at each death time point and multiply them in a chain,
   $\hat S(t_k) = p_1p_2\cdots p_k$, giving a step-shaped survival curve; where the curve crosses
   $S = 0.5$ is the median survival time. When the sample is large or only grouped data are available,
   switch to the life table method.
4. **The log-rank test compares the whole survival curve**: at each death time point it compares observed
   and expected numbers of deaths, $\chi^2_L = (\sum a_k - \sum e_k)^2 / \sum S_k^2$, with
   $v =$ number of groups $-\,1$. It is a univariate method and cannot be used when the curves cross; a
   stratified log-rank test or Cox should be used instead.
5. **Cox proportional hazards regression does multivariable analysis**: $h(t) = h_0(t)\exp(\sum \beta_j x_j)$,
   and $HR_j = \exp(\beta_j)$ says how many times larger the hazard becomes for every one-unit increase in
   $x_j$ with the other variables held constant (above 1 it is a risk factor, below 1 a protective factor).
   Before using an HR you must check the **proportional hazards assumption** — the KM curves by group, the
   parallelism of the $\ln[-\ln\hat S(t)]$ curves, and `cox.zph()` are the three tools, and when it fails
   you switch to stratification or add a time interaction term.
