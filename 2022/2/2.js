const {inputToStringArray} = require('../../utils')
const data = inputToStringArray('input.txt')
console.log(data)
const points = {
    X: 1,
    Y: 2,
    Z: 3
}

const play = (you, opponent) => {
    switch (you) {
        case 'X':
            if (opponent === 'C') return 6
            else if (opponent === 'A') return 3
            else return 0
        case 'Y':
            if (opponent === 'A') return 6
            else if (opponent === 'B') return 3
            else return 0
        case 'Z':
            if (opponent === 'B') return 6
            else if (opponent === 'C') return 3
            else return 0
        default:
            break;
    }
}

let sum = 0;

data.forEach(game => {
    let input = game.split(' ')
    sum += (play(input[1], input[0]) + points[input[1]])
});

console.log(sum)