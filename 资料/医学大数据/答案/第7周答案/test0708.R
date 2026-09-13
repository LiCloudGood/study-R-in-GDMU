library(factoextra)
library(fpc)
library(ggplot2)

iris_sub <- iris[, 3:4]
iris_sub_scaled <- scale(iris_sub)
fviz_nbclust(iris_sub_scaled, kmeans, method = "silhouette")

km_result <- kmeans(iris_sub_scaled, 2, nstart = 25)
stats_km <- cluster.stats(dist(iris_sub_scaled), km_result$cluster)
sli_nut_km <- stats_km$avg.silwidth
print(sli_nut_km)

fviz_cluster(km_result, iris_sub_scaled, geom = "point", ellipse = FALSE, show.clust.cent = FALSE, palette = "jco", ggtheme = theme_classic())

dist_mat <- dist(iris_sub_scaled)
hc <- hclust(dist_mat, method = "ward.D2")
fviz_dend(hc, k = 2, rect = TRUE, rect_border = "black", cex = 0.7, k_colors = c("red", "green"))
