module.exports = function nestedArrayToString(arr) {
  let result = '[';

  arr.forEach((element, i) => {
    if (Array.isArray(element)) {
      result += nestedArrayToString(element);
    } else {
      result += element.toString();
    }
    if (i + 1 < arr.length) {
      result += ',';
    }
  });
  result += "]";
  return result;

}