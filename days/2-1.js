const Day = require("./day").Day;
const vlog = require("../util/vlog");

class Puzzle2_1 extends Day {
  typeVal(yourPlay) {
    switch (yourPlay) {
      case "X":
        return 1;
      case "Y":
        return 2;
      case "Z":
        return 3;
    }
    throw ("Invalid yourPlay");
  }

  pointsVal(theirPlay, yourPlay) {
    if (
      (theirPlay === "A" && yourPlay === "Y") ||
      (theirPlay === "B" && yourPlay === "Z") ||
      (theirPlay === "C" && yourPlay === "X")) {
      return 6 + this.typeVal(yourPlay)
    }
    else if (
      (theirPlay === "A" && yourPlay === "X") ||
      (theirPlay === "B" && yourPlay === "Y") ||
      (theirPlay === "C" && yourPlay === "Z")) {
      return 3 + this.typeVal(yourPlay)
    }
    return this.typeVal(yourPlay)
  }


  run(lines) {
    let totalPoints = 0
    lines.forEach(line => {
      totalPoints += this.pointsVal(...line.split(" "))
    });
    return totalPoints
  }
}


module.exports = { puzzle: Puzzle2_1 };