<script setup>
import { withBase } from 'vitepress'

const code0301 = `load('L5-1UCR.rdata')
library(epiDisplay)
des(UCR)
summary(UCR)
plot(ucr~age,data = UCR,xlab = 'x(年龄)',ylab = 'y(尿肌酐含量mmol')
mod = lm(ucr~age,data = UCR)
summary(mod)`

const out0301 = `UCR in Kaschin-Beck disease children 
 No. of observations =  18 
  Variable      Class           Description            
1 age           integer         Age in years           
2 ucr           numeric         Urine creatinine (mmol)
3 group         factor          Type of children       
      age             ucr        group 
 Min.   : 6.00   Min.   :2.210   0: 8  
 1st Qu.: 8.25   1st Qu.:2.673   1:10  
 Median :10.00   Median :3.010         
 Mean   :10.50   Mean   :3.016         
 3rd Qu.:12.00   3rd Qu.:3.315         
 Max.   :16.00   Max.   :3.980         

Call:
lm(formula = ucr ~ age, data = UCR)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.43440 -0.13828 -0.01111  0.14738  0.41823 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  1.45492    0.20712   7.025 2.87e-06 ***
age          0.14869    0.01904   7.807 7.60e-07 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.2289 on 16 degrees of freedom
Multiple R-squared:  0.7921,	Adjusted R-squared:  0.7791 
F-statistic: 60.95 on 1 and 16 DF,  p-value: 7.597e-07`

const code0302 = `load('BG.rdata')
BG
str(BG)
BG.model = lm(Glu~TC +TC+TG+Insulin+GHb,data = BG)
summary(BG.model)`

const out0302 = `TC    TG Insulin  GHb  Glu
1   5.68  1.90    4.53  8.2 11.2
2   3.79  1.64    7.32  6.9  8.8
3   6.02  3.56    6.95 10.8 12.3
4   4.85  1.07    5.88  8.3 11.6
5   4.60  2.32    4.05  7.5 13.4
6   6.05  0.64    1.42 13.6 18.3
7   4.90  8.50   12.60  8.5 11.1
8   7.08  3.00    6.75 11.5 12.1
9   3.85  2.11   16.28  7.9  9.6
10  4.65  0.63    6.59  7.1  8.4
11  4.59  1.97    3.61  8.7  9.3
12  4.29  1.97    6.61  7.8 10.6
13  7.97  1.93    7.57  9.9  8.4
14  6.19  1.18    1.42  6.9  9.6
15  6.13  2.06   10.35 10.5 10.9
16  5.71  1.78    8.53  8.0 10.1
17  6.40  2.40    4.53 10.3 14.8
18  6.06  3.67   12.79  7.1  9.1
19  5.09  1.03    2.53  8.9 10.8
20  6.13  1.71    5.28  9.9 10.2
21  5.78  3.36    2.96  8.0 13.6
22  5.43  1.13    4.31 11.3 14.9
23  6.50  6.21    3.47 12.3 16.0
24  7.98  7.92    3.37  9.8 13.2
25 11.54 10.89    1.20 10.5 20.0
26  5.84  0.92    8.61  6.4 13.3
27  3.84  1.20    6.45  9.6 10.4
'data.frame':	27 obs. of  5 variables:
 $ TC     : num  5.68 3.79 6.02 4.85 4.6 6.05 4.9 7.08 3.85 4.65 ...
 $ TG     : num  1.9 1.64 3.56 1.07 2.32 0.64 8.5 3 2.11 0.63 ...
 $ Insulin: num  4.53 7.32 6.95 5.88 4.05 ...
 $ GHb    : num  8.2 6.9 10.8 8.3 7.5 13.6 8.5 11.5 7.9 7.1 ...
 $ Glu    : num  11.2 8.8 12.3 11.6 13.4 18.3 11.1 12.1 9.6 8.4 ...

Call:
lm(formula = Glu ~ TC + TC + TG + Insulin + GHb, data = BG)

Residuals:
    Min      1Q  Median      3Q     Max 
-3.6268 -1.2004 -0.2276  1.5389  4.4467 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)  
(Intercept)   5.9433     2.8286   2.101   0.0473 *
TC            0.1424     0.3657   0.390   0.7006  
TG            0.3515     0.2042   1.721   0.0993 .
Insulin      -0.2706     0.1214  -2.229   0.0363 *
GHb           0.6382     0.2433   2.623   0.0155 *
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 2.01 on 22 degrees of freedom
Multiple R-squared:  0.6008,	Adjusted R-squared:  0.5282 
F-statistic: 8.278 on 4 and 22 DF,  p-value: 0.0003121`

const code0303 = `load('BG.rdata')
BG
str(BG)
BG.model = lm(Glu~TC +TC+TG+Insulin+GHb,data = BG)
summary(BG.model)

drop1(BG.model)

step(BG.model)`

const out0303 = `TC    TG Insulin  GHb  Glu
1   5.68  1.90    4.53  8.2 11.2
2   3.79  1.64    7.32  6.9  8.8
3   6.02  3.56    6.95 10.8 12.3
4   4.85  1.07    5.88  8.3 11.6
5   4.60  2.32    4.05  7.5 13.4
6   6.05  0.64    1.42 13.6 18.3
7   4.90  8.50   12.60  8.5 11.1
8   7.08  3.00    6.75 11.5 12.1
9   3.85  2.11   16.28  7.9  9.6
10  4.65  0.63    6.59  7.1  8.4
11  4.59  1.97    3.61  8.7  9.3
12  4.29  1.97    6.61  7.8 10.6
13  7.97  1.93    7.57  9.9  8.4
14  6.19  1.18    1.42  6.9  9.6
15  6.13  2.06   10.35 10.5 10.9
16  5.71  1.78    8.53  8.0 10.1
17  6.40  2.40    4.53 10.3 14.8
18  6.06  3.67   12.79  7.1  9.1
19  5.09  1.03    2.53  8.9 10.8
20  6.13  1.71    5.28  9.9 10.2
21  5.78  3.36    2.96  8.0 13.6
22  5.43  1.13    4.31 11.3 14.9
23  6.50  6.21    3.47 12.3 16.0
24  7.98  7.92    3.37  9.8 13.2
25 11.54 10.89    1.20 10.5 20.0
26  5.84  0.92    8.61  6.4 13.3
27  3.84  1.20    6.45  9.6 10.4
'data.frame':	27 obs. of  5 variables:
 $ TC     : num  5.68 3.79 6.02 4.85 4.6 6.05 4.9 7.08 3.85 4.65 ...
 $ TG     : num  1.9 1.64 3.56 1.07 2.32 0.64 8.5 3 2.11 0.63 ...
 $ Insulin: num  4.53 7.32 6.95 5.88 4.05 ...
 $ GHb    : num  8.2 6.9 10.8 8.3 7.5 13.6 8.5 11.5 7.9 7.1 ...
 $ Glu    : num  11.2 8.8 12.3 11.6 13.4 18.3 11.1 12.1 9.6 8.4 ...

Call:
lm(formula = Glu ~ TC + TC + TG + Insulin + GHb, data = BG)

Residuals:
    Min      1Q  Median      3Q     Max 
-3.6268 -1.2004 -0.2276  1.5389  4.4467 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)  
(Intercept)   5.9433     2.8286   2.101   0.0473 *
TC            0.1424     0.3657   0.390   0.7006  
TG            0.3515     0.2042   1.721   0.0993 .
Insulin      -0.2706     0.1214  -2.229   0.0363 *
GHb           0.6382     0.2433   2.623   0.0155 *
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 2.01 on 22 degrees of freedom
Multiple R-squared:  0.6008,	Adjusted R-squared:  0.5282 
F-statistic: 8.278 on 4 and 22 DF,  p-value: 0.0003121

Single term deletions

Model:
Glu ~ TC + TC + TG + Insulin + GHb
        Df Sum of Sq     RSS    AIC
<none>                88.841 42.157
TC       1    0.6129  89.454 40.343
TG       1   11.9627 100.804 43.568
Insulin  1   20.0635 108.905 45.655
GHb      1   27.7939 116.635 47.507
Start:  AIC=42.16
Glu ~ TC + TC + TG + Insulin + GHb

          Df Sum of Sq     RSS    AIC
- TC       1    0.6129  89.454 40.343
<none>                  88.841 42.157
- TG       1   11.9627 100.804 43.568
- Insulin  1   20.0635 108.905 45.655
- GHb      1   27.7939 116.635 47.507

Step:  AIC=40.34
Glu ~ TG + Insulin + GHb

          Df Sum of Sq     RSS    AIC
<none>                  89.454 40.343
- Insulin  1    25.690 115.144 45.159
- TG       1    26.530 115.984 45.356
- GHb      1    32.269 121.723 46.660

Call:
lm(formula = Glu ~ TG + Insulin + GHb, data = BG)

Coefficients:
(Intercept)           TG      Insulin          GHb  
     6.4996       0.4023      -0.2870       0.6632`

const code0304 = `L5_4 = read.csv('L5_4.csv')
X = L5_4$X
Y = L5_4$Y
XP = log(X)
IgA.model = lm(Y~XP)
summary(IgA.model)`

const out0304 = `Call:
lm(formula = Y ~ XP)

Residuals:
    Min      1Q  Median      3Q     Max 
-1.0451 -0.1341  0.2136  0.2715  0.3996 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  19.7451     0.2017   97.90 7.65e-11 ***
XP            7.7771     0.2815   27.63 1.49e-07 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.5238 on 6 degrees of freedom
Multiple R-squared:  0.9922,	Adjusted R-squared:  0.9909 
F-statistic: 763.5 on 1 and 6 DF,  p-value: 1.486e-07`

const code0305 = `L5_5 = read.csv('L5_5.csv')
X = L5_5$X
Y = L5_5$Y
lnY = log(Y)
hospital.model1 = lm(lnY ~X)
summary(hospital.model1)


hospital.model2 = nls(Y~a*exp(-b*X),start = list(a = 56,b = -0.04))
summary(hospital.model2)`

const out0305 = `Call:
lm(formula = lnY ~ X)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.37241 -0.07073  0.02777  0.05982  0.33539 

Coefficients:
             Estimate Std. Error t value Pr(>|t|)    
(Intercept)  4.037159   0.084103   48.00 5.08e-16 ***
X           -0.037974   0.002284  -16.62 3.86e-10 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.1794 on 13 degrees of freedom
Multiple R-squared:  0.9551,	Adjusted R-squared:  0.9516 
F-statistic: 276.4 on 1 and 13 DF,  p-value: 3.858e-10

Formula: Y ~ a * exp(-b * X)

Parameters:
   Estimate Std. Error t value Pr(>|t|)    
a 58.606564   1.472160   39.81 5.70e-15 ***
b  0.039586   0.001711   23.13 6.01e-12 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 1.951 on 13 degrees of freedom

Number of iterations to convergence: 8 
Achieved convergence tolerance: 6.133e-07`

const code0306 = `L5_6 = read.csv('L5_6.csv')
t = L5_6$t
y = L5_6$y
bacteria.model1 = lm(y~poly(t,2))
summary(bacteria.model1)
plot(y~t,xlab = 't(照射次数)',ylab = 'y(残留细胞数)',type = 'b')
points(fitted.values(bacteria.model1),t,pch = 16,col = 'DeepPink',cex = 1)
lines(fitted.values(bacteria.model1),col = 'DeepPink',Ity = 2)
legend(10,350,c('原始数据','非线性回归'),col = c('black','DeepPink'),text.col = c('black','DeepPink'),pch = c(15,16),lty = c(1,2))

bacteria.model2 = nls(y~a*exp(b*t),start = list(a = 148,b = -0.2))
summary(bacteria.model2)`

const out0306 = `Call:
lm(formula = y ~ poly(t, 2))

Residuals:
    Min      1Q  Median      3Q     Max 
-42.577 -10.094   0.057   8.534  53.253 

Coefficients:
            Estimate Std. Error t value Pr(>|t|)    
(Intercept)  103.267      5.749   17.96 4.87e-10 ***
poly(t, 2)1 -323.011     22.265  -14.51 5.69e-09 ***
poly(t, 2)2  127.798     22.265    5.74 9.31e-05 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 22.26 on 12 degrees of freedom
Multiple R-squared:  0.953,	Adjusted R-squared:  0.9452 
F-statistic: 121.7 on 2 and 12 DF,  p-value: 1.075e-08

Formula: y ~ a * exp(b * t)

Parameters:
   Estimate Std. Error t value Pr(>|t|)    
a 400.09003   20.75693   19.27 6.05e-11 ***
b  -0.22404    0.01486  -15.08 1.29e-09 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 16.99 on 13 degrees of freedom

Number of iterations to convergence: 5 
Achieved convergence tolerance: 8.061e-06`

const code0307 = `dat.array = array(c(136,57,107,151,63,44,63,265),
                  dim = c(2,2,2),
                  dimnames = list(smoke = c('no','yes'),
                                  drink = c('no','yes'),
                                  outcome = c('control','case')))
data.table = as.table(dat.array)
data.table

dat = as.data.frame(data.table)
dat

logistic.model = glm(outcome~smoke + drink,family = binomial,weights = Freq,data = dat)
summary(logistic.model)`

const out0307 = `, , outcome = control

     drink
smoke  no yes
  no  136 107
  yes  57 151

, , outcome = case

     drink
smoke  no yes
  no   63  63
  yes  44 265

  smoke drink outcome Freq
1    no    no control  136
2   yes    no control   57
3    no   yes control  107
4   yes   yes control  151
5    no    no    case   63
6   yes    no    case   44
7    no   yes    case   63
8   yes   yes    case  265

Call:
glm(formula = outcome ~ smoke + drink, family = binomial, data = dat, 
    weights = Freq)

Coefficients:
            Estimate Std. Error z value Pr(>|z|)    
(Intercept)  -0.9099     0.1358  -6.699 2.10e-11 ***
smokeyes      0.8856     0.1500   5.904 3.54e-09 ***
drinkyes      0.5261     0.1572   3.348 0.000815 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

(Dispersion parameter for binomial family taken to be 1)

    Null deviance: 1228.0  on 7  degrees of freedom
Residual deviance: 1159.4  on 5  degrees of freedom
AIC: 1165.4

Number of Fisher Scoring iterations: 4`
</script>

---
layout: doc
title: 3-回归分析
---

# 第 3 周　回归分析

> 《医学大数据分析与决策》第 3 周实验。
> 题目整理自课程课件，参考答案与运行结果都是在本机实际跑出来的。

## 本讲内容

- **实验题 1**　一元线性回归
- **实验题 2**　多元线性回归
- **实验题 3**　最优回归方程的选择
- **实验题 4**　非线性回归之线性化方法
- **实验题 5**　非线性回归之最小二乘法
- **实验题 6**　非线性回归之多项式回归法
- **实验题 7**　logistic回归

::: warning 动手之前：先把这一讲要用的 R 包装好

这一讲的脚本会用到下面这些包。**没装的话脚本会在 `library()` 那一步直接报错。**

`epiDisplay`

装法（在 RStudio 的控制台里跑一次就行）：

```r
install.packages(c("epiDisplay"))
```

> 如果手头已经有下载好的包文件，也可以指定本地路径装：
> `install.packages("路径/包名.zip", repos = NULL, type = "win.binary")`
:::

## 实验题 1　一元线性回归


- 创建R脚本文件test0301.R，完成下面任务后把该脚本文件保存在e:/test03文件夹下。
  - （1）某地方病研究机构关于大骨节病患儿开展了一项调查研究，数据在L5-1UCR.rdata中，其中肌酐含量为24小时测得的尿肌酐（单位为mmol）。试建立患儿年龄与尿肌酐含量之间的线性回归模型。


<img :src="withBase('/figures/mbd/3/q-第04页-image1.png')" alt="第 4 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 1 · 参考答案"
  description="这一题需要 `epiDisplay`。"
  :code="code0301"
  :output="out0301" />

## 实验题 2　多元线性回归


- 创建R脚本文件test0302.R，完成下面任务后把该脚本文件保存在e:/test03文件夹下。
  - （2）27名糖尿病人的血清总胆固醇、甘油三酯、空腹胰岛素、糖化血红蛋白、空腹血糖的测量值在L5-2BG.rdata中，试建立血糖与其他几项指标的多元线性回归方程。


<img :src="withBase('/figures/mbd/3/q-第06页-image2.png')" alt="第 6 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 2 · 参考答案"
  :code="code0302"
  :output="out0302" />

## 实验题 3　最优回归方程的选择


- 创建R脚本文件test0303.R，完成下面任务后把该脚本文件保存在e:/test03文件夹下。
  - （3）对实验题2获得的因变量血糖Y与自变量总胆固醇X1、甘油三酯X2、胰岛素X3、糖化血红蛋白X4之间关系的回归方程Y=5.9433+0.1424X1+0.3515X2-0.2706X3+0.6382X4 ，进行逐步回归，获得最优回归模型。
    - 使用R语言中的drop1()函数，手动剔除变量进行逐步回归。
    - 使用step()函数逐步回归自动选择“最优”回归模型


<AnswerBlock title="实验题 3 · 参考答案"
  :code="code0303"
  :output="out0303" />

## 实验题 4　非线性回归之线性化方法


- 创建R脚本文件test0304.R，完成下面任务后把该脚本文件保存在e:/test03文件夹下。
  - （4）某医科大学微生物学教研室以已知浓度X的免疫球蛋白A(IgA，μg/ml)作火箭电泳，测得火箭高度Y(mm) 数据见文件L5_4.csv。试拟合Y关于X的非线性回归方程。


<img :src="withBase('/figures/mbd/3/q-第09页-image3.png')" alt="第 9 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 4 · 参考答案"
  :code="code0304"
  :output="out0304" />

## 实验题 5　非线性回归之最小二乘法


- 创建R脚本文件test0305.R，完成下面任务后把该脚本文件保存在e:/test03文件夹下。
  - （5）现有15名重伤病人的住院天数X与预后指标数据Y，具体见表L5_5.csv，试用线性化方法与最小二乘法分别拟合Y关于X的非线性回归方程。


<img :src="withBase('/figures/mbd/3/q-第11页-image5.png')" alt="第 11 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/3/q-第11页-image4.png')" alt="第 11 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 5 · 参考答案"
  :code="code0305"
  :output="out0305" />

## 实验题 6　非线性回归之多项式回归法


- 创建R脚本文件test0306.R，完成下面任务后把该脚本文件保存在e:/test03文件夹下。
  - （6）为了分析X射线的杀菌作用，用200千伏的X射线来照射细菌，每次照射6分钟用平板计数法估计尚存活的细菌数，照射次数记为t，照射后的细菌数为y，数据见表L5_6.csv，试求y与t的二次多项式回归模型及nls函数创建的非线性回归模型。


<img :src="withBase('/figures/mbd/3/q-第13页-image6.png')" alt="第 13 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/3/q-第14页-image7.png')" alt="第 14 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 6 · 参考答案"
  :code="code0306"
  :output="out0306"
  :images="['/figures/mbd/3/plot-01.png', '/figures/mbd/3/plot-02.png']" />

## 实验题 7　logistic回归


- 创建R脚本文件test0307.R，完成下面任务后把该脚本文件保存在e:/test03文件夹下。
  - （7）本例是一个研究饮酒（X1）、吸烟（X2）与食道癌（Y）关系的病例-对照资料，试作logistic回归分析。


<img :src="withBase('/figures/mbd/3/q-第16页-image8.png')" alt="第 16 页图" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="实验题 7 · 参考答案"
  :code="code0307"
  :output="out0307" />

## 运行环境

本页的「运行结果」是把这一周的全部脚本**在同一个 R 会话里按顺序执行**得到的
（还原在 RStudio 里一道一道做的过程），因此后面的脚本可以用到前面定义的变量。

::: tip 自己做的时候
先照着题目自己写一遍，写不出来再看参考答案 —— 答案默认是收起来的。
跑之前记得把工作目录设到数据文件所在的那个文件夹。
:::

::: tip 想弄懂背后的统计学原理
这一周是**回归分析的完整 R 实操**（一元、多元、选方程、非线性、logistic）；最小二乘、回归诊断、可信区间与容许区间的原理，见《卫生统计学》对应的归纳。

详见 **[《卫生统计学》第 13 章　直线回归](/Health-statistics/13-linear-regression)**。
:::
