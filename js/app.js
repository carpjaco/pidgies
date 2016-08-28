window.onload = function () {
    var outputElement = document.getElementById('pidgyOutput');
    // Initialize calculator
    pidgyCalculator.init(outputElement);

    // pokeball click event
    document.getElementById('btnCalc')
        .addEventListener('click', function(event) {
            event.preventDefault();
            var pidgies = document.getElementById('txtPidgies').value,
                candies = document.getElementById('txtCandies').value,
                transfer = document.getElementById('chkTransfer').checked;

            clearUlChildren(outputElement);
            // Call calculator - forcing true for transfering pidgeotto
            pidgyCalculator.calculate(pidgies, candies, transfer); 

            // Call timer to make the ball spin
            setSpinTimer(this);
        });

    // Clear text in input boxes when clicked on
    var inputs = document.getElementsByTagName('input');

    for (var i =0; i < inputs.length; i++) {
        // On focus, empty input box
        inputs[i].addEventListener('focus', function() {
            this.value = "";
        });

        // When losing focus and it's empty, set it back to 0
        inputs[i].addEventListener('blur', function() {
            if (!this.value || this.value < 0) this.value = 0;
        });
    }
}

// Set CSS on image to spin and timer to turn CSS off
function setSpinTimer(element) {
    element.className = "spin-image";
    setTimeout(function() {
        element.className = "";    
    }, 1000);
}

// Clear a UL list of all children
function clearUlChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}