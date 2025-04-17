const Person = require("./Person");

class Employee extends Person {
  constructor(name, jobTitile) {
    super(name);
    this.jobTitile = jobTitile;
  }
  greeting() {
    return console.log(`저는 ${this.jobTitile} ${this.name} 입니다.`);
  }
}

module.exports = Employee;
