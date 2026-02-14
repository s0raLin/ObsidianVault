WobSocket允许客户端和服务器通过单个长期连接进行实时的双向通信

* 与传统 HTTP 不同，HTTP 是单向通信：客户端发送请求，服务器返回响应，然后连接关闭
* 而 WebSocket 允许客户端和服务器持续通信，直到任意一方终止连接。它建立的是持久连接，使实时数据交换成为可能

## WebSocket如何工作

WebSocket 握手（handshake）是客户端和服务器建立连接的第一步。握手最初通过 HTTP 请求发起，然后连接被升级为 WebSocket 协议。
一旦 WebSocket 连接建立，通信就在单个 TCP 连接上进行，不再需要重复握手。

下面是WebSocket握手流程
### 客户端发送WebSocket请求
握手开始于客户端向服务器发送HTTP的GET请求。该请求包含特定请求头，例如: 
* `Upgrade: WebSocket`
* `Connection: Upgrade`


### 服务器返回 WebSocket 响应

服务器收到握手请求后检查请求头。如果服务器支持 WebSocket，它会返回：
- HTTP 状态码 **101（Switching Protocols）**
- `Upgrade: WebSocket`
- `Connection: Upgrade`

### 连接升级

客户端验证服务器响应头。如果符合预期，连接就从 HTTP 升级为 WebSocket，随后双方即可发送 WebSocket 消息


## WebSocket 协议的特性

WebSocket 是基于单个 TCP 连接的持久、全双工通信协议，支持客户端和服务器之间的实时双向通信

### 📦 消息分帧

WebSocket 消息被分成多个帧，每个帧包含：

- 头部（类型、长度等）
- 负载（实际数据）

---

### 📨 消息类型

支持多种消息类型：

- 文本消息（聊天、JSON 等）
- 二进制消息（图片、音频、视频）
- 控制消息（关闭连接、ping 保活等）

---

### 🔄 全双工通信

客户端和服务器可以同时发送和接收消息，无需等待对方响应

---

### ⚡ 高效率、低开销

使用紧凑的数据帧结构，减少额外请求头，提高通信效率

---

### ⏱ 实时更新

服务器可以在数据产生时立即推送给客户端，无需轮询

## WebSocket 与 Node.js

Node.js 是事件驱动、非阻塞 I/O 平台，非常适合构建可扩展的高性能 WebSocket 应用，可以高效处理大量并发连接。

在 Node.js 中实现 WebSocket 有多种方式。本教程使用 **ws** 库，它是一个简单高效的 WebSocket 客户端和服务器库。

### 创建Node.js项目
```bash
mkdir websocket-server
cd websocket-server
pnpm init
```

### 安装ws库
```bash
pnpm install ws
```
### 创建WebSocket服务器
```js
const WebSocket = require('ws);

const wss = new WebSocket.Server({port: 8080});
```
监听连接
```js
wss.on('connection', function connection(ws) {
	ws.on('error', console.error);
	
	ws.on('message', function message(data) {
		ws.send('Server echoing back: ${data}')
	});
	
	ws.on('close', () => {
		console.log('客户端关闭');
	});
})
```
广播消息
```js
wss.clients.forEach((cl8ient) => {
	if (client.readyState === WebSocket.OPEN) {
		client.send('Hello, WebSocket client!');
	}
})
```
### 创建WebSocket客户端

```js
pnpm install ws
```
创建客户端
```js
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');
```
发送和接收消息
```js
ws.on('open', () => {
  console.log('Connected to WebSocket server');
  ws.send('Hello, server!');
});

ws.on('message', (message) => {
  console.log(`Received message from server: ${message}`);
});

ws.on('close', () => {
  console.log('Disconnected from WebSocket server');
});
```
### 运行服务器和客户端
服务器
```bash
node server.js
```
客户端
```bash
node client.js
```

## 使用 WebSocket 的注意事项

### 🌐 浏览器支持

大多数现代浏览器支持 WebSocket，但旧浏览器可能不支持。

---

### 📈 可扩展性

大量连接会消耗服务器资源，需要负载均衡等方案。

---

### 🔐 安全性

需要防范：

- XSS
- CSRF

应使用认证、输入验证和加密。

---

### ⚠ 错误处理

网络问题或服务器问题可能导致断连，需要健壮的错误处理。

---

### 🚀 实时数据管理

高频数据更新可能造成压力，需要优化数据量或使用节流策略。

---

## WebSocket 的应用场景

### 💬 实时聊天

即时消息通信。

---

### 👥 协作应用

多人同时编辑文档或白板。

---

### 🔔 实时通知

社交更新、邮件提醒、股票价格等。

---

### 🎮 多人在线游戏

实时状态同步和玩家交互。
