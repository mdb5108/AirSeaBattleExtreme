function Laser(player, angle, power, x, y)
{
    Collidable.call(this, "Bullet", "img/laser-red sprites.png", {x:x, y:y}, 83/2, 1200, GameManager.PHYSICS_LAYERS.BULLETS, true);

    var LASER_FRAME_RATE = 20;
    var LASER_FRAMES = 2;
    var LASER_COLUMNS = 2;
    var LASER_ROWS = 1;

    this.LASER_OFFSET = 525;

    this.SetImageOffset({x:0, y:-this.LASER_OFFSET});

    this.player = player;
    this.angle = angle;
    this.power = power;
    this.sound_path = "audio/Laser Charge and Shot_mixdown.mp3";     
    this.sound_loop = false;

    this.SetAnimated(83, 1200, LASER_FRAME_RATE, LASER_COLUMNS, LASER_ROWS, LASER_FRAMES);
};

Laser.prototype = Object.create(Collidable.prototype);
Laser.prototype.constructor = Laser;

Laser.prototype.Draw = function(canvas2D)
{   

    Collidable.prototype.Draw.call(this, canvas2D);
};
