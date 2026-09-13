---
layout: doc
title: 5-日期、字符与特殊值处理
---

<script setup>
// 原题里的两个文本文件，内嵌进来后网页里的 R 环境也能直接读到
const solomonTxt = `Long long ago there was a king Solomon was his name He was very clever In his country there were two women3 They lived in the same house and each had a child
One night one of the babies died The dead baby's mother took the other woman's baby and put it in her own bed
The next morning they had a quarrel
No  this is my baby  The dead is yours
Each one wanted the living baby So they went to see King Solomon
Bring me a knife cut the child into two and five each woman one half said the King
Oh Your MajestTy  Give her my baby Please don't kill my baby
Then King Solomon pointed to the woman in teas and said Give the baby to her She is the moTher
God had given Solomon any wish and he chose wisdom This I heard from another guard I couldn't believe it Why hadn't he picked other things like riches long life or the death of his enemies Now I know why because he is one of the younGest rulers ever and he needs wisdom to rule the people God thought that it was such a good answer so he gave him wisdom riches power and fame
When Pharaoh came to Jerusalem to speak with Solomon I was called to stand behind King SoloMon I was listening to their converSation when finally they came to a point Solomon had made an alliance or a so-called treaty of peace by marrying PhaRaoh's daughter I was at their wedding too I soon overheard about how King Solomon was makiing a temple to the one and only God above2 I was sent to work at the masonry because I was once a stone mason and they are short of masons so they are pulling everybody with rock carving experience to them asonry At least I don't have to worked like those labour slaves have to They are worked until they are almost dead It looks like they never stop working I feel that those labour
`

const solomon2Txt = `Long, long ago, there was a king. Solomon was his name. He was very clever. In his country, there were two women3. They lived in the same house and each had a child.
One night, one of the babies died. The dead baby's mother took the other woman's baby, and put it in her own bed.
The next morning, they had a quarrel.
"No,  this is my baby!  The dead is yours!"
Each one wanted the living baby. So they went to see King Solomon.
"Bring me a knife, cut the child into two and five, each woman one half." said the King.
"Oh. Your MajestTy!  Give her my baby. Please don't kill my baby!"
Then King Solomon pointed to the woman in teas and said, Give the baby to her. She is the moTher.
God had given Solomon any wish, and he chose wisdom. This I heard from another guard. I couldn't believe it! Why hadn't he picked other things like riches, long life, or the death of his enemies? Now I know why because he is one of the younGest rulers ever and he needs wisdom to rule the people. God thought that it was such a good answer so he gave him wisdom, riches, power and fame.
When Pharaoh came to Jerusalem to speak with Solomon, I was called to stand behind King SoloMon. I was listening to their converSation when finally they came to a point. Solomon had made an alliance or a so-called treaty of peace by marrying PhaRaoh's daughter. I was at their wedding too. I soon overheard about how King Solomon was makiing a temple to the one and only God above2. I was sent to work at the masonry, because I was once a stone mason and they are short of masons so they are pulling everybody with rock carving experience to them asonry. At least I don't have to worked like those labour slaves have to. They are worked until they are almost dead. It looks like they never stop working. I feel that those labour.
`

const code0501 = `dt <- Sys.Date()
tm <- Sys.time()
print(dt)
print(tm)
class(dt)
class(tm)
dt-30 #日期减30
tm-30 #秒数减30

dts <- date()
class(dts)
dts - 30
#错误于dts - 30: 二进列运算符中有非数值参数

x <- c('2025-3-31','2025-3-24')
x.date <- as.Date(x)
diff(x.date)

y <- c('2025-3-24;9:20:45','2025-3-24;9:10:45')
as.Date(y)

y.time <- strptime(y,"%Y-%m-%d;%H:%M:%S")
diff(y.time)

dt1 = "2025-3-24 8:30:15"
dt2 = "2025-3-24 10:30:15"
difftime(strptime(dt2, format = "%Y-%m-%d %H:%M:%S"), 
         strptime(dt1, format = "%Y-%m-%d %H:%M:%S"), units = "hours")

dt1.time <- strptime(dt1, format = "%Y-%m-%d %H:%M:%S")
dt2.time <- strptime(dt2, format = "%Y-%m-%d %H:%M:%S")
difftime(dt2.time, dt1.time, units = "hours")

dt1.date <- as.Date(dt1)
dt2.date <- as.Date(dt2)
difftime(dt2.date, dt1.date, units = "hours")`

const code0502 = `x <- letters
y <- 1:52
paste(x,y,sep = '-')

a <- rep(letters,each = 2)
paste(a,y,sep = '-')

x1 <- '远上寒山石径斜，白天生处有人家。\\n停车坐爱枫林晚，霜叶红于二月花。'
cat(x1)`

const code0503 = `x <- scan('Solomon.txt',
          what = '',
          quote = "",
          fileEncoding = 'gb2312')

x[grepl('es$',x)]
x[grepl('se$',x)]

x[grepl('^[A-Z]',x)]
x[grepl('^[a-z].*[A-X]',x)]

x[grepl('[^a-zA-Z]',x)]

x[grepl('\\\\d',x)]

x[grepl('([a-z])\\\\1',x,ignore.case = T)]`

const code0504 = `x <- scan('Solomon2.txt',
          what = '',
          quote = "",
          fileEncoding = 'gb2312')

words_with <- grep('[[:punct:]]',strsplit(x,'\\\\s+')[[1]],value = T)
cleaned <- gsub('[\\\\\\\\[:punct:]]','',x)
print(cleaned)

y <- gsub('[".,?;:!?]', "", x)`

const code0505 = `x = c('these are bananas and oranges',
      'these are apples and ...',
      'these are peaches')
x[grepl("(an).*\\\\1", x)]
regexpr("an", x)
gregexpr("an", x)
# - grep：返回匹配的元素的索引。
# - grepl：返回逻辑向量，表示每个元素是否匹配。
# - regexpr：返回第一个匹配项的位置和长度，结果是一个数值向量。
# - gregexpr：返回所有匹配项的位置和长度，结果是一个列表，每个元素对应一个字符串的所有匹配项。`

const code0506 = `original_string <- "R is a programming language for statistical computing and graphics"
substr_result <- substr(original_string, start = 8, stop = 8 + 7 - 1)
print(substr_result)
substring_result <- substring(original_string, first = 8, last = 8 + 7 - 1)
print(substring_result)

part1 <- substr(original_string, 1, 7)
part2 <- substr(original_string, 19, nchar(original_string))
modified_string <- paste0(part1, "程序设计", part2)
print(modified_string)`

const code0507 = `x = readLines("Solomon2.txt")

y <- as.character(x)

z <- strsplit(y,split = ' ')[[1]]
z[z ==''] <- NA
word_freq <- table(z)`

const code0508 = `x <- c(NaN,1,NA,3,Inf,5,NULL)
length(x) == 7

x <- x[!is.na(x)]
x <- x[-which(is.infinite(x))]`
</script>

# 日期、字符与特殊值处理

::: info 老师的建议
先完成实验一、二、三、七，有余力再做实验四、五、六。
:::

## 实验目的

- 掌握日期型数据的处理与操作。
- 掌握正则表达式与字符串检索。
- 掌握特殊值处理方法。

## 实验一：日期和时间操作

创建脚本文件 **test0501.R**，在脚本文件中完成下面操作。

1. 用 `Sys.Date()` 和 `Sys.Time()` 函数分别获取当前的日期和时间，分别赋值给 `dt` 和 `tm`，然后用 `print` 函数显示它们的值，用 `class` 显示它们的对象类型。验证 `dt` 和 `tm` 分别减去 30 的结果，并用注释语句解释结果的意义。
2. 用 `date()` 函数获取当前系统的日期赋值给 `dts`，用适当的函数显示其对象类型，验证它减去 30 的结果，解释出现错误的原因。
3. 定义向量 `x` 为 `c('2025-3-31','2025-3-24')`，用 `as.Date` 把 `x` 转换成日期型数据，并赋值给 `x.date`，计算两个日期相差的天数。
4. 定义向量 `y` 为 `c('2025-3-24;9:20:45','2025-3-24;9:10:45')`，试用 `as.Date` 将 `y` 转换日期型数据，然后计算它们的差；试用 `strptime` 转换为时间型数据，然后计算它的差，并用注释语句解释 `as.Date` 和 `strptime` 两个函数有什么不同。
5. `dt1 = "2025-3-24 8:30:15"`，`dt2 = "2025-3-24 10:30:15"`，直接用 `difftime` 计算两者相差多少小时。
6. 用 `strptime` 转换 `dt1` 和 `dt2` 后，再用 `difftime` 计算它们相差多少小时；并验证使用 `as.Date` 函数转换后，再用 `difftime` 计算它们相差多少小时，可否能得到正确的结果？

<AnswerBlock title="实验一 · 参考答案" :code="code0501" />

::: tip R 里的几种「时间」
| 函数 | 得到的类型 | 本质 | `- 30` 的含义 |
| --- | --- | --- | --- |
| `Sys.Date()` | `Date` | 从 1970-01-01 起的天数 | **往前推 30 天** |
| `Sys.time()` | `POSIXct` | 从 1970-01-01 起的**秒数** | **往前推 30 秒** |
| `date()` | `character` | 一串**文字** | 报错：文字不能做减法 |

这正是实验一第 2 小题要解释的：`date()` 返回的只是字符串，
`"Mon Mar 24 ..." - 30` 当然算不了。

**`as.Date` 和 `strptime` 的分工**：

- `as.Date("2025-3-24;9:20:45")` —— 只认**日期**，解析到「天」为止，
  时分秒被直接丢掉，所以两个时间点转完变成同一天，相减是 0。
- `strptime(x, "%Y-%m-%d;%H:%M:%S")` —— 按你给的**格式串**精确解析，
  连时分秒一起保留，相减才能得到真正的 10 分钟差距。

第 6 小题同理：`as.Date` 把 `dt1`、`dt2` 都砍成了同一天，
`difftime(..., units = "hours")` 自然是 **0 小时**，得不到正确的 2 小时。
:::

## 实验二：paste、paste0 与转义字符

新建脚本文件 **test0502.R**，完成下面任务。

1. 请选择适当函数创建原题中图所示的字符串向量 `x`。
2. 请选择适当函数创建原题中图所示的字符串向量 `y`。
3. 用一次 `cat` 函数在命令窗口中输出如原题所示形状的内容。

<AnswerBlock
  title="实验二 · 参考答案"
  description="原题里的「如下图所示」是 Word 里的截图，纯文本提取时拿不到，因此这里的答案是按答案脚本 test0502.R 还原的。"
  :code="code0502"
/>

::: tip paste / paste0 / cat 三兄弟
| 函数 | 作用 | 特点 |
| --- | --- | --- |
| `paste(a, b, sep = "-")` | 拼接，**默认用空格分隔** | 返回字符向量 |
| `paste0(a, b)` | 拼接，**不分隔**（等价 `sep = ""`） | 返回字符向量 |
| `cat(...)` | 输出到屏幕/文件 | **不返回**值，默认也不换行 |

实验二第 3 小题的关键是转义字符：字符串里写 `\n` 表示**换行**
（R 里要写成 `\\n` 才不会在定义时就被吃掉），
再用 `cat()` 输出，才会真的分成两行；用 `print()` 则会显示成 `\n` 两个字符。
:::

## 实验三：使用正则表达式

打开脚本文件 **test0503.R**，完成以下操作。

1. 找出含有 `es` 或 `se` 的单词。
2. 找出结尾是 `es` 或 `se` 的单词。
3. 找出以大写英文字母开头的单词。
4. 找出开头是小写英文字母，而其他位置含有大写字母的单词。
5. 找出含有非英文字母的单词。
6. 找出包含有数字的单词。
7. 找出有连续重叠字母的单词，不区分大小写。

<AnswerBlock title="实验三 · 参考答案" :code="code0503" />

::: tip 正则「元字符」速查
| 写法 | 含义 | 例子 |
| --- | --- | --- |
| `^` | 字符串开头 | `^[A-Z]` 以大写字母开头 |
| `$` | 字符串结尾 | `es$` 以 es 结尾 |
| `.` | 任意**一个**字符 | `a.c` 匹配 abc、a1c |
| `*` | 前面那个东西出现 0 次或多次 | |
| `[]` | 字符集合，里面任选一个 | `[aeiou]` 元音 |
| `[^...]` | **取反**：不在集合里的字符 | `[^a-zA-Z]` 非英文字母 |
| `\d` | 数字（R 里要写 `\\d`） | |
| `(...)` | 分组 | `(an)` |
| `\1` | **反向引用**：重复第 1 个分组匹配到的内容 | `([a-z])\1` 连续两个相同字母 |

第 4 小题 `^[a-z].*[A-X]` 里那个 `[A-X]` 值得留意——题目原意是「含有大写字母」，
严格来说应该写 `[A-Z]`。
:::

## 实验四：sub 与 gsub

打开脚本文件 **test0504.R**，完成下面操作。

1. 使用 `grep` 函数把 `x` 中的含有单引号、双引号、问号、句号、逗号、分号、冒号和感叹号的单词找出，并显示单词本身。
2. 删除字符串中的 `\` 与标点符号（`. , ? ; : !`），并把结果赋值给 `y`。

<AnswerBlock title="实验四 · 参考答案" :code="code0504" />

::: tip sub 只换第一个，gsub 全换
- `sub(旧, 新, 字符串)` —— 只替换**第一个**匹配。
- `gsub(旧, 新, 字符串)` —— 替换**所有**匹配（g = global）。

`[[:punct:]]` 是 R 的**POSIX 字符类**，一次代表所有标点。
它比手写 `[.,?;:!]` 更全，但也会把 `'` 也算进去。

另外 `grep(..., value = TRUE)` 表示「返回匹配到的**内容**」而不是下标。
:::

## 实验五：grepl、regexpr、gregexpr

打开脚本文件 **test0505.R**，完成下面操作。

1. 用 `grepl` 找出向量 `x` 中包含 `an` 字符且出现 2 次及 2 次以上的字符串。
2. 用 `regexpr` 找出向量 `x` 中包含 `an` 字符的字符串。
3. 用 `gregexpr` 找出向量 `x` 中包含 `an` 字符的字符串。
4. 请用注释语句回答 `grep`、`grepl`、`regexpr`、`gregexpr` 这四个函数的返回结果有什么不同。

<AnswerBlock title="实验五 · 参考答案" :code="code0505" />

::: tip 四个函数返回值对比（第 4 小题的答案）
| 函数 | 返回 | 示例 |
| --- | --- | --- |
| `grep` | **下标**向量 | `1 2` |
| `grepl` | **逻辑**向量 | `TRUE TRUE FALSE` |
| `regexpr` | 每个元素**第一个**匹配的位置与长度 | `6 6 -1`（-1 表示没匹配上）|
| `gregexpr` | **所有**匹配的位置与长度 | 一个**列表** |

规律：`grep`/`grepl` 只回答「**有没有**」，`regexpr`/`gregexpr` 还告诉你「**在哪里**」。
:::

## 实验六：substr 与 substring

创建脚本文件 **test0506.R**，完成下面操作。

1. 用 `substr` 函数和 `substring` 函数取出 `"R is a programming language for statistical computing and graphics"` 中第 8 个字符开始长度为 7 的子字符串。
2. 把该字符串中第 8 至第 18 个字符修改为 `"程序设计"`，观察修改结果，可得出什么结论？

<AnswerBlock title="实验六 · 参考答案" :code="code0506" />

::: tip R 的字符串是「只读」的
`substr(x, start, stop)` 是**取**子串，不是改字符串。像
`substr(x, 8, 18) <- "程序设计"` 这种写法虽然语法上能用，
但结果通常不是你想要的样子——因为 R 的字符向量一旦生成就不支持原地修改。

第 2 小题的正确思路是**拼回去**：取前半段 + 新内容 + 后半段。

注意 `substr` 的第三个参数是「**结束位置**」，不是长度，
所以「从第 8 个开始、长度 7」要写成 `substr(x, 8, 8 + 7 - 1)`。
:::

## 实验七：strsplit 分词与词频

打开脚本文件 **test0507.R**，完成下面操作。

1. 把向量 `x` 合并为一个字符串，赋值给 `y`。
2. 对字符串 `y` 进行分词操作，把操作结果赋值给 `z`。
3. 删除 `z` 中的空字符串。
4. 统计 `w` 中各个单词出现的频数。

<AnswerBlock title="实验七 · 参考答案" :code="code0507" />

::: tip strsplit 返回的永远是列表
`strsplit(y, split = ' ')` 的结果是一个**列表**，所以答案里要加 `[[1]]` 取第一项。

分词后常会留下空字符串（连着两个空格就会产生一个 `""`），
所以第 3 小题要先清理；最后用 `table()` 一统计就是词频表。
:::

## 实验八：特殊数据处理

创建脚本文件 **test0508.R**，完成下面操作。

1. 创建向量 `x`，其元素为 `NaN`、`1`、`NA`、`3`、`Inf`、`5`、`NULL`，用关系表达式判断向量 `x` 的长度是否等于 7。
2. 分别对 `NaN`、`NA`、`Inf` 和 `NULL` 进行处理，实现以下目标：
   - 删除向量中的 `NaN` 和 `NA` 值。
   - 删除向量中 `Inf` 值。

<AnswerBlock title="实验八 · 参考答案" :code="code0508" />

::: warning 四个「特殊值」长得像，脾气完全不同
| 值 | 含义 | 判断函数 | 放进向量会占位吗 |
| --- | --- | --- | --- |
| `NA` | 缺失值（**不知道**是多少） | `is.na()` | 占位 |
| `NaN` | 非数字（0/0 这种算不出来的） | `is.nan()` | 占位，且 `is.na()` 也返回 TRUE |
| `Inf` | 无穷大 | `is.infinite()` / `is.finite()` | 占位 |
| `NULL` | **空对象**（什么都没有） | `is.null()` | **不占位！会被直接删除** |

所以第 1 小题的答案是 `FALSE`：`NULL` 不是「一个元素」，
`c(NaN,1,NA,3,Inf,5,NULL)` 的长度是 **6** 而不是 7。
:::

## 本讲小结

| 主题 | 常用函数 |
| --- | --- |
| 当前时间 | `Sys.Date()`、`Sys.time()`、`date()` |
| 字符串转日期 | `as.Date()`（只到天）、`strptime(x, format)`（精确到秒）|
| 日期运算 | `diff()`、`difftime(units = "hours")`、日期直接 `+` / `-` 数字 |
| 字符串拼接 | `paste()`、`paste0()`、`cat()` |
| 查找 | `grep()`、`grepl()`、`regexpr()`、`gregexpr()` |
| 替换 | `sub()`、`gsub()` |
| 截取 / 分割 | `substr()`、`substring()`、`strsplit()`、`nchar()` |
| 特殊值 | `is.na()`、`is.nan()`、`is.infinite()`、`is.null()`、`NULL` |

::: info 关于本页的题目与答案
题目来自 `资料/原题/第五周原题`，答案来自 `资料/答案/第五周答案`（仅修正过其中的错别字）。
实验三、四、七用到的 `Solomon.txt`、`Solomon2.txt` 同样取自 `资料/原题/第五周原题`，
已内嵌进本页，点「运行」即可直接跑通。
:::
