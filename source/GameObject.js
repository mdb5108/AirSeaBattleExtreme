// Parent Class for all objects

// Update
// Draw
// Destroy

function GameObject(imgPath, canvas, x, y, xScl, yScl)
{
	this.id = GenerateUniqueId();
	this.canvas = canvas;
	this.x = x;
	this.y = y;
	this.xScl = xScl;
	this.yScl = yScl;
	this.imgPath = imgPath;
	this.img = new Image();
};

GameObject.prototype.constructor = GameObject;

GameObject.prototype.Repaint = function()
{
	this.img.src = this.imgPath;
	this.canvas.getContext('2d').clearRect(this.x, this.y, this.width, this.height);
	this.Draw();
}

GameObject.prototype.Draw = function()
{
	this.img.src = this.imgPath;
	this.canvas.getContext('2d').drawImage(this.img, this.x, this.y, this.xScl, this.yScl);
};

GameObject.prototype.Update = function()
{
};

/*GameObject.prototype.Rotate = function(canvas2D, image)
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
};*/

GameObject.prototype.Rotate = function(angle)
{
	var context = this.canvas.getContext('2d');
  // Clear the canvas
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
  // Move registration point to the center of the canvas
  context.translate(this.canvas.width/2, this.canvas.width/2);
	
  // Rotate 1 degree
  context.rotate(angle * Math.PI / 180);
    
  // Move registration point back to the top left corner of canvas
  context.translate(-this.canvas.width/2, -this.canvas.width/2);
	
  context.fillStyle = "red";
  context.drawImage(this.img. this.canvas.width/4, this.canvas.width/4, this.canvas.width/2, this.canvas.height/4)
  //context.fillRect(this.canvas.width/4, this.canvas.width/4, this.canvas.width/2, this.canvas.height/4);
  context.fillStyle = "blue";
  context.drawImage(this.img. this.canvas.width/4, this.canvas.width/4, this.canvas.width/2, this.canvas.height/4)
  //context.fillRect(this.canvas.width/4, this.canvas.width/2, this.canvas.width/2, this.canvas.height/4);
	//this.Draw();
/*	context.rotate(-angle * Math.PI / 180);
	context.translate(-(this.x + this.img.width / 2), -(this.y + this.img.height / 2));*/
};