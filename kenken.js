'use strict';


var _ = require('lodash');
var render = require('./render');
var getPossibleSolutions = require('./possibleSolutions');
var puzzles = require('./puzzles');
var strategies = require('./strategies');



const baseCellWidth = 7;



main(process.argv);



function main(args) {
    for (let puzzle of puzzles) {

        initialize(puzzle);
        generateCells(puzzle);
        render(puzzle);

        let response;
        while (true) {

            if (response = strategies.solvedPuzzle(puzzle)) {
                console.log();
                console.log('Solved!');
                process.exit(1);
            }

            if (response = strategies.solvedCage(puzzle)) {
                console.log();
                console.log('solvedCage: ' + response);
                render(puzzle);
                continue;
            }

            if (response = strategies.onlyPossibility(puzzle)) {
                console.log();
                console.log('onlyPossibility: ' + response);
                render(puzzle);
                continue;
            }

            if (response = strategies.rowUnique(puzzle)) {
                console.log();
                console.log('rowUnique: ' + response);
                render(puzzle);
                continue;
            }

            if (response = strategies.columnUnique(puzzle)) {
                console.log();
                console.log('columnUnique: ' + response);
                render(puzzle);
                continue;
            }

            if (response = strategies.revalidatePossibleSolutions(puzzle)) {
                console.log();
                console.log('revalidatePossibleSolutions: ' + response);
                render(puzzle);
                continue;
            }

            console.log();
            console.log('Unsolved, no more known strategies!');
            process.exit(1);
        }

        // console.log(JSON.stringify(puzzle.cages, null, 4));
    }
}


function initialize(puzzle) {
    puzzle.cells = [];
    puzzle.cellWidth = baseCellWidth + puzzle.size;
    for (let cage of puzzle.cages) {
        cage.name = cage.x + ',' + cage.y;
        cage.solved = false;
        cage.cells = [];
    }
}


function generateCells(puzzle) {
    for (let cage of puzzle.cages) {

        switch (cage.type) {
        case '1':
            generateCells1(puzzle, cage);
            break;
        case '2-pipe':
            generateCells2Pipe(puzzle, cage);
            break;
        case '2-pipe-r1':
            generateCells2PipeR1(puzzle, cage);
            break;
        case '3-pipe':
            generateCells3Pipe(puzzle, cage);
            break;
        case '3-pipe-r1':
            generateCells3PipeR1(puzzle, cage);
            break;
        case '3-corner':
            generateCells3Corner(puzzle, cage);
            break;
        case '3-corner-r1':
            generateCells3CornerR1(puzzle, cage);
            break;
        case '3-corner-r2':
            generateCells3CornerR2(puzzle, cage);
            break;
        case '3-corner-r3':
            generateCells3CornerR3(puzzle, cage);
            break;
        case '4-square':
            generateCells4Square(puzzle, cage);
            break;
        case '4-snake':
            generateCells4Snake(puzzle, cage);
            break;
        case '4-snake-r1':
            generateCells4SnakeR1(puzzle, cage);
            break;
        case '4-snake-r2':
            generateCells4SnakeR2(puzzle, cage);
            break;
        case '4-snake-r3':
            generateCells4SnakeR3(puzzle, cage);
            break;
        case '4-pipe':
            generateCells4Pipe(puzzle, cage);
            break;
        case '4-pipe-r1':
            generateCells4PipeR1(puzzle, cage);
            break;
        case '4-l':
            generateCells4L(puzzle, cage);
            break;
        case '4-l-r1':
            generateCells4LR1(puzzle, cage);
            break;
        case '4-l-r2':
            generateCells4LR2(puzzle, cage);
            break;
        case '4-l-r3':
            generateCells4LR3(puzzle, cage);
            break;
        case '4-l-backwards':
            generateCells4LBackwards(puzzle, cage);
            break;
        case '4-l-backwards-r1':
            generateCells4LBackwardsR1(puzzle, cage);
            break;
        case '4-l-backwards-r2':
            generateCells4LBackwardsR2(puzzle, cage);
            break;
        case '4-l-backwards-r3':
            generateCells4LBackwardsR3(puzzle, cage);
            break;
        case '4-t':
            generateCells4T(puzzle, cage);
            break;
        case '4-t-r1':
            generateCells4TR1(puzzle, cage);
            break;
        case '4-t-r2':
            generateCells4TR2(puzzle, cage);
            break;
        case '4-t-r3':
            generateCells4TR3(puzzle, cage);
            break;
        case '5-corner':
            generateCells5Corner(puzzle, cage);
            break;
        case '5-corner-r1':
            generateCells5CornerR1(puzzle, cage);
            break;
        case '5-corner-r2':
            generateCells5CornerR2(puzzle, cage);
            break;
        case '5-corner-r3':
            generateCells5CornerR3(puzzle, cage);
            break;
        default:
            console.log('ERROR: Unrecognized cage type: ' + cage.type);
        }
    }

    // Sorting the cells by x then y
    puzzle.cells = _.sortBy(puzzle.cells, [ 'x', 'y' ]);
}


function generateCells1(puzzle, cage) {
    cage.size = 1;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, 1, cage.op, 0);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
}


function generateCells2Pipe(puzzle, cage) {
    cage.size = 2;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 0);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
}


function generateCells2PipeR1(puzzle, cage) {
    cage.size = 2;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 0);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells3Pipe(puzzle, cage) {
    cage.size = 3;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 0);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y, cage.possibleSolutionSets);
}


function generateCells3PipeR1(puzzle, cage) {
    cage.size = 3;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 0);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells3Corner(puzzle, cage) {
    cage.size = 3;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells3CornerR1(puzzle, cage) {
    cage.size = 3;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells3CornerR2(puzzle, cage) {
    cage.size = 3;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells3CornerR3(puzzle, cage) {
    cage.size = 3;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4Square(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4Snake(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4SnakeR1(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 2, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells4SnakeR2(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells4SnakeR3(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4Pipe(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 0);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 3, cage.y, cage.possibleSolutionSets);
}


function generateCells4PipeR1(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 0);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 3, cage.possibleSolutionSets);
}


function generateCells4L(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells4LR1(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 2, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4LR2(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells4LR3(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4LBackwards(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells4LBackwardsR1(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4LBackwardsR2(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells4LBackwardsR3(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4T(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4TR1(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells4TR2(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 1, cage.possibleSolutionSets);
}


function generateCells4TR3(puzzle, cage) {
    cage.size = 4;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells5Corner(puzzle, cage) {
    cage.size = 5;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y + 2, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells5CornerR1(puzzle, cage) {
    cage.size = 5;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 1, cage.y + 2, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x - 2, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells5CornerR2(puzzle, cage) {
    cage.size = 5;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y + 2, cage.possibleSolutionSets);
}


function generateCells5CornerR3(puzzle, cage) {
    cage.size = 5;
    cage.possibleSolutionSets = getPossibleSolutions(puzzle.size, cage.size, cage.op, 1);
    addCell(puzzle, cage, cage.x, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 1, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x + 2, cage.y, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 1, cage.possibleSolutionSets);
    addCell(puzzle, cage, cage.x, cage.y + 2, cage.possibleSolutionSets);
}


function addCell(puzzle, cage, x, y, possibleSolutionSets) {
    let cellName = x + ',' + y;
    cage.cells.push(cellName);
    puzzle.cells.push({
        name: cellName,
        x, x,
        y: y,
        op: cage.op,
        cage: cage.name,
        solved: false,
        solution: null,
        possibleSolutions: (_.uniq(_.flatten(possibleSolutionSets))).filter(value => value !== 'R')
    });
}
