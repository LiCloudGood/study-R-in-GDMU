install.packages('ISwR')
library(ISwR)
data("melanom")
melanom$ulc <- factor(melanom$ulc, levels = c(1, 2), labels = c("yes", "no"))
melanom$group <- interaction(melanom$status, melanom$ulc, sep = "--")
desired_order <- c("1--no", "1--yes", "2--no", "2--yes", "3--no", "3--yes")
melanom$group <- ordered(melanom$group, levels = desired_order)
boxplot(thick ~ group, 
        data = melanom, 
        col = rainbow(6,v=0.8,alpha = 0.6),
        main = "黑色素瘤厚度的组间对比", 
        ylab = "厚度", 
        xlab = "生存状况-溃疡",
        ylim = c(0, 1500),  
        las = 2,
        outcol = "red",
        border = 'red',
        medcol = 'red'
)
