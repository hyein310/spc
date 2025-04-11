function sum_to_num(num) {
  // 주어진 숫자까지의 합산
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  console.log(`${num} 까지의 합은 ${sum}`);
}

sum_to_num(100);
