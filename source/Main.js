$(document).ready(function(){
    var updateInterval = 33;
    var drawInterval = 33;
    var physicsInterval = 16;

    GameManager.InitializeIntervals(updateInterval, drawInterval, physicsInterval);
    GameManager.Start();

    var background = new GameObject("background-new vision.png", $("#canvas").width()/2, $("#canvas").height()/2, $("#canvas").width(), $("#canvas").height());

    var turret1 = new Player(0, 200, 535);
    var turret2 = new Player(1, 800, 535);
    var timer = new Timer(120, $("#canvas").width() / 2 - 50, $("#canvas").height() - 15);

//enemy manager
    var enemymanager = new EnemyManager(0, 0, 200, 200);
})
