$(document).ready(function(){
    var updateInterval = 33;
    var drawInterval = 33;
    var physicsInterval = 16;

    GameManager.InitializeIntervals(updateInterval, drawInterval, physicsInterval);
    var background = new GameObject("background-new vision.png", $("#canvas").width()/2, $("#canvas").height()/2, $("#canvas").width(), $("#canvas").height());
    GameManager.Start();



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
