/* 
this class will be represent a vertex with contain data of following:
      - coordinates
      - index
      - adjacent vertices
      - is ear or not 
*/

class vertex{
    constructor(vIndex, coordinate, ear, vNext, vPrev){
        this.vIndex = vIndex;
        this.coordinate = coordinate;
        this.ear = ear;
        this.vNext = vNext;
        this.vPrev = vPrev;
    }
}