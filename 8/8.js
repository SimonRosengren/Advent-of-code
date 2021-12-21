const { numbers, inputOutput, inputNumbers } = require('./inputCleaner');

// PT 1
let counter = 0;
for (let i = 0; i < inputOutput.length; i++) {
    for (let j = 0; j < inputOutput[i].length; j++) {
        if (inputOutput[i][j].length === 2 || inputOutput[i][j].length === 7 || inputOutput[i][j].length === 4 || inputOutput[i][j].length === 3) counter++;
    }
}

console.log(counter);


// PT 2
let segments = [['', ''], ['', '', ''], ['', '']]
let zero, one, two, three, four, five, six, seven, eight, nine;

const includesInAnyOrder = (string, subString) => {
    let counter = 0;

    for (let i = 0; i < subString.length; i++) {
        if (string.includes(subString[i])) counter++;
    }

    return counter === subString.length;
}

for (let i = 0; i < inputNumbers.length; i++) {
    let sum = 0;
    for (let j = 0; j < inputNumbers[i].length; j++) {
        if (inputNumbers[i][j].length === 2) {
            one = inputNumbers[i][j];
        }
        switch (inputNumbers[i][j].length) {
            case 2:
                one = inputNumbers[i][j];
                break;
            case 7:
                eight = inputNumbers[i][j];
                break;
            case 4:
                four = inputNumbers[i][j];
                break;
            case 3:
                seven = inputNumbers[i][j];
                break;
            default:
                break;
        }
    }
    for (let j = 0; j < inputNumbers[i].length; j++) {
        if (inputNumbers[i][j].length === 2) {
            one = inputNumbers[i][j];
        }
        switch (inputNumbers[i][j].length) {
            case 5:
                if (inputNumbers[i][j].includes(one)) {
                    three = inputNumbers[i][j];
                }
                break;
            case 6:
                if (inputNumbers[i][j].includes(one)) {
                    if (inputNumbers[i][j].includes(four)) {
                        nine = inputNumbers[i][j];
                    } else {
                        zero = inputNumbers[i][j]
                    }
                } else {
                    six = inputNumbers[i][j]
                }
                break;
            default:
                break;
        }
    }
    for (let j = 0; j < inputNumbers[i].length; j++) {
        if (inputNumbers[i][j].length === 2) {
            one = inputNumbers[i][j];
        }
        switch (inputNumbers[i][j].length) {
            case 5:
                if (six.includes(inputNumbers[i][j])) {
                    five = inputNumbers[i][j];
                } else if (!inputNumbers[i][j].includes(one)) {
                    two = inputNumbers[i][j];
                }
                break;
            default:
                break;
        }
    }
    console.log('\n*************************\n');
    console.log(zero);
console.log(one);
console.log(two);
console.log(three);
console.log(four);
console.log(five);
console.log(six);
console.log(seven);
console.log(eight);
console.log(nine);
}

