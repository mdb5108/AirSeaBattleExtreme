var gameObj = new GameObject("tempshot.png", this.x, this.y, this.xScl, this.yScl);

Bullet.prototype = gameObj;

function Bullet(imgPath, speed, x, y, xScl, yScl)
{
	this.imagePath = imgPath;
	this.speed = speed;
	this.x = x;
	this.y = y;
	this.xScl = xScl;
	this.yScl = yScl;
	this.image = new Image();
}

Bullet.prototype.constructor = Bullet;

Bullet.prototype.Draw = function(canvas2D)
{
	this.image.src = this.imagePath;
	canvas2D.getContext('2d').drawImage(this.image, this.x, this.y, this.xScl, this.yScl);
}

Bullet.prototype.Update = function()
{
//	while(this.y >= this.image.height)
//	{
	//	this.y--;
///	}
}