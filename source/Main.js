$(document).ready(function(){
    var updateInterval = 33;
    var drawInterval = 33;
    var physicsInterval = 16;

    GameManager.InitializeIntervals(updateInterval, drawInterval, physicsInterval);
    var background = new GameObject("background-new vision.png", $("#canvas").width()/2, $("#canvas").height()/2, $("#canvas").width(), $("#canvas").height());
    GameManager.Start();
})
