const { inputWithLineBreaksTo2dStringArray } = require('../../utils')
const data = inputWithLineBreaksTo2dStringArray('input.txt')
let ordered = [0, 0, 0]

for (let i = 0; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < data[i].length; j++) {
        sum += parseInt(data[i][j])
    }
    if (sum > ordered[0]) {
        ordered.splice(0, 0, sum)
    } else if (sum > ordered[1]) {
        ordered.splice(1, 0, sum)
    } else if (sum > ordered[2]) {
        ordered.splice(2, 0, sum)
    }
}

console.log(ordered[0] + ordered[1] + ordered[2])