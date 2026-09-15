---
layout: doc
title: '7. Branches and Loops'
---

<script setup>
const code0701 = `n = rpois(1,75)
m =  rpois(1,80)

if (n %%2 != 1){
  print('n is even!')
}
if (m %%2 != 1){
  print('m is even!')
}else{
  print('m is odd!')
}`

const code0702 = `score = round(runif(1,40,100), digits = 0)

if (score >= 90){
  print('Excellent')
}else if(score >= 80){
  print('Good')
}else if(score >= 70){
  print('Fair')
}else if(score >= 60){
  print('Pass')
}else{
  print('Fail')
}`

const out0702 = `[1] "Fair"`

const code0703 = `x = rpois(1, 60)
y = rpois(1, 60)
z = rpois(1, 60)
a = rpois(1, 30)
b = rpois(1, 50)
c = rpois(1, 70)

if (a + b > c && a + c > b && b + c > a){
  print('Can form a triangle')
}else{
  print('Cannot form a triangle')
}

max = 0
if (x>y){
  if(x>z){
    max <- x
  }else{
    max <- z
  }
}else{
  if(y>z){
    max <- y
  }else{
    max <- z
    }
}
cat(x,y,z,max)`

const code0704 = `age = round(runif(35, 18, 60))
x = rpois(1, 60)
y = rpois(1, 60)
z = rpois(1, 60)

over40 <- ifelse(age > 40,"Yes",'No')
print(over40)

tmax = ifelse(
  x > y,
  ifelse(x>z,x,z),
  ifelse(y>z,y,z)
)
cat(x,',',y,',',z,'maximum is',tmax)`

const code0705 = `x = round(runif(100, 1, 99),digits = 0)
add <- 0
for (i in x){
  add <- add +i
}
ifelse(sum(x)==add,print('Correct'),print('Incorrect'))

i <- 1
while (i <= length(x)) {
  add <- add + x[i]
  i<- i +1
}

repeat{
  add <- add + x[i]
  i <- i + 1
  if (i > length(x)){
    break
  }
}`

const code0706 = `x = sprintf('%04d', 1:36)
y = round(runif(36, 22, 55), digits = 0)
z = rpois(36,75) %% 3 + 1
df = data.frame(ID = x, age = y, deg = z)

for (i in 1:length(z)) {
  df$deg[i] <- switch(z[i],
                      'Bachelor',
                      'Master',
                      'Doctor')
}
df`

const out0706 = `     ID age      deg
1  0001  44   Doctor
2  0002  47   Master
3  0003  39   Doctor
4  0004  49   Master
5  0005  39   Master
6  0006  39   Doctor
7  0007  36   Master
8  0008  34   Master
9  0009  26 Bachelor
10 0010  32   Master
11 0011  31 Bachelor
12 0012  47   Doctor
13 0013  48   Master
14 0014  27   Master
15 0015  39 Bachelor
16 0016  42   Doctor
17 0017  39   Master
18 0018  35   Doctor
19 0019  36 Bachelor
20 0020  22   Doctor
21 0021  52   Doctor
22 0022  25   Master
23 0023  39 Bachelor
24 0024  49 Bachelor
25 0025  42 Bachelor
26 0026  36   Master
27 0027  40   Doctor
28 0028  48   Master
29 0029  28   Master
30 0030  54   Doctor
31 0031  38   Master
32 0032  53   Doctor
33 0033  52   Master
34 0034  47   Master
35 0035  44   Doctor
36 0036  43 Bachelor`

const code0707 = `set.seed(1)
x = round(rnorm(100, 10, 10),digits = 2)

s=0
x
for(k in x){
  if(k<0)next
  if(k>30)break
  s = s+k
}
print(s)`

const code0708 = `x = rnorm(100, 5, 3)
y = runif(100, 0, 10)
cor(x,y)

ymean <- mean(y)
xmean <- mean(x)

csum = 0
xsum = 0
ysum = 0
for (k in 1:length(x)) {
  csum = csum + (x[k]-xmean)*(y[k]-mean(y))
  xsum = xsum + (x[k]-xmean)^2
  ysum = ysum + (y[k]-ymean)^2
}
pho = csum/sqrt(xsum*ysum)
print(pho)`
</script>

# Branches and Loops

::: info Translation status
Translated from the [Chinese original](/intro-it/7-branches-and-loops). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

::: info Instructor's suggestion
Please do Exercises 1, 2, 4, 5, 6, and 7; leave Exercises 3 and 8 for after class.
Exercises 9 and 10 are thinking questions for after class.
:::

## Objectives

- Master how to apply branching statements.
- Master how to use loop statements.
- Master using branching statements and loop statements to solve simple problems.
- Master how to use the `next` statement and the `break` statement.

## Exercise 1: The if statement and the if-else statement

Open the script file **test0701.R** and carry out the following operations.

1. If `n` is even, use the `print` function to display “n is even!”, otherwise display nothing.
2. If `m` is even, use the `print` function to display “m is even!”, otherwise display “m is odd!”.

<AnswerBlock title="Exercise 1 · Reference answer" :code="code0701" />

::: tip Only one `if` vs `if-else`
- Writing only `if`: when the condition does not hold, **nothing happens** (part 1).
- `if ... else`: one of the two paths must be taken (part 2).

In R, testing whether a number is odd or even is usually done with the remainder: `x %% 2 == 0`
means even. The answer writes `x %% 2 != 1`, which has the same effect.

> One small detail: `else` must be on the **same line** as the closing brace of `if`,
> otherwise R thinks the statement has already ended.
:::

## Exercise 2: Multi-way branching

Open the script file **test0702.R** and carry out the following operations.

Suppose `score` holds a score. Decide the grade from `score`: 90 and above is Excellent, 80 to 89 is
Good, 70 to 79 is Fair, 60 to 69 is Pass, and below 60 is Fail.

<AnswerBlock title="Exercise 2 · Reference answer" :code="code0702"
  :output="out0702" />

::: tip How to write multi-way branching, and in what order
```r
if (score >= 90) { ... }
else if (score >= 80) { ... }
...
else { ... }
```

Two points:

1. **The order must run from high to low**. Because `else if` means “you only get your turn once
   everything before you has failed”, if you put `score >= 60` first, a score of 95 would also be
   judged “Pass”.
2. Each branch only has to give the **lower bound**; the upper bound has already been ruled out for
   you by the preceding condition.
:::

## Exercise 3: Applying branching statements

Open the script file **test0703.R** and use branching statements to carry out the following
operations.

1. Taking `a`, `b`, `c` as the side lengths, decide whether they can form a triangle.
2. `x`, `y`, `z` are three arbitrary integers; use branching statements to find the largest of the
   three, and use the `cat` function to display the three numbers `x`, `y`, `z` and their maximum.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code0703" />

::: tip Two classic patterns
**Triangle test**: the sum of any two sides is greater than the third, and all three conditions have
to hold at once:

```r
if (a + b > c && a + c > b && b + c > a)
```

`&&` is “and”; note that it is not the same thing as the vectorized `&`: `&&` compares only the first
element, and is meant for places such as `if` where a single TRUE/FALSE is all that is needed.

**Maximum of three numbers**: with a nested `if` you need two levels, and the idea is “first settle
the winner of the first two, then compare it with the third” (that is the approach the answer uses).
R can in fact do it in one line: `max(x, y, z)`.
:::

## Exercise 4: The branching function ifelse

Open the script file **test0704.R** and carry out the following operations.

1. Use the `ifelse` function to produce a new vector `over40` whose elements consist of “Yes” and
   “No”. The rule is: for each element of `age`, if it is greater than 40 then “Yes”, otherwise “No”.
2. Use the `ifelse` function to find the maximum of `x`, `y`, `z`, and use the `cat` function to
   display the three numbers `x`, `y`, `z` and their maximum.

<AnswerBlock title="Exercise 4 · Reference answer" :code="code0704" />

::: tip ifelse is a “vectorized” branch
`if` can test only **one** condition at a time, whereas `ifelse` can handle **a whole vector** at
once:

```r
ifelse(condition vector, value when true, value when false)
```

`age` holds 35 numbers, and `ifelse(age > 40, "Yes", "No")` returns 35 “Yes / No” values of the same
length, with no loop needed. This is a very commonly used form in R.

`ifelse` can also be nested: part 2 first compares `x` with `y`, and then compares `z` inside each
branch.
:::

## Exercise 5: The three loops for / while / repeat

Open the script file **test0705.R** and use loop statements to carry out the following operations.

1. Use a `for` loop to compute and output the sum of all the elements of the vector `x`, and use the
   `sum` function to check that the computed result is correct.
2. Use a `while` loop to compute and output the sum of all the elements of the vector `x`.
3. Use a `repeat-break` loop to compute and output the sum of all the elements of the vector `x`.

<AnswerBlock title="Exercise 5 · Reference answer" :code="code0705" />

::: tip The skeleton of each of the three loops
```r
# for: you know what you have to iterate over
for (i in x) { ... }

# while: you know when it stops
while (condition) { ... }

# repeat: do the work first, test afterwards; you must break yourself, or it loops forever
repeat { ...; if (end condition) break }
```

The accumulator must be **initialized first** (`add <- 0` in the answer), otherwise R cannot find
`add` and raises an error.

The sums computed by the three loops have to be the same, which is also why the exercise asks you to
check with `sum(x)`.
:::

## Exercise 6: Loop statements and the switch function

Open the script file **test0706.R** and carry out the following operations.

According to the contents of the vector `z`, use a loop statement to modify the `deg` column of the
data frame, with this rule: if an element of `z` is 1, the corresponding position of the `deg` column
becomes “Bachelor”; if it is 2, it becomes “Master”; if it is 3, it becomes “Doctor”.

<AnswerBlock title="Exercise 6 · Reference answer" :code="code0706"
  :output="out0706" />

::: tip switch is a “look-up table” kind of branch
```r
switch(1, "Bachelor", "Master", "Doctor")   # returns "Bachelor"
switch(2, "Bachelor", "Master", "Doctor")   # returns "Master"
```

It takes the value **by position**: whatever the first argument is, that is the option returned.

Combined with a loop it becomes “translate one by one”:

```r
for (i in 1:length(z)) {
  df$deg[i] <- switch(z[i], "Bachelor", "Master", "Doctor")
}
```

A nested `ifelse` can do the same job, but `switch` is much clearer when there are many options.
`%04d` is `sprintf`'s formatting notation, meaning “pad with zeros to 4 digits”; it is especially
suitable for identifiers such as student numbers.
:::

## Exercise 7: The next statement and the break statement

Open the script file **test0707.R** and carry out the following operations.

1. Compute the sum of the elements of the vector `x` that are greater than 0, and stop the
   computation immediately when an element greater than 30 is met; the `next` statement and the
   `break` statement are required for controlling the flow of the program.
2. Use the `print` function to display the computed result (note: the reference result is 696.87).

<AnswerBlock title="Exercise 7 · Reference answer" :code="code0707" />

::: tip next is “skip”, break is “exit”
| Statement | What it does |
| --- | --- |
| `next` | skips the rest of the code in this iteration and goes straight to the **next** iteration |
| `break` | **jumps out** of the whole loop at once; no further iterations are run |

The exercise asks for “add up only what is greater than 0, and stop once it goes above 30”, so:

```r
for (k in x) {
  if (k < 0) next      # negative: skip it, do not accumulate
  if (k > 30) break    # too large: the whole loop ends here
  s = s + k
}
```

⚠️ The answer adds `set.seed(1)`, so every run reliably gives the reference result 696.87.
If you take `set.seed` out, `rnorm` generates different random numbers each time, and the result
naturally changes as well.
:::

## Exercise 8: Computing a correlation coefficient with a loop

Open the script file **test0708.R** and carry out the following operations.

1. Use a loop to compute the correlation coefficient $r$ of the vector `x` and the vector `y`, which
   is defined as follows:

   $$r = \frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum_{i=1}^{n}(x_i-\bar{x})^{2}\cdot\sum_{i=1}^{n}(y_i-\bar{y})^{2}}}$$

   where $x_i$ is an element of the vector `x`, $y_i$ is an element of the vector `y`, and $\bar{x}$
   and $\bar{y}$ are the means of the vectors `x` and `y`, which can be computed with the `mean`
   function; the summation ($\sum$) in the formula is required to be implemented with loop
   statements.

2. Use the `print` function to display the result, and compare it with what `cor(x, y)` returns.

<AnswerBlock title="Exercise 8 · Reference answer" :code="code0708" />

::: tip Breaking the formula into three accumulators
The formula looks intimidating, but it is really just **three sums**:

| Accumulator | What is accumulated | In the formula it is |
| --- | --- | --- |
| `csum` | $(x_k-\bar{x})(y_k-\bar{y})$ | the numerator |
| `xsum` | $(x_k-\bar{x})^2$ | the first $\sum$ in the denominator |
| `ysum` | $(y_k-\bar{y})^2$ | the second $\sum$ in the denominator |

All three are accumulated together in the loop, and at the end `pho = csum / sqrt(xsum * ysum)`.

Once you have run it you will find that the value the loop computes (the answer calls it `pho`;
it is really the Pearson correlation coefficient) agrees with the result of `cor(x, y)` — which is
exactly the job R's built-in function does for you.
:::

## Exercise 9: The Euclidean algorithm for the greatest common divisor

Open the script file **test0709.R** and implement the Euclidean algorithm to find the greatest common
divisor of two positive integers.

::: tip Hint on the approach
The core of the Euclidean algorithm (repeated division) is:

> the greatest common divisor of two numbers = the greatest common divisor of the smaller number and
> “the remainder of dividing the two numbers”, continuing until the remainder is 0.

```r
gcd <- function(a, b) {
  while (b != 0) {
    t <- b
    b <- a %% b
    a <- t
  }
  return(a)
}
```

> `资料/答案/第七周答案` does not include `test0709.R`; only a hint on the approach is given here, and
> it does not count as a reference answer.
:::

## Exercise 10: Bubble sort

Open the script file **test0710.R** and use the bubble algorithm to sort the vector `x`.

The algorithm as described in the original exercise:

- `x = c(5, 6, 3, 4, 1, 2)`, sorted from small to large; the process of sorting is like lining up by
  height in a PE class.
- Pass 1: compare the 6th with the 5th, move the smaller one to position 5, then compare it with the
  4th… the smallest one (the number 1) bubbles up to position 1.
- Passes 2 to 5: repeat the process above on the numbers that are left.
- At the end only 1 number is left, so there is nothing more to compare.

The original exercise's summary and pseudocode:

```text
n <- length of x
k <- from 1 to (n-1)
    j <- from n down to (k+1)
        if(x[j]<x[j-1]){swap x[j] and x[j-1]}
    next j
next k
output x
```

::: tip Hint on the approach: two nested loops
- The **outer** loop `k` controls “which pass it is”, and `n - 1` passes are needed in all.
- The **inner** loop `j` scans from the end backwards, pushing the smaller values forward; after one
  pass the smallest one has “bubbled” up to position `k`.

```r
bubble <- function(x) {
  n <- length(x)
  for (k in 1:(n - 1)) {
    for (j in n:(k + 1)) {
      if (x[j] < x[j - 1]) {
        # swap: in R you can go through a temporary variable, and you can also do it in one line
        x[c(j, j - 1)] <- x[c(j - 1, j)]
      }
    }
  }
  return(x)
}
```

> `资料/答案/第七周答案` does not include `test0710.R`; only a hint on the approach is given here, and
> it does not count as a reference answer.
:::

## Summary

| Topic | Commonly used forms |
| --- | --- |
| single / two-way branch | `if (condition) {...}`, `if (condition) {...} else {...}` |
| multi-way branch | `if ... else if ... else`, `switch(value, option1, option2, ...)` |
| vectorized branch | `ifelse(condition vector, value1, value2)` (can be nested) |
| for loop | `for (i in vector) {...}` |
| while loop | `while (condition) {...}` |
| repeat loop | `repeat {...; if (condition) break}` |
| flow control | `next` (skip this iteration), `break` (jump out of the loop) |
| logical operators | `&&` / `\|\|` (a single test), `&` / `\|` (vectorized) |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第七周原题`, and the answers from `资料/答案/第七周答案` (only
the typos in them have been corrected). `资料/答案/第七周答案` contains the scripts for Exercises
1–8; Exercises 9 and 10 are thinking questions for after class, and there are no answer scripts for
them yet.
:::
