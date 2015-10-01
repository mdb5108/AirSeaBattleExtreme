
function Player(playerNum, health, x, y)
{
    this.BARREL_ROTATE_MAX = Math.PI/4;
    this.BARREL_ROTATE_MIN = -Math.PI/4;
    this.BARREL_ROTATIONS = [-Math.PI/4, -Math.PI/8, 0, Math.PI/8, Math.PI/4];

    this.BARREL_OFFSET_TO_BASE = 25;
    this.BARREL_OFFSET_TO_TIP = 70;
    this.BULLET_SPEED = 500;
    this.BULLET_FIRE_DELAY = 1;

    this.barrelRotation = 2;

    this.bulletFireDelayCur = 0;
    this.canFire = true;

    this.PLAYER_ROTATE_SPEED = Math.PI;

    this.playerNum = playerNum;

	GameObject.call(this, "turret_b.png", x, y, 105, 150);
    this.angle = 0;
	this.health = health;

    this.barrel = new GameObject("turret_a.png", x, y+this.BARREL_OFFSET_TO_BASE, 105, 150);
    this.barrel.SetImageOffset({x:0, y:-this.BARREL_OFFSET_TO_BASE});
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
        var startPosition = VectorAdd({x:this.barrel.x,y:this.barrel.y}, VectorMultiply(this.BARREL_OFFSET_TO_BASE+this.BARREL_OFFSET_TO_TIP, facing));
        var velocity = VectorMultiply(this.BULLET_SPEED,facing);
        var bullet = new Bullet("tempshot.png", velocity, startPosition.x, startPosition.y);
        this.canFire = false;
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

Player.prototype.GetFacing = function()
{
    return {x:Math.cos(this.barrel.angle-(Math.PI/2)), y:Math.sin(this.barrel.angle-(Math.PI/2))};
};

