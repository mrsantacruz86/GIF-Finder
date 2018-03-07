//---- JS Code----
// Array of animals
var animalArray = ["dog","cat", "rabbit", "hamster", "goldfish", "bird"];

function apiRequest(topic, limit) {
    // API-KEY
    var myKey = "dc6zaTOxFJmzC"
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
function addButton(list){
        createButton(list[i]);
}

$(document).ready(function(){
    addButton(animalArray);
    // Adding click event listen listener to all buttons
    $(".animal-btn").click(function () {
        $("#gifs-appear-here").empty();
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-animal");
        // Constructing a queryURL using the animal name
        // storing the data from the AJAX request in the results variable
        var results = apiRequest(animal,10).then(
            function(response) {
                console.log("llego el pollo",response)
                // Looping through each result item
                for (var i = 0; i < response.data.length; i++) {
                    // Creating and storing a div tag
                    var animalDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + response.data[i].rating);
                    // Creating and storing an image tag
                    var animalImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    animalImage.attr("src", response.data[i].images.fixed_height.url);
                    // Appending the paragraph and image tag to the animalDiv
                    animalDiv.append(p);
                    animalDiv.append(animalImage);
                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(animalDiv);
                }
            });
    });

    $("#add-btn").click(function (event) {
        event.preventDefault();
        var text = $('#search').val()
        if(text != ""){
            $('#search').val("");
            animalArray.push(text);
            console.log(animalArray);
            addButton(animalArray);
        }
    });
})