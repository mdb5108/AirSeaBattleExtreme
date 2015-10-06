function Explosion(x, y, xScl, yScl)
{
    GameObject.call(this, "sprites-explosion.png", x, y, xScl, yScl);

    this.EXPLOSION_DURATION = .5;
    this.EXPLOSION_FRAMES = 12;
    this.EXPLOSION_COLUMNS = 12;
    this.EXPLOSION_ROWS = 1;

    this.curExplosionDuration = this.EXPLOSION_DURATION;

    this.SetAnimated(1800, 120, this.EXPLOSION_FRAMES/this.EXPLOSION_DURATION, this.EXPLOSION_COLUMNS, this.EXPLOSION_ROWS, this.EXPLOSION_FRAMES);
};

Explosion.prototype = Object.create(GameObject.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.Update = function(gameTime)
{
    GameObject.prototype.Update.call(this, gameTime);

    this.curExplosionDuration -= gameTime;
    if(this.curExplosionDuration <= 0)
    {
        this.Destroy();
    }
}
