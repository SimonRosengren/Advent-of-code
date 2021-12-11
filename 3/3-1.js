const utils = require('../utils');
const input = utils.inputToStringArray('3/input.txt');
let gamma = '';
let epsilon = '';
for (let i = 0; i < input[0].length; i++) {
    let one = 0;
    let zero = 0;
    for (let j = 0; j < input.length; j++) {
        if (input[j][i] === '1') {
            one++;
        } else {
            zero++;
        }
    }
    gamma = gamma.concat(one > zero ? '1' : '0')
    epsilon = epsilon.concat(one > zero ? '0' : '1')
}

let ctr = 0;
let gammaNr = 0;
let epsilonNr = 0;
for (let i = gamma.length - 1; i >= 0; i--) {
    ctr++;
    if (gamma[i] === '1') gammaNr += (i === gamma.length - 1 ? 1 : (2 ** (ctr - 1)))
    if (epsilon[i] === '1') epsilonNr += (i === gamma.length - 1 ? 1 : (2 ** (ctr - 1)))
}
console.log(gammaNr * epsilonNr);
