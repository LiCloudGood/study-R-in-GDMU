x = iris[101:150,]

#par函数
par(mfrow = c(2,3))
plot(x$Sepal.Length,x$Sepal.Width)
box()
hist(x$Sepal.Length,main = 'Histogram of x$Sepal.Length',ylab = 'Frequency',border = 'black')
box()
hist(x$Sepal.Width,main = 'Histogram of x$Sepal.Width', ylab = 'Frequency',border = 'black')
box()
plot(x$Petal.Length,x$Petal.Width)
box()
hist(x$Petal.Length,main = 'Histogram of x$Petal.Length',ylab = 'Frequency',border = 'black')     
box()
hist(x$Petal.Width,main = 'Histogram of x$Petal.Width',ylab = 'Frequency',border = 'black')     
box()
par(mfrow = c(1,))

# layout函数
layout_matrix <- matrix(c(1,2,3),nrow = 2,ncol = 1)
layout(layout_matrix,widths = c(0.6,0.4),heights = c(0.5,0.5))
plot(x$Sepal.Length,x$Sepal.Width)
box()
hist(x$Sepal.Length,main = 'Histogram of x$Sepal.Length',ylab = 'Frequency',border = 'black')
box()
hist(x$Sepal.Width,main = 'Histogram of x$Sepal.Width', ylab = 'Frequency',border = 'black')
box()
par(mfrow = c(1, 1))
