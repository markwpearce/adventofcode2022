const puzzle = require("./3-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle3_2 extends puzzle {


  run(lines) {
    let total = 0
    let lineCount = lines.length
    let triplesCount = lineCount / 3
    for (let i = 0; i < triplesCount; i++) {
      let start = 3 * i;
      let triple = [lines[start], lines[start + 1], lines[start + 2]];
      let common = this.findCommon(triple);
      let value = this.getLetterValue(common);
      vlog(common, value);
      total += value;
    }
    return total;
  }
}


module.exports = { puzzle: Puzzle3_2 };