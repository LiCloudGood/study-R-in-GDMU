library(arules)
library(arulesViz)
trans2 <- as(
  list(
    c("I1","I2","I5"),
    c("I2","I4"),
    c("I2","I3"),
    c("I1","I2","I4"),
    c("I1","I3"),
    c("I2","I3"),
    c("I1","I3"),
    c("I1","I2","I3","I5"),
    c("I1","I2","I3")
  ),
  "transactions"
)
rules2 <- apriori(trans2,
                  parameter = list(supp = 0.2, conf = 0.7, minlen = 2))
summary(rules2)
plot(rules2, measure = "confidence", method = "graph", shading = "lift")

