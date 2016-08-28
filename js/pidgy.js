var pidgyCalculator = function() {
    var pokemon,
        candy,
        transferBonus,
        transferCnt,
        evolvedCnt,
        evolutionCost = 12, // constant

        reset = function() {
            pokemon = 0;
            candy = 0;
            transferBonus = 0;
            transferCnt = 0;
            evolvedCnt = 0;
        },

        calculate = function(pokemonCnt, candyCnt, transferAfter) {
            reset();
            pokemon = Number(pokemonCnt);
            candy = Number(candyCnt);
            transferBonus = transferAfter | 0; // cast bool as 0 or 1

            while (pokemon >= 1)
            {
                if (candy >= evolutionCost) {
                    evolve();
                } else if (candy + pokemon > evolutionCost) {
                    transfer();
                } else {
                    transferCnt += pokemon;
                    candy += pokemon;
                    pokemon = 0;
                }
            }
        },

        evolve = function() {
            pokemon--;
            // cost 12 for candy, but get 1 candy on evolve, 
            // plus bonus if transferred
            candy -= evolutionCost - 1 - transferBonus;
            evolvedCnt++;
        },

        transfer = function() {
            pokemon--;
            transferCnt++;
            candy++;
        },

        getTransferFirst = function() { return transferCnt; },
        getEvolved = function() { return evolvedCnt; },
        getCandyLeft = function() { return candy; };

        return {
            calculate: calculate,
            getTransferFirst: getTransferFirst,
            getEvolved: getEvolved,
            getCandyLeft: getCandyLeft
        };
}();