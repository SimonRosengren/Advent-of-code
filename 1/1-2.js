const utils = require('../utils');
const input = utils.inputToStringArray('1/input.txt')
let windowSums = [];
let counter = 0;
for (let i = 0; i < input.length - 2; i++) {
  let a = parseInt(input[i]);
  let b = parseInt(input[i + 1]);
  let c = parseInt(input[i + 2]);
  windowSums.push(a + b + c);
}
for (let i = 0; i < windowSums.length; i++) {
  if (windowSums[i + 1] > windowSums[i]) counter++;
}
console.log(counter);
