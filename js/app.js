window.onload = function () {
    // Get document elements
    var outTransfer = document.getElementById('outTransfer');
    var outEvolve = document.getElementById('outEvolve');

    // Initialize calculator
    pidgyCalculator.init(outTransfer, outEvolve);

    // pokeball click event
    document.getElementById('btnCalc')
        .addEventListener('click', function(event) {
            event.preventDefault();
            var pidgies = document.getElementById('txtPidgies').value;
            var candies = document.getElementById('txtCandies').value;
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