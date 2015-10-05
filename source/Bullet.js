function Bullet(imgPath, playerNum, angle, velocity, x, y)
{
	Collidable.call(this, "Bullet", imgPath, {x:x, y:y}, 10, 10);
    this.playerNum = playerNum;
    this.visible = false;
    this.velocity = velocity;
    this.angle = angle;

    Bullet.bullets.push(this);
    Bullet.__clearing = false;
};

Bullet.bullets = [];
Bullet.Clear = function()
{
    Bullet.__clearing = true;
    for(var i = 0; i < Bullet.bullets.length; i++)
    {
        Bullet.bullets[i].Destroy();
    }
    Bullet.bullets = [];
    Bullet.__clearing = false;
}

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

Bullet.prototype.Destroy = function()
{
    Collidable.prototype.Destroy.call(this);
    if(!Bullet.__clearing)
    {
        for(var i = 0; i < Bullet.bullets.length; i++)
        {
            if(Bullet.bullets[i].id == this.id)
            {
                Bullet.bullets.splice(i,i);
                break;
            }
        }
    }
};
