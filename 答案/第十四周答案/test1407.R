# 用 McNemar 检验
x = matrix(c(598,14,90,48), byrow = TRUE, nrow = 2)
mcnemar.test(x)$p.value
# 检验 P 值约为 0，表明宣传对选科有明显的影响