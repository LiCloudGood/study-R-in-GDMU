---
layout: doc
title: 3-数组与数据框
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

const code0302 = `df <- data.frame(
  name = c("张飞", "李靖", "王剪", "赵奢", "孙策"),
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
# 错误于match.names(clabs, names(xi)): 名称同原来已有的名称不相对

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

# 数组与数据框

## 实验目的

- 掌握数组与数据框的创建操作方法。
- 掌握数组与数据框的筛选与元素提取操作。
- 掌握数据框的基本操作。

## 实验一：三维数组操作与统计分析

新建脚本文件 **test0301.R**，并在脚本中编写代码完成下面操作。

1. 用 `array` 函数定义一个 3 维数组，其中第一维长度为 2，第二维长度为 3，第三维长度为 4，数组的元素为 `1:24`。
2. 用索引提取一个元素给变量 `x`，该元素的第一个维度为 2，第二个维度为 2，第三个维度为 3。
3. 筛选数组中所有大于 10 的元素，并计算这些元素的平均值、标准差和中位数。
4. 分别计算数组在各个维度上的统计量的值，包括最小值、最大值、均值、标准差和中位数。

<AnswerBlock title="实验一 · 参考答案" :code="code0301" />

::: tip 数组是「带维度的向量」
`array(1:24, dim = c(2, 3, 4))` 其实就是把 1~24 按**列优先**的顺序塞进 2×3×4 的格子里。
取元素写成 `arr[第1维, 第2维, 第3维]`；只给一个下标则会退化成向量。

`apply(arr, MARGIN, FUN)` 的 `MARGIN` 就是「按第几维切」：

| 写法 | 含义 |
| --- | --- |
| `apply(arr, 1, sum)` | 对第 1 维的每个切片求统计量 |
| `apply(arr, 2, sum)` | 对第 2 维 |
| `apply(arr, 3, sum)` | 对第 3 维 |
:::

## 实验二：数据框的创建与元素提取

新建脚本文件 **test0302.R**，并在脚本中编写代码完成下面操作。

1. 用 `data.frame` 函数创建一个 5 行 3 列的数据框。第一列数据为 `name`：`"张飞", "李靖", "王剪", "赵奢", "孙策"`；第二列数据为 `age`：23, 21, 19, 25, 22；第三列数据为 `is.student`：`TRUE, FALSE, TRUE, FALSE, TRUE`。
2. 用中括号 `[]` 运算符提取第一行第二列的元素、第三行所有列的元素、数据框中的逻辑类型变量，分别保存到变量 `single.data`、`single.row`、`single.column` 中，然后用 `print` 函数打印出来。
3. 获取第一行到第三行和第一、二列组成的数据，保存到变量 `part.data` 中。
4. 用运算符 `$` 提取 `age` 列，保存到变量 `age.column`，然后计算它的标准差。
5. 用运算符 `[[]]` 通过列的序号提取数据框的每一列，分别保存到变量 `column1`、`column2`、`column3` 中。

<AnswerBlock title="实验二 · 参考答案" :code="code0302" />

::: tip 三种取列方式，结果类型不一样
| 写法 | 取到的东西 | 类型 |
| --- | --- | --- |
| `df$age` | `age` 列 | **向量** |
| `df[[2]]` | 第 2 列 | **向量** |
| `df["age"]` 或 `df[2]` | 只含 `age` 一列的子数据框 | **数据框** |
| `df[1, 2]` | 第 1 行第 2 列的那**一个值** | 标量/向量 |
| `df[3, ]` | 第 3 行（留空表示所有列） | 数据框 |

记口诀：**`[[` 和 `$` 往下钻一层**，剥掉数据框的外壳；单个 `[` 会保留数据框的结构。
:::

## 实验三：数据框的增删改查

新建脚本文件 **test0303.R**，并在脚本中编写代码完成下面操作（注意：请不要使用 `fix` 和 `edit` 函数）。

1. 用 `data.frame` 函数创建一个 5 行 4 列的数据框，其中列名为 `Name`、`Age`、`Gender`、`Is_Student`，行名为 `row1`、`row2`、`row3`、`row4`、`row5`；第一列数据为 `"John", "Jane", "Jack", "Jill", "Jim"`；第二列数据为 25, 31, 35, 28, 40；第三列数据为 `"Male", "Female", "Male", "Female", "Male"`；第四列数据为 `TRUE, FALSE, TRUE, FALSE, TRUE`。
2. 把数据框中名为 `"Age"` 的列的第三个元素的值修改为 31。
3. 删除数据框中名为 `"Name"` 的列。
4. 在数据框末尾添加一条记录，其数据为 34, `"Female"`, TRUE，并命名为 `row6`。
5. 用一条语句在数据框末尾增加两行新数据，分别为 29, `"Female"`, FALSE；26, `"Male"`, TRUE；然后用一条语句给这两行分别命名为 `row7`、`row8`。
6. 删除数据框中第三行数据。
7. 用 `subset` 函数筛选数据框中年龄大于 30 且是女性的数据，筛选结果中不包含性别列。
8. 用 `[]` 运算符筛选数据框中 `Is_Student` 为 `TRUE` 的数据，且筛选结果中只包含 `Age` 和 `Gender` 列。

<AnswerBlock title="实验三 · 参考答案" :code="code0303" />

::: warning `rbind` 拼数据框时的两个坑
1. **列名必须完全一致**，否则报 `名称同原来已有的名称不相对`（实验四第 1 题就是这个错误）。
2. 第 5 题要「用一条语句加两行」，所以得先 `data.frame(Age = c(29, 26), ...)` 造一个**真正的数据框**再 `rbind`；直接拼一个向量会因为类型强制转换（数字变成字符）而出问题。
:::

## 实验四：数据框拼接、合并与数据重塑

打开脚本文件 **test0304.R**，并完成下面操作。

1. 用 `rbind` 函数将 `df1` 和 `df2` 进行行拼接，请注意出现错误的原因。
2. 用 `cbind` 函数将 `df1` 和 `df2` 进行列拼接。
3. 用 `merge` 函数将 `df1` 和 `df2` 按照 `"ID"` 值合并，分别把参数 `all.x` 设置为 `TRUE`、`all.y` 设置为 `TRUE`、`all` 设置为 `TRUE`、`all` 设置为 `FALSE`，请注意返回的结果不同。
4. 用 `merge` 函数将 `df1` 和 `df3` 按照 `"ID"` 和 `"sID"` 进行合并。
5. 加载 `reshape2` 包，用 `melt` 函数将 `score` 数据框 `score` 变量重塑成变量-值的格式。

<AnswerBlock
  title="实验四 · 参考答案"
  description="已自动把原题里的 scores.csv 放进运行环境，所以 read.csv('scores.csv') 能直接读到。"
  :code="code0304"
  :files="{ 'scores.csv': scoresCsv }"
/>

::: tip `all.x` / `all.y` / `all` 到底在控制什么
`merge` 默认是**内连接**（只保留两边都匹配上的行）。R 里用三个参数表达外连接：

| 参数 | 等价于 SQL | 保留哪些行 |
| --- | --- | --- |
| `all.x = TRUE` | `LEFT JOIN` | 左表全部 + 右表匹配上的 |
| `all.y = TRUE` | `RIGHT JOIN` | 右表全部 + 左表匹配上的 |
| `all = TRUE` | `FULL JOIN` | 两边全部，匹配不上的补 `NA` |
| 都不写（`all = FALSE`） | `INNER JOIN` | 只保留都匹配上的 |
:::

## 实验五：综合练习

打开脚本文件 **test0305.R**，并完成下面操作。

1. 用 `summary` 显示 `ewrates` 和 `hellung`（是关于四膜虫细胞生长的数据框）的统计摘要。
2. 抽取数据框 `sc` 中奇数行的数据并赋值给 `odd.score`。
3. 用逻辑方法提取数据框 `bp.obese`（肥胖与血压数据）中 `sex` 为 0（男）的记录。
4. 用逻辑方法提取 `bp.obese` 中 `sex` 为 1、`bp`（收缩压）大于等于 140 的记录。
5. 分别计算数据框 `sc` 中 `courseID` 为 1 与 2 的 `score` 的平均值，并赋值给变量 `mean1` 和 `mean2`。

<AnswerBlock
  title="实验五 · 参考答案"
  description="已自动准备好 scores.csv。这一题还需要 ISwR 包，首次运行会在线安装，可能要等一会儿。"
  :packages="['ISwR']"
  :code="code0305"
  :files="{ 'scores.csv': scoresCsv }"
/>

::: tip 逻辑索引：R 最常用的筛选方式
```r
bp.obese[bp.obese$sex == 0, ]                     # 条件为 TRUE 的行全留下
bp.obese[bp.obese$sex == 1 & bp.obese$bp >= 140, ] # 多个条件用 & 连接
```

中括号里写的是一串 `TRUE`/`FALSE`，R 只把 `TRUE` 对应位置的行取出来。
等价写法是 `subset(bp.obese, sex == 0)`，不过 `subset` 在函数里用起来有坑，实际工作中更推荐上面这种。
:::

## 本讲小结

| 主题 | 常用函数 / 运算符 |
| --- | --- |
| 创建数组 | `array(data, dim =)` |
| 数组运算 | `arr[i, j, k]`、`arr[条件]`、`apply(arr, MARGIN, FUN)` |
| 创建数据框 | `data.frame()`、`read.csv()` |
| 取元素 / 取列 | `df[i, j]`、`df$name`、`df[["name"]]`、`df[, "name"]` |
| 筛选 | `df[逻辑条件, ]`、`subset()`、`which()` |
| 增删改 | `rbind()`、`cbind()`、`df$col <- NULL`、`df$col[i] <- 值` |
| 查看结构 | `str()`、`summary()`、`nrow()`、`ncol()`、`names()`、`rownames()` |
| 合并 / 重塑 | `merge(by =, all.x =)`、`reshape2::melt()` |

::: info 关于本页的题目与答案
题目来自 `原题/第三周原题`，答案来自 `答案/第三周答案`，两处均保持原样未做改动。
实验四、五用到的 `scores.csv` 也取自 `原题/第三周原题`。
:::
