var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

context.fillStyle = "#fff";
context.fillRect(0, 0, yyy.width, yyy.height);


autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('svgactive')
  eraser.classList.remove('svgactive')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('svgactive')
  pen.classList.remove('svgactive')
}

red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('colorActive')
  blue.classList.remove('colorActive')
  green.classList.remove('colorActive')
}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blue.classList.add('colorActive')
  red.classList.remove('colorActive')
  green.classList.remove('colorActive')
}
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('colorActive')
  red.classList.remove('colorActive')
  blue.classList.remove('colorActive')
}
thin.onclick = function(){
  context.lineWidth=5
  heavy.classList.remove('sizeActive')
  thin.classList.add('sizeActive')
}
heavy.onclick = function(){
  context.lineWidth= 8
  heavy.classList.add('sizeActive')
  thin.classList.remove('sizeActive')
}
clear.onclick = function(){
  context.clearRect(0,0,yyy.width,yyy.height)
}
save.onclick= function(){
var strDataURI = yyy.toDataURL("image/png");
var a = document.createElement('a')
document.body.appendChild(a)
a.href = strDataURI
a.download = '我的作品'
a.click()
console.log(strDataURI)
}
  



  /******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点

  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {
  var using = false
  var lastPoint = {x: undefined,y: undefined}
  if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(xxx){
      var x = xxx.touches[0].clientX
      var y = xxx.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(xxx){
      var x = xxx.touches[0].clientX
      var y = xxx.touches[0].clientY

    if (!using) {return}

    if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
    } else {
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
    }
    canvas.ontouchend = function(xxx){
      using = false
    }
  }else{
    //非触屏设备
    canvas.onmousedown = function(xxx) {
      var x = xxx.clientX
      var y = xxx.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
  canvas.onmousemove = function(xxx) {
    var x = xxx.clientX
    var y = xxx.clientY

    if (!using) {return}

    if (eraserEnabled) {
        context.clearRect(x - 10, y - 10, 20, 20)
    } else {
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }

  }
  canvas.onmouseup = function(aaa) {
    using = false
  }
}
}

