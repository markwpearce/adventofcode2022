module.exports = function findLargest(arr, n) {
  arr.sort((a, b) => a < b ?
    1 : a > b ? -1 : 0);

  return arr.slice(0, n)
};