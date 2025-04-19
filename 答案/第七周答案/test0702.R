score = round(runif(1,40,100), digits = 0)


if (score >= 90){
  print('优秀')
}else if(score >= 80){
  print('良好')
}else if(score >= 70){
  print('中等')
}else if(score >= 60){
  print('及格')
}else{
  print('不及格')
}
