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

function Polygon(topLeft, topRight, bottomRight, bottomLeft)
{

    this.points = [topLeft, topRight, bottomRight, bottomLeft];

    this.PolygonAtCenter = function(center)
    {
        return new Polygon(VectorAdd(this.points[0], center),
                           VectorAdd(this.points[1], center),
                           VectorAdd(this.points[2], center),
                           VectorAdd(this.points[3], center));

    }

    this.PolygonRotated = function(angle)
    {
        return new Polygon(VectorRotate(angle, this.points[0]),
                           VectorRotate(angle, this.points[1]),
                           VectorRotate(angle, this.points[2]),
                           VectorRotate(angle, this.points[3]));
    }

    //Find at http://stackoverflow.com/questions/10962379/how-to-check-intersection-between-2-rotated-rectangles
    /**
     * Helper function to determine whether there is an intersection between the two polygons described
     * by the lists of vertices. Uses the Separating Axis Theorem
     *
     * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
     * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
     * @return true if there is any intersection between the 2 polygons, false otherwise
     */
    this.Intersects = function(b) {
        var a = this;
        var polygons = [a, b];
        var minA, maxA, projected, i, i1, j, minB, maxB;

        for (i = 0; i < polygons.length; i++) {

            // for each polygon, look at each edge of the polygon, and determine if it separates
            // the two shapes
            var polygon = polygons[i];
            for (i1 = 0; i1 < polygon.points.length; i1++) {

                // grab 2 vertices to create an edge
                var i2 = (i1 + 1) % polygon.points.length;
                var p1 = polygon.points[i1];
                var p2 = polygon.points[i2];

                // find the line perpendicular to this edge
                var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

                minA = maxA = undefined;
                // for each vertex in the first shape, project it onto the line perpendicular to the edge
                // and keep track of the min and max of these values
                for (j = 0; j < a.points.length; j++) {
                    projected = normal.x * a.points[j].x + normal.y * a.points[j].y;
                    if ((minA == undefined) || projected < minA) {
                        minA = projected;
                    }
                    if ((maxA == undefined) || projected > maxA) {
                        maxA = projected;
                    }
                }

                // for each vertex in the second shape, project it onto the line perpendicular to the edge
                // and keep track of the min and max of these values
                minB = maxB = undefined;
                for (j = 0; j < b.points.length; j++) {
                    projected = normal.x * b.points[j].x + normal.y * b.points[j].y;
                    if ((minB == undefined) || projected < minB) {
                        minB = projected;
                    }
                    if ((maxB == undefined) || projected > maxB) {
                        maxB = projected;
                    }
                }

                // if there is no overlap between the projects, the edge we are looking at separates the two
                // polygons, and we know there is no overlap
                if (maxA < minB || maxB < minA) {
                    return false;
                }
            }
        }
        return true;
    };
}

function VectorMultiply(scalar, vector)
{
    return {x:scalar*vector.x, y:scalar*vector.y};
}

function VectorAdd(vector1, vector2)
{
    return {x:vector1.x+vector2.x, y:vector1.y+vector2.y};
}

function VectorFromAngle(angle)
{
    return {x:Math.cos(angle), y:Math.sin(angle)};
}

function VectorPerpendicular(vector)
{
    return {x:-vector.y, y:vector.x};
}

function VectorRotate(angle, vector)
{
    return {x:vector.x*Math.cos(angle)-vector.y*Math.sin(angle), y:vector.x*Math.sin(angle)+vector.y*Math.cos(angle)};
}
