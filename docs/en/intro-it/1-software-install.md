---
layout: doc
title: '1. Installing R and RStudio, Writing Scripts'
---

<script setup>
import { ref } from 'vue'

const showDownload = ref(false)

const code0102 = `setwd("E:/test01")
getwd()
version
source("test0102.R")
setwd("E:/")
source("test0102.R") # this will throw an error, because the file is not in the current directory
source('E:/test01/test0102.R')`

const code0103 = `setwd("e:/test01")
install.packages("vioplot_0.4.0.tar.gz", repos = NULL)
library(vioplot)
vioplot(mtcars$wt[mtcars$cyl==4],
        mtcars$wt[mtcars$cyl==6],
        mtcars$wt[mtcars$cyl==8],
        horizontal = TRUE,
        col = 'red')`

const code0107 = `a <- 2
b <- 5
c <- -1
(-b + sqrt(b^2 - 4*a*c)) / (2*a)
sin(b - a * c) / (3 * a + b * c)`
</script>

# Installing R and RStudio, Writing Scripts

::: info Translation status
Translated from the [Chinese original](/intro-it/1-software-install). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

## Exercise 1: Installing and configuring RGUI and RStudio

Install R and RStudio on your own computer.

<button class="ans-btn" @click="showDownload = !showDownload">{{ showDownload ? 'Hide' : 'Show' }} download links</button>
<div class="ans-box" v-show="showDownload">

**Official downloads**<br>
 RGUI: <a href="https://cran.r-project.org/mirrors.html" target="_blank">https://cran.r-project.org/mirrors.html</a><br>
 RStudio: <a href="https://posit.co/download/rstudio-desktop/" target="_blank">https://posit.co/download/rstudio-desktop/</a><br>
<br>
**Installation notes**<br>
 Choose the version that matches your operating system (Windows/macOS/Linux) to download and install<br> RGUI must be installed before RStudio, otherwise RStudio will not work properly
</div>

## Exercise 2: Setting the working directory

1. Check whether you have downloaded the complete materials from Github, and create a new folder named test01 on drive E.
2. Run RStudio, click "Tools" -> "Global Options", and set the default working directory (Default working directory) to "E\test01".
3. Use getwd() to look at the current working directory.
4. Restart RStudio, and use getwd() to look at the current working directory.
5. In the main RStudio window, click "File" -> "New File" -> "R Script" to create a new R script file, and save it as test0102.R.
6. In the script file, enter the following code:

```r
# check the R version
version
```

7. Check whether there is a test0101.R file under E:\test01? In the command window, run:

```r
source("test0102.R")
```

8. In the command window, run setwd("E:/"), then run source("test0102.R"), and see whether there is an error? Think about why it cannot run.

<ClickAnswer>
Because the current working directory has been changed to the root of drive E, while the file test0102.R is in the test01 folder on drive E, so the file cannot be found and an error is reported.
</ClickAnswer>

9. In the command window, run source('E:/test01/test0102.R'), and think about why it runs this time.

<ClickAnswer>
Because the absolute path of the file is used here, it is not affected by the current working directory, and R can find and run the file correctly.
</ClickAnswer>

<AnswerBlock title="Exercise 2 · Reference answer" :code="code0102" />

::: tip The working directory is “the starting point of a relative path”
`source("test0102.R")` uses a **relative path**, so R starts looking for the file from the “current working directory”.

- When the directory is `E:/test01` → the file is found ✓
- Once `setwd("E:/")` switches to the root of drive E → it is not found, and R reports an error
- Written as `source('E:/test01/test0102.R')`, an **absolute path** → it has nothing to do with the current directory, and it is always found ✓

The working directory can be checked with `getwd()` and changed with `setwd()`.
This is one of the pitfalls beginners step into most often: the script runs perfectly on your own computer, and on another computer it reports “file not found”.
:::

## Exercise 3: Installing packages

1. Open RStudio and use dir() to check whether the files “ISwR_2.0-8.tar.gz” and “vioplot_0.4.0.tar.gz” are in the current working directory
2. Click "Tools" -> "Install Packages", then install the ISwR package from “ISwR_2.0-8.tar.gz”
3. First run setwd("e:/test01") in the command window, then use the installation function install.packages to install the vioplot package from “vioplot_0.4.0.tar.gz”.
4. Click "File" -> "New File" -> "R Script" to create a new R script file test0103.R. Enter the following code:

```r
install.packages('vioplot_0.4.0.tar.gz',
                 repos = NULL)
library(vioplot)
vioplot(mtcars$wt[mtcars$cyl==4],
        mtcars$wt[mtcars$cyl==6],
        mtcars$wt[mtcars$cyl==8],
        horizontal = TRUE,
        col = 'red')
```

5. Run the script above and look at the result.

<AnswerBlock
  title="Exercise 3: Installing packages · Reference answer"
  description="Note: this code reads the local vioplot_0.4.0.tar.gz, so you have to put that file into the working directory before running it; otherwise it reports an error at the install.packages() step, which is normal."
  :code="code0103"
/>

## Exercise 4: Using the help system

1. Create the script file test0104.R
2. Enter the code below:

```r
?seq
help("rep")
?matrix
?read.csv
```

3. Run the script above line by line, watch how the help window changes, and read the contents of the help window carefully.

## Exercise 5: Assignment statements

1. Create the R script file test0105.R.
2. Enter the following code:

```r
# constant assignment
constant <- "Hello!"
constant
# variable assignment
a <- 5
print(a)
b <- 10; print(b)
(c = TRUE)
d = FALSE; d
e = 1e-2
print(e)
(f = 1.4E+3)
```

## Exercise 6: Writing R expressions

1. In RStudio, create the script file test0106.R.
2. Enter the following code:

```r
# arithmetic operators
c <- 5 + 3
print(c)
(d <- 10 - 2)
e <- 2 * 4; e
# comparison operators
f <- 5 > 3
f
g <- 10 < 5
g
h <- 5 >= 5
h
'a' < 'A'
'ab' < 'A'
'李' < '张'
# logical operators
i <- TRUE && FALSE
print(i)
j <- TRUE || FALSE
print(j)
k <- !TRUE
print(k)
# modulo and integer division
23/4
23 %/% 4
23 %% 4
-23%%4
23%%-4
-23%%-4
```

3. Run it line by line and observe the results.

## Exercise 7: Writing R expressions

1. Create the script file test0107.R.
2. Use assignment statements to define the variables a, b, c — that is, assign values to the variables — with the values 2, 5, and -1 respectively.
3. Compute the values of the expressions $\dfrac{-b+\sqrt{b^{2}-4ac}}{2a}$ and $\dfrac{\sin(b-ac)}{3a+bc}$.

::: tip Note
The arithmetic root function is `sqrt`; for example, $\sqrt{2}$ is written in R as `sqrt(2)`.
:::

<AnswerBlock title="Exercise 7 · Reference answer" :code="code0107" />

::: tip Two points about translating the two expressions
| Math notation | Translated into R |
| --- | --- |
| $\dfrac{-b+\sqrt{b^{2}-4ac}}{2a}$ | `(-b + sqrt(b^2 - 4*a*c)) / (2*a)` |
| $\dfrac{\sin(b-ac)}{3a+bc}$ | `sin(b - a*c) / (3*a + b*c)` |

Substituting $a=2,\ b=5,\ c=-1$:

- the first expression = $\dfrac{-5+\sqrt{25+8}}{4}=\dfrac{-5+\sqrt{33}}{4}\approx 0.186141$
- the second expression = $\dfrac{\sin(5-2\times(-1))}{3\times 2+5\times(-1)}=\dfrac{\sin 7}{1}\approx 0.656987$

**The denominator must be bracketed**: if it is written as `-b + sqrt(...) / 2*a`,
the division applies only to `sqrt(...)`, and the result is completely wrong.
:::

<style scoped>
.ans-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border: 0;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ans-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px #00000026;
}

.ans-box {
  margin-top: 12px;
  padding: 14px 18px;
  border-left: 4px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  border-radius: 0 6px 6px 0;
  line-height: 1.8;
  font-size: 14px;
}
</style>
