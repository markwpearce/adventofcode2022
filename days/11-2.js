const Day = require("./day").Day;
const vlog = require("../util/vlog");
const largestInArray = require("../util/largestInArray");


class MonkeyToss {
  constructor(nextMonkeyNum, itemWorryLevel) {
    this.monkeyNum = nextMonkeyNum;
    this.itemWorryLevel = itemWorryLevel;

  }
}



class Monkey {
  constructor(number, startingItems, operStr, testDivisor, trueMonkeyNum, falseMonkeyNum) {
    this.number = number;
    this.items = startingItems;
    this.operStr = operStr
    this.testDivisor = testDivisor;
    this.trueMonkeyNum = trueMonkeyNum;
    this.falseMonkeyNum = falseMonkeyNum;
    this.inspections = 0;
  }

  doTest(x) {
    if (x % this.testDivisor === 0) {
      vlog("is divisible by", this.testDivisor, "thrown to", this.trueMonkeyNum)
      return this.trueMonkeyNum
    }
    vlog("is Not divisible by", this.testDivisor, "thrown to", this.falseMonkeyNum)

    return this.falseMonkeyNum;
  }

  operation(old) {
    let val = eval(this.operStr);
    vlog("Worry level ", this.operStr, val);
    return val;
  }


  inspectItems() {
    let nextMonkeys = [];
    vlog("Monkey", this.number);
    this.items.forEach(item => {
      vlog("Inspects item", item)
      let worryLevel = this.operation(item);
      nextMonkeys.push(new MonkeyToss(this.doTest(worryLevel), worryLevel));
      this.inspections++;
    });
    this.items = [];
    return nextMonkeys;
  }

  itemsStr() {
    return this.items.map(x => x.toString()).join(', ')
  }


  toString() {
    let str = `Monkey ${this.number}:
    Items: ${this.itemsStr()}
    Operation: new = ${this.operStr}
    Test: divisible by ${this.testDivisor}
      If true: throw to monkey ${this.trueMonkeyNum}
      If false: throw to monkey ${this.falseMonkeyNum}
`;
    return str;
  }
}



class Puzzle11_1 extends Day {



  getMonkeyData(lines) {

    let monkeys = [];

    for (let i = 0; i < lines.length / 6; i++) {
      let groupLine = i * 6;
      let num = parseInt(lines[groupLine].match(/\D*(\d*)/)[1]);
      let items = lines[groupLine + 1].match(/Starting items: ((\d*, )*\d*)/)[1].split(',').map(n => n.trim()).map(x => parseInt(x, 10));
      let opr = lines[groupLine + 2].match(/= (.*)/)[1]
      let divisor = parseInt(lines[groupLine + 3].match(/\D*(\d*)/)[1]);
      let trueMon = parseInt(lines[groupLine + 4].match(/\D*(\d*)/)[1]);
      let falseMon = parseInt(lines[groupLine + 5].match(/\D*(\d*)/)[1]);

      let monkey = new Monkey(num, items, opr, divisor, trueMon, falseMon)
      vlog(monkey.toString())
      monkeys.push(monkey);
    }


    return monkeys;
  }




  run(lines) {


    this.monkeys = this.getMonkeyData(lines);


    let divisors = this.monkeys.map(mon => mon.testDivisor);

    this.prime = divisors.reduce((cum, val) => cum *= val, 1);


    for (let round = 0; round < 10000; round++) {
      this.monkeys.forEach(monkey => {
        let nextMonkeys = monkey.inspectItems();
        nextMonkeys.forEach(next => {
          let worryLevel = next.itemWorryLevel;
          worryLevel = worryLevel % this.prime;
          this.monkeys[next.monkeyNum].items.push(worryLevel)
        })
      })
      vlog("After round", round);
      this.monkeys.forEach(monkey => {
        vlog("Monkey", monkey.number, ":", monkey.itemsStr())
      });


    }

    let inspections = this.monkeys.map(mon => mon.inspections);

    vlog(inspections);

    let largest = largestInArray(inspections, 2);
    vlog(largest);


    return largest[0] * largest[1];

  }


}
module.exports = { puzzle: Puzzle11_1 };