function TextBanner(text, fontSize, yoffset)
{
    GameObject.call(this, "", 0, 0, 0, 0);
    this.text = text;
    this.fontSize = fontSize;
    this.yoffset = yoffset;
    this.flicker = false;
    this.visible = true;
    this.flickerDelay = 0;
    this.curFlickerDelay = 0;
    this.flickerDuration = .5;
    this.curFlickerDuration = 0;
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
        canvas2D.save();
        canvas2D.font = this.fontSize+"px Ariel";
        canvas2D.textAlign = "center";
        canvas2D.fillText(this.text, GameManager.CANVAS_WIDTH/2, GameManager.CANVAS_HEIGHT/2 + this.yoffset);
        canvas2D.restore();
    }
};
