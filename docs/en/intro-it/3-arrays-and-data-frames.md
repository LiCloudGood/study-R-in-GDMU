---
layout: doc
title: '3. Arrays and Data Frames'
---

<script setup>
const scoresCsv = `No,studentID,courseID,score
1,12001,1,75.8
2,12003,2,80
3,12003,1,79
4,12004,3,90
5,12005,3,68
6,12005,1,50
7,12005,2,79
8,12006,4,59
9,12007,2,67
10,12007,1,66
11,12005,4,97
12,12001,2,99
13,12011,1,90
14,12009,1,89
15,12009,2,79
16,12009,3,56
`

const code0301 = `arr <- array(1:24, dim = c(2, 3, 4))

x <- arr[2, 2, 3]

filtered_elements <- arr[arr > 10]
mean_val <- mean(filtered_elements)
sd_val <- sd(filtered_elements)
median_val <- median(filtered_elements)

for (i in 1:3) {
  print(paste("Dimension", i, "statistics:"))
  print(apply(arr, i, min))
  print(apply(arr, i, max))
  print(apply(arr, i, mean))
  print(apply(arr, i, sd))
  print(apply(arr, i, median))
}`

const out0301 = `[1] "Dimension 1 statistics:"
[1] 1 2
[1] 23 24
[1] 12 13
[1] 7.211103 7.211103
[1] 12 13
[1] "Dimension 2 statistics:"
[1] 1 3 5
[1] 20 22 24
[1] 10.5 12.5 14.5
[1] 7.191265 7.191265 7.191265
[1] 10.5 12.5 14.5
[1] "Dimension 3 statistics:"
[1]  1  7 13 19
[1]  6 12 18 24
[1]  3.5  9.5 15.5 21.5
[1] 1.870829 1.870829 1.870829 1.870829
[1]  3.5  9.5 15.5 21.5`

const code0302 = `df <- data.frame(
  name = c("Zhang Fei", "Li Jing", "Wang Jian", "Zhao She", "Sun Ce"),
  age = c(23, 21, 19, 25, 22),
  is.student = c(TRUE, FALSE, TRUE, FALSE, TRUE)
)

single.data <- df[1, 2]
single.row <- df[3, ]
single.column <- df[, "is.student"]

print(single.data)
print(single.row)
print(single.column)

part.data <- df[1:3, 1:2]

age.column <- df$age
sd(age.column)

column1 <- df[[1]]
column2 <- df[[2]]
column3 <- df[[3]]`

const code0303 = `df <- data.frame(
  Name = c("John", "Jane", "Jack", "Jill", "Jim"),
  Age = c(25, 31, 35, 28, 40),
  Gender = c("Male", "Female", "Male", "Female", "Male"),
  Is_Student = c(TRUE, FALSE, TRUE, FALSE, TRUE),
  row.names = c("row1", "row2", "row3", "row4", "row5")
)

df$Age[3] <- 31
df$Name <- NULL

df <- rbind(df, c(34, "Female", TRUE))
rownames(df)[nrow(df)] <- "row6"

new_rows <- data.frame(
  Age = c(29, 26),
  Gender = c("Female", "Male"),
  Is_Student = c(FALSE, TRUE)
)
df <- rbind(df, new_rows)
rownames(df)[(nrow(df) - 1):nrow(df)] <- c("row7", "row8")

df <- df[-3, ]

result <- subset(df, Age > 30 & Gender == "Female", select = -Gender)

result <- df[df$Is_Student, c("Age", "Gender")]`

const code0304 = `df1 <- data.frame(
  ID = c(1, 2, 3),
  Value1 = c(10, 20, 30)
)

df2 <- data.frame(
  ID = c(1, 4, 3),
  Value2 = c("A", "B", "C")
)

df3 <- data.frame(
  sID = c(1, 4, 3),
  Value2 = c("A", "B", "C")
)

score = read.csv('scores.csv')

rbind(df1, df2)
# Error in match.names(clabs, names(xi)) : names do not match previous names

cbind(df1, df2)

merge(df1, df2, by = "ID", all.x = TRUE)

print(merge(df1, df2, by = "ID", all.y = TRUE))

print(merge(df1, df2, by = "ID", all = TRUE))

print(merge(df1, df2, by = "ID", all = FALSE))

merge(df1, df3, by.x = "ID", by.y = "sID")

install.packages("reshape2")
library(reshape2)
score_long <- melt(score, id.vars = "ID", value.name = "score")`

const code0305 = `library(ISwR)
sc <- read.csv('scores.csv')

data(ewrates)
data(hellung)
summary(ewrates)
summary(hellung)

odd.score <- sc[seq(1, nrow(sc), by = 2), ]

data(bp.obese)
male_records <- bp.obese[bp.obese$sex == 0, ]

high_bp_records <- bp.obese[bp.obese$sex == 1 & bp.obese$bp >= 140, ]

mean1 <- mean(sc$score[sc$courseID == 1])
mean2 <- mean(sc$score[sc$courseID == 2])`
</script>

# Arrays and Data Frames

::: info Translation status
Translated from the [Chinese original](/intro-it/3-arrays-and-data-frames). Numbers, formulas, and R
code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

## Objectives

- Master the operations for creating arrays and data frames.
- Master how to filter arrays and data frames and extract elements from them.
- Master the basic operations on data frames.

## Exercise 1: Three-dimensional array operations and statistical analysis

Create a new script file **test0301.R** and write code in the script to do the following.

1. Use the `array` function to define a 3-dimensional array in which the first dimension has length 2, the second has length 3, and the third has length 4, with the array elements being `1:24`.
2. Use indexing to extract one element into the variable `x`; in that element the first dimension is 2, the second is 2, and the third is 3.
3. Filter out all elements of the array greater than 10, and compute the mean, standard deviation, and median of those elements.
4. Compute the values of the statistics for the array along each dimension separately, including the minimum, maximum, mean, standard deviation, and median.

<AnswerBlock title="Exercise 1 · Reference answer" :code="code0301"
  :output="out0301" />

::: tip An array is “a vector with dimensions”
`array(1:24, dim = c(2, 3, 4))` is really just packing 1–24 into a 2×3×4 grid in **column-major** order.
Extracting an element is written `arr[dim 1, dim 2, dim 3]`; give only one index and it collapses into a vector.

The `MARGIN` of `apply(arr, MARGIN, FUN)` is “which dimension to slice by”:

| Form | Meaning |
| --- | --- |
| `apply(arr, 1, sum)` | compute the statistic for every slice along dimension 1 |
| `apply(arr, 2, sum)` | along dimension 2 |
| `apply(arr, 3, sum)` | along dimension 3 |
:::

## Exercise 2: Creating a data frame and extracting elements

Create a new script file **test0302.R** and write code in the script to do the following.

1. Use the `data.frame` function to create a data frame with 5 rows and 3 columns. The first column is `name`: `"Zhang Fei", "Li Jing", "Wang Jian", "Zhao She", "Sun Ce"`; the second column is `age`: 23, 21, 19, 25, 22; the third column is `is.student`: `TRUE, FALSE, TRUE, FALSE, TRUE`.
2. Use the bracket operator `[]` to extract the element in the first row and second column, the elements in all columns of the third row, and the logical variable in the data frame, saving them into the variables `single.data`, `single.row`, and `single.column`, then print them with the `print` function.
3. Take the data made up of rows one through three and columns one and two, and save it into the variable `part.data`.
4. Use the `$` operator to extract the `age` column into the variable `age.column`, then compute its standard deviation.
5. Use the `[[]]` operator to extract each column of the data frame by its column number, saving them into the variables `column1`, `column2`, and `column3`.

<AnswerBlock title="Exercise 2 · Reference answer" :code="code0302" />

::: tip Three ways to take a column, and the types they give back are not the same
| Form | What you get | Type |
| --- | --- | --- |
| `df$age` | the `age` column | **vector** |
| `df[[2]]` | column 2 | **vector** |
| `df["age"]` or `df[2]` | a sub-data-frame holding only the `age` column | **data frame** |
| `df[1, 2]` | the **single value** in row 1, column 2 | scalar/vector |
| `df[3, ]` | row 3 (leaving it blank means all columns) | data frame |

The rule of thumb to remember: **`[[` and `$` drill down one level** and strip off the data frame's shell; a single `[` keeps the data frame's structure.
:::

## Exercise 3: Adding, deleting, updating, and querying in a data frame

Create a new script file **test0303.R** and write code in the script to do the following (note: please do not use the `fix` or `edit` functions).

1. Use the `data.frame` function to create a data frame with 5 rows and 4 columns, where the column names are `Name`, `Age`, `Gender`, and `Is_Student`, and the row names are `row1`, `row2`, `row3`, `row4`, and `row5`; the first column is `"John", "Jane", "Jack", "Jill", "Jim"`; the second column is 25, 31, 35, 28, 40; the third column is `"Male", "Female", "Male", "Female", "Male"`; the fourth column is `TRUE, FALSE, TRUE, FALSE, TRUE`.
2. Change the value of the third element of the column named `"Age"` in the data frame to 31.
3. Delete the column named `"Name"` from the data frame.
4. Append one record to the end of the data frame with the data 34, `"Female"`, TRUE, and name it `row6`.
5. Use one statement to add two new rows of data to the end of the data frame, namely 29, `"Female"`, FALSE and 26, `"Male"`, TRUE; then use one statement to name these two rows `row7` and `row8`.
6. Delete the third row of the data frame.
7. Use the `subset` function to filter the data frame for records whose age is greater than 30 and who are female; the filtered result does not include the gender column.
8. Use the `[]` operator to filter the data frame for records where `Is_Student` is `TRUE`, and the filtered result contains only the `Age` and `Gender` columns.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code0303" />

::: warning Two pitfalls when gluing data frames together with `rbind`
1. **The column names must be exactly the same**, otherwise you get `names do not match previous names` (this is exactly the error in Exercise 4, question 1).
2. Question 5 asks you to “add two rows with one statement”, so you have to build a **real data frame** with `data.frame(Age = c(29, 26), ...)` and then `rbind` it; gluing on a bare vector runs into trouble from type coercion (numbers become character).
:::

## Exercise 4: Combining, merging, and reshaping data frames

Open the script file **test0304.R** and do the following.

1. Use the `rbind` function to row-bind `df1` and `df2`, and note why an error occurs.
2. Use the `cbind` function to column-bind `df1` and `df2`.
3. Use the `merge` function to merge `df1` and `df2` by the `"ID"` value, setting the arguments `all.x` to `TRUE`, `all.y` to `TRUE`, `all` to `TRUE`, and `all` to `FALSE` respectively, and note that the returned results differ.
4. Use the `merge` function to merge `df1` and `df3` by `"ID"` and `"sID"`.
5. Load the `reshape2` package and use the `melt` function to reshape the `score` variable of the `score` data frame into variable–value format.

<AnswerBlock
  title="Exercise 4 · Reference answer"
  description="The original exercise's scores.csv has already been placed in the runtime environment, so read.csv('scores.csv') can read it directly."
  :code="code0304"
/>

::: tip What `all.x` / `all.y` / `all` actually control
`merge` is an **inner join** by default (it keeps only the rows that match on both sides). R expresses the outer joins with three arguments:

| Argument | Equivalent to SQL | Which rows are kept |
| --- | --- | --- |
| `all.x = TRUE` | `LEFT JOIN` | all of the left table + the rows that match in the right |
| `all.y = TRUE` | `RIGHT JOIN` | all of the right table + the rows that match in the left |
| `all = TRUE` | `FULL JOIN` | everything from both sides, with `NA` filled in where there is no match |
| neither (that is, `all = FALSE`) | `INNER JOIN` | only the rows that match |
:::

## Exercise 5: Comprehensive practice

Open the script file **test0305.R** and do the following.

1. Use `summary` to display the statistical summaries of `ewrates` and `hellung` (a data frame about cell growth in *Tetrahymena*).
2. Extract the odd-numbered rows of the data frame `sc` and assign them to `odd.score`.
3. Use a logical approach to extract the records in the data frame `bp.obese` (obesity and blood pressure data) where `sex` is 0 (male).
4. Use a logical approach to extract the records in `bp.obese` where `sex` is 1 and `bp` (systolic blood pressure) is greater than or equal to 140.
5. Compute the mean of `score` separately for `courseID` 1 and 2 in the data frame `sc`, and assign them to the variables `mean1` and `mean2`.

<AnswerBlock
  title="Exercise 5 · Reference answer"
  description="This exercise needs the ISwR package, and it also uses the scores.csv generated earlier on this page."
  :code="code0305"
/>

::: tip Logical indexing: R's most common way to filter
```r
bp.obese[bp.obese$sex == 0, ]                     # keep every row whose condition is TRUE
bp.obese[bp.obese$sex == 1 & bp.obese$bp >= 140, ] # join several conditions with &
```

What goes inside the brackets is a string of `TRUE`/`FALSE`, and R takes out only the rows at the positions that correspond to `TRUE`.
The equivalent form is `subset(bp.obese, sex == 0)`, but `subset` has pitfalls when used inside a function, so the form above is what is recommended more in real work.
:::

## Summary

| Topic | Common functions / operators |
| --- | --- |
| Creating an array | `array(data, dim =)` |
| Array operations | `arr[i, j, k]`, `arr[condition]`, `apply(arr, MARGIN, FUN)` |
| Creating a data frame | `data.frame()`, `read.csv()` |
| Extracting elements / columns | `df[i, j]`, `df$name`, `df[["name"]]`, `df[, "name"]` |
| Filtering | `df[logical condition, ]`, `subset()`, `which()` |
| Adding, deleting, updating | `rbind()`, `cbind()`, `df$col <- NULL`, `df$col[i] <- value` |
| Inspecting structure | `str()`, `summary()`, `nrow()`, `ncol()`, `names()`, `rownames()` |
| Merging / reshaping | `merge(by =, all.x =)`, `reshape2::melt()` |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第三周原题`, and the answers come from `资料/答案/第三周答案` (only typos in them have been corrected).
The `scores.csv` used in Exercises 4 and 5 is likewise taken from `资料/原题/第三周原题`.
:::

::: tip Want the statistics behind it?
This lecture is about **how to work with data frames**; for when the mean, median, standard deviation, interquartile range, and coefficient of variation each apply, see the corresponding summary in *Health Statistics*.

See **[Chapter 4 of *Health Statistics*, Describing Quantitative Data](/en/Health-statistics/04-describing-quantitative-data)**.
:::
