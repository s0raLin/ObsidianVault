HTTP模块提供了`createServer()`方法，让我们能够读取请求并发送响应
你可以通过`createServer()`方法控制路由、响应头、发送Cookie以及其他基本都HTTP功能

## 创建服务器
```js
// server.js
// 导入模块
const http = require('node:http'); 

// 创建服务器
const server = http.createServer((request, response) => {
	console.log(request);
	/* 这里写你的代码 */
});

// 监听指定端口
server.listen(8080); 
```

`listen()` 方法可以接受一个数字、字符串或对象来创建监听点。仅传端口号时，默认主机为 localhost（127.0.0.1）加端口号：
```js
server.listen(8080); // 监听 http://localhost:8080/

server.listen(8080, '192.168.1.12'); // 监听 http://192.168.1.12:8080/

server.listen({
  port: 8080,
  host: 'localhost'
});
// 监听 http://localhost:8080
```

最终，你的服务器就绑定在指定端口和主机上，可以通过浏览器访问 `localhost:8080`，终端也会输出请求对象内容。

## 返回响应
要向浏览器返回内容，需要发送响应：
```js
const http = require('node:http');

const server = http.createServer((request, response) => {
	response.write('Hello, browser.');
	response.end();
});

server.listen(8080);
```

**代码解析：**  
这里用到了响应对象 `response` 的两个方法：
1. `write()` — 写入响应内容，默认返回 `text/plain` 类型文本。
2. `end()` — 结束响应，必须调用，否则浏览器不会显示内容。
同样，你可以用简写方式直接创建并监听服务器：
```js
const http = require('node:http');

http.createServer((request, response) => {
	response.write('Hello, browser.');
	response.end();
}).listen(8080);
```

## 设置响应头

如果要返回其他类型的数据，比如 JSON 或 HTML，可以使用 `writeHead()` 方法设置响应头：

```js
const http = require('node:http');

const server = http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'application/json'});

	response.write(JSON.stringify({ message: 'This is JSON response.' }));

	response.end();
});

server.listen(8080);
```

如果改成 `Content-Type: text/html`，就可以返回 HTML 页面:
```js
const http = require('node:http');

const server = http.createServer((request, response) => {
	response.writeHead(200, {'Content-Type': 'text/html'});

	response.write('<h1>Hello</h1>');

	response.end();
});

server.listen(8080);
```
**注意：** `writeHead()` 方法在一次请求中只能调用一次，并且要在 `write()` 方法之前调用，否则头信息不会生效。
错误示例:
```js
const server = http.createServer((request, response) => {
	response.write('<h1>Hello</h1>');

	response.writeHead(200, {'Content-Type': 'text/html'}); // 不会生效
	response.end();
});
```
### 使用 `setHeader()`

与 `writeHead()` 不同，`setHeader()` 可以多次调用，设置的头信息会合并：
```js
response.setHeader('Content-Type', 'text/html');
response.writeHead(200);
response.end();
```
## 设置 Cookie

可以通过响应头向浏览器发送 Cookie：
```js
const http = require('node:http');

const server = http.createServer((request, response) => {
	response.setHeader('Set-Cookie', ['userId=1', 'userToken=qwert123']);
	response.writeHead(200, {'Content-Type': 'text/html'});

	response.write('<h1>Hello</h1>');
	response.end();
});

server.listen(8080);
```
打开浏览器开发者工具的网络（Network）和存储（Storage）标签页，可以看到 Cookie 被写入浏览器。

---

## 读取请求参数

GET 请求可能带有 URL 参数，POST 请求可能有请求体。获取 URL 查询参数可以用 `url` 模块：
```js
const http = require('node:http');
const url = require('node:url');

const server = http.createServer((request, response) => {
	const requestQueries = url.parse(request.url).query.split('&');
	const requestParams = Object.fromEntries(requestQueries.map((query) => query.split('=')));

	response.writeHead(200, {'Content-Type': 'application/json'});
	response.write(JSON.stringify(requestParams));
	response.end();
});

server.listen(8080);
```

**注意：** 浏览器会自动请求 `favicon.ico`，如果路径不存在，会报错 `TypeError: Cannot read properties of null (reading 'split')`。可以用路由规则处理。

## 基本路由

可以通过 `request.url` 判断路由：
```js
const http = require('node:http');

const server = http.createServer((request, response) => {
	if(request.url === '/animals') {
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.write(JSON.stringify(['cat', 'dog', 'bird', 'elephant']));
		response.end();
	}
});

server.listen(8080);
```
如果 URL 带查询参数，推荐用 `url.parse(request.url).pathname` 判断路径，而不是直接判断 `request.url`。
