---
layout: doc
title: 1-软件及其软件包安装和脚本编写
---

<script setup>
import { ref } from 'vue'

const showDownload = ref(false)

const code0103 = `setwd("e:/test01")
install.packages("vioplot_0.4.0.tar.gz", repos = NULL)
library(vioplot)
vioplot(mtcars$wt[mtcars$cyl==4],
        mtcars$wt[mtcars$cyl==6],
        mtcars$wt[mtcars$cyl==8],
        horizontal = TRUE,
        col = 'red')`
</script>

# 软件及其软件包安装和脚本编写

## 题目一：RGUI和RStudio的安装与配置

请在自己的电脑上安装R软件与RStudio。

<button class="ans-btn" @click="showDownload = !showDownload">{{ showDownload ? '隐藏' : '显示' }} 下载连接</button>
<div class="ans-box" v-show="showDownload">

**官方下载**<br>
 RGUI: <a href="https://cran.r-project.org/mirrors.html" target="_blank">https://cran.r-project.org/mirrors.html</a><br>
 RStudio: <a href="https://posit.co/download/rstudio-desktop/" target="_blank">https://posit.co/download/rstudio-desktop/</a><br>
<br>
**安装注意事项**<br>
 请根据你的操作系统（Windows/macOS/Linux）选择对应的版本进行下载安装<br> 安装RStudio前必须先安装RGUI，否则RStudio无法正常工作
</div>

## 题目二：工作路径设置

1. 检查是否在Github下载了完整的资料，并在E盘新建一个名为test01的文件夹。
2. 运行RStudio，点击“Tools”->“Global Options”，设置默认工作目录（Default working directory）为“E\test01”。
3. 用getwd()观察当前工作目录。
4. 重启RStudio，用getwd()观察当前工作目录。
5. 在RStudio主界面中，点击“File”->“New File”->“R Script”，创建一个新的R脚本文件，并保存为test0102.R。
6. 在脚本文件中，输入以下代码：

```r
# 检查R版本
version
```

7. 观察E:\test01下是否有test0101.R文件？在命令窗口中运行：

```r
source("test0102.R")
```

8. 在命令窗口中，运行setwd("E:/")，再运行source("test0102.R")，观察是否有错误？想相为什么不能运行？

<ClickAnswer>
因为当前工作目录已经被改为 E 盘根目录，而 test0102.R 文件在 E 盘的 test01 文件夹下，所以找不到该文件，报错。
</ClickAnswer>

9. 在命令窗口中，运行source('E:/test01/test0102.R')，想想为什么此时能运行？

<ClickAnswer>
因为此时使用了文件的绝对路径，所以不受当前工作目录的影响，能正确找到并运行该文件。
</ClickAnswer>

## 题目三：安装包

1. 打开RStudio，用dir()查看当前工作目录下是否有文件“ISwR_2.0-8.tar.gz”和“vioplot_0.4.0.tar.gz”
2. 单击“Tools”->“Install Packages”，然后从“ISwR_2.0-8.tar.gz”中安装ISwR包
3. 先在命令窗口中运行setwd("e:/test01")，然后用安装函数install.packages从“vioplot_0.4.0.tar.gz”中安装vioplot包。
4. 点击“File”->“New File”->“R Script”，创建一个新的R脚本文件test0103.R。请输入以下代码：

```r
install.packages('vioplot_0.4.0.tar.gz',
                 repos = NULL)
library(vioplot)
vioplot(mtcars$wt[mtcars$cyl==4],
        mtcars$wt[mtcars$cyl==6],
        mtcars$wt[mtcars$cyl==8],
        horizontal = TRUE,
        col = 'red')
```

5. 运行上面脚本，观察运行结果。

<AnswerBlock
  title="题目三：安装包 · 运行答案"
  description="点击“运行”后会在浏览器里真实执行这份 R 代码（首次需要下载约 10 MB 的 WebR 运行环境）"
  :code="code0103"
/>

## 题目四：使用帮助

1. 创建脚本文件test0104.R
2. 输入下面代码：

```r
?seq
help("rep")
?matrix
?read.csv
```

3. 逐行运行上面脚本，观察帮助窗口的变化，并仔细阅读帮助窗口中的内容。

## 题目五：赋值语句

1. 创建R脚本文件test0105.R。
2. 输入以下代码：

```r
# 常量赋值
constant <- "Hello!"
constant
# 变量赋值
a <- 5
print(a)
b <- 10; print(b)
(c = TRUE)
d = FALSE; d
e = 1e-2
print(e)
(f = 1.4E+3)
```

## 题目六：R表达式的书写

1. 在RStudio中，创建脚本文件test0106.R。
2. 输入以下代码：

```r
# 算术运算符
c <- 5 + 3
print(c)
(d <- 10 - 2)
e <- 2 * 4; e
# 比较运算符
f <- 5 > 3
f
g <- 10 < 5
g
h <- 5 >= 5
h
'a' < 'A'
'ab' < 'A'
'李' < '张'
# 逻辑运算符
i <- TRUE && FALSE
print(i)
j <- TRUE || FALSE
print(j)
k <- !TRUE
print(k)
# 模与整数除
23/4
23 %/% 4
23 %% 4
-23%%4
23%%-4
-23%%-4
```

3. 逐行运行，观察运行结果。

## 题目七：R表达式的书写

1. 创建脚本文件test0107.R。
2. 用赋值语句定义变量a、b、c，即给变量赋值，且值分别为2、5、-1。
3. 计算表达式 $\dfrac{-b+\sqrt{b^{2}-4ac}}{2a}$ 和 $\dfrac{\sin(b-ac)}{3a+bc}$ 的值。

::: tip 提示
算术根函数是 `sqrt`，例如 $\sqrt{2}$ 的 R 表示为 `sqrt(2)`。
:::

<style scoped>
.ans-btn {
  background: var(--vp-c-brand);
  color: #fff;
  border: 0;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ans-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px #00000026;
}

.ans-box {
  margin-top: 12px;
  padding: 14px 18px;
  border-left: 4px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  border-radius: 0 6px 6px 0;
  line-height: 1.8;
  font-size: 14px;
}
</style>
