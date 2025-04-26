# 在下方空白处定义函数stat_compute
stat_compute <- function(fun, ...) {
  allowed_funs <- c("sum", "median", "mean", "var")
  fun <- match.arg(fun, allowed_funs)
  args <- list(...)
  if (length(args) == 0) {
    stop("没有提供数据进行计算！")
  }
  data <- unlist(args)
  result <- switch(fun,
                   sum = sum(data),
                   median = median(data),
                   mean = mean(data),
                   var = var(data))
  
  return(result)
}

# 运行下面的测试代码，检查运算结果是否正确
x = c(3, 9, 4, 7, 2)
stat_compute('sum', 3, 9, 4, 7, 2)
sum(x)
stat_compute('median', 3, 9, 4, 7, 2)
median(x)
stat_compute('mean', 3, 9, 4, 7, 2)
mean(x)
stat_compute('var', 3, 9, 4, 7, 2)
var(x)
