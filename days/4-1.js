const Day = require("./day").Day;
const vlog = require("../util/vlog");

class Puzzle4_1 extends Day {

  getInterval(intervalStr) {
    const nums = intervalStr.split('-').map(x => parseInt(x, 10));
    let interval = {
      start: nums[0],
      end: nums[1],
      length: nums[1] - nums[0] + 1
    };
    return interval;
  }


  isContained(interval1, interval2) {
    return (interval1.start <= interval2.start && interval1.end >= interval2.end) ||
      (interval2.start <= interval1.start && interval2.end >= interval1.end)
  }


  run(lines) {
    let total = 0
    for (const line of lines) {
      const intervals = line.split(',').map(x => this.getInterval(x));
      const isContained = this.isContained(intervals[0], intervals[1]);
      if (isContained) {
        total++;
      }
    }
    return total;
  }
}


module.exports = { puzzle: Puzzle4_1 };