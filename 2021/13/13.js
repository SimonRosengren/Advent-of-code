const { inputToStringArray, isWithinGridBounds } = require("../utils");
const input = inputToStringArray("13/input.txt");
let grid = [];

let maxX = 0, maxY = 0;
let foldsStartsAt = 0;
for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i][0])) {
        foldsStartsAt = i + 1;
        break;
    }
    let x = parseInt(input[i].split(',')[0]);
    let y = parseInt(input[i].split(',')[1]);
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
}

const partI = () => {
    let counter = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === '#') counter++;
        }
    }
    return counter;
}

const foldAlongY = y => {
    for (let i = grid.length - 1; i >= y; i--) {
        let row = grid.pop();
        for (let j = 0; j < row.length; j++) {
            if (row[j] === '#') grid[y - (i - y)][j] = row[j];
        }
    }
}

const foldAlongX = x => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = grid[i].length - 1; j >= x; j--) {
            let value = grid[i].pop();
            if (value === '#') grid[i][x - (j - x)] = value;
        }   
    }
}

for (let y = 0; y < maxY + 1; y++) {
    grid.push([]);
    for (let x = 0; x < maxX + 1; x++) {
        grid[y][x] = ' ';
    }
}

for (let i = 0; i < input.length; i++) {
    if (isNaN(input[i][0])) break;
    let x = parseInt(input[i].split(',')[0]);
    let y = parseInt(input[i].split(',')[1]);
    grid[y][x] = '#';
}

for (let i = foldsStartsAt; i < input.length; i++) {
    let instruction = input[i].split('fold along ')[1];
    let split = instruction.split('=');
    split[0] === 'y' ? foldAlongY(split[1]) : foldAlongX(split[1])
    if (i === foldsStartsAt) console.log('ptI: ' + partI());
}

for (let i = 0; i < grid.length; i++) {
    let row = '';
    for (let j = 0; j < grid[i].length; j++) {
        row += '' + grid[i][j] + '';
    }
    console.log(row);
}
