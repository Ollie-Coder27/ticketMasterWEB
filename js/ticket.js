/*
*
* Oliver Calandra CS 416-02 | Homework 4
*
*/
var max = 30;
var numberOfEvents;
var count = 0;


//basic
function getEvent() {
    $('#results-search').empty();
    //console.log('Perception check 5');//entered the function
    //get the user input
    let userInputbase = $('input[name=searchbar]').val();
    let userCatbase = $('select[name=pick-me]').val();
    console.log('userCat: ' + userCatbase);
    console.log('userInput: ' + userInputbase);
    if (userInputbase.length === 0) {
        console.log('Deception check 10');
        alert("You must enter something in the search bar");
    } else {
        if (userCatbase.length === 0) {
            console.log('Deception check 13');
        } else {

            numberOfEvents = Math.floor(20 * Math.random());
            console.log('Events: ' + numberOfEvents);
            console.log('userCat: ' + userCatbase);
            console.log('userInput: ' + userInputbase);

            if (numberOfEvents < 1) {
                alert("There are no events in your with those parameters currently");
            } else {
                var url = "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw";
                document.getElementById('results-search').style.display = 'inline';
                if (userCatbase === "all") {
                    url = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userInputbase + "&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw";
                    allCall(userInputbase, url);
                } else if (userCatbase === "art") {
                    url = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userInputbase + "&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw";
                    allCall(userInputbase, url);
                } else if (userCatbase === "city") {
                    url = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + userInputbase + "&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw";
                    allCall(userInputbase, url);
                } else if (userCatbase === "eve") {
                    url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + userInputbase + "&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw";
                    allCall(userInputbase, url);
                } else if (userCatbase === "gen") {
                    url = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=" + userInputbase + "&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw";
                    allCall(userInputbase, url);
                } else {
                    console.log("Perception check: 41");
                }
            }
        }
    }
}

//search by category and artist
function allCall(event, urlData) {
    const searchedfor = event;
    searchHere = urlData;
    console.log(numberOfEvents);
    $.ajax({
        type: "GET",
        url: searchHere,
        async: true,
        data: {size: numberOfEvents},
        dataType: "json",
        success: function (data) {
            const results = data._embedded.events;
            const size = data.size;
            console.log(data);
            $('#numRes').empty();
            $('#results-search').empty();
            $.each(data._embedded.events, function (i, event) {
                    count++;
                    let eventTy = event.classifications[0].genre.name;
                    let eTitle = event.name;
                    let where = event._embedded.venues[0].address.line1 + ", " + event._embedded.venues[0].city.name + ", " + event._embedded.venues[0].country.name;
                    let image = event.images[1].url;
                    let local = event._embedded.venues[0].name;
                    let time = event.dates.start.localTime;
                    let day = event.dates.start.localDate;
                    let tickets = event.url;
                    let provider = event.promoters[0].name;

                    console.log("Event Type: " + eventTy);
                    console.log("Event Title: " + eTitle);
                    console.log("Event image: " + image);
                    console.log("Event Local: " + local);
                    console.log("Event where: " + where);
                    console.log("Event time: " + time);
                    console.log("Event day: " + day);
                    console.log("Event tickets: " + tickets);
                    console.log("Event provider: " + provider);
                    if (eventTy === "Undefined") {
                        eventTy = event.classifications[0].segment.name;
                    }
                    if (provider === "undefined" || provider === null) {
                        provider = "Venue Promotion";
                    }
                    //'<h3>Number of listings: '+numberOfEvents+'</h3>'+

                    $('#results-search').append('' +
                        '<div class="padding-margin border shadow p-4 mb-4 rounded style-card">\n' +
                        '    <div class="container-xl padding overflow-hidden">\n' +
                        '        <div class="row">\n' +
                        '            <!--Text & Button-->\n' +
                        '            <div class="col-xl-6">\n' +
                        '                <h2 class="display-2">' + eTitle + '</h2>\n' +
                        '                <h2 class="lead">Location: ' + local + '<br>Addess: ' + where + '</h2>\n' +
                        '                <h2 class="lead">When: ' + day + ' @ ' + time + '</h2>\n' +
                        '                <h2 class="lead">Buy here: <a href=' + tickets + '> Tickets</a></h2>\n' +
                        '                <p class="lead">' + eventTy + ' brought to you by : ' + provider + '</p>\n' +
                        '            </div>\n' +
                        '\n' +
                        '            <!--Image-->\n' +
                        '            <div class="col-xl-6">\n' +
                        '                 <img src="' + image + '"\n' +
                        '                     class="img-fluid image-style" alt="Pic">\n' +
                        '                        </div>\n');
                }
            );
            $('#numRes').append('<h3>Number of listings: ' + count + '</h3>');

        },

        error: function (request, status, errorThrown) {
            alert("Error: " + status);
            console.log(errorThrown);
            //keep handeling errors
        }
    }); //AJAX Close


}

//UNUSED DUE TO ADVANCE JSON SHENANIGANS
//advanced calls
function advanced() {
    document.getElementById('search-more').style.display = 'none';
    $('#search-menu').append('' +
        '    <div class="row see-txt-bg">\n' +
        '        <input type="text" name="pick-meAD" placeholder="Search by Event, Artist, Genre" id="pick-me" class="col-3">\n' +
        '        <input type="text" name="searchbarAD" placeholder="Search by cities" id="searchbar" class="col-3">\n' +
        '        <label for="date" class="col-1">When: </label>\n' +
        '        <input type="date" name="date" id="date" class="col-3">\n' +
        '        <button type="button" class="btn col-2" id="search" onclick="advanceEvent()">Go!</button>\n' +
        '    </div>');

}

function advanceEvent() {
    let userInput = $('input[name=searchbarAD]').val();
    let userCat = $('input[name=pick-meAD]').val();
    let userDay = $('input[name=date]').val();

    if (userInput.length === 0) {
        console.log('Deception check 10');
        alert("You must enter something in the search bar");
    } else {
        if (userCat.length === 0) {
            console.log('Deception check 13');
        } else {
            if (userDay.length === 0) {
                console.log('userCat: ' + userCat);
                console.log('userInput: ' + userInput);
                console.log('Date: ' + userDay);
                document.getElementById('results-search').style.display = 'inline';
                advanceCall(userCat, userInput);
            } else {
                numberOfEvents = Math.floor(20 * Math.random());
                console.log('Events: ' + numberOfEvents);
                console.log('userCat: ' + userCat);
                console.log('userInput: ' + userInput);
                console.log('Date: ' + userDay);
                if (numberOfEvents < 1) {
                    alert("There are no events in your with those parameters currently");
                } else {
                    document.getElementById('results-search').style.display = 'inline';
                    advanceCallT(userCat, userInput, userDay);
                }
            }
        }
    }
}

// search by artist, date, and city
function advanceCall(event, space) {
    const citySpace = space;
    const searchedfor = event;
    console.log(numberOfEvents);
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + searchedfor + "&city=" + citySpace + "&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw",
        async: true,
        data: {size: numberOfEvents},
        dataType: "json",
        success: function (data) {
            const results = data._embedded.events;
            const size = data.size;
            console.log(data);
            $('#numRes').empty();
            $('#results-search').empty();
            $.each(data._embedded.events, function (i, event) {
                    count++;
                    let eventTy = event.classifications[0].genre.name;
                    let eTitle = event.name;
                    let where = event._embedded.venues[0].address.line1 + ", " + event._embedded.venues[0].city.name + ", " + event._embedded.venues[0].country.name;
                    let image = event.images[1].url;
                    let local = event._embedded.venues[0].name;
                    let time = event.dates.start.localTime;
                    let day = event.dates.start.localDate;
                    let tickets = event.url;
                    let provider = event.promoters.name;

                    console.log("Event Type: " + eventTy);
                    console.log("Event Title: " + eTitle);
                    console.log("Event image: " + image);
                    console.log("Event Local: " + local);
                    console.log("Event where: " + where);
                    console.log("Event time: " + time);
                    console.log("Event day: " + day);
                    console.log("Event tickets: " + tickets);
                    if (eventTy === "Undefined") {
                        eventTy = event.classifications[0].segment.name;
                    }
                    if (provider === "Undefined") {
                        provider = "Venue Promotion";
                    }
                    //'<h3>Number of listings: '+numberOfEvents+'</h3>'+

                    $('#results-search').append('' +
                        '<div class="padding-margin border shadow p-4 mb-4 rounded style-card">\n' +
                        '    <div class="container-xl padding overflow-hidden">\n' +
                        '        <div class="row">\n' +
                        '            <!--Text & Button-->\n' +
                        '            <div class="col-xl-6">\n' +
                        '                <h2 class="display-2">' + eTitle + '</h2>\n' +
                        '                <h2 class="lead">Location: ' + local + '<br>Addess: ' + where + '</h2>\n' +
                        '                <h2 class="lead">When: ' + day + ' @ ' + time + '</h2>\n' +
                        '                <h2 class="lead">Buy here: <a href=' + tickets + '> Tickets</a></h2>\n' +
                        '                <p class="lead">' + eventTy + ' brought to you by : ' + provider + '</p>\n' +
                        '            </div>\n' +
                        '\n' +
                        '            <!--Image-->\n' +
                        '            <div class="col-xl-6">\n' +
                        '                 <img src="' + image + '"\n' +
                        '                     class="img-fluid image-style" alt="Pic">\n' +
                        '                        </div>\n');
                }
            );
            $('#numRes').append('<h3>Number of listings: ' + count + '</h3>');
        },
        error: function (request, status, errorThrown) {
            alert("Error: " + status);
            console.log(errorThrown);
            //keep handeling errors
        }

    }); //AJAX Close


}

function advanceCallT(event, space, time) {
    const eventDay = time;
    const citySpace = space;
    const searchedfor = event;
    console.log(numberOfEvents);
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + searchedfor + "&city=" + citySpace + "&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw",
        async: true,
        dataType: "json",
        success: function (data) {
            const results = data._embedded.events;
            console.log(data);
            $('#numRes').empty();
            $('#results-search').empty();
            $.each(data._embedded.events, function (i, event) {
                    var eventTy = "$ Sponsorship : Honey! ";
                    var eTitle = "Event";
                    var where = "123 Main Street, Na 01234";
                    var image = "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg";
                    var local = "Center Square";
                    var time = "20:00:00";
                    var day = "2023-11-12";
                    var tickets = "https://www.google.com/";
                    var provider = "Venue Promotion";
                    try {
                        eventTy = event.classifications[0].genre.name;
                        eTitle = event.name;
                        where = event._embedded.venues[0].address.line1 + ", " + event._embedded.venues[0].city.name + ", " + event._embedded.venues[0].country.name;
                        image = event.images[1].url;
                        local = event._embedded.venues[0].name;
                        time = event.dates.start.localTime;
                        day = event.dates.start.localDate;
                        tickets = event.url;
                        provider = event.promoters.name;
                    } catch (e) {
                        console.log(e);
                    }

                    if (eventTy.length > 1) {
                        if (eTitle.length > 1) {
                            if (where.length > 1) {
                                if (image.length > 1) {
                                    if (local.length > 1) {
                                        if (time.length > 1) {
                                            if (day.length > 1) {
                                                if (tickets.length > 1) {
                                                    if (provider.length > 1) {

                                                    } else {
                                                        provider = "Venue Promotion";
                                                    }
                                                } else {
                                                    tickets = "https://www.google.com/";
                                                }
                                            } else {
                                                day = "2023-11-12";
                                            }
                                        } else {
                                            time = "20:00:00";
                                        }
                                    } else {
                                        local = "Center Square";
                                    }
                                } else {
                                    image = "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg";
                                }
                            } else {
                                where = "123 Main Street, Na 01234";
                            }
                        } else {
                            eTitle = "Event";
                        }
                    } else {
                        eventTy = "$ Sponsorship : Honey! ";
                    }

                    console.log("Event Type: " + eventTy);
                    console.log("Event Title: " + eTitle);
                    console.log("Event image: " + image);
                    console.log("Event Local: " + local);
                    console.log("Event where: " + where);
                    console.log("Event time: " + time);
                    console.log("Event day: " + day);
                    console.log("Event tickets: " + tickets);
                    if (eventTy === "Undefined") {
                        eventTy = event.classifications[0].segment.name;
                    }
                    if (provider === "Undefined" || provider === null) {
                        provider = "Venue Promotion";
                    }
                    if (day === eventDay) {
                        count++;
                        $('#results-search').append('' +
                            '<div class="padding-margin border shadow p-4 mb-4 rounded style-card">\n' +
                            '    <div class="container-xl padding overflow-hidden">\n' +
                            '        <div class="row">\n' +
                            '            <!--Text & Button-->\n' +
                            '            <div class="col-xl-6">\n' +
                            '                <h2 class="display-2">' + eTitle + '</h2>\n' +
                            '                <h2 class="lead">Location: ' + local + '<br>Addess: ' + where + '</h2>\n' +
                            '                <h2 class="lead">When: ' + day + ' @ ' + time + '</h2>\n' +
                            '                <h2 class="lead">Buy here: <a href=' + tickets + '> Tickets</a></h2>\n' +
                            '                <p class="lead">' + eventTy + ' brought to you by : ' + provider + '</p>\n' +
                            '            </div>\n' +
                            '\n' +
                            '            <!--Image-->\n' +
                            '            <div class="col-xl-6">\n' +
                            '                 <img src="' + image + '"\n' +
                            '                     class="img-fluid image-style" alt="Pic">\n' +
                            '                        </div>\n');
                    } else {

                    }
                    //'<h3>Number of listings: '+numberOfEvents+'</h3>'+


                }
            );
            $('#numRes').empty();
            $('#numRes').append('<h3>Number of listings: ' + count + '</h3>');
        },
        error: function (request, status, errorThrown) {
            alert("Error: " + status);
            console.log(errorThrown);
            //keep handeling errors
        }

    }); //AJAX Close


}

