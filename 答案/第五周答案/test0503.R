x <- scan('Solomon.txt',
          what = '',
          quote = "",
          fileEncoding = 'gb2312')

x[grepl('es$',x)]
x[grepl('se$',x)]

x[grepl('^[A-Z]',x)]
x[grepl('^[a-z].*[A-X]',x)]

x[grepl('[^a-zA-Z]',x)]

x[grepl('\\d',x)]

x[grepl('([a-z])\\1',x,ignore.case = T)]
