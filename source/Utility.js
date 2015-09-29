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

    this.Contains = function(p)
    {
        return (this.left <= p.x && p.x <= this.right)
            && (this.top <= p.y && p.y <= this.bottom);
    }
}

function VectorMultiply(scalar, vector)
{
    return {x:scalar*vector.x, y:scalar*vector.y};
}

function VectorAdd(vector1, vector2)
{
    return {x:vector1.x+vector2.x, y:vector1.y+vector2.y};
}

