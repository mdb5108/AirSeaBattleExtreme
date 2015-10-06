function Collidable(tag, imgPath, initialPosition, width, height)
{
    GameObject.call(this, imgPath, initialPosition.x, initialPosition.y, width, height);

    this.tag = tag;
    this.relativeCollider = new Polygon({x:- width/2, y:-height/2},
                                        {x:width/2, y:- height/2},
                                        {x:width/2, y:height/2},
                                        {x:-width/2, y:height/2});
    GameManager.AddCollidable(this);
}
Collidable.prototype = Object.create(GameObject.prototype);
Collidable.prototype.constructor = Collidable;

//Collidable.prototype.Draw = function(canvas2D)
//{
//    GameObject.prototype.Draw.call(this, canvas2D);
//
//    //Debug View
//    var polygon = this.GetCollider();
//    if(polygon.points.length > 0)
//    {
//        canvas2D.save();
//        canvas2D.fillStyle = '#f00';
//        canvas2D.beginPath();
//        var point = polygon.points[0];
//        canvas2D.moveTo(point.x, point.y);
//        for(var i = 1; i < polygon.points.length; i++)
//        {
//            point = polygon.points[i];
//            canvas2D.lineTo(point.x, point.y);
//        }
//        canvas2D.closePath();
//        canvas2D.fill();
//        canvas2D.restore();
//    }
//}

//Define object functions outside like this and attach to the prototype so we can
//reference base functions in derived objects (otherwise they are overriden with no way
//to reference.
Collidable.prototype.GetCollider = function()
{
    return this.relativeCollider.PolygonAtCenter({x:this.imageOffset.x, y:this.imageOffset.y}).PolygonRotated(this.angle).PolygonAtCenter({x:this.x, y:this.y});
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
