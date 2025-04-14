const Car = require("./Car");

class SUV extends Car {
  constructor(brand, model, color, trunkSize) {
    super(brand, model, color);
    this.trunkSize = trunkSize;
  }
}

module.exports = SUV;
