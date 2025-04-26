# 在下方空白定义运算符
'%xor%' <- function(x,y){
  if (!(x %in% c(0, 1)) || !(y %in% c(0, 1))){
    return(NA)
  }
  if(x == 1 && y == 1){
    return(0)
  } else if (x ==0 &&y ==0){
    return(0)
  }else{
    return(1)
  }
}






# 运行下面的测试程序
0%xor%0
0%xor%1
1%xor%0
1%xor%1
2%xor%0
1%xor%3
