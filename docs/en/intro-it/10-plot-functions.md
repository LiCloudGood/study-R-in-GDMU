---
layout: doc
title: '10. Low-Level Plotting Functions'
---

<script setup>
import { withBase } from 'vitepress'
const code1001 = `library(vioplot)

x <- read.csv("melanom.csv")

# (1) Turn 1/2 into readable labels and fix the level order (ulc first, sex second)
x$ulc <- factor(x$ulc, levels = 1:2, labels = c("Ulcerated", "Not ulcerated"))
x$sex <- factor(x$sex, levels = 1:2, labels = c("Female", "Male"))

# (2) Split into 4 groups by ulc and sex
g <- interaction(x$ulc, x$sex, sep = "·")
thick <- split(x$thick, g)

vioplot(thick,
        names = levels(g),
        # Violin fill color: one for each of the 4 groups
        col = c("skyblue1", "plum1", "lightgreen", "goldenrod"),
        # Box fill color: 4 colors from rainbow, with opacity 0.8
        rectCol = adjustcolor(rainbow(4), alpha.f = 0.8),
        # Box border and whiskers: red; whisker length 1
        lineCol = "red",
        range = 1,
        # Median points: shapes 21:24, filled with colors()[101:104], border blue
        # Note: when pchMed is in 21:25, colMed is the border color and
        # colMed2 is the fill color
        pchMed = 21:24,
        colMed = "blue",
        colMed2 = colors()[101:104],
        cex = 1.5,
        # (3) Other parameters
        main = "Melanoma Thickness by Ulceration and Sex",
        xlab = "Ulceration / Sex",
        ylab = "Thickness",
        cex.main = 1.8,
        cex.axis = 1.2,
        cex.lab = 1.5)`

const code1002 = `library(vioplot)

set.seed(12345)
x.1 <- rnorm(200, mean = 2, sd = 2)
x.2 <- rnorm(200, mean = 4, sd = 3)
x.3 <- rpois(200, 3)
x.4 <- rbinom(200, 8, prob = 0.2)
x <- data.frame(x.1, x.2, x.3, x.4)

vioplot(x,
        # (2) Box fill color and box border color are both colors()[401:404]
        rectCol = colors()[401:404],
        lineCol = colors()[401:404],
        # (5) Violin fill color
        col = terrain.colors(4),
        # (6) Violin border color and width
        border = rainbow(4),
        lwd = 2,
        # (3) Title: red, size 2
        main = "Violin Plots of Four Random Samples",
        col.main = "red",
        cex.main = 2,
        # (4) Tick labels: blue, size 1.5
        col.axis = "blue",
        cex.axis = 1.5,
        # (7) Other parameters
        cex.lab = 1.5,
        ylab = "Value")`

const code1003 = `x <- read.csv("alkfos.csv")

# (1) Use qqnorm to work out the Q-Q coordinates.
#     We do not plot here, because the two groups of points need different
#     styles, so we have to add them ourselves with points().
qq <- qqnorm(x$c0, plot.it = FALSE)

# (7)(8) Set the style of the axis labels and tick labels with par first;
#         it takes effect when we plot below
par(col.lab = "#0066ff", cex.lab = 1.5,
    col.axis = "#00ff66", cex.axis = 1.5)

plot(qq$x, qq$y, type = "n",
     xlab = "Theoretical quantiles", ylab = "Sample quantiles (c0)",
     main = "Normal Q-Q Plot of c0",
     cex.main = 2, col.main = "#f80fa8")

# (2)(3)(4)(5) Color by grp: shape, border color, fill color, size
points(qq$x[x$grp == 1], qq$y[x$grp == 1],
       pch = 21, col = "red",  bg = "purple1", cex = 1.5)
points(qq$x[x$grp == 2], qq$y[x$grp == 2],
       pch = 22, col = "blue", bg = "pink1",   cex = 1.5)

# (9) Q-Q reference line
qqline(x$c0, lwd = 2, col = "red2")

# (10) Other: add a legend, or you cannot tell which group is which
legend("topleft", legend = c("grp = 1", "grp = 2"),
       pch = c(21, 22), col = c("red", "blue"),
       pt.bg = c("purple1", "pink1"), pt.cex = 1.5, bty = "n")`

const code1004 = `set.seed(10000)
x <- rnorm(100, 2)

# (1) First use rt to generate a random sample y of the same length as x
#     (35 degrees of freedom); y is the theoretical value (horizontal axis)
#     and x is the observed value (vertical axis)
y <- rt(length(x), df = 35)

# (4) Font size of the axis labels and the tick labels
par(cex.lab = 1.5, cex.axis = 1.5)

qqplot(y, x,
       xlab = "Theoretical quantiles of t(35)", ylab = "Sample quantiles of x",
       # (3) Title
       main = "Q-Q Plot of x against t(35)", col.main = "blue", cex.main = 2,
       # (2) Style of the points
       pch = 21, col = "blue", bg = "red", lwd = 2, cex = 1.5)

# (5) Q-Q line. Note that qqline() draws the line under the normal
#     distribution by default, whereas here we compare with t(35), so we must
#     tell it the reference distribution with distribution=.
qqline(x, distribution = function(p) qt(p, df = 35),
       lwd = 2, col = "green2")`

const code1005 = `x <- na.omit(read.csv("alkfos.csv"))

plot(range(x$c0),
     range(x$c12),
     type = "n",
     xlab = "",
     ylab = "")

# (2) Use points to add the scatter of c0 (x axis) against c12 (y axis):
#     the two groups differ in shape and in both border and fill color
points(x$c0[x$grp == 1], x$c12[x$grp == 1],
       pch = 22, col = "darkblue", bg = "lightgreen", cex = 2.5, lwd = 2)
points(x$c0[x$grp == 2], x$c12[x$grp == 2],
       pch = 23, col = "red", bg = "lightblue", cex = 2.5, lwd = 2)

# (3) Then use points again to overlay a layer of small points
points(x$c0[x$grp == 1], x$c12[x$grp == 1],
       pch = 22, bg = "pink1", cex = 1, lwd = 1)
points(x$c0[x$grp == 2], x$c12[x$grp == 2],
       pch = 23, bg = "purple1", cex = 1, lwd = 1)

# (4) Other parameters: add a title and a legend
title(main = "c0 versus c12 in the Two Groups", cex.main = 2)
legend("topleft", legend = c("grp = 1", "grp = 2"),
       pch = c(22, 23), col = c("darkblue", "red"),
       pt.bg = c("lightgreen", "lightblue"), pt.cex = 2, bty = "n")`

const code1006 = `t <- seq(from = 0, to = pi, by = 0.01 * pi)

plot(t,
     sin(2 * t + 1),
     type = "l",
     col = "red",
     yaxt = "n",
     xaxt = "n",
     xlab = "",
     ylab = "")

par(new = T)

plot(t,
     cos(4 * t - 3),
     type = "l",
     col = "blue",
     yaxt = "n",
     xaxt = "n",
     xlab = "",
     ylab = "")

par(new = T)

plot(t,
     0.4 * t - 0.2,
     type = "l",
     col = "green",
     lwd = 2,
     xlab = "",
     ylab = "")

# (1) title adds the plot title, the subtitle, and the axis labels
title(main = "Three Curves",
      sub = "y = sin(2x+1) / y = cos(4x-3) / y = 0.4x-0.2",
      xlab = "t",
      ylab = "y",
      font.main = 4,
      col.main = "red2",
      cex.main = 2)

# (2) text labels each curve with its function: bottom-left aligned, font
#     shape 3 (italic)
text(2.3, 0,   "y=sin(2x+1)", adj = c(0, 0), font = 3, col = "red")
text(1.0, 0.8, "y=cos(4x-3)", adj = c(0, 0), font = 3, col = "blue")
text(0.6, 0,   "y=0.4x-0.2",  adj = c(0, 0), font = 3, col = "green")

# (3) mtext adds the current system date on the right of the plot
mtext(format(Sys.Date()), side = 4, col = "gold")`

const code1007 = `x <- as.data.frame(HairEyeColor)
x.m <- subset(x,
              x$Sex == "Male",
              c("Hair", "Eye", "Freq"))

barplot(Freq ~ Hair + Eye, # row-column
        data = x.m,
        beside = T,
        col = c("yellow",
                "green",
                "pink",
                "blue"),
        ylim = c(0, 65),
        density = c(10, 20, 40, 60),
        angle = c(45, -45, 60, -60),
        main = "Adding a Legend",
        cex.main = 2.5)
box()

# (1) Put the legend at the top
legend("top",
       legend = levels(x.m$Hair),
       # (2) Legend boxes: fill the background, border rainbow(4), 40 shading
       #     lines per inch, and an angle
       fill = rainbow(4),
       density = 40,
       angle = c(-45, 45, -60, 60),
       # (3) Legend lines: solid, width 2, color colors()[55:58], length 3
       lty = 1,
       lwd = 2,
       col = colors()[55:58],
       seg.len = 3,
       # (4) Points on the legend lines: shape 21:24, filled yellow, size 1.5,
       #     line width 3
       pch = 21:24,
       pt.bg = "yellow",
       pt.cex = 1.5,
       pt.lwd = 3,
       # (5) Other: box width 3 and blue, spacing 1 between the text and the
       #     legend lines, 2 columns, font size 1.2
       box.lwd = 3,
       box.col = "blue",
       x.intersp = 1,
       ncol = 2,
       cex = 1.2)`

const code1008 = `rm(list = ls())
x <- iris[, c(3, 4)]
names(x) <- c("Length", "Width")
plot(x,
     xlab = "",
     ylab = "",
     cex.axis = 1.5,
     cex = 2,
     col = rainbow(50),
     main = "Adding Lines",
     cex.main = 2)

# abline: fitted straight line
cf <- lm(Width ~ Length, data = x)
cf.a <- coef(cf)[1]   # intercept
cf.b <- coef(cf)[2]   # slope

# (1) Add the fitted straight line
abline(a = cf.a, b = cf.b, lwd = 2, col = "red")

# lines: normal density curve
set.seed(100)
t <- seq(from = 1, to = 7, by = 0.05)
y <- dnorm(t, mean = 4, sd = 0.5)

# (2) Draw the density data scaled up 3 times: blue, width 2, dashed
lines(t, 3 * y, col = "blue", lwd = 2, lty = 2)

# (3) Add an arrow: from (2.3, 1.5) to (3.7, 1.9), head at the end point
arrows(2.3, 1.5, 3.7, 1.9,
       length = 0.3, angle = 30, code = 2, col = "blue")

# (4) Add text at the starting end of the arrow: the top-right end of the text
#     is aligned to the starting point, so adj = c(1, 1)
text(2.3, 1.5, "Normal density curve", adj = c(1, 1), col = "blue")`
</script>

# Low-Level Plotting Functions

::: info Translation status
Translated from the [Chinese original](/intro-it/10-plot-functions). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

::: info Instructor's suggestion
Complete Exercises 1, 3, 5, 6, 7, and 8; do Exercises 2 and 4 after class.
:::

## Objectives

- Master the scatter plot function `points()`.
- Master the line functions `lines()` and `abline()`, and the arrow function `arrows()`.
- Master the text functions `text()` and `title()`.
- Master the legend function `legend()`.

::: warning The answers in this lecture were produced by running the code ourselves
The answers for the other lectures come from the `资料/答案` (answer scripts) the instructor gave
out, but **for Week 10 there are no answer scripts and no compiled handouts** — only the original
exercises and 8 starter scripts (the scripts read in the data, and the plotting part is left blank).

So the answers on this page were implemented one requirement at a time and run in R on a local
machine, and the figures are the actual output of those runs. Several places in the exercises say
“as shown in the figure below”, and the sample figures are reproduced under each exercise (taken
from the illustrations in the original docx), so you can compare directly. Details the exercises do
not pin down (what words a title uses, for instance) follow the style of the sample figures;
everything else follows the parameters the exercises give.
:::

::: tip The two data files
Exercise 1 uses `melanom.csv`, and Exercises 3 and 5 use `alkfos.csv`; both are in
`资料/原题/第十周原题/`, so switch the working directory there before running.

`vioplot` does not come with R, so `install.packages("vioplot")` first.
:::

::: tip What the original exercise calls “arrow 函数” is really `arrows()`
The second objective says the `arrow` function, but the R function name has an s in it: it is
**`arrows()`**.
:::

## Exercise 1: Using the vioplot function

Open the script file **test1001.R**, in which `x` is a data frame, the variable `ulc` indicates
whether there is ulceration, `sex` is sex, and `thick` is melanoma thickness. Use violin plots to
compare melanoma thickness grouped by `ulc` and `sex`.

1. Change the data with value 1 in the variable `ulc` to “Ulcerated” and those with value 2 to
   “Not ulcerated”; change `sex` 1 to “Female” and 2 to “Male”.
2. Draw a violin plot grouped by `ulc` and `sex`, with the graphical parameters set as follows:
   - The class labels of the grouping axis are named by `ulc` and `sex`, with `ulc` first and `sex`
     second, as shown in the figure below;
   - The fill color of the boxes is 4 colors from `rainbow`, with alpha set to 0.8;
   - The color of the box borders and whiskers is red, and the whisker length is set to 1;
   - The fill color of the violins is `"skyblue1"`, `"plum1"`, `"lightgreen"`, `"goldenrod"`;
   - The median point type of the boxes is 21:24, the median point size is 1.5, the median fill
     color is colors 101 to 104 of `colors()`, and the median border is blue.
3. Set the other parameters following the style of the figure below.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig01.png')" alt="Sample figure 1" loading="lazy" />
    <figcaption>Sample figure 1</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 1 · Reference answer"
  description="Requires the vioplot package (install.packages('vioplot')); the data are in melanom.csv."
  :code="code1001"
  :images="['/figures/10-base-graphics/q01.png']"
/>

::: tip Three traps in this exercise
**① `alpha = 0.8` cannot be written directly.** `vioplot()` has no `alpha` parameter, and passing
one raises no error — it draws that 0.8 in as **a fifth group of data**, so the plot grows one more
violin. The correct way to set transparency is `adjustcolor(color, alpha.f = 0.8)`.

**② The median colors are the other way round.** When `pchMed` is 21:25, `colMed` controls the
**border color** and `colMed2` is the fill color. The exercise asks for a fill of
`colors()[101:104]` and a blue border, so `colMed = "blue"` and `colMed2 = colors()[101:104]` — write
them the other way round and every color comes out reversed.

**③ The order of the group labels.** The order of `interaction(ulc, sex)` is the order that `sep`
joins them in, so set the two variables as ordered factors first, and only then are the labels
reliably “Ulcerated·Female, Ulcerated·Male, Not ulcerated·Female, Not ulcerated·Male”.
:::

## Exercise 2: Using the vioplot function (after class)

Open the script file **test1002.R** and complete the operations below.

1. Draw violin plots of the 4 variables in the data frame `x`.
2. The box fill color and the box border color in the violin plots are both `colors()[401:404]`.
3. The title font color is red and the size is 2.
4. The color of the axis tick labels is blue and the tick label font size is 1.5.
5. The fill color of the violins is `terrain.colors(4)`.
6. The border color of the violins is `rainbow(4)` and the width is 2.
7. Set the other parameters with reference to the sample figure.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig02.png')" alt="Sample figure 2" loading="lazy" />
    <figcaption>Sample figure 2</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 2 · Reference answer"
  description="Pass the data frame straight to vioplot() and it treats every column as one group."
  :code="code1002"
  :images="['/figures/10-base-graphics/q02.png']"
/>

::: tip What kinds of input `vioplot()` accepts
Pass a **data frame** or a **matrix**: one group per column;
pass a **list**: one group per element (that is how Exercise 1 did the grouping);
pass **several vectors** `vioplot(a, b, c)`: one group per vector;
pass a **formula** `vioplot(y ~ g, data = d)`: grouped by the levels of `g`.

When a parameter is written as a vector (say `col = colors()[401:404]`), the values are taken group
by group, and recycled when they run out.
:::

## Exercise 3: Q–Q plot exercise

Open the script file **test1003.R** and complete the tasks below.

1. Use `qqnorm` to draw the Q–Q scatter plot of the variable `c0` in the data frame `x`.
2. When `grp` is 1 the point type is 21; when `grp` is 2 the point type is 22.
3. When `grp` is 1 the border is red; when `grp` is 2 the border is blue.
4. If `grp` is 1 the fill color of the points is `purple1`; if `grp` is 2 the fill color of the
   points is `pink1`.
5. The point size is 1.5.
6. The size of the title is 2 and its color is `#f80fa8`.
7. The font size of the axis labels is 1.5 and the color is `#0066ff`.
8. The font size of the tick labels is 1.5 and the color is `#00ff66`.
9. Use `qqline` to draw the Q–Q line of `c0`, with line width 2 and color `red2`.
10. Set the other parameters following the style of the figure below.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig03.png')" alt="Sample figure 3" loading="lazy" />
    <figcaption>Sample figure 3</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 3 · Reference answer"
  description="The two groups of points need different styles, so take the coordinates with qqnorm(plot.it = FALSE) first and plot them yourself."
  :code="code1003"
  :images="['/figures/10-base-graphics/q03.png']"
/>

::: tip Why `plot.it = FALSE`
`qqnorm()` draws all the points in one and the same style, so there is no way to have “shape 21 for
the first group and shape 22 for the second”. What it is really for is **working out the
coordinates**: `qqnorm(x$c0, plot.it = FALSE)` returns a list, whose `$x` holds the theoretical
quantiles and `$y` the sorted observed values. Once you have those two columns you can add the
points group by group with `points()`, setting whatever styles you like.

This is also the central idea of this lecture: **low-level plotting functions（初级绘图函数）add
things to a plot that has already been drawn**. `points()`, `lines()`, and `text()` all work the
same way, so how the whole figure is built, and what is drawn before what, is up to you.
:::

## Exercise 4: Using Q–Q plots (after class)

Open the script file **test1004.R** and complete the tasks below.

1. Use a Q–Q plot to test whether `x` approximately follows a t distribution with 35 degrees of
   freedom.
   - First use `rt` to generate a random sample `y` of the same length as `x`, where `rt` has 35
     degrees of freedom;
   - Then use `y` as the theoretical values and `x` as the observed values, and draw the Q–Q
     scatter plot with `qqplot`;
   - Draw the Q–Q line with `qqline`; if the scatter gathers near the line, then `x` may be
     considered to approximately follow a t distribution with 35 degrees of freedom.
2. The point type of the scatter plot is 21, the point border color is blue, the width is 2, the
   size is 1.5, and the fill color of the points is red.
3. The title color is blue and the size is 2.
4. The axis label font size is 1.5 and the tick font size is also 1.5.
5. The line drawn by `qqline` has line width 2 and color `green2`.
6. Set the other parameters following the style of the figure below.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig04.png')" alt="Sample figure 4" loading="lazy" />
    <figcaption>Sample figure 4</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 4 · Reference answer"
  description="Note that qqline() needs its reference distribution specified, or it draws the line for a normal distribution."
  :code="code1004"
  :images="['/figures/10-base-graphics/q04.png']"
/>

::: tip By default `qqline()` compares against the normal distribution
`qqline()` has `distribution = qnorm` by default and draws the reference line for “the data vs the
normal”. This exercise compares against **t(35)**, and a bare `qqline(x)` puts the line in the wrong
place, so it looks like “clearly not normal” — but it is the line that is wrong, not the data. Add
`distribution = function(p) qt(p, df = 35)` and it lines up.

**The difference between `qqnorm` and `qqplot`**: `qqnorm(x)` is the special case of “`x` vs the
normal”; `qqplot(y, x)` is the general two-sample Q–Q plot — `y` goes on the horizontal axis as the
theoretical values and `x` on the vertical axis as the observed values. This exercise uses `rt` to
generate a batch of t(35) random numbers as the theoretical values, so the horizontal axis is the t
quantiles.

**Reading the plot** (three typical shapes):

- the points basically hug the line → this distribution is plausible;
- the two ends go **one up and one down** (the left end curving above the line and the right end
  falling below it, giving an S shape) → the tails are **lighter** than the reference distribution;
  the reverse (low on the left, high on the right) → the tails are **heavier**;
- the whole thing bends into a bow → the distribution is skewed.

The `x` of this exercise was generated by `rnorm(100, 2)`, while the tails of t are heavier than
those of the normal (the 1% quantile of t(35) is $-2.44$, against $-2.33$ for the normal), so it does
**not strictly** follow t(35): on the plot you get the S shape of the first kind, and for this
particular data the left end rises about 1.2 above the line while the right end drops about 0.6
below it, which the eye can see. The larger the degrees of freedom, the closer t comes to the
normal, and 35 is already fairly close, so the curvature is not violent.
:::

## Exercise 5: The points function

Open the script file **test1005.R** and complete the operations below.

1. Use the data frame `x` as the data source.
2. Use the `points` function to add the scatter made up of `c0` and `c12`, with `c0` on the x axis
   and `c12` on the y axis.
   - When `grp` is 1 the point type is 22, the border color is `darkblue`, and the fill color is
     `lightgreen`;
   - When `grp` is 2 the point type is 23, the border color is `red`, and the fill color is
     `lightblue`;
   - The point size is 2.5 and the border width is 2.
3. Use the `points` function again to add the scatter made up of `c0` and `c12`.
   - When `grp` is 1 the point type is 22 and the fill color is `pink1`;
   - When `grp` is 2 the point type is 23 and the fill color is `purple1`;
   - The point size is 1 and the border width is 1.
4. Set the other parameters following the style of the figure below.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig05.png')" alt="Sample figure 5" loading="lazy" />
    <figcaption>Sample figure 5</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 5 · Reference answer"
  description="The starter script has already drawn the empty coordinate system, so the points can simply be added."
  :code="code1005"
  :images="['/figures/10-base-graphics/q05.png']"
/>

::: tip `type = "n"` means “draw the coordinate system only, not the points”
The line `plot(range(x$c0), range(x$c12), type = "n")` in the starter script means exactly that:
first stretch the coordinate system to the range of the data and set up the axes, leaving **the plot
empty**, and only then add the points layer by layer with `points()`.

This exercise adds two layers: first the large points (`cex = 2.5`, `lwd = 2`) as the base, and then
a layer of small points (`cex = 1`) at the same positions on top. What comes out is an “outline”
effect, so when the second layer has no `col` its border is black (the default color) — which
matches the sample figure.

**The order matters**: what is drawn later covers what was drawn earlier. For the small points to
show, they have to be drawn after the large ones.
:::

## Exercise 6: The title, text, and mtext functions

Open the script file **test1006.R** and complete the operations below.

1. Use the `title` function to add a plot title and a subtitle, and to add the axis labels. Set the
   title font shape to 4, the color to `red2`, and the font size to 2, as shown in the figure below.
2. Use the `text` function to add the expressions of the functions corresponding to the lines in the
   plot, as shown in the figure below. The alignment is bottom-left alignment to the coordinate
   `(x, y)`, and the font shape is 3. The coordinates of `y=sin(2x+1)` are `(2.3, 0)` and its color
   is red; the coordinates of `y=cos(4x-3)` are `(1.0, 0.8)` and its color is blue; the coordinates
   of `y=0.4x-0.2` are `(0.6, 0)` and its color is green.
3. Use `mtext` to add the current system date on the right of the plot, in the color `gold`.
4. Set the other parameters following the style of the figure below.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig06.png')" alt="Sample figure 6" loading="lazy" />
    <figcaption>Sample figure 6</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 6 · Reference answer"
  description="The three curves are overlaid with par(new = TRUE), and then the title, the labels, and the marginal note are added on top of them."
  :code="code1006"
  :images="['/figures/10-base-graphics/q06.png']"
/>

::: tip `par(new = TRUE)` means “keep drawing on the same plot”
R's `plot()` **opens a new plot** by default and wipes out the previous one. `par(new = TRUE)` tells
it “do not clear the screen, draw on the current plot”, and only then can the three curves be
stacked together.

The first two `plot()` calls both set `yaxt = "n"` / `xaxt = "n"`: **switch the axes off**. Otherwise
each of the three curves would draw its own set of axes and the overlay would be three sets of axes
smeared together. The last call does not switch them off, so one clean set stays on top.

**How the three functions that add text divide the work**:

| Function | Where it adds |
| --- | --- |
| `title()` | above the plot (main title, subtitle) and the axis labels |
| `text(x, y, ...)` | **anywhere inside** the plot, positioned by data coordinates |
| `mtext(..., side =)` | marginal notes outside the **four sides** of the plot, where `side = 1/2/3/4` is bottom/left/top/right |

`adj = c(0, 0)` is “bottom-left alignment”: it puts the **bottom-left corner** of the text box at
that coordinate. `font = 3` is italic and `font = 4` is bold italic.

This exercise takes the date of the day with `format(Sys.Date())`, so **the date you get will be the
day you run it**, not the one in the figure on this page. That is the correct behavior.
:::

## Exercise 7: The legend function

Open the script file **test1007.R** and complete the tasks below.

1. Use the `legend` function to add a legend, at the position `top`.
2. Set the legend boxes: fill the background with `TRUE`, the border color is `rainbow(4)`, the
   shading lines are 40 per inch, and the color is `c(-45, 45, -60, 60)`.
3. Set the legend lines: the line type is solid, the width is 2, the color of the legend lines is
   `colors()[55:58]`, and the length of the legend lines is 3.
4. Set the points on the legend lines: the point style is `21:24`, the fill color is yellow, the size
   is 1.5, and the line width is 3.
5. Other legend settings: the legend box width is 3 and its color is blue, the spacing between the
   text and the legend lines is 1, the legend is displayed in 2 columns, and the legend font size is
   1.2.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig07.png')" alt="Sample figure 7" loading="lazy" />
    <figcaption>Sample figure 7</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 7 · Reference answer"
  description="Every part of the legend has its own parameters; keep the three sets fill / lty / pch apart."
  :code="code1007"
  :images="['/figures/10-base-graphics/q07.png']"
/>

::: tip The parameters of `legend()` are divided up by part
Every entry in a legend is made of three parts: the **legend box**
(`fill` / `density` / `angle`), the **legend line** (`lty` / `lwd` / `col` / `seg.len`), and the
**point on the legend line** (`pch` / `pt.bg` / `pt.cex` / `pt.lwd`). Anything with the `pt.` prefix
controls the point, and anything with the `box.` prefix controls the frame of the whole legend.

A few that are easy to mix up:

| Parameter | What it controls |
| --- | --- |
| `x.intersp` | the **horizontal** spacing between the legend symbol and the text |
| `seg.len` | the length of the legend line (measured in character widths) |
| `ncol` | how many columns the legend is displayed in |
| `density` / `angle` | the density of the shading lines (lines per inch) and their angle |

Once `fill = rainbow(4)` is combined with `density`, the color in `fill` becomes the color of the
**shading lines** rather than a solid block of fill — the same relation as between `col` and
`density` in `hist()`.
:::

## Exercise 8: Putting it together

Open the script file **test1008.R** and complete the tasks below.

1. Add a fitted straight line to the plot, with intercept `cf.a`, slope `cf.b`, width 2, and color
   red.
2. Add a normal density curve, in which the quantile data are `t` and the density data are `3*y`,
   the color is blue, the width is 2, and the line type is 2.
3. Add an arrow from the starting point `(2.3, 1.5)` to the end point `(3.7, 1.9)`, with arrow
   length 0.3 and angle 30 degrees, drawing the arrow head at the end point, in the color blue.
4. Add text at the other end of the arrow, requiring the top-right end of the text to be at the
   coordinates of the arrow's starting point, in the color blue.

<div class="q-figures">
  <figure>
    <img :src="withBase('/figures/10-question/fig08.png')" alt="Sample figure 8" loading="lazy" />
    <figcaption>Sample figure 8</figcaption>
  </figure>
</div>

<AnswerBlock
  title="Exercise 8 · Reference answer"
  description="abline for a straight line, lines for a curve, arrows for an arrow, text for a label — all four ways of “adding to a plot” used at once."
  :code="code1008"
  :images="['/figures/10-base-graphics/q08.png']"
/>

::: tip What `abline()`, `lines()`, and `arrows()` each do
| Function | What it draws | How the position is given |
| --- | --- | --- |
| `abline(a = intercept, b = slope)` | a **line of infinite length**, running across the whole plot | give the intercept and the slope |
| `lines(x, y)` | a **polyline/curve** joining the points in order | give a series of coordinates |
| `arrows(x0, y0, x1, y1)` | an arrow from the starting point to the end point | give the two end points |

The intercept and slope of `abline()` have to be taken from the fitted result: after
`cf <- lm(...)`, `coef(cf)` is a vector of length 2, `[1]` being the intercept and `[2]` the slope,
so first do `cf.a <- coef(cf)[1]` and `cf.b <- coef(cf)[2]`, and then pass them to
`abline(a =, b =)`.

**`code = 2` is “draw the arrow head at the end point only”**: `code = 1` draws it at the start,
`code = 2` at the end, `code = 3` at both ends. `length = 0.3` is the length of the arrow head (in
inches) and `angle = 30` is the angle it opens at.

The last question asks for “the top-right end of the text aligned to the arrow's starting point”,
which corresponds to `adj = c(1, 1)`: `adj` controls **which corner of the text box** is put at that
coordinate, `c(0, 0)` being bottom-left and `c(1, 1)` top-right.
:::

## Quick reference for this lecture's plotting functions

| Function | What it does | Key parameters |
| --- | --- | --- |
| `points(x, y)` | add points to a plot | `pch`, `col`, `bg`, `cex`, `lwd` |
| `lines(x, y)` | add lines to a plot | `type`, `lty`, `lwd`, `col` |
| `abline(a, b)` | add a straight line of infinite length | `a` intercept, `b` slope; can also write `h =` (horizontal), `v =` (vertical) |
| `arrows(x0, y0, x1, y1)` | add an arrow | `length`, `angle`, `code`, `col` |
| `text(x, y, labels)` | add text anywhere in the plot | `adj`, `cex`, `col`, `font` |
| `title(...)` | add a main title / subtitle / axis labels | `main`, `sub`, `xlab`, `ylab`, `font.main` |
| `mtext(text, side =)` | add marginal notes on the four outer sides | `side`, `line`, `adj`, `col` |
| `legend(...)` | add a legend | `fill`, `lty`, `pch`, `ncol`, `bty` |
| `par(new = TRUE)` | keep drawing on the **same plot** without clearing it | combine with `xaxt` / `yaxt` to switch off duplicate axes |

**The rule behind point styles `pch`**: `21:25` are the shapes that **can be hollow** (their border
`col` and their fill `bg` can be set separately); the others (`0:20`, `1`, `2`, …) are solid symbols
with only the single color `col` to set. For an effect like “red edge, purple center” you have to
use 21 or above.

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第十周原题`.

**The answers in this lecture are not the instructor's**: neither `资料/答案` nor `资料/汇总` has a
Week 10, only the original exercises and the 8 starter scripts. So the answers and the figures were
implemented by this site according to the requirements of the exercises and run on a local machine;
the sample figures are taken from the illustrations in the original docx
(`fig01.png` to `fig08.png`).
:::

::: tip Want the statistics behind it?
This lecture is **a manual of base R's low-level plotting functions** — how to add things to a plot
that has already been drawn.

Which data deserve which plot, and when a plot stops misleading its reader (truncated axes, dual Y
axes, whether to use a pie chart), are summarized in *Health Statistics*; ready-made higher-level
plotting functions (`hist`, `boxplot`, `plot`) are in Lecture 9.

- **[Chapter 19 of *Health Statistics*, Statistical Tables and Charts](/Health-statistics/19-tables-and-charts)** *(Chinese)*
- **[Lecture 9 of *Introduction to Information Technology*, Base Graphics](/intro-it/9-base-graphics)** *(Chinese)*
:::
