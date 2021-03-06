function GameExitState()
{
    State.call(this);
    this.text = null;
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
    var textPath = "";

    if(GameManager.__scores[0] > GameManager.__scores[1])
    {
        textPath = "img/player1win.png";
    }
    if(GameManager.__scores[0] == GameManager.__scores[1])
    {
        textPath = "img/itsadraw.png";
    }
    if(GameManager.__scores[0] < GameManager.__scores[1])
    {
        textPath = "img/player2win.png";
    }

    GameManager.Pause();

    var explosion = new Explosion(GameManager.CANVAS_WIDTH/2, GameManager.CANVAS_HEIGHT/2, GameManager.CANVAS_WIDTH, GameManager.CANVAS_HEIGHT);
    explosion.SetUpdateDuringPause(true);

    explosion.PauseSound();
    explosion.sound_loop = false;
    explosion.sound_path = "audio/Explosion_01.mp3";
    explosion.PlaySound();

    this.text = new TextBanner(textPath, 50, -180, -80);
    var gameExitState = this;
    this.resetTimeout = setTimeout(function(){
        gameExitState.resetProxy = gameExitState.ResetProxy();
        if(gameExitState.instruction != undefined)
            gameExitState.instruction.Destroy();
        gameExitState.instruction = new TextBanner("img/title-press fire to restart.png", -50, -320, 20);
    }, RESTART_DELAY);
};

GameExitState.prototype.Leave = function()
{
    clearTimeout(this.resetTimeout);
    if(this.text != null)
    {
        this.text.Destroy();
    }

    if(this.resetProxy != undefined)
    {
        this.instruction.Destroy();
        this.resetProxy.Destroy();
        this.resetProxy = undefined;
    }
};
