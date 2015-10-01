Plane.prototype = Object.create(Collidable.prototype);

function Plane(imgPath, x, y, velocity,direction,points)
{   
    Collidable.call(this, "Plane", imgPath, {x:x, y:y}, 100, 50);
    this.visible = true;
    this.imgPath = imgPath;
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.direction = direction;
    this.points = points;
    this.is_dead = false;
};


Plane.prototype.Update = function(gametime) {
    var canvasRect = new Rect(0, 0, GameManager.CANVAS_WIDTH, GameManager.CANVAS_HEIGHT);
    this.x += this.velocity.x * gametime;
    this.y += this.velocity.y * gametime;
    if(!(canvasRect.Contains({x:this.x, y:this.y})))
    {
        this.is_dead = true;
        this.Destroy();
    }
};

Plane.prototype.Draw = function(canvas2D)
{
    canvas2D.save();
    //Center
    canvas2D.translate(this.x, this.y);
    this.img.src = this.imgPath;
    canvas2D.translate(this.imageOffset.x, this.imageOffset.y);
    if(this.direction == 1)
      canvas2D.scale(1, 1);
  else 
      canvas2D.scale(-1,1);
  canvas2D.drawImage(this.img, -this.xScl/2, -this.yScl/2, this.xScl, this.yScl);
  canvas2D.restore();
};

Plane.prototype.OnCollision = function(collider)
{
    Collidable.prototype.OnCollision(collider);
    if( collider.tag == "Bullet")
    {
        this.is_dead = true;
        this.Destroy();
    }
};

Plane.prototype.getDeath = function ()
{
    return this.is_dead;
}

Plane.prototype.getPoints = function ()
{
    return this.points;
}