---
layout: doc
title: '10. Chi-Square Tests'
---

# Chapter 10. Chi-Square Tests

::: info Translation status
Translated from the [Chinese original](/Health-statistics/10-chi-square). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The earlier chapters compared means — height, blood pressure, blood glucose, all quantitative measures
> with a magnitude you can compute. This chapter changes the object of study: when a result can only be
> **sorted into categories and counted** (effective/ineffective, positive/negative, blood type A/B/O/AB),
> and what you want is to compare **rates** or **proportions**, or to judge **whether two categorical
> variables are associated**, the tool is the $\chi^2$ test. Its idea in one sentence: **look at how far
> the observed frequency $A$ is from the expected frequency $T$**.

## What this chapter is for

A great many outcomes in medical research are a binary "yes/no", or fall into a few categories, and no
mean can be computed for them:

- Two drugs each treat 100 patients, with effective rates of 80% and 70% — are those 10 percentage
  points a real difference, or just two batches of people who happened to be drawn differently?
- Three drugs have effective rates of 90%, 80%, and 30% — can we say "the three drugs all differ in
  efficacy"?
- The same person is examined first by method A and then by method B; the two positive rates are 80% and
  60% — do the two methods differ at all?
- Is the blood-group distribution related to some disease? Does the rate of abnormal expression of a
  gene rise with clinical stage?
- Does the height distribution of 10-year-old boys in a certain area follow a normal distribution?

The **data types** behind these questions differ (two groups from a completely randomized design,
several groups, self-paired, two variables cross-classified, a frequency distribution), but all of them
can be answered with the same statistic, because that statistic cares about only one thing: **how well
the observed cell frequencies agree with the frequencies that "no difference / no association" should
produce**. This chapter takes the method apart and explains it, and at the end gives the criterion for
**when you may compute it and when you must switch methods** — which matters more than the formula
itself.

<TrackList :tasks="['State what a chi-square test is comparing', 'Compute the expected frequency T and work out the degrees of freedom', 'Given a 2×2 table, decide whether to use the dedicated formula, the corrected formula, or Fisher', 'Know that after several rates are compared and H0 is rejected, pairwise comparisons are still needed', 'Recognize paired data and use McNemar’s test', 'State the three kinds of conditions for using a chi-square test']" />

## Core concepts

### The $\chi^2$ distribution and the basic idea of the $\chi^2$ test

The **$\chi^2$ distribution** is defined like this: if $\nu$ random variables $Z_1, Z_2, \dots, Z_\nu$ are
mutually independent and all follow the standard normal distribution $N(0,1)$, then

$$\chi^2 = Z_1^2 + Z_2^2 + \cdots + Z_\nu^2$$

follows a $\chi^2$ distribution with **$\nu$ degrees of freedom**. Its shape has a few features that get
used directly when working problems:

- the values are **always non-negative** (a sum of squares of course cannot be negative), so the graph
  of a $\chi^2$ distribution occupies only the right half;
- **right-skewed (positively skewed)**: the smaller $\nu$ is, the more skewed it is; as $\nu$ grows it
  gradually becomes symmetric, and as $\nu \to \infty$ it is approximately normal;
- one distribution is determined by $\nu$ alone — change $\nu$ and you have a different distribution;
- **additivity**: if $X \sim \chi^2_{\nu_1}$ and $Y \sim \chi^2_{\nu_2}$ are independent, then
  $X + Y \sim \chi^2_{\nu_1 + \nu_2}$. This property is used later when we decompose $\chi^2$ (the test
  for linear trend).

The critical value is written $\chi^2_{\alpha,\nu}$, meaning "the cut-off point at which the right-hand
tail has area $\alpha$". For $\nu = 1$ and $\alpha = 0.05$, $\chi^2_{0.05,1} = 3.84$ — the number that
appears most often in this chapter, and the one best memorized.

**Why can categorical data be tested with it?** For a given cell, if $T$ is treated as the expectation
of that cell's frequency and $A$ is the actual observation, then $(A - T)/\sqrt{T}$ is approximately a
standard normal variable (the variance of a count is roughly equal to its expectation). Squaring that
quantity for every cell and adding them up gives, by the definition above, exactly the $\chi^2$
statistic:

$$\chi^2 = \sum \frac{(A - T)^2}{T}$$

This is the **basic formula** of the $\chi^2$ test. Its meaning is very direct: **take how far each cell
departs from its expectation, weight it by the size of the expectation (the division), square
everything, and add it all up**. When $A$ and $T$ agree well, every term is small and $\chi^2$ is small;
when one cell is wildly off, the squaring magnifies it and pushes the statistic up.

The degrees of freedom are

$$\nu = (R-1)(C-1)$$

where $R$ is the number of rows and $C$ the number of columns. The expression can be understood like
this: there are $RC$ cells, each contributing one squared term, so to begin with the degrees of freedom
are $RC$; but the expected frequencies are computed from the **row totals and column totals** (equivalent
to estimating $R + C - 1$ marginal parameters), and every estimated parameter costs one degree of
freedom, so $RC - (R + C - 1) = (R-1)(C-1)$.

There is one point about the direction of the test that easily gets confusing: the alternative
hypothesis is written as "not equal" ($\pi_1 \ne \pi_2$), yet **the $\chi^2$ test is always one-sided**.
The reason is that the statistic has already been squared, so $A$ being much larger or much smaller than
$T$ both make $\chi^2$ larger, and departures on the two sides are automatically merged into the right
tail of the distribution. So when you look up a table you look up only the upper critical value, and you
never multiply $P$ by 2.

### The expected frequency $T$: how many people "should" be in each cell when $H_0$ holds

The observed frequency $A$ is counted; the expected frequency $T$ is **computed**, and there is only one
way to compute it:

$$T_{RC} = \frac{n_R \, n_C}{n}$$

where $n_R$ is the total of row $R$, $n_C$ the total of column $C$, and $n$ the total number of cases.
The reasoning behind it: **$H_0$ says the population rates of the groups are equal, so all of them
should equal the overall rate**, and the expected number of people in each cell is therefore "how many
people this group has" times "the overall rate".

Here is an example that can be worked by hand. A study compares two regimens; of 60 patients on regimen
A, 45 respond, and of 40 patients on regimen B, 20 respond:

| | Effective | Ineffective | Total |
| --- | --- | --- | --- |
| Regimen A | 45 ($A$) | 15 | 60 |
| Regimen B | 20 | 20 | 40 |
| Total | 65 | 35 | 100 |

The overall effective rate is $65/100 = 65\%$. If the two regimens had the same population effective
rate, both should be 65%, so among the 60 patients on regimen A there should in theory be
$60 \times 65\% = 39$ who respond, and among the 40 patients on regimen B there should be
$40 \times 65\% = 26$. Check that against the formula: $T_{11} = 60 \times 65 / 100 = 39$,
$T_{21} = 40 \times 65 / 100 = 26$ — in agreement. The four expected frequencies are 39, 21, 26, and 14.

Substituting into the basic formula:

$$\chi^2 = \frac{(45-39)^2}{39} + \frac{(15-21)^2}{21} + \frac{(20-26)^2}{26} + \frac{(20-14)^2}{14} = 6.593$$

$\nu = (2-1)(2-1) = 1$. Looking up the table of $\chi^2$ critical values, $6.593 > 3.84$, $P < 0.05$, so
at the $\alpha = 0.05$ level we reject $H_0$ and may consider that the two regimens have different
effective rates. As we will see below, the dedicated formula for a 2×2 table gives the same number.

::: warning The expected frequency is not the observed row or column proportion
$T$ is the expected number of people **under the assumption that** $H_0$ holds; it can only be computed,
never observed. The two terms "observed frequency" and "expected frequency" are the easiest pair in this
chapter to mix up: $A$ is what you counted, $T$ is what you derived from the overall rate. Which formula
to use (see the decision table below) is also decided by $T$, not by $A$.
:::

### The $\chi^2$ test for 2×2 contingency table data

The **2×2 contingency table** is the most commonly used case: the grouping variable has two levels and
the outcome variable has two levels, and the table contains only 4 basic numbers $a$, $b$, $c$, $d$ —
the row totals, column totals, total number of cases, and rates can all be derived from those 4 numbers.
The basic formula is general, but computing $T$ cell by cell and then squaring cell by cell is tedious,
so there is an equivalent **dedicated formula**:

$$\chi^2 = \frac{(ad - bc)^2 \, n}{(a+b)(c+d)(a+c)(b+d)}$$

It uses $n$ and the four marginal totals in the denominator, uses only the four basic numbers, and is
fast to compute, with a result **exactly the same** as the basic formula (in the example above
$ad - bc = 45 \times 20 - 15 \times 20 = 600$, and substituting gives
$\chi^2 = 600^2 \times 100 / (60 \times 40 \times 65 \times 35) = 6.593$ — it checks out). Before you
write any code, set up the framework with these **three steps**:

1. **State the hypotheses of the test and fix the significance level.** When comparing two sample rates,
   $H_0$ is written "the two population rates are equal" ($\pi_1 = \pi_2$) and $H_1$ is written "the two
   population rates are not equal"; $\alpha$ is usually taken as 0.05 (two-sided).
2. **Compute the test statistic.** First compute the expected frequencies $T_{RC} = n_R n_C / n$, then
   **choose the formula from $n$ and the smallest expected frequency** and compute $\chi^2$, writing down
   the degrees of freedom.
3. **Determine the $P$ value and draw the inference.** Look up the table of $\chi^2$ critical values, or
   let the software give $P$: if $P > \alpha$, do not reject $H_0$ (the difference is not statistically
   significant, and **all you may say is "there is not yet evidence that the two population rates
   differ"**); if $P \le \alpha$, reject $H_0$ and accept $H_1$ (the difference is statistically
   significant).

### Continuity correction: when it must be used

The $\chi^2$ distribution is **continuous**, and its table of critical values is also computed from the
theoretical formula for a continuous distribution; yet the raw data for comparing two rates are **counts
that were counted**, and are discrete by nature. Approximating discrete data with a continuous
distribution leaves an approximation error built into the formula.

With small samples the error shows up like this: **the computed $\chi^2$ is too large and the $P$ value
too small**, so that $H_0$ is rejected at a time when it should not have been — **the probability of a
Type I error (false positive) is artificially raised**. To "pull it back a little", subtract 0.5 from the
departure of every cell from its expectation; this is the **continuity correction** (Yates' correction):

$$\chi^2 = \sum \frac{(\lvert A - T \rvert - 0.5)^2}{T}$$

The dedicated formula for a 2×2 table has a corresponding corrected form:

$$\chi^2 = \frac{(\lvert ad - bc \rvert - n/2)^2 \, n}{(a+b)(c+d)(a+c)(b+d)}$$

The effect of subtracting 0.5 is not a minor patch: sometimes it **turns the conclusion right around**.

::: details Changing the formula: sometimes only the numbers change, sometimes the conclusion flips
In a study, 4 of 30 patients in group A respond and 1 of 20 patients in group B respond. $n = 50 \ge 40$,
and the four expected frequencies are 3, 27, 2, and 18 — two of them fall in $1 \le T < 5$, so the
dedicated formula **should not be applied directly**.

- Without correction: $\chi^2 = 0.926$, $P = 0.336$;
- With correction: $\chi^2 = 0.231$, $P = 0.630$.

In this example both conclusions are "do not reject $H_0$"; the difference shows up only in $\chi^2$.
But switch to the extreme situation below and the direction reverses: in a certain 2×2 table $n = 35$ and
the smallest expected frequency is only 0.17 ($T < 1$). Here the dedicated formula gives
$\chi^2 = 4.646$ and $P = 0.031$, which looks "statistically significant", while Fisher's exact test
gives $P = 0.166$. **Forcing a $\chi^2$ computation when Fisher's test is the right one gives the wrong
conclusion.**
:::

### The decision table: which method a 2×2 table actually uses

This is the table in this chapter most worth memorizing. There are only two things to go on: **the total
number of cases $n$**, and **the smallest expected frequency $T_{\min}$** ($T$ is not counted; it must be
computed under $H_0$ and then the minimum taken).

| Condition | What to use | Hand-computation formula | How to write it in R |
| --- | --- | --- | --- |
| $n \ge 40$, and all $T \ge 5$ | basic formula or dedicated formula, **no correction** | basic formula, dedicated formula | `chisq.test(tab, correct = FALSE)` |
| $n \ge 40$, and some $1 \le T < 5$ | **continuity correction** | corrected basic formula, corrected dedicated formula | `chisq.test(tab)` (corrected by default) |
| $n < 40$ (however good $T$ looks) | **Fisher's exact test** | probabilities computed directly from the hypergeometric distribution | `fisher.test(tab)` |
| any cell with $T < 1$ (however large $n$ is) | **Fisher's exact test** | as above | `fisher.test(tab)` |
| any 2×2 table | Fisher's test always applies; it is just heavy to compute when $n$ is large | — | `fisher.test(tab)` |

Three things to watch when reading the table:

- **The two conditions are related by "or"**: $n < 40$ is enough on its own to make you give up
  $\chi^2$, even if every $T$ is greater than 5; conversely, a single $T < 1$ means you cannot compute
  $\chi^2$ no matter how large $n$ is.
- **$1 \le T < 5$ means "a cell falls in that range"**, not that every cell must be small. As long as
  one cell falls between 1 and 5, the corrected formula is used for the whole table.
- **Do not look only at the average of the $T$ values.** What decides the formula is the minimum, and a
  single very small $T$ is enough to ruin the distributional approximation behind the whole $\chi^2$.

### Fisher's exact test

Fisher's exact probability test does not belong to the family of $\chi^2$ tests, but it is their most
important complement. Its idea is: **hold the marginal totals of the 2×2 table fixed** and let the cells
$a$, $b$, $c$, $d$ vary over all possible values, computing the probability of every combination; then
add up "the probability of the current sample" and "the probabilities of all combinations more extreme
than it", and that sum is the $P$ value directly. The probability of each combination follows the
**hypergeometric distribution**:

$$P = \frac{(a+b)!\,(c+d)!\,(a+c)!\,(b+d)!}{a!\,b!\,c!\,d!\,n!}$$

The number of combinations equals "the smallest marginal total $+ 1$": let one cell's number run from 0
upward in steps of 1 until it equals the smallest marginal total, and the remaining cells are then
uniquely determined by the marginal totals.

The algorithm differs between the two-sided and the one-sided test: writing the difference between the
two rates of the current sample as $p_1 - p_2$, the **two-sided** test includes the combinations more
extreme than the current sample on both sides (that is, the sum of the probabilities of all combinations
whose $\lvert p_1 - p_2 \rvert$ is at least the observed difference), while the **one-sided** test takes
only one side. So for the same 2×2 table, the one-sided $P$ is **never larger than** the two-sided $P$
($P_{\text{one-sided}} \le P_{\text{two-sided}}$) — and when you report a conclusion you must say clearly
which one you used. The two **may be equal**: when the current sample already sits at the extreme end of
the value space, there are no more extreme combinations on the other side, and what the two-sided test
adds is exactly the combinations on the one side — which is what happens with `tab4` in this chapter,
where the one-sided (less) and two-sided values are both 0.1663866.

On applicability there is a very generous conclusion: **any 2×2 table can be analyzed with Fisher's exact
test**, whatever $n$ and $T$ are; with small samples it is the only correct choice, and with large
samples it agrees with the $\chi^2$ conclusion, merely at a higher computational cost. In addition, when
the $P$ value from the $\chi^2$ test **sits right on the significance level** (say $P = 0.048$ or
$0.052$), it is also worth rechecking with Fisher so that the conclusion is not dragged off course by the
approximation error.

### The $\chi^2$ test for $R\times C$ contingency table data

When the grouping variable or the outcome variable has more than two levels (three drugs, four blood
groups, four clinical stages), the 2×2 table expands into an **$R\times C$ contingency table**. The
expected-frequency formula and the basic formula keep their form, with only more subscripts:

$$T_{ij} = \frac{n_{Ri} \, n_{Cj}}{n}, \qquad \chi^2 = \sum_{i=1}^{R}\sum_{j=1}^{C}\frac{(A_{ij}-T_{ij})^2}{T_{ij}}, \qquad \nu = (R-1)(C-1)$$

Computing $T$ cell by cell is too slow, so there is also a **dedicated formula** that uses only the
observed frequencies (equivalent to the basic formula):

$$\chi^2 = n\left(\sum \frac{A^2}{n_R \, n_C} - 1\right)$$

**How to write the hypotheses is the place where $R\times C$ tables are most easily marked wrong.** When
comparing three sample rates:

- $H_0$: the three population rates are equal, $\pi_1 = \pi_2 = \pi_3$;
- $H_1$: the three population rates are **not all the same**.

$H_1$ **cannot** be written as $\pi_1 \ne \pi_2 \ne \pi_3$. There are in fact four ways to be opposed to
$H_0$ — $\pi_1 \ne \pi_2 \ne \pi_3$, $\pi_1 \ne \pi_2 = \pi_3$, $\pi_1 = \pi_3 \ne \pi_2$, and
$\pi_1 = \pi_2 \ne \pi_3$ — and what they have in common is "at least two of the population rates are
unequal", whereas the notation $\pi_1 \ne \pi_2 \ne \pi_3$ covers only the first of them
mathematically, and even excludes the case "A differs from B, B differs from C, but A and C are the same",
which plainly belongs under $H_1$.

**The conclusion, too, may only be "not all the same".** Rejecting $H_0$ **does not mean** that every
pair of groups differs. In the three-regimen example above, with effective rates 84%, 76%, and 32%,
$\chi^2 = 34.03$, $\nu = 2$, $P < 0.001$, all you may conclude is "the effective rates of the three
regimens are not all the same"; as for which two groups actually differ, **pairwise comparisons** must be
carried out (next section). Simply ranking the three rates from largest to smallest and saying "A is
best, B next, C worst" is the most common mistake at this step.

**The conditions for an $R\times C$ table** are a little looser than for a 2×2 table, but there are still
hard lines:

- **no more than 1/5 of the cells** may have expected frequencies falling in $1 \le T < 5$;
- **no single cell may have $T < 1$**.

Once you cross either of those lines, there are three ways to handle it:

1. **Increase the sample size** — $T$ is proportional to $n$, so collecting more cases is the most
   fundamental remedy (which also shows that this should have been worked out at the design stage);
2. **Combine a row or column with an expected frequency that is too small with an adjacent row or column
   of similar nature** — after combining, $T$ becomes larger; but the combination must make sense
   professionally (combining "stage I" and "stage II" into one group is reasonable, combining "stage I"
   with "stage IV" is nonsense), and **the degrees of freedom must be recomputed after combining**;
3. **Delete** the rows or columns corresponding to the cells whose expected frequencies are too small.

The last two options both lose information and may also damage the randomness of the sample, so they
should be used with care — **the best strategy is to allow enough sample size at the design stage**.

### Pairwise comparisons of several sample rates

After an $R\times C$ $\chi^2$ test rejects $H_0$, if you want to know which two groups specifically
differ, pairwise comparisons are needed. The approach is **to split the $R \times C$ table into several
$2 \times C$ tables** (or further into several 2×2 tables) and run a separate $\chi^2$ test on each small
table.

But there is a trap here: comparing $k$ groups pairwise requires $\binom{k}{2}$ tests in total, and
**every test adds one more chance of committing a Type I error**; if $\alpha = 0.05$ is used for each of
them, then once all the comparisons are done the overall false-positive rate is far above 0.05 — groups
that genuinely do not differ will have one or two "statistically significant" differences compared out
of them. To keep the **overall** Type I error rate at $\alpha = 0.05$, the level of each individual test
has to be tightened:

$$\alpha' = \frac{2\alpha}{k(k-1)}$$

where $k$ is the number of groups being compared. This expression is in fact a Bonferroni correction:
pairwise comparison of $k$ groups involves $k(k-1)/2$ pairs, so
$\alpha' = \alpha \big/ \frac{k(k-1)}{2} = \frac{2\alpha}{k(k-1)}$. For three groups
$\alpha' = 0.05/3 = 0.0167$, that is, **every individual 2×2 $\chi^2$ test must be judged against 0.0167**,
and only $P < 0.0167$ counts as statistically significant.

Using the three-regimen example from above again (effective rates 84%, 76%, 32%), with
$\alpha' = 0.0167$:

| Comparison | $\chi^2$ | $P$ | Judgment |
| --- | --- | --- | --- |
| Drug A vs Drug B | 1.000 | 0.317 | not statistically significant |
| Drug A vs Drug C | 27.750 | $1.38 \times 10^{-7}$ | statistically significant |
| Drug B vs Drug C | 19.485 | $1.01 \times 10^{-5}$ | statistically significant |

So the conclusion is: the difference in efficacy between drug A and drug B is not statistically
significant, but both of them are better than drug C. Only here does "not all the same" settle into a
sentence that can be stated clearly.

<ClickAnswer>

**Think about it**: when three rates are compared and the overall $\chi^2$ test gives $P = 0.30$ (do not
reject $H_0$), can you still go on to pairwise comparisons in the hope of digging out a pair that is
"statistically significant"?

---

No. Failing to reject $H_0$ in the overall test means **there is not enough evidence to say that these
population rates are not all the same**, and going on to pairwise comparisons at that point is "looking
for a difference without a hypothesis", a classic abuse of multiple comparisons: the finer you split and
the more comparisons you make, the more likely you are to run into one comparison with $P < 0.05$. What
is more, a proper pairwise comparison should also be done only **after** the overall test has come out
statistically significant, and the adjustment of $\alpha'$ exists precisely to hold down these
"differences that were found".

Note that the conclusion of the pairwise comparisons and the conclusion of the overall test **are not
necessarily consistent**, because the overall test puts the information from all the groups together and
uses a single $\alpha$, whereas the pairwise comparisons split into several small tables, each with its
own stricter $\alpha'$. The two answer slightly different questions, so when writing a report you should
go by the aim of the study, not pick whichever of the two suits you better.

</ClickAnswer>

### The $\chi^2$ test for the paired 2×2 table (McNemar)

A **paired design** means that the same observational unit receives two treatments (or is measured by
two methods) at the same time. The data are then not two groups of people but **two results from the same
batch of people**, and once arranged into a 2×2 table every cell has a different origin:

| | Method B + | Method B − | Total |
| --- | --- | --- | --- |
| Method A + | $a$ (both positive) | $b$ (A positive, B negative) | $a+b$ |
| Method A − | $c$ (A negative, B positive) | $d$ (both negative) | $c+d$ |
| Total | $a+c$ | $b+d$ | $n$ |

The positive rate of method A is $\frac{a+b}{n}$ and the positive rate of method B is $\frac{a+c}{n}$.
For the two to be equal, all that is needed is $b = c$ — **$a$ and $d$ are the parts where the two methods
agree, and they appear in both rates at once and cancel out**. So to judge whether the two methods differ,
you look at whether those two "disagreeing" cells, $b$ and $c$, are equal:

- $H_0$: $B = C$ (the two methods have the same population positive rate)
- $H_1$: $B \ne C$

Note that the population values use capitals $B$ and $C$ while the sample values use lower case $b$ and
$c$. If $H_0$ holds, the expected frequencies corresponding to $b$ and $c$ are both $(b+c)/2$; putting
those two cells into the basic formula and simplifying gives the dedicated formula for the **paired
$\chi^2$ test** (McNemar's test):

$$\chi^2 = \frac{(b-c)^2}{b+c}, \qquad \nu = 1$$

When $b + c < 40$ a correction is needed:

$$\chi^2 = \frac{(\lvert b - c \rvert - 1)^2}{b+c}$$

Use the uncorrected expression when $b + c \ge 40$ and the corrected one when $b + c < 40$ — the criterion
here means **the same thing** as $n$ in the 2×2 table, except that the useful information in paired data
comes only from the $b+c$ individuals who disagree, so $b+c$ rather than $n$ is taken as the sample size.

::: danger Paired data cannot use an ordinary 2×2 chi-square test
With the same data and the same 2×2 table, **an ordinary $\chi^2$ test and McNemar's test answer two
different questions**:

- **McNemar's test**: whether the **positive rates of the two methods (two treatments) differ** — it uses
  only $b$ and $c$, that is, it tests "is there a systematic disagreement";
- **an ordinary 2×2 $\chi^2$ test**: whether **the two variables are associated** — it uses all four
  cells, that is, it tests "are the results of method A and method B independent of each other".

For the same set of paired data, the two algorithms can give $P$ values that differ by nearly a factor of
10 ($P = 0.0053$ against $P = 0.00055$), and with small samples and a conclusion that sits right on 0.05
it is perfectly possible for one to be significant and the other not. So the first thing to do with a new
set of data is **to see clearly what the design was**: two groups from a completely randomized design use
the 2×2 $\chi^2$ test; a paired design in which the same individual receives two treatments one after the
other or at the same time uses McNemar's test to compare the difference, and an ordinary 2×2 $\chi^2$ test
only to analyze association. Use the wrong one and the conclusion is untrustworthy.

One more point: when doing a correlation analysis on a paired table, **the data must be arranged in the
tabular form of a paired design**, not laid out as if they were independent groups; and if the test shows
that the two treatments really are correlated, the contingency coefficient should be computed as well to
describe how strong the association is.
:::

### Conditions for using a $\chi^2$ test

Gathering the restrictions scattered through the sections above into one list; run through it in order
when working problems:

**1. Look at the data type and the design; do not choose the wrong method.**

| Data type | Aim | Method to use |
| --- | --- | --- |
| completely randomized design, two groups, binary outcome | whether the two population rates differ | 2×2 $\chi^2$ test (choose the formula or Fisher from the decision table) |
| completely randomized design, several groups, binary outcome | whether several population rates differ | $R\times C$ $\chi^2$ test + pairwise comparisons |
| completely randomized design, several groups, multi-category outcome | whether several population proportions differ | $R\times C$ $\chi^2$ test |
| paired design (one individual, two treatments), binary | whether the two treatments differ | **paired $\chi^2$ test (McNemar)** |
| paired design, binary | whether the two treatments are associated | ordinary 2×2 $\chi^2$ test (dedicated formula) |
| one sample, one categorical variable | whether the frequency distribution follows some theoretical distribution | goodness-of-fit $\chi^2$ test |
| both variables ordinal, of different natures | whether there is a linear trend | $\chi^2$ test for linear trend |

**2. Look at whether the expected frequencies are adequate.**

- 2×2 table: usable directly only when $n \ge 40$ and all $T \ge 5$; correct when some $1 \le T < 5$;
  Fisher's test is mandatory when $n < 40$ or some $T < 1$.
- $R\times C$ table: no more than 1/5 of the cells may have $1 \le T < 5$, and **no cell may have
  $T < 1$**. If the conditions fail, increase the sample size, combine adjacent rows and columns (which
  must make professional sense, and the degrees of freedom are recomputed) or delete rows and columns.

**3. Look at whether the variable is "ordinal"; do not treat ordinal data as nominal.**

- If the analysis variable is **ordinal data** (cured, markedly effective, effective, ineffective) while
  the grouping variable is nominal, the table is a **singly ordered** $R \times C$ table. Here the
  $\chi^2$ test is a way of "wasting information": **swap the order of any two columns and the $\chi^2$
  value does not change at all**, because it only counts numbers and ignores order — yet the information
  about "degree" in the grades is precisely what hides in the order. Such data should be analyzed with a
  **rank-sum test** or a Ridit analysis.
- If **both variables are ordinal but of different natures** (say age group and degree of lens opacity),
  split according to the aim of the study: to analyze **whether they differ** → treat it as a singly
  ordered table and use a rank-sum test; to analyze **whether they are correlated** → rank correlation or
  product-moment correlation; to analyze **whether there is a linear trend** → the $\chi^2$ test for
  linear trend.

### Goodness of fit and linear trend (two further uses of $\chi^2$)

The $\chi^2$ test is not used only for "comparing rates"; it can also answer two other kinds of question.

**The goodness-of-fit $\chi^2$ test**: it judges whether the **frequency distribution of a sample follows
some given theoretical distribution** (normal, binomial, Poisson, and so on). The approach is to arrange
the data into a frequency table by intervals, compute the **expected frequency $T$** of each group from
the assumed theoretical distribution, and substitute into the basic formula and add up:

$$\chi^2 = \sum \frac{(A-T)^2}{T}, \qquad \nu = \text{number of groups} - \text{number of parameters used to compute } T$$

Note that the degrees of freedom are **not** the number of groups minus 1: the normal distribution has
two parameters, $\mu$ and $\sigma^2$, so if the sample mean and standard deviation are used to estimate
them, another 2 must be subtracted. In addition, the $\chi^2$ test requires that $T$ not be too small, so
groups at the two ends of the frequency table with $T < 5$ have to be combined, which reduces the number
of groups accordingly. A normality test applies only to the normal distribution, whereas the idea of the
goodness-of-fit test can be applied to any specified theoretical distribution.

**The $\chi^2$ test for linear trend**: when both variables are ordinal, it asks "is there a trend that
changes monotonically as the grade rises". The basic idea is to **decompose** the total $\chi^2$ of the
$R\times C$ table into two components:

$$\chi^2_{\text{total}} = \chi^2_{\text{regression}} + \chi^2_{\text{deviation}}, \qquad \nu_{\text{total}} = \nu_{\text{regression}} + \nu_{\text{deviation}}$$

In practice one first assigns values to the two ordinal variables from smallest to largest
(1, 2, 3, …), computes the linear regression coefficient $b$ and its variance $S_b^2$, and then

$$\chi^2_{\text{regression}} = \frac{b^2}{S_b^2}, \qquad \nu_{\text{regression}} = 1$$

The component that deviates from the linear regression is obtained by subtraction:
$\chi^2_{\text{deviation}} = \chi^2_{\text{total}} - \chi^2_{\text{regression}}$,
$\nu_{\text{deviation}} = \nu_{\text{total}} - 1$. When reading the result:

- **the linear regression component is statistically significant and the deviation component is not** →
  the two variables are not merely correlated but related by a **simple straight line**;
- **both components are statistically significant** → the two variables really are correlated, but the
  relationship **is not a simple straight line** (it may curve, or it may change unevenly).

This is also a direct use of the additivity of $\chi^2$: adding two independent $\chi^2$ variables adds
their degrees of freedom as well.

## Doing it in R

There are only three workhorse functions for every test in this chapter: `chisq.test()`, `fisher.test()`,
and `mcnemar.test()`. They all take a **matrix or table**, so the first step is always to arrange the
frequencies into a contingency table. Everything below uses data sets that come **with** R, and can be
copied and pasted straight in.

### 1. A 2×2 table: check the expected frequencies first, then decide

`UCBAdmissions` is an admission data set that comes with R (rows = admission outcome, columns = sex, third
dimension = department); taking one department gives a standard 2×2 table:

```r
# Take department A: rows = admission outcome, columns = sex
tab <- UCBAdmissions[, , "A"]
tab
#>           Gender
#> Admit      Male Female
#>   Admitted  512     89
#>   Rejected  313     19

# Step 1: compute the expected frequencies (the numbers expected if H0 holds)
# and decide which formula to use
round(chisq.test(tab)$expected, 2)
#>           Gender
#> Admit        Male Female
#>   Admitted 531.43  69.57
#>   Rejected 293.57  38.43

sum(tab)                    # n = 933, ≥ 40
min(chisq.test(tab)$expected)  # 38.43, all T ≥ 5
```

$n = 933 \ge 40$ and $T_{\min} = 38.43 \ge 5$, so by the decision table **no correction** should be used,
and the dedicated formula applies (equivalent to `correct = FALSE`):

```r
chisq.test(tab, correct = FALSE)   # dedicated formula: no correction
#> X-squared = 17.248, df = 1, p-value = 3.28e-05

chisq.test(tab)                    # the default is Yates' correction — not to be used here
#> X-squared = 16.372, df = 1, p-value = 5.205e-05

fisher.test(tab)                   # Fisher's works at any time
#> p-value = 1.669e-05
```

How to read the output:

- `X-squared` is the $\chi^2$ value, `df` the degrees of freedom, and `p-value` the $P$ value.
  $P < 0.05$, so $H_0$ is rejected and the admission rates of men and women in this department may be
  considered different — comparing `$expected` with `$observed` shows that for women the number admitted
  is larger than expected (**the admission rate for women is actually higher**, 82.4% against 62.1%).
  This is a textbook example of **the direction of the association having to be looked at outside the
  test**.
- **`chisq.test()` defaults to `correct = TRUE` for a 2×2 table**, that is, it applies Yates' correction
  unconditionally. But by the criteria of this chapter, when $n \ge 40$ and all $T \ge 5$ **no correction**
  should be applied — so with a 2×2 table the habit is to compute `$expected` first, judge, and then
  decide whether to write `correct = FALSE` explicitly. The $P$ values of the three methods are about
  $3.28 \times 10^{-5}$, $5.21 \times 10^{-5}$, and $1.67 \times 10^{-5}$, all of the same order, and in
  this example the conclusion is unaffected; but when the $P$ value sits right on 0.05, this choice is
  enough to change the conclusion.
- The `correct` argument is only meaningful for a 2×2 table; an $R\times C$ table ignores it
  automatically.

### 2. Turning the decision table into a function

Instead of computing by hand every time, write the criteria into a small function, feed it a 2×2 table,
and let it tell you which one to use:

```r
decide <- function(tab) {
  e <- suppressWarnings(chisq.test(tab)$expected)  # a warning here is normal
  n <- sum(tab)
  tmin <- min(e)
  if (n < 40 || tmin < 1) {
    paste0("Fisher's exact test  (n = ", n, ", Tmin = ", round(tmin, 2), ")")
  } else if (tmin < 5) {
    paste0("Continuity correction  (n = ", n, ", Tmin = ", round(tmin, 2), ")")
  } else {
    paste0("No correction  (n = ", n, ", Tmin = ", round(tmin, 2), ")")
  }
}

decide(matrix(c(45, 15, 20, 20), 2, byrow = TRUE))  # No correction  (n = 100, Tmin = 14)
decide(matrix(c(4, 26, 1, 19), 2, byrow = TRUE))    # Continuity correction  (n = 50, Tmin = 2)
decide(matrix(c(13, 2, 7, 8), 2, byrow = TRUE))     # Fisher's exact test  (n = 30, Tmin = 5)
decide(matrix(c(9, 1, 4, 6), 2, byrow = TRUE))      # Fisher's exact test  (n = 20, Tmin = 3.5)
decide(matrix(c(1, 31, 1, 2), 2, byrow = TRUE))     # Fisher's exact test  (n = 35, Tmin = 0.17)
decide(UCBAdmissions[, , "A"])                      # No correction  (n = 933, Tmin = 38.43)
```

The second line deserves special attention: **$n = 50 \ge 40$, but $T_{\min} = 2$ falls in $1 \le T < 5$**,
so a correction is needed. The third line is the other situation: **$T_{\min} = 5$ is large enough, but
$n = 30 < 40$**, so Fisher's test is needed just the same. These two forks happen to illustrate the whole
"or" relation of the decision table.

### 3. Correction and Fisher: change the formula and the conclusion can change too

```r
# Case 1: n ≥ 40, but some 1 ≤ T < 5 → correction
tab2 <- matrix(c(4, 26, 1, 19), nrow = 2, byrow = TRUE,
               dimnames = list(c("Group A", "Group B"), c("Effective", "Ineffective")))
addmargins(tab2)
#>         Effective Ineffective Sum
#> Group A         4          26  30
#> Group B         1          19  20
#> Sum             5          45  50

round(chisq.test(tab2)$expected, 2)   # 3, 27 / 2, 18 — two cells with 1 ≤ T < 5
chisq.test(tab2, correct = FALSE)     # 0.9259, p = 0.3359
chisq.test(tab2)                      # 0.2315, p = 0.6304  ← after correction

# Case 2: n < 40 → Fisher (even if every T is large enough)
tab3 <- matrix(c(13, 2, 7, 8), nrow = 2, byrow = TRUE)
round(chisq.test(tab3)$expected, 2)   # 10, 5 / 10, 5 — all ≥ 5, but n = 30
chisq.test(tab3, correct = FALSE)     # X-squared = 5.4, p-value = 0.02014
chisq.test(tab3)                      # X-squared = 3.75, p-value = 0.05281
fisher.test(tab3)                     # p = 0.0502  ← this is the one to report

# Case 3: some cell has T < 1 → Fisher's test is mandatory
tab4 <- matrix(c(1, 31, 1, 2), nrow = 2, byrow = TRUE)
round(chisq.test(tab4)$expected, 2)   # 1.83, 30.17 / 0.17, 2.83 — one cell at 0.17
chisq.test(tab4, correct = FALSE)     # 4.646, p = 0.0311  ← completely untrustworthy
fisher.test(tab4)                     # p = 0.1664  ← the only correct answer
```

Case 2 is the most instructive one: the uncorrected $\chi^2$ gives $P = 0.020$ (statistically
significant), the corrected one gives $P = 0.053$ (not statistically significant), and Fisher's gives
$P = 0.0502$. **The same table, the same batch of data, and changing the formula can flip the conclusion
from one side to the other** — that is the reason the decision table exists.

Two more points to note:

- When the expected frequencies are too small, `chisq.test()` prints the warning
  `Chi-squared approximation may be incorrect`. **This warning is not an error, it is a reminder** — it
  is telling you "the step you just took may not have been a legitimate use of $\chi^2$". When you see it,
  go back to the decision table.
- In case 3, $\chi^2 = 4.646$ and $P = 0.031$ look very pretty, but they are **wrong**: one cell has an
  expected frequency of only 0.17, and the continuous approximation has broken down completely.

### 4. $R\times C$ contingency tables

`HairEyeColor` is R's built-in data on the hair color, eye color, and sex of 592 people. First make a 4×4
hair color × eye color table and ask "are hair color and eye color associated":

```r
tab5 <- margin.table(HairEyeColor, c(1, 2))   # 4×4: rows = hair color, columns = eye color
tab5
#>        Eye
#> Hair    Brown Blue Hazel Green
#>   Black    68   20    15     5
#>   Brown   119   84    54    29
#>   Red      26   17    14    14
#>   Blond     7   94    10    16

sum(tab5)                                  # n = 592
min(chisq.test(tab5)$expected)             # 7.68 — the smallest expected frequency is large enough
sum(chisq.test(tab5)$expected < 5)         # 0 — no cell with T < 5

chisq.test(tab5)
#> X-squared = 138.29, df = 9, p-value < 2.2e-16
```

`df = 9` is exactly $(4-1)(4-1) = 9$. $P < 0.001$, so $H_0$ is rejected and hair color and eye color may
be considered not independent. Not one of the 16 cells of `tab5` has $T < 5$, $T_{\min} = 7.68$, the
conditions are satisfied, and it can be used without worry.

**Switch to the stratified data and the same data set immediately runs into trouble:**

```r
chisq.test(HairEyeColor[, , "Male"])
#> Warning: Chi-squared approximation may be incorrect
#> X-squared = 41.28, df = 9, p-value = 4.447e-06

min(chisq.test(HairEyeColor[, , "Male"])$expected)   # 4.02 — 1 cell with T < 5
```

The male table has $n = 279$ and $T_{\min} = 4.02$, and exactly 1 of the 16 cells falls below 5 (a
proportion of $1/16 < 1/5$, which barely passes), so R only warns and does not error, and the result can
still be referred to; if the cells with small expected frequencies exceeded $1/5$, the categories should
be combined or Fisher's test used instead. **What `margin.table()` does is take marginal sums along the
dimensions you name** — `margin.table(HairEyeColor, c(1, 2))` collapses the sex dimension and gives the
4×4 table for men and women combined; this is exactly how "combining adjacent rows and columns" is written
in R.

### 5. Pairwise comparisons of several rates

`chisq.test()` handles only the overall test; for pairwise comparisons you have to split the table
yourself in a loop. The key is **to change the significance level along with it**:

```r
tab6 <- matrix(c(42,  8,
                 38, 12,
                 16, 34), nrow = 3, byrow = TRUE,
               dimnames = list(c("Drug A", "Drug B", "Drug C"),
                               c("Effective", "Ineffective")))
addmargins(tab6)
#>        Effective Ineffective Sum
#> Drug A        42           8  50
#> Drug B        38          12  50
#> Drug C        16          34  50
#> Sum           96          54 150

chisq.test(tab6, correct = FALSE)     # overall test: 34.028, df = 2, p = 4.083e-08

k <- nrow(tab6)
alpha <- 0.05 / choose(k, 2)          # α' = 0.05/3 = 0.0167
alpha

for (i in 1:(k - 1)) {
  for (j in (i + 1):k) {
    sub <- tab6[c(i, j), ]            # split off a 2×2 table
    p <- chisq.test(sub, correct = FALSE)$p.value
    cat(rownames(tab6)[i], "vs", rownames(tab6)[j],
        " chi2 =", round(chisq.test(sub, correct = FALSE)$statistic, 3),
        " p =", format.pval(p, digits = 3),
        ifelse(p < alpha, "  statistically significant", "  not statistically significant"), "\n")
  }
}
#> Drug A vs Drug B  chi2 = 1  p = 0.317   not statistically significant
#> Drug A vs Drug C  chi2 = 27.75  p = 1.38e-07   statistically significant
#> Drug B vs Drug C  chi2 = 19.485  p = 1.01e-05   statistically significant
```

`choose(k, 2)` is $\binom{k}{2} = k(k-1)/2$, exactly equivalent to the formula
$\alpha' = \frac{2\alpha}{k(k-1)}$. The conclusion: the difference between drug A and drug B is not
statistically significant, and both are better than drug C. **Note that here the overall test comes first
and the pairwise comparisons after**; the order cannot be reversed.

### 6. The paired 2×2 table: McNemar's test

```r
# The same batch of samples tested by method A and by method B;
# only the "methods disagree" cells enter the test
paired <- matrix(c(45, 25,
                    8, 22), nrow = 2, byrow = TRUE,
                 dimnames = list("Method A" = c("Positive", "Negative"),
                                 "Method B" = c("Positive", "Negative")))
paired
#>           Method B
#> Method A   Positive Negative
#>   Positive       45       25
#>   Negative        8       22

b <- paired[1, 2]      # A positive, B negative
c_ <- paired[2, 1]     # A negative, B positive (do not use c as a variable name: it shadows c())
b + c_                 # 33 — below 40, so the correction is needed

mcnemar.test(paired)                   # corrected by default: what this example needs
#> McNemar's chi-squared = 7.7576, df = 1, p-value = 0.005349

mcnemar.test(paired, correct = FALSE)  # no correction
#> McNemar's chi-squared = 8.7576, df = 1, p-value = 0.003083

# If b + c ≥ 40 (swap in the table below, where b + c = 44),
# the criterion says there should be no correction
paired2 <- matrix(c(60, 14, 30, 16), nrow = 2, byrow = TRUE)
paired2[1, 2] + paired2[2, 1]           # 44 — ≥ 40
mcnemar.test(paired2, correct = FALSE)  # no correction
#> McNemar's chi-squared = 5.8182, df = 1, p-value = 0.01586

mcnemar.test(paired2)                   # corrected by default: not to be used here
#> McNemar's chi-squared = 5.1136, df = 1, p-value = 0.02374

# For the same table, asking "are the results of the two methods associated"
# calls for an ordinary 2×2 chi-square test
chisq.test(paired, correct = FALSE)
#> X-squared = 11.931, df = 1, p-value = 0.0005522
```

How to read it:

- `mcnemar.test()` **defaults to `correct = TRUE`**, corresponding to the formula
  $\chi^2 = \frac{(\lvert b-c \rvert-1)^2}{b+c}$. Here $b + c = 33 < 40$, precisely the situation that
  calls for a correction, so the default is right.
- If $b + c \ge 40$ (swapping the table above for `matrix(c(60, 14, 30, 16), ...)` gives $b+c = 44$),
  the criterion says there should be **no correction**, and then you must write
  `mcnemar.test(paired2, correct = FALSE)` explicitly: without correction $\chi^2 = 5.818$,
  $P = 0.0159$; with the default correction $\chi^2 = 5.114$, $P = 0.0237$. Both reject $H_0$, but the
  number you report should be the one that matches the criterion.
- The three algorithms give three $P$ values: $0.0053$ (McNemar with correction), $0.0031$ (McNemar
  without correction), and $0.00055$ (the ordinary $\chi^2$ test of association). **They are not answering
  the same question** — the last one asks "are the results of methods A and B independent", and its
  smallest $P$ does not mean "the positive rates of the two methods differ most". The design decides the
  method, and the method decides how $P$ is to be interpreted.

### 7. Goodness of fit and trend

```r
# Goodness of fit: do the numbers of people in the Titanic's classes
# follow some given set of proportions?
obs <- margin.table(Titanic, 1)
obs
#> Class
#>  1st  2nd  3rd Crew
#>  325  285  706  885

chisq.test(obs)                              # H0: the four classes have equal numbers
#> X-squared = 467.81, df = 3, p-value < 2.2e-16

# H0: the class sizes are distributed as 15%, 13%, 32%, 40%
chisq.test(obs, p = c(0.15, 0.13, 0.32, 0.40))
#> X-squared = 0.11284, df = 3, p-value = 0.9903

# The expected frequencies are not printed along with chisq.test(); ask for $expected explicitly
chisq.test(obs, p = c(0.15, 0.13, 0.32, 0.40))$expected
#>    1st    2nd    3rd   Crew
#> 330.15 286.13 704.32 880.40
```

- Without `p =`, `chisq.test()` by default tests "the probability of every category is equal", and the
  degrees of freedom are $k - 1 = 3$.
- With `p =` it becomes a **goodness-of-fit test**: the observed proportions are 14.8%, 12.9%, 32.1%, and
  40.2%, and the difference from the given 15%, 13%, 32%, and 40% is not statistically significant
  ($P = 0.99$), so the data are compatible with this distributional assumption.
- If the theoretical distribution is a normal, Poisson, or other distribution with **unknown
  parameters**, the parameters have to be estimated from the sample first, and the number of estimated
  parameters must be subtracted from the degrees of freedom as well — `chisq.test()` will not work this
  out for you, so you have to write the `df` yourself.

```r
# Linear trend: treat class as an ordered grade (1st → 3rd) and ask
# whether the survival rate changes monotonically
tab7 <- margin.table(Titanic, c(1, 4))[c("1st", "2nd", "3rd"), ]
tab7
#>      Survived
#> Class  No Yes
#>   1st 122 203
#>   2nd 167 118
#>   3rd 528 178

chisq.test(tab7, correct = FALSE)                    # overall association
#> X-squared = 133.05, df = 2, p-value < 2.2e-16

prop.trend.test(tab7[, "Yes"], rowSums(tab7), score = 1:3)   # the trend component
#> X-squared = 132.51, df = 1, p-value < 2.2e-16
```

The survival rates of the three classes are 62.5%, 41.4%, and 25.2%, falling monotonically.
$\chi^2_{\text{total}} = 133.05$ ($\nu = 2$) decomposes into $\chi^2_{\text{regression}} = 132.51$
($\nu = 1$) and $\chi^2_{\text{deviation}} = 0.54$ ($\nu = 1$). The regression component accounts for the
overwhelming majority and the deviation component is below 1 ($P > 0.05$), which says that the relation
between survival rate and class is not merely "associated" but a **near-straight monotone trend**.

What `prop.trend.test()` does is the test for a linear trend among $k$ group rates (Cochran–Armitage); it
applies to the $k \times 2$ table "k ordered groups × binary outcome", and answers the same question as
the $\chi^2$ decomposition described in this chapter, with the same degrees of freedom, but the statistic
is computed differently (**do not expect it to agree with a hand-computed $\chi^2_{\text{regression}}$ to
the last decimal**). If both variables are multi-level ordinal variables and a test of linear association
is needed in the general $R \times C$ setting, you need the linear-by-linear association test from an
extension package such as `coin`.

## Common pitfalls

- **Using the default arguments of `chisq.test()` on any 2×2 table you are given.** R turns Yates'
  correction on by default for a 2×2 table, whereas by the criteria **no correction** should be applied
  when $n \ge 40$ and all $T \ge 5$. The correct posture is to look at $T_{\min}$ with
  `chisq.test(tab)$expected` first, and then decide between `correct = TRUE` and `FALSE`. Also, `correct`
  has no effect on an $R \times C$ table, so do not assume it works on every table.
- **Mixing up "$n < 40$ means Fisher" and "$T < 5$ means correction" as one rule.** These are two
  independent conditions, and satisfying either one calls for an upgrade: when $n = 30$ and every $T$ is
  greater than 5, Fisher's test is still needed (because the effective sample size is too small); and
  when $n = 933$ but one cell has $T = 0.5$, Fisher's test is still mandatory (because the approximation
  has broken down). When deciding on a formula, look at $n$ and $T_{\min}$ together — if either one fails,
  the condition fails.
- **Seeing R's `Chi-squared approximation may be incorrect` warning and treating it as nothing.** This is
  not an error; it is R reminding you that "the expected frequencies are too small and the $\chi^2$
  approximation is unreliable". Reporting a $P$ value while carrying this warning is wrong — go back to
  `$expected`, correct where a correction is due, and use Fisher where Fisher is due.
- **Using an ordinary 2×2 $\chi^2$ test to analyze paired data.** When the same individual receives two
  examinations one after the other, the data table looks exactly like a 2×2 table for independent groups,
  but every cell has a completely different origin. Here, comparing whether the two methods differ calls
  for McNemar's test (which looks only at $b$ and $c$), while an ordinary $\chi^2$ test answers "is there
  an association". The two algorithms can give $P$ values that differ by nearly a factor of 10. The first
  question to ask of a new data set: are these four cells **two batches of people** or **two results from
  the same batch of people**?
- **After rejecting $H_0$ in a comparison of several group rates, ranking them and drawing a conclusion
  straight away.** The $H_1$ of an $R \times C$ $\chi^2$ test is "the population rates are **not all the
  same**", and $P < 0.05$ only says "at least two of them are unequal" — it never means that every pair of
  groups differs. Either carry out pairwise comparisons (and change
  $\alpha' = \frac{2\alpha}{k(k-1)}$ along with them), or state honestly that they are "not all the
  same". Incidentally, writing $H_1$ as $\pi_1 \ne \pi_2 \ne \pi_3$ is also wrong.
- **Forcing ordinal data into a $\chi^2$ test.** When the outcome is "cured / markedly effective /
  effective / ineffective", the grades carry information about "degree", while $\chi^2$ only counts
  numbers: **swap the order of any two columns and the $\chi^2$ value does not change**. Such singly
  ordered data should be analyzed with a rank-sum test. By the same token, when both variables are ordinal
  but of different natures, the aim of the study must route you to a rank-sum test, a rank correlation, or
  a test for linear trend, rather than always to $\chi^2$.
- **Deriving the expected frequency from the observed proportions.** $T$ can only be computed under the
  assumption that $H_0$ holds: multiply the **overall rate** by the number of cases in each group
  ($T_{RC} = n_R n_C / n$). Multiply by each group's own observed effective rate and what you get is $A$,
  not $T$, and the $\chi^2$ will inevitably be 0. The `$expected` in the software is exactly this $T$, and
  can be used directly.

## How it connects to the other courses

::: tip Related pages
- **[Lecture 14 of *Introduction to Information Technology*, Tests of Homogeneity and Contingency Tables](/en/intro-it/14-goodness-of-fit-and-contingency)** — **that lecture and this chapter are two sides of the same thing, and it is worth reading them together.** That lecture is the **hands-on** side, starting from R: how to arrange raw data into a contingency table with `table()` (for taking marginal sums along a dimension with `margin.table()` and adding total rows and columns with `addmargins()`, see [Chapter 5 of *Health Statistics*, Describing Qualitative Data](/en/Health-statistics/05-describing-qualitative-data)), and how to call `chisq.test()`, `fisher.test()`, and `mcnemar.test()` and read their output. This chapter covers the **principles and conditions of use** behind those functions: why $\chi^2$ is $\sum (A-T)^2/T$, why the degrees of freedom are $(R-1)(C-1)$, when the default arguments **must not** be used, and when you have to switch to Fisher. Being able to write the code is not the same as being able to draw the conclusion — the decision table and the conditions of use are the half that this chapter adds.
- **[Week 4 of *Medical Big Data Analysis and Decision Making*, Association Rules](/en/Medical-Big-Data-Analysis/4-association-rules)** — association rules and the $\chi^2$ test of independence both ask "are two categorical variables associated", but they answer in completely different ways.
  - **The $\chi^2$ test of independence is confirmatory and global**: you start from $H_0$ "the two variables are independent", then put all the cells of the whole contingency table together and compute **one** $\chi^2$ and **one** $P$ value. It answers "are these two variables independent, and could this association be nothing but sampling error", and it controls the Type I error; but it **does not tell you the direction or the strength of the association** — at best the standardized residuals show roughly which cell is over-represented.
  - **Association rules are exploratory and item-by-item**: no $H_0$ is set and no $P$ value is given; each "combination of itemsets" is taken separately and its **support** (the frequency with which that combination appears in all records), **confidence** (the proportion of times $B$ also appears when $A$ appears), and **lift** (confidence ÷ the base rate of $B$) are computed. A lift of $= 1$ means $A$ and $B$ are independent, $> 1$ is a positive association and $< 1$ a negative one — **here "lift = 1" and "the $\chi^2$ test does not reject the hypothesis of independence" are saying the same thing**.
  - In short: **the chi-square test gives you one $P$ value, association rules give you a string of rules and their strengths**. In practice the two are often used in relay — first a $\chi^2$ test of independence to confirm that "these two variables are not independent", then association rules or the odds ratio to see **which category goes with which**, how strong the association is, and whether it supports a claim like "$A$ causes $B$". Association rules are also good at handling dozens of variables at once and fishing candidates out of a huge number of combinations, whereas $\chi^2$ looks at one table at a time.
- **[Lecture 4 of *Introduction to Information Technology*, Lists and Factors](/en/intro-it/4-lists-and-factors)** — the **entrance** to every test in this chapter is a contingency table, and in R a contingency table is a matrix or array with `dimnames`, whose row and column names are factor levels. That lecture covers how to build one with `factor()`, how to fix the order with `levels`, and how to count with `table()`, which directly determines whether your table's row order is right: **when a singly ordered data set is tested, get the order of the grades wrong and the conclusion of the rank-sum test comes out reversed**. The `UCBAdmissions`, `HairEyeColor`, and `Titanic` used as examples in this chapter are all multi-dimensional arrays, an extension of exactly that lecture.
- **[Lecture 13 of *Introduction to Information Technology*, Parametric Hypothesis Testing](/en/intro-it/13-hypothesis-testing)** — this chapter is the hypothesis-testing framework applied to **count data**. The rules laid down there — "$H_0$ and $H_1$ are opposed, $\alpha$ is the error tolerance fixed in advance, $H_0$ is rejected only when $P$ is small, and failing to reject is not the same as accepting $H_0$" — are used here without a single change, only with the test statistic changed from $t$ and $z$ to $\chi^2$. Look at how the two "counter-intuitive points" of this chapter are explained within that framework: **$H_1$ says "not equal" yet the test is one-sided** (because squaring merges the two sides into the right tail), and **$\chi^2$, like $t$, is looked up in the right-hand single tail** — the way critical values are looked up in those two lectures transfers directly here.
- **[Lecture 3 of *Introduction to Information Technology*, Arrays and Data Frames](/en/intro-it/3-arrays-and-data-frames)** — the `UCBAdmissions` (three-dimensional), `HairEyeColor` (three-dimensional), and `Titanic` (four-dimensional) used in this chapter are all arrays; subsetting by subscript with `[, , "A"]` or `[, , "Male"]`, and taking marginal sums along a dimension with `margin.table()`, all rely on the array-indexing knowledge from that lecture. **Taking marginal sums is exactly how "combining adjacent rows and columns" is implemented in R**.
- **[Lecture 12 of *Introduction to Information Technology*, Parameter Estimation](/en/intro-it/12-parameter-estimation)** — a hypothesis test only answers "is there a difference", not "how large is the difference". When reporting the result of a comparison of two rates, the **confidence interval for the difference in rates** is usually required as well (or the odds ratio and its confidence interval that `fisher.test()` prints along the way), and the technique of that lecture is the best complement to this chapter's conclusions. In the example here, `fisher.test(tab)` does give the 95% confidence interval for the odds ratio.
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/en/intro-it/9-base-graphics)** — a contingency table does not easily reveal its structure from the numbers alone, and `barplot()` with stacked bars is a good way to display the proportions in each group; to see at a glance which cells have observed frequencies far above expectation, use `mosaicplot()` (the mosaic plot) from the base graphics system, as in the passage on stratified structure in [Chapter 12 of *Health Statistics*, Bivariate Association](/en/Health-statistics/12-bivariate-association). This chapter says that "the $\chi^2$ test does not tell you the direction"; a plot fills exactly that gap.
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)** — this chapter's "combine adjacent rows and columns to meet the expected-frequency requirement", "delete rows and columns whose expected frequencies are too small", and "check whether the table has any empty cells" are, on real data, that week's variable binning (equal width / equal frequency) and column handling
  (dropping and selecting columns with `subset()`). The difference is that there it is done from a data-engineering point of view, while here statistics tells you **why it must be done and how far to combine** (no more than 1/5 of the cells with $1 \le T < 5$, and no cell with $T < 1$).
- **[Week 5 of *Medical Big Data Analysis and Decision Making*, Classification (Part 1)](/en/Medical-Big-Data-Analysis/5-classification-1)** — that week builds classifiers with decision trees and compares the models before and after pruning by **accuracy**. This chapter's $\chi^2$ test judges whether two variables are independent, while a classification model goes on to ask "how well can one variable predict another" — the same starting point, different measures. A confusion matrix is itself a 2×2 table, and the sensitivity, specificity, and Youden index computed from it are essentially different "rates" of the same batch of count data; the fullest treatment of them on this site is in **[Diagnostic Test Evaluation (ROC and AUC)](/en/Health-statistics/diagnostic-test)**. **Be careful not to mistake "a significant $\chi^2$ test" for "good predictive performance"**: with a large sample even a faint association can be significant, whereas predictive value depends on strength measures such as sensitivity and specificity.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/10-chi-square once
translated; for now the Chinese page /Health-statistics/10-chi-square) from:
- the opening or "summary of this lecture" of /intro-it/14-goodness-of-fit-and-contingency, adding a sentence: "the complete summary of the principles, the decision table for 2×2 formulas (when to use the dedicated formula / the corrected formula / Fisher) and the conditions of use is in Health Statistics, Chapter 10".
- /intro-it/13-hypothesis-testing, where "test statistic and critical value" is discussed, adding a sentence: "the origin of the chi-square statistic and the degrees of freedom (R-1)(C-1) is in Health Statistics, Chapter 10".
- /intro-it/4-lists-and-factors, where factor() and levels are discussed, adding a sentence: "the construction of contingency tables and the effect of the order of ordered levels on test conclusions is in Health Statistics, Chapter 10".
- /intro-it/3-arrays-and-data-frames, where multi-dimensional arrays and subscripting are discussed, adding a sentence: "taking marginal sums along a dimension, and splitting a 2×2 table out of a multi-dimensional array, is in Health Statistics, Chapter 10".
- /intro-it/12-parameter-estimation, where "confidence interval for a rate" is discussed, adding a sentence: "the test comparing two rates and interval estimation of the odds ratio is in Health Statistics, Chapter 10".
- /intro-it/9-base-graphics, where mosaicplot() / barplot() is discussed, adding a sentence: "the statistical testing of contingency tables and the direction in which each cell departs from expectation is in Health Statistics, Chapter 10".
- the opening of /Medical-Big-Data-Analysis/4-association-rules, or near the definitions of support/confidence/lift, adding a sentence: "the similarities and differences between the chi-square test of independence and association rules on 'whether two variables are associated' is in Health Statistics, Chapter 10".
- /Medical-Big-Data-Analysis/2-data-preprocessing, where "category merging / binning" is discussed, adding a sentence: "how far to combine so that the expected-frequency requirement of the chi-square test is met is in Health Statistics, Chapter 10".
- /Medical-Big-Data-Analysis/5-classification-1, where "the confusion matrix and evaluation measures" is discussed, adding a sentence: "the statistical testing of the confusion matrix as a 2×2 table is in Health Statistics, Chapter 10".
-->

## Summary

1. **The whole idea of the $\chi^2$ test is one expression**: $\chi^2 = \sum \frac{(A-T)^2}{T}$, with
   degrees of freedom $\nu = (R-1)(C-1)$. $A$ is the observed frequency you counted, and
   $T = n_R n_C / n$ is the number of people there "should" be when $H_0$ holds. The better the two agree,
   the smaller $\chi^2$ is. Because the statistic is already squared, **the $\chi^2$ test is always
   one-sided (only the right tail is looked up)**, even though $H_1$ is written as "not equal".
2. **Two numbers decide the formula for a 2×2 table: $n$ and $T_{\min}$.** $n \ge 40$ and all $T \ge 5$
   → basic/dedicated formula without correction; $n \ge 40$ and some $1 \le T < 5$ → continuity
   correction; $n < 40$ **or** some $T < 1$ → Fisher's exact test. The two conditions are related by
   "or", and satisfying either one calls for an upgrade. **Fisher's test applies to any 2×2 table**, and
   is especially worth using for a recheck when the $P$ value sits right on 0.05.
3. **An $R\times C$ table only says "not all the same".** $H_1$ is "the population rates are not all the
   same", and $P < 0.05$ only says that at least two of the groups differ; to find out which two, you must
   carry out **pairwise comparisons** and change the significance level to
   $\alpha' = \frac{2\alpha}{k(k-1)}$ (equivalent to $\alpha / \binom{k}{2}$, which is 0.0167 for three
   groups). Conditions of use: no more than 1/5 of the cells with $1 \le T < 5$, and **no cell with
   $T < 1$** — if these are not met, increase the sample size, combine adjacent rows and columns (which
   must make professional sense, and the degrees of freedom are recomputed), or delete rows and columns.
4. **A paired design calls for McNemar's test.** Among the two results for the same batch of people, only
   the two disagreeing cells $b$ and $c$ carry information:
   $\chi^2 = \frac{(b-c)^2}{b+c}$, corrected to $\frac{(\lvert b-c \rvert-1)^2}{b+c}$ when $b+c<40$. It
   tests "whether the positive rates of the two treatments differ"; running an ordinary 2×2 $\chi^2$ test
   on the same table answers "whether the results of the two treatments are associated". **See clearly
   what the design is first, and choose the method after that.**
5. **Three functions cover everything in R**: `chisq.test()` (Yates' correction is on by default for a
   2×2 table, so look at `$expected` first and then decide between `correct = TRUE/FALSE`),
   `fisher.test()` (use it with small samples or when $T<1$; it also hands you a confidence interval for
   the odds ratio), and `mcnemar.test()` (for paired data, corrected by default). Do not ignore the
   `Chi-squared approximation may be incorrect` warning when you see it: that is R telling you to go back
   to the decision table.
