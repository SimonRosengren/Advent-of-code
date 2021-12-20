const utils = require("../utils");
const input = utils.inputToIntArray("7/input.txt", ",");
const positions = {};
let largestNumber = 0;
for (let i = 0; i < input.length; i++) {
    positions[input[i]] = (positions[input[i]] || 0) + 1;
    largestNumber = largestNumber > input[i] ? largestNumber : input[i];
}
for (let i = 0; i < largestNumber + 1; i++) {
    positions[i] = positions[i] || 0;
}

let lowestCost = 1000000000;

for (let i = 0; i < Object.keys(positions).length; i++) {
    console.log(lowestCost + ' : ' + i)
    let currentCost = 0;
    for (let j = 0; j < Object.keys(positions).length; j++) {
        currentCost +=  Math.abs(((j - i) * (j / 2)) * positions[j]);
    }
    if (currentCost < lowestCost) lowestCost = currentCost;
}

console.log(lowestCost)

