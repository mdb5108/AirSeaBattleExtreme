function GamePlayState()
{
    State.call(this);
};

GamePlayState.prototype.constructor = GamePlayState;

GamePlayState.prototype.Enter = function()
{
    GameManager.UnPause();
    InputManager.blockFire(1000);

    if(this.turret1 != undefined)
        this.turret1.Destroy();
    if(this.turret2 != undefined)
        this.turret2.Destroy();
    this.turret1 = new Player(0, 500, 800, 535);
    this.turret2 = new Player(1, 500, 200, 535);

    Bullet.Clear();
};

GamePlayState.prototype.Leave = function()
{
};
