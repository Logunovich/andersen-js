const BUTTONS_NUM = document.querySelectorAll('[data-number]');
const BUTTONS_ACTION = document.querySelectorAll('[data-action]');
const BUTTON_EQUAL = document.querySelector('[data-equal]');
const BUTTON_NEGATIVE = document.querySelector('[data-negative]');
const BUTTON_DEL = document.querySelector('[data-del]');
const BUTTON_CLEAN = document.querySelector('[data-clean]');
const DISPLAY = document.querySelector('.calculator__value');
const LAST_DISPLAY = document.querySelector('.calculator__action');
const BTN_MS = document.querySelector('#ms');
const BTN_MC = document.querySelector('#mc');
const BTN_MR = document.querySelector('#mr');
const BTN_M_MINUS = document.querySelector('#m_minus');
const BTN_M_PLUS = document.querySelector('#m_plus');
const M_VAL = document.querySelector('#m_val');

class Calculator {
  constructor(last, cur, mVal) {
    this.lastDisp = last;
    this.curDisp = cur;
    this.mDisp = mVal;
    this.clean();
  }

  clean() {
    this.curVal = '';
    this.lastVal = '';
    this.action = undefined;
    this.isNegative = false;
  }

  delete() {
    this.curVal = this.curVal.toString().slice(0, -1);
  }

  negative() {
    this.isNegative = !this.isNegative;
  }

  showNumber(num) {
    if (num === '.' && this.curVal.includes('.')) {
      return;
    }

    if (num === '.' && !this.curVal.length) {
      this.curVal = '0';
    }

    if (num === '0' && this.curVal === '') {
      this.curVal = '0.';

      return;
    }
    
    const lengthStringNum = this.curVal.replace(/\./, '').replace(/-/, '').length;

    if (lengthStringNum >= 9) {
      return;
    }
    
    this.curVal = this.curVal.toString() + num.toString();
  }

  actions(action) {
    if (this.curVal === '') {
      return;
    }

    if (this.lastVal !== '') {
      this.compute();
    }

    const minus = this.isNegative ? '-' : '';

    this.action = action;
    this.lastVal = minus + this.curVal;
    this.curVal = '';
    this.isNegative = false;
  }

  compute() {
    let result;
    const minus = this.isNegative ? '-' : '';

    const prevVal = parseFloat(this.lastVal);
    const newVal = parseFloat(minus + this.curVal);

    if (isNaN(prevVal) || isNaN(newVal)) {
      return;
    }

    switch (this.action) {
      case '+': 
        result = prevVal + newVal;
        break;
      case '-':
        result = prevVal - newVal;
        break;
      case '×':
        result = prevVal * newVal;
        break;
      case '/':
        result = prevVal / newVal;
        break;
      default: 
        return;
    }

    let secondSlice = 9;

    if (result.toString().includes('.')) {
      secondSlice += 1;
    } 

    if (result.toString().includes('-')) {
      secondSlice += 1;
    }

    this.curVal = result.toString().slice(0, secondSlice);
    this.lastVal = '';
    this.action = undefined;
    this.isNegative = false;
  }

  updateValue() {
    const minus = this.isNegative ? '-' : '';

    this.curDisp.innerText = minus + this.curVal; 
    
    if (this.action !== undefined) {
      this.lastDisp.innerText = `${this.lastVal} ${this.action}`; 
    } else {
      this.lastDisp.innerText = this.lastVal;
    }
  }

  updateMVal() {
    if (this.mVal) {
      this.mDisp.innerText = this.mVal;
    } else {
      this.mDisp.innerText = '0';
    }
  }

  memoSave() {
    const minus = this.isNegative ? '-' : '';
    const newMVal = parseFloat(minus + this.curVal);

    if (isNaN(newMVal)) {
      return;
    }

    this.mVal = newMVal;
  }

  memoShow() {
    this.curVal = this.mVal !== undefined ? this.mVal : this.curVal;
  }

  memoClear() {
    this.mVal = undefined;
  }

  memoAction(act) {
    if (act === 'plus') {
      this.mVal += +this.curVal;
    } else {
      this.mVal -= +this.curVal;
    }
  }
}

const CALC = new Calculator(LAST_DISPLAY, DISPLAY, M_VAL);

BUTTONS_NUM.forEach((item) => {
  item.addEventListener('click', () => { 
    CALC.showNumber(item.innerText);

    CALC.updateValue();
  })
});

BUTTONS_ACTION.forEach((item) => {
  item.addEventListener('click', () => { 
    CALC.actions(item.innerText);
    
    CALC.updateValue();
  })
});

BUTTON_EQUAL.addEventListener('click', () => {
  CALC.compute();
  CALC.updateValue();
});

BUTTON_CLEAN.addEventListener('click', () => {
  CALC.clean();
  CALC.updateValue();
});

BUTTON_DEL.addEventListener('click', () => {
  CALC.delete();
  CALC.updateValue();
});

BUTTON_NEGATIVE.addEventListener('click', () => {
  CALC.negative();
  CALC.updateValue();
});

BTN_MS.addEventListener('click', () => {
  CALC.memoSave();  
  CALC.updateMVal();
});

BTN_MC.addEventListener('click', () => {
  CALC.memoClear();
  CALC.updateMVal();
});

BTN_MR.addEventListener('click', () => {
  CALC.memoShow();
  CALC.updateValue();
});

BTN_M_MINUS.addEventListener('click', () => {
  CALC.memoAction('minus');
  CALC.updateMVal();
});

BTN_M_PLUS.addEventListener('click', () => {
  CALC.memoAction('plus');
  CALC.updateMVal();
});