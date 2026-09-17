---
layout: doc
title: 8-神经网络
---

<script setup>
import { withBase } from 'vitepress'

const code0801 = `library(neuralnet)
bcancer = read.csv('breastCacer2.csv')
bcancer2 = bcancer[complete.cases(bcancer),]
bc.nolabel = bcancer2[,1:9]
set.seed(1)

index = sample(nrow(bc.nolabel),nrow(bc.nolabel)*0.7)
bctrain = bc.nolabel[index,]
bctest = bc.nolabel[-index,]
bctrain.label = bcancer2[index,10]
bctest.label = bcancer2[-index,10]
bc.train = cbind(bctrain,'Class'=bctrain.label)

net.bc = neuralnet(
  Class ~ CT+UCSize+UCShape+MA+SECS+BN+BC+NN+Mitoses,
  data = bc.train,
  hidden = 4,
  stepmax = 1e+6,
  learningrate = 0.001,
  algorithm = 'backprop',
  err.fct = 'sse',
  act.fct = 'tanh'
)

plot(net.bc)

bctrain.predicted = ifelse(unlist(net.bc$net.result)>0.5,1,0)
table(bctrain.label,bctrain.predicted)

bctest.outputs = predict(net.bc,bctest)
bctest.predicted = ifelse(bctest.outputs>0.5,1,0)
table(bctest.label,bctest.predicted)`

const out0801 = `bctrain.predicted
bctrain.label   0   1
            0 304   3
            1   1 170
            bctest.predicted
bctest.label   0   1
           0 132   5
           1  10  58`

const code0802 = `library(neuralnet)
bcancer = read.csv('breastCacer2.csv')
bcancer2 = bcancer[complete.cases(bcancer),]
bc.nolabel = bcancer2[,1:9]
set.seed(1)

index = sample(nrow(bc.nolabel),nrow(bc.nolabel)*0.7)
bctrain = bc.nolabel[index,]
bctest = bc.nolabel[-index,]
bctrain.label = bcancer2[index,10]
bctest.label = bcancer2[-index,10]
bc.train = cbind(bctrain,'Class'=bctrain.label)

net.bc = neuralnet(
  Class ~ CT+UCSize+UCShape+MA+SECS+BN+BC+NN+Mitoses,
  data = bc.train,
  hidden = 4,
  stepmax = 1e+6,
  learningrate = 0.001,
  algorithm = 'backprop',
  err.fct = 'sse',
  act.fct = 'tanh'
)

plot(net.bc)

bctrain.predicted = ifelse(unlist(net.bc$net.result)>0.5,1,0)
table(bctrain.label,bctrain.predicted)
# 计算训练集准确率
train_accuracy <- sum(diag(table(bctrain.label, bctrain.predicted))) / length(bctrain.label)
cat("训练集准确率：", train_accuracy, "\\n")
bctest.outputs = predict(net.bc,bctest)
bctest.predicted = ifelse(bctest.outputs>0.5,1,0)
table(bctest.label,bctest.predicted)
# 计算测试集准确率
test_accuracy <- sum(diag(table(bctest.label, bctest.predicted))) / length(bctest.label)
cat("测试集准确率：", test_accuracy, "\\n")`

const out0802 = `bctrain.predicted
bctrain.label   0   1
            0 304   3
            1   1 170
训练集准确率： 0.9916318 
            bctest.predicted
bctest.label   0   1
           0 132   5
           1  10  58
测试集准确率： 0.9268293`

const code0803 = `library(neuralnet)
bcancer = read.csv('breastCacer2.csv')
bcancer2 = bcancer[complete.cases(bcancer),]
bc.nolabel = bcancer2[,1:9]
set.seed(1)

index = sample(nrow(bc.nolabel),nrow(bc.nolabel)*0.7)
bctrain = bc.nolabel[index,]
bctest = bc.nolabel[-index,]
bctrain.label = bcancer2[index,10]
bctest.label = bcancer2[-index,10]
bc.train = cbind(bctrain,'Class'=bctrain.label)

learningrate.test = c(0.1,0.05,0.01,0.005,0.001)
time.cost = numeric(length(learningrate.test))   
for (learningrate in learningrate.test){         
  t1 = proc.time()
  net.bc = neuralnet(
    Class ~ CT+UCSize+UCShape+MA+SECS+BN+BC+NN+Mitoses,
    data = bc.train,
    hidden = 4,
    stepmax = 1e+6,
    learningrate = learningrate,   # 原固定0.001，改为循环变量
    algorithm = 'rprop+',
    err.fct = 'sse',
    act.fct = 'tanh'
  )
  t2 = proc.time()
  time.cost[learningrate==learningrate.test] = (t2-t1)[3]  
  print(paste0('执行时间:',(t2-t1)[3],'秒'))               
}

plot(learningrate.test, time.cost,
     type = "o",                # 折线+点
     pch  = 16,                 # 实心圆点
     xlab = "学习率",
     ylab = "时间（秒）",
     main = "不同学习率下的训练耗时")`

const out0803 = `[1] "执行时间:0.27000000000001秒"
[1] "执行时间:0.259999999999991秒"
[1] "执行时间:0.580000000000013秒"
[1] "执行时间:0.97999999999999秒"
[1] "执行时间:0.830000000000013秒"`

const code0804 = `library(neuralnet)

# 1. 读数据、清洗、划分
bcancer       <- read.csv('breastCacer2.csv')
bcancer2      <- bcancer[complete.cases(bcancer), ]
bc.nolabel    <- bcancer2[, 1:9]
set.seed(1)
index         <- sample(nrow(bc.nolabel), nrow(bc.nolabel)*0.7)
bctrain       <- bc.nolabel[index, ]
bctest        <- bc.nolabel[-index, ]
bctrain.label <- bcancer2[index, 10]
bctest.label  <- bcancer2[-index, 10]
bc.train      <- as.data.frame(cbind(bctrain, Class = bctrain.label))
bctest        <- as.data.frame(bctest)

# 2. 不同隐藏神经元个数训练 & 记录准确率
hidden.vec <- 2:10
train.acc  <- numeric(length(hidden.vec))
test.acc   <- numeric(length(hidden.vec))

for (i in seq_along(hidden.vec)){
  h <- hidden.vec[i]
  net.bc <- neuralnet(
    Class ~ CT + UCSize + UCShape + MA + SECS + BN + BC + NN + Mitoses,
    data         = bc.train,
    hidden       = h,
    stepmax      = 1e+6,
    learningrate = 0.01,
    algorithm    = "rprop+",
    err.fct      = "sse",
    act.fct      = "tanh"
  )
  
  train.pred <- as.numeric(unlist(net.bc$net.result) > 0.5)
  test.pred  <- as.numeric(unlist(predict(net.bc, bctest)) > 0.5)
  
  train.acc[i] <- mean(train.pred == bctrain.label)
  test.acc[i]  <- mean(test.pred  == bctest.label)
}

# 3. 画图
plot(hidden.vec, train.acc, type = "o", pch = 16,
     xlab = "神经元个数", ylab = "训练集正确率",
     main = "图1：训练集正确率的变化曲线")

plot(hidden.vec, test.acc,  type = "o", pch = 15,
     xlab = "神经元个数", ylab = "测试集正确率",
     main = "图2：测试集正确率的变化曲线")`

const code0899____ = `library(neuralnet)
library(Metrics)  


df <- read.csv("data.csv")
df <- na.omit(df)                



n <- nrow(df)
train <- df[1:round(0.7*n), ]
test  <- df[(round(0.7*n)+1):n, ]


nn <- neuralnet(x6 ~ x1 + x2 + x3 + x4 + x5,
                data   = train,
                hidden = 3,        
                learningrate = 0.01,
                linear.output = TRUE,   
                act.fct = "tanh",
                algorithm = "backprop",
                stepmax = 1e6)

# 4. 预测 + 评价
pred <- predict(nn, test)
R2   <- cor(pred, test$x6)^2
RMSE <- rmse(test$x6, pred)

cat(sprintf("R² = %.3f   RMSE = %.3f\\n", R2, RMSE))

# 5. 真实 vs 预测散点
plot(test$x6, pred,
     xlab = "实测菌体干重", ylab = "预测菌体干重",
     main = sprintf("R² = %.3f  RMSE = %.3f", R2, RMSE))
abline(0, 1, col = "red")`

const out0899____ = `R² = 0.330   RMSE = 0.101`
</script>


# 第 8 周　神经网络

> 《医学大数据分析与决策》第 8 周实验。
> 题目整理自课程课件，参考答案与运行结果都是在本机实际跑出来的。

## 本讲内容

- **实验题 1**
- **实验题 2**
- **实验题 3**
- **实验题 4**

::: warning 动手之前：先把这一讲要用的 R 包装好

这一讲的脚本会用到下面这些包。**没装的话脚本会在 `library()` 那一步直接报错。**

`Metrics`、`neuralnet`

装法（在 RStudio 的控制台里跑一次就行）：

```r
install.packages(c("Metrics", "neuralnet"))
```

> 如果手头已经有下载好的包文件，也可以指定本地路径装：
> `install.packages("路径/包名.zip", repos = NULL, type = "win.binary")`
:::

## 实验题 1


- 创建R脚本文件test0801.R，完成下面任务后把该脚本文件保存在e:/test08文件夹下。
  - 本例采用R语言中neuralnet神经网络包来对乳腺癌的数据进行一个分类操作，主要根据前面10个描述属性（去掉第1列的ID属性）用神经网络产生一个分类模型来判断每个样本是良性肿瘤（Benign Tumor）还是恶性肿瘤（Malignancy Tumor）。


题目给出的训练数据是 `breastCacer2.csv`：699 行、10 列，前 9 列是 9 个描述属性
（`CT`、`UCSize`、`UCShape`、`MA`、`SECS`、`BN`、`BC`、`NN`、`Mitoses`），
第 10 列 `Class` 就是该样本的分类标签（`0` = 良性肿瘤，`1` = 恶性肿瘤）。
读入并查看这份数据：

```r
bcancer <- read.csv('breastCacer2.csv')
dim(bcancer)                        # 699 行 × 10 列
head(bcancer, 10)                   # 前 10 行，见下表
bcancer2 <- bcancer[complete.cases(bcancer), ]
dim(bcancer2)                       # 683 行 × 10 列：丢掉 16 行在 BN 列上缺测的记录
```

前 10 行长这样：

| 序号 | CT | UCSize | UCShape | MA | SECS | BN | BC | NN | Mitoses | Class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 5 | 1 | 1 | 1 | 2 | 1 | 3 | 1 | 1 | 0 |
| 2 | 5 | 4 | 4 | 5 | 7 | 10 | 3 | 2 | 1 | 0 |
| 3 | 3 | 1 | 1 | 1 | 2 | 2 | 3 | 1 | 1 | 0 |
| 4 | 6 | 8 | 8 | 1 | 3 | 4 | 3 | 7 | 1 | 0 |
| 5 | 4 | 1 | 1 | 3 | 2 | 1 | 3 | 1 | 1 | 0 |
| 6 | 8 | 10 | 10 | 8 | 7 | 10 | 9 | 7 | 1 | 1 |
| 7 | 1 | 1 | 1 | 1 | 2 | 10 | 3 | 1 | 1 | 0 |
| 8 | 2 | 1 | 2 | 1 | 2 | 1 | 3 | 1 | 1 | 0 |
| 9 | 2 | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 5 | 0 |
| 10 | 4 | 2 | 1 | 1 | 2 | 1 | 2 | 1 | 1 | 0 |


<AnswerBlock title="实验题 1 · 参考答案"
  description="这一题需要 `neuralnet`。"
  :code="code0801"
  :output="out0801"
  :images="['/figures/mbd/8/dev-01.png']" />

## 实验题 2


- 创建R脚本文件test0802.R，完成下面任务后把该脚本文件保存在e:/test08文件夹下。
  - 为上例中程序增加求训练集与测试集混淆矩阵正确率并输出的代码。（上例程序31行与35行后，参照大数据分类实验中的相关代码）。


<AnswerBlock title="实验题 2 · 参考答案"
  description="这一题需要 `neuralnet`。"
  :code="code0802"
  :output="out0802"
  :images="['/figures/mbd/8/dev-02.png']" />

## 实验题 3


- 创建R脚本文件test0803.R，完成下面任务后把该脚本文件保存在e:/test08文件夹下。
  - 将上例中创建的神经网络模型中的参数中的算法改成“rprop+”、学习率分别改成0.1、0.05、0.01、0.005、0.001后计算其程序的运行时间并绘出其曲线（设置x轴标签为“学习率”，y轴为“时间”，设置plot函数中type类型为“o”，绘制点时使用的符号为16）。
  - 计算程序运行时间参考代码如下：
    - t1=proc.time()
    - #程序体
    - t2=proc.time()
    - t=t2-t1
    - print(paste0('执行时间：',t[3],'秒'))


<AnswerBlock title="实验题 3 · 参考答案"
  description="这一题需要 `neuralnet`。"
  :code="code0803"
  :output="out0803" />

## 实验题 4


- 创建R脚本文件test0804.R，完成下面任务后把该脚本文件保存在e:/test08文件夹下。
  - 将上例中创建的神经网络模型中的参数中的算法改成“rprop+”、学习率改成“0.01”、隐藏层神经元的个数分别改成2、3、4、5、6、7、8、9、10，然后重新执行一下上例代码，比较分析一下程序分类正确率的变化情况，并绘制两个图形。
    - 图1：训练集正确率的变化曲线(x轴标签：“神经元个数”，y轴标签：“训练集正确率”，设置plot函数中type类型为“o”，绘制点时使用的符号为16)
    - 图2：测试集正确率的变化曲线(x轴标签：“神经元个数”，y轴标签：“测试集正确率”，设置plot函数中type类型为“o”，绘制点时使用的符号为15)


<AnswerBlock title="实验题 4 · 参考答案"
  description="这一题需要 `neuralnet`。"
  :code="code0804" />

## 补充题

<AnswerBlock title="补充题 · 参考答案（补充题.R）"
  :code="code0899____"
  :output="out0899____" />

## 运行环境

本页的「运行结果」是把这一周的全部脚本**在同一个 R 会话里按顺序执行**得到的
（还原在 RStudio 里一道一道做的过程），因此后面的脚本可以用到前面定义的变量。

::: tip 自己做的时候
先照着题目自己写一遍，写不出来再看参考答案 —— 答案默认是收起来的。
跑之前记得把工作目录设到数据文件所在的那个文件夹。
:::

::: tip 想弄懂背后的统计学原理
这一周要把数据分成训练集与验证集；**样本量与检验效能**之间的取舍，见《卫生统计学》对应的归纳。

详见 **[《卫生统计学》第 17 章　样本含量估计](/Health-statistics/17-sample-size)**。
:::
