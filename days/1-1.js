const Day = require("./day").Day;
const vlog = require("../util/vlog");

class Puzzle1_1 extends Day {

  ignoreWhitespace() {
    return false
  }

  countCals(lines) {
    const elvesCals = []
    let currentCals = 0
    lines.forEach(line => {
      if (line === "") {
        elvesCals.push(currentCals)
        currentCals = 0
      }
      else {
        currentCals += parseInt(line)
      }

    });
    if (currentCals > 0) {
      elvesCals.push(currentCals)
    }
    return elvesCals
  }

  run(lines) {
    const elvesCals = this.countCals(lines)
    return Math.max(...elvesCals)
  }
}


module.exports = { puzzle: Puzzle1_1 };