function sum(a, b, c) {
  console.log(`a=${a}, b=${b}, c=${c}`);
  return a + b + c;
}

// 1. 正常调用
const result1 = sum(10, 20, 30);
console.log('正常调用结果:', result1);

// 2. 使用 call 调用
const result2 = sum.call(null, 10, 20, 30);
console.log('call 调用结果:', result2);

// 案例分析：
// sum.apply(null, numbers) 这行代码执行时，JavaScript 引擎做了如下转换：
// apply 接收到数组 [10, 20, 30]。
// 它将这个数组“展开”成独立的元素：10, 20, 30。
// 它以这些展开的元素作为参数去调用 sum 函数。
// 最终的内部调用效果等同于 sum(10, 20, 30)。
// apply可以看作是call的一个语法糖

// 3. 使用 apply 调用
const numbers = [10, 20, 30];
// apply 的第一个参数 'null' 表示 'this' 上下文，这里我们不关心它。
// 第二个参数是我们的数组。
const result3 = sum.apply(null, numbers);
console.log('apply 调用结果:', result3);

// const res = Math.max(1,2,3);
const arr = [1, 2, 3];
const res1 = Math.max(...arr);
const res2 = Math.max.apply(null, arr);
console.log('res:', res1, res2);
