// this object will contain all points on grid
// this will be in a dictionary form similar as python

class gridData {
    allPoints = {}; // key will be x, value will be array of y
    allEdges = []; // each elment will be a dict that have 4 key, value pairs (x1, y1, x2, y2)

    // clear the datas
    clear() {
        this.allPoints = {};
        this.allEdges = [];
    }

    clearEdges() {
        this.allEdges = [];
    }

    /** ============================================ Points ========================================= */

    // add point p to grid data.
    // p[0] = x = key
    addPoint(p) {
        if (p[0] in this.allPoints) this.allPoints[p[0]].push(p[1]);
        else this.allPoints[p[0]] = [p[1]];
    }

    // remove a point from grid data
    // also removes the edges that connects the line
    removePoint(p) {
        if (p[0] in this.allPoints && this.allPoints[p[0]].includes(p[1])) {
            delete this.allPoints[p[0]][this.allPoints[p[0]].indexOf(p[1])];

            // filter out empty arrays
            this.allPoints[p[0]] = this.allPoints[p[0]].filter(function(y) {
                return y != null;
            });

            // if x have no more y, delete x
            if (this.allPoints[p[0]].length == 0) delete this.allPoints[p[0]];

            return true;
        } else return false;
    }

    // check if point p is in grid
    containPoint(p) {
        return p[0] in this.allPoints && this.allPoints[p[0]].includes(p[1]);
    }

    // compare if 2 point is same
    comparePoints(p1, p2) {
        return p1[0] == p2[0] && p1[1] == p2[1];
    }

    // print all points
    printAllPoints() {
        for (var x in this.allPoints) {
            document.write("key " + x + "<br>");
            this.allPoints[x].forEach(element => {
                document.write(x + " " + element + "<br>");
            });
            document.write("<br>");
        }
    }

    /** ============================================ Edges ========================================= */

    // assume point p1 and p2 exist, add edge to them
    addEdge(p1, p2) {
        this.allEdges.push({
            x1: p1[0],
            y1: p1[1],
            x2: p2[0],
            y2: p2[1]
        });
    }

    // remove all edges that connects to point p and return all edges removed in a array
    removeEdges(p) {
        var removed = [];
        this.allEdges.forEach(curEdge => {
            if (
                (curEdge.x1 == p[0] && curEdge.y1 == p[1]) ||
                (curEdge.x2 == p[0] && curEdge.y2 == p[1])
            ) {
                removed.push(this.allEdges[this.allEdges.indexOf(curEdge)]);
                delete this.allEdges[this.allEdges.indexOf(curEdge)];
            }
        });
        return removed;
    }

    // remove only 1 specific edge from p1 to p2
    removeSpecificEdge(p1, p2) {
        this.allEdges.forEach(curEdge => {
            if (
                curEdge.x1 == p1[0] &&
                curEdge.y1 == p1[1] &&
                curEdge.x2 == p2[0] &&
                curEdge.y2 == p2[1]
            ) {
                delete this.allEdges[this.allEdges.indexOf(curEdge)];
            }
        });
    }

    // e is a edge formed by p1, p2 in this format [p1, p2]
    // check to see such edge exist
    containEdge(e) {
        this.allEdges.forEach(curEdge => {
            if (
                curEdge.x1 == e[0][0] &&
                curEdge.y1 == e[0][1] &&
                curEdge.x2 == e[1][0] &&
                curEdge.y2 == e[1][1]
            ) return true;
        });
        return false;
    }

    // print all edge in e
    printEdges(e) {
        e.forEach(element => {
            document.write("Edge:<br>");
            document.write(
                element.x1 +
                " " +
                element.y1 +
                " " +
                element.x2 +
                " " +
                element.y2 +
                "<br>"
            );
        });
    }
}