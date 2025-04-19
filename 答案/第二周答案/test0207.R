set.seed(100)
x = matrix(rpois(9,10),nrow = 3)
set.seed(200)
y = matrix(rpois(12,10),nrow = 3)
z = matrix(1:3,nrow = 3)
w = c(3,7,1)
u = matrix(1:9,nrow = 3)

print(x + u)
print(x + y)

print(x * w)
print(x * z)

print(x %*% y)
print(y %*% x)
print(x %*% w)

print(diag(x))

print(t(y))

print(det(x))

print(eigen(x)$values)

print(eigen(y))