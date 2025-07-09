x = c(134, 146, 104, 119, 124, 161, 107,
      83, 113, 129, 97, 123)
y = c(70, 118, 101, 85, 107, 132, 94)
(ret = var.test(x,y)$p.value)
if(ret<0.05){
  p = t.test(x,y)$p.value
}else{
  p = t.test(x,y,var.equal = TRUE)$p.value
}
print(p)
# 接受原假设，两种饮料对雌鼠增重无显著差异