/*
TODOS:
    -lerp between deltas for smoother transforms
    -draw petting path
    -"pet me" prompt
    -cat paw cursor
    -purring sounds
*/

/* globals
---------------------------------------------------------------------*/
var center = view.bounds.center;
tool.minDistance = 10;
var force = 5;
var path;


/* init
---------------------------------------------------------------------*/


/* events
---------------------------------------------------------------------*/

function onMouseDown(event) {
    path = new Path();
    path.strokeColor = 'white';

    // path.add(event.point);
}

function onMouseDrag(event) {
    // path.add(event.point);

    var delta = event.delta.normalize();
    // console.log(delta.x+ "," + delta.y);

    $('#gif').css({
        // transform: "translate(" + (force * delta.x) + "px," + (force * delta.y) + "px)"
        transform: transformMatrix(force * delta.x, force * delta.y, 1.15)
    });

    console.log(transformMatrix(force * delta.x, force * delta.y, 1.15));

    // var step = event.delta;
    // step.angle += 90;

    // var top = event.middlePoint + step;
    // var bottom = event.middlePoint - step;

    // var line = new Path();
    // line.strokeColor = 'white';
    // line.add(top);
    // line.add(bottom);
}

function onMouseUp(event) {
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
