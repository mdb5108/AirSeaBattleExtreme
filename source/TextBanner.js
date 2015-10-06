function TextBanner(textPath, fontSize, xoffset, yoffset)
{
    GameObject.call(this, "", 0, 0, 0, 0);
    this.textPath = textPath;
    this.fontSize = fontSize;
    this.xoffset = xoffset;
    this.yoffset = yoffset;
    this.flicker = false;
    this.visible = true;
    this.flickerDelay = 0;
    this.curFlickerDelay = 0;
    this.flickerDuration = .5;
    this.curFlickerDuration = 0;
    this.textImage = new Image();
};

TextBanner.prototype = Object.create(GameObject.prototype);
TextBanner.prototype.constructor = TextBanner;

TextBanner.prototype.SetFlicker = function(flickerDelay)
{
    this.flicker = true;
    this.flickerDelay = flickerDelay;
    this.curFlickerDelay = this.flickerDelay;
};

TextBanner.prototype.Update = function(gameTime)
{
    if(this.flicker)
    {
        if(this.curFlickerDelay > 0)
        {
            this.curFlickerDelay -= gameTime;
        }
        else
        {
            this.visible = false;
            if(this.curFlickerDuration > 0)
            {
                this.curFlickerDuration -= gameTime;
            }
            else
            {
                this.visible = true;
                this.curFlickerDuration = this.flickerDuration;
                this.curFlickerDelay = this.flickerDelay;
            }
        }
    }
};

TextBanner.prototype.Draw = function(canvas2D)
{
    if(this.visible)
    {
        this.textImage.src = this.textPath;
        canvas2D.save();
        //canvas2D.font = this.fontSize+"px Ariel";
        canvas2D.font = this.fontSize+"px eddie";
        canvas2D.textAlign = "center";
        canvas2D.drawImage(this.textImage, GameManager.CANVAS_WIDTH/2 + this.xoffset, GameManager.CANVAS_HEIGHT/2 + this.yoffset);
        canvas2D.restore();
    }
};
