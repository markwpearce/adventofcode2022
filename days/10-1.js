const Day = require("./day").Day;
const vlog = require("../util/vlog");
const arraySum = require("../util/arraySum");


class Puzzle10_1 extends Day {



  handleCmd(cmd, data) {
    switch (cmd) {
      case 'noop':
        return { cycles: 1, addX: 0 };
      case 'addx':
        let num = parseInt(data, 10);
        return { cycles: 2, addX: num };
    }
    throw 'Unknown cmd :' + cmd
  }

  checkCycleForSignalStrength() {
    vlog("Cycle", this.cycle, 'x', this.register.x)
    if (this.cycle % 20 === 0 && this.cycle % 40 !== 0) {
      const strength = this.register.x * this.cycle

      vlog("Cycle", this.cycle, 'x', this.register.x, 'strength', strength)
      this.signalStrengths.push(strength)
    }
  }



  processLine(line) {
    const [cmd, data] = line.split(" ");

    let { cycles, addX } = this.handleCmd(cmd, data);

    vlog("Adding", addX)
    for (let i = 0; i < cycles; i++) {
      this.cycle++;
      this.checkCycleForSignalStrength()
    }
    this.register.x += addX

  }

  init() {
    this.register = {
      x: 1
    }
    this.cycle = 0;

    this.signalStrengths = [];
  }


  run(lines) {
    this.init()


    for (const line of lines) {
      this.processLine(line)
    }

    vlog(this.signalStrengths)

    return arraySum(this.signalStrengths);
  }

}

module.exports = { puzzle: Puzzle10_1 };