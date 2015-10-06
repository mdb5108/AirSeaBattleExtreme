function Ufo(powerup, x, y, health, velocity, direction, points, sound_path)
{
    Plane.call(this, "golden.png", x, y, health, velocity, direction, points, sound_path);
    this.powerup = powerup;
};

Ufo.prototype = Object.create(Plane.prototype);
Ufo.prototype.constructor = Ufo;

Ufo.prototype.OnCollision = function(collider)
{
    Plane.prototype.OnCollision.call(this, collider);
    if(this.is_dead)
    {
        collider.player.ChangePowerUp(this.powerup);
    }
};
