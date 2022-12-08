const DigitsDay = require("./day").DigitsDay;
const vlog = require("../util/vlog");

class Puzzle8_1 extends DigitsDay {


  checkTree(row, col) {
    let height = this.lines[row][col];

    if (row === 0 || col === 0) {
      return true;
    }

    if (col === this.lines[row].length - 1 ||
      row === this.lines[0][col].length - 1) {
      return true;
    }

    let visible = true;


    for (let i = 0; i < col; i++) {
      visible = visible && this.lines[row][i] < height;

      if (!visible) {
        break;
      }
    }
    if (visible) {
      return true
    }

    visible = true;
    for (let i = col + 1; i < this.lines[row].length; i++) {
      visible = visible && this.lines[row][i] < height;

      if (!visible) {
        break;
      }
    }
    if (visible) {
      return true;
    }
    visible = true;
    for (let i = 0; i < row; i++) {
      visible = visible && this.lines[i][col] < height;

      if (!visible) {
        break;
      }
    }
    if (visible) {
      return true;
    }
    visible = true;
    for (let i = row + 1; i < this.lines[0].length; i++) {
      visible = visible && this.lines[i][col] < height;

      if (!visible) {
        break;
      }
    }
    return visible;
  }





  run(lines) {
    this.lines = lines;
    let count = 0;
    this.checkTree(2, 3)
    this.lines.forEach((element, i) => {
      element.forEach((tree, j) => {
        if (this.checkTree(i, j)) {
          vlog(i, j, "is visible", this.lines[i][j]);
          count++;
        }
      })
    });

    return count;
  }

}


module.exports = { puzzle: Puzzle8_1 };