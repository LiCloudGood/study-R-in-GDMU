# 在下面空白处定义函数dec2bin
dec2bin <- function(x){
  binary_string <- ''
  while (x>0) {
    remainder <- x%%2
    binary_string <- paste0(remainder,binary_string)
    x <- x %/% 2
  }
  return(binary_string)
}









# 运行下面代码，验证结果
dec2bin(14) # 1110
dec2bin(123) # 1111011
dec2bin(2203) # 100010011011
