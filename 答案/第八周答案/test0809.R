# 在下面空白处定义函数mysum
mysum <- function(x){
  if(x==0){
    return(0)
  }else{
    return(x +mysum(x-1))
  }
}



# 测试
mysum(100)
