const ERRORS_TEXT = {
  incorrectNum: 'Невалидное число!',
  fullSteck: 'Стек переполнен!',
  emptyStack: 'Стек пуст!',
  notIterable: 'Сущность не является итерируемой!'
};

class Node {
  constructor(item) {
    this.value = item;
    this.next = null;
  }
}

class Stack {
  constructor(max = 10) {
    if (!isNumber(max)) {
      throwError(ERRORS_TEXT.incorrectNum);
    }

    this.first = null;
    this.max = max;
    this.size = 0;
  }

  push(elem) {
    if (this.max === this.size) {
      throwError(ERRORS_TEXT.fullSteck);
    }

    const newItem = new Node(elem);

    if (!this.first) {
      this.first = newItem;
    } else {
      const tmp = this.first;

      this.first = newItem;
      this.first.next = tmp;
    }

    this.size++;
  }

  pop() {
    if (!this.first) {
      throwError(ERRORS_TEXT.emptyStack);
    }

    const result = this.first.value;

    this.first = this.first.next;

    this.size--;

    return result;
  }

  peek() {
    if (!this.first) {
      throwError(ERRORS_TEXT.emptyStack);
    }

    return this.first.value;
  }

  isEmpty() {
    return this.size === 0;
  }

  toArray() {
    const resultArray = [];
    let curValue = this.first;

    while (resultArray.length < this.size) {
      resultArray.unshift(curValue.value);

      curValue = curValue.next;
    }

    return resultArray;
  }

  static fromIterable(iterable) {
    if (!isIterable(iterable)) {
      throwError(ERRORS_TEXT.notIterable);
    }

    const newStack = new Stack(iterable.length);

    for (let item of iterable) {
      newStack.push(item);
    }

    return newStack;
  }
}

function isNumber(item) {
  return typeof item === 'number' && !isNaN(item) && item !== Infinity && item !== -Infinity;
}

function throwError(textError) {
  throw new Error(textError);
}

function isIterable(value) {
  return Symbol.iterator in Object(value);
}