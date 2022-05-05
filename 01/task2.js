const num1 = prompt('Введите первое число', '').replace(/,/, '.');

const showAnswer = (n1, n2) => {
  if(isNaN(Number(n2)) || !n2.trim() || Number(n2) === 0) {
    console.log('Некорректный ввод!');
  } else {
    console.log(`Ответ: ${n1+Number(n2)}, ${n1/Number(n2)}`);
  }
}

if(isNaN(Number(num1)) || !num1.trim()) {
  console.log('Некорректный ввод!');
} else {
  const num2 = prompt('Введите второе число', '').replace(/,/, '.');
  showAnswer(+num1, num2);
}