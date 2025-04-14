const Person = require("./Person");

class Parents extends Person {
  driveCar(Car) {
    return `${this.name}이(가) ${Car.brand} ${Car.model}를 운전하고 있습니다.`;
  }
}

module.exports = Parents;
