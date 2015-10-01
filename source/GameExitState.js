function GameExitState()
{
    State.call(this);
};

GameExitState.prototype.constructor = GameExitState;

GameExitState.prototype.Enter = function()
{
    var winText = "PLAYER 1 WINS!!!";

    GameManager.Pause();
    this.text = new TextBanner(winText, 50);
};

GameExitState.prototype.Leave = function()
{
    this.text.Destroy();
};
