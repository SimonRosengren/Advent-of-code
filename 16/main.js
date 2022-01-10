const { inputToString } = require("../utils");
const { hexaToBinary, binaryToNumber, finished } = require("./helpers");
const { readLiteralValue, openPackage } = require('./packageReader');
let input = inputToString("16/input.txt");

(() => {
    let converted = '';
    for (let i = 0; i < input.length; i++) {
        let binary = hexaToBinary(input[i]);
        converted += binary;
    }
    input = converted;
})();

let ptr = 0;
let remaining = input.slice(ptr);

openPackage(input);

// while (!finished(remaining)) {
//     const a = 1;
// }
