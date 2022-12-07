const puzzle = require("./7-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle7_2 extends puzzle {




  run(lines) {
    this.buildDirTree(lines)

    let allDirSizes = []

    this.traverseDirs(this.dirTree, (dir) => allDirSizes.push(this.getSize(dir)))

    let totalSize = 70000000

    let targetSize = 30000000


    let currentSize = this.getSize(this.dirTree);
    let freeSize = totalSize - currentSize;

    allDirSizes.sort((a, b) => a - b)

    for (const size of allDirSizes) {
      if ((size + freeSize) >= targetSize)
        return size;
    }
    return -1
  }
}


module.exports = { puzzle: Puzzle7_2 };