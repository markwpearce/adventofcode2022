const Day = require("./day").Day;
const vlog = require("../util/vlog");


class HeightMap {
  /**
   *
   * @param {number[][]} map
   * @param {number[]} start
   * @param {number[]} end
   */
  constructor(map, start, end) {
    this.map = map;
    this.start = start;
    this.end = end;
    this.rowMax = this.map.length;
    this.colMax = this.map[0].length;
    this.resetAtA = false;
  }


  toString() {
    let result = `Start: ${this.start}, End: ${this.end}\n`;
    this.map.forEach(line => {
      result += String.fromCharCode(...line) + '\n';
    })
    return result;
  }


  getShortestPaths() {
    this.shortestPaths = []
    for (let i = 0; i < this.rowMax; i++) {
      let directionLine = new Array(this.colMax).fill(-1);
      this.shortestPaths.push(directionLine);
    }
    this.checkElevation(this.start, 0);
    return this.shortestPaths;
  }


  checkElevation(point, countSoFar) {
    let [row, col] = point;
    let currentHeight = this.map[row][col];
    let bestSoFar = this.shortestPaths[row][col];

    if (this.resetAtA && currentHeight === 'a'.charCodeAt(0)) {
      countSoFar = 0

    }
    if (bestSoFar === -1 || countSoFar < bestSoFar) {
      this.shortestPaths[row][col] = countSoFar;
    }
    else {
      return;
    }

    let nextPoints = []
    if (col > 0) {
      nextPoints.push([row, col - 1]);
    }
    if (col < this.colMax - 1) {
      nextPoints.push([row, col + 1]);
    }
    if (row > 0) {
      nextPoints.push([row - 1, col]);
    }
    if (row < this.rowMax - 1) {
      nextPoints.push([row + 1, col]);
    }

    nextPoints.filter(np => {
      return this.map[np[0]][np[1]] - 1 <= currentHeight;
    }).forEach(np => {

      this.checkElevation(np, countSoFar + 1);
    });
  }



}




class Puzzle12_1 extends Day {

  linesToGrid(lines) {
    let start = [0, 0];
    let end = [0, 0];
    let map = [];
    lines.forEach((line, lineNum) => {
      let lineArr = line.split('').map(letter => parseInt(letter.charCodeAt(0)));
      let startIndex = line.indexOf('S');
      let endIndex = line.indexOf('E');

      if (startIndex != -1) {
        start = [lineNum, startIndex];
        lineArr[startIndex] = parseInt('a'.charCodeAt(0), 10);
      }
      if (endIndex != -1) {
        end = [lineNum, endIndex]
        lineArr[endIndex] = parseInt('z'.charCodeAt(0), 10);
      }
      map.push(lineArr);
    });

    return new HeightMap(map, start, end);
  }

  run(lines) {
    this.heightMap = this.linesToGrid(lines);

    vlog(this.heightMap.toString())

    this.shortestPaths = this.heightMap.getShortestPaths()

    vlog(this.shortestPaths);

    return this.shortestPaths[this.heightMap.end[0]][this.heightMap.end[1]];
  }
}


module.exports = { puzzle: Puzzle12_1 };