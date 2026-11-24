---
layout: doc
title: '19. Statistical Tables and Charts'
---

# Chapter 19. Statistical Tables and Charts

::: info Translation status
Translated from the [Chinese original](/Health-statistics/19-tables-and-charts). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> The numbers have already been computed — how do you put them into a table, into a chart, so that they are
> understood at a glance without letting the graphic overstate your conclusion?

## What this chapter is for

Earlier chapters dealt with **getting the computation right**: means, standard deviations, rates, $P$ values.
This chapter deals with **saying it clearly**.

The same batch of results, laid out as a grid table with a tangled structure or drawn as a bar chart with a
truncated vertical axis, leaves the reader with a completely different impression — even though not one number
has been computed wrongly. So this chapter has two jobs:

1. **Statistical tables**: arrange the data and the indices into rows and columns so that "reading one row from
   left to right gives you one complete sentence". There are just three core requirements: the key point stands
   out, the hierarchy is clear, and it stays simple.
2. **Statistical charts**: use points, lines, and areas to draw out the data's **distribution, composition,
   trend, and relationships**. A chart is far more intuitive than a table, but precisely because it is
   intuitive **it is also easier to mislead with** — one bar chart with a trimmed vertical axis can change
   someone's conclusion more than ten misplaced decimal points.

The material in this chapter looks like the most "humanities" part of the course, but it is really a set of
**technical specifications for choosing a chart and laying it out**: which data go with which chart, whether an
axis may start away from zero, whether a proportion belongs in a pie chart or a percent bar chart. Every one of
these rules has a reason behind it, and this chapter gives the reasons as well.

## Core concepts

### The five components of a statistical table

Listing statistical data and their indices in tabular form gives you a **statistical table**. What a research
paper uses is the **statistical table in the narrow sense** (the analysis table); questionnaires and compilation
tables belong to the broad sense and are outside this chapter.

A proper analysis table has five components, and the position and requirement of each are quite specific:

| Component | Position | Requirement |
| --- | --- | --- |
| Title | **centered above** the table | sums up the main content of the table, with the time and place noted when necessary; when there is more than one table, add a number, on the same line as the title and in front of it; when the whole table shares one unit, put the unit in brackets at the end of the title |
| Row heading | the **left side** of the table | the main characteristics of the things studied (that is, the grouping variables); the arrangement must follow a rule — time in order, values from small to large, or order of importance or of custom |
| Column heading | **above** the rule that separates the headings | the statistical indices of the things studied; put the unit in brackets when there is one |
| Rules | top rule, bottom rule, heading rule | vertical and diagonal rules are all removed; when there is a total column, add a total rule; use short dashes to separate layers when the table needs them |
| Numbers | the data area | Arabic numerals; **the same index to the same number of decimal places, with the decimal points aligned**; leave no blank cells — "…" for not yet available, "—" for no figure, and 0 when the value really is 0 |
| Footnote | **below** the table | no text is inserted into the data area; when an explanation is needed, mark the number with a superscript `*` and give the note below the table |

One self-check motto: **row heading (what it is) + column heading (which index) = one complete sentence**. Take
"the prevalence of hypertension is 25.2%" or "the mean systolic pressure of men aged 40–55 is 128 mmHg" — if it
reads through, the table is right; if it comes out as half a sentence, the headings are in the wrong places.

### The three-line table: only three horizontal rules

What a paper requires is the **three-line table**: only three horizontal rules — top, heading, bottom — with
**no vertical rules, no diagonal rules, and no cell grid**. The reason is a practical one: vertical rules cut
the reader's eye into little boxes and make people read the numbers cell by cell; remove them, and the eye
travels naturally along the row, so that reading one row through gives one complete sentence.

The table below is written to the three-line specification (VitePress tables draw only three horizontal rules by
default, which is exactly what a three-line table looks like):

| Disease | Prevalence (%) |
| :--- | ---: |
| Hypertension | 25.2 |
| Hyperlipidemia | 28.6 |
| Diabetes | 9.7 |

Two practical tips when you write one:

- right-align the numeric column with `---:` in the separator row (as in `| :--- | ---: |` above), so the
  decimal points line up naturally and numbers of the same magnitude are easy to compare;
- **do not stuff `x̄ ± S` into the title or a column heading.** The title says what the table is about, whereas
  `x̄ ± S` is what the numbers mean and belongs in the column heading; when a table carries both absolute and
  relative numbers, give `n` and `%` a column each and say so clearly in the column headings.

### Simple and composite tables

By the number of grouping variables there are two kinds:

- **Simple table**: a single grouping variable, used to compare several mutually independent things (or
  different levels of one thing).
- **Composite table**: two or more grouping variables, for example grouping by "stage of schooling" and
  "parental smoking" at the same time, which is what lets you analyze the link between the two.

A composite table carries a lot of information, but it is also the easiest place to violate "the key point
stands out". The test is: **a table should generally express only one central point.** If one table compares
operating time, blood loss, and postoperative pain grade all at once, with absolute and relative numbers mixed
in, it should be split into two (one for the intraoperative situation, one for the postoperative situation).

### Charts: structure, principles, and being self-explanatory

A statistical chart uses points, lines, and areas to express magnitudes, distributions, trends of change, and
relationships. Its most important property is that it is **self-explanatory**: you should understand what it
says from the chart alone, without reading the text. That is also a requirement: **leave out the title, the axis
labels, the units, or the legend, and it can no longer be self-explanatory**.

The five components of a chart:

| Component | Requirement |
| --- | --- |
| Title | placed **centered below** the chart body (the opposite of a table, where the title goes above and the chart title below); when there is a number, it goes in front of the title |
| Plot area | the drawing space, usually the first quadrant with the origin at the intersection of the two axes; an aspect ratio of about **5:7** looks better |
| Axis labels | the horizontal axis label goes **below** the horizontal axis and the vertical axis label to the **left** of the vertical axis; **where there are units, the units must be given** |
| Ticks | values running from small to large (the vertical axis upward, the horizontal axis from left to right), usually drawn below the horizontal axis and outside the vertical axis |
| Legend | when one chart compares two or more things, distinguish them by line type / symbol / color and add a legend (in the empty space at the top right of the plot area, or centered below the chart body) |

Three principles of graphing:

1. **The right chart** — choose the chart type by the nature of the data and the purpose of the analysis; this is
   the single most examinable point in the chapter;
2. **Simple and clear** — one chart usually expresses only one central point or theme;
3. **Accurate and good-looking** — moderate line width, accurately placed points, sensible proportions, and
   different things distinguished by different line types or colors.

> Choosing between a chart and a table: charts are for "seeing the shape, the trend, the relationship", tables
> for "seeing exact values". A chart does **not** mark precisely how much each element stands for; it gives only
> an approximate picture, so the key values should still be given in a statistical table, and the two are
> usually used together.

### Bar charts: comparing independent indices

A **bar chart** (also called a bar graph; when the bars are laid horizontally it is usually called a horizontal
bar chart) applies to **mutually independent data**: equal-width bars whose lengths show the size of each
statistic, describing the amount and the comparative relations of independent indices. It comes in two forms:
one statistical index plus one grouping variable is a **simple** bar chart; one statistical index plus two or
more grouping variables is a **grouped** bar chart.

Points to note when drawing one:

1. the horizontal axis normally carries the mutually independent things (the grouping variables) and the
   vertical axis the statistical index; bars usually stand upright but may be laid horizontally;
2. **the vertical scale must start at 0**, divided at equal intervals and normally not broken in the middle —
   otherwise the comparison between the groups changes (see "Common ways charts mislead"). If one or two values
   lie so far from the rest that a break is unavoidable, insert the symbol `//` on the axis to show that it is
   broken and then continues;
3. all bars have the same width, and the gaps are usually as wide as a bar or half a bar (**bar charts have
   gaps, histograms do not** — this is where the two are most often confused);
4. bars may be ordered by the size of the index; where there is a natural order (the stage of a disease, say),
   keep the natural order;
5. in a grouped bar chart the bars within one group must be distinguished by different colors or patterns and
   carry a legend; for two things in a part–whole relation, the full length of the bar can stand for the whole
   and the lower segment for the part (a component bar chart / stacked area chart).

To decide whether a bar chart fits, just ask one question: **are these groups "side by side" or "continuous"?**
Disease type, region, and blood group are side by side → bar chart; height classes and age classes are
continuous → histogram or line chart.

### Pie charts and percent bar charts: reading proportions

Both are used for **proportion data**, using the size of an area to describe how much of the whole each part
takes up.

A **pie chart** uses the total area of the circle for the whole (100%) and the area of each sector for a
component. How to draw one:

- divide the 360° circumference into 100 equal parts, so each 1% corresponds to 3.6°, and the central angle of
  each part is

$$\text{central angle} = \text{proportion}(\%) \times 3.6^\circ$$

- conventionally start at the 12 o'clock position and measure the central angles clockwise, dividing the circle
  into sectors and marking the percentages;
- distinguish the sectors by different colors or patterns and add a legend.

A **percent bar chart** takes the area of the full length of the bar as 100%, with the area of each segment
standing for a component:

- first draw a scale 100% long with 0 as its base, then draw a bar as long as the scale (its width is free, as
  looks best);
- divide the bar into segments by each part's percentage (from large to small, or in natural order), distinguish
  the segments by different colors/patterns, mark the percentages, and add a legend.

**Which to choose**: when there is only one proportion to show, either will do; **to compare two or more
proportions, use a percent bar chart** (several bars can be aligned one above the other and compared segment by
segment), whereas pie charts placed side by side can hardly be compared at all.

### Line charts: reading a trend

A **line chart** applies to **continuous data**, using the rise and fall of line segments to describe how
something changes over time or as conditions change. The horizontal axis is usually a continuous variable such
as time or age, and the vertical axis shows a rate, a mean, or a frequency. There are two kinds:

- **ordinary line chart**: both axes on an arithmetic scale, reflecting the **absolute** change in the thing,
  commonly used to describe a trend;
- **semi-logarithmic line chart**: an arithmetic scale on the horizontal axis and a logarithmic scale on the
  vertical axis, reflecting the **relative** change, used to describe the **speed** of change, and especially
  suitable when the absolute magnitudes of the things being compared differ enormously.

Points to note when drawing one:

1. join the marked measurement points with straight lines; **do not smooth them into a curve** (a smooth curve
   implies intermediate values you never observed);
2. the vertical axis of an ordinary line chart generally starts at 0; the starting point of a semi-logarithmic
   line chart may be 0.1, 1, 10, according to the data; the horizontal axis may start away from 0;
3. when plotting by class intervals, each class starts at its lower limit and **the coordinate is taken at the
   midpoint of the class**;
4. do not put too many curves in one plot area; with two or more, distinguish them by solid / dashed / dotted
   lines or by color and add a legend.

**Why must the "speed of change" be read from a semi-logarithmic line chart?** A speed of change is a relative
change. Let the index at two time points be $y_1$ and $y_2$; then on the two scales the "slope" corresponds to

$$\text{arithmetic-scale slope} \propto y_2 - y_1 \quad(\text{absolute difference}),\qquad \text{log-scale slope} \propto \lg y_2 - \lg y_1 = \lg\frac{y_2}{y_1}\quad(\text{relative ratio})$$

Take three sets of numbers: $1000\to100$ (absolute difference 900, relative ratio 10), $100\to10$ (absolute
difference 90, relative ratio 10), $10\to1$ (absolute difference 9, relative ratio 10). The three sets **fall at
exactly the same speed**, yet the absolute differences differ by a factor of 100. On an ordinary line chart the
slopes of the three lines are worlds apart, so it looks as though "the group that started high is falling
fastest"; on a semi-logarithmic line chart, because the log differences are all equal to 1, the three lines
**have the same slope** and equal speeds are plain at a glance.

This is why, when comparing the speed of change of indices with wildly different absolute magnitudes — incidence
rates, death rates — you must use a semi-logarithmic line chart: an ordinary line chart creates the illusion
that "the group with the high baseline fluctuates a lot and falls fast, while the group with the low baseline
hardly changes at all". It is also a common discrimination question in the practicals: **an ordinary line chart
shows "how much it changed", a semi-logarithmic line chart shows "by what percentage it changed"**.

### Histograms: reading a distribution

A **histogram** describes the **distribution of continuous data**, bringing out the features of the frequency
distribution (central tendency and dispersion) and its type (symmetric or skewed), using the areas of touching
bars for the frequency in each class.

Points to note when drawing one:

1. the horizontal axis represents the thing studied and the vertical axis the frequency, and **the vertical
   scale starts at 0**;
2. **no gaps between the bars** (you may draw a line between bars to separate them, but there must never be a
   gap);
3. the width of a bar equals the class width and its height the frequency of that class;
4. if the data were organized with **unequal class widths**, they must be converted to a common class width
   before plotting, that is, the height of each rectangle adjusted:

$$h_i = \frac{f_i}{d_i}\quad(\text{rectangle height} = \text{the class frequency} \div \text{the class width})$$

Point 4 is the detail most often overlooked: with equal class widths, "height = frequency" and
"height = frequency / class width" differ only by a constant, so it looks as though it does not matter; but as
soon as the class widths are unequal (the last class being "over 80", say, with a span far wider than the
others), using the frequency directly as the height **draws the wide class far too prominently** and distorts
the shape of the distribution.

### Boxplots: comparing several distributions

A **boxplot** uses five statistics to reflect the distribution and type of the data, and is often used to
compare the distributions of two or more groups of continuous data:

- the top of the rectangle = the upper quartile $P_{75}$, the bottom = the lower quartile $P_{25}$, and the line
  across the middle = the median $M$;
- the two "handles" (whiskers) above and below = the maximum and minimum apart from outliers;
- outliers in the data are marked with "○" and extreme values with "*".

How to read it:

- **the longer the rectangle, the greater the variation**;
- a line in the **exact middle** of the rectangle → a symmetric distribution; shifted to one side → skewed
  (shifted towards the higher values means left-skewed, and the reverse right-skewed);
- the circles and stars outside the box are **outliers**, and they may be data errors or genuine and important
  individual cases — both must be investigated.

R's `boxplot()` decides outliers by the interquartile range rule:

$$IQR = P_{75}-P_{25},\qquad \text{points beyond } [\,P_{25}-1.5\,IQR,\ P_{75}+1.5\,IQR\,] \text{ are marked as outliers}$$

The greatest value of a boxplot is that **it gives location, dispersion, and outliers all at once**. By the time
you see a bar chart in which "the two group means are about the same", a boxplot may tell you that one group is
symmetric and the other bimodal — the same mean, an entirely different meaning.

### Scatter plots: reading the relation between two variables

A **scatter plot** describes the quantitative relation between two variables through the density and the trend
of the points.

Points to note when drawing one:

1. the horizontal axis represents the independent variable $x$ and the vertical axis the dependent variable
   $y$; **the vertical axis may start away from 0** (unlike a bar chart, because a scatter plot is about the
   relation between two variables, not about the size of each);
2. each pair of values is one point, and **points are not joined by straight lines** (joining them invents a
   batch of intermediate values you never observed).

A scatter plot is the **preliminary check** for linear correlation and regression: only after looking at the
chart do you know whether correlation and regression are appropriate at all. If the points form a curved band,
or show a clear grouping structure, or have outliers far from the main body, then computing a Pearson
correlation coefficient $r$ directly is meaningless — Chapter 13, Simple Linear Regression, will come back to
this repeatedly.

### Error bar charts: mean + uncertainty

An **error bar chart** overlays a short line on a bar (or a point) to show the amount of variation, and is the
most common "bar chart that carries information" in medical papers. What the error bars stand for must be
stated in the figure caption, because the three possibilities mean entirely different things:

$$\bar{x}\pm s \quad(\text{standard deviation, describing individual variation}),\qquad \bar{x}\pm s_{\bar x}=\bar{x}\pm\frac{s}{\sqrt{n}}\quad(\text{standard error, describing the sampling error of the mean}),\qquad \bar{x}\pm 1.96\,s_{\bar x}\quad(\text{approximate 95\% confidence interval})$$

On one and the same data set, the $\bar x \pm s$ error bar is about $\sqrt{n}$ times as long as the
$\bar x \pm s_{\bar x}$ one — drawn as standard deviation it looks as though "the difference between the groups
is very small", drawn as standard error as though "the two groups are clearly different", and **the reader
simply cannot tell from the chart which of the two you drew**. So: the caption must state whether it is SD, SE,
or 95% CI, and a confidence interval or a standard error is the better choice when comparing groups.

One more point: **an error bar can only show "mean ± variation", and it cannot replace a hypothesis test.**
Error bars that do not overlap do not mean the difference is statistically significant, and error bars that do
overlap do not mean there is no difference — the conclusion still has to come from a test.

### Heatmaps: a whole matrix in one chart

A **heatmap** shows the size of the values in the cells by the depth of a color, and suits matrix-shaped data
in which "the rows and columns are both groupings and the cells hold values or rates", such as a correlation
matrix, a gene expression matrix, or a table of incidence rates by age group × disease type. Its advantage is
**finding the regions of high and low values within one screen**: where there is a patch of dark color, where
there is a sudden change — far quicker than reading a table.

Three rules for using one:

1. **a heatmap is not for precise readings.** Color can only separate "high, middle, low"; for the actual
   numbers you still have to go back to the table;
2. **columns on different scales must be standardized first** (otherwise the column with the largest scale takes
   over the whole color scale), and the legend must say what the axes are and what the color stands for;
3. a classic heatmap will **also draw the dendrograms of the row and column clustering** (the result of
   hierarchical clustering), and at that point the chart no longer means "look at the values" but "look at the
   clustering structure".

### Statistical maps: reading a geographic distribution

A **statistical map** describes the geographic distribution of a phenomenon: with administrative divisions as
the units, shading or colors of different depth show the prevalence or the level of a disease. When the data
themselves carry a geographic attribute (province, city, county) it is the first choice; conversely, **do not
use pie charts or bar charts to express a geographic distribution** — that throws the map information away.

### Which data go with which chart

This is the table in this chapter most worth memorizing. When choosing a chart, ask three questions in order:
**what type are the data** → **what is the purpose of the analysis** → **is there a way of drawing it that
misleads less easily**.

| Data type | Purpose of the analysis | Recommended chart | What not to use |
| --- | --- | --- | --- |
| Categorical data: several mutually independent groups (disease type, region, blood group) | comparing sizes, ranking | bar chart (simple) | line chart (there is no continuous order between the groups); pie chart (for comparing sizes) |
| Categorical data: one index + two grouping variables (urban/rural × disease type) | comparing groups | grouped bar chart | drawing a separate pie chart for each group and comparing them side by side |
| Categorical data: the internal composition of one whole (blood group composition, cause-of-death composition) | how big a share each part takes | pie chart (≤ 5–6 slices); to compare several proportions use a percent bar chart | too many slices in a pie chart; comparing compositions with several pie charts |
| Continuous data: one variable (height, blood pressure, body temperature) | shape of the distribution, center and spread, skewness/bimodality | histogram | bar chart (the bars of a continuous variable may not have gaps) |
| Continuous data: comparing distributions by group (male/female, three treatments) | comparing location and dispersion, finding outliers | boxplot | a bar chart showing only mean ± SD (hides bimodality, skewness, and outliers) |
| The relation between two variables (BMI and systolic pressure) | correlation, nonlinearity, outliers | scatter plot | line chart (there is no continuous meaning between the points) |
| Continuous data changing over time (year, month of age) | trend and fluctuation | ordinary line chart | bar chart (treating continuous time as categorical); smoothing the polyline into a smooth curve |
| Several indices changing over time with very different absolute magnitudes | comparing the speed of change (relative change) | semi-logarithmic line chart | ordinary line chart (the slope is dominated by the absolute difference, so comparing speeds gives the wrong conclusion) |
| Group means + information about variation | comparing means and showing uncertainty | error bar chart (stating whether the error bars are SD / SE / 95% CI) | a bar chart with the means only and no variation |
| Matrix data (rows and columns both groupings, cells holding values or rates) | finding the regions of high and low values fast | heatmap | using a heatmap for exact readings; comparing columns on different scales without standardizing |
| A phenomenon with a geographic attribute (province, city, county) | geographic distribution | statistical map | using a pie chart or a bar chart in place of a map |
| The result of clustering or classification | cluster structure, which sample belongs where | dendrogram (tree diagram), silhouette plot, cluster scatter plot | drawing a conclusion from a single number (the average silhouette coefficient, say) |

Mnemonic version: **independent groups → bar chart; internal composition → pie chart / percent bar chart;
trend over time → line chart; speed → semi-logarithmic line chart; distribution → histogram; comparing several
distributions → boxplot; relation between two variables → scatter plot.**

### Common ways charts mislead

A chart is more intuitive than a table, but the price of that intuition is that **the reader's judgment is
steered by your choices in drawing it**. None of the three practices below changes a single number, yet each
can turn a conclusion right over.

**1. Truncating the vertical axis (a bar chart whose vertical axis does not start at 0)**

The resuscitation success rates of four departments in one hospital are 80.25%, 77.26%, 94.12%, and 78.33%.

- vertical axis from 0: the four bars are almost the same height, and what the reader sees is "the four
  departments are much the same";
- vertical axis from 70: the 80.25 bar has length $80.25-70=10.25$ and the 77.26 bar $77.26-70=7.26$, so the
  first looks about **40% taller** than the second, and the reader takes the gap to be enormous.

The same batch of numbers, and merely moving the starting point from 0 to 70 turns "much the same" into "very
different". So the rule is hard: **the vertical axis of a bar chart must start at 0, be divided at equal
intervals, and not be broken in the middle.** Only when one or two values really do lie far from the main body
and a break is unavoidable should you draw the break symbol `//` on the axis to say so. Note that the vertical
axes of scatter plots and boxplots may start away from 0 — because they do not use a "length" to show magnitude,
and this prohibition applies to bar charts only.

**2. Too many slices in a pie chart**

Draw the composition of 12 causes of death as a pie chart, and three of the slices have proportions 8.1%, 8.0%,
and 8.0%. Converting to central angles: $8.1\% \times 3.6^\circ = 29.16^\circ$ and
$8.0\% \times 3.6^\circ = 28.8^\circ$ — a difference of 0.36°, so that **the eye cannot tell which slice is
bigger**, even though these three rank third, fourth, and fifth.

The eye compares angles and areas far less precisely than it compares lengths. So: with more than 5–6 slices,
do not use a pie chart; to compare two or more proportions, use a percent bar chart instead; and **if the real
aim is "comparing sizes" rather than "seeing the composition", go straight to a bar chart ordered by value**.

**3. Dual vertical axes**

Plot "air-conditioner sales" and "mean monthly temperature" on one chart, sales on the left axis and temperature
on the right, and the two curves look closely matched, as if they proved that "temperature determines sales".
But the two scales are yours to choose: put sales on 0–1000 (ten thousand units) and temperature on 0–40 °C and
the two lines look synchronized; change the right axis to 20–45 °C and they immediately stop matching.

The problem is not the data but that **the chart hides a free parameter you can set to anything**, and that
parameter is not written on the chart. This is exactly the situation in R where two charts are overlaid with
`par(new = TRUE)`: once overlaid, even the axes have to be switched off by hand and redrawn
(`xaxt = "n"` / `yaxt = "n"`), and one small oversight produces the error of "the two axes standing for
mismatched quantities" with the reader noticing nothing. **To compare two indices on different scales, two
charts aligned one above the other (sharing the horizontal axis) are preferable, or standardize / take logs of
both indices first — anything but a dual vertical axis.**

Two common variants while we are here:

- **using a "mean ± SD bar chart" instead of a distribution plot**: the two group means are almost equal, yet
  one group is symmetric and the other bimodal (one group "all close to the average", the other "half high,
  half low"); the bar chart shows nothing of it, while a boxplot or a histogram spots it at once. A chart of
  means alone draws its conclusion after deleting the distribution.
- **drawing a histogram from unequal class widths without converting**: the last class, "over 80", has a class
  width far larger than the others; use the frequency directly as the height without converting (rectangle
  height = frequency ÷ class width) and that class is drawn far too prominently, distorting the shape of the
  distribution.

## Doing it in R

R's base graphics functions correspond one to one with this chapter's chart types; start by remembering this
**chart type → function** table:

| Chart type | base R function | Key arguments |
| --- | --- | --- |
| Histogram | `hist()` | `breaks=` (a **suggestion** for the number of classes; the actual number is in the output), `freq=FALSE` for a density |
| Bar chart (simple/grouped) | `barplot()` | `beside=TRUE` for grouped, `horiz=TRUE` for horizontal |
| Percent bar chart | `barplot()` + `prop.table()` | normalize to 100% first, then stack |
| Pie chart | `pie()` | `labels=` to mark the percentages |
| Ordinary line chart | `plot(type="b")` | `type="l"` joins the points only, `"b"` draws points and lines together |
| Semi-logarithmic line chart | `plot(log="y")` | a log scale on the vertical axis (equivalent to plotting an ordinary line chart after `log10()`) |
| Boxplot | `boxplot()` | the formula form `y ~ group` |
| Scatter plot | `plot(x, y)` | a scatter plot by default; do not add `type="l"` |
| Error bar chart | `barplot()` + `arrows()` | `code=3` draws both ends |
| Heatmap | `heatmap()` / `image()` | `scale="column"` to standardize first |

The examples below use R's built-in `iris`, `mtcars`, and `airquality`, and every one of them can be copied and
run as it stands.

First the smallest possible version — four lines, one chart each:

```r
hist(iris$Sepal.Length, main = "Distribution of sepal length", xlab = "Length (cm)")
boxplot(Sepal.Length ~ Species, data = iris)
barplot(table(mtcars$cyl))
plot(iris$Sepal.Length, iris$Petal.Length)
```

**1. Histogram: the shape of a distribution**

```r
hist(iris$Sepal.Length,
     breaks = 12,                     # a SUGGESTION for the number of classes; the actual number is in the output; try 4 and 20 and the shape changes
     main = "Sepal length of 150 irises",
     xlab = "Sepal length (cm)",
     ylab = "Frequency")

# switch the vertical axis to density and overlay a density curve to see the skewness
hist(iris$Sepal.Length, freq = FALSE, breaks = 12,
     main = "Histogram + density curve",
     xlab = "Sepal length (cm)", ylab = "Density")
lines(density(iris$Sepal.Length), lwd = 2)
```

How to read the output: the horizontal axis carries the class intervals of the continuous variable, the vertical
axis the frequency, and there are **no gaps** between the bars. Look at whether it is left–right symmetric and
whether there is a second peak. `breaks` is the one argument you have to try by hand, but remember that it is
only a **suggestion**: R hands it to `pretty()` to pick "nice-looking" class intervals, so `breaks = 12` actually
draws **8 classes**, and `breaks = 6` and `breaks = 12` give **exactly the same** intervals and frequencies (if
the page told you to "try 6", you would see an identical chart). To really change the shape, use `breaks = 4`
(4 classes) or `breaks = 20` (19 classes): too few classes flatten a bimodal distribution into a single peak,
too many turn random fluctuation into a "false peak".

**2. Bar chart: simple and grouped**

```r
# simple: one grouping variable
barplot(table(mtcars$cyl),
        main = "Number of models by cylinder count",
        xlab = "Cylinders", ylab = "Number of models")

# grouped: one statistical index + two grouping variables
tab <- table(Cylinders = mtcars$cyl, Transmission = mtcars$am)
barplot(tab, beside = TRUE,
        names.arg = c("automatic", "manual"),
        legend.text = rownames(tab),
        args.legend = list(x = "topright"),
        main = "Cylinder counts of models by transmission (number of models)",
        xlab = "Transmission", ylab = "Number of models")
```

The vertical axis of the output starts at 0 by default — exactly what this chapter requires. **Do not write
`ylim = c(70, 100)` in order to "magnify the difference"**; that is precisely the truncated vertical axis
described earlier.

**3. Percent bar chart: normalizing each group to 100%**

```r
pct <- 100 * prop.table(tab, 2)      # normalize by column (transmission); each column sums to 100
barplot(pct, horiz = TRUE, xlim = c(0, 100),
        names.arg = c("automatic", "manual"),
        legend.text = rownames(pct),
        args.legend = list(x = "bottomright"),
        xlab = "Proportion (%)", ylab = "Transmission",
        main = "Cylinder-count composition by transmission")
```

The key is `prop.table()`: **proportion data must be normalized before it is plotted**; stack the raw counts
directly and the bars have different lengths, so what you are comparing is not the composition but the totals.

**4. Pie chart**

```r
n <- table(iris$Species)
pie(n,
    labels = paste(names(n), sprintf("%.1f%%", 100 * n / sum(n))),
    main = "Composition of the three iris species")
```

The ring of labels beside the output is the percentage of each part. Here all three slices read `33.3%`:
`100 * 50 / 150` is 33.333…, and once `%.1f` rounds it the three slices add up to only **99.9%**, not 100% —
the ordinary consequence of rounding, not data going missing, but the report has to say so clearly (either keep
more decimal places, or add a line "because of rounding the total is not 100%"). `pie()` suits only proportions
with a few slices; to compare several proportions, go back to the percent bar chart above.

**5. Ordinary line chart**

```r
m <- aggregate(Temp ~ Month, data = airquality, FUN = mean)   # mean temperature by month

plot(m$Month, m$Temp, type = "b", pch = 19,
     xlab = "Month", ylab = "Mean monthly temperature (°F)",
     main = "Mean monthly temperature in New York, 1973")
```

`type = "b"` draws points and lines together, but **the segments between neighboring points are straight** —
nothing is smoothed. Never fit a smooth curve just because it "looks better": that draws intermediate values
you never observed.

**6. Semi-logarithmic line chart: comparing speeds of change**

```r
year <- 2000:2009
a <- 1000 * 0.9 ^ (0:9)   # an index with a high starting point, falling 10% a year
b <- 100 * 0.9 ^ (0:9)    # starting 10 times lower, falling at exactly the same speed

par(mfrow = c(1, 2))      # the two charts side by side, for comparison

plot(year, a, type = "b", pch = 19, ylim = c(0, 1000),
     xlab = "Year", ylab = "Incidence rate (per 100,000)",
     main = "Ordinary line chart: arithmetic scale")
lines(year, b, type = "b", pch = 19)          # looks like a flat line

plot(year, a, type = "b", pch = 19, log = "y", ylim = c(30, 1200),
     xlab = "Year", ylab = "Incidence rate (per 100,000, log scale)",
     main = "Semi-logarithmic line chart: log scale")
lines(year, b, type = "b", pch = 19)          # parallel to the one above

par(mfrow = c(1, 1))      # remember to set it back, or every later plot is squeezed into two panels
```

The two charts use the same batch of data: on the left the curve that starts low looks like a flat line, and on
the right the two lines are **parallel** — and parallel is exactly what says "they fall at the same speed".
`log = "y"` is the semi-logarithmic line chart; without semi-logarithmic paper, taking the common logarithm of
the vertical-axis data and plotting it on arithmetic paper has the same effect:
`plot(year, log10(a), type = "b")`.

The right-hand chart must be given an explicit `ylim`: under `log = "y"`, `plot()` fixes the range of the
vertical axis from the first vector `a` alone, and the whole range of `b` (38.74~100) lies below it; without
`ylim`, `lines()` clips to the plot area (the default `xpd = FALSE`) and not a single point of `b` is drawn.

**7. Boxplot: location, dispersion, and outliers at once**

```r
boxplot(Sepal.Length ~ Species, data = iris,
        main = "Sepal length distribution of the three iris species",
        xlab = "Species", ylab = "Sepal length (cm)")

# compute the five statistics and compare them with the chart
tapply(iris$Sepal.Length, iris$Species,
       function(x) quantile(x, c(0, .25, .5, .75, 1)))
```

The **formula form** `y ~ group` (dependent variable ~ grouping variable) appears again and again in Lecture 9:
boxplots, `aggregate()`, and `barplot(Freq ~ Admit + Dept, ...)` all use it. The top and bottom of the rectangle
on the chart are $P_{75}$ and $P_{25}$, the line across the middle is the median, and the circles beyond the
whiskers are the outliers R marks by the $1.5\,IQR$ rule.

Note, though: **the five numbers printed above and the five drawn on the chart are not always on the same
convention.** `quantile()` computes quantiles by type 7 linear interpolation by default, whereas `boxplot()`
draws hinges (equivalent to `fivenum()`), and with a large $n$ and awkward data the two differ slightly — you
can see it in the virginica group: the printed $P_{25}$ is 6.225 while the bottom of the rectangle on the chart
is 6.2, and the printed 0% is 4.9 while the whisker on the chart ends at 5.6 (4.9 being exactly the point marked
as an outlier). In the setosa and versicolor groups the two agree. So when comparing, take **the convention drawn
on the chart** as authoritative and treat `quantile()` as a reference only.

**8. Scatter plot**

```r
plot(iris$Sepal.Length, iris$Petal.Length, pch = 19,
     xlab = "Sepal length (cm)", ylab = "Petal length (cm)",
     main = "Sepal length vs petal length")

abline(lm(Petal.Length ~ Sepal.Length, data = iris),   # add a regression line to help read the trend
       col = "red", lwd = 2)
```

Look at the chart first and add the line afterwards; the order cannot be reversed: if the chart has grouping
structure or outliers, that regression line means nothing.

**9. Error bar chart**

```r
m <- tapply(iris$Sepal.Length, iris$Species, mean)
s <- tapply(iris$Sepal.Length, iris$Species, sd)
n <- tapply(iris$Sepal.Length, iris$Species, length)   # number of cases per group; 50 in all three

bp <- barplot(m, ylim = c(0, 9),
              xlab = "Species", ylab = "Sepal length (cm)",
              main = "Mean ± 1 standard deviation")
arrows(bp, m - s, bp, m + s, angle = 90, code = 3, length = 0.08)
```

`barplot()` returns the horizontal coordinate of the center of each bar (stored in `bp`), and `arrows()` uses
exactly that coordinate to put the error bar in the middle of the bar. Change `s` to `s / sqrt(n)` and it becomes
the standard error (`n` being the per-group number of cases computed above, 50 in all three groups) — the error
bars become noticeably shorter, **so the figure caption must say clearly which one is drawn**.

**10. Heatmap**

```r
heatmap(as.matrix(iris[, 1:4]),
        scale = "column",                               # standardize each column first, or the column on the larger scale takes over the color scale
        labCol = c("Sepal length", "Sepal width", "Petal length", "Petal width"),
        main = "Heatmap of the four measurements")
```

Note the output: the two extra trees on the left and at the top are **dendrograms from hierarchical
clustering**. `heatmap()` clusters and reorders the rows and the columns by default, so the order of the rows
(the samples) differs from the raw data. If all you want is the correlation matrix, `image()` is more direct:

```r
r <- cor(iris[, 1:4])
image(1:4, 1:4, r, zlim = c(-1, 1), axes = FALSE,
      xlab = "", ylab = "", main = "Correlations among the four measurements")
axis(1, 1:4, colnames(r), las = 2, cex.axis = 0.8)
axis(2, 1:4, colnames(r), las = 2, cex.axis = 0.8)
box()
```

### The ggplot2 equivalents

The same charts, described by ggplot2 in terms of "layers": `ggplot()` sets the data and the mapping and
`geom_*()` decides what kind of chart is drawn. The equivalents of the charts above:

```r
library(ggplot2)

# histogram: hist()
ggplot(iris, aes(x = Sepal.Length)) +
  geom_histogram(bins = 12, fill = "grey70", colour = "white") +
  labs(title = "Distribution of sepal length", x = "Length (cm)", y = "Frequency")

# boxplot: boxplot(y ~ group)
ggplot(iris, aes(x = Species, y = Sepal.Length)) +
  geom_boxplot() +
  labs(title = "Sepal length distribution of the three iris species", x = "Species", y = "Length (cm)")

# grouped bar chart: barplot(..., beside = TRUE)
ggplot(mtcars, aes(x = factor(am, labels = c("automatic", "manual")), fill = factor(cyl))) +
  geom_bar(position = "dodge") +
  labs(title = "Cylinder counts of models by transmission (number of models)", x = "Transmission", y = "Number of models", fill = "Cylinders")

# scatter plot: plot(x, y)
ggplot(iris, aes(x = Sepal.Length, y = Petal.Length)) +
  geom_point() +
  geom_smooth(method = "lm", se = FALSE) +
  labs(title = "Sepal length vs petal length", x = "Sepal length (cm)", y = "Petal length (cm)")

# heatmap: heatmap() / image()
ggplot(as.data.frame(as.table(cor(iris[, 1:4]))), aes(x = Var1, y = Var2, fill = Freq)) +
  geom_tile() +
  scale_fill_gradient2(low = "steelblue", mid = "white", high = "firebrick", limits = c(-1, 1))
```

**Note**: details such as switching `bins` to `binwidth` in `geom_histogram()`, axis ticks, legend position, and
the theme (`theme_*()`), plus drawing a heatmap with `geom_raster()` and `scale_*()` scale transformations, are
all covered systematically in **[Lecture 11 of *Introduction to Information Technology*, The ggplot2
Package](/en/intro-it/11-ggplot2)**. One aside: `bins = 12` and the base version's `breaks = 12` **are not the
same thing** — `bins` gives you exactly as many bars as you ask for (the chart above has exactly 12), whereas
`breaks` is only a suggestion handed to `pretty()` (which is why the earlier `hist()` with `breaks = 12` draws 8
classes). What this chapter cares about is "which chart to use and how not to distort it"; for syntax details go
to Lecture 11, and if you have never written a `ggplot()`, copy the block above and get it running first, then
go back and fill in the syntax.

> In the practicals, drawing with SPSS goes through the `Graphs → Legacy Dialogs` menu
> (Bar / Pie / Line / Boxplot / Scatter), and the judgments about which chart type to use are identical to this
> chapter. The difference is that the charts SPSS draws put the title at the top by default, so you have to move
> it to the bottom by hand and write the meaning of the error bars into the caption; changing the starting point
> of a vertical axis or adding a log scale has to be done in Chart Editor → Properties, and before you change
> anything think clearly about "whether it should be changed at all".

## Common pitfalls

- **Turning a table into a grid.** Excel comes with vertical rules, borders, and shading by default, so pasting
  it straight into a paper gives a grid table. The right way is to keep only the top rule, the heading rule, and
  the bottom rule (the three-line table) and delete every vertical and diagonal rule; the same set of data is
  then read by "lining the rows up", not by box lines.

- **Row heading and column heading the wrong way round.** A common mistake is to put the statistical indices
  (means, rates, counts) on the left and the groupings (sex, region) across the top — that reads out as "25.2%
  of hypertension prevalence" instead of "the prevalence of hypertension is 25.2%". The test is that motto:
  **read left to right, and one row must read as one complete sentence**. Note too that a title must not be an
  empty phrase like "comparison table", and `x̄ ± S` must not be stuffed into the title.

- **Numbers not aligned, blanks left empty.** The same index given to inconsistent numbers of decimal places
  (80.25 mixed with 77.3), decimal points not aligned, blank cells where "not available / none / 0" should be
  written, and "0.0" written as "one". The standard is: the same index to a consistent number of decimal places
  with the decimal points aligned; "…" for not yet available, "—" for no figure, and 0 when the value really is
  0. Whether you rule it with a marker on paper or typeset it in Word, the requirement is the same.

- **Drawing a histogram where a bar chart belongs (or the reverse).** For two independent groups of
  postoperative recovery days, or the prevalence of four disease types, the bars **must have gaps**; whereas for
  the frequency distribution of a continuous variable (height classes, blood pressure classes) the bars **must
  touch**, and a gap says "these groups are disconnected". By the same token, continuous time data belong in a
  line chart; draw them as categories in a bar chart and the trend information is gone.

- **Tampering with the axes.** A bar chart whose vertical axis does not start at 0 (exaggerating the
  difference), a semi-logarithmic line chart whose vertical axis starts at 0, a line chart with the polyline
  smoothed into a smooth curve, a histogram drawn from unequal class widths without converting the class width —
  all four belong to "the numbers are right but the chart is lying". Before you change an axis, ask yourself:
  after the change, has the reader's impression of **how big the difference is** changed? If it has, you may not
  change it.

- **Drawing the means without the variation, or not saying what the error bars are.** A mean ± SD bar chart
  makes a bimodal distribution look like a symmetric one; change `x̄ ± s` to `x̄ ± s_{\bar x}` and the error bars
  shrink by a factor of $\sqrt{n}$, so that to the eye "the difference between the groups is obvious". The figure
  caption must state whether the error bars are SD, SE, or 95% CI, and remember that whether error bars overlap
  **cannot** replace a hypothesis test.

## How it connects to the other courses

::: tip Related pages
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/en/intro-it/9-base-graphics)** —
  that lecture is the **operating manual for base R graphics**: the graphical parameters of `par()`, overlaying
  plots with `par(new = TRUE)`, and `hist()`, `barplot()`, `pie()`, `boxplot()`, `plot()` written out one
  exercise after another, practising "how this line of code is written". This chapter does not repeat the
  syntax; it is about **which chart to use and how to draw it without distorting it**: why the vertical axis of
  a bar chart must start at 0, why proportions have to be normalized before they are stacked, why error bars
  must be labelled. The recommended approach is to **look at the same batch of data from both sides** — draw the
  charts in Lecture 9 with `hist()` and `barplot()`, come back to this chapter and check the choice of chart
  against the "which data go with which chart" table, then check the axes and the captions against the "common
  ways charts mislead" section. The R code in this chapter is mostly a direct application of the functions from
  Lecture 9; besides `heatmap()` for heatmaps, what goes beyond that lecture is `image()` / `axis()` for the
  correlation matrix chart, `prop.table()`, `quantile()`, `cor()`, `lines(density())`, and `arrows()` for the
  error bars — and `arrows()` is covered properly in **[Lecture 10 of *Introduction to Information Technology*,
  Low-Level Plotting Functions](/en/intro-it/10-plot-functions)** (that lecture has a parameter table for
  `arrows(x0, y0, x1, y1)` giving `length`, `angle`, and `code`).
- **[Lecture 11 of *Introduction to Information Technology*, The ggplot2 Package](/en/intro-it/11-ggplot2)** —
  the grammar of layers (`ggplot()` + `geom_*()` + `scale_*()` + `theme_*()`) is the **modern implementation**
  of this chapter's graphing principles: axis ranges, ticks, legend position, and color scales can all be
  written out explicitly in code instead of being dragged with the mouse. That lecture's `geom_raster()` /
  `geom_contour()` cover the drawing of matrix data (this chapter's heatmap), `par()` and `layout()` cover
  arranging several plots (this chapter's "alternative to the dual vertical axis: two charts aligned one above
  the other"), and scale transformations correspond directly to this chapter's semi-logarithmic line chart. If
  you are drawing figures for a paper, the final version usually goes down this ggplot2 road.
- **[Week 7 of *Medical Big Data Analysis and Decision Making*, Clustering](/en/Medical-Big-Data-Analysis/7-clustering)**
  — the results of clustering are **almost entirely read off charts**: hierarchical clustering draws a
  dendrogram with `plot(hc, hang = -1)`, k-means draws a cluster scatter plot with `fviz_cluster()`, and the
  number of clusters is chosen by drawing a silhouette plot with
  `fviz_nbclust(..., method = "silhouette")`. That week is exactly the **place where this chapter's principles
  are applied**: the horizontal axis of a dendrogram is "distance" rather than a categorical grouping, and the
  horizontal axis of a cluster scatter plot may be any two principal components (in which case the axis names
  must be written clearly, or the chart cannot be self-explanatory at all); and "fixing the number of clusters
  by staring at the single number that is the average silhouette coefficient" is precisely what this chapter
  argues against — the silhouette plot, the dendrogram, and the cluster scatter plot should be read together.
  The heatmap mentioned in this chapter, which comes with its own clustering dendrograms, is where the two
  strands meet.
- **[Week 2 of *Medical Big Data Analysis and Decision Making*, Data Preprocessing](/en/Medical-Big-Data-Analysis/2-data-preprocessing)**
  — several of the data-preparation steps that come before plotting are in that week: equal-width and
  equal-frequency binning, min–max normalization, and Z-score standardization. These interlock directly with
  this chapter: **the result of binning is the class intervals of a histogram** (equal-width/equal-frequency
  binning corresponding to equal/unequal class widths, which is exactly where this chapter's "unequal class
  widths need the rectangle height converted" comes from); and **Z-score standardization** explains why a
  heatmap must standardize its columns first — without standardizing, the column on the largest scale takes over
  the whole color scale and the link between the chart and the data is broken. As for handling missing values,
  that week does not cover it; it is in **[Week 1 of *Medical Big Data Analysis and Decision Making*, Using R and
  Getting Data](/en/Medical-Big-Data-Analysis/1-r-basics-and-data)** (dropping the rows that contain missing
  values with `na.omit()`). How to read outliers — the 1.5 IQR rule and the circles and stars on a boxplot — is
  covered by this chapter's own "Boxplots" section.
:::

<!-- Back-link suggestions
Suggest linking back to this page (which should point at /en/Health-statistics/19-tables-and-charts) from:

- /intro-it/9-base-graphics, in its "summary of this lecture", adding:
  "What you practise here is how to write these plotting functions; for which chart to use, whether the
  vertical axis may start away from 0, the difference between proportion data and independent data, and how to
  label error bars, see Health Statistics, Chapter 19."
- /intro-it/11-ggplot2, in its "summary of this lecture", adding:
  "The grammar of layers is the modern implementation of the principles of statistical charts; for the rules of
  choosing a chart and avoiding misleading ones, see Health Statistics, Chapter 19."
- /Medical-Big-Data-Analysis/7-clustering, where the hierarchical clustering dendrogram (Exercise 5) and the
  silhouette plot for clustering evaluation (Exercise 7) are discussed, adding one sentence at each:
  "How to read this chart and what to watch for in the axes and ticks, see Health Statistics, Chapter 19."
- /Medical-Big-Data-Analysis/2-data-preprocessing, where equal-width/equal-frequency binning (Exercise 5) and
  outlier handling are discussed, adding:
  "When the class intervals from binning are drawn as a histogram, watch the difference between equal and
  unequal class widths; see Health Statistics, Chapter 19."
-->

## Summary

1. **A statistical table is made of five components — title, headings, rules, numbers (plus a footnote below the
   table)**; the three principles of tabulation are that the key point stands out, the hierarchy is clear, and it
   stays simple. The self-check motto: **reading the row heading + column heading together gives one complete
   sentence**.
2. **A three-line table keeps only the top rule, the heading rule, and the bottom rule**; the same index is given
   to a consistent number of decimal places with the decimal points aligned; leave no blank cells in the data
   area — "…" for not yet available, "—" for no figure, 0 for 0 — and put notes marked `*` below the table.
3. **Choose the chart by the nature of the data**: independent groups use a bar chart, internal composition a
   pie chart / percent bar chart, a trend over time an ordinary line chart, and **comparing speeds of change a
   semi-logarithmic line chart** (the log slope = the log of the relative change); a single variable's
   distribution uses a histogram, comparing several distributions a boxplot, and the relation between two
   variables a scatter plot; add the error bar chart and heatmap common in papers, and use a statistical map for
   a geographic distribution.
4. **The hard constraints on a chart**: the vertical axis of a bar chart must start at 0, be divided at equal
   intervals, and not be broken; a histogram's vertical axis starts at 0 and its bars have no gaps, and unequal
   class widths must have the rectangle height converted first; a line chart joins points with straight lines and
   is not smoothed; a scatter plot's vertical axis may start away from 0; line charts, scatter plots, and
   boxplots are all only "approximate", and exact values are still given in a table.
5. **A chart is more intuitive than a table, and also easier to mislead with**: truncating the vertical axis can
   turn a 3-percentage-point gap into a 40% height difference simply by "moving the starting point from 0 to
   70"; too many slices in a pie chart (8.1% and 8.0% differing by only 0.36°) make the order unreadable; the
   two scales of a dual vertical axis are free parameters that can manufacture "a close match" at will. The
   caption must state the units and the meaning of the error bars, and before changing any axis ask: will the
   reader's impression of the size of the difference change?
