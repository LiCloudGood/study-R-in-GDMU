df <- data.frame(
  Name = c("John", "Jane", "Jack", "Jill", "Jim"),
  Age = c(25, 31, 35, 28, 40),
  Gender = c("Male", "Female", "Male", "Female", "Male"),
  Is_Student = c(TRUE, FALSE, TRUE, FALSE, TRUE),
  row.names = c("row1", "row2", "row3", "row4", "row5")
)

df$Age[3] <- 31
df$Name <- NULL

df <- rbind(df, c(34, "Female", TRUE))
rownames(df)[nrow(df)] <- "row6"

new_rows <- data.frame(
  Age = c(29, 26),
  Gender = c("Female", "Male"),
  Is_Student = c(FALSE, TRUE)
)
df <- rbind(df, new_rows)
rownames(df)[(nrow(df) - 1):nrow(df)] <- c("row7", "row8")

df <- df[-3, ]

result <- subset(df, Age > 30 & Gender == "Female", select = -Gender)

result <- df[df$Is_Student, c("Age", "Gender")]