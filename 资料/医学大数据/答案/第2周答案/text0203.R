install.packages('corrgram')
library(corrgram)
x = stackloss
lbs = c('水流','水温','酸浓','损失氨')
corrgram(x,
         labels = lbs,
         cex.labels = 2,
         font.labels = 3,
         main = 'Brownlee工厂氨转硝酸散点图',
         cex.mian = 2,
         gap = 0.2,
         order = T,
         upper.panel = panel.conf,
         lower.panel = panel.pie)
