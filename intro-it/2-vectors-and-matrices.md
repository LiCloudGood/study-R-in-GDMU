---
layout: doc
title: 2-向量与矩阵
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

rownames(mat) <- c("第1行", "第2行", "第3行", "第4行")
colnames(mat) <- c("第1列", "第2列", "第3列")

mat["第2行", "第3列"] <- -15
y <- mat[-3, ]
mat[c("第1行", "第3行"), ] <- c(-10, -20)
mat[, c("第1列", "第2列")] <- c(-100, -200)`

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

# 向量与矩阵

## 实验目的

- 掌握向量的创建方法。
- 掌握向量的操作与运算。
- 掌握矩阵的创建方法。
- 掌握矩阵的操作与运算。

## 实验一：向量的创建

用冒号运算符、`c` 函数、`rep` 函数和 `seq` 函数创建向量。创建脚本文件 **test0201.R**，完成下面操作。

1. 使用冒号运算符创建一个包含 1 到 10 的向量，并赋值给 `vector1`。
2. 使用 `c` 函数创建一个包含 `"apple"`, `"banana"`, `"cherry"` 的向量，并赋值给 `vector2`。
3. 使用 `rep` 函数创建一个包含数值 1 到 5 重复 2 次的向量，并赋值给 `vector3`。
4. 使用 `seq` 函数创建一个从 10 到 50 以 10 为间隔的向量，并赋值给 `vector4`。
5. 打印出所有创建的向量。
6. 计算 `vector1` 和 `vector2` 的长度，并将结果打印出来。
7. 使用冒号运算符选择 `vector1` 中的第 3 个到第 7 个元素，并将结果打印出来。
8. 使用 `c` 函数将 `vector1` 和 `vector2` 合并，并将结果打印出来。
9. 使用 `rep` 函数将 `c(-5, 3, 7)` 中的元素分别重复 3、4、2 次，并将结果打印出来。
10. 使用 `seq` 函数创建一个从 1 到 10 的向量，其间隔设置为 2，并将结果打印出来。

<AnswerBlock title="实验一 · 参考答案" :code="code0201" />

::: tip 三个「生成序列」函数的区别
- `1:10` —— 冒号运算符，只能生成间隔为 1 的等差数列。
- `rep(x, times)` —— 重复，`times` 可以是向量，表示每个元素各自重复几次。
- `seq(from, to, by)` / `seq(from, by, length.out)` —— 等差数列，`by` 是步长，`length.out` 是元素个数。
:::

## 实验二：向量的索引、运算与排序

使用 R 语言执行向量的索引操作、算术运算和排序操作。创建脚本文件 **test0202.R**，完成下面操作。

1. 创建一个包含以下数字的向量：1, 10, 3, 7, 2, 8。将其命名为 `numbers`。
2. 使用索引操作选择 `numbers` 向量中的第 3 个到第 5 个元素，并将结果打印出来。
3. 计算 `numbers` 向量的平均值，并将结果打印出来。
4. 计算 `numbers` 向量的总和，并将结果打印出来。
5. 使用 `sort` 函数对 `numbers` 向量进行降序排序，并将排序后的结果打印出来。
6. 创建一个新的向量 `squares`，其中元素值为 `numbers` 向量中每个元素的平方，并将结果打印出来。
7. 计算 `numbers` 的 5 次方除以向量 `c(3, 7, -13, 17, -5, 11)` 的余数，并将结果打印出来。

<AnswerBlock title="实验二 · 参考答案" :code="code0202" />

::: tip R 的向量化运算
第 7 题不需要写循环：`numbers^5 %% c(...)` 中两个向量长度相同，R 会自动「按位置一一对应」地计算，这叫做**向量化**。
:::

## 实验三：向量元素的增加、删除、更新与命名

掌握向量元素的增加、删除、更新与命名。新建脚本文件 **test0203.R**，完成下面的操作。

1. 创建一个名为 `vect` 的数值向量，包含 5 个元素：10, 20, 30, 40, 50。
2. 用中括号运算符，在 `vect` 向量的末尾增加两个新元素 60 和 70。
3. 用 `append` 函数，在 `vect` 向量的末尾增加两个新元素 100 和 200。
4. 删除 `vect` 向量中的第 3 个和第 7 个元素。
5. 将 `vect` 向量中的第 3 个元素更新为 300。
6. 把 `vect` 向量中的元素分别用 `"a"`、`"b"`、`"c"`、`"d"`、`"e"`、`"f"`、`"g"` 命名，并把结果打印出来。
7. 创建一个长度为 100 的向量 `x`，其中 `x` 由首项为 5、间隔为 3 的等差序列构成，然后把 `x` 中偶数位置的元素用向量 `c(-10, -20)` 更新，并把结果打印出来。

<AnswerBlock title="实验三 · 参考答案" :code="code0203" />

::: warning 负索引是「排除」而不是「取反」
`vect[-c(3, 7)]` 表示**删掉**第 3、7 个元素；R 的索引不支持下标的负数「从后往前数」。
:::

## 实验四：向量的条件筛选

掌握向量的条件筛选。创建脚本文件 **test0204.R**，完成下面的操作。

1. 创建一个名为 `numbers` 的数值向量，包含以下元素：2, 4, 5, 2, 2, 3。
2. 找出最大元素所在的位置。
3. 提取 `numbers` 向量中所有等于 2 和大于 4 的元素的位置。
4. 用 `x = rpois(300, 100)` 创建长度为 300 的向量 `x`，然后把第 3，6，…，300 号元素筛选出来，并将选择的结果打印出来。

<AnswerBlock title="实验四 · 参考答案" :code="code0204" />

::: warning 答案里少了生成 `x` 的一步
`原题` 中第 4 题要求先生成 `x`，但答案脚本直接使用了 `x`。想让上面的代码跑通，请先执行：

```r
set.seed(1)
x <- rpois(300, 100)
```
:::

## 实验五：用 matrix 和 diag 函数创建矩阵

新建脚本文件 **test0205.R**，完成下面的操作。

1. 使用 `matrix` 函数创建一个 4 行 3 列的矩阵，元素从 1 到 12，要求按行排列。
2. 创建如下形式的矩阵。

$$\begin{bmatrix} 1 & 2 & 3 \\ 1 & 2 & 3 \\ 1 & 2 & 3 \end{bmatrix}$$

3. 创建如下形式的矩阵，且行名称为 `"r1"`, `"r2"`, `"r3"`，列名称为 `"c1"`, `"c2"`, `"c3"`。

$$\begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 3 & 3 & 3 \end{bmatrix}$$

4. 创建如下形式的矩阵。

$$\begin{bmatrix} 1 & 2 & 1 & 2 \\ 1 & 2 & 1 & 2 \end{bmatrix}$$

5. 用 `diag` 创建如下矩阵（先用帮助文档查看 `diag` 函数的用法）。

$$\begin{bmatrix} 3 & 0 & 0 \\ 0 & 4 & 0 \\ 0 & 0 & 5 \end{bmatrix}$$

<AnswerBlock title="实验五 · 参考答案" :code="code0205" />

::: tip 注意 `byrow` 参数
`matrix(data, nrow, ncol)` **默认按列填充**（`byrow = FALSE`）。第 2 题给出的矩阵每一行都是 `1 2 3`，所以要写成 `matrix(c(1, 2, 3), nrow = 3, ncol = 3, byrow = TRUE)`。
:::

## 实验六：矩阵的基本操作

打开脚本文件 **test0206.R**，补充代码，实现以下操作。

1. 给矩阵 `mat` 的行/列命名，行名称分别为“第1行”、“第2行”、“第3行”、“第4行”，列名称分别为“第1列”、“第2列”、“第3列”。
2. 修改矩阵 `mat` 中第 2 行第 3 列的元素值为 -15。
3. 把矩阵 `mat` 除开第 3 行的子矩阵赋值给变量 `y`。
4. 把矩阵 `mat` 第 1 行元素值改为 -10、第 3 行元素值改为 -20，要求只用一条语句。
5. 把矩阵 `mat` 第 1 列元素值改为 -100、第 2 列元素值改为 -200，要求只用一条语句。

<AnswerBlock title="实验六 · 参考答案" :code="code0206" />

::: tip 矩阵索引和向量一样
`mat[行, 列]`，下标既可以用数字，也可以用行名/列名；留空表示「整行」或「整列」，例如 `mat[-3, ]` 就是「去掉第 3 行的全部列」。
:::

## 实验七：矩阵的算术运算和代数积运算

打开脚本文件 **test0207.R**，补充代码，实现以下操作。

1. 计算矩阵 `x` 与矩阵 `u` 的和。
2. 计算矩阵 `x` 与矩阵 `y` 的和，观察返回结果。
3. 计算矩阵 `x` 与向量 `w` 的积。
4. 计算矩阵 `x` 与矩阵 `z` 的积，观察返回结果。
5. 计算矩阵 `x` 与矩阵 `y` 的代数积。
6. 计算矩阵 `y` 与矩阵 `x` 的代数积，观察返回结果。
7. 计算矩阵 `x` 与矩阵 `z` 的代数积。
8. 计算矩阵 `x` 与向量 `w` 的代数积。
9. 提取矩阵 `x` 对角线上的元素。
10. 对矩阵 `y` 进行转置。
11. 计算矩阵 `x` 对应的行列式的值。
12. 求矩阵 `x` 的特征值。
13. 用 `eigen` 函数计算矩阵 `y` 的特征值与特征向量，观察返回结果。

<AnswerBlock title="实验七 · 参考答案" :code="code0207" />

::: tip 三个运算符别搞混
| 写法 | 含义 | 要求 |
| --- | --- | --- |
| `x * y` | **代数积**（对应元素相乘） | 两个矩阵同型 |
| `x %*% y` | **矩阵乘法** | `x` 的列数 = `y` 的行数 |
| `x + y` | 对应元素相加 | 两个矩阵同型 |

所以第 2 题 `x + y` 会报错——两矩阵的行列数不一致。
:::

## 实验八：矩阵相关函数

包括 `dim`、`apply`、`ncol`、`nrow`、`colSums`、`rowSums`、`colMeans`、`rowMeans`。打开脚本文件 **test0208.R**，补充代码，完成下面任务。

1. 计算矩阵的行数与列数。
2. 计算矩阵 `x` 的维度。
3. 计算矩阵 `x` 每行的和。
4. 计算矩阵 `x` 每列的平均值。
5. 用 `apply` 函数计算矩阵 `x` 每行的方差。
6. 计算矩阵 `x` 所有元素的平方和。

<AnswerBlock title="实验八 · 参考答案" :code="code0208" />

::: tip `apply` 的第二个参数
`apply(x, MARGIN, FUN)` 中，`MARGIN = 1` 表示按**行**计算，`MARGIN = 2` 表示按**列**计算。
:::

## 实验九：综合题

创建脚本文件 **test0209.R**，补充代码，完成下面任务。

1. 空间三角形 ABC 的顶点坐标分别为 A(3, 4, 5)、B(-3, 2, 4)、C(5, -3, 4)，请计算三角形三边的长度以及三个夹角的余弦值。
2. 向量 $x = c(9, 8, 10, 7, 12, 11, 12, 6, 10, 3, 11, 13, 7, 10, 9)$，请计算 $x$ 中的元素两两相乘之积的和。

   例如 $x = c(x_1, x_2, x_3)$，则两两相乘之积的和为 $x_1x_2 + x_1x_3 + x_2x_3$。

<AnswerBlock title="实验九 · 参考答案" :code="code0209" />

::: tip 余弦定理与 `combn`
- 三边长度用两点间距离公式 $AB=\sqrt{(x_1-x_2)^2+(y_1-y_2)^2+(z_1-z_2)^2}$，再配合余弦定理 $\cos A=\dfrac{AB^2+AC^2-BC^2}{2\,AB\cdot AC}$ 求夹角。
- 第 2 题的 `combn(x, 2, FUN = prod)` 会列出所有「两两组合」并求积，再 `sum()` 求和，一行就能搞定。
:::

## 本讲小结

| 主题 | 常用函数 / 运算符 |
| --- | --- |
| 创建向量 | `:`, `c()`, `rep()`, `seq()` |
| 向量运算 | `length()`, `mean()`, `sum()`, `sort()`, `which()`, `which.max()` |
| 增删改查 | `append()`, `x[i]`, `x[-i]`, `names()` |
| 创建矩阵 | `matrix(..., byrow =)`, `diag()` |
| 矩阵属性 | `dim()`, `nrow()`, `ncol()`, `rownames()`, `colnames()` |
| 矩阵运算 | `+`, `*`, `%*%`, `t()`, `det()`, `eigen()`, `diag()` |
| 矩阵统计 | `rowSums()`, `colSums()`, `rowMeans()`, `colMeans()`, `apply()` |

::: info 关于本页的题目与答案
题目来自 `原题/第二周原题`，答案来自 `答案/第二周答案`（仅修正过其中的错别字）。
:::
