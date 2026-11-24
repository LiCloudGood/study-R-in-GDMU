library(cluster)
iris_cluster <- iris[, -5]
iris_cluster.pam = pam(iris_cluster,3)
print(iris_cluster.pam$clustering)
iris$cluster <- iris_cluster.pam$clustering
table(iris$Species,iris_cluster.pam$clustering,dnn = c('真实值','预测值'))

