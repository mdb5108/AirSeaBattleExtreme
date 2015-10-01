function GameExitState()
{
    State.call(this);
};

GameExitState.prototype.constructor = GameExitState;

GameExitState.prototype.Enter = function()
{
    GameManager.Pause();
};

GameExitState.prototype.Leave = function()
{
};
