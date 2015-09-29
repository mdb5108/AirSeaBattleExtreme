function Collidable(tag, imgPath, initialPosition, width, height)
{
    GameObject.call(this, imgPath, initialPosition.x, initialPosition.y, width, height);

    this.tag = tag;
    this.relativeCollider = new Rect(- width/2,
                                     - height/2,
                                     + width/2,
                                     + height/2);
    GameManager.AddCollidable(this);
}
Collidable.prototype = Object.create(GameObject.prototype);
Collidable.prototype.constructor = Collidable;
//Define object functions outside like this and attach to the prototype so we can
//reference base functions in derived objects (otherwise they are overriden with no way
//to reference.
Collidable.prototype.GetCollider = function()
{
    return new Rect(this.x + this.relativeCollider.left,
                    this.y + this.relativeCollider.top,
                    this.x + this.relativeCollider.right,
                    this.y + this.relativeCollider.bottom);
}
Collidable.prototype.OnCollision = function(collider)
{
    //Intended to be overridden by inherited classes
}
Collidable.prototype.Destroy = function()
{
    //TODO: make destroy the GameObject destroy
    GameObject.prototype.Destroy.call(this);
    GameManager.RemoveCollidable(this);
}