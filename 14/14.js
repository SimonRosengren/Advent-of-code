const { inputToStringArray } = require("../utils");
const input = inputToStringArray("14/input.txt");

let polymerTemplate = input[0];
let pairInsertionRules = {};
for (let i = 2; i < input.length; i++) {
    let split = input[i].split(' -> ');
    pairInsertionRules[split[0]] = split[1];
}
let result = '';
let counterL = 0, counterR = 0;
const simulate = (left, right) => {
    counterL++;
    if (counterL <= 3) {
        simulate(left, pairInsertionRules[`${left}${right}`]);
    }
    if (counterL > 3) {
        result += pairInsertionRules[`${left}${right}`];
        return;
    }
    counterR++;
    if (counterR <= 3) {
        result += simulate(between, right);
    } else {
        return between;
    }
}

let ctrL = 0;
let str = '';
const goLeft = (left, right) => {
    ctrL++;
    if (ctrL < 5) goLeft(left, pairInsertionRules[`${left}${right}`]);
    str += pairInsertionRules[`${left}${right}`];
}
let ctrR = 0;
const goRight = (left, right) => {
    ctrR++;
    if (ctrR < 5) goRight(pairInsertionRules[`${left}${right}`], right);
    str += pairInsertionRules[`${left}${right}`];
}



// const simulate = steps => {
//     for (let i = 0; i < steps; i++) {
//         let newPolymerTemplate = `${polymerTemplate[0]}`;
//         for (let i = 0; i < polymerTemplate.length - 1; i++) {
//             if (pairInsertionRules[`${polymerTemplate[i]}${polymerTemplate[i + 1]}`]) {
//                 newPolymerTemplate += `${pairInsertionRules[`${polymerTemplate[i]}${polymerTemplate[i + 1]}`]}${polymerTemplate[i + 1]}`;
//             }
//         }
//         polymerTemplate = newPolymerTemplate;
//     }
// }

const getFinalScore = () => {
    let result = {};
    for (let i = 0; i < polymerTemplate.length; i++) {
        result[polymerTemplate[i]] ? result[polymerTemplate[i]]++ : result[polymerTemplate[i]] = 1;
    }
    let scores = Object.values(result).sort((a, b) => a - b);
    console.log(scores[scores.length - 1] - scores[0])
}

// simulate(40);
// getFinalScore();
// simulate('N', 'N')
// goLeft('N', 'N')
// goRight('N', 'N')











let score = {}
let test = 0;
let nrOfSteps = 3;
const runLeft = (left, right) => {
    if (test === 3) {
        score[pairInsertionRules[`${left}${right}`]] ? score[pairInsertionRules[`${left}${right}`]]++ : score[pairInsertionRules[`${left}${right}`]] = 1;
        return;
    }
    test++;
    runLeft(left, pairInsertionRules[`${left}${right}`])
    score[pairInsertionRules[`${left}${right}`]] ? score[pairInsertionRules[`${left}${right}`]]++ : score[pairInsertionRules[`${left}${right}`]] = 1;
    score[pairInsertionRules[`${pairInsertionRules[`${left}${right}`]}${right}`]] ? score[pairInsertionRules[`${pairInsertionRules[`${left}${right}`]}${right}`]]++ : score[pairInsertionRules[`${pairInsertionRules[`${left}${right}`]}${right}`]] = 1;
    // run(, right)

}
const runRight = (left, right) => {
    if (test === 3) {
        score[pairInsertionRules[`${left}${right}`]] ? score[pairInsertionRules[`${left}${right}`]]++ : score[pairInsertionRules[`${left}${right}`]] = 1;
        return;
    }
    test++;
    runRight(pairInsertionRules[`${left}${right}`], right)
    score[pairInsertionRules[`${left}${right}`]] ? score[pairInsertionRules[`${left}${right}`]]++ : score[pairInsertionRules[`${left}${right}`]] = 1;
    score[pairInsertionRules[`${right}${pairInsertionRules[`${left}${right}`]}`]] ? score[pairInsertionRules[`${right}${pairInsertionRules[`${left}${right}`]}`]]++ : score[pairInsertionRules[`${right}${pairInsertionRules[`${left}${right}`]}`]] = 1;
    // run(, right)

}

runLeft('N', 'N');
runRight('N', 'N');
console.log(score)