var drawGrid = function(id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');

    // resizeing to the height and width of browser
    w  = window.innerWidth;
    h = window.innerHeight;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    // drawing simple grid lines
    for (x = 0; x <= w; x += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        for (y = 0; y <= h; y += 20) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
    }
    ctx.stroke();
};

// redrawing grid to fix the max size of browser while resizing
function resize_canvas(){
    canvas = document.getElementById("grid");
    if (canvas.width  < window.innerWidth)
    {
        canvas.width  = window.innerWidth;
    }

    if (canvas.height < window.innerHeight)
    {
        canvas.height = window.innerHeight;
    }
    drawGrid("grid"); 
}

drawGrid("grid"); 

// adding listener to resize grid line while browser window resizes
window.addEventListener('resize', resize_canvas, false);