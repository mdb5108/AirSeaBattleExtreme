Player.controls = {
    __LEFT: [false, false],
    __LEFT_REDO: [true, true],
    __RIGHT: [false, false],
    __RIGHT_REDO: [true, true],
    __FIRE: [false, false],

    __setLeft: function(number, value)
    {
        if(this.__LEFT_REDO[number])
        {
            this.__LEFT_REDO[number] = false;
            this.__LEFT[number] = true;
        }
    },
    __setRight: function(number, value)
    {
        if(this.__RIGHT_REDO[number])
        {
            this.__RIGHT_REDO[number] = false;
            this.__RIGHT[number] = true;
        }
    },

    __setLeftUnPressed: function(number)
    {
        this.__LEFT_REDO[number] = true;
    },
    __setRightUnPressed: function(number)
    {
        this.__RIGHT_REDO[number] = true;
    },

    getLeft: function(number)
    {
        return this.__LEFT[number];
    },
    getRight: function(number)
    {
        return this.__RIGHT[number];
    },
    getFire: function(number)
    {
        return this.__FIRE[number];
    },

    handleKeyDown: function(e)
    {
        e.preventDefault();
        switch(e.keyCode)
        {
            //Player 1
            case 96: //numpad 0
                this.__FIRE[0] = true;
                break;
            case 37: // left arrow
                this.__setLeft(0, true);
                break;
            case 39: // right arrow
                this.__setRight(0, true);
                break;

            //Player 2
            case 32: // spacebar
                this.__FIRE[1] = true;
                break;
            case 65: // a
                this.__setLeft(1, true);
                break;
            case 68: // d
                this.__setRight(1, true);
                break;
        }
    },
    handleKeyUp: function(e)
    {
        e.preventDefault();
        switch(e.keyCode)
        {
            //Player 1
            case 96: //numpad 0
                this.__FIRE[0] = false;
                break;
            case 37: // left arrow
                this.__setLeftUnPressed(0);
                break;
            case 39: // right arrow
                this.__setRightUnPressed(0);
                break;

            //Player 2
            case 32: // spacebar
                this.__FIRE[1] = false;
                break;
            case 65: // a
                this.__setLeftUnPressed(1);
                break;
            case 68: // d
                this.__setRightUnPressed(1);
                break;
        }
    },
    UpdateEnd: function(number)
    {
        this.__LEFT[number] = false;
        this.__RIGHT[number] = false;
    }
};

function Player(playerNum, health, x, y)
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

	if(Player.controls.getFire(this.playerNum) && this.canFire)
	{
        var facing = this.GetFacing();
        var startPosition = VectorAdd({x:this.barrel.x,y:this.barrel.y}, VectorMultiply(this.BARREL_OFFSET_TO_BASE+this.BARREL_OFFSET_TO_TIP, facing));
        var velocity = VectorMultiply(this.BULLET_SPEED,facing);
        var bullet = new Bullet("tempshot.png", velocity, startPosition.x, startPosition.y);
        this.canFire = false;
	}

  	if(Player.controls.getLeft(this.playerNum))
	{
        this.barrelRotation--;
        if(!(this.barrelRotation >= 0 && this.barrelRotation < this.BARREL_ROTATIONS.length))
        {
            this.barrelRotation++;
        }
	}		
	if(Player.controls.getRight(this.playerNum))
	{
        this.barrelRotation++;
        if(!(this.barrelRotation >= 0 && this.barrelRotation < this.BARREL_ROTATIONS.length))
        {
            this.barrelRotation--;
        }
	}
    this.barrel.angle = this.BARREL_ROTATIONS[this.barrelRotation];

    Player.controls.UpdateEnd(this.playerNum);
};

Player.prototype.GetFacing = function()
{
    return {x:Math.cos(this.barrel.angle-(Math.PI/2)), y:Math.sin(this.barrel.angle-(Math.PI/2))};
};

window.addEventListener("keydown", function(e){
    Player.controls.handleKeyDown(e);
}, false);

window.addEventListener("keyup", function(e){
    Player.controls.handleKeyUp(e);
}, false);
