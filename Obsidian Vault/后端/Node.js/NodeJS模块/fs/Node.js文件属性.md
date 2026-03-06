## 使用fs.stat()获取文件属性
fs.stat()函数会异步获取文件或目录信息。如果路径是一个符号链接，fs.stat()会跟随链接返回目标文件或目录的信息

### fs.stat()语法
```js
fs.stat(path, options, callback)
```
### 代码示例:
```js
const fs = require('fs');
  
// 获取文件信息
fs.stat("./files/readme.txt", (error, stats) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Stats 对象：readme.txt");
    console.log(stats);
  
    // 使用 Stats 对象的方法
    console.log('文件类型:', stats.isFile() ? '普通文件' : '不是普通文件');
    console.log("是否为文件:", stats.isFile());
    console.log("是否为目录:", stats.isDirectory());
  }
});
```

**解释：**  
上面的代码中，`fs.stat()` 获取了名为 `readme.txt` 的文件的大小、权限和时间戳等信息。如果没有错误，`fs.stat()` 会返回一个 **Stats 对象**，包含该文件的所有属性。我们通过 `console.log` 打印出来，直观查看文件信息。

通过 **Stats 对象的 `isFile()` 方法** 可以判断 `readme.txt` 是否是普通文件
* true表示是普通文件
* false表示是目录或符号链接等

## 使用fs.lstat()检查符号链接
**fs.lstat()** 函数会异步获取 **fs.Stats** 信息，但不会跟随符号链接。

### fs.lstat()语法:
```js
fs.lstat(path, options, callback)
```
### 示例代码:
```js
const fs = require("fs");

// 创建符号链接
fs.symlinkSync("./myCv_file.txt", "./myCvsymlink", "file");
console.log("符号链接创建成功");

fs.lstat("myCvsymlink", (err, stats) => {
  if (err) console.log(err);
  else {
    console.log("myCvsymlink 的 Stats 信息：");
    console.log(stats);
  }
});
```
**解释：**  
这里我们创建了一个指向 `myCv_file.txt` 的符号链接 `myCvsymlink`。

- `fs.lstat()` 会获取这个链接本身的属性，而不是它指向的文件。
- 返回的信息包括符号链接的大小（bytes）、权限、时间戳（访问时间、修改时间等）。

**符号链接常用属性：**

- `size`：符号链接大小
- `mode`：符号链接权限
- `ctime`：符号链接属性最后修改时间

**注意：**  
`fs.lstat()` 不会访问符号链接指向的目标，只获取符号链接自身的信息

## fs.fstat()检查以打开文件
异步获取已打开文件的**fs.Stats**信息，通过文件描述符(fd)来操作

### fs.fstat()语法
```js
fs.fstat(fd, options, callback)
```
### 示例代码:
```js
const fs = require("fs");

const filePath = "./files/readme.txt";

// 打开文件并获取文件描述符
const fileDescriptor = fs.openSync(filePath, "r");

fs.fstat(fileDescriptor, (err, stats) => {
  if (err) {
    console.error("错误:", err.message);
    return;
  }
  console.log(
    "文件类型:",
    stats.isFile() ? "普通文件" : "不是普通文件"
  );
  console.log("文件大小:", stats.size, "字节");
  console.log("文件权限:", stats.mode.toString(8));

  // 使用完后关闭文件描述符
  fs.closeSync(fileDescriptor);
});
```

**解释：**

- 首先用 `fs.openSync()` 以只读模式打开文件，得到文件描述符。
- 通过 `fs.fstat()` 获取该文件的元数据，包括类型、大小和权限。
- 最后用 `fs.closeSync()` 关闭文件描述符，防止资源泄漏。

> **注意事项：**  
> 使用 fstat() 时务必保证正确打开和关闭文件，避免资源泄漏。


### fstat() 与 lstat() 的关键区别

|区别|fstat()|lstat()|
|---|---|---|
|输入参数|文件描述符 fd|文件或目录路径|
|用途|已打开文件获取信息，适合流操作|获取路径指定文件/目录信息，适合检查符号链接|
|符号链接|不解析符号链接，获取文件描述符对应文件信息|不跟随链接，获取符号链接自身信息|
|文件操作方式|通过文件描述符操作|通过路径操作|
|资源管理|需手动打开/关闭文件描述符|不涉及文件描述符管理|