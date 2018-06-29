console.log("loaded Java Script!");

//function to populate the number of tickets  option

document.getElementById('modalBtn').addEventListener('click', handleChange);

//AJAX call for populate function
function handleChange(e) {
  //to tell the js that it is a ajax call
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {   // XMLHttpRequest.DONE == 4
      if (this.status == 200) {
        console.log("test successful ");
        populateMovies(this.responseText);
      }
      else if (this.status == 400) {
        alert('There was an error 400');
      }
      else {
        alert('something else other than 200 was returned');
      }
    }
  };

  xmlhttp.open("get", "/ticketBooking", true);
  xmlhttp.send();
}

function populateMovies(shows) {
  var movie = document.getElementById('movie-id');
  var obj = JSON.parse(shows);
  var movieNames = Object.keys(obj);
  console.log(movieNames);
  movie.innerHTML = '';
  for (var opt = 0; opt < movieNames.length; opt++) {
    
    var newOption = document.createElement("option");
    newOption.value = movieNames[opt]
    newOption.innerHTML = movieNames[opt]
    movie.options.add(newOption);
  }
}

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

// The action which will take when submit button is clicked 
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', booktickets);
// To book the tickets 
function booktickets() {
  // Get the movie details
  var movieid = document.getElementById('movie-id').value;
  var timingid = document.getElementById('timing-id').value;
  var numberid = document.getElementById('number-id').value;
  var data = {
    "movieid": movieid,
    "timingid": timingid,
    "numberid": numberid
  }
  // create a xmlhttp request 
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4) {   // XMLHttpRequest.DONE == 4
      if (this.status == 200) {
        console.log(this.responseText);

      }
      else if (this.status == 404) {
        alert('There was an error 404');
      }
      else {
        alert('something else other than 200 was returned  ' + this.status);
      }
    }
  };

  xmlhttp.open("post", "/SummaryPage", true);
  // If needed we can use this fuction and update the data
  // xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.send(JSON.stringify(data));
}
//function to display the image of the movie selected
function diplayImage() {

  var movie_id = document.getElementById('movie-id').value;
  document.getElementById('imageToBeDisplayed').src = "/stylesheets/" + movie_id + ".jpg";

}