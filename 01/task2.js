const num1 = prompt('Введите первое число');

const showAnswer = (n1, n2) => {
    if(Number.isInteger(n2) && n2 !== 0) {
        console.log(`Ответ: ${n1+n2}, ${n1/n2}`);
    } else {
        console.log('Некорректный ввод!');
    }
}

if(!Number.isInteger(+num1) || !num1) {
    console.log('Некорректный ввод!');
} else {
    showAnswer(+num1, +prompt('Введите второе число'));
}