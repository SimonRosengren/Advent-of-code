const { inputToStringArray } = require("../utils");
const input = inputToStringArray("14/input.txt");
const nrOfIterations = 2;
let polymerTemplate = input[0];
let pairInsertionRules = {};
for (let i = 2; i < input.length; i++) {
    let split = input[i].split(" -> ");
    pairInsertionRules[split[0]] = split[1];
}

let result = '';
let score = {}

for (let i = 0; i < Object.values(pairInsertionRules).length; i++) {
    score[Object.values(pairInsertionRules)[i]] = 0;
}
console.log(score)
let counter = 0;
let test = false;
let left = false, right = false;
const traverse = (a, b) => {
    counter++;
    let between = pairInsertionRules[`${a}${b}`]
    if (!right && counter < nrOfIterations) traverse(a, between);
    if (right && counter < nrOfIterations - 1) traverse(a, between);
    if (!left) {
        left = true;
        result += pairInsertionRules[`${a}${between}`]
        result += between;
        result += pairInsertionRules[`${between}${b}`]
    }
    counter--;
    if (counter === 0 && !right) {
        result += between;
        right = true;
        left = false;
        traverse(between, b);
    }
}

for (let i = 0; i < polymerTemplate.length - 1; i++) {
    left = false;
    right = false;
    counter = 0;
    result += polymerTemplate[i];
    traverse(polymerTemplate[i], polymerTemplate[i + 1]); 
}
result += polymerTemplate[polymerTemplate.length - 1]

console.log(result)