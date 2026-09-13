<script setup>
import { withBase } from 'vitepress'

const code0101 = `x <- rep(c(3, 2, 1), times = c(3, 4, 5))
A <-matrix(1:16,4)
B <-matrix(1:16,4,byrow = T) 
C = A+B
D = A *B
E = A%*%B
E = A[-3,]%*%B[,-3]`

const code0102 = `A = matrix(c(1,2,3,4,5,6,7,8,10),ncol = 3,byrow = T)
b = matrix(c(1,1,1),ncol = 1)
solve(A)%*%b`

const out0102 = `[,1]
[1,] -1.000000e+00
[2,]  1.000000e+00
[3,]  4.440892e-16`

const code0103 = `info = data.frame('序号' = 1:10,
                  '性别' = c(rep('F',5),rep('M',5)),
                  '年龄' = c(14,16,15,17,15,14,16,14,15,16),
                  '身高cm' = c(156,158,161,156,153,162,157,159,163,165),
                  '体重kg' = c(42.3,45.0,48.5,51.5,44.6,48.8,46.7,49.9,50.2,53.7)
                  )

print(info)

write.table(info,file = 'info.text')
read.table('info.text')

write.csv(info,file = 'info.csv')
read.csv('info.csv')`

const out0103 = `序号 性别 年龄 身高cm 体重kg
1     1    F   14    156   42.3
2     2    F   16    158   45.0
3     3    F   15    161   48.5
4     4    F   17    156   51.5
5     5    F   15    153   44.6
6     6    M   14    162   48.8
7     7    M   16    157   46.7
8     8    M   14    159   49.9
9     9    M   15    163   50.2
10   10    M   16    165   53.7
   序号 性别 年龄 身高cm 体重kg
1     1    F   14    156   42.3
2     2    F   16    158   45.0
3     3    F   15    161   48.5
4     4    F   17    156   51.5
5     5    F   15    153   44.6
6     6    M   14    162   48.8
7     7    M   16    157   46.7
8     8    M   14    159   49.9
9     9    M   15    163   50.2
10   10    M   16    165   53.7
    X 序号 性别 年龄 身高cm 体重kg
1   1    1    F   14    156   42.3
2   2    2    F   16    158   45.0
3   3    3    F   15    161   48.5
4   4    4    F   17    156   51.5
5   5    5    F   15    153   44.6
6   6    6    M   14    162   48.8
7   7    7    M   16    157   46.7
8   8    8    M   14    159   49.9
9   9    9    M   15    163   50.2
10 10   10    M   16    165   53.7`

const code0104 = `info = read.csv('wh.csv',header = T, fileEncoding = 'UTF-8')  #（1）读入数据
print(info)  #（2）显示数据

#(3） 体重对身高散点图
plot(info$体重~info$身高,main = '体重对身高散点图')

# 绘制不同性别下, 体重对身高的散点图
coplot(info$体重~info$身高|info$性别)

# （4）绘制不同年龄阶段, 体重对身高的散点图
coplot(info$体重~info$身高|info$年龄)

# (5)绘制不同性别和不同年龄阶段, 体重对身高的散点图
coplot(info$体重~info$身高|info$性别+info$年龄)`

const out0104 = `X 序号 性别 年龄 身高 体重
1   1    1    F   18  166   54
2   2    2    F   18  165   58
3   3    3    F   19  154   50
4   4    4    F   18  160   47
5   5    5    F   20  162   46
6   6    6    F   19  153   48
7   7    7    F   21  156   50
8   8    8    F   20  152   49
9   9    9    F   21  170   57
10 10   10    F   20  156   52
11 11   11    M   18  168   61
12 12   12    M   18  166   55
13 13   13    M   19  172   63
14 14   14    M   18  178   68
15 15   15    M   20  169   59
16 16   16    M   19  180   65
17 17   17    M   21  177   59
18 18   18    M   20  168   56
19 19   19    M   21  182   69
20 20   20    M   20  170   61`

const code0105 = `data(airquality)
aq = na.omit(airquality)
boxplot(Temp~Month,
        data = aq,
        width = c(1:5),
        col = rainbow(5,s = 0.5,alpha = 0.7),
        range =0.8,
        staplelwd = 0.8,
        cex.main = 1.5)`
</script>

---
layout: doc
title: 1-R的使用及数据获取
---

# 第 1 周　R的使用及数据获取

> 《医学大数据分析与决策》第 1 周实验。
> 题目整理自课程课件，参考答案与运行结果都是在本机实际跑出来的。

## 本讲内容

- **实验题 1**
- **实验题 2**
- **实验题 3**
- **实验题 4**
- **实验题 5**　（箱线图）
- **实验题 6**（原始资料里没有对应脚本）

::: tip 这一讲不用装额外的包

第 1 周只用 R 自带的函数（`rep`、`matrix`、`solve`、`read.csv`、`plot`、`boxplot` 等），
不需要 `install.packages()`。**从第 2 周开始才需要装包**，每一讲都会列出来。
:::

## 实验题 1


- 创建R脚本文件test0101.R，完成下面任务后把该脚本文件保存在e:/test01文件夹下。
  - 用函数rep()构造一个向量x，它由3个3，4个2，5个1组成
  - 由1,2,…16构造二个方阵，其中矩阵A按列输入，矩阵B按行输入，并计算：
    - (1)C=A+B;
    - (2)D=A.*B;
    - (3)E=AB;
    - (4)去除A的第3行，B的第3列，重新计算上面的矩阵E


<AnswerBlock title="实验题 1 · 参考答案"
  :code="code0101" />

## 实验题 2


- 创建R脚本文件test0102.R，完成下面任务后把该脚本文件保存在e:/test01文件夹下。
  - 函数solve()有二个作用：solve(A,b)可用于求解 线性方程组Ax=b，solve(A)可用于求矩阵的逆。设
  - 请用二种方法编程求方程组Ax=b的解。


<img :src="withBase('/figures/mbd/1/q-第04页-image1.png')" alt="第 4 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 2 · 参考答案"
  :code="code0102"
  :output="out0102" />

## 实验题 3


- 创建R脚本文件test0103.R，完成下面任务后把该脚本文件保存在e:/test01文件夹下。
- 有10名学生的身高与体重数据如下表所示。


<img :src="withBase('/figures/mbd/1/q-第05页-image2.png')" alt="第 5 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


- 根据上表，完成以下操作：
  - 创建名为info的数据框
  - 将该数据框写入一个纯文本的文件中，并用read.table()读取该文件中的数据
  - 将该数据框用write.csv()写成excel能打开的文件，并测试是否成功。


<AnswerBlock title="实验题 3 · 参考答案"
  :code="code0103"
  :output="out0103" />

## 实验题 4


- 打开R脚本文件test0104.R，完成以下操作后将该脚本文件保存在e:/test01文件夹下。
- 某校测得20名学生的四项指标: 性别、年龄、身高(cm)和体重(kg),数据存储于wh.csv中。
  - 1) 绘制体重对身高的散点图;
  - 2) 绘制不同性别下, 体重对身高的散点图;
  - 3) 绘制不同年龄阶段, 体重对身高的散点图;
  - 4) 绘制不同性别和不同年龄阶段, 体重对身高的散点图.


<AnswerBlock title="实验题 4 · 参考答案"
  :code="code0104"
  :output="out0104"
  :images="['/figures/mbd/1/plot-01.png', '/figures/mbd/1/plot-02.png', '/figures/mbd/1/plot-03.png', '/figures/mbd/1/plot-04.png']" />

## 实验题 5　（箱线图）


- 创建R脚本文件test0105.R，使用boxplot函数完成下面任务后把该脚本文件保存在e:/test01文件夹下。
  - ⑴ airquality是1973年纽约空气质量数据，请不要使用函数关系绘制每个月的温度箱线图（即Temp），要求产生删除数据框中的缺失值
    - 箱子的宽度分别为1,2,3,4,5
    - 使用rainbow函数产生5个颜色填充，其中rainbow的其他参数s=0.5,alpha = 0.7
    - range设置为0.8
    - staple线的宽度设置为0.8
    - 图标题的字体大小设置为1.5


<AnswerBlock title="实验题 5 · 参考答案"
  :code="code0105"
  :images="['/figures/mbd/1/plot-04.png', '/figures/mbd/1/plot-05.png']" />

## 实验题 6


- 下载TCGA数据库中的结肠癌临床数据，并整理成表格形式(参考TCGA下载文档)
- 下载PIC儿童重症监护数据库（可选）
- 下载MIMIC-IV重症监护数据库（可选）


::: info
原始资料里没有收录这一题的脚本。
:::

## 运行环境

本页的「运行结果」是把这一周的全部脚本**在同一个 R 会话里按顺序执行**得到的
（还原在 RStudio 里一道一道做的过程），因此后面的脚本可以用到前面定义的变量。

::: tip 自己做的时候
先照着题目自己写一遍，写不出来再看参考答案 —— 答案默认是收起来的。
跑之前记得把工作目录设到数据文件所在的那个文件夹。
:::
