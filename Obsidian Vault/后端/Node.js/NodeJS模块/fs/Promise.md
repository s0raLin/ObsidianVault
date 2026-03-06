Async/await 函数与同步和回调 API 类似。然而，Promise 相比回调函数有许多优势。它们更易读：
* 你可以用 `await` 关键字让异步代码看起来像同步代码。这使得编写和维护代码比使用回调函数更容易。
* 此外，我们可以使用 `Promise.all()` 方法同时等待多个 Promise。
> Promise 是 ES6 新标准的一部分，已被程序员广泛使用。

让我们深入了解，看看在 Node.js 中如何以及何时使用 Promise。

## 为什么要使用 Promise？

基本上，同步函数、回调函数和 Promise 都有相同的功能，但理解它们之间的差异非常重要。
* 同步 API 对初学者来说最容易上手，但会阻塞程序流程。
* 回调函数允许我们以异步方式操作文件系统，但如果回调函数层层嵌套，就会遇到“回调地狱”，这会降低代码的可读性和维护性。

下面快速回顾一下同步和回调函数示例：

```js
const fs = require('node:fs');

// 同步创建目录（会阻塞程序执行）
fs.mkdirSync('sync-example');

// 回调 API 示例
fs.readFile('file.txt', {encoding: 'utf-8'}, (err, data) => {
    if(err) {
        console.log(err);
    }
    console.log(data);
});
```

**解释代码**  
第一个函数会创建一个新目录。第二个示例读取 `file.txt` 文件，并将内容输出到控制台。

如果同步方法应尽量避免，而回调函数又难以维护，那么最佳选择就是使用 Promise。你可以使用 `async/await` 或 `.then` 语法，两者都正确且可互换。比较下面两个示例：

**Async/await 示例：**

```js
const { readFile } = require('node:fs/promises');

// async/await 函数
const read = async() => {
 try {
    const content = await readFile('file.txt', {encoding: 'utf-8'});
    console.log(content);
 } catch (error) {
    console.log(error);
 }
};

read();
```

**Then/catch 示例：**

```js
const { readFile } = require('node:fs/promises');

// then/catch 语法
readFile('file.txt', {encoding: 'utf-8'})
.then(data => console.log(data))
.catch(err => console.log(err));
```

**解释代码**  
* 首先注意 `require` 函数：现在导入的是 `fs/promises` 而不是普通的 `fs`。
* 第二个区别是 `async` 函数中的 `try/catch` 块。`try` 块尝试执行代码，如果出现错误，会被 `catch` 捕获，从而可以决定如何处理。在这个示例中没有错误，因此只会执行 `try` 块。类似地，在第二个示例中，如果一切正常，`.then` 会执行，否则错误会被 `.catch` 捕获并打印。

在我的测试中，`file.txt` 中有一个简单的字符串，并打印在控制台上。运行结果如下：

```text
I am the original file.
```

## 文件操作

这里我们使用 `async/await`，你也可以选择 `.then` 语法。

### 写入和复制文件
假设现在有 `file.txt`，我们想创建一个副本并向副本添加内容。首先导入 `copyFile` 和 `appendFile` 函数，然后操作如下：

```js
const { copyFile, appendFile } = require('node:fs/promises');

const content = 'Hi Node.js!';

const append = async(filename, data) => {
    try {
       await appendFile(filename, data);
    } catch (error) {
        console.log(error);
    }
};

const copy = async(filename, copy) => {
    try {
        await copyFile(filename, copy);
        append(copy, content);
    } catch (error) {
        console.log(error);
    }
};

copy('file.txt', 'file-copy.txt');
```

**解释代码**  
运行后，会生成 `file-copy.txt` 文件，其内容包含原文件内容加上一行新字符串：

```js
Hi Node.js!
```

除了读取、复制和写入，你还可以使用 `fs.truncate()` 截断文件或 `fs.unlink()` 删除文件。更多方法可参考 [Node.js 官方文档](https://nodejs.org/api/fs.html#promises-api)

## 目录操作

### 创建目录
在创建目录之前，最好先检查目录是否存在，以免浪费内存。为此，我们可以使用 `access` 方法：如果目录存在，Promise 会成功 resolve；否则会抛出错误。我们可以把创建目录的逻辑放在 `catch` 块中。示例：

```js
const { access, mkdir } = require('node:fs/promises');

const makeDir = async(dir) => {
    try {
        await mkdir(dir);
    } catch (error) {
        console.log(error);
    }
};

const checkAccess = async(dir) => {
    try {
        await access(dir);
        console.log('can access, directory exists');
  } catch {
        makeDir(dir);
  }
};

checkAccess('my-files');
```

运行后，会创建 `my-files` 目录。

### 删除目录
删除目录也很简单，只需提供路径并使用 `try/catch` 包裹即可。如果是嵌套目录，需要使用 `{recursive: true}`：

```js
const { rm } = require('node:fs/promises');

const deleteDir = async(dir, option) => {
    try {
      await rm(dir, {recursive: option}); 
    } catch (error) {
        console.log(error);
    }
};

// 删除单个目录 
deleteDir('my-files', false);

// 删除嵌套目录 ('projects/auth/tests')
deleteDir('projects', true);
```