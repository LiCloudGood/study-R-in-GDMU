#完成自定义函数
fun1306 = function(x, lambda, alt){
  n = length(x)
  z0 = 2*n*lambda*mean(x)
  p0 = pchisq(z0, 2*n)
  switch(
    alt,
    two.sided = 2*min(p0,1-p0),# 2*ifelse(p0<0.5, p0, 1-p0)
    greater = 1-p0,
    less = p0
  )
}
# 测试
x = rexp(100,3)
fun1306(x, 3, alt = 'two.sided')
fun1306(x, 3, alt = 'greater')
fun1306(x, 3, alt = 'less')