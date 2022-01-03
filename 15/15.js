const { inputToGrid, isWithinGridBounds } = require("../utils");
const input = inputToGrid("15/input.txt");
let prioQueue = [];
let path = [];

let currentPos = {
    x: 0,
    y: 0
}
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        input[i][j] = {
            pos: {
                x: j,
                y: i
            },
            weight: parseInt(input[i][j]),
            cost: Infinity,
            via: {x: 0, y: 0},
            visited: false
        }
        if (!(i === 0 && j === 0)) prioQueue.push(input[i][j])
    }   
}

const sortPrioQueue = () => {
    prioQueue.sort((a, b) => b.cost - a.cost);
}

const explore = () => {
    let y = currentPos.y, x = currentPos.x;

    if (isWithinGridBounds(input, {x: x + 1, y}) && input[y][x + 1].weight + input[y][x].cost < input[y][x + 1].cost) {
        input[y][x + 1].cost = input[y][x + 1].weight + input[y][x].cost;
        input[y][x + 1].via = {x, y};
    } 
    if (isWithinGridBounds(input, {x: x - 1, y}) && input[y][x - 1].weight + input[y][x].cost < input[y][x - 1].cost) {
        input[y][x - 1].cost = input[y][x - 1].weight + input[y][x].cost;
        input[y][x - 1].via = {x, y};
    } 
    if (isWithinGridBounds(input, {x, y: y + 1}) && input[y + 1][x].weight + input[y][x].cost < input[y + 1][x].cost) {
        input[y + 1][x].cost = input[y + 1][x].weight + input[y][x].cost;
        input[y + 1][x].via = {x, y};
    } 
    if (isWithinGridBounds(input, {x, y: y - 1}) && input[y - 1][x].weight + input[y][x].cost < input[y - 1][x].cost) {
        input[y - 1][x].cost = input[y - 1][x].weight + input[y][x].cost;
        input[y - 1][x].via = {x, y};
    } 
    sortPrioQueue();
    let nextStep = prioQueue.pop();
    currentPos.x = nextStep.pos.x;
    currentPos.y = nextStep.pos.y;
    path.push(nextStep);
}

input[currentPos.y][currentPos.x].cost = 0; // Set start to weight 0


while (!(currentPos.x === input[0].length - 1 && currentPos.y === input.length - 1)) {

    explore();
    // Same for all other directions
    // Add them all to prio queue sorted
    // Add next in line to via of currentPos
    // Go to the next pos in line (cheapest)
    // Repeat this until end is find. 
    // Step backwards through "via" to get shortest path
}

console.log('das')
