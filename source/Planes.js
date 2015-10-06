Plane.prototype = Object.create(Collidable.prototype);

function Plane(imgPath, x, y, health, velocity,direction,points,sound_path)
{   
    this.WIDTH = 100;
    this.HEIGHT = 50;
    Collidable.call(this, "Plane", imgPath, {x:x, y:y}, this.WIDTH, this.HEIGHT);
    this.visible = true;
    this.imgPath = imgPath;
    this.x = x;
    this.y = y;
    this.health = health;
    this.velocity = velocity;
    this.direction = direction;
    this.points = points;
    this.sound_loop = false;
    this.is_dead = false;
    this.sound_path = sound_path;
};


Plane.prototype.Update = function(gametime) {
    var canvasRect = new Rect(0, 0, GameManager.CANVAS_WIDTH, GameManager.CANVAS_HEIGHT);
    this.x += this.velocity.x * gametime;
    this.y += this.velocity.y * gametime;
    if(!(canvasRect.Contains({x:this.x, y:this.y})))
    {
        this.PauseSound();
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
    if(this.sound_path != "no_sound")
        this.PlaySound();
    this.sound_path = "no_sound";

};

Plane.prototype.OnCollision = function(collider)
{
    Collidable.prototype.OnCollision(collider);
    if( collider.tag == "Bullet")
    {
        this.health -= collider.power;
        if(this.health <= 0)
        {
            this.is_dead = true;            
            this.PauseSound();
            this.sound_loop = false;
            this.sound_path = "Explosion_01.mp3";
            this.PlaySound();                  
            this.Destroy();
            new Explosion(this.x, this.y, this.WIDTH, this.HEIGHT);
         
            if(collider.playerNum == 0)
            {
                GameManager.__scores[0] += this.points;
            }
            else
            {
                GameManager.__scores[1] += this.points;
            }
        }
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
