set.seed(123)
ages <- sample(18:65, 100, replace = TRUE)
income_levels <- sample(c("Low", "Medium", "High"), 100, replace = TRUE)
data <- data.frame(age = ages, income.level = income_levels)

age.group = cut(data$age,
                c(18,35,55,70),
                labels = c("Young", "Middle", "Old"))
table(age.group)
table(list(age.group,data$income.level))
