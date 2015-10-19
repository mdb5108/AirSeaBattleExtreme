function GameEnterState()
{
    State.call(this);
};

GameEnterState.prototype.constructor = GameEnterState;

GameEnterState.prototype.StartProxy = function()
{
    var object = new GameObject("", 0, 0, 0, 0);
    object.SetUpdateDuringPause(true);
    object.Update = function(gameTime)
    {
        if(InputManager.getFire(0) || InputManager.getFire(1))
        {
            GameManager.ChangeState(GameManager.GAME_STATE.INSTRUCTING);
        }
    };
    object.Draw = function(canvas2D)
    {
        /* MEANT TO NOT DRAW ANYTHING */
    };

    return object;
};

GameEnterState.prototype.Enter = function()
{
    GameManager.Pause();
    InputManager.blockFire(500);

    background.RandomBackground();

    var FONT_HEIGHT = 50;
    //Below commented text is for displaying text instead of image
    //this.title = new TextBanner("Air Sea Battle", 50, -FONT_HEIGHT);
    //this.subTitle = new TextBanner("EXTREME", 50, 0);
    this.start_img = new GameObject("img/title.png", $("#canvas").width()/2, $("#canvas").height()/2 - 95, 834,191);
    this.instruction = new TextBanner("img/startbutton.png", 50, -250, FONT_HEIGHT);
    this.instruction.SetUpdateDuringPause(true);
    this.instruction.SetFlicker(1.5);

    this.startProxy = GameEnterState.prototype.StartProxy();
};

GameEnterState.prototype.Leave = function()
{
    //Below commented text is for displaying text instead of image
    //this.title.Destroy();
    //this.subTitle.Destroy();
    this.start_img.Destroy();
    this.instruction.Destroy();
    this.startProxy.Destroy();
};
