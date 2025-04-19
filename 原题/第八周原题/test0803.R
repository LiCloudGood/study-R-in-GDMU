# 在下方空白处定义函数matrix_compute







# 运行下面的测试代码，检查运算结果是否正确
set.seed(1)
x = floor(runif(12,1,10))
x = matrix(x,nrow = 3)
print(x)
matrix_compute(x, flag = 1)
matrix_compute(x, flag = 2)
matrix_compute(x, flag = 3)
matrix_compute(x, flag = 4)
matrix_compute(x)

