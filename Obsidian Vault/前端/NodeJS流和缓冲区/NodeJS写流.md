可写流不会一次性处理所有数据，而是将数据拆分成小块（chunk）逐步处理。因此，它在时间和内存使用上都更加高效。你可以写入任意大型文本文件或媒体文件，而无需担心速度下降或内存泄漏的问题。

此外，我们通常使用可写流将数据写入多种目标，例如文件、网络套接字（socket）以及 HTTP 响应。

---

## 使用流进行写入

写入流是 `fs` 模块的一部分。你可以通过下面这行代码在项目中引入它：

```js
const fs = require('node:fs');
```

### 代码说明

这里引入了 Node.js 内置的 `fs`（文件系统）模块。

---

下一步是使用 `fs.createWriteStream` 方法，并将其保存到一个常量中：

```js
const writeStream = fs.createWriteStream('numbers.txt');
```

### 代码说明

该方法会创建一个可写流，并将数据写入 `numbers.txt` 文件。

这个方法接收两个参数：

1. **第一个参数**：写入的文件路径（这里是 `numbers.txt`）
2. **第二个参数（可选）**：配置对象

可选配置包括：

- `flags` —— 指定文件操作方式（默认是 `'w'`，表示写入）
- `encoding` —— 编码方式（默认是 `'utf-8'`）
- `mode` —— 文件权限（默认是 `0666`，表示可读可写）
- `autoClose` —— 写入完成后是否自动关闭文件（默认 `true`）
- `fd` —— 文件描述符（如果指定，则忽略路径参数）

当你将流保存到 `writeStream` 变量后，就可以使用它的方法了。

---

## 写入速度测试

下面是一个简单的速度测试。代码通过 `for` 循环将 0 到 99 的数字写入 `numbers.txt` 文件。

`console.time()` 用于测量执行时间。

```js
console.time('check');

for (i = 0; i < 100; i++) {
    writeStream.write(`${i}\n`)
};

console.timeEnd('check');
```
### 代码说明

- 调用 `writeStream.write()` 方法写入数据
- 每次循环写入一个数字
- 执行后，`numbers.txt` 文件会包含 0 到 99

执行结果非常惊人 —— 只用了大约 1 秒钟。

---

## 为什么要使用可写流？

你可能已经了解过同步和异步写文件方法，比如：

- `fs.writeFile`
- `fs.writeFileSync`

现在我们来对比一下。

下面这段代码使用 `fs.writeFile`，同样写入 0 到 99 的数字：

```js
console.time('check');

for (i = 0; i < 100; i++) {
    fs.writeFile('speed-test.txt', `${i}\n`, {flag: 'a'}, err => {
        if (err) {
            console.log(err);
        };
    });
};

console.timeEnd('check');
```
### 代码说明

- 每次循环都会调用一次 `fs.writeFile`
- 使用 `{ flag: 'a' }` 表示追加写入
- 每次写入都会触发一次异步文件操作

在某些机器上，这段代码可能需要 **约 8 秒** 才能完成 —— 比可写流慢 8 倍。

想一想，如果要写：

- 10,000 个数字？
- 1,000,000 个数字？

这就是为什么可写流如此重要。

---

## 为什么流更高效？

当可写流处理大文件时，它不会一次性将所有数据加载到内存中。

它会：

1. 将数据拆分成小块（chunks）
2. 一块一块处理

就像现实生活中解决复杂问题一样 —— 分解成小部分更容易处理。流的工作方式也是如此。

---

## 结束写入

写入完成后，可以使用 `end()` 或 `destroy()` 方法关闭流。

### 使用 end()

```js
writeStream.end('Bye, stream!');
```

### 代码说明

- `end()` 可以接收一个字符串或 Buffer
- 该内容会作为文件的最后一部分写入
- 调用后，流会关闭
- 再写入数据会报错

---

### 使用 destroy()

```js
writeStream.destroy();
```

### 代码说明

- 不接收参数
- 立即销毁流
- 之后不能再写入数据

---

## 结合读取流和写入流

很多时候，你需要：

- 从一个文件读取数据
- 修改数据
- 写入到另一个文件

读取流和写入流通常是配合使用的。

示例：

```js
const readStream = fs.createReadStream('users.js');
const writeStream = fs.createWriteStream('copy-users.js');

readStream.on('data', (chunk) => {
    writeStream.write(chunk);
});
```
### 代码说明

- `readStream` 读取文件
- 每当触发 `data` 事件时
- 将 chunk 写入新的文件
- 最终生成一个文件副本

---

## 使用 pipe（更推荐）

可以使用 `pipe()` 方法简化代码：

```js
readStream.pipe(writeStream);
```

### 代码说明

- 在可读流上调用 `pipe()`
- 将目标写入流作为参数
- 自动完成数据传输

就像水管传输水一样，流的管道（pipe）传输数据。

代码更简洁、更优雅。

---

## 事件机制（Event Emitters）

写入文件时，会经历以下步骤：

1. 打开流
2. 流准备就绪
3. 写入数据
4. 关闭流
5. 处理错误（如果有）

可写流常见事件：

- `open` —— 流打开时触发
- `ready` —— 流准备就绪
- `close` —— 流关闭
- `finish` —— 调用 `end()` 后触发
- `error` —— 发生错误
- `drain` —— 内部缓冲区清空，可以继续写入
- `pipe` / `unpipe` —— 调用 `pipe()` 或 `unpipe()` 时触发

示例：

```js
const writeStream = fs.createWriteStream('weather.txt');

writeStream.write("It's sunny today.");
writeStream.end('Yay!');

writeStream.on('open', () => console.log('Stream opened'));
writeStream.on('finish', () => console.log('Stream ended'));
```
### 代码说明

- 创建可写流
- 写入数据
- 监听 `open` 和 `finish` 事件
- 在控制台输出对应提示