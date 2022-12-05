const puzzle = require("./4-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle4_2 extends puzzle {


  isOverlap(interval1, interval2) {
    return (interval1.start <= interval2.start && interval1.end >= interval2.start) ||
      (interval2.start <= interval1.start && interval2.end >= interval1.start)
  }

  run(lines) {
    let total = 0
    for (const line of lines) {
      const intervals = line.split(',').map(x => this.getInterval(x));
      const isOverlap = this.isOverlap(intervals[0], intervals[1]);
      if (isOverlap) {
        vlog("overlap", line)
        total++;
      }
    }
    return total;
  }
}


module.exports = { puzzle: Puzzle4_2 };