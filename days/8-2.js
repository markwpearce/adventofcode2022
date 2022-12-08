const puzzle = require("./8-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle8_2 extends puzzle {


  treeScore(row, col) {
    let height = this.lines[row][col];

    if (row === 0 || col === 0) {
      return 0;
    }

    if (col === this.lines[row].length - 1 ||
      row === this.lines[0][col].length - 1) {
      return 0;
    }


    let scenicScore = 1;

    let score = 0;


    let visible = true;


    for (let i = col - 1; i >= 0; i--) {
      score++;
      let targetHeight = this.lines[row][i];
      if (targetHeight >= height) {
        break;
      }
    }
    scenicScore *= score;
    score = 0

    for (let i = col + 1; i < this.lines[row].length; i++) {
      score++;
      let targetHeight = this.lines[row][i];
      if (targetHeight >= height) {
        break;
      }
    }

    scenicScore *= score;
    score = 0
    for (let i = row - 1; i >= 0; i--) {
      score++;
      let targetHeight = this.lines[i][col];
      if (targetHeight >= height) {
        break;
      }
    }
    scenicScore *= score;
    score = 0
    for (let i = row + 1; i < this.lines[0].length; i++) {
      score++;
      let targetHeight = this.lines[i][col];
      if (targetHeight >= height) {
        break;
      }
    }
    scenicScore *= score;
    score = 0
    return scenicScore;
  }




  run(lines) {
    this.lines = lines;
    let highest = 0;
    this.treeScore(1, 2);

    this.lines.forEach((element, i) => {
      element.forEach((tree, j) => {
        let score = this.treeScore(i, j);

        if (score > highest) {
          vlog(i, j, "has high score", score);
          highest = score
        }
      })
    });

    return highest;
  }
}


module.exports = { puzzle: Puzzle8_2 };