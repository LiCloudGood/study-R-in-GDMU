library(ggplot2)
ggplot(diamonds,aes(price)) +
  geom_histogram(
    aes(fill = ..density..), binwidth = 1000) +
  scale_fill_continuous(low = 'green',high = 'blue') +
  labs(title = '钻石价格直方图') +
  theme(axis.title = element_text(size = 18),
        axis.text = element_text(size = 16),
        legend.title = element_text(size = 18),
        legend.text = element_text(size = 16),
        plot.title = element_text(
          size = 22,hjust = 0.5,
          margin = margin(b = 12)
        )
  )

