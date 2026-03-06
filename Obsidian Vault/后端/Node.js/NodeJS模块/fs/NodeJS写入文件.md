Node.js允许我们选择覆盖已有文件，或追加内容

## 写入文件(Writing files)
首先引入`fs`模块
```js
const fs = require('node:fs');
```

**代码解释**  
`fs` 是 _file system_（文件系统）的缩写，它是 Node.js 提供的内置模块，用于和文件、目录进行交互


我们先快速了解一下 `writeFile()` 方法的语法：
```js
fs.writeFile(file, data, [options], callback)
```
**代码解释**

- `file`：要写入的文件路径
- `data`：要写入的内容（这里就是 Andy 的笔记）
- `options`（可选）：包括编码方式（utf-8、base64 等）、权限模式、标志位（flags）
- `callback`：当写入完成后触发的回调函数

暂时不考虑 `options`，我们先实现最基础的写入功能：
```js
const fs = require('node:fsimport fs from 'node:fs';

fs.readFile('./source.js', 'utf-8', (err, data) => {
    if (err) throw err;

    console.log(data);
});');

const firstNote =
  'Dates: 25/12 - 01/01, Heathrow airport 9:15 AM, need to book a room';

fs.writeFile('firstNote.txt', firstNote, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('The first note is written, yay!');
});
```
**代码解释**
- 如果向回调参数传入一个非法值，会抛出 `ERR_INVALID_ARG_TYPE` 错误
- 如果文件不存在，Node.js 会**自动创建文件**

### 覆盖行为说明
当你修改 `firstNote` 的内容并再次运行代码，**旧内容会被新内容完全覆盖**， 这是 `fs.writeFile()` 的默认行为

## 同步写入文件

除了异步方式，我们也可以使用同步方法 `fs.writeFileSync()` 达到相同效果。  
主要区别是：**同步方法没有回调函数**

```js
const fs = require('node:fs');

const firstNote =
  'Dates: 25/12 - 01/01, Heathrow airport 9:15 AM, need to book a room';

fs.writeFileSync('firstNote.txt', firstNote);
```
**代码解释**
在真实项目中，更推荐使用**异步方法**，因为同步方法会阻塞事件循环（event loop）


## 追加文件内容（Appending files）

Andy 再次打开 Notes 应用，发现还需要补充一些行程信息。  
我们可以使用 `fs.appendFile()` 来完成：
```js
const fs = require('node:fs');

const newInfo = ' and rent a car';

fs.appendFile('firstNote.txt', newInfo, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('New info added, cool!');
});
```
旧内容被保留，新内容成功追加


### 同步追加

同步版本的写法几乎一模一样：

```js
const fs = require('node:fs');

const newInfo = ' and rent a car';

fs.appendFileSync('firstNote.txt', newInfo);
```


## Flags（文件标志位）

`fs.writeFile()` 默认会**覆盖文件内容**。  
我们可以通过 `options` 参数中的 **flag** 来控制这一行为。

例如，使用 `"a"` 标志位表示**追加内容**：
```js
const fs = require('node:fs');

const newInfo = ' and learn Node.js on the plane';

fs.writeFile('firstNote.txt', newInfo, { flag: 'a' }, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('New data added at the end of the file');
});
```

### 换行说明

如果你想在新内容前换行：
- Linux / macOS：`\n`
- Windows：`\r\n`

### 常见 flags 一览

|Flag|描述|
|---|---|
|a|以追加模式打开文件|
|a+|读 + 追加|
|r|只读|
|r+|读 + 写|
|w|写入（覆盖）|
|w+|读 + 写|

完整列表可以在 **Node.js 官方文档** 中查看