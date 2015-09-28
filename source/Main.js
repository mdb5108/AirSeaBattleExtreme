$(document).ready(function(){
    var updateInterval = 33;
    var drawInterval = 33;
    var physicsInterval = 16;

    GameManager.Start(updateInterval, drawInterval, physicsInterval);

    var background = new GameObject("background-new vision.png", $("#canvas")[0], 0, 0, $("#canvas").width(), $("#canvas").height());

    var turretCvs = document.createElement("canvas");
    turretCvs.id = "turretCvs";
    turretCvs.width = 300;
    turretCvs.height = 300;
    turretCvs.display = 'block';

    var turret1 = new Player("turret_a.png", turretCvs, 500, $("#turretCvs").width()/2, $("#turretCvs").height()/2, 200, 200);

    document.getElementById("game").appendChild(turretCvs);

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
        GameManager.AddGameObject(gameObject);
    };*/
    
    //setTimeout(function(){GameManager.RemoveGameObject(gameObject);}, 100);
})
