var max = 30;
var numberOfEvents;

function getEvent() {
    $('#results-search').empty();

    //console.log('Perception check 5');//entered the function
    //get the user input
    let userInput = $('input[name=searchbar]').val();
    let userCat = $('select[name=pick_me]').val();
    if (userInput.length === 0) {
        console.log('Deception check 10');
        alert("You must enter something in the search bar");
    } else {
        if (userCat.length === 0) {
            console.log('Deception check 13');
        } else {

            numberOfEvents = 2;//Math.floor(30 * Math.random());
            console.log('Events: ' + numberOfEvents);
            console.log('userCat: ' + userCat);
            console.log('userInput: ' + userInput);
            const API_KEY = "HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw";

            if (numberOfEvents < 1) {
                console.log("There are no events in your with those parameters currently");
            } else {
                document.getElementById('results-search').style.display = 'flex';

                if (userCat === "all") {
                    allCall(userInput);
                } else if (userCat === "art") {
                    console.log("ART");
                } else if (userCat === "city") {
                    console.log("CITY");
                } else if (userCat === "eve") {
                    console.log("EVE");
                } else if (userCat === "gen") {
                    //music = KZFzniwnSyZfZ7v7nJ
                    //url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw",
                    //sports =
                    console.log("GEN");
                } else {
                    console.log("Perception check: ##");
                }
            }
        }
    }
}

function allCall(event) {
    const searchedfor = event;
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=HQTzfG9hTjizZaCixmG1aPYVQkzY9fWw",
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            const results = json._embedded.events;

            $('#results-search').empty();
            $.each();
            console.log("hello");
            const eventTy = results[0].classifications[0].genre.name;
            const eTitle = results[0].name;
            const where = results[0]._embedded.venues[0].address.line1;
            const image = results[0].images[1].url;
            const local = results[0]._embedded.venues[0].name;
            const time = results[0].dates.start.localTime;
            const day = results[0].dates.start.localDate;
            const tickets = results[0].url;
            const provider = results[0].classifications[0].subGenre.name;

            console.log("Event Type: " + eventTy);
            console.log("Event Title: " + eTitle);
            console.log("Event image: " + image);
            console.log("Event Local: " + local);
            console.log("Event where: " + where);
            console.log("Event time: " + time);
            console.log("Event day: " + day);
            console.log("Event tickets: " + tickets);

            $('#results-search').append('' +
                '<div class="padding-margin border shadow p-4 mb-4 rounded style_card">\n' +
                '    <div class="container-xl padding overflow-hidden">\n' +
                '        <div class="row">\n' +
                '            <!--Text & Button-->\n' +
                '            <div class="col-xl-6">\n' +
                '                <h2 class="display-2">' + eTitle + '</h2>\n' +
                '                <h2 class="lead">Location: ' + local + '<br>Addess: ' + where + '</h2>\n' +
                '                <h2 class="lead">When: ' + day + ' @ ' + time + '</h2>\n' +
                '                <h2 class="lead">Buy here: <a href=' + tickets + '>' + tickets + '</a></h2>\n' +
                '                <p class="lead">' + eventTy + ' brought to you by : ' + provider + '</p>\n' +
                '            </div>\n' +
                '\n' +
                '            <!--Image-->\n' +
                '            <div class="col-xl-6">\n' +
                '                 <img src="' + image + '"\n' +
                '                     class="img-fluid" alt="First Slide">\n' +
                '                        </div>\n');
        }
    }) //AJAX Close


}


