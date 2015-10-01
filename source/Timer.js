function Timer(initSeconds, x, y)
{
    GameObject.call(this, x, y);
    var t = this;
    this.x = x;
    this.y = y;
    this.time = "";
    this.seconds = initSeconds;
    this.Timing = setInterval(function(){t.Draw(document.getElementById("canvas").getContext('2d'))}, 1000);
}

Timer.prototype.constructor = Timer;

Timer.prototype = Object.create(GameObject.prototype);

Timer.prototype.Update = function(gameTime)
{
    this.seconds -= gameTime;
    
    if(Math.floor(this.seconds) < 0)
    {
        GameManager.ChangeState(GameManager.GAME_STATE.EXIT);
        this.seconds = 0;
        clearInterval(this.Timing);
    }
};

Timer.prototype.Draw = function(canvas2D)
{
    canvas2D.font = "20pt Arial";
    canvas2D.fillStyle = "white";
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
};
