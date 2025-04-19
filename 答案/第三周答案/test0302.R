df <- data.frame(
  name = c("张飞", "李靖", "王剪", "赵奢", "孙策"),
  age = c(23, 21, 19, 25, 22),
  is.student = c(TRUE, FALSE, TRUE, FALSE, TRUE)
)

single.data <- df[1, 2]
single.row <- df[3, ]
single.column <- df[, "is.student"]

print(single.data)
print(single.row)
print(single.column)

part.data <- df[1:3, 1:2]

age.column <- df$age
sd(age.column)

column1 <- df[[1]]
column2 <- df[[2]]
column3 <- df[[3]]