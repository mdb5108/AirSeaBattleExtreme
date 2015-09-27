$(document).ready(function(){
    var updateInterval = 33;
    var drawInterval = 33;
    var physicsInterval = 16;

    GameManager.Start(updateInterval, drawInterval, physicsInterval);

    var background = new GameObject("background-new vision.png", 0, 0, $("#canvas").width(), $("#canvas").height());
    var turret1 = new Player("turret.png", 500, $("#canvas").height() * 0.74, 200, 200);

    GameManager.AddGameObject(background);
    GameManager.AddGameObject(turret1);

    //Example/test code that shows how to add game objects and remove them from the game
    //manager
/*    var gameObject = {
        id : GenerateUniqueId(),
        Update : function(gameTime)
        {
            console.log("Update Called! With: " + gameTime);
        },
        Draw : function(canvas2D)
        {
            console.log("Draw Called!");
        }
    };
    GameManager.AddGameObject(gameObject);
    setTimeout(function(){GameManager.RemoveGameObject(gameObject);}, 100);
})
