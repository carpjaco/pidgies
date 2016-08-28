var pidgyCalculator = function() {
    var pokemon,
        candy,
        transferBonus,
        transferCnt,
        evolvedCnt,
        evolutionCost = 12, // constant

        initialize = function() {
            pokemon = 0;
            candy = 0;
            transferBonus = 0;
            transferCnt = 0;
            evolvedCnt = 0;
        },

        calculate = function(pokemonCnt, candyCnt, transferAfter) {
            initialize();
            pokemon = Number(pokemonCnt);
            candy = Number(candyCnt);
            transferBonus = transferAfter | 0; // cast bool as 0 or 1

            while (pokemon >= 1)
            {
                if (candy >= evolutionCost) {
                    evolve();
                } else {
                    transfer();
                } 
            }
        },

        evolve = function() {
            // Calc max evolution only if at least 1 possible
            var maxEvolves = candy >= evolutionCost 
                ? Math.floor(candy / (evolutionCost - 1)) 
                : 0;

            // Evolve max if any will remain
            if (pokemon >= maxEvolves) {
                pokemon -= maxEvolves;
                candy -= (evolutionCost - 1 - transferBonus) * maxEvolves;
                evolvedCnt += maxEvolves;
            // Evolve all pokemon if none will remain
            } else {
                candy -= (evolutionCost - 1 - transferBonus) * pokemon;
                evolvedCnt += pokemon;
                pokemon = 0;
            }
        },

        transfer = function() {
            var candyNeeded = evolutionCost - candy;

            // Transfer only as many as are needed
            if (candyNeeded < pokemon) {
                pokemon -= candyNeeded;
                candy += candyNeeded;
                transferCnt += candyNeeded;
            // Transfer all if there won't be enough
            } else {
                candy += pokemon;
                transferCnt += pokemon;
                pokemon = 0;
            }
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