function GameExitState()
{
    State.call(this);
};

GameExitState.prototype.constructor = GameExitState;

GameExitState.prototype.ResetProxy = function()
{
    var object = new GameObject("", 0, 0, 0, 0);
    object.SetUpdateDuringPause(true);
    object.Update = function(gameTime)
    {
        if(InputManager.getFire(0) || InputManager.getFire(1))
        {
            GameManager.ChangeState(GameManager.GAME_STATE.ENTER);
        }
    };
    object.Draw = function(canvas2D)
    {
        /* MEANT TO NOT DRAW ANYTHING */
    };

    return object;
};

GameExitState.prototype.Enter = function()
{
    var RESTART_DELAY = 3000;
    var winText = "PLAYER 1 WINS!!!";

    GameManager.Pause();
    this.text = new TextBanner(winText, 50, 0);
    var gameExitState = this;
    this.resetTimeout = setTimeout(function(){
        gameExitState.resetProxy = gameExitState.ResetProxy();
        if(gameExitState.instruction != undefined)
            gameExitState.instruction.Destroy();
        gameExitState.instruction = new TextBanner("Press FIRE to restart", 50, 50);
    }, RESTART_DELAY);
};

GameExitState.prototype.Leave = function()
{
    clearTimeout(this.resetTimeout);
    this.text.Destroy();
    if(this.resetProxy != undefined)
    {
        this.instruction.Destroy();
        this.resetProxy.Destroy();
        this.resetProxy = undefined;
    }
};
