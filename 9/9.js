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

let basinMap = [];
let score = [];
for (let i = 0; i < input.length; i++) {
  basinMap.push([]);
  for (let j = 0; j < input[i].length; j++) {
    basinMap[i].push(0);
  }
}

const isVisited = (pos) => {
  return !!basinMap[pos.x][pos.y];
};

const isViableStep = (newPos, potentialPos) => {
    if (potentialPos.x < 0 || potentialPos.x >= input.length) return false;
    if (potentialPos.y < 0 || potentialPos.y >= input[0].length) return false;
    if (
      input[potentialPos.x][potentialPos.y] < 9 &&
      input[potentialPos.x][potentialPos.y] > input[newPos.x][newPos.y] &&
      !isVisited(potentialPos)
    ) {
      return true;
    }
    return false;
};
  
const move = (newPos, id) => {
    basinMap[newPos.x][newPos.y] = id;
    isNaN(score[id - 1]) ? score[id - 1] = 1 : score[id - 1]++;
    if (isViableStep(newPos, { x: newPos.x + 1, y: newPos.y })) {
        move({ x: newPos.x + 1, y: newPos.y }, id);
    }
    if (isViableStep(newPos, { x: newPos.x - 1, y: newPos.y })) {
        move({ x: newPos.x - 1, y: newPos.y }, id);
    } 
    if (isViableStep(newPos, { x: newPos.x, y: newPos.y + 1 })) {
        move({ x: newPos.x, y: newPos.y + 1 }, id);
    } 
    if (isViableStep(newPos, { x: newPos.x, y: newPos.y - 1 })) {
        move({ x: newPos.x, y: newPos.y - 1 }, id);
    }
};

for (let i = 0; i < lowPoints.length; i++) {
    move({ x: lowPoints[i][0], y: lowPoints[i][1] }, i + 1);
}
score = score.sort((v1, v2) => v2 - v1);
console.log(score[0] * score[1] * score[2]);