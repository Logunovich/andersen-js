const ERRORS_TEXT = {
  incorrectNum: 'Невалидное число!',
  incorrectData: 'Невалидные данные!',
  valIsZero: 'Нельзя делить на ноль!'
};

function concatStrings(string, sep = '') {
  let resString = '';
  
  if (typeof string === 'string') {
    resString += string;
    resString += isStringSep(sep);

    return function concFun(string2) {
      if (typeof string2 === 'string') {
        resString += string2;
        resString += isStringSep(sep);

        return concFun;
      } else {
        return resString.slice(0, resString.length - isStringSep(sep).length);
      }
    };
  } 
}

class Calculator {
  constructor(val1, val2) {
    if (!isNumber(val1) || !isNumber(val2)) {
      throwError(ERRORS_TEXT.incorrectData);
    }
    
    this.val1 = val1;
    this.val2 = val2;
  }

  setX = (num) => {
    if (!isNumber(num)) {
      throwError(ERRORS_TEXT.incorrectNum);
    }

    this.val1 = num;
  } 

  setY = (num) => {
    if (!isNumber(num)) {
      throwError(ERRORS_TEXT.incorrectNum);
    }

    this.val2 = num;
  }

  logSum = () => {
    console.log(this.val1 + this.val2);
  } 

  logMul = () => {
    console.log(this.val1 * this.val2);
  } 

  logSub = () => {
    console.log(this.val1 - this.val2);
  } 

  logDiv = () => {
    if (this.val2 === 0) {
      throwError(ERRORS_TEXT.valIsZero);
    }

    console.log(this.val1 / this.val2);
  }
}

function isStringSep(val) {
  return typeof val === 'string' ? val : '';
}

function isNumber(item) {
  return typeof item === 'number' && !isNaN(item) && item !== Infinity && item !== -Infinity;
}

function throwError(textError) {
  throw new Error(textError);
}