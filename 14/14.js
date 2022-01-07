const { inputToStringArray } = require("../utils");
const input = inputToStringArray("14/input.txt");
const nrOfIterations = 3;
let polymerTemplate = input[0];
let pairInsertionRules = {};
for (let i = 2; i < input.length; i++) {
  let split = input[i].split(" -> ");
  pairInsertionRules[split[0]] = split[1];
}

let result = '';
let counter = 0;
const traverse = (a, b) => {
    counter++;
    let between = pairInsertionRules[`${a}${b}`]
    if (counter < nrOfIterations) traverse(a, between);
    result += between;
    console.log(between + ' : ' + b)
}
// for (let i = 0; i < polymerTemplate.length - 1; i++) {
//     traverse(polymerTemplate[i], polymerTemplate[i + 1]);
// }
traverse('N','N')
console.log(result)