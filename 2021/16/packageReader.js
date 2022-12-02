// All methods assumes that binary starts where method should start
const { binaryToNumber } = require("./helpers");

let pt1 = 0;

const readVersionNumber = binary => {
    pt1 += binaryToNumber(`${binary[0]}${binary[1]}${binary[2]}`);
    return {
        result: binaryToNumber(`${binary[0]}${binary[1]}${binary[2]}`),
        change: 3
    }
}

const readID = binary => {
    return {
        result: binaryToNumber(`${binary[0]}${binary[1]}${binary[2]}`),
        change: 3
    }
}

const readLengthTypeId = binary => {
    return {
        result: binaryToNumber(`${binary[0]}`),
        change: 1
    }
}

const translateOperator = ID => {
    let operator;
    switch (ID) {
        case 0:
            operator = values => values.reduce((a, b) => a + b)
            break;
        case 1:
            operator = values => values.reduce((a, b) => a * b)
            break;
        case 2:
            operator = values => values.reduce((a, b) => Math.min(a, b))
            break;
        case 3:
            operator = values => values.reduce((a, b) => Math.max(a, b))
            break;
        case 5:
            operator = values => values[0] > values[1] ? 1 : 0;
            break;
        case 6:
            operator = values => values[0] < values[1] ? 1 : 0;
            break;
        case 7:
            operator = values => values[0] === values[1] ? 1 : 0;
            break;
        default:
            break;
    }
    return operator;
}

const readLiteralValue = binary => {
    let ptr = 0;
    let chunk = `${binary[ptr + 1]}${binary[ptr + 2]}${binary[ptr + 3]}${binary[ptr + 4]}`;
    if (binary[ptr] === '0') {
        return {
            result: binaryToNumber(chunk),
            change: 5
        }
    }
    ptr += 5;
    while (binary[ptr] !== '0') {
        chunk += `${binary[ptr + 1]}${binary[ptr + 2]}${binary[ptr + 3]}${binary[ptr + 4]}`;
        ptr += 5;
    }
    chunk += `${binary[ptr + 1]}${binary[ptr + 2]}${binary[ptr + 3]}${binary[ptr + 4]}`;
    ptr += 5;
    return {
        result: binaryToNumber(chunk),
        change: ptr
    }
}

const openPackage = binary => {
    let change = 0;
    let result = 0;
    let version = readVersionNumber(binary);
    binary = binary.slice(version.change)
    change += version.change;
    version = version.result;

    let ID = readID(binary);
    binary = binary.slice(ID.change)
    change += ID.change;
    ID = ID.result;

    if (ID !== 4) {
        let lengthTypeID = readLengthTypeId(binary);
        binary = binary.slice(lengthTypeID.change);
        change += lengthTypeID.change;
        lengthTypeID = lengthTypeID.result;
        if (lengthTypeID) {
            let length = '';
            for (let i = 0; i < 11; i++) {
                length += binary[i];
            }
            length = binaryToNumber(length);
            binary = binary.slice(11);
            change += 11;
            let values = [];
            for (let i = 0; i < length; i++) {
                let res = openPackage(binary);
                binary = binary.slice(res.change);
                change += res.change;
                values.push(res.result);
            }
            result = translateOperator(ID)(values)
        } else {
            let length = '';
            for (let i = 0; i < 15; i++) {
                length += binary[i];
            }
            length = binaryToNumber(length);
            binary = binary.slice(15);
            change += 15;
            change += length;
            let bitsRead = 0;
            let values = [];
            while (bitsRead < length) {
                let res = openPackage(binary)
                bitsRead += res.change;
                values.push(res.result);
                binary = binary.slice(res.change)
            }
            result = translateOperator(ID)(values)
        }
    } else {
        let lit = readLiteralValue(binary);
        change += lit.change;
        binary = binary.slice(lit.change);
        result = lit.result;
    }
    return {
        result,
        change,
        pt1
    }
}

module.exports = {
    readLiteralValue,
    readID,
    readVersionNumber,
    openPackage
}