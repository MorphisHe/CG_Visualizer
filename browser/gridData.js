// this object will contain all points on grid
// this will be in a dictionary form similar as python

class gridData {
    allPoints = {}; //key will be x, value will be array of y

    // clear the datas
    clear(){
        this.allPoints = {};
    }

    addPoint(key, value){
        if (key in this.allPoints)
            this.allPoints[key].push(value);
        else
            this.allPoints[key] = [value];
    }

    removePoint(key, value){
        if (key in this.allPoints && this.allPoints[key].includes(value)){
            delete this.allPoints[key][this.allPoints[key].indexOf(value)];
            // if x have no more y, delete x
            if (this.allPoints[key].length == 0) 
                delete this.allPoints[key];
            
            return true;
        }else return false; 
    }
}