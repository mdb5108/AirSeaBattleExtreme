function TextBanner(text, fontSize)
{
    GameObject.call(this, "", 0, 0, 0, 0);
    this.text = text;
    this.fontSize = fontSize;
};

TextBanner.prototype = Object.create(GameObject.prototype);
TextBanner.prototype.constructor = TextBanner;

TextBanner.prototype.Draw = function(canvas2D)
{
    canvas2D.save();
    canvas2D.font = this.fontSize+"px Ariel";
    canvas2D.textAlign = "center";
    canvas2D.fillText(this.text, GameManager.CANVAS_WIDTH/2, GameManager.CANVAS_HEIGHT/2);
    canvas2D.restore();
};
