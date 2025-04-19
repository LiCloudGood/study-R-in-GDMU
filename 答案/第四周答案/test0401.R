my.list1 <- list(
  vector = 1:5, 
  scalar = 6.78,  
  matrix = matrix(rpois(12, 20), nrow = 3, ncol = 4), 
  data_frame = data.frame( 
    Name = c("Alice", "Bob", "Charlie", "David", "Eve"),
    Age = c(23, 27, 22, 31, 29)
  )
)


print(my.list1)


vector_slice <- my.list1[c(1, 3, 4)]
print(vector_slice)

my.list1$scalar  
my.list1[[3]]  


bob_row <- my.list1$data_frame[my.list1$data_frame$Name == "Bob", ]


print(bob_row)
