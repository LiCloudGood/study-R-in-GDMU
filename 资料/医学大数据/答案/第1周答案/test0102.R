A = matrix(c(1,2,3,4,5,6,7,8,10),ncol = 3,byrow = T)
b = matrix(c(1,1,1),ncol = 1)
solve(A)%*%b
