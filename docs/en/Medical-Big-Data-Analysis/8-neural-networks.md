---
layout: doc
title: '8. Neural Networks'
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
# Compute the training-set accuracy
train_accuracy <- sum(diag(table(bctrain.label, bctrain.predicted))) / length(bctrain.label)
cat("Training-set accuracy:", train_accuracy, "\\n")
bctest.outputs = predict(net.bc,bctest)
bctest.predicted = ifelse(bctest.outputs>0.5,1,0)
table(bctest.label,bctest.predicted)
# Compute the test-set accuracy
test_accuracy <- sum(diag(table(bctest.label, bctest.predicted))) / length(bctest.label)
cat("Test-set accuracy:", test_accuracy, "\\n")`

const out0802 = `bctrain.predicted
bctrain.label   0   1
            0 304   3
            1   1 170
Training-set accuracy: 0.9916318
            bctest.predicted
bctest.label   0   1
           0 132   5
           1  10  58
Test-set accuracy: 0.9268293`

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
    learningrate = learningrate,   # was fixed at 0.001, now the loop variable
    algorithm = 'rprop+',
    err.fct = 'sse',
    act.fct = 'tanh'
  )
  t2 = proc.time()
  time.cost[learningrate==learningrate.test] = (t2-t1)[3]
  print(paste0('Elapsed time: ',(t2-t1)[3],' seconds'))
}

plot(learningrate.test, time.cost,
     type = "o",                # line + points
     pch  = 16,                 # filled circle
     xlab = "Learning rate",
     ylab = "Time (seconds)",
     main = "Training time at different learning rates")`

const out0803 = `[1] "Elapsed time: 0.27000000000001 seconds"
[1] "Elapsed time: 0.259999999999991 seconds"
[1] "Elapsed time: 0.580000000000013 seconds"
[1] "Elapsed time: 0.97999999999999 seconds"
[1] "Elapsed time: 0.830000000000013 seconds"`

const code0804 = `library(neuralnet)

# 1. Read the data, clean it, and split it
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

# 2. Train with different numbers of hidden neurons and record the accuracy
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

# 3. Plot
plot(hidden.vec, train.acc, type = "o", pch = 16,
     xlab = "Number of neurons", ylab = "Training-set accuracy",
     main = "Figure 1: curve of training-set accuracy")

plot(hidden.vec, test.acc,  type = "o", pch = 15,
     xlab = "Number of neurons", ylab = "Test-set accuracy",
     main = "Figure 2: curve of test-set accuracy")`

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

# 4. Predict + evaluate
pred <- predict(nn, test)
R2   <- cor(pred, test$x6)^2
RMSE <- rmse(test$x6, pred)

cat(sprintf("R² = %.3f   RMSE = %.3f\\n", R2, RMSE))

# 5. Actual vs predicted scatter
plot(test$x6, pred,
     xlab = "Measured dry cell weight", ylab = "Predicted dry cell weight",
     main = sprintf("R² = %.3f  RMSE = %.3f", R2, RMSE))
abline(0, 1, col = "red")`

const out0899____ = `R² = 0.330   RMSE = 0.101`
</script>


# Week 8. Neural Networks

::: info Translation status
Translated from the [Chinese original](/Medical-Big-Data-Analysis/8-neural-networks). Numbers, formulas, and R code
are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Week 8 lab for *Medical Big Data Analysis and Decision Making*.
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

`Metrics`, `neuralnet`

How to install (run this once in the RStudio console):

```r
install.packages(c("Metrics", "neuralnet"))
```

> If you already have the downloaded package files at hand, you can also install from a local path:
> `install.packages("path/package.zip", repos = NULL, type = "win.binary")`
:::

## Exercise 1


- Create the R script file test0801.R, and when you have finished the tasks below, save that script file in
  the folder e:/test08.
  - This example uses the `neuralnet` neural network package in R to classify the breast cancer data. It
    builds a classification model with a neural network mainly from the first 10 descriptive attributes
    (dropping the ID attribute in column 1), in order to decide whether each sample is a benign tumor
    (Benign Tumor) or a malignant tumor (Malignancy Tumor).


The training data given in the exercise is `breastCacer2.csv`: 699 rows and 10 columns. The first 9 columns are
the 9 descriptive attributes (`CT`, `UCSize`, `UCShape`, `MA`, `SECS`, `BN`, `BC`, `NN`, `Mitoses`), and the
10th column `Class` is the class label of that sample (`0` = benign tumour, `1` = malignant tumour).
Read the data in and look at it:

```r
bcancer <- read.csv('breastCacer2.csv')
dim(bcancer)                        # 699 rows x 10 columns
head(bcancer, 10)                   # the first 10 rows, listed in the table below
bcancer2 <- bcancer[complete.cases(bcancer), ]
dim(bcancer2)                       # 683 rows x 10 columns: 16 rows with a missing BN are dropped
```

The first 10 rows look like this:

| No. | CT | UCSize | UCShape | MA | SECS | BN | BC | NN | Mitoses | Class |
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


<AnswerBlock title="Exercise 1 · Reference answer"
  description="This exercise needs `neuralnet`."
  :code="code0801"
  :output="out0801"
  :images="['/figures/en/mbd/8/dev-01.png']" />

## Exercise 2


- Create the R script file test0802.R, and when you have finished the tasks below, save that script file in
  the folder e:/test08.
  - Add to the previous example's program the code that computes and prints the confusion-matrix accuracy for
    the training set and for the test set. (After lines 31 and 35 of the previous program, following the
    related code in the big data classification lab.)


<AnswerBlock title="Exercise 2 · Reference answer"
  description="This exercise needs `neuralnet`."
  :code="code0802"
  :output="out0802"
  :images="['/figures/en/mbd/8/dev-02.png']" />

## Exercise 3


- Create the R script file test0803.R, and when you have finished the tasks below, save that script file in
  the folder e:/test08.
  - Change the algorithm parameter of the neural network model created in the previous example to “rprop+”,
    change the learning rate to 0.1, 0.05, 0.01, 0.005, and 0.001 respectively, then compute the running time
    of the program and plot its curve (set the x axis label to “Learning rate”, the y axis to “Time”, set the
    type argument of the plot function to “o”, and the plotting symbol to 16).
  - Reference code for computing the program's running time:
    - t1=proc.time()
    - #program body
    - t2=proc.time()
    - t=t2-t1
    - print(paste0('Elapsed time:',t[3],'seconds'))


<AnswerBlock title="Exercise 3 · Reference answer"
  description="This exercise needs `neuralnet`."
  :code="code0803"
  :output="out0803" />

## Exercise 4


- Create the R script file test0804.R, and when you have finished the tasks below, save that script file in
  the folder e:/test08.
  - Change the algorithm parameter of the neural network model created in the previous example to “rprop+”,
    change the learning rate to “0.01”, and change the number of hidden-layer neurons to 2, 3, 4, 5, 6, 7, 8,
    9, and 10 respectively, then run the example code above again, compare and analyze how the classification
    accuracy of the program changes, and draw two plots.
    - Figure 1: the curve of the training-set accuracy (x axis label: “Number of neurons”, y axis label:
      “Training-set accuracy”, set the type argument of the plot function to “o”, and the plotting symbol
      to 16)
    - Figure 2: the curve of the test-set accuracy (x axis label: “Number of neurons”, y axis label:
      “Test-set accuracy”, set the type argument of the plot function to “o”, and the plotting symbol to 15)


<AnswerBlock title="Exercise 4 · Reference answer"
  description="This exercise needs `neuralnet`."
  :code="code0804" />

## Supplementary exercise

<AnswerBlock title="Supplementary exercise · Reference answer (supplementary.R)"
  :code="code0899____"
  :output="out0899____" />

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
This week the data have to be split into a training set and a validation set; for the trade-off between
**sample size and power**, see the corresponding summary in *Health Statistics*.

See **[Chapter 17 of *Health Statistics*, Sample Size Estimation](/en/Health-statistics/17-sample-size)**.
:::
