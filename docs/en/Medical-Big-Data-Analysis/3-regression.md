---
layout: doc
title: '3. Regression Analysis'
---

<script setup>
import { withBase } from 'vitepress'

const code0301 = `load('L5-1UCR.rdata')
library(epiDisplay)
des(UCR)
summary(UCR)
plot(ucr~age,data = UCR,xlab = 'x(age)',ylab = 'y(urine creatinine mmol')
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
plot(y~t,xlab = 't(number of irradiations)',ylab = 'y(residual cell count)',type = 'b')
points(fitted.values(bacteria.model1),t,pch = 16,col = 'DeepPink',cex = 1)
lines(fitted.values(bacteria.model1),col = 'DeepPink',Ity = 2)
legend(10,350,c('raw data','nonlinear regression'),col = c('black','DeepPink'),text.col = c('black','DeepPink'),pch = c(15,16),lty = c(1,2))

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

# Week 3. Regression Analysis

::: info Translation status
Translated from the [Chinese original](/Medical-Big-Data-Analysis/3-regression). Numbers, formulas, and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Week 3 lab for *Medical Big Data Analysis and Decision Making*.
> The exercises are compiled from the course slides; the reference answers and the results shown here were
> actually run on this machine.

## What this lecture covers

- **Exercise 1** simple linear regression
- **Exercise 2** multiple linear regression
- **Exercise 3** choosing the best regression equation
- **Exercise 4** nonlinear regression by the linearization method
- **Exercise 5** nonlinear regression by the least squares method
- **Exercise 6** nonlinear regression by the polynomial regression method
- **Exercise 7** logistic regression

::: warning Before you start: install the R package this lecture needs

The scripts in this lecture use the package below. **If it is not installed, the script will fail with an
error right at the `library()` step.**

`epiDisplay`

How to install (run this once in the RStudio console):

```r
install.packages(c("epiDisplay"))
```

> If you already have the downloaded package files at hand, you can also install from a local path:
> `install.packages("path/package.zip", repos = NULL, type = "win.binary")`
:::

## Exercise 1: Simple linear regression


- Create the R script file test0301.R, and when you have finished the tasks below, save that script file in
  the folder e:/test03.
  - (1) An endemic disease research institute carried out a survey of children with Kaschin-Beck disease; the
    data are in L5-1UCR.rdata, in which the creatinine content is the 24-hour urine creatinine (in mmol). Try
    to build a linear regression model between the children's age and the urine creatinine content.


<img :src="withBase('/figures/mbd/3/q-第04页-image1.png')" alt="Figure from page 4" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 1 · Reference answer"
  description="This exercise needs `epiDisplay`."
  :code="code0301"
  :output="out0301" />

## Exercise 2: Multiple linear regression


- Create the R script file test0302.R, and when you have finished the tasks below, save that script file in
  the folder e:/test03.
  - (2) The measured values of serum total cholesterol, triglyceride, fasting insulin, glycated hemoglobin,
    and fasting blood glucose in 27 diabetic patients are in L5-2BG.rdata; try to build a multiple linear
    regression equation for blood glucose on the other indices.


<img :src="withBase('/figures/mbd/3/q-第06页-image2.png')" alt="Figure from page 6" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 2 · Reference answer"
  :code="code0302"
  :output="out0302" />

## Exercise 3: Choosing the best regression equation


- Create the R script file test0303.R, and when you have finished the tasks below, save that script file in
  the folder e:/test03.
  - (3) For the regression equation Y=5.9433+0.1424X1+0.3515X2-0.2706X3+0.6382X4 obtained in Exercise 2,
    which relates the dependent variable blood glucose Y to the independent variables total cholesterol X1,
    triglyceride X2, insulin X3, and glycated hemoglobin X4, carry out stepwise regression to obtain the best
    regression model.
    - Use the `drop1()` function in R to remove variables by hand and carry out stepwise regression.
    - Use the `step()` function to let stepwise regression choose the “best” regression model automatically.


<AnswerBlock title="Exercise 3 · Reference answer"
  :code="code0303"
  :output="out0303" />

## Exercise 4: Nonlinear regression by the linearization method


- Create the R script file test0304.R, and when you have finished the tasks below, save that script file in
  the folder e:/test03.
  - (4) The microbiology teaching and research section of a medical university used rocket electrophoresis
    with immunoglobulin A (IgA, μg/ml) of known concentration X and measured the rocket height Y (mm); the
    data are in the file L5_4.csv. Try to fit a nonlinear regression equation for Y on X.


<img :src="withBase('/figures/mbd/3/q-第09页-image3.png')" alt="Figure from page 9" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 4 · Reference answer"
  :code="code0304"
  :output="out0304" />

## Exercise 5: Nonlinear regression by the least squares method


- Create the R script file test0305.R, and when you have finished the tasks below, save that script file in
  the folder e:/test03.
  - (5) For 15 severely injured patients, the number of days in hospital X and a prognostic index Y are given
    in L5_5.csv; try to fit a nonlinear regression equation for Y on X by the linearization method and by the
    least squares method respectively.


<img :src="withBase('/figures/mbd/3/q-第11页-image5.png')" alt="Figure from page 11" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/3/q-第11页-image4.png')" alt="Figure from page 11" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 5 · Reference answer"
  :code="code0305"
  :output="out0305" />

## Exercise 6: Nonlinear regression by the polynomial regression method


- Create the R script file test0306.R, and when you have finished the tasks below, save that script file in
  the folder e:/test03.
  - (6) To analyze the sterilizing effect of X-rays, bacteria were irradiated with 200 kV X-rays for 6 minutes
    each time, and the number of bacteria still alive was estimated by the plate count method; the number of
    irradiations is written t and the number of bacteria after irradiation is y. The data are in L5_6.csv;
    try to find the quadratic polynomial regression model for y on t and the nonlinear regression model built
    with the `nls` function.


<img :src="withBase('/figures/mbd/3/q-第13页-image6.png')" alt="Figure from page 13" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<img :src="withBase('/figures/mbd/3/q-第14页-image7.png')" alt="Figure from page 14" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 6 · Reference answer"
  :code="code0306"
  :output="out0306"
  :images="['/figures/mbd/3/plot-01.png', '/figures/mbd/3/plot-02.png']" />

## Exercise 7: Logistic regression


- Create the R script file test0307.R, and when you have finished the tasks below, save that script file in
  the folder e:/test03.
  - (7) This example is a case-control data set studying the relationship between alcohol drinking (X1),
    smoking (X2), and esophageal cancer (Y); try a logistic regression analysis.


<img :src="withBase('/figures/mbd/3/q-第16页-image8.png')" alt="Figure from page 16" style="max-width:100%;border:1px solid var(--vp-c-border);border-radius:8px;background:#fff" loading="lazy" />


<AnswerBlock title="Exercise 7 · Reference answer"
  :code="code0307"
  :output="out0307" />

## Running environment

The “results” on this page were obtained by running **all of this week's scripts in order in the same R
session** (reproducing the process of working through them one by one in RStudio), so a later script can use
variables defined by an earlier one.

::: tip When you do it yourself
Write it yourself from the exercise first, and only look at the reference answer when you cannot work it out —
the answers are collapsed by default.
Before you run anything, remember to set the working directory to the folder that holds the data files.
:::

::: tip Want the statistics behind it?
This week is **a complete hands-on walkthrough of regression analysis in R** (simple, multiple, choosing an
equation, nonlinear, logistic); for the principles behind least squares, regression diagnostics, confidence
intervals, and tolerance intervals, see the corresponding summary in *Health Statistics*.

See **[Chapter 13 of *Health Statistics*, Simple Linear Regression](/en/Health-statistics/13-linear-regression)**.
:::
