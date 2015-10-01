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
    if(this.timer != undefined)
        this.timer.Destroy();
    if(this.enemymanager != undefined)
        this.enemymanager.Destroy();
    this.turret1 = new Player(0, 200, 535);
    this.turret2 = new Player(1, 800, 535);
    this.timer = new Timer(120, GameManager.CANVAS_WIDTH / 2 - 50, GameManager.CANVAS_HEIGHT - 15);
    this.enemymanager = new EnemyManager("airplane1.png",0, 0, 200, 200);
//enemy
    // enemy.setVelocity = new vec2(5,0);
    // GameManager.AddGameObject(enemy);

    Bullet.Clear();
};

GamePlayState.prototype.Leave = function()
{
};
