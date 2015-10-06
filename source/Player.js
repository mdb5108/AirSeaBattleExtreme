function Player(playerNum, x, y)
{
    this.BARREL_ROTATE_MAX = Math.PI/4;
    this.BARREL_ROTATE_MIN = -Math.PI/4;
    this.BARREL_ROTATIONS = [-Math.PI/4, -Math.PI/8, 0, Math.PI/8, Math.PI/4];

    this.BARREL_OFFSET_TO_BASE = 25;
    this.BARREL_OFFSET_TO_TIP = 70;
    this.BULLET_SPEED = 500;
    this.BULLET_FIRE_DELAY = 1;

    this.SPREAD_COUNT = 3;
    this.SPREAD_SHOT_SPREAD = Math.PI/4;

    this.barrelRotation = 2;

    this.bulletFireDelayCur = 0;
    this.canFire = true;

    this.PLAYER_ROTATE_SPEED = Math.PI;

    this.playerNum = playerNum;
    this.bullet = null;
    GameObject.call(this, "turret_b.png", x, y, 105, 150);
    
    this.barrel = new GameObject("turret_a.png", x, y+this.BARREL_OFFSET_TO_BASE, 105, 150);
    this.barrel.angle = 0;
    this.barrel.SetImageOffset({x:0, y:-this.BARREL_OFFSET_TO_BASE});

    this.powerups = ["spreadshot", "rapidfire", "waveshot", "ultimatelaser"];
    this.activepowerup = true;
    this.curpowerup = this.powerups[0];
};

Player.prototype = Object.create(GameObject.prototype);

Player.prototype.constructor = Player;

Player.prototype.Update = function(gameTime)
{
    GameObject.prototype.Update.call(this, gameTime);

    if(!this.canFire)
    {
        this.bulletFireDelayCur += gameTime;
        if(this.bulletFireDelayCur >= this.BULLET_FIRE_DELAY)
        {
            this.bulletFireDelayCur = 0;
            this.canFire = true;
        }
    }

    if(InputManager.getFire(this.playerNum) && this.canFire)
    {
        var facing = this.GetFacing();
        var leftPath = VectorAdd({x:this.barrel.x,y:this.barrel.y}, VectorMultiply(this.BARREL_OFFSET_TO_BASE+this.BARREL_OFFSET_TO_TIP, {x:Math.cos(-Math.PI/4 - Math.PI/2), y:Math.sin(-Math.PI/4 - Math.PI/2)}));
        var bulletPosition = VectorAdd({x:this.barrel.x,y:this.barrel.y}, VectorMultiply(this.BARREL_OFFSET_TO_BASE+this.BARREL_OFFSET_TO_TIP, facing));
        var rightPath = VectorAdd({x:this.barrel.x,y:this.barrel.y}, VectorMultiply(this.BARREL_OFFSET_TO_BASE+this.BARREL_OFFSET_TO_TIP, {x:Math.cos(Math.PI/4 - Math.PI/2), y:Math.sin(Math.PI/4 - Math.PI/2)}));

        var velocity = VectorMultiply(this.BULLET_SPEED,facing);

        bulletPosition.x += Math.cos(this.barrel.angle - Math.PI/2);
        bulletPosition.y += Math.sin(this.barrel.angle - Math.PI/2);

        if(this.activepowerup)
        {
            if(this.curpowerup == this.powerups[0])
            {
                var spreadOffset = -(this.SPREAD_SHOT_SPREAD*Math.floor(this.SPREAD_COUNT/2));
                for(var i = 0; i < this.SPREAD_COUNT; i++)
                {
                    var bulletAngle = spreadOffset + (this.barrel.angle - (Math.PI/2) + this.SPREAD_SHOT_SPREAD*i);
                    var spreadVelocity = VectorMultiply(this.BULLET_SPEED, VectorFromAngle(bulletAngle));
                    new Bullet("bullet.png", this.playerNum, bulletAngle+(Math.PI/2), 1, spreadVelocity, bulletPosition.x, bulletPosition.y, 10, 10);
                }
                this.canFire = false;
            }
            else if(this.curpowerup == this.powerups[1])
            {
                velocity = VectorMultiply(2, velocity);
                this.midbullet = new Bullet("bullet.png", this.playerNum, this.barrel.angle, 1, velocity, bulletPosition.x, bulletPosition.y, 10, 10);
            }
            else if(this.curpowerup == this.powerups[2])
            {
                this.midbullet = new Bullet("laser light-1.png", this.playerNum, this.barrel.angle, 2, velocity, bulletPosition.x, bulletPosition.y, 50, 50);
                this.canFire = false;
            }
            else if(this.curpowerup == this.powerups[3])
            {
                this.midbullet = new Bullet("laser-red sprites.png", this.playerNum, this.barrel.angle, 5, velocity, bulletPosition.x, bulletPosition.y, 100, 100);
            }
        }
        else
        {
            this.midbullet = new Bullet("bullet.png", this.playerNum, this.barrel.angle, 1, velocity, bulletPosition.x, bulletPosition.y, 10, 10);
            this.canFire = false;
        }
    }

    if(InputManager.getLeft(this.playerNum))
    {
        this.barrelRotation--;
        if(!(this.barrelRotation >= 0 && this.barrelRotation < this.BARREL_ROTATIONS.length))
        {
            this.barrelRotation++;
        }
    }		
    if(InputManager.getRight(this.playerNum))
    {
        this.barrelRotation++;
        if(!(this.barrelRotation >= 0 && this.barrelRotation < this.BARREL_ROTATIONS.length))
        {
            this.barrelRotation--;
        }
    }
    this.barrel.angle = this.BARREL_ROTATIONS[this.barrelRotation];
};

Player.prototype.Destroy = function()
{
    GameObject.prototype.Destroy.call(this);
    this.barrel.Destroy();
};

Player.prototype.Draw = function(canvas2D)
{
    GameObject.prototype.Draw.call(this, canvas2D);
}

Player.prototype.GetFacing = function()
{
    return VectorFromAngle(this.barrel.angle-(Math.PI/2));
};

