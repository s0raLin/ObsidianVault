浏览器平台存在一定的局限性，但Node.js平台允许你与文件系统交互，需要用到Node.js中的fs模块

## 导入fs模块
首先需要说明的是，fs是file system(文件系统)的缩写。

### CommonJS语法
```js
const fs = require('node:fs');
```

**代码解释:**
使用`require`函数加载Node.js内置的`fs`模块，其中`node:`前缀表明这是一个**Node.js内置模块**

### ESM(ES6 Modules)语法
```js
import * as fs from 'node:fs';
```
**代码解释：**  
使用 ES6 的 `import` 语法导入 `fs` 模块，并将其所有导出内容绑定到 `fs` 对象上


你可能会在其他地方看到如下写法：

```js
const fs = require('fs');
```

这确实可以正常工作，但**推荐使用 `node:fs` 的方式**。原因在于安全性：如果存在一个与内置模块同名的 npm 包，使用 `node:` 前缀可以避免意外加载错误的模块。

## 同步API(Sync API)
对我们来说，最重要的操作之一就是**读取文件**
```js
const fs = require('node:fs');

const data = fs.readFileSync('../source.js', 'utf-8');

console.log(data);
```

**代码解释：**

- `readFileSync` 的第一个参数是要读取的**文件路径**
- 第二个参数是**可选的编码格式**（这里是 `'utf-8'`）
- `../source.js` 表示目标文件位于当前文件的**上一级目录**
- 读取完成后，将文件内容输出到控制台

需要注意的是：

- 我们不仅可以读取文本文件，也可以读取**任意类型的文件**
- 甚至可以读取**当前正在执行的文件本身**

如果你**不指定编码格式**（例如 `'utf-8'`），返回的将是一个 **Buffer**，而不是字符串

这是一个**同步函数**，意味着在文件读取完成之前，程序会一直等待。如果文件非常大，程序就会被阻塞很长时间


## 回调API(Callback API)
下面我们用**异步方式**来读取同一个 `source.js` 文件：
```js
const fs = require('node:fs');

fs.readFile('../source.js', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```
**代码解释：**

- 前两个参数与同步版本相同（文件路径和编码）
- 第三个参数是**必须的回调函数**
- 回调函数中：
    - 第一个参数 `err` 用于接收错误
    - 第二个参数 `data` 是文件内容
- 如果发生错误，直接抛出异常
- 否则输出文件内容

相比同步 API，**回调 API 更优**，因为在读取大文件时，不会阻塞后续的同步操作，程序可以继续执行其他任务