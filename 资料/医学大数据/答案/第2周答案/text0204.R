patients = data.frame(
  ID = c('001','002','003','004','005'),
  name = c("Tukey", "Venables", "Tierney", "Ripley", "McNeil"),
  nationality = c("US", "Australia", "US", "UK", "Australia"),
  ill = c("yes", rep("no", 4)),
  phone=c("15210329344","15210329332","15210323144","18510329344","13492874632")
)
print(patients)
patients<-subset(patients,select=-ID)#参照帮助文档，思考用2种方法删除对应的属性列
print(patients)
patients<-subset(patients,select=-c(name,phone))
print(patients)

patients<-subset(patients,select=c(name,phone))
print(patients)
