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

learningrate.test = c(0.1,0.05,0.01,0.005,0.001)
time.cost = numeric(length(learningrate.test))   
for (learningrate in learningrate.test){         
  t1 = proc.time()
  net.bc = neuralnet(
    Class ~ CT+UCSize+UCShape+MA+SECS+BN+BC+NN+Mitoses,
    data = bc.train,
    hidden = 4,
    stepmax = 1e+6,
    learningrate = learningrate,   # 原固定0.001，改为循环变量
    algorithm = 'rprop+',
    err.fct = 'sse',
    act.fct = 'tanh'
  )
  t2 = proc.time()
  time.cost[learningrate==learningrate.test] = (t2-t1)[3]  
  print(paste0('执行时间:',(t2-t1)[3],'秒'))               
}

plot(learningrate.test, time.cost,
     type = "o",                # 折线+点
     pch  = 16,                 # 实心圆点
     xlab = "学习率",
     ylab = "时间（秒）",
     main = "不同学习率下的训练耗时")


