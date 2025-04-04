vect <- c(10, 20, 30, 40, 50)

vect <- c(vect, 60, 70)

vect <- append(vect, c(100, 200))

vect <- vect[-c(3, 7)]

vect[3] <- 300


names(vect) <- c("a", "b", "c", "d", "e", "f", "g")
print("Named vect:")
print(vect)


x <- seq(from = 5, by = 3, length.out = 100)
x[seq(2, length(x), by = 2)] <- rep(c(-10, -20), length.out = length(x) / 2)
print("Updated x:")
print(x)