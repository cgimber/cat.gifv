/*
TODOS:
    -draw petting path
    -"pet me" prompt
    -cat paw cursor
    -purring sounds
*/

/* globals
---------------------------------------------------------------------*/
var center = view.bounds.center;
var scalar = 2;
var path, last;


/* init
---------------------------------------------------------------------*/


/* events
---------------------------------------------------------------------*/
tool.minDistance = 10;
tool.maxDistance = 50;

function onMouseDown(event) {
    console.log("touch start");
}

function onMouseDrag(event) {
    var delta = event.delta.normalize();
    var force = (last) ? last + delta : delta;

    // console.log("DELTA: " + delta.x + ", " + delta.y);
    console.log("FORCE : " + force.x + ", " + force.y);
    
    force *= scalar;

    $('#gif').css({
        transform: transformMatrix(force.x, force.y, 1.15)
    });

    // console.log(transformMatrix(force.x, force.y, 1.15));
    // console.log("FORCE: " + force.x + ", " + force.y);

    last = delta;
}

function onMouseUp(event) {
    console.log("touch end");
    $('#gif').css({ transform: transformMatrix(0, 0, 1.15) });
}

function onResize() {
    center = view.bounds.center;
}

/* functions
---------------------------------------------------------------------*/

function transformMatrix(tx, ty, s) {
    // accepts translate(x,y), scale(x,y), and angle parameters
    // order: scale --> translate
    return "matrix(" + s + ",0,0," + s + "," + (s * tx) + "," + (s * ty) + ")";
}

// function transformMatrix(tx, ty, sx, sy, a) {
//     // accepts translate(x,y), scale(x,y), and angle parameters
//     // order: translate --> scale --> rotate 
//     var cx, cy;
//     cx = cy = 1;
//     return "matrix(" + (sx * Math.cos(a)) + "," + (sy * Math.sin(a)) + "," + (-sx * Math.sin(a)) + "," + (sy * Math.cos(a)) + "," + ((-cx * Math.cos(a) + cy * Math.sin(a) + cx) * sx + tx) + "," + ((-cx * Math.sin(a) - cy * Math.cos(a) + cy) * sy + ty) + ")";
// }
