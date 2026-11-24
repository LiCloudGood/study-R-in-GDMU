idx = sample(1:150,40)
iris_hcluster = iris[idx,-5]
d = dist(iris_hcluster)
hc = hclust(d,method = 'ave')
plot(hc,hang = -1)
rect.hclust(hc,k = 3)
install.packages("factoextra")
library(factoextra)

fviz_dend(hc, k = 3, 
          cex = 0.7, 
          k_colors = c("red", "green", "blue"), 
          color_labels_by_k = TRUE,
          rect = TRUE, 
          rect_lty = 5, 
          rect_border = "black", 
          lower_rect = -0.5 
)
