library(neuralnet)

# 1. 读数据、清洗、划分
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

# 2. 不同隐藏神经元个数训练 & 记录准确率
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

# 3. 画图
plot(hidden.vec, train.acc, type = "o", pch = 16,
     xlab = "神经元个数", ylab = "训练集正确率",
     main = "图1：训练集正确率的变化曲线")

plot(hidden.vec, test.acc,  type = "o", pch = 15,
     xlab = "神经元个数", ylab = "测试集正确率",
     main = "图2：测试集正确率的变化曲线")
