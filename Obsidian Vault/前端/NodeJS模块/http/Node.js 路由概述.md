## HTTP方法
常用方法:
* GET -> 获取数据
* POST -> 发送数据
* PUT -> 更新数据
* DELETE -> 删除数据

## 静态路由和动态路由
路由可分为静态路由和动态路由
### 静态路由
静态路由是固定路径，例如:
* 首页: `/`
* 关于页面: `/about`

这些路径不会改变，用于展示固定内容

### 动态路由
动态路由可以适应URL中的可变参数，例如:
```bash
http://localhost:8080/posts/123
```
这里的 `123` 代表某个博客文章的唯一 ID。

---

## 路由参数（Route Parameters）

路由参数用于处理动态 URL。它允许你从 URL 中提取值，并在应用中使用。
例如，在博客应用中，每篇文章都有唯一 ID，可以通过路由参数访问。

## http模块
以上所有路由功能都依赖 Node.js 内置的 **http 模块**。

它是一个用于构建 HTTP 服务器的工具包，负责：

- 创建服务器
- 处理传入请求
- 发送响应

这是实现路由的核心模块

## 项目搭建
```bash
pnpm init
```
初始化一个 Node.js 项目，并生成一个基础的 `package.json` 文件

接下来，在项目根目录创建一个文件：
```js
app.js
```

# 创建路由

我们使用内置的 `http` 模块创建服务器，并定义首页路由 `/`

```js
const http = require('http');

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Welcome to our website!');
        response.end();
    }
});

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`Listening on port ${port}`));
```

### 代码解释
1. 引入 `http` 模块
2. 使用 `createServer()` 创建服务器
3. 判断请求的 URL 是否为 `/`
4. 如果是，返回状态码 200 和欢迎信息    
5. 服务器监听 8080 端口

在终端运行：
```js
node app.js
```
然后在浏览器访问：
```js
http://localhost:8080
```
你会看到：
```js
Welcome to our website!
```


## /posts 路由
```js
if (request.url === '/posts') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Here are the latest blog posts.');
    response.end();
}
```

如果访问:
```js
http://localhost:8080/posts
```
服务器会返回博客文章列表信息。


## 处理动态路由
例如：
```js
/posts/123
```
其中 123 是文章 ID。

实现方式：
```js
if (request.url.startsWith('/posts/')) {
    const postId = request.url.split('/')[2];

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(`You're reading post #${postId}`);
    response.end();
}
```
### 代码解析

- 使用 `startsWith()` 判断路径是否以 `/posts/` 开头
- 使用 `split('/')` 拆分 URL
- 获取数组第 3 个元素作为 postId

例如访问：
```js
http://localhost:8080/posts/123
```

返回：
```js
You're reading post #123
```

# 动态路由的意义

动态路由的好处：

1. 可以根据 URL 参数获取特定资源（如博客文章）
2. 可以查询数据库并动态生成内容
3. 提升用户体验，使 URL 更直观

---

# 路由错误处理

当用户访问不存在的页面时，我们应返回 404 错误。
```js
const http = require('http');

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Welcome to our website!');
        response.end();

    } else if (request.url === '/posts') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Here are the latest blog posts.');
        response.end();

    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 Page not found');
        response.end();
    }
});

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`Listening on port ${port}`));
```


### 解释

如果访问未定义路由（如 `/about`）：

服务器会返回：
```js
404 Page not found
```

状态码：404

这能帮助用户清楚知道页面不存在。

---
