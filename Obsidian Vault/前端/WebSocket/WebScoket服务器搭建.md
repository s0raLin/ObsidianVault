## Node.js 中的 WebSocket

与传统 HTTP 的**请求—响应模型**不同，WebSocket 支持**双向交互通信会话**。一旦连接建立，客户端和服务器就可以在连接关闭前随时交换消息

Node.js 以其**事件驱动**和**非阻塞 I/O 模型**而闻名，非常适合运行 WebSocket。它可以高效管理多个 WebSocket 连接，是构建实时应用的强大平台


## 搭建 WebSocket 服务器

在 Node.js 中，有多种工具可以创建 WebSocket 服务器，比如 **socket.io** 和 **ws**。其中 **ws** 是一个简单高效的 WebSocket 服务器和客户端库。

使用 ws 搭建 WebSocket 服务器的步骤：

1. 在新项目中使用 npm 安装 ws
2. 在 JavaScript 文件中导入它
3. 创建 WebSocketServer 实例并指定监听端口

示例：
```js
import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
```
**代码说明：**  
创建一个 WebSocket 服务器，并让它监听 8080 端口。

---

服务器创建后，可以为各种 WebSocket 事件添加监听器。最重要的是 **connection** 事件，当客户端成功连接时触发

在连接处理函数中，你可以监听错误、接收客户端消息，以及向客户端发送消息
```js
// 监听新连接
wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  // 监听连接错误
  ws.on('error', console.error);

  // 监听客户端消息
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  // 向客户端发送欢迎消息
  ws.send('Welcome to the websocket server');
});
```
**代码说明：**

- 当有客户端连接时打印提示
- 监听错误
- 接收并打印客户端消息
- 主动发送欢迎信息

---

客户端或服务器都可以关闭 WebSocket 连接，可以通过 **close** 事件监听：
```js
ws.on('close', function close() { 
   console.log('The client has disconnected.'); 
});
```
**代码说明：**  
当客户端断开连接时输出日志。

---

## 完整代码
```js
import { WebSocketServer } from 'ws';

// 创建服务器并指定端口
const wss = new WebSocketServer({ port: 8080 });

// 新连接监听
wss.on('connection', function connection(ws) {
  console.log('A new client connected!');

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('Welcome to the websocket server');

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});
```
**代码说明：**  
该服务器可以接收连接、接收消息、发送消息，并处理断开连接。

---

## 运行服务器

在命令行运行：
```js
node index.js
```
服务器地址：
```js
ws://localhost:8080
```

## 使用 Socket.IO

Socket.IO 是一个 JavaScript 库，用于实现实时、双向、基于事件的通信。

示例：
```js
const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a client connected');

  socket.on('message', (msg) => {
    console.log('message: ' + msg);
    io.emit('message', data); // 向所有客户端广播
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(8080, () => {
  console.log('listening on *:8080');
});
```
**代码说明：**

- 建立 HTTP 服务器
    
- 初始化 socket.io
    
- 监听客户端连接
    
- 接收并广播消息
    
- 监听断开连接
    

---

## 使用 Postman 测试服务器

你可以使用 Postman 等工具测试 WebSocket 服务器。

---

## 处理文本和二进制消息

文本消息用于普通通信。  
二进制消息用于发送文件、图片等数据，在 Node.js 中表现为 Buffer。
```js
ws.on('message', function message(data) {
    if (data instanceof Buffer) {
      console.log('Received binary message of %d bytes', data.length);
      ws.send(data);
    } else if (typeof data === 'string') {
      console.log('Received text message: %s', data);
      ws.send(`You sent -> ${data}`);
    }
});
```
**代码说明：**

- 判断数据类型
- 二进制直接回传
- 文本消息返回确认内容

---

## 向所有客户端广播消息

广播是指服务器同时向所有客户端发送数据。

### 包括发送者本身
```js
ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
});
```
**说明：**  
遍历所有客户端并发送数据。

---

### 排除发送者
```js
ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
});
```
**说明：**  
向除发送者外的所有客户端发送数据。
