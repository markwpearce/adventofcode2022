const LetterDay = require("./day").LetterDay;
const vlog = require("../util/vlog");

class Puzzle6_1 extends LetterDay {


  findUniqueSection(letters, sectionLength) {
    let result = -1
    for (let i = 0; i < letters.length - sectionLength; i++) {
      let part = letters.slice(i, i + sectionLength);
      let foundDupe = false
      for (let j = 0; j < sectionLength; j++) {
        if (part.includes(part[j], j + 1)) {
          foundDupe = true;
          break;
        }
      }
      if (!foundDupe) {
        result = i + sectionLength;
        break;
      }
    }
    return result;
  }




  run(lines) {
    let result = -1;
    for (const letters of lines) {
      result = this.findUniqueSection(letters, 4);
      vlog(result)

    }
    return result;
  }
}


module.exports = { puzzle: Puzzle6_1 };