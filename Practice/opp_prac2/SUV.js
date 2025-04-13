const Car = require("./Car");

class SUV extends Car {
  constructor(brand, model, color, trunkSize) {
    super.make = brand;
    super.model = model;
    super.color = color;
    this.trunkSize = trunkSize;
  }
}

module.exports = SUV;
