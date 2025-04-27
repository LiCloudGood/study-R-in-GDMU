setwd("e:/test01")
install.packages("vioplot_0.4.0.tar.gz",repos = NULL)
library(vioplot)
vioplot(mtcars$wt[mtcars$cyl==4],
        mtcars$wt[mtcars$cyl==6],
        mtcars$wt[mtcars$cyl==8],
        horizontal = TRUE,
        col = 'red')
