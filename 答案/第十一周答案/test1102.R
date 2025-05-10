df = data.frame(x=c(3,1,5), y=c(5,7,9))
library(ggplot2)

ggplot(
  df,
  aes(xmin = x,xmax = x+2,ymin = y-1,ymax = y+1)) +
    geom_rect(aes(fill = x)) +
    theme(
      axis.title = element_blank(),
      axis.text = element_text(size = 20),
      legend.position = 'none'
    )
