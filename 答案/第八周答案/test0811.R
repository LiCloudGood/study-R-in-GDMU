# 在下面空白处，定义函数mygcd
mygcd <- function(a,b){
  r <- a%%b
  a <- b
  b <- r
  if (r == 0){
    return(a)
  }else{
    return(mygcd(a,b))
  }
}




# 测试
mygcd(24,32)
mygcd(32,24)
