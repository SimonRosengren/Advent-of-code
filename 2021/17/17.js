const { inputToString } = require("../utils");
const input = inputToString("17/input.txt").split('target area: ')[1];

const x = input.split(', ')[0].split('x=')[1].split('..');
const y = input.split(', ')[1].split('y=')[1].split('..');

let pt2 = 0;

const getHeightFromVelociy = yVel => {
    return (Math.abs(yVel) - 1) * (Math.abs(yVel) / 2);
}

const miss = pos => {
    if (pos.y < parseInt(y[0]) || pos.x > parseInt(x[1])) return true;
    return false;
}

const checkForHit = (start, velocity) => {
    let currentPos = { x: start.x, y: start.y }
    let currentVelocity = { x: velocity.x, y: velocity.y }
    while (!miss(currentPos)) {
        currentPos.x += currentVelocity.x;
        currentPos.y += currentVelocity.y;

        if (currentVelocity.x > 0) currentVelocity.x--;
        currentVelocity.y--;

        if ((currentPos.x <= parseInt(x[1]) && currentPos.x >= parseInt(x[0])) && (currentPos.y <= parseInt(y[1]) && currentPos.y >= parseInt(y[0]))) {
            return true;
        }
    }
    return false;
}
console.log('Part I: ' + getHeightFromVelociy(parseInt(parseInt(y[0]))));

for (let i = 0; i < parseInt(x[1]) + 1; i++) {
    for (let j = parseInt(y[0]); j < Math.abs(parseInt(y[0])); j++) {
        if (checkForHit({ x: 0, y: 0 }, { x: i, y: j })) pt2++;
    }
}
console.log('Part II: ' + pt2);