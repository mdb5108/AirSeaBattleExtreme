function Enemy(speed)
{
    this.HEIGHT = 50;
    this.WIDTH = 100;
    var LANES = 4;
    var LANE_HEIGHT = 100;
    //Can be 5 in rare case?  Maybe not because of random interval
    var randomLane = Math.floor(Math.random()*LANES);
    this.leftToRight = Math.random() <= .5;
    var position;
    if(this.leftToRight)
    {
        position = {x:0, y:(this.HEIGHT/2)+randomLane*LANE_HEIGHT};
        this.velocity = {x:speed, y:0};
    }
    else
    {
        position = {x:GameManager.CANVAS_WIDTH, y:(this.HEIGHT/2)+randomLane*LANE_HEIGHT};
        this.velocity = {x:-speed, y:0};
    }
    Collidable.call(this, "Enemy", "airplane1.png", position, this.WIDTH, this.HEIGHT);
};

Enemy.prototype = Object.create(Collidable.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.Draw = function(canvas2D)
{
    canvas2D.save();
    canvas2D.translate(this.x, this.y);
    this.img.src = this.imgPath;
    canvas2D.translate(this.imageOffset.x, this.imageOffset.y);
    if(this.leftToRight)
    {
        canvas2D.scale(1, 1);
    }
    else
    {
        canvas2D.scale(-1, 1);
    }
    canvas2D.drawImage(this.img, -this.xScl/2, -this.yScl/2, this.xScl, this.yScl);
    canvas2D.restore();
};

Enemy.prototype.Update = function(gameTime)
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

Enemy.prototype.OnCollision = function(collider)
{
    if(collider.tag == "Bullet")
    {
        this.Destroy();
    }
};
