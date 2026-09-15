---
layout: doc
title: '8. User-Defined Functions'
---

<script setup>
const code0801 = `count_even <- function(x){
  if (missing(x)){
    stop('No vector was supplied to test!')
  }
  if (!is.vector(x)){
    stop('The input data object is not a vector!')
  }
  if (!is.numeric(x)){
    warning('The input data are not numeric!')
    return(0)
  }
  count <- 0
  for (i in x){
    if (i%%2==0){
      count <- count + 1
    }
  }
  return(count)
}

# Run the code below and see whether the result meets the requirement
x = round(runif(20,1,100),digits = 0)
print(x)
y = 20
z = c(FALSE, TRUE, FALSE, TRUE, TRUE)
w = matrix(1:12,nrow = 3)

count_even(x)
count_even()
count_even(y)
count_even(z)`

const code0802 = `'%xor%' <- function(x,y){
  if (!(x %in% c(0, 1)) || !(y %in% c(0, 1))){
    return(NA)
  }
  if(x == 1 && y == 1){
    return(0)
  } else if (x ==0 &&y ==0){
    return(0)
  }else{
    return(1)
  }
}

# Run the test program below
0%xor%0
0%xor%1
1%xor%0
1%xor%1
2%xor%0
1%xor%3`

const code0803 = `matrix_compute <- function(x,flag = 3){
  squared_mat <- x^2
  if (flag == 1){
    return(rowSums(squared_mat))
  }else if(flag == 2){
    return(colSums(squared_mat))
  }else if(flag == 3){
    return(sum(squared_mat))
  }else{
    return(NA)
  }
}

# Run the test code below and check whether the results are correct
set.seed(1)
x = floor(runif(12,1,10))
x = matrix(x,nrow = 3)
print(x)
matrix_compute(x, flag = 1)
matrix_compute(x, flag = 2)
matrix_compute(x, flag = 3)
matrix_compute(x, flag = 4)
matrix_compute(x)`

const code0804 = `stat_compute <- function(fun, ...) {
  allowed_funs <- c("sum", "median", "mean", "var")
  fun <- match.arg(fun, allowed_funs)
  args <- list(...)
  if (length(args) == 0) {
    stop("No data were supplied for the computation!")
  }
  data <- unlist(args)
  result <- switch(fun,
                   sum = sum(data),
                   median = median(data),
                   mean = mean(data),
                   var = var(data))

  return(result)
}

# Run the test code below and check whether the results are correct
x = c(3, 9, 4, 7, 2)
stat_compute('sum', 3, 9, 4, 7, 2)
sum(x)
stat_compute('median', 3, 9, 4, 7, 2)
median(x)
stat_compute('mean', 3, 9, 4, 7, 2)
mean(x)
stat_compute('var', 3, 9, 4, 7, 2)
var(x)`

const code0805 = `myfuture <- function(P,r=2.7,y,t){
  if (missing(y)){
    stop("The number of years of the deposit was not supplied")
  }
  if (missing(t)){
    t <- 12
    warning("The parameter has been set to 12")
  }
  future_value <- ((1 + (r / 100 / t))^(t * y)) * P
  return(future_value)
}

# Run the test code below
myfuture(10000,y = 5)
myfuture(10000,r = 2.4)
myfuture(10000, r = 2.5, y = 10, t = 12)
# The Excel formula used to verify the result is given below
# =FV(0.025/12, 120, 0,10000,0)`

const code0806 = `myvar <- function(x){
  x_hat <- mean(x)
  total = 0
  for (i in x) {
    total <- total +(i - x_hat)^2
  }
  result <- total / (length(x)-1)
  return(result)
}

# Run the test code below and check the result
x = rnorm(20,0,2)
myvar(x)
var(x)`

const code0807 = `bin2dec <- function(sbin){
  if (grepl('[^01]',sbin)){
    stop('The input contains characters other than 0 and 1')
  }
  decimal_value <- as.integer(strtoi(sbin, base = 2))
  return(decimal_value)
}

# Run the code below and check the result of the program
bin2dec("1021") # error
bin2dec("1001") # 9
bin2dec("101011") # 43`

const code0808 = `dec2bin <- function(x){
  binary_string <- ''
  while (x>0) {
    remainder <- x%%2
    binary_string <- paste0(remainder,binary_string)
    x <- x %/% 2
  }
  return(binary_string)
}

# Run the code below to verify the results
dec2bin(14) # 1110
dec2bin(123) # 1111011
dec2bin(2203) # 100010011011`

const code0809 = `mysum <- function(x){
  if(x==0){
    return(0)
  }else{
    return(x +mysum(x-1))
  }
}

# test
mysum(100)`

const out0809 = `[1] 5050`

const code0810 = `myrecur <- function(x, n) {
  x_str <- as.character(x)
  if (n == 1) {
    return(as.numeric(substr(x_str, nchar(x_str), nchar(x_str))))
  } else {
    return(myrecur(x %/% 10, n - 1))
  }
}

# test
myrecur(3627854,3) #8
myrecur(3627854,6) #6`

const code0811 = `mygcd <- function(a,b){
  r <- a%%b
  a <- b
  b <- r
  if (r == 0){
    return(a)
  }else{
    return(mygcd(a,b))
  }
}

# test
mygcd(24,32)
mygcd(32,24)`
</script>

# User-Defined Functions

::: info Translation status
Translated from the [Chinese original](/intro-it/8-custom-functions). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

::: info Instructor's suggestion
Please complete Exercises 7–11 after class.
:::

## Objectives

- Master how to define an R function.
- Master how to define an R operator.
- Master simple applications of user-defined functions and operators.
- Master how to define a recursive function.

## Exercise 1: User-defined functions and argument checking

Open the script file **test0801.R** and carry out the following operations.

1. Create the user-defined function `count_even`, whose input argument is an integer vector and whose
   output is the number of even numbers in the vector.
2. First check the argument, covering:
   - whether the argument is missing; if it is missing, terminate the call and give the error message
     "No vector was supplied to test!"
   - check the data object: if it is not a vector, terminate the call and give the error message
     "The input data object is not a vector!"
   - check the data type: if the data are not numeric, return 0 and give the warning message
     "The input data are not numeric!"
3. The computation is required to be implemented with a loop statement.
4. Run the test code after the script and see whether the results are correct.

<AnswerBlock title="Exercise 1 · Reference answer" :code="code0801" />

::: tip The three parts of a function: define, check, return
```r
function_name <- function(arg, arg = default) {
  argument checks...
  computation...
  return(result)
}
```

There are three common tools for checking arguments:

| Tool | What it does | What it returns when the check passes |
| --- | --- | --- |
| `missing(x)` | whether this argument was passed at the call | `TRUE` means **not passed** |
| `is.vector(x)` | whether it is a vector | a logical value |
| `is.numeric(x)` | whether it is numeric | a logical value |

**The difference between `stop()` and `warning()` matters a great deal**:

- `stop("...")` — reports an **error and terminates**; the code after it is not executed.
- `warning("...")` — only **gives a warning**; the code keeps running.

So requirement 2, "return 0 and give a warning", has to be written as `warning(...)` followed by
`return(0)` (written as `stop`, it can never return 0).
:::

## Exercise 2: User-defined operators

Open the script file **test0802.R** and carry out the following operations.

1. Define the user-defined operator `%xor%`, which computes the exclusive or of 0 and 1, with the
   following rules:

   | Expression | Result |
   | --- | --- |
   | `1 %xor% 1` | 0 |
   | `0 %xor% 0` | 0 |
   | `1 %xor% 0` | 1 |
   | `0 %xor% 1` | 1 |

2. If the input data are not 0 or 1, return `NA`.
3. Run the test code after the script and see whether the results meet the requirement.

<AnswerBlock title="Exercise 2 · Reference answer" :code="code0802" />

::: tip R's operators are just “functions with special names”
In R every operator is essentially a function. The `%...%` form is the syntactic sugar left for
user-defined operators:

```r
'%xor%' <- function(x, y) { ... }
```

Once defined it can be used infix just like `+` and `*`: `1 %xor% 0`.

To test "is it 0 or 1" the handiest way is `%in%`: `x %in% c(0, 1)`, negated with `!(...)`; both
arguments have to be checked, so they are joined with `||`.
:::

## Exercise 3: Arguments with default values

Open the script file **test0803.R** and carry out the following operations.

1. Write a user-defined function `matrix_compute` whose input arguments are the matrix `mat` and the
   flag argument `flag`. According to the value of `flag`, the matrix is computed by the following
   rules:
   - if `flag = 1`, compute the sum of squares of the elements in each row of `mat`;
   - if `flag = 2`, compute the sum of squares of the elements in each column of `mat`;
   - if `flag = 3`, compute the sum of squares of all the elements of `mat`;
   - if `flag` has any other value, return `NA`.
2. Set the default value of the flag argument `flag` to 3.
3. Run the test code after the script and see whether the results are correct.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code0803" />

::: tip A default value makes an argument optional
```r
matrix_compute <- function(x, flag = 3) { ... }
```

With `= 3` there, the call may leave out `flag`: `matrix_compute(x)`.
(This is also why the instructor asked for the default to be set to 3 — with no argument passed, it
computes the "sum of squares of all the elements".)

`rowSums()` / `colSums()` are the handy helpers from Lecture 3, and together with `x^2` (which
squares every element of the matrix, a vectorized operation) they settle it in one line.
:::

## Exercise 4: The ellipsis argument

Open the script file **test0804.R** and carry out the following operations.

1. The user-defined function `stat_compute` has two input arguments:
   - the first argument `fun` is a string whose value may be set to `'sum'`, `'median'`, `'mean'`, or
     `'var'`, standing for the sum, the median, the mean, and the variance respectively;
   - the second argument is the ellipsis argument.
2. According to the meaning of the first argument, the function computes the sum, median, mean, or
   variance of all the elements represented by the ellipsis argument.
3. Run the test code after the script to verify whether the results are correct.

<AnswerBlock title="Exercise 4 · Reference answer" :code="code0804" />

::: tip The ellipsis `...` is “an indefinite number of arguments”
```r
f <- function(fun, ...) {
  args <- list(...)     # collect what is in ... into one list
  unlist(args)          # then flatten it into a vector
  ...
}
```

A call may pass as many as you like: `stat_compute('mean', 3, 9, 4, 7, 2)`.

`match.arg(fun, allowed)` checks automatically whether `fun` is one of the permitted values, and
reports an error if it is not — far less trouble than writing an `if` test by hand.
Finally `switch` (met in Lecture 7) dispatches by name to the matching statistical function.
:::

## Exercise 5: An application of user-defined functions 1 — compound interest

Open the script file **test0805.R** and carry out the following operations.

1. Define the function `myfuture(P, r, y, t)`, which computes the total of principal and interest on a
   bank deposit, with the formula

   $$F = P\left(1 + \frac{r}{100t}\right)^{ty}$$

   where $F$ is the total of principal and interest, $P$ is the principal, $r$ is the annual interest
   rate (2.7, say, means an annual rate of 2.7%), $t$ is the interest period ($t=12$ means interest is
   compounded once a month), and $y$ is the number of years the money is deposited.

2. The arguments are $P$, $r$, $y$, $t$ respectively, where the default value of $r$ is 2.7; if the
   argument $y$ is missing, terminate the run and give the error message "The number of years of the
   deposit was not supplied"; if the argument $t$ is missing, assign it the value 12 and give the
   warning message "The parameter $t$ has been set to 12".
3. Verify the result with Excel's `FV` function.

<AnswerBlock title="Exercise 5 · Reference answer" :code="code0805" />

::: tip Translating a mathematical formula literally into R
The formula given in the exercise is:

$$F = P\left(1+\frac{r}{100t}\right)^{ty}$$

Translated into R it is:

```r
((1 + (r / 100 / t))^(t * y)) * P
```

Two things to watch when translating:

- `r` is given as a **percentage** (2.7 means 2.7%), so it has to be divided by 100.
- `t` is "how many times a year interest is compounded", so the annual rate is divided by `t` again,
  while the exponent is `t * y` (the total number of periods).

**The order of the argument checks also matters**: check `y` first (if it is missing, `stop` and
terminate), then check `t` (if it is missing, give it the default value 12 and `warning`).
With the order reversed, the warning about `t` would mask the real error.

The `120` in the Excel comparison formula `=FV(0.025/12, 120, 0, 10000, 0)` is exactly
`t * y = 12 × 10`.
:::

## Exercise 6: An application of user-defined functions 2 — computing the variance by hand

Open the script file **test0806.R** and carry out the following operations.

1. Define the function `myvar`, whose input argument is the vector `x` and whose return value is the
   variance of `x`, computed by the formula

   $$\mathrm{var}(x) = \frac{1}{n-1}\sum_{k=1}^{n}(x_k-\bar{x})^{2}$$

   where $n$ is the length of the vector `x` and $x_k$ is the $k$th element of the vector `x`.

2. It is required to be implemented with a loop statement (the `var` function and the `cor` function
   may not be used); $\bar{x}$ may be computed with `mean`.
3. Run the test code after the script to verify whether the result is correct.

<AnswerBlock title="Exercise 6 · Reference answer" :code="code0806" />

::: warning Why divide by n-1 rather than n
The denominator in the formula is **`n - 1`**, which is called the **sample variance** (an unbiased
estimate).

Dividing by `n` would give the "population variance", and the value would come out too small.
R's built-in `var()` also uses `n - 1`, which is why the `myvar(x)` you write yourself agrees with
`var(x)`. Written with `n`, the two results differ — and that is precisely where this exercise is
easiest to get wrong.
:::

## Exercise 7: Converting a binary string to decimal

Open the script file **test0807.R** and carry out the following operations.

1. Define the function `bin2dec(sbin)`, whose job is to convert a binary string into a decimal
   integer, where the input argument `sbin` is a string made up of 0s and 1s and the return value is
   the corresponding integer (for example, an input of `"101011"` gives 43).
2. The argument has to be checked: if it contains a character that is not 0 or 1, stop the run and give
   the error message "The input contains characters other than 0 and 1". Hint: use a regular
   expression and the `grepl` function.
3. The conversion rule is to extract each character of the string and then express it as

   $$\sum_{k=0}^{n-1} x_k \cdot 2^{k}$$

   where $x_k$ is the $k$th character of the string (counting from the right); for example, the decimal
   integer for `"101011"` is

   $$1\times2^{5}+0\times2^{4}+1\times2^{3}+0\times2^{2}+1\times2^{1}+1\times2^{0}=43$$

4. Analysis of the algorithm: suppose the accumulator starts at $s=0$; then

   $$s = (((((2\times1+0)\times2+1)\times2+0)\times2+1)\times2+1 = 43$$

   Each time round the loop $s$ is first multiplied by 2 and then the newly extracted character is
   added (extracting from left to right).

   Hint: use the `substr` or `substring` function to extract characters.

<AnswerBlock title="Exercise 7 · Reference answer" :code="code0807" />

::: tip From “expanding by positional weights” to Horner's method
The two formulas given in the exercise are really the same thing:

| Written as | Meaning | How many power operations are needed |
| --- | --- | --- |
| $\sum x_k 2^k$ | expand by positional weights directly | $2^k$ for every digit |
| $s = s\times2 + x_i$ | accumulate digit by digit from the left | **no power operations at all** |

The second one (Horner's method, the Qin Jiushao algorithm in the Chinese sources) needs only a single
loop and is more efficient. Written out by hand along those lines:

```r
bin2dec <- function(sbin) {
  if (grepl('[^01]', sbin)) stop('The input contains characters other than 0 and 1')
  s <- 0
  for (ch in strsplit(sbin, '')[[1]]) {
    s <- s * 2 + as.integer(ch)
  }
  return(s)
}
```

> The answer script uses R's built-in `strtoi(sbin, base = 2)` to do it in one step.
> The two forms give the same result, but writing the loop by hand as the exercise requires is the
> safer choice in an exam.
>
> Note also the regular expression `grepl('[^01]', sbin)`: `[^01]` means "a character that is **not** 0
> and not 1", and a single one of them appearing anywhere in the string means the input is invalid.
:::

## Exercise 8: Converting decimal to a binary string

Open the script file **test0808.R** and carry out the following operations.

1. Define the function `dec2bin(x)`, where `x` is a positive integer and the return value is the
   binary digit string (a 0-1 string) of `x`; for example `dec2bin(3)` gives `"11"` and `dec2bin(10)`
   gives `"1010"`.
2. The conversion method is "take the remainders, read them from the bottom up". For example, the
   conversion of 13 is:
   - 13 divided by 2 has remainder 1 and quotient 6, giving the first remainder 1;
   - 6 (the quotient from the previous step) divided by 2 has remainder 0 and quotient 3, giving the
     second remainder 0;
   - 3 (the quotient from the previous step) divided by 2 has remainder 1 and quotient 1, giving the
     third remainder 1;
   - 1 (the quotient from the previous step) divided by 2 has remainder 1 and quotient 0, giving the
     fourth remainder 1;
   - the quotient from the previous step is 0, so stop, read the remainders from the bottom up, and the
     output is `"1101"`.

   Hint: use `ceiling(log2(x+1))` to compute the number of binary digits — think about why.

<AnswerBlock title="Exercise 8 · Reference answer" :code="code0808" />

::: tip Why the number of digits is ceiling(log2(x+1))
A $b$-digit binary number ranges from $2^{b-1}$ to $2^{b}-1$.
Turning that around: the minimum number of digits `x` needs is "the smallest integer not less than
$\log_2(x+1)$", that is `ceiling(log2(x + 1))`.

Check it: `x = 7` → `log2(8) = 3` → 3 digits (`111` ✓);
`x = 8` → `log2(9) ≈ 3.17` → rounded up, 4 digits (`1000` ✓).

Note that **the remainder method itself does not need to know the number of digits in advance** — the
`while (x > 0)` in the answer stops naturally once the quotient reaches 0. The digit formula only
helps you preallocate space or decide how many times to loop.
:::

## Exercise 9: A simple recursive function

Open the script file **test0809.R** and carry out the following operations.

1. Define the function `mysum(n)`, where `n` is an integer greater than 1, which returns the value of

   $$1 + 2 + 3 + \cdots + n$$

2. It is required to be done by recursion (without a loop statement).
3. Test with `mysum(100)`: is the result 5050?

<AnswerBlock title="Exercise 9 · Reference answer" :code="code0809"
  :output="out0809" />

::: tip The two requirements of recursion
Every recursive function must have both of these, or it recurses forever until it reports an error:

1. **a base case**: `if (x == 0) return(0)`
2. **a recursion that moves toward the base case**: `return(x + mysum(x - 1))`

The mathematical relation used here is $S(n) = n + S(n-1)$, with $S(0)=0$.

Part 3 checks it: `mysum(100)` should give $5050$, which is also what the arithmetic-series formula
$\frac{100\times101}{2}$ gives.
:::

## Exercise 10: An application of recursion 1 — extracting the nth digit

Open the script file **test0810.R** and carry out the following operations.

Define the function `myrecur(x, n)`, which returns the `n`th digit of `x` (counting from the right),
where the arguments `x` and `n` are positive integers; for example `myrecur(123456, 3)` gives 4,
`myrecur(123456, 6)` gives 1, and `myrecur(123456, 7)` gives 0.

<AnswerBlock title="Exercise 10 · Reference answer" :code="code0810" />

::: tip Peeling off digits, recursively
Each call **peels off the rightmost digit** (`x %/% 10` is integer division by 10) and decreases `n`
by 1 at the same time; when `n == 1` it takes the digit that is rightmost at that moment.

```r
myrecur(3627854, 3)
→ myrecur(362785, 2)
→ myrecur(36278, 1) → returns 8 ✓
```

As for the case where the digit "is not there" (say `n` is larger than the number of digits): once `x`
has been peeled down to 0, `x %/% 10` is still 0, and when `n` finally comes down to 1 it picks up `0`
— so `myrecur(123456, 7)` returning 0 in the exercise is a boundary that works out consistently.
:::

## Exercise 11: An application of recursion 2 — the greatest common divisor

Open the script file **test0811.R** and carry out the following operations.

1. Define the function `mygcd(a, b)`, which uses Euclid's algorithm to compute the greatest common
   divisor of the two integers `a` and `b`.
2. Compare it with Exercise 9 of last week, and explain the advantage of recursion.

<AnswerBlock title="Exercise 11 · Reference answer" :code="code0811" />

::: tip The answer to part 2: recursion vs a loop
Last week (Exercise 9 of Lecture 7), finding the greatest common divisor with a `while` loop needed
**three variables passed back and forth**:

```r
# loop version: a temporary variable t does the swapping
while (b != 0) {
  t <- b
  b <- a %% b
  a <- t
}
```

The recursive version, by contrast, almost **copies** the mathematical definition:

```r
if (r == 0) return(a) else return(mygcd(b, r))
```

**The advantage of recursion**: the intermediate variables that had to be maintained by hand are gone,
the code is shorter and closer to the mathematical definition, and it is harder to get wrong
(especially when handling structures such as trees and linked lists, which are "naturally recursive").

**The cost of recursion**: every call takes up one level of stack space. `mysum(100)` recurses 100
levels deep, and if `n` is very large (tens of thousands, say) the stack overflows; the loop version is
then the safer one.
:::

## Summary

| Topic | Common form |
| --- | --- |
| Defining a function | `name <- function(arg, arg = default) { ...; return(value) }` |
| Argument checking | `missing()`, `is.vector()`, `is.numeric()` |
| Error / warning | `stop()` (aborts), `warning()` (continues) |
| Returning a result | `return(value)` (without it, the value of the last statement is returned) |
| The ellipsis argument | define `function(fun, ...)`; collect with `list(...)` |
| Argument validation | `match.arg()`, `%in%` |
| User-defined operators | `'%name%' <- function(x, y) {...}` |
| Recursion | must have a base case + a recursion moving toward it |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第八周原题`, and the answers from `资料/答案/第八周答案` (only typos
in them were corrected). The formulas in the original exercises are MathType images and are lost when
extracting plain text; this page has restored them in LaTeX from the content of the formula images.
:::
