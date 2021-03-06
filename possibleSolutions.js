'use strict';



function getPossibleSolutions(puzzleSize, cageSize, cageOperator, duplicatesAllowed) {
    let possibleSolutions = [];
    let cageTotal = parseInt(cageOperator.slice(0, cageOperator.length - 1));
    cageOperator = cageOperator[cageOperator.length - 1];


    if (cageSize === 1) {
        return [ [ cageTotal ] ];
    }


    for (let number1 = puzzleSize; number1 >= 1; number1--) {
        for (let number2 = number1; number2 >= 1; number2--) {

            if (cageSize === 2) {
                if (tryCombination2(number1, number2, cageOperator) === cageTotal) {
                    possibleSolutions.push([ number1, number2 ]);
                }
                continue;
            }

            if (cageSize === 3) {
                for (let number3 = number2; number3 >= 1; number3--) {
                    if (tryCombination3(number1, number2, number3, cageOperator) === cageTotal) {
                        possibleSolutions.push([ number1, number2, number3 ]);
                    }
                }
                continue;
            }

            if (cageSize === 4) {
                for (let number3 = number2; number3 >= 1; number3--) {
                    for (let number4 = number3; number4 >= 1; number4--) {
                        if (tryCombination4(number1, number2, number3, number4, cageOperator) === cageTotal) {
                            possibleSolutions.push([ number1, number2, number3, number4 ]);
                        }
                    }
                }
                continue;
            }

            if (cageSize === 5) {
                for (let number3 = number2; number3 >= 1; number3--) {
                    for (let number4 = number3; number4 >= 1; number4--) {
                        for (let number5 = number4; number5 >= 1; number5--) {
                            if (tryCombination5(number1, number2, number3, number4, number5, cageOperator) === cageTotal) {
                                possibleSolutions.push([ number1, number2, number3, number4, number5 ]);
                            }
                        }
                    }
                }
                continue;
            }
        }
    }

    possibleSolutions = removeInvalidPossibleSolutions(possibleSolutions, duplicatesAllowed);
    return possibleSolutions;
}


function removeInvalidPossibleSolutions(possibleSolutions, duplicatesAllowed) {

    let validPossibleSolutions = [];
    for (let possibleSolution of possibleSolutions) {

        // Go through each number in the possibleSolution
        let valid = true;
        let hasDuplicates = false;
        for (let i = 0; i < possibleSolution.length; i++) {
            let duplicates = 0;
            for (let j = i + 1; j < possibleSolution.length; j++) {
                if (possibleSolution[i] === possibleSolution[j]) {
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
                possibleSolution.push('R');
            }
            validPossibleSolutions.push(possibleSolution);
        }
    }

    return validPossibleSolutions;
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



module.exports = getPossibleSolutions;
