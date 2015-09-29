Player.controlsPressed = {
	left: false,
    redoLeft: false,
	up: false,
    redoUp: false,
	right: false,
    redoRight: false,
	down: false,
    redoDown: false,
	space: false,
    redoSpace: false,
    clear: function()
    {
        this.left = false;
        this.up = false;
        this.right = false;
        this.down = false;
        this.space = false;
    }
};
Player.controls = {
	left: false,
	up: false,
	right: false,
	down: false,
	space: false
};

function Player(health, x, y)
{
    this.BARREL_ROTATE_MAX = Math.PI/4;
    this.BARREL_ROTATE_MIN = -Math.PI/4;
    this.BARREL_ROTATIONS = [-Math.PI/4, -Math.PI/8, 0, Math.PI/8, Math.PI/4];

    this.BARREL_OFFSET_TO_BASE = 25;
    this.BARREL_OFFSET_TO_TIP = 70;
    this.BULLET_SPEED = 300;
    this.BULLET_FIRE_DELAY = .5;

    this.barrelRotation = 2;

    this.bulletFireDelayCur = 0;
    this.canFire = true;

    this.PLAYER_ROTATE_SPEED = Math.PI;

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

	if(Player.controls.space && this.canFire)
	{
        var facing = this.GetFacing();
        var startPosition = VectorAdd({x:this.barrel.x,y:this.barrel.y}, VectorMultiply(this.BARREL_OFFSET_TO_BASE+this.BARREL_OFFSET_TO_TIP, facing));
        var velocity = VectorMultiply(this.BULLET_SPEED,facing);
        var bullet = new Bullet("tempshot.png", velocity, startPosition.x, startPosition.y);
        this.canFire = false;
	}

  	if(Player.controlsPressed.left)
	{
        this.barrelRotation--;
        if(!(this.barrelRotation >= 0 && this.barrelRotation < this.BARREL_ROTATIONS.length))
        {
            this.barrelRotation++;
        }
	}		
	if(Player.controlsPressed.right)
	{
        this.barrelRotation++;
        if(!(this.barrelRotation >= 0 && this.barrelRotation < this.BARREL_ROTATIONS.length))
        {
            this.barrelRotation--;
        }
	}
    this.barrel.angle = this.BARREL_ROTATIONS[this.barrelRotation];

    Player.controlsPressed.clear();
};

Player.prototype.GetFacing = function()
{
    return {x:Math.cos(this.barrel.angle-(Math.PI/2)), y:Math.sin(this.barrel.angle-(Math.PI/2))};
};

window.addEventListener("keydown", function(e){
	e.preventDefault();
	switch(e.keyCode)
	{
		case 32: // spacebar
            Player.controls.space = true;
            if(Player.controlsPressed.redoSpace)
            {
                Player.controlsPressed.redoSpace = false;
                Player.controlsPressed.space = true;
            }
			break;
		case 37: // left arrow
			Player.controls.left = true;
            if(Player.controlsPressed.redoLeft)
            {
                Player.controlsPressed.redoLeft = false;
                Player.controlsPressed.left = true;
            }
			break;
		case 38: // up arrow
			Player.controls.up = true;
            if(Player.controlsPressed.redoUp)
            {
                Player.controlsPressed.redoUp = false;
                Player.controlsPressed.up = true;
            }
			break;
		case 39: // right arrow
			Player.controls.right = true;
            if(Player.controlsPressed.redoRight)
            {
                Player.controlsPressed.redoRight = false;
                Player.controlsPressed.right = true;
            }
			break;
		case 40: // down arrow
			Player.controls.down = true;
            if(Player.controlsPressed.redoDown)
            {
                Player.controlsPressed.redoDown = false;
                Player.controlsPressed.down = true;
            }
			break;
	}
}, false);

window.addEventListener("keyup", function(e){
	e.preventDefault();
	switch(e.keyCode)
	{
		case 32:
			Player.controls.space = false;
            Player.controlsPressed.redoSpace = true;
			break;
		case 37: // left arrow
			Player.controls.left = false;
            Player.controlsPressed.redoLeft = true;
			break;
		case 38: // up arrow
			Player.controls.up = false;
            Player.controlsPressed.redoUp = true;
			break;
		case 39: // right arrow
			Player.controls.right = false;
            Player.controlsPressed.redoRight = true;
			break;
		case 40: // down arrow
			Player.controls.down = false;
            Player.controlsPressed.redoDown = true;
			break;		
	}
}, false);
