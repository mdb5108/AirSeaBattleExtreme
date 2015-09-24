//Static singleton GameManager
//(Put in the global scope so it can be referenced everywhere)
var GameManager = 
{
    __gameTime : null,

    __gameObjects : [],
    __collidables : [],

    __gameUpdateLoop : null,
    __gameDrawLoop : null,
    __gamePhysicsLoop : null,

    CANVAS_WIDTH : $("#canvas").width(),
    CANVAS_HEIGHT : $("#canvas").height(),

    Start : function(updateInterval, drawInterval, physicsInterval)
    {
        //Set up the amount of time that passes in an update
        this.__gameTime = updateInterval;

        //Stop loops if they are already going
        if(typeof this.__gameUpdateLoop != "undefined") clearInterval(this.__gameUpdateLoop);
        if(typeof this.__gameDrawLoop != "undefined") clearInterval(this.__gameDrawLoop);
        //if(typeof this.__gamePhysicsLoop != "undefined") clearInterval(this.__gamePhysicsLoop);

        //Set up game loops
        //NOTE: I wrap the update function calls in functions so the 'this' variable
        //passed to them is of the object and not the global scope.
        var gameManager = this;
        var canvas2D = $("#canvas")[0].getContext("2d");
        this.__gameUpdateLoop = setInterval(function(){gameManager.__Update()}, updateInterval);
        this.__gameDrawLoop = setInterval(function(){gameManager.__Draw(canvas2D)}, drawInterval);
        //this.__gamePhysicsLoop = setInterval(function(){gameManager.__PhysicsUpdate()}, physicsInterval);
    },

    __Update : function()
    {
        this.__UpdateGameObject();
    },

    __Draw : function(canvas2D)
    {
        //Draw Canvas border
		canvas2D.fillStyle = "white";
		canvas2D.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
		canvas2D.strokeStyle = "black";
		canvas2D.strokeRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        this.__DrawGameObject(canvas2D);
    },

    __PhysicsUpdate : function()
    {
        this.__UpdateCollidable();
    },

    AddGameObject : function(gameObject)
    {
        this.__gameObjects.push(gameObject);
    },
    AddCollidable : function(collidable)
    {
        this.__collidables.push(collidable);
    },

    RemoveGameObject : function(gameObject)
    {
        for(i = 0; i < this.__gameObjects.length; i++)
        {
            if(this.__gameObjects[i].id == gameObject.id)
            {
                this.__gameObjects.splice(i, 1);
                break;
            }
        }
    },
    RemoveCollidable : function(collidable)
    {
        for(i = 0; i < this.__collidables.length; i++)
        {
            if(this.__collidables[i].id == collidable.id)
            {
                this.__collidables.splice(i, 1);
                break;
            }
        }
    },

    __UpdateGameObject : function()
    {
        for(i = 0; i < this.__gameObjects.length; i++)
        {
            this.__gameObjects[i].Update(this.__gameTime);
        }
    },
    __DrawGameObject : function(canvas2D)
    {
        for(i = 0; i < this.__gameObjects.length; i++)
        {
            this.__gameObjects[i].Draw(canvas2D);
        }
    },
};
