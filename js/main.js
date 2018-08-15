var buttonsHTML = '';
var animalArray = ['pig', 'cow', 'horse', 'tiger', 'lion', 'bee', 'dog', 'cat', 'turtle', 'panda'];
var newAnimalValue;
var giphyKey = "dc6zaTOxFJmzC";
var searchAnimal;
var giphyHolder;
var giphyArray = [];

function generateButtons() {
    for (var i = 0; i < animalArray.length; i++) {
        buttonsHTML += "<button class='btn btn-lrg btn-primary animal-buttons' data-animal=" + animalArray[i] + ">" + animalArray[i] + "</button>";
    }
    $('#animal-buttons-container').html(buttonsHTML);
}

$(document).ready(function() {

    generateButtons();

    $('body').on('click', '#add-animal', function(event) {
        event.preventDefault();
        newAnimalValue = $('#animal-input').val();
        newButton = "<button class='btn btn-lrg btn-primary animal-buttons' data-animal=" + newAnimalValue + ">" + newAnimalValue + "</button>";
        $('#animal-buttons-container').append(newButton);
    });

    $('body').on('click', '.animal-buttons', function(event) {
        $('.giphy-div').empty();
        searchAnimal = $(this).attr('data-animal');
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchAnimal + "&limit=10" + "&api_key=dc6zaTOxFJmzC";
        console.log(queryURL);
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                    $('.giphy-div').append("<div class='outer-container'><p class='title'>Rating: " + response.data[i].rating.toUpperCase() + "</p><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                    giphyArray.push(response.data[i].images.downsized.url);
                }
            });

    });

    $('body').on('click', '.images-returned', function(event) {
        var state = $(this).attr('data-state');
        var thisImgDataStill = $(this).attr('data-still');
        var thisImgDataAnimate = $(this).attr('data-animate');
        if (state === 'still') {
            $(this).attr('src', thisImgDataAnimate);
            $(this).attr('data-state', 'animate');
        }
        if (state !== "still") {
            $(this).attr('src', thisImgDataStill);
            $(this).attr('data-state', 'still');
        }
    });

});