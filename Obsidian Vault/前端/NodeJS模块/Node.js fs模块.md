fs模块是Node.js的核心功能之一，使用它可以在我们的操作系统上存储、管理和访问数据。它与Node.js一起提供，无需额外安装即可使用。要在项目使用它，只需创建一个常量并引入`fs`模块
```js
const fs = require('node:fs');
```

**解释：**  
现在我们可以访问大量方法。`fs` 提供的一些常用方法如下：

- `fs.mkdir` / `fs.mkdirSync`：创建新目录
- `fs.rmdir` / `fs.rm`：删除目录
- `fs.readFile` / `fs.readFileSync`：读取文件内容
- `fs.appendFile` / `fs.appendFileSync`：向文件追加内容
- `fs.unlink` / `fs.unlinkSync`：删除文件

你可以在 [Node.js 文档](https://nodejs.org/api/fs.html) 中查看更多方法。

## 异步 vs 同步方法
所有方法分为两类：**异步**（如 `readFile`、`writeFile` 等）和**同步**（如 `readFileSync`、`writeFileSync` 等）。

- **异步方法**不会阻塞程序执行
- **同步方法**会等待当前操作完成后，才继续执行下一步

例如，`fs.writeFileSync` 会调用操作系统写入文件，然后阻塞一段时间，直到完成操作。在此“等待”期间，其他操作无法执行。
![[writeFileSync.png]]
而 `fs.writeFile` 是异步方法，在写入文件的同时，程序仍可以执行其他操作，例如写入另一个文件、读取文件或调用 API。
![[writeFile.png]]
**选择哪种方法？**  
通常推荐使用 **异步方法**，因为它允许同时执行多个操作。

**但有些情况下，你可能希望先执行某个操作，再执行其他代码**，例如在启动时读取配置文件：
```js
const fs = require('node:fs');

const config = JSON.parse(fs.readFileSync('./configFile.json'));

// 读取配置后再执行其他代码
```

**总结：**  
同步方法适合这种初始化或调试场景，否则一般推荐使用异步方法。

---

### 创建和删除目录

Node.js 提供了许多操作目录的方法。

在我们的应用中，后端可能需要为用户上传的媒体文件创建一个新文件夹。下面是一个基础示例：项目中有 `index.js` 和 `package.json` 文件。
![[初始项目.png]]
使用同步方法 `mkdirSync` 创建目录:
```js
const fs = require('node:fs');

// 创建 'media' 文件夹
fs.mkdirSync('media');

// 递归创建多层目录 assets/videos/stories
fs.mkdirSync('assets/videos/stories', { recursive: true });

// 异步创建 avatars 文件夹
fs.mkdir('avatars', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Avatars 文件夹已创建！');
});
```


**解释：**

- `mkdirSync` 是同步方法，会按顺序执行
- 第二个参数 `{ recursive: true }` 可以一次创建多层目录
- `mkdir` 是异步方法，操作完成后会调用回调函数

如果想删除目录，也很简单：使用 `fs.rmdirSync(path)` 或 `fs.rmdir(path, callback)`。

---

### 读取和重命名目录

有时我们需要查看目录内容而不直接打开它，然后对数据进行操作（排序、过滤等）。

读取目录：
```js
fs.readdir(path, callback);
fs.readdirSync(path);
```

示例：`avatars` 文件夹中有三张图片（kate.jpeg、mike.jpeg、cole.png），我们想过滤出 `.png` 格式的文件：

```js
const fs = require('node:fs');

fs.readdir('avatars', (err, content) => {
    if (err) {
        console.log(err);
    }
    const pngFiles = content.filter(file => file.includes('.png'));
    console.log(`所有文件: ${content}, PNG 文件: ${pngFiles}`);
});
```

重命名目录：
```js
fs.rename('avatars', 'user-pictures', (err) => {
    if (err) {
        console.log(err);
    }
});
```

**解释：**  
`fs.rename` 可以快速重命名目录或文件。

---

### Promise 风格 API

Node.js 还提供了基于 Promise 的 API，可以与 `async/await` 一起使用，使异步操作更加可读和方便。