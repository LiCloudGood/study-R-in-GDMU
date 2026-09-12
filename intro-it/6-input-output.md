---
layout: doc
title: 6-输入、输出
---

<script setup>
// 原题里的数据文件，内嵌后网页里的 R 环境也能读到
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

const code0601 = `# （1）
mat <- matrix(c(5, 3, 9, 10, 8, 15, 2, 9, 13, 17, 7, 9), nrow = 3, ncol = 4)  # 定义一个 3x4 的矩阵
str <- c("咳嗽", "头痛", "低烧")
num <- 178

# （2）
save.image("save-all.txt")  
dir()  

# （3）
save(mat, str, file = "save-part.txt") 
dir()  

# （4）
rm(list = ls())  

# （5）
ls()  
num / 100  

# （6）
load("save-all.txt")  
num / 100  `

const code0602 = `#(1)
scan() ->x
sum(x)
mean(x)

#(2)
price <- as.integer(readline(prompt = '请输入价格:')) 
num <- as.integer(readline(prompt = "请输入数量:"))
total <- price*num
current_time <- format(Sys.time(), "%Y年%m月%d日 %H时%M分%S秒")
cat("\\n----------------------------\\n")
cat("您应付金额为：",total,'\\n')
cat("付款时间为：",current_time)
cat("\\n----------------------------\\n")`
</script>

# 输入、输出

## 实验目的

- 掌握 `scan` 函数、`readline` 函数和 `readLines` 函数读取键盘输入。
- 掌握 `scan` 函数、`read.table` 函数和 `read.csv` 函数读取文本文件。
- 掌握 `write.table` 函数和 `write.csv` 函数保存结构化数据。
- 掌握 `print` 函数和 `cat` 函数的使用。
- 掌握环境数据的保存与加载。

## 实验一：环境数据的保存与加载

创建脚本文件 **test0601.R**，并完成下面操作。

1. 定义矩阵 `mat` 为

   $$\begin{bmatrix} 5 & 10 & 2 & 17 \\ 3 & 8 & 9 & 7 \\ 9 & 15 & 13 & 9 \end{bmatrix}$$

   定义字符型变量 `str` 为 `c("咳嗽", "头痛", "低烧")`，定义数值型变量 `num` 为 178。

2. 用 `save.image` 保存所有变量，文件名 `save-all.txt`，用 `dir` 查看当前工作文件下是否有该文件。
3. 用 `save` 保存 `mat` 和 `str`，文件名为 `save-part.txt`，用 `dir` 查看当前工作文件下是否有该文件。
4. 用 `rm` 函数删除所有变量。
5. 用 `ls` 查看当前环境对象，是否还有变量名列出？计算 `num` 除以 100 的结果，会有什么错误？
6. 从文件 `save-all.txt` 中加载数据，计算 `num` 除以 100 的结果，还有错误出现吗？

<AnswerBlock
  title="实验一 · 参考答案"
  description="答案里的矩阵是 matrix(c(5, 3, 9, 10, 8, 15, 2, 9, 13, 17, 7, 9), nrow = 3, ncol = 4)，按列填充后就是上面那个矩阵。"
  :code="code0601"
/>

::: tip 保存的是「工作区」，不是「数据文件」
| 函数 | 存什么 | 读回来 |
| --- | --- | --- |
| `save.image(file)` | **当前所有**变量 | `load(file)` |
| `save(a, b, file =)` | 指定的几个变量 | `load(file)` |
| `rm(list = ls())` | 清空工作区 | — |

第 5 小题报 `object 'num' not found`，正是因为 `rm` 把 `num` 从**内存**里删掉了；
第 6 小题 `load("save-all.txt")` 把它从**磁盘**上恢复了回来，所以又能算了。

注意 `save.image` 存出来的是 R 自己的二进制格式，只有 R 能读，
和后面实验七要学的 `write.csv`（给 Excel 读的纯文本）完全是两回事。
:::

## 实验二：从命令窗口中交互式输入数据

创建脚本文件 **test0602.R**，完成下面操作。

1. 用 `scan` 函数从命令窗口中读入向量 `{7, 13, 10, 9}`，赋值给变量 `x`，然后计算该向量的和与平均值。
2. 用 `readline` 函数读入价格 2319，其中提示信息为“请输入价格：”；用 `readline` 函数读入数量 12，其中提示信息为“请输入数量：”；最后计算总金额，输出格式为：

   ```text
   -----------------------------
   您应付金额为：???
   付款时间为：***
   -----------------------------
   ```

   其中 `???` 为计算出来的结果，`***` 为系统当前日期时间。
3. 用 `readLines` 函数从命令窗口中输入两个字符串，分别为“R程序设计”、“Python程序设计”。

<AnswerBlock
  title="实验二 · 参考答案"
  description="注意：本实验的 scan() 和 readline() 需要从命令行实时读取输入。网页里的 R 环境没有交互式命令行，直接点「运行」会一直等待输入，建议在本机 RStudio 里练习。"
  :code="code0602"
/>

::: warning readline 与 print / cat 的输出差别
- `readline(prompt = "...")` 读进来的是**字符串**，要算数必须先 `as.integer()` / `as.numeric()` 转换。
- `cat()` 输出时**不会自动换行**，所以答案里要自己写 `\n`。
- `cat()` 也**不返回**值，所以最后一行不能写 `y <- cat(...)`。
:::

::: info 本讲的参考答案只覆盖到实验二
`答案/第六周答案` 目录里只放了 `test0601.R` 和 `test0602.R` 两个脚本，
实验三到实验七没有答案文件，因此下面只给出题目与关键函数提示，保持原样不做补充。
:::

## 实验三：屏幕输出与定向

创建脚本文件 **test0603.R**，完成下面操作。

1. 字符串向量 `poem` 包含四个字符串，分别为：

   ```r
   "秦时明月汉时关，"
   "万里长征人未还。"
   "但使龙城飞将在，"
   "不教胡马度阴山。"
   ```

   请用赋值语句定义变量 `poem`。

2. 请用 `cat` 函数按原题所示格式输出。
3. 用 `sink` 函数把上面的输出定向输出到文件 `sink.file.txt` 中。

::: tip 关键函数：sink
```r
sink("sink.file.txt")   # 从这里开始的输出都写进文件
cat(poem, sep = "\n")
sink()                  # 关掉重定向，输出回到屏幕
```

`sink()` 不带参数就是「取消重定向」。忘记关的话，后面所有输出都会悄悄跑进文件里，
这是新手最容易踩的坑。
:::

## 实验四：file、seek、readLines、close 函数

创建脚本文件 **test0604.R**，完成下面操作。

1. 用 `readLines` 函数一次性把文件 `data4.1.txt` 中的数据读入到变量 `dat41`，然后判断 `dat41` 是否是向量。
2. 用 `print` 函数显示 `dat41` 的数据，再选择适当的函数删除每个字符串中的前面 4 个空格，显示删除后的结果。
3. 用 `readLines` 读取 `data4.2.txt` 中第 5 行到第 8 行，赋值给 `row.5.8`；然后读取第 13 行到 16 行到 `row.13.16`。
4. 用 `close` 关闭文件句柄。

> 注意：一个汉字的长度为 3，回车换行的长度为 2。

::: tip 关键函数：file / readLines / close
```r
con <- file("data4.2.txt", "r")     # 打开连接
readLines(con, n = 1)               # 先空读几行，把光标挪到目标位置
row.5.8 <- readLines(con, n = 4)    # 再读 4 行
close(con)                          # 用完一定要关
```

`readLines` 读到的每一行都是**字符串**，前面的空格属于内容的一部分，
所以「删除前 4 个空格」要用 `sub("^ {4}", "", dat41)` 或 `trimws(dat41)`。

`seek(con, where)` 可以直接跳到指定**字符**位置，这正是题目提示「汉字算 3 个字符、
回车换行算 2 个字符」的原因。
:::

## 实验五：scan 函数

创建脚本文件 **test0605.R**，完成下面操作。

1. 用 `scan` 函数把文件 `data5.txt` 中数据读入到变量 `x` 中。
2. 用 `x` 的数据计算原始文件中第 4 列的平均值。
3. 用 `x` 的数据并按原始文件的格式创建一个数据框 `y`，给数据框的列分别命名为 `{序号, 学号, 课程号, 分数}`。
4. 用 `y` 的数据和 `tapply` 函数按课程号分组计算平均值和方差。

::: tip 关键函数：scan + matrix 还原表格
`scan("data5.txt")` 会把文件里所有数字**拉平成一个长向量**（按列优先读进来）。
要还原成表格，配合 `matrix()` 就行：

```r
x <- scan("data5.txt", quiet = TRUE)
y <- as.data.frame(matrix(x, ncol = 4, byrow = TRUE))
names(y) <- c("序号", "学号", "课程号", "分数")
tapply(y$分数, y$课程号, mean)
tapply(y$分数, y$课程号, var)
```

`tapply(值, 分组, 函数)` 就是第 4 讲学过的分组统计写法。
:::

## 实验六：read.table 函数和 read.csv 函数

创建脚本文件 **test0606.R**，使用 `read.table` 函数或 `read.csv` 函数完成下面操作。

1. 读文件 `data6.1.csv` 到数据框 `x` 中，把变量 `diabetes` 和 `status` 定义为有序的因子变量，其中因子变量的顺序用默认方式定义。
2. 读文件 `data6.2.txt` 到数据框 `y` 中，给 `y` 的每列命名，名称分别为 `{流水号, 学号, 科目编号, 分数}`，把科目编号定义为有序的因子变量，且序定义为 4 < 3 < 2 < 1。
3. 读文件 `data6.3.txt` 到数据框 `z` 中，按 `courseID` 分组计算 `score` 平均值。
4. 读文件 `data6.4.txt` 到数据框 `w` 中，分别给列变量命名为 `{年, 月, 日}`。

::: tip read.csv 与 read.table 的区别
| 函数 | 默认分隔符 | 默认表头 |
| --- | --- | --- |
| `read.csv()` | **逗号** | 有（`header = TRUE`）|
| `read.table()` | 空格 / 制表符 | **无**（`header = FALSE`）|

所以：
- 逗号分隔的 `data6.1.csv` 直接 `read.csv()` 就行。
- 空格或 Tab 分隔的 `data6.2.txt` / `data6.3.txt` / `data6.4.txt` 要用 `read.table()`，
  而且**要自己判断有没有表头**：文件里第一行是数据就写 `header = FALSE`，
  然后用 `names(y) <- c(...)` 补列名。

有序因子仍然用第 4 讲的写法：
```r
factor(y$科目编号, levels = c(4, 3, 2, 1), ordered = TRUE)
```
:::

## 实验七：write.table 函数和 write.csv 函数

创建脚本文件 **test0607.R**，完成下面操作。

1. 用数据 `1:12` 创建一个 3 行 4 列的矩阵 `x`，要求数据按行排列。
2. 用 `write.table` 把 `x` 的数据写入文件 `write.matrix.txt` 中，且行名为 `{第1行, 第2行, 第3行}`，列名为 `{第1列, 第2列, 第3列, 第4列}`，分隔符为斜杠 `/`。
3. 用 `write.csv` 把 `iris` 数据集中数据写入到文件 `write.iris.txt` 中，且行名为 `{row1, row2, …, row??}`，其中 `??` 为 `iris` 的总行数（选择适当函数计算总行数）。
4. 使用 `write.csv` 把 `cars` 数据写入到文件 `write.cars.txt` 中。

::: tip 关键函数：write.table / write.csv
```r
x <- matrix(1:12, nrow = 3, ncol = 4, byrow = TRUE)
rownames(x) <- c("第1行", "第2行", "第3行")
colnames(x) <- c("第1列", "第2列", "第3列", "第4列")
write.table(x, "write.matrix.txt", sep = "/")

n <- nrow(iris)
rownames(iris) <- paste0("row", 1:n)
write.csv(iris, "write.iris.txt")
write.csv(cars, "write.cars.txt")
```

两个参数值得记一下：

- `sep = "/"` 指定列与列之间用什么分隔。
- `quote = FALSE` 可以让字符型数据不带引号（默认会加），
  想让输出更干净时可以加上。

`write.csv` 实际上就是 `write.table(..., sep = ",", ...)` 的封装。
:::

## 本讲小结

| 主题 | 常用函数 |
| --- | --- |
| 键盘输入 | `scan()`、`readline(prompt =)`、`readLines()` |
| 读文本文件 | `read.table()`（空格/Tab）、`read.csv()`（逗号）|
| 逐行读文件 | `file()` 打开连接 + `readLines(con, n =)` + `close(con)` |
| 写文件 | `write.table(sep =)`、`write.csv()` |
| 屏幕输出 | `print()`、`cat()`、`sink()` 重定向 |
| 工作区存取 | `save()`、`save.image()`、`load()`、`rm(list = ls())`、`ls()` |

::: info 关于本页的题目与答案
题目来自 `原题/第六周原题`，答案来自 `答案/第六周答案`，两处均保持原样未做改动。
`答案/第六周答案` 只收录了 `test0601.R` 与 `test0602.R`，实验三~七暂无答案脚本，
本页仅给出题目与关键函数提示。
:::
