# 加载ggplot2包
library(ggplot2)

# 使用faithfuld数据集
data(faithfuld)

# 绘制等高线图和二维密度图
p <- ggplot(data = faithfuld, aes(x = eruptions, y = waiting, z = density)) +
  geom_raster(aes(fill = density)) +
  geom_contour(color = 'red') +
  theme(
    axis.title.x = element_text(size = 16),  # x轴标签字号设置为16
    axis.title.y = element_text(size = 16),  # y轴标签字号设置为16
    legend.title = element_text(size = 16),  # 图例标题字号设置为16
    legend.text = element_text(size = 14),  # 图例关键字标签字号设置为14
    axis.text = element_text(size = 14),  # 刻度标签字号设置为14
    panel.grid.major = element_blank(),  # 清除主网格线
    panel.grid.minor = element_blank(),  # 清除次网格线
    panel.background = element_rect(fill = "lightblue"),  # 面板背景颜色为"lightblue"
  )

# 打印图形
print(p)

