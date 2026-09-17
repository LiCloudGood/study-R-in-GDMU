---
layout: doc
title: '9. Base Graphics'
---

<script setup>
import { withBase } from 'vitepress'
const code0901 = `install.packages('ISwR')
library(ISwR)
head(nickel.expand)
hist(nickel.expand$age1st,
     breaks = 20,
     col = "blue",
     border = "red",
     density = 20,
     angle = -60,
     xlim = c(10, 50),
     ylim = c(0, 600),
     main = "Histogram of age at first nickel exposure",
     xlab = "Age",
     ylab = "Number of people"
)

set.seed(10000)
x <- rnorm(1000,3,2)

x_range <- range(x)
min <- x_range[1]
max <- x_range[2]
breaks <- seq(from = min, to = max,length.out = 11)
freq_table <- table(cut(x,breaks = breaks,include.lowest = T))
lbs <- as.character(freq_table)
hist(x,
     breaks = breaks,
     col = colors()[51:60],
     labels = lbs,
     cex.main = 2,
     cex.axis = 1.5,
     cex.lab = 1.5,
     main = "Histogram of normal random numbers",
     xlab = "Quantiles",
     ylab = "Frequency")`

const code0902 = `head(USPersonalExpenditure)

barplot(USPersonalExpenditure,
        col = 2:6,
        width  = 1:5,
        cex.main = 2,
        cex.lab = 1.5,
        cex.axis = 1.5,
        cex.names = 1.5,
        main = 'Consumption data by year',
        xlab = 'Year',
        ylab = 'Amount/billion')

USPersonalExpenditure_t <- t(USPersonalExpenditure)
barplot(USPersonalExpenditure_t,
        beside = T,
        col = 2:6,
        space = c(0.2,3),
        cex.main = 2,
        cex.lab = 1.5,
        cex.axis = 1.2,
        cex.names = 1.5,
        log = 'y',
        axisnames = T,
        main = 'Comparison of five expenditure items',
        xlab = '----Comparison across five years----')`

const code0903 = `data("VADeaths")
VADeaths_t <- t(VADeaths)
barplot(VADeaths_t,
        border = 2:5,
        density = 20,
        angle = c(25,50,75,100),
        col = colors()[44:47],
        legend = colnames(VADeaths),
        cex.main = 2,
        cex.lab = 1.2,
        cex.axis = 1.2,
        cex.names = 1.2,
        main = 'Virginia death data',
        xlab = 'Age',
        ylab = 'Number per thousand',
        beside = T
        )

data("UCBAdmissions")
df <- as.data.frame(UCBAdmissions)
df.m <- subset(df, Gender == "Male")
barplot(Freq ~ Admit + Dept,
        data = df.m,
        col = c("blue", "green"),
        legend = c("Admitted", "Not admitted"),
        args.legend = list(x = "topright", cex = 1.2),
        ylab = "Number of people",
        xlab = "Department code",
        main = "Admissions at Berkeley",
        cex.main = 1.5,
        cex.lab = 1.2,
        cex.axis = 1.2,
        ylim = c(0, 600),
        beside = T
)`

const code0904 = `n = 100
x <- rpois(n,5)

pie(x,
    col = rainbow(n),
    border = NA,
    labels = rep('',n),
    main = 'Rainbow pie chart (n=100)'
    )

data("WorldPhones")
data_1961 <- WorldPhones['1961',]
x<- data_1961[1:5]
other <- sum(data_1961['Africa'],data_1961['Mid.Amer'])
names(other) <- 'other'
x <- c(x,other)
proportions <- round(x / sum(x) * 100, 2)
labels <- paste(names(x), "(", proportions, "%)", sep = "")
pie(x,
    col = rainbow(length(x), s = 0.4, alpha = 0.6),
    border = 'black',
    main = 'Telephone use by continent in 1961',
    cex.main = 1.5,
    labels = labels)`

const code0905 = `data("UCBAdmissions")
df <- as.data.frame(UCBAdmissions)
df_admitted <- subset(df, Admit == "Admitted")
admitted_summary <- aggregate(Freq ~ Dept, data = df_admitted, sum)
x <- admitted_summary$Freq
pie(x,
    col = 11:16,
    density = 50,
    border = "red",
    labels = paste(admitted_summary$Dept, "(", round(x / sum(x) * 100, 2), "%)", sep = ""),
    main = "Percentage of total admissions by department",
    cex.main = 1.5
)`

const code0906 = `data("airquality")
x <- na.omit(airquality)
x <- subset(x, Month %in% c(5, 6, 7, 8, 9))
colors <- rainbow(5, s = 0.5, alpha = 0.7)
boxplot(Temp ~ Month,
        data = x,
        col = colors,
        width = c(1, 2, 3, 4, 5),
        range = 0.8,
        staplewex = 0.8,
        main = "New York temperatures in 1973 (May-September)",
        cex.main = 1.5,
        xlab = "Month",
        ylab = "Temperature",
        names =  c("May", "June", "July", "August", "September")
)

airquality_clean <- na.omit(airquality)
boxplot(Wind ~ Month,
        data = airquality_clean,
        notch = T,
        width = rep(0.5, 5),
        horizontal = T,
        col = 11:15,
        border = 'red',
        main = 'New York wind speeds in 1973 (May-September)',
        cex.main = 1.5,
        xlab = 'Wind speed',
        ylab = "Month",
        names =  c("May", "June", "July", "August", "September")
        )`

const code0907 = `install.packages('ISwR')
library(ISwR)
data("melanom")
melanom$ulc <- factor(melanom$ulc, levels = c(1, 2), labels = c("yes", "no"))
melanom$group <- interaction(melanom$status, melanom$ulc, sep = "--")
desired_order <- c("1--no", "1--yes", "2--no", "2--yes", "3--no", "3--yes")
melanom$group <- ordered(melanom$group, levels = desired_order)
boxplot(thick ~ group,
        data = melanom,
        col = rainbow(6,v=0.8,alpha = 0.6),
        main = "Comparison of melanoma thickness between groups",
        ylab = "Thickness",
        xlab = "Survival status-ulcer",
        ylim = c(0, 1500),
        las = 2,
        outcol = "red",
        border = 'red',
        medcol = 'red'
)`

const code0908 = `data("airmiles")
plot(airmiles,
     type = "s",
     lwd = 2,
     col = "#0000FF",
     main = "Changes in US passenger revenue, 1937-1960",
     cex.main = 1.2,
     xlab = "Year",
     ylab = "Flight distance"
)

data('trees')
plot(trees$Girth, trees$Volume,
     pch = 21,
     col = 1:31,
     bg = "white",
     cex = 2,
     lwd = 2,
     main = "Relationship between the volume and girth of black cherry trees",
     cex.main = 1.8,
     xlab = "Diameter",
     ylab = "Volume",
     cex.lab = 1.5,
     cex.axis = 1.2
)`

const code0909 = `x <- seq(-5, 5, by = 0.05)
plot(x, dt(x, df = 1),
     type = "l",
     lwd = 2,
     col = "red",
     xlab = "",
     ylab = "",
     xaxt = "n",
     yaxt = "n",
     main = ""
)

par(new = TRUE)
plot(x, dt(x, df = 30),
     type = "l",
     lwd = 2,
     col = "blue",
     xlab = "",
     ylab = "",
     xaxt = "n",
     yaxt = "n",
     main = ""
)

par(new = TRUE)
plot(x, dnorm(x),
     type = "l",
     lwd = 2,
     col = "black",
     xlab = "x",
     ylab = "y=f(x)",
     main = "Density Curves",
     cex.main = 1.8,
     cex.lab = 1.5,
     cex.axis = 1.2
)`
</script>

# Base Graphics

::: info Translation status
Translated from the [Chinese original](/intro-it/9-base-graphics). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

::: info Instructor's suggestion
Do Exercises 1, 2, 4, 6, and 8; finish Exercises 3, 5, 7, and 9 after class.
:::

## Objectives

- Master how to use plotting colors.
- Master the histogram function `hist`.
- Master the bar chart function `barplot`.
- Master the pie chart function `pie`.
- Master the boxplot function `boxplot`.
- Master the scatter plot function `plot`.

::: tip Why the figures can be seen right in the answers
Every exercise in this lecture is a plotting exercise, and you cannot tell whether a plot is right
just by reading the code, so the reference answers also include **the figures produced by actually
running it**.
These figures are static images generated in advance on a local machine (this site does not run R in
the web page); run the code yourself and you will get exactly the same ones.
:::

## Exercise 1: Histograms with the hist function

Create the script file **test0901.R** and draw histograms with the `hist` function.

1. Use the variable `age1st` of the data set `nickel.expand` in `ISwR` to draw a histogram, and the histogram drawn must meet the requirements below:
   - Draw 20 bars;
   - The border color is red;
   - The fill color is blue;
   - The shading lines are 20 per inch, at an angle of -60 degrees;
   - The title of the plot is "Histogram of age at first nickel exposure";
   - The title of the x axis is "Age";
   - The title of the y axis is "Number of people";
   - The displayed range of the x axis is [10, 50];
   - The displayed range of the y axis is [0, 600].
2. Draw another histogram according to the requirements below:
   - First set the random-number seed with `set.seed(10000)`, then use `rnorm` to generate 1000 random numbers `x`, with the mean of `rnorm` equal to 3 and the standard deviation 2, that is `set.seed(10000)`, `x <- rnorm(1000, 3, 2)`;
   - Divide the range of `x` into 10 equal parts (that is, first find the largest and the smallest value, then split into 10 equal parts; you may also use the `range` function to find the largest and the smallest value);
   - Then count the frequency of the 10 intervals (hint: you can use the `cut` and `table` functions, or `cut` and `tapply`), and convert the resulting frequency vector into a character vector, assigning it to the variable `lbs`;
   - Use `hist` to draw a histogram of `x`, labeling each bar with its corresponding frequency, that is set `labels = lbs`, and let the fill color be colors number 51 to 60 of `colors()`, that is `colors()[51:60]`;
   - In the `hist` function use `cex.main=2`, `cex.axis=1.5`, and `cex.lab=1.5` to set the font sizes of the plot title, the axis ticks, and the axis labels respectively.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig01.png')" alt="Histogram of the age at first nickel exposure (age on the x-axis, number of people on the y-axis)" loading="lazy" />
    <figcaption>Figure 1. The histogram Exercise 1, question 1 asks for: the distribution of the age at first
      nickel exposure (the variable age1st of the nickel.expand data set in ISwR), with age on the x-axis (shown
      from 10 to 50) and the number of people on the y-axis (shown from 0 to 600). The 20 bars have red borders
      and blue shading lines, 20 per inch at an angle of -60 degrees. (The axis labels and the title inside the
      image are in the original Chinese; the English wording of this exercise is above.)</figcaption>
  </figure>
  <figure>
    <img :src="withBase('/figures/09-question/fig02.png')" alt="Histogram of 1000 normal random numbers in 10 bins, each bar labelled with its frequency" loading="lazy" />
    <figcaption>Figure 2. The second histogram of Exercise 1: the 1000 normal random numbers generated with
      set.seed(10000) and rnorm(1000, 3, 2), cut into 10 equal-width bins, with the quantiles of x on the x-axis
      and the frequency on the y-axis. Each bar is labelled with its own frequency (the vector lbs), and the ten
      bars cycle through the palette colours 51 to 60.</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 1 · Reference answer"
  description="This exercise needs the ISwR package (install.packages('ISwR'))."
  :code="code0901"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-3-1.png', '/figures/en/09-base-graphics/unnamed-chunk-3-2.png']"
/>

::: tip The common hist arguments at a glance
| Argument | What it does |
| --- | --- |
| `breaks` | the number of bins (`20`) or a vector of break points |
| `col` / `border` | fill color / border color |
| `density` / `angle` | density of the shading lines (lines per inch) / their angle of inclination |
| `xlim` / `ylim` | the displayed range of the axes |
| `labels` | text to label every bar with (here the frequency) |

**`density` and `col` fight each other**: once `density` is set (shading lines are drawn), `col`
becomes the color of the shading lines, not the fill color of the whole bar. The exercise asks for a
"blue base with red lines", so `col = "blue"` actually colors the shading lines.

The `lbs` of question 2 is the key: first bin the data with `cut`, then count the values in each bin
with `table`, and finally convert them to character with `as.character()` before they can be passed
to `labels`.
:::

## Exercise 2: Bar charts with the barplot function

Create the script file **test0902.R** and use the `barplot` function to draw bar charts of the data
set `USPersonalExpenditure`.

1. Draw the bar chart, setting some of the arguments as required below:
   - The color is `2:6`;
   - The widths are `1:5`;
   - The plot title font size is `cex.main = 2`;
   - The axis label font size is `cex.lab = 1.5`;
   - The tick label font size of the value axis is `cex.axis = 1.5`;
   - The tick label font size of the category axis is `cex.names = 1.5`.
2. Draw another bar chart, setting some of the graphical parameters as required below:
   - The color is `2:6`;
   - The space between bars is 0.2, and the space between groups is 3;
   - The plot title font size is 2;
   - The sub-title font size is 1.5;
   - The tick label font size of the value axis is 1.2;
   - The tick label font size of the category axis is 1.2;
   - The y axis uses a logarithmic scale.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig03.png')" alt="Bar chart of USPersonalExpenditure: one stacked bar per year, 1940 to 1960" loading="lazy" />
    <figcaption>Figure 3. The bar chart Exercise 2, question 1 asks for: the USPersonalExpenditure data drawn
      straight with barplot, with the five years 1940 to 1960 along the x-axis and the amount in billions of
      dollars on the y-axis. Each year is one bar, stacked from the five expenditure items, and the bars are drawn
      with the increasing widths 1 to 5 and in the palette colours 2 to 6.</figcaption>
  </figure>
  <figure>
    <img :src="withBase('/figures/09-question/fig04.png')" alt="Grouped bar chart of USPersonalExpenditure by expenditure item, on a log value axis" loading="lazy" />
    <figcaption>Figure 4. The second bar chart of Exercise 2: the same USPersonalExpenditure data after t(), drawn
      with barplot(beside = TRUE), so the five expenditure items form the groups along the x-axis and the five
      years 1940 to 1960 are the five bars inside each group. The value axis is on a logarithmic scale, the bars
      within a group are 0.2 apart and the groups 3 apart, and the colours are again 2 to 6.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 2 · Reference answer" :code="code0902"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-4-1.png', '/figures/en/09-base-graphics/unnamed-chunk-4-2.png']"
/>

::: tip beside and space: the two switches of a grouped bar chart
| Argument | Meaning |
| --- | --- |
| `beside = TRUE` | the bars of each group are placed **side by side** (otherwise they are stacked) |
| `space = c(within-group space, between-group space)` | takes effect only when `beside = TRUE`; a vector of length 2 |
| `log = "y"` | the y axis is put on a log scale |
| `cex.names` | the font size **dedicated** to the tick labels of the category (x) axis |

`USPersonalExpenditure` is originally "rows = expenditure item, columns = year", and **`barplot()`
draws one bar per column** — so plotting it directly makes the **years** the bars (the data really is
a year-by-year comparison; see the title of `test0902.R`, "consumption data by year"), with the five
expenditure items stacked inside each bar. The answer first transposes it with `t()`, which turns the
columns into the expenditure items, so the **expenditure items** become the bars and the **years** the
groups, drawn side by side with `beside = TRUE`.
:::

## Exercise 3: Applying the barplot function

Create the script file **test0903.R** and draw the plots according to the requirements below.

1. Draw a bar chart in the style of **Figure 5**, with the data coming from `VADeaths` (Virginia death
   rate data); the rules for setting some of the graphical parameters are as follows:
   - The bar border colors are `2:5`;
   - 20 shading lines per inch, with the lines inclined at 25, 50, 75, and 100 degrees respectively;
   - The color of the shading lines is colors number 44 to 47 in the value returned by `colors()`, that is `colors()[44:47]`;
   - The names of the legend are the variable names of `VADeaths`;
   - The plot title font size is 2;
   - The tick label font size of the value axis is 1.2;
   - The tick label font size of the category axis is 1.2;
   - The axis label font size is 1.2.
2. Draw a bar chart in the style of **Figure 6**, with the data coming from `UCBAdmissions` (Berkeley admissions counts):
   - First convert the data into a data frame;
   - Extract the records whose `Gender` is `Male` and store them in the variable `df.m`;
   - Draw the `Freq` data in the data frame `df.m`, grouped by the variables `Dept` and `Admit`, with each bar representing the number of admitted and not admitted people (hint: group with a formula, that is `Freq ~ Admit + Dept`);
   - Set the range of the value axis to 0 to 600;
   - Set the legend text and the axis label text as in **Figure 6**;
   - The fill colors are blue and green.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig05.png')" alt="Bar chart of the VADeaths death rates by age group, with a legend for the four groups" loading="lazy" />
    <figcaption>Figure 5. The bar chart Exercise 3, question 1 asks for: the VADeaths data (death rates per
      thousand in Virginia in 1940) with the five age groups along the x-axis and the number per thousand on the
      y-axis. In each age group the four population groups (rural and urban, male and female) stand side by side,
      each with its own border colour and 20 shading lines per inch at 25, 50, 75 and 100 degrees, and the legend
      on the right names the four groups.</figcaption>
  </figure>
  <figure>
    <img :src="withBase('/figures/09-question/fig06.png')" alt="Grouped bar chart of the male Berkeley admissions, two bars per department" loading="lazy" />
    <figcaption>Figure 6. The bar chart Exercise 3, question 2 asks for: the male applicants in UCBAdmissions,
      with the six department codes along the x-axis and the number of people on the y-axis (fixed to 0 to 600).
      Each department has two bars, admitted in blue and not admitted in green, and the legend in the top right
      names them.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 3 · Reference answer" :code="code0903"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-5-1.png', '/figures/en/09-base-graphics/unnamed-chunk-5-2.png']"
/>

::: tip The formula style: Freq ~ Admit + Dept
The `~` in `barplot(Freq ~ Admit + Dept, data = df.m)` is **R's formula syntax**, meaning "draw `Freq`,
with `Admit` and `Dept` as the grouping variables".

This is the same style as `boxplot(Temp ~ Month, data = x)` — whenever a **numeric value is laid out
by some grouping variable(s)**, the formula can express it.

`UCBAdmissions` is originally a three-dimensional contingency table; after `as.data.frame()` it
becomes a long table with the four columns `Admit` / `Gender` / `Dept` / `Freq`, which is what makes
filtering and plotting convenient.
:::

## Exercise 4: Pie charts with the pie function

Open the script file **test0904.R** and draw pie charts according to the requirements below.

1. Draw a rainbow pie chart:
   - Draw a pie chart of the vector `x`;
   - Set the colors of the pie chart with `rainbow(n)`;
   - Leave both the border and the slice labels empty, that is set the border to `NA` and the slice labels to the empty string;
   - The title font size is the default value.
2. Use the `WorldPhones` data (telephone installation and use data for each continent) to draw a pie chart:
   - Extract the first 5 values of 1961 in `WorldPhones` (that is, the values other than Africa and Mid.Amer), and assign them to the variable `x`;
   - Merge (sum) the 1961 numbers for Africa (`Africa`) and Mid.Amer (`Mid.Amer`), making it a new item of `x` whose name is `other`;
   - Draw a pie chart with `x`, using `rainbow` to give each slice a different color (that is, obtain 6 colors), where the arguments of `rainbow` are `s` equal to 0.4 and `alpha` equal to 0.6;
   - Set the border to black and the title font size to 1.5.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig07.png')" alt="Pie chart of 100 Poisson random numbers, a ring of 100 rainbow-coloured slices" loading="lazy" />
    <figcaption>Figure 7. The first pie chart of Exercise 4: 100 Poisson random numbers (rpois(100, 5)) drawn
      with pie(), so the chart is a ring of 100 slices, one per value. The slices cycle through rainbow(n)
      colours, and both the borders and the slice labels are switched off, so nothing is written around the wheel
      except its title.</figcaption>
  </figure>
  <figure>
    <img :src="withBase('/figures/09-question/fig08.png')" alt="Pie chart of telephone use by continent in 1961, each slice labelled with its percentage" loading="lazy" />
    <figcaption>Figure 8. The second pie chart of Exercise 4: telephone use by continent in 1961 (WorldPhones),
      with Africa and Mid.Amer merged into a single slice called “other”. The six slices are drawn in six
      semi-transparent rainbow colours with black borders, and each one is labelled with its name and its
      percentage of the 1961 total.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 4 · Reference answer" :code="code0904"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-6-1.png', '/figures/en/09-base-graphics/unnamed-chunk-6-2.png']"
/>

::: tip Two practical tricks for pie charts
**1. Turn the labels off when there are too many slices**

`rep('', n)` sets all n labels to the empty string, and together with `border = NA` you get a clean
chart of rainbow color blocks (with 100 slices the labels simply do not fit).

**2. Assemble the percentage labels yourself**

```r
proportions <- round(x / sum(x) * 100, 2)
labels <- paste(names(x), "(", proportions, "%)", sep = "")
```

`pie()` does not compute percentages by itself; you have to compute them and then assemble them with
`paste` into a string such as `"Asia(31.2%)"`.

Incidentally: in `rainbow(n, s =, alpha =)`, `s` is the **saturation** and `alpha` is the
**transparency** (0 fully transparent, 1 opaque); lowering `s` makes the palette a little softer.
:::

## Exercise 5: Applying the pie function

Create the script file **test0905.R** and draw pie charts according to the requirements below.

Use `UCBAdmissions` (Berkeley admissions data) to draw a pie chart, that is a pie chart of the number
of students admitted by each department as a percentage of the total number admitted to the whole
university.

- First the data has to be converted into a data frame, then the records whose `Admit` is `Admitted` are filtered out, and finally a grouped summary by department is made (hint: use the `aggregate` function or the `tapply` function);
- The shading lines are 50 per inch;
- The colors are number 11 to 16 of the palette (that is `col = 11:16`);
- The border is red;
- The title font size is 1.5.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig09.png')" alt="Pie chart of the total admissions by department at Berkeley, with percentages" loading="lazy" />
    <figcaption>Figure 9. The pie chart Exercise 5 asks for: the number of students admitted to each Berkeley
      department as a percentage of all admissions (UCBAdmissions filtered down to Admit equal to “Admitted” and
      then summed by Dept). The six departments are the six slices, filled with 50 shading lines per inch and
      outlined in red, and each slice is labelled with the department and its percentage.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 5 · Reference answer" :code="code0905"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-7-1.png']"
/>

::: tip The formula style of aggregate
```r
aggregate(Freq ~ Dept, data = df_admitted, sum)
```

This is the `aggregate` you learned in Lecture 4, here in its formula style: "group by `Dept`, sum
`Freq`", which returns a **data frame** — just right for taking out one column and feeding it straight
to `pie()`.

`density = 50` is the density of the shading lines (50 per inch), used in exactly the same way as in
Exercise 1.
:::

## Exercise 6: Boxplots with the boxplot function

Create the script file **test0906.R** and draw boxplots according to the requirements.

1. `airquality` is the New York air quality data of 1973; please use `boxplot` to draw a boxplot of the `Temp` (temperature) variable when `Month` is 5, 6, 7, 8, and 9:
   - First delete the missing values in the data frame and assign the result to the variable `x`, then use `x` as the source data to draw the boxplot, and **do not use a functional relationship as the data**;
   - The widths of the boxes are 1, 2, 3, 4, and 5 respectively;
   - Use the `rainbow` function to produce 5 fill colors, where the arguments of `rainbow` are `s=0.5` and `alpha = 0.7`;
   - `range` is set to 0.8;
   - The width of the `staple` line is set to 0.8;
   - The font size of the plot title is set to 1.5.
2. Use `boxplot` to draw a boxplot of the wind force (that is, `Wind`) of every month, and **you are required to use a functional relationship as the data source**:
   - First delete the missing values in the data frame `airquality`;
   - Show the notches;
   - Halve the box width, that is a scaling factor of 0.5;
   - The fill colors are `11:15`;
   - The border color is red;
   - The font size of the plot title is 1.5.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig10.png')" alt="Boxplot of the 1973 New York temperatures for May to September" loading="lazy" />
    <figcaption>Figure 10. The first boxplot of Exercise 6: the New York air quality data of 1973 (airquality),
      showing how the daily temperature is distributed in May, June, July, August and September. The five months
      are on the x-axis and the temperature on the y-axis, the five boxes are filled with five rainbow colours,
      and they are drawn with the increasing widths 1 to 5.</figcaption>
  </figure>
  <figure>
    <img :src="withBase('/figures/09-question/fig11.png')" alt="Horizontal notched boxplots of the 1973 New York wind speeds by month" loading="lazy" />
    <figcaption>Figure 11. The second boxplot of Exercise 6: the same 1973 New York data, now the wind speed
      (Wind) by month, drawn lying on its side with notches (horizontal = TRUE, notch = TRUE). The wind speed is
      on the x-axis and the five months on the y-axis, the boxes are half the usual width, and they are filled
      with the palette colours 11 to 15 with red borders.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 6 · Reference answer" :code="code0906"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-8-1.png', '/figures/en/09-base-graphics/unnamed-chunk-8-2.png']"
/>

::: tip How the two data sources differ in style
**Vector style** (required by question 1): first slice the data up yourself, then pass it to `boxplot`

```r
x <- subset(na.omit(airquality), Month %in% 5:9)
boxplot(Temp ~ Month, data = x, ...)
```

**Formula style** (required by question 2): write straight away "what is grouped by what"

```r
boxplot(Wind ~ Month, data = airquality_clean, ...)
```

The exercise deliberately asks for each of the two once, precisely so that you can feel this
difference.

Other arguments:

| Argument | What it does |
| --- | --- |
| `range` | how far the whiskers extend, as a multiple, 1.5 by default; lowering it makes more points count as outliers |
| `staplewex` | the width of the short horizontal line at the end of the whisker |
| `notch = TRUE` | shows the **notch** around the median; if the notches of two groups do not overlap, it indicates a significant difference |
| `horizontal = TRUE` | lays the boxes on their side |
| `outcol` | the color of the outlier points |

**Never forget `na.omit()`**: `airquality` contains missing values, and plotting would throw an error
if they were not removed.
:::

## Exercise 7: Applying the boxplot function

Create the script file **test0907.R** and draw boxplots according to the requirements.

Use the data set `melanom` in the `ISwR` package (survival data of malignant melanoma) to draw a
boxplot:

- First replace the 1 in the ulcer (`ulc`) column with `"yes"` and the 2 with `"no"`;
- Draw boxplots of the melanoma thickness (the `thick` variable) for the different groups, with the grouping variables `status` and `ulc`, where `status` denotes survival status (1 means died of melanoma, 2 means still alive, 3 means died of other causes) and `ulc` denotes ulceration (`yes` means there is ulceration, `no` means there is none);
- The fill color is `rainbow(6, v=0.8, alpha = 0.6)`;
- The boxes need to be ordered (that is, the groups ordered in the plot);
- The separator of the group labels is `"--"` (two minus signs);
- The range of the y axis is [0, 1500].

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig12.png')" alt="Boxplot of melanoma thickness for the six survival status and ulceration groups" loading="lazy" />
    <figcaption>Figure 12. The boxplot Exercise 7 asks for: the thickness of the malignant melanoma (the variable
      thick of melanom in ISwR) for six groups, formed by crossing survival status (1, 2, 3) with ulceration
      (“yes” or “no”), so the x-axis runs 1--no, 1--yes, 2--no, 2--yes, 3--no, 3--yes. The thickness is on the
      y-axis over the range 0 to 1500, the boxes are filled with six semi-transparent rainbow colours, and the
      outliers are drawn in red.</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 7 · Reference answer"
  description="This exercise likewise needs the ISwR package."
  :code="code0907"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-9-1.png']"
/>

::: tip interaction builds a grouping variable out of pairings
To group by the two variables `status` and `ulc` at the same time, you first have to build a new
variable:

```r
melanom$group <- interaction(melanom$status, melanom$ulc, sep = "--")
# gives "1--no", "1--yes", "2--no", ...

melanom$group <- ordered(melanom$group, levels = c(
  "1--no", "1--yes", "2--no", "2--yes", "3--no", "3--yes"))
```

`interaction()` does the joining and `ordered(..., levels =)` does the **specifying of the order** —
precisely the ordered factor you learned in Lecture 4. If the `levels` are not specified, R sorts
alphabetically and the order of the boxes in the plot becomes a mess.

`las = 2` makes the x axis labels **run vertically**, which is especially useful when the labels are
long.
:::

## Exercise 8: Scatter plots with the plot function

Create the script file **test0908.R** and draw scatter plots according to the requirements.

1. Use the `plot` function to draw a step chart of the `airmiles` data (US passenger-mile revenue,
   1937-1960):
   - The type of the points or lines is the step form (that is, a big S);
   - The line width is 2 (that is, `lwd` is 2);
   - The line color is `"#0000FF"`;
   - The plot title font size is 1.2.
2. Use the `trees` data (the girth, height, and volume of black cherry trees) to draw a scatter plot, in which the x axis is the girth (`Girth`) and the y axis is the volume (`Volume`):
   - The border colors of the points are `1:31`;
   - The size of the points is 2 (that is, `cex` is 2);
   - The border width of the points is 2 (that is, `lwd` is 2);
   - The title font size is 1.8;
   - The axis label font size is 1.5;
   - The axis tick font size is 1.2.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig13.png')" alt="Step chart of the airmiles time series, 1937 to 1960" loading="lazy" />
    <figcaption>Figure 13. The first plot of Exercise 8: the airmiles time series (US passenger-mile revenue from
      1937 to 1960) drawn as a step chart with type = “s”, so the line stays flat for a while and then jumps. The
      year is on the x-axis and the flight distance on the y-axis.</figcaption>
  </figure>
  <figure>
    <img :src="withBase('/figures/09-question/fig14.png')" alt="Scatter plot of black cherry tree girth against volume" loading="lazy" />
    <figcaption>Figure 14. The second plot of Exercise 8: a scatter plot of the trees data (black cherry trees),
      with the girth, that is the diameter, of the tree on the x-axis and its volume on the y-axis. The points are
      large open circles with thick borders, and the 31 points cycle through 31 border colours.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 8 · Reference answer" :code="code0908"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-10-1.png', '/figures/en/09-base-graphics/unnamed-chunk-10-2.png']"
/>

::: tip type decides "what shape is drawn"
| `type` | Effect |
| --- | --- |
| `"p"` | points only (the default) |
| `"l"` | lines only |
| `"b"` | both points and lines, but the lines do not pass through the points |
| `"o"` | both points and lines, with the lines passing through the points |
| `"s"` | a **step chart** (horizontal first, then vertical) |
| `"h"` | vertical lines rising from the x axis (like a bar chart) |

`airmiles` is a time series, and drawing it as a step chart with `type = "s"` brings out best the
feature that "a value stays unchanged for a stretch of time and then jumps".

**`pch` is the shape number of a point** (0-25):
`pch = 21` is a **filled circle** (you can set the border color `col` and the fill color `bg`
separately), while the other numbers allow only one `col`. `col = 1:31` makes the 31 points cycle
through 31 colors.
:::

## Exercise 9: Applying the plot function — overlaying density curves

Create the script file **test0909.R** and draw density curves according to the requirements below.

- Generate the sequence `x` from -5 to 5 with a common difference of 0.05, and use it as the x axis to draw density curves;
- Use the `plot` function to draw the density curve of the t distribution with parameter 1. Set the argument `type` to `"l"`, the line width (`lwd`) to 2, the color to red, the x and y axis labels to the empty string, and the x and y axis ticks to nothing (that is, set `yaxt="n"`, `xaxt="n"`);
- Overlay the next plot on it, that is `par(new=T)`;
- Use the `plot` function to draw the density curve of the t distribution with parameter 30. The argument `type` is `"l"`, the line width is 2, the color is blue, the x and y axis labels are the empty string, and the x and y axis ticks are nothing;
- Overlay the next plot on it again;
- Use the `plot` function to draw the density curve of the **standard normal distribution**. The argument `type` is `"l"`, the line width is 2, the color is black, the x and y axis labels are `"x"` and `"y=f(x)"` respectively, the x and y axis ticks use the default values, the title font size is set to 1.8, the axis label font size to 1.5, and the axis tick font size to 1.2.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/09-question/fig15.png')" alt="Three overlaid density curves: t with 1 degree of freedom, t with 30, and the standard normal" loading="lazy" />
    <figcaption>Figure 15. The plot Exercise 9 asks for: three density curves overlaid on one canvas with
      par(new = TRUE) — the t distribution with 1 degree of freedom (red), the t distribution with 30 degrees of
      freedom (blue) and the standard normal distribution (black). The x-axis is x, running from -5 to 5, and the
      y-axis is the density y = f(x); the red curve has much the heavier tails, while the blue one has almost
      merged with the black one.</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 9 · Reference answer"
  :code="code0909"
  :images="['/figures/en/09-base-graphics/unnamed-chunk-11-1.png']"
/>

::: tip par(new = TRUE) is the key to overlay plotting
By default every call to `plot()` **clears the canvas and draws again**. To overlay on an existing
plot, you have to tell R first "do not clear the screen, I want to keep drawing on the original plot":

```r
par(new = TRUE)
```

Three overlaid `plot` calls put the three density curves — t(1), t(30), and the standard normal — on
the same chart.

**Why `xaxt = "n"` and `yaxt = "n"`?**
Because the first two plots exist only to overlay the lines; if they drew axes as well, the three sets
of axes would overlap each other and smear into a mess. So the axes and labels are switched off for
the first two, and drawn all at once only in the **last** one.

On the chart you can see directly that the smaller the degrees of freedom, the heavier the tails of
the t distribution; by 30 degrees of freedom it has almost merged with the standard normal — which is
precisely the manifestation of the t distribution "approaching the normal for large samples".
:::

## Summary

| Plot | Function | Key arguments |
| --- | --- | --- |
| histogram | `hist(x, breaks, ...)` | `breaks`, `density`, `angle`, `labels` |
| bar chart | `barplot(x, ...)` | `beside`, `space`, `legend`, `log` |
| pie chart | `pie(x, ...)` | `labels`, `col`, `density`, `border` |
| boxplot | `boxplot(y ~ g, data =)` | `range`, `notch`, `horizontal`, `staplewex` |
| scatter / curve | `plot(x, y, ...)` | `type`, `pch`, `cex`, `lwd`, `col` |
| overlaid plotting | `par(new = TRUE)` | used together with `xaxt` / `yaxt` to switch off duplicate axes |

**The general font-size arguments** (recognized by almost every plotting function):

| Argument | What it controls |
| --- | --- |
| `main` / `cex.main` | main title / its font size |
| `xlab` / `ylab` / `cex.lab` | axis labels / their font size |
| `cex.axis` | the font size of the axis **ticks** |
| `cex.names` | the font size of the category axis (`barplot`) tick labels |

**The color trio**: `rainbow(n, s =, alpha =)`, `colors()[i]`, and `numbers` (`2:6` means palette
colors number 2 to 6).

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第九周原题`, and the answers from `资料/答案/第九周答案` (only
typos in them were corrected).
The "Figures 1 to 15" in the body of the original exercises have been pasted back below each exercise
in exercise order (taken from `资料/汇总/第九周——高级绘图_files/figure-html/`; they are the same
batch of figures as the screenshots in the original docx, but at higher resolution), and the
reference-answer cards additionally include the actual figures produced by that exercise's answer.
:::

::: tip Want the statistics behind it?
This lecture is a **manual for plotting in base R**; for which data deserve which chart, the traps of
axes and ticks, and how not to mislead the reader, see the corresponding summary in *Health
Statistics*.

See **[Chapter 19 of *Health Statistics*, Statistical Tables and Charts](/en/Health-statistics/19-tables-and-charts)**.
:::
