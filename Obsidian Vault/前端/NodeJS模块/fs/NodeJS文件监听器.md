## 什么是watcher(监听器)
它可以监听指定的文件或目录，并在发生变化时触发事件--比如文件被创建、修改或删除

Node.js的`fs`模块提供了多种监听方法:
* `fs.watch()`
* `fs.watchFile()`

## 引入fs模块
首先在代码中引入`fs`模块
```js
const fs = require('node:fs');
```
你也可以通过解构赋值的方式只引入需要的方法:
```js
const {watch, watchFile} = require('node:fs');
```

## fs.watch方法
监听文件或目录的变化

语法:
```js
fs.watch(filename[,options], callback)
```

**参数说明：**

- `filename`（必选）  
    要监听的文件或目录路径
- `options`（可选）  
    额外配置项，例如：
    - `persistent`
    - `recursive`
    - `encoding`
()    - `signal`
- `callback`（回调函数）  
    在每次文件或目录发生变化时触发，包含两个参数：
    - `eventType` —— `"rename"` 或 `"change"`
    - `filename` —— 发生变化的文件或目录名

你可以在官方[Node.js文档](https://nodejs.org/docs/latest/api/fs.html#fswatchfilename-options-listener)获取这些参数的信息

### 示例: 监听目录变化
首先创建一个`friends`文件夹，里面有两个文件

以下代码监听该文件夹的变化:
```js
const fs = require('node:fs');

fs.watch('friends', (eventType, filename) => {
	console.log(`Event type: ${eventType}`);
	console.log(`File name: ${filename}`);
});
```

**解释代码：**

- 监听 `friends` 目录
- 当目录中的文件发生变化时：
    - 输出事件类型
    - 输出被影响的文件名

运行该程序后，尝试修改其中一个文件（例如 `Emily.txt`），你会在控制台看到类似输出：
```js
Event type: change
File name: Emily.txt
```


### 多次触发的问题

你可以尝试对文件进行以下操作：

- 输入内容
- 重命名文件
- 将文件移动到其他文件夹

在某些操作系统上，你可能会发现：  
**一次修改会触发多次事件**。

这并不是你操作了多次，而是 Node.js 在某些系统（尤其是 Windows）上的底层实现行为。


#### 解决方案：使用状态锁（去重）

一个简单的解决方法是使用一个状态变量来避免重复触发：
```js
let watching = false;

fs.watch('friends', (eventType, filename) => {
   if (watching) return;
   watching = true;

   console.log(`Event type: ${eventType}`);
   console.log(`File name: ${filename}`);

   setTimeout(() => {
      watching = false;
   }, 100);
});
```
**解释代码：**

- `watching` 用作状态锁
- 当事件第一次触发时：
    - 设置 `watching = true`
    - 忽略后续短时间内的重复事件
- 使用 `setTimeout` 在 100ms 后重置状态

这样可以有效避免一次操作触发多次日志。

### 递归监听子目录

如果你的 `friends` 文件夹中**还包含子文件夹**，并且你希望监听所有子目录和文件的变化，可以使用 `recursive` 选项

```js
fs.watch('friends', { recursive: true }, (eventType, filename) => {
  console.log(`Event type: ${eventType}`);
  console.log(`File name: ${filename}`);
});
```

**解释代码：**
- `recursive: true` 表示递归监听所有子目录
- 任何层级的文件变化都会触发回调

## fs.watchFile 方法
与 `fs.watch()` 不同，`fs.watchFile()` **只能用于监听文件，不能监听目录**。
### 语法
```js
fs.watchFile(filename[, options], callback)
```

**参数说明：**

- `filename`（必选）  
    要监听的文件路径
- `options`（可选）  
    可配置项包括：
    - `bigint`
    - `persistent`
    - `interval`
- `callback`  
    接收两个参数：
    - `curr` —— 当前文件状态
    - `prev` —— 之前的文件状态

这两个参数都是 `fs.stat` 对象，包含文件的各种信息，例如：
- 文件大小
- 创建时间
- 修改时间

### 示例：监听文件变化
```js
const fs = require('node:fs');

fs.watchFile('friends/Emily.txt', (curr, prev) => {
   console.log(`The file was last modified at — ${prev.mtime}.`);
   console.log(`The previous size of the file is ${prev.size} bytes.`);
   console.log(`The current size of the file is ${curr.size} bytes.`);
});
```
**解释代码：**

- 监听 `Emily.txt`
- 每次变化时：
    - 输出上一次修改时间
    - 输出文件大小变化

当你在文件中添加一个字符后，控制台可能会输出：
```js
The file was last modified at Tue Jun 13 2023 16:30:09 GMT+0300 (Moscow Standard Time).
The previous size of the file is 16 bytes.
The current size of the file is 17 bytes.
```

### interval 参数（监听频率）

你可能注意到输出存在**延迟**，这是因为：
> `fs.watchFile()` 默认每 **5007 毫秒（约 5 秒）**检查一次文件变化。
你可以通过 `interval` 参数来调整这个频率：

```js
const fs = require('node:fs');

fs.watchFile(
  'friends/Emily.txt',
  { interval: 1000 },
  (curr, prev) => {
    if (curr.size > 5000) {
        console.log('File is too big!');
    }
    console.log(`The file was modified. Current size is ${curr.size} bytes.`);
});
```

**解释代码：**
- 将监听间隔改为 **1 秒**
- 如果文件大小超过 5000 字节，输出警告
- 否则输出当前文件大小

你会发现控制台输出明显更快了

