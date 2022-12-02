
const utils = require('../utils');
let input = utils.inputToStringArray('1/input.txt')
let counter = 0;
for (let i = 0; i < input.length; i++) {
  if (parseInt(input[i + 1]) > parseInt(input[i])) counter++;
}
console.log(counter);
