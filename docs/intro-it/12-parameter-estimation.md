---
layout: doc
title: 12-参数估计
---

<script setup>
const code1201 = `fun1201 = function(x, alpha = 0.05, alt = 'two.sided'){
  n = length(x)
  ta = switch(
    alt,
    two.sided = qt(alpha/2, n-1),
    greater = qt(alpha, n-1),
    less = qt(1-alpha, n-1)
  )
  avg = mean(x)
  se = sd(x)/sqrt(n)
  switch(
    alt,
    two.sided = avg + c(ta, -ta)*se,
    greater = c(avg + ta*se, Inf),
    less = c(-Inf, avg + ta*se)
  )
}
#用 fun1201 函数计算 x 的双侧与单侧区间
x = rnorm(100)
fun1201(x)
fun1201(x, alt = 'greater')
fun1201(x, alt = 'less')
#用 t.test 函数计算 x 的双侧区间
as.numeric(t.test(x)$conf.int)`

const code1202 = `fun1202 = function(
    x, y, sigma1, sigma2, alpha = 0.05,
    alt = 'two.sided'){
  m = length(x)
  n = length(y)
  ua = ifelse(
    alt == 'two.sided',
    qnorm(alpha/2),
    qnorm(alpha)
  )
  se = sqrt(sigma1^2/m + sigma2^2/n)
  avg = mean(x)-mean(y)
  switch (
    alt,
    two.sided = avg + c(ua, -ua)*se,
    greater = c(avg + ua*se, Inf),
    less = c(-Inf, avg - ua*se)
  )
}
# 测试自定义函数
x = rnorm(100, 1, 2)
y = rnorm(50, 1, 1)
fun1202(x,y,2,1)
fun1202(x,y,2,1,alt = 'greater')
fun1202(x,y,2,1,alt = 'less')`

const code1203 = `fun1203 = function(x, y, mu1, mu2, 
                   alpha = 0.05, alt = 'two.sided'){
  m = length(x)
  n = length(y)
  fa = switch(
    alt,
    two.sided = c(qf(1-alpha/2, m, n), qf(alpha/2, m, n)),
    greater = qf(1-alpha, m, n),
    less = qf(alpha, m, n)
  )
  se = n*sum((x - mu1)^2)/(m*sum((y - mu2)^2))
  switch (
    alt,
    two.sided = se/fa,
    greater = c(se/fa, Inf),
    less = c(-Inf, se/fa)
  )
}
# 测试
x = rnorm(100, 1, 1)
y = rnorm(200, 4, 2)
fun1203(x, y, 1, 4)
fun1203(x, y, 1, 4, alt = 'greater')
fun1203(x, y, 1, 4, alt = 'less')`

const code1204 = `fun1204 = function(x, alpha = 0.05, alt = 'two.sided'){
  n = length(x)
  xa = switch(
    alt,
    two.sided = c(qchisq(alpha/2, 2*n), qchisq(1-alpha/2, 2*n)),
    greater = qchisq(alpha, 2*n),
    less = qchisq(1-alpha, 2*n)
  )
  se = 2*n*mean(x)
  switch(
    alt,
    two.sided = xa / se,
    greater = c(xa/se, Inf),
    less = c(0, xa/se)
  )
}
# 测试
x = rexp(100,6)
fun1204(x)
fun1204(x, alt = 'greater')
fun1204(x, alt = 'less')`
</script>

# 参数估计

## 实验目的

- 掌握正态分布参数置信区间的计算。
- 掌握 0-1 分布参数置信区间的计算。
- 掌握指数分布参数置信区间的计算。

::: tip 本讲四类问题的统一套路
四个实验题看起来公式五花八门，其实骨架完全一样：

```r
fun = function(数据, ..., alpha = 0.05, alt = 'two.sided') {
  分位数 = switch(alt, two.sided = ..., greater = ..., less = ...)
  标准误 = ...                       # 每个题不一样，这是唯一的区别
  switch(alt,
    two.sided = 估计值 + c(分位数, -分位数) * 标准误,   # 双侧：左右各一个
    greater   = c(估计值 + 分位数 * 标准误, Inf),       # 右侧：只有下界
    less      = c(-Inf, 估计值 + 分位数 * 标准误)       # 左侧：只有上界
  )
}
```

**记住这个结构，四道题就变成了填空题**——只要换掉「分位数用什么分布」和「标准误怎么算」。
:::

## 实验题 1：方差未知时正态样本均值的区间估计

打开 **test1201.R**，完成下面任务。

1. 方差未知，总体参数 $\mu$ 的区间公式如下：

   - 双侧区间：$\bar{X} \mp t_{\alpha/2}(n-1)\dfrac{S}{\sqrt{n}}$
   - 右侧区间：$\left[\bar{X} + t_{\alpha}(n-1)\dfrac{S}{\sqrt{n}},\ +\infty\right)$
   - 左侧区间：$\left(-\infty,\ \bar{X} + t_{1-\alpha}(n-1)\dfrac{S}{\sqrt{n}}\right]$

   其中 $t_{\alpha/2}$、$t_{\alpha}$、$t_{1-\alpha}$ 为自由度为 $n-1$ 的 t 分布对应于 $\alpha/2$、$\alpha$、$1-\alpha$ 的分位数。

2. 在自定义函数中，`alt='two.sided'` 表示计算双侧区间，`alt='greater'` 表示计算右侧区间，`alt='less'` 表示计算左侧区间。
3. 自定义函数的返回值为区间端点构成的向量。
4. 用 `x` 中的数据测试自定义函数的运行结果；然后用 `t.test` 函数计算双侧区间，并对比自定义函数的计算结果，是否相同？

<AnswerBlock title="实验题 1 · 参考答案" :code="code1201" />

::: tip 四个分位数函数——本讲的核心工具
| 分布 | 分位数函数 | 写法 | 自由度 |
| --- | --- | --- | --- |
| 标准正态 | `qnorm(p)` | `qnorm(alpha/2)` | 无 |
| t 分布 | `qt(p, df)` | `qt(alpha/2, n-1)` | `n - 1` |
| F 分布 | `qf(p, df1, df2)` | `qf(1-alpha/2, m, n)` | `m`, `n` |
| 卡方分布 | `qchisq(p, df)` | `qchisq(alpha/2, 2*n)` | `2n` |

⚠️ **`qt(alpha/2, n-1)` 得到的是负数**（因为 $\alpha/2$ 很小，落在左尾）。
双侧区间写成 `avg + c(ta, -ta) * se`，正好利用这个负号凑出「减一个、加一个」，
比手写 `c(avg - 1.96*se, avg + 1.96*se)` 更省事。

**第 4 小题的答案：完全相同。** `t.test(x)$conf.int` 算的就是同一个公式，
`as.numeric()` 只是把结果里的属性去掉，好和自定义函数的输出对比。
:::

## 实验题 2：方差已知时两正态总体均值差的置信区间

打开 **test1202.R**，完成下面任务。

1. 当方差 $\sigma_1^2$ 和 $\sigma_2^2$ 已知时，两样本均值差的置信区间为：

   - 双侧区间：$\bar{X}-\bar{Y} \mp u_{\alpha/2}\,sd$
   - 右侧区间：$\left[\bar{X}-\bar{Y} + u_{\alpha}\,sd,\ +\infty\right)$
   - 左侧区间：$\left(-\infty,\ \bar{X}-\bar{Y} - u_{\alpha}\,sd\right]$

   其中 $sd = \sqrt{\dfrac{\sigma_1^2}{m} + \dfrac{\sigma_2^2}{n}}$，$u_{\alpha/2}$、$u_{\alpha}$ 为标准正态分布的分位数。

2. 在自定义函数 `fun1202` 中，参数 `sigma1` 和 `sigma2` 表示 $\sigma_1^2$ 和 $\sigma_2^2$，`alt='two.sided'` 表示计算双侧区间，`alt='greater'` 表示计算右侧区间，`alt='less'` 表示计算左侧区间。
3. 自定义函数的返回值为区间端点构成的向量。

<AnswerBlock title="实验题 2 · 参考答案" :code="code1202" />

::: tip 为什么这里用 qnorm 而不是 qt
因为**方差已知**。t 分布之所以出现，是为了补偿「用样本标准差 $S$ 代替总体标准差 $\sigma$」
带来的额外不确定性（自由度 $n-1$ 就是这个补偿的代价）。

一旦 $\sigma$ 已知，就不需要补偿了，直接用**标准正态**分位数 $u$（也就是 1.96 那个数）。

同样地，标准误也跟着变了——两样本均值差的标准误是
$sd=\sqrt{\frac{\sigma_1^2}{m}+\frac{\sigma_2^2}{n}}$，
注意 **m 和 n 各对应自己的方差**，别写反。

> 小细节：答案里用 `ifelse(alt == 'two.sided', qnorm(alpha/2), qnorm(alpha))`
> 把两侧和单侧合并判断——因为单侧不管是 `greater` 还是 `less`，取的都
> 是同一个 $\alpha$ 分位数（负值），后面靠 `+`/`-` 区分左右。
:::

## 实验题 3：均值已知时两正态总体方差比的区间估计

打开脚本文件 **test1203.R**，完成下面任务。

1. 两正态总体的均值 $\mu_1$ 和 $\mu_2$ 已知，其方差比的置信区间为：

   - 双侧区间：$\left[\dfrac{s}{f_{1-\alpha/2}},\ \dfrac{s}{f_{\alpha/2}}\right]$
   - 右侧区间：$\left[\dfrac{s}{f_{1-\alpha}},\ +\infty\right)$
   - 左侧区间：$\left(0,\ \dfrac{s}{f_{\alpha}}\right]$

   其中 $s = \dfrac{\sum_{i=1}^{m}(X_i-\mu_1)^2 / m}{\sum_{i=1}^{n}(Y_i-\mu_2)^2 / n}$，
   $f_{\alpha/2}$、$f_{1-\alpha/2}$、$f_{\alpha}$、$f_{1-\alpha}$ 为 $F(m,n)$ 的分位数。

2. 自定义函数的参数 `mu1` 和 `mu2` 分别表示 $\mu_1$ 和 $\mu_2$，`alt='two.sided'` 表示计算双侧区间，`alt='greater'` 表示计算右侧区间，`alt='less'` 表示计算左侧区间。
3. 自定义函数的返回值为区间端点构成的向量。

<AnswerBlock title="实验题 3 · 参考答案" :code="code1203" />

::: tip F 分布的分位数是「不对称」的
这是本讲最容易出错的地方：**$F$ 分布不是对称分布**，所以
$f_{\alpha/2}$ 和 $f_{1-\alpha/2}$ 必须**分别取**，不能用正负号凑：

```r
# 双侧：一个取大、一个取小
c(qf(1-alpha/2, m, n), qf(alpha/2, m, n))
```

对比 t 分布那边写成 `c(ta, -ta)`——**符号相反**；
F 分布这边换成两个**不同位置**的分位数，一个在左尾、一个在右尾。

代入到区间里还要再取个倒数（`se/fa`），于是大分位数配出小端点、
小分位数配出大端点——顺序天然就是「小到大」，不用额外排序。

> 小提示：题目给的左侧区间下界是 $0$（方差比不可能为负），
> 而答案脚本里写的是 `-Inf`。数学上 $0$ 更严谨，代码里两者都能跑。
:::

## 实验题 4：指数总体参数的区间估计

打开脚本文件 **test1204.R**，完成下面任务。

1. 指数分布参数 $\lambda$ 的置信区间为：

   - 双侧区间：$\left[\dfrac{\chi^2_{\alpha/2}}{S},\ \dfrac{\chi^2_{1-\alpha/2}}{S}\right]$
   - 右侧区间：$\left[\dfrac{\chi^2_{\alpha}}{S},\ +\infty\right)$
   - 左侧区间：$\left(0,\ \dfrac{\chi^2_{1-\alpha}}{S}\right]$

   其中 $\chi^2_{\alpha/2}$、$\chi^2_{1-\alpha/2}$、$\chi^2_{\alpha}$、$\chi^2_{1-\alpha}$ 为 $\chi^2(2n)$ 的分位数。

2. 参数 `alt='two.sided'` 表示计算双侧区间，`alt='greater'` 表示计算右侧区间，`alt='less'` 表示计算左侧区间。
3. 自定义函数的返回值为区间端点构成的向量。

<AnswerBlock title="实验题 4 · 参考答案" :code="code1204" />

::: tip 自由度为什么是 2n，S 为什么是 2n·X̄
指数分布有个漂亮的性质：**若 $X\sim \text{Exp}(\lambda)$，则 $2\lambda X \sim \chi^2(2)$**
（自由度为 2 的卡方分布）。

n 个样本相加，卡方分布的可加性告诉我们：

$$\sum_{i=1}^{n} 2\lambda X_i = 2\lambda\sum_{i=1}^{n}X_i = 2\lambda n\bar{X} \sim \chi^2(2n)$$

把 $\lambda$ 解出来就得到区间公式。所以：

- **自由度是 $2n$**，不是 $n-1$（注意这一点和 t 检验完全不同）。
- 答案里的 `se = 2*n*mean(x)` 正是上面那个 $2n\bar{X}$，对应公式里的 $S$。

**`qt` / `qf` / `qchisq` 的记忆口诀**：函数名里的 `q` 是 quantile（分位数），
后面的字对应分布——`t`→t 分布，`norm`→正态，`f`→F 分布，`chisq`→卡方。
:::

## 本讲小结

| 场景 | 用什么分布的分位数 | 标准误 / 中间量 |
| --- | --- | --- |
| 单正态总体均值，$\sigma$ **未知** | `qt(p, n-1)` | $S/\sqrt{n}$ |
| 两正态总体均值差，$\sigma$ **已知** | `qnorm(p)` | $\sqrt{\sigma_1^2/m+\sigma_2^2/n}$ |
| 两正态总体方差比，$\mu$ **已知** | `qf(p, m, n)` | $s=\dfrac{n\sum(X_i-\mu_1)^2}{m\sum(Y_i-\mu_2)^2}$ |
| 指数总体参数 $\lambda$ | `qchisq(p, 2n)` | $S=2n\bar{X}$ |

**区间方向速记**：

| `alt` | 返回的向量 |
| --- | --- |
| `'two.sided'` | `c(下界, 上界)` |
| `'greater'` | `c(下界, Inf)` —— 右侧区间 |
| `'less'` | `c(-Inf, 上界)` —— 左侧区间 |

::: info 关于本页的题目与答案
题目来自 `资料/原题/第十二周原题`，答案来自 `资料/答案/第十二周答案`（仅修正过其中的错别字）。
原题中的公式为 Word 公式对象，纯文本提取时会串成一团，
本页已按统计学的标准形式用 LaTeX 还原，并与答案脚本的实际计算逐项核对过。
:::

::: tip 想弄懂背后的统计学原理
这一讲把区间估计**用 R 算了出来**；背后的抽样误差、t 分布、可信区间含义与两总体之差，见《卫生统计学》对应的归纳。

详见 **[《卫生统计学》第 6 章　总体均数与总体率的估计](/Health-statistics/06-estimation)**。
:::
