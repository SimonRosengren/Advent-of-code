const utils = require("../utils");
const input = utils.inputToGrid("11/input.txt");
const nrOfSteps = 100;

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
    if (octopi[i][j].flashed) return;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (i === 0 && j === 0) continue;
            octopi[position.x + i][position.x + j].energy++;
        }      
    }
}

const simulate = () => {
    for (let i = 0; i < octopi.length; i++) {
        for (let j = 0; j < octopi[i].length; j++) {
            if (octopi[i][j].energy > 9) {
                flash({x: i, y: j})
            }
            
        }
        
    }
}

