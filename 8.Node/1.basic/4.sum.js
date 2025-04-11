// function sum_to_num(num) {
//   // 주어진 숫자까지의 합산
//   // 가우스 공식 => n개의 합을 구할 때, n*(n+1)/2
//   let sum = 0;
//   for (let i = 1; i <= num; i++) {
//     sum += i;
//   }
//   console.log(`${num} 까지의 합은 ${sum}`);
// }

// sum_to_num(100);

function sum_gauss_num(num) {
  return (num * (num + 1)) / 2;
}

console.log("가우스 이용 : ", sum_gauss_num(10));
console.log("가우스 이용 : ", sum_gauss_num(1000000000));
