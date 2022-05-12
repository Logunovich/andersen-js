function concatStrings(string, sep = '') {
  let resString = '';
  
  if (string && typeof string === 'string') {
    resString += string;
    resString += isString(sep);

    return function f(string2) {
      if (string2) {
        resString += string2;
        resString += isString(sep);
        return f;
      } else {
        return resString;
      }
    };
  } else {
    return resString.slice(0,resString);
  }
}

function isString(val) {
  return typeof val === 'string' ? val : '';
}

console.log('object');

const resStr = concatStrings('first', '123')('second')('third')();

console.log(resStr);