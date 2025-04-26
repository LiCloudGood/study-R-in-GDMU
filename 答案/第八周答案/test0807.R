# 请下方空白定义函数bin2dec
bin2dec <- function(sbin){
  if (grepl('[^01]',sbin)){
    stop('输入包含了非0-1字符串')
  }
  decimal_value <- as.integer(strtoi(sbin, base = 2))
  return(decimal_value)
}








#运行下面代码，检验程序结果
bin2dec("1021") # 错误
bin2dec("1001") # 9
bin2dec("101011") # 43

