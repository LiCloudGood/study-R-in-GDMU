# 完成自定义函数
fun1301 = function(x, mu, alpha = 0.05, alt){
  n = length(x)
  t0 = (mean(x) - mu)/sd(x)*sqrt(n)
  p0 = pt(t0, n-1)
  p = switch(
    alt,
    two.sided = 2*ifelse(p0<0.5, p0, 1-p0),
    greater = 1 - p0,
    less = p0
  )
  int = switch(
    alt,
    two.sided = c(
      qt(alpha/2, n-1), qt(1-alpha/2, n-1)),
    greater = c(-Inf, qt(1-alpha, n-1)),
    less = c(qt(alpha, n-1), Inf)
  )
  list(statistic = t0, interval = int, p.value = p)
}
#测试
x = rnorm(100)
fun1301(x, 0, alt = 'two.sided')
fun1301(x, 0, alt = 'greater')
fun1301(x, 0, alt = 'less')