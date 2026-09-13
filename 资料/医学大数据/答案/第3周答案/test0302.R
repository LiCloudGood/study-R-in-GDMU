load('BG.rdata')
BG
str(BG)
BG.model = lm(Glu~TC +TC+TG+Insulin+GHb,data = BG)
summary(BG.model)
