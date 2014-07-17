"use strict";


var c = document.getElementById("hackCanvas");
var ctx = c.getContext("2d");
var canvasWidth = $("#hackCanvas").width();
var canvasHeight = $("#hackCanvas").height();
var snakeColour = $("#color").val();
var foodColour = "blue";
var gameUpdateInterval = 100;
var paused = false;
var score = 0;

function Pixel(x,y, ctx, size, color) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.size = size;
    this.color = color;

    this.draw = function(){
      this.ctx.fillStyle = color;

      this.ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size, this.color);

    };
}



var snake = (function(ctx,snakeColour){
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

    var draw = function(){
      tail.forEach(function(i){
        i.draw();
      });

    };

    var kill = function(){
      isdead = true;
      score = 0;
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
      score++;
      $("#score").html(score);
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

  var setColor = function(color){
    snakeColour = color;
  }

    return{
      draw:draw,
      move : move,
      setDirection:setDirection,
      setColor: setColor,
      getHead : getHead,
      kill : kill,
      isOnFood: isOnFood
    };
  }(ctx, snakeColour));

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
    if(e.keyCode == 32){
      paused = !paused;
      $("#pause").prop("checked", paused);
      event.preventDefault();
    }

  });



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

  var draw = function(){
    ctx.drawImage(imageObj, getX() * 10, getY() * 10, 10, 10);
    //ctx.fillStyle = foodColour;
    //pixel.draw();
    //ctx.fillRect(getX() * 10, getY() * 10,10,10);
  };

  var randFood = function(){
    var randX = Math.floor(Math.random() * canvasWidth/10);
    var randY = Math.floor(Math.random() * canvasHeight/10);
    x=randX;
    y=randY;
  };

  return{
    draw:draw,
    getX:getX,
    getY:getY,
    randFood:randFood
  };

}(ctx));

var settings = (function(){
  var gameSpeedValue;


  var checkSpeed = function(){
    gameSpeedValue = $("#slider1").val();
    if(gameSpeedValue<250){
      gameUpdateInterval = 150;
    }
    else if(gameSpeedValue >=250 && gameSpeedValue < 400){
      gameUpdateInterval = 100;
    }
    else{
      gameUpdateInterval = 80;
    }
  }


  var pause = function(){
    var isChecked = $("#pause").is(':checked') ;
    if(isChecked){
      //pause
      paused = true;
    }
    else{
      paused = false;
    }
  };

  return{
    checkSpeed:checkSpeed,
    pause:pause
  };
  }());

$("#pause").change(function(){
  settings.pause();
});

$("#color").click(function(){
  paused = true;
  $("#pause").prop("checked", paused);
});

$("#color").change(function(){
  snake.setColor($("#color").val());
})

var gameLoop = function(){
  if(!paused){
    checkBorders(snake);
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    snake.move(food);
    snake.draw();
    food.draw();
    settings.checkSpeed();
  }

  setTimeout(gameLoop, gameUpdateInterval);
};
gameLoop();
