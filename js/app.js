window.onload = function () {
    var outputElement = document.getElementById('pidgyOutput');

    // Create event listener pokeball click
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
            setOutput(outputElement);
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

// Create output after calculating 
function setOutput(outputCtrl) {
    var transfer = pidgyCalculator.getTransferFirst(),
        evolved = pidgyCalculator.getEvolved(),
        candy = pidgyCalculator.getCandyLeft(),
        transferFirst = document.getElementById('chkTransfer').checked;

    // display pidgies to transfer before starting, if any
    var txtOutput = "Before starting, transfer ";
    if (transfer > 0) {
        txtOutput += transfer + (transfer > 1 ? " pidgies." : " pidgy.");
        outputCtrl.appendChild(createLi(txtOutput));
    }

    // display number of pidgies to evolve
    if (evolved < 1) {
        txtOutput = "No pidgies can be evolved.";
    } else {
        txtOutput = "Evolve " +
            (transferFirst > 0 ? "and transfer " : "") +
            evolved + (evolved > 1 ? " pidgies." : " pidgy.");
    }
    outputCtrl.appendChild(createLi(txtOutput));

    // display remaining candies if any
    if (candy >= 1) {
        txtOutput = "You will have " +
            candy +
            (candy > 1 ? " candies left." : " candy left.");
        outputCtrl.appendChild(createLi(txtOutput));
    } 
}

// Create Li element with the given text
function createLi(text) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(text));
    return li;
}