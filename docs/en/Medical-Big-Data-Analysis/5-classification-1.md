---
layout: doc
title: '5. Classification (Part 1)'
---

<script setup>
import { withBase } from 'vitepress'

const code0501 = `library(rpart)
library(rpart.plot)

data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')
dim = (data)
print(data[1:20,])
set.seed(101)
train = sample(1:nrow(data),0.7*nrow(data))
tdata  = data[train,]
vdata = data[-train,]

unprune_tree = rpart(as.factor(tdata$Class)~.,data = tdata,method = 'class',parms = list(split = 'information'))
printcp(unprune_tree)
print(unprune_tree)
pred_unprune_tree = predict(unprune_tree,newdata = vdata,type = 'class')
confusion_mx_unprune = table(vdata$Class,pred_unprune_tree,dnn = c('Actual','Predicted'))
print(confusion_mx_unprune)
accuracy_unprune = (sum(diag(confusion_mx_unprune))/sum(confusion_mx_unprune))
prune_tree = prune(unprune_tree,cp = unprune_tree$cptable[which.min(unprune_tree$cptable[,'xerror']),'CP'])

print(prune_tree)
pred_unprune_tree = predict(prune_tree,newdata = vdata,type = 'class')
confusion_mx_unprune=table(vdata$Class,pred_unprune_tree,dnn = c('Actual','Predicted'))
print(confusion_mx_unprune)
accuracy_prune = (sum(diag(confusion_mx_unprune))/sum(confusion_mx_unprune))
sprintf('the accuracy of unpruned tree is %.3f,the accuraty of pruned tree is %.3f',accuracy_unprune,accuracy_prune)
png(file = './未剪枝.png')
rpart.plot(unprune_tree,branch=1,type = 2,fallen.leaves = T,cex = 0.8,sub = 'Unpruned')
dev.off()
png(file = './剪枝后.png')
rpart.plot(prune_tree,branch = 1,type = 4,fallen.leaves = T,cex = 0.8,sub = 'Pruned')
dev.off()`

const out0501 = `Age Menopause TumorSize InvNodes NodeCaps DegMalig BreastQuad Irradiat Class
1   A4        M3        T4      IN1       N1       D3        BQ1      IR0    C1
2   A5        M2        T4      IN1       N0       D1        BQ5      IR0    C0
3   A5        M2        T8      IN1       N0       D2        BQ2      IR0    C1
4   A4        M3        T8      IN1       N1       D3        BQ2      IR1    C1
5   A4        M3        T7      IN2       N1       D2        BQ3      IR0    C1
6   A5        M3        T6      IN2       N0       D2        BQ1      IR1    C0
7   A5        M2        T9      IN1       N0       D3        BQ1      IR0    C1
8   A4        M3        T3      IN1       N0       D2        BQ1      IR0    C0
9   A4        M3        T1      IN1       N0       D2        BQ4      IR0    C0
10  A4        M2        T9      IN6       N1       D2        BQ1      IR1    C1
11  A5        M3        T6      IN1       N0       D2        BQ2      IR0    C0
12  A6        M2        T4      IN1       N0       D2        BQ1      IR0    C0
13  A5        M2        T7      IN1       N0       D1        BQ5      IR0    C0
14  A5        M2        T6      IN1       N0       D2        BQ1      IR0    C0
15  A4        M3        T6      IN1       N0       D2        BQ2      IR1    C1
16  A3        M3        T5      IN1       N0       D3        BQ5      IR0    C0
17  A5        M3        T3      IN2       N0       D1        BQ1      IR0    C0
18  A6        M2        T4      IN1       N0       D2        BQ1      IR0    C0
19  A5        M3        T9      IN1       N0       D2        BQ1      IR0    C1
20  A5        M2        T5      IN1       N0       D3        BQ1      IR0    C0

Classification tree:
rpart(formula = as.factor(tdata$Class) ~ ., data = tdata, method = "class",
    parms = list(split = "information"))

Variables actually used in tree construction:
[1] BreastQuad DegMalig   NodeCaps   TumorSize

Root node error: 94/193 = 0.48705

n= 193

        CP nsplit rel error  xerror     xstd
1 0.563830      0   1.00000 1.18085 0.073057
2 0.085106      1   0.43617 0.44681 0.060983
3 0.026596      2   0.35106 0.38298 0.057570
4 0.014184      4   0.29787 0.37234 0.056945
5 0.010000      7   0.25532 0.37234 0.056945
n= 193

node), split, n, loss, yval, (yprob)
      * denotes terminal node

 1) root 193 94 C0 (0.5129534 0.4870466)
   2) TumorSize=T1,T2,T3,T4,T5,T6 116 29 C0 (0.7500000 0.2500000)
     4) DegMalig=D1 32  1 C0 (0.9687500 0.0312500) *
     5) DegMalig=D2,D3 84 28 C0 (0.6666667 0.3333333)
      10) NodeCaps=N0 69 18 C0 (0.7391304 0.2608696)
        20) TumorSize=T2,T3 9  0 C0 (1.0000000 0.0000000) *
        21) TumorSize=T1,T4,T5,T6 60 18 C0 (0.7000000 0.3000000)
          42) BreastQuad=BQ1,BQ4,BQ5 30  5 C0 (0.8333333 0.1666667) *
          43) BreastQuad=BQ2,BQ3 30 13 C0 (0.5666667 0.4333333)
            86) TumorSize=T4,T5 16  4 C0 (0.7500000 0.2500000) *
            87) TumorSize=T6 14  5 C1 (0.3571429 0.6428571) *
      11) NodeCaps=N1 15  5 C1 (0.3333333 0.6666667) *
   3) TumorSize=T10,T11,T7,T8,T9 77 12 C1 (0.1558442 0.8441558)
     6) DegMalig=D1 16  4 C0 (0.7500000 0.2500000) *
     7) DegMalig=D2,D3 61  0 C1 (0.0000000 1.0000000) *
      Predicted
Actual C0 C1
    C0 34 12
    C1  9 29
n= 193

node), split, n, loss, yval, (yprob)
      * denotes terminal node

 1) root 193 94 C0 (0.5129534 0.4870466)
   2) TumorSize=T1,T2,T3,T4,T5,T6 116 29 C0 (0.7500000 0.2500000)
     4) DegMalig=D1 32  1 C0 (0.9687500 0.0312500) *
     5) DegMalig=D2,D3 84 28 C0 (0.6666667 0.3333333)
      10) NodeCaps=N0 69 18 C0 (0.7391304 0.2608696) *
      11) NodeCaps=N1 15  5 C1 (0.3333333 0.6666667) *
   3) TumorSize=T10,T11,T7,T8,T9 77 12 C1 (0.1558442 0.8441558)
     6) DegMalig=D1 16  4 C0 (0.7500000 0.2500000) *
     7) DegMalig=D2,D3 61  0 C1 (0.0000000 1.0000000) *
      Predicted
Actual C0 C1
    C0 40  6
    C1  9 29
[1] "the accuracy of unpruned tree is 0.750,the accuraty of pruned tree is 0.821"
png
  2
png
  2`

const code0502 = `library(rpart)
library(rpart.plot)

data <- read.table('test0602.csv', header = TRUE, sep = ',')


cat('Data dimensions: '); print(dim(data))




set.seed(101)
train <- sample(1:nrow(data), 0.7 * nrow(data))
tdata <- data[train, ]
vdata <- data[-train, ]


unprune_tree <- rpart(as.factor(class) ~ .,
                      data = tdata,
                      method = 'class')


printcp(unprune_tree)
print(unprune_tree)


pred_unprune <- predict(unprune_tree, newdata = vdata, type = 'class')
conf_unprune <- table(Actual = vdata$class, Predicted = pred_unprune)
print(conf_unprune)
acc_unprune <- sum(diag(conf_unprune)) / sum(conf_unprune)


best_cp <- unprune_tree$cptable[which.min(unprune_tree$cptable[, 'xerror']), 'CP']
prune_tree <- prune(unprune_tree, cp = best_cp)


print(prune_tree)


pred_prune <- predict(prune_tree, newdata = vdata, type = 'class')
conf_prune <- table(Actual = vdata$class, Predicted = pred_prune)
print(conf_prune)
acc_prune <- sum(diag(conf_prune)) / sum(conf_prune)


cat(sprintf('Accuracy of unpruned tree: %.3f, accuracy of pruned tree: %.3f\n', acc_unprune, acc_prune))


png('./未剪枝.png')
rpart.plot(unprune_tree, branch = 1, type = 2, fallen.leaves = TRUE,
           cex = 0.8, sub = 'Unpruned')
dev.off()

png('./剪枝后.png')
rpart.plot(prune_tree, branch = 1, type = 4, fallen.leaves = TRUE,
           cex = 0.8, sub = 'Pruned')
dev.off()`

const out0502 = `Data dimensions: [1] 140   5

Classification tree:
rpart(formula = as.factor(class) ~ ., data = tdata, method = "class")

Variables actually used in tree construction:
[1] age     credit  student

Root node error: 35/98 = 0.35714

n= 98

        CP nsplit rel error  xerror    xstd
1 0.300000      0   1.00000 1.00000 0.13553
2 0.085714      2   0.40000 0.54286 0.11182
3 0.010000      3   0.31429 0.45714 0.10454
n= 98

node), split, n, loss, yval, (yprob)
      * denotes terminal node

 1) root 98 35 yes (0.3571429 0.6428571)
   2) student=no 51 22 no (0.5686275 0.4313725)
     4) age=youth 21  0 no (1.0000000 0.0000000) *
     5) age=middle_aged,senior 30  8 yes (0.2666667 0.7333333)
      10) credit=excellent 13  5 no (0.6153846 0.3846154) *
      11) credit=fair 17  0 yes (0.0000000 1.0000000) *
   3) student=yes 47  6 yes (0.1276596 0.8723404) *
      Predicted
Actual no yes
   no  11   4
   yes  5  22
n= 98

node), split, n, loss, yval, (yprob)
      * denotes terminal node

 1) root 98 35 yes (0.3571429 0.6428571)
   2) student=no 51 22 no (0.5686275 0.4313725)
     4) age=youth 21  0 no (1.0000000 0.0000000) *
     5) age=middle_aged,senior 30  8 yes (0.2666667 0.7333333)
      10) credit=excellent 13  5 no (0.6153846 0.3846154) *
      11) credit=fair 17  0 yes (0.0000000 1.0000000) *
   3) student=yes 47  6 yes (0.1276596 0.8723404) *
      Predicted
Actual no yes
   no  11   4
   yes  5  22
Accuracy of unpruned tree: 0.786, accuracy of pruned tree: 0.786
png
  2
png
  2`

const code0503 = `library(randomForest)
data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')
set.seed(101)
train = sample(nrow(data),0.7*nrow(data))
tdata = data[train,]
vdata = data[-train,]
data_rf = randomForest(as.factor(tdata$Class)~.,data = tdata,importance = T,proximity = T)
plot(data_rf,main = 'Random Forest Model')
data_rf$importance
varImpPlot(data_rf,main = 'variable importance')
pre_ran = predict(data_rf,newdata = vdata)
obs_p_ran = data.frame(prob = pre_ran,obs = vdata$Class)
confusion_mx = table(vdata$Class,pre_ran,dnn = c('Actual','Predicted'))
accuracy = (sum(diag(confusion_mx))/sum(confusion_mx))
print(accuracy)

round(prop.table(confusion_mx, 1), 3)

heatmap(confusion_mx, Colv = NA, Rowv = NA,
        scale = "none", margins = c(5, 5),
        main = "Confusion Matrix - Random Forest")

png("rf_oob.png", width = 700, height = 500)
plot(data_rf, main = "RandomForest OOB error")
dev.off()
system("start rf_oob.png")

png("rf_imp.png", width = 700, height = 500)
varImpPlot(data_rf, main = "Variable Importance")
dev.off()
system("start rf_imp.png")`

const out0503 = `C0            C1 MeanDecreaseAccuracy MeanDecreaseGini
Age        0.010081992  0.0004109448          0.005265598         5.543673
Menopause  0.013554846 -0.0036643035          0.005325272         3.209458
TumorSize  0.122088335  0.1178678925          0.119180141        27.514568
InvNodes   0.025876512 -0.0010441325          0.012412644         6.363664
NodeCaps   0.039835136  0.0053502238          0.022431476         5.509318
DegMalig   0.065728197  0.0655673347          0.065080059        15.172928
BreastQuad 0.006426805  0.0053050650          0.005993280         6.754121
Irradiat   0.019938123 -0.0017871595          0.009163419         3.902118
[1] 0.8452381
      Predicted
Actual    C0    C1
    C0 0.913 0.087
    C1 0.237 0.763
png
  2
[1] 127
png
  2
[1] 127`
</script>


# Week 5. Classification (Part 1)

::: info Translation status
Translated from the [Chinese original](/Medical-Big-Data-Analysis/5-classification-1). Numbers, formulas,
and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

> Week 5 lab for *Medical Big Data Analysis and Decision Making*.
> The exercises are compiled from the course slides; the reference answers and the results shown here were
> actually run on this machine.

## What this lecture covers

- **Exercise 1**
- **Exercise 2**
- **Exercise 3**

::: warning Before you start: install the R packages this lecture needs

The scripts in this lecture use the packages below. **If they are not installed, the script will fail
with an error right at the `library()` step.**

`randomForest`, `rpart`, `rpart.plot`

How to install (run this once in the RStudio console):

```r
install.packages(c("randomForest", "rpart", "rpart.plot"))
```

> If you already have the downloaded package files at hand, you can also install from a local path:
> `install.packages("path/package.zip", repos = NULL, type = "win.binary")`
:::

## Exercise 1


- Create the R script file test0501.R, and when you have finished the tasks below, save that script file in
  the folder e:/test05.
  - (1) A classification algorithm example — predicting breast cancer. Install and load the packages “rpart” and
    “rpart.plot”, read the source data set BreastCancerProcessed.txt, build a decision tree with the ID3
    algorithm, and prune it by setting an appropriate cp value so as to obtain a decision tree with a smaller
    cross-validation error, then draw the decision tree before and after pruning.


The data file here is `BreastCancerProcessed.txt` (277 records, 9 attributes, comma-separated, with a header
row). The first step reads it in, prints the first 20 records, and splits the data 7:3 into a training set and
a test set:

```r
data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')
dim = (data)
print(data[1:20,])
set.seed(101)
train = sample(1:nrow(data),0.7*nrow(data))
tdata  = data[train,]
vdata = data[-train,]
```

Next the tree is grown with the ID3 algorithm (`parms = list(split = 'information')` is what makes it split on
information gain), the CP table and the tree structure are printed, the tree is applied to the test set to get
the unpruned tree's accuracy, and it is finally pruned at the CP value with the smallest cross-validation error:

```r
unprune_tree = rpart(as.factor(tdata$Class)~.,data = tdata,method = 'class',parms = list(split = 'information'))
printcp(unprune_tree)
print(unprune_tree)
pred_unprune_tree = predict(unprune_tree,newdata = vdata,type = 'class')
confusion_mx_unprune = table(vdata$Class,pred_unprune_tree,dnn = c('Actual','Predicted'))
print(confusion_mx_unprune)
accuracy_unprune = (sum(diag(confusion_mx_unprune))/sum(confusion_mx_unprune))
prune_tree = prune(unprune_tree,cp = unprune_tree$cptable[which.min(unprune_tree$cptable[,'xerror']),'CP'])
```

The pruned tree goes through the same test-set prediction and accuracy calculation, and the two trees are then
drawn into two image files:

```r
print(prune_tree)
pred_unprune_tree = predict(prune_tree,newdata = vdata,type = 'class')
confusion_mx_unprune=table(vdata$Class,pred_unprune_tree,dnn = c('Actual','Predicted'))
print(confusion_mx_unprune)
accuracy_prune = (sum(diag(confusion_mx_unprune))/sum(confusion_mx_unprune))
sprintf('the accuracy of unpruned tree is %.3f,the accuraty of pruned tree is %.3f',accuracy_unprune,accuracy_prune)
png(file = './未剪枝.png')
rpart.plot(unprune_tree,branch=1,type = 2,fallen.leaves = T,cex = 0.8,sub = 'Unpruned')
dev.off()
png(file = './剪枝后.png')
rpart.plot(prune_tree,branch = 1,type = 4,fallen.leaves = T,cex = 0.8,sub = 'Pruned')
dev.off()
```


<AnswerBlock title="Exercise 1 · Reference answer"
  description="This exercise needs `rpart` and `rpart.plot`."
  :code="code0501"
  :output="out0501" />

## Exercise 2


- Create the R script file test0502.R, and when you have finished the tasks below, save that script file in
  the folder e:/test05.
  - (1) Following Exercise 1, enter the table below into Excel (including the header), copy the 14 tuples 10
    times to produce 140 tuples, then save the file in CSV format and read it in with the `read.csv()`
    function. Draw the decision trees before and after pruning, and compare the accuracy of the two decision
    tree models. (The format of the table to enter is the one in the figure below.)

| age | income | student | credit | class |
| --- | --- | --- | --- | --- |
| youth | high | no | fair | no |
| youth | high | no | excellent | no |
| middle_aged | high | no | fair | yes |
| senior | medium | no | fair | yes |
| senior | low | yes | fair | yes |
| senior | low | yes | excellent | no |
| middle_aged | low | yes | excellent | yes |
| youth | medium | no | fair | no |
| youth | low | yes | fair | yes |
| senior | medium | yes | fair | yes |
| youth | medium | yes | excellent | yes |
| middle_aged | medium | no | excellent | yes |
| middle_aged | high | yes | fair | yes |
| senior | medium | no | excellent | no |


<AnswerBlock title="Exercise 2 · Reference answer"
  description="This exercise needs `rpart` and `rpart.plot`."
  :code="code0502"
  :output="out0502" />

## Exercise 3


- Create the R script file test0503.R, and when you have finished the tasks below, save that script file in
  the folder e:/test05.
  - (1) A random forest algorithm example — predicting breast cancer. Install and load the randomForest package,
    use the `randomForest()` function to grow 500 trees, and draw the line plot of the model error together
    with the variable importance plot.


This exercise uses the same data file, `BreastCancerProcessed.txt`, splits it 7:3 the same way, and then fits
the model with `randomForest()`. The exercise asks for 500 trees, and the `ntree` default of `randomForest()`
is exactly 500, so the script does not have to pass that argument (the courseware also has an
`install.packages('randomForest')` line; installing packages is already covered by the warning box at the top
of this page):

```r
data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')
set.seed(101)
train = sample(nrow(data),0.7*nrow(data))
tdata = data[train,]
vdata = data[-train,]
data_rf = randomForest(as.factor(tdata$Class)~.,data = tdata,importance = T,proximity = T)
```

Once the model is built, it draws the model-error line plot and the variable importance plot, then predicts on
the test set and outputs the confusion matrix and the accuracy:

```r
plot(data_rf,main = 'Random Forest Model')
data_rf$importance
varImpPlot(data_rf,main = 'variable importance')
pre_ran = predict(data_rf,newdata = vdata)
obs_p_ran = data.frame(prob = pre_ran,obs = vdata$Class)
confusion_mx = table(vdata$Class,pre_ran,dnn = c('Actual','Predicted'))
accuracy = (sum(diag(confusion_mx))/sum(confusion_mx))
print(accuracy)
```


<AnswerBlock title="Exercise 3 · Reference answer"
  description="This exercise needs `randomForest`."
  :code="code0503"
  :output="out0503"
  :images="['/figures/en/mbd/5/plot-01.png', '/figures/en/mbd/5/plot-02.png', '/figures/en/mbd/5/plot-03.png']" />

## Running environment

The “results” on this page were obtained by running **all of this week's scripts in order in the same R
session** (reproducing the process of working through them one by one in RStudio), so a later script can use
variables defined by an earlier one.

::: tip When you do it yourself
Write it yourself from the exercise first, and only look at the reference answer when you cannot work it out — the answers are collapsed by default.
Before you run anything, remember to set the working directory to the folder that holds the data files.
:::
