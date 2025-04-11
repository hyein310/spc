class Person {
  constructor(name) {
    this.name = name;
  }
  greeting() {
    return console.log(`안녕하세요. ${this.name} 입니다.`);
  }
}

module.exports = Person;
