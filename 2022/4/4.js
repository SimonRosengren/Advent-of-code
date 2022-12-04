const {inputToStringArray} = require('../../utils')
const data = inputToStringArray('input.txt')

let sum1 = 0;
let sum2 = 0;

const solveFirst = (left, right) => {
    if (parseInt(left[0]) >= parseInt(right[0]) && parseInt(left[1]) <= parseInt(right[1]))
        sum1++
    else if (parseInt(right[0]) >= parseInt(left[0]) && parseInt(right[1]) <= parseInt(left[1]))
        sum1++
}

const solveSecond = (left, right) => {
    if (parseInt(left[0]) <= parseInt(right[0]) && parseInt(left[1]) >= parseInt(right[0])) sum2++;
    else if (parseInt(right[0]) <= parseInt(left[0]) && parseInt(right[1]) >= parseInt(left[0])) sum2++;
}

data.forEach(pair => {
    pair = pair.split(',')
    const left = pair[0].split('-')
    const right = pair[1].split('-')
    solveFirst(left, right)
    solveSecond(left, right)
});

console.log('pt I: ' + sum1)
console.log('pt II: ' + sum2)