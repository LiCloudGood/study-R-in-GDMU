#完成自定义函数
fun1401 = function(ni, pi){
  m = length(ni)
  n = sum(ni)
  z0 = sum((ni-n*pi)^2/(n*pi))
  1 - pchisq(z0, m-1)
}
# 测试 lambda=8?
x = scan(file = 'test1401.txt',sep = ',')
ni = table(x)
pi = dpois(as.numeric(names(ni)),8)
fun1401(ni,pi)
# 结论：服从 lambda = 8 的泊松分布
