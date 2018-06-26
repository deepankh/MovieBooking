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
  var movie = document.getElementById('movie-id').value;
  var selected_timing = document.getElementById('timing-id').value;
  var tickets = document.getElementById('number-id');
  var obj = JSON.parse(shows);
  var available = obj[movie.toString()];
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
var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {   // XMLHttpRequest.DONE == 4
           if (this.status == 200) {
             console.log("test successful ");
                populate(this.responseText);
           }
           else if (this.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("get", "/test", true);
    xmlhttp.send();
}
//function to detect changes in the system
$(document).ready(function () {
  $('#timing-id').on('change', handleChange);

});
