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
    this.time_delay = .025;
    this.counter = this.time_delay;
    this.min_lanes = 1;
    this.max_lanes = 7;
    this.planes_path = ["airplane1.png","plane_2.png","plane_3.png","plane_4.png","plane_5.png","plane_6.png", "golden.png"];
    this.plane_type_min = 1;
    this.plane_type_max = 23;
    this.plane_type = 0;
    // this.sound_paths = ["Plane_01.mp3","Plane_01.mp3","Fast Jet_01.mp3","Fast Jet_01.mp3","Helicopter_01.mp3","Helicopter_01.mp3"];
    this.sound_paths = ["no_sound","no_sound","Fast Jet_01.mp3","Fast Jet_01.mp3","Helicopter_01.mp3","Helicopter_01.mp3", "no_sound"];

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
                this.plane_type = 2;
                veloObj = new Vec2(400,0);
                points = 10;
                health = 1;
                break;
            case 3:
            case 4:
                this.plane_type = 3;
                veloObj = new Vec2(400,0);
                points = 10;
                health = 1;
                break;
            case 5:
            case 6:
            case 7:
                this.plane_type = 5;
                veloObj = new Vec2(200,0);
                points = 5;
                health = 2;
                break;
            case 8:
            case 9:
            case 10:
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
                this.plane_type = 1;
                veloObj = new Vec2(100,0);
                points = 1;
                health = 1;
                break;
            case 21:
            case 22:
            case 23:
                this.plane_type = 7;
                veloObj = new Vec2(100, 0);
                points = 20;
                health = 2;
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
        if(this.plane_type == 7)
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
