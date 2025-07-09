x = matrix(c(13, 13, 12, 6, 9, 8, 5, 7, 9), nrow = 3, byrow = TRUE)
# install.packages('epiR')
epiR::epi.kappa(x, method = 'cohen')$z$p.value
# 返回 P 值约为 0.33，可认为两医生的诊疗结论是一致的