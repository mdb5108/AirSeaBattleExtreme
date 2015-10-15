function Timer(initSeconds, x, y)
{
    GameObject.call(this, "", x, y, 0, 0);
    this.FLASH_DURATION = .1;
    this.FLASH_DELAY = .1;
    this.flashDurationCur = this.FLASH_DURATION;
    this.flashDelayCur = this.FLASH_DELAY;
    this.flashing = false;
    this.textColor = "white";
    this.draw = true;
    var t = this;
    this.x = x;
    this.y = y;
    this.time = "";
    this.seconds = initSeconds;
    this.sound_path = "audio/Alarm.mp3";
    this.sound_loop = true;
    this.alarming = false;
}

Timer.prototype.constructor = Timer;

Timer.prototype = Object.create(GameObject.prototype);

Timer.prototype.Update = function(gameTime)
{
    this.seconds -= gameTime;

    if(this.flashing)
    {
        this.flashDelayCur -= gameTime;
        if(this.flashDelayCur <= 0)
        {
            this.draw = false;
            this.flashDurationCur -= gameTime;
            if(this.flashDurationCur <= 0)
            {
                this.draw = true;
                this.flashDurationCur = this.FLASH_DURATION;
                this.flashDelayCur = this.FLASH_DELAY;
            }
        }
    }

    //Play alarm if less than 15 seconds
    if(!this.alarming && this.seconds <= 15)
    {
        this.alarming = true;
        this.PlaySound();
        this.flashing = true;
        this.textColor = "red";
    }
    
    if(Math.floor(this.seconds) < 0)
    {
        GameManager.ChangeState(GameManager.GAME_STATE.EXIT);
        this.seconds = 0;
        clearInterval(this.Timing);
        this.PauseSound();
    }
};

Timer.prototype.Draw = function(canvas2D)
{
    if(this.draw)
    {
        canvas2D.save();
        canvas2D.font = "20pt Arial";
        canvas2D.fillStyle = this.textColor;
        canvas2D.clearRect(0, 0, canvas2D.width, canvas2D.height);

        var min = Math.floor(Math.ceil(this.seconds) / 60);

        var secs = Math.ceil(this.seconds) % 60;

        if(min >= 0 && min < 10)
        {
            min = "0" + min;
        }
        if(secs >= 0 && secs < 10)
        {
            secs = "0" + secs;
        }

        canvas2D.fillText(min + ":" + secs, this.x, this.y);
        canvas2D.restore();
    }
};
