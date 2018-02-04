/* globals
---------------------------------------------------------------------*/
var STATES = {
    WAITING: Symbol("WAITING"),
    LOADING: Symbol("LOADING"),
    LOADED: Symbol("LOADED"),
};
if (Object.freeze) { Object.freeze(STATES); }
var state = STATES.WAITING;
var loadTimer, gifUrl;


/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    getCat(function() {
        updateGif(gifUrl);
        console.log("document ready:", state);
    });
});


/* functions
---------------------------------------------------------------------*/
function getCat(callback) {
    $.getJSON("https://api.giphy.com/v1/gifs/random?api_key=CW27AW0nlp5u0&tag=cat", null, function(response) {
            // console.log(response.data);
            if (isMobile) gifUrl = response.data.fixed_height_downsampled_url;
            else gifUrl = response.data.image_original_url;
            // gifUrl = response.data.image_original_url;
            // console.log(gifUrl);

            console.log("load start");
            state = STATES.LOADING;
            loadGif(gifUrl, callback);
        })
        .done(function() {
            // console.log("done");
            // if (callback) callback();
        })
        .fail(function(e) {
            console.error(e);
        })
        .always(function() {
            // console.log("finished");
        });
}

function loadGif(url, callback) {
    // preload the gif in another element and then update the state
    $('<img/>').attr('src', url).on('load', function() {
        if (loadTimer) window.clearTimeout(loadTimer);
        console.log("load end");
        $(this).remove();
        state = STATES.LOADED;
        if (callback) callback();
    });
    // stop waiting if it takes longer than 1sec
    loadTimer = window.setTimeout(function() {
        console.log("load time out");
        state = STATES.LOADED;
    }, 2000);
}

function updateGif(url) {
    console.log("gif update");
    $('#gif').css('background-image', 'url(' + url + ')');
    state = STATES.WAITING;
}
