const puzzle = require("./5-1").puzzle;
const vlog = require("../util/vlog");

class Puzzle5_2 extends puzzle {



  doInstruction(line) {
    let [num, from, to] = line.split(' ').map(x => parseInt(x, 10)).filter(x => !Number.isNaN(x));
    this.stacks[to].push(...this.stacks[from].slice(-num))
    this.stacks[from].splice(this.stacks[from].length - num, num)
  }




}


module.exports = { puzzle: Puzzle5_2 };