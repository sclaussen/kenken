'use strict';


var _ = require('lodash');
var permutate = require('./permutate');



function solvedPuzzle(puzzle) {
    let cagesUnsolved = puzzle.cages.filter(cage => cage.solved === false);
    if (cagesUnsolved.length > 0) {
        return false;
    }
    return true;
}


function solvedCage(puzzle) {
    for (let cage of puzzle.cages.filter(c => c.solved === false)) {
        let solved = true;
        for (let cellName of cage.cells) {
            let cell = puzzle.cells.filter(c => c.name === cellName)[0];
            if (cell.solved === false) {
                solved = false;
                break;
            }
        }

        if (solved === true) {
            cage.solved = true;
            return cage.name;
        }
    }

    return null;
}


function onlyPossibility(puzzle) {
    let cells = puzzle.cells.filter(c => c.solved === false && c.possibleSolutions.length === 1)
    if (cells.length === 0) {
        return;
    }
    let cell = cells[0];

    solve(puzzle, cell, cell.possibleSolutions[0]);
    return cell.name + ' -> ' + cell.possibleSolutions[0];
}


function rowUnique(puzzle) {
    for (let y = 1; y < puzzle.size; y++) {
        let cells = puzzle.cells.filter(cell => cell.solved === false && cell.y === y);

        for (let value = 1; value <= puzzle.size; value++) {

            let uniqueCell;
            let count = 0;
            for (let cell of cells) {
                if (cell.possibleSolutions && cell.possibleSolutions.includes(value)) {
                    uniqueCell = cell;
                    count++;
                }
            }

            if (count === 1) {
                solve(puzzle, uniqueCell, value);
                return uniqueCell.name + ' -> ' + value;
            }
        }
    }

    return;
}


function columnUnique(puzzle) {
    for (let x = 1; x < puzzle.size; x++) {
        let cells = puzzle.cells.filter(cell => cell.solved === false && cell.x === x);

        for (let value = 1; value <= puzzle.size; value++) {

            let uniqueCell;
            let count = 0;
            for (let cell of cells) {
                if (cell.possibleSolutions && cell.possibleSolutions.includes(value)) {
                    uniqueCell = cell;
                    count++;
                }
            }

            if (count === 1) {
                solve(puzzle, uniqueCell, value);
                return uniqueCell.name + ' -> ' + value;
            }
        }
    }

    return;
}


// Here's the algorithm
// - For every unsolved cage
// - Go through every cell, one at a time
// - For each cell, go through each number possibleSolution in the cell, one at a time
// - Get the the cage's possibleSolutionSets that contain the possibleSolution
// - Get the "other" cells that are part of the cage, and the "other" possibleSolutions in the possibleSolutionSet
// - Permutate all the possible indexes for the other possibleSolutions wrt the other cells, and see if atleast one of those are fully in the other cells
// - If so, all good, if not, remove the number possibleSolution from the current cell, and move on
function revalidatePossibleSolutions(puzzle) {

    // Go through every single unsolved cage ...
    for (let cage of puzzle.cages.filter(cage => cage.solved === false)) {


        // Generate the indexSet
        let indexPermutations = [];
        indexPermutations.length = 0;
        for (let i = 0; i < cage.size - 1; i++) {
            indexPermutations.push(i);
        }
        if (indexPermutations.length > 1) {
            // console.log(indexPermutations);
            indexPermutations = permutate(indexPermutations);
            // console.log(indexPermutations);
        } else {
            indexPermutations = [ indexPermutations ];
        }


        // Go through every single cell in the cage (solved or not) ...
        for (let cellName of cage.cells) {


            // Get the other cells
            let cells = puzzle.cells.filter(cell => cell.cage === cage.name && cell.name !== cellName);


            // Go through every single number possibleSolution in the current cell ...
            let cell = puzzle.cells.filter(cell => cell.cage === cage.name && cell.name === cellName)[0];
            for (let number of cell.possibleSolutions) {


                // Get all the cage solutions that contain this
                // number, then, remove this number from those sets
                // since the algorithm will be searching for the
                // remaining numbers of the solution in the other
                // cells.
                let sets = JSON.parse(JSON.stringify(_.filter(cage.possibleSolutionSets, a => a.includes(number))));
                for (let set of sets) {
                    _.pullAt(set, _.indexOf(set, number));
                    if (set.includes('R')) {
                        _.pullAt(set, _.indexOf(set, 'R'));
                    }
                }


                if (validatePossibleNumberInCell(cell, number, cells, sets, indexPermutations) === false) {
                    cell.possibleSolutions = cell.possibleSolutions.filter(n => n !== number);
                    return cell.name + ' -> ' + number + ' removed';
                }
            }
        }
    }
}


function validatePossibleNumberInCell(cell, number, cells, sets, indexPermutations) {

    // console.log();
    // console.log(cell.name + '->' + number + '  part of a valid solution set?');

    let valid;
    for (let set of sets) {

        valid = true;
        for (let indexPermutation of indexPermutations) {
            // console.log('  set ' + JSON.stringify(set.concat(number)) + ' (without ' + JSON.stringify(set) + ') permutation ' + JSON.stringify(indexPermutation));

            // Determine if there's a valid solution by evaluating one
            // index permutation of the possible solution against the
            // other cells in the cage.
            let cellNumber = 0;
            for (let index of indexPermutation) {


                if (cells[cellNumber].possibleSolutions.includes(set[index])) {
                    // console.log('    ' + cells[cellNumber].name + '->' + set[index] + ' succeeded');
                    cellNumber++;
                    continue;
                }

                // This permutation of the solution set didn't work, try another ...
                // console.log('    ' + cells[cellNumber].name + '->' + set[index] + ' FAILED');
                valid = false;
                break;
            }

            // All the various permutations of this solution set
            // failed to validate, so that set is no longer valid, so
            // continue on to try the next possible solution set that
            // contains the number
            if (!valid) {
                continue;
            }

            return true;
        }
    }

    return false;
}


// TODO: Implement!!!
function minimalPipeRow(puzzle) {
    for (let cage of puzzle.cages) {
        switch (cage.type) {
        case '2-pipe':
        case '3-pipe':
        case '4-pipe':
        }
    }
}


// TODO: Implement!!!
function minimalPipeColumn(puzzle) {
    for (let cage of puzzle.cages) {
        switch (cage.type) {
        case '2-pipe-r1':
        case '3-pipe-r1':
        case '4-pipe-r1':
        }
    }
}


function solve(puzzle, cell, solution) {
    cell.solved = true;
    cell.solution = solution;
    cell.possibleSolutions = [ solution ];

    // Remove solution from y column
    let cells = puzzle.cells.filter(c => c.solved === false && c.y === cell.y && c.name !== cell.name);
    for (let cell of cells) {
        cell.possibleSolutions = cell.possibleSolutions.filter(n => n !== solution)
    }

    // Remove solution from x row
    cells = puzzle.cells.filter(c => c.solved === false && c.x === cell.x && c.name !== cell.name);
    for (let cell of cells) {
        cell.possibleSolutions = cell.possibleSolutions.filter(n => n !== solution)
    }
}


module.exports.solvedPuzzle = solvedPuzzle;
module.exports.solvedCage = solvedCage;
module.exports.onlyPossibility = onlyPossibility;
module.exports.rowUnique = rowUnique;
module.exports.columnUnique = columnUnique;
module.exports.revalidatePossibleSolutions = revalidatePossibleSolutions;
