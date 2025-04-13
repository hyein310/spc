class Student {
  constructor(name, major) {
    this.name = name;
    this.major = major;
  }

  greeting() {
    return console.log(`안녕하세요. ${this.major} ${super.name} 입니다.`);
  }
}

module.exports = Student;
