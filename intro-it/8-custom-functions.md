---
layout: doc
title: 8-自定义函数
---

<script setup>
const code0801 = `count_even <- function(x){
  if (missing(x)){
    stop('没有输入被检测向量！')
  }
  if (!is.vector(x)){
    stop('输入数据对象不是向量！')
  }
  if (!is.numeric(x)){
    warning('输入数据不是数值型数据！')
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

# 运行下面的代码，观察结果是否满足题目要求
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

# 运行下面的测试程序
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

# 运行下面的测试代码，检查运算结果是否正确
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
    stop("没有提供数据进行计算！")
  }
  data <- unlist(args)
  result <- switch(fun,
                   sum = sum(data),
                   median = median(data),
                   mean = mean(data),
                   var = var(data))

  return(result)
}

# 运行下面的测试代码，检查运算结果是否正确
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
    stop("未输入存款的年数")
  }
  if (missing(t)){
    t <- 12
    warning("参数被设置为12")
  }
  future_value <- ((1 + (r / 100 / t))^(t * y)) * P
  return(future_value)
}

# 运行下面的测试代码
myfuture(10000,y = 5)
myfuture(10000,r = 2.4)
myfuture(10000, r = 2.5, y = 10, t = 12)
# Excel的验证公式如下
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

# 运行下面的测试代码，检验结果
x = rnorm(20,0,2)
myvar(x)
var(x)`

const code0807 = `bin2dec <- function(sbin){
  if (grepl('[^01]',sbin)){
    stop('输入包含了非0-1字符串')
  }
  decimal_value <- as.integer(strtoi(sbin, base = 2))
  return(decimal_value)
}

#运行下面代码，检验程序结果
bin2dec("1021") # 错误
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

# 运行下面代码，验证结果
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

# 测试
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

# 测试
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

# 测试
mygcd(24,32)
mygcd(32,24)`
</script>

# 自定义函数

::: info 老师的建议
实验题 7~11 请课后完成。
:::

## 实验目的

- 掌握 R 函数的定义方法。
- 掌握 R 运算符的定义方法。
- 掌握自定义函数与运算符的简单应用。
- 掌握递归函数的定义方法。

## 实验题 1：自定义函数与参数检查

打开脚本文件 **test0801.R**，完成下面操作。

1. 创建自定义函数 `count_even`，函数的输入参数为整数型向量，输出为向量中偶数的数目。
2. 首先需要对参数进行检查，检查内容包括：
   - 是否缺失参数，若缺失，则终止调用，并给出错误信息“没有输入被检测向量！”
   - 检查数据对象，若不是向量，则终止调用，并给出错误信息“输入数据对象不是向量！”
   - 检查数据类型，若不是数值型数据，则返回 0，并给出警告信息“输入数据不是数值型数据！”
3. 要求用循环语句实现计算。
4. 运行脚本程序后面的测试代码，观察结果是否正确。

<AnswerBlock title="实验题 1 · 参考答案" :code="code0801" />

::: tip 函数的三件套：定义、检查、返回
```r
函数名 <- function(参数, 参数 = 默认值) {
  参数检查...
  计算...
  return(结果)
}
```

参数检查有三个常用工具：

| 工具 | 作用 | 检查通过时返回 |
| --- | --- | --- |
| `missing(x)` | 调用时有没有传这个参数 | `TRUE` 表示**没传** |
| `is.vector(x)` | 是不是向量 | 逻辑值 |
| `is.numeric(x)` | 是不是数值型 | 逻辑值 |

**`stop()` 和 `warning()` 的区别很重要**：

- `stop("...")` —— 直接**报错终止**，后面的代码不执行。
- `warning("...")` —— 只是**提示一下**，代码继续往下跑。

所以第 2 条要求「返回 0 并给出警告」，就要写成 `warning(...)` 之后再 `return(0)`
（如果写成 `stop`，就永远返回不了 0 了）。
:::

## 实验题 2：自定义运算符

打开脚本文件 **test0802.R**，完成下面操作。

1. 自定义运算符 `%xor%`，计算 0 与 1 的异或操作，其运算规则如下：

   | 表达式 | 结果 |
   | --- | --- |
   | `1 %xor% 1` | 0 |
   | `0 %xor% 0` | 0 |
   | `1 %xor% 0` | 1 |
   | `0 %xor% 1` | 1 |

2. 若输入数据不是 0 或 1，则返回 `NA`。
3. 运行脚本程序后面的测试代码，观察结果是否满足题目要求。

<AnswerBlock title="实验题 2 · 参考答案" :code="code0802" />

::: tip R 的运算符就是「名字特别的函数」
R 里所有运算符本质上都是函数。`%...%` 这种形式是留给用户自定义运算符的语法糖：

```r
'%xor%' <- function(x, y) { ... }
```

定义好之后就能像 `+`、`*` 一样中缀使用：`1 %xor% 0`。

判断「是不是 0 或 1」用 `%in%` 最方便：`x %in% c(0, 1)`，
再取反 `!(...)`；两个参数都要检查，所以中间用 `||` 连起来。
:::

## 实验题 3：带默认值的参数

打开脚本文件 **test0803.R**，完成下面操作。

1. 编写一个自定义函数 `matrix_compute`，该函数的输入参数为矩阵 `mat` 和标识参数 `flag`。根据 `flag` 值，对矩阵进行计算，计算规则为：
   - 若 `flag = 1`，则计算 `mat` 中每行元素的平方和；
   - 若 `flag = 2`，则计算 `mat` 中每列元素的平方和；
   - 若 `flag = 3`，则计算 `mat` 中所有元素的平方和；
   - 若 `flag` 为其它值，则返回 `NA`。
2. 将标识参数 `flag` 的默认值设置为 3。
3. 运行脚本程序后面的测试代码，观察结果是否正确。

<AnswerBlock title="实验题 3 · 参考答案" :code="code0803" />

::: tip 默认值让参数变成「可选」
```r
matrix_compute <- function(x, flag = 3) { ... }
```

有了 `= 3`，调用时就可以不写 `flag`：`matrix_compute(x)`。
（这也是老师要求把默认值设成 3 的原因——不传参数时按「全部元素平方和」算。）

`rowSums()` / `colSums()` 是第 3 讲学过的好帮手，
配合 `x^2`（矩阵每个元素平方，属于向量化运算）就能一行搞定。
:::

## 实验题 4：省略号参数

打开脚本文件 **test0804.R**，完成下面操作。

1. 自定义函数 `stat_compute`，该函数有两个输入参数：
   - 第一个参数 `fun` 是字符串，其值可设置为 `'sum'`、`'median'`、`'mean'`、`'var'`，分别表示求和、求中位数、求平均值、求方差；
   - 第二个参数为省略号参数。
2. 该函数根据第一个参数的意义，计算省略号参数所代表的全体元素的和、中位数、平均值或方差。
3. 运行脚本程序后面的测试代码，验证结果是否正确。

<AnswerBlock title="实验题 4 · 参考答案" :code="code0804" />

::: tip 省略号 `...` 是「数量不定的参数」
```r
f <- function(fun, ...) {
  args <- list(...)     # 把 ... 里的东西收进一个列表
  unlist(args)          # 再拉平成一个向量
  ...
}
```

调用时可以随便传多少个：`stat_compute('mean', 3, 9, 4, 7, 2)`。

`match.arg(fun, allowed)` 会自动校验 `fun` 是不是允许的取值之一，
不是就报错——这比手写 `if` 判断省事得多。
最后用 `switch`（第 7 讲学过）按名字分派到对应的统计函数。
:::

## 实验题 5：自定义函数的应用 1 —— 复利计算

打开脚本文件 **test0805.R**，完成下面操作。

1. 定义函数 `myfuture(P, r, y, t)`，该函数用于计算银行存款的本利之和，计算公式如下：

   $$F = P\left(1 + \frac{r}{100t}\right)^{ty}$$

   其中 $F$ 是本利之和，$P$ 是本金，$r$ 是年利率（比如说是 2.7，它表示年利率是 2.7%），$t$ 表示计息周期（$t=12$，表示每月计息一次），$y$ 表示存储的年数。

2. 参数分别为 $P$、$r$、$y$、$t$，其中 $r$ 的默认值为 2.7；若缺失参数 $y$，则终止运行，并给出错误信息“未输入存款的年数”；若缺失参数 $t$，则赋值为 12，并给出警告信息“参数 $t$ 被设置为 12”。
3. 用 Excel 的 `FV` 函数验证结果的正确性。

<AnswerBlock title="实验题 5 · 参考答案" :code="code0805" />

::: tip 把数学公式逐字翻译成 R
题目给的公式是：

$$F = P\left(1+\frac{r}{100t}\right)^{ty}$$

翻译成 R 就是：

```r
((1 + (r / 100 / t))^(t * y)) * P
```

翻译时注意两点：

- `r` 给的是**百分数**（2.7 表示 2.7%），所以要除以 100。
- `t` 是「一年计息几次」，所以年利率还要再除以 `t`，而指数是 `t * y`（总期数）。

**参数检查的顺序也有讲究**：先查 `y`（缺了就 `stop` 终止），
再查 `t`（缺了给个默认值 12 并 `warning`）。
顺序反了的话，`t` 的警告会掩盖真正的错误。

Excel 对照公式 `=FV(0.025/12, 120, 0, 10000, 0)` 里的 `120` 正是 `t * y = 12 × 10`。
:::

## 实验题 6：自定义函数的应用 2 —— 手算方差

打开脚本文件 **test0806.R**，完成下面操作。

1. 定义函数 `myvar`，输入参数为向量 `x`，函数的返回值为 `x` 的方差，计算公式为

   $$\mathrm{var}(x) = \frac{1}{n-1}\sum_{k=1}^{n}(x_k-\bar{x})^{2}$$

   其中 $n$ 为向量 `x` 的长度，$x_k$ 为向量 `x` 中的第 $k$ 个元素。

2. 要求用循环语句实现（不能使用 `var` 函数或 `cor` 函数），$\bar{x}$ 可使用 `mean` 计算。
3. 运行脚本程序后面的测试代码，验证结果是否正确。

<AnswerBlock title="实验题 6 · 参考答案" :code="code0806" />

::: warning 为什么除以 n-1 而不是 n
公式里的分母是 **`n - 1`**，这叫**样本方差**（无偏估计）。

如果除以 `n`，算出来的是「总体方差」，数值会偏小。
R 内置的 `var()` 用的也是 `n - 1`，所以自己写的 `myvar(x)` 才能和 `var(x)` 对得上。
要是写成 `n`，两个结果就不一样了——这正是本实验最容易出错的地方。
:::

## 实验题 7：二进制字符串转十进制

打开脚本文件 **test0807.R**，完成下面操作。

1. 定义函数 `bin2dec(sbin)`，其功能是将二进制字符串转换成十进制整数，其中输入参数 `sbin` 是 0 和 1 构成的字符串，返回值为对应的整数（例如输入为 `"101011"`，输出为 43）。
2. 需要对参数进行检查，若包含非 0 与非 1 字符，则停止运行，给出错误信息“输入包含了非 0-1 字符串”。提示：用正则表达式和 `grepl` 函数。
3. 转换规则为提取字符串中每个字符，然后表示为

   $$\sum_{k=0}^{n-1} x_k \cdot 2^{k}$$

   其中 $x_k$ 为字符串中的第 $k$ 个字符（从右向左数），例如 `"101011"` 的十进制整数为

   $$1\times2^{5}+0\times2^{4}+1\times2^{3}+0\times2^{2}+1\times2^{1}+1\times2^{0}=43$$

4. 算法过程分析：假设初始累加器 $s=0$，那么

   $$s = (((((2\times1+0)\times2+1)\times2+0)\times2+1)\times2+1 = 43$$

   每次循环 $s$ 先乘以 2，然后加上新提取的字符（从左向右提取）。

   提示：用 `substr` 或 `substring` 函数提取字符。

<AnswerBlock title="实验题 7 · 参考答案" :code="code0807" />

::: tip 从「按位权展开」到「秦九韶算法」
题目给的两个公式其实是一回事：

| 写法 | 含义 | 需要几次幂运算 |
| --- | --- | --- |
| $\sum x_k 2^k$ | 直接按位权展开 | 每位都要算 $2^k$ |
| $s = s\times2 + x_i$ | 从左到右逐位累加 | **不用幂运算** |

第二种（秦九韶 / Horner 算法）只要一次循环，效率更高。按这个思路手写的版本是：

```r
bin2dec <- function(sbin) {
  if (grepl('[^01]', sbin)) stop('输入包含了非0-1字符串')
  s <- 0
  for (ch in strsplit(sbin, '')[[1]]) {
    s <- s * 2 + as.integer(ch)
  }
  return(s)
}
```

> 答案脚本里用的是 R 自带的 `strtoi(sbin, base = 2)` 一步到位。
> 两种写法结果一样，但考试时按题目要求手写循环更稳妥。
>
> 另外注意 `grepl('[^01]', sbin)` 这个正则：`[^01]` 表示「**不是** 0 也不是 1 的字符」，
> 只要字符串里出现一个，就说明输入不合法。
:::

## 实验题 8：十进制转二进制字符串

打开脚本文件 **test0808.R**，完成下面操作。

1. 定义函数 `dec2bin(x)`，其中 `x` 是正整数，函数的返回值为 `x` 的二进制数字符串（0-1 字符串），例如 `dec2bin(3)` 的结果是 `"11"`，`dec2bin(10)` 的结果是 `"1010"`。
2. 转换方法是“求余数，自下向上”。例如 13 的转换过程为：
   - 13 除以 2 的余数是 1，商是 6，得到第一个余数是 1；
   - 6（上一步的商）除以 2 的余数是 0，商是 3，得到第二个余数是 0；
   - 3（上一步的商）除以 2 的余数是 1，商是 1，得到第三个余数是 1；
   - 1（上一步的商）除以 2 的余数是 1，商是 0，得到第四个余数是 1；
   - 上一步的商是 0，则停止，自下向上取余数，得到输出 `"1101"`。

   提示：用 `ceiling(log2(x+1))` 计算二进制位数，想想为什么？

<AnswerBlock title="实验题 8 · 参考答案" :code="code0808" />

::: tip 为什么位数是 ceiling(log2(x+1))
一个 $b$ 位的二进制数，取值范围是 $2^{b-1}$ 到 $2^{b}-1$。
反过来求：$x$ 需要的最少位数就是「不小于 $\log_2(x+1)$ 的最小整数」，
也就是 `ceiling(log2(x + 1))`。

验证一下：`x = 7` → `log2(8) = 3` → 3 位（`111` ✓）；
`x = 8` → `log2(9) ≈ 3.17` → 向上取整 4 位（`1000` ✓）。

要注意的是，**除余法本身并不需要预先知道位数**——
答案里的 `while (x > 0)` 循环到商为 0 自然就停了。
位数公式只是帮你预先分配空间/判断循环次数用的。
:::

## 实验题 9：简单递归函数

打开脚本文件 **test0809.R**，完成下面操作。

1. 定义函数 `mysum(n)`，其中 `n` 是大于 1 的整数，函数返回

   $$1 + 2 + 3 + \cdots + n$$

   的值。

2. 要求用递归完成（不用循环语句）。
3. 用 `mysum(100)` 测试，其结果是否为 5050。

<AnswerBlock title="实验题 9 · 参考答案" :code="code0809"
  :output="out0809" />

::: tip 递归的两要素
任何递归函数都必须有这两样，缺一就会无限递归直到报错：

1. **终止条件**（base case）：`if (x == 0) return(0)`
2. **向终止条件靠近的递推**：`return(x + mysum(x - 1))`

这里用到的数学关系是 $S(n) = n + S(n-1)$，而 $S(0)=0$。

第 3 小题验证：`mysum(100)` 应得 $5050$，
也就是等差数列求和公式 $\frac{100\times101}{2}$ 的结果。
:::

## 实验题 10：递归函数的应用 1 —— 取第 n 位数字

打开脚本文件 **test0810.R**，完成下面操作。

定义函数 `myrecur(x, n)`，该函数返回 `x` 中第 `n` 个数字（从右向左算），其中参数 `x` 和 `n` 是正整数，例如 `myrecur(123456, 3)` 的结果是 4，`myrecur(123456, 6)` 的结果是 1，`myrecur(123456, 7)` 的结果是 0。

<AnswerBlock title="实验题 10 · 参考答案" :code="code0810" />

::: tip 递归版「剥数」
每次调用把数字**剥掉最右边一位**（`x %/% 10` 就是整除 10），
同时把 `n` 减 1；等 `n == 1` 时就取当前最右边那一位。

```r
myrecur(3627854, 3)
→ myrecur(362785, 2)
→ myrecur(36278, 1) → 返回 8 ✓
```

至于「取不到」的情况（比如 `n` 比位数还大）：当 `x` 被剥到 0 之后，
`x %/% 10` 仍然是 0，最终 `n` 减到 1 时取到 `0`，
所以题目里 `myrecur(123456, 7)` 返回 0 —— 这个边界正好自洽。
:::

## 实验题 11：递归函数的应用 2 —— 最大公约数

打开脚本文件 **test0811.R**，完成下面操作。

1. 定义函数 `mygcd(a, b)`，该函数用欧几里德算法计算两整数 `a` 和 `b` 的最大公约数。
2. 与上周的实验题 9 比较，请说明递归的优势。

<AnswerBlock title="实验题 11 · 参考答案" :code="code0811" />

::: tip 第 2 小题的答案：递归 vs 循环
上周（第 7 讲实验九）用 `while` 循环求最大公约数时，需要**三个变量来回倒**：

```r
# 循环版：要一个临时变量 t 帮忙交换
while (b != 0) {
  t <- b
  b <- a %% b
  a <- t
}
```

而递归版几乎是把数学定义**照抄**下来：

```r
if (r == 0) return(a) else return(mygcd(b, r))
```

**递归的优势**：省掉了手工维护的中间变量，代码更短、更接近数学定义，
写起来不容易出错（尤其是处理树、链表这类「天然递归」的结构时）。

**递归的代价**：每次调用都会占用一层栈空间。`mysum(100)` 要递归 100 层，
如果 `n` 特别大（比如几万）就会爆栈；这时循环版反而更安全。
:::

## 本讲小结

| 主题 | 常用写法 |
| --- | --- |
| 定义函数 | `名 <- function(参数, 参数 = 默认值) { ...; return(值) }` |
| 参数检查 | `missing()`、`is.vector()`、`is.numeric()` |
| 报错 / 警告 | `stop()`（中断）、`warning()`（继续）|
| 结果返回 | `return(值)`（不写则返回最后一句的值）|
| 省略号参数 | 定义 `function(fun, ...)`；用 `list(...)` 收集 |
| 参数校验 | `match.arg()`、`%in%` |
| 自定义运算符 | `'%名%' <- function(x, y) {...}` |
| 递归 | 必须有终止条件 + 向终止条件递推 |

::: info 关于本页的题目与答案
题目来自 `原题/第八周原题`，答案来自 `答案/第八周答案`（仅修正过其中的错别字）。
原题中的公式为 MathType 图片，纯文本提取时会丢失，本页已按公式图内容用 LaTeX 还原。
:::
