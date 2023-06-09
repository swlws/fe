# Class



# 1. class 与 function 的转化

```ts
class A {
  name = "xx";
  age!: number;
  log: (message: string) => void;

  static config = {};

  constructor() {
    this.age = 10;

    this.log = function (message: string) {
      console.log("mesage");
    };
  }

  show() {
    console.log("show");
  }
}
```

```js
// es5
var A = /** @class */ (function () {
  function A() {
    this.name = "xx";
    this.age = 10;
    this.log = function (message) {
      console.log("mesage");
    };
  }
  A.prototype.show = function () {
    console.log("show");
  };
  A.config = {};
  return A;
})();
```

注意点：

1. 类属性挂在到 Function 的 this
2. 类方法挂载到 Function 的的 prototype
3. 类静态属性挂载到 Function 的自身上


# 2. class中的super

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields

In the field initializer, this refers to the class instance under construction, and super refers to the prototype property of the base class, which contains the base class's instance methods, but not its instance fields.