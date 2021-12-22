const utils = require("../utils");
const input = utils.inputToGrid("9/input.txt");
let lowPoints = [];
let riskScore = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    let lowpoint = true;
    if (i > 0 && input[i - 1][j] <= input[i][j]) lowpoint = false;
    if (j > 0 && input[i][j - 1] <= input[i][j]) lowpoint = false;
    if (j < input[i].length - 1 && input[i][j + 1] <= input[i][j])
      lowpoint = false;
    if (i < input.length - 1 && input[i + 1][j] <= input[i][j])
      lowpoint = false;
    if (lowpoint) lowPoints.push([i, j]);
    if (lowpoint) riskScore += parseInt(input[i][j]) + 1;
  }
}

console.log("Part I: " + riskScore);

let currentPos = {
    x: 0,
    y: 0
}

let basinMap = [];
for (let i = 0; i < input.length; i++) {
  basinMap.push([]);
  for (let j = 0; j < input[i].length; j++) {
    basinMap[i].push(0);
  }
}

// const includesPosition = (pos, history) => {
//   for (let i = 0; i < history.length; i++) {
//     if (history[i][0] === pos[0] && history[i][1] === pos[1]) return true;
//   }
//   return false;
// };

// const isSamePosition = (pos1, pos2) => {
//   if (pos1[0] === pos2[0] && pos1[1] == pos2[1]) return true;
//   return false;
// };

const isVisited = (pos) => {
  return !!basinMap[pos.x][pos.y];
};

const isViableStep = (currentPos, potentialPos) => {
    if (potentialPos.x < 0 || potentialPos.x >= input.length) return false;
    if (potentialPos.y < 0 || potentialPos.y >= input[0].length) return false;
    if (
      input[potentialPos.x][potentialPos.y] < 9 &&
      input[potentialPos.x][potentialPos.y] > input[currentPos.x][currentPos.y] &&
      !isVisited(potentialPos)
    ) {
      return true;
    }
    return false;
};
  
const move = (newPos, id) => {
    currentPos.x = newPos.x;
    currentPos.y = newPos.y;
    basinMap[currentPos.x][currentPos.y] = id;

    if (isViableStep(currentPos, { x: currentPos.x + 1, y: currentPos.y })) {
        move({ x: currentPos.x + 1, y: currentPos.y }, id);
    } else if (isViableStep(currentPos, { x: currentPos.x - 1, y: currentPos.y })) {
        move({ x: currentPos.x - 1, y: currentPos.y }, id);
    } else if (isViableStep(currentPos, { x: currentPos.x, y: currentPos.y + 1 })) {
        move({ x: currentPos.x, y: currentPos.y + 1 }, id);
    } else if (isViableStep(currentPos, { x: currentPos.x, y: currentPos.y - 1 })) {
        move({ x: currentPos.x, y: currentPos.y - 1 }, id);
    } else {
        return;
    }
};

for (let i = 0; i < lowPoints.length; i++) {
    move({ x: lowPoints[i][0], y: lowPoints[i][1] }, i + 1);
}

console.table(input);
console.table(basinMap);
console.log(lowPoints);