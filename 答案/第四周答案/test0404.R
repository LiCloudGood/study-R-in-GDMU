head(iris)
iris_split <- split(iris,iris$Species)
print(iris_split)

lapply(iris_split,nrow)
str(iris)
tapply(iris$Sepal.Length,list(iris$Species),mean)
tapply(iris$Petal.Length,list(iris$Species),mean)
