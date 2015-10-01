var InputManager = {
    __LEFT: [false, false],
    __LEFT_REDO: [true, true],
    __RIGHT: [false, false],
    __RIGHT_REDO: [true, true],
    __FIRE: [false, false],

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

    __setLeftUnPressed: function(number)
    {
        this.__LEFT_REDO[number] = true;
    },
    __setRightUnPressed: function(number)
    {
        this.__RIGHT_REDO[number] = true;
    },

    getLeft: function(number)
    {
        return this.__LEFT[number];
    },
    getRight: function(number)
    {
        return this.__RIGHT[number];
    },
    getFire: function(number)
    {
        return this.__FIRE[number];
    },

    handleKeyDown: function(e)
    {
        e.preventDefault();
        switch(e.keyCode)
        {
            //Player 1
            case 96: //numpad 0
                this.__FIRE[0] = true;
                break;
            case 37: // left arrow
                this.__setLeft(0, true);
                break;
            case 39: // right arrow
                this.__setRight(0, true);
                break;

            //Player 2
            case 32: // spacebar
                this.__FIRE[1] = true;
                break;
            case 65: // a
                this.__setLeft(1, true);
                break;
            case 68: // d
                this.__setRight(1, true);
                break;
        }
    },
    handleKeyUp: function(e)
    {
        e.preventDefault();
        switch(e.keyCode)
        {
            //Player 1
            case 96: //numpad 0
                this.__FIRE[0] = false;
                break;
            case 37: // left arrow
                this.__setLeftUnPressed(0);
                break;
            case 39: // right arrow
                this.__setRightUnPressed(0);
                break;

            //Player 2
            case 32: // spacebar
                this.__FIRE[1] = false;
                break;
            case 65: // a
                this.__setLeftUnPressed(1);
                break;
            case 68: // d
                this.__setRightUnPressed(1);
                break;
        }
    },
    UpdateEnd: function(number)
    {
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
