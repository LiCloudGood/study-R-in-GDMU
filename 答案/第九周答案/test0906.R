data("airquality")
x <- na.omit(airquality)
x <- subset(x, Month %in% c(5, 6, 7, 8, 9))
colors <- rainbow(5, s = 0.5, alpha = 0.7)
boxplot(Temp ~ Month, 
        data = x, 
        col = colors,  
        width = c(1, 2, 3, 4, 5),  
        range = 0.8,  
        staplewex = 0.8,  
        main = "1973年纽约气温情况（5-9月）", 
        cex.main = 1.5,   
        xlab = "月份", 
        ylab = "气温",
        names =  c("5月", "6月", "7月", "8月", "9月")
)

airquality_clean <- na.omit(airquality)
boxplot(Wind ~ Month, 
        data = airquality_clean, 
        notch = T,
        width = rep(0.5, 5),
        horizontal = T,
        col = 11:15,
        border = 'red',
        main = '1973年纽约风力情况(5-9月）',
        cex.main = 1.5,
        xlab = '风力',
        ylab = "月份",
        names =  c("5月", "6月", "7月", "8月", "9月")
        )
