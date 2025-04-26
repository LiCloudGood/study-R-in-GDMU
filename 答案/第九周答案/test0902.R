install.packages('ISwR')
library(ISwR)
head(USPersonalExpenditure)

barplot(USPersonalExpenditure,
        col = 2:6,
        width  = 1:5,
        cex.main = 2,
        cex.lab = 1.5,
        cex.axis = 1.5,
        cex.names = 1.5,
        main = '每年消费数据对比',
        xlab = '年份',
        ylab = '金额/十亿')

USPersonalExpenditure_t <- t(USPersonalExpenditure)
barplot(USPersonalExpenditure_t,
        beside = T,
        col = 2:6,
        space = c(0.2,3),
        cex.main = 2,
        cex.lab = 1.5,
        cex.axis = 1.2,
        cex.names = 1.5,
        log = 'y',
        axisnames = T,
        main = '五项消费数据对比',
        xlab = '----五年数据对比----')
