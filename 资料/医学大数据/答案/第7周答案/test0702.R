iris <- iris[1:5,]
iris_cluster = iris[,1:4]
plot(iris)
iris.kmeans = kmeans(iris_cluster,3)
iris.kmeans
table(iris$Species,iris.kmeans$cluster,dnn = c('真实值','预测值'))
plot(iris_cluster$Sepal.Length,
     iris_cluster$Sepal.Width,
     col=iris.kmeans$cluster,
     pch= as.integer(iris.kmeans$cluster))
points(iris.kmeans$centers[,1],
       iris.kmeans$centers[,2],
       pch="X",
       cex=1,
       col=4)
plot(iris_cluster$Petal.Length,
     iris_cluster$Petal.Width,
     col=iris.kmeans$cluster,
     pch= as.integer(iris.kmeans$cluster))
points(iris.kmeans$centers[,3],
       iris.kmeans$centers[,4],
       pch="X",
       cex=1,
       col=4)

