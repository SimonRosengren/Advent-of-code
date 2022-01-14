const { inputToString } = require("../utils");
const input = inputToString("17/input.txt").split('target area: ')[1];

const x = input.split(', ')[0].split('x=')[1].split('..');
const y = input.split(', ')[1].split('y=')[1].split('..');

const getHeightFromVelociy = yVel => {
    return (yVel + 1) * (yVel / 2);
}

const getAllYVelocities = (yMin, yMax) => {
    for (let i = yMin; i <= yMax; i++) {
        
    }
}

console.log('Part I: ' + getHeightFromVelociy(parseInt(y[0])));

