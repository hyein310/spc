class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  // 객체 안의 변수에는 직접 접근이 안되니까 setter/getter 를 통해서 내부 변수에 접근
  get diameter() {
    return this._radius * 2;
  }

  set diameter(diameter) {
    return (this._radius = diameter / 2);
  }
}

const myCircle = new Circle(5); // 반지름 5짜리 원
console.log(myCircle.diameter); // 결과 : 10

myCircle.diameter = 14; // 이후에 값을 변경
console.log(myCircle._radius); // 내부 변수에 직접 접근해서 radius 가 diameter 로부터 잘 저장되었는지 확인,
// 하지만 이렇게 내부 변수에 직접 접근하는 방식은 좋은 접근 방식이 아님
// 그래서 이걸 막고자 ES2022 부터는 내부 변수 접근을 막기 위해서 #(private) 이 사용됨
console.log(myCircle.diameter);
