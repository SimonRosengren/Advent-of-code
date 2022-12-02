const utils = require("../utils");
const input = utils.inputToStringArray("8/input.txt", ",");
let inputNumbers = [];
let inputOutput = []; 
for (let i = 0; i < input.length; i++) {
    let split = input[i].split('|');
    inputNumbers.push(split[0].split(' '));
    inputOutput.push(split[1].split(' '));
}
for (let i = 0; i < inputOutput.length; i++) {
    inputOutput[i] = inputOutput[i].filter(e => e !== '');
    inputOutput[i][inputOutput[i].length - 1] = inputOutput[i][inputOutput[i].length - 1];
    inputNumbers[i] = inputNumbers[i].filter(e => e !== '');
}
const numbers = {
    0: [[1, 1],[1, 0, 1],[1, 1]],
    1: [[0, 0],[0, 0, 0],[1, 1]],
    2: [[0, 1],[1, 1, 1],[1, 0]],
    3: [[0, 0],[1, 1, 1],[1, 1]],
    4: [[1, 0],[0, 1, 0],[1, 1]],
    5: [[1, 0],[1, 1, 1],[0, 1]],
    6: [[1, 1],[1, 1, 1],[0, 1]],
    7: [[0, 0],[1, 0, 0],[1, 1]],
    8: [[1, 1],[1, 1, 1],[1, 1]],
    9: [[1, 0],[1, 1, 1],[1, 1]]
}

module.exports = { numbers, inputNumbers, inputOutput }