x <- seq(-5, 5, by = 0.05)
plot(x, dt(x, df = 1), 
     type = "l",
     lwd = 2, 
     col = "red",
     xlab = "", 
     ylab = "",
     xaxt = "n",
     yaxt = "n",
     main = ""
)

par(new = TRUE)  
plot(x, dt(x, df = 30), 
     type = "l",  
     lwd = 2,  
     col = "blue", 
     xlab = "", 
     ylab = "", 
     xaxt = "n",  
     yaxt = "n", 
     main = "" 
)

par(new = TRUE) 
plot(x, dnorm(x), 
     type = "l", 
     lwd = 2,  
     col = "black", 
     xlab = "x", 
     ylab = "y=f(x)",
     main = "Density Curves", 
     cex.main = 1.8, 
     cex.lab = 1.5,
     cex.axis = 1.2 
)

