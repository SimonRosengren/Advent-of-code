const { inputToGrid, isWithinGridBounds } = require("../utils");
const input = inputToGrid("15/input.txt");
const grid = []
let prioQueue = [];
const growGrid = 5; // Set to 1 for Part I
let currentPos = {
    x: 0,
    y: 0
}

for (let k = 0; k < growGrid; k++) {
    for (let i = 0; i < input.length; i++) {
        grid.push([])
        for (let h = 0; h < growGrid; h++) {
            for (let j = 0; j < input[i].length; j++) {
                grid[i + (k * input.length)].push({
                    pos: {
                        x: j + (h * input[0].length),
                        y: i + (k * input.length)
                    },
                    weight: (parseInt(input[i][j]) + (h + k)) > 9 ? ((parseInt(input[i][j]) + (h + k)) % 10) + 1 : parseInt(input[i][j]) + h + k,
                    cost: Infinity,
                    via: { x: 0, y: 0 },
                    visited: false
                })
                prioQueue.push(grid[i + (k * input.length)][j + (h * input[0].length)])
            }
        }
    }
}

const sortPrioQueue = () => {
    prioQueue.sort((a, b) => b.cost - a.cost);
}
const explore = () => {

    let y = currentPos.y, x = currentPos.x;

    if (isWithinGridBounds(grid, { x: x + 1, y }) && grid[y][x + 1].weight + grid[y][x].cost < grid[y][x + 1].cost) {
        grid[y][x + 1].cost = grid[y][x + 1].weight + grid[y][x].cost;
        grid[y][x + 1].via = { x, y };
    }
    if (isWithinGridBounds(grid, { x: x - 1, y }) && grid[y][x - 1].weight + grid[y][x].cost < grid[y][x - 1].cost) {
        grid[y][x - 1].cost = grid[y][x - 1].weight + grid[y][x].cost;
        grid[y][x - 1].via = { x, y };
    }
    if (isWithinGridBounds(grid, { x, y: y + 1 }) && grid[y + 1][x].weight + grid[y][x].cost < grid[y + 1][x].cost) {
        grid[y + 1][x].cost = grid[y + 1][x].weight + grid[y][x].cost;
        grid[y + 1][x].via = { x, y };
    }
    if (isWithinGridBounds(grid, { x, y: y - 1 }) && grid[y - 1][x].weight + grid[y][x].cost < grid[y - 1][x].cost) {
        grid[y - 1][x].cost = grid[y - 1][x].weight + grid[y][x].cost;
        grid[y - 1][x].via = { x, y };
    }
    sortPrioQueue();
    let nextStep = prioQueue.pop();
    currentPos.x = nextStep.pos.x;
    currentPos.y = nextStep.pos.y;
}

grid[currentPos.y][currentPos.x].cost = 0; // Lazy fix to block gong back to start


while (!(currentPos.x === grid[0].length - 1 && currentPos.y === grid.length - 1)) {
    explore();
}

console.log(grid[grid.length - 1][grid[0].length - 1].cost)
