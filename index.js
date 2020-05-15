'use strict';


main(process.argv);


// node index cellCount total operator duplicatesAllowed
function main(args) {
    let cellCount = parseInt(args[2]);
    let total = parseInt(args[3]);
    let operator = args[4];
    let duplicatesAllowed = 0;
    if (args.length === 6) {
        duplicatesAllowed = parseInt(args[5]);
    }

    kenken(cellCount, total, operator, duplicatesAllowed);
}


function kenken(cellCount, total, operator, duplicatesAllowed) {
    let solutions = [];

    for (let number1 = 6; number1 >= 1; number1--) {
        for (let number2 = number1; number2 >= 1; number2--) {

            if (cellCount === 2) {
                if (tryCombination2(number1, number2, operator) === total) {
                    solutions.push([ number1, number2 ]);
                }
                continue;
            }

            if (cellCount === 3) {
                for (let number3 = number2; number3 >= 1; number3--) {
                    if (tryCombination3(number1, number2, number3, operator) === total) {
                        solutions.push([ number1, number2, number3 ]);
                    }
                }
                continue;
            }

            if (cellCount === 4) {
                for (let number3 = number2; number3 >= 1; number3--) {
                    for (let number4 = number3; number4 >= 1; number4--) {
                        if (tryCombination4(number1, number2, number3, number4, operator) === total) {
                            solutions.push([ number1, number2, number3, number4 ]);
                        }
                    }
                }
                continue;
            }

            if (cellCount === 5) {
                for (let number3 = number2; number3 >= 1; number3--) {
                    for (let number4 = number3; number4 >= 1; number4--) {
                        for (let number5 = number4; number5 >= 1; number5--) {
                            if (tryCombination5(number1, number2, number3, number4, number5, operator) === total) {
                                solutions.push([ number1, number2, number3, number4, number5 ]);
                            }
                        }
                    }
                }
                continue;
            }
        }
    }

    solutions = removeInvalidSolutions(solutions, duplicatesAllowed);
    for (let solution of solutions) {
        for (let number of solution) {
            process.stdout.write(number + ' ');
        }
        console.log();
    }
}


function removeInvalidSolutions(solutions, duplicatesAllowed) {

    let validSolutions = [];
    for (let solution of solutions) {

        // Go through each number in the solution
        let valid = true;
        let hasDuplicates = false;
        for (let i = 0; i < solution.length; i++) {
            let duplicates = 0;
            for (let j = i + 1; j < solution.length; j++) {
                if (solution[i] === solution[j]) {
                    duplicates++;
                    hasDuplicates = true;
                }
            }

            if (duplicates > duplicatesAllowed) {
                valid = false;
                break;
            }
        }

        if (valid) {
            if (hasDuplicates) {
                solution.push('R');
            }
            validSolutions.push(solution);
        }
    }

    return validSolutions;
}


function tryCombination2(number1, number2, operator) {
    let answer = evaluate(number1, number2, operator);
    return answer;
}


function tryCombination3(number1, number2, number3, operator) {
    let answer = tryCombination2(number1, number2, operator);
    answer = evaluate(answer, number3, operator);
    return answer;
}


function tryCombination4(number1, number2, number3, number4, operator) {
    let answer = tryCombination3(number1, number2, number3, operator);
    answer = evaluate(answer, number4, operator);
    return answer;
}


function tryCombination5(number1, number2, number3, number4, number5, operator) {
    let answer = tryCombination4(number1, number2, number3, number4, operator);
    answer = evaluate(answer, number5, operator);
    return answer;
}


function evaluate(n1, n2, op) {
    switch (op) {
    case '+':
    case 'p':
        return n1 + n2;
    case '-':
    case 'm':
        return n1 - n2;
    case '*':
    case 'x':
        return n1 * n2;
    case '/':
    case 'd':
        return n1 / n2;
    }
}
