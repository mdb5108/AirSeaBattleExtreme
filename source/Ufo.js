function Ufo(powerup, x, y, health, velocity, direction, points, sound_path)
{
    Plane.call(this, "golden.png", x, y, health, velocity, direction, points, sound_path, 115, 65);
    this.powerup = powerup;
    this.diedInCollision = false;
};

Ufo.prototype = Object.create(Plane.prototype);
Ufo.prototype.constructor = Ufo;

Ufo.prototype.OnCollision = function(collider)
{
    this.diedInCollision = false;
    Plane.prototype.OnCollision.call(this, collider);
    if(this.diedInCollision)
    {
            collider.player.ChangePowerUp(this.powerup);
    }
};

Ufo.prototype.Destroy = function()
{
    Plane.prototype.Destroy.call(this);
    this.diedInCollision = true;

};
