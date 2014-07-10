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


    var print = function(){
      tail.forEach(function(i){
        i.print();
      });

    };

    var move = function(){
      var newHead;
      if(direction === "right"){
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
      setDirection:setDirection
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
// ctx.clearRect(0,0, canvasWidth, canvasHeight);
// snake.moveR();
// snake.print();
  ctx.clearRect(0,0, canvasWidth, canvasHeight);
  snake.move();
  snake.print();
},100);
// we call the function with this
// var s = new Pixel(3,4,ctx, 10);
// s.print();
//s.print();
//s.moveDown();
//s.moveRight();



//console.log(s);



    // this.moveDown = function(){
    //   var c = document.getElementById("hackCanvas");
    //   var ctx = c.getContext("2d");
    //   ctx.fillStyle = "green";
    //   ctx.fillRect(this.x,this.y,this.x, this.y+10);
    // };

    // this.moveRight = function(){
    //   var c = document.getElementById("hackCanvas");
    //   var ctx = c.getContext("2d");
    //   ctx.fillStyle = "green";
    //   ctx.fillRect(this.x,this.y,this.x+10, this.y);
    // };
