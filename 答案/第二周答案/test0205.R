mat1 <- matrix(1:12, nrow = 4, ncol = 3, byrow = TRUE)

mat2 <- matrix(c(1, 2, 3), nrow = 3, ncol = 3)

mat3 <- matrix(1:3, nrow = 3, ncol = 3,byrow = F)
rownames(mat3) <- c("r1", "r2", "r3")
colnames(mat3) <- c("c1", "c2",'c3')


mat4 <- matrix(c(1, 2), nrow = 2, ncol = 4,byrow = T)
mat5 <- diag(3:5)
