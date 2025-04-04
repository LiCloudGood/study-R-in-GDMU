x <- c(NaN,1,NA,3,Inf,5,NULL)
length(x) == 7

x <- x[!is.na(x)]
x <- x[-which(is.infinite(x))]
