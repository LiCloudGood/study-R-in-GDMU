library(factoextra)
library(fpc)

data <- read.csv("treatment.csv", sep = ",", header = TRUE, na.strings = "?")
head(data, 5)
data <- data[, -1]
data_scale <- scale(data)
fviz_nbclust(data_scale, kmeans, method = "silhouette")
set.seed(111)

result_kmeans <- kmeans(data_scale, 2)
stats_kmean <- cluster.stats(dist(data_scale), result_kmeans$cluster)
sli_nut_kmeans <- stats_kmean$avg.silwidth
print(sli_nut_kmeans)

library(cluster)
result_pam <- pam(data_scale, 2)
stats_pam <- cluster.stats(dist(data_scale), result_pam$cluster)
sli_nut_pam <- stats_pam$avg.silwidth
print(sli_nut_pam)

