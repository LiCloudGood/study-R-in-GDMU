# 在下面空白处定义函数myrecur
myrecur <- function(x, n) {
  x_str <- as.character(x)
  if (n == 1) {
    return(as.numeric(substr(x_str, nchar(x_str), nchar(x_str))))
  } else {
    return(myrecur(x %/% 10, n - 1))
  }
}

# 测试
myrecur(3627854,3) #8
myrecur(3627854,6) #6
