L5_5 = read.csv('L5_5.csv')
X = L5_5$X
Y = L5_5$Y
lnY = log(Y)
hospital.model1 = lm(lnY ~X)
summary(hospital.model1)


hospital.model2 = nls(Y~a*exp(-b*X),start = list(a = 56,b = -0.04))
summary(hospital.model2)
