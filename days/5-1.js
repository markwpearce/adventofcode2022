const Day = require("./day").Day;
const vlog = require("../util/vlog");

class Puzzle5_1 extends Day {

  setInitialStacks(lines) {
    let foundNumsLine = false
    this.stacks = []
    for (let i = 0; i < 10; i++) {
      this.stacks.push([])
    }
    let i = 0;
    let lettersRegex = new RegExp(/[A-Z]/, 'g')
    while (!foundNumsLine) {
      let line = lines[i];
      if (line.trim().startsWith('1')) {
        foundNumsLine = true;
        break;
      }
      for (let j = 0; j < line.length; j++) {

        if (line.charAt(j).match(lettersRegex)) {
          let stackNum = Math.floor(j / 4) + 1;
          vlog("Add ", line.charAt(j), " to stack", stackNum)
          this.stacks[stackNum].push(line.charAt(j));
        }
      }
      i++;
    }
    for (let i = 0; i < 10; i++) {
      this.stacks[i] = this.stacks[i].reverse()
    }

    return i + 1;
  }


  doInstruction(line) {
    let [num, from, to] = line.split(' ').map(x => parseInt(x, 10)).filter(x => !Number.isNaN(x));

    for (let i = 0; i < num; i++) {
      this.stacks[to].push(this.stacks[from].pop())
    }
  }



  run(lines) {
    let instructionsLineStart = this.setInitialStacks(lines);
    vlog(this.stacks)

    for (let i = instructionsLineStart; i < lines.length; i++) {
      this.doInstruction(lines[i])
    }

    vlog(this.stacks)
    let result = ""

    for (let i = 1; i < this.stacks.length; i++) {
      let top = this.stacks[i].at(-1)
      if (top) {
        result += top;
      }
    }

    return result;
  }
}


module.exports = { puzzle: Puzzle5_1 };