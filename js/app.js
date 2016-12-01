// Enemies our player must avoid
var checky = "";
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = Math.floor((Math.random()*1500)+100)*(-1);
	console.log("start point:" + this.x);
	this.y = y;
	this.speed = Math.floor((Math.random()*50)+150);
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
if(this.x<700){

    this.x = this.x + (this.speed)*dt;
 }
 else{
 	this.speed = Math.floor((Math.random()*100)+100);
 	this.x = -100;
 	
 }
 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
	this.x = 202;
	this.y = 415;
	this.sprite = 'images/char-boy.png';
	this.score = 0;
	this.lives = 3;
	document.getElementById("score").innerHTML = this.score;
	document.getElementById("lives").innerHTML = this.lives;

	};
	
Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};

Player.prototype.update = function(dt){
	
};

Player.prototype.handleInput = function(obj) {

	if(this.x>0){
		if(obj === 'left'){
			if( this.allowableSpace(obj)){
				this.x = this.x -101;
			}
	} }
	
	if(this.x<=303){
		if(obj === 'right'){
			if(this.allowableSpace(obj)){
			this.x = this.x +101;
			}
		}
	}
	
	if(this.y>=68 ){
		if(obj === 'up'){
			if(this.allowableSpace(obj)){
				this.y = this.y -83;
			}
		}
	}
	if(this.y<400 ){
		if(obj === 'down'){
			if(this.allowableSpace(obj)){
				this.y = this.y +83;
			}
		}
	}	
if(this.y<68){
	this.x =202;
	this.y=415;
	this.score = this.score + 1000;
	document.getElementById("score").innerHTML = this.score;
	console.log("score is" + this.score);
	}
	console.log("Player x:" + this.x + "Player y:" + this.y)
}

var Rock = function(y) {
	this.x = Math.floor((Math.random()*5))*101;
	this.y = y;
    this.sprite = 'images/Rock.png';
};

Rock.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};

var player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var en1 = new Enemy(60); //60
var en2 = new Enemy(143); //143
var en3 = new Enemy(226); //226

var allEnemies = [en1, en2, en3];

for(var i=0; i<allEnemies.length; i++){
	allEnemies[i].update(100, player);

}
var Rocks = [];
function rocky() {
var j = Math.floor(Math.random()*4);
for(var i=0; i<j; i++){
	var y = (Math.floor(Math.random()*3)+1)*83;
	Rocks.push(new Rock(y));
	console.log("Rock " + i + " y:" + Rocks[i].y);
	console.log("Rock " + i + " x:" + Rocks[i].x);
}}

rocky();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode],checky);
});

function checkcollisions(obj1,obj2){

if ((obj1.x < obj2.x + 50) &&
   (obj1.x + 50 > obj2.x) &&
   (obj1.y < obj2.y + 50) &&
	  (50 + obj1.y > obj2.y)){

		obj1.x = 200;
		obj1.y =400;
		if(obj1.lives >1){
		obj1.lives = obj1.lives - 1;
		document.getElementById("lives").innerHTML = obj1.lives;
		}
		else{
			obj1.lives = 3;
			obj1.score =0;
			document.getElementById("score").innerHTML = obj1.score;
			document.getElementById("lives").innerHTML = obj1.lives;
			rocky();
		}
		return true;
	}
	else{

		return false;
	}
}

/*function checkRocks(obj, rock){
	var result = "";
	for(var i=0; i< array.length; i++){
		if(((obj.x + 101)=== array[i].x)&&(obj.y===array[i].y)) {
		 //player, tasin solunda
			result = "leftof"; }
		if(((obj.x)=== array[i].x +101)&&(obj.y===array[i].y)) {
		 //player, tasin saginda
			result = "rightof"; }
		if(((obj.x)=== array[i].x)&&(obj.y+83===array[i].y)) {
		 //player, tasin yukarisinda
			result = "topof"; }
		if(((obj.x)=== array[i].x)&&(obj.y===array[i].y+83)) {
		 //player, tasin yukarisinda
			result = "under"; }
		else{
			result= "free";
		}
		
	}
	return result;

}*/

Player.prototype.allowableSpace = function(direction) {
	var leftFull = false;
	var rightFull = false;
	var upFull = false;
	var downFull = false;
	
	for(var i =0; i<Rocks.length; i++){
		if(this.x + 101 === Rocks[i].x && this.y === Rocks[i].y){
			rightFull = true;
		}
		if(this.x  === Rocks[i].x + 101 && this.y === Rocks[i].y){
			leftFull = true;
		}
		if(this.x === Rocks[i].x && this.y +83 === Rocks[i].y){
			downFull = true;
		}
		if(this.x === Rocks[i].x && this.y === Rocks[i].y + 83){
			upFull = true;
		}
	};
	
	 switch(direction) {
        case ("left"):
            if (leftFull) {
                return false;
            }
            else {
                return true;
            }
            break;
        case ("right"):
            if (rightFull) {
            console.log("right");
                return false;
            }
            else {
                return true;
            }
            break;
        case ("up"):
            if (upFull) {
                return false;
            }
            else {
                return true;
            }
            break;
        case ("down"):
            if (downFull) {
                return false;
            }
            else {
                return true;
            }
            break;    
        default:
            return true;
	
};
}



