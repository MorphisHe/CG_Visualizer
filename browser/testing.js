// returns 3 points on grid for testing other functions
function points3() {
    threePoints = [];
    count = 0;
    for (var x in data.allPoints) {
        data.allPoints[x].forEach(y => {
            threePoints.push([x, y]);
            count += 1;
            if (count == 3) return threePoints;
        })
    }
    return threePoints;
}

// function to test area2
function testArea2() {
    threePts = points3();
    a = threePts[0];
    b = threePts[1];
    c = threePts[2];
    document.write("a: " + a + "    b: " + b + "    c: " + c + "<br>" + "area2: " + area2(a, b, c));
}