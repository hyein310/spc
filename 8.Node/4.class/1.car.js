class car {
  constructor(make, model) {
    // 초기화 함수
    this.make = make; // let make = ""; 라는 값이 생성된 것과 같음
    this.model = model; // 객체 내부 변수(속성 = property) 에 저장
  }

  drive() {
    return `${this.make} ${this.model} is Driving~~..`;
  }

  doorOpen() {
    return `${this.make} ${this.model} 의 문이 열립니다.`;
  }

  doorClose() {
    return `${this.make} ${this.model} 의 문이 닫힙니다.`;
  }
}

const myCar = new car("현대", "K5");
console.log(myCar.drive());
const myNewCar = new car("테슬라", "모델S");
console.log(myNewCar.drive());
console.log(myNewCar.doorOpen());
console.log(myNewCar.doorClose());

console.log(typeof myCar); // object
console.log(myCar instanceof Error); // fasle
console.log(myCar instanceof car); // true
