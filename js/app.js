window.onload = function () {
    var outputElement = document.getElementById('pidgyOutput');
    // Initialize calculator
    pidgyCalculator.init(outputElement);

    // pokeball click event
    document.getElementById('btnCalc')
        .addEventListener('click', function(event) {
            event.preventDefault();
            var pidgies = document.getElementById('txtPidgies').value,
                candies = document.getElementById('txtCandies').value;

            clearUlChildren(outputElement);
            // Call calculator - forcing true for transfering pidgeotto
            pidgyCalculator.calculate(pidgies, candies, true); 

            // Call timer to make the ball spin
            setSpinTimer(this);
        });
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