# Object

# 1. 属性遍历

- Object.keys
  - 返回一个由一个给定对象的`自身可枚举属性`组成的数组
- Object.values
  - 返回一个给定对象`自身可枚举属性值`的数组
- Object.entries
  - 返回一个给定对象`自身可枚举属性的键值对`数组
- for...in
  - 除了`自身的可枚举属性`，还会枚举`原型链中的属性`
- Object.getOwnPropertyDescriptors
  - 获取一个对象的`所有自身属性`的描述符，包括可枚举和不可枚举
- Object.getOwnPropertyNames
  - 返回一个由指定对象的`所有自身属性`的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组

示例：

```js
const props = {};
Object.defineProperties(props, {
  p_name: {
    value: "p_name",
    enumerable: false,
  },
  p_age: {
    value: 123,
    enumerable: true,
  },
});

function Base() {
  this.name = "base_name";
  this.age = 123;
}
Base.prototype = props;

let a = new Base();

console.log(Object.keys(a)); // [ 'name', 'age' ]

console.log(Object.entries(a)); // [ [ 'name', 'base_name' ], [ 'age', 123 ] ]

for (let k in a) console.log(k); // name age p_age

console.log(Object.getOwnPropertyDescriptors(a));
// output
// {
//   name: {
//     value: 'base_name',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   age: { value: 123, writable: true, enumerable: true, configurable: true }
// }

console.log(Object.getOwnPropertyNames(props)); // [ 'p_name', 'p_age' ]
```

# 2. 属性扩展

默认一个对象是可扩展的，当使用一下 API 时，可使得对象变为不可扩展。

- Object.freeze
  - 冻结一个对象。
  - 一个被冻结的对象再也不能被修改；
  - 冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，
  - 不能修改该对象已有属性的可枚举性、可配置性、可写性，
  - 不能修改已有属性的值。
  - 此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。
  - `Object.isFrozen()` 方法判断一个对象是否被冻结。
- Object.seal
  - 封闭一个对象。
  - 阻止添加新属性并将所有现有属性标记为不可配置(不能执行 delete 操作)。
  - 当前属性的值只要原来是可写的就可以改变。
  - `Object.isSealed()` 方法判断一个对象是否被密封。
- Object.preventExtensions
  - 让一个对象变的不可扩展，也就是永远不能再添加新的属性。
  - `Object.isExtensible()`判断一个对象是否不可扩展。

[Object.isExtensible()的校验规则](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)。当一个对象被这三个 API 执行后，`Object.isExtensible`总是返回 true。

`Object.isSealed()`的[校验规则](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed#%E7%A4%BA%E4%BE%8B)。

[Object.isFrozen()的校验规则](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen#%E6%8F%8F%E8%BF%B0)

# 3. toString() 和 valueOf()
