setwd("E:/test01")
getwd()
version
source("test0102.R")
setwd("E:/")
source("test0102.R") #会报错，因为文件不在当前目录
source('E:/test01/test0102.R')