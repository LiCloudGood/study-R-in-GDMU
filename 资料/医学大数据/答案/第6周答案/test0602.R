install.packages('recipes')
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
  confusion_mx = table(vdata$Class,data_predict,dnn = c('真实值','预测值'))
  accuracy = (sum(diag(confusion_mx))/sum(confusion_mx))
  ay = c(ay,accuracy)
}
print(ay)
mean(ay)