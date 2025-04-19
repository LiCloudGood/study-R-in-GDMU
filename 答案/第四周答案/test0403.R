df <- data.frame(
  patientID = 1:4,
  age = c(25,34,28,52),
  diabetes = c('Type1','Tpye2','Type1','Type1'),
  status = c('Poor','Improved','Excellent','Poor'),
  stringsAsFactors = TRUE
)

str(df)


df_status <- factor(df$status,levels = c('Poor','Improved','Excellent'),ordered = T)
str(df_status)

values <- c("low", "medium", "high", "medium", "low", "high")
ord_factor <- factor(values,levels = c("low","medium","high"),ordered = T)
str(ord_factor)
