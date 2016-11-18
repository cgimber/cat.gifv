/* globals
---------------------------------------------------------------------*/
var interval;
var gifUrl;

/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    slideshow();
});

/* functions
---------------------------------------------------------------------*/

function slideshow() {
    $.support.cors = true;
    $.getJSON("http://api.giphy.com/v1/gifs/random?api_key=CW27AW0nlp5u0&tag=cat&rating=r", null, function(response) {
        var id = response.data.id;
        var image = response.data.image_original_url;

        $('#gif').css('background-image', 'url(' + image + ')');

        gifUrl = 'http://giphy.com/gifs/' + id;

    }).error(function(jqXHR, textStatus, e) {
        console.log(e);
    });
}

function goToGif() {
    window.open(gifUrl, "_blank", "width=1000,height=960");
}

function next() {
    slideshow();
}

