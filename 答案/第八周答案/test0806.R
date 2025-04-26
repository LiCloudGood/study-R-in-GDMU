# 在下方空白处定义函数myvar
myvar <- function(x){
  x_hat <- mean(x)
  total = 0
  for (i in x) {
    total <- total +(i - x_hat)^2
  }
  result <- total / (length(x)-1)
  return(result)
}








# 运行下面的测试代码，检验结果
x = rnorm(20,0,2)
myvar(x)
var(x)
