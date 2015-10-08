// Parent Class for all objects

// Update
// Draw
// Destroy

function GameObject(imgPath, x, y, xScl, yScl)
{
	this.id = GenerateUniqueId();
	this.x = x;
	this.y = y;
	this.xScl = xScl;
	this.yScl = yScl;
	this.imgPath = imgPath;
	this.img = new Image();
    this.angle = 0;
    this.imageOffset = {x:0, y:0};

    this.updateDuringPause = false;

    this.sound_path 
    this.sound_obj;
    this.sound_loop = true;
    this.sound_paths = [];

    this.animated = false;
    this.frameTime = 0;
    this.curFrame = 0;
    this.columns = 1;
    this.rows = 1;
    this.frameRateR = 1;

    GameManager.AddGameObject(this);    

};

GameObject.prototype.constructor = GameObject;

GameObject.prototype.Draw = function(canvas2D)
{
    canvas2D.save();
    //Center
    canvas2D.translate(this.x, this.y);
    canvas2D.rotate(this.angle);
    this.img.src = this.imgPath;
    canvas2D.translate(this.imageOffset.x, this.imageOffset.y);
    if(!this.animated)
        canvas2D.drawImage(this.img, -this.xScl/2, -this.yScl/2, this.xScl, this.yScl);
    else
        canvas2D.drawImage(this.img,
                           (this.curFrame % this.columns)*this.frameWidth,
                           Math.floor(this.curFrame / this.columns)*this.frameHeight,
                           this.frameWidth,
                           this.frameHeight,
                           -this.xScl/2,
                           -this.yScl/2,
                           this.xScl,
                           this.yScl);
    canvas2D.restore();
    if(this.sound_path != "no_sound")
        this.PlaySound();
    this.sound_path = "no_sound";

};

GameObject.prototype.PlaySound = function ()
{
    if (this.sound_obj != null)
        this.PauseSound();

    this.sound_obj = new Audio(this.sound_path);
    this.sound_obj.play();
    if(this.sound_loop == true)
      this.sound_obj.loop = true; 
}

GameObject.prototype.PauseSound = function ()
{
    if(this.sound_obj != null)
    this.sound_obj.pause();
}


GameObject.prototype.ChangeTrack = function (trackIndex)
{
    if (this.sound_obj != null)
        this.PauseSound();

    this.sound_obj = new Audio(this.sound_paths[trackIndex]);
    this.sound_obj.play();
    if(this.sound_loop == true)
      this.sound_obj.loop = true; 
}

GameObject.prototype.OnAudioEndCallback = function(callback)
{
    var gameObject = this;
    this.sound_obj.onended = function(){callback(gameObject);};
};
GameObject.prototype.Update = function(gametime)
{
    if(this.animated)
    {
        this.frameTime += gametime;
        if(this.frameTime >= this.frameRateR)
        {
            this.frameTime %= this.frameRateR;
            this.curFrame++;
            if(this.curFrame >= this.frames)
                this.curFrame = 0;
        }
    }
};

GameObject.prototype.SetAnimated = function(origImageWidth, origImageHeight, frameRate, columns, rows, frames)
{
    this.animated = true;
    this.frameRateR = 1/frameRate;
    this.columns = columns;
    this.rows = rows;
    this.frames = frames;

    this.frameWidth = origImageWidth/columns;
    this.frameHeight = origImageHeight/rows;

    this.curFrame = 0;
    this.frameTime = 0;
};

GameObject.prototype.SetUpdateDuringPause = function(toUpdate)
{
    if(toUpdate != this.updateDuringPause)
    {
        if(this.updateDuringPause)
        {
            GameManager.RemovePauseUpdate(this);
            GameManager.AddGameObject(this);
        }
        else
        {
            GameManager.RemoveGameObject(this);
            GameManager.AddPauseUpdate(this);
        }
        this.updateDuringPause = toUpdate;
    }
};

GameObject.prototype.SetImageOffset = function(position)
{
    this.imageOffset = position;
};

GameObject.prototype.Destroy = function()
{
    if(this.updateDuringPause)
    {
        GameManager.RemovePauseUpdate(this);
    }
    else
    {
        GameManager.RemoveGameObject(this);
    }
}
