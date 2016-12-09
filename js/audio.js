/* globals
---------------------------------------------------------------------*/

Howler.mobileAutoEnable = false;
var currMeow = 0;
var meows = [
    new Howl({
        src: ['audio/meow-01.webm', 'audio/meow-01.mp3'],
        onload: function() {
            console.log("loaded meow-01");
        }
    }),
    new Howl({
        src: ['audio/meow-02.webm', 'audio/meow-02.mp3'],
        onload: function() {
            console.log("loaded meow-02");
        }
    }),
    new Howl({
        src: ['audio/meow-03.webm', 'audio/meow-03.mp3'],
        onload: function() {
            console.log("loaded meow-03");
        }
    }),
    new Howl({
        src: ['audio/meow-04.webm', 'audio/meow-04.mp3'],
        onload: function() {
            console.log("loaded meow-04");
        }
    })
];
var purr = new Howl({
    src: ['audio/purr.webm', 'audio/purr.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.75,
    onload: function() {
        console.log("loaded purr");
    }
});


/* events
---------------------------------------------------------------------*/

// play/pause audio on visibility change
// makes use of the API, falling back to the less reliable blur/focus method in incompatible browsers
// http://stackoverflow.com/questions/1060008/is-there-a-way-to-detect-if-a-browser-window-is-not-currently-active/1060034#1060034

var hidden = "hidden";

// standards:
if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
// IE 9 and lower:
else if ("onfocusin" in document)
    document.onfocusin = document.onfocusout = onchange;
// all others:
else
    window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;

function onchange(evt) {
    var v = "visible",
        h = "hidden",
        evtMap = {
            focus: v,
            focusin: v,
            pageshow: v,
            blur: h,
            focusout: h,
            pagehide: h
        };

    evt = evt || window.event;
    if (evt.type in evtMap) {
        // document.title = evtMap[evt.type];
        if (evtMap[evt.type] === h) purr.pause();
        else purr.play();
    }
    else {
        // document.title = this[hidden] ? "hidden" : "visible";
        if (this[hidden]) purr.pause();
        else purr.play();
    }
}


/* functions
---------------------------------------------------------------------*/

function randomMeow() {
    var newMeow;

    do newMeow = getRandomInt(0, meows.length - 1);
    while (newMeow == currMeow); // make sure the next meow is not the same as the last

    currMeow = newMeow;
    return newMeow;
}

function getRandomInt(min, max) {
    // returns a random int between min (inclusive) and max (exclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
