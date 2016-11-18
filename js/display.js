/* globals
---------------------------------------------------------------------*/
var gifUrl;

/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    getCat();
});

/* functions
---------------------------------------------------------------------*/

function getCat() {
    $.getJSON("http://api.giphy.com/v1/gifs/random?api_key=CW27AW0nlp5u0&tag=cat&rating=r", null, function(response) {
            var id = response.data.id;
            var image = response.data.image_original_url;

            $('#gif').css('background-image', 'url(' + image + ')');

            gifUrl = 'http://giphy.com/gifs/' + id;

        })
        .done(function() {
            console.log("done");
        })
        .fail(function(e) {
            console.error(e);
        })
        .always(function() {
            console.log("finished");
        });
}