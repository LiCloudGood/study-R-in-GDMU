set.seed(123)
ages <- sample(18:65, 100, replace = TRUE)
income_levels <- sample(c("Low", "Medium", "High"), 100, replace = TRUE)
data <- data.frame(age = ages, income.level = income_levels)

