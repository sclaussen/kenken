'use strict';



function render(puzzle) {
    renderDashSeparator(puzzle);
    for (let y = 1; y <= puzzle.size; y++) {
        let cells = puzzle.cells.filter(c => c.y === y);
        renderOperatorLine(puzzle, cells);
        renderValueLine(puzzle, cells);
        renderPossibleSolutionsLine(puzzle, cells);
        renderDashSeparator(puzzle);
    }
}


function renderOperatorLine(puzzle, cells) {
    for (let cell of cells) {
        let post = puzzle.cellWidth - cell.op.length;
        process.stdout.write('|');
        let cage = puzzle.cages.filter(cage => cage.name === cell.cage)[0];
        if (cage.solved) {
            pad(cage.op.length);
        } else {
            process.stdout.write(cage.op);
        }
        pad(post);
    }
    console.log('|');
}


function renderValueLine(puzzle, cells) {
    let spaces = puzzle.cellWidth - 1;
    let pre = Math.round(spaces / 2);
    let post = spaces- pre;
    for (let cell of cells) {
        process.stdout.write('|');
        pad(pre);
        if (cell.solution) {
            process.stdout.write('' + cell.solution);
        } else {
            process.stdout.write(' ');
        }
        pad(post);
    }
    console.log('|');
}


function renderPossibleSolutionsLine(puzzle, cells) {
    let spaces = puzzle.cellWidth - puzzle.size - 2;
    let pre = Math.round(spaces / 2);
    let post = spaces - pre;
    for (let cell of cells) {
        process.stdout.write('|');
        pad(pre);
        if (cell.solved === false) {
            process.stdout.write('(');
            for (let i = 1; i <= puzzle.size; i++) {
                if (cell.possibleSolutions && cell.possibleSolutions.includes(i)) {
                    process.stdout.write(i.toString());
                } else {
                    process.stdout.write(' ');
                }
            }
            process.stdout.write(')');
        } else {
            pad(puzzle.size + 2);
        }
        pad(post);
    }
    console.log('|');
}


function renderDashSeparator(puzzle) {
    for (let i = 0; i < puzzle.size; i++) {
        process.stdout.write('+');
        pad(puzzle.cellWidth, '-');
    }
    console.log('+');
}


function pad(count, ch) {
    if (!ch) {
        ch = ' ';
    }
    for (let i = 0; i < count; i++) {
        process.stdout.write(ch);
    }
}


module.exports = render;
