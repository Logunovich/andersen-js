function myFilter(func, thisArg) {
  const resArr = [];

  this.forEach((item, index, arr) => {
    if (func.call(thisArg, item, index, arr)) {
      resArr.push(item);
    }
  });

  return resArr;
}

Array.prototype.myFilter = myFilter;

function createDebounceFunction(func, time) {
  return function() {
    setTimeout(func, time);
  };
}