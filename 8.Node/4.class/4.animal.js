class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return "아무 소리나 냄";
  }
}

// 이것을 상속(inheritance)이라고 부름
class Dog extends Animal {
  makeSound() {
    // 함수의 오버라이딩;
    // 부모함수를 그대로 쓸 수도 있고 내가 재정의 할 수도 있음
    return `${this.name} 멍멍`;
  }
}

class Cat extends Animal {
  makeSound() {
    return `${this.name} 야옹`;
  }
}

const aAnimal = new Animal("hc");
const aSound = aAnimal.makeSound();
console.log(aSound);

const aDog = new Dog("동이");
const aDogSound = aDog.makeSound();
console.log(aDogSound);

const bDog = new Dog("초코");
const bDogSound = bDog.makeSound();
console.log(bDogSound);

const aCat = new Cat("kitty");
const aCatSound = aCat.makeSound();
console.log(aCatSound);
