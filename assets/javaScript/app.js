var categories = ["thor", "hulk", "heimdall", "Iron Man", "Black Widow", "Hawkeye", "Red skull"];
var button, textVal;

function displayButtons() {
    $("#buttonHolder").empty();
    for (var i=0; i<categories.length; i++) {
        button = $("<button>");
        button.html(categories[i]);
        button.attr("data-value",categories[i]);
        button.addClass("gifButtons");
        button.addClass("btn-danger");
        $("#buttonHolder").append(button);
    }
}

$("#submitButton").on("click", function() {
    var textVal = $("#userInput").val().trim();
    categories.push(textVal);
    console.log(categories);  
    $("#userInput").val("");
    displayButtons();
});

// $("#userInput").keyup(function(){
//     if(textVal!== "") {
//         $("#submitButton").attr("disabled", false);
 
//     }
// });


function displayGif() {
    $("#gifHolder").empty();
    var searchCategory = $(this).attr("data-value");
    var noOfResults = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=q7Fr1h0LFUxwUKoZpoHnLD3l4UvVfKoW&q="+searchCategory+"&limit="+noOfResults+"&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var rowDiv = $ ("<div>");
            rowDiv.addClass("row");
            var newDiv = $("<div>");
            var p = $("<p>");
            p.html("Rating: "+results[i].rating);
            console.log(results[i].rating);
            var newImage = $("<img/>")
            newImage.attr("src", results[i].images.fixed_width_still.url);
            newImage.attr("data-state", "still");
            newImage.attr("data-still", results[i].images.fixed_width_still.url);
            newImage.attr("data-playing", results[i].images.fixed_width.url);
            newImage.addClass("imageGif");
            newDiv.append(p);
            newDiv.append(newImage);
            $("#gifHolder").prepend(newDiv);
        }

    });
}


function changeState() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        var animateValue = $(this).attr("data-playing");
        $(this).attr("src", animateValue);
        $(this).attr("data-state", "playing")
    }

    else if (state === "playing") {
        var animateValue = $(this).attr("data-still");
        $(this).attr("src", animateValue);
        $(this).attr("data-state", "still");
    }
}


displayButtons();    

$(document).on("click", ".gifButtons", displayGif);
$(document).on("click", ".imageGif", changeState);

