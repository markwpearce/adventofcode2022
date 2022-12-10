module.exports = function arraySum(arr) {
  return arr.reduce((cum, val) => cum += val, 0);

}