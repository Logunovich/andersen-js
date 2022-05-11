const NUM1 = prompt('Введите первое число', '').replace(/,/, '.');
const NUM2 = +prompt('Введите второе число', '');
const CHECKNUM1 = isNaN(+NUM1) || !NUM1.trim();
const CHECKNUM2 = !Number.isInteger(NUM2) || NUM2 < 2 || NUM2 > 36;

if (CHECKNUM1 || CHECKNUM2) {
  console.log('Некорректный ввод!');
} else {
  console.log(Number(NUM1).toString(NUM2));
} 