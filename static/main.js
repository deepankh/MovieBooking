console.log("loaded Java Script!");

// commented section
// function selected(shows) {
//     var movie = document.getElementById('movie-id').value;
//     var selected_tickets = document.getElementById('number-id').value;
//     var selected_timing = document.getElementById('timing-id').value;
//     var obj = shows;
//     // alert(show_details);
//     console.log(show_details);
//     alert(shows);
//     // var temp = show_details.replace(/&#39;/g, "\"");
//     var available = obj[movie];
//     alert(available);
//     if (selected_timing == 'evening') {
//         if (available[0] >= selected_tickets) {
//             // console.log(available[0]);
//             return true;
//         }
//         else {
//             alert("not enough tickets for evening show the number available are : " + available[0]);
//             // console.log(available[0]);
//            return false;
//         }
//     }
//     else {
//         if (available[1] >= selected_tickets) {
//             // console.log(available[1]);
//             return true;
//         }
//         else {
//             alert("not enough tickets for night show the number available are : " + available[1]);
//             // console.log(available[1]);
//            return false;
//         }

//     }
// }


//function to populate the number of tickets  option
function populate(shows) {
//select the show details
  var movie = document.getElementById('movie-id').value;
  var selected_timing = document.getElementById('timing-id').value;
  var tickets = document.getElementById('number-id');
//  get the show details from the server
  var obj = shows;
  var available = obj[movie];
  console.log(available[0], typeof available[0]);
//  check for the timing and the available tickets
  tickets.innerHTML = '';
  if (selected_timing == "evening") {
    var n = 0;
  }
  else if (selected_timing == "night") {
    var n = 1;
  }

  if (available[n] >= 10) {
    var value = 10;
  }
  else {
    var value = available[n];
  }
//  populate the select tag on number-id
  for (var opt = 1; opt <= value; opt++) {
    var pair = [opt, opt];
    var newOption = document.createElement("option");
    newOption.value = pair[0];
    newOption.innerHTML = pair[1];
    tickets.options.add(newOption);
  }
}

//function to display the image of the movie selected
function diplayImage() {

  var movie_id = document.getElementById('movie-id').value;
  document.getElementById('imageToBeDisplayed').src = "/stylesheets/" + movie_id + ".jpg";

}


//AJAX call for populate function
function handleChange(e) {
//to tell the js that it is a ajax call
  $.ajax('/', {
    type: 'GET',
    data: {
      format: 'json'
    },
    success: populate
  });
}
//function to detect changes in the system
$(document).ready(function () {
  $('#timing-id').on('change', handleChange);

});