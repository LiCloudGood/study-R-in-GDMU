x = sprintf('%04d', 1:36)
y = round(runif(36, 22, 55), digits = 0)
z = rpois(36,75) %% 3 + 1
df = data.frame(ID = x, age = y, deg = z)

