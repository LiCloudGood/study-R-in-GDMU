# 自定义函数
fun1204 = function(x, alpha = 0.05, alt = 'two.sided'){
  n = length(x)
  xa = switch(
    alt,
    two.sided = c(qchisq(alpha/2, 2*n), qchisq(1-alpha/2, 2*n)),
    greater = qchisq(alpha, 2*n),
    less = qchisq(1-alpha, 2*n)
  )
  se = 2*n*mean(x)
  switch(
    alt,
    two.sided = xa / se,
    greater = c(xa/se, Inf),
    less = c(0, xa/se)
  )
}
# 测试
x = rexp(100,6)
fun1204(x)
fun1204(x, alt = 'greater')
fun1204(x, alt = 'less')