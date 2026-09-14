---
layout: doc
title: '13. Simple Linear Regression'
---

# Chapter 13. Simple Linear Regression

::: info Translation status
Translated from the [Chinese original](/Health-statistics/13-linear-regression). Numbers, formulas, and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The previous chapter's linear correlation answered “are the two variables related, and how closely”;
> this chapter answers “how much does one variable change on average for each unit change in the other,
> and can that be used to predict” — fixing a straight line out of the data, testing it, quantifying how
> much variation it explains, and finally checking whether this line should be used at all.

## What this chapter is for

Medical research often meets **two variables that have both been measured as numbers**: body weight and
transverse cardiac diameter in 8-year-old boys, petal length and sepal length, car speed and braking
distance, car weight and miles per gallon. Data of this kind are called bivariate data: every
observational unit has two measurements at the same time, and both variables are continuous random
variables.

The correlation analysis of Chapter 12 can already answer half of those questions: whether there is a
straight-line relationship between them, how close that relationship is, and whether it is positive or
negative. But what clinical and public health work really wants to know is often the other half:

- For every 1 kg increase in body weight, by how much does the transverse cardiac diameter increase
  **on average**, in centimeters? — this is a **quantitative dependence relationship**, and it needs a
  coefficient with units, whereas $r$ is dimensionless.
- Given that a child weighs 25.0 kg, roughly what range is his transverse cardiac diameter in? — this
  is **prediction**, and correlation analysis cannot produce that number.
- To keep the concentration of some airborne pollutant below a limit, how much should car traffic be
  kept within? — this is **statistical control**, which is prediction used the other way round.

Answering these three questions needs a **straight-line equation** $\hat y = a + bx$, and three things
around it: **how to fix the line** (the least squares method), **whether the line holds in the
population** (hypothesis testing), and **how trustworthy it is and how far it can be pushed**
(interval estimation, residual diagnostics, range of applicability). This chapter unfolds in that
order.

> The word “regression” comes from 19th-century studies of the heights of fathers and sons: the sons of
> tall fathers are usually taller than the average person, but usually not taller than their fathers;
> the sons of short fathers are usually shorter than the average person, but usually not shorter than
> their fathers — the offspring's heights “move toward” the average level, and so it was called
> regression. Today the word has broadened, and refers generally to the analytical methods that
> **build a model of the relationship between variables**.

<TrackList :tasks="['Explain the difference and the connection between correlation and regression', 'Work out a and b by hand with the least squares method', 'Read the results of a regression test from an analysis of variance table', 'Explain the meaning and the boundaries of R²', 'Read a residual plot and judge whether the assumptions hold']" />

## Core concepts

### The first hurdle: the difference and the connection between linear correlation and linear regression

This is the place in this chapter where confusion comes easiest, so let us get it completely clear in
one go. Both analyzes use the same batch of $(x, y)$ data, and the scatterplot is the same one too, but
**the question is posed differently**, and so the requirements on the variables, the meaning of the
indices, and the conclusions that can be drawn are all different.

| Item of comparison | Linear correlation | Linear regression |
| --- | --- | --- |
| Status of the variables | $x$ and $y$ are **on an equal footing**; both are random variables | A **dependent (response) variable $y$** is distinguished from an **independent variable $x$**; they are not on an equal footing, and $y$ varies with $x$ |
| Data requirements | Requires $x$ and $y$ to follow a **bivariate normal distribution** | Requires only that $y$ is a random variable from a normal population; $x$ may be a random variable (type II regression), or a value that is precisely measured or strictly controlled (type I regression) |
| Statistical meaning | Reflects a **concomitant relationship**, which is mutual and symmetric and need not involve causation | Reflects a **dependence relationship**, which has a direction; usually the “cause”, or the one easier to measure and less variable, is taken as the independent variable |
| Aim of the analysis | To express the **direction and closeness** of the straight-line relationship by a statistical index | To express the relationship between $x$ and $y$ **quantitatively as a functional formula**, and to use it for prediction and control |
| Core index | Correlation coefficient $r$: dimensionless, $-1 \le r \le 1$ | Regression coefficient $b$ (slope) and intercept $a$: $b$ has units, namely **units of $y$ / units of $x$** |
| Exchanging $x$ and $y$ | $r$ is **unchanged** (symmetric) | The equation **changes**: taking $y$ as the independent variable and regressing $x$ on it gives slope $b\,l_{xx}/l_{yy}$, with a different meaning |
| Hypothesis test | $H_0:\rho=0$, statistic $t_r$, $\nu=n-2$ | $H_0:\beta=0$, statistic $t_b$ or $F$; the two are equivalent |
| Graphic | Scatterplot, looking at shape and trend | Scatterplot **+ a regression line** |
| Conversion into each other | $r = \dfrac{l_{xy}}{\sqrt{l_{xx}l_{yy}}}$ | $b = r\sqrt{\dfrac{l_{yy}}{l_{xx}}}$, $a = \bar y - b\bar x$ |

**Four connections** (one sentence each; often examined):

1. **The same direction**: for the same data, $r$ and $b$ necessarily have the same sign.
2. **Equivalent hypothesis tests**: for the same sample $t_r = t_b$, and both equal $\sqrt{F}$. Because
   testing $b$ is the more cumbersome process (it requires computing $S_{y\cdot x}$ first), in practice
   one often **uses the test of $r$ in place of the test of $b$** — but one should know that they test
   the same thing.
3. **Mutually convertible**: $r$ and $b$ can be converted back and forth using $l_{xx}$ and $l_{yy}$,
   so the information the two carry overlaps.
4. **Using regression to explain correlation**: the **coefficient of determination** $R^2$ of a simple
   regression is numerically equal to $r^2$.

The last point is especially important: it translates “how close is the correlation” into plain words:
**$r^2 = SS_{\text{reg}}/SS_{\text{total}}$, that is, the proportion of the total variation in $y$ that
can be explained by $x$**. The closer the regression variation comes to the total variation, the closer
$r$ and $R^2$ come to 1.

### The simple linear regression equation and its two coefficients

**Simple linear regression (linear regression)** is the statistical analysis method that uses a
straight-line regression equation to express the quantitative dependence between two numeric variables,
and it belongs to the category of bivariate analysis. The general form of the equation is:

$$ \hat y = a + bx $$

The meanings of the three symbols must be distinguished clearly:

- $\hat y$ (read as y-hat): when $x$ takes some fixed value $x_0$, the estimate of the **population
  mean** of $y$. Note that what it estimates is “the average of $y$ over all people at that level of
  $x$”, **not the $y$ of any single individual**. This distinction will later become two different
  intervals in interval estimation (the confidence interval and the tolerance interval).
- $a$: the **intercept**, the ordinate of the point where the regression line, or its extension, meets
  the $y$ axis, that is, the estimate of $y$ when $x=0$. The units of $a$ are the same as those of $y$.
  **Only when $x$ can take the value 0 (or 0 is meaningful in subject-matter terms) does $a$ have a
  practical meaning**; in a case like “the sepal length when petal length = 0”, $a$ is just a number
  that puts the line in the correct position, and need not be interpreted.
- $b$: the **regression coefficient**, also called the **slope**. Its meaning is: **for every 1-unit
  change (increase) in $x$, $y$ changes by $b$ units on average**. $b>0$ means $y$ increases on average
  as $x$ increases, and $b<0$ means it decreases on average. The units of $b$ are units of $y$ / units
  of $x$ (for example cm/kg).

The two words “on average” cannot be dropped: the regression line describes how the conditional mean
changes with $x$, and individual values still fluctuate above and below the line.

### Finding a and b by the least squares method

There are infinitely many straight lines through the scattered points in the plane; how does one decide
which is the “best” one? The criterion is: **make the sum of the squared vertical distances from the
observed points to the line as small as possible**.

$$ Q = \sum_{i=1}^{n}(y_i - \hat y_i)^2 = \sum_{i=1}^{n}\left(y_i - a - bx_i\right)^2 \;\longrightarrow\; \min $$

This is the **least squares method**. Two details are worth pausing over:

- Why **square**? Without squaring, positive and negative deviations would cancel each other out, and
  even a terrible line could give $\sum(y_i-\hat y_i)=0$. The name “least squares” comes from those
  squares.
- Why measure the **vertical** distance (along the $y$ axis) rather than the perpendicular distance
  from the point to the line? Because we want to use $x$ to predict $y$: **the error occurs in the $y$
  direction**, and $x$ is given. So the deviation is defined as $y - \hat y$.

Differentiating $Q$ with respect to $a$ and $b$ separately, setting the derivatives to 0 and solving
gives:

$$ b = \frac{l_{xy}}{l_{xx}} = \frac{\sum (x-\bar x)(y-\bar y)}{\sum (x-\bar x)^2}, \qquad a = \bar y - b\bar x $$

Here $l_{xy}$ is the **sum of products of deviations from the mean** of $x$ and $y$, and $l_{xx}$,
$l_{yy}$ are the respective **sums of squares of deviations from the mean**; in actual computation the
following set of formulas is used (it avoids finding every deviation first, and also avoids the loss of
precision from subtracting large numbers):

$$ l_{xx} = \sum x^2 - \frac{(\sum x)^2}{n},\qquad
   l_{xy} = \sum xy - \frac{(\sum x)(\sum y)}{n},\qquad
   l_{yy} = \sum y^2 - \frac{(\sum y)^2}{n} $$

From $a = \bar y - b\bar x$ one immediately gets another way of writing the equation:

$$ \hat y = \bar y + b(x - \bar x) $$

This form explains something very useful when drawing: **the regression line necessarily passes through
the point $(\bar x, \bar y)$**. To draw the line, just take two $x$ values that are far apart and
convenient to read, compute the corresponding $\hat y$, and join them up; extending the line to the left,
the ordinate of its intersection with the vertical axis should be exactly $a$ — if it does not match,
the drawing is wrong. Also, **the line drawn should not go beyond the observed range of $x$**.

### Assumptions for use: LINE

Simple linear regression cannot be used just as it comes: the data must satisfy four conditions, whose
initials make up **LINE**:

| | Condition | Meaning |
| --- | --- | --- |
| **L** | Linear | $x$ and $y$ really do show a straight-line trend |
| **I** | Independent | any two observations are independent of each other (individuals do not influence one another) |
| **N** | Normal | given $x$, $y$ follows a normal distribution |
| **E** | Equal variance | for different given values of $x$, the conditional variance of $y$ is the same |

The requirements on the variables need to be stated in a little more detail:

- **$y$ must be a random variable from a normal population**;
- $x$ has two cases: in **type I regression**, $x$ is a value that changes in a regular way, or is
  chosen by the investigator, precisely measured and strictly controlled (such as the dose set for an
  animal); in **type II regression**, $x$ is also a random variable, and then $x$ and $y$ are required
  to follow a **bivariate normal distribution**. In the examples of this book $x$ and $y$ are mostly
  random variables, so they belong to type II regression.

When the requirements are departed from slightly, the effect on the estimates of $a$ and $b$ is usually
not large, but it does affect the estimate of the standard deviation, and hence the truthfulness of the
$P$ value. So the conditions are not formalism: they determine whether your $P$ value can be believed.

### Testing the regression equation: analysis of variance

A result such as a sample regression coefficient $b=0.2041$ may come from two situations: ① the
population regression coefficient $\beta = 0$, and sampling error alone made $b \ne 0$; ② a regression
relationship really exists. So $H_0:\beta=0$ has to be tested. There are two methods; look at
**analysis of variance** first.

The basic idea is to split the **total variation** in $y$. For any point $P$ on the scatterplot, its
distance from the mean $\bar y$ can be split into two parts:

$$ y - \bar y = (\hat y - \bar y) + (y - \hat y) $$

- $(\hat y - \bar y)$: the distance of the estimated value from the mean, **related to the size of the
  regression coefficient**. The larger $|b|$ is, the larger it is; when $b=0$ it is zero, and then
  $y - \bar y = y - \hat y$, that is, the regression line has helped not at all.
- $(y - \hat y)$: the vertical distance from the observed point to the regression line, that is, the
  **residual**.

Splitting every point in this way, squaring both sides and summing (the cross term is exactly zero)
gives the decomposition of the sums of squares:

$$ SS_{\text{total}} = SS_{\text{reg}} + SS_{\text{res}} $$

| Symbol | Name | Intuitive meaning |
| --- | --- | --- |
| $SS_{\text{total}} = \sum (y-\bar y)^2$ | total sum of squares | the variation of $y$ when $x$ is ignored completely, made up of individual differences and measurement error |
| $SS_{\text{reg}} = \sum (\hat y - \bar y)^2$ | regression sum of squares | the part of the total variation that **can be explained by the straight-line relationship between $x$ and $y$**; the larger it is, the better the regression works |
| $SS_{\text{res}} = \sum (y - \hat y)^2$ | residual sum of squares | variation caused by everything outside the linear influence, that is, the part **that cannot be explained by $x$** |

The degrees of freedom decompose in the same way, and are very simple to compute:

$$ \nu_{\text{total}} = n-1,\qquad \nu_{\text{reg}} = 1,\qquad \nu_{\text{res}} = n-2 $$

How the three sums of squares are computed (the last two are both derived from the first):

$$ SS_{\text{total}} = l_{yy},\qquad
   SS_{\text{reg}} = b\,l_{xy} = \frac{l_{xy}^2}{l_{xx}},\qquad
   SS_{\text{res}} = SS_{\text{total}} - SS_{\text{reg}} $$

The test statistic is the ratio of the two mean squares:

$$ F = \frac{MS_{\text{reg}}}{MS_{\text{res}}} = \frac{SS_{\text{reg}}/\nu_{\text{reg}}}{SS_{\text{res}}/\nu_{\text{res}}},\qquad
   F \sim F(1,\ n-2) $$

$SS_{\text{reg}}/SS_{\text{res}}$ reflects how well the regression works: if all the observed points fell
on the regression line, then $SS_{\text{total}} = SS_{\text{reg}}$ and $SS_{\text{res}} = 0$, a perfect
fit; when the fit is poor, $SS_{\text{reg}}$ becomes relatively smaller and $SS_{\text{res}}$ relatively
larger, so $F$ is small. Arranging the results into an **analysis of variance table** (taking the
textbook example with $n=13$ and $F=43.39$):

| Source of variation | SS | ν | MS | F | P |
| --- | --- | --- | --- | --- | --- |
| Total | 4.1923 | 12 | | | |
| Regression | 3.3444 | 1 | 3.3444 | 43.39 | <0.01 |
| Residual | 0.8479 | 11 | 0.0771 | | |

Looking up the table of $F$ critical values gives $P<0.01$; at the $\alpha=0.05$ level $H_0$ is rejected,
and a straight-line relationship between the two variables is considered to exist.

### Testing the regression equation: the t test

The second method tests the regression coefficient itself directly. Since $b$ is a point estimate of
$\beta$, it too has sampling error, with standard error:

$$ S_b = \frac{S_{y\cdot x}}{\sqrt{l_{xx}}},\qquad
   S_{y\cdot x} = \sqrt{\frac{SS_{\text{res}}}{n-2}} = \sqrt{MS_{\text{res}}} $$

where $S_{y\cdot x}$ is called the **residual standard deviation**; it refers to the variation remaining
in $y$ after the linear influence of $x$ on $y$ has been removed, and is used to measure the precision of
the estimate $\hat y$ — **the smaller $S_{y\cdot x}$ is, the more precise the estimates from the
regression equation**. The statistic is:

$$ t = \frac{b-0}{S_b},\qquad \nu = n-2 $$

The hypotheses, the level and the inferential steps are exactly the same as in any hypothesis test:
$H_0:\beta=0$ (there is no straight-line relationship between the two variables), $H_1:\beta \ne 0$,
$\alpha=0.05$; look up the table of $t$ critical values with $\nu=n-2$ to determine $P$; reject $H_0$ if
$P \le \alpha$.

The relationship between the two methods must be remembered: **analysis of variance and the $t$ test are
equivalent, with $F = t^2$**. In the example above $F = 43.39$, whose square root is about 6.59 — exactly
the $t$ value computed by the $t$ test. One more point: for the same data **$t_r = t_b = \sqrt{F}$** — the
three numbers are really one thing.

> While we are at it, the difference between the two kinds of test should be made clear: **a test of the
> regression equation** infers whether the regression coefficients in the population are **all 0**,
> whereas **a test of a regression coefficient** infers separately whether **each** coefficient is 0.
> Simple linear regression has only one regression coefficient, so the two are in substance equivalent;
> in multiple linear regression the two come apart, and that is covered in Week 3 of *Medical Big Data Analysis and Decision Making*.

### The coefficient of determination R²

Now that the total variation has been split into two parts, it is natural to ask: how much has $x$
explained? That proportion is the **coefficient of determination**:

$$ R^2 = \frac{SS_{\text{reg}}}{SS_{\text{total}}} = \frac{l_{xy}^2/l_{xx}}{l_{yy}} = \frac{l_{xy}^2}{l_{xx}l_{yy}} = r^2 $$

Its reading is: **the proportion of the total variation in $y$ that is explained by the straight-line
relationship between $x$ and $y$**. Its range is $0 \le R^2 \le 1$:

- $R^2 = 0.76$ means “76% of the variation in $y$ can be explained by the linear relationship with $x$,
  and the remaining 24% is due to other factors and to error”;
- $R^2 = 1$ means that all the observed points lie on the regression line;
- $R^2 = 0$ means that the line is of no use at all.

Three boundaries must be remembered at the same time:

1. **In simple regression $R^2 = r^2$**, so it can be verified directly from the correlation coefficient
   and is not new information; but in multiple regression $R^2$ no longer equals any single $r^2$, and
   that is when it becomes the most commonly used index of evaluation.
2. **A large $R^2$ does not mean accurate prediction**. $R^2$ is a **relative** index: it only says what
   proportion of the variation within the observed range of the independent variable is explained; an
   equation with a very high $R^2$ may still have a considerable absolute error when predicting an
   individual — that depends on $S_{y\cdot x}$.
3. **$R^2$ has nothing to do with causation**. It is only an “explained proportion”, and the narrower
   the observed range of the independent variable, the more easily $R^2$ tends to be raised.

### Interval estimation of the population regression coefficient β

$b$ is a point estimate of $\beta$, and an interval estimate still has to be given:

$$ \left(b - t_{\alpha/2,\nu}S_b,\quad b + t_{\alpha/2,\nu}S_b\right),\qquad \nu = n-2 $$

Example: $b=0.2041$, $S_b=0.03098$, $\nu=11$, $t_{0.05/2,11}=2.201$, so the 95% confidence interval for
$\beta$ is $(0.1359,\ 0.2723)$. This interval is useful in two ways: first, it gives the range of the
precision of the regression coefficient (the narrower the interval the more precise; the larger $n$ is,
the smaller $S_{y\cdot x}$ is and the larger $l_{xx}$ is, the narrower the interval); second, **if the
interval does not contain 0, the conclusion agrees with $P<0.05$ from the $t$ test**.

### Confidence interval for the conditional mean and tolerance interval for an individual y value

These two kinds of interval are the place in this chapter where one thing is most easily mistaken for
the other, because the forms are almost identical while the uses are completely different.

**(1) $\mu_{\hat y}$: the conditional population mean of $y$ when $x_0$ is given.** Its confidence
interval is:

$$ \left(\hat y - t_{\alpha/2,\nu}S_{\hat y},\quad \hat y + t_{\alpha/2,\nu}S_{\hat y}\right),\qquad
   S_{\hat y} = S_{y\cdot x}\sqrt{\frac{1}{n} + \frac{(x_0-\bar x)^2}{l_{xx}}} $$

**(2) An individual $y$ value**: when $x_0$ is given, the range into which **a single individual's** $y$
will fall is given by the **tolerance interval**:

$$ \left(\hat y - t_{\alpha/2,\nu}S_{y},\quad \hat y + t_{\alpha/2,\nu}S_{y}\right),\qquad
   S_{y} = S_{y\cdot x}\sqrt{1 + \frac{1}{n} + \frac{(x_0-\bar x)^2}{l_{xx}}} $$

The two formulas differ only by that **1** inside the square root, but the difference is large: the
individual tolerance interval has to carry both the uncertainty of “the conditional mean is unknown” and
that of “the individual itself fluctuates about the mean”, so it is **much wider than the confidence
interval for the mean** (by roughly one $S_{y\cdot x}$). Which one to choose depends on whether the
question asks “on average” or “for one particular person”.

The two formulas have one more common feature worth noting: $(x_0-\bar x)^2$ appears inside the square
root, so

- **the interval is narrowest when $x_0 = \bar x$** (then $S_{\hat y} = S_{y\cdot x}/\sqrt{n}$, and
  prediction is relatively most precise), and $\bar x$ is exactly where the regression line passes
  through;
- the farther $x_0$ is from $\bar x$, the wider the interval; drawing the intervals as a family of
  curves gives a trumpet shape that narrows in the middle — this is also **the mathematical reason why
  extrapolated prediction is unreliable**.

### Using the regression equation: prediction and statistical control

Once the test is statistically significant ($P<\alpha$), the regression equation is a quantitative
expression of the dependence between the two variables and can be used for three things:

1. **Describing the dependence quantitatively**: $b$ gives “how much the average changes for each 1-unit
   change”, and $R^2$ gives the explained proportion.
2. **Prediction (forecast)**: substituting the **predictor** (the independent variable $x$) into the
   equation gives an estimate of the **predicted quantity** (the dependent variable $y$), together with
   the **tolerance interval** for an individual $y$ value. For example, for a child weighing 25.0 kg, one
   estimates that the transverse cardiac diameter has a 95% chance of lying within a certain range.
3. **Statistical control**: using it the other way round — **specifying the range of $y$ and controlling
   $y$ by controlling $x$** — so statistical control is the **inverse estimation** of the regression
   equation. For example, if the concentration of a pollutant is linearly related to traffic volume, and
   the concentration is to stay below a limit, then the limit is taken as $y$ and solved back for the
   upper bound on traffic volume.

Statistical control has to be done with a little more care: the $x$ obtained by simply substituting the
limit for $y$ into the equation and solving back is only a **point estimate**; the rigorous approach is
to **solve back using the upper limit of the one-sided tolerance interval for an individual $y$ value**
(when the sample is fairly large, $S_{y\cdot x}$ may be used to approximate $S_y$), and the control limit
for $x$ so obtained is more conservative, which is what guarantees “a 95% assurance of not exceeding the
limit”.

### Residual analysis and regression diagnostics

The equation has been computed and the test is significant, and there is one more step that is easily
skipped: **checking whether the four assumptions (LINE) hold**. The way to do it is to look at the
**residuals**.

The residual $e_i = y_i - \hat y_i$ is the difference between the observed value and the estimated value,
that is, the part the model failed to explain. The idea is ingenious: if the model is right, all that
should be left in the residuals is **formless random error**, with no pattern to be seen; **as soon as a
pattern can still be found in the residuals, that pattern has not yet been captured by the model** — and
the assumptions probably do not hold.

- A systematic departure in the residuals (a curve, say) → the linearity assumption (L) fails;
- the variance of the residuals changing with $\hat y$ (a funnel shape, say) → equal variance (E) fails;
- residuals that do not follow a normal distribution → normality (N) fails, and the reliability of the
  $P$ value and of the interval estimates declines.

**How to read a residual plot**: in R, `plot(fit)` gives four diagnostic plots at once; check each one
against the table below.

| Plot | x axis / y axis | What normal looks like | What abnormal tells you |
| --- | --- | --- | --- |
| Residuals vs Fitted | fitted values $\hat y$ / residuals | points scattered randomly above and below the 0 line, with no shape | a U-shaped or inverted-U bend → linearity fails; a funnel shape → unequal variances |
| Normal Q-Q | theoretical quantiles / standardized residual quantiles | points close to the 45° line | both ends turning up or bending down, a clear S shape → the residuals depart from normality |
| Scale-Location | fitted values $\hat y$ / $\sqrt{\text{standardized residual}}$ | a roughly horizontal band | rising or dipping as $\hat y$ increases → the conditional variance changes with the mean |
| Residuals vs Leverage | leverage $h_i$ / standardized residuals | points evenly distributed inside the band, none crossing the Cook's distance contour | a distant point that crosses the line → an **influential point**, removing which noticeably changes the coefficients |

**An outlier and an influential point are not the same thing**, and this is the layer most easily missed
in residual analysis:

- **An outlier**: a point whose $y$ value lies far from most of the others, usually showing up as a
  **particularly large residual** (a standardized residual whose absolute value is greater than 2 or 3 is
  worth checking one by one).
- **An influential point**: a point that has a large effect on the estimates of $a$ and $b$. Its
  characteristic is that $x$ is far from $\bar x$, so **the leverage $h_i$ is large** — such a point can
  drag the whole line over even when its residual is not large. To judge, look at the **leverage** and at
  **Cook's distance** (the latter combines the size of the residual and the leverage at once).
- Principle of handling: when a suspicious point is found, first **re-check** the measurement, the
  record and the data entry for errors. If it is confirmed to be wrong data, correct it or drop it; if
  the re-check finds no error, it is a genuinely existing observation, and one can only report it and
  explain it in the discussion, and must not delete it because it “looks bad”.

::: tip Why a scatterplot must be drawn first
Anscombe's quartet (`anscombe` in R) is the best-known piece of evidence: for the four data sets the mean
of $x$, the mean of $y$, the regression coefficient and the correlation coefficient are **almost exactly
the same**, yet when plotted one is a decent straight-line relationship, one is clearly a curve, one is
dominated by a single outlier, and in one all the points are crowded at the same $x$. **An analysis that
only computes and never looks will never discover the last three situations.** This is also why this
chapter keeps insisting “draw the scatterplot first”.
:::

### Points to note in simple linear regression

1. **It must have practical meaning.** Two phenomena that are quite unrelated must not be taken at will
   for regression analysis; even when a regression relationship really does exist between two variables,
   it is **not necessarily a causal relationship** and must be interpreted together with subject-matter
   knowledge.
2. **Mind the assumptions for use.** In general $y$ is required to be a random variable from a normal
   population; $x$ may be a normal random variable, or a precisely measured, strictly controlled value.
   When the conditions are departed from slightly the effect on the estimates of $a$ and $b$ is not
   large, but it does affect the estimate of the standard deviation, and hence the truthfulness of the
   $P$ value.
3. **Draw the scatterplot first.** Only when it suggests a straight-line trend should simple linear
   regression be done; if the trend is clearly not a straight line, a suitable **curve model** should be
   chosen according to the pattern of the scatter, turned into linear regression by transforming the
   variables, or a nonlinear regression method used directly (this part is done in the Week 3 exercise
   of *Medical Big Data Analysis and Decision Making*). Forcing out a regression equation when the
   linear condition is clearly not satisfied is meaningless.
4. **Outliers must be re-checked promptly.** When the scatterplot shows an extreme value far too large
   or too small, first check whether it is a measurement, recording or data-entry error; data confirmed
   to be wrong should be corrected or dropped. **Outliers noticeably affect the estimates of $a$ and
   $b$.**
5. **Avoid extrapolation.** The range of applicability of a regression equation is in general limited
   to the observed range of the independent variable $x$: finding $\hat y$ inside that range is called
   **interpolation**, and going beyond the range is called **extrapolation**. Without sufficient reason
   to show that the straight-line relationship still holds outside the range, one should not extrapolate
   freely.
6. **A significant test does not mean a strong relationship.** $P<\alpha$ only says that $\beta \ne 0$;
   how strong the relationship is depends on the confidence interval for $b$ and on $R^2$. With a very
   large sample, a very small $b$ with no clinical meaning may also give $P<0.05$.

## Doing it in R

There is only one core function for simple linear regression in R: `lm()` (linear model). Below, R's
built-in `iris`, `cars` and `mtcars` are used to go through the whole workflow. **Note that the formula
in `lm(y ~ x, data = ...)` is written as “dependent variable ~ independent variable”**, with the one to
be predicted on the left.

### Step 1: draw the scatterplot first

```r
# iris: sepal length (Sepal.Length) and petal length (Petal.Length)
plot(Sepal.Length ~ Petal.Length, data = iris,
     xlab = "Petal length (cm)", ylab = "Sepal length (cm)",
     pch = 19, col = "steelblue")

# Anscombe's quartet: the four groups' regression results are almost the same, the graphs completely different
par(mfrow = c(2, 2))
for (i in 1:4) {
  x <- anscombe[[i]]; y <- anscombe[[i + 4]]
  plot(x, y, pch = 19, xlab = paste0("x", i), ylab = paste0("y", i),
       xlim = c(3, 20), ylim = c(3, 13))
  abline(lm(y ~ x), col = "red")          # draw each group's own regression line
}
par(mfrow = c(1, 1))                       # remember to restore the default one-plot screen afterwards

# the four groups' slopes and correlation coefficients are almost identical
sapply(1:4, function(i) {
  x <- anscombe[[i]]; y <- anscombe[[i + 4]]
  c(b = coef(lm(y ~ x))[2], r = cor(x, y))
})
```

The $b$ of all four groups is around 0.50 and the $r$ around 0.816, but on the plots: group 1 is a decent
straight-line relationship, group 2 is clearly a curve, group 3 is dominated by one large outlier, and in
group 4 all the points are crowded at the same $x$ and the line is “vertical”. **These four numbers are
identical, yet the conclusions are completely different** — that is why the scatterplot is necessary.

### Step 2: compute by hand with least squares, then compare with lm()

```r
x <- iris$Petal.Length
y <- iris$Sepal.Length
n <- length(x)

lxx <- sum((x - mean(x))^2)                 # sum of squares of deviations from the mean for x
lyy <- sum((y - mean(y))^2)                 # sum of squares of deviations from the mean for y
lxy <- sum((x - mean(x)) * (y - mean(y)))   # sum of products of deviations from the mean for x and y

b <- lxy / lxx                              # regression coefficient (slope)
a <- mean(y) - b * mean(x)                  # intercept
c(lxx = lxx, lyy = lyy, lxy = lxy, a = a, b = b)
# lxx ≈ 464.32  lyy ≈ 102.17  lxy ≈ 189.87  a ≈ 4.307  b ≈ 0.409

fit <- lm(Sepal.Length ~ Petal.Length, data = iris)   # one line of code gives the same result
coef(fit)                                   # (Intercept) ≈ 4.307, Petal.Length ≈ 0.409
```

The hand computation agrees with `lm()`, which shows that the least squares formulas really are the
solution that **minimizes $\sum(y-\hat y)^2$**. While we are at it, verify the relationships from
Chapter 12:

```r
r <- cor(x, y)
c(r = r, b_from_r = r * sqrt(lyy / lxx), b_lm = unname(coef(fit)[2]), r2 = r^2)
# r ≈ 0.8718, r*sqrt(lyy/lxx) ≈ 0.4089, exactly the same as the lm() slope; r^2 ≈ 0.7600
```

### Step 3: reading the output of summary()

```r
summary(fit)
```

The output falls into four blocks; take them one by one:

| Where in the output | What it is | Which part of this chapter it corresponds to |
| --- | --- | --- |
| `Estimate` | `(Intercept)` is $a$, `Petal.Length` is $b$ | the regression coefficients |
| `Std. Error` | the standard errors of the coefficients; the slope's row is $S_b$ | the denominator of the $t$ test |
| `t value` and the `Pr(>... )` column on the right | the $t$ test of whether a coefficient is 0, and its $P$ value | hypothesis testing of the regression coefficient |
| `Residual standard error` | the residual standard deviation $S_{y\cdot x}$ (about 0.407 here, with 148 degrees of freedom) | the precision of estimation; the smaller the better |
| `Multiple R-squared` | the coefficient of determination $R^2$ (about 0.760 here) | the proportion of the variation explained by $x$ |
| `Adjusted R-squared` | the adjusted coefficient of determination | only needed in multiple regression; with one variable it can be ignored |
| `F-statistic: ... on 1 and 148 DF` | the analysis-of-variance $F$ test of the regression equation (about 468 here) | equivalent to the $t$ test, $F \approx t^2$ |

Note that the `F` on the last line and the `t value` on the slope's row (about 21.6) do indeed satisfy
$F = t^2$; and the square root of `Multiple R-squared` is exactly the 0.8718 of `cor(x, y)`. (What
`summary()` actually prints is `Pr(>|t|)`; the two vertical bars inside the brackets are part of R's
column name, so just copy it as it stands.)

### Step 4: the analysis of variance table

```r
anova(fit)
```

The output is exactly this chapter's analysis of variance table:

| Source of variation | Df | Sum Sq | Mean Sq | F value | Pr(>F) |
| --- | --- | --- | --- | --- | --- |
| Petal.Length | 1 | 77.64 | 77.64 | 468.6 | < 2.2e-16 |
| Residuals | 148 | 24.53 | 0.166 | | |

The `Sum Sq` column is precisely $SS_{\text{reg}}$ and $SS_{\text{res}}$
($77.64 + 24.53 = 102.17 = SS_{\text{total}}$, which is `lyy`), the `Df` are $\nu_{\text{reg}}=1$ and
$\nu_{\text{res}}=n-2=148$, and `F value` is the ratio of the two mean squares. `Pr(>F)` is very small,
showing that the population regression coefficient is not 0 and the straight-line relationship holds.

### Step 5: interval estimation and prediction for β

```r
confint(fit)                       # 95% confidence intervals for a and b
# (Intercept)   ≈ 4.15 ~ 4.46
# Petal.Length  ≈ 0.372 ~ 0.446   ← does not contain 0, consistent with the very small P value

newx <- data.frame(Petal.Length = 3)          # note that newdata must be a data frame, with column names matching the model
predict(fit, newdata = newx, interval = "confidence")   # confidence interval for the conditional mean μ_y
# fit ≈ 5.533, lwr ≈ 5.46, upr ≈ 5.61
predict(fit, newdata = newx, interval = "prediction")   # tolerance interval for an individual y value
# fit ≈ 5.533, lwr ≈ 4.73, upr ≈ 6.34
```

The difference between the two `interval` settings is exactly the difference between that pair of
intervals in this chapter:

- `interval = "confidence"` answers “for **all the flowers** with a petal length of 3 cm, what range is
  the sepal length **on average** in”, and the interval is narrow;
- `interval = "prediction"` answers “for **one particular flower** with a petal length of 3 cm, what
  range will its sepal length fall in”, and the interval is much wider (here wider by about one
  $S_{y\cdot x}$).

Then get a feel for “narrow in the middle, wide at the two ends”:

```r
grid <- seq(1, 7, by = 1)                     # covers the observed range of petal length
pred <- predict(fit, newdata = data.frame(Petal.Length = grid),
                interval = "confidence")
round(cbind(grid, pred), 3)                   # compare the lwr/upr width of each row: narrowest when x is close to x̄ (3.76)
```

### Step 6: residual analysis and regression diagnostics

```r
# four diagnostic plots: residuals vs fitted, normal Q-Q, Scale-Location, residuals vs leverage
par(mfrow = c(2, 2))
plot(fit)
par(mfrow = c(1, 1))

# look at just one of them
plot(fit, which = 1)                          # 1 = residual plot; 2 = Q-Q plot; 3 = scale-location plot; 4 = leverage plot
```

Check the four plots one by one against the earlier “how to read a residual plot” table: whether the
first is formless random scatter, whether the points of the second hug the line, whether the third forms
a horizontal band, and whether the fourth has a high-leverage point crossing the contour. If the first
shows a clear bend, consider a variable transformation or curvilinear regression; if it shows a funnel
shape, consider taking logarithms of $y$.

The residuals can also be extracted and plotted by yourself:

```r
res    <- residuals(fit)        # residual y - ŷ
fitted_ <- fitted(fit)          # fitted value ŷ

plot(fitted_, res, xlab = "Fitted value", ylab = "Residual", pch = 19)
abline(h = 0, lty = 2)          # the residuals should scatter randomly around the 0 line

hist(res, main = "Residual distribution", xlab = "Residual", col = "lightgray")
qqnorm(res); qqline(res, col = "red")         # points close to the red line → the residuals are approximately normal
shapiro.test(res)                             # normality test (overly sensitive with a very large sample; for reference only)
```

Finding outliers and influential points:

```r
std_res <- rstandard(fit)                     # standardized residuals
which(abs(std_res) > 2)                       # suspicious outliers with a rather large residual

h   <- hatvalues(fit)                         # leverage
cooks <- cooks.distance(fit)                  # Cook's distance
which(h > 2 * 2 / nrow(iris))                 # rule of thumb: leverage > 2p/n (p = 2 for simple linear regression)
which(cooks > 4 / nrow(iris))                 # rule of thumb: Cook's distance > 4/n (> 1 is also used)
```

After a suspicious point has been found, **go back to the raw data and check it**; do not simply delete
it. The change in the coefficients with and without that point can be compared:

```r
fit <- lm(Sepal.Length ~ Petal.Length, data = iris)          # the model already fitted above
i <- which.max(cooks.distance(fit))                          # the point with the largest Cook's distance
coef(fit)                                                    # coefficients from all the data
coef(lm(Sepal.Length ~ Petal.Length, data = iris[-i, ]))     # coefficients after removing that point
```

If the coefficients have hardly changed, the point has little influence, and it can be described in the
report and kept; if they have changed a lot, one must explain clearly why it is being removed — which is
exactly why “influential points” need to be watched separately.

### Step 7: do not extrapolate (see the consequences with cars)

The `cars` data record the driving speed of cars (`speed`, mph) and the braking distance (`dist`, ft) —
this data set was already met in Week 2 of this course, when computing the mean of `cars$speed`.

```r
fit2 <- lm(dist ~ speed, data = cars)
coef(fit2)                                    # a ≈ -17.58, b ≈ 3.93
range(cars$speed)                             # the observed range is only 4 ~ 25

predict(fit2, newdata = data.frame(speed = c(10, 40)))
# 10 is inside the observed range (interpolation) → ≈ 21.7
# 40 is beyond the observed range (extrapolation) → ≈ 139.7, but this is only the mechanical extension of the line, with no data to support it
```

Note in passing that $a \approx -17.58$ is negative: the braking distance at a speed of 0 cannot be
negative. This reminds us that **the intercept is only a parameter that puts the line in the correct
position, and need not have a practical meaning** — only when $x=0$ makes sense in subject-matter terms
should $a$ be interpreted.

### Step 8: using regression for statistical control (with mtcars)

In `mtcars`, `wt` is the car's weight (thousands of pounds) and `mpg` is miles per gallon; the two are
negatively correlated.

```r
fit3 <- lm(mpg ~ wt, data = mtcars)
coef(fit3)                                    # a ≈ 37.285, b ≈ -5.344
summary(fit3)$r.squared                       # R² ≈ 0.753

# statistical control (inverse estimation): if fuel consumption is to be no lower than 20 mpg, how heavy can the car be at most?
y_limit <- 20
(x_limit <- (y_limit - coef(fit3)[1]) / coef(fit3)[2])   # ≈ 3.23 (thousands of pounds)
```

The 3.23 thousand pounds solved back is a **point estimate**. The safe approach is to solve back using
the upper limit of the one-sided tolerance interval, which gives a more conservative control limit; what
`interval = "prediction"` in `predict()` gives is a two-sided interval, so when actually working out a
control limit it has to be handled with a one-sided approach.

## Common pitfalls

- **Confusing correlation with regression, and using $r$ to explain “how much it changes”**. $r$ is
  dimensionless and symmetric, unchanged by exchanging $x$ and $y$; $b$ has units and is asymmetric —
  after the exchange even its value changes ($b' = b\,l_{xx}/l_{yy}$). “$r=0.87$, so for every 1 cm
  increase in sepal length the petal length increases by 0.87 cm” is a typical wrong sentence — 0.87 is
  a dimensionless correlation coefficient, not a slope. Also, correlation requires both variables to
  follow a normal distribution (bivariate normal), whereas regression requires only $y$ to be normal.
- **Running `lm()` without drawing a scatterplot, and getting a high $R^2$ as well**. Anscombe's quartet
  proves that four numbers can be exactly identical while the plots differ enormously: a curved
  relationship, domination by a single outlier, and almost no variation in $x$ (all the points crowded
  at the same $x$) — these three situations cannot be seen by computing alone. **`plot()` first, then
  `lm()`** — this is not a formal requirement.
- **Taking “the confidence interval for the mean” for “the tolerance interval for an individual”**.
  `interval = "confidence"` gives the range of the conditional mean (narrow), while
  `interval = "prediction"` gives the range for an individual (wide, by an extra order of magnitude of
  $S_{y\cdot x}$). Saying in a paper that “we predict the value for some patient” while reporting a
  confidence interval amounts to shrinking the uncertainty by an order of magnitude. Also, $S_{y\cdot x}$
  is not the standard deviation of $y$ either: the former is the residual variation after removing the
  linear influence, and is necessarily smaller.
- **Treating $R^2$ or the $P$ value as the conclusion itself, or even using the equation to extrapolate**.
  $R^2$ is a relative index that reflects only the proportion explained within the observed range of the
  independent variable: a narrow range and poor repeatability of the data will both change it; a high
  $R^2$ does not mean the prediction error for an individual is small (that depends on $S_{y\cdot x}$),
  and still less does it mean that $x$ caused $y$; in multiple regression $R^2$ only increases and never
  decreases as variables are added, so the adjusted $R^2$ must be looked at — which is why in simple
  regression one should not treat $R^2 = r^2$ as two independent pieces of evidence. Conversely,
  $P<0.05$ only says that $\beta \ne 0$: with a very large sample, a very small $b$ with no clinical
  meaning can also be significant. **Strength is judged by the 95% confidence interval for $b$ and by
  $R^2$, and the range of applicability by the observed range of $x$** — outside that range the straight
  line has no data to support it, and the farther out you go the less reliable it becomes (the
  confidence band opening into a trumpet shape at both ends is the geometric version of this).
- **Looking only at the size of the residuals to find outliers, and forgetting leverage**. Points with
  large residuals are easy to spot, but a **high-leverage point** whose $x$ lies far from $\bar x$ may
  have a modest residual and still pull the line off. In diagnostics, look at the standardized residuals,
  `hatvalues()` and `cooks.distance()` at the same time. Also, **deleting an outlier on the spot** is
  wrong: first re-check the measurement, the record and the data entry, and only correct or drop it once
  it is confirmed to be wrong; a genuine observation can only be reported, and must not be discarded to
  make things “look good”.

## How it connects to the other courses

::: tip Related pages
- **[Week 3 of *Medical Big Data Analysis and Decision Making*, Regression Analysis](/Medical-Big-Data-Analysis/3-regression)** *(Chinese)* —
  **the most important correspondence for this chapter**. That week is a whole week of regression
  **practice**: Exercise 1, “simple linear regression”, fits a model with `lm()`, which is exactly this
  chapter's $\hat y = a + bx$; Exercise 2, “multiple linear regression”, extends the independent
  variables from one to several — this chapter explains the meaning of a single coefficient thoroughly
  enough that in that week you can understand why each coefficient gets a row of its own in
  `summary()`; Exercise 3, “choosing the best regression equation” (`drop1()`, `step()`), answers “how
  to choose when there are many variables”, and its basis is exactly this chapter's analysis-of-variance
  $F$ test; Exercises 4–6, “linearizing nonlinear regression / the least squares method / polynomial
  regression”, deal with what to do when the “L” of LINE fails in this chapter — the name and the idea
  of the least squares method come from this chapter, and polynomial regression reminds us that “linear”
  means **linear in the parameters**; Exercise 7, “logistic regression”, is this chapter's regression
  equation rewritten for a binary outcome — the form of the linear predictor $\eta$ is unchanged, it is
  just wrapped in a link function. **Recommended order: first get the principles, formulas and residual
  diagnostics clear in this chapter, then go and run the code in that week**, otherwise it is very easy
  to end up “able to type `lm()` but unable to read the output”.
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/intro-it/9-base-graphics)** *(Chinese)* —
  this chapter keeps insisting “draw the scatterplot first”, and Exercise 8 of that lecture is exactly
  drawing a scatterplot with `plot()` (`pch`, `cex`, `col`, `lwd`, and the font size of the title and
  axis labels), while Exercise 9 also covers overlaying with `par(new = T)` and splitting the plot
  region. This chapter's `plot(Sepal.Length ~ Petal.Length, data = iris)`, `abline(fit)` and
  `par(mfrow = c(2, 2)); plot(fit)` all use the same set of base graphics arguments — **there you learn
  the plotting technique; here you learn what should be plotted and how to read it once it is drawn**.
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/Medical-Big-Data-Analysis/2-data-preprocessing)** *(Chinese)* —
  Exercise 3 of that week, “correlation analysis”, draws a correlation matrix plot with `corrgram()` and
  checks correlation coefficients with `cor()`; it is the hands-on version of the correlation half of
  the “correlation vs regression” table in the first section of this chapter: there $r$ is computed, and
  this chapter tells you how $r$ and $b$ convert into each other ($b = r\sqrt{l_{yy}/l_{xx}}$), why
  $R^2 = r^2$ in simple regression, and what “using regression to explain correlation” means. Also, the
  data preprocessing of that week (missing values, outliers) corresponds to point 4 of this chapter's
  cautions — this chapter says outliers should be **re-checked, corrected or dropped**, and the
  engineering practice of that falls in that week; even the data sets are shared: Week 2 computed the
  mean of `cars$speed`, and this chapter uses exactly that to demonstrate the consequences of
  extrapolation.
- **[Week 6 of *Medical Big Data Analysis and Decision Making*, Classification (2)](/Medical-Big-Data-Analysis/6-classification-2)** *(Chinese)* —
  that week is about evaluating classifiers: confusion matrices, accuracy, ROC curves and AUC. Put the
  two side by side and they form a neat contrast: this chapter's dependent variable is **continuous**,
  and $R^2$ and $S_{y\cdot x}$ measure “how well it fits and how accurately it predicts”; that week's
  dependent variable is **categorical**, and the evaluation has to switch to accuracy, sensitivity and
  AUC. The two remind us of one and the same thing — **how good a model is must be measured with an
  index that matches the task**; a high $R^2$ does not mean accurate classification, and a high AUC does
  not show that the residuals of a regression equation satisfy LINE. What links the two is the logistic
  regression of Exercise 7 in Week 3.
- **[Lecture 12 of *Introduction to Information Technology*, Parameter Estimation](/intro-it/12-parameter-estimation)** *(Chinese)*,
  **[Lecture 13, Parametric Hypothesis Testing](/intro-it/13-hypothesis-testing)** *(Chinese)* — this
  chapter's interval estimation and hypothesis testing are those two lectures' methods landing on
  regression: the confidence interval for $\beta$, $b \pm t_{\alpha/2,\nu}S_b$, follows the same routine
  of “statistic ± critical value × standard error”; the confidence interval for the conditional mean and
  the individual tolerance interval are respectively the two different problems of “estimating a
  population mean” and “estimating the range of an individual value” (the latter is not parameter
  estimation, but the form is similar). The framework of the $t$ test in the hypothesis-testing lecture
  was carried straight over as well, only replacing “comparing a sample mean with a population mean” by
  “comparing a sample regression coefficient with 0”, with the degrees of freedom becoming $\nu = n-2$.
  **Conversely, those chapters teach general principles and R functions; this chapter is one complete
  application of them to bivariate quantitative data.**
- **[Lecture 11 of *Introduction to Information Technology*, The ggplot2 Package](/intro-it/11-ggplot2)** *(Chinese)* —
  Exercise 6 of that lecture uses `geom_point()` to draw a scatterplot of `Sepal.Length` against
  `Sepal.Width` in `iris`, which is exactly this chapter's object of analysis as it looks in another
  graphics system (this page switches to `Petal.Length` as the independent variable). To add a
  regression line to a scatterplot in ggplot2, use `geom_smooth(method = "lm")` — that lecture did not
  get to it, and after finishing this chapter you will be able to judge whether that line has been drawn
  correctly.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/13-linear-regression once
translated; for now the Chinese page /Health-statistics/13-linear-regression) from:
- /Medical-Big-Data-Analysis/3-regression, at the start of "Exercise 1, simple linear regression" add
  "for the principle and formulas of the least squares method, and hypothesis testing of the regression
  equation, see Chapter 13 of Health Statistics"; at "Exercises 4-6, nonlinear regression" add "for the
  source of the ideas of linearization and least squares see Chapter 13 of Health Statistics"; at
  "Exercise 7, logistic regression" add "for the meaning of the linear predictor see Chapter 13 of
  Health Statistics".
- /Medical-Big-Data-Analysis/2-data-preprocessing, at the end of "Exercise 3, correlation analysis" add
  "for the conversion between the correlation coefficient r and the regression coefficient b, and for
  using regression to explain correlation (R² = r²), see Chapter 13 of Health Statistics"; where
  outliers are handled add "for judging outliers versus influential points see Chapter 13 of Health
  Statistics".
- /Medical-Big-Data-Analysis/6-classification-2, at "contents of this lecture" add "for regression
  methods for a continuous dependent variable and for model evaluation indices see Chapter 13 of Health
  Statistics".
- /intro-it/9-base-graphics, at "Exercise 8: drawing a scatterplot with the plot function" add "for the
  reasoning behind drawing a scatterplot before deciding whether to do regression see Chapter 13 of
  Health Statistics".
- /intro-it/12-parameter-estimation and /intro-it/13-hypothesis-testing, at the "summary of this
  lecture" add "for the form these two sets of methods take when applied to regression (the confidence
  interval for β, the F test and the t test, the individual tolerance interval) see Chapter 13 of Health
  Statistics".
- /intro-it/11-ggplot2, at "Exercise 6: geom_point, aesthetic mappings, theme settings, scale
  transformations" add "for the regression line after the scatterplot and for residual diagnostics see
  Chapter 13 of Health Statistics".
- Health Statistics Chapter 12, "Bivariate Association" page (not yet created): once it is written,
  please link back to this chapter where linear correlation is discussed, explaining the difference and
  the connection between r and b, and that tr = tb = √F for the same data.
-->

## Summary

1. **Simple linear regression uses $\hat y = a + bx$ to describe the quantitative dependence between two
   numeric variables**. $b$ (the regression coefficient, or slope) means that for every 1-unit change in
   $x$, $y$ changes by $b$ units on average, with units of “units of $y$ / units of $x$”; $a$ (the
   intercept) has a practical meaning only when $x$ can take the value 0; $\hat y$ estimates the
   **conditional population mean** given $x$, not an individual value. The **least squares method**
   minimizes $\sum(y-\hat y)^2$, giving $b = l_{xy}/l_{xx}$ and $a = \bar y - b\bar x$, and the line
   necessarily passes through $(\bar x, \bar y)$.
2. **The first hurdle is the difference between correlation and regression**: correlation requires
   bivariate normality, puts the two variables on an equal footing, and uses $r$ to describe direction
   and closeness; regression requires only $y$ to be normal, distinguishes an independent and a
   dependent variable, and uses $a+bx$ for quantitative expression and prediction. The four connections:
   the same direction, equivalent tests ($t_r = t_b = \sqrt{F}$), mutual convertibility
   ($b = r\sqrt{l_{yy}/l_{xx}}$), and using regression to explain correlation ($R^2 = r^2$).
3. **Hypothesis testing and the coefficient of determination**:
   $SS_{\text{total}} = SS_{\text{reg}} + SS_{\text{res}}$ (with degrees of freedom
   $n-1 = 1 + (n-2)$), and $F = MS_{\text{reg}}/MS_{\text{res}}$ or $t = b/S_b$ tests $H_0:\beta=0$; the
   two are equivalent and $F = t^2$; $R^2 = SS_{\text{reg}}/SS_{\text{total}} = r^2$ is the proportion of
   the variation in $y$ explained by $x$.
4. **Interval estimation comes in layers**: the confidence interval for $\beta$ is
   $b \pm t_{\alpha/2,\nu}S_b$; the confidence interval for the conditional mean is narrow, while the
   tolerance interval for an individual $y$ value is much wider (it has an extra 1 in the formula); both
   are narrowest at $x_0 = \bar x$ and wider the farther away they are.
5. **Diagnose before applying**: regression can be used for quantitative description, prediction
   (predictor → predicted quantity) and statistical control (specifying $y$ and solving back for $x$, an
   inverse estimation), but the precondition is that LINE holds. Use a **residual plot** to check: the
   residuals should scatter formlessly around the 0 line; a bend means linearity fails, a funnel shape
   means unequal variances, and a Q-Q plot departing from the line means non-normality; high-leverage
   points and points with a large Cook's distance must be checked separately. Do not forget the
   cautions: it must have practical meaning and does not mean causation; draw the scatterplot first;
   re-check outliers before dealing with them; **do not extrapolate**; and $P<0.05$ does not mean a
   strong relationship.
