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

let lowestCost1 = 1000000000;
let lowestCost2 = 1000000000;
for (let i = 0; i < Object.keys(positions).length; i++) {
    let currentCostpt1 = 0;
    let currentCostpt2 = 0;
    for (let j = 0; j < Object.keys(positions).length; j++) {
        currentCostpt1 += Math.abs((j - i) * positions[j]);
        currentCostpt2 += (((Math.abs(j - i))) * ((Math.abs(j - i) + 1) / 2)) * positions[j];  
    }
    if (currentCostpt1 < lowestCost1) lowestCost1 = currentCostpt1;
    if (currentCostpt2 < lowestCost2) lowestCost2 = currentCostpt2;
}

console.log('Pt I: ' + lowestCost1 + ' Part II: ' + lowestCost2)
