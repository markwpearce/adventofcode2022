const puzzle = require("./13-1").puzzle;
const vlog = require("../util/vlog");
const nestedArrayToString = require('../util/nestedArrayToString')



class Puzzle13_2 extends puzzle {

  run(lines) {
    lines.push('[[2]]', '[[6]]');
    let packets = lines.map((line, i) => {
      return { data: this.getNumArray(line, 0).data, index: i + 1 };
    });


    packets.sort((a, b) => {
      return -this.checkArrayPair(a.data, b.data);
    })
    let indexOfDivider1 = -1;

    let indexOfDivider2 = -1;
    packets.forEach((element, i) => {
      const packetIndex = i + 1;
      if (element.index === lines.length - 1) {
        vlog("Divider 1 at", packetIndex)
        indexOfDivider1 = packetIndex;
      }
      if (element.index === lines.length) {
        vlog("Divider 2 at", packetIndex)
        indexOfDivider2 = packetIndex;
      }

      vlog(element.index, nestedArrayToString(element.data));
    });
    vlog("Dividers at", indexOfDivider1, indexOfDivider2)
    return indexOfDivider1 * indexOfDivider2


  }
}



module.exports = { puzzle: Puzzle13_2 };