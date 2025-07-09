# 用 rt 产生随机数序列 x，验证随机数近似服从标准正态分布
set.seed(1)
x = rt(100, 24)
#(1)
ks.test(x, pnorm, mean = 0, sd = 1)$p.value
# 由检验 P 值可知，可认为 x 服从标准正态分布
#(2)
#用 rnorm 产生随机数序列 y，验证两者来源于同一分布
y = rnorm(200)
ks.test(x,y)$p.value
# 检验 P 值，可认为两者是来源于同一分布，即
# x 近似服从标准正态分布