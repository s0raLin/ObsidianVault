**事件(event)** 是某件事情发生时发出的一个信号

一个带有带有名称的事件可以由一个特殊的对象生成，这个对象叫做**事件发射器(emitter)** 必须有对象对这些事件作出响应，否则事件将被忽略，什么都不会发生。对事件作出响应的对象被称为**事件监听器(event listener)**

举个例子:
当一个人点击注册表单中的“提交”按钮时，点击按钮这个动作就是一个事件。事件监听器会监听按钮点击事件，然后执行相应的操作，比如跳转到新页面，或者弹出一个提示框告诉用户提交成功。

## EventEmitter基础语法
### 一个简单的`events`模块示例:
```js
const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();

myEmitter.on('eventExample', () => {
  console.log('The event was detected!');
});

myEmitter.emit('eventExample');
```

#### 代码解析

首先，我们从 `events` 模块中导入了 `EventEmitter` 类。

之所以首字母大写，是因为 `EventEmitter` 是一个类（class）。通过这种写法，我们可以清楚地知道它是一个类，而不是函数或普通变量。

接下来，我们创建了一个 `EventEmitter` 类的实例。

然后是关键部分：

- 使用 `on` 方法添加一个事件监听器。
- 第一个参数是事件名称（`eventExample`）。
- 第二个参数是回调函数（事件处理函数）。

如果我们不写最后一行代码（`emit`），程序将不会有任何输出。

这是因为 `on` 方法只是注册了一个监听器，但事件本身还没有发生。要触发事件，需要使用 `emit` 方法。

- `emit` 的第一个参数是要触发的事件名称。
- 后续参数是可选的，可以传递给监听器。

注意顺序非常重要：
必须先注册监听器（`on`），再触发事件（`emit`）。  
如果你先调用 `emit`，然后才注册监听器，那么事件已经发生过了，监听器不会被触发。

### 用户日志示例
```js
const EventEmitter = require('node:events');

class LogEmitter extends EventEmitter {}

const logger = new LogEmitter();

logger.on('logging', (name) => {
    const date = new Date();
    console.log(`User ${name} was registered at ${date.toISOString()}`);
})

logger.emit('logging', 'Alex');
```
#### 代码解析

这里创建了一个自己的类 `LogEmitter`，它继承自 `EventEmitter`。

这样做的好处是：

- 有利于任务拆分
- 避免多个 `EventEmitter` 实例之间可能产生的混乱
- 将日志逻辑与程序其他部分分离

然后：

- 我们监听名为 `'logging'` 的事件
- 在监听器中接收一个参数 `name`
- 使用 `new Date()` 获取当前时间
- 使用 `toISOString()` 格式化时间
- 最终输出用户注册时间

在 `emit` 方法中，我们传入 `'Alex'` 作为参数，这个参数会被传递给监听器中的 `name`
