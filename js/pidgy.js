var pidgyCalculator = function() {
    var outputCtrl,
        pokemon,
        candy,
        transferBonus,
        transferCnt,
        evolvedCnt,
        evolutionCost,
        outTransfer,
        outEvolve,

        init = function(transferCtrl, evolvedCtrl) {
            outTransfer = transferCtrl,
            outEvolve = evolvedCtrl,
            evolutionCost = 12;
            reset();
        },

        reset = function() {
            pokemon = 0;
            candy = 0;
            transferBonus = 0;
            transferCnt = 0;
            evolvedCnt = 0;
        }

        calculate = function(pokemonCnt, candyCnt, transferAfter) {
            pokemon = pokemonCnt;
            candy = candyCnt;
            transferBonus = transferAfter | 0; // cast bool as 0 or 1

            while (true) {
                if (pokemon >= 1) {
                    if (candy >= evolutionCost) {
                        evolve();
                    } else if (candy + pokemon > evolutionCost) {
                        transfer();
                        evolve();
                    } else {
                        transferCnt = pokemon;
                        break;
                    }
                } else {
                    break;
                }
            }
            setOutput();
        },

        evolve = function() {
            pokemon--;
            // cost 12 for candy, but get 1 candy on evolve, 
            // plus bonus if transferred
            candy -= 11 - transferBonus;
            evolvedCnt++;
        },

        transfer = function() {
            pokemon--;
            candy++;
        },

        setOutput = function() {
            outTransfer.innerHTML = "First transfer " + transferCnt + " pidgies.";
            outEvolve.innerHTML = "Then, evolve " + evolvedCnt + " pidgies.";
            reset();
        };

        return {
            init: init,
            calculate: calculate
        };
}();