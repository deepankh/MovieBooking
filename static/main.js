console.log("loaded Java Script!");

//function to populate the number of tickets  option

document.getElementById('timing-id').addEventListener('change',handleChange);

//AJAX call for populate function
function handleChange(e) {
  //to tell the js that it is a ajax call
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
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

  xmlhttp.open("get", "/ticketBooking", true);
  xmlhttp.send();
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

// to prevent the default action
function prevent() {
  document.getElementById("TicketBookingForm").addEventListener("click", function (event)
 {
    event.preventDefault();
  });
}

// the submit button
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click',booktickets);

function booktickets(){
  var movieid = document.getElementById('movie-id').value;
  var timingid = document.getElementById('timing-id').value;
  var numberid = document.getElementById('number-id').value;
  data={
    "movieid":movieid,
    "timingid":timingid,
    "numberid":numberid
  }
  console.log("test");
  console.log(data);
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
        alert('something else other than 200 was returned  '+this.status);
      }
    }
  };

  xmlhttp.open("post", "/SummaryPage", true);
  xmlhttp.send(JSON.stringify(data));
}
//function to display the image of the movie selected
function diplayImage() {

  var movie_id = document.getElementById('movie-id').value;
  document.getElementById('imageToBeDisplayed').src = "/stylesheets/" + movie_id + ".jpg";

}

