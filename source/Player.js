function Player(playerNum, x, y)
{
    this.BARREL_ROTATE_MAX = Math.PI/4;
    this.BARREL_ROTATE_MIN = -Math.PI/4;
    this.BARREL_ROTATIONS = [-Math.PI/4, -Math.PI/8, 0, Math.PI/8, Math.PI/4];

    this.BARREL_OFFSET_TO_BASE = 25;
    this.BARREL_OFFSET_TO_TIP = 70;
    this.BULLET_SPEED = 500;
    this.BULLET_NORMAL_DELAY = .4;
    this.RAPID_BULLET_DELAY = .175;
    this.WAVE_BULLET_DELAY = .5;
    this.SPREAD_BULLET_DELAY = .5;
    this.bulletFireDelay = this.BULLET_NORMAL_DELAY;

    this.SPREAD_COUNT = 3;
    this.SPREAD_SHOT_SPREAD = Math.PI/4;

    this.LASER_TIME = .5;
    this.curLaserTime = 0;
    this.laserActive = false;

    this.barrelRotation = 2;

    this.bulletFireDelayCur = 0;
    this.canFire = true;

    this.PLAYER_ROTATE_SPEED = Math.PI;

    this.playerNum = playerNum;
    this.bullet = null;
    
    if(this.playerNum == 0)
    {
        GameObject.call(this, "turret_b.png", x, y, 105, 150);
        this.barrel = new GameObject("turret_a.png", x, y+this.BARREL_OFFSET_TO_BASE, 105, 150);
    }
    if(this.playerNum == 1)
    {
        GameObject.call(this, "turret_2b.png", x, y, 105, 150);
        this.barrel = new GameObject("turret_2a.png", x, y+this.BARREL_OFFSET_TO_BASE, 105, 150);
    }

    this.barrel.angle = 0;
    this.barrel.SetImageOffset({x:0, y:-this.BARREL_OFFSET_TO_BASE});

    this.ChangePowerUp(Player.prototype.POWER_UPS.NORMAL);
};

Player.prototype = Object.create(GameObject.prototype);

Player.prototype.constructor = Player;

Player.prototype.POWER_UP_SIZE = 4;
Player.prototype.POWER_UPS = {
    NORMAL: 0,
    SPREADSHOT: 1,
    RAPID_FIRE: 2,
    WAVESHOT: 3,
    LASER: 4,
};
Player.prototype.GetRandomPowerup = function()
{
    var powerupIndex = Math.floor(Math.random()*Player.prototype.POWER_UP_SIZE);
    var powerup;
    switch(powerupIndex)
    {
        case 0:
            powerup = Player.prototype.POWER_UPS.SPREADSHOT;
            break;
        case 1:
            powerup = Player.prototype.POWER_UPS.RAPID_FIRE;
            break;
        case 2:
            powerup = Player.prototype.POWER_UPS.WAVESHOT;
            break;
        case 3:
            powerup = Player.prototype.POWER_UPS.LASER;
            break;
    }

    return powerup;
};



Player.prototype.Update = function(gameTime)
{
    GameObject.prototype.Update.call(this, gameTime);

    this.UpdateLaserDelay(gameTime);

    if(!this.canFire)
    {
        this.bulletFireDelayCur += gameTime;
        if(this.bulletFireDelayCur >= this.bulletFireDelay)
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

        switch(this.curpowerup)
        {
            case Player.prototype.POWER_UPS.SPREADSHOT:
                var spreadOffset = -(this.SPREAD_SHOT_SPREAD*Math.floor(this.SPREAD_COUNT/2));
                for(var i = 0; i < this.SPREAD_COUNT; i++)
                {
                    var bulletAngle = spreadOffset + (this.barrel.angle - (Math.PI/2) + this.SPREAD_SHOT_SPREAD*i);
                    var spreadVelocity = VectorMultiply(this.BULLET_SPEED, VectorFromAngle(bulletAngle));
                    new Bullet("bullet2.png", this, bulletAngle+(Math.PI/2), 1, spreadVelocity, bulletPosition.x, bulletPosition.y, 10, 10);
                }
                break;
            case Player.prototype.POWER_UPS.RAPID_FIRE:
                velocity = VectorMultiply(2, velocity);
                this.midbullet = new Bullet("bullet2.png", this, this.barrel.angle, 1, velocity, bulletPosition.x, bulletPosition.y, 10, 10);
                break;
            case Player.prototype.POWER_UPS.WAVESHOT:
                this.midbullet = new WaveBullet(this, this.barrel.angle, 2, this.BULLET_SPEED, facing, bulletPosition.x, bulletPosition.y, true);
                this.midbullet = new WaveBullet(this, this.barrel.angle, 2, this.BULLET_SPEED, facing, bulletPosition.x, bulletPosition.y, false);
                break;
            case Player.prototype.POWER_UPS.LASER:
            default:
                this.midbullet = new Bullet("bullet2.png", this, this.barrel.angle, 1, velocity, bulletPosition.x, bulletPosition.y, 10, 10);
                break;
        }
        this.canFire = false;
    }

    if(InputManager.getDown(this.playerNum) && this.curpowerup == Player.prototype.POWER_UPS.LASER)
    {
        this.laserActive = true;
        if(this.laser != undefined)
            this.laser.Destroy();
        this.curLaserTime = this.LASER_TIME;
        this.laser = new Laser(this, this.barrel.angle, 5, this.x, this.y+this.BARREL_OFFSET_TO_BASE);
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
    if(this.laser != undefined)
        this.laser.Destroy();
};

Player.prototype.Draw = function(canvas2D)
{
    GameObject.prototype.Draw.call(this, canvas2D);
}

Player.prototype.ChangePowerUp = function(powerup)
{
    //Set to normalative state
    this.bulletFireDelay = this.BULLET_NORMAL_DELAY;
    this.curpowerup = powerup;
    switch(this.curpowerup)
    {
        case Player.prototype.POWER_UPS.RAPID_FIRE:
            this.bulletFireDelay = this.RAPID_BULLET_DELAY;
            break;
        case Player.prototype.POWER_UPS.WAVESHOT:
            this.bulletFireDelay = this.WAVE_BULLET_DELAY;
            break;
        case Player.prototype.POWER_UPS.SPREADSHOT:
            this.bulletFireDelay = this.SPREAD_BULLET_DELAY;
            break;
    }
};

Player.prototype.UpdateLaserDelay = function(gameTime)
{
    if(this.laserActive)
    {
        this.laser.angle = this.barrel.angle;
        this.curLaserTime -= gameTime;
        if(this.curLaserTime <= 0)
        {
            this.laser.Destroy();
            this.laserActive = false;
            this.ChangePowerUp(Player.prototype.POWER_UPS.NORMAL);
        }
    }
};

Player.prototype.GetFacing = function()
{
    return VectorFromAngle(this.barrel.angle-(Math.PI/2));
};

