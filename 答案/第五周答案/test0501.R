dt <- Sys.Date()
tm <- Sys.time()
print(dt)
print(tm)
class(dt)
class(tm)
dt-30 #日期减30
tm-30 #秒数减30

dts <- date()
class(dts)
dts - 30
#错误于dts - 30: 二进列运算符中有非数值参数

x <- c('2025-3-31','2025-3-24')
x.date <- as.Date(x)
diff(x.date)

y <- c('2025-3-24;9:20:45','2025-3-24;9:10:45')
as.Date(y)


y.time <- strptime(y,"%Y-%m-%d;%H:%M:%S")
diff(y.time)

dt1 = "2025-3-24 8:30:15"
dt2 = "2025-3-24 10:30:15"
difftime(strptime(dt2, format = "%Y-%m-%d %H:%M:%S"), 
         strptime(dt1, format = "%Y-%m-%d %H:%M:%S"), units = "hours")

dt1.time <- strptime(dt1, format = "%Y-%m-%d %H:%M:%S")
dt2.time <- strptime(dt2, format = "%Y-%m-%d %H:%M:%S")
difftime(dt2.time, dt1.time, units = "hours")

dt1.date <- as.Date(dt1)
dt2.date <- as.Date(dt2)
difftime(dt2.date, dt1.date, units = "hours")


