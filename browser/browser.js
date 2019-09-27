var canvas = document.getElementById("grid");
var ctx = canvas.getContext('2d');

// positioning adjustment
var epsilon = 30; // grid gap

// diction to store points (x, [y]).
data = new gridData();

// var for connecting 2 points
var shift = false;
var point_a;
var point_b;
var num_click = 0;

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

// function to plot a point(x, y)
function plot(x, y){
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    ctx.arc(x, y, 6.0, 0, 2 * Math.PI, true); // x, y, radius
    ctx.fill();
}

// draw line from point a to b
function drawLine(a, b){
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.strokeStyle = "#FF0000"; // red
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    ctx.stroke();
}

// clear whole canvas
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// redraw table after removing a dot, plot all data in dictionary
function redraw(){
    clearCanvas();
    drawGrid();
    for (var x in data.allPoints){
        data.allPoints[x].forEach(function(element) {
            plot(x, element);
        });
    }
}

// catching mouse click: plot a dot on location of mouse
// NOTE: canvas cordinate (0, 0) = mouse location (10, 10)
// we need to convert mouse coordinate to canvas coordinate
function printMousePos(event) {
    //document.body.textContent = event.clientY;// printing position of mouse click for DEBUG
    var rect = canvas.getBoundingClientRect(); // size of canvas
    x = event.clientX - rect.left; // position of mouse in horizontal axis
    y = event.clientY - rect.top; // position of mouse in vertical axis

    // convert x,y to canvas coordinate
    if (x%epsilon >= 15) x = Math.ceil((x) / epsilon) * epsilon;
    else x = Math.floor((x) / epsilon) * epsilon;
    if (y%epsilon >= 15) y = Math.ceil((y) / epsilon) * epsilon;
    else y = Math.floor((y) / epsilon) * epsilon;

    // check if point already exist, delete it, else add it
    if (!event.shiftKey){ // when not in connecting mode
        num_click = 0;
        if (data.removePoint(x, y)){
            redraw();
        }else{
            // draw the point
            plot(x, y);
            // add to dictionary
            data.addPoint(x, y);
        }
    }else{
        // connecting mode
        if (num_click == 0){
            // first click: init point a
            num_click = 1;
            point_a = [x, y];
        } else if (num_click == 1){
            // 2nd click: init point b
            num_click ++;
            point_b = [x, y];
            drawLine(point_a, point_b);
        }else if (num_click == 2){
            // if didnt stop adding edge, keep adding
            point_a = point_b;
            point_b = [x, y];
            drawLine(point_a, point_b);
        }
    }
}

// function to add listeners
function initListeners(){
    // adding listener to resize grid line while browser window resizes
    window.addEventListener('resize', resizeCanvas, false);

    // adding listener to mouse click: plotting a dot on place clicked
    document.addEventListener("click", printMousePos);
}

// starting function calls
drawGrid();
initListeners();
