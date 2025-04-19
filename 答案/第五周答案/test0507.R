x = readLines("Solomon2.txt")

y <- as.character(x)

z <- strsplit(y,split = ' ')[[1]]
z[z ==''] <- NA
word_freq <- table(z)
