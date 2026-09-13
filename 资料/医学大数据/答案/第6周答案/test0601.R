#install.packages('e1701')

library(e1071)

data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')

set.seed(101)
train = sample(nrow(data),0.7*nrow(data))
tdata = data[train,]
vdata = data[-train,]

data_naiveBayes = naiveBayes(as.factor(tdata$Class)~.,data = tdata)
print(data_naiveBayes)
data_predict = predict(data_naiveBayes,newdata = vdata)

confusion_mx = table(vdata$Class,data_predict,dnn = c('真实值','预测值'))
print(confusion_mx)
accuracy = (sum(diag(confusion_mx))/sum(confusion_mx))
print(accuracy)
