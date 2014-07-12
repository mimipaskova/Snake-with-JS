"use strict";

var c = document.getElementById("hackCanvas");
var ctx = c.getContext("2d");
var canvasWidth = $("#hackCanvas").width();
var canvasHeight = $("#hackCanvas").height();

function Pixel(x,y, ctx, size) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.size = size;

    this.print = function(){
      this.ctx.fillStyle = "green";

      this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
    };
}



var snake = (function(ctx){
    var tail = [];
    [1,2,3].forEach(function(i){
      tail.push(new Pixel(i+20,10,ctx, 10));
    });

    var head = tail[tail.length-1];
    var direction = "up";
    var isdead = false;

    var getHead = function(){
      return head;
    };

    var print = function(){
      tail.forEach(function(i){
        i.print();
      });

    };

    var kill = function(){
      isdead = true;
    };

    var move = function(){
      var newHead;
      if(isdead){
        return false;
      }
      else if(direction === "right"){
        newHead = new Pixel(head.x+1, head.y, ctx, 10);
      }
      else if(direction === "down"){
        newHead = new Pixel(head.x, head.y+1, ctx, 10);
      }
      else if(direction === "up"){
        newHead = new Pixel(head.x, head.y-1, ctx, 10);
      }
      else if(direction === "left"){
        newHead = new Pixel(head.x-1, head.y, ctx, 10);
      }

      tail.push(newHead);
      tail.shift();
      head = newHead;
    };

  var setDirection = function(dir){
    if(direction === "left" && dir === "right" ||
    direction === "right" && dir === "left" ||
    direction === "up" && dir === "down" ||
    direction === "down" && dir === "up"){
      return false;
    }
    direction = dir;
  };

    return{
      print:print,
      move : move,
      setDirection:setDirection,
      getHead : getHead,
      kill : kill
    };
  }(ctx));

$(document).keydown(function(e){
    if (e.keyCode == 37) {
       snake.setDirection("left");
    }
    else if(e.keyCode == 38) {
       snake.setDirection("up");
    }
    else if(e.keyCode == 39) {
       snake.setDirection("right");
    }
    else if(e.keyCode == 40) {
       snake.setDirection("down");
    }
  });
setInterval(function(){
  checkBorders(snake);
  ctx.clearRect(0,0, canvasWidth, canvasHeight);
  snake.move();
  snake.print();

},100);

var checkBorders = function(snake){
  if(snake.getHead().x >= canvasWidth/10 || snake.getHead().y >=  canvasHeight/10 || snake.getHead().x <= 0 || snake.getHead().y <=0){
    snake.kill();
  }
};
