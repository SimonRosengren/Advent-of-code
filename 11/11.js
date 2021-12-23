const { inputToGrid, isWithinGridBounds } = require("../utils");
const input = inputToGrid("11/input.txt");
const nrOfSteps = 100;
let totalFlashes = 0;
const octopi = [];
for (let i = 0; i < input.length; i++) {
    octopi.push([]);
    for (let j = 0; j < input[i].length; j++) {
        octopi[i].push({
            energy: parseInt(input[i][j]),
            flashed: false
        })
    }
}
const increaseEnergy = () => {
    octopi.forEach(row => {
        row.forEach(octopus => {
            octopus.energy++;
        });
    });
}

const flash = position => {
    if (octopi[position.x][position.y].flashed) return;
    octopi[position.x][position.y].energy = 0;
    octopi[position.x][position.y].flashed = true;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            if (isWithinGridBounds(octopi, { x: position.x + i, y: position.y + j }) && !octopi[position.x + i][position.y + j].flashed)
             octopi[position.x + i][position.y + j].energy++;
        }
    }
}

const resetFlashed = () => {
    octopi.forEach(row => {
        row.forEach(octopus => {
            octopus.flashed = false;
        });
    });
}

const simulate = () => {
    let nrOfFlashed = 0;
    for (let i = 0; i < octopi.length; i++) {
        for (let j = 0; j < octopi[i].length; j++) {
            if (octopi[i][j].energy > 9) {
                flash({ x: i, y: j })
                nrOfFlashed++;
            }
        }
    }
    totalFlashes += nrOfFlashed;
    if (nrOfFlashed) simulate();
}

for (let i = 0; i < nrOfSteps; i++) {
    resetFlashed();
    increaseEnergy();
    simulate();
}
console.log(totalFlashes);