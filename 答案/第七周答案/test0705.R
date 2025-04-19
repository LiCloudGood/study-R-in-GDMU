x = round(runif(100, 1, 99),digits = 0)
add <- 0
for (i in x){
  add <- add +i
}
ifelse(sum(x)==add,print('正确'),print('错误'))

i <- 1
while (i <= length(x)) {
  add <- add + x[i]
  i<- i +1
}

repeat{
  add <- add + x[i]
  i <- i + 1
  if (i > length(x)){
    break
  }
}
