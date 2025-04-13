// 자동차는 sedan, suv

class Car {
  constructor(brand, model, color) {
    this.brand = brand;
    this.model = model;
    this.color = color;
  }

  start() {
    return `${this.brand} ${this.model}가 시동을 걸었습니다.`;
  }

  getInCar() {
    // 철수이(가) 현대 그랜저에 탑승했습니다.
    return `${this.name}이(가) ${super.brand} ${super.model}에 탑승했습니다.`;
  }

  driveCar() {
    return `${this.name}이(가) ${this.brand} ${this.model}를 운전하고 있습니다.`;
  }

  stop() {
    return `${this.brand} ${this.model}가 멈췄습니다.`;
  }
}

module.exports = Car;
