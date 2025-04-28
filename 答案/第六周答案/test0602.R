#(1)
scan() ->x
sum(x)
mean(x)

#(2)
price <- as.integer(readline(prompt = '请输入价格:')) 
num <- as.integer(readline(prompt = "请输入数量:"))
total <- price*num
current_time <- format(Sys.time(), "%Y年%m月%d日 %H时%M分%S秒")
cat("\n----------------------------\n")
cat("您应付金额为：",total,'\n')
cat("付款时间为：",current_time)
cat("\n----------------------------\n")


