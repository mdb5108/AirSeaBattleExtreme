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
            GameManager.ChangeState(GameManager.GAME_STATE.PLAYING);
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
    InputManager.blockFire(1000);

    var FONT_HEIGHT = 50;
    this.title = new TextBanner("Air Sea Battle", 50, -FONT_HEIGHT);
    this.subTitle = new TextBanner("EXTREME", 50, 0);
    this.instruction = new TextBanner("Press FIRE to start", 50, FONT_HEIGHT);
    this.instruction.SetUpdateDuringPause(true);
    this.instruction.SetFlicker(1.5);

    this.startProxy = GameEnterState.prototype.StartProxy();
};

GameEnterState.prototype.Leave = function()
{
    this.title.Destroy();
    this.subTitle.Destroy();
    this.instruction.Destroy();
    this.startProxy.Destroy();
};
