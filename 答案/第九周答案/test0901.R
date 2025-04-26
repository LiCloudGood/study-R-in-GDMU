install.packages('ISwR')
library(ISwR)
head(nickel.expand)
hist(nickel.expand$age1st, 
     breaks = 20,  
     col = "blue",  
     border = "red",  
     density = 20,  
     angle = -60,  
     xlim = c(10, 50),  
     ylim = c(0, 600),  
     main = "镍暴露年龄直方图",  
     xlab = "年龄",
     ylab = "人数"
)

set.seed(10000)
x <- rnorm(1000,3,2)

x_range <- range(x)
min <- x_range[1]
max <- x_range[2]
breaks <- seq(from = min, to = max,length.out = 11)
freq_table <- table(cut(x,breaks = breaks,include.lowest = T))
lbs <- as.character(freq_table)
hist(x,
     breaks = breaks,
     col = colors()[51:60],
     labels = lbs,
     cex.main = 2,
     cex.axis = 1.5,
     cex.lab = 1.5,
     main = "正态随机数的直方图",
     xlab = "分位数",
     ylab = "频数")
