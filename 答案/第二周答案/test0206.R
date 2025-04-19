set.seed(1)
x = rpois(12,30)
mat = matrix(x,nrow = 4)
mat

rownames(mat) <- c("第1行", "第2行", "第3行", "第4行")
colnames(mat) <- c("第1列", "第2列", "第3列")

mat["第2行", "第3列"] <- -15
y <- mat[-3, ]
mat[c("第1行", "第3行"), ] <- c(-10, -20)
mat[, c("第1列", "第2列")] <- c(-100, -200)
