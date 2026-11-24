#install.packages('pROC')
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
auc(R2)
