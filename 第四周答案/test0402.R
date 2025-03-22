my.list2 <- list(
  vector = 1:5,
  scalar = 6.78,
  matrix = matrix(rpois(12, 20), nrow = 3, ncol = 4),
  data_frame = data.frame(Name = c("Alice", "Bob", "Charlie", "David", "Eve"), Age = c(23, 27, 22, 31, 29))
)
my.list2$char = "New Element"
my.list2

my.list2$matrix <- NULL
my.list2

my.list2$vector[length(my.list2$vector)] = 6
my.list2

names(my.list2$vector)[1] <- "Frist"
lapply(my.list2,length)
sapply(my.list2,length)