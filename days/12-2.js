const puzzle = require("./12-1").puzzle;
const vlog = require("../util/vlog");



class Puzzle12_2 extends puzzle {

  run(lines) {
    this.heightMap = this.linesToGrid(lines);
    this.heightMap.resetAtA = true;
    vlog(this.heightMap.toString());

    this.shortestPaths = this.heightMap.getShortestPaths()

    vlog(this.shortestPaths);

    return this.shortestPaths[this.heightMap.end[0]][this.heightMap.end[1]];
  }
}



module.exports = { puzzle: Puzzle12_2 };