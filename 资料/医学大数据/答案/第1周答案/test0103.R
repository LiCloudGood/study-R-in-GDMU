info = data.frame('序号' = 1:10,
                  '性别' = c(rep('F',5),rep('M',5)),
                  '年龄' = c(14,16,15,17,15,14,16,14,15,16),
                  '身高cm' = c(156,158,161,156,153,162,157,159,163,165),
                  '体重kg' = c(42.3,45.0,48.5,51.5,44.6,48.8,46.7,49.9,50.2,53.7)
                  )

print(info)

write.table(info,file = 'info.text')
read.table('info.text')

write.csv(info,file = 'info.csv')
read.csv('info.csv')
