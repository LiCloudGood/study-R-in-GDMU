# 小样本，用 Fisher 精确检验
x = matrix(c(3,6,4,4),nrow = 2)
fisher.test(x)$p.value
# 检验 P 值约为 0.64，可认为两学徒的合格率不存在显著差异