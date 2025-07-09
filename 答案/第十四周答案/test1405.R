x = c(61, 33, 29, 31, 51, 41, 24, 20, 12)
x = matrix(x, nrow = 3, byrow = TRUE)
chisq.test(x)$p.value
#检验 P 值约为 0.0022，在显著水平为 0.05 的条件下，
#可认为疗效与年龄段有关