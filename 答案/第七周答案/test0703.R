x = rpois(1, 60)
y = rpois(1, 60)
z = rpois(1, 60)
a = rpois(1, 30)
b = rpois(1, 50)
c = rpois(1, 70)

if (a + b > c && a + c > b && b + c > a){
  print('可以构成三角形')
}else{
  print('不能构成三角形')
}

max = 0
if (x>y){
  if(x>z){
    max <- x
  }else{
    max <- z
  }
}else{
  if(y>z){
    max <- y
  }else{
    max <- z
    }
}
cat(x,y,z,max)
