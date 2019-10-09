
/**
 * this is a transaction class for drawing an edge
 */
class drawEdge_Transaction {

    constructor(p1, p2, color){
        this.p1 = p1;
        this.p2 = p2;
        this.color = color;
    }

    // draw the edge, limegreen and add edge to grid data
    doTransaction() {
        redraw();
        drawLine(this.p1, this.p2, this.color);
        data.addEdge(this.p1, this.p2);
    }

    // remove the edge, and redraw the grid
    // ERROR: when undo, replace the last edge with color green
    undoTransaction() {
        data.removeSpecificEdge(this.p1, this.p2);
        redraw();
    }
}