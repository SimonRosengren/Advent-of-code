const utils = require('../utils');
const input = utils.inputToStringArray('2/input.txt')
let pos = { horizontal: 0, depth: 0, aim: 0 };
for (let i = 0; i < input.length; i++) {
  let command = input[i].split(" ");
  let dir = command[0];
  let value = command[1];
  switch (dir) {
    case "up":
      pos.aim -= parseInt(value);
      break;
    case "down":
      pos.aim += parseInt(value);
      break;
    case "forward":
      pos.horizontal += parseInt(value);
      pos.depth += pos.aim * value;
    default:
      break;
  }
}
console.log(pos.depth * pos.horizontal);
