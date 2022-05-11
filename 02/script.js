const ERRORS_TEXT = {
  incorrectType: 'Некорректный тип данных!',
  incorrectData: 'Невалидные данные!',
  incorrectInterval: 'Некорректный диапазон!'
};

function makeObjectDeepCopy(obj, type = 'obj') {
  if (typeof obj !== 'object') {
    throwError(ERRORS_TEXT.incorrectType);
  }

  let deepCopyObject;
  let oldObject;

  if (Array.isArray(obj)) {
    deepCopyObject = [];
    oldObject = obj;
  } else {
    deepCopyObject = {};
    oldObject = Object.keys(obj);
  }

  oldObject.forEach((item, i) => {
    const index = type === 'obj' ? item : i;
    const curItem = obj[index]; 
    const isItemObject = typeof curItem === 'object' && !Array.isArray(curItem) && curItem !== null;
    
    if (isItemObject) {
      deepCopyObject[index] = makeObjectDeepCopy(curItem, 'obj');
    } else if (Array.isArray(curItem)) {
      deepCopyObject[index] = makeObjectDeepCopy(curItem, 'arr');
    } else {
      deepCopyObject[index] = curItem;
    }
  });

  return deepCopyObject;
}

function selectFromInterval(arr, int1, int2) {
  if(validateNumbers(arr, int1, int2)) {
    let startArr = Math.min(int1, int2) - 1;
    let finishArr = Math.max(int1, int2);

    if (startArr < 0) {
      startArr = 0;
    }

    if (finishArr < 0) {
      finishArr = 0;
    }

    return arr.slice(startArr, finishArr);
  }
}

const MY_ITERABLE = {
  from: 1,
  to: 4
};

MY_ITERABLE[Symbol.iterator] = function() {
  return {
    current: this.from,
    last: this.to,
    range: this.to - this.from,
    next() {
      if (!isNumber(+this.current) || !isNumber(+this.last)) {
        throwError(ERRORS_TEXT.incorrectData);
      } else if (this.range < 0) {
        throwError(ERRORS_TEXT.incorrectInterval);
      }
      
      if (this.current <= this.last) {
        return {
          done: false, 
          value: this.current++ 
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
}

function throwError(textError) {
  throw new Error(textError);
}

function isNumber(item) {
  return typeof item === 'number' && !isNaN(item) && item !== Infinity && item !== -Infinity;
}

function validateNumbers(arr, int1, int2) {
  let findNotNumbers;
  const {incorrectType, incorrectData, incorrectInterval} = ERRORS_TEXT;
  
  if (Array.isArray(arr)) {
    findNotNumbers = arr.some(item => !isNumber(item));
  } else {
    throwError(incorrectType);
  }

  if (findNotNumbers) {
    throwError(incorrectData);
  }

  if (!isNumber(int1) || !isNumber(int2)) {
    throwError(incorrectInterval);
  }

  return true;
}