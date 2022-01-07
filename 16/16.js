const { inputToString } = require("../utils");
const input = inputToString("16/input.txt");

const hexaToBinary = hexa => {
    return Number(parseInt(hexa, 16)).toString(2);
}

const binaryToNumber = binary => {
    return parseInt(binary, 2)
}

const versionLength = 3;
const packetIdLength = 3;
