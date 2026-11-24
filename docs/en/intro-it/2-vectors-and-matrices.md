---
layout: doc
title: '2. Vectors and Matrices'
---

<script setup>
const code0201 = `vector1 <- 1:10
vector2 <- c("apple", "banana", "cherry")
vector3 <- rep(1:5, times = 2)
vector4 <- seq(from = 10, to = 50, by = 10)

print(vector1)
print(vector2)
print(vector3)
print(vector4)

print(length(vector1))
print(length(vector2))

print(vector1[3:7])

print(c(vector1, vector2))

print(rep(c(-5, 3, 7), times = c(3, 4, 2)))

print(seq(from = 1, to = 10, by = 2))`

const code0202 = `numbers <- c(1, 10, 3, 7, 2, 8)

print(numbers[3:5])

print(mean(numbers))

print(sum(numbers))

print(sort(numbers, decreasing = TRUE))

squares <- numbers^2
print(squares)

print(numbers^5 %% c(3, 7, -13, 17, -5, 11))`

const code0203 = `vect <- c(10, 20, 30, 40, 50)

vect <- c(vect, 60, 70)

vect <- append(vect, c(100, 200))

vect <- vect[-c(3, 7)]

vect[3] <- 300

names(vect) <- c("a", "b", "c", "d", "e", "f", "g")
print("Named vect:")
print(vect)

x <- seq(from = 5, by = 3, length.out = 100)
x[seq(2, length(x), by = 2)] <- rep(c(-10, -20), length.out = length(x) / 2)
print("Updated x:")
print(x)`

const code0204 = `numbers <- c(2, 4, 5, 2, 2, 3)

print(which.max(numbers))

print(which(numbers == 2 | numbers > 4))

print("Selected elements from x:")
print(x[seq(3, 300, by = 3)])`

const code0205 = `mat1 <- matrix(1:12, nrow = 4, ncol = 3, byrow = TRUE)

mat2 <- matrix(c(1, 2, 3), nrow = 3, ncol = 3)

mat3 <- matrix(1:3, nrow = 3, ncol = 3, byrow = F)
rownames(mat3) <- c("r1", "r2", "r3")
colnames(mat3) <- c("c1", "c2", "c3")

mat4 <- matrix(c(1, 2), nrow = 2, ncol = 4, byrow = T)
mat5 <- diag(3:5)`

const code0206 = `set.seed(1)
x = rpois(12, 30)
mat = matrix(x, nrow = 4)
mat

rownames(mat) <- c("Row 1", "Row 2", "Row 3", "Row 4")
colnames(mat) <- c("Col 1", "Col 2", "Col 3")

mat["Row 2", "Col 3"] <- -15
y <- mat[-3, ]
mat[c("Row 1", "Row 3"), ] <- c(-10, -20)
mat[, c("Col 1", "Col 2")] <- c(-100, -200)`

const code0207 = `set.seed(100)
x = matrix(rpois(9, 10), nrow = 3)
set.seed(200)
y = matrix(rpois(12, 10), nrow = 3)
z = matrix(1:3, nrow = 3)
w = c(3, 7, 1)
u = matrix(1:9, nrow = 3)

print(x + u)
print(x + y)

print(x * w)
print(x * z)

print(x %*% y)
print(y %*% x)
print(x %*% w)

print(diag(x))

print(t(y))

print(det(x))

print(eigen(x)$values)

print(eigen(y))`

const code0208 = `x = matrix(1:30, nrow = 5)

nrow(x)
ncol(x)
dim(x)
rowSums(x)
colMeans(x)
apply(x, 1, var)
sum(x^2)`

const code0209 = `A = c(3, 4, 5)
B = c(-3, 2, 4)
C = c(5, -3, 4)
AB <- sqrt((-3 - 3)^2 + (2 - 4)^2 + (4 - 5)^2)
BC <- sqrt((5 - (-3))^2 + (-3 - 2)^2 + (4 - 4)^2)
CA <- sqrt((3 - 5)^2 + (4 - (-3))^2 + (5 - 4)^2)
cos_A <- (AB^2 + CA^2 - BC^2) / (2 * AB * CA)
cos_B <- (AB^2 + BC^2 - CA^2) / (2 * AB * BC)

x = c(9, 8, 10, 7, 12, 11, 12, 6, 10, 3, 11, 13, 7, 10, 9)
sum_of_products <- sum(combn(x, 2, FUN = prod))`
</script>

# Vectors and Matrices

::: info Translation status
Translated from the [Chinese original](/intro-it/2-vectors-and-matrices). Numbers, formulas, and R
code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

## Objectives

- Learn how to create vectors.
- Learn how to manipulate vectors and compute with them.
- Learn how to create matrices.
- Learn how to manipulate matrices and compute with them.

## Exercise 1: Creating vectors

Create vectors with the colon operator and the `c`, `rep`, and `seq` functions. Create the script file **test0201.R** and carry out the following operations.

1. Use the colon operator to create a vector containing 1 to 10, and assign it to `vector1`.
2. Use the `c` function to create a vector containing `"apple"`, `"banana"`, `"cherry"`, and assign it to `vector2`.
3. Use the `rep` function to create a vector containing the values 1 to 5 repeated twice, and assign it to `vector3`.
4. Use the `seq` function to create a vector from 10 to 50 with a step of 10, and assign it to `vector4`.
5. Print all the vectors you have created.
6. Compute the lengths of `vector1` and `vector2`, and print the results.
7. Use the colon operator to select the 3rd to the 7th element of `vector1`, and print the result.
8. Use the `c` function to combine `vector1` and `vector2`, and print the result.
9. Use the `rep` function to repeat the elements of `c(-5, 3, 7)` 3, 4, and 2 times respectively, and print the result.
10. Use the `seq` function to create a vector from 1 to 10 with the step set to 2, and print the result.

<AnswerBlock title="Exercise 1 · Reference answer" :code="code0201" />

::: tip The difference between the three “sequence-generating” functions
- `1:10` — the colon operator; it can only generate an arithmetic sequence with a step of 1.
- `rep(x, times)` — repeat; `times` may be a vector, meaning how many times each element is repeated.
- `seq(from, to, by)` / `seq(from, by, length.out)` — an arithmetic sequence; `by` is the step and `length.out` is the number of elements.
:::

## Exercise 2: Indexing, arithmetic, and sorting of vectors

Use R to carry out indexing, arithmetic, and sorting operations on vectors. Create the script file **test0202.R** and carry out the following operations.

1. Create a vector containing the following numbers: 1, 10, 3, 7, 2, 8. Name it `numbers`.
2. Use indexing to select the 3rd to the 5th element of the `numbers` vector, and print the result.
3. Compute the mean of the `numbers` vector, and print the result.
4. Compute the sum of the `numbers` vector, and print the result.
5. Use the `sort` function to sort the `numbers` vector in decreasing order, and print the sorted result.
6. Create a new vector `squares` whose element values are the square of each element of the `numbers` vector, and print the result.
7. Compute the remainder when `numbers` raised to the 5th power is divided by the vector `c(3, 7, -13, 17, -5, 11)`, and print the result.

<AnswerBlock title="Exercise 2 · Reference answer" :code="code0202" />

::: tip Vectorized arithmetic in R
Question 7 needs no loop: in `numbers^5 %% c(...)` the two vectors have the same length, so R computes them automatically “position by position”, and this is called **vectorization**.
:::

## Exercise 3: Adding, removing, updating, and naming vector elements

Learn how to add, remove, update, and name vector elements. Create the script file **test0203.R** and carry out the following operations.

1. Create a numeric vector named `vect` containing 5 elements: 10, 20, 30, 40, 50.
2. Use the square-bracket operator to add two new elements, 60 and 70, at the end of the `vect` vector.
3. Use the `append` function to add two new elements, 100 and 200, at the end of the `vect` vector.
4. Remove the 3rd and the 7th element of the `vect` vector.
5. Update the 3rd element of the `vect` vector to 300.
6. Name the elements of the `vect` vector `"a"`, `"b"`, `"c"`, `"d"`, `"e"`, `"f"`, `"g"` respectively, and print the result.
7. Create a vector `x` of length 100, formed by an arithmetic sequence with first term 5 and step 3, then update the elements at even positions of `x` with the vector `c(-10, -20)`, and print the result.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code0203" />

::: warning A negative index excludes rather than counts backwards
`vect[-c(3, 7)]` means **deleting** the 3rd and 7th elements; R's indexing does not support negative subscripts meaning “counting from the end”.
:::

## Exercise 4: Filtering vectors by condition

Learn how to filter vectors by condition. Create the script file **test0204.R** and carry out the following operations.

1. Create a numeric vector named `numbers` containing the following elements: 2, 4, 5, 2, 2, 3.
2. Find the position of the largest element.
3. Extract the positions of all elements of the `numbers` vector that are equal to 2 and that are greater than 4.
4. Use `x = rpois(300, 100)` to create a vector `x` of length 300, then select elements number 3, 6, …, 300, and print the selected result.

<AnswerBlock title="Exercise 4 · Reference answer" :code="code0204" />

::: warning The answer is missing the step that generates `x`
Question 4 in `资料/原题` (original exercises) asks you to generate `x` first, but the answer script uses `x` directly. To make the code above run, execute the following first:

```r
set.seed(1)
x <- rpois(300, 100)
```
:::

## Exercise 5: Creating matrices with the matrix and diag functions

Create the script file **test0205.R** and carry out the following operations.

1. Use the `matrix` function to create a matrix with 4 rows and 3 columns, with elements from 1 to 12, arranged by row.
2. Create a matrix of the following form.

$$\begin{bmatrix} 1 & 2 & 3 \\ 1 & 2 & 3 \\ 1 & 2 & 3 \end{bmatrix}$$

3. Create a matrix of the following form, with row names `"r1"`, `"r2"`, `"r3"` and column names `"c1"`, `"c2"`, `"c3"`.

$$\begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 3 & 3 & 3 \end{bmatrix}$$

4. Create a matrix of the following form.

$$\begin{bmatrix} 1 & 2 & 1 & 2 \\ 1 & 2 & 1 & 2 \end{bmatrix}$$

5. Use `diag` to create the following matrix (first look up how the `diag` function is used in the help documentation).

$$\begin{bmatrix} 3 & 0 & 0 \\ 0 & 4 & 0 \\ 0 & 0 & 5 \end{bmatrix}$$

<AnswerBlock title="Exercise 5 · Reference answer" :code="code0205" />

::: tip Mind the `byrow` argument
`matrix(data, nrow, ncol)` **fills by column by default** (`byrow = FALSE`). Every row of the matrix given in Question 2 is `1 2 3`, so it has to be written as `matrix(c(1, 2, 3), nrow = 3, ncol = 3, byrow = TRUE)`.
:::

## Exercise 6: Basic matrix operations

Open the script file **test0206.R**, fill in the code, and implement the following operations.

1. Name the rows and columns of the matrix `mat`: the row names are “Row 1”, “Row 2”, “Row 3”, “Row 4”, and the column names are “Col 1”, “Col 2”, “Col 3”.
2. Change the value of the element in row 2, column 3 of the matrix `mat` to -15.
3. Assign the submatrix of the matrix `mat` excluding row 3 to the variable `y`.
4. Change the element values of row 1 of the matrix `mat` to -10 and those of row 3 to -20, using only one statement.
5. Change the element values of column 1 of the matrix `mat` to -100 and those of column 2 to -200, using only one statement.

<AnswerBlock title="Exercise 6 · Reference answer" :code="code0206" />

::: tip Matrix indexing works just like vector indexing
`mat[row, column]`: the subscripts may be numbers or row/column names; leaving one blank means “all rows” or “all columns”, so for example `mat[-3, ]` means “all columns with row 3 removed”.
:::

## Exercise 7: Arithmetic and algebraic product operations on matrices

Open the script file **test0207.R**, fill in the code, and implement the following operations.

1. Compute the sum of the matrix `x` and the matrix `u`.
2. Compute the sum of the matrix `x` and the matrix `y`, and observe the returned result.
3. Compute the product of the matrix `x` and the vector `w`.
4. Compute the product of the matrix `x` and the matrix `z`, and observe the returned result.
5. Compute the algebraic product of the matrix `x` and the matrix `y`.
6. Compute the algebraic product of the matrix `y` and the matrix `x`, and observe the returned result.
7. Compute the algebraic product of the matrix `x` and the matrix `z`.
8. Compute the algebraic product of the matrix `x` and the vector `w`.
9. Extract the elements on the diagonal of the matrix `x`.
10. Transpose the matrix `y`.
11. Compute the value of the determinant of the matrix `x`.
12. Find the eigenvalues of the matrix `x`.
13. Use the `eigen` function to compute the eigenvalues and eigenvectors of the matrix `y`, and observe the returned result.

<AnswerBlock title="Exercise 7 · Reference answer" :code="code0207" />

::: tip Do not mix up these three operators
| Syntax | Meaning | Requirement |
| --- | --- | --- |
| `x * y` | **algebraic product** (multiplying corresponding elements) | the two matrices must have the same shape |
| `x %*% y` | **matrix multiplication** | the number of columns of `x` = the number of rows of `y` |
| `x + y` | adding corresponding elements | the two matrices must have the same shape |

So `x + y` in Question 2 raises an error — the two matrices have different numbers of rows and columns.
:::

## Exercise 8: Matrix-related functions

These include `dim`, `apply`, `ncol`, `nrow`, `colSums`, `rowSums`, `colMeans`, `rowMeans`. Open the script file **test0208.R**, fill in the code, and complete the following tasks.

1. Compute the number of rows and columns of the matrix.
2. Compute the dimensions of the matrix `x`.
3. Compute the sum of each row of the matrix `x`.
4. Compute the mean of each column of the matrix `x`.
5. Use the `apply` function to compute the variance of each row of the matrix `x`.
6. Compute the sum of squares of all elements of the matrix `x`.

<AnswerBlock title="Exercise 8 · Reference answer" :code="code0208" />

::: tip The second argument of `apply`
In `apply(x, MARGIN, FUN)`, `MARGIN = 1` means computing **by row** and `MARGIN = 2` means computing **by column**.
:::

## Exercise 9: Comprehensive problems

Create the script file **test0209.R**, fill in the code, and complete the following tasks.

1. The vertex coordinates of the spatial triangle ABC are A(3, 4, 5), B(-3, 2, 4), and C(5, -3, 4). Compute the lengths of the three sides of the triangle and the cosines of the three angles.
2. For the vector $x = c(9, 8, 10, 7, 12, 11, 12, 6, 10, 3, 11, 13, 7, 10, 9)$, compute the sum of the products of every pair of elements in $x$.

    For example, if $x = c(x_1, x_2, x_3)$, the sum of the products of every pair is $x_1x_2 + x_1x_3 + x_2x_3$.

<AnswerBlock title="Exercise 9 · Reference answer" :code="code0209" />

::: tip The law of cosines and `combn`
- For the three side lengths use the distance formula between two points, $AB=\sqrt{(x_1-x_2)^2+(y_1-y_2)^2+(z_1-z_2)^2}$, and then combine it with the law of cosines $\cos A=\dfrac{AB^2+AC^2-BC^2}{2\,AB\cdot AC}$ to find the angles.
- In Question 2, `combn(x, 2, FUN = prod)` lists every “pairwise combination” and multiplies it, and then `sum()` adds them up — one line does the job.
:::

## Summary

| Topic | Common functions / operators |
| --- | --- |
| Creating vectors | `:`, `c()`, `rep()`, `seq()` |
| Vector arithmetic | `length()`, `mean()`, `sum()`, `sort()`, `which()`, `which.max()` |
| Adding, removing, updating, and looking up | `append()`, `x[i]`, `x[-i]`, `names()` |
| Creating matrices | `matrix(..., byrow =)`, `diag()` |
| Matrix attributes | `dim()`, `nrow()`, `ncol()`, `rownames()`, `colnames()` |
| Matrix arithmetic | `+`, `*`, `%*%`, `t()`, `det()`, `eigen()`, `diag()` |
| Matrix statistics | `rowSums()`, `colSums()`, `rowMeans()`, `colMeans()`, `apply()` |

::: info About the exercises and answers on this page
The questions come from `资料/原题/第二周原题` (the Week 2 original exercises) and the answers from `资料/答案/第二周答案` (the Week 2 answer scripts); only the typos in them have been corrected.
:::
