const Puzzle1_1 = require("./1-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle1_2 extends Puzzle1_1 {
  run(lines) {
    const elvesCals = this.countCals(lines)
    const top3 = elvesCals.sort((a, b) => a - b).slice(-3);
    return top3.reduce((accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }
}


module.exports = { puzzle: Puzzle1_2 };