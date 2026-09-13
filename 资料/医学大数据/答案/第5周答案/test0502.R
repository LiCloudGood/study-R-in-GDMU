library(rpart)
library(rpart.plot)

data <- read.table('test0602.csv', header = TRUE, sep = ',')


cat('数据维度：'); print(dim(data))




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
conf_unprune <- table(真实值 = vdata$class, 预测值 = pred_unprune)
print(conf_unprune)
acc_unprune <- sum(diag(conf_unprune)) / sum(conf_unprune)


best_cp <- unprune_tree$cptable[which.min(unprune_tree$cptable[, 'xerror']), 'CP']
prune_tree <- prune(unprune_tree, cp = best_cp)


print(prune_tree)


pred_prune <- predict(prune_tree, newdata = vdata, type = 'class')
conf_prune <- table(真实值 = vdata$class, 预测值 = pred_prune)
print(conf_prune)
acc_prune <- sum(diag(conf_prune)) / sum(conf_prune)


cat(sprintf('未剪枝准确率: %.3f，剪枝后准确率: %.3f\n', acc_unprune, acc_prune))


png('./未剪枝.png')
rpart.plot(unprune_tree, branch = 1, type = 2, fallen.leaves = TRUE,
           cex = 0.8, sub = '未剪枝')
dev.off()

png('./剪枝后.png')
rpart.plot(prune_tree, branch = 1, type = 4, fallen.leaves = TRUE,
           cex = 0.8, sub = '剪枝后')
dev.off()

