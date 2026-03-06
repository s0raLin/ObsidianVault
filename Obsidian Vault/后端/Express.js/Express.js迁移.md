**Express 是 Node.js 中一个流行的 Web 框架**，它可以简化并加快开发。如果你已经在用 Node.js 构建 Web 应用，但发现当前方案在功能、结构或开发便利性方面不足（比如路由、中间件、模板引擎支持等），那么可以考虑迁移到 Express。

本主题中，我们先从一个使用 Node.js 内置 **http 模块** 处理路由和操作的简单服务器开始，然后将它迁移到 Express。Express 可以简化路由和请求处理，让代码更加简洁、易维护。

---

## Node 服务器

首先导入必要模块，并定义服务器监听的主机名和端口：

```js
// Import required modules
import { createServer } from 'http'; 
import { parse, resolve } from 'url';
// Define the server hostname and port
const hostname = 'localhost';
const port = 3000;
```

**代码说明**  
导入 http 模块用于创建服务器，url 模块用于解析请求地址。然后定义服务器运行的主机名和端口。

---

接着创建 HTTP 服务器并解析请求 URL：

```js
// Create the server
const server = createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname;

  // Request handling logic goes next
});
```

**代码说明**  
创建服务器并在每次收到请求时执行回调函数。通过解析请求 URL 获取访问路径，为后续路由匹配做准备。

---

然后定义路由及对应的处理逻辑：

```js
... {

  // Define the routes and corresponding operations
  const routes = {
    '/': (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, World!');
    },
    '/about': (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('About page');
    },
    '/contact': (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Contact page');
    },
    '/api/data': (req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      const data = { message: 'This is some data from the API' };
      res.end(JSON.stringify(data));
    },
    // Handle 404 Not Found
    'default': (req, res) => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
    }
  };
});
```

**代码说明**  
这里用一个对象来存储不同路径对应的处理函数。每个路径都有自己的响应逻辑，包括设置状态码、响应头和返回内容。还定义了一个默认处理函数用于 404。

---

然后根据路径找到对应处理函数：

```js
// Find the appropriate route handler or use the default handler
const routeHandler = routes[path] || routes['default'];
routeHandler(req, res);
```

**代码说明**  
根据请求路径选择对应的处理函数。如果没有匹配，就使用默认处理函数（404）。

---

最后启动服务器：

```js
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

**代码说明**  
启动服务器并开始监听请求。启动成功后在控制台输出提示信息。

---

## 迁移到 Express

安装 Express：

```bash
npm install express
```

---

首先导入 Express 并创建实例：

```js
// Import required modules
import express from 'express';

// Create an instance of Express
const app = express();
const port = 3000;
const hostname = 'localhost';
```

**代码说明**  
导入 Express 并调用 `express()` 创建应用实例，这个实例就是我们的服务器。

---

定义路由和对应操作：

```js
app.get('/', (req, res) => {
   res.status(200).set('Content-Type', 'text/plain').send('Hello, World!');
});

app.get('/about', (req, res) => {
   res.status(200).set('Content-Type', 'text/plain').send('About page');
});

app.get('/contact', (req, res) => {
   res.status(200).set('Content-Type', 'text/plain').send('Contact page');
});

app.get('/api/data', (req, res) => {
  const data = { message: 'This is some data from the API' };
  res.status(200).set('Content-Type', 'application/json').json(data);
});
```

**代码说明**  
使用 `app.get()` 定义 GET 请求路由。处理函数可以直接操作 req 和 res，并返回响应。

---

定义 404 处理：

```js
app.use((req, res) => {
  res.status(404).set('Content-Type', 'text/plain').send('404 Not Found');
});
```

**代码说明**  
`app.use()` 定义一个中间件，当没有任何路由匹配时执行，用于统一处理 404。

---

启动服务器：

```js
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

**代码说明**  
调用 `app.listen()` 启动服务器。

---

## Express 带来的优势

使用 Express 可以让开发更简单：

### 路由

Node 原生需要手动解析 URL、处理请求方法。Express 用简单 API 就能完成。

### JSON 和表单数据解析

Express 自带解析中间件，Node 原生需要手动解析。

### 中间件

可以在请求处理流程中插入功能，比如日志、认证、错误处理等。

---

### Express 还简化了这些功能：

- 模板引擎支持（服务器端生成 HTML）
- 错误处理机制
- 静态文件服务（图片、CSS、JS 等）

这些在 Node 原生中都需要手动实现。