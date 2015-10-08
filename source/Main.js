$(document).ready(function(){
    var updateInterval = 33;
    var drawInterval = 33;
    var physicsInterval = 16;

    GameManager.InitializeIntervals(updateInterval, drawInterval, physicsInterval);
    var background = new GameObject("background-new vision.png", $("#canvas").width()/2, $("#canvas").height()/2, $("#canvas").width(), $("#canvas").height());

    GameManager.Start();

    this.play1_img1 = new GameObject("player-1.png", 325, $("#canvas").height() - 90, 150,37);
    this.play2_img2 = new GameObject("player-2.png", $("#canvas").width() - 325, $("#canvas").height() - 90,150,37);

//clouds
     var big_cloud1 = new Cloud("clouds2.png",$("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),new Vec2(30,0),false);
     var big_cloud2 = new Cloud("clouds2.png",-1 * $("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),new Vec2(30,0),true);
     var small_cloud1 = new Cloud("clouds1.png",$("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),new Vec2(40,0),false);
     var small_cloud2 = new Cloud("clouds1.png",-1 * $("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),new Vec2(40,0),true);

})
