const Parents = require("./Parents");
const Child = require("./Child");
const Sedan = require("./Sedan");

// 부모와 자녀 객체 생성
const dad = new Parents("철수", 45, "남성", "회사원");
const daughter = new Child("지연", 10, "여성", "초등학교 4학년");
const son = new Child("민수", 8, "남성", "초등학교 2학년");

// 가족 차량 생성
const familyCar = new Sedan("현대", "그랜저", "검정", 500);

// 시나리오 실행
console.log(familyCar.start());
console.log(dad.getInCar(familyCar));
console.log(dad.driveCar(familyCar));
console.log(daughter.getInCar(familyCar));
console.log(son.getInCar(familyCar));
console.log(daughter.playInCar());
console.log(son.playInCar());
console.log(familyCar.stop());
