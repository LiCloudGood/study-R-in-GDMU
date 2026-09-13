info = read.csv('wh.csv',header = T, fileEncoding = 'UTF-8')  #（1）读入数据
print(info)  #（2）显示数据

#(3） 体重对身高散点图
plot(info$体重~info$身高,main = '体重对身高散点图')

# 绘制不同性别下, 体重对身高的散点图
coplot(info$体重~info$身高|info$性别)

# （4）绘制不同年龄阶段, 体重对身高的散点图
coplot(info$体重~info$身高|info$年龄)

# (5)绘制不同性别和不同年龄阶段, 体重对身高的散点图
coplot(info$体重~info$身高|info$性别+info$年龄)
