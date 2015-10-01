// imageObj = new Image();
EnemyManager.prototype = Object.create(GameObject.prototype);

function Vec2(x,y)
{
	this.x = x;
	this.y = y;
}

function EnemyManager(imgPath)
{
	
	GameObject.call(this, imgPath, 0,0,200,200);
	// this.visible = true;	
	// this.imgPath = imgPath;
	// this.x = x;
	// this.y = y;
	// this.velocity = velocity;
	this.planes = [];
	this.time_delay = 2;	
	this.counter = this.time_delay;
	this.min_lanes = 1;
	this.max_lanes = 7;
	this.img = new Image();	

	//this.collider = 
};


/*Enemy.prototype.setVelocity = function  (velocity) {
	// body...
	this.velocity = velocity;

}*/


EnemyManager.prototype.Update = function(gametime) {
	// this.x += this.velocity.x;
	// this.y += this.velocity.y;
	var current_lane;	
	var direction;
	if ( this.counter <= 0) {
		this.img.src = this.imgPath;			 
		current_lane = Math.floor(Math.random() * (this.max_lanes - this.min_lanes + 1)) + this.min_lanes;
	    // current_lane = Math.floor(current_lane) + 
		// planeobj = new Plane(this.imgPath, 0, this.img.height * current_lane ,new Vec2(100,0));
		if (Math.random() < 0.5)		
		planeobj = new Plane(this.imgPath, 0, 50 * current_lane ,new Vec2(100,0),1);
		else 
		planeobj = new Plane(this.imgPath,GameManager.CANVAS_WIDTH, 50 * current_lane ,new Vec2(-100,0),-1); 
		this.planes.push();
		this.counter = this.time_delay;		
	}	
	else
	{
		this.counter -= gametime;
	};	

    // for (var i = 0; i < this.planes.length ; i++) {
    // 	// GameManager.AddGameObject(this.planes[i]);	
	// };
	
};

EnemyManager.prototype.Draw = function (){
}


/*	imageObj.onload = function (){}*/



/*Enemy.prototype.Draw = function() {
	

	context.drawImage(imageObj, 69, 50);
}*/
