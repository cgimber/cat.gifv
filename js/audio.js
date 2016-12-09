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

$(window).on("blur focus", function(e) {
    var prevType = $(this).data("prevType");

    if (prevType != e.type) { // reduce double fire issues
        switch (e.type) {
            case "blur":
                purr.pause();
                break;
            case "focus":
                purr.play();
                break;
        }
    }

    $(this).data("prevType", e.type);
});


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
