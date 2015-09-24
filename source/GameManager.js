//Static singleton GameManager
//(Put in the global scope so it can be referenced everywhere)
var GameManager = 
{
    __gameTime : null,

    __gameObjects : [],
    __collidables : [],

    __gameObjectsToRemove : [],
    __collidablesToRemove : [],

    __gameUpdateLoop : null,
    __gameDrawLoop : null,
    __gamePhysicsLoop : null,

    __gameState : "NONE",

    CANVAS_WIDTH : $("#canvas").width(),
    CANVAS_HEIGHT : $("#canvas").height(),

    Start : function(updateInterval, drawInterval, physicsInterval)
    {
        //Set up the amount of time that passes in an update
        this.__gameTime = updateInterval;

        //Stop loops if they are already going
        if(typeof this.__gameUpdateLoop != "undefined") clearInterval(this.__gameUpdateLoop);
        if(typeof this.__gameDrawLoop != "undefined") clearInterval(this.__gameDrawLoop);
        if(typeof this.__gamePhysicsLoop != "undefined") clearInterval(this.__gamePhysicsLoop);

        //Set up game loops
        //NOTE: I wrap the update function calls in functions so the 'this' variable
        //passed to them is of the object and not the global scope.
        var gameManager = this;
        var canvas2D = $("#canvas")[0].getContext("2d");
        this.__gameUpdateLoop = setInterval(function(){gameManager.__Update()}, updateInterval);
        this.__gameDrawLoop = setInterval(function(){gameManager.__Draw(canvas2D)}, drawInterval);
        this.__gamePhysicsLoop = setInterval(function(){gameManager.__PhysicsUpdate()}, physicsInterval);
    },

    __Update : function()
    {
        this.__gameState = "UPDATING";
        this.__UpdateGameObject();
        this.__gameState = "NONE";
        this.__RemoveFinish();
    },

    __Draw : function(canvas2D)
    {
        this.__gameState = "DRAWING";
        //Draw Canvas border
        canvas2D.fillStyle = "white";
        canvas2D.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        canvas2D.strokeStyle = "black";
        canvas2D.strokeRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        this.__DrawGameObject(canvas2D);
        this.__gameState = "NONE";
        this.__RemoveFinish();
    },

    __PhysicsUpdate : function()
    {
        this.__gameState = "PHYSICS";
        this.__UpdateCollidable();
        this.__gameState = "NONE";
        this.__RemoveFinish();
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
        if(this.__gameState == "UPDATING" || this.__gameState == "DRAWING")
        {
            this.__gameObjectsToRemove.push(gameObject);
        }
        else
        {
            this.__RemoveGameObjectInstant(gameObject);
        }
    },
    __RemoveGameObjectInstant : function(gameObject)
    {
        for(var i = 0; i < this.__gameObjects.length; i++)
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
        if(this.__gameState == "PHYSICS")
        {
            this.__collidablesToRemove.push(collidable);
        }
        else
        {
            this.__RemoveCollidableInstant(collidable);
        }
    },
    __RemoveCollidableInstant : function(collidable)
    {
        for(var i = 0; i < this.__collidables.length; i++)
        {
            if(this.__collidables[i].id == collidable.id)
            {
                this.__collidables.splice(i, 1);
                break;
            }
        }
    },

    __RemoveFinish : function()
    {
        for(var i = 0; i < this.__gameObjectsToRemove.length; i++)
        {
            this.__RemoveGameObjectInstant(this.__gameObjectsToRemove[i]);
        }
        for(var i = 0; i < this.__collidablesToRemove.length; i++)
        {
            this.__RemoveCollidableInstant(this.__collidablesToRemove[i]);
        }
        this.__gameObjectsToRemove = [];
        this.__collidablesToRemove = [];
    },

    __UpdateGameObject : function()
    {
        for(var i = 0; i < this.__gameObjects.length; i++)
        {
            this.__gameObjects[i].Update(this.__gameTime);
        }
    },
    __DrawGameObject : function(canvas2D)
    {
        for(var i = 0; i < this.__gameObjects.length; i++)
        {
            this.__gameObjects[i].Draw(canvas2D);
        }
    },
    __UpdateCollidable : function()
    {
        for(var i = 0; i < this.__collidables.length; i++)
        {
            for(j = i+1; j < this.__collidables.length; j++)
            {
                if(this.__collidables[i].GetCollider().Intersects(this.__collidables[j].GetCollider()))
                {
                    this.__collidables[i].OnCollision(this.__collidables[j]);
                    this.__collidables[j].OnCollision(this.__collidables[i]);
                }
            }
        }
    },
};
