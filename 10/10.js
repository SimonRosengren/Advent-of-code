const utils = require("../utils");
const input = utils.inputToStringArray("10/input.txt");

const isClosingChar = char => {
    return char === ')' || char === ']' || char === '}' || char == '>';
}

const isOpeningChar = char => {
    return char === '(' || char === '[' || char === '{' || char == '<';
}

const getClosingChar = char => {
    switch (char) {
        case '<':
            return '>'
            break;
        case '(':
            return ')'
            break;
        case '{':
            return '}'
            break;
        case '[':
            return ']'
            break;
        default:
            throw 'Something fishy is going on!'
            break;
    }
}

const getScore = char  => {
    switch (char) {
        case '>':
            return 25137
            break;
        case ')':
            return 3
            break;
        case '}':
            return 1197
            break;
        case ']':
            return 57
            break;
        default:
            throw 'Something fishy is going on!'
            break;
    }
}
let score = 0;
input.forEach(line => {
    let expectedClosings = [];
    for (let i = 0; i < line.length; i++) {
        if (i === 0 && isClosingChar(line[i])) return;// Error!
        if (isOpeningChar(line[i])) expectedClosings.push(getClosingChar(line[i]))
        if (isClosingChar(line[i])) {
            let c = expectedClosings.pop();
            if (c !== line[i]) score += getScore(line[i]);
        }
    }
});

console.log('Part I: ' + score);

const getScorePt2 = char  => {
    switch (char) {
        case '>':
            return 4
            break;
        case ')':
            return 1
            break;
        case '}':
            return 3
            break;
        case ']':
            return 2
            break;
        default:
            throw 'Something fishy is going on!'
            break;
    }
}
let scores = [];
input.forEach(line => {
    let expectedClosings = [];
    for (let i = 0; i < line.length; i++) {
        if (i === 0 && isClosingChar(line[i])) return;// Error!
        if (isOpeningChar(line[i])) expectedClosings.push(getClosingChar(line[i]))
        if (isClosingChar(line[i])) {
            let c = expectedClosings.pop();
            if (c !== line[i]) {
                expectedClosings = [];
                break;
            }
        }
    }
    if (expectedClosings.length > 0) {
        let scorePt2 = 0;
        for (let i = expectedClosings.length - 1; i >= 0; i--) {
            scorePt2 *= 5;
            scorePt2 += getScorePt2(expectedClosings[i])
        }
        scores.push(scorePt2);
    }
});
scores = scores.sort((a, b) => a - b)
console.log(scores[Math.round(scores.length / 2) - 1])