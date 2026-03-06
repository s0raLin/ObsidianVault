## 什么是缓冲区？
一个相当通用的定义是，
>缓冲区是一个固定长度的内存容器。

在Node.js的上下文中，更准确地说
>缓冲区用于表示固定长度的字节序列。

**“固定长度”是关键特性**。一旦创建，Buffer 的大小不可改变。因此在创建时必须根据实际需求分配合适的空间，否则可能导致：空间不足、数据截断、缓冲区溢出风险

## 创建缓冲区
### 示例：分配一个10字节的缓冲区
```js
const { Buffer } = require("node:buffer");

const buffer = Buffer.alloc(10);

console.log(buffer); // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(typeof buffer); // object
```

### 代码解析
- `Buffer` 在全局可用，但**显式导入是好习惯**
- `Buffer.alloc(size)`：
    - 分配指定字节数的缓冲区
    - 默认用 `0` 填充
- `typeof buffer` 返回 `object`
    - 因为 Buffer 本质上是对象

### alloc() 的完整参数形式
```js
Buffer.alloc(size, fill, encoding)
```
参数说明：
* size -> 缓冲区大小(字节)
* fill -> 填充值
* encoding ->编码格式(默认utf-8)

### 示例: 使用字符串填充缓冲区
```js
const { Buffer } = require('node:buffer');

const buffer = Buffer.alloc(10, "hello", "utf-8");

console.log(buffer); // <Buffer 68 65 6c 6c 6f 68 65 6c 6c 6f>
console.log(buffer.toString()); // hellohello
```
### 代码解析

- 分配 10 字节
- 用 `"hello"` 填充
- 编码为 `"utf-8"`（默认也是它）

其他方法 如果你不确定一个对象是否是缓冲区，你可以轻松检查它。让我们看看下面的代码片段：

## Buffer.isBuffer() —— 判断对象是否为缓冲区
```js
const { Buffer } = require('buffer');

console.log(Buffer.isBuffer(Buffer.from([76, 80]))); // true

console.log(Buffer.isBuffer(Buffer.alloc(20))); // true

console.log(Buffer.isBuffer({})); // false
```
### 作用

判断一个对象是否是 Buffer 实例：
- 是 -> `true`
- 否 -> `false`

## Buffer.from() —— 从数组创建缓冲区

### 示例：十六进制 vs 十进制

```js
const { Buffer } = require('node:buffer');

const bufferHex = Buffer.from([0x68, 0x69]);
const bufferDec = Buffer.from([104, 105]);

console.log(bufferHex.toString()); // hi
console.log(bufferDec.toString()); // hi
```
两种写法是等价的

