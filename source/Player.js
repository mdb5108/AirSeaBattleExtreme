Player.controls = {
	left: false,
	up: false,
	right: false,
	down: false,
	space: false
};

var bulletCvs = document.createElement("canvas");

function Player(imgPath, canvas, health, x, y, xScl, yScl)
{
	GameObject.call(this, imgPath, canvas, x, y, xScl, yScl);
	this.health = health;
	this.usedAmmo = [];
};

Player.prototype = Object.create(GameObject.prototype);

Player.prototype.constructor = Player;

/*Player.prototype.MoveBarrel = function(direction)
{
	if(direction == "vertical")
	{
		direction = "stationary";
		this.imgPath = "turret_b.png";
		this.Repaint();
	}
	else
	{
		direction = "vertical";
		this.imgPath = "turret_a.png";
		this.Repaint();
	}
}*/

Player.prototype.Update = function()
{
	var angle = 0;
	var bullet = new Bullet("tempshot.png", this.canvas, 5, 98, 20, 8, 50);
	if(Player.controls.space)
	{
		//bullet.SetPosition(this.x, this.y);
		GameManager.AddGameObject(bullet);
		//this.usedAmmo.push(bullet);
	}

/*	if(Player.controls.up)
	{
		this.MoveBarrel("vertical");
		var bullet = this.ammo.pop();
		bullet.SetPosition(this.x, this.y);
		this.ammo[this.ammo.length] = bullet;
	}
	if(Player.controls.down)
	{
		this.MoveBarrel("stationary");
		var bullet = this.ammo.pop();
		bullet.SetPosition(this.x, this.y);
		this.ammo[this.ammo.length] = bullet;
	}
*/	if(Player.controls.left)
	{
		this.Rotate(-5);
		bullet.Rotate(-5);
	}		
	if(Player.controls.right)
	{
		this.Rotate(5);
		bullet.Rotate(-5);
	}
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