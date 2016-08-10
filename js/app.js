window.onload = function () {
    var outTransfer = document.getElementById('outTransfer');
    var outEvolve = document.getElementById('outEvolve');
    pidgyCalculator.init(outTransfer, outEvolve);

    document.getElementById('btnCalc').addEventListener('click', function() {
        var pidgies = document.getElementById('txtPidgies').value;
        var candies = document.getElementById('txtCandies').value;
        pidgyCalculator.calculate(pidgies, candies, true); //temp force 'true'
    });
}