library(factoextra)
library(ggplot2)
data("multishapes")
df <- multishapes[, 1:2]
df0 <- multishapes
df0$shape <- as.factor(df0$shape)
ggplot(df0, aes(x=x, y=y, colour=shape)) + geom_point()

set.seed(123)
km_result <- kmeans(df, 5, nstart = 25)
fviz_cluster(km_result, df, geom = "point", ellipse = FALSE, show.clust.cent = FALSE, palette = "jco", ggtheme = theme_classic())

library("fpc")
set.seed(123)
db <- fpc::dbscan(df, eps = 0.15, MinPts = 5)
fviz_cluster(db, data = df, stand = FALSE, ellipse = FALSE, show.clust.cent = FALSE, geom = "point", palette = "jco", ggtheme = theme_classic())
