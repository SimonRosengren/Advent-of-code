const utils = require('../utils');
const input = utils.inputToStringArray('5/input.txt');
let grid = [];
for (let i = 0; i < 1000; i++) {
    grid.push([])
}
for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
        grid[i].push(0);
    }
}

const lines = [];
let intersectionCounter = 0;

for (let i = 0; i < input.length; i++) {
    let split = input[i].split(' -> ');
    let line = {
        start: split[0].split(','),
        end: split[1].split(',')
    }
    line.start[0] = parseInt(line.start[0])
    line.start[1] = parseInt(line.start[1])
    line.end[0] = parseInt(line.end[0])
    line.end[1] = parseInt(line.end[1])
    lines.push(line);
}

for (let i = 0; i < lines.length; i++) {
    let currentPos = [lines[i].start[0], lines[i].start[1]];
    while (currentPos[1] !== lines[i].end[1] || currentPos[0] !== lines[i].end[0]) {
        // if (lines[i].start[0] !== lines[i].end[0] && lines[i].start[1] !== lines[i].end[1]) break; Uncomment for part I
        grid[currentPos[1]][currentPos[0]]++;
        if (lines[i].start[0] !== lines[i].end[0]) currentPos[0] = currentPos[0] + (lines[i].end[0] - lines[i].start[0]) / Math.abs((lines[i].end[0] - lines[i].start[0]));
        if (lines[i].start[1] !== lines[i].end[1]) currentPos[1] = currentPos[1] + (lines[i].end[1] - lines[i].start[1]) / Math.abs((lines[i].end[1] - lines[i].start[1]));
        if (currentPos[1] === lines[i].end[1] && currentPos[0] === lines[i].end[0]) {
            grid[currentPos[1]][currentPos[0]]++;
        }
    }
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[1].length; j++) {
        if(grid[i][j] >= 2) intersectionCounter++;
    }
}

console.table(intersectionCounter)
