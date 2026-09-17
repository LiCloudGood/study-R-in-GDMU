---
layout: doc
title: '11. The ggplot2 Package'
---

<script setup>
import { withBase } from 'vitepress'

const code1101 = `x = iris[101:150,]

# The par function
par(mfrow = c(2,3))
plot(x$Sepal.Length,x$Sepal.Width)
box()
hist(x$Sepal.Length,main = 'Histogram of x$Sepal.Length',ylab = 'Frequency',border = 'black')
box()
hist(x$Sepal.Width,main = 'Histogram of x$Sepal.Width', ylab = 'Frequency',border = 'black')
box()
plot(x$Petal.Length,x$Petal.Width)
box()
hist(x$Petal.Length,main = 'Histogram of x$Petal.Length',ylab = 'Frequency',border = 'black')
box()
hist(x$Petal.Width,main = 'Histogram of x$Petal.Width',ylab = 'Frequency',border = 'black')
box()
par(mfrow = c(1,1))

# The layout function
layout_matrix <- matrix(c(1,2,3),nrow = 2,ncol = 1)
layout(layout_matrix,widths = c(0.6,0.4),heights = c(0.5,0.5))
plot(x$Sepal.Length,x$Sepal.Width)
box()
hist(x$Sepal.Length,main = 'Histogram of x$Sepal.Length',ylab = 'Frequency',border = 'black')
box()
hist(x$Sepal.Width,main = 'Histogram of x$Sepal.Width', ylab = 'Frequency',border = 'black')
box()
par(mfrow = c(1, 1))`

const code1102 = `df = data.frame(x=c(3,1,5), y=c(5,7,9))
library(ggplot2)

ggplot(
  df,
  aes(xmin = x,xmax = x+2,ymin = y-1,ymax = y+1)) +
    geom_rect(aes(fill = x)) +
    theme(
      axis.title = element_blank(),
      axis.text = element_text(size = 20),
      legend.position = 'none'
    )`

const code1104 = `library(ggplot2)
x = mtcars[,c('hp','disp','cyl')]

ggplot(x,aes(hp,disp)) +
  geom_point(size = 3,color = 'blue3') +
  geom_text(
    aes(label = mtcars$cyl, color = mtcars$cyl),
    size = 6, nudge_x = 8) +
  scale_color_gradientn(colors = rainbow(20), name = "Number of Cylinders") +
  theme(
    legend.title = element_text(size = 18),
    legend.text = element_text(size = 16),
    axis.title.x = element_text(size = 18),
    axis.title.y = element_text(size = 18),
    axis.text = element_text(size = 16)
  )`

const code1105 = `# Load the ggplot2 package
library(ggplot2)

# Use the faithfuld data set
data(faithfuld)

# Draw a contour plot and a two-dimensional density plot
p <- ggplot(data = faithfuld, aes(x = eruptions, y = waiting, z = density)) +
  geom_raster(aes(fill = density)) +
  geom_contour(color = 'red') +
  theme(
    axis.title.x = element_text(size = 16),  # x axis label font size 16
    axis.title.y = element_text(size = 16),  # y axis label font size 16
    legend.title = element_text(size = 16),  # legend title font size 16
    legend.text = element_text(size = 14),  # legend key label font size 14
    axis.text = element_text(size = 14),  # tick label font size 14
    panel.grid.major = element_blank(),  # remove the major grid lines
    panel.grid.minor = element_blank(),  # remove the minor grid lines
    panel.background = element_rect(fill = "lightblue")  # panel background color is "lightblue"
  )

# Print the plot
print(p)`

const code1106 = `library(ggplot2)
ggplot(diamonds,aes(price)) +
  geom_histogram(
    aes(fill = ..density..), binwidth = 1000) +
  scale_fill_continuous(low = 'green',high = 'blue') +
  labs(title = 'Histogram of Diamond Prices') +
  theme(axis.title = element_text(size = 18),
        axis.text = element_text(size = 16),
        legend.title = element_text(size = 18),
        legend.text = element_text(size = 16),
        plot.title = element_text(
          size = 22,hjust = 0.5,
          margin = margin(b = 12)
        )
  )`

const code1107 = `library(ggplot2)
ggplot(iris, aes(Sepal.Length, Sepal.Width)) +
  geom_point(
    aes(fill = Species), size = 5,
    shape = 21, alpha = 0.7) +
  scale_x_continuous(
    'Sepal Length',
    limits = c(4,8),
    breaks = c(4,4.5,5,5.5,6,6.5,7,7.5,8)
  ) +
  scale_y_continuous(
    'Sepal Width',
    limits = c(2,4.4),
    breaks = seq(2,4.4,by=0.4)
  ) +
  labs(
    title = 'Scatter Plot of Iris Sepal Length and Width') +
  scale_fill_brewer(
    'Species',palette = 'Set1') +
  theme(
    plot.title = element_text(
      size = 20,
      color = 'blue',
      margin = margin(b = 12),
      hjust = 0.5,
      face = 'bold'),
    axis.title.x = element_text(
      size = 18,
      face = 'bold',
      margin = margin(t = 10),
      color = 'brown'),
    axis.title.y = element_text(
      size = 18,
      face = 'bold',
      margin = margin(r = 10),
      color = 'brown'),
    axis.text = element_text(
      color = 'red',
      size = 16),
    legend.title = element_text(
      color = 'brown',
      size = 18,
      margin = margin(b = 10),
      face = 'bold'),
    legend.text = element_text(
      size = 16),
    legend.key.height = unit(1,'cm'),
    legend.key.width = unit(0.9,'cm'),
    legend.background = element_rect(
      fill = 'grey90',
      color = 'red')
  )`
</script>

# The ggplot2 Package

::: info Translation status
Translated from the [Chinese original](/intro-it/11-ggplot2). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

::: info Instructor's suggestion
Complete Exercises 1 to 5 (the complete code for Exercise 6 is already given in the original
exercise).
:::

## Objectives

- Master how to use the `par` and `layout` functions.
- Master how to use the `ggplot` function.
- Master how to use the main geometric objects.
- Master the main statistical transformations of ggplot2.
- Master how to set up facets in ggplot2.
- Master the main scale transformations of ggplot2.
- Master how to set the theme elements of ggplot2.

::: tip The figures in the answers are already run
The plots that ggplot2 draws are right there in the reference answers below, and they too are static
images produced in advance.
When you run them yourself in RStudio for the first time, watch out: `ggplot2` is a very large
package, so loading it may take a while.
:::

## Exercise 1: The par Function and the layout Function

Open the script file **test1101.R** and complete the tasks below.

1. Use the `par` function to split the canvas into 2 rows and 3 columns, filled by row, then draw
   plots with the data in `x` (as shown in **Figure 1**).
2. Use the `layout` function to split the canvas into 2 rows and 2 columns, with widths 0.6 and 0.4
   and heights 0.5 and 0.5, then draw plots with the data in `x` (as shown in **Figure 2**).

> Note: the histograms in the figures use the `box()` function to add a border; add
> `par(mfrow = c(1,1))` at the very end of the script file to restore the single-window layout.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/11-question/fig01.png')" alt="Six iris plots in a 2 by 3 grid made with par(mfrow)" loading="lazy" />
    <figcaption>Figure 1. The figure Exercise 1, question 1 asks for: the canvas cut into 2 rows and 3 columns
      with par(mfrow = c(2, 3)) and filled row by row with six plots of iris[101:150] — the sepal length against
      the sepal width and the petal length against the petal width as scatter plots, and a histogram of each of
      the four variables. Every panel is given an outer frame with box(). (The axis labels and the titles inside
      the image are in the original Chinese; the English wording of this exercise is above.)</figcaption>
  </figure>
  <figure>
    <img :src="withBase('/figures/11-question/fig02.png')" alt="The same iris plots arranged by the layout function instead of par" loading="lazy" />
    <figcaption>Figure 2. The figure Exercise 1, question 2 asks for: the same iris plots arranged with the layout
      function instead of par, so that the panels can be given different proportions. The exercise asks for a
      canvas of 2 rows and 2 columns with widths 0.6 and 0.4 and heights 0.5 and 0.5; the layout matrix that comes
      with the answer script leaves two panels, the sepal scatter on top and the histogram of sepal length
      below.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 1 · Reference answer" :code="code1101"
  :images="['/figures/en/11-ggplot2/unnamed-chunk-7-1.png', '/figures/en/11-ggplot2/unnamed-chunk-7-2.png', '/figures/en/11-ggplot2/unnamed-chunk-7-3.png']"
/>

::: tip How par(mfrow) and layout divide the work
| Function | What it can do | Limitation |
| --- | --- | --- |
| `par(mfrow = c(2, 3))` | cuts the canvas into 2 rows and 3 columns of **equal size** | every cell is the same size; the proportions cannot be adjusted |
| `layout(mat, widths, heights)` | arranges panels according to the matrix `mat`, and can also set the **width and height proportions** | you have to write the matrix yourself |

How to write the `mat` matrix for `layout`: **the same number means the same panel**,
and the order of the numbers determines the order of plotting. If you want “one full row on top,
two panels side by side below”, write:

```r
mat <- matrix(c(1, 1, 2, 3), nrow = 2, byrow = TRUE)
layout(mat, widths = c(0.6, 0.4), heights = c(0.5, 0.5))
```

`box()` draws an outer frame around the current plot — without it, the boundaries of the plots are
hard to make out in the cells that `par` / `layout` cut out.

> A small note: the `layout_matrix <- matrix(c(1,2,3), nrow = 2, ncol = 1)` in the answer
> gives 2 rows and **1 column**, which does not quite correspond to the “2 rows, 2 columns, widths
> 0.6/0.4” the exercise asks for. If R reports a width vector length mismatch when you run it,
> change it to the matrix above.
:::

## Exercise 2: The geom_rect Function

Open **test1102.R** and complete the tasks below.

1. In the script file, the data frame `df` contains two variables `x` and `y`; taking `x` as the
   horizontal coordinate and `y` as the vertical coordinate, draw a tile plot with the `geom_rect`
   function.
2. Map the color to `x`.
3. Do not show the legend or the axis labels, and set the tick label font size to 20.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/11-question/fig03.png')" alt="Three coloured rectangles drawn with geom_rect" loading="lazy" />
    <figcaption>Figure 3. The tile plot Exercise 2 asks for: the three rows of the data frame df (x = 3, 1, 5 and
      y = 5, 7, 9) drawn with geom_rect, each tile running from x to x+2 horizontally and from y-1 to y+1
      vertically. The fill colour is mapped to x, so the three tiles have three different colours; the legend and
      the axis labels are hidden, and the tick labels are set to size 20.</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 2 · Reference answer"
  description="This exercise needs library(ggplot2) first."
  :code="code1102"
  :images="['/figures/en/11-ggplot2/unnamed-chunk-8-1.png']"
/>

::: tip The “grammar of layers” in ggplot2
ggplot2 code always has this structure:

```r
ggplot(data, aes(mapping)) +   # layer 1: canvas + data + coordinate mapping
  geom_xxx(...) +              # layer 2: what shape to draw
  scale_xxx(...) +             # layer 3: how to transform the scale/color
  labs(...) +                  # layer 4: titles and labels
  theme(...)                   # layer 5: appearance theme
```

**Parameters inside `aes()` are called “mappings”, and those outside `aes()` are “fixed values”**:

- `geom_rect(aes(fill = x))` — the color **changes with the data x**, and a legend is generated
  automatically.
- `geom_point(color = 'blue3')` — every point has the same color, and there is no legend.

`geom_rect` needs the coordinates of four corners: `xmin` / `xmax` / `ymin` / `ymax`,
so all of them have to be written inside `aes()`. `element_blank()` means “remove this item”,
whereas `legend.position = 'none'` hides the whole legend.
:::

## Exercise 3: geom_text, Scale Transformations, and Theme Elements

Open **test1104.R** and complete the tasks below.

1. Using the variables `hp` and `disp` in the data frame `x` as the x axis and y axis data, draw a
   scatter plot, with the point size set to 3 and the color set to `"blue3"`.
2. Add text with the `geom_text` function, with the `label` parameter set to the `cyl` variable in
   the data frame, the color mapped to `cyl`, the font size 6, and the text box moved 8 units along
   the x axis.
3. Use the scale transformation function `scale_color_gradientn` to set the color set to
   `rainbow(20)`, and set the legend title to “Number of Cylinders”.
4. Set the font size of the legend title and the axis labels to 18, and the font size of the legend
   key labels and the tick labels to 16.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/11-question/fig04.png')" alt="Scatter plot of mtcars horsepower against displacement, labelled with the number of cylinders" loading="lazy" />
    <figcaption>Figure 4. The scatter plot Exercise 3 asks for: the horsepower (hp) of each car on the x-axis
      against its displacement (disp) on the y-axis, from mtcars, drawn as blue3 points of size 3. Each point also
      carries the number of cylinders as a text label moved 8 units along the x axis, the colour of the label is
      mapped to the number of cylinders through a 20-colour rainbow ramp, and the legend explains it.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 3 · Reference answer" :code="code1104"
  :images="['/figures/en/11-ggplot2/unnamed-chunk-9-1.png']"
/>

::: tip nudge_x in geom_text and scale transformations
**`nudge_x` / `nudge_y`** are the parameters that “shift the text over as a whole” — if the text on
a scatter plot is not moved aside, it sits right on top of the points and cannot be read clearly.

**Scale transformation functions (`scale_*`)** are in charge of mapping data onto visual properties.
The common kinds are:

| Function | What it controls | Example |
| --- | --- | --- |
| `scale_color_gradientn()` | continuous color (custom color ramp) | `colors = rainbow(20)` |
| `scale_color_gradient()` | continuous color (gradient between the two ends) | `low` / `high` |
| `scale_fill_continuous()` | continuous **fill** color | `low = 'green', high = 'blue'` |
| `scale_fill_brewer()` | a preset palette | `palette = 'Set1'` |
| `scale_x_continuous()` | x axis scale | `limits` / `breaks` |

`name = "Number of Cylinders"` simply changes the legend title directly inside the scale function
(you can also write it all together in `labs()`).
:::

## Exercise 4: Showing Three-Dimensional Data with geom_raster and geom_contour

Open **test1105.R** and complete the operations below.

1. Map `eruptions` and `waiting` in the data frame `faithfuld` to x and y and `density` to z, and
   draw contours with `geom_contour` in red.
2. Draw the two-dimensional density with `geom_raster`, with the fill color mapped to `density`.
3. Set the font size of the axis labels and the legend title to 16, that of the legend key labels
   and the tick labels to 14, and the panel background color to `"lightblue"`, and remove the major
   and minor grid lines.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/11-question/fig05.png')" alt="Heat map and red contour lines of the faithfuld two-dimensional density" loading="lazy" />
    <figcaption>Figure 5. The plot Exercise 4 asks for: the two-dimensional kernel density of the Old Faithful
      geyser data (faithfuld) as a heat map. The length of the eruption is on the x-axis and the waiting time to
      the next eruption on the y-axis, the fill colour shows the estimated density, and red contour lines join the
      places where the density is the same. The panel background is lightblue with the grid lines
      removed.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 4 · Reference answer" :code="code1105"
  :images="['/figures/en/11-ggplot2/unnamed-chunk-10-1.png']"
/>

::: tip Drawing the “third dimension” on a flat plane
Three-dimensional data (x, y, z) have two common representations on a flat plane:

| Geometric object | Expressing z with color/lines |
| --- | --- |
| `geom_raster()` | uses the **fill color** for how high the density is, giving a heat map |
| `geom_contour()` | joins points with the same z into **contour lines** |

The two work best overlaid: the heat map shows the overall trend, and the contours show the
distribution of the actual values.

`faithfuld` is a data set that comes with R. It is itself a two-dimensional kernel density estimate
of eruption duration × waiting time for the “Old Faithful” geyser in Yellowstone National Park, and
it comes with the three columns `x`/`y`/`density` built in, so mapping `z = density` is exactly
right.

**How to remove the grid lines**: set both `panel.grid.major` (major grid) and
`panel.grid.minor` (minor grid) to `element_blank()`.
:::

## Exercise 5: Color Scales and Statistical Variables

Open **test1106.R** and complete the operations below.

1. Draw a histogram of the variable `price` in the data frame `diamonds`, set the fill color of the
   histogram to the intermediate result of the statistical transformation, `density` (written as
   `..density..`), and set the bin width to 1000.
2. Use a continuous scale transformation to reset the mapped color, with the parameters `low` and
   `high` set to `blue` and `green`.
3. Set the font size of the axis labels and the plot title to 20, and the font size of the legend
   key labels and the tick labels to 18.
4. Set the plot title font size to 22, the spacing between the title and the plot to 12, and align
   the title to the center.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/11-question/fig06.png')" alt="Histogram of diamond prices, filled by the computed density" loading="lazy" />
    <figcaption>Figure 6. The histogram Exercise 5 asks for: the price of the diamonds in the diamonds data set,
      with the price on the x-axis and the count on the y-axis, in bins 1000 dollars wide. The bars are not filled
      by the raw price but by the density computed by the statistical transformation, so the fill runs from green
      at the low end to blue at the high end, and a centred title sits above the plot.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 5 · Reference answer" :code="code1106"
  :images="['/figures/en/11-ggplot2/unnamed-chunk-11-1.png']"
/>

::: tip What `..density..` is: mapping the “result of a statistical transformation”
Before a histogram is drawn, ggplot2 first carries out a **statistical transformation** internally:
it bins the raw data and computes the count, density, and so on for each bin. These results can be
referred to in the form `..name..`:

```r
geom_histogram(aes(fill = ..density..), binwidth = 1000)
```

This means “fill the bars **not according to the raw price**, but according to the computed density
value”.

⚠️ **A note for newer versions**: from ggplot2 3.4 on, `..density..` is marked as deprecated, and
the new way to write it is `after_stat(density)`. The two are equivalent, and the old form still
works for now, it merely reports a warning. The answer uses the old form, so it is kept as is.

`binwidth = 1000` means each bin is 1000 dollars wide — **the bin width is easier to control than
the number of bins**, because it does not change with the range of the data.
:::

## Exercise 6: geom_point, Attribute Mapping, Theme Settings, and Scale Transformations

1. Use `geom_point` to draw a scatter plot with `Sepal.Length` and `Sepal.Width` of `iris` as the
   plotting data, where `Sepal.Length` is the x axis and `Sepal.Width` is the y axis.
2. The point size is 5, the transparency is 0.7, and the point shape is 21.
3. The plot title font size is 20, the blank space between it and the plot is 12, and the font is
   bold.
4. The axis label font size is 18, bold, brown, with a blank space of 10 between it and the plot.
5. The tick label font size is 16, and the legend key label font size is 16.
6. The legend title font size is 18, brown, bold, with a blank space of 10 between it and the
   legend.
7. The legend key height is 1 cm and the width is 0.9 cm. Note: set them in the form
   `unit(1, 'cm')`.
8. The legend background color is `grey90` and the border color is red.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/11-question/fig07.png')" alt="Scatter plot of iris sepal length against sepal width, filled by species" loading="lazy" />
    <figcaption>Figure 7. The scatter plot Exercise 6 asks for: the sepal length on the x-axis against the sepal
      width on the y-axis for the 150 iris flowers, drawn as large semi-transparent circles (shape 21, size 5)
      filled by species. The two axes are fixed by scale_x_continuous and scale_y_continuous, and the theme sets a
      centred bold blue title, bold brown axis labels, red tick labels and a legend on a grey90 background with a
      red border.</figcaption>
  </figure>
</div>

<AnswerBlock title="Exercise 6 · Reference answer" :code="code1107"
  :images="['/figures/en/11-ggplot2/unnamed-chunk-12-1.png']"
/>

::: tip The naming rule behind theme — two rules are enough to remember
The dozens of parameters inside `theme()` actually follow a fixed naming convention:

**Rule one: `element.part`**

| Name | What it controls |
| --- | --- |
| `plot.title` | the plot's **main title** |
| `axis.title.x` / `.y` | the **labels** of the x / y axis |
| `axis.text` | the axis **tick text** |
| `legend.title` | the **legend title** |
| `legend.text` | the **legend item text** |
| `legend.key` | the little **color patch / symbol** in the legend |
| `legend.background` | the **outer background** of the legend |

**Rule two: text uses `element_text()`, blocks use `element_rect()`, lines use `element_line()`, and removal uses `element_blank()`**

So:

- title → `plot.title = element_text(size = 20, face = 'bold', margin = margin(b = 12), hjust = 0.5)`
  (`hjust = 0.5` is **horizontal centering**)
- legend background → `legend.background = element_rect(fill = 'grey90', color = 'red')`
- `margin(b = 12)` means “leave 12 of blank space at the bottom”; b/t/l/r stand for
  bottom/top/left/right.

**What is special about shape 21**: only the shapes `pch = 21~25` can have a
**border color (`color`) and a fill color (`fill`)** set at the same time, so to fill different
species with different colors you must use `shape = 21` together with `aes(fill = Species)`.
:::

## Summary

| Topic | Key syntax |
| --- | --- |
| Multiple-plot layout | `par(mfrow = c(rows, cols))`, `layout(mat, widths, heights)` |
| Basic structure | `ggplot(data, aes(mapping)) + geom_*() + scale_*() + labs() + theme()` |
| Geometric objects | `geom_point` / `geom_rect` / `geom_text` / `geom_raster` / `geom_contour` / `geom_histogram` |
| Statistical transformations | `..density..` (old) / `after_stat(density)` (new), `binwidth` |
| Scale transformations | `scale_color_gradientn`, `scale_fill_continuous`, `scale_fill_brewer`, `scale_x_continuous` |
| Theme elements | `element_text` (text), `element_rect` (blocks), `element_blank` (removal) |
| Common theme items | `plot.title`, `axis.title`, `axis.text`, `legend.title`, `legend.text`, `panel.grid`, `panel.background` |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第十一周原题` (the Week 11 original exercises), and the answers
from `资料/答案/第十一周答案` (only typos in them were corrected).
“Figures 1 to 7” in the body of the original exercises have been put back under the corresponding
exercise by number (they are taken from `资料/汇总/第十一周——ggplot2包_files/figure-html/`, the same
set of figures as the screenshots in the original docx, but at higher resolution);
the original exercise already gave the complete code for the last exercise directly in the document.
:::

::: tip Want the statistics behind it?
This lecture is about **how to draw with the grammar of layers**; for the principles of choosing a
statistical chart and the common ways charts mislead, see the corresponding summary in
*Health Statistics*.

See **[Chapter 19 of *Health Statistics*, Statistical Tables and Charts](/en/Health-statistics/19-tables-and-charts)**.
:::
