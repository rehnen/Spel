//ship
function ship(x, y, radius, velosity){
    this.x = x || 10;
    this.y = y || 10;
    this.radius = radius || 5;
    this.velosity = velosity; //this is going to be a vec2
}
ship.prototype.update = function(td){
    if(!gameOver && !win){
        this.x += 1 * (this.velosity.x) *td;
        if(this.velosity.y < 5)
            this.y  += 1* (this.velosity.y += 0.01) *td;
        else
            this.y += this.velosity.y *td;
        //if this.x > WIDTH
        //sätt till 0;
        if(this.x > WIDTH + 300 ||
            this.x < -300 ||
            this.y > HEIGHT + 300 ||
            this.y < -300){
            gameOver = true;
        }
        for(var i = 0; i < level.obsticles.length; i++){
            //fixin if()
            if(this.x > level.obsticles[i].x && this.x < level.obsticles[i].width + level.obsticles[i].x &&
                this.y > level.obsticles[i].y && this.y < level.obsticles[i].height + level.obsticles[i].y)
                gameOver = true;
        }
        if(this.x > level.x && this.x < level.width + level.x &&
            this.y > level.y && this.y < level.height + level.y){
            console.log("win");
            if(this.velosity.y < 0.7 && this.velosity.y < 0.5){
                win = true;
                console.log(this.velosity.y);
            }
            else{
                gameOver = true;
                console.log(this.velosity.y);
            }
        }
        //IF ship x 0r y in obsticle x or y
        //game over
//        if(this.x > obsticle.x && this.x < (obsticle.x + obsticle.width)){
//            if(this.y > obsticle.y && this.y < (obsticle.height + obsticle.y)){
//                gameOver = true;
//            }   
//        }
            
    }
}


ship.prototype.draw = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
    context.strokeStyle='Red';
    context.fillStyle = 'Blue';
    context.fill();
    context.stroke();
    
}

//Andra saker ett skäpp kan behöva: bränsle, batteri är lätt att rita

function batery(x, y, width, height){
    this.x = x  || 0;
    this.y = y  || 0;
    this.width = width      || 0;
    this.height =  height   || 0;
    this.power = 100;
}

batery.prototype.draw = function(){
    context.fillStyle='Gray';
    context.fillRect(this.x, this.y, this.width, this.height+20);
    context.fillStyle='Green';
    context.fillRect(this.x+10, this.y+(110-this.power), this.width-20, (this.height)-(100-this.power));
    context.font = "18px Arial";
    context.strokeText("Power: " + this.power, this.x - 10, this.y + 150);
//console.log(this.power);
}

batery.prototype.decrease = function(power){
    if(this.power <= 0){
        this.power = 0;
    }else{
        this.power -= power || 2;
    }
}
