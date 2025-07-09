# 在大括号内完成函数的定义
fun1201 = function(x, alpha = 0.05, alt = 'two.sided'){
  n = length(x)
  ta = switch(
    alt,
    two.sided = qt(alpha/2, n-1),
    greater = qt(alpha, n-1),
    less = qt(1-alpha, n-1)
  )
  avg = mean(x)
  se = sd(x)/sqrt(n)
  switch(
    alt,
    two.sided = avg + c(ta, -ta)*se,
    greater = c(avg + ta*se, Inf),
    less = c(-Inf, avg + ta*se)
  )
}
#用 fun1201 函数计算 x 的双侧与单侧区间
x = rnorm(100)
fun1201(x)
fun1201(x, alt = 'greater')
fun1201(x, alt = 'less')
#用 t.test 函数计算 x 的双侧区间
as.numeric(t.test(x)$conf.int)