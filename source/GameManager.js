//Static singleton GameManager
//(Put in the global scope so it can be referenced everywhere)
var GameManager = 
{
    __gameTimeMilli : null,

    __gameObjects : [],
    __collidables : [],
    __pauseObjects : [],

    __gameObjectsToRemove : [],
    __collidablesToRemove : [],
    __pauseObjectsToRemove : [],

    __updateInterval : null,
    __drawInterval : null,
    __physicsInterval : null,

    __gameUpdateLoop : null,
    __gameDrawLoop : null,
    __gamePhysicsLoop : null,

    __paused : false,
    GAME_STATE : {
        ENTER: 0,
        PLAYING: 1,
        EXIT: 2,
    },
    __GAME_STATES : [new GameEnterState(), new GamePlayState(), new GameExitState()],
    __gameState : undefined,
    __gameManagerState : "NONE",
    __scores : [],

    CANVAS_WIDTH : $("#canvas").width(),
    CANVAS_HEIGHT : $("#canvas").height(),

    InitializeIntervals : function(updateInterval, drawInterval, physicsInterval)
    {
        this.__updateInterval = updateInterval;
        this.__drawInterval = drawInterval;
        this.__physicsInterval = physicsInterval;

        //Set up the amount of time that passes in an update
        //(currently the same as the update interval)
        this.__gameTimeMilli = updateInterval;
    },

    Start : function()
    {
        this.__scores[0] = 0;
        this.__scores[1] = 0;

        this.Stop();

        //Set up game loops
        //NOTE: I wrap the update function calls in functions so the 'this' variable
        //passed to them is of the object and not the global scope.
        var gameManager = this;
        var canvas2D = $("#canvas")[0].getContext("2d");
        this.__gameDrawLoop = setInterval(function(){gameManager.__Draw(canvas2D)}, this.__drawInterval);
        this.__gameUpdateLoop = setInterval(function(){gameManager.__Update()}, this.__updateInterval);
        this.__gamePhysicsLoop = setInterval(function(){gameManager.__PhysicsUpdate()}, this.__physicsInterval);

        this.ChangeState(this.GAME_STATE.ENTER);
    },

    Pause : function()
    {
        this.__paused = true;
    },

    UnPause : function()
    {
        if(this.__paused)
        {
            InputManager.UpdateEnd();
        }

        //Reset any previous intervals
        this.Pause();

        this.__paused = false;
    },

    Stop : function()
    {
        //Stop loops if they are already going
        if(typeof this.__gameDrawLoop != "undefined") clearInterval(this.__gameDrawLoop);
        if(typeof this.__gameUpdateLoop != "undefined") clearInterval(this.__gameUpdateLoop);
        if(typeof this.__gamePhysicsLoop != "undefined") clearInterval(this.__gamePhysicsLoop);
        this.Pause();
    },

    ChangeState : function(stateEnum)
    {
        if(this.__gameState != undefined)
        {
            this.__gameState.Leave();
        }

        this.__gameState = this.__GAME_STATES[stateEnum];
        this.__gameState.Enter();
    },

    __Update : function()
    {
        this.__gameManagerState = "UPDATING";
        if(!this.__paused)
            this.__UpdateGameObject();
        this.__UpdatePause();
        InputManager.UpdateEnd();
        this.__gameManagerState = "NONE";
        this.__RemoveFinish();
    },

    __Draw : function(canvas2D)
    {
        this.__gameManagerState = "DRAWING";
        //Draw Canvas border
        canvas2D.fillStyle = "white";
        canvas2D.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        canvas2D.strokeStyle = "black";
        canvas2D.strokeRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        this.__DrawGameObject(canvas2D);
        this.__DrawPause(canvas2D);

        canvas2D.font = "20pt eddie";    
        // Commented below texts to display images instead     
        // canvas2D.fillText("Player1", 275, 520);
        // canvas2D.fillText("Player2", 650, 520);

        if(this.__gameState == this.__GAME_STATES[1] || this.__gameState == this.__GAME_STATES[2])
        {
            canvas2D.fillText(this.__scores[0], 312, 550);
            canvas2D.fillText(this.__scores[1], 685, 550);
        }

        this.__gameManagerState = "NONE";
        this.__RemoveFinish();
    },

    __PhysicsUpdate : function()
    {
        this.__gameManagerState = "PHYSICS";
        this.__UpdateCollidable();
        this.__gameManagerState = "NONE";
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
    AddPauseUpdate : function(gameObject)
    {
        this.__pauseObjects.push(gameObject);
    },

    RemoveGameObject : function(gameObject)
    {
        this.__RemoveFromList(function(){return GameManager.__gameManagerState == "UPDATING" || this.__gameManagerState == "DRAWING";},
                              this.__gameObjects,
                              this.__gameObjectsToRemove,
                              gameObject);
    },
    RemoveCollidable : function(collidable)
    {
        this.__RemoveFromList(function(){return GameManager.__gameManagerState == "PHYSICS";},
                              this.__collidables,
                              this.__collidablesToRemove,
                              collidable);
    },
    RemovePauseUpdate : function(gameObject)
    {
        this.__RemoveFromList(function(){return GameManager.__gameManagerState == "UPDATING" || this.__gameManagerState == "DRAWING";},
                              this.__pauseObjects,
                              this.__pauseObjectsToRemove,
                              gameObject);
    },
    __RemoveFromList : function(check, list, listRemove, item)
    {
        if(check())
        {
            listRemove.push(item);
        }
        else
        {
            this.__RemoveListInstant(list, item);
        }
    },
    __RemoveListInstant : function(list, item)
    {
        for(var i = 0; i < list.length; i++)
        {
            if(list[i].id == item.id)
            {
                list.splice(i, 1);
                break;
            }
        }
    },

    __RemoveFinish : function()
    {
        for(var i = 0; i < this.__gameObjectsToRemove.length; i++)
        {
            this.__RemoveListInstant(this.__gameObjects, this.__gameObjectsToRemove[i]);
        }
        for(var i = 0; i < this.__collidablesToRemove.length; i++)
        {
            this.__RemoveListInstant(this.__collidables, this.__collidablesToRemove[i]);
        }
        for(var i = 0; i < this.__pauseObjectsToRemove.length; i++)
        {
            this.__RemoveListInstant(this.__pauseObjects, this.__pauseObjectsToRemove[i]);
        }
        this.__gameObjectsToRemove = [];
        this.__collidablesToRemove = [];
        this.__pauseObjectsToRemove = [];
    },

    __UpdateGameObject : function()
    {
        for(var i = 0; i < this.__gameObjects.length; i++)
        {
            this.__gameObjects[i].Update(this.__gameTimeMilli*.001);
        }
    },
    __DrawGameObject : function(canvas2D)
    {
        for(var i = 0; i < this.__gameObjects.length; i++)
        {
            this.__gameObjects[i].Draw(canvas2D);
        }
    },
    __DrawPause : function(canvas2D)
    {
        for(var i = 0; i < this.__pauseObjects.length; i++)
        {
            this.__pauseObjects[i].Draw(canvas2D);
        }
    },
    __UpdatePause : function()
    {
        for(var i = 0; i < this.__pauseObjects.length; i++)
        {
            this.__pauseObjects[i].Update(this.__gameTimeMilli*.001);
        }
    },
    __UpdateCollidable : function()
    {
        for(var i = 0; i < this.__collidables.length; i++)
        {
            for(var j = i+1; j < this.__collidables.length; j++)
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
