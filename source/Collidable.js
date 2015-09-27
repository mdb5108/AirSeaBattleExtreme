//TODO: Remove test game object
/*function GameObjectTest(initialPosition)
{
    this.id = GenerateUniqueId();
    this.position = initialPosition;
}
GameObjectTest.prototype.Destroy = function()
{
    //Intended to be overwritten
}*/

function Collidable(tag, initialPosition, width, height)
{
    GameObject.call(this, initialPosition);
    //GameObjectTest.call(this, initialPosition);

    this.tag = tag;
    this.relativeCollider = new Rect(- width/2,
                                     - height/2,
                                     + width/2,
                                     + height/2);
    GameManager.AddCollidable(this);
}
//TODO: make Collidable inherit from GameObject
Collidable.prototype = Object.create(GameObject.prototype);
//Collidable.prototype = Object.create(GameObjectTest.prototype);
Collidable.prototype.constructor = Collidable;
//Define object functions outside like this and attach to the prototype so we can
//reference base functions in derived objects (otherwise they are overriden with no way
//to reference.
Collidable.prototype.GetCollider = function()
{
    return new Rect(this.position.x + this.relativeCollider.left,
                    this.position.y + this.relativeCollider.top,
                    this.position.x + this.relativeCollider.right,
                    this.position.y + this.relativeCollider.bottom);
}
Collidable.prototype.OnCollision = function(collider)
{
    //Intended to be overridden by inherited classes
}
Collidable.prototype.Destroy = function()
{
    //TODO: make destroy the GameObject destroy
    //GameObjectTest.prototype.Destroy();
    GameObject.prototype.Destroy();
    GameManager.RemoveCollidable(this);
}
