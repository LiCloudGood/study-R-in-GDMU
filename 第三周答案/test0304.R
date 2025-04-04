df1 <- data.frame(
  ID = c(1, 2, 3),
  Value1 = c(10, 20, 30)
)

df2 <- data.frame(
  ID = c(1, 4, 3),
  Value2 = c("A", "B", "C")
)

df3 <- data.frame(
  sID = c(1, 4, 3),
  Value2 = c("A", "B", "C")
)

score = read.csv('scores.csv')


rbind(df1, df2)
#错误于match.names(clabs, names(xi)): 名称同原来已有的名称不相对

cbind(df1, df2)

merge(df1, df2, by = "ID", all.x = TRUE)

print(merge(df1, df2, by = "ID", all.y = TRUE))

print(merge(df1, df2, by = "ID", all = TRUE))

print(merge(df1, df2, by = "ID", all = FALSE))

merge(df1, df3, by.x = "ID", by.y = "sID")

install.packages("reshape2")
library(reshape2)
score_long <- melt(score, id.vars = "ID", value.name = "score")