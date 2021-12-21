const utils = require("../utils");
const input = utils.inputToGrid("9/input.txt");
let lowPointMap = [];
for (let i = 0; i < input.length; i++) {
  lowPointMap.push([]);
}
console.log(input.length);
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    let lowpoint = true;
    if (i > 0 && input[i - 1][j] <= input[i][j]) lowpoint = false;
    if (j > 0 && input[i][j - 1] <= input[i][j]) lowpoint = false;
    if (j < input[i].length - 1 && input[i][j + 1] <= input[i][j])
      lowpoint = false;
    if (i < input.length - 1 && input[i + 1][j] <= input[i][j])
      lowpoint = false;
    lowPointMap[i][j] = lowpoint;
  }
}
console.table(lowPointMap)
