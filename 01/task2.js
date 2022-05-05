const num1 = prompt('Введите первое число', '').replace(/,/, '.');

const showAnswer = (n1, n2) => {
  if(isNaN(+n2) || !n2.trim() || +n2 === 0) {
    console.log('Некорректный ввод!');
  } else {
    console.log(`Ответ: ${n1+Number(n2)}, ${n1/Number(n2)}`);
  }
}

if(isNaN(+num1) || !num1.trim()) {
  console.log('Некорректный ввод!');
} else {
  const num2 = prompt('Введите второе число', '').replace(/,/, '.');
  showAnswer(+num1, num2);
}