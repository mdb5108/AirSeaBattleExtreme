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
};

GameObject.prototype.constructor = GameObject;

GameObject.prototype.Draw = function(canvas2D)
{
		// (r, g, b, a)
		//this.__context.fillStyle = "rgba(255, 255, 255, 1)";
		// (x, y, width, height)
		//this.__context.fillRect(0, 0, $("#canvas").width(), $("#canvas").height());
		
		//window.onload = function()
		//{
			this.img.src = this.imgPath;
			canvas2D.drawImage(this.img, this.x, this.y, this.xScl, this.yScl);
		//}
 		//canvas2D.Rotate(canvas2D, this.image);
};

GameObject.prototype.Update = function()
{
}

GameObject.prototype.Rotate = function(canvas2D, image)
{
	//canvas2D.clearRect(0, 0, 400, 300);
	canvas2D.fillStyle = "#444444";
	canvas2D.save();
	canvas2D.translate(this.x, this.y);
	canvas2D.rotate(this.x/20);

	// Move center of image to (0, 0)

	canvas2D.drawImage(this.image, -this.image.width * 0.5, -this.image.height * 0.5);
	//canvas2D.fillRect(-15, -15, 30, 30);
	canvas2D.restore();
};