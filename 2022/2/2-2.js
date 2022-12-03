const {inputToStringArray} = require('../../utils')
const data = inputToStringArray('input.txt')

const points = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3
}

const getwinner = (opponent) => {
    if (opponent === 'A') return 'B'
    else if (opponent === 'B') return 'C'
    return 'A' 
}

const getLooser = (opponent) => {
    if (opponent === 'A') return 'C'
    else if (opponent === 'B') return 'A'
    return 'B' 
}


let sum = 0;
data.forEach(game => {
    if (game[2] === 'X') sum += (points[getLooser(game[0])])
    else if (game[2] === 'Y') sum += (points[game[0]] + 3)
    else sum += (points[getwinner(game[0])] + 6)
});

console.log(sum)