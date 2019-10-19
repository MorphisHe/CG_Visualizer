/**
 * this class will contain all vertices on the grid
 * this class will be created right before when an algorithm begin that needs this
 */

class vertices {

    allVertices = [];

    clearAllVertices() {
        this.allVertices = [];
    }

    addVertex(v) {
        this.allVertices.push(v);
    }

    removeVertex(v) {
        delete this.allVertices[v.vIndex - 1];
    }

    // this function populates allVertices array with vertex objects created based on grid data
    gridDataToVertex() {

    }

}