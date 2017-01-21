// Copyright (c) 2016 by Fabio (http://codepen.io/FabioG/pen/PbVaOw)

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
// BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// function assert(condition, message) {
//     if (!condition) {
//         throw message || "Assertion failed";
//     }
// }

// function assert(condition, message) {
//     if (!condition) {
//         message = message || "Assertion failed";
//         if (typeof Error !== "undefined") {

//             throw new Error(message);
//         }
//         throw message; // Fallback
//     }
// }

function Properties() {
    this.lineWidth = 2
    this.speed = 100
    this.frame_number_max
    this.canvas_w = 40
    this.canvas_h = 30
    this.rayPieces = 6
    this.rayRandomise = 10
}

var dots = [],
    dotLengthThreshold,
    properties = new Properties(),
    canvas,
    ctx;

$(document).ready(function() {
    canvas = document.getElementById("graphicsCanvas");
    canvas.width = properties.canvas_w
    canvas.height = properties.canvas_h
    ctx = canvas.getContext("2d");
    dotLengthThreshold = Math.min(canvas.width, canvas.height) / 2;
    inito();
    $(window).resize(function(){});
});

function inito(){
    var sheer_delta = 0.1
    iterate(0, sheer_delta);
}

function iterate(sheer, sheer_delta) {
    clearCanvas();
    drawArc(properties.canvas_w/2 + properties.canvas_w/10, properties.canvas_w/4,
            properties.canvas_h/10, 0.8*properties.canvas_h, sheer)
    var sheer_max = 1.0
    if (sheer + sheer_delta > sheer_max) {
        sheer_delta = -sheer_delta
        sheer = sheer_max
    } else if (sheer + sheer_delta < -sheer_max) {
        sheer_delta = -sheer_delta
        sheer = -sheer_max
    } else {
        sheer = sheer + sheer_delta
    }
    setTimeout(function() {
        iterate(sheer, sheer_delta)
    }, properties.speed)
}

function clearCanvas(){
    ctx.save()
    ctx.fillStyle=(variant===0?"#FFFFFF":"#000000")
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
}

function drawArc(offsetw, width, offseth, height, sheer) {
    ctx.save()
    ctx.shadowColor = (variant===0?"#000000":"#FFFFFF")
    ctx.shadowBlur = 3
    ctx.beginPath()
    ctx.moveTo(offsetw, offseth)
    for (var ii = 0; ii < height+1; ii=ii+1) {
        ctx.lineTo(offsetw +
                   sheer * width * Math.sqrt(1 - Math.min(1, (2.0 * (ii/height-0.5))
                                                          *(2.0 * (ii/height-0.5))) ),
                   offseth + ii )
    }
    ctx.moveTo(offsetw, offseth)
    for (var ii = 0; ii < height+1; ii=ii+1) {
        ctx.lineTo(offsetw -
                   sheer * width * Math.sqrt(1 - Math.min(1, (2.0 * (ii/height-0.5))
                                                          *(2.0 * (ii/height-0.5))) ),
                   offseth + ii )
    }
    ctx.strokeStyle = "rgb(255, 100, 0)";
    ctx.lineWidth = properties.lineWidth;
    ctx.lineCap="round";
    ctx.stroke();
    ctx.restore();
}

function drawLightning(x1,y1, x2,y2){
  var pointDistance = distance(x1,y1, x2,y2);
  var coord = findThirdPoint(x1,y1,x2,y2);
  var xDistance = -(x1 - x2) / properties.rayPieces;
  var yDistance = -(y1 - y2) / properties.rayPieces;
  var opacity = 0;
    ctx.save();
    ctx.shadowColor = (variant===0?"#000000":"#FFFFFF");
  ctx.shadowBlur = 3;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  for(var i = 1; i <= properties.rayPieces; i ++){
    if(i <= properties.rayPieces-1){
      var relDistance = distance(x1,y1,x1 + (xDistance * i), y1 + (yDistance * i));
      var offsetMultiplyer = relDistance/pointDistance < 0.5 ? relDistance/pointDistance/0.5 : 1 - (relDistance/pointDistance);
      var offset = (Math.random() * properties.rayRandomise) * offsetMultiplyer;
      var relCoords = {
        x : x1 + (xDistance * i) + (coord.x * offset),
        y : y1 + (yDistance * i) + (coord.y * offset)
      };
      ctx.lineTo(relCoords.x, relCoords.y);
    }else{
      ctx.lineTo(x2, y2);
    }

  }
  ctx.strokeStyle = "rgb(255, 100, 0)";
  ctx.lineWidth = properties.lineWidth;
  ctx.lineCap="round";
  ctx.stroke();
  ctx.restore();
}


function findThirdPoint(ax, ay, bx, by){
	var c = {x:0, y:0};
	var slope =  (ax - bx) / (by - ay);
  var sign = Math.random() < 0.5 ? -1 : 1;
	c.x = (1 / (Math.sqrt((1 + (slope * slope))))) * sign;
	c.y = (slope / (Math.sqrt((1 + (slope * slope))))) * sign;
	return c;
}

function distance(x1, y1, x2, y2){
  return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
}
