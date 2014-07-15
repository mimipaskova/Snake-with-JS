"use strict";


var c = document.getElementById("hackCanvas");
var ctx = c.getContext("2d");
var canvasWidth = $("#hackCanvas").width();
var canvasHeight = $("#hackCanvas").height();
var snakeColour = "red";
var foodColour = "blue";
//ctx.foodColour(img,10,10);

function Pixel(x,y, ctx, size, color) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.size = size;
    this.color = color;

    this.print = function(){
      this.ctx.fillStyle = color;

      this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size, this.color);

    };
}



var snake = (function(ctx){
    var tail = [];
    [1,2,3].forEach(function(i){
      tail.push(new Pixel(i+20,10,ctx, 10, snakeColour));
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


    var move = function(food){
      var newHead;
      if(isdead){
        return false;
      }
      else if(direction === "right"){
        newHead = new Pixel(head.x+1, head.y, ctx, 10, snakeColour);
      }
      else if(direction === "down"){
        newHead = new Pixel(head.x, head.y+1, ctx, 10, snakeColour);
      }
      else if(direction === "up"){
        newHead = new Pixel(head.x, head.y-1, ctx, 10, snakeColour);
      }
      else if(direction === "left"){
        newHead = new Pixel(head.x-1, head.y, ctx, 10, snakeColour);
      }
      //console.log(food);
      if(isOnFood(food)){
        food.randFood();
      }
      else
      {
        tail.shift();
      }
      tail.push(newHead);
      head = newHead;
    };

  var isOnFood = function(food){
    if(head.x === food.getX() && head.y === food.getY()){
      return true;
    } else {
      return false;
    }
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
      kill : kill,
      isOnFood: isOnFood
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
  snake.move(food);
  snake.print();
  food.print();

},100);

var checkBorders = function(snake){
  if(snake.getHead().x >= canvasWidth/10 || snake.getHead().y >=  canvasHeight/10 || snake.getHead().x < 0 || snake.getHead().y <0){
    snake.kill();
  }
};


var food = (function(ctx){
  var x=5,
      y=8;
  //var that = this;

  var getX = function(){
    return x;
  };

  var getY = function(){
    return y;
  };

  var imageObj = new Image();
  imageObj.src = 'apple.png';

  var print = function(){
    ctx.drawImage(imageObj, getX() * 10, getY() * 10, 10, 10);
    //ctx.fillStyle = foodColour;
    //pixel.print();
    //ctx.fillRect(getX() * 10, getY() * 10,10,10);
  };

  var randFood = function(){
    var randX = Math.floor(Math.random() * canvasWidth/10);
    var randY = Math.floor(Math.random() * canvasHeight/10);
    x=randX;
    y=randY;
  };

  return{
    print:print,
    getX:getX,
    getY:getY,
    randFood:randFood
  };

}(ctx));
