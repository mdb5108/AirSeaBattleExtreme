function GamePlayState()
{
    State.call(this);
};

GamePlayState.prototype.constructor = GamePlayState;

GamePlayState.prototype.Enter = function()
{
    GameManager.UnPause();
};

GamePlayState.prototype.Leave = function()
{
};
