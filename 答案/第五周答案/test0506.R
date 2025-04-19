original_string <- "R is a programming language for statistical computing and graphics"
substr_result <- substr(original_string, start = 8, stop = 8 + 7 - 1)
print(substr_result)
substring_result <- substring(original_string, first = 8, last = 8 + 7 - 1)
print(substring_result)

part1 <- substr(original_string, 1, 7)
part2 <- substr(original_string, 19, nchar(original_string))
modified_string <- paste0(part1, "程序设计", part2)
print(modified_string)
