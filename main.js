/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.requestAnimFrame = (function(){
    console.log("win");
    return  window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback, element ){
        window.setTimeout(callback, 1000/60);
    };
})();

window.cancelRequestAnimFrame = (function(){
    console.log("cancelled");
    return  window.cancelRequestAnimationFrame || 
    window.webkitCancelRequestAnimationFrame || 
    window.mozCancelRequestAnimationFrame    || 
    window.oCancelRequestAnimationFrame      || 
    window.msCancelRequestAnimationFrame     || 
    window.clearTimeout;
})();

const WIDTH = 900;
const HEIGHT = 400;

var canvas;
var context;

var ship;
var obsticle;
var gameOver = false;
var win = false;
var batery;
var level;

var td;
var lastTick;

window.onload = init;



function vec2(x, y){
    this.x = x;
    this.y = y;
    
}
function obsticle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height =  height;
}
obsticle.prototype.draw = function(){
    context.fillStyle='Pink';
    context.fillRect(this.x, this.y, this.width, this.height);
}
var timer;
var time = 0;
var d;
var t;
function init(){
    console.log(requestAnimFrame.toString());
    $("form").hide();
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    ship = new ship(600, 10, 5, new vec2(0, 0));
    //obsticle = new obsticle(random(300, 500), random(50, 300), random(100, 150), random(100, 250));
    batery = new batery(WIDTH-90, 40, 50, 100);
    level = new level(60, 260, 40, 10);
    
    //Ritar upp en level
    level.addObsticle(20, 150, 40, 160);
    level.addObsticle(60, 270, 80, 40);
    level.addObsticle(180, 50, 40, 120);
    level.addObsticle(180, 240, 180, 40);
    level.addObsticle(500, 40, 40, 80);
    level.addObsticle(500, 270, 280, 160);
    timer=setInterval(function(){
        myTimer()
    },100);
    
    runLoop();
}
function myTimer(){
    time++;
}
function runLoop(){
    var now = Date.now();
    td = (now - (lastTick || now)) / 10;
    lastTick = now;
    
    context.clearRect(0, 0, WIDTH, HEIGHT);
    ship.update(td);
    ship.draw();
    //obsticle.draw();
    batery.draw();
    level.draw();
    if(gameOver){
        context.font = "152px Arial";
        context.fillStyle = "Maroon";
        context.fillText("Game Over", 20, 150);
        context.strokeText("Game Over", 20, 150);
        clearTimeout(timer);
    }else if(win){
        context.font = "152px Arial";
        context.fillStyle = "Maroon";
        context.fillText("Congrats", 20, 150);
        context.strokeText("Congrats", 20, 150);
        clearTimeout(timer);
        $("form").show();
    }
    context.font = "18px Arial";
    context.fillStyle = "Red";
    context.strokeText("Time:" + time, 800, 210);
    requestAnimFrame(runLoop);
//window.setTimeout(runLoop,14);
}
function random(min, max){
    return Math.floor((Math.random()*(++max -min)) +min);
}

$(document).ready(function(){
    $(document).keydown(function(objEvent){
        (objEvent) ? keycode = objEvent.keyCode : keycode = event.keyCode;
        //console.log(keycode);
        
        if((keycode == 87 || keycode == 38) && !gameOver){
            if(ship.velosity.y > -8 && batery.power > 0)
                ship.velosity.y -= 0.5;//W or upp arrow
            
            batery.decrease(4);
        }  
        if((keycode == 83 || keycode == 40) && !gameOver){
            if(ship.velosity.y < 8 && batery.power > 0)
                ship.velosity.y += 0.5;//S or down arrow
            batery.decrease();
        }
        if((keycode == 65 || keycode == 37) && !gameOver){
            if(ship.velosity.x > -8 && batery.power > 0)
                ship.velosity.x -= 0.5;//A or left arrow
            batery.decrease();
        }
        if((keycode == 68 || keycode == 39) && !gameOver){
            if(ship.velosity.x < 8 && batery.power > 0)
                ship.velosity.x += 0.5;//D or right arrow
            batery.decrease();
        }
        
    });
    $("#send").click(function(e){
        e.preventDefault();
        
        $.ajax({
            type: 'POST',
            url: "game.php",
            data: {
                "name": $("#name").val(), 
                "time": time
            },
            cashe: false,
            success: function(){
                $("#highscore").load('game.php');
            },
            error: function(e){
                console.log(e);
            }
        })
        //$("form").val("");
        $("label").hide();
        $("input").hide();
        
    });
});