#完成自定义函数
fun1302 = function(x, y, sigma1, sigma2, alt){
  m = length(x)
  n = length(y)
  z0 = (mean(x) - mean(y))/sqrt(sigma1^2/m + sigma2^2/n)
  p0 = pnorm(z0)
  switch(
    alt,
    two.sided = 2*ifelse(p0<0.5, p0, 1-p0),
    greater = 1-p0,
    less = p0
  )
}
#测试
x = rnorm(100,1)
y = rnorm(200,2,2)
fun1302(x, y, 1, 2, alt = 'two.sided')
fun1302(x, y, 1, 2, alt = 'greater')
fun1302(x, y, 1, 2, alt = 'less')