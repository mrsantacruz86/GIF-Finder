//---- JS Code----
// Array of animals
var animalArray = ["dog","cat", "rabbit", "hamster", "goldfish", "bird"];

function apiRequest(topic, limit) {
    // API-KEY
    var myKey = "zujXUIQSkoPd6pplKEOvx5IZXkqrp1en"
    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + myKey + "&limit=" + limit;
    // console.log(queryURL);
    var collection;
    // Performing an AJAX request with the queryURL
    return $.ajax({
        url: queryURL,
        method: "GET"
    })
    // After data comes back from the request
    // .then(function (response) {
    //     console.log(response.data);
    //     return response.data;
    // });
    
}

function createButton(animalName){
    $button = $('<button>');
    $button.addClass("btn btn-secondary btn-sm animal-btn");
    $button.attr('data-animal', animalName);
    $button.text(animalName);
    $button.appendTo('#animal-buttons');
}
function refreshButtons(list){
    $('#animal-buttons').empty();
    for(var i = 0; i < list.length; i++){
        createButton(list[i]);
    }
}

$(document).ready(function(){
    refreshButtons(animalArray);
    $("#add-btn").click(function (event) {
        event.preventDefault();
        var text = $('#search').val()
        var repeated =  animalArray.indexOf(text);
        if(text != "" && repeated === -1){
            animalArray.push(text);
            refreshButtons(animalArray);
            $('#search').val("");
        }
        else{
            $('#wrongEntryModal').modal({
                keyboard: true
              });
            $('#search').val("");
        }
    });
    
    // Adding click event listen listener to all buttons using EVENT DELEGATION
    $('#animal-buttons').on('click', '.animal-btn', function () { 
        $("#gifs-appear-here").empty();
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-animal");
        // Constructing a queryURL using the animal name
        // storing the data from the AJAX request in the results variable
        var results = apiRequest(animal,10).then(function(response) {
            console.log("JSON Response: ",response)
            for (var i = 0; i < response.data.length; i++) {
                var $animalDiv = $('<div class="item">');
                var p = $("<p>").text("Rating: " + response.data[i].rating);
                var $animalImage = $('<img class="animal-img">');
                $animalImage.attr("src", response.data[i].images.fixed_height_still.url);
                $animalImage.attr("gif-img", response.data[i].images.fixed_height.url);
                $animalImage.attr("fixed-img", response.data[i].images.fixed_height_still.url);
                $animalImage.attr("status", "fixed")
                $animalDiv.append($animalImage);
                $animalDiv.append(p);
                $("#gifs-appear-here").prepend($animalDiv);
            }
        });
    });

    $("#gifs-appear-here").on('click','.animal-img', function () {
        if($(this).attr('status') === "fixed"){
            $(this).attr("src", $(this).attr("gif-img"));
            $(this).attr('status', 'animated');
        }else{
            $(this).attr("src", $(this).attr("fixed-img"));
            $(this).attr('status', 'fixed');
        }
    });
    
}) //end of Document.ready()
