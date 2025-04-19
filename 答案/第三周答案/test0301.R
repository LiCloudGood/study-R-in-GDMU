arr <- array(1:24, dim = c(2, 3, 4))

x <- arr[2, 2, 3]

filtered_elements <- arr[arr > 10]
mean_val <- mean(filtered_elements)
sd_val <- sd(filtered_elements)
median_val <- median(filtered_elements)

for (i in 1:3) {
  print(paste("Dimension", i, "statistics:"))
  print(apply(arr, i, min))
  print(apply(arr, i, max))
  print(apply(arr, i, mean))
  print(apply(arr, i, sd))
  print(apply(arr, i, median))
}