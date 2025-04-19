install.packages("ISwR_2.0-8.zip", 
                 repos = NULL, 
                 type = "win.binary")
library(ISwR)
sc<-read.csv('scores.csv')

data(ewrates)
data(hellung)
summary(ewrates)
summary(hellung)

odd.score <- sc[seq(1, nrow(sc), by = 2), ]

data(bp.obese)
male_records <- bp.obese[bp.obese$sex == 0, ]

high_bp_records <- bp.obese[bp.obese$sex == 1 & bp.obese$bp >= 140, ]

mean1 <- mean(sc$score[sc$courseID == 1])
mean2 <- mean(sc$score[sc$courseID == 2])