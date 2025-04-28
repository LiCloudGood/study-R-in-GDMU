# （1）
mat <- matrix(c(5, 3, 9, 10, 8, 15, 2, 9, 13, 17, 7, 9), nrow = 3, ncol = 4)  # 定义一个 3x4 的矩阵
str <- c("咳嗽", "头痛", "低烧")
num <- 178

# （2）
save.image("save-all.txt")  
dir()  

# （3）
save(mat, str, file = "save-part.txt") 
dir()  

# （4）
rm(list = ls())  

# （5）
ls()  
num / 100  

# （6）
load("save-all.txt")  
num / 100  