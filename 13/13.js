const { inputToStringArray, isWithinGridBounds } = require("../utils");
const input = inputToStringArray("13/input.txt");
let grid = [];

let maxX = 0, maxY = 0;
for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i][0])) break;
    let x = parseInt(input[i].split(',')[0]);
    let y = parseInt(input[i].split(',')[1]);
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
}

const foldAlongY = y => {
    for (let i = grid.length - 1; i > y; i--) {
        let row = grid.pop();
        for (let j = 0; j < row.length; j++) {
            if (row[j] === '#') grid[y - (i - y)][j] = row[j];
        }
    }
}

for (let y = 0; y < maxY + 1; y++) {
    grid.push([]);
    for (let x = 0; x < maxX + 1; x++) {
        grid[y][x] = '.';
    }
}

for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i][0])) break;
    let x = parseInt(input[i].split(',')[0]);
    let y = parseInt(input[i].split(',')[1]);
    grid[y][x] = '#';
}

foldAlongY(7)
for (let i = 0; i < grid.length; i++) {
    let row = '';
    for (let j = 0; j < grid[i].length; j++) {
        row += ' ' + grid[i][j] + ' ';
    }
    console.log(row);
}
