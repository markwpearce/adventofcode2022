const Day = require("./day").Day;
const vlog = require("../util/vlog");

class Puzzle7_1 extends Day {



  changeDir(newDir) {
    if (newDir === '/') {
      this.currentDir = []
    }
    else if (newDir === ".." && this.currentDir.length > 0) {
      this.currentDir.pop()
    }
    else {
      this.currentDir.push(newDir)
    }
  }

  getCurDirObj() {
    let curDirObj = this.dirTree;
    for (const dirName of this.currentDir) {
      if (!curDirObj.dirs[dirName]) {
        vlog("adding unknown dir")
        curDirObj.dirs[dirName] = this.makeDir(dirName);
      }
      curDirObj = curDirObj.dirs[dirName];
    }
    return curDirObj;
  }

  makeDir(name) {
    return {
      name: name,
      files: {},
      dirs: {},
      // size: 0
    }
  }


  addDir(name) {
    let curDirObj = this.getCurDirObj();
    curDirObj.dirs[name] = this.makeDir(name);
  }


  getSize(dir) {
    return Object.values(dir.files).reduce((cum, val) => cum += val, 0) + Object.values(dir.dirs).map(dir => this.getSize(dir)).reduce((cum, item) => cum + item, 0);
  }


  addFile(size, name) {
    let curDirObj = this.getCurDirObj();
    curDirObj.files[name] = size;
    //   curDirObj.size += size
  }

  readLsLines(lines) {

    while (lines.length > 0) {

      if (lines[0].startsWith('$')) {
        break;
      }
      let parts = lines[0].split(' ');
      if (parts[0] === 'dir') {
        this.addDir(parts[1])
      }
      else {
        this.addFile(parseInt(parts[0], 10), parts[1]);
      }
      lines.shift();
    }
  }

  processCmd(cmd, nextLines) {
    let parts = cmd.split(' ')

    switch (parts[0]) {
      case 'cd':
        vlog("Change dir :", parts[1]);

        this.changeDir(parts[1]);

        break;
      case 'ls':
        vlog("Listing files");
        this.readLsLines(nextLines);
        break;
      default:
        vlog("UNKNOWN COMMAND:", cmd);
    }
  }


  processLine(line, nextLines) {
    if (line[0] === '$') {
      vlog("Line:", line);
      return this.processCmd(line.substring(2), nextLines)
    }
  }



  traverseDirs(dir, fn) {
    for (const dirName in dir.dirs) {
      fn(dir.dirs[dirName])
      this.traverseDirs(dir.dirs[dirName], fn)
    }
  }


  buildDirTree(lines) {
    this.dirTree = this.makeDir('/')
    this.curDirObj = this.dirTree
    this.currentDir = []
    while (lines.length > 0) {
      let line = lines[0]
      lines.shift()
      this.processLine(line, lines)
    }

    vlog(this.dirTree);

  }




  run(lines) {
    this.buildDirTree(lines)

    let allDirs = []

    this.traverseDirs(this.dirTree, (dir) => allDirs.push(this.getSize(dir)))


    vlog(allDirs)
    let filtered = allDirs.filter(sz => sz <= 100000)
    vlog(filtered)
    let total = filtered.reduce((cum, val) => {
      cum += val;
      return cum;
    }, 0)

    return total
  }
}

module.exports = { puzzle: Puzzle7_1 };