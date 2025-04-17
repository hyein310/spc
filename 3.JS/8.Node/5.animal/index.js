const Animal = require("./Animal");
const Dog = require("./Dog");
const Cat = require("./Cat");

// 사용하기 위해서는 require 불러오기, export 내보내기 잊지 않기

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
