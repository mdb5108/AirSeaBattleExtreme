function Backgrounds()
{
  this.IMG_PATHS = ["img/background-new vision.png"];
  GameObject.call(this, this.IMG_PATHS[0], GameManager.CANVAS_WIDTH/2, GameManager.CANVAS_HEIGHT/2, GameManager.CANVAS_WIDTH, GameManager.CANVAS_HEIGHT);
}

Backgrounds.prototype = Object.create(GameObject.prototype);
Backgrounds.prototype.constructor = Backgrounds;

Backgrounds.prototype.RandomBackground = function()
{
  var prob = 1/this.IMG_PATHS.length;
  var rand = Math.random();
  var index = 1;
  while(index*prob < rand)
  {
    index += 1;
  }
  index -= 1; //convert to 0 based index

  //in case float math gets weird above
  if(index >= this.IMG_PATHS.length)
  {
    index = this.IMG_PATHS.length - 1;
  }

  this.imgPath = this.IMG_PATHS[index];
}

//Initialized in js/Main.js
var background;
