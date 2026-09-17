---
layout: doc
title: '12. Bivariate Association'
---

# Chapter 12. Bivariate Association

::: info Translation status
Translated from the [Chinese original](/Health-statistics/12-bivariate-association). Numbers, formulas, and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Every earlier chapter looked at **one** variable: its mean, its rate, its distribution. This chapter
> starts looking at **two** variables at the same time — first branching by data type (quantitative with
> quantitative goes to correlation, qualitative with qualitative goes to the contingency table), then
> upgrading “is there an association” into “how strong is the association, how many times the risk is”,
> and finally it has to answer one question that cannot be dodged: is the association you computed
> actually causal?

## What this chapter is for

Two indices measured on the same individual — data of that kind are everywhere: a student had both
height and forearm length measured; a monitoring site measured the fluoride content of the drinking
water and also worked out the prevalence of dental fluorosis among local children; a resident over 45 was
both asked about smoking habits and examined for chronic bronchitis. **What we want to know is whether
the two indices are related, how close that relationship is, and whether its direction is positive or
negative.**

As soon as the question is in hand, the first fork in the road is **what type each of the two variables
is**:

- **Both are quantitative variables** (height and forearm length, sepal length and petal length) — the
  question is “is there a straight-line relationship, and how close is it”, and the tool is
  **correlation analysis**.
- **Both are qualitative variables** (smoking and chronic bronchitis, the culture results of two media)
  — the question is “are the two attributes mutually independent”, and the tool is **contingency table
  analysis**.

These are the two large sections of this chapter. They look completely unrelated (one computes $r$, the
other computes $\chi^2$), but they solve the same thing: **describing how two variables vary together**.

One more thing has to be kept straight from the very start, because it decides how you write your
conclusion. The two kinds of study below use **the same $\chi^2$ formula**, but their designs, their data
structures, and the meaning of their conclusions are completely different:

| | Comparison of two sample rates | Association analysis of two categorical variables |
| --- | --- | --- |
| Sampling | Two samples drawn separately from **two populations** | One sample drawn at random from **the same population** |
| Data structure | The two rows are the two samples; the row totals are **fixed in advance** | Each row and each column is a category of one variable; the totals are **obtained at random** |
| Question tested | Whether the rates (proportions) in the two populations are the same | Whether the two attributes are **mutually independent** |
| How the conclusion is written | “the rate in group A is higher than in group B” | “the two variables are associated” |

The same formula does not mean the same question. “**The form is the same, but it is derived from a
different angle**” — this is where mistakes are easiest when reporting results.

## Core concepts

### First the fork: the variable types decide the whole route

| Types of the two variables | Research question | Method | In R |
| --- | --- | --- | --- |
| Quantitative + quantitative, following a **bivariate normal** distribution | Is there a **straight-line** relationship, and how close | Scatter plot + Pearson product-moment correlation | `plot()`, `cor()`, `cor.test()` |
| Quantitative + quantitative, but not bivariate normal; or ordinal variables, or extreme values | Is there a **monotone** relationship | Spearman's rank correlation | `cor(..., method = "spearman")` |
| Qualitative + qualitative ($2\times2$, $R\times C$) | Are the two attributes independent, how strong the association is, how many times the risk | Contingency table + $\chi^2$ + contingency coefficient + OR/RR | `table()`, `chisq.test()` |
| Quantitative + qualitative | Are the group means the same | **Not this chapter**: group comparison (the $t$ test, analysis of variance) or regression / logistic regression | — |

The last row is a reminder: **when one variable is quantitative and the other qualitative, do not force a
correlation coefficient**. Comparing height (quantitative) between the sexes (qualitative) is the business
of the two-sample $t$ test; putting sex into a model as an explanatory variable is the business of
logistic regression.

### Quantitative + quantitative (1): the scatter plot has to be drawn first

Draw every individual as a point, with $x$ on the horizontal axis and $y$ on the vertical axis, and you
have a **scatter plot**. It is the first step of correlation analysis and it cannot be skipped — because
**a correlation coefficient describes only a “straight-line” relationship, whereas the scatter plot can
tell you that the data contain no straight line at all**.

Put the eight typical patterns side by side and the rule is clear:

- $0 < r < 1$: the cloud of points spreads from bottom left to top right, and the closer $r$ is to 1 the
  tighter it becomes;
- $-1 < r < 0$: the direction reverses, from top left to bottom right;
- $r = 1$ or $r = -1$: all the points **fall exactly on one straight line**, a limit that almost never
  occurs in the physical world;
- $r = 0$: this column is the one worth looking at — $r = 0$ can correspond to “two clouds of points with
  no relation at all”, and it can equally correspond to “a perfect parabola”, “a circle”, or “a curve
  that rises and then falls”. **Their $r$ is 0 in every case, yet there is obviously a relationship
  between them.**

So the correct reading of $r = 0$ is “**no straight-line relationship**”, not “no relationship”. This
sentence is one of the bones of the whole chapter.

A scatter plot also conveniently helps you spot three things: **outliers** (a single isolated point can
pull $r$ up or down), **nonlinearity** (the cloud is curved, so you should switch to Spearman or apply a
transformation), and **group structure** (the cloud is really two clumps, which means a third variable is
stratifying the data — and in that case computing $r$ on the pooled data is meaningless).

### Quantitative + quantitative (2): Pearson product-moment correlation

**Linear correlation**, also called **simple correlation**, is the statistical method that describes the
relationship between two variables $x$ and $y$ that have a **straight-line relationship**. It has two
preconditions, and both are hard requirements:

1. both variables are **quantitative variables**;
2. the two variables follow a **bivariate normal distribution** (roughly: $x$ on its own is approximately
   normal, $y$ on its own is approximately normal, and given $x$ the distribution of $y$ is also normal
   with homogeneous variance; the scatter plot forms a symmetric elliptical cloud).

One more feature: **the two variables have no primary or secondary role; they are on an equal footing**.
In correlation analysis there is no distinction between a “dependent variable” and an “independent
variable”: swap $x$ and $y$ and the value of $r$ is exactly the same.

The **population** correlation coefficient is written $\rho$ and the **sample** correlation coefficient
$r$, that is, the **Pearson product-moment correlation coefficient**; it is the index that quantitatively
describes the **direction** and the **closeness** of the straight-line relationship between two variables.

The computation needs three basic quantities — the sum of squares of deviations from the mean for $x$,
the same for $y$, and the sum of cross-products of the deviations of $x$ and $y$:

$$l_{xx} = \sum (x_i - \bar x)^2, \qquad l_{yy} = \sum (y_i - \bar y)^2, \qquad l_{xy} = \sum (x_i - \bar x)(y_i - \bar y)$$

so

$$r = \frac{l_{xy}}{\sqrt{l_{xx}\, l_{yy}}} = \frac{\sum (x_i - \bar x)(y_i - \bar y)}{\sqrt{\sum (x_i - \bar x)^2 \cdot \sum (y_i - \bar y)^2}}$$

It can also be written as “standardize first, then average”, which makes its meaning clearer:

$$r = \frac{1}{n-1}\sum \left(\frac{x_i - \bar x}{s_x}\right)\left(\frac{y_i - \bar y}{s_y}\right)$$

**Three properties you must remember**:

- **It has no units**, and its range is $-1 \le r \le 1$ (numerator and denominator have the same
  dimension, and the dimensions cancel);
- **the sign gives the direction**: $r > 0$ is a positive correlation (as one increases, the other tends
  to increase), $r < 0$ a negative correlation;
- **the absolute value gives the closeness**: the closer $|r|$ is to 1 the closer the relationship, and
  the closer it is to 0 the weaker the straight-line relationship.

The second and the third have to be **read separately**: $-0.9$ is a closer straight-line relationship
than $+0.5$, because closeness looks only at $|r|$.

One more sentence that is often overlooked: **a correlation coefficient is not a complete description of
two variables**. When you give $r$, the means and standard deviations of $x$ and $y$ should be given along
with it (the computation of $r$ uses them anyway; they are the set of numbers that comes with $r$).

### Quantitative + quantitative (3): $r$ has to be tested, and its confidence interval computed

The sample correlation coefficient $r$ is an estimate of the population correlation coefficient $\rho$.
Draw one sample at random from a population with $\rho = 0$; because of sampling error, the $r$ you
compute is in general **not equal to 0**. So when you are handed an $r$, the first question is: **does it
show that $\rho \ne 0$ in the population?**

**(1) Hypothesis testing — the table method and the $t$ test**

- **The table method**: look up the table of critical values of $r$ with degrees of freedom $\nu = n - 2$.
  If $|r|$ is smaller than the critical value → $P$ is larger than the corresponding probability level; if
  it is larger → $P$ is smaller than that level.

The statistic of the **$t$ test** is

$$t_r = \frac{r - 0}{S_r}, \qquad S_r = \sqrt{\frac{1 - r^2}{n - 2}}, \qquad \nu = n - 2$$

When $H_0$ holds ($\rho = 0$), $t_r$ follows a $t$ distribution with $\nu = n - 2$ degrees of freedom. For
$n = 16$, $\nu = 14$; if $P < 0.05$, reject $H_0$, and the two variables may be considered to have a
linear correlation.

::: tip Correlation ≠ agreement (an easy side track from this chapter)
A large $r$ only says that the two columns of numbers “rise and fall together”; **it does not say that
their values are the same**.
Add a constant to every number in one set and $r$ does not change at all, but the two measurements can no
longer be used interchangeably.

So **$r$ cannot be used to assess the agreement of two instruments or two raters**; use Kappa, ICC, or
Bland-Altman instead —
see **[Agreement and Reliability (Kappa and ICC)](/en/Health-statistics/agreement-reliability)**.
:::

**(2) The confidence interval of the population correlation coefficient — do a $z$ transformation first**

There is a trap here: **when $\rho \ne 0$, the sampling distribution of $r$ is skewed** (it stays skewed
even for large samples), so the normal approximation “$r \pm 1.96 S_r$” cannot be used for the confidence
interval of $\rho$. The correct approach is to transform $r$ into a quantity that is approximately normal,
compute the interval, and transform back:

$$z_r = \frac{1}{2}\ln\frac{1 + r}{1 - r} \qquad (\text{that is, } \tanh^{-1} r)$$

$z_r$ approximately follows a normal distribution with mean $\frac{1}{2}\ln\frac{1+\rho}{1-\rho}$ and
standard deviation $\frac{1}{\sqrt{n-3}}$, so:

$$z_r \pm z_{\alpha/2}\cdot\frac{1}{\sqrt{n-3}}$$

Then apply the **inverse hyperbolic tangent transformation** to the upper and lower limits one by one, to
get back to the scale of the correlation coefficient:

$$r = \frac{e^{2z_r} - 1}{e^{2z_r} + 1}$$

Note the $n - 3$ in the denominator — it is peculiar to this transformation, so do not casually write
$n - 1$ or $n - 2$. Both the point estimate ($r$) and the interval estimate (the 95% CI of $\rho$) should
be reported; reporting only a $P$ value is incomplete.

### Quantitative + quantitative (4): Spearman's rank correlation

Once quantitative data fail the bivariate normal requirement, the road above is blocked. Change the idea:
**use only the order of magnitude, not the actual values**. Rank $x$ and $y$ each from smallest to
largest; this rank is called the **rank**; equal values take the **average rank**. Substitute the ranks
for the original values in Pearson's formula and what you get is the **Spearman rank correlation
coefficient** $r_s$, also called the **rank correlation coefficient**.

It applies to three kinds of data:

1. data that **do not follow a bivariate normal distribution**;
2. data whose **population distribution type is unknown**;
3. **ordinal data** (therapeutic effect recorded as ineffective / improved / markedly effective / cured,
   signs recorded as $-$/$+$/++/+++$), and data with an open-ended value at one or both ends.

The properties of $r_s$ parallel those of $r$ exactly: $-1 \le r_s \le 1$, $r_s > 0$ is a positive
correlation, $r_s < 0$ a negative correlation, and the closer $|r_s|$ is to 1 the closer the relationship.
**But there is one key difference in meaning**:

> $r$ measures the closeness of a **straight-line** relationship, while $r_s$ measures the closeness of a
> **monotone** relationship.

Monotone (always going up, at whatever pace) is far looser than straight-line. For a strongly curved
relationship $r$ may be only 0.6 while $r_s$ is 0.95. **When you change the question from “is there a
straight-line relationship” to “does one get larger as the other gets larger”, that is exactly the
situation where $r_s$ should be used.**

How to compute it: **assign ranks separately** to $x$ and to $y$, take the difference $d$ of each pair of
ranks ($d = $ rank$_x - $ rank$_y$), then

$$r_s = 1 - \frac{6\sum d^2}{n(n^2 - 1)}$$

This formula is the simplified form for “no tied ranks”. When there are **many tied ranks** in $x$ or in
$y$, the corrected formula must be used; the correction terms are

$$T_x = \frac{\sum (t^3 - t)}{12}, \qquad T_y = \frac{\sum (t^3 - t)}{12}$$

where $t$ is the number of tied ranks in $x$ (or in $y$), computed separately for each of the two
variables. The corrected formula is

$$r_s = \frac{\dfrac{n^3 - n}{6} - (T_x + T_y) - \sum d^2}{\sqrt{\left(\dfrac{n^3 - n}{6} - 2T_x\right)\left(\dfrac{n^3 - n}{6} - 2T_y\right)}}$$

**Hypothesis testing for $r_s$** ($H_0: \rho_s = 0$): **for $n \le 50$ use the table method**, looking up
the table of critical values of $r_s$; **for $n > 50$ use the $z$ test**,

$$z = r_s\sqrt{n - 1}$$

This is the same family as the rank methods of Chapter 11 — the whole computation chain is built on ranks,
which is why it is inherently robust to skewness and extreme values. Ordinal data almost inevitably
contain many tied ranks, and then **the corrected formula must be used**.

### Qualitative + qualitative (1): contingency tables and the test of independence

Data on two qualitative variables are organized into a **contingency table** (also called a
cross-tabulation, a row × column table, or an $R \times C$ table): the rows and the columns hold the
categories of one variable each, and the cells contain the **observed frequencies** $A_{ij}$. The
$2 \times 2$ table is the most common special case.

The question the test asks is written as hypotheses:

- $H_0$: the two variables are **mutually independent** (for example: chronic bronchitis and smoking habit
  are mutually independent);
- $H_1$: the two variables are **associated**;
- $\alpha = 0.05$.

The test statistic is

$$\chi^2 = \sum_{i,j}\frac{(A_{ij} - T_{ij})^2}{T_{ij}}, \qquad T_{ij} = \frac{n_i m_j}{n}, \qquad \nu = (R-1)(C-1)$$

$T_{ij}$ is the **expected frequency** — the “how many there should be”, worked out from the marginal
totals under the premise that $H_0$ (independence) holds; it is obtained as **row total × column total ÷
total number of cases**. The further $A$ is from $T$, the larger $\chi^2$ is, and the more reason there is
to doubt independence.

Three design forms go through the same formula; only the way $H_0$ is written differs:

- **a completely randomized design's $2 \times 2$ table** (smoking × chronic bronchitis): sampling from
  one population, testing whether the two attributes are independent;
- **a paired design's $2 \times 2$ table** (the same batch of specimens cultured on media A and B): **the
  same subjects measured twice**; here $H_0$ is “the results of the two methods are mutually independent”,
  while testing “whether the two methods differ” should actually use **McNemar's test** (see Lecture 14 of
  *Introduction to Information Technology*), and the two are not the same thing;
- **an $R \times C$ table** (major × temperament type): both rows and columns have more than two
  categories, and $\nu = (R-1)(C-1)$.

::: tip The chi-square formula and its conditions are not repeated here
**The formula of the $\chi^2$ test, the continuity correction, and the conditions for use — “expected
frequency $T \ge 5$”, “$n \ge 40$”, and when Fisher's exact test must be used instead — are in
Chapter 10.** This chapter cares about one thing Chapter 10 does not answer: a significant $\chi^2$ only
says “there is an association”; **how strong the association is** and **how many times the risk is** are
the contingency coefficient and OR/RR of the next two subsections.
:::

### Qualitative + qualitative (2): the contingency coefficient — how strong the association is

$\chi^2$ has a fatal weakness: **its size grows along with the sample size $n$**. For the same
association, quadruple the sample size and $\chi^2$ roughly quadruples too, so on the $\chi^2$ scale “a
strong association” and “a large sample” cannot be told apart. A $P$ value can answer “is there an
association”, but not “is the association strong”.

The solution is to take $n$ out of the statistic, which gives the **Pearson contingency coefficient**:

$$r = \sqrt{\frac{\chi^2}{\chi^2 + n}}$$

It takes values in $[0, 1)$; the larger it is the closer the association between the two variables, and
$0$ means mutual independence.

There are two things you must know when using it:

- **Its upper limit never reaches 1, and it depends on the number of rows and columns of the table.** The
  maximum for a $2 \times 2$ table is only $\sqrt{1/2} \approx 0.707$, and the upper limit for an
  $R \times C$ table is $\sqrt{(k-1)/k}$ (where $k$ is the smaller of the number of rows and columns). So
  **contingency coefficients computed from contingency tables of different sizes cannot be compared
  directly** — a 0.5 in a $2 \times 2$ table is already quite strong, while a 0.5 in a $5 \times 5$ table
  is much weaker.
- **It has no direction.** “An association” between sex and whether someone lacks a certain nutrient
  cannot be called positive or negative — between two unordered categorical variables there is no natural
  ordering of before/after or higher/lower.

### Qualitative + qualitative (3): the odds ratio OR and the relative risk RR

The contingency coefficient answers “is it strong”, but what clinical work really wants to ask is: **“how
many times the risk of chronic bronchitis does a smoker have compared with a nonsmoker?”** That requires
compressing the $2 \times 2$ table into two effect sizes with a practical meaning. Write the table in
standard form (rows are exposure, columns are outcome):

| | With the outcome (disease/death) | Without the outcome | Total |
| --- | --- | --- | --- |
| Exposed group | $a$ | $b$ | $n_1 = a + b$ |
| Unexposed group | $c$ | $d$ | $n_0 = c + d$ |
| Total | $m_1$ | $m_0$ | $n$ |

The **relative risk** (RR) is the ratio of the **rates** of the two groups:

$$RR = \frac{a/(a+b)}{c/(c+d)}$$

The reading is plain: **the exposed group's risk of the disease is $RR$ times that of the unexposed
group**. $RR = 1$ means the two groups have the same risk (no association); $RR > 1$ suggests that the
exposure is a **risk factor**; $RR < 1$ suggests that it is a **protective factor** ($RR = 0.4$ means the
risk falls to 0.4 times).

The **odds ratio** (OR) is the ratio of the **odds** of the two groups. The **odds** is the ratio of the
probability of “occurring” to that of “not occurring”; the odds of the exposed group is $a/b$ and that of
the unexposed group is $c/d$, so

$$OR = \frac{a/b}{c/d} = \frac{ad}{bc}$$

The OR is read in parallel with the RR ($=1$ no association, $>1$ harmful, $<1$ protective), but its
meaning differs: it says **how many times the odds**, not how many times the risk.

**The key difference is in whether they can be computed at all**:

| Design | Can the RR be computed? | Can the OR be computed? |
| --- | --- | --- |
| **Cohort study** (split into exposed and unexposed groups first, then follow up for the outcome) | Yes, the rates really can be computed | Yes, but the RR is usually reported in preference |
| **Randomized controlled trial** | Yes | Yes |
| **Case-control study** (split into case and control groups first, then ask about exposure history) | **No** — the investigator decides by hand how many cases and how many controls there are, so the true risk of disease cannot be computed | **Yes**, and the OR is the **main index** of this design |
| **Cross-sectional survey** (both attributes measured at the same time) | Strictly speaking the “risk of disease” cannot be computed, only the ratio of prevalences | Yes; often used as an approximation to the strength of the association |

**The numerical relation between the $OR$ and the $RR$**: the $OR$ is always **further from 1** than the
$RR$, that is, it more easily looks like a “large effect”. The more common the outcome, the more the $OR$
exaggerates the $RR$; only when the outcome is **rare** (a disease rate below 10%, as a rule) is
$OR \approx RR$, and only then can the $OR$ be read as an $RR$. The Berkeley admissions data later in this
chapter are a ready-made example: $OR = 1.84$, $RR = 1.47$ — **if you use the $OR$ to say “the risk is
1.84 times”, you are exaggerating**, because “being admitted” is not at all rare in these data (about 39%
overall).

One final iron rule: **both the OR and the RR must be reported with a confidence interval, not as a point
estimate alone**. A result with $OR = 2.0$ but a 95% CI of $(0.8, 5.0)$ is not in conflict with “no
association”.

### Correlation and regression: one word apart, two different questions

Correlation and regression are often taken for the same thing, but they answer different questions.

| | Correlation analysis | Simple linear regression |
| --- | --- | --- |
| Status of the variables | **Equal**, no primary or secondary, and swapping $x$ and $y$ leaves the result unchanged | **Not equal**: a response variable $y$ and an explanatory variable $x$ |
| What it describes | The **direction and closeness** of the relationship between the two variables | How the response variable $y$ **changes with the numerical value of $x$** |
| Index | $r$, **dimensionless** | Slope $b$ (**with units**, e.g. cm/(kg)) and intercept $a$ |
| Can it predict | No | Yes, $\hat y = a + bx$ |
| Data requirements | Requires a **bivariate normal** distribution | Requires only that **given $x$, $y$ is normal with homogeneous variance**; $x$ need not be random |

The two are very tightly linked; two connections are enough to remember:

**First: the slope and the correlation coefficient have the same sign, and they can be converted into
each other.**

$$b = r\,\frac{s_y}{s_x}$$

So in simple linear regression $r > 0$ is equivalent to $b > 0$; moreover the $t$ test of $b = 0$ and the
$t$ test of $\rho = 0$ give **exactly the same $P$ value** — what they test is in fact the same
hypothesis.

**Second: $r^2$ is the coefficient of determination of the regression.** $r^2$ is the proportion of the
total variation in $y$ that can be explained by $x$. When $r = 0.87$, $r^2 = 0.76$, read as “76% of the
variation in $y$ can be explained by $x$”, with the remaining 24% belonging to other factors and random
error. **This conversion is very useful**: $r = 0.5$ looks quite large on its own, but square it and you
see that it explains only 25% of the variation.

In one sentence: **correlation says “they move together”, regression says “how they move and by how
much”**. If you want to predict, you need regression.

### Correlation is not causation

This is the sentence this chapter most needs to drive home. Having computed an $r$ or an $OR$, all you can
say is “**these two variables vary together in the data**”; saying “$x$ causes $y$” oversteps the
boundary. There are five layers of reasons, each more hidden than the last:

**Layer 1: the temporal order is unclear, and the direction may be reversed.** In correlation analysis
the two variables are on an equal footing, and $r$ makes no distinction between first and second. Length
of hospital stay correlates with severity of illness — is it “seriously ill, therefore a long stay”, or “a
long stay, therefore seriously ill”? Anxiety score correlates with duration of insomnia — which causes
which? **Correlation analysis cannot answer this question in principle**; only subject-matter knowledge
and study design (cohort studies, intervention trials) can establish the temporal order.

**Layer 2: a third variable behind the scenes influences both (confounding).** Ice cream sales correlate
highly with deaths by drowning — not because eating ice cream causes drowning, but because
**temperature** raises both at once. Significant correlations between such utterly unrelated variables can
be manufactured in bulk out of any sufficiently large data set. The way to guard against this is
**stratified analysis**, or putting the suspect variable into a **multifactorial model** (multiple linear
regression, logistic regression).

**Layer 3: after stratification the association may reverse entirely, while pooling hides this
completely.** This is no theoretical worry — R's built-in `UCBAdmissions` is the standard example: pooling
the 6 departments gives an admission rate of 44.5% for men and 30.4% for women, $OR = 1.84$,
$\chi^2 = 92.2$ ($P < 0.001$), which looks like a clear association between sex and admission; yet
**after stratifying by department, apart from department A where the direction is reversed, the ORs of the
other departments are all close to 1** (0.35, 0.80, 1.13, 0.92, 1.22, 0.83), and in department A the
admission rate for women (82.4%) is actually higher than for men (62.1%). The reason is simple: women
applied more often to departments whose admission rates were already low, while men applied more often to
departments with high admission rates. **The association computed from the pooled data is an artifact
created by the third variable, “department”.** This is **Simpson's paradox**, and it is why this chapter
keeps stressing that “stratified data cannot simply be pooled”.

**Layer 4: a correlation at the group level cannot be carried straight over to the individual.** Finding
from survey data on cities that “the higher the average income of a city, the higher the incidence of a
certain disease” does not mean that “people with higher incomes are more likely to get the disease”. An
association that holds at the group level may fail completely when extended to individuals; this is called
the **ecological fallacy**.

**Layer 5: a small $P$ value only says “this does not look like sampling error”; it does not say “this is
not coincidence”.** $P < 0.05$ means: if $H_0$ is true, the probability of a sample result as extreme as
this is under 5%. It has not ruled out confounding, has not ruled out measurement bias, and has not
established the temporal order. **Try several dozen correlation analyses on the same data set and a few
will always come out “significant”** — this is the multiple-comparison problem.

Watch out in the other direction too: **no association does not mean no causation either**. $r = 0$ only
says that there is no **straight-line** relationship; a parabola or a U-shaped relationship also has
$r = 0$. Besides that, a restricted range of values (measuring blood pressure only in middle-aged people,
so that no relationship with age can be seen), excessive measurement error, and too small a sample all
hide a real relationship.

So when may you dare to speak of causation? What statistics can provide is one link in a **chain of
evidence**, not the whole chain. As a rule you look at: **temporal order** (cause first, effect after),
**strength of association** (how far the $OR$ and the $RR$ are from 1), a **dose–response relationship**
(the more exposure, the more severe the outcome), **consistency** (studies in different populations and
with different designs agree), **biological plausibility**, and the most critical item of all —
**evidence from an intervention trial**: random allocation levels “other variables” artificially, and only
then can a difference between the two groups be attributed directly to the intervention. Leaning toward
causation in observational research requires dedicated methods (propensity scores, instrumental
variables, Mendelian randomization, DAGs analyzing the confounding structure, and so on); it is not
something that computing a few more correlation coefficients can achieve.

## Doing it in R

### 1. Quantitative variables: look at the plot first, then compute

```r
# iris is R's built-in iris data: 150 flowers, with Sepal.Length and Petal.Length both quantitative
plot(iris$Sepal.Length, iris$Petal.Length,
     xlab = "Sepal length (cm)", ylab = "Petal length (cm)",
     main = "Sepal length vs petal length in iris",
     pch = 19, col = iris$Species)      # color by species, to check for group structure along the way
```

Look at the plot first: the cloud of points is an ellipse running from bottom left to top right, with no
obvious outliers or curvature — **the preconditions for a Pearson correlation roughly hold**. If the
cloud were curved, or dragged along by one or two isolated points, you should move to the methods of the
next step.

### 2. Pearson and Spearman

```r
cor(iris$Sepal.Length, iris$Petal.Length)                       # Pearson
# 0.8717538

cor(iris$Sepal.Length, iris$Petal.Length, method = "spearman")
# 0.8818981

cor.test(iris$Sepal.Length, iris$Petal.Length)
# Pearson's product-moment correlation
# t = 21.646, df = 148, p-value < 2.2e-16
# 95 percent confidence interval:
#  0.8270363 0.9055080
# sample estimates:
#       cor
# 0.8717538

pairs(iris[, 1:4])                                              # scatter plot matrix
```

How to read the output:

- `cor()` gives only the correlation coefficient — **no $P$ value and no confidence interval** — so formal
  analysis should use `cor.test()`. `t = 21.65` is this chapter's $t_r$, and `df = 148` is
  $\nu = n - 2 = 150 - 2$. With $P < 2.2\text{e-}16$, reject $H_0$: the sepal length and the petal length
  may be considered to have a linear correlation.
- `95 percent confidence interval: 0.8270 0.9055` is the **confidence interval for the population
  correlation coefficient $\rho$**, computed inside `cor.test()` after the $z_r$ transformation (using
  exactly that $1/\sqrt{n-3}$ standard error), not forced out of $r \pm 1.96S_r$.
- `method = "spearman"` gives $r_s = 0.8819$, **slightly larger** than Pearson's 0.8718, which says that
  the relationship between these two variables is “monotone but slightly curved” — monotone correlation is
  looser than linear correlation, so a slightly higher value is normal.
- `pairs()` draws the scatter plot matrix of all pairs among 4 variables in one go, and is the fastest way
  to **screen a batch of variables**: which two variables are related, which variable is skewed, and where
  outliers are hiding, all visible at a glance.

### 3. The correlation matrix: a whole batch of variables at once

```r
cor(mtcars[, c("mpg", "wt", "hp", "disp")])
#             mpg         wt         hp       disp
# mpg   1.0000000 -0.8676594 -0.7761684 -0.8475514
# wt   -0.8676594  1.0000000  0.6587479  0.8879799
# hp   -0.7761684  0.6587479  1.0000000  0.7909486
# disp -0.8475514  0.8879799  0.7909486  1.0000000
```

Pass a data frame to `cor()` and you get a **correlation matrix**: the diagonal is always 1, and the
matrix is symmetric about the diagonal ($r_{xy} = r_{yx}$, exactly the expression of “the two variables
are on an equal footing”).

Three things to watch when reading it:

- `mpg` (fuel consumption) is **negatively correlated** with `wt` (weight), `hp` (horsepower), and `disp`
  (displacement): the heavier the car, the more horsepower, the larger the displacement, the fewer miles
  per gallon — a direction that matches common sense;
- but **quite a few of these correlation coefficients do not represent causation**: the $r = 0.888$
  between `wt` and `disp` (displacement) is very high, yet “weight causes large displacement” is an
  awkward statement in itself — they are two sides of one car's design orientation;
- there is **no $P$ value** in a correlation matrix, so you cannot draw conclusions from the size of the
  numbers alone. To test them one by one use `cor.test()`, or compute them all at once and add
  `psych::corr.test()` (which applies a multiple-comparison correction automatically).

### 4. Qualitative variables: contingency table → $\chi^2$ → contingency coefficient → OR/RR

`UCBAdmissions` is R's built-in data on graduate admissions at Berkeley in 1973, a three-dimensional
contingency table: the dimensions in order are `Admit` (admitted/rejected), `Gender` (male/female), and
`Dept` (the six departments A–F).

```r
ftable(UCBAdmissions)     # ftable() flattens a multidimensional table; see the structure first
#                 Dept   A   B   C   D   E   F
# Admit    Gender
# Admitted Male        512 353 120 138  53  22
#          Female       89  17 202 131  94  24
# Rejected Male        313 207 205 279 138 351
#          Female       19   8 391 244 299 317

# Pooled table: collapse the "Dept" dimension and look only at sex and admission
tot <- margin.table(UCBAdmissions, c(1, 2))
tot
#           Gender
# Admit      Male Female
#   Admitted 1198    557
#   Rejected 1493   1278

# Test of independence
chisq.test(tot, correct = FALSE)
# X-squared = 92.205, df = 1, p-value < 2.2e-16

chisq.test(tot)           # R applies Yates' continuity correction by default for 2×2 tables
# X-squared = 91.61, df = 1, p-value < 2.2e-16
```

How to read the output:

- `margin.table(x, c(1, 2))` sums out the third dimension (department), giving the sex × admission
  $2 \times 2$ table; this step is “pooling stratified data” — **doing it first is fine, but** remember
  that subsection 5 below will explain how dangerous it is.
- `chisq.test(tot, correct = FALSE)` gives the **uncorrected** Pearson $\chi^2 = 92.205$, matching the
  textbook formula; **R uses `correct = TRUE` (Yates' continuity correction) by default for $2 \times 2$
  tables, which gives the slightly smaller 91.61**. The $P$ values in the two lines lead to the same
  conclusion, but when reporting you must state clearly which one you used — this is the classic source of
  “one data set, two $\chi^2$ values”. $\nu = (2-1)\times(2-1) = 1$.
- `p-value < 2.2e-16`: reject “sex and admission outcome are mutually independent”; the two may be
  considered to be associated.

Next, turn the $\chi^2$ into “strength of association” and “effect scale”:

```r
# Contingency coefficient: take n out of chi-square
chi2 <- unname(chisq.test(tot, correct = FALSE)$statistic)
sqrt(chi2 / (chi2 + sum(tot)))          # 0.1412997

# Odds ratio OR: the ratio of the odds of the two groups, (a/b) / (c/d), that is ad/bc
(a <- tot["Admitted", "Male"])          # 1198
(b <- tot["Rejected", "Male"])          # 1493
(c <- tot["Admitted", "Female"])        # 557
(d <- tot["Rejected", "Female"])        # 1278

(a / b) / (c / d)                       # 1.84108
a * d / (b * c)                         # 1.84108: both ways of writing it give the same result

# Relative risk RR: the ratio of the rates of the two groups
p_male   <- a / (a + b)                 # 0.445187, male admission rate ≈ 44.5%
p_female <- c / (c + d)                 # 0.303542, female admission rate ≈ 30.4%
p_male / p_female                       # 1.466642
```

How to read the output:

- The **contingency coefficient, 0.141**, is what answers “how strong is the association” (a value as
  large as $\chi^2 = 92.2$ says nothing about strength in itself; it is inflated by the total of 4526
  cases). The upper limit of the contingency coefficient for a $2 \times 2$ table is only 0.707, so 0.141
  counts as a **weak association** — which does not contradict the $\chi^2$ test's conclusion of “a very
  small $P$, there is an association”: **an association is not the same as a strong association**.
- **$OR = 1.84$**: the **odds** of being admitted for men are 1.84 times those for women.
- **$RR = 1.47$**: the **proportion** of men admitted is 1.47 times that of women (44.5% / 30.4%; the two
  rates in the parentheses are already rounded — dividing the unrounded rates gives 1.4666).
- The two numbers differ, which illustrates the rule above: **when the outcome is not rare, the $OR$ is
  further from 1 than the $RR$**. Here admission is a common outcome (about 39% overall), so the $OR$
  clearly exaggerates. To report “how many times the risk”, use the $RR$; if what you are reporting comes
  from a case-control study or from logistic regression, only the $OR$ is available, and then you must
  state that it is only an odds ratio.
- `fisher.test(tot)$estimate` also gives an odds ratio (the conditional maximum likelihood estimate); its
  value differs slightly from $ad/bc$ because the principle is different, and there is no need to force
  them to agree.

### 5. Stratification: Simpson's paradox in `UCBAdmissions`

The pooled data say “sex is associated with admission”; now look again **after stratifying by
department**:

```r
# Compute the OR inside each department separately
or_by_dept <- apply(UCBAdmissions, 3, function(tb) {
  (tb["Admitted", "Male"] * tb["Rejected", "Female"]) /
    (tb["Rejected", "Male"] * tb["Admitted", "Female"])
})
round(or_by_dept, 2)
#    A    B    C    D    E    F
# 0.35 0.80 1.13 0.92 1.22 0.83

# Also take a look at departments A and F (the output is a 2×2 frequency table)
UCBAdmissions[, , "A"]      # men 512 admitted / 313 rejected, women 89 admitted / 19 rejected
UCBAdmissions[, , "F"]      # men 22 admitted / 351 rejected, women 24 admitted / 317 rejected
```

Pooling gives $OR = 1.84$ (the odds for men are clearly larger), **yet after stratifying, apart from
department A where the direction is reversed (0.35), the ORs of the other departments all hover around 1
(0.80 ~ 1.22), and even the strongest department falls far short of 1.84; in department A the admission
rate for women (82.4%) is even higher than for men (62.1%)**. The reason is not that “the departments do
not want women”, but the **application structure**: women applied more heavily to departments such as A
and B whose admission rates were already low, while men applied more to departments such as C and E with
high admission rates. (You can go on to ask “why did women apply less often to those departments” — but
that is already beyond what statistics can answer.)

What this piece of code gives you is the most important working habit of this chapter: **whenever you see
a significant association, first ask “is there a third variable stratifying the data”, then compute it
stratified**. In R you can also draw the stratified structure with `mosaicplot(UCBAdmissions)` and
`fourfoldplot(margin.table(UCBAdmissions, c(1, 2)))`.

### 6. Checking correlation against regression

```r
fit <- lm(Petal.Length ~ Sepal.Length, data = iris)
coef(fit)
#  (Intercept) Sepal.Length
#    -7.101443     1.858433
summary(fit)$r.squared          # 0.7599546

r <- cor(iris$Sepal.Length, iris$Petal.Length)
r^2                             # 0.7599546 — exactly equal to the regression's R²
r * sd(iris$Petal.Length) / sd(iris$Sepal.Length)   # 1.858433 — that is the regression slope b
```

How to read the output: three lines of code nail down the relationship between “correlation” and
“regression” —

- The slope from `coef(fit)` is $b = 1.858$, in units of “cm of petal length / cm of sepal length”,
  **dimensional**; the correlation coefficient $r = 0.8718$ is **dimensionless**. One relationship, two
  different rulers.
- $r^2 = 0.7600$ is **exactly the same** as the regression's `R-squared`, because it is the same thing:
  **76%** of the variation in petal length can be explained by sepal length, and the remaining 24% belongs
  to other factors and random error. Remember: “**$r^2$ speaks of the proportion explained, $r$ speaks of
  direction and closeness**”.
- The line $b = r\,s_y/s_x$ verifies the conversion formula. So $r$ and $b$ necessarily have the same sign,
  and the tests of $b = 0$ and of $\rho = 0$ give the same $P$ value.
- But **it is regression that can predict**: $r$ only tells you “the longer the sepal the longer the
  petal”, whereas regression can work out “how long the petal is expected to be when the sepal is 6.0 cm”.
  To ask for a predicted value, use `predict(fit, data.frame(Sepal.Length = 6))`.

## Common pitfalls

- **Computing $r$ without drawing the scatter plot.** This is the most expensive mistake in this chapter.
  Without the plot you cannot discover that the cloud is actually **curved** ($r$ is seriously
  underestimated, and you should use $r_s$ or apply a transformation first), cannot discover **two
  separate clumps** (you should analyze the groups separately), and cannot discover **outliers** (a single
  isolated point is enough to lift $r$ from 0.2 to 0.8, or conversely to destroy a real relationship).
  Remember: $r = 0$ says only that there is no **straight-line** relationship; a parabola or a U-shaped
  relationship also has $r = 0$.
- **Treating a $P$ value as the strength of the association, or treating $r$ as the conclusion.** The two
  things must be kept apart: **$P$ answers “is there an association”** (and is ruled by $n$ — with a large
  $n$, $|r| = 0.1$ can be significant; with a small $n$, $|r| = 0.8$ may be not significant), while **only
  $|r|$ or the contingency coefficient can answer “how strong is the association”**. The same holds on the
  contingency table side: $\chi^2 = 92.2$ with $P < 0.001$ looks impressive, but the contingency
  coefficient is only 0.141, which is in fact a weak association. **When reporting, the $P$ value and the
  effect size must always be given together.**
- **Computing correlations on variables where they should not be computed.** Categorical variables (blood
  type, sex) have no “magnitude” at all, any ranking is imposed by hand, and they cannot enter a Pearson
  correlation — in R, `cor(iris$Sepal.Length, iris$Species)` gives an error outright, because a factor is
  not a numeric vector. **Never do a correlation analysis between utterly unrelated variables either**:
  however pretty the $P$ value, it is only “a coincidence that a large sample can manufacture”, and
  reporting it reveals nothing but a misunderstanding of the method.
- **Pooling stratified data naively, or drawing a causal conclusion as soon as you see an association.**
  These are in fact two versions of the same mistake. An association computed from pooled data may be
  fully explained by a third variable or even reversed (`UCBAdmissions`'s $OR$ goes from 1.84 when pooled
  to around 1 in every department after stratification, with department A even reversing); and even if the
  association survives stratification, it still only says “they vary together”. **The chain of evidence
  that causation needs is temporal order + strength of association + dose–response + consistency +
  biological plausibility + intervention trials**, and correlation analysis supplies only a small piece of
  it. An association at the group level also cannot be extended to individuals (the ecological fallacy).
- **Mixing up the two kinds of $2 \times 2$ table, or computing an RR from a case-control study.** A
  completely randomized design's $2 \times 2$ table (two different groups of people, each looked at once)
  uses `chisq.test()`; a **paired $2 \times 2$ table where the same subjects are measured twice** (the
  same specimens on two media, the same people with two diagnostic tests) must switch to **McNemar's
  test** (`mcnemar.test()`), and using an ordinary chi-square throws the pairing information away entirely.
  Also, **a case-control study cannot produce an $RR$** — the numbers of cases and controls are fixed by
  the investigator, the true incidence cannot be known, and only the $OR$ can be reported; and reading the
  $OR$ of a common outcome directly as an $RR$ exaggerates the effect (in this chapter's example
  $OR = 1.84$, $RR = 1.47$).
- **Using the wrong distribution for the test and the interval estimate of a correlation.** When
  $\rho \ne 0$ the sampling distribution of $r$ is skewed, so the confidence interval of the population
  correlation coefficient **cannot** be forced out of $r \pm 1.96S_r$; it must go through the
  transformation $z_r = \frac{1}{2}\ln\frac{1+r}{1-r}$, whose standard error is $1/\sqrt{n-3}$, **not**
  $n-2$ and not $n-1$. In R the easiest thing is to read the `95 percent confidence interval` printed by
  `cor.test()`. In addition, `chisq.test()` on a $2 \times 2$ table carries the Yates correction by
  default, which differs from the uncorrected value of the textbook formula; say clearly which one you are
  reporting.

## How it connects to the other courses

::: tip Related pages
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/en/intro-it/9-base-graphics)**
  — “Exercise 8” of that lecture draws a scatter plot of `Girth` against `Volume` in `trees` with `plot()`,
  practising the parameters `pch`, `cex`, `col`, and `lwd`; this chapter is about **why the scatter plot is
  a step in correlation analysis that cannot be skipped** — only the plot can tell you whether the cloud
  is straight or curved, whether there are outliers, and whether there are two clumps, while $r$ throws
  all of that information away. How to tune the parameters is in that lecture; how to judge what you see is
  in this chapter.
- **[Lecture 14 of *Introduction to Information Technology*, Tests of Homogeneity and Contingency Tables](/en/intro-it/14-goodness-of-fit-and-contingency)**
  — that lecture performs in R **every computational action** of the contingency table part of this
  chapter: building a table with `matrix()`, the test of independence with `chisq.test()`, small cells with
  `fisher.test()`, paired data with `mcnemar.test()`. The difference is one of **standpoint**: that lecture
  cares about “how to write the code and how to read the $P$ value”, while this chapter cares about “under
  what design this $\chi^2$ was computed, what exactly $H_0$ is testing, and how strong the association is
  once it is significant”. Note in particular that that lecture draws a clear line between “the
  chi-square test says ‘there is an association’” and “the Kappa test says ‘how much agreement there
  is’”; the contingency coefficient of this chapter solves exactly the same kind of problem — **after
  significance you still have to give a strength**.
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)**
  — “Exercise 3, correlation analysis” of that week uses `corrgram` to draw a multivariate correlation
  matrix plot (the upper triangle `panel.conf` draws confidence ellipses, the lower triangle `panel.pie`
  draws pie charts), then checks the coefficients on the plot with `cor()`. That is the hands-on version in
  R of this chapter: **one `corrgram` plot = this chapter's scatter plot matrix + correlation matrix**.
  That week emphasizes “drawing the plot and reading the coefficients out”; this chapter supplies the
  theoretical side — when to use Spearman rather than Pearson, what it means that there is no $P$ value in
  a correlation matrix, and how large $|r|$ has to be to count as “strong”.
- **[Week 3 of *Medical Big Data Analysis and Decision Making*, Regression Analysis](/en/Medical-Big-Data-Analysis/3-regression)**
  — that week runs `lm()` and `glm()` from beginning to end, and this chapter's “Correlation and
  regression” section clears up the relation between the two: $b = r\,s_y/s_x$, $r^2$ equals the
  regression's `R-squared`, and the tests of $b = 0$ and of $\rho = 0$ give the same $P$ value.
  **Correlation does not distinguish an explanatory variable from a response variable; regression does** —
  every `lm()` in that week has to name the dependent variable on the left of the `~` (`lm(ucr ~ age)`,
  `lm(Y ~ XP)`, `lm(lnY ~ X)`), and once the direction is fixed the meaning of the slope is fixed with it;
  whereas this chapter's `cor()` gives the same result whatever the order, and that difference is the
  boundary between the two routes. In addition, the nonlinear regression (`poly()`) of that week and this
  chapter's pitfall of “a curved cloud, with $r$ underestimated” are two solutions to one and the same
  thing: there you add a model, here you switch to $r_s$.
- **[Week 4 of *Medical Big Data Analysis and Decision Making*, Association Rules](/en/Medical-Big-Data-Analysis/4-association-rules)**
  — that week mines `support` / `confidence` / `lift` with `apriori()`, while this chapter uses $\chi^2$
  and the contingency coefficient. **What they share**: both are looking for “associations between
  variables”, and both deal with **categorical variables**; `lift` is in the same spirit as this chapter's
  $OR$ (both are “how many times higher than under independence”, and lift = 1 and OR = 1 both mean no
  association). **Where they differ**: `apriori()` **searches** through a pile of items (variables) for
  “which rules are worth looking at” and outputs a set of rules (A ⇒ B); the number of variables can be
  large, but each rule involves only a few of them. This chapter **specifies in advance** two variables,
  judges whether they are independent, and gives an effect size that can be explained as “how many times
  the risk”. The $\chi^2$ here **cannot give you rules** — it does not tell you about a specific
  combination such as “people who buy diapers also buy beer”, only whether the two columns deviate
  systematically from independence. Conversely, change the `support` threshold of `apriori` and all the
  rules change, whereas the $\chi^2$ tests one and the same hypothesis. **To find rules, use that week; to
  test a hypothesis and report a $P$ value and an $OR$, use this chapter.**
- **[Chapter 11 of *Health Statistics*, Nonparametric and Rank-Based Tests](/en/Health-statistics/11-nonparametric)** — that chapter has already introduced Spearman's rank correlation as a member of the “rank
  method family” (and states explicitly that “the full treatment is in Chapter 12”). This chapter supplies
  its **bivariate association** side: the details of assigning ranks, the correction formula for tied
  ranks, the table lookup for $n \le 50$ and the $z$ test for $n > 50$, and the division of labor between
  it and the Pearson correlation — **$r$ asks about “straight line”, $r_s$ asks about “monotone”**. That
  chapter also gives the correction coefficient this chapter needs,
  $C = 1 - \frac{\sum(t_j^3-t_j)}{N^3-N}$; the same trouble with “ties” is handled on both sides.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/12-bivariate-association
once translated; for now the Chinese page /Health-statistics/12-bivariate-association) from:
- /intro-it/9-base-graphics, at "Exercise 8: drawing a scatter plot with the plot function", add "why the
  scatter plot cannot be skipped in correlation analysis (judging straightness/curvature, outliers, group
  structure), see Chapter 12 of Health Statistics".
- /intro-it/14-goodness-of-fit-and-contingency, at "Exercise 6: significance test for a contingency table"
  and at the tip "paired data needs McNemar", add "for the difference between association analysis and the
  comparison of two sample rates, and for how to give the strength of an association once it is
  significant (the contingency coefficient, OR/RR), see Chapter 12 of Health Statistics".
- /Medical-Big-Data-Analysis/2-data-preprocessing, at "Exercise 3, correlation analysis", add "for the
  conditions for choosing Pearson versus Spearman, and for reading a scatter plot and outliers, see
  Chapter 12 of Health Statistics".
- /Medical-Big-Data-Analysis/3-regression, where "the relation between the regression coefficient and the
  correlation coefficient / R²" is discussed, add "for the meaning of b = r·s_y/s_x and r², and for the
  difference between correlation and regression, see Chapter 12 of Health Statistics".
- /Medical-Big-Data-Analysis/4-association-rules, where "the meaning of lift" is discussed, add "lift and
  the odds ratio OR both mean 'how many times higher than under independence'; for the statistical
  background of the OR see Chapter 12 of Health Statistics".
- /Health-statistics/11-nonparametric, where "Spearman's rank correlation: pointing to Chapter 12" is
  discussed, add a clickable link to this chapter.
-->

## Summary

- **First branch by variable type**: two quantitative variables → scatter plot + **Pearson product-moment
  correlation**; not bivariate normal, or ordinal variables, or extreme values → **Spearman's rank
  correlation**; two qualitative variables → **contingency table + $\chi^2$ + contingency coefficient +
  OR/RR**. One quantitative and one qualitative is not this chapter (that is group comparison or
  regression).
- **Pearson correlation**: $r = \frac{l_{xy}}{\sqrt{l_{xx}l_{yy}}}$, **without units**, $-1 \le r \le 1$,
  **the sign gives the direction and the absolute value gives the closeness**; it requires both variables
  to be quantitative and to follow a **bivariate normal** distribution, and the two variables are **on an
  equal footing**. $r$ measures a **straight-line** relationship — $r = 0$ says only that there is no
  straight-line relationship, not that there is no relationship, which is why **the scatter plot has to be
  drawn first**.
- **Inference for $r$**: $t_r = \frac{r}{S_r}$, $S_r = \sqrt{\frac{1-r^2}{n-2}}$, $\nu = n-2$; the
  confidence interval of the population correlation coefficient first needs the
  $z_r = \frac{1}{2}\ln\frac{1+r}{1-r}$ transformation, whose standard error is $1/\sqrt{n-3}$, and is
  transformed back afterwards. **Spearman** uses $r_s = 1 - \frac{6\sum d^2}{n(n^2-1)}$ (with many tied
  ranks, the corrected formula containing $T = \frac{\sum(t^3-t)}{12}$), with a table lookup for $n \le 50$
  and $z = r_s\sqrt{n-1}$ for $n > 50$, and measures a **monotone** relationship.
- **Contingency table**: $\chi^2 = \sum\frac{(A-T)^2}{T}$, $T_{ij} = \frac{n_im_j}{n}$,
  $\nu = (R-1)(C-1)$, and $H_0$ is “the two variables are mutually independent” (the formula and the
  conditions for use are in Chapter 10). $\chi^2$ inflates along with $n$, so it **can only say whether
  there is an association**; for strength you need the **contingency coefficient**
  $r = \sqrt{\frac{\chi^2}{\chi^2+n}}$ (its upper limit depends on the numbers of rows and columns, so it
  cannot be compared across tables). For risk you need **$RR = \frac{a/(a+b)}{c/(c+d)}$** (the ratio of
  rates, usable in cohort studies and RCTs) or **$OR = \frac{ad}{bc}$** (the ratio of odds, the main index
  of a case-control study). **When the outcome is rare $OR \approx RR$; when the outcome is common the $OR$
  exaggerates the $RR$**, and both must be reported with confidence intervals.
- **Correlation and regression are two routes**: in correlation the two variables are **equal**, $r$ has no
  units, and prediction is impossible; in regression a response variable is distinguished from an
  explanatory variable, $b$ has units, and prediction is possible. The connection is
  $b = r\frac{s_y}{s_x}$, and $r^2$ is the coefficient of determination of the regression (the proportion
  of the variation in $y$ that can be explained by $x$).
- **Correlation is not causation** — the most important conclusion of this page. An association may come
  from “$x \to y$”, from “$y \to x$”, or from “a third variable influencing both”; pooling stratified data
  can even reverse the association (Simpson's paradox, with `UCBAdmissions` as a ready-made example), and
  an association at the group level cannot be carried over to the individual (the ecological fallacy).
  $P < 0.05$ only says “this does not look like sampling error”; it does not rule out confounding and it
  does not establish the temporal order. **To speak of causation you have to look at temporal order,
  strength of association, dose–response, consistency, and biological plausibility, and ultimately rely on
  intervention trials or dedicated methods of causal inference.**

<TrackList :tasks="['State the two routes of this chapter and decide which one a given data set should take', 'Read a scatter plot with plot() and say whether Pearson or Spearman should be used', 'Run cor(), cor.test(), and pairs() on iris / mtcars and interpret the P value and confidence interval correctly', 'Explain why the confidence interval of the population correlation coefficient has to go through the z_r transformation, with standard error 1/√(n-3)', 'Compute chi-square, the contingency coefficient, the OR, and the RR on UCBAdmissions', 'Compute the OR stratified by department and use Simpson’s paradox to explain the danger of “pooled data”', 'Distinguish the three differences and the two connections between correlation and regression (b = r·s_y/s_x, r² = R²)', 'Give at least three situations in which “correlation is not causation” arises, and how to deal with each of them']" />
