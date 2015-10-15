function Symbol(imgPath, player, x, y, xScl, yScl)
{
    GameObject.call(this, imgPath, x, y, xScl, yScl);
    this.player = player;
};

Symbol.prototype = Object.create(GameObject.prototype);
Symbol.prototype.constructor = Symbol;

Symbol.prototype.Update = function(gameTime)
{
    GameObject.prototype.Update.call(this, gameTime);
};