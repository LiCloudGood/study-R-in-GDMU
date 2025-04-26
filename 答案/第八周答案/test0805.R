# 在下方空白处定义函数myfuture
myfuture <- function(P,r=2.7,y,t){
  if (missing(y)){
    stop("未输入存款的年数")
  }
  if (missing(t)){
    t <- 12
    warning("参数被设置为12")
  }
  future_value <- ((1 + (r / 100 / t))^(t * y)) * P
  return(future_value)

}







# 运行下面的测试代码
myfuture(10000,y = 5)
myfuture(10000,r = 2.4)
myfuture(10000, r = 2.5, y = 10, t = 12)
# Excel的验证公式如下
# =FV(0.025/12, 120, 0,10000,0)