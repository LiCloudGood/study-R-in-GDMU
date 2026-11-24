---
layout: doc
title: '6. Classification (Part 2)'
---

<script setup>
import { withBase } from 'vitepress'

const code0601 = `#install.packages('e1701')

library(e1071)

data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')

set.seed(101)
train = sample(nrow(data),0.7*nrow(data))
tdata = data[train,]
vdata = data[-train,]

data_naiveBayes = naiveBayes(as.factor(tdata$Class)~.,data = tdata)
print(data_naiveBayes)
data_predict = predict(data_naiveBayes,newdata = vdata)

confusion_mx = table(vdata$Class,data_predict,dnn = c('Actual','Predicted'))
print(confusion_mx)
accuracy = (sum(diag(confusion_mx))/sum(confusion_mx))
print(accuracy)`

const out0601 = `Naive Bayes Classifier for Discrete Predictors

Call:
naiveBayes.default(x = X, y = Y, laplace = laplace)

A-priori probabilities:
Y
       C0        C1
0.5129534 0.4870466

Conditional probabilities:
    Age
Y            A2         A3         A4         A5         A6         A7
  C0 0.00000000 0.11111111 0.31313131 0.38383838 0.16161616 0.03030303
  C1 0.01063830 0.19148936 0.28723404 0.34042553 0.17021277 0.00000000

    Menopause
Y            M1         M2         M3
  C0 0.03030303 0.42424242 0.54545455
  C1 0.00000000 0.43617021 0.56382979

    TumorSize
Y            T1        T10        T11         T2         T3         T4         T5         T6
  C0 0.05050505 0.00000000 0.01010101 0.03030303 0.18181818 0.16161616 0.23232323 0.22222222
  C1 0.01063830 0.02127660 0.04255319 0.00000000 0.01063830 0.04255319 0.09574468 0.14893617
    TumorSize
Y            T7         T8         T9
  C0 0.07070707 0.01010101 0.03030303
  C1 0.35106383 0.13829787 0.13829787

    InvNodes
Y           IN1        IN2        IN3        IN4        IN5        IN6        IN7
  C0 0.87878788 0.09090909 0.01010101 0.00000000 0.01010101 0.01010101 0.00000000
  C1 0.56382979 0.19148936 0.14893617 0.04255319 0.01063830 0.03191489 0.01063830

    NodeCaps
Y            N0         N1
  C0 0.94949495 0.05050505
  C1 0.67021277 0.32978723

    DegMalig
Y            D1         D2         D3
  C0 0.43434343 0.44444444 0.12121212
  C1 0.05319149 0.48936170 0.45744681

    BreastQuad
Y           BQ1        BQ2        BQ3        BQ4        BQ5
  C0 0.29292929 0.39393939 0.09090909 0.12121212 0.10101010
  C1 0.31914894 0.40425532 0.18085106 0.06382979 0.03191489

    Irradiat
Y          IR0       IR1
  C0 0.8686869 0.1313131
  C1 0.6382979 0.3617021

      Predicted
Actual C0 C1
    C0 42  4
    C1  8 30
[1] 0.8571429`

const code0602 = `install.packages('recipes')
library('caret')
library(e1071)

data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')
n = nrow(data)

folds = createFolds(seq(1,n),k=10)
ay = {}
for (i in 1:10) {
  tdata = data[-unlist(folds[i]),]
  vdata = data[unlist(folds[i]),]
  data_naiveBayes = naiveBayes(as.factor(tdata$Class)~.,data = tdata)
  data_predict = predict(data_naiveBayes,newdata = vdata)
  obs_p_ran = data.frame(prob = data_predict,obs = vdata$Class)
  confusion_mx = table(vdata$Class,data_predict,dnn = c('Actual','Predicted'))
  accuracy = (sum(diag(confusion_mx))/sum(confusion_mx))
  ay = c(ay,accuracy)
}
print(ay)
mean(ay)`

const out0602 = `package 'recipes' successfully unpacked and MD5 sums checked

The downloaded binary packages are in
	<local temporary directory>
 [1] 0.8928571 0.9259259 0.9285714 0.8928571 0.7857143 0.8888889 0.8214286 0.8148148 0.6071429
[10] 0.7857143
[1] 0.8343915`

const code0603 = `#install.packages('pROC')
library('pROC')
data('aSAH')
set.seed(103)
R1 = roc(aSAH$outcome,
         aSAH$s100b,
         smooth = T,
         ci = T,
         auc = T)
R2 = roc(aSAH$outcome,
         rnorm(nrow(aSAH)),
         smooth =T,
         ci = T,
         auc = T)
plot(R1,col = 'red',
     print.auc = T,
     print.auc.x = 0.3,
     print.auc.y = 0.3,
     legacy.axes = T)
plot(R2,col = 'blue',
     print.auc = T,
     print.auc.x = 0.5,
     print.auc.y = 0.5,
     legacy.axes = T)
auc(R1)
auc(R2)`

const out0603 = `Area under the curve: 0.74
Area under the curve: 0.5788`

const code0604 = `#install.packages('pROC')
library('pROC')
tpr <- c(0.2, 0.4, 0.4, 0.6, 0.8, 0.8, 0.8, 0.8, 1.0, 1.0)
fpr <- c(0.0, 0.0, 0.2, 0.2, 0.2, 0.4, 0.6, 0.8, 0.8, 1.0)
auc <- function(fpr, tpr) {
  idx <- order(fpr)
  fpr <- fpr[idx]; tpr <- tpr[idx]
  sum(diff(fpr) * (head(tpr, -1) + tail(tpr, -1))) / 2
}
roc_auc <- auc(fpr, tpr)

plot(fpr, tpr, type = "s", lwd = 2, col = "red",
     xlab = "False Positive Rate (FPR)",
     ylab = "True Positive Rate (TPR)",
     main = sprintf("ROC curve (AUC = %.3f)", roc_auc))
grid()
abline(0, 1, lty = 2, col = "gray")
text(0.6, 0.2, labels = sprintf("AUC = %.3f", roc_auc), cex = 1.2)`
</script>


# Week 6. Classification (Part 2)

::: info Translation status
Translated from the [Chinese original](/Medical-Big-Data-Analysis/6-classification-2). Numbers, formulas,
and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Week 6 lab for *Medical Big Data Analysis and Decision Making*.
> The exercises are compiled from the course slides; the reference answers and the results shown here were
> actually run on this machine.

## What this lecture covers

- **Exercise 1**
- **Exercise 2**
- **Exercise 3**
- **Exercise 4**

::: warning Before you start: install the R packages this lecture needs

The scripts in this lecture use the packages below. **If they are not installed, the script will fail with an
error right at the `library()` step.**

`caret`, `e1071`, `pROC`, `recipes`

How to install (run this once in the RStudio console):

```r
install.packages(c("caret", "e1071", "pROC", "recipes"))
```

> If you already have the downloaded package files at hand, you can also install from a local path:
> `install.packages("path/package.zip", repos = NULL, type = "win.binary")`
:::

## Exercise 1


- Create the R script file test0601.R, and when you have finished the tasks below, save that script file in
  the folder e:/test06.
  - (1) An example of the naive Bayes classification algorithm — predicting breast cancer. Install and load
    the package "e1071", read the source data set BreastCancerProcessed.txt, build a naive Bayes
    classification model with Class as the dependent variable and the remaining attributes as independent
    variables, output the confusion matrix, and compute the accuracy of the model.


The data file given by the exercise is `BreastCancerProcessed.txt`: 277 records and 9 attributes,
comma-separated with a header row. The first 5 records are:

| Age | Menopause | TumorSize | InvNodes | NodeCaps | DegMalig | BreastQuad | Irradiat | Class |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A4 | M3 | T4 | IN1 | N1 | D3 | BQ1 | IR0 | C1 |
| A5 | M2 | T4 | IN1 | N0 | D1 | BQ5 | IR0 | C0 |
| A5 | M2 | T8 | IN1 | N0 | D2 | BQ2 | IR0 | C1 |
| A4 | M3 | T8 | IN1 | N1 | D3 | BQ2 | IR1 | C1 |
| A4 | M3 | T7 | IN2 | N1 | D2 | BQ3 | IR0 | C1 |

First read the data in, fix the random seed with `set.seed(101)` so that this particular split can be
reproduced, and split the data 7:3 into a training set and a test set. Then build a naive Bayes model with
`Class` as the dependent variable and the remaining attributes as the independent variables, and print it:

```r
library(e1071)

data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')

set.seed(101)
train = sample(nrow(data),0.7*nrow(data))
tdata = data[train,]
vdata = data[-train,]

data_naiveBayes = naiveBayes(as.factor(tdata$Class)~.,data = tdata)
print(data_naiveBayes)
```

Once the model is built, use it to predict on the test set, print the confusion matrix of the actual and
predicted values, and compute the accuracy as the number of records correctly classified on the diagonal
divided by the total:

```r
data_predict = predict(data_naiveBayes,newdata = vdata)

confusion_mx = table(vdata$Class,data_predict,dnn = c('Actual','Predicted'))
print(confusion_mx)
accuracy = (sum(diag(confusion_mx))/sum(confusion_mx))
print(accuracy)
```


<AnswerBlock title="Exercise 1 · Reference answer"
  description="This exercise needs `e1071`."
  :code="code0601"
  :output="out0601" />

## Exercise 2


- Create the R script file test0602.R, and when you have finished the tasks below, save that script file in
  the folder e:/test06.
  - (1) Install and load the package "caret" and load the package "e1071", read the source data set
    BreastCancerProcessed.txt, run 10-fold cross-validation on the naive Bayes classification algorithm, and
    output the accuracy of the model for each of the 10 runs.


This exercise uses the same `BreastCancerProcessed.txt`. First use `caret`'s `createFolds()` to split the
277 records randomly into 10 folds (`folds` holds the row numbers of each fold), and set up an empty
vector `ay` to record the accuracy of each fold:

```r
library('caret')
library(e1071)

data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')
n = nrow(data)

folds = createFolds(seq(1,n),k=10)
ay = {}
```

Then loop 10 times: each time take one fold as the test set and the other 9 as the training set, build the
naive Bayes model, predict, compute the accuracy for that fold and append it to `ay`. After the 10 runs,
print the 10 accuracies and take their mean:

```r
for (i in 1:10) {
  tdata = data[-unlist(folds[i]),]
  vdata = data[unlist(folds[i]),]
  data_naiveBayes = naiveBayes(as.factor(tdata$Class)~.,data = tdata)
  data_predict = predict(data_naiveBayes,newdata = vdata)
  obs_p_ran = data.frame(prob = data_predict,obs = vdata$Class)
  confusion_mx = table(vdata$Class,data_predict,dnn = c('Actual','Predicted'))
  accuracy = (sum(diag(confusion_mx))/sum(confusion_mx))
  ay = c(ay,accuracy)
}
print(ay)
mean(ay)
```


<AnswerBlock title="Exercise 2 · Reference answer"
  description="This exercise needs `caret`, `e1071`, `recipes`."
  :code="code0602"
  :output="out0602" />

## Exercise 3


- Create the R script file test0603.R, and when you have finished the tasks below, save that script file in
  the folder e:/test06.
  - (1) Install and load the package "pROC", and use the `aSAH` data set that comes with the pROC package to
    plot an ROC curve. This data set contains the clinical and laboratory data of 113 patients with
    aneurysmal subarachnoid hemorrhage. In the pROC package, the `roc()` function is used to build an ROC
    object. By default the `roc()` function prints the value of the AUC.


The data used here is the `aSAH` data set that ships with `pROC`: 113 patients and 7 variables, where
`s100b` is a laboratory marker and `outcome` is the outcome (Good / Poor) — that is what `s100b` is used
to predict in this exercise. The first 6 records printed by `head(aSAH)` are (the first column holds the
row names that come with `aSAH`, so it does not start at 1):

| Row name | gos6 | outcome | gender | age | wfns | s100b | ndka |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 29 | 5 | Good | Female | 42 | 1 | 0.13 | 3.01 |
| 30 | 5 | Good | Female | 37 | 1 | 0.14 | 8.54 |
| 31 | 5 | Good | Female | 42 | 1 | 0.10 | 8.09 |
| 32 | 5 | Good | Female | 27 | 1 | 0.04 | 10.42 |
| 33 | 1 | Poor | Female | 42 | 3 | 0.13 | 17.40 |
| 34 | 1 | Poor | Male | 48 | 2 | 0.10 | 12.75 |

First load the data and use `roc()` to build an ROC object from `s100b` (`smooth = T` smooths the curve,
`ci = T` also computes the 95% confidence interval, `auc = T` returns the AUC). Then build a second ROC
from a set of random numbers generated by `rnorm()` that have nothing to do with `outcome`, to serve as
the “random guessing” reference:

```r
library('pROC')
data('aSAH')
head(aSAH)#in the aSAH data set, s100b is the predictor of outcome
set.seed(103)
R1 = roc(aSAH$outcome,
         aSAH$s100b,
         smooth = T,
         ci = T,
         auc = T)
R2 = roc(aSAH$outcome,
         rnorm(nrow(aSAH)),
         smooth =T,
         ci = T,
         auc = T)
```

Plot both ROC curves: the first in red with its AUC printed at (0.3, 0.3), the second in blue with its AUC
printed at (0.5, 0.5). `legacy.axes = T` labels the x axis in the customary “1 − specificity” form.
Finally print the AUC of both curves:

```r
plot(R1,col = 'red',
     print.auc = T,
     print.auc.x = 0.3,
     print.auc.y = 0.3,
     legacy.axes = T)
plot(R2,col = 'blue',
     print.auc = T,
     print.auc.x = 0.5,
     print.auc.y = 0.5,
     legacy.axes = T)
auc(R1)
auc(R2)
```


<AnswerBlock title="Exercise 3 · Reference answer"
  description="This exercise needs `pROC`."
  :code="code0603"
  :output="out0603"
  :images="['/figures/en/mbd/6/plot-01.png', '/figures/en/mbd/6/plot-02.png']" />

## Exercise 4


- Create the R script file test0604.R, and when you have finished the tasks below, save that script file in
  the folder e:/test06.
  - (1) Using the data below (see the figure below), and following the code of Exercise 3, plot the ROC curve.

| Tuple number | Class | Probability | TP | FP | TN | FN | TPR | FPR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | P | 0.90 | 1 | 0 | 5 | 4 | 0.2 | 0.0 |
| 2 | P | 0.80 | 2 | 0 | 5 | 3 | 0.4 | 0.0 |
| 3 | N | 0.70 | 2 | 1 | 4 | 3 | 0.4 | 0.2 |
| 4 | P | 0.60 | 3 | 1 | 4 | 2 | 0.6 | 0.2 |
| 5 | P | 0.55 | 4 | 1 | 4 | 1 | 0.8 | 0.2 |
| 6 | N | 0.54 | 4 | 2 | 3 | 1 | 0.8 | 0.4 |
| 7 | N | 0.53 | 4 | 3 | 2 | 1 | 0.8 | 0.6 |
| 8 | N | 0.51 | 4 | 4 | 1 | 1 | 0.8 | 0.8 |
| 9 | P | 0.50 | 5 | 4 | 1 | 0 | 1.0 | 0.8 |
| 10 | N | 0.40 | 5 | 5 | 0 | 0 | 1.0 | 1.0 |


<AnswerBlock title="Exercise 4 · Reference answer"
  description="This exercise needs `pROC`."
  :code="code0604"
  :images="['/figures/en/mbd/6/plot-02.png', '/figures/en/mbd/6/plot-03.png']" />

## Running environment

The “results” on this page were obtained by running **all of this week's scripts in order in the same R
session** (reproducing the process of working through them one by one in RStudio), so a later script can use
variables defined by an earlier one.

::: tip When you do it yourself
Write it yourself from the exercise first, and only look at the reference answer when you cannot work it
out — the answers are collapsed by default.
Before you run anything, remember to set the working directory to the folder that holds the data files.
:::

::: tip Want the statistics behind it?
This week does **classification and diagnostic evaluation** (ROC, AUC, cross-validation). The relevant
principles are summarized on the following pages:

- **[*Health Statistics*, Diagnostic Test Evaluation (ROC and AUC)](/en/Health-statistics/diagnostic-test)** —
  this week starts from a **model** and draws ROC curves and compares AUCs; that page starts from a **clinical
  indicator** and explains the same set of ideas: how the threshold is set by clinical cost, why the positive
  predictive value changes sharply with prevalence, and how two AUCs are compared with the DeLong test.
  Both sides use the same `pROC` package.
- **[*Health Statistics*, Agreement and Reliability (Kappa and ICC)](/en/Health-statistics/agreement-reliability)** —
  the kappa used when evaluating a classification model is the same statistic as “do two doctors agree?”;
  that page explains clearly why chance agreement has to be taken out, and why a correlation coefficient
  cannot be used as a measure of agreement.
- **[Chapter 14 of *Health Statistics*, Survival Analysis](/en/Health-statistics/14-survival-analysis)** —
  also a “follow-up outcome”, but survival analysis has to handle censored data.
:::
