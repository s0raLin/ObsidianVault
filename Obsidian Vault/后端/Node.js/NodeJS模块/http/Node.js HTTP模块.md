Node.js内置一个http模块，可以用它来创建http服务器

## 创建服务器
### 用`createServer()`方法创建http服务器
`createServer()`方法接收一个回调函数，当有新的http请求时，这个回调函数会不执行。
回调函数接收两个参数: `request`(请求对象)和`response`(响应对象)

### 使用`listen()`方法监听指定的端口
`listen()`方法接收端口号和一个可选的回调函数，当服务器准备好接收请求时，这个回调函数会被执行

## 使用步骤
1. 使用`require()`函数在Node.js中引入HTTP模块
2. 使用`http.createServer()`方法创建HTTP服务器
3. 调用`server.listen()`方法启动服务器
```js
// 使用 require() 函数访问 HTTP 模块
const http = require('node:http');

// 创建一个 HTTP 服务器
const server = http.createServer((request, response) => {
	console.log('Connected successfully');
});

// 启动服务器
server.listen(8080);
```
你可能注意到，网页一直在加载，并且没有收到任何来自服务器的响应。这是因为你没有向客户端返回任何数据，也没有关闭连接

## ## 一个更完整的示例

下面是一个更完整的示例，它会向浏览器返回内容：
```js
const http = require('node:http');

const server = http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello from HTTP server');
  response.end();
});

server.listen(8080, () => {
  console.log('Server running on port 8080');
});
```
### 代码解释

上面的代码会向浏览器发送 `Hello from HTTP server` 。同时还设置了 HTTP 响应头。服务器启动成功时，控制台会输出一条信息


## 发起请求

你还可以使用 HTTP 模块向其他服务器或 API 发送 HTTP 请求。

### 使用 `get()` 方法发送 HTTP 请求
`get()` 方法接收两个参数：
1. 你要请求的资源 URL
2. 一个回调函数，当服务器返回响应时执行

在回调函数中，你可以处理响应并读取响应数据

### 最简单的示例
```js
const http = require('node:http');

http.get('http://jsonplaceholder.typicode.com/todos/1');
```

### 读取响应数据的示例
```js
const http = require('node:http');

http.get('http://jsonplaceholder.typicode.com/todos/1', (response) => {
  response.on('data', (data) => {
    console.log(data.toString());
  });
});
```
### 代码解释
使用 `get()` 方法，你可以读取服务器返回的状态信息以及其他数据
