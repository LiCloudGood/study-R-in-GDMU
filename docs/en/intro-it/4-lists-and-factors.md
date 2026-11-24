---
layout: doc
title: '4. Lists and Factors'
---

<script setup>
const code0401 = `my.list1 <- list(
  vector = 1:5,
  scalar = 6.78,
  matrix = matrix(rpois(12, 20), nrow = 3, ncol = 4),
  data_frame = data.frame(
    Name = c("Alice", "Bob", "Charlie", "David", "Eve"),
    Age = c(23, 27, 22, 31, 29)
  )
)

print(my.list1)

vector_slice <- my.list1[c(1, 3, 4)]
print(vector_slice)

my.list1$scalar
my.list1[[3]]

bob_row <- my.list1$data_frame[my.list1$data_frame$Name == "Bob", ]

print(bob_row)`

const code0402 = `my.list2 <- list(
  vector = 1:5,
  scalar = 6.78,
  matrix = matrix(rpois(12, 20), nrow = 3, ncol = 4),
  data_frame = data.frame(Name = c("Alice", "Bob", "Charlie", "David", "Eve"), Age = c(23, 27, 22, 31, 29))
)
my.list2$char = "New Element"
my.list2

my.list2$matrix <- NULL
my.list2

my.list2$vector[length(my.list2$vector)] = 6
my.list2

names(my.list2$vector)[1] <- "First"
lapply(my.list2,length)
sapply(my.list2,length)`

const code0403 = `df <- data.frame(
  patientID = 1:4,
  age = c(25,34,28,52),
  diabetes = c('Type1','Type2','Type1','Type1'),
  status = c('Poor','Improved','Excellent','Poor'),
  stringsAsFactors = TRUE
)

str(df)

df_status <- factor(df$status,levels = c('Poor','Improved','Excellent'),ordered = T)
str(df_status)

values <- c("low", "medium", "high", "medium", "low", "high")
ord_factor <- factor(values,levels = c("low","medium","high"),ordered = T)
str(ord_factor)`

const code0404 = `head(iris)
iris_split <- split(iris,iris$Species)
print(iris_split)

lapply(iris_split,nrow)
str(iris)
tapply(iris$Sepal.Length,list(iris$Species),mean)
tapply(iris$Petal.Length,list(iris$Species),mean)`

const code0405 = `by(iris$Petal.Length,iris$Species,mean)
by(iris$Sepal.Length,iris$Species,mean)
tapply(iris$Petal.Length,list(iris$Species),median)
tapply(iris$Sepal.Length,list(iris$Species),median)
aggregate(iris[,-5],list(iris[[5]]),mean)`

const code0406 = `set.seed(123)
ages <- sample(18:65, 100, replace = TRUE)
income_levels <- sample(c("Low", "Medium", "High"), 100, replace = TRUE)
data <- data.frame(age = ages, income.level = income_levels)

age.group = cut(data$age,
                c(18,35,55,70),
                labels = c("Young", "Middle", "Old"))
table(age.group)
table(list(age.group,data$income.level))`
</script>

# Lists and Factors

::: info Translation status
Translated from the [Chinese original](/intro-it/4-lists-and-factors). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

## Objectives

- Master the creation and manipulation of lists.
- Master the definition of factor variables.
- Master the R functions related to factors.

## Exercise 1: Creating a list and slicing it

Create the script file **test0401.R** and carry out the operations below.

1. Use the `list()` function to create a list `my.list1` containing the following elements:
   - a vector: containing 5 integers, from 1 to 5;
   - a scalar: assigned the value 6.78;
   - a matrix: 3 rows by 4 columns, filled with data produced by `rpois(12, 20)`;
   - a data frame: containing 2 columns, with column names `Name` and `Age`, the data of `Name` being
     `"Alice", "Bob", "Charlie", "David", "Eve"` and the data of `Age` being 23, 27, 22, 31, 29.
2. Use the `[ ]` operator to slice the list, take the 1st, 3rd, and 4th sub-objects of `my.list1`, and
   assign them to a new variable `vector_slice`.
3. Use the `$` and `[[ ]]` operators to refer to the scalar part and the matrix part of the list in
   `my.list1` respectively.
4. Extract the rows of the data frame sub-object in `my.list1` whose `Name` is `Bob`.

<AnswerBlock title="Exercise 1 · Reference answer" :code="code0401" />

::: tip The "three layers of peeling" of a list — the point most likely to be tested
A list is the most "casual" container in R: every slot can hold something of a different type. There are
three levels of taking content out:

| Syntax | What you get | Result type |
| --- | --- | --- |
| `my.list1[1]` | the **small list** holding the 1st slot | list |
| `my.list1[[1]]` | the thing **inside** the 1st slot | the original type (vector, etc.) |
| `my.list1$scalar` | the same, taken by name | the original type |

So `my.list1[c(1, 3, 4)]` still gives a list (just with a few slots missing), whereas `my.list1[[3]]`
is that matrix itself. **To keep computing with it, you must use `[[` or `$`.**
:::

## Exercise 2: Adding, deleting, and modifying list elements, and iterating over a list

Create the script file **test0402.R** and carry out the operations below.

1. Use the `list()` function to create the list shown in Exercise 1, and assign it to `my.list2`.
2. Add a sub-object `char` to the list `my.list2`, with the value `"New Element"`.
3. Delete the sub-object `matrix` from the list `my.list2`.
4. Modify the last element of the `vector` vector in the list `my.list2`, changing it to 6.
5. Rename the first element of the `vector` vector in the list `my.list2`, changing it to `"First"`.
6. Use the `lapply()` function to compute the lengths of all the sub-objects in the list `my.list2`.
7. Use the `sapply()` function to compute the lengths of all the sub-objects in the list `my.list2`.

<AnswerBlock title="Exercise 2 · Reference answer" :code="code0402" />

::: tip lapply and sapply differ by one word: "simplify"
- `lapply(x, FUN)` — **l**ist apply, and what comes back is **always a list**.
- `sapply(x, FUN)` — **s**implify apply, which tries to "simplify" before returning: when every result
  has length 1, they are pressed directly into a **vector**, which reads more cleanly.

In the exercise, `lapply` prints **as a list, one block at a time** (`[1] 5` under `$vector`, `[1] 1`
under `$scalar`, and so on), so to use it as a vector you still have to call `unlist()` yourself;
`sapply`, by contrast, hands you the named vector `vector scalar data_frame char` with nothing left
to unpack, and you can see at a glance how long each element is.

One more thing: **deleting** an element from a list is done by assigning `NULL`
(`my.list2$matrix <- NULL`), which is not the same as deleting from a vector with a negative index.
:::

## Exercise 3: Defining factor variables and operating on them

Create the script file **test0403.R** and carry out the operations below.

1. Use the `data.frame` function to define a data frame `df` with the data shown below, and use the
   argument `stringsAsFactors` to make the two variables `diabetes` and `status` factor variables; then
   use `str` to inspect the structure of `df`.

   | patientID | age | diabetes | status |
   | --- | --- | --- | --- |
   | 1 | 25 | Type1 | Poor |
   | 2 | 34 | Type2 | Improved |
   | 3 | 28 | Type1 | Excellent |
   | 4 | 52 | Type1 | Poor |

2. Use the `factor` function to convert the `status` column of the data frame `df` into an ordered
   factor variable, and use the `str` function to observe the structure of `status`.
3. Use the `factor` function to create an ordered factor variable `ord_factor`, whose values are
   `"low", "medium", "high", "medium", "low", "high"`; the order of the factor is `"low"`, `"medium"`,
   `"high"`.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code0403" />

::: tip What a factor actually is
A factor is essentially a **"labeled integer vector"**: underneath it stores 1, 2, 3 …, and a layer of
`levels` labels is pasted on top. That saves memory, and it also lets R know which categories are
"legal".

```r
factor(c("low", "high", "low"), levels = c("low", "medium", "high"))
# [1] low  high low     ← Levels: low medium high
```

- If you do not write `levels`, R sorts them automatically in **alphabetical order**, which is why the
  order of the categories often does not match what you want.
- Adding `ordered = TRUE` turns it into an **ordered factor**, and only then can magnitudes be compared
  (`"low" < "high"` is `TRUE`), and only then does the statistical software know which test to use.
- `stringsAsFactors = TRUE` is a formal argument of `data.frame()` (before R 4.0 the default was `TRUE`),
  and it converts character columns into factors automatically.
:::

## Exercise 4: Grouped summaries with split, lapply, and tapply

Create the script file **test0404.R** and carry out the operations below. The operations below use the
iris data set, which contains four attributes of 150 irises (`Sepal.Length`, `Sepal.Width`,
`Petal.Length`, `Petal.Width`) and one classification variable `Species`.

1. Use the `split` function to group the data set by `Species`.
2. Compute the amount of data in each group.
3. Compute the mean length of the sepal and of the petal in each group.

<AnswerBlock title="Exercise 4 · Reference answer" :code="code0404" />

::: tip The universal pattern for grouped summaries: split first, then lapply
```r
iris_split <- split(iris, iris$Species)   # big table → a list of three small tables
lapply(iris_split, nrow)                  # do the same operation to each small table
```

`split()` always returns a **list**, so the next step is almost always `lapply()` / `sapply()`.
`iris` is a data set that comes with R; there is no need for `read.csv`, and writing `iris` directly
works.
:::

## Exercise 5: The three grouping functions tapply, by, and aggregate

Create the script file **test0405.R** and carry out the operations below.

1. Use the `by` function to group the `iris` data set by `Species` and compute the mean lengths of the
   sepal and the petal.
2. Use the `tapply` function to summarize the `iris` data set in groups by `Species`, computing the
   median widths of the sepal and the petal.
3. Use the `aggregate` function to summarize the `iris` data set by group, computing the mean length and
   the mean width of the sepal and the petal.

<AnswerBlock title="Exercise 5 · Reference answer" :code="code0405" />

::: tip How to choose among the three functions
| Function | Input | Output | Where it fits |
| --- | --- | --- | --- |
| `tapply(vector, group, FUN)` | **one vector** | array/vector | summarizing one column only; the lightest |
| `by(data frame or vector, group, FUN)` | a whole data frame is fine | a `by` object (like a list) | when several columns are to be computed at once |
| `aggregate(data frame, group, FUN)` | a data frame | a **data frame** | when the result is to be used further / output as a table |

In `aggregate(iris[, -5], list(iris[[5]]), mean)`, `iris[, -5]` means "drop the 5th column (Species)"
and hand the remaining 4 numeric columns to `mean` together, so the means of all 4 attributes come out
in one go.
:::

## Exercise 6: Binning with cut and counting frequencies with table

Open the script file **test0406.R** and carry out the operations below.

1. Use the `cut` function to divide the `age` variable into three age bands (`"Young"`, `"Middle"`,
   `"Old"`), with corresponding age intervals (18, 35], (35, 55], (55, 70], and assign them to the
   variable `age.group`.
2. Use the `table` function to count how often each `age.group` band occurs in the data set `data`.
3. Count the frequency of each income level within each age band.

<AnswerBlock title="Exercise 6 · Reference answer" :code="code0406" />

::: tip The intervals of cut are "left-open, right-closed"
`cut(x, breaks, labels)` splits according to `breaks`:

```r
cut(data$age, c(18, 35, 55, 70), labels = c("Young", "Middle", "Old"))
```

- The intervals look like **(18, 35], (35, 55], (55, 70]**: the left endpoint is not included and the
  right endpoint is, so `age = 35` falls into `"Young"`, while `age = 18` is judged `NA`.
- `breaks` can also be given as `breaks = 3` to let R bin the data into equal widths itself, but then
  the labels are hard to control.
- Passing **one** vector to `table()` gives a one-dimensional frequency table; passing `list(a, b)`
  gives a **two-dimensional cross-table**, essentially the prototype of a contingency table.
:::

## Summary

| Topic | Common functions / operators |
| --- | --- |
| Creating a list | `list(name = value, ...)` |
| Taking a sub-object | `lst[i]` (returns a list), `lst[[i]]` / `lst$name` (return the content) |
| Add / delete / modify | `lst$new <- value`, `lst$old <- NULL`, `lst$vec[i] <- value` |
| Iterating over a list | `lapply()` (returns a list), `sapply()` (simplified to a vector where possible) |
| Creating a factor | `factor(x, levels =, ordered =)`, `data.frame(..., stringsAsFactors =)` |
| Inspecting structure | `str()`, `levels()`, `nlevels()` |
| Grouping | `split()`, `tapply()`, `by()`, `aggregate()` |
| Binning / frequency | `cut(x, breaks, labels)`, `table()` |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第四周原题`, and the answers from `资料/答案/第四周答案`.
:::

::: tip Want the statistics behind it?
This lecture covers **how factors and contingency tables are built in R**; for the difference between
rates, proportions, and ratios, and for the standardization of rates, see the corresponding summary in
*Health Statistics*.

See **[Chapter 5 of *Health Statistics*, Describing Qualitative Data](/en/Health-statistics/05-describing-qualitative-data)**.
:::
