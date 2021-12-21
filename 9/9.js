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
    if (lowpoint) lowPoints.push([i, j])
    if (lowpoint) riskScore += parseInt(input[i][j]) + 1
  }
}

console.log('Part I: ' + riskScore);

const includesPosition = (pos, history) => {
  for (let i = 0; i < history.length; i++) {
    if (history[i][0] === pos[0] && history[i][1] === pos[1]) return true;
  }
  return false;
}

const isSamePosition = (pos1, pos2) => {
  if (pos1[0] === pos2[0] && pos1[1] == pos2[1]) return true;
  return false;
}



let basinMap = [];
for (let i = 0; i < input.length; i++) {
  basinMap.push([])
  for (let j = 0; j < input[i].length; j++) {
    basinMap[i][j] = 0;
  }
}

let walker = {
  x: 0,
  y: 0,
  startX: 0,
  startY: 0,
  backTrackCounter: 1,
  history: [],
  start: startPos => {
    walker.history = [];
    x = startPos[0];
    y = startPos[1];
    startX = x;
    startY = y;
    walker.history.push([startPos[0], startPos[1]])
    walker.wander();
    while (!isSamePosition([walker.x, walker.y], [startX, startY])) { // << bygg finished() som kollar om alla möjliga steg från början redan liggerr i histroy samt att vi är på starten igen
      walker.wander();
    }
  },
  wander: () => {
    if (input[x + 1] && input[x + 1][y] > input[x][y] && !includesPosition([x + 1, y], walker.history)) {
      x = x + 1;
      walker.history.push([x, y])
      walker.backTrackCounter = 1;
    } else if (input[x - 1] && input[x - 1][y] > input[x][y] && !includesPosition([x - 1, y], walker.history)) {
      x = x - 1;
      walker.history.push([x, y])
      walker.backTrackCounter = 1;
    } else if (input[x][y + 1] && input[x][y + 1] > input[x][y] && !includesPosition([x, y + 1], walker.history)) {
      y = y + 1;
      walker.history.push([x, y])
      walker.backTrackCounter = 1;
    } else if (input[x][y - 1] && input[x][y - 1] > input[x][y] && !includesPosition([x, y - 1], walker.history)) {
      y = y - 1;
      walker.history.push([x, y])
      walker.backTrackCounter = 1;
    } else {
      walker.x = walker.history[walker.history.length - walker.backTrackCounter][0];
      walker.y = walker.history[walker.history.length - walker.backTrackCounter][1];
      walker.backTrackCounter++;
    }
  }
}

for (let i = 0; i < lowPoints.length; i++) {
  walker.start(lowPoints[i]);
  for (let j = 0; j < walker.history.length; j++) {
    basinMap[walker.history[j][0]][walker.history[j][1]] = i;
    
  }
}
console.log(lowPoints)