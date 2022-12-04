const {inputToStringArray} = require('../../utils')
const data = inputToStringArray('input.txt')
let points = 0
const getIndexInAlphabet = letter => {
    if (letter.toLowerCase() === letter) return letter.charCodeAt() - 96
    return letter.charCodeAt() - 38
}

data.forEach(row => {
    let left = row.slice(0, (row.length) / 2)
    let right = row.slice((row.length) / 2)
    for (let i = 0; i < left.length; i++) {
        if (right.includes(left[i])) {
            points += getIndexInAlphabet(left[i])
            break;
        }
    }
});
console.log('Part I ' + points)

let points2 = 0

for (let i = 0; i < data.length; i++) {
    let currentGroup = []
    for (let j = 0; j < 3; j++) {
        currentGroup.push(data[i + j])
    }
    let done = false;
    for (let j = 0; j < currentGroup[0].length; j++) {
        for (let k = 0; k < currentGroup[1].length; k++) {
            if (currentGroup[1][k] === currentGroup[0][j]){
                for (let l = 0; l < currentGroup[2].length; l++) {
                    if (currentGroup[2][l] === currentGroup[0][j]) {
                        points2 += getIndexInAlphabet(currentGroup[2][l])
                        done = true
                        break;
                    }
                }
            }
            if (done) break;
        }
        if (done) break;
    }
    i += 2
}

console.log('pt II: ' + points2)