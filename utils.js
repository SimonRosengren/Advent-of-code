const fs = require('fs');

const inputToStringArray = filename => {
    let data = fs.readFileSync(filename, 'utf8');
    data = data.split('\n');
    return data;
}

const inputToIntArray = (filename, separator) => {
    let data = fs.readFileSync(filename, 'utf8');
    data = data.split(separator);
    for (let i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i])
    }
    return data;
}

module.exports = {
    inputToStringArray,
    inputToIntArray
}