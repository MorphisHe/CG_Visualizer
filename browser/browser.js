var canvas = document.getElementById("grid");
var ctx = canvas.getContext('2d');
var counter = 0;

// positioning adjustment
var epsilon = 30; // grid gap, controlls grid size

// diction to store points (x, [y]).
data = new gridData();

// var for connecting 2 points
var mouseDown = false; // true when in drawing edge mode
var saved_point;

// drawing a grid that fits the browser size fully
function drawGrid(){
    //document.body.textContent = document.getElementById("navbarDiv").scrollHeight;
    // resizeing to the height and width of browser
    w = window.innerWidth;
    h = window.innerHeight;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    // drawing simple grid lines
    for (x = 0; x <= w; x += epsilon) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        for (y = 0; y <= h; y += epsilon) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
    }

    ctx.strokeStyle = "#1E90FF"; // BLUE
    ctx.stroke();
};

// redrawing grid to fix the max size of browser while resizing
function resizeCanvas(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw(); 
}

// clear whole canvas
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function clearBoard(){
    data.clear();
    clearCanvas();
    drawGrid();
}

// redraw table after removing a dot, plot all data in dictionary
function redraw(){
    clearCanvas();
    drawGrid();
    plotAll();
    drawAllEdges();
}

// parse mouse coordinate
function parseMouseC(){
    rect = canvas.getBoundingClientRect(); // size of canvas
    x = event.clientX - rect.left; // position of mouse in horizontal axis
    y = event.clientY - rect.top; // position of mouse in vertical axis

    // convert x,y to canvas coordinate
    if (x%epsilon >= 15) x = Math.ceil((x) / epsilon) * epsilon;
    else x = Math.floor((x) / epsilon) * epsilon;
    if (y%epsilon >= 15) y = Math.ceil((y) / epsilon) * epsilon;
    else y = Math.floor((y) / epsilon) * epsilon;

    return [x,y];
}

// function to plot a point p
function plot(p){
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    ctx.arc(p[0], p[1], 6.0, 0, 2 * Math.PI, true); // x, y, radius
    ctx.fill();
}

// draw line from point p1 to p2
function drawLine(p1, p2){
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.strokeStyle = "#FF0000"; // red
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    ctx.stroke();
}

// plot all points into the grid
function plotAll(){
    for (var x in data.allPoints){
        data.allPoints[x].forEach(function(y) {
            plot([x, y]);
        });
    }
}

// draw all edges
function drawAllEdges(){
    data.allEdges.forEach(edge =>{
        drawLine([edge.x1, edge.y1], [edge.x2, edge.y2])
    })
}


// catching mouse click: plot a dot on location of mouse
// NOTE: canvas cordinate (0, 0) = mouse location (10, 10)
// we need to convert mouse coordinate to canvas coordinate
// remove the point if there is already one
function plotOrRemove(p) {
    // check if point already exist, delete it, else add it
    if (data.removePoint(p))
        redraw();
    else{
        // draw the point
        plot(p);
        // add to dictionary
        data.addPoint(p);
    }
}

// when mouse is down, and is moving, this will drag a line
function handleMouseMove(event){
    if (!mouseDown) return;
    redraw();
    // draw the current lines
    drawLine(saved_point, parseMouseC());
}

// when mouse is up and there is a point, draw a line
function handleMouseUp(e){
    upCoordinate = parseMouseC(); // get (x, y) where mouse is 
    if (mouseDown && !data.compare(saved_point, upCoordinate)){
        // connecting mode
        if (data.contain(upCoordinate)){
            drawLine(saved_point, upCoordinate); // draw the edge
            data.addEdge(saved_point, upCoordinate); // add edge to grid data
        }else{
            // refresh the grid without changing the data
            redraw();
        }
    }else{
        // plot the point at mouseDown spot
        plotOrRemove(saved_point);
    }

    mouseDown = false;
}

// function to add listeners
function initListeners(){
    // adding listener to resize grid line while browser window resizes
    window.addEventListener('resize', resizeCanvas, false);
    document.getElementById('startButtonClearBoard').addEventListener("click", clearBoard);
    
    // drag events
    // when mouse is hold starting a place with a existing point,
    // set mouseDown to true, and init the points
    $("#grid").mousedown(function (event) {
        saved_point = parseMouseC();
        if (data.contain(saved_point)){
            mouseDown = true;
        }
    });

    $("#grid").mousemove(function (e) {
        handleMouseMove(e);
    });

    $("#grid").mouseup(function (e) {
        handleMouseUp(e);
    });
}

// starting function calls
drawGrid();
initListeners();
