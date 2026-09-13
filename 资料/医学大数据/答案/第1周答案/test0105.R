data(airquality)
aq = na.omit(airquality)
boxplot(Temp~Month,
        data = aq,
        width = c(1:5),
        col = rainbow(5,s = 0.5,alpha = 0.7),
        range =0.8,
        staplelwd = 0.8,
        cex.main = 1.5)
