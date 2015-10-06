$(document).ready(function(){
    var updateInterval = 33;
    var drawInterval = 33;
    var physicsInterval = 16;

    GameManager.InitializeIntervals(updateInterval, drawInterval, physicsInterval);
    GameManager.Start();

    var background = new GameObject("background-new vision.png", $("#canvas").width()/2, $("#canvas").height()/2, $("#canvas").width(), $("#canvas").height());
//sounds
    // var audioManObj = new AudioManager("Obliteration.mp3");
    var back_music = new Audio("Obliteration.mp3");
    back_music.loop = true;
    back_music.play();

    var turret1 = new Player(0, 200, 535);
    var turret2 = new Player(1, 800, 535);
    var timer = new Timer(120, $("#canvas").width() / 2 - 50, $("#canvas").height() - 15);

//enemy manager
    var enemymanager = new EnemyManager(0, 0, 200, 200);
//clouds
     var big_cloud1 = new Cloud("clouds2.png",$("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),new Vec2(30,0),false);
     var big_cloud2 = new Cloud("clouds2.png",-1 * $("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),new Vec2(30,0),true);
     var small_cloud1 = new Cloud("clouds1.png",$("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),new Vec2(40,0),false);
     var small_cloud2 = new Cloud("clouds1.png",-1 * $("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),new Vec2(40,0),true);
})
