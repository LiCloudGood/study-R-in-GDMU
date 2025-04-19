age = round(runif(35, 18, 60))
x = rpois(1, 60)
y = rpois(1, 60)
z = rpois(1, 60)


over40 <- ifelse(age > 40,"是",'否')
print(over40)

tmax = ifelse(
  x > y,
  ifelse(x>z,x,z),
  ifelse(y>z,y,z)
)
cat(x,',',y,',',z,'的最大值为',tmax)
