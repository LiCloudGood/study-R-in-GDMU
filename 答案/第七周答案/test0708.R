x = rnorm(100, 5, 3)
y = runif(100, 0, 10)
cor(x,y)

ymean <- mean(y)
xmean <- mean(x)

csum = 0
xsum = 0
ysum = 0
for (k in 1:length(x)) {
  csum = csum + (x[k]-xmean)*(y[k]-mean(y))
  xsum = xsum + (x[k]-xmean)^2
  ysum = ysum + (y[k]-ymean)^2
}
pho = csum/sqrt(xsum*ysum)
print(pho)

