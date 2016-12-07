/*
TODOS:
    -purring sounds
    -score popups?
    -cat paw cursors?
*/

/* globals
---------------------------------------------------------------------*/
var center = view.bounds.center;
var path, lastDelta,
    prompt, promptTimer,
    pet_o_meter;
var touches = 0;
var recievingInput = false;
var CONSTANTS = {
    max_force: 2,
    max_segments: 8,
    fade: 0.2,
    touch_threshold: 100,
    meter_height: 20,
    prompt_rate: 0.5,
    prompt_direction: "down" // down or random (default)
};


/* init
---------------------------------------------------------------------*/
// test = new Path.Ellipse({
//     center: center,
//     radius: 200,
//     strokeWidth: 60,
//     strokeColor: 'black',
//     name: 'test'
// });
startPrompt();
promptTimer = window.setInterval(startPrompt, 4000);

/* events
---------------------------------------------------------------------*/
// tool.minDistance = 10;
// tool.maxDistance = 20;
tool.fixedDistance = 10;

function onMouseDown(event) {
    console.log("touch start");
    recievingInput = true;

    if (event.count === 1) {
        clearInterval(promptTimer);
        $('.modal').fadeOut();
    }

    $('canvas').addClass('canvas--input');

    path = new Path({
        name: 'input',
        segments: [event.point],
        // selected: true,
        complete: false,
        strokeWidth: 60,
        strokeCap: 'round',
        strokeColor: {
            hue: 0,
            saturation: 1,
            brightness: 1,
            alpha: 0.5
        }
    });
    path.fade = path.strokeColor.alpha / (CONSTANTS.max_segments / 2);
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

    // state/touch dependent events
    if (state === STATES.WAITING && (touches >= CONSTANTS.touch_threshold * 1 / 2)) {
        // begin loading gif
        console.log("load event:", state);
        state = STATES.LOADING;
        getCat();
    } else if (state === STATES.LOADED && touches >= CONSTANTS.touch_threshold) {
        // update css and reset touches
        console.log("update event:", state);
        updateGif(gifUrl);
        touches = 0;
    } else if (touches < CONSTANTS.touch_threshold) touches++;
}

function onMouseUp(event) {
    console.log("touch end");
    recievingInput = false;

    // reset the gif
    $('canvas').removeClass('canvas--input');
    $('#gif').css({ transform: transformMatrix(0, 0, 1.15) });

    // complete the path
    path.add(event.point);
    path.smooth();
    path.complete = true;
    // path.simplify();

    // displayCat();
    // console.log(touches);
}

function onFrame(event) {
    // update the prompt
    if (!prompt.complete && event.count % (1 / CONSTANTS.prompt_rate) === 0) {
        var x, y;
        if (CONSTANTS.prompt_direction === "down") {
            x = 0;
            y = 10;
        } else {
            x = (Math.random() < 0.5) ? getRandom(-10, -5) : getRandom(5, 10);
            y = getRandom(5, 10);
        }
        prompt.add(prompt.lastSegment.point + new Point(x, y));
        if (prompt.segments.length >= CONSTANTS.max_segments) prompt.removeSegment(0);
        prompt.smooth();
    }

    // update touch path
    var children = project.activeLayer.children;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];

        if (child.name != "pet_o_meter") {
            // if empty, remove this path
            if (child.segments.length === 0) child.remove();
            else {
                if (child.name === "input") {
                    // adjust it's color
                    var hue = child.strokeColor.hue;
                    if (hue >= 360) child.strokeColor.hue = 0;
                    else child.strokeColor.hue += 10;
                }

                // child.strokeColor.alpha -= 0.1;
                // console.log(child.strokeColor.alpha);

                // if complete, erode this path 
                if (child.complete === true) {
                    // console.log(child.fade * (1 / child.segments.length));
                    child.strokeColor.alpha -= child.fade * (1 / child.segments.length);
                    child.removeSegment(0);
                }
            }
        }
    }

    // decrement touches when not recieving input
    if (!recievingInput && touches > 0) touches--;

    // update pet_o_meter
    var x = map(touches, 0, CONSTANTS.touch_threshold, -view.bounds.width / 2, view.bounds.width / 2);
    var posX = constrain(x, -view.bounds.width / 2, view.bounds.width / 2);
    pet_o_meter.position.x = posX;

    // console.log(touches);
}

function onResize() {
    // reset view dependant variables
    center = view.bounds.center;

    // reset pet_o_meter
    if (pet_o_meter) pet_o_meter.remove();
    pet_o_meter = new Path.Rectangle({
        name: 'pet_o_meter',
        point: view.bounds.topLeft,
        size: [view.bounds.width, CONSTANTS.meter_height],
        fillColor: {
            hue: 0,
            saturation: 0,
            brightness: 1,
            alpha: 0.95
        }
    });
}

/* functions
---------------------------------------------------------------------*/

function startPrompt() {
    console.log("start prompt");

    prompt = new Path({
        name: 'prompt',
        segments: [center * [1, 1.5]],
        // selected: true,
        timer: window.setTimeout(function() {
            console.log("prompt complete");
            prompt.complete = true;
        }, 500),
        complete: false,
        strokeWidth: 60,
        strokeCap: 'round',
        strokeColor: {
            hue: 0,
            saturation: 0,
            brightness: 1,
            alpha: 0.75
        }
    });
    prompt.fade = prompt.strokeColor.alpha / (CONSTANTS.max_segments / 2.5);
}

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

// returns a random number between min (inclusive) and max (exclusive)
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function constrain(value, low, high) {
    return Math.max(Math.min(value, high), low);
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
