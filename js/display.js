/* globals
---------------------------------------------------------------------*/
var STATES = {
    WAITING: Symbol("WAITING"),
    LOADING: Symbol("LOADING"),
    LOADED: Symbol("LOADED"),
};
if (Object.freeze) { Object.freeze(STATES); }
var state = STATES.WAITING;
var gifUrl;

/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    getCat(function() {
        updateGif(gifUrl);
    });
});

/* functions
---------------------------------------------------------------------*/

function getCat(callback) {
    $.getJSON("http://api.giphy.com/v1/gifs/random?api_key=CW27AW0nlp5u0&tag=cat&rating=r", null, function(response) {
            // console.log(response.data);
            gifUrl = response.data.image_original_url;
            // console.log(gifUrl);

            console.log("load start");
            state = STATES.LOADING;
            loadGif(gifUrl);
        })
        .done(function() {
            // console.log("done");
            if (callback) callback();
        })
        .fail(function(e) {
            console.error(e);
        })
        .always(function() {
            // console.log("finished");
        });
}

function loadGif(url) {
    $('<img/>').attr('src', url).on('load', function() {
        console.log("load end");
        $(this).remove();
        state = STATES.LOADED;
    });
}

function updateGif(url) {
    console.log("gif update");
    $('#gif').css('background-image', 'url(' + url + ')');
    state = STATES.WAITING;
}
