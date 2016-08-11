var pidgyCalculator = function() {
    var outputCtrl,
        pokemon,
        candy,
        transferBonus,
        transferCnt,
        evolvedCnt,
        evolutionCost,

        init = function(element) {
            outputCtrl = element,
            evolutionCost = 12; // constant
        },

        reset = function() {
            pokemon = 0;
            candy = 0;
            transferBonus = 0;
            transferCnt = 0;
            evolvedCnt = 0;
        }

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
                    trasnfer();
                } else {
                    break;
                }
            }

            transferCnt = pokemon;
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
            // display pidgies to transfer before starting if any
            var txtOutput = "Before using your lucky egg, transfer ";
            if (transferCnt > 0) {
                txtOutput += transferCnt + (transferCnt > 1 ? " pidgies." : " pidgy.");
                outputCtrl.appendChild(createLi(txtOutput));
            }

            // display number of pidgies to evolve
            if (evolvedCnt < 1) {
                txtOutput = "No pidgies can be evolved.";
            } else {
                txtOutput = "Evolve " + evolvedCnt + (evolvedCnt > 1 ? " pidgies." : " pidgy.");
            }
            outputCtrl.appendChild(createLi(txtOutput));

            // display remaining candies if any
            var remaining = Number(candy) + Number(pokemon);
            if (remaining >= 1) {
                txtOutput = "You will have " + 
                    remaining + 
                    (remaining > 1 ? " candies left." : " candy left.");
                outputCtrl.appendChild(createLi(txtOutput));
            } 
        },

        createLi = function(text) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(text));
            return li;
        };

        return {
            init: init,
            calculate: calculate
        };
}();