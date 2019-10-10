
/**
 * this is a transaction class for drawing an edge
 */
class drawEdge_Transaction {

    constructor(p1, p2, color, previousEdge){
        this.p1 = p1;
        this.p2 = p2;
        this.color = color;
        this.previousEdge = previousEdge;
    }

    // draw the edge, limegreen and add edge to grid data
    doTransaction() {
        redraw();
        drawLine(this.p1, this.p2, this.color);
        data.addEdge(this.p1, this.p2);
    }

    // remove the edge, and redraw the grid
    undoTransaction() {
        data.removeSpecificEdge(this.p1, this.p2);
        if (this.previousEdge) data.removeSpecificEdge(this.previousEdge[0], this.previousEdge[1]); // delete previous last edge
        redraw();
        if (this.previousEdge){
            drawLine(this.previousEdge[0], this.previousEdge[1], this.color); // redraw previous last edge to green color
            data.addEdge(this.previousEdge[0], this.previousEdge[1]);
        }
    }
}