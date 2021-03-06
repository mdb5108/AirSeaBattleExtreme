function Collidable(tag, imgPath, initialPosition, width, height, layer, polygonial)
{
    GameObject.call(this, imgPath, initialPosition.x, initialPosition.y, width, height);

    if(layer == undefined)
        this.layer = 0;
    else
        this.layer = layer;

    this.tag = tag;
    if(polygonial != undefined && polygonial == true)
    {
        this.relativeCollider = new Polygon({x:- width/2, y:-height/2},
                                            {x:width/2, y:- height/2},
                                            {x:width/2, y:height/2},
                                            {x:-width/2, y:height/2});
        this.polygonial = true;
    }
    else
    {
        this.relativeCollider = new Rect(- width/2,
           - height/2,
           + width/2,
           + height/2);
        this.polygonial = false;
    }
    GameManager.AddCollidable(this, this.layer);
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
    if(this.polygonial)
        return this.relativeCollider.PolygonAtCenter({x:this.imageOffset.x, y:this.imageOffset.y}).PolygonRotated(this.angle).PolygonAtCenter({x:this.x, y:this.y});
    else
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
    GameManager.RemoveCollidable(this, this.layer);
}
