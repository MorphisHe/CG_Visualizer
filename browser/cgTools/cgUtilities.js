/**
 * this file will have geometric primitive functions
 */

/**
 * this function takes 3 points and return 2*(area) of the triangle formed by 
 * those 3 points
 * @param {*} p1 point in [x, y] format
 * @param {*} p2 point in [x, y] format
 * @param {*} p3 point in [x, y] format
 */
function area2(p1, p2, p3) {
    return (p2[0] - p1[0]) * (p3[1] - p1[1]) -
        (p3[0] - p1[0]) * (p2[1] - p1[1]);
}

/**
 * this function returns 2*(area) of the polygon formed by
 * all vertices
 * @param {vertex} startingV vertex object that represent the starting point of polygon
 */
function areaPoly2(startingVtx) {
    var sum = 0;
    var nextVtx = startingVtx.nextV;

    while (nextVtx != startingVtx) {
        sum += area2(startingVtx.coordinate, nextVtx.coordinate, nextVtx.nextV.coordinate);
        nextVtx = nextVtx.nextV;
    }

    return sum;
}