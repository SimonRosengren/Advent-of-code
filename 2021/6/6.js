const utils = require("../utils");
const initialFish = utils.inputToIntArray("6/input.txt", ",");
const fish = {};
const run = (nrOfDays) => {
  for (let i = 0; i < 9; i++) {
    fish[i] = 0;
  }

  for (let i = 0; i < initialFish.length; i++) {
    fish[initialFish[i]] = fish[initialFish[i]] + 1 || 1;
  }

  for (let i = 0; i < nrOfDays; i++) {
    let newFish = 0;
    let fishToReset = 0;
    Object.keys(fish).forEach((key) => {
      if (key === "0") {
        newFish = fish[key];
        fishToReset = fish[key];
      } else {
        fish[key - 1] = fish[key];
      }
    });
    fish[8] = newFish;
    fish[6] += fishToReset;
  }
  let finalPopulation = 0;
  Object.keys(fish).forEach((key) => {
    finalPopulation += fish[key];
  });
  console.log(finalPopulation);
};

run(80);
run(256);