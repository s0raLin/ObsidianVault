## 理解WebSocket
WebSocket是一种协议，在单个TCP连接上建立全双工通信通道

一旦连接建立:
* 客户端和服务器可以随时互发消息
* 连接保持开启状态(不会每次通信都断开)
在Node.js中，可以使用多种库来操作WebSocket,比较流行的是`ws`

## ## 设置 WebSocket 客户端

在编写客户端前，需要安装 ws：

```bash
pnpm install ws
```

还需要一个 WebSocket 服务器。  
本示例假设本地服务器地址：

```bash
ws://localhost:8080
```
准备好后，就可以创建客户端。

---

## 创建 WebSocket 客户端

创建文件：

```js
app.js
```

代码如下：

```js
const WebSocket = require('ws');

// 建立连接
const socket = new WebSocket('ws://localhost:8080');

socket.on('open', function open() {
    console.log('Connected to the WebSocket server.');
    socket.send('Hello Server!');
});

socket.on('message', function incoming(data) {
    console.log('Received:', data);
});

socket.on('close', function close() {
    console.log('Disconnected from the server.');
});

// 发送消息函数
function sendMessage(message) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        console.log('Sent:', message);
    } else {
        console.log('WebSocket connection not open.');
    }
}

// 每 5 秒发送一次消息
setInterval(() => {
    sendMessage('Ping');
}, 5000);
```

---

## 代码说明

这个脚本会连接本地 8080 端口的 WebSocket 服务器。

### 建立连接

```js
new WebSocket('ws://localhost:8080')
```

创建连接并尝试连接服务器。

---

### open 事件

连接成功时触发：

```js
socket.on('open', ...)
```

---

### message 事件

接收到服务器消息时触发：

```js
socket.on('message', ...)
```

---

### close 事件

连接关闭时触发：

```js
socket.on('close', ...)
```

---

### sendMessage 函数

用于发送消息。  
只有连接处于 **OPEN 状态**时才发送。

---

### 自动发送 Ping

每 5 秒向服务器发送一次消息：

```js
setInterval(...)
```

---

## 向服务器发送消息

连接建立后即可发送：

```js
socket.send('Hello Server!');
```

必须在 open 事件后发送。

---

## 处理服务器消息

```js
socket.on('message', function incoming(data) {
    console.log('Received:', data);
});
```

收到的数据可以进一步处理或使用。

---

## 关闭连接处理

```js
socket.on('close', function close() {
    console.log('Disconnected from the server.');
});
```

用于清理资源或记录状态。

---

## 运行客户端

在终端执行：

```js
node app.js
```

如果连接成功，你会看到：

```js
Connected to the WebSocket server.
Sent: Ping
```

服务器发送的消息也会打印出来。