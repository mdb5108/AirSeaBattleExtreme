var InputManager = {
    __DOWN: [false, false],
    __DOWN_REDO: [true, true],
    __LEFT: [false, false],
    __LEFT_REDO: [true, true],
    __RIGHT: [false, false],
    __RIGHT_REDO: [true, true],
    __FIRE: [false, false],

    __blockDownTimeout: undefined,
    __blockLeftTimeout: undefined,
    __blockRightTimeout: undefined,
    __blockFireTimeout: undefined,

    __blockDown: false,
    __blockLeft: false,
    __blockRight: false,
    __blockFire: false,

    __setDown: function(number, value)
    {
        if(this.__DOWN_REDO[number])
        {
            this.__DOWN_REDO[number] = false;
            this.__DOWN[number] = true;
        }
    },
    __setLeft: function(number, value)
    {
        if(this.__LEFT_REDO[number])
        {
            this.__LEFT_REDO[number] = false;
            this.__LEFT[number] = true;
        }
    },
    __setRight: function(number, value)
    {
        if(this.__RIGHT_REDO[number])
        {
            this.__RIGHT_REDO[number] = false;
            this.__RIGHT[number] = true;
        }
    },

    __setDownUnPressed: function(number)
    {
        this.__DOWN_REDO[number] = true;
    },
    __setLeftUnPressed: function(number)
    {
        this.__LEFT_REDO[number] = true;
    },
    __setRightUnPressed: function(number)
    {
        this.__RIGHT_REDO[number] = true;
    },

    getDown: function(number)
    {
        if(!this.__blockDown)
            return this.__DOWN[number];
        return false;
    },
    getLeft: function(number)
    {
        if(!this.__blockLeft)
            return this.__LEFT[number];
        return false;
    },
    getRight: function(number)
    {
        if(!this.__blockRight)
            return this.__RIGHT[number];
        return false;
    },
    getFire: function(number)
    {
        if(!this.__blockFire)
            return this.__FIRE[number];
        return false;
    },

    blockDown: function(timeout)
    {
        this.__blockDown = true;
        var inputManager = this;
        this.__blockDownTimeout = setTimeout(function()
        {
            inputManager.__blockDown = false;
        },
        timeout);;
    },
    blockLeft: function(timeout)
    {
        this.__blockLeft = true;
        var inputManager = this;
        this.__blockLeftTimeout = setTimeout(function()
        {
            inputManager.__blockLeft = false;
        },
        timeout);;
    },
    blockRight: function(timeout)
    {
        this.__blockRight = true;
        var inputManager = this;
        this.__blockRightTimeout = setTimeout(function()
        {
            inputManager.__blockRight = false;
        },
        timeout);;
    },
    blockFire: function(timeout)
    {
        this.__blockFire = true;
        var inputManager = this;
        this.__blockFireTimeout = setTimeout(function()
        {
            inputManager.__blockFire = false;
        },
        timeout);;
    },

    handleKeyDown: function(e)
    {
        e.preventDefault();
        switch(e.keyCode)
        {
            //Player 1
            case 32: // spacebar
                this.__FIRE[0] = true;
                break;
            case 65: // a
                this.__setLeft(0, true);
                break;
            case 68: // d
                this.__setRight(0, true);
                break;
            case 83: // s
                this.__setDown(0, true);
                break;

            //Player 2
            case 13: // enter
                this.__FIRE[1] = true;
                break;
            case 37: // left arrow
                this.__setLeft(1, true);
                break;
            case 39: // right arrow
                this.__setRight(1, true);
                break;
            case 40: // down arrow
                this.__setDown(1, true);
                break;
        }
    },
    handleKeyUp: function(e)
    {
        e.preventDefault();
        switch(e.keyCode)
        {
            //Player 1
            case 32: // enter
                this.__FIRE[0] = false;
                break;
            case 65: // a
                this.__setLeftUnPressed(0);
                break;
            case 68: // d
                this.__setRightUnPressed(0);
                break;
            case 83: // s
                this.__setDownUnPressed(0);
                break;

            //Player 2
            case 13: // spacebar
                this.__FIRE[1] = false;
                break;
            case 37: // left arrow
                this.__setLeftUnPressed(1);
                break;
            case 39: // right arrow
                this.__setRightUnPressed(1);
                break;
            case 40: // down arrow
                this.__setDownUnPressed(1);
                break;
        }
    },
    UpdateEnd: function(number)
    {
        this.__DOWN = [false, false];
        this.__LEFT = [false, false];
        this.__RIGHT = [false, false];
    }
};

window.addEventListener("keydown", function(e){
    InputManager.handleKeyDown(e);
}, false);

window.addEventListener("keyup", function(e){
    InputManager.handleKeyUp(e);
}, false);
