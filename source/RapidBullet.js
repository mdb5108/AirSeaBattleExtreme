function RapidBullet(player, power, velocity, x, y, trackIndex)
{
    this.ROTATE_SPEED = 2*Math.PI;
    var angle = Math.random()*2*Math.PI;
    Bullet.call(this, "rapidshot.png", player, angle, power, velocity, x, y, 10, 10, trackIndex);
}

RapidBullet.prototype = Object.create(Bullet.prototype);
RapidBullet.prototype.constructor = RapidBullet;

RapidBullet.prototype.Update = function(gameTime)
{
    Bullet.prototype.Update.call(this, gameTime);

    this.angle += this.ROTATE_SPEED*gameTime;
};
