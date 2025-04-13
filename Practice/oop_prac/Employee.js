class Employee {
  constructor(name, jobTitile) {
    this.name = name;
    this.jobTitile = jobTitile;
  }
  greeting() {
    return console.log(`안녕하세요. ${this.jobTitile} ${super.name} 입니다.`);
  }
}

module.exports = Employee;
