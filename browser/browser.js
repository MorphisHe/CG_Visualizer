/**
 * main file that handles events
 */

// grid data (points and edges)
// points stored in a dictionary with x as key and [array of y] as value
// edges stored in an array with object dictionary{x1, y1, x2, y2}
data = new gridData();

// transaction data for redo and undo
transactions = new jsTPS();

// var for connecting 2 points
var mouseDown = false; // true when in drawing edge mode
var saved_point;

// used for debugging
debug_counter = 0;


function clearBoard() {
    data.clear();
    clearCanvas();
    drawGrid();
}

function clearAllEdges() {
    data.clearEdges();
    redraw();
}

// plot all points into the grid
function plotAll() {
    for (var x in data.allPoints) {
        data.allPoints[x].forEach(function(y) {
            plot([x, y]);
        });
    }
}

// draw all edges
function drawAllEdges() {
    data.allEdges.forEach(edge => {
        drawLine([edge.x1, edge.y1], [edge.x2, edge.y2], "#FF0000"); // red color
    })
}

// plot or remove a point with mouse click
// if removing a point, also remove all edges connecting to that point
function plotOrRemove(p) {
    // check if point already exist, delete it, else add it
    if (data.removePoint(p)) {
        data.removeEdges(p);
        redraw();
    } else {
        // draw the point
        plot(p);
        // add to dictionary
        data.addPoint(p);
    }
}

// parse mouse coordinate
function parseMouseC() {
    rect = canvas.getBoundingClientRect(); // size of canvas
    x = event.clientX - rect.left; // position of mouse in horizontal axis
    y = event.clientY - rect.top; // position of mouse in vertical axis

    // convert x,y to canvas coordinate
    if (x % epsilon >= 15) x = Math.ceil((x) / epsilon) * epsilon;
    else x = Math.floor((x) / epsilon) * epsilon;
    if (y % epsilon >= 15) y = Math.ceil((y) / epsilon) * epsilon;
    else y = Math.floor((y) / epsilon) * epsilon;

    return [x, y];
}

// when mouse is down, and is moving, this will drag a line
function handleMouseMove(event) {
    if (!mouseDown) return;
    redraw();
    // draw the current lines
    drawLine(saved_point, parseMouseC(), "#32CD32"); // limegreen
}

// when mouse is up and there is a point, draw a line
function handleMouseUp(e) {
    upCoordinate = parseMouseC(); // get (x, y) where mouse is 
    if (mouseDown && !data.comparePoints(saved_point, upCoordinate)) {
        // connecting mode
        if (data.containPoint(upCoordinate)) {
            drawEdge_transaction = new drawEdge_Transaction(saved_point, upCoordinate, "#32CD32");
            transactions.addTransaction(drawEdge_transaction);
            drawEdge_transaction.doTransaction(); // draw the edge, limegreen and add edge to grid data
        } else {
            // refresh the grid without changing the data
            redraw();
        }
    } else {
        // plot the point at mouseDown spot or remove if it already exist
        plotTransaction = new addPoint_Transaction(saved_point);
        transactions.addTransaction(plotTransaction);
        plotTransaction.doTransaction(); // plot the point and add to grid data
    }

    mouseDown = false;
}

// function when undo is pressed
function undo(){
    transactions.popUndoTransaction().undoTransaction();
}

// function when undo is pressed
function redo(){
    transactions.popRedoTransaction().doTransaction();
}

// function to add listeners
function initListeners() {
    // adding listener to resize grid line while browser window resizes
    window.addEventListener('resize', resizeCanvas, false);
    document.getElementById('startButtonClearBoard').addEventListener("click", clearBoard);
    document.getElementById('startButtonClearEdges').addEventListener("click", clearAllEdges);

    // CHANGE: testsing event listeners for undo redo
    document.getElementById('startButtonAddObject').addEventListener("click", undo);
    document.getElementById('startButtonClearPoints').addEventListener("click", redo);

    // drag events
    // when mouse is hold starting a place with a existing point,
    // set mouseDown to true, and init the points
    $("#grid").mousedown(function(event) {
        saved_point = parseMouseC();
        if (data.containPoint(saved_point)) {
            mouseDown = true;
        }
    });

    $("#grid").mousemove(function(e) {
        handleMouseMove(e);
    });

    $("#grid").mouseup(function(e) {
        handleMouseUp(e);
    });
}

// starting function calls
drawGrid();
initListeners();