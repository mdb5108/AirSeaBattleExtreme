Player.controls = {
	left: false,
	up: false,
	right: false,
	down: false,
	space: false
};

var gameObj = new GameObject("turret.png", this.x, this.y, this.xScl, this.yScl);

Player.prototype = gameObj;

function Player(health, x, y, xScl, yScl)
{
	this.health = health;
	this.x = x;
	this.y = y;
	this.xScl = xScl;
	this.yScl = yScl;
};

Player.prototype.constructor = Player;

var bullet = new Bullet("tempshot.png", this.x, this.y, this.xScl, this.yScl);

Player.prototype.Update = function()
{
	if(Player.controls.space)
	{
		//bullet.Draw(document.getElementById("canvas"));
	}
//		if(Player.controls.up)
//			this.y -= 1;
	if(Player.controls.right)
		this.x += 1;
//		if(Player.controls.down)
//			this.y += 1;
	if(Player.controls.left)
		this.x -= 1;
};

window.addEventListener("keydown", function(e){
	e.preventDefault();
	switch(e.keyCode)
	{
		case 32: // spacebar
			Player.controls.space = true;
			break;
		case 37: // left arrow
			Player.controls.left = true;
			break;
		case 38: // up arrow
			Player.controls.up = true;
			break;
		case 39: // right arrow
			Player.controls.right = true;
			break;
		case 40: // down arrow
			Player.controls.down = true;
			break;
	}
}, false);

window.addEventListener("keyup", function(e){
	e.preventDefault();
	switch(e.keyCode)
	{
		case 32:
			Player.controls.space = false;
			break;
		case 37: // left arrow
			Player.controls.left = false;
			break;
		case 38: // up arrow
			Player.controls.up = false;
			break;
		case 39: // right arrow
			Player.controls.right = false;
			break;
		case 40: // down arrow
			Player.controls.down = false;
			break;		
	}
}, false);