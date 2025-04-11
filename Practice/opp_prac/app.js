// 상속받은 부모의 이름을 덮어쓰는 키워드가 무엇인지? 설명에 나오지 않았음.. 이름이 두가지 경우가 존재 (super)

// 1. 총 4개의 파일 작성
// 2. 사람은 이름 가짐, 인사를 함
// 3. 학생은 이름, 전공을 가짐, 인사할 경우 이름, 전공 말함
// 4. 직원은 이름, 직급을 가짐, 인사할 경우 이름, 직급 말함

const Person = require("./Person");
const Student = require("./Student");
const Employee = require("./Employee");

const exPerson = new Person("hyein");
const exGreeting = exPerson.greeting();
console.log(exGreeting);
