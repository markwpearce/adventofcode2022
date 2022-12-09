const Day = require("./day").Day;
const vlog = require("../util/vlog");

class Puzzle9_1 extends Day {

  checkMoveTail(direction) {
    this.checkMoveKnot(direction, this.head, this.tail)
  }


  checkMoveKnot(direction, head, tail) {
    const diff = [head[0] - tail[0], head[1] - tail[1]]

    if (Math.abs(diff[0]) > 1 || Math.abs(diff[1]) > 1) {

      if (diff[0] >= 2) {
        direction = 'R'
      }
      else if (diff[0] <= -2) {
        direction = 'L'
      } else if (diff[1] >= 2) {
        direction = 'U'
      }
      else if (diff[1] <= -2) {
        direction = 'D'
      }

      // need to move tail
      switch (direction) {
        case 'R':
          tail[0]++;
          tail[1] = head[1]
          break;

        case 'L':
          tail[0]--;
          tail[1] = head[1]
          break;

        case 'U':
          tail[1]++;
          tail[0] = head[0]
          break;

        case 'D':
          tail[1]--;
          tail[0] = head[0]
          break;
      }

      return direction;

    }
    return 'X';

  }

  processLine(line) {
    const [direction, count] = line.split(" ");

    for (let i = 0; i < count; i++) {

      switch (direction) {
        case 'R':
          this.head[0]++;
          break;

        case 'L':
          this.head[0]--;
          break;

        case 'U':
          this.head[1]++;
          break;

        case 'D':
          this.head[1]--;
          break;
      }
      this.checkMoveTail(direction)
      vlog("Head: ", this.head, "Tail: ", this.tail)
      this.tailLocations[this.tail.join(',')] = true;
    }

  }




  run(lines) {

    this.head = [0, 0]
    this.tail = [0, 0]
    this.tailLocations = {}

    for (const line of lines) {
      this.processLine(line)
    }

    return Object.keys(this.tailLocations).length
  }

}

module.exports = { puzzle: Puzzle9_1 };