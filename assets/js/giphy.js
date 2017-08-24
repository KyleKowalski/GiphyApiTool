$(document).ready(function() {

  $("#buttonToAddSearchTermButtons").click(function (){
    var thisSearchTerm = $("#inputSearchTerm").val();

    if (thisSearchTerm != "") {
      createGifButton(thisSearchTerm);
    }
    $("#inputSearchTerm").val("");
  });

  function createGifButton(thisSearchTerm) {
    var targetParent = $("#otherButtonsHere");
    var newButton = $("<button>");
    newButton.attr("type", "button");
    newButton.attr("class", "gifButton");
    newButton.attr("id", thisSearchTerm);
    newButton.html(thisSearchTerm);
    targetParent.prepend(newButton);
  }

  $("#otherButtonsHere").on("click", ".gifButton", function() {
    console.log(this);
    var userInput = $(this).html(); // TODO setup a user input
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    userInput + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).done(function(response) {

      var results = response.data;
      $.each(results, function(key, value) {
        var movingUrl = value.images.fixed_height.url;
        var stillUrl = value.images.fixed_height_still.url;
        var rating = value.rating;

        var thisP = $("<p>");
        thisP.text("Results: " + rating);
        var targetParent = $("#gifs-appear-here");
        var thisDiv = $("<div>");
        var thisGif = $("<img>");
        var thisHr = $("<hr>");
        thisGif.attr("src", stillUrl);
        thisGif.attr("still_url", stillUrl);
        thisGif.attr("moving_url", movingUrl);
        thisGif.attr("current_state", "still")
        thisGif.attr("class", "gif");
        thisDiv.prepend(thisP);
        thisDiv.append(thisGif);
        thisDiv.append(thisHr);
        targetParent.prepend(thisDiv);
      });
    });
  });

  $("#gifs-appear-here").on("click", ".gif", function() {
    var currentState = $(this).attr("current_state");
    var movingPicture = $(this).attr("moving_url");
    var stillPicture = $(this).attr("still_url");

    if (currentState === "still") {
      $(this).attr("src", movingPicture);
      $(this).attr("current_state", "active");
    }
    else {
      $(this).attr("src", stillPicture);
      $(this).attr("current_state", "still");
    }
  });
});