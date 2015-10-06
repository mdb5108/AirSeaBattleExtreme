Cloud.prototype = Object.create(GameObject.prototype);

function Cloud(imgPath, x, y, xScl, yScl,velocity,draw_next)
{   
    GameObject.call(this,imgPath, x, y, xScl, yScl);        
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.draw_next = draw_next; 
 };


Cloud.prototype.Update = function(gametime) {    
    var next_cloud;
    this.x += this.velocity.x * gametime;
    this.y += this.velocity.y * gametime;

    if (this.x > $("#canvas").width()/2 && this.draw_next == true)
    {        
        next_cloud = new Cloud(this.imgPath,-1 * $("#canvas").width()/2,300, $("#canvas").width(), $("#canvas").height(),this.velocity,true);
        this.draw_next = false;
    }        

    if (this.x > ($("#canvas").width() + $("#canvas").width()/2) )
         this.Destroy();
 };

