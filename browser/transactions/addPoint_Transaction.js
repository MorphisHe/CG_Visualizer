
/**
 * this is a transaction class for plotting a point
 */
class addPoint_Transaction {
    p = [];
    constructor(p){
        this.p = p;
    }

    doTransaction() {
        plotOrRemove(this.p);
    }

    undoTransaction() {
        plotOrRemove(this.p);
    }
}