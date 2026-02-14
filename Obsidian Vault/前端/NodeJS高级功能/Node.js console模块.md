## 日志输出

`console.log()` 是最常用的调试工具之一。它会将信息打印到控制台，通常就是你的终端。下面是一个简单的例子，存放在 `hello.js` 文件中：

```js
console.log('Hello, world!');
```

运行：

```bash
node hello.js
```

输出：

```js
Hello, world!
```

---

### 多参数和不同数据类型

`console.log()` 可以处理多个参数和不同的数据类型。例如：

```js
let fruit = 'apple';
let count = 5;

console.log('I have', count, fruit + 's.');
console.log(`I have ${count} ${fruit}s.`);  // 使用模板字符串
console.log('I have %d %ss.', count, fruit); // 使用格式化字符串
```

输出结果：

```js
I have 5 apples.
I have 5 apples.
I have 5 apples.
```

---

### 对象输出

假设你有一个表示人的对象。你可以直接打印对象，方便查看其内容：

```js
let person = {
    name: 'John',
    age: 30,
    job: 'Developer',
    skills: ['JavaScript', 'Node.js', 'Nest'],
    employed: false,
};

console.log(person);
```

输出：

```js
{
  name: 'John',
  age: 30,
  job: 'Developer',
  skills: [ 'JavaScript', 'Node.js', 'Nest' ],
  employed: false
}
```

这个功能非常有用，可以帮助你在调试过程中快速查看各种数据的内容，也是 `console.log()` 成为开发者常用工具的原因之一。

---

## 警告和错误

在 Node.js 中，`console.error()` 和 `console.warn()` 用于记录错误和警告信息。它们的用法与 `console.log()` 类似，但有一个重要区别：输出的流不同。

程序运行时，会使用三个标准流：

- `stdin`（标准输入）
- `stdout`（标准输出）
- `stderr`（标准错误）

前面 `console.log()` 的信息是输出到 **stdout**，也就是标准输出。  
而 `console.error()` 和 `console.warn()` 输出到 **stderr**（标准错误），通常用于发送错误信息或诊断信息。

这种区分可以让错误和警告信息与普通输出分开，方便调试或单独处理。

例如，`error.js` 文件：

```js
console.error('This is an error message');
console.warn('This is a warning message');
```

运行：

```bash
node error.js
```

输出：

```js
This is an error message
This is a warning message
```

你可以很容易地区分普通日志和错误/警告信息。

---

## 计时：`console.time()` 与 `console.timeEnd()`

开发者经常需要测量代码执行的时间，这对性能优化和调试非常重要。`console.time()` 和 `console.timeEnd()` 成对使用，用于测量代码块的运行时长。

例如，`time.js` 文件：

```js
console.time('Array initializing');

let array = new Array(1000000);
for (let i = 0; i < array.length; i++) {
    array[i] = i;
}

console.timeEnd('Array initializing');
```

这里：

- `console.time('Array initializing')` 启动计时器
- `console.timeEnd('Array initializing')` 停止计时器，并打印耗时（单位：毫秒）

这个例子测量了初始化一百万个元素的数组所需的时间，非常适合在优化代码时发现性能瓶颈。

---

## 时间日志：`console.timeLog()`

`console.timeLog()` 用于在计时器运行过程中打印已经过去的时间，而不停止计时器。这在你想查看任务进度时很有用。

例如，`timeLog.js` 文件：

```js
console.time('Task');

// 执行任务的一部分
setTimeout(() => {
    console.timeLog('Task', 'Part 1 completed');
}, 1000);

// 完成任务
setTimeout(() => {
    console.timeEnd('Task');
}, 2000);
```

输出示例：

```js
Task: 1000.123456ms Part 1 completed
Task: 2000.123456ms
```

脚本开始计时，等待 1 秒后打印已经过去的时间，再等待 1 秒打印总耗时。