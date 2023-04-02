// class 实现继承
// extends + super()
// 父类
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log(`Hello, ${this.name}`);
  }
}

// 子类
class Student extends Person {
  constructor(name, grade) {
    super(name); // 调用父类构造函数初始化name属性
    this.grade = grade;
  }
  study() {
    console.log(`${this.name} is studying in grade ${this.grade}`);
  }
}

// 测试代码
let student1 = new Student('Tom', 3);
student1.sayHello(); // 输出'Hello, Tom'
student1.study(); // 输出'Tom is studying in grade 3'
console.log(student1 instanceof Person); // 输出true
console.log(student1 instanceof Student); // 输出true


// es5 实现继承
// prototype + Object.create()
// 父类
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, ${this.name}`);
};

// 子类
function Student(name, grade) {
  Person.call(this, name); // 调用父类构造函数初始化name属性
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  console.log(`${this.name} is studying in grade ${this.grade}`);
};

// 测试代码
let student2 = new Student('Tom', 3);
student2.sayHello(); // 输出'Hello, Tom'
student2.study(); // 输出'Tom is studying in grade 3'
console.log(student2 instanceof Person); // 输出true
console.log(student2 instanceof Student); // 输出true
