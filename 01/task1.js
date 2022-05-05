const num1 = prompt('Введите первое число', '').replace(/,/, '.');
const num2 = +prompt('Введите второе число', '');

const checkNum1 = Boolean(isNaN(Number(num1)) || !num1.trim());
const checkNum2 = Boolean(!Number.isInteger(num2) || num2 < 2 || num2 > 36);

if(checkNum1 || checkNum2) {
  console.log('Некорректный ввод!');
} else {
  console.log(Number(num1).toString(num2));
} 