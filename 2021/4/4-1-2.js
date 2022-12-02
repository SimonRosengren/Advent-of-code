const utils = require('../utils');
const input = utils.inputToStringArray('4/input.txt');
const calls = input[0].split(',');
let players = [];


const hasBingo = player => {
    for (let i = 0; i < player.rows.length; i++) {
        let hStreak = 0;
        let vStreak = 0;
        for (let j = 0; j < player.rows[i].length; j++) {
            if (player.rows[i][j] === 'x') hStreak++;
            if (player.rows[j][i] === 'x') vStreak++;
        }
        if (hStreak === 5) return true;
        if (vStreak === 5) return true;
    }
    return false;
}

const crossNumber = (player, number) => {
    for (let i = 0; i < player.rows.length; i++) {
        for (let j = 0; j < player.rows[i].length; j++) {
            if (player.rows[i][j] === number) player.rows[i][j] = 'x';          
        }
    }
}

const getFinalScore = (lastCall, player) => {
    let sum = 0;
    for (let i = 0; i < player.rows.length; i++) {
        for (let j = 0; j < player.rows[i].length; j++) {
            if (player.rows[i][j] !== 'x') sum += parseInt(player.rows[i][j])
        }
    }
    return sum * lastCall;
}

for (let i = 2; i < input.length; i++) {
    if (input[i] === '') continue;
    players.push({
        rows: []
    })
    for (let j = 0; j < 5; j++) {
        let row = input[i].split(' ');
        for (let k = 0; k < row.length; k++) {
            row = row.filter(e => e !== '');
        }
        players[players.length - 1].rows.push(row)
        i++;
    }
}

// Part I

let hasWinner = false;
let counter = 0;
while (!hasWinner) {
    players.forEach(p => {
        crossNumber(p, calls[counter]);
        if (hasBingo(p)) {
            console.log('Part I: ' + getFinalScore(calls[counter], p));
            hasWinner = true;
        }
    })
    counter++;
}

// Part II
let winner, lastCall;
for (let i = 0; i < calls.length; i++) {
    for (let j = players.length - 1; j >= 0; j--) {
        crossNumber(players[j], calls[i]);
        if (hasBingo(players[j])) {
           winner = players[j];
           players.splice(j, 1);
           lastCall = calls[i]
        }   
    }
}

console.log('Part II: ' + getFinalScore(lastCall, winner));