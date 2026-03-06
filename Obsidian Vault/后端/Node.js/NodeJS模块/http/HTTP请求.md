## 创建服务器
### 监听端口: `8081`
### 只有一个接口: `/animals`
### 如果请求中带有query参数，就把query作为响应返回
### 如果query为空，则返回一个animal数组

```js
const http = require('node:http');
const url = require('node:url');
const port = 8081;

// 创建服务器并处理 'animals' 端点请求
http.createServer((request, response) => {
	if(url.parse(request.url).pathname === '/animals') {
		response.writeHead(200, {'Content-Type': 'application/json'});

		// 使用 URL 模块解析 query 参数
		const requestQueries = url.parse(request.url).query?.split('&') || [];
		const requestParams = Object.fromEntries(
			requestQueries.map((query) => query.split('='))
		);

		// 如果有 query 参数，返回它
		// 如果没有，则返回默认 animals 数组
		if(requestQueries.length) {
			response.write(JSON.stringify(requestParams));
		} else {
			response.write(JSON.stringify([
				'cat', 'dog', 'bird', 'elephant'
			]));
		}

		response.end();
	};
}).listen(port);
```
### 代码说明

- `http.createServer()`：创建 HTTP 服务器
- `url.parse()`：解析请求 URL
- `pathname`：获取路径部分
- `query`：获取查询字符串
- `Object.fromEntries()`：把数组转换成对象
- `response.writeHead()`：设置响应头
- `response.write()`：写入响应数据
- `response.end()`：结束响应

# 发送请求

`http` 模块也可以发送请求。

有两种方法：
- `http.get()`
- `http.request()`

区别：
- `.get()` 默认使用 GET 方法，并自动调用 `.end()`
- `.request()` 更灵活，需要手动 `.end()`

### 使用 http.get()
```js
http.get('http://localhost:8081/animals', (res) => {
  let fullResponse = '';

  res.on('data', (dataChunk) => {
    fullResponse += dataChunk;
  });

  res.on('end', () => {
    console.log(JSON.parse(fullResponse));
  });
});
```
### 代码说明

- `.get()`：接收 URL 和回调函数
- `res.on('data')`：监听数据块
- `res.on('end')`：请求结束时触发


### 使用 http.request()
```js
const options = {
	hostname: 'localhost',
	port: 8081,
	path: '/animals',
	method: 'GET',
	headers: {
	  'Content-Type': 'application/json'
	}
};

http.request(options, (res) => {
  let fullResponse = '';

  res.on('data', (dataChunk) => {
    fullResponse += dataChunk;
  });

  res.on('end', () => {
    console.log(JSON.parse(fullResponse));
  });

}).end();
```
`.request()` 比 `.get()` 更灵活，可以发送 POST、PUT 等请求。
## 传递Query参数
假设你要发送一个对象
```js
const query  = {
	drink: 'coffee',
	isNeedSugar: false,
	type: 'batch brew'
};
```

你需要把它转换成 URL 查询字符串。

可以使用 `URLSearchParams`：
```js
const searchParams = new URLSearchParams(query).toString();

const options = {
	hostname: 'localhost',
	port: 8081,
	path: '/animals?' + searchParams,
	method: 'GET',
	headers: {
	  'Content-Type': 'application/json'
	}
};
```
生成的 URL 类似：
```js
/animals?drink=coffee&isNeedSugar=false&type=batch+brew
```
注意:
- 所有 query 参数都会变成字符串
- 空格会被编码为 `+`