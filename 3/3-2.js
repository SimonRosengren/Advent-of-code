const utils = require('../utils');
const input = utils.inputToStringArray('3/input.txt');
let oxegyn = [];
let co2 = [];
input.forEach(e => {
    oxegyn.push(e);
    co2.push(e);
});

let winner;
let counter = 0;
while (oxegyn.length > 1){
    let ones = 0, zeroes = 0;
    for (let j = 0; j < oxegyn.length; j++) {
        if (oxegyn[j][counter] === '1') ones++;
        else if (oxegyn[j][counter] === '0') zeroes++;
    }
    winner = zeroes > ones ? '0' : '1';
    for (let j = oxegyn.length - 1; j >= 0; j--) {
        if (oxegyn[j][counter] !== winner && oxegyn.length > 1) oxegyn.splice(j, 1);
    }
    counter++;
}
counter = 0;
while (co2.length > 1){
    let ones = 0, zeroes = 0;
    for (let j = 0; j < co2.length; j++) {
        if (co2[j][counter] === '1') ones++;
        else if (co2[j][counter] === '0') zeroes++;
    }
    winner = zeroes <= ones ? '0' : '1';
    for (let j = co2.length - 1; j >= 0; j--) {
        if (co2[j][counter] !== winner && co2.length > 1) co2.splice(j, 1);
    }
    counter++;
}

let ctr = 0;
let oxegynNr = 0;
let co2Nr = 0;
for (let i = oxegyn[0].length - 1; i >= 0; i--) {
    ctr++;
    if (oxegyn[0][i] === '1') oxegynNr += (i === oxegyn[0].length - 1 ? 1 : (2 ** (ctr - 1)))
    if (co2[0][i] === '1') co2Nr += (i === co2[0].length - 1 ? 1 : (2 ** (ctr - 1)))
}


console.log(co2Nr * oxegynNr)
