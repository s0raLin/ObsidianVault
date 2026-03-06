Node.js 的 **events 模块**是一个核心模块，它提供了创建、触发和管理事件的能力
它基于 **EventEmitter 类**，用于触发和处理自定义事件

## 创建一个消息管理器（Message Manager）

我们通过一个示例来理解如何在 Node.js 中使用事件发射器。

首先，创建一个继承 EventEmitter 的 MessageManager 类：

```js
const EventEmitter = require('events');

class MessageManager extends EventEmitter {
  constructor() {
    super(); // 访问 EventEmitter 的方法和属性
    this.messages = []; // 用户发送的消息队列
    this.receivedMessages = []; // 已接收消息记录
  }
};
```

### 说明

构造函数中：

- `this.messages` 用于模拟用户发送的消息队列
- `this.receivedMessages` 用于保存已接收的消息记录
- `super()` 用于调用父类 EventEmitter，从而继承其功能

---

## 发送消息方法

在构造函数后添加 `sendMessage` 方法：

```js
sendMessage(message) {
  this.messages.push(message);
  this.emit('messageSent', message);
}
```

### 说明

该方法：

1. 将消息加入消息队列
2. 触发 `messageSent` 事件，并传递消息数据

---

## 接收消息方法

添加 `receiveMessage` 方法：

```js
receiveMessage() {
  const message = this.messages.shift(); // 取出第一个消息
  this.receivedMessages.push(message); // 存储已接收消息
  this.emit('messageReceived', message);
}
```

还可以添加一个获取历史消息的方法：

```js
getPreviousMessages() {
  return this.receivedMessages;
}
```

---

## 监听事件

创建 MessageManager 实例：

```js
const messageManager = new MessageManager();
```

添加两个监听器：

```js
const messageSentListener = (message) => {
  console.log(`Message sent: ${message}`);
};

const messageReceivedListener = (message) => {
  console.log(`Message received: ${message}`);
};

messageManager.on('messageSent', messageSentListener);
messageManager.on('messageReceived', messageReceivedListener);
```

### 说明

监听器会在事件触发时执行，并接收事件传递的数据。

---

## 触发事件

```js
messageManager.sendMessage('Hello, world!');
messageManager.sendMessage('How are you?');

messageManager.receiveMessage();
messageManager.receiveMessage();

const previousMessages = messageManager.getPreviousMessages();
console.log('Previous messages:', previousMessages);
```

---

## 处理错误事件

EventEmitter 提供特殊的 `error` 事件用于错误处理。

修改 `receiveMessage`：

```js
receiveMessage() {
  if (this.messages.length === 0) {
    this.emit('error', new Error('No message available'));
    return;
  }

  const message = this.messages.shift();
  this.receivedMessages.push(message);
  this.emit('messageReceived', message);
}
```

监听 error 事件：

```js
const errorListener = (error) => {
  console.error(`An error occurred: ${error.message}`);
};

messageManager.on('error', errorListener);
```

⚠️ 如果没有监听 error 事件，Node.js 会抛出未捕获异常并终止程序。

---

## 管理事件监听器

### 统计监听器数量

```js
countEventListeners(eventName) {
  const listeners = this.listenerCount(eventName);
  console.log(`Number of listeners for '${eventName}': ${listeners}`);
}
```

---

## 为什么要移除监听器？

1. 防止内存泄漏
2. 避免不必要执行
3. 防止重复触发
4. 提升性能

---

## 移除监听器

```js
messageManager.off('messageSent', messageSentListener);
messageManager.off('messageReceived', messageReceivedListener);
messageManager.off('error', errorListener);
```

`off()` 是 `removeListener()` 的别名。

---

## 移除某事件的全部监听器

```js
removeListeners(eventName) {
  this.removeAllListeners(eventName);
  console.log(`All listeners for '${eventName}' removed`);
}
```

---

## 完整程序（示例）

代码实现：
```js
// 导入 Node.js 内置的 events 模块
const EventEmitter = require('events');

// 创建 MessageManager 类，并继承 EventEmitter
class MessageManager extends EventEmitter {
  constructor() {
    super(); // 调用父类构造函数，获得事件功能
    this.messages = []; // 存储待接收的消息队列
    this.receivedMessages = []; // 存储已经接收过的消息
  }

  // 发送消息方法
  sendMessage(message) {
    this.messages.push(message); // 将消息加入发送队列
    this.emit('messageSent', message); // 触发 messageSent 事件，并传递消息
  }

  // 接收消息方法
  receiveMessage() {
    // 如果没有消息可接收
    if (this.messages.length === 0) {
      this.emit('error', new Error('No messages available')); // 触发错误事件
      return;
    }

    const message = this.messages.shift(); // 取出队列第一个消息（先进先出）
    this.receivedMessages.push(message); // 保存已接收消息记录
    this.emit('messageReceived', message); // 触发消息接收事件
  }

  // 获取所有已接收消息
  getPreviousMessages() {
    return this.receivedMessages;
  }

  // 统计某个事件的监听器数量
  countEventListeners(eventName) {
    const listeners = this.listenerCount(eventName); // 获取监听器数量
    console.log(`Number of listeners for '${eventName}': ${listeners}`);
  }

  // ⚠️ 注意：这里写法有问题（会递归调用自己）
  // 正确写法应该是 super.removeAllListeners(eventName)
  removeAllListeners(eventName) {
    this.removeAllListeners(eventName); // 删除该事件的所有监听器
    console.log(`All listeners for '${eventName}' removed`);
  }
}

// ===================== 使用示例 =====================

// 创建消息管理器实例
const messageManager = new MessageManager();

// 处理“消息发送”事件的回调函数
const messageSentListener = (message) => {
  console.log(`Message sent: ${message}`);
};

// 处理“消息接收”事件的回调函数
const messageReceivedListener = (message) => {
  console.log(`Message received: ${message}`);
};

// 处理错误事件的回调函数
const errorListener = (error) => {
  console.error(`An error occurred: ${error.message}`);
};

// 注册 messageSent 事件监听器
messageManager.on('messageSent', messageSentListener);

// 注册 messageReceived 事件监听器
messageManager.on('messageReceived', messageReceivedListener);

// 注册 error 事件监听器（非常重要，否则程序会崩溃）
messageManager.on('error', errorListener);

// 发送两条消息
messageManager.sendMessage('Hello, world!');
messageManager.sendMessage('How are you?');

// 接收消息
messageManager.receiveMessage(); // 输出：Message received: Hello, world!
messageManager.receiveMessage(); // 输出：Message received: How are you?
messageManager.receiveMessage(); // 没有消息 → 触发错误

// 获取历史接收消息
const previousMessages = messageManager.getPreviousMessages();
console.log('Previous messages:', previousMessages);

// 查看 messageSent 事件监听器数量
messageManager.countEventListeners('messageSent');

// 移除事件监听器（释放资源，避免内存泄漏）
messageManager.off('messageSent', messageSentListener);
messageManager.off('messageReceived', messageReceivedListener);
messageManager.off('error', errorListener);

```
