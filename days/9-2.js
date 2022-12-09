const puzzle = require("./9-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle9_2 extends puzzle {

  checkMoveTail(direction) {
    this.knots[0] = this.head;
    vlog("Head", "moved", direction)
    let diff;
    for (let i = 0; i < this.knots.length - 1; i++) {
      direction = this.checkMoveKnot(direction, this.knots[i], this.knots[i + 1], diff)
      vlog("Knot", i + 1, "moved", direction)
      if (direction === 'X') {
        break;
      }
    }

    vlog(this.knots)

    this.tail = this.knots[this.knots.length - 1];
    this.minX = Math.min(this.minY, this.tail[0])
    this.minY = Math.min(this.minY, this.tail[1])
    this.maxX = Math.max(this.maxX, this.tail[0])
    this.maxY = Math.max(this.maxY, this.tail[1])

  }


  run(lines) {
    this.minX = 0
    this.minY = 0
    this.maxX = 0
    this.maxY = 0
    let knotsCount = 10;
    this.knots = []
    for (let i = 0; i < knotsCount; i++) {
      this.knots.push([0, 0]);
    }


    let result = super.run(lines)
    vlog(this.tailLocations)

    let drawing = []
    for (let i = 0; i < this.maxX + 1 - this.minX; i++) {
      drawing.push([]);
      for (let j = 0; j < this.maxY + 1 - this.minY; j++) {
        drawing[i].push('.')
      }
    }

    for (const key of Object.keys(this.tailLocations)) {
      let parts = key.split(',').map(x => parseInt(x, 10))
      drawing[parts[0] - this.minX][parts[1] - this.minY] = "#"
    }
    for (let i = 0; i < this.maxX + 1 - this.minX; i++) {
      vlog(drawing[i].join(''));
    }
    return result;
  }

}

module.exports = { puzzle: Puzzle9_2 };