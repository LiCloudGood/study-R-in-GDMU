---
layout: doc
title: '4. Describing Quantitative Data'
---

<script setup>
const freqCode = `x <- airquality$Temp          # 153 daily maximum temperature observations
brk <- seq(50, 100, by = 5)    # class limits: 50~55, 55~60, ..., 95~100

g <- cut(x, breaks = brk, right = FALSE, include.lowest = TRUE)
freq <- table(g)

data.frame(Interval = names(freq),
           Count = as.integer(freq),
           Percent = round(as.numeric(freq) / length(x) * 100, 1),
           CumPercent = round(cumsum(as.numeric(freq)) / length(x) * 100, 1))

hist(x, breaks = brk, right = FALSE,
     main = "Frequency plot of daily maximum temperature",
     xlab = "Temperature (F)", ylab = "Frequency")`

const freqOut = `   Interval Count Percent CumPercent
1   [50,55)     0     0.0        0.0
2   [55,60)     8     5.2        5.2
3   [60,65)     8     5.2       10.5
4   [65,70)    16    10.5       20.9
5   [70,75)    16    10.5       31.4
6   [75,80)    32    20.9       52.3
7   [80,85)    34    22.2       74.5
8   [85,90)    22    14.4       88.9
9   [90,95)    15     9.8       98.7
10 [95,100]     2     1.3      100.0`
</script>

# Chapter 4. Describing Quantitative Data

::: info Translation status
Translated from the [Chinese original](/Health-statistics/04-describing-quantitative-data). Numbers,
formulas, and R code are identical to the original; if the two disagree, **the Chinese page is
authoritative**.
:::

> Given a column of measurements, first get the shape of the distribution clear with a frequency table
> and a frequency plot, then summarize it into a few numbers using two families of indices — *central
> tendency* and *dispersion* — and finally use the normal distribution to compute proportions and set
> medical reference ranges.

## What this chapter is for

Height, weight, blood pressure, incubation period, antibody titer … every value measured on these
indices is a number, with a magnitude and a unit; such data are called **quantitative data**. A survey
measures the heights of 120 ten-year-old boys and yields 120 numbers; a paper cannot list all 120, and
readers do not care that the 37th boy is 143.6 cm.

So the question becomes: **how can the numerical features of this batch of data be stated clearly
using as few numbers as possible?** Conversely, on seeing "the mean height of ten-year-old boys in a
certain area is 143.35 cm with a standard deviation of 4.79 cm", one should be able to tell where the
data are concentrated and how far apart they are.

The first step is always to look at the distribution: organize the raw data into a frequency table and
draw it as a histogram, and establish first whether it is symmetric or skewed. Only then compute
indices — and indices describing **central tendency** (where the average level lies) and **dispersion**
(how much individuals differ) must be reported as a pair; giving only one is incomplete. Two groups of
animals both have a mean daily food intake of 28 mg/g, but in one group the values cluster around 28
while the other contains a 64 — the "28" means quite different things in the two groups.

These descriptive indices are also the basis of all later inference: the $t$ test, analysis of
variance, and correlation and regression all require roughly normal data, and normality is judged with
exactly the standard deviation $s$ and mean $\bar x$ of this chapter, along with the area rules of the
normal distribution.

## Core concepts

### The frequency table: arranging a column of numbers into a distribution

The **frequency** is the number of times a particular value (or class interval) occurs. Listing the
values of a variable together with their frequencies gives a **frequency distribution table**, or
**frequency table** for short. For continuous quantitative data the values are usually grouped before
counting, and there are four steps:

1. **Find the range.** Take the largest and smallest of the observations; their difference is the range,
   written $R$. Example: among 120 ten-year-old boys the maximum height is 155.4 and the minimum 130.2,
   so $R = 25.2$.
2. **Decide the number of classes and the class width.** The number of classes is set by the sample size
   and the purpose of the study, usually 8–15 (fewer for small samples, more for large ones). The class
   width is $i = R \;/\; \text{number of classes}$, rounded to a tidy value. In the example
   $25.2 \div 10 = 2.52$, so take $i = 2$.
3. **Determine the class intervals.** The start of each interval is its **lower limit** and the end its
   **upper limit**; the difference between them is the class width. The first interval must contain the
   minimum (so the lower limit is taken as an integer slightly below or equal to the minimum — 130 in
   the example) and the last must contain the maximum. Each interval covers values "greater than or
   equal to the lower limit and less than the upper limit"; to avoid overlap, **only the lower limit is
   written for every interval except the last, which shows both limits**: 130~, 132~, 134~, …, 154~156.
4. **Assign to classes, count, and tabulate.** Each observation is placed in its interval and counted,
   giving the frequencies; from these the **relative frequency**, **cumulative frequency**, and
   **cumulative relative frequency** are computed.

| Height (cm) | Frequency $f_i$ | Relative frequency (%) | Cumulative frequency | Cumulative relative frequency (%) |
| --- | --- | --- | --- | --- |
| 130~ | 1 | 0.8 | 1 | 0.8 |
| 132~ | 3 | 2.5 | 4 | 3.3 |
| 134~ | 4 | 3.3 | 8 | 6.7 |
| 136~ | 8 | 6.7 | 16 | 13.3 |
| 138~ | 12 | 10.0 | 28 | 23.3 |
| 140~ | 17 | 14.2 | 45 | 37.5 |
| 142~ | 21 | 17.5 | 66 | 55.0 |
| 144~ | 20 | 16.7 | 86 | 71.7 |
| 146~ | 14 | 11.7 | 100 | 83.3 |
| 148~ | 10 | 8.3 | 110 | 91.7 |
| 150~ | 6 | 5.0 | 116 | 96.7 |
| 152~ | 3 | 2.5 | 119 | 99.2 |
| 154~156 | 1 | 0.8 | 120 | 100.0 |
| Total | 120 | 100.0 | — | — |

For discrete quantitative data the values are not continuous, so no grouping is needed: the values and
their frequencies can be listed directly.

The frequency table has three uses:

- **It reveals the features and the type of the frequency distribution.** The features are
  **central tendency** (most heights concentrate in the middle intervals) and **dispersion**
  (frequencies fall away towards both ends); the type is **symmetric** or **skewed**. A peak shifted
  towards the small values is **positively skewed** (a long tail to the right), and one shifted towards
  the large values is **negatively skewed** (for example the age distribution of patients with chronic
  diseases such as coronary heart disease or malignancy). The type of distribution determines which
  average, which measure of variation, and which test are appropriate later on.
- **It makes further computation convenient.** Only with a frequency table can the weighted method be
  used for the mean and standard deviation, or the frequency-table method for the median and
  percentiles.
- **It helps to spot suspect values.** One or two observations sitting alone in an interval far from
  the rest often indicate a recording error or a special individual, and call for checking back.

### Frequency plots: histograms and bar graphs

Plotting values on the horizontal axis and frequencies on the vertical axis (with equal class widths
the vertical axis may instead be the relative frequency; with unequal widths it must be
"relative frequency / class width", otherwise the heights are not comparable) gives a **frequency
plot**, in which the area of each rectangle represents that class's frequency (or relative frequency).

When the rectangles of a frequency plot for continuous data touch, it is a **histogram**; for discrete
data the values are not continuous, so the rectangles are separated by gaps and the plot is a **bar
graph**. Frequency plots and frequency tables serve the same purpose, but the plot expresses the
features and type of the distribution more directly; the two are often given together.

### Central tendency (1): the arithmetic mean

The **arithmetic mean**, or simply the **mean**, is the sum of a set of homogeneous observations divided
by their number, and reflects the average level or center of the data. The sample mean is written
$\bar x$ and the population mean $\mu$.

With a small sample size the direct method is used:

$$\bar x = \frac{x_1 + x_2 + \cdots + x_n}{n} = \frac{\sum x}{n}$$

where $\sum$ (read sigma) is the summation sign and $n$ is the sample size.

When many values repeat, or the data have already been tabulated, the **weighted method** is used: the
**class midpoint** of each interval (half the sum of its limits) stands for all the observations in that
interval, and the midpoints are weighted by frequency:

$$\bar x = \frac{\sum f_i x_i}{\sum f_i}$$

where $k$ is the number of classes, $x_i$ the midpoint of the $i$-th class, and $f_i$ its frequency.
Substituting the height data above: $\bar x = 17202 / 120 = 143.35$ cm.

**Conditions**: the mean suits **symmetric, and especially normal,** data. It then lies at the center of
the distribution and represents both the center and the average magnitude. When the data are clearly
skewed the mean is dragged towards the extreme values in the long tail and no longer represents "the
level of most people".

### Central tendency (2): the geometric mean

For a set of antibody titers such as 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256 the values stand in a
**multiplicative** relationship, the largest being 64 times the smallest. Taking reciprocals and
computing a plain mean gives 72.5, i.e. a titer of 1/72.5; 5 of the 7 titers are larger than it, showing
that this average has been dragged up by the two larger values 128 and 256 and represents the data
poorly — the mean is too sensitive to individual extreme values.

The **geometric mean** (written $G$) is the $n$-th root of the product of $n$ observations, also called
the **mean of multiples**, and suits exactly this kind of data:

$$G = \sqrt[n]{x_1 x_2 \cdots x_n}$$

In practice one first takes logarithms (turning multiplication into addition), averages the logarithms,
and then takes the antilogarithm:

$$G = \lg^{-1}\!\left(\frac{\sum \lg x}{n}\right)$$

For tabulated data the weighted method is used:

$$G = \lg^{-1}\!\left(\frac{\sum f_i \lg x_i}{\sum f_i}\right)$$

For the example above: $\lg^{-1}(10.5361/7) = \lg^{-1}(1.5052) = 32$, so the mean titer of the 7 people
is 1/32. In data on haemagglutination-inhibiting antibody titers of 50 measles-susceptible children
after vaccination, $\sum f_i \lg x_i = 86.9977$, and the weighted method gives
$G = \lg^{-1}(86.9977/50) = \lg^{-1}(1.7400) \approx 54.9$, a mean titer of about 1/55.

**Two preconditions** (very important):

1. It suits data with a **log-symmetric distribution (including the log-normal)**, that is, data that
   become symmetric or normal after taking logarithms; it also suits **geometric-progression data**,
   where the observations change by a multiple or an approximate multiple, such as antibody titers.
2. The observations **must contain no 0, and must not mix positive and negative values** — 0 has no
   logarithm, and when signs are mixed "the root of the product" has no practical meaning.

Titer data are usually converted by taking reciprocals first, giving 4, 8, 16, 32 …, and the geometric
mean is computed on those — which is why the example above takes a detour.

### Central tendency (3): the median and percentiles

Arrange the observations in increasing order; the value in the middle position is the **median**
(written $M$). It is a **positional average**: half the observations lie below it and half above.

A **percentile** (written $P_x$) is the value at the $x$-th of the 100 equal divisions of an ordered
series. In theory $x\%$ of the observations are smaller than $P_x$ and $(100-x)\%$ larger. The median is
the 50th percentile: $M = P_{50}$. The three values $P_{25}$, $P_{50}$, and $P_{75}$ divide all the
observations into four equal parts and are called the **quartiles**, with $P_{25}$ the lower quartile
$Q_L$ and $P_{75}$ the upper quartile $Q_U$.

**Direct method** (for a small number of observations): sort the data, take the middle one for an odd
number and the average of the two middle ones for an even number:

$$M = x_{\left(\frac{n+1}{2}\right)} \qquad M = \frac{1}{2}\left(x_{\left(\frac{n}{2}\right)} + x_{\left(\frac{n}{2}+1\right)}\right)$$

Example: the survival times (minutes) of 10 poisoned mice, sorted, are 35, 60, 62, 63, 63, 65, 66, 68,
69, 69; $n$ is even, so $M = (63+65)/2 = 64$ minutes.

**Frequency-table method**: first locate the interval containing the median in the frequency table (the
first interval whose cumulative relative frequency exceeds 50%), then interpolate within that interval:

$$M = L + \frac{i}{f_M}\left(\frac{n}{2} - \sum f_L\right)$$

where $L$ is the lower limit of that interval, $i$ the class width, $f_M$ its frequency, and
$\sum f_L$ the cumulative frequency of the intervals below $L$. In data on the incubation period of 200
patients with food poisoning, 50.5% is the first cumulative relative frequency above 50%, showing that
$M$ lies in the "12~" interval:

$$M = 12 + \frac{12}{71}\left(\frac{200}{2} - 30\right) = 23.8\;(\text{hours})$$

For other percentiles, $n/2$ is simply replaced by $n \cdot x\%$; the median formula is the special case
$x=50$:

$$P_x = L + \frac{i}{f_x}\left(n \cdot x\% - \sum f_L\right)$$

For the same data: $P_{25} = 12 + \frac{12}{71}(200\times 25\% - 30) = 15.4$ hours and
$P_{75} = 24 + \frac{12}{49}(200\times 75\% - 101) = 36.0$ hours.

**Conditions**: the median is commonly used to describe (i) skewed data; (ii) data with **no definite
value at one or both ends** (open-ended values such as ">5 years" or "<0.1"); (iii) data whose
distribution is unknown. Percentiles describe the level at a given percentile position, and several
together characterize a distribution fairly fully; they are also the tool for setting reference ranges
for non-normal data. They do require a sufficiently large sample, however — otherwise percentiles close
to either end should not be used.

### Choosing a measure of central tendency: a table of criteria

| Distributional features of the data | Measure of central tendency | Measure of dispersion |
| --- | --- | --- |
| symmetric, especially normal | arithmetic mean $\bar x$ | standard deviation $s$ (or variance $s^2$) |
| skewed; no definite value at one or both ends; distribution unknown | median $M$ | interquartile range $Q$ |
| log-normal; geometric-progression data (titers, potencies) | geometric mean $G$ | the standard deviation after log transformation, back-transformed (geometric SD) |

The order for deciding "which to use" is: look at the plot and the subject-matter background first →
run a normality test if unclear → for skewed or open-ended data, go straight to median plus
interquartile range. **Never use the mean to describe clearly skewed data** — that is the most common
error.

<ClickAnswer>

**Think about it**: for the antibody titer data (1/4 to 1/256), why is the mean unsuitable? And how
should one choose between the mean, the median, and the geometric mean?

Because the titers stand in a multiplicative relationship, the largest being 64 times the smallest;
taking reciprocals and averaging gives 72.5, which has been pulled up by the two large values 128 and
256 (5 of the 7 reciprocals are below it) and represents the data poorly.

After a log transformation these values become $2^2,2^3,\dots,2^8$, which are **equally spaced** on the
logarithmic scale, i.e. "log-symmetric" — so the geometric mean is the right choice: $G = 32$, a mean
titer of 1/32, which sits exactly in the middle of the 7 titers.

The general rule: symmetric/normal uses the mean, skewed uses the median, and a multiplicative
(log-symmetric) relationship uses the geometric mean.

</ClickAnswer>

### Dispersion (1): the range

Central tendency alone is not enough. Consider two groups of 9 animals with daily food intakes: group A
is 24, 25, …, 32, group B is 20, 21, …, 27, 64; both have a mean of 28 mg/g. But group A is symmetric
with a range of only 8, while group B has a range of 44 with an outlying 64 in the middle — the "28"
represents group A and does not represent group B.

The **range** (written $R$) is the difference between the largest and smallest of a set of homogeneous
observations:

$$R = x_{\max} - x_{\min}$$

A large range means the data are scattered and a small one that they are concentrated. It is the
simplest to compute, but has two hard defects: (i) **it uses only the largest and smallest values**, and
the variation of the other observations within the group is not reflected at all; (ii) **the larger the
sample, the greater the chance of drawing an extreme value**, and hence the larger the range — so
ranges cannot be compared directly between samples of very different size. It is generally used only to
get a rough idea of the range the data cover.

### Dispersion (2): the interquartile range

The **interquartile range** (written $Q$) is the difference between the upper and lower quartiles:

$$Q = Q_U - Q_L = P_{75} - P_{25}$$

Positionally it is **the range of the middle 50% of the observations**, so it is essentially unaffected
by individual extreme values at either end and is more stable than the range. In the incubation period
example, $Q = 36.0 - 15.4 = 20.6$ hours.

**Conditions**: used as a pair with the median, commonly for skewed data and for data with no definite
value at one or both ends. Its drawback is that it cannot summarize the variation of all the
observations (the 25% of data at each end are outside its scope).

### Dispersion (3): variance and standard deviation

The range uses only two numbers and the interquartile range only the middle half; to use **every**
observation, one has to look at how far each value lies from the mean. This difference $(x - \mu)$ is
the **deviation from the mean**. But deviations have signs, and $\sum (x-\mu) = 0$ holds identically, so
adding them directly is meaningless; instead one takes the **sum of squared deviations**
$\sum (x-\mu)^2$ (written $SS$ or $l_{xx}$) and divides by the number of observations, giving the
population **variance**:

$$\sigma^2 = \frac{\sum (x - \mu)^2}{N}$$

The variance can be understood as "the average level of the squared deviation of each observation from
the mean": the larger it is, the more scattered the data are around the mean.

In practice $\mu$ is unknown and has to be replaced by the sample mean $\bar x$; if the denominator were
still $n$, the result would always be too small. Using $n-1$ as the denominator corrects this, giving
the sample variance:

$$s^2 = \frac{\sum (x - \bar x)^2}{n - 1}$$

Here $n-1$ is called the **degrees of freedom**: the $n$ deviations are subject to the single constraint
"$\sum (x-\bar x)=0$", so only $n-1$ of them are free to vary.

The problem with the variance is that **its units are squared** (cm², mmol²/L²) and cannot be compared
directly with the raw data. Taking the square root returns to the original units, and that is the
**standard deviation**:

$$\sigma = \sqrt{\frac{\sum (x-\mu)^2}{N}} \qquad s = \sqrt{\frac{\sum (x-\bar x)^2}{n-1}}$$

The standard deviation represents the average (absolute) distance between each observation and the mean.
For computation, the following identity is commonly used, saving one step:

$$s = \sqrt{\frac{\sum x^2 - \dfrac{(\sum x)^2}{n}}{n-1}}$$

For tabulated data, class midpoints and frequencies are used as weights:

$$s = \sqrt{\frac{\sum f_i x_i^2 - \dfrac{(\sum f_i x_i)^2}{\sum f_i}}{\sum f_i - 1}}$$

**Conditions**: the variance and standard deviation describe the dispersion of **symmetric, and
especially normal or near-normal,** data. The larger the standard deviation, the more scattered the data
are around the mean. When reporting, the mean and standard deviation are written as a pair:
$\bar x \pm s$.

### Dispersion (4): the coefficient of variation

Consider two questions:

- The mean height of five-year-old boys is 115.8 cm with a standard deviation of 4.5 cm, and the mean
  weight is 20.2 kg with a standard deviation of 0.56 kg. Concluding from $4.5 > 0.56$ that "height
  varies more than weight" is **wrong**: height and weight have **different units**, and standard
  deviations cannot be compared directly.
- The mean body weight of mice is 22.1 g with a standard deviation of 3.2 g; for rabbits it is 1525.3 g
  with a standard deviation of 101.4 g. The units are the same, but does the larger standard deviation
  mean rabbits vary more? — **also wrong**: the two means are far apart (a 69-fold difference), and the
  standard deviation is an absolute quantity that cannot be compared directly.

Here the **coefficient of variation** ($CV$) is used, the ratio of the standard deviation to the mean:

$$CV = \frac{s}{\bar x} \times 100\%$$

It is a **relative** measure of variation, unitless, reflecting "how large the variation is relative to
the mean". The two examples above:

- height $CV = 4.5/115.8 = 3.89\%$, weight $CV = 0.56/20.2 = 2.77\%$ → height varies more.
- mice $CV = 3.2/22.1 = 14.5\%$, rabbits $CV = 101.4/1525.3 = 6.6\%$ → mouse body weight varies more.

**When the $CV$ must be used**: to compare the degree of variation between two (or more) sets of data
with **different units of measurement**, or with the same units but **very different means**. Note that
the $CV$ is computed as $s/\bar x$, so it inherits the standard deviation's precondition — the data must
still be roughly symmetric (normal) — and it becomes meaningless when the mean is close to 0.

### The normal distribution: the bell curve and its area rules

Keep subdividing the heights of the 120 boys: the more people observed, the more classes, and the
smaller the class width, the narrower the rectangles of the histogram become, and the line joining their
tops gradually turns into a **smooth bell-shaped curve** — peaking in the center (at the mean), falling
symmetrically on both sides, and approaching the horizontal axis without ever touching it. This curve
describes the **normal distribution** (also called the Gaussian distribution).

If the probability density function of a continuous random variable $x$ is

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\, e^{-\frac{(x-\mu)^2}{2\sigma^2}}, \qquad -\infty < x < +\infty$$

then $x$ is said to follow a normal distribution with parameters $\mu$ and $\sigma^2$, written
$x \sim N(\mu, \sigma^2)$. Here $\mu$ is the population mean and $\sigma^2$ the population variance.

**Three features**:

1. The curve lies above the horizontal axis and is highest at the mean, symmetric about the mean, never
   touching the axis at either end — a bell shape.
2. It is determined by two parameters: $\mu$ is the **location parameter** (with $\sigma$ fixed, a larger
   $\mu$ shifts the curve to the right); $\sigma$ is the **shape parameter** (with $\mu$ fixed, a larger
   $\sigma$ makes the curve flatter and wider, a smaller one makes it narrower and more peaked).
3. The area under the curve follows fixed rules. The total area is 1 (100%), intervals symmetric about
   the mean have equal areas, and the area of an interval is the proportion (probability) of
   observations falling in it.

Because direct integration is inconvenient, one first applies the **standard normal transformation**
(also called the $z$ transformation or $u$ transformation):

$$z = \frac{x - \mu}{\sigma}$$

The transformed $z$ follows the **standard normal distribution** with $\mu = 0$ and $\sigma = 1$, written
$z \sim N(0,1)$, with density function

$$\varphi(z) = \frac{1}{\sqrt{2\pi}}\, e^{-\frac{z^2}{2}}, \qquad -\infty < z < +\infty$$

The area of an interval under the standard normal curve **depends only on $z$**, so tables can be used
(the table in Appendix 3 gives the **left-hand cumulative area** from $-\infty$ to $z$). Three points
about using the table: (i) given $\mu$, $\sigma$, and $x$, compute $z$ first and then look it up;
(ii) when $\mu$ and $\sigma$ are unknown but $n$ is large enough, substitute $\bar x$ and $s$; (iii) the
computed $z$ often does not give the required area directly, and symmetry plus a total area of 1 have to
be used to convert.

Example: the heights of 18-year-old male university students in a certain area follow
$x \sim N(173.50, 3.42^2)$. What proportion are 166.8 cm or shorter?

$$z = \frac{166.8 - 173.5}{3.42} = -1.96$$

The table gives the area to the left of $-1.96$ as 0.025, i.e. about **2.5%**.

**Three intervals that must be memorized**:

| Interval | Standard normal | General normal | Area |
| --- | --- | --- | --- |
| middle 1 standard deviation | $(-1,\ 1)$ | $(\mu-\sigma,\ \mu+\sigma)$ | 68.27% |
| middle 1.96 standard deviations | $(-1.96,\ 1.96)$ | $(\mu-1.96\sigma,\ \mu+1.96\sigma)$ | 95% |
| middle 2.58 standard deviations | $(-2.58,\ 2.58)$ | $(\mu-2.58\sigma,\ \mu+2.58\sigma)$ | 99% |

### How to judge normality

To decide whether a set of data can be treated as normal, work through this order:

1. **Look at the frequency table or frequency plot.** A peak in the middle with roughly symmetric sides
   suggests normality; a marked shift to one side indicates skewness.
2. **Use subject-matter knowledge.** Height, red cell count, hemoglobin, and serum cholesterol in a
   homogeneous group, and random errors in experiments, are usually normal or near-normal; indices such
   as incubation period, length of hospital stay, and urinary mercury are naturally skewed.
3. **Make a rough check on the relation between $\bar x$ and $s$.** If $s$ does not exceed one third of
   $\bar x$ ($3s \le \bar x$), the data can in most cases be treated as near-normal; if $s$ already
   equals or exceeds $\bar x$, severe skewness may be suspected.
4. **Run a normality test.** Graphical methods include P–P and Q–Q plots (points lying roughly on a
   straight line suggest normality); the statistical tests commonly used are the W test (Shapiro–Wilk),
   the D test, and the method of moments (coefficients of skewness and kurtosis).

Point 3 is only an empirical check for quickly excluding cases that clearly are not normal, and
**cannot replace tests and plots**.

### Medical reference ranges

A **medical reference range** (formerly called the normal range) is the range of fluctuation of
anatomical, physiological, and biochemical indices in most "normal people". Note that "normal people"
does not mean "perfectly healthy people", but a **homogeneous population from which diseases and factors
affecting the index in question have been excluded**.

Setting one involves four steps:

1. **Assemble a sufficiently large sample of "normal people"**, with measurement method, instruments,
   and conditions standardized and measurement error controlled.
2. **Choose a suitable percentile cut-off** $1-\alpha$, such as 80%, 90%, 95%, or 99%; **95%** is the
   common choice. Decide whether separate ranges are needed by sex or age.
3. **Decide whether it is one-sided or two-sided** — this depends on which side "abnormal" lies on in
   subject-matter terms: a white cell count is abnormal whether too high or too low → two-sided;
   transaminase is abnormal only when too high → one-sided upper limit; vital capacity is abnormal only
   when too low → one-sided lower limit.
4. **Choose the computational method according to the distribution**: the **normal distribution method**
   for normal or near-normal data, and the **percentile method** for skewed data or data with no
   definite values at the ends.

| Method | Data it suits | 95% two-sided | 95% one-sided |
| --- | --- | --- | --- |
| normal distribution method | normal or near-normal | $\bar x \pm 1.96\,s$ | upper $\bar x + 1.645\,s$; lower $\bar x - 1.645\,s$ |
| percentile method | skewed, or no definite values at the ends | $P_{2.5}$ to $P_{97.5}$ | upper $P_{95}$; lower $P_{5}$ |

In general form, the normal method gives a two-sided $1-\alpha$ limit of $\bar x \pm z_{\alpha/2} s$, a
one-sided upper limit of $\bar x + z_\alpha s$, and a one-sided lower limit of $\bar x - z_\alpha s$.
Commonly used $z$ values:

| Reference range (%) | One-sided $z_\alpha$ | Two-sided $z_{\alpha/2}$ |
| --- | --- | --- |
| 80 | 0.842 | 1.282 |
| 90 | 1.282 | 1.645 |
| 95 | 1.645 | 1.960 |
| 99 | 2.326 | 2.576 |

Two examples:

- height is normally distributed and a two-sided range is required: the 95% reference range for
  18-year-old male university students is $172.70 \pm 1.96 \times 4.01 = 164.84 \sim 180.56$ cm.
- urinary mercury in 200 normal people is skewed and only high values are abnormal, so the one-sided
  upper limit of the percentile method is used:
  $P_{95} = 36 + \frac{4}{5}(200 \times 95\% - 186) = 39.2$ μg/L.

::: warning Two common misunderstandings about the 95% reference range
**Misunderstanding one: anyone outside the range is a patient.** A 95% two-sided reference range covers
only the middle 95% of **normal people**; 2.5% of normal people at each end fall outside it. That is not
a "false positive" but a necessary consequence of how the range is defined. Reference ranges are for
screening and for signalling; diagnosis still requires the clinical picture.

**Misunderstanding two: one-sided or two-sided can be chosen freely.** It is determined by which side
"abnormal" lies on in subject-matter terms: a white cell count is abnormal whether too high or too low,
so two-sided; transaminase is abnormal only when too high, so the one-sided upper limit (with 95%
corresponding to $P_{95}$, not $P_{2.5}$ to $P_{97.5}$); vital capacity is abnormal only when too low,
so the one-sided lower limit.
:::

### Two other uses of the normal distribution

- **Quality control.** Random error in experiments follows a normal distribution, so $\bar x \pm 2s$ are
  used as **warning limits** and $\bar x \pm 3s$ as **control limits**, drawn with a center line as a
  quality control chart. A measured value outside the warning limit, or even outside the control limit,
  suggests the presence of systematic or other non-random error.
- **As the theoretical basis of many statistical methods.** The $t$, $F$, and $\chi^2$ distributions are
  all derived from the normal distribution, and the $z$ test rests directly on it; the limiting
  distributions of the $t$, binomial, and Poisson distributions are also normal, so they can be handled
  by normal rules when the conditions are met.

### Two further indices: the mode and the harmonic mean

The **mode** is the value occurring most often in a set of observations; it is also a positional index and
suits a rough description of central position. Its drawbacks are that the frequencies of different values
may be very close, making the mode unstable, and that it need not be unique. The **harmonic mean** is the
reciprocal of the mean of the reciprocals, used for certain problems involving average rates or average
concentrations; in health statistics it is far less used than the mean, the geometric mean, and the
median.

## Doing it in R

### 1. Computing a whole set of indices at once

```r
# iris: R's built-in iris data; each record is one plant, Sepal.Length is sepal length (cm)
x <- iris$Sepal.Length

length(x)                # sample size n = 150
mean(x)                  # arithmetic mean = 5.843333
median(x)                # median = 5.8
sd(x)                    # standard deviation s = 0.8280661
var(x)                   # variance s^2 = 0.6856935
range(x)                 # minimum and maximum: 4.3 7.9 (note: this is NOT the range!)
diff(range(x))           # range R = 3.6
quantile(x)              # 0%  25%  50%  75% 100% -> 4.3 5.1 5.8 6.4 7.9
IQR(x)                   # interquartile range Q = P75 - P25 = 1.3
sd(x) / mean(x) * 100    # coefficient of variation CV = 14.17113 (%)
summary(x)               # 4.300 5.100 5.800 5.843 6.400 7.900
```

How to read the output:

- `quantile()` by default gives five numbers: the minimum, $P_{25}$, the median, $P_{75}$, and the
  maximum, of which $P_{25}/P_{50}/P_{75}$ are the quartiles. Other quantiles are requested directly,
  for example `quantile(x, c(0.025, 0.975))` or `quantile(x, 0.95)`.
- The output of `summary()` is in the order "minimum, $P_{25}$, median, **mean**, $P_{75}$, maximum" —
  the fourth is the mean and the rest form the five-number summary. If the data contain `NA`, add
  `na.rm = TRUE`, as in `mean(x, na.rm = TRUE)`.
- Compare `mean(x)` with `median(x)`: here they differ by only 0.043, showing that the distribution is
  close to symmetric; for skewed data the two differ markedly (with positive skew the mean exceeds the
  median).
- `quantile()` uses algorithm type 7 by default (R's `type = 7`); SPSS's percentile algorithm differs
  slightly, so take care when checking numbers across software.

### 2. Frequency table and histogram: `cut()` + `table()`

```r
x <- iris$Sepal.Length
brk <- seq(4, 8, by = 0.5)     # class limits: 4~4.5, 4.5~5, ..., 7.5~8

# right = FALSE means the interval is [lower, upper), matching the textbook's
# "greater than or equal to the lower limit and less than the upper limit"
g <- cut(x, breaks = brk, right = FALSE, include.lowest = TRUE)
freq <- table(g)

data.frame(Interval = names(freq),
           Count = as.integer(freq),
           Percent = round(as.numeric(freq) / length(x) * 100, 1),
           CumCount = cumsum(as.integer(freq)),
           CumPercent = round(cumsum(as.numeric(freq)) / length(x) * 100, 1))

hist(x, breaks = brk, right = FALSE,
     main = "Sepal length of 150 irises",
     xlab = "Sepal length (cm)", ylab = "Frequency")
```

Output (the frequency table):

```
  Interval Count Percent CumCount CumPercent
1  [4,4.5)     4     2.7        4        2.7
2  [4.5,5)    18    12.0       22       14.7
3  [5,5.5)    30    20.0       52       34.7
4  [5.5,6)    31    20.7       83       55.3
5  [6,6.5)    32    21.3      115       76.7
6  [6.5,7)    22    14.7      137       91.3
7  [7,7.5)     7     4.7      144       96.0
8  [7.5,8]     6     4.0      150      100.0
```

How to read the output:

- `cut()` groups the continuous values by the limits and `table()` counts them; together the two
  functions are exactly the process of building a frequency table. The **first position in the
  cumulative relative frequency column that exceeds 50%** is the interval containing the median.
- The `breaks` argument of `hist()` can be either the class width (a single number) or, as here, a vector
  of limits, so that the classes match the frequency table exactly.
- `hist()` plots frequencies on the vertical axis by default; for a density histogram (rectangle area =
  relative frequency, allowing `lines(density(x))` to be overlaid) add `freq = FALSE` or
  `probability = TRUE`.

The textbook's **weighted method** can also be recomputed, to get a feel for the approximation introduced
by "the class midpoint standing for every observation in the class":

```r
mid <- (head(brk, -1) + tail(brk, -1)) / 2   # class midpoints
f   <- as.integer(freq)

sum(f * mid) / sum(f)                        # weighted mean = 5.893 (true value 5.843333)
sqrt((sum(f * mid^2) - (sum(f * mid))^2 / sum(f)) / (sum(f) - 1))
                                             # weighted SD = 0.824 (true value 0.8280661)
```

The coarser the class width, the further the midpoint is from the true values inside the class and the
larger the error — so if raw data are available, do not use the frequency-table method.

**Try it**: build a frequency table from `airquality$Temp` (153 daily maximum temperature observations)
starting at 50 with a class width of 5, compute the frequency, relative frequency, and cumulative
relative frequency, and draw the histogram. Try it yourself before comparing with the answer.

<AnswerBlock title="Reference answer · frequency table and histogram for airquality$Temp" description="The first cumulative relative frequency above 50% is the [75,80) interval, the same interval that median(airquality$Temp) = 79 falls into — confirming that 'the interval containing the median = the first interval whose cumulative relative frequency exceeds 50%'. Note also that the [50,55) interval has a frequency of 0, showing that starting at 50 is a little too low; starting at 55 would give more compact classes." :code="freqCode" :output="freqOut" />

### 3. The geometric mean

```r
# the 7 observations obtained by taking reciprocals of antibody titers
titer <- c(4, 8, 16, 32, 64, 128, 256)

exp(mean(log(titer)))                        # geometric mean = 32, i.e. mean titer 1/32

f <- c(1, 3, 6, 10, 13, 10, 7)               # number of cases at each titer (tabulated data)
exp(weighted.mean(log(titer), f))            # weighted geometric mean = 54.94819, i.e. 1/54.9
```

How to read the output: base R has no ready-made function for the geometric mean, but the formula is
simply "take logarithms → average → take the antilogarithm", which `exp(mean(log(x)))` does in one line;
with frequencies, replace `mean()` by `weighted.mean(log(x), f)`. Natural logarithms with `exp()`, or
common logarithms with `10^()`, both work — **as long as the base used for the logarithm and the
antilogarithm is the same**, the result is identical.

### 4. Boxplots: a distribution in five numbers

```r
boxplot(iris$Sepal.Length,
        horizontal = TRUE,
        main = "Sepal length of 150 irises",
        xlab = "Sepal length (cm)")

# grouped comparison: sepal length by species
boxplot(Sepal.Length ~ Species, data = iris,
        ylab = "Sepal length (cm)", main = "Sepal length by species")
```

How to read the output: a boxplot summarizes a distribution with **five statistics** — the lower edge of
the box is $P_{25}$, the middle line $P_{50}$ (the median), the upper edge $P_{75}$, and the two
"whiskers" extend to the furthest observation within $1.5 \times IQR$; individual points beyond the
whiskers are drawn separately and are suspected **outliers**. A median shifted towards one side of the
box indicates skewness. `boxplot.stats()` returns these values directly.

### 5. QQ plots and normality tests

```r
x <- iris$Sepal.Length
qqnorm(x, main = "Normal QQ plot of iris sepal length")
qqline(x, col = "red")          # reference line: points roughly on it suggest normality

shapiro.test(x)                 # W = 0.97609, p-value = 0.01018
shapiro.test(airquality$Temp)   # W = 0.97617, p-value = 0.009319 (n = 153)

y <- faithful$eruptions         # eruption duration of Old Faithful (minutes), n = 272
qqnorm(y, main = "Normal QQ plot of faithful eruption duration")
qqline(y, col = "red")
shapiro.test(y)                 # W = 0.84592, p-value = 9.036e-16
```

How to read the output:

- the horizontal axis of a QQ plot is the theoretical normal quantile and the vertical axis the quantile
  of the actual data. Points roughly on the line → normality suggested; **a flat middle with both ends
  curving up into an S shape → skewness or bimodality suggested**. `qqline()` draws the reference line;
  without it one can only compare by eye.
- The null hypothesis of `shapiro.test()` is "the data follow a normal distribution", so $p < 0.05$
  rejects normality. `faithful$eruptions` has $p \approx 9 \times 10^{-16}$ and is in fact **bimodal**
  (a short-eruption and a long-eruption group), and cannot be summarized by $\bar x \pm s$ at all.
- Conversely, $p > 0.05$ does **not** mean "normality has been proved"; it means only "there is not
  enough evidence to say it is not normal". The larger $n$, the more sensitive the test: the
  $p = 0.0102$ of `iris$Sepal.Length` is below 0.05, yet its QQ plot is almost a straight line, the
  slight departure coming mainly from the discrete values of the data themselves. **The conclusion has
  to be read from the plot, the test, and subject-matter knowledge together.**
- `shapiro.test()` accepts only samples with $3 \le n \le 5000$; for larger samples use
  `nortest::ad.test()`, `nortest::lillie.test()`, or similar. For a P–P plot, `plot(ecdf(x))` with
  `pnorm()` will do, or `car::qqPlot()`.

### 6. Reference ranges: the normal method versus the percentile method

```r
# daily maximum temperature in New York, May-September 1973 (F), n = 153, roughly symmetric
x <- airquality$Temp
mean(x); sd(x)                          # 77.88235; 9.46527

# normal distribution method: 95% two-sided
mean(x) + c(-1, 1) * 1.96 * sd(x)       # 59.33042  96.43428

# percentile method: 95% two-sided
quantile(x, c(0.025, 0.975))            # 57.8  93.2

# one-sided upper limit (95%) when only high values are abnormal
mean(x) + 1.645 * sd(x)                 # 93.45272
quantile(x, 0.95)                       # 92
```

```r
# switch to clearly non-normal data and the normal method produces meaningless limits
y <- faithful$eruptions
mean(y) - 1.96 * sd(y)                  # 1.250695: lower than the observed minimum of 1.6
min(y); max(y)                          # 1.6  5.1
quantile(y, c(0.025, 0.975))            # 1.75  4.907425
```

How to read the output:

- comparing the two sets of numbers in pairs is instructive: the temperature data are roughly symmetric
  and the two methods give similar limits (59.33/57.8, 96.43/93.2), so either will do; `faithful` is
  bimodal and the normal method gives a lower limit of 1.25 minutes, below the observed minimum, which
  amounts to inventing a range that does not exist — **skewed or bimodal data must use the percentile
  method**.
- Do not get the one-sided limit wrong: when only high values are abnormal use the one-sided upper
  limit, where 95% corresponds to $z = 1.645$ (not 1.96), or to $P_{95}$ with the percentile method.

### 7. Standardization and computing proportions from the normal distribution

```r
# standard normal transformation: subtract the mean, divide by the standard deviation
x <- iris$Sepal.Length
z <- (x - mean(x)) / sd(x)
c(mean(z), sd(z))            # -4.484318e-16  1.000000e+00 -> mean 0, SD 1
all.equal(z, as.numeric(scale(x)))   # TRUE: scale() does exactly the same thing

# use pnorm()/qnorm() instead of a table
pnorm(168.0, mean = 172.70, sd = 4.01)                       # 0.1205845, about 12.06%
pnorm(183.05, 172.70, 4.01) - pnorm(162.35, 172.70, 4.01)    # 0.9901499, about 99%
pnorm(-1.96)                                                  # 0.0249979, about 0.025 (the table value)
qnorm(0.975)                                                  # 1.959964, the 1.96 used in tables
qnorm(0.95)                                                   # 1.644854, the 1.645 used in tables
```

How to read the output: `pnorm(a, mean, sd)` gives "the proportion below $a$", which is the left-hand
cumulative area of a table; substituting a $z$ value gives the tabulated result, and the proportion
between two limits is the difference of two `pnorm()` values. `qnorm(p)` is the inverse: given a
cumulative probability it returns the $z$ value, so common values such as $z_{0.975}$ and $z_{0.95}$ need
not be memorized — one keystroke gives them.

### 8. The corresponding SPSS menus

To do the same things in SPSS, the menu paths are:

| Purpose | Menu |
| --- | --- |
| frequency table (frequency, percent, cumulative percent) | Analyze → Descriptive Statistics → Frequencies |
| mean, standard deviation, range, skewness, kurtosis | Analyze → Descriptive Statistics → Descriptives |
| boxplot, Q–Q/P–P plots, normality tests (S-W, K-S) | Analyze → Descriptive Statistics → Explore (Plots, Normality plots with tests) |
| histogram | Graphs → Legacy Dialogs → Histogram |
| describe separately by group (grouped comparison) | Analyze → Descriptive Statistics → Explore, with the grouping variable in Factor List |
| produce standardized z values | Analyze → Descriptive Statistics → Descriptives → tick "Save standardized values as variables" |

The SPSS "Explore" procedure prints both Kolmogorov–Smirnov and Shapiro–Wilk results, and the two tests
apply to somewhat different sample size ranges (small samples are usually read from S-W, large samples
from K-S), so **a report must state which test was used and what the sample size was**, rather than
simply quoting a $P$ value.

## Common pitfalls

- **`range()` is not the range.** `range(x)` returns the minimum and the maximum as two numbers; the
  range must be written `diff(range(x))`. Taking the result of `range()` for $R$ is a very common way to
  lose marks.
- **Do not compare "who varies more" using standard deviations directly.** When the units differ (height
  in cm and weight in kg), or are the same but the means are far apart (mice at 22.1 g and rabbits at
  1525.3 g), the coefficient of variation $CV = s/\bar x \times 100\%$ has to be used instead. Conversely,
  the $CV$ is meaningful only when the data are roughly symmetric and the mean is not near 0.
- **The geometric mean has hard preconditions.** The observations must contain no 0 and must not mix
  positive and negative values; titer data must have reciprocals taken first (1/4, 1/8 → 4, 8). Note also
  that it suits only log-symmetric (geometric-progression) data — ordinary skewed data call for the
  median, and it is not the case that "skewed means geometric mean".
- **Means and standard deviations from a frequency table are only approximations.** The class midpoint
  stands for every observation in the class, and the coarser the class width the larger the error. It is
  a remedy for when only a frequency table is available; with raw data in hand, use `mean()` and `sd()`
  directly.
- **Read the $P$ value of a normality test carefully.** $P > 0.05$ means only "not enough evidence to
  reject normality", not that normality has been proved; and $P < 0.05$ does not mean "the data cannot be
  used for a $t$ test" — with large samples even slight departures become significant. Remember too that
  `shapiro.test()` supports only $3 \le n \le 5000$, and that judging normality takes the plot, the test,
  and subject-matter knowledge together.

## How it connects to the other courses

::: tip Related pages
- **Lecture 9 of *Introduction to Information Technology*, Base Graphics**
  ([`/intro-it/9-base-graphics`](/en/intro-it/9-base-graphics)) — there the practice is with the `breaks`,
  `labels`, and `col` arguments of `hist()` and with `boxplot()`; here we discuss what each of these plots
  answers in a statistical description: the histogram shows the shape and symmetry of the distribution,
  the boxplot the five-number summary and outliers.
- **Lecture 11 of *Introduction to Information Technology*, The ggplot2 Package**
  ([`/intro-it/11-ggplot2`](/en/intro-it/11-ggplot2)) — its `geom_histogram()` and `geom_point()` are another
  way to draw the same plots, and its `scale_*()` color scales and themes make grouped comparisons
  easier to lay out than base R. The **boxplot** of this chapter is drawn in Chapter 19, Common
  Statistical Charts
  ([`/Health-statistics/19-tables-and-charts`](/en/Health-statistics/19-tables-and-charts)).
- **Lecture 12 of *Introduction to Information Technology*, Parameter Estimation**
  ([`/intro-it/12-parameter-estimation`](/en/intro-it/12-parameter-estimation)) — the $\bar x$ and $s$
  computed here are the raw material there: $\bar x$ is the point estimate of the population mean, and
  $s$ has to become the standard error $s/\sqrt{n}$ before interval estimation can be done. Here we
  discuss "how to describe a batch of data"; there, "how far this batch of data can infer the
  population".
- **Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing**
  ([`/Medical-Big-Data-Analysis/2-data-preprocessing`](/en/Medical-Big-Data-Analysis/2-data-preprocessing)) —
  the engineering use of the same indices: `mean()/var()/sd()/range()/quantile()/which.max(table())` in
  the exercises are this chapter's measures of central tendency and dispersion (`which.max(table())` is
  the mode); equal-width binning is the equal-interval grouping of a frequency table, and equal-frequency
  binning is cutting at percentiles; Z-score standardization $z=(x-\bar x)/s$ is exactly the standard
  normal transformation. The difference is that that week cares about "how to get the data into a form a
  model can consume", while this chapter cares about "what these numbers mean statistically and which one
  to choose".
- **Week 3 of *Medical Big Data Analysis and Decision Making*, Regression Analysis**
  ([`/Medical-Big-Data-Analysis/3-regression`](/en/Medical-Big-Data-Analysis/3-regression)) — the routine
  before modeling, "describe first, plot next, fit last": use this chapter's indices and a boxplot to
  find outliers and see whether variables are skewed, transform logarithmically where necessary, and only
  then enter the model.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/04-describing-quantitative-data
once translated; for now the Chinese page /Health-statistics/04-describing-quantitative-data) from:
- /intro-it/9-base-graphics, at the hist and boxplot exercises.
- /intro-it/11-ggplot2, where geom_histogram is discussed (geom_boxplot belongs to Chapter 19).
- /intro-it/12-parameter-estimation, in its summary.
- /Medical-Big-Data-Analysis/2-data-preprocessing, at "Exercise 1" and "Exercise 7 Z-score standardization".
-->

## Summary

- The statistical description of quantitative data = **tables and plots** (frequency table, histogram,
  boxplot, QQ plot) + **two families of indices** (central tendency, dispersion). Look at the type of
  distribution first, then decide which family to use.
- Central tendency is one of three: symmetric/normal uses the **arithmetic mean** $\bar x$; skewed or
  open-ended data use the **median** $M$; log-normal or geometric-progression data (titers, potencies) use
  the **geometric mean** $G$.
- Dispersion is used **as a pair** with central tendency: the mean goes with the **standard deviation**,
  the median with the **interquartile range**. To compare degrees of variation across different units or
  very different means, switch to the **coefficient of variation** $CV = s/\bar x \times 100\%$.
- The normal distribution is determined by $\mu$ (location) and $\sigma$ (shape), and the area under the
  curve follows fixed rules: 68.27% within $\mu \pm \sigma$, 95% within $\mu \pm 1.96\sigma$, and 99%
  within $\mu \pm 2.58\sigma$. After the transformation $z = (x-\mu)/\sigma$, standard normal tables give
  the proportion in any interval.
- Its two most common applications are **estimating frequency distributions** and **setting medical
  reference ranges** (normal data use $\bar x \pm z_{\alpha/2}s$, skewed data the percentile method, and
  one-sided must be distinguished from two-sided); it is also used for quality control ($\bar x \pm 2s$
  warning limits, $\bar x \pm 3s$ control limits) and as the theoretical basis of many statistical
  methods.

<TrackList :tasks="['Build a frequency table with cumulative percentages using cut() + table()', 'Say which measure of central tendency and which of dispersion suits a given distribution', 'Run mean/median/sd/IQR/CV on iris or airquality', 'Draw and interpret histograms, boxplots, and QQ plots', 'Run a normality test with shapiro.test() and interpret the P value correctly', 'Compute a 95% reference range by both the normal method and the percentile method']" />
