library(neuralnet)
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
# 计算训练集准确率
train_accuracy <- sum(diag(table(bctrain.label, bctrain.predicted))) / length(bctrain.label)
cat("训练集准确率：", train_accuracy, "\n")
bctest.outputs = predict(net.bc,bctest)
bctest.predicted = ifelse(bctest.outputs>0.5,1,0)
table(bctest.label,bctest.predicted)
# 计算测试集准确率
test_accuracy <- sum(diag(table(bctest.label, bctest.predicted))) / length(bctest.label)
cat("测试集准确率：", test_accuracy, "\n")

