/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Obsticle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height =  height;
}
//var bajs = new bajs(1,1,1,1);
Obsticle.prototype.draw = function(){
    context.fillStyle='Pink';
    context.fillRect(this.x, this.y, this.width, this.height);
}
function level(x, y, width, height){
    this.x = x || 1;
    this.y = y || 1;
    this.width = width || 10;
    this.height = height || 10;
    
    this.obsticles = [];
    
}
level.prototype.addObsticle = function(x, y, width, height){
    //var obsticle = new obsticle(x, y, width, height);
    this.obsticles.push(new Obsticle(x, y, width, height));
}
level.prototype.draw = function(){
    for(var i = 0; i < this.obsticles.length; i++){
        this.obsticles[i].draw();
    }//Goal
    
    context.fillStyle='Blue';
    context.fillRect(this.x, this.y, this.width, this.height);
}