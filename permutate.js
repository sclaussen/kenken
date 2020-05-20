var permutations;



function permutate(list) {
    permutations = [];
    permutate2(list.length, list);
    return permutations;
}


function permutate2(length, list) {

    if (length === 1) {
        permutations.push(JSON.parse(JSON.stringify(list)));
        return;
    }

    permutate2(length - 1, list);

    for (let i = 0; i < length - 1; i++) {

        if (length % 2 === 0) {
            let item1 = list[i];
            list[i] = list[length - 1];
            list[length - 1] = item1;
        } else {
            let item1 = list[0];
            list[0] = list[length - 1];
            list[length - 1] = item1;
        }

        permutate2(length - 1, list);
    }
}



module.exports = permutate;
