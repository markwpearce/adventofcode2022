const puzzle = require("./6-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle6_2 extends puzzle {



  run(lines) {
    let result = -1;
    for (const letters of lines) {
      result = this.findUniqueSection(letters, 14);
      vlog(result)

    }
    return result;
  }
}


module.exports = { puzzle: Puzzle6_2 };