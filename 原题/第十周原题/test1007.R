x <- as.data.frame(HairEyeColor)
x.m <- subset(x,
              x$Sex=="Male",
              c("Hair","Eye","Freq"))
barplot(Freq ~ Hair + Eye, #行-列
        data = x.m,
        beside = T,
        col = c("yellow",
                "green",
                "pink",
                "blue"),
        ylim = c(0,65),
        density = c(10,20,40,60),
        angle = c(45,-45,60,-60),
        #legend.text = T,
        main = "添加图例",
        cex.main = 2.5
)
box()
