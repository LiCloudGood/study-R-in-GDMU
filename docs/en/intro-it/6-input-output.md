---
layout: doc
title: '6. Input and Output'
---

<script setup>
// The data file from the original exercise; embedding it lets the R environment in the web page read it too
const data41 = `    No  studentID  courseID  score
     1      12001         1     75.8
     2      12003         2     80.0
     3      12003         1     79.0
     4      12004         3     90.0
     5      12005         3     68.0
     6      12005         1     50.0
     7      12005         2     79.0
     8      12006         4     59.0
     9      12007         2     67.0
    10      12007         1     66.0
    11      12005         4     97.0
    12      12001         2     99.0
    13      12011         1     90.0
    14      12009         1     89.0
    15      12009         2     79.0
    16      12009         3     56.0
`

const code0601 = `# (1)
mat <- matrix(c(5, 3, 9, 10, 8, 15, 2, 9, 13, 17, 7, 9), nrow = 3, ncol = 4)  # define a 3x4 matrix
str <- c("cough", "headache", "low fever")
num <- 178

# (2)
save.image("save-all.txt")
dir()

# (3)
save(mat, str, file = "save-part.txt")
dir()

# (4)
rm(list = ls())

# (5)
ls()
num / 100

# (6)
load("save-all.txt")
num / 100  `

const code0602 = `#(1)
scan() ->x
sum(x)
mean(x)

#(2)
price <- as.integer(readline(prompt = 'Enter the price:'))
num <- as.integer(readline(prompt = "Enter the quantity:"))
total <- price*num
current_time <- format(Sys.time(), "%Y-%m-%d %H:%M:%S")
cat("\\n----------------------------\\n")
cat("The amount you owe is:",total,'\\n')
cat("Payment time:",current_time)
cat("\\n----------------------------\\n")`
</script>

# Input and Output

::: info Translation status
Translated from the [Chinese original](/intro-it/6-input-output). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

## Objectives

- Read keyboard input with the `scan` function, the `readline` function, and the `readLines` function.
- Read text files with the `scan` function, the `read.table` function, and the `read.csv` function.
- Save structured data with the `write.table` function and the `write.csv` function.
- Use the `print` function and the `cat` function.
- Save and load environment data.

## Exercise 1: Saving and loading environment data

Create the script file **test0601.R** and carry out the following operations.

1. Define the matrix `mat` as

   $$\begin{bmatrix} 5 & 10 & 2 & 17 \\ 3 & 8 & 9 & 7 \\ 9 & 15 & 13 & 9 \end{bmatrix}$$

   Define the character variable `str` as `c("cough", "headache", "low fever")`, and define the numeric variable `num` as 178.

2. Use `save.image` to save all the variables, with the file name `save-all.txt`, and use `dir` to see whether that file is in the current working directory.
3. Use `save` to save `mat` and `str`, with the file name `save-part.txt`, and use `dir` to see whether that file is in the current working directory.
4. Use the `rm` function to delete all the variables.
5. Use `ls` to look at the objects in the current environment — are any variable names still listed? Compute `num` divided by 100: what error appears?
6. Load the data from the file `save-all.txt` and compute `num` divided by 100 — does the error still appear?

<AnswerBlock
  title="Exercise 1 · Reference answer"
  description="The matrix in the answer is matrix(c(5, 3, 9, 10, 8, 15, 2, 9, 13, 17, 7, 9), nrow = 3, ncol = 4); filled by column, it is exactly the matrix above."
  :code="code0601"
/>

::: tip What is saved is the “workspace”, not a “data file”
| Function | What it saves | Reading it back |
| --- | --- | --- |
| `save.image(file)` | **all** current variables | `load(file)` |
| `save(a, b, file =)` | the few variables you name | `load(file)` |
| `rm(list = ls())` | empties the workspace | — |

Question 5 reports `object 'num' not found` precisely because `rm` deleted `num` from **memory**;
in question 6, `load("save-all.txt")` restored it from **disk**, so the calculation works again.

Note that what `save.image` writes out is R's own binary format, which only R can read — quite a
different thing from the `write.csv` taught in Exercise 7 below (plain text for Excel to read).
:::

## Exercise 2: Entering data interactively from the command window

Create the script file **test0602.R** and carry out the following operations.

1. Use the `scan` function to read the vector `{7, 13, 10, 9}` from the command window, assign it to the variable `x`, and then compute the sum and the mean of that vector.
2. Use the `readline` function to read in the price 2319, with the prompt “Enter the price:”; use the `readline` function to read in the quantity 12, with the prompt “Enter the quantity:”; finally compute the total amount, in this output format:

   ```text
   -----------------------------
   The amount you owe is: ???
   Payment time: ***
   -----------------------------
   ```

   Here `???` is the computed result and `***` is the current system date and time.
3. Use the `readLines` function to enter two strings from the command window, namely “R Programming” and “Python Programming”.

<AnswerBlock
  title="Exercise 2 · Reference answer"
  description="Note: the scan() and readline() of this exercise read input from the command line in real time, so you can only practice them interactively in RStudio on your own machine — paste the code in and run it, then type the responses at the prompt in the console."
  :code="code0602"
/>

::: warning How the output of readline differs from that of print / cat
- What `readline(prompt = "...")` reads in is a **character string**; to do arithmetic with it you must first convert it with `as.integer()` / `as.numeric()`.
- `cat()` does **not break the line** automatically when it prints, so the answer has to write `\n` itself.
- `cat()` also **returns no value**, so the last line cannot be `y <- cat(...)`.
:::

::: info The reference answers in this lecture cover only up to Exercise 2
The directory `资料/答案/第六周答案` holds only the two scripts `test0601.R` and `test0602.R`;
Exercises 3 to 7 have no answer files, so below we give only the exercises and hints on the key
functions, left as they are and not supplemented.
:::

## Exercise 3: Screen output and redirection

Create the script file **test0603.R** and carry out the following operations.

1. The string vector `poem` contains four strings:

   ```r
   "The moon of Qin, the pass of Han,"
   "The ten-thousand-li march, no one has returned."
   "If only the Flying General of Longcheng still lived,"
   "No nomad horse would cross the Yin Mountains."
   ```

   Define the variable `poem` with an assignment statement.

2. Use the `cat` function to print them in the format shown in the original exercise.
3. Use the `sink` function to redirect that output to the file `sink.file.txt`.

::: tip Key function: sink
```r
sink("sink.file.txt")   # from here on, all output is written into the file
cat(poem, sep = "\n")
sink()                  # switch the redirection off; output goes back to the screen
```

`sink()` with no arguments means “cancel the redirection”. If you forget to switch it off, all the
output that follows quietly goes into the file — the pitfall beginners trip over most often.
:::

## Exercise 4: The file, seek, readLines, and close functions

Create the script file **test0604.R** and carry out the following operations.

1. Use the `readLines` function to read all the data in the file `data4.1.txt` into the variable `dat41` in one go, and then judge whether `dat41` is a vector.
2. Use the `print` function to display the data in `dat41`, then choose a suitable function to delete the first 4 spaces in each string, and display the result after deletion.
3. Use `readLines` to read lines 5 to 8 of `data4.2.txt` and assign them to `row.5.8`; then read lines 13 to 16 into `row.13.16`.
4. Use `close` to close the file handle.

> Note: the length of one Chinese character is 3, and the length of a carriage return plus line feed is 2.

::: tip Key functions: file / readLines / close
```r
con <- file("data4.2.txt", "r")     # open the connection
readLines(con, n = 1)               # first read a few lines to move the cursor to the target position
row.5.8 <- readLines(con, n = 4)    # then read 4 lines
close(con)                          # always close it when you are done
```

Every line `readLines` reads is a **character string**, and the leading spaces are part of the
content, so “deleting the first 4 spaces” needs `sub("^ {4}", "", dat41)` or `trimws(dat41)`.

`seek(con, where)` can jump straight to a given **character** position, which is exactly why the
exercise notes that “a Chinese character counts as 3, and a carriage return plus line feed as 2”.
:::

## Exercise 5: The scan function

Create the script file **test0605.R** and carry out the following operations.

1. Use the `scan` function to read the data in the file `data5.txt` into the variable `x`.
2. Using the data in `x`, compute the mean of the fourth column of the original file.
3. Using the data in `x` and following the format of the original file, create a data frame `y`, and name its columns `{No, studentID, courseID, score}`.
4. Using the data in `y` and the `tapply` function, compute the mean and the variance grouped by course number.

::: tip Key functions: scan + matrix to rebuild the table
`scan("data5.txt")` **flattens all the numbers in the file into one long vector** (read in
column-major order). To rebuild the table, just pair it with `matrix()`:

```r
x <- scan("data5.txt", quiet = TRUE)
y <- as.data.frame(matrix(x, ncol = 4, byrow = TRUE))
names(y) <- c("No", "studentID", "courseID", "score")
tapply(y$score, y$courseID, mean)
tapply(y$score, y$courseID, var)
```

`tapply(value, group, function)` is the grouped-summary form you learned in Lecture 4.
:::

## Exercise 6: The read.table function and the read.csv function

Create the script file **test0606.R** and use the `read.table` function or the `read.csv` function to carry out the following operations.

1. Read the file `data6.1.csv` into the data frame `x`, and define the variables `diabetes` and `status` as ordered factor variables（有序因子）, with the order of the factor levels defined in the default way.
2. Read the file `data6.2.txt` into the data frame `y`, name each column of `y`, the names being `{serialNo, studentID, subjectID, score}`, define subjectID as an ordered factor variable, with the order defined as 4 < 3 < 2 < 1.
3. Read the file `data6.3.txt` into the data frame `z`, and compute the mean of `score` grouped by `courseID`.
4. Read the file `data6.4.txt` into the data frame `w`, and name the column variables `{year, month, day}`.

::: tip The difference between read.csv and read.table
| Function | Default separator | Default header |
| --- | --- | --- |
| `read.csv()` | **comma** | yes (`header = TRUE`) |
| `read.table()` | space / tab | **no** (`header = FALSE`) |

So:
- For the comma-separated `data6.1.csv`, just use `read.csv()`.
- For the space- or tab-separated `data6.2.txt` / `data6.3.txt` / `data6.4.txt`, use `read.table()`,
  and **you have to judge for yourself whether there is a header**: if the first line of the file is
  data, write `header = FALSE`, and then supply the column names with `names(y) <- c(...)`.

Ordered factors still use the form from Lecture 4:
```r
factor(y$subjectID, levels = c(4, 3, 2, 1), ordered = TRUE)
```
:::

## Exercise 7: The write.table function and the write.csv function

Create the script file **test0607.R** and carry out the following operations.

1. Use the data `1:12` to create a matrix `x` with 3 rows and 4 columns, with the data arranged by row.
2. Use `write.table` to write the data in `x` to the file `write.matrix.txt`, with row names `{row1, row2, row3}`, column names `{col1, col2, col3, col4}`, and the separator a slash `/`.
3. Use `write.csv` to write the data in the `iris` data set to the file `write.iris.txt`, with row names `{row1, row2, …, row??}`, where `??` is the total number of rows of `iris` (choose a suitable function to compute the total number of rows).
4. Use `write.csv` to write the `cars` data to the file `write.cars.txt`.

::: tip Key functions: write.table / write.csv
```r
x <- matrix(1:12, nrow = 3, ncol = 4, byrow = TRUE)
rownames(x) <- c("row1", "row2", "row3")
colnames(x) <- c("col1", "col2", "col3", "col4")
write.table(x, "write.matrix.txt", sep = "/")

n <- nrow(iris)
rownames(iris) <- paste0("row", 1:n)
write.csv(iris, "write.iris.txt")
write.csv(cars, "write.cars.txt")
```

Two arguments are worth remembering:

- `sep = "/"` specifies what separates one column from the next.
- `quote = FALSE` keeps character data from being quoted (the default adds quotes), so add it when
  you want cleaner output.

`write.csv` is in fact a wrapper around `write.table(..., sep = ",", ...)`.
:::

## Summary

| Topic | Commonly used functions |
| --- | --- |
| Keyboard input | `scan()`, `readline(prompt =)`, `readLines()` |
| Reading text files | `read.table()` (space/tab), `read.csv()` (comma) |
| Reading a file line by line | `file()` to open a connection + `readLines(con, n =)` + `close(con)` |
| Writing files | `write.table(sep =)`, `write.csv()` |
| Screen output | `print()`, `cat()`, `sink()` redirection |
| Saving and loading the workspace | `save()`, `save.image()`, `load()`, `rm(list = ls())`, `ls()` |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第六周原题`, and the answers from `资料/答案/第六周答案` (only
typos in them were corrected). `资料/答案/第六周答案` contains only `test0601.R` and `test0602.R`;
Exercises 3–7 have no answer scripts yet, and this page gives only the exercises and hints on the
key functions.
:::
