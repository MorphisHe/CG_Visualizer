// this object will contain all points on grid
// this will be in a dictionary form similar as python

class gridData {
    allPoints = {}; // key will be x, value will be array of y
    allEdges = []; // each elment will be a dict that have 4 key, value pairs (x1, y1, x2, y2)

    // clear the datas
    clear(){
        this.allPoints = {};
        this.allEdges = [];
    }

    clearEdges(){
        this.addEdge = [];
    }

    // add point p to grid data.
    // p[0] = x = key
    addPoint(p){
        if (p[0] in this.allPoints)
            this.allPoints[p[0]].push(p[1]);
        else
            this.allPoints[p[0]] = [p[1]];
    }

    // remove a point from grid data
    removePoint(p){
        if (p[0] in this.allPoints && this.allPoints[p[0]].includes(p[1])){
            delete this.allPoints[p[0]][this.allPoints[p[0]].indexOf(p[1])];
            
            // filter out empty arrays
            this.allPoints[p[0]] = this.allPoints[p[0]].filter(function(y){
                return y != null;
            });
            
            // if x have no more y, delete x
            if (this.allPoints[p[0]].length == 0) 
                delete this.allPoints[p[0]];
            
            return true;
        }else return false; 
    }

    // check if point p is in grid
    contain(p){
        return (p[0] in this.allPoints && this.allPoints[p[0]].includes(p[1]));
    }

    // assume point x and y exist, add edge to them
    addEdge(x, y){
        this.allEdges.push({
            x1 : x[0],
            y1 : x[1],
            x2 : y[0],
            y2 : y[1]
        });
    }

    // print all points
    printAllPoints(){
        for (var x in this.allPoints){
            document.write("key " + x + "<br>");
            this.allPoints[x].forEach(element => {
                document.write(x + " " + element + "<br>");
            });
            document.write("<br>");
        }
    }

    // compare if 2 point is same
    compare(p1, p2){
        return ((p1[0] == p2[0]) && (p1[1] == p2[1]));
    }

    // removeEdge(x, y){

    // }

    // connected(x, y){

    // }
}