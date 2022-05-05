const NUM1 = prompt('Введите первое число', '').replace(/,/, '.');

const showAnswer = (n1, n2) => {
  const checkNum2 = Boolean(isNaN(+n2) || !n2.trim() || +n2 === 0);

  if (checkNum2) {
    console.log('Некорректный ввод!');
  } else {
    console.log(`Ответ: ${n1+Number(n2)}, ${n1/Number(n2)}`);
  }
}

if (isNaN(+NUM1) || !NUM1.trim()) {
  console.log('Некорректный ввод!');
} else {
  const num2 = prompt('Введите второе число', '').replace(/,/, '.');

  showAnswer(+NUM1, num2);
}