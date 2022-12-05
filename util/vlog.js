module.exports = function log(...messages) {
  if (program.opts().verbose) {
    console.log(...messages);
  }
}