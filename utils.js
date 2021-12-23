const fs = require('fs');

const inputToStringArray = filename => {
    let data = fs.readFileSync(filename, 'utf8');
    data = data.split('\n');
    return data;
}

const isWithinGridBounds = (grid, position) => {
    if (position.x < grid.length
        && position.x >= 0
        && position.y < grid[0].length
        && position.y >= 0) {
        return true;
    }
    return false;
}

const inputToIntArray = (filename, separator) => {
    let data = fs.readFileSync(filename, 'utf8');
    data = data.split(separator);
    for (let i = 0; i < data.length; i++) {
        data[i] = parseInt(data[i])
    }
    return data;
}

const inputToGrid = (filename) => {
    let data = fs.readFileSync(filename, 'utf8');
    data = data.split('\n');
    const grid = [];
    for (let i = 0; i < data.length; i++) {
        const row = [];
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] !== '\r') row.push(data[i][j])
        }
        grid.push(row);
    }
    return grid;
}

module.exports = {
    inputToStringArray,
    inputToIntArray,
    inputToGrid,
    isWithinGridBounds
}