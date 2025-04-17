const Animal = require("./Animal");

class Dog extends Animal {
  makeSound() {
    // 함수의 오버라이딩;
    // 부모함수를 그대로 쓸 수도 있고 내가 재정의 할 수도 있음
    return `${this.name} 멍멍`;
  }
}

module.exports = Dog;
