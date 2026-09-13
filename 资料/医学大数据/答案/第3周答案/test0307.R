dat.array = array(c(136,57,107,151,63,44,63,265),
                  dim = c(2,2,2),
                  dimnames = list(smoke = c('no','yes'),
                                  drink = c('no','yes'),
                                  outcome = c('control','case')))
data.table = as.table(dat.array)
data.table

dat = as.data.frame(data.table)
dat

logistic.model = glm(outcome~smoke + drink,family = binomial,weights = Freq,data = dat)
summary(logistic.model)
