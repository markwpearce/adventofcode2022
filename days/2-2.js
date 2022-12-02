const puzzle = require("./2-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle2_2 extends puzzle {

  winFor(theirPlay) {
    switch (theirPlay) {
      case "A":
        return "Y"
      case "B":
        return "Z"
      case "C":
        return "X"
    }
  }


  loseFor(theirPlay) {
    switch (theirPlay) {
      case "A":
        return "Z"
      case "B":
        return "X"
      case "C":
        return "Y"
    }
  }


  pointsVal(theirPlay, yourPlay) {
    switch (yourPlay) {
      case "X":
        return this.typeVal(this.loseFor(theirPlay));
      case "Y":
        return 3 + this.typeVal(String.fromCharCode((theirPlay.charCodeAt(0) + 23)));
      case "Z":
        return 6 + this.typeVal(this.winFor(theirPlay));
    }

  }

}


module.exports = { puzzle: Puzzle2_2 };