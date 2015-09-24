var GenerateUniqueId = (function()
{
  var id = 0;
  return function(){return ++id;}
})();

function Rect(left, top, right, bottom)
{
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;

    this.RectAtCenter = function(center)
    {
        return new Rect(center.x + left, center.y + top, center.x + right, center.y + bottom);
    }

    this.Intersects = function(r2)
    {
        return !(  this.left > r2.right
                || this.right < r2.left
                || this.top > r2.bottom
                || this.bottom < r2.top);
    }
}