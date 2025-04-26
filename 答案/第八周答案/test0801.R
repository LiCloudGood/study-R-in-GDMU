# 在下面空白定义函数count_even,
# 然后统计向量x中偶数个数
count_even <- function(x){
  if (missing(x)){
    stop('没有输入被检测向量！')
  }
  if (!is.vector(x)){
    stop('输入数据对象不是向量！')
  }
  if (!is.numeric(x)){
    warning('输入数据不是数值型数据！')
    return(0)
    
  }
  count <- 0
  for (i in x){
    if (i%%2==0){
      count <- count + 1 
    }
  }
  return(count)
}







# 运行下面的代码，
# 观察结果是否满足题目要求
x = round(runif(20,1,100),digits = 0)
print(x)
y = 20
z = c(FALSE, TRUE, FALSE, TRUE, TRUE)
w = matrix(1:12,nrow = 3)

count_even(x)
count_even()
count_even(y)
count_even(z)

