const num1 = prompt('Введите первое число', '').replace(/,/, '.');
const num2 = +prompt('Введите второе число', '');

if(isNaN(Number(num1)) || !num1.trim() || !Number.isInteger(num2) || num2 < 2 || num2 > 36) {
  console.log('Некорректный ввод!');
} else {
  console.log(Number(num1).toString(num2));
}