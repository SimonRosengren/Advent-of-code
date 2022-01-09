const { inputToString } = require("../utils");
const { hexaToBinary, binaryToNumber } = require("./helpers");
let input = inputToString("16/input.txt");
const versionLength = 3;
const typeIdLength = 3;

(() => {
    let converted = '';
    for (let i = 0; i < input.length; i++) {
        let binary = hexaToBinary(input[i]);
        converted += binary;
    }
    input = converted;
})();


const readLiteralPackage = binary => {

}

let ptr = 0;

while (true) {
    
}
