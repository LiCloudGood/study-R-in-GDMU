---
layout: doc
title: 7-分支与循环
---

<script setup>
const code0701 = `n = rpois(1,75)
m =  rpois(1,80)


if (n %%2 != 1){
  print('n是偶数！')
}
if (m %%2 != 1){
  print('m是偶数!')
}else{
  print('m是奇数！')
}`

const code0702 = `score = round(runif(1,40,100), digits = 0)


if (score >= 90){
  print('优秀')
}else if(score >= 80){
  print('良好')
}else if(score >= 70){
  print('中等')
}else if(score >= 60){
  print('及格')
}else{
  print('不及格')
}`

const code0703 = `x = rpois(1, 60)
y = rpois(1, 60)
z = rpois(1, 60)
a = rpois(1, 30)
b = rpois(1, 50)
c = rpois(1, 70)

if (a + b > c && a + c > b && b + c > a){
  print('可以构成三角形')
}else{
  print('不能构成三角形')
}

max = 0
if (x>y){
  if(x>z){
    max <- x
  }else{
    max <- z
  }
}else{
  if(y>z){
    max <- y
  }else{
    max <- z
    }
}
cat(x,y,z,max)`

const code0704 = `age = round(runif(35, 18, 60))
x = rpois(1, 60)
y = rpois(1, 60)
z = rpois(1, 60)


over40 <- ifelse(age > 40,"是",'否')
print(over40)

tmax = ifelse(
  x > y,
  ifelse(x>z,x,z),
  ifelse(y>z,y,z)
)
cat(x,',',y,',',z,'的最大值为',tmax)`

const code0705 = `x = round(runif(100, 1, 99),digits = 0)
add <- 0
for (i in x){
  add <- add +i
}
ifelse(sum(x)==add,print('正确'),print('错误'))

i <- 1
while (i <= length(x)) {
  add <- add + x[i]
  i<- i +1
}

repeat{
  add <- add + x[i]
  i <- i + 1
  if (i > length(x)){
    break
  }
}`

const code0706 = `x = sprintf('%04d', 1:36)
y = round(runif(36, 22, 55), digits = 0)
z = rpois(36,75) %% 3 + 1
df = data.frame(ID = x, age = y, deg = z)

for (i in 1:length(z)) {
  df$deg[i] <- switch(z[i],
                      '本科',
                      '硕士',
                      '博士')
}
df`

const code0707 = `set.seed(1)
x = round(rnorm(100, 10, 10),digits = 2)

s=0
x
for(k in x){
  if(k<0)next
  if(k>30)break
  s = s+k
}
print(s)`

const code0708 = `x = rnorm(100, 5, 3)
y = runif(100, 0, 10)
cor(x,y)

ymean <- mean(y)
xmean <- mean(x)

csum = 0
xsum = 0
ysum = 0
for (k in 1:length(x)) {
  csum = csum + (x[k]-xmean)*(y[k]-mean(y))
  xsum = xsum + (x[k]-xmean)^2
  ysum = ysum + (y[k]-ymean)^2
}
pho = csum/sqrt(xsum*ysum)
print(pho)`
</script>

# 分支与循环

::: info 老师的建议
请完成实验一、二、四、五、六、七题，实验三与实验八请在课后完成。
实验九、十为课后思考题。
:::

## 实验目的

- 掌握分支语句的应用。
- 掌握循环语句的使用。
- 掌握使用分支语句和循环语句解决简单问题。
- 掌握 `next` 语句和 `break` 语句的应用。

## 实验一：if 语句与 if-else 语句

打开脚本文件 **test0701.R**，完成下面操作。

1. 若 `n` 是偶数，则用 `print` 函数显示“n是偶数！”，否则不显示。
2. 若 `m` 是偶数，则用 `print` 函数显示“m是偶数！”，否则显示“m是奇数！”。

<AnswerBlock title="实验一 · 参考答案" :code="code0701" />

::: tip 只有一个 `if` vs `if-else`
- 只写 `if`：条件不成立时**什么都不做**（第 1 小题）。
- `if ... else`：两条路必走其一（第 2 小题）。

R 里判断奇偶一般用取余：`x %% 2 == 0` 表示偶数。
答案里写的是 `x %% 2 != 1`，效果一样。

> 有个小细节：`else` 必须和 `if` 的右花括号**在同一行**，
> 否则 R 会以为语句已经结束了。
:::

## 实验二：多路分支

打开脚本文件 **test0702.R**，完成下面操作。

假设 `score` 表示分数，根据 `score` 判断等级，90 分及以上为优秀，80 分至 89 分为良好，70 分至 79 分为中等，60 分至 69 分为及格，60 分以下为不及格。

<AnswerBlock title="实验二 · 参考答案" :code="code0702" />

::: tip 多路分支的写法与顺序
```r
if (score >= 90) { ... }
else if (score >= 80) { ... }
...
else { ... }
```

两个要点：

1. **顺序必须从高到低**。因为 `else if` 是「前面都不成立才轮到我」，
   如果把 `score >= 60` 写在最前面，95 分也会被判成「及格」。
2. 每个分支只写**下界**就够了，上界由前一个条件帮你排除掉。
:::

## 实验三：分支语句的应用

打开脚本文件 **test0703.R**，用分支语句完成下面操作。

1. 以 `a`, `b`, `c` 为边长，判断是否可以构成一个三角形。
2. `x`, `y`, `z` 是三个任意的整数，用分支语句找出这三个数中的最大值，并用 `cat` 函数显示 `x`, `y`, `z` 三个数及其最大值。

<AnswerBlock title="实验三 · 参考答案" :code="code0703" />

::: tip 两条经典套路
**三角形判定**：任意两边之和大于第三边，三个条件同时成立才算数：

```r
if (a + b > c && a + c > b && b + c > a)
```

`&&` 是「并且」，注意它和向量化的 `&` 不是一回事：`&&` 只比较第一个元素，
专门用在 `if` 这种只需要一个 TRUE/FALSE 的地方。

**三数最大值**：用嵌套 `if` 需要写两层，思路是「先比出前两个的胜者，再和第三个比」
（答案用的就是这种）。不过 R 其实一行就能搞定：`max(x, y, z)`。
:::

## 实验四：分支函数 ifelse

打开脚本文件 **test0704.R**，完成下面操作。

1. 用 `ifelse` 函数产生一个新向量 `over40`，向量的元素由“是”和“否”构成。产生规则为：对应于 `age` 中的元素，若大于 40，则为“是”，否则为“否”。
2. 用 `ifelse` 函数找出 `x`, `y`, `z` 中的最大值，并用 `cat` 函数显示 `x`, `y`, `z` 三个数及其最大值。

<AnswerBlock title="实验四 · 参考答案" :code="code0704" />

::: tip ifelse 是「向量化」的分支
`if` 一次只能判断**一个**条件，`ifelse` 却能一次处理**整个向量**：

```r
ifelse(条件向量, 成立时的值, 不成立时的值)
```

`age` 里有 35 个数，`ifelse(age > 40, "是", "否")` 会返回同样长的 35 个“是/否”，
不需要写循环。这是 R 里非常常用的写法。

`ifelse` 还能嵌套，第 2 小题就是先比 `x` 和 `y`，再在各自分支里比 `z`。
:::

## 实验五：for / while / repeat 三种循环

打开脚本文件 **test0705.R**，用循环语句完成下面操作。

1. 用 `for` 循环计算并输出向量 `x` 的所有元素之和，并用 `sum` 函数验证计算结果的正确性。
2. 用 `while` 循环计算并输出向量 `x` 的所有元素之和。
3. 用 `repeat-break` 循环计算并输出向量 `x` 的所有元素之和。

<AnswerBlock title="实验五 · 参考答案" :code="code0705" />

::: tip 三种循环的骨架
```r
# for：知道要遍历什么
for (i in x) { ... }

# while：知道什么时候停
while (条件) { ... }

# repeat：先干再判，必须自己 break，否则死循环
repeat { ...; if (结束条件) break }
```

累加要**先初始化**（答案里的 `add <- 0`），否则 R 找不到 `add` 会报错。

三种循环算出来的和必须一样，这也是题目要求用 `sum(x)` 验证的原因。
:::

## 实验六：循环语句与 switch 函数

打开脚本文件 **test0706.R**，完成下面操作。

依据向量 `z` 的内容，用循环语句修改数据框 `deg` 列，修改规则为：若 `z` 中的元素为 1，则 `deg` 列对应位置修改为“本科”；若为 2，则修改为“硕士”；若为 3，则修改为“博士”。

<AnswerBlock title="实验六 · 参考答案" :code="code0706" />

::: tip switch 是「查表」式的分支
```r
switch(1, "本科", "硕士", "博士")   # 返回 "本科"
switch(2, "本科", "硕士", "博士")   # 返回 "硕士"
```

它按**位置**取值：第一个参数是几，就返回后面第几个选项。

配合循环就是「逐个翻译」：

```r
for (i in 1:length(z)) {
  df$deg[i] <- switch(z[i], "本科", "硕士", "博士")
}
```

`ifelse` 嵌套也能做同样的事，但 `switch` 在选项多的时候清楚得多。
`%04d` 是 `sprintf` 的格式化写法，表示「补零到 4 位」，用来做学号这类编号特别合适。
:::

## 实验七：next 语句和 break 语句

打开脚本文件 **test0707.R**，完成下面操作。

1. 计算向量 `x` 中大于 0 的元素之和，且遇到大于 30 的元素时，立即停止计算，要求使用 `next` 语句和 `break` 语句控制程序流程。
2. 用 `print` 函数显示计算结果（注：参考结果为 696.87）。

<AnswerBlock title="实验七 · 参考答案" :code="code0707" />

::: tip next 是「跳过」，break 是「退出」
| 语句 | 作用 |
| --- | --- |
| `next` | 跳过本次循环剩下的代码，直接进入**下一次**循环 |
| `break` | **立刻跳出**整个循环，后面的循环次数都不再执行 |

题目要求「大于 0 才累加，且超过 30 就停」，所以：

```r
for (k in x) {
  if (k < 0) next      # 负数：跳过，不累加
  if (k > 30) break    # 太大：整个循环到此为止
  s = s + k
}
```

⚠️ 答案里加了 `set.seed(1)`，所以每次运行都能稳定得到 696.87 这个参考结果。
如果去掉 `set.seed`，`rnorm` 每次生成的随机数不同，结果自然也会变。
:::

## 实验八：用循环计算相关系数

打开脚本文件 **test0708.R**，完成下面操作。

1. 用循环计算向量 `x` 和向量 `y` 的相关系数 $r$，其定义如下：

   $$r = \frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum_{i=1}^{n}(x_i-\bar{x})^{2}\cdot\sum_{i=1}^{n}(y_i-\bar{y})^{2}}}$$

   其中 $x_i$ 为向量 `x` 中的元素，$y_i$ 为向量 `y` 中的元素，$\bar{x}$ 和 $\bar{y}$ 为向量 `x` 和 `y` 的均值，可用 `mean` 函数计算，公式中求和运算（$\sum$）要求用循环语句实现。

2. 用 `print` 函数显示结果，并与 `cor(x, y)` 的返回结果对比。

<AnswerBlock title="实验八 · 参考答案" :code="code0708" />

::: tip 把公式拆成三个累加器
公式看着吓人，其实就是**三个求和**：

| 累加器 | 累加的内容 | 对应公式里的 |
| --- | --- | --- |
| `csum` | $(x_k-\bar{x})(y_k-\bar{y})$ | 分子 |
| `xsum` | $(x_k-\bar{x})^2$ | 分母里第一个 $\sum$ |
| `ysum` | $(y_k-\bar{y})^2$ | 分母里第二个 $\sum$ |

循环里三个一起累加，最后 `pho = csum / sqrt(xsum * ysum)`。

跑完会发现循环算出来的值（答案里管它叫 `pho`，其实是 Pearson 相关系数）
和 `cor(x, y)` 的结果一致——这正是 R 内置函数帮你做的事。
:::

## 实验九：欧几里德算法求最大公约数

打开脚本文件 **test0709.R**，实现欧几里德算法求两个正整数的最大公约数。

::: tip 思路提示
欧几里德算法（辗转相除）的核心是：

> 两个数的最大公约数 = 较小数与「两数相除的余数」的最大公约数，
> 一直除到余数为 0 为止。

```r
gcd <- function(a, b) {
  while (b != 0) {
    t <- b
    b <- a %% b
    a <- t
  }
  return(a)
}
```

> `答案/第七周答案` 中没有收录 `test0709.R`，此处仅给出思路提示，不算作参考答案。
:::

## 实验十：冒泡排序

打开脚本文件 **test0710.R**，使用冒泡算法对向量 `x` 进行排序。

原题给出的算法描述：

- `x = c(5, 6, 3, 4, 1, 2)`，由小到大排序，排序过程与体育课由矮到高排队相似。
- 第 1 趟：第 6 个与第 5 个比较，小的移到第 5 的位置，再与第 4 个比较……最小的那个（数字 1）就冒泡到第 1 的位置。
- 第 2 趟到第 5 趟：对剩下的数重复上述过程。
- 最后只剩下 1 个数，就不用再比较了。

原题总结与伪代码：

```text
n <- x的长度
k <- 从1到(n-1)
    j <- 从n到(k+1)
        if(x[j]<x[j-1]){交换x[j]与x[j-1]}
    下一个j
下一个k
输出x
```

::: tip 思路提示：两层循环
- **外层** `k` 控制「第几趟」，一共需要 `n - 1` 趟。
- **内层** `j` 从后往前扫，把小的往前推，一趟下来最小的那个就「冒」到了第 `k` 位。

```r
bubble <- function(x) {
  n <- length(x)
  for (k in 1:(n - 1)) {
    for (j in n:(k + 1)) {
      if (x[j] < x[j - 1]) {
        # 交换：R 里可以借助临时变量，也能用一行完成
        x[c(j, j - 1)] <- x[c(j - 1, j)]
      }
    }
  }
  return(x)
}
```

> `答案/第七周答案` 中没有收录 `test0710.R`，此处仅给出思路提示，不算作参考答案。
:::

## 本讲小结

| 主题 | 常用写法 |
| --- | --- |
| 单/双分支 | `if (条件) {...}`、`if (条件) {...} else {...}` |
| 多路分支 | `if ... else if ... else`、`switch(值, 选项1, 选项2, ...)` |
| 向量化分支 | `ifelse(条件向量, 值1, 值2)`（可嵌套）|
| for 循环 | `for (i in 向量) {...}` |
| while 循环 | `while (条件) {...}` |
| repeat 循环 | `repeat {...; if (条件) break}` |
| 流程控制 | `next`（跳过本次）、`break`（跳出循环）|
| 逻辑运算符 | `&&` / `\|\|`（单个判断）、`&` / `\|`（向量化）|

::: info 关于本页的题目与答案
题目来自 `原题/第七周原题`，答案来自 `答案/第七周答案`（仅修正过其中的错别字）。
`答案/第七周答案` 收录了实验一~八的脚本；实验九、十为课后思考题，暂无答案脚本。
:::
