// 사람은 parent, child
const Sedan = require("./Sedan");

class Person {
  constructor(name, age, gender, job) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.job = job;
  }

  getInCar(Car) {
    // Sedan { brand: '현대', model: '그랜저', color: '검정', trunkSize: 500 }
    // 철수이(가) 현대 그랜저에 탑승했습니다.
    if (Car instanceof Sedan) {
      console.log(
        `Sedan { brand: '${Car.make}', model: '${Car.model}', color: '${Car.color}', trunkSize: ${Car.trunkSize} }`
      );
    }
    return `${this.name}이(가) ${Car.brand} ${Car.model}에 탑승했습니다.`;
  }

  driveCar(Car) {
    return `${this.name}이(가) ${Car.brand} ${Car.model}를 운전하고 있습니다.`;
  }

  playInCar() {
    return `${this.name}이(가) 차 안에서 장난을 치고 있습니다.`;
  }
}
module.exports = Person;
