function WaveBullet(player, angle, power, speed, direction, x, y, side)
{
    Bullet.call(this, "Bullet.png", player, angle, power, {x:0, y:0}, x, y, 10, 10);
    this.side = side ? 1 : -1;
    this.originalX = x;
    this.originalY = y;
    this.originalAngle = angle;
    this.speed = speed;
    this.direction = direction;
    this.time = 0;
    this.waveMagnitude = 50;
    this.waveFrequency = 1.5*Math.PI*2;
};

WaveBullet.prototype = Object.create(Bullet.prototype);
WaveBullet.prototype.constructor = WaveBullet;

WaveBullet.prototype.Update = function(gameTime)
{
    Collidable.prototype.Update.call(this, gameTime);
    this.time += gameTime;

    var displacement = VectorAdd(VectorMultiply(this.speed*this.time, this.direction), VectorMultiply(this.side*this.waveMagnitude*Math.sin(this.time*this.waveFrequency), VectorPerpendicular(this.direction)));
    this.x = this.originalX+displacement.x;
    this.y = this.originalY+displacement.y;
    this.angle = this.originalAngle + this.side*Math.cos(this.time*this.waveFrequency);

    var canvasRect = new Rect(0, 0, GameManager.CANVAS_WIDTH, GameManager.CANVAS_HEIGHT);

    if(!(canvasRect.Contains({x:this.x, y:this.y})))
    {
        this.Destroy();
    }
};
