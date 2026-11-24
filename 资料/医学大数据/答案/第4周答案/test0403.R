library(arules)
library(arulesViz)
trans3 <- as(
  list(
    c("卡马西平片", "丙戊酸钠缓释片"),
    c("奥卡西平片", "茴拉西坦分散片"),
    c("奥卡西平片", "丙戊酸钠口服液"),
    c("丙戊酸钠缓释片", "奥卡西平片", "茴拉西坦分散片"),
    c("丙戊酸钠缓释片", "奥卡西平片"),
    c("丙戊酸钠缓释片", "奥卡西平片", "卡马西平片")
  ),
  "transactions"
)
rules3 <- apriori(trans3,
                   parameter = list(supp = 0.2, conf = 0.5, minlen = 2))
summary(rules3)
plot(rules3, measure = "confidence", method = "graph", shading = "lift")