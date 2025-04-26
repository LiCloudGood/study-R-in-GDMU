data("VADeaths")
VADeaths_t <- t(VADeaths)
barplot(VADeaths_t,
        border = 2:5,
        density = 20,
        angle = c(25,50,75,100),
        col = colors()[44:47],
        legend = colnames(VADeaths),
        cex.main = 2,
        cex.lab = 1.2,
        cex.axis = 1.2,
        cex.names = 1.2,
        main = '弗吉尼亚死亡数据',
        xlab = '年龄',
        ylab = '人数/千人',
        beside = T
        )


data("UCBAdmissions")
df <- as.data.frame(UCBAdmissions)
df.m <- subset(df, Gender == "Male")
barplot(Freq ~ Admit + Dept, 
        data = df.m, 
        col = c("blue", "green"),  
        legend = c("录取人数", "未录人数"),  
        args.legend = list(x = "topright", cex = 1.2), 
        ylab = "人数", 
        xlab = "学院代码",
        main = "伯克利分析招生情况",  
        cex.main = 1.5,  
        cex.lab = 1.2,  
        cex.axis = 1.2,  
        ylim = c(0, 600),
        beside = T
)
