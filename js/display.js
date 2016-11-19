/* globals
---------------------------------------------------------------------*/
var gifUrl;

/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    // hideAddressBar();
    displayCat();
});

/* functions
---------------------------------------------------------------------*/

function displayCat() {
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

// function hideAddressBar() {
//     if (!window.location.hash) {
//         if (document.height < window.outerHeight)
//             document.body.style.height = (window.outerHeight + 50) + 'px';
//         setTimeout(function() {
//             window.scrollTo(0, 1);
//             document.body.style.height = 'auto';
//         }, 50);
//     }
// }
