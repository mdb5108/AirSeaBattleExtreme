function Bullet(imgPath, velocity, x, y)
{
	Collidable.call(this, "Bullet", imgPath, {x:x, y:y}, 10, 10);
	this.visible = false;
	this.velocity = velocity;	
};

Bullet.prototype = Object.create(Collidable.prototype);

Bullet.prototype.constructor = Bullet;

Bullet.prototype.SetPosition = function(x, y)
{
	this.x = x;
	this.y = y;
}

Bullet.prototype.Update = function(gameTime)
{
    Collidable.prototype.Update.call(this, gameTime);
	this.x += this.velocity.x*gameTime;
	this.y += this.velocity.y*gameTime;

    var canvasRect = new Rect(0, 0, GameManager.CANVAS_WIDTH, GameManager.CANVAS_HEIGHT);

    if(!(canvasRect.Contains({x:this.x, y:this.y})))
    {
        this.Destroy();
    }
};

Bullet.prototype.OnCollision = function(collider)
{
    Collidable.prototype.OnCollision(collider);
    if(collider.tag != "Player1" && collider.tag != "Player2" && collider.tag != "Bullet")
    {
        this.Destroy();
    }
};
