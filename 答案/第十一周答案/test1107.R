library(ggplot2)
ggplot(iris, aes(Sepal.Length, Sepal.Width)) +
  geom_point(
    aes(fill = Species), size = 5,
    shape = 21, alpha = 0.7) +
  scale_x_continuous(
    '花萼长',
    limits = c(4,8),
    breaks = c(4,4.5,5,5.5,6,6.5,7,7.5,8)
  ) + 
  scale_y_continuous(
    '花萼宽',
    limits = c(2,4.4),
    breaks = seq(2,4.4,by=0.4)
  ) + 
  labs(
    title = '鸢尾花花萼长与宽的散点图') +
  scale_fill_brewer(
    '品种',palette = 'Set1') +
  theme(
    plot.title = element_text(
      size = 20,
      color = 'blue',
      margin = margin(b = 12),
      hjust = 0.5,
      face = 'bold'),
    axis.title.x = element_text(
      size = 18,
      face = 'bold',
      margin = margin(t = 10),
      color = 'brown'),
    axis.title.y = element_text(
      size = 18,
      face = 'bold',
      margin = margin(r = 10),
      color = 'brown'),
    axis.text = element_text(
      color = 'red',
      size = 16),
    legend.title = element_text(
      color = 'brown',
      size = 18,
      margin = margin(b = 10),
      face = 'bold'),
    legend.text = element_text(
      size = 16),
    legend.key.height = unit(1,'cm'),
    legend.key.width = unit(0.9,'cm'),
    legend.background = element_rect(
      fill = 'grey90',
      color = 'red')
  )
