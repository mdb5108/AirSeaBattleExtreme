function GameInstructState()
{
    State.call(this);
};

GameInstructState.prototype.constructor = GameInstructState;

GameInstructState.prototype.StartProxy = function(instructions)
{
    var object = new GameObject("", 0, 0, 0, 0);
    object.firedOnce = false;
    object.instructions = instructions;
    object.scoreGuid = undefined;
    object.SetUpdateDuringPause(true);
    object.Update = function(gameTime)
    {
        if(InputManager.getFire(0) || InputManager.getFire(1))
        {
            if(!this.firedOnce)
            {
                InputManager.blockFire(500);
                this.scoreGuid = new GameObject("key guid.png", GameManager.CANVAS_WIDTH/2, GameManager.CANVAS_HEIGHT/2, GameManager.CANVAS_WIDTH,GameManager.CANVAS_HEIGHT);
                this.instructions.Destroy();
                this.firedOnce = true;
            }
            else
            {
                GameManager.ChangeState(GameManager.GAME_STATE.PLAYING);
            }
        }
    };
    object.Draw = function(canvas2D)
    {
        /* MEANT TO NOT DRAW ANYTHING */
    };

    object.Destroy = function()
    {
        GameObject.prototype.Destroy.call(this);
        if(this.scoreGuid != undefined)
            this.scoreGuid.Destroy();
    };

    return object;
};

GameInstructState.prototype.Enter = function()
{
    GameManager.Pause();
    InputManager.blockFire(1000);

    var FONT_HEIGHT = 50;
    //Below commented text is for displaying text instead of image
    this.instructions = new GameObject("control guid.png", GameManager.CANVAS_WIDTH/2, GameManager.CANVAS_HEIGHT/2, GameManager.CANVAS_WIDTH,GameManager.CANVAS_HEIGHT);

    this.startProxy = GameInstructState.prototype.StartProxy(this.instructions);
};

GameInstructState.prototype.Leave = function()
{
    //Below commented text is for displaying text instead of image
    if(this.instructions != undefined)
        this.instructions.Destroy();
    this.startProxy.Destroy();
};
