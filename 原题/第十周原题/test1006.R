t <- seq(from = 0, to = pi, by = 0.01*pi)

plot(t,
     sin(2*t+1),
     type = "l",
     col = "red",
     yaxt = "n",
     xaxt = "n",
     xlab = "",
     ylab = "")

par(new = T)

plot(t,
     cos(4*t-3),
     type = "l",
     col = "blue",
     yaxt = "n",
     xaxt = "n",
     xlab = "",
     ylab = "")

par(new = T)

plot(t,
     0.4*t - 0.2,
     type = "l",
     col = "green",
     lwd = 2,
     xlab = "",
     ylab = "")
