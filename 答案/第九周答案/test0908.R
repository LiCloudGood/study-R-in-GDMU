data("airmiles")
plot(airmiles, 
     type = "s",
     lwd = 2,
     col = "#0000FF",  
     main = "美国1937-1960年客运营收变化情况",
     cex.main = 1.2, 
     xlab = "年份", 
     ylab = "飞行距离"
)


data('trees')
plot(trees$Girth, trees$Volume, 
     pch = 21,
     col = 1:31, 
     bg = "white", 
     cex = 2, 
     lwd = 2, 
     main = "黑樱桃的体积和直径的关系",
     cex.main = 1.8,  
     xlab = "直径", 
     ylab = "体积", 
     cex.lab = 1.5, 
     cex.axis = 1.2
)
