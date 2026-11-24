library(randomForest)
data = read.table('BreastCancerProcessed.txt',header = T,sep = ',')
set.seed(101)
train = sample(nrow(data),0.7*nrow(data))
tdata = data[train,]
vdata = data[-train,]
data_rf = randomForest(as.factor(tdata$Class)~.,data = tdata,importance = T,proximity = T)
plot(data_rf,main = '随机森林模型')
data_rf$importance
varImpPlot(data_rf,main = 'variable importance')
pre_ran = predict(data_rf,newdata = vdata)
obs_p_ran = data.frame(prob = pre_ran,obs = vdata$Class)
confusion_mx = table(vdata$Class,pre_ran,dnn = c('真实值','预测值'))
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
system("start rf_imp.png")
