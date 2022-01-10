// All methods assumes that binary starts where method should start
const { binaryToNumber } = require("./helpers");

let test = 0;

const readVersionNumber = binary => {
    test += binaryToNumber(`${binary[0]}${binary[1]}${binary[2]}`);
    console.log(test)

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
            for (let i = 0; i < length; i++) {
                let res = openPackage(binary);
                binary = binary.slice(res.change);
                change += res.change; // correct here aswell?
                // let val = res.result; // What do I do with this data?           
            }
        } else {
            let length = '';
            for (let i = 0; i < 15; i++) {
                length += binary[i];
            }
            length = binaryToNumber(length);
            binary = binary.slice(15);
            change += 15;
            change += length; // lägga length här också? Detta borde vara length på open package
            let bitsRead = 0;
            while (bitsRead < length) {
                let res = openPackage(binary) // val here
                bitsRead += res.change;
                binary = binary.slice(res.change)
            }


        }
    } else {
        let lit = readLiteralValue(binary);
        change += lit.change;
        binary = binary.slice(lit.change);
        // Do something with result here?
    }
    return {
        result: '',
        change
    }
}

module.exports = {
    readLiteralValue,
    readID,
    readVersionNumber,
    openPackage
}