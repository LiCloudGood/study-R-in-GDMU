x <- na.omit(read.csv("alkfos.csv"))

plot(range(x$c0),
     range(x$c12),
     type = "n",
     xlab = "",
     ylab = "")

