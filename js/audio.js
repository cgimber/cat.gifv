/* globals
---------------------------------------------------------------------*/

var currMeow = 0;
var meows = [
    new Howl({
        src: ['../audio/meow-01.webm', '../audio/meow-01.mp3'],
    }),
    new Howl({
        src: ['../audio/meow-02.webm', '../audio/meow-02.mp3'],
    }),
    new Howl({
        src: ['../audio/meow-03.webm', '../audio/meow-03.mp3'],
    }),
    new Howl({
        src: ['../audio/meow-04.webm', '../audio/meow-04.mp3'],
    })
];
var purr = new Howl({
    src: ['../audio/purr.webm', '../audio/purr.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.75,
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
