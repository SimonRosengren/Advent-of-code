const { inputOutput, inputNumbers } = require('./inputCleaner');

// PT 1
let counter = 0;
for (let i = 0; i < inputOutput.length; i++) {
    for (let j = 0; j < inputOutput[i].length; j++) {
        if (inputOutput[i][j].length === 2 || inputOutput[i][j].length === 7 || inputOutput[i][j].length === 4 || inputOutput[i][j].length === 3) counter++;
    }
}
console.log('pt I: ' + counter)

// PT 2
let numbers = {}

const includesInAnyOrder = (string, subString) => {
    let counter = 0;

    for (let i = 0; i < subString.length; i++) {
        if (string.includes(subString[i])) counter++;
    }

    return counter === subString.length;
}
const equalsInAnyOrder = (string1, string2) => {
    let counter = 0;
    if (string1.length !== string2.length) return false;
    for (let i = 0; i < string1.length; i++) {
        if (string2.includes(string1[i])) counter++;
    }
    return counter === string1.length && counter === string2.length;
}
let sum = 0;
for (let i = 0; i < inputNumbers.length; i++) {
    for (let j = 0; j < inputNumbers[i].length; j++) {
        switch (inputNumbers[i][j].length) {
            case 2:
                numbers[1] = inputNumbers[i][j];
                break;
            case 7:
                numbers[8] = inputNumbers[i][j];
                break;
            case 4:
                numbers[4] = inputNumbers[i][j];
                break;
            case 3:
                numbers[7] = inputNumbers[i][j];
                break;
            default:
                break;
        }
    }
    for (let j = 0; j < inputNumbers[i].length; j++) {
        switch (inputNumbers[i][j].length) {
            case 5:
                if (includesInAnyOrder(inputNumbers[i][j], numbers[1])) {
                    numbers[3] = inputNumbers[i][j];
                }
                break;
            case 6:
                if (includesInAnyOrder(inputNumbers[i][j], numbers[1])) {
                    if (includesInAnyOrder(inputNumbers[i][j], numbers[4])) {
                        numbers[9] = inputNumbers[i][j];
                    } else {
                        numbers[0] = inputNumbers[i][j]
                    }
                } else {
                    numbers[6] = inputNumbers[i][j]
                }
                break;
            default:
                break;
        }
    }
    for (let j = 0; j < inputNumbers[i].length; j++) {
        switch (inputNumbers[i][j].length) {
            case 5:
                if (includesInAnyOrder(numbers[6], inputNumbers[i][j])) {
                    numbers[5] = inputNumbers[i][j];
                } else if (!includesInAnyOrder(inputNumbers[i][j], numbers[1])) {
                    numbers[2] = inputNumbers[i][j];
                }
                break;
            default:
                break;
        }
    }
    let number = '';
    for (let j = 0; j < inputOutput[i].length; j++) {
        number = number.concat(Object.keys(numbers).find(key => equalsInAnyOrder(numbers[key], inputOutput[i][j])));
    }
    sum += parseInt(number)
}

console.log('pt II: ' + sum)
