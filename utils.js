const fs = require('fs');

const inputToStringArray = filename => {
    let data = fs.readFileSync(filename, 'utf8');
    data = data.split('\n');
    return data;
}

module.exports = {
    inputToStringArray
}