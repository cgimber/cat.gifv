/* globals
---------------------------------------------------------------------*/
var gifUrl;

/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    displayCat();
});

/* functions
---------------------------------------------------------------------*/

function displayCat() {
    $.getJSON("http://api.giphy.com/v1/gifs/random?api_key=CW27AW0nlp5u0&tag=cat&rating=r", null, function(response) {
            var id = response.data.id;
            var image = response.data.image_original_url;
            // console.log(response.data);

            console.log("load start");
            loadGif(image, function() {
                $('#gif').css('background-image', 'url(' + image + ')');
            });

            gifUrl = 'http://giphy.com/gifs/' + id;

        })
        .done(function() {
            // console.log("done");
        })
        .fail(function(e) {
            console.error(e);
        })
        .always(function() {
            // console.log("finished");
        });
}

function loadGif(url, callback) {
    $('<img/>').attr('src', url).on('load', function() {
        console.log("load end");
        $(this).remove();
        callback();
    });
}
