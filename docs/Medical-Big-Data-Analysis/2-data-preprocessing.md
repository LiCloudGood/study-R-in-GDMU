<script setup>
import { withBase } from 'vitepress'

const code0201 = `x = cars
mean(x$speed)
median(x$speed)
which.max(table(x))
max(cars$speed)-min(cars$speed)
var(cars$speed)
sd(cars$speed)
quantile(cars$speed)`

const out0201 = `[1] 15.4
[1] 15
[1] 255
[1] 21
[1] 27.95918
[1] 5.287644
  0%  25%  50%  75% 100% 
   4   12   15   19   25`

const code0202 = `set.seed(1234)
options(digits = 4)
x = rnorm(100,75,9)
mean(x)
var(x)
sd(x)
max(x)-min(x)
quantile(x,0.75)-quantile(x,0.25)
which.max(table(x))
quantile(x)
hist(x,probability = T)
boxplot(x,main = '箱线图',horizontal = T)`

const out0202 = `[1] 73.59
[1] 81.72
[1] 9.04
[1] 44.05
 75% 
12.3 
53.8887206763359 
               1 
   0%   25%   50%   75%  100% 
53.89 66.94 71.54 79.24 97.94`

const code0203 = `install.packages('corrgram')
library(corrgram)
x = stackloss
lbs = c('水流','水温','酸浓','损失氨')
corrgram(x,
         labels = lbs,
         cex.labels = 2,
         font.labels = 3,
         main = 'Brownlee工厂氨转硝酸散点图',
         cex.mian = 2,
         gap = 0.2,
         order = T,
         upper.panel = panel.conf,
         lower.panel = panel.pie)`

const out0203 = `package 'corrgram' successfully unpacked and MD5 sums checked

The downloaded binary packages are in
	<本机临时目录>`

const code0204 = `patients = data.frame(
  ID = c('001','002','003','004','005'),
  name = c("Tukey", "Venables", "Tierney", "Ripley", "McNeil"),
  nationality = c("US", "Australia", "US", "UK", "Australia"),
  ill = c("yes", rep("no", 4)),
  phone=c("15210329344","15210329332","15210323144","18510329344","13492874632")
)
print(patients)
patients<-subset(patients,select=-ID)#参照帮助文档，思考用2种方法删除对应的属性列
print(patients)
patients<-subset(patients,select=-c(name,phone))
print(patients)

patients<-subset(patients,select=c(name,phone))
print(patients)`

const out0204 = `ID     name nationality ill       phone
1 001    Tukey          US yes 15210329344
2 002 Venables   Australia  no 15210329332
3 003  Tierney          US  no 15210323144
4 004   Ripley          UK  no 18510329344
5 005   McNeil   Australia  no 13492874632
      name nationality ill       phone
1    Tukey          US yes 15210329344
2 Venables   Australia  no 15210329332
3  Tierney          US  no 15210323144
4   Ripley          UK  no 18510329344
5   McNeil   Australia  no 13492874632
  nationality ill
1          US yes
2   Australia  no
3          US  no
4          UK  no
5   Australia  no`

const code0205 = `install.packages('infotheo')
library(infotheo)
data = c(1,2,3,4,6,8,10,15,20,25,30,40)
dis_ew = discretize(data,'equalwidth',4)
print(dis_ew)
data_dis_ex = t(rbind(data,dis_ew$X))
dim(dis_ew)
colnames(data_dis_ex) = c('data','index')
print(data_dis_ex)

discretize(data,'equalfreq',4)`

const out0205 = `package 'infotheo' successfully unpacked and MD5 sums checked

The downloaded binary packages are in
	<本机临时目录>
   X
1  1
2  1
3  1
4  1
5  1
6  1
7  1
8  2
9  2
10 3
11 3
12 4
[1] 12  1
      data index
 [1,]    1     1
 [2,]    2     1
 [3,]    3     1
 [4,]    4     1
 [5,]    6     1
 [6,]    8     1
 [7,]   10     1
 [8,]   15     2
 [9,]   20     2
[10,]   25     3
[11,]   30     3
[12,]   40     4
   X
1  1
2  1
3  1
4  2
5  2
6  2
7  3
8  3
9  3
10 4
11 4
12 4`

const code0206 = `set.seed(0)
data1 <- data.frame(rnorm(10))
set.seed(1)
data2 <- data.frame(rnorm(10,100,0.2))
set.seed(2)
data3 <- data.frame(rnorm(10,30,0.5))
data <- cbind(data1,data2,data3)
b1 <- (data[, 1] - min(data[, 1])) / (max(data[, 1]) - min(data[, 1]))
b2 <- (data[, 2] - min(data[, 2])) / (max(data[, 2]) - min(data[, 2]))
b3 <- (data[, 3] - min(data[, 3])) / (max(data[, 3]) - min(data[, 3]))
data_scatter <- cbind(b1, b2, b3)
names(data_scatter)=c('X1','X2','X3')
View(data_scatter)`

const code0207 = `set.seed(0)
data1<-data.frame(rnorm(10))
set.seed(1)
data2<-data.frame(rnorm(10,100,0.2))
set.seed(2)
data3<-data.frame(rnorm(10,30,0.5))
data<-cbind(data1,data2,data3)
b1 <- (data[, 1] - min(data[, 1])) / (max(data[, 1]) - min(data[, 1]))
b2 <- (data[, 2] - min(data[, 2])) / (max(data[, 2]) - min(data[, 2]))
b3 <- (data[, 3] - min(data[, 3])) / (max(data[, 3]) - min(data[, 3]))
data_scatter <- cbind(b1, b2, b3)
names(data_scatter)=c('X1','X2','X3')
View(data_scatter)

names(data)=c('b1','b2','b3')
scale(data,center=T,scale=T)
i<- ceiling(log10(apply(abs(data),2,max)))
data_dot<- t(t(data)/ 10 ^ i)
View(data_dot)`

const out0207 = `b1      b2       b3
 [1,]  0.75002 -0.9719 -1.12495
 [2,] -0.56844  0.0659 -0.02670
 [3,]  0.80548 -1.2399  1.39768
 [4,]  0.75788  1.8743 -1.36197
 [5,]  0.04623  0.2528 -0.29584
 [6,] -1.57539 -1.2205 -0.07993
 [7,] -1.06816  0.4551  0.50437
 [8,] -0.54229  0.7765 -0.45772
 [9,] -0.30256  0.5683  1.80035
[10,]  1.69723 -0.5606 -0.35527
attr(,"scaled:center")
      b1       b2       b3 
  0.3589 100.0264  30.1056 
attr(,"scaled:scale")
    b1     b2     b3 
1.2053 0.1561 0.4925`
</script>

---
layout: doc
title: 2-数据预处理
---

# 第 2 周　数据预处理

> 《医学大数据分析与决策》第 2 周实验。
> 题目整理自课程课件，参考答案与运行结果都是在本机实际跑出来的。

## 本讲内容

- **实验题 1**　(中心趋势度量与散度度量常用函数）
- **实验题 2**
- **实验题 3**　相关分析
- **实验题 4**　属性列处理
- **实验题 5**　等宽与等频分箱法
- **实验题 6**　最小最大规范化
- **实验题 7**　Z-score规范化、小数定标规范化

::: warning 动手之前：先把这一讲要用的 R 包装好

这一讲的脚本会用到下面这些包。**没装的话脚本会在 `library()` 那一步直接报错。**

`corrgram`、`infotheo`

装法（在 RStudio 的控制台里跑一次就行）：

```r
install.packages(c("corrgram", "infotheo"))
```

> 如果手头已经有下载好的包文件，也可以指定本地路径装：
> `install.packages("路径/包名.zip", repos = NULL, type = "win.binary")`
:::

## 实验题 1　(中心趋势度量与散度度量常用函数）


- 创建R脚本文件test0201.R，完成下面任务后把该脚本文件保存在e:/test02文件夹下。
  - 使用数据集是R语言自带的cars数据(汽车的速度与刹车距离）
  - 使用中心趋势度量相关函数”mean,median, which.max(table(x))”分别计算cars数据框的speed列的均值、中位数与众数。
  - 使用max与min函数计算cars$speed极差
  - 使用var函数计算cars$speed方差
  - 使用sd函数计算cars$speed标准差
  - 使用quantile、fivenum或summary函数中任一个计算cars$speed的四分位数


<AnswerBlock title="实验题 1 · 参考答案"
  :code="code0201"
  :output="out0201" />

## 实验题 2


- 创建R脚本文件test0202.R，完成下面任务后把该脚本文件保存在e:/test02文件夹下。
- 假定某校100名女生的血清总蛋白含量(g/L)服从均值为75, 标准差为3的正态分布，并假定数据由下面的命令产生
  - set.seed(1234),
  - options(digits=4)
  - rnorm(100,75,9)
- 根据产生的数据
  - 计算样本均值、方差、标准差、极差、四分位极差、众数和五数概括;
  - 画出直方图，箱线图


<AnswerBlock title="实验题 2 · 参考答案"
  :code="code0202"
  :output="out0202"
  :images="['/figures/mbd/2/plot-01.png', '/figures/mbd/2/plot-02.png']" />

## 实验题 3　相关分析


- 创建R脚本文件test0203.R，完成下面任务后把该脚本文件保存在e:/test02文件夹下。
- 本题使用的数据集是stackloss.
  - (1) 用默认参数多变量相关矩阵图，要求
    - 设置变量名（对角线上文本）字体大小为2倍
    - 设置变量名（对角线上文本）字形为斜体
    - 设置图形标题的字体大小为2
    - 面板间的距离为0.2
    - 用主分量法对变量进行排序
    - 设置上三角面板为panel. conf，下三角面板为panel.pie
  - (2)用cor函数验证图中相关系数（此题无代码）。

- install.packages(&quot;corrgram&quot;)
- library(corrgram)
- lbs &lt;- c(&quot;气流&quot;,&quot;水温&quot;,&quot;酸浓&quot;,&quot;损失氨&quot;)
- corrgram(stackloss,
- labels = lbs,
- cex.labels = 2,
- font.labels = 3,
- main = &quot;Brownlee工厂氨转硝酸散点图&quot;,
- cex.main = 2,
- gap = 0.2,
- order = T,
- upper.panel = panel.conf,
- lower.panel = panel.pie
- )


<AnswerBlock title="实验题 3 · 参考答案"
  description="这一题需要 `corrgram`。"
  :code="code0203"
  :output="out0203"
  :images="['/figures/mbd/2/plot-02.png', '/figures/mbd/2/plot-03.png']" />

## 实验题 4　属性列处理


- 创建R脚本文件test0204.R，完成下面任务后把该脚本文件保存在e:/test02文件夹下。
- 删除相应属性列
  - patients &lt;- data.frame(
  - ID=c(&quot;001&quot;,&quot;002&quot;,&quot;003&quot;,&quot;004&quot;,&quot;005&quot;),
  - name = c(&quot;Tukey&quot;, &quot;Venables&quot;, &quot;Tierney&quot;, &quot;Ripley&quot;, &quot;McNeil&quot;),
  - nationality = c(&quot;US&quot;, &quot;Australia&quot;, &quot;US&quot;, &quot;UK&quot;, &quot;Australia&quot;),
  - ill = c(&quot;yes&quot;, rep(&quot;no&quot;, 4)),
  - phone=c(&quot;15210329344&quot;,&quot;15210329332&quot;,&quot;15210323144&quot;,&quot;18510329344&quot;,&quot;13492874632&quot;)
  - )
  - print(patients)
  - patients&lt;-subset(patients,select=-ID)#参照帮助文档，思考用2种方法删除对应的属性列
  - print(patients)
  - patients&lt;-subset(patients,select=-c(name,phone))
  - print(patients)
- 选择相应的属性列
  - patients&lt;-subset(patients,select=c(name,phone))
  - print(patients)


<AnswerBlock title="实验题 4 · 参考答案"
  :code="code0204"
  :output="out0204" />

::: details 这个脚本会中途报错（原资料如此，未做改动）

```
object 'name' not found
```

:::

## 实验题 5　等宽与等频分箱法


- 创建R脚本文件test0205.R，完成下面任务后把该脚本文件保存在e:/test02文件夹下。
- 安装infotheo包，将data数据等宽分箱，代码如下：
  - install.packages(&quot;infotheo&quot;)
  - library(infotheo)
  - data=c(1,2,3,4,6,8,10,15,20,25,30,40)
  - dis_ew&lt;-discretize(data,&quot;equalwidth&quot;,4)
  - print(dis_ew)
  - data_dis_ew=t(rbind(data,dis_ew$X))
  - dim(data_dis_ew)
  - colnames(data_dis_ew)=c('data','index')
  - print(data_dis_ew)
  - 参照以上代码，将data数据等频分箱（相应代码改为discretize(data,“equalfreq”,4)）


<AnswerBlock title="实验题 5 · 参考答案"
  description="这一题需要 `infotheo`。"
  :code="code0205"
  :output="out0205" />

## 实验题 6　最小最大规范化


- 创建R脚本文件test0206.R，完成下面任务后把该脚本文件保存在e:/test02文件夹下。
- 随机产生一个数据框，其中第一列为10个服从正态分布的随机数；第二列为产生10个均值是100，标准差为0.2的正态分布的随机数；第三列为产生10个均值是30，标准差为0.5的正态分布的随机数，并将它规范化到区间[0,1]区间。代码如下：

- set.seed(0)
- data1&lt;-data.frame(rnorm(10))
- set.seed(1)
- data2&lt;-data.frame(rnorm(10,100,0.2))
- set.seed(2)
- data3&lt;-data.frame(rnorm(10,30,0.5))
- data&lt;-cbind(data1,data2,data3)
- b1 &lt;- (data[, 1] - min(data[, 1])) / (max(data[, 1]) - min(data[, 1]))
- b2 &lt;- (data[, 2] - min(data[, 2])) / (max(data[, 2]) - min(data[, 2]))
- b3 &lt;- (data[, 3] - min(data[, 3])) / (max(data[, 3]) - min(data[, 3]))
- data_scatter &lt;- cbind(b1, b2, b3)
- names(data_scatter)=c('X1','X2','X3')
- View(data_scatter)


<AnswerBlock title="实验题 6 · 参考答案"
  :code="code0206" />

## 实验题 7　Z-score规范化、小数定标规范化


- 创建R脚本文件test0207.R，完成下面任务后把该脚本文件保存在e:/test02文件夹下。
- 采用scale函数将上例data数据框z-score规范化
  - names(data)=c('b1','b2','b3')
  - scale(data,center=T,scale=T)
- 将上例data数据框小数定标规范化
  - i&lt;- ceiling(log10(apply(abs(data),2,max)))
  - data_dot&lt;- t(t(data)/ 10 ^ i)
  - View(data_dot)


<AnswerBlock title="实验题 7 · 参考答案"
  :code="code0207"
  :output="out0207" />

## 运行环境

本页的「运行结果」是把这一周的全部脚本**在同一个 R 会话里按顺序执行**得到的
（还原在 RStudio 里一道一道做的过程），因此后面的脚本可以用到前面定义的变量。

::: tip 自己做的时候
先照着题目自己写一遍，写不出来再看参考答案 —— 答案默认是收起来的。
跑之前记得把工作目录设到数据文件所在的那个文件夹。
:::
