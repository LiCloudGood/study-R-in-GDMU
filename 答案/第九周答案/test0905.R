data("UCBAdmissions")
df <- as.data.frame(UCBAdmissions)
df_admitted <- subset(df, Admit == "Admitted")
admitted_summary <- aggregate(Freq ~ Dept, data = df_admitted, sum)
x <- admitted_summary$Freq
pie(x, 
    col = 11:16,  
    density = 50,  
    border = "red",  
    labels = paste(admitted_summary$Dept, "(", round(x / sum(x) * 100, 2), "%)", sep = ""),  
    main = "各院系招生数占总人数的百分比",  
    cex.main = 1.5  
)
