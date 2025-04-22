/**
* @param left
* @param right
* @returns {Boolean}
*/
// a inctanceOf b  ------>  构造函数b 的原型prototype的属性是否来自 实例化对象a 的原型链上
function myInstanceOf(left, right) {
  // 简单类型直接返回false
  if (typeof left !== 'object' && typeof left !== 'function') return false;
  if (left === null) return false;

  // 获取原型
  let proto = Object.getPrototypeOf(left)
  // 循环判断是否来自原型链
  while (true) {
    // 没有找到返回false
    if (proto === null) return false
    // 找到了（来自构造函数的原型）返回true
    if (proto === right.prototype) return true

    // 接着往实例化对象的原型链上找
     proto = Object.getPrototypeOf(proto)
  }
}
