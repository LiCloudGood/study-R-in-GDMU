rm(list=ls())
x <- iris[,c(3,4)]
names(x) <- c("Length","Width")
plot(x,
     xlab = "",
     ylab = "",
     cex.axis = 1.5,
     cex = 2,
     col = rainbow(50),
     main = "添加线条",
     cex.main = 2)

# abline:拟合直线
cf <- lm(Width ~ Length,data = x)



# lines: 正态密度曲线（x3）
set.seed(100)
t <- seq(from = 1, to = 7, by = 0.05)
y <- dnorm(t,mean = 4,sd = 0.5)