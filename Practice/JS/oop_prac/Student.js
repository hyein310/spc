const Person = require("./Person");

class Student extends Person {
  constructor(name, major) {
    super(name);
    this.major = major;
  }

  greeting() {
    return console.log(`저는 ${this.major} ${this.name} 입니다.`);
  }
}

module.exports = Student;
