---
layout: doc
title: 4-列表与因子
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

# 列表与因子

## 实验目的

- 掌握列表的创建与操作。
- 掌握因子变量的定义。
- 掌握与因子相关的 R 函数。

## 实验一：列表的创建与切片

创建脚本文件 **test0401.R**，完成下面操作。

1. 使用 `list()` 函数创建一个包含以下元素的列表 `my.list1`：
   - 一个向量（vector）：包含 5 个整数，从 1 到 5；
   - 一个标量（scalar）：赋值为 6.78；
   - 一个矩阵（matrix）：3 行 4 列，填充数据由 `rpois(12, 20)` 产生；
   - 一个数据框（data.frame）：含有 2 列，列名分别为 `Name` 和 `Age`，`Name` 的数据为 `"Alice", "Bob", "Charlie", "David", "Eve"`；`Age` 的数据为 23, 27, 22, 31, 29。
2. 用 `[ ]` 运算符切片列表，获取 `my.list1` 中的第 1、第 3、第 4 个子对象，并将其赋值给一个新的变量 `vector_slice`。
3. 用 `$` 和 `[[ ]]` 运算符分别引用 `my.list1` 中的列表的标量和矩阵部分。
4. 提取 `my.list1` 中的 data.frame 子对象中 `Name` 为 `Bob` 的行。

<AnswerBlock title="实验一 · 参考答案" :code="code0401" />

::: tip 列表的「三层剥壳」——最容易考的点
列表是 R 里最「随便」的容器，每个格子可以装不同类型的东西。取内容有三档：

| 写法 | 拿到什么 | 结果类型 |
| --- | --- | --- |
| `my.list1[1]` | 装着第 1 个格子的**小列表** | list |
| `my.list1[[1]]` | 第 1 个格子**里面**的东西 | 原始类型（向量等）|
| `my.list1$scalar` | 同上，按名字取 | 原始类型 |

所以 `my.list1[c(1, 3, 4)]` 得到的仍然是一个列表（只是少了几格），
而 `my.list1[[3]]` 才是那个矩阵本身。**想往下继续算，就必须用 `[[` 或 `$`。**
:::

## 实验二：列表的增、删、改与遍历

创建脚本文件 **test0402.R**，完成下面操作。

1. 用 `list()` 函数创建如实验一所示的列表，并赋值给 `my.list2`。
2. 给列表 `my.list2` 添加一个子对象 `char`，值为 `"New Element"`。
3. 删除列表 `my.list2` 中的子对象 `matrix`。
4. 修改列表 `my.list2` 中 `vector` 向量的最后一个元素，将其改为 6。
5. 给列表 `my.list2` 中 `vector` 向量的第一个元素重命名，改为 `"First"`。
6. 使用 `lapply()` 函数计算列表 `my.list2` 中的所有子对象的长度。
7. 使用 `sapply()` 函数计算列表 `my.list2` 中的所有子对象的长度。

<AnswerBlock title="实验二 · 参考答案" :code="code0402" />

::: tip lapply 和 sapply 只差一个「简」
- `lapply(x, FUN)` —— **l**ist apply，返回的永远是**列表**。
- `sapply(x, FUN)` —— **s**implify apply，返回前会尽量「简化」：
  每个结果长度都是 1 时，直接压成一个**向量**，读起来更清爽。

练习里 `lapply` 会打印成 `<int> 5` / `<dbl> 1` 这样带类型的一列，
而 `sapply` 则给出不用再拆的 `vector scalar data_frame char` 命名向量。

另外：列表里**删除**一个元素是赋值 `NULL`（`my.list2$matrix <- NULL`），
这一点和向量用负下标删除不一样。
:::

## 实验三：因子变量的定义与操作

创建脚本文件 **test0403.R**，完成下面操作。

1. 用 `data.frame` 函数定义一个数据框 `df`，数据如下所示，并用参数 `stringsAsFactors` 将 `diabetes` 和 `status` 这两个变量设为因子变量，然后用 `str` 查看 `df` 的结构。

   | patientID | age | diabetes | status |
   | --- | --- | --- | --- |
   | 1 | 25 | Type1 | Poor |
   | 2 | 34 | Type2 | Improved |
   | 3 | 28 | Type1 | Excellent |
   | 4 | 52 | Type1 | Poor |

2. 用 `factor` 函数将数据框 `df` 中 `status` 列转换为有序因子变量，用 `str` 函数观察 `status` 的结构。
3. 用 `factor` 函数创建一个有序因子变量 `ord_factor`，变量的值为 `"low", "medium", "high", "medium", "low", "high"`；因子的序为 `"low"`、`"medium"`、`"high"`。

<AnswerBlock title="实验三 · 参考答案" :code="code0403" />

::: tip 因子到底是什么
因子（factor）本质是**「带标签的整数向量」**：底层存的是 1、2、3…，上面贴一层 `levels` 标签。
这样既能省内存，又能让 R 知道哪些类别才「合法」。

```r
factor(c("low", "high", "low"), levels = c("low", "medium", "high"))
# [1] low  high low     ← Levels: low medium high
```

- 不写 `levels` 时，R 会按**字母顺序**自动排序，这就是为什么类别顺序常常不合你的意。
- 加上 `ordered = TRUE` 就变成**有序因子**，才能比较大小（`"low" < "high"` 为 `TRUE`），
  统计软件也才知道该用哪种检验。
- `stringsAsFactors = TRUE` 是 `data.frame()` 的一个正式参数（R 4.0 以前默认就是 `TRUE`），
  它会把字符列自动转成因子。
:::

## 实验四：split、lapply 和 tapply 的分组统计

创建脚本文件 **test0404.R**，完成下面操作。下面操作使用鸢尾花（`iris`）数据集，该数据集包含了 150 个鸢尾花的四个属性（`Sepal.Length`, `Sepal.Width`, `Petal.Length`, `Petal.Width`）和一个分类变量 `Species`。

1. 用 `split` 函数以 `Species` 为分组标准对数据集进行分组。
2. 计算每组数据的数据量。
3. 计算每组的花萼（sepal）和花瓣（petal）的平均长度。

<AnswerBlock title="实验四 · 参考答案" :code="code0404" />

::: tip 分组统计的万能套路：先 split，再 lapply
```r
iris_split <- split(iris, iris$Species)   # 大表 → 三个小表组成的列表
lapply(iris_split, nrow)                  # 对每个小表做同样的操作
```

`split()` 输出的永远是**列表**，所以下一步几乎总是配 `lapply()` / `sapply()`。
`iris` 是 R 自带的数据集，不用 `read.csv`，直接写 `iris` 就能用。
:::

## 实验五：tapply、by 和 aggregate 三个分组函数

创建脚本文件 **test0405.R**，完成下面操作。

1. 用 `by` 函数以 `Species` 为分组标准对 `iris` 数据集分组计算花萼和花瓣的平均长度。
2. 用 `tapply` 函数对 `iris` 数据集按 `Species` 进行分组汇总，计算花萼和花瓣宽度的中位数。
3. 用 `aggregate` 函数对 `iris` 数据集进行分组汇总，计算花萼和花瓣的平均长度与平均宽度。

<AnswerBlock title="实验五 · 参考答案" :code="code0405" />

::: tip 三个函数怎么选
| 函数 | 输入 | 输出 | 适用场景 |
| --- | --- | --- | --- |
| `tapply(向量, 分组, FUN)` | **一个向量** | 数组/向量 | 只统计一列，最轻量 |
| `by(数据框或向量, 分组, FUN)` | 可以整个数据框 | `by` 对象（像列表）| 想对多列同时算 |
| `aggregate(数据框, 分组, FUN)` | 数据框 | **数据框** | 结果要接着用 / 输出成表 |

`aggregate(iris[, -5], list(iris[[5]]), mean)` 里的 `iris[, -5]` 是「去掉第 5 列（Species）」，
把剩下 4 个数值列一起交给 `mean`，所以一次就得到 4 个属性的均值。
:::

## 实验六：cut 分箱与 table 频数统计

打开脚本文件 **test0406.R**，完成下面操作。

1. 用 `cut` 函数将 `age` 变量分为三个年龄段（`"Young"`, `"Middle"`, `"Old"`），对应的年龄区间为 (18, 35], (35, 55], (55, 70]，并赋值给变量 `age.group`。
2. 用 `table` 函数统计每个 `age.group` 年龄段在数据集 `data` 出现的频数。
3. 统计每个年龄段不同收入水平的频数。

<AnswerBlock title="实验六 · 参考答案" :code="code0406" />

::: tip cut 的区间是「左开右闭」
`cut(x, breaks, labels)` 按 `breaks` 切分：

```r
cut(data$age, c(18, 35, 55, 70), labels = c("Young", "Middle", "Old"))
```

- 区间形如 **(18, 35]、(35, 55]、(55, 70]**：左端点不包含、右端点包含，
  所以 `age = 35` 会落进 `"Young"`，而 `age = 18` 会被判为 `NA`。
- `breaks` 也可以用 `breaks = 3` 让 R 自己等宽分箱，但那样标签就不好控制了。
- `table()` 传**一个**向量得到一维频数表；传 `list(a, b)` 得到**二维交叉表**，
  本质就是「列联表」的雏形。
:::

## 本讲小结

| 主题 | 常用函数 / 运算符 |
| --- | --- |
| 创建列表 | `list(name = value, ...)` |
| 取子对象 | `lst[i]`（返回列表）、`lst[[i]]` / `lst$name`（返回内容）|
| 增 / 删 / 改 | `lst$new <- 值`、`lst$old <- NULL`、`lst$vec[i] <- 值` |
| 遍历列表 | `lapply()`（返回列表）、`sapply()`（尽量简化成向量）|
| 创建因子 | `factor(x, levels =, ordered =)`、`data.frame(..., stringsAsFactors =)` |
| 查看结构 | `str()`、`levels()`、`nlevels()` |
| 分组 | `split()`、`tapply()`、`by()`、`aggregate()` |
| 分箱 / 频数 | `cut(x, breaks, labels)`、`table()` |

::: info 关于本页的题目与答案
题目来自 `原题/第四周原题`，答案来自 `答案/第四周答案`。
:::
