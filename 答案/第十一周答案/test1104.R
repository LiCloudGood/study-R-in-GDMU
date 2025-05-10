library(ggplot2)
x = mtcars[,c('hp','disp','cyl')]

ggplot(x,aes(hp,disp)) + 
  geom_point(size = 3,color = 'blue3') +
  geom_text(
    aes(label = mtcars$cyl, color = mtcars$cyl),
    size = 6, nudge_x = 8) +  
  scale_color_gradientn(colors = rainbow(20), name = "气缸数") +
  theme(
    legend.title = element_text(size = 18),  
    legend.text = element_text(size = 16),  
    axis.title.x = element_text(size = 18),  
    axis.title.y = element_text(size = 18),  
    axis.text = element_text(size = 16),  
  ) 

