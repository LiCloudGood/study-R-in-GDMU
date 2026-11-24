#install.packages('pROC')
library('pROC')
tpr <- c(0.2, 0.4, 0.4, 0.6, 0.8, 0.8, 0.8, 0.8, 1.0, 1.0)
fpr <- c(0.0, 0.0, 0.2, 0.2, 0.2, 0.4, 0.6, 0.8, 0.8, 1.0)
auc <- function(fpr, tpr) {
  idx <- order(fpr)
  fpr <- fpr[idx]; tpr <- tpr[idx]
  sum(diff(fpr) * (head(tpr, -1) + tail(tpr, -1))) / 2
}
roc_auc <- auc(fpr, tpr)

plot(fpr, tpr, type = "s", lwd = 2, col = "red",
     xlab = "False Positive Rate (FPR)",
     ylab = "True Positive Rate (TPR)",
     main = sprintf("ROC curve (AUC = %.3f)", roc_auc))
grid()
abline(0, 1, lty = 2, col = "gray")
text(0.6, 0.2, labels = sprintf("AUC = %.3f", roc_auc), cex = 1.2)
