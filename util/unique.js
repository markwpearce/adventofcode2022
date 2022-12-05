module.exports = function unique(arr) {
  return arr.filter(onlyUnique);
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}