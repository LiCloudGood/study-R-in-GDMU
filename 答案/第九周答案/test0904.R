n = 100
x <- rpois(n,5)

pie(x,
    col = rainbow(n),
    border = NA,
    labels = rep('',n),
    main = '彩虹饼图（n=100）'
    )


data("WorldPhones")
data_1961 <- WorldPhones['1961',]
x<- data_1961[1:5]
other <- sum(data_1961['Africa'],data_1961['Mid.Amer'])
names(other) <- 'other'
x <- c(x,other)
proportions <- round(x / sum(x) * 100, 2)
labels <- paste(names(x), "(", proportions, "%)", sep = "")
pie(x,
    col = rainbow(length(x), s = 0.4, alpha = 0.6),
    border = 'black',
    main = '1961年各大洲电话使用情况',
    cex.main = 1.5,
    labels = labels)
