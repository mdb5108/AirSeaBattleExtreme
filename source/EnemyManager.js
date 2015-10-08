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
    this.imgPath = "airplane1.png";
    this.time_delay = 1;
    this.counter = this.time_delay;
    this.min_lanes = 1;
    this.max_lanes = 7;
    this.planes_path = ["airplane1.png","plane_2.png","plane_3.png","plane_4.png","plane_5.png","plane_6.png", "golden.png","plane_small_heli1.png","plane_small_heli2.png"];
    this.plane_type_min = 1;
    this.plane_type_max = 130;
    this.plane_type = 0;
    //DEBUG FOR SOUND
    //this.sound_paths = ["no_sound","no_sound","Fast Jet_01.mp3","Fast Jet_01.mp3","Helicopter_01.mp3","Helicopter_01.mp3", "no_sound","Helicopter_01.mp3","Helicopter_01.mp3"];
    this.sound_paths = ["New Slow Plane.mp3","New Slow Plane.mp3","Fast Jet_01.mp3","Fast Jet_01.mp3","Helicopter_01.mp3","Helicopter_01.mp3", "no_sound","Helicopter_01.mp3","Helicopter_01.mp3"];

};


EnemyManager.prototype.Update = function(gametime) {
    var current_lane; 
    var veloObj;
    var points;
    var health;
    this.plane_type = 0;
    if ( this.counter <= 0) {
        this.plane_type = Math.floor(Math.random() * (this.plane_type_max - this.plane_type_min + 1)) + this.plane_type_min;
        switch(this.plane_type)
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
                veloObj = new Vec2(400,0);
                points = 10;
                health = 1;
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
                veloObj = new Vec2(400,0);
                points = 10;
                health = 1;
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
                veloObj = new Vec2(200,0);
                points = 5;
                health = 2;
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
                veloObj = new Vec2(200,0);
                points = 5;
                health = 2;
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
                veloObj = new Vec2(100,0);
                points = 1;
                health = 1;
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
                this.plane_type = 1;
                veloObj = new Vec2(100,0);
                points = 1;
                health = 1;
                break;
            case 100:
                this.plane_type = 6;
                veloObj = new Vec2(100, 0);
                points = 20;
                health = 2;
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
                veloObj = new Vec2(200,0);
                points = 5;
                health = 1;
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
                veloObj = new Vec2(200,0);
                points = 5;
                health = 1;
                break;
   
        }
        this.img.src = this.imgPath;
        current_lane = Math.floor(Math.random() * (this.max_lanes - this.min_lanes + 1)) + this.min_lanes;
        var startLocation;
        var direction;
        if(Math.random() < 0.5)
        {
            startLocation = new Vec2(0, 50*current_lane);
            direction = 1;
        }
        else
        {
            startLocation = new Vec2(GameManager.CANVAS_WIDTH, 50*current_lane);
            veloObj = this.negateVelocity(veloObj);
            direction = -1;
        }

        var plane;
        if(this.plane_type == 6)
        {
            plane = new Ufo(Player.prototype.GetRandomPowerup(),
                    startLocation.x,
                    startLocation.y,
                    health,
                    veloObj,
                    direction,
                    points,
                    this.sound_paths[this.plane_type]);

        }
        else
        {
            plane = new Plane(this.planes_path[this.plane_type], startLocation.x, startLocation.y ,health,veloObj,direction,points,this.sound_paths[this.plane_type]);
        }
        this.planes.push(plane);
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
        this.planes[i].Destroy();
    }
    this.planes = [];
}

EnemyManager.prototype.negateVelocity = function(veloObj) {
    veloObj.x = -1 * veloObj.x;
    veloObj.y = veloObj.y;
    return veloObj;
}
