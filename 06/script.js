const ERRORS_TEXT = {
  incorrectText: 'Название должно быть от 1 до 50 символов!',
  incorrectYear: 'Некорректный год выпуска!',
  incorrectSpeed: 'Некорректная максимальная скорость!',
  incorrectFuelVolume: 'Некорректный объем бака!',
  incorrectConsumption: 'Некорректный расход топлива!',
  engineStart: 'Машина уже заведена',
  engineNotStart: 'Машина ещё не заведена',
  incorrectFillTank: 'Неверное количество топлива для заправки',
  fullTank: 'Топливный бак переполнен',
  incorrectCurSpeed: 'Неверная скорость',
  incorrectCurHours: 'Неверное количество часов',
  fastSpeed: 'Машина не может ехать так быстро',
  letStart: 'Машина должна быть заведена, чтобы ехать',
  notEnoughFuel: 'Недостаточно топлива'
};

class Car {
  _brand;
  _model;
  _yearOfManufacturing;
  _maxSpeed;
  _maxFuelVolume;
  _fuelConsumption;
  _currentFuelVolume = 0;
  _isStarted = false;
  _mileage = 0;

  set brand(val) {
    if (!checkStrLength(val)) {
      throwError(ERRORS_TEXT.incorrectText);
    }

    Object.defineProperty(this, '_brand', {value: val, writable: false});
  }

  get brand() {
    return this._brand;
  }

  set model(val) {
    if (!checkStrLength(val)) {
      throwError(ERRORS_TEXT.incorrectText);
    }

    Object.defineProperty(this, '_model', {value: val, writable: false});
  }

  get model() {
    return this._model;
  }

  set yearOfManufacturing(val) {
    if (!checkNum(val, 1900, new Date().getFullYear())) {
      throwError(ERRORS_TEXT.incorrectYear);
    }

    Object.defineProperty(this, '_yearOfManufacturing', {value: val, writable: false});
  }

  get yearOfManufacturing() {
    return this._yearOfManufacturing;
  }

  set maxSpeed(val) {
    if (!checkNum(val, 100, 300)) {
      throwError(ERRORS_TEXT.incorrectSpeed);
    }

    Object.defineProperty(this, '_maxSpeed', {value: val, writable: false});
  }

  get maxSpeed() {
    return this._maxSpeed + ' км/ч';
  }

  set maxFuelVolume(val) {
    if (!checkNum(val, 5, 20)) {
      throwError(ERRORS_TEXT.incorrectFuelVolume);
    }

    Object.defineProperty(this, '_maxFuelVolume', {value: val, writable: false});
  }

  get maxFuelVolume() {
    return this._maxFuelVolume + ' л';
  }

  set fuelConsumption(val) {
    if (!isNumber(val)) {
      throwError(ERRORS_TEXT.incorrectConsumption);
    }

    Object.defineProperty(this, '_fuelConsumption', {value: val, writable: false});
  }

  get fuelConsumption() {
    return this._fuelConsumption + ' л/100км';
  }

  get currentFuelVolume() {
    return this._currentFuelVolume + ' л'; 
  }

  get isStarted() {
    return this._isStarted;
  }

  get mileage() {
    return this._mileage + ' км';
  }

  start() {
    if (this._isStarted) {
      throwError(ERRORS_TEXT.engineStart);
    }

    Object.defineProperty(this, '_isStarted', {value: true, writable: false});
  }

  shutDownEngine() {
    if (!this._isStarted) {
      throwError(ERRORS_TEXT.engineNotStart);
    }

    Object.defineProperty(this, '_isStarted', {value: false, writable: false});
  }

  fillUpGasTank(liters) {
    if (!isNumber(liters) || liters <= 0) {
      throwError(ERRORS_TEXT.incorrectFillTank);
    }

    if (liters + this._currentFuelVolume > this._maxFuelVolume) {
      throwError(ERRORS_TEXT.fullTank)
    }

    Object.defineProperty(this, '_currentFuelVolume', {value: this._currentFuelVolume + liters, writable: false});
  }

  drive(speed, hours) {
    if (!isNumber(speed) || speed <= 0) {
      throwError(ERRORS_TEXT.incorrectCurSpeed);
    }

    if (!isNumber(hours) || hours <= 0) {
      throwError(ERRORS_TEXT.incorrectCurHours);
    }

    if (speed > this._maxSpeed) {
      throwError(ERRORS_TEXT.fastSpeed);
    }

    if (!this._isStarted) {
      throwError(ERRORS_TEXT.letStart);
    }

    const range = (100 / this._fuelConsumption) * this._currentFuelVolume;
    const trip = speed * hours;

    if (trip > range) {
      throwError(ERRORS_TEXT.notEnoughFuel);
    }

    Object.defineProperty(this, '_mileage', {value: this._mileage + trip, writable: false});
    Object.defineProperty(this, '_currentFuelVolume', {value: this._currentFuelVolume - trip / (100 / this._fuelConsumption), writable: false});
  }
}

function checkStrLength(string) {
  return typeof string !== 'string' ? false : string.length >= 1 && string.length <= 50;
}

function checkNum(num, min = -Infinity, max = Infinity) {
  return !isNumber(num) ? false : num < min ? false : num > max ? false : true; 
}

function isNumber(item) {
  return typeof item === 'number' && !isNaN(item) && item !== Infinity && item !== -Infinity;
}

function throwError(textError) {
  throw new Error(textError);
}