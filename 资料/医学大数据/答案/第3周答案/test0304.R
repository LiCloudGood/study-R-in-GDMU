L5_4 = read.csv('L5_4.csv')
X = L5_4$X
Y = L5_4$Y
XP = log(X)
IgA.model = lm(Y~XP)
summary(IgA.model)
