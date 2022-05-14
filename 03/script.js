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
  let timeOutId;

  return function() {
    console.log('object');
    clearTimeout(timeOutId);
    timeOutId = setTimeout(func, time);
  };
}