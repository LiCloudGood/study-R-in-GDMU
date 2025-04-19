x<-scan('C:\\Users\\Administrator\\Desktop\\test05\\Solomon2.txt',
        what = '',
        quote = "",
        fileEncoding = 'gb2312')

words_with <- grep('[[:punct:]]',strsplit(x,'\\s+')[[1]],value = T)
cleaned <- gsub('[\\\\[:punct:]]','',x)
print(cleaned)

y <- gsub('[".,?;:!?]', "", x)
