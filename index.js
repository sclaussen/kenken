'use strict';


var getPossibleSolutions = require('./possibleSolutions');


main(process.argv);


// node index puzzleSize cageSize cateTotalOperator duplicatesAllowed
function main(args) {
    let puzzleSize = parseInt(args[2]);
    let cageSize = parseInt(args[3]);
    let cageOperator = args[4];
    let duplicatesAllowed = 0;
    if (args.length === 6) {
        duplicatesAllowed = parseInt(args[5]);
    }

    let possibleSolutions = getPossibleSolutions(puzzleSize, cageSize, cageOperator, duplicatesAllowed);
    for (let possibleSolution of possibleSolutions) {
        for (let number of possibleSolution) {
            process.stdout.write(number + ' ');
        }
        console.log();
    }
}
