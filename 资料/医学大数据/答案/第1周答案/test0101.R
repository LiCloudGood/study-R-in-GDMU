x <- rep(c(3, 2, 1), times = c(3, 4, 5))
A <-matrix(1:16,4)
B <-matrix(1:16,4,byrow = T) 
C = A+B
D = A *B
E = A%*%B
E = A[-3,]%*%B[,-3]
