/**
 * this file contains all the functions to manipulate the grid
 */

var canvas = document.getElementById("grid");
var ctx = canvas.getContext('2d');
var epsilon = 30; // positioning adjustment. grid gap, controlls grid size


// drawing a grid that fits the browser size fully
function drawGrid() {
    // resizeing to the height and width of browser
    w = window.innerWidth;
    h = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // drawing simple grid lines
    x = 0;
    y = 0;
    while (x <= w || y <= h) {
        // draw vertical line
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        // draw horizontal line
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        // increment by grid gap
        x += epsilon;
        y += epsilon;
    }

    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "#1E90FF"; // BLUE
    ctx.stroke();
}

// redrawing grid to fix the max size of browser while resizing
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redraw();
}

// clear whole canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// function to plot a point p
function plot(p) {
    ctx.beginPath();
    ctx.globalAlpha = 1.0;
    ctx.arc(p[0], p[1], 6.0, 0, 2 * Math.PI, true); // x, y, radius
    ctx.fill();
}

// draw line from point p1 to p2
function drawLine(p1, p2, color) {
    ctx.globalCompositeOperation = 'destination-over'; // mode: line wont overlap dot
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    ctx.stroke();
}

// redraw table after removing a dot, plot all data in dictionary
function redraw() {
    clearCanvas();
    drawGrid();
    plotAll();
    drawAllEdges();
}