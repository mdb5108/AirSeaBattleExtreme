EnemyManager.prototype = Object.create(GameObject.prototype);

function Vec2(x,y)
{
    this.x = x;
    this.y = y;
}

function EnemyManager()
{

    GameObject.call(this, "", 0,0,200,200);
    this.planes = [];
    this.imgPath = "img/plane_1.png";
    this.PERC_TO_START_SCALE = .25;
    this.PERC_TO_STOP_SCALE = .80;
    this.START_TIME_DELAY = .6;
    this.MIN_TIME_DELAY = .03;
    this.MAX_TIME_DELAY = .3;
    this.time_delay = this.START_TIME_DELAY;
    this.proxy_round_time = GameManager.GAME_LENGTH;

    this.counter = this.time_delay;

    this.lastUfoDirection = 1;
    this.UFO_SPAWN_DELAY = 10;
    this.ufoSpawnDelayCur = this.UFO_SPAWN_DELAY;

    this.min_lanes = 1;
    this.max_lanes = 7;
    this.planes_path = ["img/plane_1.png","img/plane_2.png","img/plane_3.png","img/plane_4.png","img/plane_5.png","img/plane_6.png", "img/golden.png","img/plane_small_heli1.png","img/plane_small_heli2.png"];
    this.plane_type_min = 1;
    this.plane_type_max = 130;
    this.plane_type = 0;
    //DEBUG FOR SOUND
    //this.sound_paths = ["no_sound","no_sound","Fast Jet_01.mp3","Fast Jet_01.mp3","Helicopter_01.mp3","Helicopter_01.mp3", "no_sound","Helicopter_01.mp3","Helicopter_01.mp3"];
    this.sound_paths = ["audio/New Slow Plane.mp3","audio/New Slow Plane.mp3","audio/Fast Jet_01.mp3","audio/Fast Jet_01.mp3","audio/Helicopter_01.mp3","audio/Helicopter_01.mp3", "no_sound","audio/Helicopter_01.mp3","audio/Helicopter_01.mp3"];

};


EnemyManager.prototype.Update = function(gametime) {
    var current_lane;
    this.plane_type = 0;
    this.UpdateTimeDelay(gametime);
    this.ufoSpawnDelayCur -= gametime;
    if(this.ufoSpawnDelayCur <= 0)
    {
        this.lastUfoDirection = this.lastUfoDirection == 1 ? -1 : 1;
        this.SpawnPlane(6, this.lastUfoDirection);
        this.ufoSpawnDelayCur = this.UFO_SPAWN_DELAY;
    }
    if ( this.counter <= 0) {
        //Spawn multiple planes if multiple spawn times have passed
        while(this.counter <= 0)
        {
            var randValue = Math.floor(Math.random() * (this.plane_type_max - this.plane_type_min + 1)) + this.plane_type_min;
            switch(randValue)
            {
                case 1:
                case 2:
                case 21:
                case 22:
                case 23:
                case 24:
                case 25:
                case 26:
                case 27:
                case 28:
                    this.plane_type = 2;
                    break;
                case 3:
                case 4:
                case 29:
                case 30:
                case 31:
                case 32:
                case 33:
                case 34:
                case 35:
                case 36:
                    this.plane_type = 3;
                    break;
                case 5:
                case 6:
                case 7:
                case 37:
                case 38:
                case 39:
                case 40:
                case 41:
                case 42:
                case 43:
                case 44:
                case 45:
                case 46:
                case 47:
                case 48:
                    this.plane_type = 5;
                    break;
                case 8:
                case 9:
                case 10:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 58:
                case 59:
                case 60:
                    this.plane_type = 4;
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 61:
                case 62:
                case 63:
                case 64:
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 71:
                case 72:
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                case 79:
                case 80:
                    this.plane_type = 0;
                    break;
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 81:
                case 82:
                case 83:
                case 84:
                case 85:
                case 86:
                case 87:
                case 88:
                case 89:
                case 90:
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                case 96:
                case 97:
                case 98:
                case 99:
                case 100:
                    this.plane_type = 1;
                    break;
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                    this.plane_type = 7;
                    break;
                case 116:
                
                case 117:
                case 118:
                case 119:
                case 120:
                case 121:
                case 122:
                case 123:
                case 124:
                case 125:
                case 126:
                case 127:
                case 128:
                case 129:
                case 130:
                    this.plane_type = 8;
                    break;

            }
            this.img.src = this.imgPath;
            this.SpawnPlane(this.plane_type);
            this.counter += this.time_delay;
        }
        this.counter = this.time_delay;
    }
    else
    {
        this.counter -= gametime;
    };

    for (var i = 0; i < this.planes.length; i++) {
        if(this.planes[i].getDeath())
            this.planes.splice(i,1);
    };

    // this.time_delay = 2000; //test metric for debugging
};

EnemyManager.prototype.UpdateTimeDelay = function(gameTime) {
    this.proxy_round_time -= gameTime;
    var percProgressed = (1-(this.proxy_round_time/GameManager.GAME_LENGTH));
    if(this.PERC_TO_START_SCALE <= percProgressed && percProgressed <= this.PERC_TO_STOP_SCALE)
    {
        var percLerp = (percProgressed - this.PERC_TO_START_SCALE)/(this.PERC_TO_STOP_SCALE - this.PERC_TO_START_SCALE)
        this.time_delay = this.MIN_TIME_DELAY + Math.cos(Math.PI/2*percLerp)*(this.MAX_TIME_DELAY - this.MIN_TIME_DELAY);
        if(this.proxy_round_time <= 0)
        {
            this.proxy_round_time = 0;
            this.time_delay = this.MIN_TIME_DELAY;
        }
    }
}

EnemyManager.prototype.Draw = function (){
//leaving it empty for the override
}

EnemyManager.prototype.Destroy = function() {
    GameObject.prototype.Destroy.call(this);
    this.Clear();
}

EnemyManager.prototype.Clear = function() {
    for(var i = 0; i < this.planes.length; i++)
    {
        this.planes[i].Destroy(true);
    }
    this.planes = [];
}

EnemyManager.prototype.SpawnPlane = function(plane_type, direction)
{
    var veloObj;
    var points;
    var health;
    switch(plane_type)
    {
        case 2:
            veloObj = new Vec2(400,0);
            points = 10;
            health = 1;
            break;
        case 3:
            veloObj = new Vec2(400,0);
            points = 10;
            health = 1;
            break;
        case 5:
            veloObj = new Vec2(200,0);
            points = 5;
            health = 2;
            break;
        case 4:
            veloObj = new Vec2(200,0);
            points = 5;
            health = 2;
            break;
        case 0:
            veloObj = new Vec2(100,0);
            points = 1;
            health = 1;
            break;
        case 1:
            veloObj = new Vec2(100,0);
            points = 1;
            health = 1;
            break;
        case 6:
            veloObj = new Vec2(100, 0);
            points = 20;
            health = 2;
            break;
        case 7:
            veloObj = new Vec2(200,0);
            points = 5;
            health = 1;                   
            break;
        case 8:
            veloObj = new Vec2(200,0);
            points = 5;
            health = 1;                   
            break;            

    }

    if(plane_type != 6)
    {
        current_lane = Math.floor(Math.random() * (this.max_lanes - this.min_lanes + 1)) + this.min_lanes;
    }
    else
    {
        current_lane = Math.floor(Math.random() * (this.max_lanes - this.min_lanes + 1)/2) + this.min_lanes + (this.max_lanes - this.min_lanes + 1)/2;
    }
    var startLocation;
    if(direction == undefined)
    {
        if(Math.random() < 0.5)
        {
            direction = 1;
        }
        else
        {
            direction = -1;
        }
    }

    if(direction == 1)
    {
        startLocation = new Vec2(0, 50*current_lane);
    }
    else
    {
        veloObj = this.negateVelocity(veloObj);
        startLocation = new Vec2(GameManager.CANVAS_WIDTH, 50*current_lane);
    }

    var plane;
    if(plane_type == 6)
    {
        plane = new Ufo(Player.prototype.GetRandomPowerup(),
                startLocation.x,
                startLocation.y,
                health,
                veloObj,
                direction,
                points,
                this.sound_paths[plane_type]);
    }
    else
    {
        plane = new Plane(this.planes_path[plane_type], startLocation.x, startLocation.y ,health,veloObj,direction,points,this.sound_paths[plane_type]);
    }
    this.planes.push(plane);
}

EnemyManager.prototype.negateVelocity = function(veloObj) {
    veloObj.x = -1 * veloObj.x;
    veloObj.y = veloObj.y;
    return veloObj;
}
