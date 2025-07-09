# 自定义函数
fun1203 = function(x, y, mu1, mu2, 
                   alpha = 0.05, alt = 'two.sided'){
  m = length(x)
  n = length(y)
  fa = switch(
    alt,
    two.sided = c(qf(1-alpha/2, m, n), qf(alpha/2, m, n)),
    greater = qf(1-alpha, m, n),
    less = qf(alpha, m, n)
  )
  se = n*sum((x - mu1)^2)/(m*sum((y - mu2)^2))
  switch (
    alt,
    two.sided = se/fa,
    greater = c(se/fa, Inf),
    less = c(-Inf, se/fa)
  )
}
# 测试
x = rnorm(100, 1, 1)
y = rnorm(200, 4, 2)
fun1203(x, y, 1, 4)
fun1203(x, y, 1, 4, alt = 'greater')
fun1203(x, y, 1, 4, alt = 'less')