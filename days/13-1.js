const Day = require("./day").Day;
const vlog = require("../util/vlog");
const nestedArrayToString = require('../util/nestedArrayToString')

class Puzzle13_1 extends Day {


  /**
   *
   * @param {string} line
   * @param {number} iStart
   * @return {{charCount: number, data: (number|number[])[])}}
   */
  getNumArray(line, iStart) {
    let result = [];
    let i = iStart;
    while (i < line.length) {
      let char = line[i];
      if (char === '[') {
        const { charCount, data } = this.getNumArray(line, i + 1)
        result.push(data)
        i += charCount
        continue;
      }
      else if (char === ']') {
        return { data: result, charCount: i - iStart + 2 };
      }
      else if (char === ',') {
        i++;
        continue;
      }
      const nextComma = line.indexOf(',', i);
      const nextSquareBracket = line.indexOf(']', i);
      const nextDelim = nextComma > -1 ? Math.min(nextComma, nextSquareBracket) : nextSquareBracket;

      const nextNumStr = line.substring(i, nextDelim);
      const num = parseInt(nextNumStr, 10);
      result.push(num);
      i = nextDelim;
    }
    return { data: result[0], charCount: line.length }
  }

  parsePairs(lines) {
    const pairs = [];
    for (let index = 0; index < lines.length; index += 2) {
      if (lines[index][0] === 'x') {
        continue;
      }
      const first = lines[index];
      const second = lines[index + 1];
      const numsFirst = this.getNumArray(first, 0).data;
      const numsSecond = this.getNumArray(second, 0).data
      vlog(index, numsFirst);
      vlog(index + 1, numsSecond)
      pairs.push([numsFirst, numsSecond]);
    }

    return pairs;
  }

  printResult(indent, leftSizeSmaller) {
    vlog(indent, "  -", leftSizeSmaller ? "Left side" : "Right side", "is smaller, so inputs are", leftSizeSmaller ? "in the right order" : "not in the right order");
  }

  printResultRanOut(indent, leftSizeSmaller) {
    vlog(indent, "-", leftSizeSmaller ? "Left side" : "Right side", "ran out of items, so inputs are", leftSizeSmaller ? "in the right order" : "not in the right order")
  }

  checkIntPair(a, b) {
    return b - a;
  }

  /**
   *
   * @param {(number | number[])[]} arr1
   * @param {(number | number[])[]} arr2
   * @returns {number}
   */
  checkArrayPair(arr1, arr2, step = 0) {
    const indent = '  '.repeat(step)
    vlog(indent, "- Compare", nestedArrayToString(arr1), "vs", nestedArrayToString(arr2));
    let a = arr1[0];
    let b = arr2[0];
    let i = 0;
    let minLength = Math.min(arr1.length, arr2.length)
    if (minLength == 0) {
      if (arr1.length === arr2.length) {
        vlog(indent, "- Both Length zero")
        return 0;
      }
      const leftSizeSmaller = arr1.length < arr2.length;
      this.printResultRanOut(indent, leftSizeSmaller);
      return leftSizeSmaller ? 1 : -1;
    }
    while (i < minLength) {
      let checkResult = 0;
      if (typeof a == 'number' && typeof b == 'number') {
        vlog(indent, "- Compare", a, "vs", b);
        const checkResult = this.checkIntPair(a, b);
        if (checkResult > 0) {
          this.printResult(indent, true);
          return 1;
        } else if (checkResult < 0) {
          this.printResult(indent, false);
          return -1;
        }
      } else if (typeof a == 'number') {
        vlog(indent, " - Mixed types; convert left to", [a], "and retry comparison")
        checkResult = this.checkArrayPair([a], b, step + 1);
      } else if (typeof b == 'number') {
        vlog(indent, " - Mixed types; convert right to", [b], "and retry comparison")
        checkResult = this.checkArrayPair(a, [b], step + 1);
      } else {
        checkResult = this.checkArrayPair(a, b, step + 1);
      }
      if (checkResult !== 0) {
        return checkResult;
      }
      i++;
      if (i < minLength) {
        a = arr1[i];
        b = arr2[i];
        continue;
      }
      if (arr1.length === arr2.length) {
        //vlog(indent, "- at end of arrays")
        return 0;
      }
      const leftSizeSmaller = arr1.length < arr2.length;
      this.printResultRanOut(indent, leftSizeSmaller);
      return leftSizeSmaller ? 1 : -1;
    }
    //vlog(indent, "At end?")
    return 0;
  }


  run(lines) {
    const pairs = this.parsePairs(lines);
    let sumCorrectIndexes = 0
    pairs.forEach((pair, i) => {
      vlog(`== Pair ${i + 1} ==`)
      const check = this.checkArrayPair(pair[0], pair[1]);
      // vlog(i + 1, pair[0], pair[1], check)
      if (check === 1) {
        sumCorrectIndexes += (i + 1);
      }
    });

    return sumCorrectIndexes;
  }


}


module.exports = { puzzle: Puzzle13_1 };