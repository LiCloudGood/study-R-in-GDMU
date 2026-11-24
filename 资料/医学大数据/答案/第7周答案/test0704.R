
if (!requireNamespace("fpc", quietly = TRUE)) {
  install.packages("fpc")
}
library(fpc)


data_points <- matrix(c(2, 10, 2, 5, 8, 4, 5, 8, 7, 5, 6, 4, 1, 2, 4, 9), ncol = 2, byrow = TRUE)
colnames(data_points) <- c("x", "y")


set.seed(1) 
kmeans_result <- kmeans(data_points, centers = 3)

pam_result <- pam(data_points, k = 3)

plot(data_points, col = kmeans_result$cluster, pch = 19, main = "K-means Clustering")
points(kmeans_result$centers, col = 2:4, pch = 4, cex = 2)


plot(data_points, col = pam_result$clustering, pch = 19, main = "K-medoids Clustering")
points(pam_result$medoids, col = 2:4, pch = 4, cex = 2)

