set.seed(1)
x = round(rnorm(100, 10, 10),digits = 2)

s=0
x
for(k in x){
  if(k<0)next
  if(k>30)break
  s = s+k
}
print(s)
