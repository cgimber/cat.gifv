/*
TODOS:
    -pet-o-meter
    -"pet me" prompt
    -cat paw cursor
    -purring sounds
*/

/* globals
---------------------------------------------------------------------*/
var center = view.bounds.center;
var path, lastDelta;
var CONSTANTS = {
    max_force: 2,
    max_segments: 5
};


/* init
---------------------------------------------------------------------*/


/* events
---------------------------------------------------------------------*/
tool.minDistance = 10;
tool.maxDistance = 20;

function onMouseDown(event) {
    console.log("touch start");

    $('canvas').toggleClass('canvas--input');

    path = new Path({
        segments: [event.point],
        // selected: true,
        complete: false,
        strokeWidth: 44,
        strokeCap: 'round',
        strokeColor: {
            hue: 0,
            saturation: 1,
            brightness: 1,
            alpha: 0.5
        }
    });

}

function onMouseDrag(event) {
    // exert force on the gif
    var delta = event.delta.normalize();
    var force = (lastDelta) ? lastDelta + delta : delta;
    force *= CONSTANTS.max_force;

    $('#gif').css({
        transform: transformMatrix(force.x, force.y, 1.15)
    });

    // update the path
    path.add(event.point);
    if (path.segments.length >= CONSTANTS.max_segments) path.removeSegment(0);
    path.smooth();

    // var vector = path.clone();
    // var gradientColor = new Color(new Gradient(['red', 'white']), vector.lastSegment, vector.firstSegment);
    // vector.remove();
    // path.strokeColor = gradientColor;
    // console.log(path.strokeColor);

    lastDelta = delta;
}

function onMouseUp(event) {
    console.log("touch end");

    // reset the gif
    $('canvas').toggleClass('canvas--input');
    $('#gif').css({ transform: transformMatrix(0, 0, 1.15) });

    // complete the path
    path.add(event.point);
    path.smooth();
    path.complete = true;
    // path.simplify();

    displayCat();
}

function onFrame(event) {
    var children = project.activeLayer.children;

    for (var i = 0; i < children.length; i++) {
        var child = children[i];

        // if empty, remove this path
        if (child.segments.length === 0) child.remove();
        else {
            // adjust it's color
            var hue = child.strokeColor.hue;
            if (hue >= 360) hue = 0;
            else hue += 10;

            child.strokeColor = {
                hue: hue,
                saturation: 1,
                brightness: 1,
                alpha: 0.5
            };

            // child.strokeColor.alpha -= 0.1;
            // console.log(child.strokeColor.alpha);

            // if complete, erode this path 
            if (child.complete === true) child.removeSegment(0);
        }
    }

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
