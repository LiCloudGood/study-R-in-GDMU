L5_6 = read.csv('L5_6.csv')
t = L5_6$t
y = L5_6$y
bacteria.model1 = lm(y~poly(t,2))
summary(bacteria.model1)
plot(y~t,xlab = 't(照射次数)',ylab = 'y(残留细胞数)',type = 'b')
points(fitted.values(bacteria.model1),t,pch = 16,col = 'DeepPink',cex = 1)
lines(fitted.values(bacteria.model1),col = 'DeepPink',Ity = 2)
legend(10,350,c('原始数据','非线性回归'),col = c('black','DeepPink'),text.col = c('black','DeepPink'),pch = c(15,16),lty = c(1,2))

bacteria.model2 = nls(y~a*exp(b*t),start = list(a = 148,b = -0.2))
summary(bacteria.model2)
