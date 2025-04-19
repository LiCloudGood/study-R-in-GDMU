by(iris$Petal.Length,iris$Species,mean)
by(iris$Sepal.Length,iris$Species,mean)
tapply(iris$Petal.Length,list(iris$Species),median)
tapply(iris$Sepal.Length,list(iris$Species),median)
aggregate(iris[,-5],list(iris[[5]]),mean)

