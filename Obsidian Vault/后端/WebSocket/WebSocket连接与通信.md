**WebSocket** 允许浏览器和服务器通过一个持续连接进行**双向通信**。  
“双向”意味着数据可以在任意时间在两个方向上传输，而无需断开连接。

## 打开WebSocket连接
创建浏览器内置的WebSocket对象，并传入URL
```js
const socket = new WebSocket('wss://address/endpoint');
```
### 代码说明

WebSocket 的 URL 总是以 **ws** 或 **wss** 开头：

- `ws` → 未加密连接
- `wss` → 加密连接

就像 HTTP URL 以 `http` 或 `https` 开头一样。

当我们使用 `new WebSocket()` 创建对象时，浏览器就会开始与服务器建立连接。

首先浏览器会通过 **HTTP 协议** 向服务器发送请求，确认服务器是否支持 WebSocket（这个过程叫 **握手 handshake**）。  
服务器确认后，双方就不再使用 HTTP，而是使用 **WebSocket 协议**进行通信

## 连接建立事件
当连接建立成功时，会触发 `.onopen` 事件：
```js
socket.onopen = function(event) {
  console.log('Connection established!');
}
```


## readyState 属性

可以通过 `readyState` 属性获取 WebSocket 连接状态：

- `0` — CONNECTING：连接尚未建立
- `1` — OPEN：连接已建立，可进行数据传输
- `2` — CLOSING：连接正在关闭
- `3` — CLOSED：连接已关闭

## WebSocket 数据传输

使用 `.send()` 方法向服务器发送数据。  
通常发送字符串。
```js
const body = {id: 66, text: 'Hello world!'};

socket.send(JSON.stringify(body));
```

当客户端接收到服务器数据时，会触发 `.onmessage` 事件：
```js
socket.onmessage = function(event) {
  console.log('Data received!');
  console.log(event.data);
}
```


如果发生错误，会触发 `.onerror` 事件：
```js
socket.onerror = function(error) {
  console.log('An error has occurred!');
}
```

## 关闭连接

关闭连接时，客户端向服务器发送关闭请求，服务器确认后连接才真正关闭。

可以监听 `.onclose` 事件：
```js
socket.onclose = function(event) {
  console.log('Connection interrupted!');
}
```


为了防止连接意外断开，服务器通常会定期发送检测消息。  
如果客户端长时间不响应，服务器会关闭连接。

## WebSocket 示例

下面代码汇总了 WebSocket 的基本事件和方法。  
由于 URL 是假的，运行不会有实际效果。

```js
// 创建 WebSocket 连接
let socket = new WebSocket("wss://address/endpoint");

// 连接建立
socket.onopen = function(event) {
  console.log('Connection established!')
};

// 接收数据
socket.onmessage = function(event) {
  console.log('Data received!');
  console.log(event.data);
};

// 连接关闭
socket.onclose = function(event) {
  console.log('Connection interrupted!');
};

// 发生错误
socket.onerror = function(event) {
  console.log('An error has occurred!');
};

// 发送数据
socket.send('Hello world!');

// 关闭连接
socket.close();
```