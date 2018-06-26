//Get modal element
var modal = document.getElementById('simpleModal');
// get the modal button
var modalBtn = document.getElementById('modalBtn');
// get the close button
var closeBtn = document.getElementsByClassName("closeBtn")[0];
// listen for open click
modalBtn.addEventListener('click', openModal);
// Second modal
var modalTwo = document.getElementById('secondModal');

function openModal() {
    modal.style.display = 'block';
}
// listen for close click

closeBtn.addEventListener('click', closeModal);

function closeModal() {
    document.getElementById('TicketBookingForm').reset();
    modal.style.display = 'none';
}
// listen for outside click
window.addEventListener('click', outsideClick)

function outsideClick(e) {
    if (e.target == modal) {
        document.getElementById('TicketBookingForm').reset();
        modal.style.display = 'none';
    }
}

var submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', secondModal);

function secondModal() {
    var movieid = document.getElementById('movie-id').value;
    var timingid = document.getElementById('timing-id').value;
    var numberid = document.getElementById('number-id').value;
    var modalId = document.getElementById('modalBody');
    if ((movieid == '') || (timingid == '') || (numberid == '')) {
        alert("check credentials");
    }
    else {

        closeModal();
        
        document.getElementById('selectedMovie').innerHTML =movieid;
        document.getElementById("selectedTiming").innerHTML=timingid;
        document.getElementById("selectedQuantity").innerHTML=numberid;
        
        modalTwo.style.display = "block";
        var closeBtnForSecondModal = document.getElementsByClassName("closeBtn")[1];
        var bookMoreTickets = document.getElementById('bookMoreTickets');
        bookMoreTickets.addEventListener('click',openBooking);
        closeBtnForSecondModal.addEventListener('click', function () {
            modalTwo.style.display = 'none';
        });

    }
}

function openBooking(){
    modalTwo.style.display="none";
    openModal();
}
