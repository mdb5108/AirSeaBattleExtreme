// Parent Class for all objects

// Update
// Draw
// Destroy

function GameObject(imgPath, x, y, xScl, yScl)
{
	this.id = GenerateUniqueId();
	this.x = x;
	this.y = y;
	this.xScl = xScl;
	this.yScl = yScl;
	this.imgPath = imgPath;
	this.img = new Image();
    this.angle = 0;
    this.imageOffset = {x:0, y:0};
    GameManager.AddGameObject(this);
};

GameObject.prototype.constructor = GameObject;

GameObject.prototype.Draw = function(canvas2D)
{
    canvas2D.save();
    //Center
    canvas2D.translate(this.x, this.y);
    canvas2D.rotate(this.angle);
    this.img.src = this.imgPath;
    canvas2D.translate(this.imageOffset.x, this.imageOffset.y);
    canvas2D.drawImage(this.img, -this.xScl/2, -this.yScl/2, this.xScl, this.yScl);
    canvas2D.restore();
};

GameObject.prototype.Update = function()
{
};

GameObject.prototype.SetImageOffset = function(position)
{
    this.imageOffset = position;
};

GameObject.prototype.Destroy = function()
{
    GameManager.RemoveGameObject(this);
}
