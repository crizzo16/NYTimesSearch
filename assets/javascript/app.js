// Begin creating basic click events. Register the submit button
$("#submit").on("click", function () {
    console.log("search: " + search);
  
    console.log("numRecords: " + numRecords);
  
    console.log("startyear: " + startyear);
  
    console.log("endyear: " + endyear);
  
    event.preventDefault();
  
    var search = $("#search-term").val().trim();
    var numRecords = parseInt($("#num-records").val());
    var startyear = "?begin_date=" + parseInt($("#start-year").val().trim() + "0101");
    var endyear = "?end_date=" + pareseInt($("#end-year").val().trim() + "1231");
  
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search + startyear + endyear + "?page0&api_key=4f6dd008f7394e408b7444580edbc7c6";
  
    // search number of records
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
  
      // Create working transfers of data between the text-boxes and the backend. - event.preventDefault();
        // search term
        // number of records
        // start year (opt)
        // end year (opt)
  
  
      // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
      // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
  
      var results = (response.data);
      console.log(results);
  
      for (var i = 0; i < numRecords.length; i++) {
  
        var articleDiv = $("<div>");
  
        // TODO: title property
        var articleTitle = $("<a>").text(results[i]);
        // TODO: article url property
        articleTitle.attr("src", results[i])
  
        // TODO: headline property      
        var headline = $("<p>").text(results[i]);
  
        articleDiv.append(articleTitle, headline);
  
        $("#articles-appear-here").prepend(articleDiv);
      }
  
      // if (startyear) {
      //     startyear = results[i].begin_date;                
      // }
      // if (endyear) {
      //     endyear = results[i].end_date;                
      // }
      //     
  
    });
  });
  
  $("#clear-form").on("click", function () {
    $("#search-term, #start-year, #end-year, #num-records").empty();
  });