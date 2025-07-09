#自定义函数
fun1202 = function(
    x, y, sigma1, sigma2, alpha = 0.05,
    alt = 'two.sided'){
  m = length(x)
  n = length(y)
  ua = ifelse(
    alt == 'two.sided',
    qnorm(alpha/2),
    qnorm(alpha)
  )
  se = sqrt(sigma1^2/m + sigma2^2/n)
  avg = mean(x)-mean(y)
  switch (
    alt,
    two.sided = avg + c(ua, -ua)*se,
    greater = c(avg + ua*se, Inf),
    less = c(-Inf, avg - ua*se)
  )
}
# 测试自定义函数
x = rnorm(100, 1, 2)
y = rnorm(50, 1, 1)
fun1202(x,y,2,1)
fun1202(x,y,2,1,alt = 'greater')
fun1202(x,y,2,1,alt = 'less')