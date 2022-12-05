const Day = require("./day").Day;
const vlog = require("../util/vlog");
const unique = require("../util/unique");

class Puzzle3_1 extends Day {


  getHalves(lines) {
    let len = lines.length / 2;
    return [lines.substring(0, len), lines.substring(len)];
  }


  findCommon(parts) {
    let matches = unique(parts[0].match(new RegExp('[' + parts[1] + ']', 'g'))).join('')

    for (let i = 2; i < parts.length; i++) {
      matches = unique(matches.match(new RegExp('[' + parts[i] + ']', 'g'))).join('')
    }
    return matches;
  }

  getLetterValue(letter) {
    if (letter === letter.toLowerCase()) {
      return letter.charCodeAt(0) - 96;
    }
    return letter.charCodeAt(0) - 64 + 26;
  }


  run(lines) {
    let total = 0
    for (const line of lines) {
      let halves = this.getHalves(line);
      let common = this.findCommon(halves);
      let value = this.getLetterValue(common);
      vlog(common, value);
      total += value;
    }
    return total;
  }
}


module.exports = { puzzle: Puzzle3_1 };