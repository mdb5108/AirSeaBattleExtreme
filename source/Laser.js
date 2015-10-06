function Laser(playerNum, angle, power, x, y)
{
    Collidable.call(this, "Bullet", "laser-red sprites.png", {x:x, y:y}, 83, 1200);

    this.LASER_OFFSET = 550;

    this.SetImageOffset({x:0, y:-this.LASER_OFFSET});

    this.playerNum = playerNum;
    this.angle = angle;
    this.power = power;
};

Laser.prototype = Object.create(Collidable.prototype);
Laser.prototype.constructor = Laser;

Laser.prototype.Draw = function(canvas2D)
{
    Collidable.prototype.Draw.call(this, canvas2D);
};
