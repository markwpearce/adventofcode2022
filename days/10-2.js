const puzzle = require("./10-1").puzzle;
const vlog = require("../util/vlog");
const arraySum = require("../util/arraySum");


class Puzzle10_2 extends puzzle {

  checkCyclePixel() {
    let col = (this.cycle - 1) % 40;
    let row = Math.floor((this.cycle - 1) / 40);
    vlog("Cycle", this.cycle, row, col)
    if (col === this.register.x ||
      col === this.register.x - 1 ||
      col === this.register.x + 1) {
      this.crt[row][col] = '#';

    }
  }


  processLine(line) {
    const [cmd, data] = line.split(" ");

    let { cycles, addX } = this.handleCmd(cmd, data);

    for (let i = 0; i < cycles; i++) {
      this.cycle++;
      this.checkCyclePixel()
    }
    this.register.x += addX

  }


  init() {
    super.init()
    this.lines = 6;
    this.crt = []
    for (let i = 0; i < this.lines; i++) {
      this.crt.push(new Array(40).fill('.'));
    }
  }

  run(lines) {
    this.init()



    for (const line of lines) {
      this.processLine(line)
    }

    for (let i = 0; i < this.lines; i++) {
      console.log(this.crt[i].join(''))
    }
    return -1;
  }

}


module.exports = { puzzle: Puzzle10_2 };