library(neuralnet)
library(Metrics)  


df <- read.csv("data.csv")
df <- na.omit(df)                



n <- nrow(df)
train <- df[1:round(0.7*n), ]
test  <- df[(round(0.7*n)+1):n, ]


nn <- neuralnet(x6 ~ x1 + x2 + x3 + x4 + x5,
                data   = train,
                hidden = 3,        
                learningrate = 0.01,
                linear.output = TRUE,   
                act.fct = "tanh",
                algorithm = "backprop",
                stepmax = 1e6)

# 4. 预测 + 评价
pred <- predict(nn, test)
R2   <- cor(pred, test$x6)^2
RMSE <- rmse(test$x6, pred)

cat(sprintf("R² = %.3f   RMSE = %.3f\n", R2, RMSE))

# 5. 真实 vs 预测散点
plot(test$x6, pred,
     xlab = "实测菌体干重", ylab = "预测菌体干重",
     main = sprintf("R² = %.3f  RMSE = %.3f", R2, RMSE))
abline(0, 1, col = "red")

