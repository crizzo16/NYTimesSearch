
// Begin creating basic click events. Register the submit button
$("#submit").on("click", function () {


    event.preventDefault();

    var search = $("#search-term").val().trim();
    var numRecords = $("#num-records").val();
    //Check to see if user entered Start Year (since value is optional)
    if ($("#start-year").val() === "") {
        var startyear = ""; //This won't affect API query if user decides not to use this functionality
    } else {
        var startyear = "?begin_date=" + $("#start-year").val() + "0101";
    }
    //Check to see if user entered End Year (since value is optional)
    //Also, we didn't need the parseInt or trim functions since we're using the numbers as a string anyways
    if ($().val() === "") {
        var endyear = ""; //This won't affect API query if user decides not to use this functionality
    } else {
        var endyear = "?end_date=" + $("#end-year").val() + "1231";
    }
    //***Working, but I left here just in case***
    //console.log("search: " + search);
    //console.log("numRecords: " + numRecords);
    //console.log("startyear: " + startyear);
    //console.log("endyear: " + endyear);

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + startyear + endyear + "?page0&api_key=4f6dd008f7394e408b7444580edbc7c6";

    // search number of records
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

        var results = (response.response.docs);
        console.log(response);

        for (var i = 0; i < numRecords; i++) {

            var articleDiv = $("<div>");
            articleDiv.addClass("card article");

            // Add article as a link
            var articleTitle = $("<a>").html("<i class='fas fa-book-open'></i> " + results[i].headline.main).addClass("card-header");
            // Add link, and make it open in a new tab
            articleTitle.attr("href", results[i].web_url);
            articleTitle.attr("target", "_blank");

            //Create the card body
            var cardBody = $("<div>");
            cardBody.addClass("card-body");

            //Add the article summary to the body
            var about = $("<p>");
            console.log(results[i].snippet);
            about.text(results[i].snippet);
            cardBody.append(about);

            //Append the pieces of the article
            articleDiv.append(articleTitle);
            articleDiv.append(cardBody);

            //Place it on the screen!
            $("#place-articles-here").prepend(articleDiv);
        }
    });
});

$("#clear-form").on("click", function () {
    $("#search-term, #start-year, #end-year, #num-records").empty();
});
