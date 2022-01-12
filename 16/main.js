const { inputToString } = require("../utils");
const { hexaToBinary } = require("./helpers");
const { openPackage } = require('./packageReader');
let input = inputToString("16/input.txt");

(() => {
    let converted = '';
    for (let i = 0; i < input.length; i++) {
        let binary = hexaToBinary(input[i]);
        converted += binary;
    }
    input = converted;
})();

console.log(openPackage(input))