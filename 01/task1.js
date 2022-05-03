const num1 = +prompt('Введите первое число');
const num2 = +prompt('Введите второе число');

if(!Number.isInteger(num1) || !Number.isInteger(num2) || num2 < 2 || num2 > 36) {
    console.log('Некорректный ввод!')
} else {
    console.log(+num1.toString(num2))
}