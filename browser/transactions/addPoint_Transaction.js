/**
 * this is a transaction class for plotting a point or removing a point
 */
class addPoint_Transaction {

    // edgesRemoved will be empty array [] in plotting mode
    // O.W it will contain edges that is removed when removing a point
    constructor(p, edgesRemoved) {
        this.p = p;
        this.edgesRemoved = edgesRemoved;
    }

    doTransaction() {
        plotOrRemove(this.p);
    }

    undoTransaction() {
        plotOrRemove(this.p);
        if (this.edgesRemoved.length != 0) {
            // if this is in remove mode
            // while undoing, add the removed edges back to data then redraw
            this.edgesRemoved.forEach(edge => {
                data.addEdge([edge.x1, edge.y1], [edge.x2, edge.y2])
            });
            redraw();
        }
    }
}