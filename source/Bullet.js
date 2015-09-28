function Bullet(imgPath, canvas, speed, x, y, xScl, yScl)
{
	
	GameObject.call(this, imgPath, canvas, x, y, xScl, yScl);
	this.visible = false;
	this.speed = speed;
	//this.collider = 
};

Bullet.prototype = Object.create(GameObject.prototype);

Bullet.prototype.constructor = Bullet;

Bullet.prototype.SetPosition = function(x, y)
{
	this.x = x;
	this.y = y;
}

Bullet.prototype.Update = function()
{
	this.y -= this.speed;
};