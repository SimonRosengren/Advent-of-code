const padBinary = binary => {
    while (binary.length < 4) {
        binary = '0' + binary;
    }
    return binary;
}

const hexaToBinary = hexa => {
    return padBinary(Number(parseInt(hexa, 16)).toString(2));
}

const binaryToNumber = binary => {
    if (parseInt(binary, 2) === '')
        console.log('')
    return parseInt(binary, 2)
}

const finished = (binary) => {
    return (binary.length < 1 || !binary.includes('1'))
}

module.exports = {
    padBinary,
    hexaToBinary,
    binaryToNumber,
    finished
}