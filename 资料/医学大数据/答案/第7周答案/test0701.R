set.seed(1)
x = matrix(rnorm(28),nrow = 4)
print(x)

man_dist <- dist(x, method = "manhattan", diag = TRUE, upper = TRUE)
print(man_dist)

mink_dist <- dist(x, method = "minkowski", p = 3, diag = TRUE, upper = FALSE)
print(mink_dist)
