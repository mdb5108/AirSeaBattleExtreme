Player.controls = {
	left: false,
	up: false,
	right: false,
	down: false,
	space: false
};

function Player(health, x, y)
{
    this.BARREL_OFFSET = 25;
    this.BULLET_SPEED = 300;

    this.PLAYER_ROTATE_SPEED = Math.PI;

	GameObject.call(this, "turret_b.png", x, y, 105, 150);
    this.angle = 0;
	this.health = health;

    this.barrel = new GameObject("turret_a.png", x, y+this.BARREL_OFFSET, 105, 150);
    this.barrel.SetImageOffset({x:0, y:-this.BARREL_OFFSET});
};

Player.prototype = Object.create(GameObject.prototype);

Player.prototype.constructor = Player;

Player.prototype.Update = function(gameTime)
{
    GameObject.prototype.Update.call(this, gameTime);
	if(Player.controls.space)
	{
        var facing = this.GetFacing();
        var startPosition = VectorAdd({x:this.barrel.x,y:this.barrel.y}, VectorMultiply(this.BARREL_OFFSET, facing));
        var velocity = VectorMultiply(this.BULLET_SPEED,facing);
        var bullet = new Bullet("tempshot.png", velocity, startPosition.x, startPosition.y);
	}

  	if(Player.controls.left)
	{
        this.barrel.angle -= this.PLAYER_ROTATE_SPEED*gameTime;
	}		
	if(Player.controls.right)
	{
        this.barrel.angle += this.PLAYER_ROTATE_SPEED*gameTime;
	}
};

Player.prototype.GetFacing = function()
{
    return {x:Math.cos(this.barrel.angle-(Math.PI/2)), y:Math.sin(this.barrel.angle-(Math.PI/2))};
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
